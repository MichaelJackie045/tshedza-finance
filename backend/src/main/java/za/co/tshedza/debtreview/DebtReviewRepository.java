package za.co.tshedza.debtreview;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DebtReviewRepository extends JpaRepository<DebtReviewRequest, String> {
    List<DebtReviewRequest> findTop25ByOrderByCreatedAtDesc();
    long countByStatus(String status);
}
