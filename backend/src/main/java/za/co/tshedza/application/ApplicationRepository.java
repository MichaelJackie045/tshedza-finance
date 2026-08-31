package za.co.tshedza.application;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByUserId(String userId);
    List<Application> findByStatusOrderByCreatedAtAsc(String status);
    long countByStatus(String status);
    Optional<Application> findFirstByUserIdAndStatusOrderByCreatedAtDesc(String userId, String status);
}
