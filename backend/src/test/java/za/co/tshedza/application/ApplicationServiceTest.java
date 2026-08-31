package za.co.tshedza.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.user.User;
import za.co.tshedza.user.UserRepository;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:application-service-test;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class ApplicationServiceTest {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    void setUp() {
        applicationRepository.deleteAll();
        loanRepository.deleteAll();
        userRepository.findByEmail("service.user@example.com").ifPresent(userRepository::delete);
        user = userRepository.save(User.builder()
                .email("service.user@example.com")
                .password(passwordEncoder.encode("Password123!"))
                .firstName("Service")
                .lastName("User")
                .phone("0821234567")
                .role("USER")
                .build());
    }

    @Test
    void decideApproveCreatesLoanUsingApplicationTermAndFrontendMath() {
        Application application = applicationRepository.save(Application.builder()
                .user(user)
                .product("cash")
                .amount(new BigDecimal("5000.00"))
                .termMonths(3)
                .status("pending")
                .firstName("Service")
                .lastName("User")
                .email(user.getEmail())
                .phone(user.getPhone())
                .build());

        Application decided = applicationService.decide(application.getId(), "approve", "Approved");

        assertThat(decided.getStatus()).isEqualTo("approved");
        assertThat(decided.getDecisionNote()).isEqualTo("Approved");
        assertThat(loanRepository.findByUserId(user.getId()))
                .singleElement()
                .satisfies(loan -> {
                    assertThat(loan.getRemaining()).isEqualByComparingTo("5354.01");
                    assertThat(loan.getMonthlyInstalment()).isEqualByComparingTo("1784.67");
                    assertThat(loan.getNextPaymentAmount()).isEqualByComparingTo("1784.67");
                    assertThat(loan.getTermMonths()).isEqualTo(3);
                });
    }

    @Test
    void decideDeclineDoesNotCreateLoan() {
        Application application = applicationRepository.save(Application.builder()
                .user(user)
                .product("cash")
                .amount(new BigDecimal("2500.00"))
                .termMonths(1)
                .status("pending")
                .firstName("Service")
                .lastName("User")
                .email(user.getEmail())
                .phone(user.getPhone())
                .build());

        Application decided = applicationService.decide(application.getId(), "decline", "Missing affordability");

        assertThat(decided.getStatus()).isEqualTo("declined");
        assertThat(decided.getDecisionNote()).isEqualTo("Missing affordability");
        assertThat(loanRepository.findByUserId(user.getId())).isEmpty();
    }
}
