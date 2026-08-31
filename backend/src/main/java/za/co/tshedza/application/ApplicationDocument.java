package za.co.tshedza.application;

/**
 * Uploaded supporting document for an application.
 *
 * LINK MAP
 * - Created by ApplicationService.uploadDocument from DocumentsStep uploads.
 * - application field is JsonIgnored to avoid circular JSON with Application.documents.
 */
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id")
    @JsonIgnore
    private Application application;

    private String kind; // id, payslip, bank1, bank2, bank3, address, employment
    private String fileName;
    private String filePath;
    private String status; // uploaded, rejected
}
