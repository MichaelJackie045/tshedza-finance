package za.co.tshedza.payfast;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.payfast")
public class PayFastProperties {
    /** When true, posts to sandbox.payfast.co.za and allows local return confirm. */
    private boolean sandbox = true;
    private String merchantId = "10052864";
    private String merchantKey = "hwodkhln4atmc";
    /** Salt passphrase from PayFast Settings → Account Information. Empty = no passphrase. */
    private String passphrase = "hwodkhln4atmc";
    private String returnUrl = "http://localhost:5173/dashboard/repayments/return";
    private String cancelUrl = "http://localhost:5173/dashboard/repayments/cancel";
    /**
     * Must be reachable by PayFast for ITN (ports 80/443/8080/8081).
     * Localhost will not receive ITNs — use ngrok or rely on sandbox return confirm.
     */
    private String notifyUrl = "http://localhost:8080/api/payments/payfast/notify";
}
