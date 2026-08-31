package za.co.tshedza.transfer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, String> {
    List<Transfer> findTop25ByOrderByCreatedAtDesc();
    long countByStatus(String status);
}
