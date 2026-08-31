package za.co.tshedza.application;

/**
 * Application create / upload / submit / admin decision logic.
 *
 * LINK MAP
 * - createApplication / uploadDocument / submitApplication ← ApplicationController (user flow).
 * - decide(approve|decline) ← AdminController ← frontend AdminPanel Approve/Decline buttons.
 * - On approve: creates {@link za.co.tshedza.loan.Loan} + schedule; user sees it via LoanController
 *   and Dashboard (apiClient#fetchLoans).
 * - Interest math mirrors frontend/src/lib/loanCalc.ts (rate from application.yml app.interest-rate).
 */
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import za.co.tshedza.loan.Loan;
import za.co.tshedza.loan.LoanRepository;
import za.co.tshedza.loan.LoanScheduleItem;
import za.co.tshedza.notify.NotificationService;
import za.co.tshedza.user.User;
import za.co.tshedza.user.UserRepository;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository repository;
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Value("${app.interest-rate}")
    private BigDecimal interestRate;

    public Application createApplication(User user, ApplicationRequest request) {
        ApplicationRequest.DetailsFormRequest details = request.getDetails();
        if (details == null) {
            details = new ApplicationRequest.DetailsFormRequest();
        }
        syncUserProfile(user, details);

        Application application = repository
                .findFirstByUserIdAndStatusOrderByCreatedAtDesc(user.getId(), "draft")
                .orElseGet(() -> Application.builder().user(user).status("draft").build());

        application.setUser(user);
        application.setProduct(request.getProduct());
        application.setAmount(request.getAmount());
        application.setTermMonths(request.getTermMonths());
        application.setStatus("draft");
        application.setFirstName(details.getFirstName());
        application.setLastName(details.getLastName());
        application.setIdNumber(details.getIdNumber());
        application.setPhone(details.getPhone());
        application.setEmail(details.getEmail());
        application.setPresentAddress(details.getPresentAddress());
        application.setCity(details.getCity());
        application.setProvince(details.getProvince());
        application.setPostCode(details.getPostCode());
        application.setOccupation(details.getOccupation());
        application.setEmploymentStatus(details.getEmploymentStatus());
        application.setMonthlyIncome(parseIncome(details.getMonthlyIncome()));
        application.setEmployerName(details.getEmployerName());
        application.setWeeklyWage(parseIncome(details.getWeeklyWage()));
        return repository.save(application);
    }

    /** Keep the account profile in sync with what the applicant submits. */
    private void syncUserProfile(User user, ApplicationRequest.DetailsFormRequest details) {
        if (details == null) return;
        if (details.getFirstName() != null && !details.getFirstName().isBlank()) {
            user.setFirstName(details.getFirstName().trim());
        }
        if (details.getLastName() != null && !details.getLastName().isBlank()) {
            user.setLastName(details.getLastName().trim());
        }
        if (details.getPhone() != null && !details.getPhone().isBlank()) {
            user.setPhone(details.getPhone().trim());
        }
        if (details.getIdNumber() != null && !details.getIdNumber().isBlank()) {
            user.setIdNumber(details.getIdNumber().trim());
        }
        userRepository.save(user);
    }

    private BigDecimal parseIncome(String value) {
        if (value == null || value.isBlank()) return null;
        return new BigDecimal(value.replaceAll("\\s", ""));
    }

    public ApplicationDocument uploadDocument(String applicationId, User user, String kind, MultipartFile file) throws IOException {
        Application application = getOwnedApplication(applicationId, user);
        
        Path root = Paths.get(uploadDir);
        if (!Files.exists(root)) Files.createDirectories(root);
        
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = root.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        ApplicationDocument doc = ApplicationDocument.builder()
                .application(application)
                .kind(kind)
                .fileName(file.getOriginalFilename())
                .filePath(filePath.toString())
                .status("uploaded")
                .build();
        
        application.getDocuments().add(doc);
        repository.save(application);
        return doc;
    }

    /** Called from ReviewStep after documents are uploaded; status pending shows in AdminPanel. */
    public Application submitApplication(String applicationId, User user, SubmitRequest request) {
        Application application = getOwnedApplication(applicationId, user);
        if (request.getAmount() != null) {
            application.setAmount(request.getAmount());
        }
        if (request.getTermMonths() != null) {
            application.setTermMonths(request.getTermMonths());
        }
        application.setStatus("pending");
        application.setReference("TF-" + System.currentTimeMillis() % 100000000);
        Application saved = repository.save(application);
        notificationService.notifyApplicationSubmitted(saved);
        return saved;
    }

    /**
     * Admin approve/decline — entry from AdminController and frontend AdminPanel buttons.
     * Approve also creates a Loan the applicant sees on /dashboard.
     */
    @org.springframework.transaction.annotation.Transactional
    public Application decide(String applicationId, String decision, String note) {
        Application application = repository.findById(applicationId).orElseThrow();
        if (!"pending".equals(application.getStatus())) {
            throw new IllegalStateException("Only pending applications can be decided");
        }
        application.setDecisionNote(note);
        if ("approve".equalsIgnoreCase(decision)) {
            application.setStatus("approved");
            createLoanFromApplication(application, application.getUser());
        } else if ("decline".equalsIgnoreCase(decision)) {
            application.setStatus("declined");
        } else {
            throw new IllegalArgumentException("Decision must be approve or decline");
        }
        Application saved = repository.save(application);
        notificationService.notifyApplicationDecision(saved);
        return saved;
    }

    /** Builds Loan + schedule using the same rate idea as frontend loanCalc.ts. */
    private void createLoanFromApplication(Application app, User user) {
        int termMonths = app.getTermMonths() == null ? 1 : Math.max(1, app.getTermMonths());
        BigDecimal total = calculateTotalRepayable(app.getAmount(), termMonths);
        BigDecimal monthlyInstalment = total.divide(BigDecimal.valueOf(termMonths), 2, RoundingMode.HALF_UP);
        
        String loanId = "LN-" + (10000 + (int)(Math.random() * 90000));
        
        Loan loan = Loan.builder()
                .id(loanId)
                .user(user)
                .product(app.getProduct().equals("domestic") ? "Domestic worker loan" : "Cash loan")
                .status("active")
                .principal(app.getAmount())
                .remaining(total)
                .termMonths(termMonths)
                .monthlyInstalment(monthlyInstalment)
                .nextPaymentDate(LocalDate.now().plusMonths(1))
                .nextPaymentAmount(monthlyInstalment)
                .build();

        for (int month = 1; month <= termMonths; month++) {
            loan.getSchedule().add(LoanScheduleItem.builder()
                    .loan(loan)
                    .dueDate(LocalDate.now().plusMonths(month))
                    .amount(month == termMonths
                            ? total.subtract(monthlyInstalment.multiply(BigDecimal.valueOf(termMonths - 1))).setScale(2, RoundingMode.HALF_UP)
                            : monthlyInstalment)
                    .status("upcoming")
                    .build());
        }
        loanRepository.save(loan);
    }

    private Application getOwnedApplication(String applicationId, User user) {
        Application application = repository.findById(applicationId).orElseThrow();
        if (!application.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(FORBIDDEN, "You cannot access this application");
        }
        return application;
    }

    private BigDecimal calculateTotalRepayable(BigDecimal principal, int termMonths) {
        if (termMonths == 1) {
            return principal
                    .add(principal.multiply(interestRate))
                    .setScale(2, RoundingMode.HALF_UP);
        }

        double p = principal.doubleValue();
        double r = interestRate.doubleValue();
        double factor = Math.pow(1 + r, termMonths);
        double monthly = (p * r * factor) / (factor - 1);
        double total = monthly * termMonths;
        return BigDecimal.valueOf(total).setScale(2, RoundingMode.HALF_UP);
    }
}
