package za.co.tshedza.application;

/**
 * JSON body for creating an application.
 *
 * LINK MAP
 * - Mirrors payload from frontend apiClient.createApplication / DetailsStep form fields.
 */
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ApplicationRequest {
    private String product;
    private BigDecimal amount;
    private Integer termMonths;
    private DetailsFormRequest details;

    @Data
    public static class DetailsFormRequest {
        private String firstName;
        private String lastName;
        private String idNumber;
        private String phone;
        private String email;
        private String presentAddress;
        private String city;
        private String province;
        private String postCode;
        private String occupation;
        private String employmentStatus;
        private String monthlyIncome;
        private String employerName;
        private String weeklyWage;
    }
}
