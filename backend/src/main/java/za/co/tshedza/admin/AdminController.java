package za.co.tshedza.admin;

/**
 * Admin operations API — requires ROLE_ADMIN (SecurityConfig).
 *
 * LINK MAP (frontend)
 * - Route /admin guarded by RequireAdmin.tsx → AdminPanel.tsx
 * - GET  /api/admin/overview                 ← apiClient#fetchAdminOverview
 * - GET  /api/admin/applications?status=...  ← apiClient#fetchAdminApplications
 * - POST /api/admin/applications/{id}/decision ← apiClient#adminDecideApplication
 * - GET  /api/admin/loans|transfers|debt-reviews ← matching fetchAdmin* helpers
 * Approve path calls ApplicationService.decide → creates Loan for the applicant.
 */
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.tshedza.application.Application;
import za.co.tshedza.application.ApplicationRepository;
import za.co.tshedza.application.ApplicationService;
import za.co.tshedza.debtreview.DebtReviewRepository;
import za.co.tshedza.debtreview.DebtReviewRequest;
import za.co.tshedza.loan.Loan;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.transfer.Transfer;
import za.co.tshedza.transfer.TransferRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ApplicationRepository applicationRepository;
    private final ApplicationService applicationService;
    private final LoanRepository loanRepository;
    private final TransferRepository transferRepository;
    private final DebtReviewRepository debtReviewRepository;

    /** Counts for AdminPanel overview cards. */
    @GetMapping("/overview")
    public ResponseEntity<AdminOverview> overview() {
        AdminOverview overview = new AdminOverview(
                applicationRepository.countByStatus("pending"),
                applicationRepository.countByStatus("approved"),
                applicationRepository.countByStatus("declined"),
                loanRepository.countByStatus("active"),
                transferRepository.countByStatus("pending"),
                debtReviewRepository.countByStatus("received")
        );
        return ResponseEntity.ok(overview);
    }

    /** Pending (default) queue shown on AdminPanel Applications tab. */
    @GetMapping("/applications")
    public ResponseEntity<List<Application>> applications(
            @RequestParam(defaultValue = "pending") String status
    ) {
        return ResponseEntity.ok(applicationRepository.findByStatusOrderByCreatedAtAsc(status));
    }

    /** Approve creates a Loan; Decline only updates status — see ApplicationService.decide. */
    @PostMapping("/applications/{id}/decision")
    public ResponseEntity<Application> decide(
            @PathVariable String id,
            @RequestBody DecisionRequest request
    ) {
        return ResponseEntity.ok(applicationService.decide(id, request.getDecision(), request.getNote()));
    }

    /** All loans — AdminPanel Loans tab (includes ones created after approval). */
    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> loans() {
        return ResponseEntity.ok(loanRepository.findAll());
    }

    /** Recent transfers from public TransferPage submissions. */
    @GetMapping("/transfers")
    public ResponseEntity<List<Transfer>> transfers() {
        return ResponseEntity.ok(transferRepository.findTop25ByOrderByCreatedAtDesc());
    }

    /** Recent debt-review requests from DebtReviewPage. */
    @GetMapping("/debt-reviews")
    public ResponseEntity<List<DebtReviewRequest>> debtReviews() {
        return ResponseEntity.ok(debtReviewRepository.findTop25ByOrderByCreatedAtDesc());
    }

    @Data
    public static class DecisionRequest {
        private String decision;
        private String note;
    }

    @Data
    @AllArgsConstructor
    public static class AdminOverview {
        private long pendingApplications;
        private long approvedApplications;
        private long declinedApplications;
        private long activeLoans;
        private long pendingTransfers;
        private long debtReviewRequests;
    }
}
