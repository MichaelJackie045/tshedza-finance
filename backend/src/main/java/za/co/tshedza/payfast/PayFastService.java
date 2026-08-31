package za.co.tshedza.payfast;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import za.co.tshedza.loan.Loan;
import za.co.tshedza.loan.LoanRepaymentApplier;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.loan.Repayment;
import za.co.tshedza.loan.RepaymentRepository;
import za.co.tshedza.notify.NotificationService;
import za.co.tshedza.user.User;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayFastService {

    private final PayFastProperties props;
    private final LoanRepository loanRepository;
    private final RepaymentRepository repaymentRepository;
    private final NotificationService notificationService;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    public String processUrl() {
        return props.isSandbox()
                ? "https://sandbox.payfast.co.za/eng/process"
                : "https://www.payfast.co.za/eng/process";
    }

    private String validateUrl() {
        return props.isSandbox()
                ? "https://sandbox.payfast.co.za/eng/query/validate"
                : "https://www.payfast.co.za/eng/query/validate";
    }

    @Transactional
    public Map<String, Object> initiate(User user, String loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow();
        if (!loan.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Forbidden");
        }
        LoanRepaymentApplier.ensureNextDue(loan);
        if (loan.getRemaining() == null || loan.getRemaining().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("Loan has nothing left to pay");
        }
        if (loan.getNextPaymentAmount() == null || loan.getNextPaymentAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("No instalment due");
        }

        String paymentId = "PAY-" + (1000 + (int) (Math.random() * 9000));
        BigDecimal amount = loan.getNextPaymentAmount().setScale(2, RoundingMode.HALF_UP);
        String amountStr = amount.toPlainString();

        Repayment pending = Repayment.builder()
                .id(paymentId)
                .loan(loan)
                .date(LocalDateTime.now())
                .amount(amount)
                .method("PayFast")
                .status("pending")
                .build();
        repaymentRepository.save(pending);

        LinkedHashMap<String, String> fields = new LinkedHashMap<>();
        fields.put("merchant_id", props.getMerchantId());
        fields.put("merchant_key", props.getMerchantKey());
        fields.put("return_url", props.getReturnUrl() + "?ref=" + paymentId);
        fields.put("cancel_url", props.getCancelUrl() + "?ref=" + paymentId);
        fields.put("notify_url", props.getNotifyUrl());
        if (user.getFirstName() != null && !user.getFirstName().isBlank()) {
            fields.put("name_first", user.getFirstName());
        }
        if (user.getLastName() != null && !user.getLastName().isBlank()) {
            fields.put("name_last", user.getLastName());
        }
        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            fields.put("email_address", user.getEmail());
        }
        if (user.getPhone() != null && !user.getPhone().isBlank()) {
            fields.put("cell_number", user.getPhone().replaceAll("\\D", ""));
        }
        fields.put("m_payment_id", paymentId);
        fields.put("amount", amountStr);
        fields.put("item_name", "Loan repayment " + loan.getId());
        fields.put("item_description", "Instalment for " + loan.getProduct());
        fields.put("custom_str1", loan.getId());
        fields.put("custom_str2", user.getId());

        String signature = PayFastSignature.generate(fields, props.getPassphrase());
        fields.put("signature", signature);

        Map<String, Object> response = new HashMap<>();
        response.put("processUrl", processUrl());
        response.put("paymentId", paymentId);
        response.put("fields", fields);
        response.put("sandbox", props.isSandbox());
        return response;
    }

    /**
     * PayFast ITN webhook. Returns plain "OK" body with 200.
     */
    @Transactional
    public void handleNotify(Map<String, String> posted) {
        log.info("PayFast ITN received: m_payment_id={} status={}",
                posted.get("m_payment_id"), posted.get("payment_status"));

        String expectedSig = PayFastSignature.generateFromPostedOrder(posted, props.getPassphrase());
        String actualSig = posted.get("signature");
        if (actualSig == null || !actualSig.equalsIgnoreCase(expectedSig)) {
            log.warn("PayFast ITN signature mismatch");
            throw new IllegalArgumentException("Invalid signature");
        }

        if (!props.getMerchantId().equals(posted.get("merchant_id"))) {
            throw new IllegalArgumentException("Merchant mismatch");
        }

        String paramString = posted.entrySet().stream()
                .filter(e -> !"signature".equals(e.getKey()))
                .map(e -> e.getKey() + "=" + PayFastSignature.pfEncode(e.getValue() == null ? "" : e.getValue()))
                .collect(Collectors.joining("&"));

        if (!confirmWithPayFast(paramString)) {
            log.warn("PayFast server validation failed for {}", posted.get("m_payment_id"));
            throw new IllegalArgumentException("PayFast validation failed");
        }

        if (!"COMPLETE".equalsIgnoreCase(posted.get("payment_status"))) {
            log.info("Ignoring non-COMPLETE ITN status={}", posted.get("payment_status"));
            return;
        }

        String paymentId = posted.get("m_payment_id");
        Repayment repayment = repaymentRepository.findById(paymentId).orElse(null);
        if (repayment == null) {
            log.warn("Unknown payment id {}", paymentId);
            return;
        }
        if ("cleared".equalsIgnoreCase(repayment.getStatus())) {
            return; // idempotent
        }

        BigDecimal expected = repayment.getAmount();
        BigDecimal gross = new BigDecimal(posted.getOrDefault("amount_gross", "0"));
        if (expected.subtract(gross).abs().compareTo(new BigDecimal("0.01")) > 0) {
            throw new IllegalArgumentException("Amount mismatch");
        }

        repayment.setPfPaymentId(posted.get("pf_payment_id"));
        clearRepayment(repayment);
    }

    /**
     * Local sandbox helper: after browser return, mark pending payment cleared
     * when ITN cannot reach localhost. Disabled when sandbox=false.
     */
    @Transactional
    public Repayment confirmSandboxReturn(User user, String paymentId) {
        if (!props.isSandbox()) {
            throw new IllegalStateException("Return confirm only allowed in sandbox");
        }
        Repayment repayment = repaymentRepository.findById(paymentId).orElseThrow();
        if (!repayment.getLoan().getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Forbidden");
        }
        if ("cleared".equalsIgnoreCase(repayment.getStatus())) {
            return repayment;
        }
        if (!"pending".equalsIgnoreCase(repayment.getStatus())) {
            throw new IllegalStateException("Payment is not pending");
        }
        repayment.setPfPaymentId("SANDBOX-LOCAL");
        clearRepayment(repayment);
        return repayment;
    }

    private void clearRepayment(Repayment repayment) {
        Loan loan = repayment.getLoan();
        repayment.setStatus("cleared");
        repayment.setMethod("PayFast");
        repayment.setDate(LocalDateTime.now());

        LoanRepaymentApplier.applyInstalment(loan, repayment.getAmount());

        loanRepository.save(loan);
        repaymentRepository.save(repayment);
        notificationService.notifyRepaymentCleared(loan.getUser(), loan, repayment);
    }

    /**
     * Marks a pending PayFast attempt cancelled when the user abandons checkout.
     */
    @Transactional
    public Repayment cancelPending(User user, String paymentId) {
        Repayment repayment = repaymentRepository.findById(paymentId).orElseThrow();
        if (!repayment.getLoan().getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Forbidden");
        }
        if ("cleared".equalsIgnoreCase(repayment.getStatus())) {
            return repayment;
        }
        if ("pending".equalsIgnoreCase(repayment.getStatus())) {
            repayment.setStatus("cancelled");
            repaymentRepository.save(repayment);
        }
        return repayment;
    }

    private boolean confirmWithPayFast(String paramString) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(validateUrl()))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(paramString, StandardCharsets.UTF_8))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body();
            return body != null && body.trim().equalsIgnoreCase("VALID");
        } catch (Exception e) {
            log.warn("PayFast validate request failed: {}", e.getMessage());
            return false;
        }
    }
}
