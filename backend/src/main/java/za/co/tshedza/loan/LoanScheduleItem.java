package za.co.tshedza.loan;

/**
 * One instalment row on a loan repayment schedule.
 *
 * LINK MAP
 * - Built when ApplicationService creates a loan after admin approval.
 * - Marked paid by LoanController.makeRepayment; shown on LoanDetailPage.
 */
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanScheduleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    @JsonIgnore
    private Loan loan;

    private LocalDate dueDate;
    private BigDecimal amount;
    private String status; // paid, upcoming, overdue
}
