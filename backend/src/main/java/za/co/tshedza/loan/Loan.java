package za.co.tshedza.loan;

/**
 * Active / paid loan entity shown on the user dashboard and admin loans table.
 *
 * LINK MAP
 * - Created from ApplicationService.createLoanFromApplication after admin approve.
 * - schedule list ← LoanScheduleItem rows (JSON to frontend Loan.schedule).
 * - remaining / nextPayment* updated by LoanController.makeRepayment.
 */
import jakarta.persistence.*;
import lombok.*;
import za.co.tshedza.user.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Loan {
    @Id
    private String id; // LN-20481

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String product;
    private String status; // active, overdue, paid
    private BigDecimal principal;
    private BigDecimal remaining;
    private Integer termMonths;
    private BigDecimal monthlyInstalment;
    private LocalDate nextPaymentDate;
    private BigDecimal nextPaymentAmount;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @Builder.Default
    private List<LoanScheduleItem> schedule = new ArrayList<>();
}
