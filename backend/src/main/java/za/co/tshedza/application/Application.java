package za.co.tshedza.application;

/**
 * JPA entity for a loan application row in H2 table {@code application}.
 *
 * LINK MAP
 * - Written during apply flow (ApplicationService).
 * - Listed for admins by status (pending/approved/declined) in AdminController.
 * - Fields firstName/amount/termMonths etc. map to AdminApplication in frontend apiTypes.ts.
 */
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import za.co.tshedza.user.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String product;
    private BigDecimal amount;
    private Integer termMonths;
    private String status; // draft, pending, approved, rejected
    private String reference;
    private String decisionNote;
    private LocalDateTime createdAt;

    // Details from form
    private String firstName;
    private String lastName;
    private String idNumber;
    private String phone;
    private String email;
    private String presentAddress;
    private String city;
    private String province;
    private String postCode;
    private String occupation;
    private String employmentStatus;
    private BigDecimal monthlyIncome;
    private String employerName;
    private BigDecimal weeklyWage;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ApplicationDocument> documents = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
