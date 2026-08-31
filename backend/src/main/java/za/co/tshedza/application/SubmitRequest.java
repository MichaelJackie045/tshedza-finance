package za.co.tshedza.application;

/**
 * JSON body for submitting an application (terms acceptance + signature).
 *
 * LINK MAP
 * - Sent by frontend ReviewStep via apiClient.submitApplication.
 * - amount / termMonths sync the quote chosen on the Terms step.
 */
import lombok.Data;
import java.math.BigDecimal;

@Data
public class SubmitRequest {
    private boolean acceptedTerms;
    private String signature;
    private BigDecimal amount;
    private Integer termMonths;
}
