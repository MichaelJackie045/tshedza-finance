package za.co.tshedza.loan;

/**
 * User-facing loans and repayments API (authenticated owner only).
 *
 * LINK MAP (frontend dashboard)
 * - GET  /api/loans           ← apiClient#fetchLoans ← DashboardPage
 * - GET  /api/loans/{id}      ← apiClient#fetchLoan ← LoanDetailPage
 * - GET  /api/repayments      ← apiClient#fetchRepayments ← RepaymentsPage
 * - POST /api/repayments      ← apiClient#makeRepayment ← loan detail pay action
 * Loans are usually created when an admin approves an application (ApplicationService.decide).
 */
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import za.co.tshedza.notify.NotificationService;
import za.co.tshedza.user.User;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoanController {

    private final LoanRepository loanRepository;
    private final RepaymentRepository repaymentRepository;
    private final NotificationService notificationService;

    @GetMapping("/loans")
    public ResponseEntity<Map<String, Object>> getLoans(@AuthenticationPrincipal User user) {
        List<Loan> loans = loanRepository.findByUserId(user.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("loans", loans);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/loans/{id}")
    public ResponseEntity<Loan> getLoan(
            @PathVariable String id,
            @AuthenticationPrincipal User user
    ) {
        Loan loan = loanRepository.findById(id).orElseThrow();
        if (!loan.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(loan);
    }

    @GetMapping("/repayments")
    public ResponseEntity<List<Repayment>> getRepayments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(repaymentRepository.findByLoanUserIdOrderByDateDesc(user.getId()));
    }

    @PostMapping("/repayments")
    public ResponseEntity<Repayment> makeRepayment(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request
    ) {
        String loanId = request.get("loanId");
        Loan loan = loanRepository.findById(loanId).orElseThrow();
        if (!loan.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        LoanRepaymentApplier.ensureNextDue(loan);
        if (loan.getNextPaymentAmount() == null
                || loan.getNextPaymentAmount().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest().build();
        }

        Repayment repayment = Repayment.builder()
                .id("PAY-" + (1000 + (int)(Math.random() * 9000)))
                .loan(loan)
                .date(LocalDateTime.now())
                .amount(loan.getNextPaymentAmount())
                .method("EFT")
                .status("cleared")
                .build();

        LoanRepaymentApplier.applyInstalment(loan, repayment.getAmount());

        loanRepository.save(loan);
        Repayment saved = repaymentRepository.save(repayment);
        notificationService.notifyRepaymentCleared(user, loan, saved);
        return ResponseEntity.ok(saved);
    }
}
