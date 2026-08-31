package za.co.tshedza.payfast;

/**
 * PayFast checkout + ITN.
 *
 * LINK MAP
 * - POST /api/payments/payfast/initiate ← RepaymentsPage “Make a payment”
 * - POST /api/payments/payfast/notify   ← PayFast ITN (public, no JWT)
 * - POST /api/payments/payfast/confirm  ← sandbox return page (JWT)
 * - POST /api/payments/payfast/cancel   ← user abandoned checkout (JWT)
 */
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import za.co.tshedza.loan.Repayment;
import za.co.tshedza.user.User;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments/payfast")
@RequiredArgsConstructor
public class PayFastController {

    private final PayFastService payFastService;

    @PostMapping("/initiate")
    public ResponseEntity<Map<String, Object>> initiate(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body
    ) {
        String loanId = body.get("loanId");
        if (loanId == null || loanId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(payFastService.initiate(user, loanId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** Instant Transaction Notification — must respond 200 quickly. */
    @PostMapping(value = "/notify", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<String> notify(@RequestParam MultiValueMap<String, String> form) {
        LinkedHashMap<String, String> posted = new LinkedHashMap<>();
        form.forEach((k, values) -> {
            if (values != null && !values.isEmpty()) {
                posted.put(k, values.get(0));
            }
        });
        try {
            payFastService.handleNotify(posted);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("FAILED");
        }
    }

    /** After PayFast redirects back — completes pending payment in sandbox only. */
    @PostMapping("/confirm")
    public ResponseEntity<Repayment> confirm(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body
    ) {
        String paymentId = body.get("paymentId");
        if (paymentId == null || paymentId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(payFastService.confirmSandboxReturn(user, paymentId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /** User cancelled on PayFast — drop the pending repayment row. */
    @PostMapping("/cancel")
    public ResponseEntity<Repayment> cancel(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body
    ) {
        String paymentId = body.get("paymentId");
        if (paymentId == null || paymentId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            return ResponseEntity.ok(payFastService.cancelPending(user, paymentId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).build();
        }
    }
}
