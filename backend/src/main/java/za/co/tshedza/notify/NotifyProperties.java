package za.co.tshedza.notify;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.notify")
public class NotifyProperties {
    /** Resend API key. Empty = emails are skipped (local demo still works). */
    private String resendApiKey = "";
    private String fromEmail = "onboarding@resend.dev";
    private String fromName = "Tshedza Finance";
    private String opsEmail = "jackiemichael045@gmail.com";
}
