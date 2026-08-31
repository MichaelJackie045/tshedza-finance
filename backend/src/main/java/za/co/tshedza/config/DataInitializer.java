package za.co.tshedza.config;

/**
 * Seeds demo data on first boot when the H2 database is empty.
 *
 * LINK MAP
 * - Demo user thabo@example.com → frontend Login page / dashboard loans.
 * - Demo admin admin@tshedza.local → frontend /admin (AdminPanel).
 * - Creates an example Loan so Dashboard has something to show immediately.
 */
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import za.co.tshedza.loan.Loan;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.loan.LoanScheduleItem;
import za.co.tshedza.user.User;
import za.co.tshedza.user.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("thabo@example.com").isEmpty()) {
            User user = User.builder()
                    .email("thabo@example.com")
                    .password(passwordEncoder.encode("Password123!"))
                    .firstName("Thabo")
                    .lastName("Molefe")
                    .phone("0825550142")
                    .idNumber("9001015800088")
                    .role("USER")
                    .build();
            userRepository.save(user);

            Loan loan = Loan.builder()
                    .id("LN-20481")
                    .user(user)
                    .product("Cash loan")
                    .status("active")
                    .principal(new BigDecimal("8000.00"))
                    .remaining(new BigDecimal("5340.50"))
                    .termMonths(1)
                    .monthlyInstalment(new BigDecimal("1780.17"))
                    .nextPaymentDate(LocalDate.now().plusDays(14))
                    .nextPaymentAmount(new BigDecimal("1780.17"))
                    .build();

            loan.getSchedule().add(LoanScheduleItem.builder()
                    .loan(loan)
                    .dueDate(LocalDate.now().minusMonths(1))
                    .amount(new BigDecimal("1780.17"))
                    .status("paid")
                    .build());

            loan.getSchedule().add(LoanScheduleItem.builder()
                    .loan(loan)
                    .dueDate(loan.getNextPaymentDate())
                    .amount(new BigDecimal("1780.17"))
                    .status("upcoming")
                    .build());

            loanRepository.save(loan);
        }

        if (userRepository.findByEmail("admin@tshedza.local").isEmpty()) {
            User admin = User.builder()
                    .email("admin@tshedza.local")
                    .password(passwordEncoder.encode("Admin123!"))
                    .firstName("Admin")
                    .lastName("User")
                    .phone("0800000000")
                    .role("ADMIN")
                    .build();
            userRepository.save(admin);
        }
    }
}
