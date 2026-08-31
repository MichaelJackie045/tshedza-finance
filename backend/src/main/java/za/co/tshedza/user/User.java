package za.co.tshedza.user;

/**
 * Application user (Spring Security UserDetails).
 *
 * LINK MAP
 * - role USER | ADMIN → SecurityConfig /api/admin/** and frontend RequireAdmin.
 * - Returned (without password) inside AuthenticationResponse → frontend UserProfile.
 */
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
    private String phone;
    private String idNumber;

    @Builder.Default
    @Column(nullable = false)
    private String role = "USER";

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<za.co.tshedza.application.Application> applications;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String value = (role == null || role.isBlank()) ? "USER" : role;
        return List.of(new SimpleGrantedAuthority("ROLE_" + value));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
