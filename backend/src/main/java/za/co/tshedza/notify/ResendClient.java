package za.co.tshedza.notify;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * Sends email via the official Resend Java SDK.
 * LINK MAP: NotificationService → ResendClient → Resend API.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ResendClient {

    private final NotifyProperties props;

    public boolean send(String to, String subject, String htmlBody) {
        String key = props.getResendApiKey();
        if (key == null || key.isBlank()) {
            log.info("Resend skipped (no API key): to={} subject={}", to, subject);
            return false;
        }
        try {
            Resend resend = new Resend(key);
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(props.getFromName() + " <" + props.getFromEmail() + ">")
                    .to(to)
                    .subject(subject)
                    .html(htmlBody)
                    .build();
            CreateEmailResponse data = resend.emails().send(params);
            log.info("Resend OK to={} id={}", to, data != null ? data.getId() : null);
            return true;
        } catch (ResendException e) {
            log.warn("Resend failed to={}: {}", to, e.getMessage());
            return false;
        } catch (Exception e) {
            log.warn("Resend error to={}: {}", to, e.getMessage());
            return false;
        }
    }
}
