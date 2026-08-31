package za.co.tshedza.user;

/**
 * Current-user profile endpoints.
 *
 * LINK MAP
 * - GET /api/me ← apiClient#fetchMe (profile / auth refresh).
 * - Role field is used by frontend RequireAdmin and PublicLayout admin nav link.
 */
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.tshedza.auth.AuthenticationResponse;

import java.util.List;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<AuthenticationResponse.UserResponse> getMe(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(AuthenticationResponse.UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .idNumberMasked(maskIdNumber(user.getIdNumber()))
                .role(user.getRole() == null ? "USER" : user.getRole())
                .build());
    }

    @GetMapping("/documents")
    @Transactional(readOnly = true)
    public ResponseEntity<List<DocumentInfo>> getMyDocuments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userRepository.findById(user.getId()).orElseThrow()
                .getApplications().stream()
                .flatMap(app -> app.getDocuments().stream())
                .map(doc -> new DocumentInfo(doc.getKind(), doc.getFileName(), doc.getStatus()))
                .toList());
    }

    @Data
    @AllArgsConstructor
    public static class DocumentInfo {
        private String kind;
        private String fileName;
        private String status;
    }

    private String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 4) return idNumber;
        return "*".repeat(idNumber.length() - 4) + idNumber.substring(idNumber.length() - 4);
    }
}
