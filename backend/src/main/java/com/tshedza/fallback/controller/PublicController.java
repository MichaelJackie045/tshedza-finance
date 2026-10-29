package com.tshedza.fallback.controller;

import com.tshedza.fallback.service.FallbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final FallbackService fallbackService;

    public PublicController(FallbackService fallbackService) {
        this.fallbackService = fallbackService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> contact(@RequestBody FallbackService.ContactRequest request) {
        return ResponseEntity.ok(fallbackService.createContactMessage(request));
    }

    @PostMapping("/transfers")
    public ResponseEntity<Map<String, Object>> createTransfer(@RequestBody FallbackService.TransferRequest request) {
        String id = fallbackService.createTransfer(request);
        return ResponseEntity.ok(Map.of("id", id, "reference", id, "fee", 0.0, "total", request.amount));
    }

    @PostMapping("/debt-review")
    public ResponseEntity<Map<String, Object>> createDebtReview(@RequestBody FallbackService.DebtReviewRequest request) {
        return ResponseEntity.ok(fallbackService.createDebtReview(request));
    }
}
