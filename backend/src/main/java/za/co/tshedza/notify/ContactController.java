package za.co.tshedza.notify;

/**
 * Public contact form — emails ops via Resend.
 *
 * LINK MAP
 * - POST /api/contact ← apiClient#createContactMessage ← ContactPage
 */
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final NotificationService notificationService;

    /** Simple in-memory throttle: max 5 submissions per email per hour. */
    private final ConcurrentHashMap<String, AtomicInteger> hourlyCounts = new ConcurrentHashMap<>();
    private volatile long windowStart = System.currentTimeMillis();

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody ContactRequest request) {
        rotateWindowIfNeeded();
        String key = request.getEmail().trim().toLowerCase();
        int count = hourlyCounts.computeIfAbsent(key, k -> new AtomicInteger()).incrementAndGet();
        if (count > 5) {
            return ResponseEntity.status(429).body(Map.of("ok", false, "error", "Too many messages"));
        }
        notificationService.notifyContactForm(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage());
        return ResponseEntity.ok(Map.of("ok", true));
    }

    private void rotateWindowIfNeeded() {
        long now = System.currentTimeMillis();
        if (now - windowStart > 3_600_000L) {
            hourlyCounts.clear();
            windowStart = now;
        }
    }

    @Data
    public static class ContactRequest {
        @NotBlank
        @Size(min = 2, max = 120)
        private String name;

        @NotBlank
        @Email
        private String email;

        @Size(max = 20)
        private String phone;

        @NotBlank
        @Size(min = 10, max = 2000)
        private String message;
    }
}
