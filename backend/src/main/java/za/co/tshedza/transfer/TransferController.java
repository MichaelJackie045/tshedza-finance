package za.co.tshedza.transfer;

/**
 * Cross-border transfer quotes/creates (public — no JWT required).
 *
 * LINK MAP
 * - POST /api/transfers ← apiClient#createTransfer ← pages/Transfer.tsx
 * - Also listed for admins via AdminController GET /api/admin/transfers.
 */
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import za.co.tshedza.notify.NotificationService;

import java.math.BigDecimal;
import java.math.RoundingMode;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferRepository repository;
    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Transfer> create(@RequestBody TransferRequest request) {
        BigDecimal amount = request.getAmount();
        BigDecimal feeRate = getFeeRate(request.getCountry());
        BigDecimal fee = amount.multiply(feeRate).setScale(2, RoundingMode.HALF_UP);
        if (fee.compareTo(new BigDecimal("49")) < 0) {
            fee = new BigDecimal("49.00");
        }
        
        Transfer transfer = Transfer.builder()
                .id("TX-" + System.currentTimeMillis() % 100000000)
                .senderName(request.getSenderName())
                .senderPhone(request.getSenderPhone())
                .recipientName(request.getRecipientName())
                .recipientPhone(request.getRecipientPhone())
                .country(request.getCountry())
                .amount(amount)
                .fee(fee)
                .total(amount.add(fee))
                .status("pending")
                .build();

        Transfer saved = repository.save(transfer);
        notificationService.notifyTransferCreated(saved);
        return ResponseEntity.ok(saved);
    }

    private BigDecimal getFeeRate(String country) {
        return switch (country) {
            case "ZW" -> new BigDecimal("0.045");
            case "MZ" -> new BigDecimal("0.04");
            default -> new BigDecimal("0.035");
        };
    }

    @Data
    public static class TransferRequest {
        private String senderName;
        private String senderPhone;
        private String recipientName;
        private String recipientPhone;
        private String country;
        private BigDecimal amount;
    }
}
