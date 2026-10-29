package com.tshedza.fallback.controller;

import com.tshedza.fallback.service.FallbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final FallbackService fallbackService;

    public ApiController(FallbackService fallbackService) {
        this.fallbackService = fallbackService;
    }

    private Map<String, Object> mapOf(Object... entries) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            map.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return map;
    }

    private String currentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new IllegalStateException("Authentication required");
        }
        return auth.getName();
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me() {
        String email = currentUserEmail();
        FallbackService.UserRecord user = fallbackService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not found"));
        }
        return ResponseEntity.ok(Map.of(
            "id", user.id,
            "email", user.email,
            "firstName", user.firstName,
            "lastName", user.lastName,
            "phone", user.phone,
            "role", user.role
        ));
    }

    @PostMapping("/applications")
    public ResponseEntity<Map<String, Object>> createApplication(@RequestBody FallbackService.ApplicationDraftRequest request) {
        String email = currentUserEmail();
        FallbackService.ApplicationRecord application = fallbackService.createApplication(email, request);
        return ResponseEntity.ok(Map.of(
            "id", application.id,
            "status", application.status
        ));
    }

    @PostMapping("/applications/{applicationId}/documents")
    public ResponseEntity<Map<String, Object>> uploadDocument(@PathVariable String applicationId,
                                                             @RequestBody Map<String, Object> payload) {
        String email = currentUserEmail();
        String kind = String.valueOf(payload.getOrDefault("kind", "id"));
        String fileName = String.valueOf(payload.getOrDefault("fileName", "upload"));
        String docId = fallbackService.uploadDocument(email, applicationId, kind, fileName);
        return ResponseEntity.ok(Map.of("id", docId, "kind", kind, "status", "uploaded"));
    }

    @PostMapping("/applications/{applicationId}/submit")
    public ResponseEntity<Map<String, Object>> submitApplication(@PathVariable String applicationId,
                                                                @RequestBody FallbackService.SubmitRequest request) {
        String email = currentUserEmail();
        FallbackService.ApplicationRecord app = fallbackService.submitApplication(email, applicationId, request);
        return ResponseEntity.ok(Map.of(
            "id", app.id,
            "reference", app.reference,
            "status", app.status
        ));
    }

    @GetMapping("/applications")
    public ResponseEntity<List<Map<String, Object>>> listApplications() {
        String email = currentUserEmail();
        List<FallbackService.ApplicationRecord> apps = fallbackService.listUserApplications(email);
        return ResponseEntity.ok(apps.stream().map(app -> mapOf(
            "id", app.id,
            "product", app.product,
            "amount", app.amount,
            "term_months", app.termMonths,
            "status", app.status,
            "reference", app.reference,
            "decision_note", app.decisionNote,
            "first_name", app.firstName,
            "last_name", app.lastName,
            "phone", app.phone,
            "email", app.email,
            "created_at", app.createdAt
        )).toList());
    }

    @GetMapping("/documents")
    public ResponseEntity<List<Map<String, Object>>> listDocuments() {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.listUserDocuments(email));
    }

    @GetMapping("/loans")
    public ResponseEntity<Map<String, Object>> loans() {
        String email = currentUserEmail();
        return ResponseEntity.ok(Map.of("loans", fallbackService.listLoansForUser(email)));
    }

    @GetMapping("/loans/{loanId}")
    public ResponseEntity<Map<String, Object>> loan(@PathVariable String loanId) {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.getLoanForUser(email, loanId));
    }

    @GetMapping("/repayments")
    public ResponseEntity<List<Map<String, Object>>> repayments() {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.listRepaymentsForUser(email));
    }

    @PostMapping("/payments/initiate")
    public ResponseEntity<Map<String, Object>> initiatePayment(@RequestBody Map<String, String> body) {
        String email = currentUserEmail();
        String loanId = body.get("loanId");
        return ResponseEntity.ok(fallbackService.initiatePayment(email, loanId));
    }

    @PostMapping("/payments/complete")
    public ResponseEntity<Map<String, Object>> completePayment(@RequestBody Map<String, String> body) {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.completePayment(email, body.get("paymentId")));
    }

    @PostMapping("/payments/cancel")
    public ResponseEntity<Map<String, Object>> cancelPayment(@RequestBody Map<String, String> body) {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.cancelPayment(email, body.get("paymentId")));
    }

    @PostMapping("/make-repayment")
    public ResponseEntity<Map<String, Object>> makeRepayment(@RequestBody Map<String, String> body) {
        String email = currentUserEmail();
        return ResponseEntity.ok(fallbackService.makeRepayment(email, body.get("loanId")));
    }
}
