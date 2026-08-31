package za.co.tshedza.auth;

/**
 * Auth HTTP API: register, login, logout.
 *
 * LINK MAP (frontend)
 * - POST /api/auth/register ← frontend/src/lib/apiClient.ts#register ← pages/Register.tsx
 * - POST /api/auth/login    ← apiClient#login ← pages/Login.tsx
 * - POST /api/auth/logout   ← apiClient#logout ← layout sign-out
 * Response shape AuthenticationResponse matches AuthResponse in frontend/src/lib/apiTypes.ts.
 * Token is stored in authStore (frontend/src/store/authStore.ts) then sent as Bearer JWT.
 */
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
