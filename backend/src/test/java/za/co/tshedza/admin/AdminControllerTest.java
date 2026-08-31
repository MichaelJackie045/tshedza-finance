package za.co.tshedza.admin;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import za.co.tshedza.application.Application;
import za.co.tshedza.application.ApplicationRepository;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.user.User;
import za.co.tshedza.user.UserRepository;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:admin-controller-test;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        applicationRepository.deleteAll();
        loanRepository.deleteAll();
        userRepository.findByEmail("case.user@example.com").ifPresent(userRepository::delete);
    }

    @Test
    void adminEndpointsRequireAdminRole() throws Exception {
        String userToken = login("thabo@example.com", "Password123!");
        String adminToken = login("admin@tshedza.local", "Admin123!");

        mockMvc.perform(get("/api/admin/overview"))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/admin/overview")
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/admin/overview")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pendingApplications").exists());
    }

    @Test
    void adminCanApprovePendingApplicationAndCreateLoan() throws Exception {
        User user = userRepository.save(User.builder()
                .email("case.user@example.com")
                .password(passwordEncoder.encode("Password123!"))
                .firstName("Case")
                .lastName("User")
                .phone("0821234567")
                .role("USER")
                .build());

        Application application = applicationRepository.save(Application.builder()
                .user(user)
                .product("cash")
                .amount(new BigDecimal("5000.00"))
                .termMonths(3)
                .status("pending")
                .firstName("Case")
                .lastName("User")
                .email("case.user@example.com")
                .phone("0821234567")
                .build());

        String adminToken = login("admin@tshedza.local", "Admin123!");

        mockMvc.perform(post("/api/admin/applications/{id}/decision", application.getId())
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"decision":"approve","note":"Approved in test"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("approved"))
                .andExpect(jsonPath("$.decisionNote").value("Approved in test"));

        assertThat(loanRepository.findByUserId(user.getId()))
                .singleElement()
                .satisfies(loan -> {
                    assertThat(loan.getTermMonths()).isEqualTo(3);
                    assertThat(loan.getRemaining()).isEqualByComparingTo("5354.01");
                });
    }

    private String login(String email, String password) throws Exception {
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"%s","password":"%s"}
                                """.formatted(email, password)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode jsonNode = objectMapper.readTree(response);
        return jsonNode.get("accessToken").asText();
    }
}
