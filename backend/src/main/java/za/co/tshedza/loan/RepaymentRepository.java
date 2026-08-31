package za.co.tshedza.loan;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RepaymentRepository extends JpaRepository<Repayment, String> {
    List<Repayment> findByLoanUserIdOrderByDateDesc(String userId);
}
