package com.tshedza.fallback.controller;

import com.tshedza.fallback.security.JwtTokenProvider;
import com.tshedza.fallback.service.FallbackService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final FallbackService fallbackService;

    public AuthController(JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, FallbackService fallbackService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.fallbackService = fallbackService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            FallbackService.UserRecord user = fallbackService.register(
                request.email,
                passwordEncoder.encode(request.password),
                request.firstName,
                request.lastName,
                request.phone
            );
            String token = jwtTokenProvider.generateToken(user.email, user.role);
            return ResponseEntity.ok(Map.of(
                "accessToken", token,
                "user", Map.of(
                    "id", user.id,
                    "email", user.email,
                    "firstName", user.firstName,
                    "lastName", user.lastName,
                    "phone", user.phone,
                    "role", user.role
                )
            ));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        try {
            FallbackService.UserRecord user = fallbackService.login(request.email, request.password);
            String token = jwtTokenProvider.generateToken(user.email, user.role);
            return ResponseEntity.ok(Map.of(
                "accessToken", token,
                "user", Map.of(
                    "id", user.id,
                    "email", user.email,
                    "firstName", user.firstName,
                    "lastName", user.lastName,
                    "phone", user.phone,
                    "role", user.role
                )
            ));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).body(Map.of("message", ex.getMessage()));
        }
    }

    public static class LoginRequest {
        @NotBlank
        @Email
        public String email;

        @NotBlank
        @Size(min = 6)
        public String password;
    }

    public static class RegisterRequest {
        @NotBlank
        @Email
        public String email;

        @NotBlank
        @Size(min = 6)
        public String password;

        @NotBlank
        public String firstName;

        @NotBlank
        public String lastName;

        @NotBlank
        public String phone;
    }
}
