package za.co.tshedza.transfer;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transfer {
    @Id
    private String id; // TX-12345678

    private String senderName;
    private String senderPhone;
    private String recipientName;
    private String recipientPhone;
    private String country;
    private BigDecimal amount;
    private BigDecimal fee;
    private BigDecimal total;
    private String status;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
