package com.tshedza.fallback.controller;

import com.tshedza.fallback.service.FallbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final FallbackService fallbackService;

    public AdminController(FallbackService fallbackService) {
        this.fallbackService = fallbackService;
    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> overview() {
        return ResponseEntity.ok(fallbackService.adminOverview());
    }

    @GetMapping("/applications")
    public ResponseEntity<List<Map<String, Object>>> applications(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(fallbackService.adminApplications(status));
    }

    @PostMapping("/applications/{applicationId}/decide")
    public ResponseEntity<Map<String, Object>> decideApplication(@PathVariable String applicationId,
                                                                @RequestBody Map<String, String> payload) {
        String decision = payload.getOrDefault("decision", "decline");
        String note = payload.get("note");
        return ResponseEntity.ok(fallbackService.decideApplication(applicationId, decision, note));
    }

    @GetMapping("/loans")
    public ResponseEntity<List<Map<String, Object>>> loans() {
        return ResponseEntity.ok(fallbackService.adminLoans());
    }

    @GetMapping("/transfers")
    public ResponseEntity<List<Map<String, Object>>> transfers() {
        return ResponseEntity.ok(fallbackService.adminTransfers());
    }

    @GetMapping("/debt-reviews")
    public ResponseEntity<List<Map<String, Object>>> debtReviews() {
        return ResponseEntity.ok(fallbackService.adminDebtReviews());
    }
}
