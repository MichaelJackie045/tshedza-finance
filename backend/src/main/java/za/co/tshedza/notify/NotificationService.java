package za.co.tshedza.notify;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import za.co.tshedza.application.Application;
import za.co.tshedza.debtreview.DebtReviewRequest;
import za.co.tshedza.loan.Loan;
import za.co.tshedza.loan.Repayment;
import za.co.tshedza.transfer.Transfer;
import za.co.tshedza.user.User;

import java.math.BigDecimal;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final ResendClient resendClient;
    private final NotifyProperties props;

    public void sendEmail(String to, String subject, String htmlBody) {
        if (to == null || to.isBlank()) {
            log.debug("Skip email — empty recipient: {}", subject);
            return;
        }
        try {
            resendClient.send(to.trim(), subject, htmlBody);
        } catch (Exception e) {
            log.warn("Email send failed: {}", e.getMessage());
        }
    }

    public void notifyContactForm(String name, String email, String phone, String message) {
        String subject = "Contact form — " + name;
        String html = """
                <p><strong>Name:</strong> %s</p>
                <p><strong>Email:</strong> %s</p>
                <p><strong>Phone:</strong> %s</p>
                <p><strong>Message:</strong></p>
                <p>%s</p>
                """.formatted(esc(name), esc(email), esc(blank(phone)), esc(message).replace("\n", "<br/>"));
        sendEmail(props.getOpsEmail(), subject, wrap(html));
    }

    public void notifyApplicationSubmitted(Application app) {
        String to = firstNonBlank(app.getEmail(), app.getUser() != null ? app.getUser().getEmail() : null);
        String subject = "We received your application " + nullSafe(app.getReference());
        String html = """
                <p>Hi %s,</p>
                <p>Your loan application <strong>%s</strong> is with our team.</p>
                <p>Amount: R%s · Term: %s month(s)</p>
                <p>Most decisions come within one working day.</p>
                <p>— Tshedza Finance</p>
                """.formatted(
                esc(firstNonBlank(app.getFirstName(), "there")),
                esc(nullSafe(app.getReference())),
                esc(money(app.getAmount())),
                esc(String.valueOf(app.getTermMonths())));
        sendEmail(to, subject, wrap(html));
    }

    public void notifyApplicationDecision(Application app) {
        String to = firstNonBlank(app.getEmail(), app.getUser() != null ? app.getUser().getEmail() : null);
        boolean approved = "approved".equalsIgnoreCase(app.getStatus());
        String subject = approved
                ? "Your application " + nullSafe(app.getReference()) + " was approved"
                : "Update on application " + nullSafe(app.getReference());
        String body = approved
                ? "<p>Good news — your application was <strong>approved</strong>. Sign in to your account to see the loan and repayment schedule.</p>"
                : "<p>Your application was <strong>declined</strong>.</p>"
                        + (app.getDecisionNote() != null && !app.getDecisionNote().isBlank()
                        ? "<p>Note: " + esc(app.getDecisionNote()) + "</p>"
                        : "");
        String html = """
                <p>Hi %s,</p>
                %s
                <p>Reference: <strong>%s</strong></p>
                <p>— Tshedza Finance</p>
                """.formatted(
                esc(firstNonBlank(app.getFirstName(), "there")),
                body,
                esc(nullSafe(app.getReference())));
        sendEmail(to, subject, wrap(html));
    }

    public void notifyRepaymentCleared(User user, Loan loan, Repayment repayment) {
        String to = user != null ? user.getEmail() : null;
        String subject = "Payment received — " + nullSafe(repayment.getId());
        String html = """
                <p>Hi %s,</p>
                <p>We received your repayment of <strong>R%s</strong> for loan %s.</p>
                <p>Remaining balance: R%s</p>
                <p>— Tshedza Finance</p>
                """.formatted(
                esc(firstNonBlank(user != null ? user.getFirstName() : null, "there")),
                esc(money(repayment.getAmount())),
                esc(loan.getId()),
                esc(money(loan.getRemaining())));
        sendEmail(to, subject, wrap(html));
    }

    public void notifyTransferCreated(Transfer transfer) {
        String subject = "New transfer " + transfer.getId();
        String html = """
                <p>Transfer <strong>%s</strong> submitted.</p>
                <p>%s (%s) → %s (%s)</p>
                <p>Country: %s · Amount: R%s · Fee: R%s · Total: R%s</p>
                <p>Status: %s</p>
                """.formatted(
                esc(transfer.getId()),
                esc(transfer.getSenderName()),
                esc(transfer.getSenderPhone()),
                esc(transfer.getRecipientName()),
                esc(transfer.getRecipientPhone()),
                esc(transfer.getCountry()),
                esc(money(transfer.getAmount())),
                esc(money(transfer.getFee())),
                esc(money(transfer.getTotal())),
                esc(transfer.getStatus()));
        sendEmail(props.getOpsEmail(), subject, wrap(html));
    }

    public void notifyDebtReviewCreated(DebtReviewRequest request) {
        String subject = "Debt review request — " + request.getFullName();
        String html = """
                <p>Hi %s,</p>
                <p>We received your debt review consultation request. Someone will follow up within two working days.</p>
                <p>— Tshedza Finance</p>
                """.formatted(esc(firstNonBlank(request.getFullName(), "there")));
        sendEmail(request.getEmail(), subject, wrap(html));

        String opsHtml = """
                <p><strong>%s</strong> · %s · %s</p>
                <p>%s</p>
                """.formatted(
                esc(request.getFullName()),
                esc(request.getPhone()),
                esc(request.getEmail()),
                esc(request.getSituation()).replace("\n", "<br/>"));
        sendEmail(props.getOpsEmail(), subject, wrap(opsHtml));
    }

    private static String wrap(String inner) {
        return "<div style=\"font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0c1210\">"
                + inner
                + "</div>";
    }

    private static String esc(String value) {
        if (value == null) return "";
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;");
    }

    private static String blank(String value) {
        return value == null || value.isBlank() ? "—" : value;
    }

    private static String nullSafe(String value) {
        return value == null ? "—" : value;
    }

    private static String firstNonBlank(String a, String b) {
        if (a != null && !a.isBlank()) return a;
        if (b != null && !b.isBlank()) return b;
        return null;
    }

    private static String money(BigDecimal value) {
        if (value == null) return "0.00";
        return value.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }
}
