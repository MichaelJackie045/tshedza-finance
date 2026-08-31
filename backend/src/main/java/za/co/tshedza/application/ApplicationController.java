package za.co.tshedza.application;

/**
 * Loan application HTTP API (authenticated users).
 *
 * LINK MAP (frontend apply flow)
 * - POST /api/applications              ← apiClient#createApplication ← DetailsStep / ReviewStep
 * - POST /api/applications/{id}/documents ← apiClient#uploadDocument ← DocumentsStep + useDocumentUpload
 * - POST /api/applications/{id}/submit  ← apiClient#submitApplication ← ReviewStep
 * Business rules + loan creation on approve live in {@link ApplicationService}.
 * After submit, status becomes pending and appears in AdminController queue.
 */
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.co.tshedza.user.User;

import java.io.IOException;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService service;

    @PostMapping
    public ResponseEntity<Application> create(
            @AuthenticationPrincipal User user,
            @RequestBody ApplicationRequest request
    ) {
        return ResponseEntity.ok(service.createApplication(user, request));
    }

    @PostMapping("/{id}/documents")
    public ResponseEntity<ApplicationDocument> upload(
            @PathVariable String id,
            @AuthenticationPrincipal User user,
            @RequestParam("kind") String kind,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.ok(service.uploadDocument(id, user, kind, file));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Application> submit(
            @PathVariable String id,
            @AuthenticationPrincipal User user,
            @RequestBody SubmitRequest request
    ) {
        return ResponseEntity.ok(service.submitApplication(id, user, request));
    }
}
