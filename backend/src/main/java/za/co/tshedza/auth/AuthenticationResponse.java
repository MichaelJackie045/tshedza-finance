package za.co.tshedza.auth;

/**
 * Login/register response: JWT + public user fields (including role).
 *
 * LINK MAP
 * - Matches frontend AuthResponse in lib/apiTypes.ts; stored by authStore.setAuth.
 */
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.tshedza.user.User;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String accessToken;
    private UserResponse user;

    @Data
    @Builder
    public static class UserResponse {
        private String id;
        private String email;
        private String firstName;
        private String lastName;
        private String phone;
        private String idNumberMasked;
        private String role;
    }

    public static AuthenticationResponse from(String token, User user) {
        return AuthenticationResponse.builder()
                .accessToken(token)
                .user(UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .phone(user.getPhone())
                        .idNumberMasked(maskIdNumber(user.getIdNumber()))
                        .role(user.getRole() == null ? "USER" : user.getRole())
                        .build())
                .build();
    }

    private static String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 4) return idNumber;
        return "*".repeat(idNumber.length() - 4) + idNumber.substring(idNumber.length() - 4);
    }
}
