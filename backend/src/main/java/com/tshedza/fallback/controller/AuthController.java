package com.tshedza.fallback.controller;

import com.tshedza.fallback.security.JwtTokenProvider;
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
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final Map<String, String> users = new ConcurrentHashMap<>();

    public AuthController(JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.users.put("admin@tshedza.local", passwordEncoder.encode("admin123"));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        if (users.containsKey(request.email.toLowerCase())) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
        }
        users.put(request.email.toLowerCase(), passwordEncoder.encode(request.password));
        String token = jwtTokenProvider.generateToken(request.email.toLowerCase());
        return ResponseEntity.ok(Map.of(
            "accessToken", token,
            "user", Map.of(
                "id", request.email.toLowerCase(),
                "email", request.email.toLowerCase(),
                "firstName", request.firstName,
                "lastName", request.lastName,
                "phone", request.phone,
                "role", "USER"
            )
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        String email = request.email.toLowerCase();
        String storedHash = users.get(email);
        if (storedHash == null || !passwordEncoder.matches(request.password, storedHash)) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        String token = jwtTokenProvider.generateToken(email);
        return ResponseEntity.ok(Map.of(
            "accessToken", token,
            "user", Map.of(
                "id", email,
                "email", email,
                "firstName", "Fallback",
                "lastName", "User",
                "phone", "",
                "role", email.contains("admin") ? "ADMIN" : "USER"
            )
        ));
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
