package za.co.tshedza.debtreview;

/**
 * Debt-review consultation requests (public — no JWT required).
 *
 * LINK MAP
 * - POST /api/debt-review ← apiClient#createDebtReview ← pages/DebtReview.tsx
 * - Listed for admins via AdminController GET /api/admin/debt-reviews.
 */
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.tshedza.notify.NotificationService;

@RestController
@RequestMapping("/api/debt-review")
@RequiredArgsConstructor
public class DebtReviewController {

    private final DebtReviewRepository repository;
    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<DebtReviewRequest> create(@RequestBody DebtReviewRequest request) {
        request.setStatus("received");
        DebtReviewRequest saved = repository.save(request);
        notificationService.notifyDebtReviewCreated(saved);
        return ResponseEntity.ok(saved);
    }
}
