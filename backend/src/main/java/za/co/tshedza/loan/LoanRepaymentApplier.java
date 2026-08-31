package za.co.tshedza.loan;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Shared logic when an instalment clears (legacy EFT or PayFast).
 * Updates remaining balance, marks the next upcoming schedule row paid,
 * and advances {@link Loan#nextPaymentDate} / {@link Loan#nextPaymentAmount}.
 */
public final class LoanRepaymentApplier {

    private LoanRepaymentApplier() {}

    /**
     * If the loan still has a balance but next-due was cleared (e.g. schedule exhausted),
     * restore a payable instalment so repayments and PayFast can continue.
     */
    public static void ensureNextDue(Loan loan) {
        if (loan.getRemaining() == null || loan.getRemaining().compareTo(BigDecimal.ZERO) <= 0) {
            return;
        }
        if (loan.getNextPaymentAmount() != null && loan.getNextPaymentAmount().compareTo(BigDecimal.ZERO) > 0) {
            return;
        }
        BigDecimal instalment = loan.getMonthlyInstalment() != null
                ? loan.getMonthlyInstalment()
                : loan.getRemaining();
        loan.setNextPaymentAmount(instalment.min(loan.getRemaining()));
        if (loan.getNextPaymentDate() == null) {
            loan.setNextPaymentDate(LocalDate.now().plusMonths(1));
        }
    }

    public static void applyInstalment(Loan loan, BigDecimal amount) {
        loan.setRemaining(loan.getRemaining().subtract(amount));
        if (loan.getRemaining().compareTo(BigDecimal.ZERO) <= 0) {
            loan.setStatus("paid");
            loan.setRemaining(BigDecimal.ZERO);
            loan.setNextPaymentAmount(BigDecimal.ZERO);
            loan.setNextPaymentDate(null);
            loan.getSchedule().stream()
                    .filter(i -> "upcoming".equals(i.getStatus()))
                    .findFirst()
                    .ifPresent(i -> i.setStatus("paid"));
            return;
        }

        loan.getSchedule().stream()
                .filter(i -> "upcoming".equals(i.getStatus()))
                .findFirst()
                .ifPresent(i -> i.setStatus("paid"));

        loan.getSchedule().stream()
                .filter(i -> "upcoming".equals(i.getStatus()))
                .findFirst()
                .ifPresentOrElse(
                        next -> {
                            loan.setNextPaymentDate(next.getDueDate());
                            loan.setNextPaymentAmount(next.getAmount());
                        },
                        () -> {
                            // Schedule missing or exhausted, but balance remains
                            BigDecimal instalment = loan.getMonthlyInstalment() != null
                                    ? loan.getMonthlyInstalment()
                                    : amount;
                            BigDecimal due = instalment.min(loan.getRemaining());
                            loan.setNextPaymentAmount(due);
                            LocalDate base = loan.getNextPaymentDate() != null
                                    ? loan.getNextPaymentDate()
                                    : LocalDate.now();
                            loan.setNextPaymentDate(base.plusMonths(1));
                        });
    }
}
