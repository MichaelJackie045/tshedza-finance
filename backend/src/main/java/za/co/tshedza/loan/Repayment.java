package za.co.tshedza.loan;

/**
 * Recorded repayment transaction against a loan.
 *
 * LINK MAP
 * - Created by POST /api/repayments (LoanController) from Dashboard pay action.
 * - Listed by GET /api/repayments on RepaymentsPage.
 */
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Repayment {
    @Id
    private String id; // PAY-991

    @ManyToOne
    @JoinColumn(name = "loan_id")
    @JsonIgnore
    private Loan loan;

    private LocalDateTime date;
    private BigDecimal amount;
    private String method;
    private String status; // pending | cleared
    /** PayFast pf_payment_id when paid via gateway. */
    private String pfPaymentId;
}
