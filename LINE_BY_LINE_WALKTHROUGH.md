# Tshedza Finance — Line-by-line walkthrough

This guide explains **every line** of application source (backend + frontend).

> Source files themselves stay clean. Use this document to study the code.

Open any file in the IDE, match the line number here, and read the explanation.

_Generated for 75 files._

---

## `backend/src/main/java/za/co/tshedza/admin/AdminController.java`

_107 lines_

**L1:** `package za.co.tshedza.admin;`  
Java package declaration — places this class in `za.co.tshedza.admin`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Admin operations API — requires ROLE_ADMIN (SecurityConfig).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP (frontend)`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Route /admin guarded by RequireAdmin.tsx → AdminPanel.tsx`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - GET  /api/admin/overview                 ← apiClient#fetchAdminOverview`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - GET  /api/admin/applications?status=...  ← apiClient#fetchAdminApplications`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * - POST /api/admin/applications/{id}/decision ← apiClient#adminDecideApplication`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * - GET  /api/admin/loans|transfers|debt-reviews ← matching fetchAdmin* helpers`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` * Approve path calls ApplicationService.decide → creates Loan for the applicant.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L14:** `import lombok.AllArgsConstructor;`  
Import — brings in `lombok.AllArgsConstructor` so this file can use it.

**L15:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L16:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L17:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L18:** `import org.springframework.web.bind.annotation.*;`  
Import — brings in `org.springframework.web.bind.annotation.` so this file can use it.

**L19:** `import za.co.tshedza.application.Application;`  
Import — brings in `za.co.tshedza.application.Application` so this file can use it.

**L20:** `import za.co.tshedza.application.ApplicationRepository;`  
Import — brings in `za.co.tshedza.application.ApplicationRepository` so this file can use it.

**L21:** `import za.co.tshedza.application.ApplicationService;`  
Import — brings in `za.co.tshedza.application.ApplicationService` so this file can use it.

**L22:** `import za.co.tshedza.debtreview.DebtReviewRepository;`  
Import — brings in `za.co.tshedza.debtreview.DebtReviewRepository` so this file can use it.

**L23:** `import za.co.tshedza.debtreview.DebtReviewRequest;`  
Import — brings in `za.co.tshedza.debtreview.DebtReviewRequest` so this file can use it.

**L24:** `import za.co.tshedza.loan.Loan;`  
Import — brings in `za.co.tshedza.loan.Loan` so this file can use it.

**L25:** `import za.co.tshedza.loan.LoanRepository;`  
Import — brings in `za.co.tshedza.loan.LoanRepository` so this file can use it.

**L26:** `import za.co.tshedza.transfer.Transfer;`  
Import — brings in `za.co.tshedza.transfer.Transfer` so this file can use it.

**L27:** `import za.co.tshedza.transfer.TransferRepository;`  
Import — brings in `za.co.tshedza.transfer.TransferRepository` so this file can use it.

**L28:** ``  
Blank line — visual spacing.

**L29:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L30:** ``  
Blank line — visual spacing.

**L31:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L32:** `@RequestMapping("/api/admin")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/admin")`.

**L33:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L34:** `public class AdminController {`  
Declares type `public class AdminController {` — container for fields and methods.

**L35:** ``  
Blank line — visual spacing.

**L36:** `    private final ApplicationRepository applicationRepository;`  
Field or method declaration: `private final ApplicationRepository applicationRepository;`

**L37:** `    private final ApplicationService applicationService;`  
Field or method declaration: `private final ApplicationService applicationService;`

**L38:** `    private final LoanRepository loanRepository;`  
Field or method declaration: `private final LoanRepository loanRepository;`

**L39:** `    private final TransferRepository transferRepository;`  
Field or method declaration: `private final TransferRepository transferRepository;`

**L40:** `    private final DebtReviewRepository debtReviewRepository;`  
Field or method declaration: `private final DebtReviewRepository debtReviewRepository;`

**L41:** ``  
Blank line — visual spacing.

**L42:** `    /** Counts for AdminPanel overview cards. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L43:** `    @GetMapping("/overview")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/overview")`.

**L44:** `    public ResponseEntity<AdminOverview> overview() {`  
Field or method declaration: `public ResponseEntity<AdminOverview> overview() {`

**L45:** `        AdminOverview overview = new AdminOverview(`  
Assignment / binding: `AdminOverview overview = new AdminOverview(`

**L46:** `                applicationRepository.countByStatus("pending"),`  
Database access via Spring Data JPA repository (read/write H2).

**L47:** `                applicationRepository.countByStatus("approved"),`  
Database access via Spring Data JPA repository (read/write H2).

**L48:** `                applicationRepository.countByStatus("declined"),`  
Database access via Spring Data JPA repository (read/write H2).

**L49:** `                loanRepository.countByStatus("active"),`  
Database access via Spring Data JPA repository (read/write H2).

**L50:** `                transferRepository.countByStatus("pending"),`  
Database access via Spring Data JPA repository (read/write H2).

**L51:** `                debtReviewRepository.countByStatus("received")`  
Database access via Spring Data JPA repository (read/write H2).

**L52:** `        );`  
Executable statement: `);`

**L53:** `        return ResponseEntity.ok(overview);`  
Returns a value to the caller: `ResponseEntity.ok(overview);`

**L54:** `    }`  
Closes the previous block/object/function.

**L55:** ``  
Blank line — visual spacing.

**L56:** `    /** Pending (default) queue shown on AdminPanel Applications tab. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L57:** `    @GetMapping("/applications")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/applications")`.

**L58:** `    public ResponseEntity<List<Application>> applications(`  
Field or method declaration: `public ResponseEntity<List<Application>> applications(`

**L59:** `            @RequestParam(defaultValue = "pending") String status`  
Annotation — framework metadata: `@RequestParam` configures behaviour for the next declaration.

**L60:** `    ) {`  
Executable statement: `) {`

**L61:** `        return ResponseEntity.ok(applicationRepository.findByStatusOrderByCreatedAtAsc(status));`  
Returns a value to the caller: `ResponseEntity.ok(applicationRepository.findByStatusO…`

**L62:** `    }`  
Closes the previous block/object/function.

**L63:** ``  
Blank line — visual spacing.

**L64:** `    /** Approve creates a Loan; Decline only updates status — see ApplicationService.decide. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L65:** `    @PostMapping("/applications/{id}/decision")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/applications/{id}/decision")`.

**L66:** `    public ResponseEntity<Application> decide(`  
Field or method declaration: `public ResponseEntity<Application> decide(`

**L67:** `            @PathVariable String id,`  
Annotation — framework metadata: `@PathVariable String id,` configures behaviour for the next declaration.

**L68:** `            @RequestBody DecisionRequest request`  
Annotation — framework metadata: `@RequestBody DecisionRequest request` configures behaviour for the next declaration.

**L69:** `    ) {`  
Executable statement: `) {`

**L70:** `        return ResponseEntity.ok(applicationService.decide(id, request.getDecision(), request.get...`  
Returns a value to the caller: `ResponseEntity.ok(applicationService.decide(id, reque…`

**L71:** `    }`  
Closes the previous block/object/function.

**L72:** ``  
Blank line — visual spacing.

**L73:** `    /** All loans — AdminPanel Loans tab (includes ones created after approval). */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L74:** `    @GetMapping("/loans")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/loans")`.

**L75:** `    public ResponseEntity<List<Loan>> loans() {`  
Field or method declaration: `public ResponseEntity<List<Loan>> loans() {`

**L76:** `        return ResponseEntity.ok(loanRepository.findAll());`  
Returns a value to the caller: `ResponseEntity.ok(loanRepository.findAll());`

**L77:** `    }`  
Closes the previous block/object/function.

**L78:** ``  
Blank line — visual spacing.

**L79:** `    /** Recent transfers from public TransferPage submissions. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L80:** `    @GetMapping("/transfers")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/transfers")`.

**L81:** `    public ResponseEntity<List<Transfer>> transfers() {`  
Field or method declaration: `public ResponseEntity<List<Transfer>> transfers() {`

**L82:** `        return ResponseEntity.ok(transferRepository.findTop25ByOrderByCreatedAtDesc());`  
Returns a value to the caller: `ResponseEntity.ok(transferRepository.findTop25ByOrder…`

**L83:** `    }`  
Closes the previous block/object/function.

**L84:** ``  
Blank line — visual spacing.

**L85:** `    /** Recent debt-review requests from DebtReviewPage. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L86:** `    @GetMapping("/debt-reviews")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/debt-reviews")`.

**L87:** `    public ResponseEntity<List<DebtReviewRequest>> debtReviews() {`  
Field or method declaration: `public ResponseEntity<List<DebtReviewRequest>> debtReviews() {`

**L88:** `        return ResponseEntity.ok(debtReviewRepository.findTop25ByOrderByCreatedAtDesc());`  
Returns a value to the caller: `ResponseEntity.ok(debtReviewRepository.findTop25ByOrd…`

**L89:** `    }`  
Closes the previous block/object/function.

**L90:** ``  
Blank line — visual spacing.

**L91:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L92:** `    public static class DecisionRequest {`  
Field or method declaration: `public static class DecisionRequest {`

**L93:** `        private String decision;`  
Field or method declaration: `private String decision;`

**L94:** `        private String note;`  
Field or method declaration: `private String note;`

**L95:** `    }`  
Closes the previous block/object/function.

**L96:** ``  
Blank line — visual spacing.

**L97:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L98:** `    @AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L99:** `    public static class AdminOverview {`  
Field or method declaration: `public static class AdminOverview {`

**L100:** `        private long pendingApplications;`  
Field or method declaration: `private long pendingApplications;`

**L101:** `        private long approvedApplications;`  
Field or method declaration: `private long approvedApplications;`

**L102:** `        private long declinedApplications;`  
Field or method declaration: `private long declinedApplications;`

**L103:** `        private long activeLoans;`  
Field or method declaration: `private long activeLoans;`

**L104:** `        private long pendingTransfers;`  
Field or method declaration: `private long pendingTransfers;`

**L105:** `        private long debtReviewRequests;`  
Field or method declaration: `private long debtReviewRequests;`

**L106:** `    }`  
Closes the previous block/object/function.

**L107:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/Application.java`

_66 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * JPA entity for a loan application row in H2 table {@code application}.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Written during apply flow (ApplicationService).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Listed for admins by status (pending/approved/declined) in AdminController.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - Fields firstName/amount/termMonths etc. map to AdminApplication in frontend apiTypes.ts.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L12:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L13:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L14:** ``  
Blank line — visual spacing.

**L15:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L16:** `import java.time.LocalDateTime;`  
Import — brings in `java.time.LocalDateTime` so this file can use it.

**L17:** `import java.util.ArrayList;`  
Import — brings in `java.util.ArrayList` so this file can use it.

**L18:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `@Entity`  
JPA entity — this class maps to a database table.

**L21:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L22:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L23:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L24:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L25:** `public class Application {`  
Declares type `public class Application {` — container for fields and methods.

**L26:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L27:** `    @GeneratedValue(strategy = GenerationType.UUID)`  
Annotation — framework metadata: `@GeneratedValue` configures behaviour for the next declaration.

**L28:** `    private String id;`  
Field or method declaration: `private String id;`

**L29:** ``  
Blank line — visual spacing.

**L30:** `    @ManyToOne`  
Annotation — framework metadata: `@ManyToOne` configures behaviour for the next declaration.

**L31:** `    @JoinColumn(name = "user_id")`  
Annotation — framework metadata: `@JoinColumn` configures behaviour for the next declaration.

**L32:** `    private User user;`  
Field or method declaration: `private User user;`

**L33:** ``  
Blank line — visual spacing.

**L34:** `    private String product;`  
Field or method declaration: `private String product;`

**L35:** `    private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L36:** `    private Integer termMonths;`  
Field or method declaration: `private Integer termMonths;`

**L37:** `    private String status; // draft, pending, approved, rejected`  
Field or method declaration: `private String status; // draft, pending, approved, rejected`

**L38:** `    private String reference;`  
Field or method declaration: `private String reference;`

**L39:** `    private String decisionNote;`  
Field or method declaration: `private String decisionNote;`

**L40:** `    private LocalDateTime createdAt;`  
Field or method declaration: `private LocalDateTime createdAt;`

**L41:** ``  
Blank line — visual spacing.

**L42:** `    // Details from form`  
Inline comment documenting intent.

**L43:** `    private String firstName;`  
Field or method declaration: `private String firstName;`

**L44:** `    private String lastName;`  
Field or method declaration: `private String lastName;`

**L45:** `    private String idNumber;`  
Field or method declaration: `private String idNumber;`

**L46:** `    private String phone;`  
Field or method declaration: `private String phone;`

**L47:** `    private String email;`  
Field or method declaration: `private String email;`

**L48:** `    private String presentAddress;`  
Field or method declaration: `private String presentAddress;`

**L49:** `    private String city;`  
Field or method declaration: `private String city;`

**L50:** `    private String province;`  
Field or method declaration: `private String province;`

**L51:** `    private String postCode;`  
Field or method declaration: `private String postCode;`

**L52:** `    private String occupation;`  
Field or method declaration: `private String occupation;`

**L53:** `    private String employmentStatus;`  
Field or method declaration: `private String employmentStatus;`

**L54:** `    private BigDecimal monthlyIncome;`  
Field or method declaration: `private BigDecimal monthlyIncome;`

**L55:** `    private String employerName;`  
Field or method declaration: `private String employerName;`

**L56:** `    private BigDecimal weeklyWage;`  
Field or method declaration: `private BigDecimal weeklyWage;`

**L57:** ``  
Blank line — visual spacing.

**L58:** `    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)`  
Annotation — framework metadata: `@OneToMany` configures behaviour for the next declaration.

**L59:** `    @Builder.Default`  
Annotation — framework metadata: `@Builder.Default` configures behaviour for the next declaration.

**L60:** `    private List<ApplicationDocument> documents = new ArrayList<>();`  
Field or method declaration: `private List<ApplicationDocument> documents = new ArrayList<>();`

**L61:** ``  
Blank line — visual spacing.

**L62:** `    @PrePersist`  
Annotation — framework metadata: `@PrePersist` configures behaviour for the next declaration.

**L63:** `    protected void onCreate() {`  
Field or method declaration: `protected void onCreate() {`

**L64:** `        createdAt = LocalDateTime.now();`  
Assignment / binding: `createdAt = LocalDateTime.now();`

**L65:** `    }`  
Closes the previous block/object/function.

**L66:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/ApplicationController.java`

_55 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Loan application HTTP API (authenticated users).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP (frontend apply flow)`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - POST /api/applications              ← apiClient#createApplication ← DetailsStep / ReviewStep`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - POST /api/applications/{id}/documents ← apiClient#uploadDocument ← DocumentsStep + useDocume...`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - POST /api/applications/{id}/submit  ← apiClient#submitApplication ← ReviewStep`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * Business rules + loan creation on approve live in {@link ApplicationService}.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * After submit, status becomes pending and appears in AdminController queue.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L14:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L15:** `import org.springframework.security.core.annotation.AuthenticationPrincipal;`  
Import — brings in `org.springframework.security.core.annotation.AuthenticationPrincipal` so this file can use it.

**L16:** `import org.springframework.web.bind.annotation.*;`  
Import — brings in `org.springframework.web.bind.annotation.` so this file can use it.

**L17:** `import org.springframework.web.multipart.MultipartFile;`  
Import — brings in `org.springframework.web.multipart.MultipartFile` so this file can use it.

**L18:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `import java.io.IOException;`  
Import — brings in `java.io.IOException` so this file can use it.

**L21:** ``  
Blank line — visual spacing.

**L22:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L23:** `@RequestMapping("/api/applications")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/applications")`.

**L24:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L25:** `public class ApplicationController {`  
Declares type `public class ApplicationController {` — container for fields and methods.

**L26:** ``  
Blank line — visual spacing.

**L27:** `    private final ApplicationService service;`  
Field or method declaration: `private final ApplicationService service;`

**L28:** ``  
Blank line — visual spacing.

**L29:** `    @PostMapping`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping`.

**L30:** `    public ResponseEntity<Application> create(`  
Field or method declaration: `public ResponseEntity<Application> create(`

**L31:** `            @AuthenticationPrincipal User user,`  
Annotation — framework metadata: `@AuthenticationPrincipal User user,` configures behaviour for the next declaration.

**L32:** `            @RequestBody ApplicationRequest request`  
Annotation — framework metadata: `@RequestBody ApplicationRequest request` configures behaviour for the next declaration.

**L33:** `    ) {`  
Executable statement: `) {`

**L34:** `        return ResponseEntity.ok(service.createApplication(user, request));`  
Returns a value to the caller: `ResponseEntity.ok(service.createApplication(user, req`

**L35:** `    }`  
Closes the previous block/object/function.

**L36:** ``  
Blank line — visual spacing.

**L37:** `    @PostMapping("/{id}/documents")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/{id}/documents")`.

**L38:** `    public ResponseEntity<ApplicationDocument> upload(`  
Field or method declaration: `public ResponseEntity<ApplicationDocument> upload(`

**L39:** `            @PathVariable String id,`  
Annotation — framework metadata: `@PathVariable String id,` configures behaviour for the next declaration.

**L40:** `            @AuthenticationPrincipal User user,`  
Annotation — framework metadata: `@AuthenticationPrincipal User user,` configures behaviour for the next declaration.

**L41:** `            @RequestParam("kind") String kind,`  
Annotation — framework metadata: `@RequestParam` configures behaviour for the next declaration.

**L42:** `            @RequestParam("file") MultipartFile file`  
Annotation — framework metadata: `@RequestParam` configures behaviour for the next declaration.

**L43:** `    ) throws IOException {`  
Executable statement: `) throws IOException {`

**L44:** `        return ResponseEntity.ok(service.uploadDocument(id, user, kind, file));`  
Returns a value to the caller: `ResponseEntity.ok(service.uploadDocument(id, user, ki…`

**L45:** `    }`  
Closes the previous block/object/function.

**L46:** ``  
Blank line — visual spacing.

**L47:** `    @PostMapping("/{id}/submit")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/{id}/submit")`.

**L48:** `    public ResponseEntity<Application> submit(`  
Field or method declaration: `public ResponseEntity<Application> submit(`

**L49:** `            @PathVariable String id,`  
Annotation — framework metadata: `@PathVariable String id,` configures behaviour for the next declaration.

**L50:** `            @AuthenticationPrincipal User user,`  
Annotation — framework metadata: `@AuthenticationPrincipal User user,` configures behaviour for the next declaration.

**L51:** `            @RequestBody SubmitRequest request`  
Annotation — framework metadata: `@RequestBody SubmitRequest request` configures behaviour for the next declaration.

**L52:** `    ) {`  
Executable statement: `) {`

**L53:** `        return ResponseEntity.ok(service.submitApplication(id, user, request));`  
Returns a value to the caller: `ResponseEntity.ok(service.submitApplication(id, user,…`

**L54:** `    }`  
Closes the previous block/object/function.

**L55:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/ApplicationDocument.java`

_33 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Uploaded supporting document for an application.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Created by ApplicationService.uploadDocument from DocumentsStep uploads.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - application field is JsonIgnored to avoid circular JSON with Application.documents.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import com.fasterxml.jackson.annotation.JsonIgnore;`  
Import — brings in `com.fasterxml.jackson.annotation.JsonIgnore` so this file can use it.

**L11:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L12:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `@Entity`  
JPA entity — this class maps to a database table.

**L15:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L16:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L17:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L18:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L19:** `public class ApplicationDocument {`  
Declares type `public class ApplicationDocument {` — container for fields and methods.

**L20:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L21:** `    @GeneratedValue(strategy = GenerationType.IDENTITY)`  
Annotation — framework metadata: `@GeneratedValue` configures behaviour for the next declaration.

**L22:** `    private Long id;`  
Field or method declaration: `private Long id;`

**L23:** ``  
Blank line — visual spacing.

**L24:** `    @ManyToOne`  
Annotation — framework metadata: `@ManyToOne` configures behaviour for the next declaration.

**L25:** `    @JoinColumn(name = "application_id")`  
Annotation — framework metadata: `@JoinColumn` configures behaviour for the next declaration.

**L26:** `    @JsonIgnore`  
Annotation — framework metadata: `@JsonIgnore` configures behaviour for the next declaration.

**L27:** `    private Application application;`  
Field or method declaration: `private Application application;`

**L28:** ``  
Blank line — visual spacing.

**L29:** `    private String kind; // id, payslip, bank1, bank2, bank3, address, employment`  
Field or method declaration: `private String kind; // id, payslip, bank1, bank2, bank3, address, emp…`

**L30:** `    private String fileName;`  
Field or method declaration: `private String fileName;`

**L31:** `    private String filePath;`  
Field or method declaration: `private String filePath;`

**L32:** `    private String status; // uploaded, rejected`  
Field or method declaration: `private String status; // uploaded, rejected`

**L33:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/ApplicationRepository.java`

_10 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface ApplicationRepository extends JpaRepository<Application, String> {`  
Declares type `public interface ApplicationRepository extends JpaRepository<Application, String> {` — container for fields and methods.

**L7:** `    List<Application> findByUserId(String userId);`  
Executable statement: `List<Application> findByUserId(String userId);`

**L8:** `    List<Application> findByStatusOrderByCreatedAtAsc(String status);`  
Executable statement: `List<Application> findByStatusOrderByCreatedAtAsc(String status);`

**L9:** `    long countByStatus(String status);`  
Executable statement: `long countByStatus(String status);`

**L10:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/ApplicationRequest.java`

_36 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * JSON body for creating an application.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Mirrors payload from frontend apiClient.createApplication / DetailsStep form fields.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L10:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L11:** ``  
Blank line — visual spacing.

**L12:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L13:** `public class ApplicationRequest {`  
Declares type `public class ApplicationRequest {` — container for fields and methods.

**L14:** `    private String product;`  
Field or method declaration: `private String product;`

**L15:** `    private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L16:** `    private Integer termMonths;`  
Field or method declaration: `private Integer termMonths;`

**L17:** `    private DetailsFormRequest details;`  
Field or method declaration: `private DetailsFormRequest details;`

**L18:** ``  
Blank line — visual spacing.

**L19:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L20:** `    public static class DetailsFormRequest {`  
Field or method declaration: `public static class DetailsFormRequest {`

**L21:** `        private String firstName;`  
Field or method declaration: `private String firstName;`

**L22:** `        private String lastName;`  
Field or method declaration: `private String lastName;`

**L23:** `        private String idNumber;`  
Field or method declaration: `private String idNumber;`

**L24:** `        private String phone;`  
Field or method declaration: `private String phone;`

**L25:** `        private String email;`  
Field or method declaration: `private String email;`

**L26:** `        private String presentAddress;`  
Field or method declaration: `private String presentAddress;`

**L27:** `        private String city;`  
Field or method declaration: `private String city;`

**L28:** `        private String province;`  
Field or method declaration: `private String province;`

**L29:** `        private String postCode;`  
Field or method declaration: `private String postCode;`

**L30:** `        private String occupation;`  
Field or method declaration: `private String occupation;`

**L31:** `        private String employmentStatus;`  
Field or method declaration: `private String employmentStatus;`

**L32:** `        private String monthlyIncome;`  
Field or method declaration: `private String monthlyIncome;`

**L33:** `        private String employerName;`  
Field or method declaration: `private String employerName;`

**L34:** `        private String weeklyWage;`  
Field or method declaration: `private String weeklyWage;`

**L35:** `    }`  
Closes the previous block/object/function.

**L36:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/ApplicationService.java`

_186 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Application create / upload / submit / admin decision logic.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - createApplication / uploadDocument / submitApplication ← ApplicationController (user flow).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - decide(approve|decline) ← AdminController ← frontend AdminPanel Approve/Decline buttons.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - On approve: creates {@link za.co.tshedza.loan.Loan} + schedule; user sees it via LoanController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` *   and Dashboard (apiClient#fetchLoans).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * - Interest math mirrors frontend/src/lib/loanCalc.ts (rate from application.yml app.interest-r...`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L14:** `import org.springframework.beans.factory.annotation.Value;`  
Import — brings in `org.springframework.beans.factory.annotation.Value` so this file can use it.

**L15:** `import org.springframework.stereotype.Service;`  
Import — brings in `org.springframework.stereotype.Service` so this file can use it.

**L16:** `import org.springframework.web.server.ResponseStatusException;`  
Import — brings in `org.springframework.web.server.ResponseStatusException` so this file can use it.

**L17:** `import org.springframework.web.multipart.MultipartFile;`  
Import — brings in `org.springframework.web.multipart.MultipartFile` so this file can use it.

**L18:** `import za.co.tshedza.loan.Loan;`  
Import — brings in `za.co.tshedza.loan.Loan` so this file can use it.

**L19:** `import za.co.tshedza.loan.LoanRepository;`  
Import — brings in `za.co.tshedza.loan.LoanRepository` so this file can use it.

**L20:** `import za.co.tshedza.loan.LoanScheduleItem;`  
Import — brings in `za.co.tshedza.loan.LoanScheduleItem` so this file can use it.

**L21:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L22:** ``  
Blank line — visual spacing.

**L23:** `import java.io.IOException;`  
Import — brings in `java.io.IOException` so this file can use it.

**L24:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L25:** `import java.math.RoundingMode;`  
Import — brings in `java.math.RoundingMode` so this file can use it.

**L26:** `import java.nio.file.Files;`  
Import — brings in `java.nio.file.Files` so this file can use it.

**L27:** `import java.nio.file.Path;`  
Import — brings in `java.nio.file.Path` so this file can use it.

**L28:** `import java.nio.file.Paths;`  
Import — brings in `java.nio.file.Paths` so this file can use it.

**L29:** `import java.time.LocalDate;`  
Import — brings in `java.time.LocalDate` so this file can use it.

**L30:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L31:** `import java.util.UUID;`  
Import — brings in `java.util.UUID` so this file can use it.

**L32:** ``  
Blank line — visual spacing.

**L33:** `import static org.springframework.http.HttpStatus.FORBIDDEN;`  
Import — brings in `static` so this file can use it.

**L34:** ``  
Blank line — visual spacing.

**L35:** `@Service`  
Spring service bean — business logic layer, injectable into controllers.

**L36:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L37:** `public class ApplicationService {`  
Declares type `public class ApplicationService {` — container for fields and methods.

**L38:** `    private final ApplicationRepository repository;`  
Field or method declaration: `private final ApplicationRepository repository;`

**L39:** `    private final LoanRepository loanRepository;`  
Field or method declaration: `private final LoanRepository loanRepository;`

**L40:** ``  
Blank line — visual spacing.

**L41:** `    @Value("${app.upload-dir}")`  
Annotation — framework metadata: `@Value` configures behaviour for the next declaration.

**L42:** `    private String uploadDir;`  
Field or method declaration: `private String uploadDir;`

**L43:** ``  
Blank line — visual spacing.

**L44:** `    @Value("${app.interest-rate}")`  
Annotation — framework metadata: `@Value` configures behaviour for the next declaration.

**L45:** `    private BigDecimal interestRate;`  
Field or method declaration: `private BigDecimal interestRate;`

**L46:** ``  
Blank line — visual spacing.

**L47:** `    public Application createApplication(User user, ApplicationRequest request) {`  
Field or method declaration: `public Application createApplication(User user, ApplicationRequest req…`

**L48:** `        Application application = Application.builder()`  
Assignment / binding: `Application application = Application.builder()`

**L49:** `                .user(user)`  
Executable statement: `.user(user)`

**L50:** `                .product(request.getProduct())`  
Executable statement: `.product(request.getProduct())`

**L51:** `                .amount(request.getAmount())`  
Executable statement: `.amount(request.getAmount())`

**L52:** `                .termMonths(request.getTermMonths())`  
Executable statement: `.termMonths(request.getTermMonths())`

**L53:** `                .status("draft")`  
Executable statement: `.status("draft")`

**L54:** `                .firstName(request.getDetails().getFirstName())`  
Executable statement: `.firstName(request.getDetails().getFirstName())`

**L55:** `                .lastName(request.getDetails().getLastName())`  
Executable statement: `.lastName(request.getDetails().getLastName())`

**L56:** `                .idNumber(request.getDetails().getIdNumber())`  
Executable statement: `.idNumber(request.getDetails().getIdNumber())`

**L57:** `                .phone(request.getDetails().getPhone())`  
Executable statement: `.phone(request.getDetails().getPhone())`

**L58:** `                .email(request.getDetails().getEmail())`  
Executable statement: `.email(request.getDetails().getEmail())`

**L59:** `                .presentAddress(request.getDetails().getPresentAddress())`  
Executable statement: `.presentAddress(request.getDetails().getPresentAddress())`

**L60:** `                .city(request.getDetails().getCity())`  
Executable statement: `.city(request.getDetails().getCity())`

**L61:** `                .province(request.getDetails().getProvince())`  
Executable statement: `.province(request.getDetails().getProvince())`

**L62:** `                .postCode(request.getDetails().getPostCode())`  
Executable statement: `.postCode(request.getDetails().getPostCode())`

**L63:** `                .occupation(request.getDetails().getOccupation())`  
Executable statement: `.occupation(request.getDetails().getOccupation())`

**L64:** `                .employmentStatus(request.getDetails().getEmploymentStatus())`  
Executable statement: `.employmentStatus(request.getDetails().getEmploymentStatus())`

**L65:** `                .monthlyIncome(parseIncome(request.getDetails().getMonthlyIncome()))`  
Executable statement: `.monthlyIncome(parseIncome(request.getDetails().getMonthlyIncome()))`

**L66:** `                .employerName(request.getDetails().getEmployerName())`  
Executable statement: `.employerName(request.getDetails().getEmployerName())`

**L67:** `                .weeklyWage(parseIncome(request.getDetails().getWeeklyWage()))`  
Executable statement: `.weeklyWage(parseIncome(request.getDetails().getWeeklyWage()))`

**L68:** `                .build();`  
Executable statement: `.build();`

**L69:** `        return repository.save(application);`  
Returns a value to the caller: `repository.save(application);`

**L70:** `    }`  
Closes the previous block/object/function.

**L71:** ``  
Blank line — visual spacing.

**L72:** `    private BigDecimal parseIncome(String value) {`  
Field or method declaration: `private BigDecimal parseIncome(String value) {`

**L73:** `        if (value == null || value.isBlank()) return null;`  
Conditional — runs the following block only when the condition is true.

**L74:** `        return new BigDecimal(value.replaceAll("\\s", ""));`  
Returns a value to the caller: `new BigDecimal(value.replaceAll("\\s", ""));`

**L75:** `    }`  
Closes the previous block/object/function.

**L76:** ``  
Blank line — visual spacing.

**L77:** `    public ApplicationDocument uploadDocument(String applicationId, User user, String kind, Multi...`  
Field or method declaration: `public ApplicationDocument uploadDocument(String applicationId, User u…`

**L78:** `        Application application = getOwnedApplication(applicationId, user);`  
Assignment / binding: `Application application = getOwnedApplication(applicationId, user);`

**L79:** `        `  
Blank line — visual spacing.

**L80:** `        Path root = Paths.get(uploadDir);`  
Assignment / binding: `Path root = Paths.get(uploadDir);`

**L81:** `        if (!Files.exists(root)) Files.createDirectories(root);`  
Conditional — runs the following block only when the condition is true.

**L82:** `        `  
Blank line — visual spacing.

**L83:** `        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();`  
Assignment / binding: `String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename()…`

**L84:** `        Path filePath = root.resolve(fileName);`  
Assignment / binding: `Path filePath = root.resolve(fileName);`

**L85:** `        Files.copy(file.getInputStream(), filePath);`  
Executable statement: `Files.copy(file.getInputStream(), filePath);`

**L86:** ``  
Blank line — visual spacing.

**L87:** `        ApplicationDocument doc = ApplicationDocument.builder()`  
Assignment / binding: `ApplicationDocument doc = ApplicationDocument.builder()`

**L88:** `                .application(application)`  
Executable statement: `.application(application)`

**L89:** `                .kind(kind)`  
Executable statement: `.kind(kind)`

**L90:** `                .fileName(file.getOriginalFilename())`  
Executable statement: `.fileName(file.getOriginalFilename())`

**L91:** `                .filePath(filePath.toString())`  
Executable statement: `.filePath(filePath.toString())`

**L92:** `                .status("uploaded")`  
Executable statement: `.status("uploaded")`

**L93:** `                .build();`  
Executable statement: `.build();`

**L94:** `        `  
Blank line — visual spacing.

**L95:** `        application.getDocuments().add(doc);`  
Executable statement: `application.getDocuments().add(doc);`

**L96:** `        repository.save(application);`  
Database access via Spring Data JPA repository (read/write H2).

**L97:** `        return doc;`  
Returns a value to the caller: `doc;`

**L98:** `    }`  
Closes the previous block/object/function.

**L99:** ``  
Blank line — visual spacing.

**L100:** `    /** Called from ReviewStep after documents are uploaded; status pending shows in AdminPanel. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L101:** `    public Application submitApplication(String applicationId, User user, SubmitRequest request) {`  
Field or method declaration: `public Application submitApplication(String applicationId, User user, …`

**L102:** `        Application application = getOwnedApplication(applicationId, user);`  
Assignment / binding: `Application application = getOwnedApplication(applicationId, user);`

**L103:** `        application.setStatus("pending");`  
Executable statement: `application.setStatus("pending");`

**L104:** `        application.setReference("TF-" + System.currentTimeMillis() % 100000000);`  
Executable statement: `application.setReference("TF-" + System.currentTimeMillis() % 10000000…`

**L105:** `        return repository.save(application);`  
Returns a value to the caller: `repository.save(application);`

**L106:** `    }`  
Closes the previous block/object/function.

**L107:** ``  
Blank line — visual spacing.

**L108:** `    /**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L109:** `     * Admin approve/decline — entry from AdminController and frontend AdminPanel buttons.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L110:** `     * Approve also creates a Loan the applicant sees on /dashboard.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L111:** `     */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L112:** `    @org.springframework.transaction.annotation.Transactional`  
Executable statement: `@org.springframework.transaction.annotation.Transactional`

**L113:** `    public Application decide(String applicationId, String decision, String note) {`  
Field or method declaration: `public Application decide(String applicationId, String decision, Strin…`

**L114:** `        Application application = repository.findById(applicationId).orElseThrow();`  
Database access via Spring Data JPA repository (read/write H2).

**L115:** `        if (!"pending".equals(application.getStatus())) {`  
Conditional — runs the following block only when the condition is true.

**L116:** `            throw new IllegalStateException("Only pending applications can be decided");`  
Throws an error — stops normal flow; caller/filter must handle it.

**L117:** `        }`  
Closes the previous block/object/function.

**L118:** `        application.setDecisionNote(note);`  
Executable statement: `application.setDecisionNote(note);`

**L119:** `        if ("approve".equalsIgnoreCase(decision)) {`  
Conditional — runs the following block only when the condition is true.

**L120:** `            application.setStatus("approved");`  
Executable statement: `application.setStatus("approved");`

**L121:** `            createLoanFromApplication(application, application.getUser());`  
Executable statement: `createLoanFromApplication(application, application.getUser());`

**L122:** `        } else if ("decline".equalsIgnoreCase(decision)) {`  
Alternate branch when the previous condition was false.

**L123:** `            application.setStatus("declined");`  
Executable statement: `application.setStatus("declined");`

**L124:** `        } else {`  
Alternate branch when the previous condition was false.

**L125:** `            throw new IllegalArgumentException("Decision must be approve or decline");`  
Throws an error — stops normal flow; caller/filter must handle it.

**L126:** `        }`  
Closes the previous block/object/function.

**L127:** `        return repository.save(application);`  
Returns a value to the caller: `repository.save(application);`

**L128:** `    }`  
Closes the previous block/object/function.

**L129:** ``  
Blank line — visual spacing.

**L130:** `    /** Builds Loan + schedule using the same rate idea as frontend loanCalc.ts. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L131:** `    private void createLoanFromApplication(Application app, User user) {`  
Field or method declaration: `private void createLoanFromApplication(Application app, User user) {`

**L132:** `        int termMonths = app.getTermMonths() == null ? 1 : Math.max(1, app.getTermMonths());`  
Assignment / binding: `int termMonths = app.getTermMonths() == null ? 1 : Math.max(1, app.get…`

**L133:** `        BigDecimal total = calculateTotalRepayable(app.getAmount(), termMonths);`  
Assignment / binding: `BigDecimal total = calculateTotalRepayable(app.getAmount(), termMonths…`

**L134:** `        BigDecimal monthlyInstalment = total.divide(BigDecimal.valueOf(termMonths), 2, RoundingMo...`  
Assignment / binding: `BigDecimal monthlyInstalment = total.divide(BigDecimal.valueOf(termMon…`

**L135:** `        `  
Blank line — visual spacing.

**L136:** `        String loanId = "LN-" + (10000 + (int)(Math.random() * 90000));`  
Assignment / binding: `String loanId = "LN-" + (10000 + (int)(Math.random() * 90000));`

**L137:** `        `  
Blank line — visual spacing.

**L138:** `        Loan loan = Loan.builder()`  
Assignment / binding: `Loan loan = Loan.builder()`

**L139:** `                .id(loanId)`  
Executable statement: `.id(loanId)`

**L140:** `                .user(user)`  
Executable statement: `.user(user)`

**L141:** `                .product(app.getProduct().equals("domestic") ? "Domestic worker loan" : "Cash loan")`  
Executable statement: `.product(app.getProduct().equals("domestic") ? "Domestic worker loan" …`

**L142:** `                .status("active")`  
Executable statement: `.status("active")`

**L143:** `                .principal(app.getAmount())`  
Executable statement: `.principal(app.getAmount())`

**L144:** `                .remaining(total)`  
Executable statement: `.remaining(total)`

**L145:** `                .termMonths(termMonths)`  
Executable statement: `.termMonths(termMonths)`

**L146:** `                .monthlyInstalment(monthlyInstalment)`  
Executable statement: `.monthlyInstalment(monthlyInstalment)`

**L147:** `                .nextPaymentDate(LocalDate.now().plusMonths(1))`  
Executable statement: `.nextPaymentDate(LocalDate.now().plusMonths(1))`

**L148:** `                .nextPaymentAmount(monthlyInstalment)`  
Executable statement: `.nextPaymentAmount(monthlyInstalment)`

**L149:** `                .build();`  
Executable statement: `.build();`

**L150:** ``  
Blank line — visual spacing.

**L151:** `        for (int month = 1; month <= termMonths; month++) {`  
Loop — repeats the block for each item / while condition holds.

**L152:** `            loan.getSchedule().add(LoanScheduleItem.builder()`  
Executable statement: `loan.getSchedule().add(LoanScheduleItem.builder()`

**L153:** `                    .loan(loan)`  
Executable statement: `.loan(loan)`

**L154:** `                    .dueDate(LocalDate.now().plusMonths(month))`  
Executable statement: `.dueDate(LocalDate.now().plusMonths(month))`

**L155:** `                    .amount(month == termMonths`  
Assignment / binding: `.amount(month == termMonths`

**L156:** `                            ? total.subtract(monthlyInstalment.multiply(BigDecimal.valueOf(termMo...`  
Executable statement: `? total.subtract(monthlyInstalment.multiply(BigDecimal.valueOf(termMon…`

**L157:** `                            : monthlyInstalment)`  
Executable statement: `: monthlyInstalment)`

**L158:** `                    .status("upcoming")`  
Executable statement: `.status("upcoming")`

**L159:** `                    .build());`  
Executable statement: `.build());`

**L160:** `        }`  
Closes the previous block/object/function.

**L161:** `        loanRepository.save(loan);`  
Database access via Spring Data JPA repository (read/write H2).

**L162:** `    }`  
Closes the previous block/object/function.

**L163:** ``  
Blank line — visual spacing.

**L164:** `    private Application getOwnedApplication(String applicationId, User user) {`  
Field or method declaration: `private Application getOwnedApplication(String applicationId, User use…`

**L165:** `        Application application = repository.findById(applicationId).orElseThrow();`  
Database access via Spring Data JPA repository (read/write H2).

**L166:** `        if (!application.getUser().getId().equals(user.getId())) {`  
Conditional — runs the following block only when the condition is true.

**L167:** `            throw new ResponseStatusException(FORBIDDEN, "You cannot access this application");`  
Throws an error — stops normal flow; caller/filter must handle it.

**L168:** `        }`  
Closes the previous block/object/function.

**L169:** `        return application;`  
Returns a value to the caller: `application;`

**L170:** `    }`  
Closes the previous block/object/function.

**L171:** ``  
Blank line — visual spacing.

**L172:** `    private BigDecimal calculateTotalRepayable(BigDecimal principal, int termMonths) {`  
Field or method declaration: `private BigDecimal calculateTotalRepayable(BigDecimal principal, int t…`

**L173:** `        if (termMonths == 1) {`  
Conditional — runs the following block only when the condition is true.

**L174:** `            return principal`  
Returns a value to the caller: `principal`

**L175:** `                    .add(principal.multiply(interestRate))`  
Executable statement: `.add(principal.multiply(interestRate))`

**L176:** `                    .setScale(2, RoundingMode.HALF_UP);`  
Executable statement: `.setScale(2, RoundingMode.HALF_UP);`

**L177:** `        }`  
Closes the previous block/object/function.

**L178:** ``  
Blank line — visual spacing.

**L179:** `        double p = principal.doubleValue();`  
Assignment / binding: `double p = principal.doubleValue();`

**L180:** `        double r = interestRate.doubleValue();`  
Assignment / binding: `double r = interestRate.doubleValue();`

**L181:** `        double factor = Math.pow(1 + r, termMonths);`  
Assignment / binding: `double factor = Math.pow(1 + r, termMonths);`

**L182:** `        double monthly = (p * r * factor) / (factor - 1);`  
Assignment / binding: `double monthly = (p * r * factor) / (factor - 1);`

**L183:** `        double total = monthly * termMonths;`  
Assignment / binding: `double total = monthly * termMonths;`

**L184:** `        return BigDecimal.valueOf(total).setScale(2, RoundingMode.HALF_UP);`  
Returns a value to the caller: `BigDecimal.valueOf(total).setScale(2, RoundingMode.HA`

**L185:** `    }`  
Closes the previous block/object/function.

**L186:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/application/SubmitRequest.java`

_15 lines_

**L1:** `package za.co.tshedza.application;`  
Java package declaration — places this class in `za.co.tshedza.application`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * JSON body for submitting an application (terms acceptance + signature).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Sent by frontend ReviewStep via apiClient.submitApplication.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L10:** ``  
Blank line — visual spacing.

**L11:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L12:** `public class SubmitRequest {`  
Declares type `public class SubmitRequest {` — container for fields and methods.

**L13:** `    private boolean acceptedTerms;`  
Field or method declaration: `private boolean acceptedTerms;`

**L14:** `    private String signature;`  
Field or method declaration: `private String signature;`

**L15:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/AuthenticationController.java`

_46 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Auth HTTP API: register, login, logout.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP (frontend)`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - POST /api/auth/register ← frontend/src/lib/apiClient.ts#register ← pages/Register.tsx`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - POST /api/auth/login    ← apiClient#login ← pages/Login.tsx`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - POST /api/auth/logout   ← apiClient#logout ← layout sign-out`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * Response shape AuthenticationResponse matches AuthResponse in frontend/src/lib/apiTypes.ts.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * Token is stored in authStore (frontend/src/store/authStore.ts) then sent as Bearer JWT.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** `import jakarta.validation.Valid;`  
Import — brings in `jakarta.validation.Valid` so this file can use it.

**L14:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L15:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L16:** `import org.springframework.web.bind.annotation.PostMapping;`  
Import — brings in `org.springframework.web.bind.annotation.PostMapping` so this file can use it.

**L17:** `import org.springframework.web.bind.annotation.RequestBody;`  
Import — brings in `org.springframework.web.bind.annotation.RequestBody` so this file can use it.

**L18:** `import org.springframework.web.bind.annotation.RequestMapping;`  
Import — brings in `org.springframework.web.bind.annotation.RequestMapping` so this file can use it.

**L19:** `import org.springframework.web.bind.annotation.RestController;`  
Import — brings in `org.springframework.web.bind.annotation.RestController` so this file can use it.

**L20:** ``  
Blank line — visual spacing.

**L21:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L22:** `@RequestMapping("/api/auth")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/auth")`.

**L23:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L24:** `public class AuthenticationController {`  
Declares type `public class AuthenticationController {` — container for fields and methods.

**L25:** ``  
Blank line — visual spacing.

**L26:** `    private final AuthenticationService service;`  
Field or method declaration: `private final AuthenticationService service;`

**L27:** ``  
Blank line — visual spacing.

**L28:** `    @PostMapping("/register")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/register")`.

**L29:** `    public ResponseEntity<AuthenticationResponse> register(`  
React Hook Form — wires inputs, validation, and submit handlers.

**L30:** `            @Valid @RequestBody RegisterRequest request`  
Annotation — framework metadata: `@Valid @RequestBody RegisterRequest request` configures behaviour for the next declaration.

**L31:** `    ) {`  
Executable statement: `) {`

**L32:** `        return ResponseEntity.ok(service.register(request));`  
React Hook Form — wires inputs, validation, and submit handlers.

**L33:** `    }`  
Closes the previous block/object/function.

**L34:** ``  
Blank line — visual spacing.

**L35:** `    @PostMapping("/login")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/login")`.

**L36:** `    public ResponseEntity<AuthenticationResponse> authenticate(`  
Field or method declaration: `public ResponseEntity<AuthenticationResponse> authenticate(`

**L37:** `            @RequestBody AuthenticationRequest request`  
Annotation — framework metadata: `@RequestBody AuthenticationRequest request` configures behaviour for the next declaration.

**L38:** `    ) {`  
Executable statement: `) {`

**L39:** `        return ResponseEntity.ok(service.authenticate(request));`  
Returns a value to the caller: `ResponseEntity.ok(service.authenticate(request));`

**L40:** `    }`  
Closes the previous block/object/function.

**L41:** ``  
Blank line — visual spacing.

**L42:** `    @PostMapping("/logout")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/logout")`.

**L43:** `    public ResponseEntity<Void> logout() {`  
Field or method declaration: `public ResponseEntity<Void> logout() {`

**L44:** `        return ResponseEntity.noContent().build();`  
Returns a value to the caller: `ResponseEntity.noContent().build();`

**L45:** `    }`  
Closes the previous block/object/function.

**L46:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/AuthenticationRequest.java`

_15 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import lombok.AllArgsConstructor;`  
Import — brings in `lombok.AllArgsConstructor` so this file can use it.

**L4:** `import lombok.Builder;`  
Import — brings in `lombok.Builder` so this file can use it.

**L5:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L6:** `import lombok.NoArgsConstructor;`  
Import — brings in `lombok.NoArgsConstructor` so this file can use it.

**L7:** ``  
Blank line — visual spacing.

**L8:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L9:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L10:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L11:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L12:** `public class AuthenticationRequest {`  
Declares type `public class AuthenticationRequest {` — container for fields and methods.

**L13:** `    private String email;`  
Field or method declaration: `private String email;`

**L14:** `    private String password;`  
Field or method declaration: `private String password;`

**L15:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/AuthenticationResponse.java`

_54 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Login/register response: JWT + public user fields (including role).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Matches frontend AuthResponse in lib/apiTypes.ts; stored by authStore.setAuth.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** `import lombok.AllArgsConstructor;`  
Import — brings in `lombok.AllArgsConstructor` so this file can use it.

**L10:** `import lombok.Builder;`  
Import — brings in `lombok.Builder` so this file can use it.

**L11:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L12:** `import lombok.NoArgsConstructor;`  
Import — brings in `lombok.NoArgsConstructor` so this file can use it.

**L13:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L14:** ``  
Blank line — visual spacing.

**L15:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L16:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L17:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L18:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L19:** `public class AuthenticationResponse {`  
Declares type `public class AuthenticationResponse {` — container for fields and methods.

**L20:** `    private String accessToken;`  
Field or method declaration: `private String accessToken;`

**L21:** `    private UserResponse user;`  
Field or method declaration: `private UserResponse user;`

**L22:** ``  
Blank line — visual spacing.

**L23:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L24:** `    @Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L25:** `    public static class UserResponse {`  
Field or method declaration: `public static class UserResponse {`

**L26:** `        private String id;`  
Field or method declaration: `private String id;`

**L27:** `        private String email;`  
Field or method declaration: `private String email;`

**L28:** `        private String firstName;`  
Field or method declaration: `private String firstName;`

**L29:** `        private String lastName;`  
Field or method declaration: `private String lastName;`

**L30:** `        private String phone;`  
Field or method declaration: `private String phone;`

**L31:** `        private String idNumberMasked;`  
Field or method declaration: `private String idNumberMasked;`

**L32:** `        private String role;`  
Field or method declaration: `private String role;`

**L33:** `    }`  
Closes the previous block/object/function.

**L34:** ``  
Blank line — visual spacing.

**L35:** `    public static AuthenticationResponse from(String token, User user) {`  
Field or method declaration: `public static AuthenticationResponse from(String token, User user) {`

**L36:** `        return AuthenticationResponse.builder()`  
Returns a value to the caller: `AuthenticationResponse.builder()`

**L37:** `                .accessToken(token)`  
Executable statement: `.accessToken(token)`

**L38:** `                .user(UserResponse.builder()`  
Executable statement: `.user(UserResponse.builder()`

**L39:** `                        .id(user.getId())`  
Executable statement: `.id(user.getId())`

**L40:** `                        .email(user.getEmail())`  
Executable statement: `.email(user.getEmail())`

**L41:** `                        .firstName(user.getFirstName())`  
Executable statement: `.firstName(user.getFirstName())`

**L42:** `                        .lastName(user.getLastName())`  
Executable statement: `.lastName(user.getLastName())`

**L43:** `                        .phone(user.getPhone())`  
Executable statement: `.phone(user.getPhone())`

**L44:** `                        .idNumberMasked(maskIdNumber(user.getIdNumber()))`  
Executable statement: `.idNumberMasked(maskIdNumber(user.getIdNumber()))`

**L45:** `                        .role(user.getRole() == null ? "USER" : user.getRole())`  
Assignment / binding: `.role(user.getRole() == null ? "USER" : user.getRole())`

**L46:** `                        .build())`  
Executable statement: `.build())`

**L47:** `                .build();`  
Executable statement: `.build();`

**L48:** `    }`  
Closes the previous block/object/function.

**L49:** ``  
Blank line — visual spacing.

**L50:** `    private static String maskIdNumber(String idNumber) {`  
Field or method declaration: `private static String maskIdNumber(String idNumber) {`

**L51:** `        if (idNumber == null || idNumber.length() < 4) return idNumber;`  
Conditional — runs the following block only when the condition is true.

**L52:** `        return "*".repeat(idNumber.length() - 4) + idNumber.substring(idNumber.length() - 4);`  
Returns a value to the caller: `"*".repeat(idNumber.length() - 4) + idNumber.substrin…`

**L53:** `    }`  
Closes the previous block/object/function.

**L54:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/AuthenticationService.java`

_52 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Creates users, verifies passwords, and issues JWTs.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Persists {@link za.co.tshedza.user.User} via UserRepository.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Token generation: {@link JwtService} (same secret as JwtAuthenticationFilter).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - Called only from {@link AuthenticationController}.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L12:** `import org.springframework.security.authentication.AuthenticationManager;`  
Import — brings in `org.springframework.security.authentication.AuthenticationManager` so this file can use it.

**L13:** `import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;`  
Import — brings in `org.springframework.security.authentication.UsernamePasswordAuthenticationToken` so this file can use it.

**L14:** `import org.springframework.security.crypto.password.PasswordEncoder;`  
Import — brings in `org.springframework.security.crypto.password.PasswordEncoder` so this file can use it.

**L15:** `import org.springframework.stereotype.Service;`  
Import — brings in `org.springframework.stereotype.Service` so this file can use it.

**L16:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L17:** `import za.co.tshedza.user.UserRepository;`  
Import — brings in `za.co.tshedza.user.UserRepository` so this file can use it.

**L18:** ``  
Blank line — visual spacing.

**L19:** `@Service`  
Spring service bean — business logic layer, injectable into controllers.

**L20:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L21:** `public class AuthenticationService {`  
Declares type `public class AuthenticationService {` — container for fields and methods.

**L22:** `    private final UserRepository repository;`  
Field or method declaration: `private final UserRepository repository;`

**L23:** `    private final PasswordEncoder passwordEncoder;`  
Hashes/verifies passwords — never store plain text.

**L24:** `    private final JwtService jwtService;`  
JWT / auth header handling — proves who the caller is.

**L25:** `    private final AuthenticationManager authenticationManager;`  
Field or method declaration: `private final AuthenticationManager authenticationManager;`

**L26:** ``  
Blank line — visual spacing.

**L27:** `    public AuthenticationResponse register(RegisterRequest request) {`  
React Hook Form — wires inputs, validation, and submit handlers.

**L28:** `        var user = User.builder()`  
Mutable variable declaration.

**L29:** `                .firstName(request.getFirstName())`  
Executable statement: `.firstName(request.getFirstName())`

**L30:** `                .lastName(request.getLastName())`  
Executable statement: `.lastName(request.getLastName())`

**L31:** `                .email(request.getEmail())`  
Executable statement: `.email(request.getEmail())`

**L32:** `                .password(passwordEncoder.encode(request.getPassword()))`  
Hashes/verifies passwords — never store plain text.

**L33:** `                .phone(request.getPhone())`  
Executable statement: `.phone(request.getPhone())`

**L34:** `                .build();`  
Executable statement: `.build();`

**L35:** `        repository.save(user);`  
Database access via Spring Data JPA repository (read/write H2).

**L36:** `        var jwtToken = jwtService.generateToken(user);`  
Mutable variable declaration.

**L37:** `        return AuthenticationResponse.from(jwtToken, user);`  
Returns a value to the caller: `AuthenticationResponse.from(jwtToken, user);`

**L38:** `    }`  
Closes the previous block/object/function.

**L39:** ``  
Blank line — visual spacing.

**L40:** `    public AuthenticationResponse authenticate(AuthenticationRequest request) {`  
Field or method declaration: `public AuthenticationResponse authenticate(AuthenticationRequest reque…`

**L41:** `        authenticationManager.authenticate(`  
Executable statement: `authenticationManager.authenticate(`

**L42:** `                new UsernamePasswordAuthenticationToken(`  
Executable statement: `new UsernamePasswordAuthenticationToken(`

**L43:** `                        request.getEmail(),`  
Executable statement: `request.getEmail(),`

**L44:** `                        request.getPassword()`  
Executable statement: `request.getPassword()`

**L45:** `                )`  
Executable statement: `)`

**L46:** `        );`  
Executable statement: `);`

**L47:** `        var user = repository.findByEmail(request.getEmail())`  
Mutable variable declaration.

**L48:** `                .orElseThrow();`  
Executable statement: `.orElseThrow();`

**L49:** `        var jwtToken = jwtService.generateToken(user);`  
Mutable variable declaration.

**L50:** `        return AuthenticationResponse.from(jwtToken, user);`  
Returns a value to the caller: `AuthenticationResponse.from(jwtToken, user);`

**L51:** `    }`  
Closes the previous block/object/function.

**L52:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/JwtAuthenticationFilter.java`

_65 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Reads {@code Authorization: Bearer <jwt>} on every request and sets Spring Security context.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Token is produced at login/register and attached by frontend/src/lib/api.ts interceptor.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Registered in SecurityConfig before UsernamePasswordAuthenticationFilter.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - UserDetails loaded from User entity (role USER / ADMIN drives /api/admin access).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** `import jakarta.servlet.FilterChain;`  
Import — brings in `jakarta.servlet.FilterChain` so this file can use it.

**L12:** `import jakarta.servlet.ServletException;`  
Import — brings in `jakarta.servlet.ServletException` so this file can use it.

**L13:** `import jakarta.servlet.http.HttpServletRequest;`  
Import — brings in `jakarta.servlet.http.HttpServletRequest` so this file can use it.

**L14:** `import jakarta.servlet.http.HttpServletResponse;`  
Import — brings in `jakarta.servlet.http.HttpServletResponse` so this file can use it.

**L15:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L16:** `import org.springframework.lang.NonNull;`  
Import — brings in `org.springframework.lang.NonNull` so this file can use it.

**L17:** `import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;`  
Import — brings in `org.springframework.security.authentication.UsernamePasswordAuthenticationToken` so this file can use it.

**L18:** `import org.springframework.security.core.context.SecurityContextHolder;`  
Import — brings in `org.springframework.security.core.context.SecurityContextHolder` so this file can use it.

**L19:** `import org.springframework.security.core.userdetails.UserDetails;`  
Import — brings in `org.springframework.security.core.userdetails.UserDetails` so this file can use it.

**L20:** `import org.springframework.security.core.userdetails.UserDetailsService;`  
Import — brings in `org.springframework.security.core.userdetails.UserDetailsService` so this file can use it.

**L21:** `import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;`  
Import — brings in `org.springframework.security.web.authentication.WebAuthenticationDetailsSource` so this file can use it.

**L22:** `import org.springframework.stereotype.Component;`  
Import — brings in `org.springframework.stereotype.Component` so this file can use it.

**L23:** `import org.springframework.web.filter.OncePerRequestFilter;`  
Import — brings in `org.springframework.web.filter.OncePerRequestFilter` so this file can use it.

**L24:** ``  
Blank line — visual spacing.

**L25:** `import java.io.IOException;`  
Import — brings in `java.io.IOException` so this file can use it.

**L26:** ``  
Blank line — visual spacing.

**L27:** `@Component`  
Annotation — framework metadata: `@Component` configures behaviour for the next declaration.

**L28:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L29:** `public class JwtAuthenticationFilter extends OncePerRequestFilter {`  
Declares type `public class JwtAuthenticationFilter extends OncePerRequestFilter {` — container for fields and methods.

**L30:** ``  
Blank line — visual spacing.

**L31:** `    private final JwtService jwtService;`  
JWT / auth header handling — proves who the caller is.

**L32:** `    private final UserDetailsService userDetailsService;`  
Field or method declaration: `private final UserDetailsService userDetailsService;`

**L33:** ``  
Blank line — visual spacing.

**L34:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L35:** `    protected void doFilterInternal(`  
Field or method declaration: `protected void doFilterInternal(`

**L36:** `            @NonNull HttpServletRequest request,`  
Annotation — framework metadata: `@NonNull HttpServletRequest request,` configures behaviour for the next declaration.

**L37:** `            @NonNull HttpServletResponse response,`  
Annotation — framework metadata: `@NonNull HttpServletResponse response,` configures behaviour for the next declaration.

**L38:** `            @NonNull FilterChain filterChain`  
Annotation — framework metadata: `@NonNull FilterChain filterChain` configures behaviour for the next declaration.

**L39:** `    ) throws ServletException, IOException {`  
Executable statement: `) throws ServletException, IOException {`

**L40:** `        final String authHeader = request.getHeader("Authorization");`  
JWT / auth header handling — proves who the caller is.

**L41:** `        final String jwt;`  
JWT / auth header handling — proves who the caller is.

**L42:** `        final String userEmail;`  
Executable statement: `final String userEmail;`

**L43:** `        if (authHeader == null || !authHeader.startsWith("Bearer ")) {`  
Conditional — runs the following block only when the condition is true.

**L44:** `            filterChain.doFilter(request, response);`  
Executable statement: `filterChain.doFilter(request, response);`

**L45:** `            return;`  
Executable statement: `return;`

**L46:** `        }`  
Closes the previous block/object/function.

**L47:** `        jwt = authHeader.substring(7);`  
JWT / auth header handling — proves who the caller is.

**L48:** `        userEmail = jwtService.extractUsername(jwt);`  
JWT / auth header handling — proves who the caller is.

**L49:** `        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {`  
Conditional — runs the following block only when the condition is true.

**L50:** `            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);`  
Assignment / binding: `UserDetails userDetails = this.userDetailsService.loadUserByUsername(u…`

**L51:** `            if (jwtService.isTokenValid(jwt, userDetails)) {`  
Conditional — runs the following block only when the condition is true.

**L52:** `                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticatio...`  
Assignment / binding: `UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAu…`

**L53:** `                        userDetails,`  
Executable statement: `userDetails,`

**L54:** `                        null,`  
Executable statement: `null,`

**L55:** `                        userDetails.getAuthorities()`  
Executable statement: `userDetails.getAuthorities()`

**L56:** `                );`  
Executable statement: `);`

**L57:** `                authToken.setDetails(`  
Executable statement: `authToken.setDetails(`

**L58:** `                        new WebAuthenticationDetailsSource().buildDetails(request)`  
Executable statement: `new WebAuthenticationDetailsSource().buildDetails(request)`

**L59:** `                );`  
Executable statement: `);`

**L60:** `                SecurityContextHolder.getContext().setAuthentication(authToken);`  
Executable statement: `SecurityContextHolder.getContext().setAuthentication(authToken);`

**L61:** `            }`  
Closes the previous block/object/function.

**L62:** `        }`  
Closes the previous block/object/function.

**L63:** `        filterChain.doFilter(request, response);`  
Executable statement: `filterChain.doFilter(request, response);`

**L64:** `    }`  
Closes the previous block/object/function.

**L65:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/JwtService.java`

_91 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Creates and validates JWT access tokens (secret + expiry from application.yml {@code app.jwt.*}).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Used by AuthenticationService (issue) and JwtAuthenticationFilter (validate).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Frontend never validates the token itself; it only stores and forwards it.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import io.jsonwebtoken.Claims;`  
Import — brings in `io.jsonwebtoken.Claims` so this file can use it.

**L11:** `import io.jsonwebtoken.Jwts;`  
Import — brings in `io.jsonwebtoken.Jwts` so this file can use it.

**L12:** `import io.jsonwebtoken.io.Decoders;`  
Import — brings in `io.jsonwebtoken.io.Decoders` so this file can use it.

**L13:** `import io.jsonwebtoken.security.Keys;`  
Import — brings in `io.jsonwebtoken.security.Keys` so this file can use it.

**L14:** `import org.springframework.beans.factory.annotation.Value;`  
Import — brings in `org.springframework.beans.factory.annotation.Value` so this file can use it.

**L15:** `import org.springframework.security.core.userdetails.UserDetails;`  
Import — brings in `org.springframework.security.core.userdetails.UserDetails` so this file can use it.

**L16:** `import org.springframework.stereotype.Service;`  
Import — brings in `org.springframework.stereotype.Service` so this file can use it.

**L17:** ``  
Blank line — visual spacing.

**L18:** `import javax.crypto.SecretKey;`  
Import — brings in `javax.crypto.SecretKey` so this file can use it.

**L19:** `import java.util.Date;`  
Import — brings in `java.util.Date` so this file can use it.

**L20:** `import java.util.HashMap;`  
Import — brings in `java.util.HashMap` so this file can use it.

**L21:** `import java.util.Map;`  
Import — brings in `java.util.Map` so this file can use it.

**L22:** `import java.util.function.Function;`  
Import — brings in `java.util.function.Function` so this file can use it.

**L23:** ``  
Blank line — visual spacing.

**L24:** `@Service`  
Spring service bean — business logic layer, injectable into controllers.

**L25:** `public class JwtService {`  
Declares type `public class JwtService {` — container for fields and methods.

**L26:** ``  
Blank line — visual spacing.

**L27:** `    @Value("${app.jwt.secret}")`  
Annotation — framework metadata: `@Value` configures behaviour for the next declaration.

**L28:** `    private String secretKey;`  
Field or method declaration: `private String secretKey;`

**L29:** ``  
Blank line — visual spacing.

**L30:** `    @Value("${app.jwt.expiration}")`  
Annotation — framework metadata: `@Value` configures behaviour for the next declaration.

**L31:** `    private long jwtExpiration;`  
JWT / auth header handling — proves who the caller is.

**L32:** ``  
Blank line — visual spacing.

**L33:** `    public String extractUsername(String token) {`  
Field or method declaration: `public String extractUsername(String token) {`

**L34:** `        return extractClaim(token, Claims::getSubject);`  
Returns a value to the caller: `extractClaim(token, Claims::getSubject);`

**L35:** `    }`  
Closes the previous block/object/function.

**L36:** ``  
Blank line — visual spacing.

**L37:** `    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {`  
Field or method declaration: `public <T> T extractClaim(String token, Function<Claims, T> claimsReso…`

**L38:** `        final Claims claims = extractAllClaims(token);`  
Assignment / binding: `final Claims claims = extractAllClaims(token);`

**L39:** `        return claimsResolver.apply(claims);`  
Returns a value to the caller: `claimsResolver.apply(claims);`

**L40:** `    }`  
Closes the previous block/object/function.

**L41:** ``  
Blank line — visual spacing.

**L42:** `    public String generateToken(UserDetails userDetails) {`  
Field or method declaration: `public String generateToken(UserDetails userDetails) {`

**L43:** `        return generateToken(new HashMap<>(), userDetails);`  
Returns a value to the caller: `generateToken(new HashMap<>(), userDetails);`

**L44:** `    }`  
Closes the previous block/object/function.

**L45:** ``  
Blank line — visual spacing.

**L46:** `    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {`  
Field or method declaration: `public String generateToken(Map<String, Object> extraClaims, UserDetai…`

**L47:** `        return buildToken(extraClaims, userDetails, jwtExpiration);`  
Returns a value to the caller: `buildToken(extraClaims, userDetails, jwtExpiration);`

**L48:** `    }`  
Closes the previous block/object/function.

**L49:** ``  
Blank line — visual spacing.

**L50:** `    private String buildToken(`  
Field or method declaration: `private String buildToken(`

**L51:** `            Map<String, Object> extraClaims,`  
Executable statement: `Map<String, Object> extraClaims,`

**L52:** `            UserDetails userDetails,`  
Executable statement: `UserDetails userDetails,`

**L53:** `            long expiration`  
Executable statement: `long expiration`

**L54:** `    ) {`  
Executable statement: `) {`

**L55:** `        return Jwts`  
Returns a value to the caller: `Jwts`

**L56:** `                .builder()`  
Executable statement: `.builder()`

**L57:** `                .claims(extraClaims)`  
Executable statement: `.claims(extraClaims)`

**L58:** `                .subject(userDetails.getUsername())`  
Executable statement: `.subject(userDetails.getUsername())`

**L59:** `                .issuedAt(new Date(System.currentTimeMillis()))`  
Executable statement: `.issuedAt(new Date(System.currentTimeMillis()))`

**L60:** `                .expiration(new Date(System.currentTimeMillis() + expiration))`  
Executable statement: `.expiration(new Date(System.currentTimeMillis() + expiration))`

**L61:** `                .signWith(getSignInKey(), Jwts.SIG.HS256)`  
JWT / auth header handling — proves who the caller is.

**L62:** `                .compact();`  
Executable statement: `.compact();`

**L63:** `    }`  
Closes the previous block/object/function.

**L64:** ``  
Blank line — visual spacing.

**L65:** `    public boolean isTokenValid(String token, UserDetails userDetails) {`  
Field or method declaration: `public boolean isTokenValid(String token, UserDetails userDetails) {`

**L66:** `        final String username = extractUsername(token);`  
Assignment / binding: `final String username = extractUsername(token);`

**L67:** `        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);`  
Returns JSX UI (or a value) to render / callers.

**L68:** `    }`  
Closes the previous block/object/function.

**L69:** ``  
Blank line — visual spacing.

**L70:** `    private boolean isTokenExpired(String token) {`  
Field or method declaration: `private boolean isTokenExpired(String token) {`

**L71:** `        return extractExpiration(token).before(new Date());`  
Returns a value to the caller: `extractExpiration(token).before(new Date());`

**L72:** `    }`  
Closes the previous block/object/function.

**L73:** ``  
Blank line — visual spacing.

**L74:** `    private Date extractExpiration(String token) {`  
Field or method declaration: `private Date extractExpiration(String token) {`

**L75:** `        return extractClaim(token, Claims::getExpiration);`  
Returns a value to the caller: `extractClaim(token, Claims::getExpiration);`

**L76:** `    }`  
Closes the previous block/object/function.

**L77:** ``  
Blank line — visual spacing.

**L78:** `    private Claims extractAllClaims(String token) {`  
Field or method declaration: `private Claims extractAllClaims(String token) {`

**L79:** `        return Jwts`  
Returns a value to the caller: `Jwts`

**L80:** `                .parser()`  
Executable statement: `.parser()`

**L81:** `                .verifyWith(getSignInKey())`  
Executable statement: `.verifyWith(getSignInKey())`

**L82:** `                .build()`  
Executable statement: `.build()`

**L83:** `                .parseSignedClaims(token)`  
Executable statement: `.parseSignedClaims(token)`

**L84:** `                .getPayload();`  
Executable statement: `.getPayload();`

**L85:** `    }`  
Closes the previous block/object/function.

**L86:** ``  
Blank line — visual spacing.

**L87:** `    private SecretKey getSignInKey() {`  
Field or method declaration: `private SecretKey getSignInKey() {`

**L88:** `        byte[] keyBytes = Decoders.BASE64.decode(secretKey);`  
Assignment / binding: `byte[] keyBytes = Decoders.BASE64.decode(secretKey);`

**L89:** `        return Keys.hmacShaKeyFor(keyBytes);`  
Returns a value to the caller: `Keys.hmacShaKeyFor(keyBytes);`

**L90:** `    }`  
Closes the previous block/object/function.

**L91:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/auth/RegisterRequest.java`

_25 lines_

**L1:** `package za.co.tshedza.auth;`  
Java package declaration — places this class in `za.co.tshedza.auth`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import jakarta.validation.constraints.Email;`  
Import — brings in `jakarta.validation.constraints.Email` so this file can use it.

**L4:** `import jakarta.validation.constraints.NotBlank;`  
Import — brings in `jakarta.validation.constraints.NotBlank` so this file can use it.

**L5:** `import lombok.AllArgsConstructor;`  
Import — brings in `lombok.AllArgsConstructor` so this file can use it.

**L6:** `import lombok.Builder;`  
Import — brings in `lombok.Builder` so this file can use it.

**L7:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L8:** `import lombok.NoArgsConstructor;`  
Import — brings in `lombok.NoArgsConstructor` so this file can use it.

**L9:** ``  
Blank line — visual spacing.

**L10:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L11:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L12:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L13:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L14:** `public class RegisterRequest {`  
Declares type `public class RegisterRequest {` — container for fields and methods.

**L15:** `    @NotBlank @Email`  
Executable statement: `@NotBlank @Email`

**L16:** `    private String email;`  
Field or method declaration: `private String email;`

**L17:** `    @NotBlank`  
Executable statement: `@NotBlank`

**L18:** `    private String password;`  
Field or method declaration: `private String password;`

**L19:** `    @NotBlank`  
Executable statement: `@NotBlank`

**L20:** `    private String firstName;`  
Field or method declaration: `private String firstName;`

**L21:** `    @NotBlank`  
Executable statement: `@NotBlank`

**L22:** `    private String lastName;`  
Field or method declaration: `private String lastName;`

**L23:** `    @NotBlank`  
Executable statement: `@NotBlank`

**L24:** `    private String phone;`  
Field or method declaration: `private String phone;`

**L25:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/common/GlobalExceptionHandler.java`

_34 lines_

**L1:** `package za.co.tshedza.common;`  
Java package declaration — places this class in `za.co.tshedza.common`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Central API error responses so frontend can show consistent failures.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Frontend surfaces many of these as form alerts (Login/Register/upload errors).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L10:** `import org.springframework.web.bind.MethodArgumentNotValidException;`  
Import — brings in `org.springframework.web.bind.MethodArgumentNotValidException` so this file can use it.

**L11:** `import org.springframework.web.bind.annotation.ExceptionHandler;`  
Import — brings in `org.springframework.web.bind.annotation.ExceptionHandler` so this file can use it.

**L12:** `import org.springframework.web.bind.annotation.RestControllerAdvice;`  
Import — brings in `org.springframework.web.bind.annotation.RestControllerAdvice` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `import java.util.HashMap;`  
Import — brings in `java.util.HashMap` so this file can use it.

**L15:** `import java.util.Map;`  
Import — brings in `java.util.Map` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `@RestControllerAdvice`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L18:** `public class GlobalExceptionHandler {`  
Declares type `public class GlobalExceptionHandler {` — container for fields and methods.

**L19:** ``  
Blank line — visual spacing.

**L20:** `    @ExceptionHandler(MethodArgumentNotValidException.class)`  
Executable statement: `@ExceptionHandler(MethodArgumentNotValidException.class)`

**L21:** `    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidE...`  
Field or method declaration: `public ResponseEntity<Map<String, String>> handleValidationExceptions(…`

**L22:** `        Map<String, String> errors = new HashMap<>();`  
Assignment / binding: `Map<String, String> errors = new HashMap<>();`

**L23:** `        ex.getBindingResult().getFieldErrors().forEach(error -> `  
JSX markup — describes HTML structure React will render.

**L24:** `            errors.put(error.getField(), error.getDefaultMessage()));`  
Executable statement: `errors.put(error.getField(), error.getDefaultMessage()));`

**L25:** `        return ResponseEntity.badRequest().body(errors);`  
Returns a value to the caller: `ResponseEntity.badRequest().body(errors);`

**L26:** `    }`  
Closes the previous block/object/function.

**L27:** ``  
Blank line — visual spacing.

**L28:** `    @ExceptionHandler(RuntimeException.class)`  
Executable statement: `@ExceptionHandler(RuntimeException.class)`

**L29:** `    public ResponseEntity<Map<String, String>> handleRuntimeExceptions(RuntimeException ex) {`  
Field or method declaration: `public ResponseEntity<Map<String, String>> handleRuntimeExceptions(Run…`

**L30:** `        Map<String, String> error = new HashMap<>();`  
Assignment / binding: `Map<String, String> error = new HashMap<>();`

**L31:** `        error.put("error", ex.getMessage());`  
Executable statement: `error.put("error", ex.getMessage());`

**L32:** `        return ResponseEntity.status(500).body(error);`  
Returns a value to the caller: `ResponseEntity.status(500).body(error);`

**L33:** `    }`  
Closes the previous block/object/function.

**L34:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/config/ApplicationConfig.java`

_52 lines_

**L1:** `package za.co.tshedza.config;`  
Java package declaration — places this class in `za.co.tshedza.config`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Spring Security beans: PasswordEncoder, AuthenticationProvider, AuthenticationManager.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - AuthenticationProvider is injected into SecurityConfig.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - UserDetailsService loads User by email for JWT login.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L11:** `import org.springframework.context.annotation.Bean;`  
Import — brings in `org.springframework.context.annotation.Bean` so this file can use it.

**L12:** `import org.springframework.context.annotation.Configuration;`  
Import — brings in `org.springframework.context.annotation.Configuration` so this file can use it.

**L13:** `import org.springframework.security.authentication.AuthenticationManager;`  
Import — brings in `org.springframework.security.authentication.AuthenticationManager` so this file can use it.

**L14:** `import org.springframework.security.authentication.AuthenticationProvider;`  
Import — brings in `org.springframework.security.authentication.AuthenticationProvider` so this file can use it.

**L15:** `import org.springframework.security.authentication.dao.DaoAuthenticationProvider;`  
Import — brings in `org.springframework.security.authentication.dao.DaoAuthenticationProvider` so this file can use it.

**L16:** `import org.springframework.security.config.annotation.authentication.configuration.Authentication...`  
Import — brings in `org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration` so this file can use it.

**L17:** `import org.springframework.security.core.userdetails.UserDetailsService;`  
Import — brings in `org.springframework.security.core.userdetails.UserDetailsService` so this file can use it.

**L18:** `import org.springframework.security.core.userdetails.UsernameNotFoundException;`  
Import — brings in `org.springframework.security.core.userdetails.UsernameNotFoundException` so this file can use it.

**L19:** `import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;`  
Import — brings in `org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder` so this file can use it.

**L20:** `import org.springframework.security.crypto.password.PasswordEncoder;`  
Import — brings in `org.springframework.security.crypto.password.PasswordEncoder` so this file can use it.

**L21:** `import za.co.tshedza.user.UserRepository;`  
Import — brings in `za.co.tshedza.user.UserRepository` so this file can use it.

**L22:** ``  
Blank line — visual spacing.

**L23:** `@Configuration`  
Annotation — framework metadata: `@Configuration` configures behaviour for the next declaration.

**L24:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L25:** `public class ApplicationConfig {`  
Declares type `public class ApplicationConfig {` — container for fields and methods.

**L26:** ``  
Blank line — visual spacing.

**L27:** `    private final UserRepository userRepository;`  
Field or method declaration: `private final UserRepository userRepository;`

**L28:** ``  
Blank line — visual spacing.

**L29:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L30:** `    public UserDetailsService userDetailsService() {`  
Field or method declaration: `public UserDetailsService userDetailsService() {`

**L31:** `        return username -> userRepository.findByEmail(username)`  
Returns a value to the caller: `username -> userRepository.findByEmail(username)`

**L32:** `                .orElseThrow(() -> new UsernameNotFoundException("User not found"));`  
Executable statement: `.orElseThrow(() -> new UsernameNotFoundException("User not found"));`

**L33:** `    }`  
Closes the previous block/object/function.

**L34:** ``  
Blank line — visual spacing.

**L35:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L36:** `    public AuthenticationProvider authenticationProvider() {`  
Field or method declaration: `public AuthenticationProvider authenticationProvider() {`

**L37:** `        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();`  
Assignment / binding: `DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider…`

**L38:** `        authProvider.setUserDetailsService(userDetailsService());`  
Executable statement: `authProvider.setUserDetailsService(userDetailsService());`

**L39:** `        authProvider.setPasswordEncoder(passwordEncoder());`  
Hashes/verifies passwords — never store plain text.

**L40:** `        return authProvider;`  
Returns a value to the caller: `authProvider;`

**L41:** `    }`  
Closes the previous block/object/function.

**L42:** ``  
Blank line — visual spacing.

**L43:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L44:** `    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws...`  
Field or method declaration: `public AuthenticationManager authenticationManager(AuthenticationConfi…`

**L45:** `        return config.getAuthenticationManager();`  
Returns a value to the caller: `config.getAuthenticationManager();`

**L46:** `    }`  
Closes the previous block/object/function.

**L47:** ``  
Blank line — visual spacing.

**L48:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L49:** `    public PasswordEncoder passwordEncoder() {`  
Hashes/verifies passwords — never store plain text.

**L50:** `        return new BCryptPasswordEncoder();`  
Returns a value to the caller: `new BCryptPasswordEncoder();`

**L51:** `    }`  
Closes the previous block/object/function.

**L52:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/config/DataInitializer.java`

_88 lines_

**L1:** `package za.co.tshedza.config;`  
Java package declaration — places this class in `za.co.tshedza.config`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Seeds demo data on first boot when the H2 database is empty.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Demo user thabo@example.com → frontend Login page / dashboard loans.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Demo admin admin@tshedza.local → frontend /admin (AdminPanel).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - Creates an example Loan so Dashboard has something to show immediately.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L12:** `import org.springframework.boot.CommandLineRunner;`  
Import — brings in `org.springframework.boot.CommandLineRunner` so this file can use it.

**L13:** `import org.springframework.security.crypto.password.PasswordEncoder;`  
Import — brings in `org.springframework.security.crypto.password.PasswordEncoder` so this file can use it.

**L14:** `import org.springframework.stereotype.Component;`  
Import — brings in `org.springframework.stereotype.Component` so this file can use it.

**L15:** `import za.co.tshedza.loan.Loan;`  
Import — brings in `za.co.tshedza.loan.Loan` so this file can use it.

**L16:** `import za.co.tshedza.loan.LoanRepository;`  
Import — brings in `za.co.tshedza.loan.LoanRepository` so this file can use it.

**L17:** `import za.co.tshedza.loan.LoanScheduleItem;`  
Import — brings in `za.co.tshedza.loan.LoanScheduleItem` so this file can use it.

**L18:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L19:** `import za.co.tshedza.user.UserRepository;`  
Import — brings in `za.co.tshedza.user.UserRepository` so this file can use it.

**L20:** ``  
Blank line — visual spacing.

**L21:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L22:** `import java.time.LocalDate;`  
Import — brings in `java.time.LocalDate` so this file can use it.

**L23:** ``  
Blank line — visual spacing.

**L24:** `@Component`  
Annotation — framework metadata: `@Component` configures behaviour for the next declaration.

**L25:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L26:** `public class DataInitializer implements CommandLineRunner {`  
Declares type `public class DataInitializer implements CommandLineRunner {` — container for fields and methods.

**L27:** ``  
Blank line — visual spacing.

**L28:** `    private final UserRepository userRepository;`  
Field or method declaration: `private final UserRepository userRepository;`

**L29:** `    private final LoanRepository loanRepository;`  
Field or method declaration: `private final LoanRepository loanRepository;`

**L30:** `    private final PasswordEncoder passwordEncoder;`  
Hashes/verifies passwords — never store plain text.

**L31:** ``  
Blank line — visual spacing.

**L32:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L33:** `    public void run(String... args) {`  
Field or method declaration: `public void run(String... args) {`

**L34:** `        if (userRepository.findByEmail("thabo@example.com").isEmpty()) {`  
Conditional — runs the following block only when the condition is true.

**L35:** `            User user = User.builder()`  
Assignment / binding: `User user = User.builder()`

**L36:** `                    .email("thabo@example.com")`  
Executable statement: `.email("thabo@example.com")`

**L37:** `                    .password(passwordEncoder.encode("Password123!"))`  
Hashes/verifies passwords — never store plain text.

**L38:** `                    .firstName("Thabo")`  
Executable statement: `.firstName("Thabo")`

**L39:** `                    .lastName("Molefe")`  
Executable statement: `.lastName("Molefe")`

**L40:** `                    .phone("0825550142")`  
Executable statement: `.phone("0825550142")`

**L41:** `                    .idNumber("9001015800088")`  
Executable statement: `.idNumber("9001015800088")`

**L42:** `                    .role("USER")`  
Executable statement: `.role("USER")`

**L43:** `                    .build();`  
Executable statement: `.build();`

**L44:** `            userRepository.save(user);`  
Database access via Spring Data JPA repository (read/write H2).

**L45:** ``  
Blank line — visual spacing.

**L46:** `            Loan loan = Loan.builder()`  
Assignment / binding: `Loan loan = Loan.builder()`

**L47:** `                    .id("LN-20481")`  
Executable statement: `.id("LN-20481")`

**L48:** `                    .user(user)`  
Executable statement: `.user(user)`

**L49:** `                    .product("Cash loan")`  
Executable statement: `.product("Cash loan")`

**L50:** `                    .status("active")`  
Executable statement: `.status("active")`

**L51:** `                    .principal(new BigDecimal("8000.00"))`  
Executable statement: `.principal(new BigDecimal("8000.00"))`

**L52:** `                    .remaining(new BigDecimal("5340.50"))`  
Executable statement: `.remaining(new BigDecimal("5340.50"))`

**L53:** `                    .termMonths(1)`  
Executable statement: `.termMonths(1)`

**L54:** `                    .monthlyInstalment(new BigDecimal("1780.17"))`  
Executable statement: `.monthlyInstalment(new BigDecimal("1780.17"))`

**L55:** `                    .nextPaymentDate(LocalDate.now().plusDays(14))`  
Executable statement: `.nextPaymentDate(LocalDate.now().plusDays(14))`

**L56:** `                    .nextPaymentAmount(new BigDecimal("1780.17"))`  
Executable statement: `.nextPaymentAmount(new BigDecimal("1780.17"))`

**L57:** `                    .build();`  
Executable statement: `.build();`

**L58:** ``  
Blank line — visual spacing.

**L59:** `            loan.getSchedule().add(LoanScheduleItem.builder()`  
Executable statement: `loan.getSchedule().add(LoanScheduleItem.builder()`

**L60:** `                    .loan(loan)`  
Executable statement: `.loan(loan)`

**L61:** `                    .dueDate(LocalDate.now().minusMonths(1))`  
Executable statement: `.dueDate(LocalDate.now().minusMonths(1))`

**L62:** `                    .amount(new BigDecimal("1780.17"))`  
Executable statement: `.amount(new BigDecimal("1780.17"))`

**L63:** `                    .status("paid")`  
Executable statement: `.status("paid")`

**L64:** `                    .build());`  
Executable statement: `.build());`

**L65:** ``  
Blank line — visual spacing.

**L66:** `            loan.getSchedule().add(LoanScheduleItem.builder()`  
Executable statement: `loan.getSchedule().add(LoanScheduleItem.builder()`

**L67:** `                    .loan(loan)`  
Executable statement: `.loan(loan)`

**L68:** `                    .dueDate(loan.getNextPaymentDate())`  
Executable statement: `.dueDate(loan.getNextPaymentDate())`

**L69:** `                    .amount(new BigDecimal("1780.17"))`  
Executable statement: `.amount(new BigDecimal("1780.17"))`

**L70:** `                    .status("upcoming")`  
Executable statement: `.status("upcoming")`

**L71:** `                    .build());`  
Executable statement: `.build());`

**L72:** ``  
Blank line — visual spacing.

**L73:** `            loanRepository.save(loan);`  
Database access via Spring Data JPA repository (read/write H2).

**L74:** `        }`  
Closes the previous block/object/function.

**L75:** ``  
Blank line — visual spacing.

**L76:** `        if (userRepository.findByEmail("admin@tshedza.local").isEmpty()) {`  
Conditional — runs the following block only when the condition is true.

**L77:** `            User admin = User.builder()`  
Assignment / binding: `User admin = User.builder()`

**L78:** `                    .email("admin@tshedza.local")`  
Executable statement: `.email("admin@tshedza.local")`

**L79:** `                    .password(passwordEncoder.encode("Admin123!"))`  
Hashes/verifies passwords — never store plain text.

**L80:** `                    .firstName("Admin")`  
Executable statement: `.firstName("Admin")`

**L81:** `                    .lastName("User")`  
Executable statement: `.lastName("User")`

**L82:** `                    .phone("0800000000")`  
Executable statement: `.phone("0800000000")`

**L83:** `                    .role("ADMIN")`  
Executable statement: `.role("ADMIN")`

**L84:** `                    .build();`  
Executable statement: `.build();`

**L85:** `            userRepository.save(admin);`  
Database access via Spring Data JPA repository (read/write H2).

**L86:** `        }`  
Closes the previous block/object/function.

**L87:** `    }`  
Closes the previous block/object/function.

**L88:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/config/SecurityConfig.java`

_75 lines_

**L1:** `package za.co.tshedza.config;`  
Java package declaration — places this class in `za.co.tshedza.config`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * HTTP security, CORS, and JWT filter wiring.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Frontend origin allowed: http://localhost:5173 and http://127.0.0.1:5173`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` *   (Vite dev server in frontend/).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - Public endpoints (no JWT): /api/auth/**, /api/transfers/**, /api/debt-review/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * - Admin-only: /api/admin/** → requires ROLE_ADMIN (frontend RequireAdmin + AdminPanel).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * - JWT is attached by frontend axios interceptor (frontend/src/lib/api.ts) and`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` *   validated here by {@link za.co.tshedza.auth.JwtAuthenticationFilter}.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L14:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L15:** `import org.springframework.context.annotation.Bean;`  
Import — brings in `org.springframework.context.annotation.Bean` so this file can use it.

**L16:** `import org.springframework.context.annotation.Configuration;`  
Import — brings in `org.springframework.context.annotation.Configuration` so this file can use it.

**L17:** `import org.springframework.security.authentication.AuthenticationProvider;`  
Import — brings in `org.springframework.security.authentication.AuthenticationProvider` so this file can use it.

**L18:** `import org.springframework.security.config.annotation.web.builders.HttpSecurity;`  
Import — brings in `org.springframework.security.config.annotation.web.builders.HttpSecurity` so this file can use it.

**L19:** `import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;`  
Import — brings in `org.springframework.security.config.annotation.web.configuration.EnableWebSecurity` so this file can use it.

**L20:** `import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;`  
Import — brings in `org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer` so this file can use it.

**L21:** `import org.springframework.security.config.http.SessionCreationPolicy;`  
Import — brings in `org.springframework.security.config.http.SessionCreationPolicy` so this file can use it.

**L22:** `import org.springframework.security.web.SecurityFilterChain;`  
Import — brings in `org.springframework.security.web.SecurityFilterChain` so this file can use it.

**L23:** `import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;`  
Import — brings in `org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter` so this file can use it.

**L24:** `import org.springframework.web.cors.CorsConfiguration;`  
Import — brings in `org.springframework.web.cors.CorsConfiguration` so this file can use it.

**L25:** `import org.springframework.web.cors.CorsConfigurationSource;`  
Import — brings in `org.springframework.web.cors.CorsConfigurationSource` so this file can use it.

**L26:** `import org.springframework.web.cors.UrlBasedCorsConfigurationSource;`  
Import — brings in `org.springframework.web.cors.UrlBasedCorsConfigurationSource` so this file can use it.

**L27:** `import za.co.tshedza.auth.JwtAuthenticationFilter;`  
Import — brings in `za.co.tshedza.auth.JwtAuthenticationFilter` so this file can use it.

**L28:** ``  
Blank line — visual spacing.

**L29:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L30:** ``  
Blank line — visual spacing.

**L31:** `@Configuration`  
Annotation — framework metadata: `@Configuration` configures behaviour for the next declaration.

**L32:** `@EnableWebSecurity`  
Annotation — framework metadata: `@EnableWebSecurity` configures behaviour for the next declaration.

**L33:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L34:** `public class SecurityConfig {`  
Declares type `public class SecurityConfig {` — container for fields and methods.

**L35:** ``  
Blank line — visual spacing.

**L36:** `    private final JwtAuthenticationFilter jwtAuthFilter;`  
JWT / auth header handling — proves who the caller is.

**L37:** `    private final AuthenticationProvider authenticationProvider;`  
Field or method declaration: `private final AuthenticationProvider authenticationProvider;`

**L38:** ``  
Blank line — visual spacing.

**L39:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L40:** `    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {`  
Field or method declaration: `public SecurityFilterChain securityFilterChain(HttpSecurity http) thro…`

**L41:** `        http`  
Executable statement: `http`

**L42:** `                .csrf(AbstractHttpConfigurer::disable)`  
Executable statement: `.csrf(AbstractHttpConfigurer::disable)`

**L43:** `                .cors(cors -> cors.configurationSource(corsConfigurationSource()))`  
Executable statement: `.cors(cors -> cors.configurationSource(corsConfigurationSource()))`

**L44:** `                .authorizeHttpRequests(auth -> auth`  
Executable statement: `.authorizeHttpRequests(auth -> auth`

**L45:** `                        .requestMatchers(`  
Executable statement: `.requestMatchers(`

**L46:** `                                "/api/auth/**",`  
Executable statement: `"/api/auth/**",`

**L47:** `                                "/api/transfers/**",`  
Executable statement: `"/api/transfers/**",`

**L48:** `                                "/api/debt-review/**",`  
Executable statement: `"/api/debt-review/**",`

**L49:** `                                "/h2-console/**"`  
Executable statement: `"/h2-console/**"`

**L50:** `                        ).permitAll()`  
Executable statement: `).permitAll()`

**L51:** `                        .requestMatchers("/api/admin/**").hasRole("ADMIN")`  
Executable statement: `.requestMatchers("/api/admin/**").hasRole("ADMIN")`

**L52:** `                        .anyRequest().authenticated()`  
Executable statement: `.anyRequest().authenticated()`

**L53:** `                )`  
Executable statement: `)`

**L54:** `                .sessionManagement(session -> session`  
Executable statement: `.sessionManagement(session -> session`

**L55:** `                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)`  
Executable statement: `.sessionCreationPolicy(SessionCreationPolicy.STATELESS)`

**L56:** `                )`  
Executable statement: `)`

**L57:** `                .authenticationProvider(authenticationProvider)`  
Executable statement: `.authenticationProvider(authenticationProvider)`

**L58:** `                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)`  
JWT / auth header handling — proves who the caller is.

**L59:** `                .headers(headers -> headers.frameOptions(frame -> frame.disable())); // For H2 co...`  
Executable statement: `.headers(headers -> headers.frameOptions(frame -> frame.disable())); /…`

**L60:** ``  
Blank line — visual spacing.

**L61:** `        return http.build();`  
Returns a value to the caller: `http.build();`

**L62:** `    }`  
Closes the previous block/object/function.

**L63:** ``  
Blank line — visual spacing.

**L64:** `    @Bean`  
Annotation — framework metadata: `@Bean` configures behaviour for the next declaration.

**L65:** `    public CorsConfigurationSource corsConfigurationSource() {`  
Field or method declaration: `public CorsConfigurationSource corsConfigurationSource() {`

**L66:** `        CorsConfiguration configuration = new CorsConfiguration();`  
Assignment / binding: `CorsConfiguration configuration = new CorsConfiguration();`

**L67:** `        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));`  
Executable statement: `configuration.setAllowedOrigins(List.of("http://localhost:5173", "http…`

**L68:** `        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS...`  
Executable statement: `configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH",…`

**L69:** `        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));`  
JWT / auth header handling — proves who the caller is.

**L70:** `        configuration.setAllowCredentials(true);`  
Executable statement: `configuration.setAllowCredentials(true);`

**L71:** `        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();`  
Assignment / binding: `UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfiguration…`

**L72:** `        source.registerCorsConfiguration("/**", configuration);`  
Executable statement: `source.registerCorsConfiguration("/**", configuration);`

**L73:** `        return source;`  
Returns a value to the caller: `source;`

**L74:** `    }`  
Closes the previous block/object/function.

**L75:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/debtreview/DebtReviewController.java`

_29 lines_

**L1:** `package za.co.tshedza.debtreview;`  
Java package declaration — places this class in `za.co.tshedza.debtreview`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Debt-review consultation requests (public — no JWT required).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - POST /api/debt-review ← apiClient#createDebtReview ← pages/DebtReview.tsx`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Listed for admins via AdminController GET /api/admin/debt-reviews.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L11:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L12:** `import org.springframework.web.bind.annotation.PostMapping;`  
Import — brings in `org.springframework.web.bind.annotation.PostMapping` so this file can use it.

**L13:** `import org.springframework.web.bind.annotation.RequestBody;`  
Import — brings in `org.springframework.web.bind.annotation.RequestBody` so this file can use it.

**L14:** `import org.springframework.web.bind.annotation.RequestMapping;`  
Import — brings in `org.springframework.web.bind.annotation.RequestMapping` so this file can use it.

**L15:** `import org.springframework.web.bind.annotation.RestController;`  
Import — brings in `org.springframework.web.bind.annotation.RestController` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L18:** `@RequestMapping("/api/debt-review")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/debt-review")`.

**L19:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L20:** `public class DebtReviewController {`  
Declares type `public class DebtReviewController {` — container for fields and methods.

**L21:** ``  
Blank line — visual spacing.

**L22:** `    private final DebtReviewRepository repository;`  
Field or method declaration: `private final DebtReviewRepository repository;`

**L23:** ``  
Blank line — visual spacing.

**L24:** `    @PostMapping`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping`.

**L25:** `    public ResponseEntity<DebtReviewRequest> create(@RequestBody DebtReviewRequest request) {`  
Field or method declaration: `public ResponseEntity<DebtReviewRequest> create(@RequestBody DebtRevie…`

**L26:** `        request.setStatus("received");`  
Executable statement: `request.setStatus("received");`

**L27:** `        return ResponseEntity.ok(repository.save(request));`  
Returns a value to the caller: `ResponseEntity.ok(repository.save(request));`

**L28:** `    }`  
Closes the previous block/object/function.

**L29:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/debtreview/DebtReviewRepository.java`

_9 lines_

**L1:** `package za.co.tshedza.debtreview;`  
Java package declaration — places this class in `za.co.tshedza.debtreview`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface DebtReviewRepository extends JpaRepository<DebtReviewRequest, String> {`  
Declares type `public interface DebtReviewRepository extends JpaRepository<DebtReviewRequest, String> {` — container for fields and methods.

**L7:** `    List<DebtReviewRequest> findTop25ByOrderByCreatedAtDesc();`  
Executable statement: `List<DebtReviewRequest> findTop25ByOrderByCreatedAtDesc();`

**L8:** `    long countByStatus(String status);`  
Executable statement: `long countByStatus(String status);`

**L9:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/debtreview/DebtReviewRequest.java`

_30 lines_

**L1:** `package za.co.tshedza.debtreview;`  
Java package declaration — places this class in `za.co.tshedza.debtreview`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L4:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `import java.time.LocalDateTime;`  
Import — brings in `java.time.LocalDateTime` so this file can use it.

**L7:** ``  
Blank line — visual spacing.

**L8:** `@Entity`  
JPA entity — this class maps to a database table.

**L9:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L10:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L11:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L12:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L13:** `public class DebtReviewRequest {`  
Declares type `public class DebtReviewRequest {` — container for fields and methods.

**L14:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L15:** `    @GeneratedValue(strategy = GenerationType.UUID)`  
Annotation — framework metadata: `@GeneratedValue` configures behaviour for the next declaration.

**L16:** `    private String id;`  
Field or method declaration: `private String id;`

**L17:** ``  
Blank line — visual spacing.

**L18:** `    private String fullName;`  
Field or method declaration: `private String fullName;`

**L19:** `    private String phone;`  
Field or method declaration: `private String phone;`

**L20:** `    private String email;`  
Field or method declaration: `private String email;`

**L21:** `    @Column(length = 1000)`  
Annotation — framework metadata: `@Column` configures behaviour for the next declaration.

**L22:** `    private String situation;`  
Field or method declaration: `private String situation;`

**L23:** `    private String status;`  
Field or method declaration: `private String status;`

**L24:** `    private LocalDateTime createdAt;`  
Field or method declaration: `private LocalDateTime createdAt;`

**L25:** ``  
Blank line — visual spacing.

**L26:** `    @PrePersist`  
Annotation — framework metadata: `@PrePersist` configures behaviour for the next declaration.

**L27:** `    protected void onCreate() {`  
Field or method declaration: `protected void onCreate() {`

**L28:** `        createdAt = LocalDateTime.now();`  
Assignment / binding: `createdAt = LocalDateTime.now();`

**L29:** `    }`  
Closes the previous block/object/function.

**L30:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/Loan.java`

_45 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Active / paid loan entity shown on the user dashboard and admin loans table.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Created from ApplicationService.createLoanFromApplication after admin approve.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - schedule list ← LoanScheduleItem rows (JSON to frontend Loan.schedule).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - remaining / nextPayment* updated by LoanController.makeRepayment.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L12:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L13:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L14:** ``  
Blank line — visual spacing.

**L15:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L16:** `import java.time.LocalDate;`  
Import — brings in `java.time.LocalDate` so this file can use it.

**L17:** `import java.util.ArrayList;`  
Import — brings in `java.util.ArrayList` so this file can use it.

**L18:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `@Entity`  
JPA entity — this class maps to a database table.

**L21:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L22:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L23:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L24:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L25:** `public class Loan {`  
Declares type `public class Loan {` — container for fields and methods.

**L26:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L27:** `    private String id; // LN-20481`  
Field or method declaration: `private String id; // LN-20481`

**L28:** ``  
Blank line — visual spacing.

**L29:** `    @ManyToOne`  
Annotation — framework metadata: `@ManyToOne` configures behaviour for the next declaration.

**L30:** `    @JoinColumn(name = "user_id")`  
Annotation — framework metadata: `@JoinColumn` configures behaviour for the next declaration.

**L31:** `    private User user;`  
Field or method declaration: `private User user;`

**L32:** ``  
Blank line — visual spacing.

**L33:** `    private String product;`  
Field or method declaration: `private String product;`

**L34:** `    private String status; // active, overdue, paid`  
Field or method declaration: `private String status; // active, overdue, paid`

**L35:** `    private BigDecimal principal;`  
Field or method declaration: `private BigDecimal principal;`

**L36:** `    private BigDecimal remaining;`  
Field or method declaration: `private BigDecimal remaining;`

**L37:** `    private Integer termMonths;`  
Field or method declaration: `private Integer termMonths;`

**L38:** `    private BigDecimal monthlyInstalment;`  
Field or method declaration: `private BigDecimal monthlyInstalment;`

**L39:** `    private LocalDate nextPaymentDate;`  
Field or method declaration: `private LocalDate nextPaymentDate;`

**L40:** `    private BigDecimal nextPaymentAmount;`  
Field or method declaration: `private BigDecimal nextPaymentAmount;`

**L41:** ``  
Blank line — visual spacing.

**L42:** `    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)`  
Annotation — framework metadata: `@OneToMany` configures behaviour for the next declaration.

**L43:** `    @Builder.Default`  
Annotation — framework metadata: `@Builder.Default` configures behaviour for the next declaration.

**L44:** `    private List<LoanScheduleItem> schedule = new ArrayList<>();`  
Field or method declaration: `private List<LoanScheduleItem> schedule = new ArrayList<>();`

**L45:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/LoanController.java`

_93 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * User-facing loans and repayments API (authenticated owner only).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP (frontend dashboard)`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - GET  /api/loans           ← apiClient#fetchLoans ← DashboardPage`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - GET  /api/loans/{id}      ← apiClient#fetchLoan ← LoanDetailPage`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - GET  /api/repayments      ← apiClient#fetchRepayments ← RepaymentsPage`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * - POST /api/repayments      ← apiClient#makeRepayment ← loan detail pay action`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * Loans are usually created when an admin approves an application (ApplicationService.decide).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L14:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L15:** `import org.springframework.security.core.annotation.AuthenticationPrincipal;`  
Import — brings in `org.springframework.security.core.annotation.AuthenticationPrincipal` so this file can use it.

**L16:** `import org.springframework.web.bind.annotation.*;`  
Import — brings in `org.springframework.web.bind.annotation.` so this file can use it.

**L17:** `import za.co.tshedza.user.User;`  
Import — brings in `za.co.tshedza.user.User` so this file can use it.

**L18:** ``  
Blank line — visual spacing.

**L19:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L20:** `import java.time.LocalDateTime;`  
Import — brings in `java.time.LocalDateTime` so this file can use it.

**L21:** `import java.util.HashMap;`  
Import — brings in `java.util.HashMap` so this file can use it.

**L22:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L23:** `import java.util.Map;`  
Import — brings in `java.util.Map` so this file can use it.

**L24:** ``  
Blank line — visual spacing.

**L25:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L26:** `@RequestMapping("/api")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api")`.

**L27:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L28:** `public class LoanController {`  
Declares type `public class LoanController {` — container for fields and methods.

**L29:** ``  
Blank line — visual spacing.

**L30:** `    private final LoanRepository loanRepository;`  
Field or method declaration: `private final LoanRepository loanRepository;`

**L31:** `    private final RepaymentRepository repaymentRepository;`  
Field or method declaration: `private final RepaymentRepository repaymentRepository;`

**L32:** ``  
Blank line — visual spacing.

**L33:** `    @GetMapping("/loans")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/loans")`.

**L34:** `    public ResponseEntity<Map<String, Object>> getLoans(@AuthenticationPrincipal User user) {`  
Field or method declaration: `public ResponseEntity<Map<String, Object>> getLoans(@AuthenticationPri…`

**L35:** `        List<Loan> loans = loanRepository.findByUserId(user.getId());`  
Database access via Spring Data JPA repository (read/write H2).

**L36:** `        Map<String, Object> response = new HashMap<>();`  
Assignment / binding: `Map<String, Object> response = new HashMap<>();`

**L37:** `        response.put("loans", loans);`  
Executable statement: `response.put("loans", loans);`

**L38:** `        return ResponseEntity.ok(response);`  
Returns a value to the caller: `ResponseEntity.ok(response);`

**L39:** `    }`  
Closes the previous block/object/function.

**L40:** ``  
Blank line — visual spacing.

**L41:** `    @GetMapping("/loans/{id}")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/loans/{id}")`.

**L42:** `    public ResponseEntity<Loan> getLoan(`  
Field or method declaration: `public ResponseEntity<Loan> getLoan(`

**L43:** `            @PathVariable String id,`  
Annotation — framework metadata: `@PathVariable String id,` configures behaviour for the next declaration.

**L44:** `            @AuthenticationPrincipal User user`  
Annotation — framework metadata: `@AuthenticationPrincipal User user` configures behaviour for the next declaration.

**L45:** `    ) {`  
Executable statement: `) {`

**L46:** `        Loan loan = loanRepository.findById(id).orElseThrow();`  
Database access via Spring Data JPA repository (read/write H2).

**L47:** `        if (!loan.getUser().getId().equals(user.getId())) {`  
Conditional — runs the following block only when the condition is true.

**L48:** `            return ResponseEntity.status(403).build();`  
Returns a value to the caller: `ResponseEntity.status(403).build();`

**L49:** `        }`  
Closes the previous block/object/function.

**L50:** `        return ResponseEntity.ok(loan);`  
Returns a value to the caller: `ResponseEntity.ok(loan);`

**L51:** `    }`  
Closes the previous block/object/function.

**L52:** ``  
Blank line — visual spacing.

**L53:** `    @GetMapping("/repayments")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/repayments")`.

**L54:** `    public ResponseEntity<List<Repayment>> getRepayments(@AuthenticationPrincipal User user) {`  
Field or method declaration: `public ResponseEntity<List<Repayment>> getRepayments(@AuthenticationPr…`

**L55:** `        return ResponseEntity.ok(repaymentRepository.findByLoanUserIdOrderByDateDesc(user.getId()));`  
Returns a value to the caller: `ResponseEntity.ok(repaymentRepository.findByLoanUserI…`

**L56:** `    }`  
Closes the previous block/object/function.

**L57:** ``  
Blank line — visual spacing.

**L58:** `    @PostMapping("/repayments")`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping("/repayments")`.

**L59:** `    public ResponseEntity<Repayment> makeRepayment(`  
Field or method declaration: `public ResponseEntity<Repayment> makeRepayment(`

**L60:** `            @AuthenticationPrincipal User user,`  
Annotation — framework metadata: `@AuthenticationPrincipal User user,` configures behaviour for the next declaration.

**L61:** `            @RequestBody Map<String, String> request`  
Annotation — framework metadata: `@RequestBody Map<String, String> request` configures behaviour for the next declaration.

**L62:** `    ) {`  
Executable statement: `) {`

**L63:** `        String loanId = request.get("loanId");`  
Assignment / binding: `String loanId = request.get("loanId");`

**L64:** `        Loan loan = loanRepository.findById(loanId).orElseThrow();`  
Database access via Spring Data JPA repository (read/write H2).

**L65:** `        if (!loan.getUser().getId().equals(user.getId())) {`  
Conditional — runs the following block only when the condition is true.

**L66:** `            return ResponseEntity.status(403).build();`  
Returns a value to the caller: `ResponseEntity.status(403).build();`

**L67:** `        }`  
Closes the previous block/object/function.

**L68:** `        `  
Blank line — visual spacing.

**L69:** `        Repayment repayment = Repayment.builder()`  
Assignment / binding: `Repayment repayment = Repayment.builder()`

**L70:** `                .id("PAY-" + (1000 + (int)(Math.random() * 9000)))`  
Executable statement: `.id("PAY-" + (1000 + (int)(Math.random() * 9000)))`

**L71:** `                .loan(loan)`  
Executable statement: `.loan(loan)`

**L72:** `                .date(LocalDateTime.now())`  
Executable statement: `.date(LocalDateTime.now())`

**L73:** `                .amount(loan.getNextPaymentAmount())`  
Executable statement: `.amount(loan.getNextPaymentAmount())`

**L74:** `                .method("EFT")`  
Executable statement: `.method("EFT")`

**L75:** `                .status("cleared")`  
Executable statement: `.status("cleared")`

**L76:** `                .build();`  
Executable statement: `.build();`

**L77:** ``  
Blank line — visual spacing.

**L78:** `        // Update loan status for demo`  
Inline comment documenting intent.

**L79:** `        loan.setRemaining(loan.getRemaining().subtract(repayment.getAmount()));`  
Executable statement: `loan.setRemaining(loan.getRemaining().subtract(repayment.getAmount()))…`

**L80:** `        if (loan.getRemaining().compareTo(BigDecimal.ZERO) <= 0) {`  
Conditional — runs the following block only when the condition is true.

**L81:** `            loan.setStatus("paid");`  
Executable statement: `loan.setStatus("paid");`

**L82:** `            loan.setRemaining(BigDecimal.ZERO);`  
Executable statement: `loan.setRemaining(BigDecimal.ZERO);`

**L83:** `        }`  
Closes the previous block/object/function.

**L84:** `        `  
Blank line — visual spacing.

**L85:** `        loan.getSchedule().stream()`  
Executable statement: `loan.getSchedule().stream()`

**L86:** `            .filter(i -> i.getStatus().equals("upcoming"))`  
Executable statement: `.filter(i -> i.getStatus().equals("upcoming"))`

**L87:** `            .findFirst()`  
Executable statement: `.findFirst()`

**L88:** `            .ifPresent(i -> i.setStatus("paid"));`  
Executable statement: `.ifPresent(i -> i.setStatus("paid"));`

**L89:** ``  
Blank line — visual spacing.

**L90:** `        loanRepository.save(loan);`  
Database access via Spring Data JPA repository (read/write H2).

**L91:** `        return ResponseEntity.ok(repaymentRepository.save(repayment));`  
Returns a value to the caller: `ResponseEntity.ok(repaymentRepository.save(repayment)`

**L92:** `    }`  
Closes the previous block/object/function.

**L93:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/LoanRepository.java`

_9 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface LoanRepository extends JpaRepository<Loan, String> {`  
Declares type `public interface LoanRepository extends JpaRepository<Loan, String> {` — container for fields and methods.

**L7:** `    List<Loan> findByUserId(String userId);`  
Executable statement: `List<Loan> findByUserId(String userId);`

**L8:** `    long countByStatus(String status);`  
Executable statement: `long countByStatus(String status);`

**L9:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/LoanScheduleItem.java`

_35 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * One instalment row on a loan repayment schedule.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Built when ApplicationService creates a loan after admin approval.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Marked paid by LoanController.makeRepayment; shown on LoanDetailPage.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import com.fasterxml.jackson.annotation.JsonIgnore;`  
Import — brings in `com.fasterxml.jackson.annotation.JsonIgnore` so this file can use it.

**L11:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L12:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L15:** `import java.time.LocalDate;`  
Import — brings in `java.time.LocalDate` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `@Entity`  
JPA entity — this class maps to a database table.

**L18:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L19:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L20:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L21:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L22:** `public class LoanScheduleItem {`  
Declares type `public class LoanScheduleItem {` — container for fields and methods.

**L23:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L24:** `    @GeneratedValue(strategy = GenerationType.IDENTITY)`  
Annotation — framework metadata: `@GeneratedValue` configures behaviour for the next declaration.

**L25:** `    private Long id;`  
Field or method declaration: `private Long id;`

**L26:** ``  
Blank line — visual spacing.

**L27:** `    @ManyToOne`  
Annotation — framework metadata: `@ManyToOne` configures behaviour for the next declaration.

**L28:** `    @JoinColumn(name = "loan_id")`  
Annotation — framework metadata: `@JoinColumn` configures behaviour for the next declaration.

**L29:** `    @JsonIgnore`  
Annotation — framework metadata: `@JsonIgnore` configures behaviour for the next declaration.

**L30:** `    private Loan loan;`  
Field or method declaration: `private Loan loan;`

**L31:** ``  
Blank line — visual spacing.

**L32:** `    private LocalDate dueDate;`  
Field or method declaration: `private LocalDate dueDate;`

**L33:** `    private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L34:** `    private String status; // paid, upcoming, overdue`  
Field or method declaration: `private String status; // paid, upcoming, overdue`

**L35:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/Repayment.java`

_35 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Recorded repayment transaction against a loan.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Created by POST /api/repayments (LoanController) from Dashboard pay action.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Listed by GET /api/repayments on RepaymentsPage.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import com.fasterxml.jackson.annotation.JsonIgnore;`  
Import — brings in `com.fasterxml.jackson.annotation.JsonIgnore` so this file can use it.

**L11:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L12:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L15:** `import java.time.LocalDateTime;`  
Import — brings in `java.time.LocalDateTime` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `@Entity`  
JPA entity — this class maps to a database table.

**L18:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L19:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L20:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L21:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L22:** `public class Repayment {`  
Declares type `public class Repayment {` — container for fields and methods.

**L23:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L24:** `    private String id; // PAY-991`  
Field or method declaration: `private String id; // PAY-991`

**L25:** ``  
Blank line — visual spacing.

**L26:** `    @ManyToOne`  
Annotation — framework metadata: `@ManyToOne` configures behaviour for the next declaration.

**L27:** `    @JoinColumn(name = "loan_id")`  
Annotation — framework metadata: `@JoinColumn` configures behaviour for the next declaration.

**L28:** `    @JsonIgnore`  
Annotation — framework metadata: `@JsonIgnore` configures behaviour for the next declaration.

**L29:** `    private Loan loan;`  
Field or method declaration: `private Loan loan;`

**L30:** ``  
Blank line — visual spacing.

**L31:** `    private LocalDateTime date;`  
Field or method declaration: `private LocalDateTime date;`

**L32:** `    private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L33:** `    private String method;`  
Field or method declaration: `private String method;`

**L34:** `    private String status; // cleared`  
Field or method declaration: `private String status; // cleared`

**L35:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/loan/RepaymentRepository.java`

_8 lines_

**L1:** `package za.co.tshedza.loan;`  
Java package declaration — places this class in `za.co.tshedza.loan`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface RepaymentRepository extends JpaRepository<Repayment, String> {`  
Declares type `public interface RepaymentRepository extends JpaRepository<Repayment, String> {` — container for fields and methods.

**L7:** `    List<Repayment> findByLoanUserIdOrderByDateDesc(String userId);`  
Executable statement: `List<Repayment> findByLoanUserIdOrderByDateDesc(String userId);`

**L8:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/transfer/Transfer.java`

_33 lines_

**L1:** `package za.co.tshedza.transfer;`  
Java package declaration — places this class in `za.co.tshedza.transfer`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L4:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L7:** `import java.time.LocalDateTime;`  
Import — brings in `java.time.LocalDateTime` so this file can use it.

**L8:** ``  
Blank line — visual spacing.

**L9:** `@Entity`  
JPA entity — this class maps to a database table.

**L10:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L11:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L12:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L13:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L14:** `public class Transfer {`  
Declares type `public class Transfer {` — container for fields and methods.

**L15:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L16:** `    private String id; // TX-12345678`  
Field or method declaration: `private String id; // TX-12345678`

**L17:** ``  
Blank line — visual spacing.

**L18:** `    private String senderName;`  
Field or method declaration: `private String senderName;`

**L19:** `    private String senderPhone;`  
Field or method declaration: `private String senderPhone;`

**L20:** `    private String recipientName;`  
Field or method declaration: `private String recipientName;`

**L21:** `    private String recipientPhone;`  
Field or method declaration: `private String recipientPhone;`

**L22:** `    private String country;`  
Field or method declaration: `private String country;`

**L23:** `    private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L24:** `    private BigDecimal fee;`  
Field or method declaration: `private BigDecimal fee;`

**L25:** `    private BigDecimal total;`  
Field or method declaration: `private BigDecimal total;`

**L26:** `    private String status;`  
Field or method declaration: `private String status;`

**L27:** `    private LocalDateTime createdAt;`  
Field or method declaration: `private LocalDateTime createdAt;`

**L28:** ``  
Blank line — visual spacing.

**L29:** `    @PrePersist`  
Annotation — framework metadata: `@PrePersist` configures behaviour for the next declaration.

**L30:** `    protected void onCreate() {`  
Field or method declaration: `protected void onCreate() {`

**L31:** `        createdAt = LocalDateTime.now();`  
Assignment / binding: `createdAt = LocalDateTime.now();`

**L32:** `    }`  
Closes the previous block/object/function.

**L33:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/transfer/TransferController.java`

_70 lines_

**L1:** `package za.co.tshedza.transfer;`  
Java package declaration — places this class in `za.co.tshedza.transfer`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Cross-border transfer quotes/creates (public — no JWT required).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - POST /api/transfers ← apiClient#createTransfer ← pages/Transfer.tsx`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Also listed for admins via AdminController GET /api/admin/transfers.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L11:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L12:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L13:** `import org.springframework.web.bind.annotation.PostMapping;`  
Import — brings in `org.springframework.web.bind.annotation.PostMapping` so this file can use it.

**L14:** `import org.springframework.web.bind.annotation.RequestBody;`  
Import — brings in `org.springframework.web.bind.annotation.RequestBody` so this file can use it.

**L15:** `import org.springframework.web.bind.annotation.RequestMapping;`  
Import — brings in `org.springframework.web.bind.annotation.RequestMapping` so this file can use it.

**L16:** `import org.springframework.web.bind.annotation.RestController;`  
Import — brings in `org.springframework.web.bind.annotation.RestController` so this file can use it.

**L17:** ``  
Blank line — visual spacing.

**L18:** `import java.math.BigDecimal;`  
Import — brings in `java.math.BigDecimal` so this file can use it.

**L19:** `import java.math.RoundingMode;`  
Import — brings in `java.math.RoundingMode` so this file can use it.

**L20:** ``  
Blank line — visual spacing.

**L21:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L22:** `@RequestMapping("/api/transfers")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/transfers")`.

**L23:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L24:** `public class TransferController {`  
Declares type `public class TransferController {` — container for fields and methods.

**L25:** ``  
Blank line — visual spacing.

**L26:** `    private final TransferRepository repository;`  
Field or method declaration: `private final TransferRepository repository;`

**L27:** ``  
Blank line — visual spacing.

**L28:** `    @PostMapping`  
HTTP route mapping — Spring wires this method to the path/method in `@PostMapping`.

**L29:** `    public ResponseEntity<Transfer> create(@RequestBody TransferRequest request) {`  
Field or method declaration: `public ResponseEntity<Transfer> create(@RequestBody TransferRequest re…`

**L30:** `        BigDecimal amount = request.getAmount();`  
Assignment / binding: `BigDecimal amount = request.getAmount();`

**L31:** `        BigDecimal feeRate = getFeeRate(request.getCountry());`  
Assignment / binding: `BigDecimal feeRate = getFeeRate(request.getCountry());`

**L32:** `        BigDecimal fee = amount.multiply(feeRate).setScale(2, RoundingMode.HALF_UP);`  
Assignment / binding: `BigDecimal fee = amount.multiply(feeRate).setScale(2, RoundingMode.HAL…`

**L33:** `        if (fee.compareTo(new BigDecimal("49")) < 0) {`  
Conditional — runs the following block only when the condition is true.

**L34:** `            fee = new BigDecimal("49.00");`  
Assignment / binding: `fee = new BigDecimal("49.00");`

**L35:** `        }`  
Closes the previous block/object/function.

**L36:** `        `  
Blank line — visual spacing.

**L37:** `        Transfer transfer = Transfer.builder()`  
Assignment / binding: `Transfer transfer = Transfer.builder()`

**L38:** `                .id("TX-" + System.currentTimeMillis() % 100000000)`  
Executable statement: `.id("TX-" + System.currentTimeMillis() % 100000000)`

**L39:** `                .senderName(request.getSenderName())`  
Executable statement: `.senderName(request.getSenderName())`

**L40:** `                .senderPhone(request.getSenderPhone())`  
Executable statement: `.senderPhone(request.getSenderPhone())`

**L41:** `                .recipientName(request.getRecipientName())`  
Executable statement: `.recipientName(request.getRecipientName())`

**L42:** `                .recipientPhone(request.getRecipientPhone())`  
Executable statement: `.recipientPhone(request.getRecipientPhone())`

**L43:** `                .country(request.getCountry())`  
Executable statement: `.country(request.getCountry())`

**L44:** `                .amount(amount)`  
Executable statement: `.amount(amount)`

**L45:** `                .fee(fee)`  
Executable statement: `.fee(fee)`

**L46:** `                .total(amount.add(fee))`  
Executable statement: `.total(amount.add(fee))`

**L47:** `                .status("pending")`  
Executable statement: `.status("pending")`

**L48:** `                .build();`  
Executable statement: `.build();`

**L49:** `        `  
Blank line — visual spacing.

**L50:** `        return ResponseEntity.ok(repository.save(transfer));`  
Returns a value to the caller: `ResponseEntity.ok(repository.save(transfer));`

**L51:** `    }`  
Closes the previous block/object/function.

**L52:** ``  
Blank line — visual spacing.

**L53:** `    private BigDecimal getFeeRate(String country) {`  
Field or method declaration: `private BigDecimal getFeeRate(String country) {`

**L54:** `        return switch (country) {`  
Returns a value to the caller: `switch (country) {`

**L55:** `            case "ZW" -> new BigDecimal("0.045");`  
Executable statement: `case "ZW" -> new BigDecimal("0.045");`

**L56:** `            case "MZ" -> new BigDecimal("0.04");`  
Executable statement: `case "MZ" -> new BigDecimal("0.04");`

**L57:** `            default -> new BigDecimal("0.035");`  
Executable statement: `default -> new BigDecimal("0.035");`

**L58:** `        };`  
Closes the previous block/object/function.

**L59:** `    }`  
Closes the previous block/object/function.

**L60:** ``  
Blank line — visual spacing.

**L61:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L62:** `    public static class TransferRequest {`  
Field or method declaration: `public static class TransferRequest {`

**L63:** `        private String senderName;`  
Field or method declaration: `private String senderName;`

**L64:** `        private String senderPhone;`  
Field or method declaration: `private String senderPhone;`

**L65:** `        private String recipientName;`  
Field or method declaration: `private String recipientName;`

**L66:** `        private String recipientPhone;`  
Field or method declaration: `private String recipientPhone;`

**L67:** `        private String country;`  
Field or method declaration: `private String country;`

**L68:** `        private BigDecimal amount;`  
Field or method declaration: `private BigDecimal amount;`

**L69:** `    }`  
Closes the previous block/object/function.

**L70:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/transfer/TransferRepository.java`

_9 lines_

**L1:** `package za.co.tshedza.transfer;`  
Java package declaration — places this class in `za.co.tshedza.transfer`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface TransferRepository extends JpaRepository<Transfer, String> {`  
Declares type `public interface TransferRepository extends JpaRepository<Transfer, String> {` — container for fields and methods.

**L7:** `    List<Transfer> findTop25ByOrderByCreatedAtDesc();`  
Executable statement: `List<Transfer> findTop25ByOrderByCreatedAtDesc();`

**L8:** `    long countByStatus(String status);`  
Executable statement: `long countByStatus(String status);`

**L9:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/TshedzaApplication.java`

_22 lines_

**L1:** `package za.co.tshedza;`  
Java package declaration — places this class in `za.co.tshedza`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Spring Boot entry point for the Tshedza Finance API (port 8080).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Frontend Vite app (port 5173) talks to this API via {@code /api/*}`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` *   (see frontend/src/lib/api.ts and frontend/vite.config.ts proxy).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - Seed users / demo loan: {@link za.co.tshedza.config.DataInitializer}`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * - JWT + route rules: {@link za.co.tshedza.config.SecurityConfig}`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** `import org.springframework.boot.SpringApplication;`  
Import — brings in `org.springframework.boot.SpringApplication` so this file can use it.

**L13:** `import org.springframework.boot.autoconfigure.SpringBootApplication;`  
Import — brings in `org.springframework.boot.autoconfigure.SpringBootApplication` so this file can use it.

**L14:** `import org.springframework.data.jpa.repository.config.EnableJpaAuditing;`  
Import — brings in `org.springframework.data.jpa.repository.config.EnableJpaAuditing` so this file can use it.

**L15:** ``  
Blank line — visual spacing.

**L16:** `@SpringBootApplication`  
Annotation — framework metadata: `@SpringBootApplication` configures behaviour for the next declaration.

**L17:** `@EnableJpaAuditing`  
Annotation — framework metadata: `@EnableJpaAuditing` configures behaviour for the next declaration.

**L18:** `public class TshedzaApplication {`  
Declares type `public class TshedzaApplication {` — container for fields and methods.

**L19:** `    public static void main(String[] args) {`  
Field or method declaration: `public static void main(String[] args) {`

**L20:** `        SpringApplication.run(TshedzaApplication.class, args);`  
Executable statement: `SpringApplication.run(TshedzaApplication.class, args);`

**L21:** `    }`  
Closes the previous block/object/function.

**L22:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/user/MeController.java`

_65 lines_

**L1:** `package za.co.tshedza.user;`  
Java package declaration — places this class in `za.co.tshedza.user`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Current-user profile endpoints.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - GET /api/me ← apiClient#fetchMe (profile / auth refresh).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Role field is used by frontend RequireAdmin and PublicLayout admin nav link.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import lombok.AllArgsConstructor;`  
Import — brings in `lombok.AllArgsConstructor` so this file can use it.

**L11:** `import lombok.Data;`  
Import — brings in `lombok.Data` so this file can use it.

**L12:** `import lombok.RequiredArgsConstructor;`  
Import — brings in `lombok.RequiredArgsConstructor` so this file can use it.

**L13:** `import org.springframework.http.ResponseEntity;`  
Import — brings in `org.springframework.http.ResponseEntity` so this file can use it.

**L14:** `import org.springframework.security.core.annotation.AuthenticationPrincipal;`  
Import — brings in `org.springframework.security.core.annotation.AuthenticationPrincipal` so this file can use it.

**L15:** `import org.springframework.transaction.annotation.Transactional;`  
Import — brings in `org.springframework.transaction.annotation.Transactional` so this file can use it.

**L16:** `import org.springframework.web.bind.annotation.GetMapping;`  
Import — brings in `org.springframework.web.bind.annotation.GetMapping` so this file can use it.

**L17:** `import org.springframework.web.bind.annotation.RequestMapping;`  
Import — brings in `org.springframework.web.bind.annotation.RequestMapping` so this file can use it.

**L18:** `import org.springframework.web.bind.annotation.RestController;`  
Import — brings in `org.springframework.web.bind.annotation.RestController` so this file can use it.

**L19:** `import za.co.tshedza.auth.AuthenticationResponse;`  
Import — brings in `za.co.tshedza.auth.AuthenticationResponse` so this file can use it.

**L20:** ``  
Blank line — visual spacing.

**L21:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L22:** ``  
Blank line — visual spacing.

**L23:** `@RestController`  
Spring annotation — this class handles HTTP requests and returns JSON/body responses.

**L24:** `@RequestMapping("/api/me")`  
HTTP route mapping — Spring wires this method to the path/method in `@RequestMapping("/api/me")`.

**L25:** `@RequiredArgsConstructor`  
Annotation — framework metadata: `@RequiredArgsConstructor` configures behaviour for the next declaration.

**L26:** `public class MeController {`  
Declares type `public class MeController {` — container for fields and methods.

**L27:** ``  
Blank line — visual spacing.

**L28:** `    private final UserRepository userRepository;`  
Field or method declaration: `private final UserRepository userRepository;`

**L29:** ``  
Blank line — visual spacing.

**L30:** `    @GetMapping`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping`.

**L31:** `    public ResponseEntity<AuthenticationResponse.UserResponse> getMe(@AuthenticationPrincipal Use...`  
Field or method declaration: `public ResponseEntity<AuthenticationResponse.UserResponse> getMe(@Auth…`

**L32:** `        return ResponseEntity.ok(AuthenticationResponse.UserResponse.builder()`  
Returns a value to the caller: `ResponseEntity.ok(AuthenticationResponse.UserResponse…`

**L33:** `                .id(user.getId())`  
Executable statement: `.id(user.getId())`

**L34:** `                .email(user.getEmail())`  
Executable statement: `.email(user.getEmail())`

**L35:** `                .firstName(user.getFirstName())`  
Executable statement: `.firstName(user.getFirstName())`

**L36:** `                .lastName(user.getLastName())`  
Executable statement: `.lastName(user.getLastName())`

**L37:** `                .phone(user.getPhone())`  
Executable statement: `.phone(user.getPhone())`

**L38:** `                .idNumberMasked(maskIdNumber(user.getIdNumber()))`  
Executable statement: `.idNumberMasked(maskIdNumber(user.getIdNumber()))`

**L39:** `                .role(user.getRole() == null ? "USER" : user.getRole())`  
Assignment / binding: `.role(user.getRole() == null ? "USER" : user.getRole())`

**L40:** `                .build());`  
Executable statement: `.build());`

**L41:** `    }`  
Closes the previous block/object/function.

**L42:** ``  
Blank line — visual spacing.

**L43:** `    @GetMapping("/documents")`  
HTTP route mapping — Spring wires this method to the path/method in `@GetMapping("/documents")`.

**L44:** `    @Transactional(readOnly = true)`  
Annotation — framework metadata: `@Transactional` configures behaviour for the next declaration.

**L45:** `    public ResponseEntity<List<DocumentInfo>> getMyDocuments(@AuthenticationPrincipal User user) {`  
Field or method declaration: `public ResponseEntity<List<DocumentInfo>> getMyDocuments(@Authenticati…`

**L46:** `        return ResponseEntity.ok(userRepository.findById(user.getId()).orElseThrow()`  
Returns a value to the caller: `ResponseEntity.ok(userRepository.findById(user.getId(…`

**L47:** `                .getApplications().stream()`  
Executable statement: `.getApplications().stream()`

**L48:** `                .flatMap(app -> app.getDocuments().stream())`  
Executable statement: `.flatMap(app -> app.getDocuments().stream())`

**L49:** `                .map(doc -> new DocumentInfo(doc.getKind(), doc.getFileName(), doc.getStatus()))`  
Executable statement: `.map(doc -> new DocumentInfo(doc.getKind(), doc.getFileName(), doc.get…`

**L50:** `                .toList());`  
Executable statement: `.toList());`

**L51:** `    }`  
Closes the previous block/object/function.

**L52:** ``  
Blank line — visual spacing.

**L53:** `    @Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L54:** `    @AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L55:** `    public static class DocumentInfo {`  
Field or method declaration: `public static class DocumentInfo {`

**L56:** `        private String kind;`  
Field or method declaration: `private String kind;`

**L57:** `        private String fileName;`  
Field or method declaration: `private String fileName;`

**L58:** `        private String status;`  
Field or method declaration: `private String status;`

**L59:** `    }`  
Closes the previous block/object/function.

**L60:** ``  
Blank line — visual spacing.

**L61:** `    private String maskIdNumber(String idNumber) {`  
Field or method declaration: `private String maskIdNumber(String idNumber) {`

**L62:** `        if (idNumber == null || idNumber.length() < 4) return idNumber;`  
Conditional — runs the following block only when the condition is true.

**L63:** `        return "*".repeat(idNumber.length() - 4) + idNumber.substring(idNumber.length() - 4);`  
Returns a value to the caller: `"*".repeat(idNumber.length() - 4) + idNumber.substrin…`

**L64:** `    }`  
Closes the previous block/object/function.

**L65:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/user/User.java`

_81 lines_

**L1:** `package za.co.tshedza.user;`  
Java package declaration — places this class in `za.co.tshedza.user`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * Application user (Spring Security UserDetails).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - role USER | ADMIN → SecurityConfig /api/admin/** and frontend RequireAdmin.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Returned (without password) inside AuthenticationResponse → frontend UserProfile.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** `import jakarta.persistence.*;`  
Import — brings in `jakarta.persistence.` so this file can use it.

**L11:** `import lombok.*;`  
Import — brings in `lombok.` so this file can use it.

**L12:** `import org.springframework.security.core.GrantedAuthority;`  
Import — brings in `org.springframework.security.core.GrantedAuthority` so this file can use it.

**L13:** `import org.springframework.security.core.authority.SimpleGrantedAuthority;`  
Import — brings in `org.springframework.security.core.authority.SimpleGrantedAuthority` so this file can use it.

**L14:** `import org.springframework.security.core.userdetails.UserDetails;`  
Import — brings in `org.springframework.security.core.userdetails.UserDetails` so this file can use it.

**L15:** `import com.fasterxml.jackson.annotation.JsonIgnore;`  
Import — brings in `com.fasterxml.jackson.annotation.JsonIgnore` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `import java.util.Collection;`  
Import — brings in `java.util.Collection` so this file can use it.

**L18:** `import java.util.List;`  
Import — brings in `java.util.List` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `@Entity`  
JPA entity — this class maps to a database table.

**L21:** `@Table(name = "users")`  
Assignment / binding: `@Table(name = "users")`

**L22:** `@Data`  
Annotation — framework metadata: `@Data` configures behaviour for the next declaration.

**L23:** `@Builder`  
Annotation — framework metadata: `@Builder` configures behaviour for the next declaration.

**L24:** `@NoArgsConstructor`  
Annotation — framework metadata: `@NoArgsConstructor` configures behaviour for the next declaration.

**L25:** `@AllArgsConstructor`  
Annotation — framework metadata: `@AllArgsConstructor` configures behaviour for the next declaration.

**L26:** `public class User implements UserDetails {`  
Declares type `public class User implements UserDetails {` — container for fields and methods.

**L27:** `    @Id`  
Annotation — framework metadata: `@Id` configures behaviour for the next declaration.

**L28:** `    @GeneratedValue(strategy = GenerationType.UUID)`  
Annotation — framework metadata: `@GeneratedValue` configures behaviour for the next declaration.

**L29:** `    private String id;`  
Field or method declaration: `private String id;`

**L30:** ``  
Blank line — visual spacing.

**L31:** `    @Column(unique = true, nullable = false)`  
Annotation — framework metadata: `@Column` configures behaviour for the next declaration.

**L32:** `    private String email;`  
Field or method declaration: `private String email;`

**L33:** ``  
Blank line — visual spacing.

**L34:** `    @JsonIgnore`  
Annotation — framework metadata: `@JsonIgnore` configures behaviour for the next declaration.

**L35:** `    @Column(nullable = false)`  
Annotation — framework metadata: `@Column` configures behaviour for the next declaration.

**L36:** `    private String password;`  
Field or method declaration: `private String password;`

**L37:** ``  
Blank line — visual spacing.

**L38:** `    private String firstName;`  
Field or method declaration: `private String firstName;`

**L39:** `    private String lastName;`  
Field or method declaration: `private String lastName;`

**L40:** `    private String phone;`  
Field or method declaration: `private String phone;`

**L41:** `    private String idNumber;`  
Field or method declaration: `private String idNumber;`

**L42:** ``  
Blank line — visual spacing.

**L43:** `    @Builder.Default`  
Annotation — framework metadata: `@Builder.Default` configures behaviour for the next declaration.

**L44:** `    @Column(nullable = false)`  
Annotation — framework metadata: `@Column` configures behaviour for the next declaration.

**L45:** `    private String role = "USER";`  
Field or method declaration: `private String role = "USER";`

**L46:** ``  
Blank line — visual spacing.

**L47:** `    @JsonIgnore`  
Annotation — framework metadata: `@JsonIgnore` configures behaviour for the next declaration.

**L48:** `    @OneToMany(mappedBy = "user")`  
Annotation — framework metadata: `@OneToMany` configures behaviour for the next declaration.

**L49:** `    private List<za.co.tshedza.application.Application> applications;`  
Field or method declaration: `private List<za.co.tshedza.application.Application> applications;`

**L50:** ``  
Blank line — visual spacing.

**L51:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L52:** `    public Collection<? extends GrantedAuthority> getAuthorities() {`  
Field or method declaration: `public Collection<? extends GrantedAuthority> getAuthorities() {`

**L53:** `        String value = (role == null || role.isBlank()) ? "USER" : role;`  
Assignment / binding: `String value = (role == null || role.isBlank()) ? "USER" : role;`

**L54:** `        return List.of(new SimpleGrantedAuthority("ROLE_" + value));`  
Returns a value to the caller: `List.of(new SimpleGrantedAuthority("ROLE_" + value));`

**L55:** `    }`  
Closes the previous block/object/function.

**L56:** ``  
Blank line — visual spacing.

**L57:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L58:** `    public String getUsername() {`  
Field or method declaration: `public String getUsername() {`

**L59:** `        return email;`  
Returns a value to the caller: `email;`

**L60:** `    }`  
Closes the previous block/object/function.

**L61:** ``  
Blank line — visual spacing.

**L62:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L63:** `    public boolean isAccountNonExpired() {`  
Field or method declaration: `public boolean isAccountNonExpired() {`

**L64:** `        return true;`  
Returns a value to the caller: `true;`

**L65:** `    }`  
Closes the previous block/object/function.

**L66:** ``  
Blank line — visual spacing.

**L67:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L68:** `    public boolean isAccountNonLocked() {`  
Field or method declaration: `public boolean isAccountNonLocked() {`

**L69:** `        return true;`  
Returns a value to the caller: `true;`

**L70:** `    }`  
Closes the previous block/object/function.

**L71:** ``  
Blank line — visual spacing.

**L72:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L73:** `    public boolean isCredentialsNonExpired() {`  
Field or method declaration: `public boolean isCredentialsNonExpired() {`

**L74:** `        return true;`  
Returns a value to the caller: `true;`

**L75:** `    }`  
Closes the previous block/object/function.

**L76:** ``  
Blank line — visual spacing.

**L77:** `    @Override`  
Annotation — framework metadata: `@Override` configures behaviour for the next declaration.

**L78:** `    public boolean isEnabled() {`  
Field or method declaration: `public boolean isEnabled() {`

**L79:** `        return true;`  
Returns a value to the caller: `true;`

**L80:** `    }`  
Closes the previous block/object/function.

**L81:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/java/za/co/tshedza/user/UserRepository.java`

_8 lines_

**L1:** `package za.co.tshedza.user;`  
Java package declaration — places this class in `za.co.tshedza.user`.

**L2:** ``  
Blank line — visual spacing.

**L3:** `import org.springframework.data.jpa.repository.JpaRepository;`  
Import — brings in `org.springframework.data.jpa.repository.JpaRepository` so this file can use it.

**L4:** `import java.util.Optional;`  
Import — brings in `java.util.Optional` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `public interface UserRepository extends JpaRepository<User, String> {`  
Declares type `public interface UserRepository extends JpaRepository<User, String> {` — container for fields and methods.

**L7:** `    Optional<User> findByEmail(String email);`  
Executable statement: `Optional<User> findByEmail(String email);`

**L8:** `}`  
Closes the previous block/object/function.

---

## `backend/src/main/resources/application.yml`

_42 lines_

**L1:** `# Tshedza Finance API config.`  
Inline comment documenting intent.

**L2:** `# Frontend (Vite :5173) calls this server (:8080) via /api proxy — see frontend/vite.config.ts.`  
Inline comment documenting intent.

**L3:** ``  
Blank line — visual spacing.

**L4:** `server:`  
Config key/value for Spring Boot runtime: `server:`

**L5:** `  port: 8080`  
Config key/value for Spring Boot runtime: `port: 8080`

**L6:** `  servlet:`  
Config key/value for Spring Boot runtime: `servlet:`

**L7:** `    context-path: /`  
Config key/value for Spring Boot runtime: `context-path: /`

**L8:** ``  
Blank line — visual spacing.

**L9:** `spring:`  
Config key/value for Spring Boot runtime: `spring:`

**L10:** `  application:`  
Config key/value for Spring Boot runtime: `application:`

**L11:** `    name: tshedza-backend`  
Config key/value for Spring Boot runtime: `name: tshedza-backend`

**L12:** `  datasource:`  
Config key/value for Spring Boot runtime: `datasource:`

**L13:** `    # Local H2 file DB (entities in za.co.tshedza.*). Demo users seeded by DataInitializer.`  
Inline comment documenting intent.

**L14:** `    url: jdbc:h2:file:./data/tshedza;DB_CLOSE_ON_EXIT=FALSE`  
Config key/value for Spring Boot runtime: `url: jdbc:h2:file:./data/tshedza;DB_CLOSE_ON_EXIT=FALSE`

**L15:** `    driverClassName: org.h2.Driver`  
Config key/value for Spring Boot runtime: `driverClassName: org.h2.Driver`

**L16:** `    username: sa`  
Config key/value for Spring Boot runtime: `username: sa`

**L17:** `    password: password`  
Config key/value for Spring Boot runtime: `password: password`

**L18:** `  jpa:`  
Config key/value for Spring Boot runtime: `jpa:`

**L19:** `    database-platform: org.hibernate.dialect.H2Dialect`  
Config key/value for Spring Boot runtime: `database-platform: org.hibernate.dialect.H2Dialect`

**L20:** `    hibernate:`  
Config key/value for Spring Boot runtime: `hibernate:`

**L21:** `      ddl-auto: update`  
Config key/value for Spring Boot runtime: `ddl-auto: update`

**L22:** `    show-sql: true`  
Config key/value for Spring Boot runtime: `show-sql: true`

**L23:** `  h2:`  
Config key/value for Spring Boot runtime: `h2:`

**L24:** `    console:`  
Config key/value for Spring Boot runtime: `console:`

**L25:** `      enabled: true`  
Config key/value for Spring Boot runtime: `enabled: true`

**L26:** `      path: /h2-console`  
Config key/value for Spring Boot runtime: `path: /h2-console`

**L27:** `  servlet:`  
Config key/value for Spring Boot runtime: `servlet:`

**L28:** `    multipart:`  
Config key/value for Spring Boot runtime: `multipart:`

**L29:** `      # Matches DocumentsStep / useDocumentUpload 8MB client check`  
Inline comment documenting intent.

**L30:** `      max-file-size: 8MB`  
Config key/value for Spring Boot runtime: `max-file-size: 8MB`

**L31:** `      max-request-size: 10MB`  
Config key/value for Spring Boot runtime: `max-request-size: 10MB`

**L32:** ``  
Blank line — visual spacing.

**L33:** `app:`  
Config key/value for Spring Boot runtime: `app:`

**L34:** `  jwt:`  
JWT / auth header handling — proves who the caller is.

**L35:** `    # Used by JwtService (issue) + JwtAuthenticationFilter (validate); frontend only stores the t...`  
Inline comment documenting intent.

**L36:** `    secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`  
Config key/value for Spring Boot runtime: `secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`

**L37:** `    expiration: 86400000 # 24 hours`  
Config key/value for Spring Boot runtime: `expiration: 86400000 # 24 hours`

**L38:** `  upload-dir: ./uploads # ApplicationService document storage`  
Config key/value for Spring Boot runtime: `upload-dir: ./uploads # ApplicationService document storage`

**L39:** `  # Keep aligned with frontend/src/lib/loanCalc.ts INTEREST_RATE_MONTHLY`  
Inline comment documenting intent.

**L40:** `  interest-rate: 0.035`  
Config key/value for Spring Boot runtime: `interest-rate: 0.035`

**L41:** `  loan-min: 100`  
Config key/value for Spring Boot runtime: `loan-min: 100`

**L42:** `  loan-max: 20000`  
Config key/value for Spring Boot runtime: `loan-max: 20000`

---

## `frontend/src/App.tsx`

_110 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Route table for Tshedza Finance UI.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Public pages (/) -> PublicLayout + marketing/product pages (no auth).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - /apply/* -> RequireAuth + ApplyLayout -> Details->Documents->Terms->Review->Done`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` *   (API: /api/applications* via apiClient).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - /dashboard/* -> RequireAuth + DashboardLayout -> loans/repayments (API: /api/loans*).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * - /admin -> RequireAdmin + AdminPanel (API: /api/admin/*, needs ROLE_ADMIN).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` * - Vite proxies /api -> http://localhost:8080 (vite.config.ts).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ``  
Blank line — visual spacing.

**L13:** `import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L14:** `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'`  
Import — brings in `@tanstack/react-query` so this file can use it.

**L15:** `import { PublicLayout } from '@/components/layout/PublicLayout'`  
Import — brings in `@/components/layout/PublicLayout` so this file can use it.

**L16:** `import { ApplyLayout } from '@/components/layout/ApplyLayout'`  
Import — brings in `@/components/layout/ApplyLayout` so this file can use it.

**L17:** `import { DashboardLayout } from '@/components/layout/DashboardLayout'`  
Import — brings in `@/components/layout/DashboardLayout` so this file can use it.

**L18:** `import { HomePage } from '@/pages/Home'`  
Import — brings in `@/pages/Home` so this file can use it.

**L19:** `import { CashLoanPage, DomesticLoanPage } from '@/pages/Products'`  
Import — brings in `@/pages/Products` so this file can use it.

**L20:** `import { TransferPage } from '@/pages/Transfer'`  
Import — brings in `@/pages/Transfer` so this file can use it.

**L21:** `import { DebtReviewPage } from '@/pages/DebtReview'`  
Import — brings in `@/pages/DebtReview` so this file can use it.

**L22:** `import { FAQPage, ContactPage } from '@/pages/FAQ'`  
Import — brings in `@/pages/FAQ` so this file can use it.

**L23:** `import { PrivacyPage, TermsPage } from '@/pages/Legal'`  
Import — brings in `@/pages/Legal` so this file can use it.

**L24:** `import { DetailsStep } from '@/components/application/DetailsStep'`  
Import — brings in `@/components/application/DetailsStep` so this file can use it.

**L25:** `import { DocumentsStep } from '@/components/application/DocumentsStep'`  
Import — brings in `@/components/application/DocumentsStep` so this file can use it.

**L26:** `import { TermsStep } from '@/components/application/TermsStep'`  
Import — brings in `@/components/application/TermsStep` so this file can use it.

**L27:** `import { ReviewStep } from '@/components/application/ReviewStep'`  
Import — brings in `@/components/application/ReviewStep` so this file can use it.

**L28:** `import { DoneStep } from '@/components/application/DoneStep'`  
Import — brings in `@/components/application/DoneStep` so this file can use it.

**L29:** `import {`  
Import — brings in `dependency` so this file can use it.

**L30:** `  DashboardPage,`  
Executable statement: `DashboardPage,`

**L31:** `  LoanDetailPage,`  
Executable statement: `LoanDetailPage,`

**L32:** `  RepaymentsPage,`  
Executable statement: `RepaymentsPage,`

**L33:** `  DocumentsPage,`  
Executable statement: `DocumentsPage,`

**L34:** `  ProfilePage,`  
Executable statement: `ProfilePage,`

**L35:** `} from '@/pages/Dashboard'`  
Closes the previous block/object/function.

**L36:** `import { LoginPage } from '@/pages/Login'`  
Import — brings in `@/pages/Login` so this file can use it.

**L37:** `import { RegisterPage } from '@/pages/Register'`  
Import — brings in `@/pages/Register` so this file can use it.

**L38:** `import { RequireAuth } from '@/components/auth/RequireAuth'`  
Import — brings in `@/components/auth/RequireAuth` so this file can use it.

**L39:** `import { RequireAdmin } from '@/components/auth/RequireAdmin'`  
Import — brings in `@/components/auth/RequireAdmin` so this file can use it.

**L40:** `import { AdminPanelPage } from '@/pages/admin/AdminPanel'`  
Import — brings in `@/pages/admin/AdminPanel` so this file can use it.

**L41:** ``  
Blank line — visual spacing.

**L42:** `const queryClient = new QueryClient()`  
Constant/variable `queryClient` — holds a value or React binding.

**L43:** ``  
Blank line — visual spacing.

**L44:** `export default function App() {`  
Defines function `App` — callable unit of UI/logic.

**L45:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L46:** `    <QueryClientProvider client={queryClient}>`  
JSX markup — describes HTML structure React will render.

**L47:** `      <BrowserRouter>`  
JSX markup — describes HTML structure React will render.

**L48:** `        <Routes>`  
JSX markup — describes HTML structure React will render.

**L49:** `          <Route element={<PublicLayout />}>`  
JSX markup — describes HTML structure React will render.

**L50:** `            <Route index element={<HomePage />} />`  
JSX markup — describes HTML structure React will render.

**L51:** `            <Route path="products/cash-loan" element={<CashLoanPage />} />`  
JSX markup — describes HTML structure React will render.

**L52:** `            <Route path="products/domestic" element={<DomesticLoanPage />} />`  
JSX markup — describes HTML structure React will render.

**L53:** `            <Route path="products/transfer" element={<TransferPage />} />`  
JSX markup — describes HTML structure React will render.

**L54:** `            <Route path="products/debt-review" element={<DebtReviewPage />} />`  
JSX markup — describes HTML structure React will render.

**L55:** `            <Route path="faq" element={<FAQPage />} />`  
JSX markup — describes HTML structure React will render.

**L56:** `            <Route path="contact" element={<ContactPage />} />`  
JSX markup — describes HTML structure React will render.

**L57:** `            <Route path="privacy" element={<PrivacyPage />} />`  
JSX markup — describes HTML structure React will render.

**L58:** `            <Route path="terms" element={<TermsPage />} />`  
JSX markup — describes HTML structure React will render.

**L59:** `            <Route path="login" element={<LoginPage />} />`  
JSX markup — describes HTML structure React will render.

**L60:** `            <Route path="register" element={<RegisterPage />} />`  
JSX markup — describes HTML structure React will render.

**L61:** `          </Route>`  
JSX markup — describes HTML structure React will render.

**L62:** ``  
Blank line — visual spacing.

**L63:** `          <Route`  
JSX markup — describes HTML structure React will render.

**L64:** `            path="apply"`  
Assignment / binding: `path="apply"`

**L65:** `            element={`  
Assignment / binding: `element={`

**L66:** `              <RequireAuth>`  
JSX markup — describes HTML structure React will render.

**L67:** `                <ApplyLayout />`  
JSX markup — describes HTML structure React will render.

**L68:** `              </RequireAuth>`  
JSX markup — describes HTML structure React will render.

**L69:** `            }`  
Closes the previous block/object/function.

**L70:** `          >`  
JSX markup — describes HTML structure React will render.

**L71:** `            <Route index element={<Navigate to="details" replace />} />`  
JSX markup — describes HTML structure React will render.

**L72:** `            <Route path="details" element={<DetailsStep />} />`  
JSX markup — describes HTML structure React will render.

**L73:** `            <Route path="documents" element={<DocumentsStep />} />`  
JSX markup — describes HTML structure React will render.

**L74:** `            <Route path="terms" element={<TermsStep />} />`  
JSX markup — describes HTML structure React will render.

**L75:** `            <Route path="review" element={<ReviewStep />} />`  
JSX markup — describes HTML structure React will render.

**L76:** `            <Route path="done" element={<DoneStep />} />`  
JSX markup — describes HTML structure React will render.

**L77:** `          </Route>`  
JSX markup — describes HTML structure React will render.

**L78:** ``  
Blank line — visual spacing.

**L79:** `          <Route`  
JSX markup — describes HTML structure React will render.

**L80:** `            path="dashboard"`  
Assignment / binding: `path="dashboard"`

**L81:** `            element={`  
Assignment / binding: `element={`

**L82:** `              <RequireAuth>`  
JSX markup — describes HTML structure React will render.

**L83:** `                <DashboardLayout />`  
JSX markup — describes HTML structure React will render.

**L84:** `              </RequireAuth>`  
JSX markup — describes HTML structure React will render.

**L85:** `            }`  
Closes the previous block/object/function.

**L86:** `          >`  
JSX markup — describes HTML structure React will render.

**L87:** `            <Route index element={<DashboardPage />} />`  
JSX markup — describes HTML structure React will render.

**L88:** `            <Route path="loans/:loanId" element={<LoanDetailPage />} />`  
JSX markup — describes HTML structure React will render.

**L89:** `            <Route path="repayments" element={<RepaymentsPage />} />`  
JSX markup — describes HTML structure React will render.

**L90:** `            <Route path="documents" element={<DocumentsPage />} />`  
JSX markup — describes HTML structure React will render.

**L91:** `            <Route path="profile" element={<ProfilePage />} />`  
JSX markup — describes HTML structure React will render.

**L92:** `          </Route>`  
JSX markup — describes HTML structure React will render.

**L93:** ``  
Blank line — visual spacing.

**L94:** ``  
Blank line — visual spacing.

**L95:** ``  
Blank line — visual spacing.

**L96:** `          <Route`  
JSX markup — describes HTML structure React will render.

**L97:** `            path="admin"`  
Assignment / binding: `path="admin"`

**L98:** `            element={`  
Assignment / binding: `element={`

**L99:** `              <RequireAdmin>`  
JSX markup — describes HTML structure React will render.

**L100:** `                <AdminPanelPage />`  
JSX markup — describes HTML structure React will render.

**L101:** `              </RequireAdmin>`  
JSX markup — describes HTML structure React will render.

**L102:** `            }`  
Closes the previous block/object/function.

**L103:** `          />`  
JSX markup — describes HTML structure React will render.

**L104:** ``  
Blank line — visual spacing.

**L105:** `          <Route path="*" element={<Navigate to="/" replace />} />`  
JSX markup — describes HTML structure React will render.

**L106:** `        </Routes>`  
JSX markup — describes HTML structure React will render.

**L107:** `      </BrowserRouter>`  
JSX markup — describes HTML structure React will render.

**L108:** `    </QueryClientProvider>`  
JSX markup — describes HTML structure React will render.

**L109:** `  )`  
Executable statement: `)`

**L110:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/application/DetailsStep.tsx`

_147 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Apply step 1: personal / employment details + product choice.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Writes to applicationStore; may call createApplication (ApplicationController).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Next: DocumentsStep. Route: /apply/details (App.tsx).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useForm } from 'react-hook-form'`  
Import — brings in `react-hook-form` so this file can use it.

**L10:** `import { zodResolver } from '@hookform/resolvers/zod'`  
Import — brings in `@hookform/resolvers/zod` so this file can use it.

**L11:** `import { useNavigate } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L12:** `import { detailsSchema, type DetailsForm } from '@/lib/validation'`  
Import — brings in `@/lib/validation` so this file can use it.

**L13:** `import { useApplicationStore } from '@/store/applicationStore'`  
Import — brings in `@/store/applicationStore` so this file can use it.

**L14:** `import { Button, Input, Select, PageIntro, SoftChip, StepActions } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L15:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `export function DetailsStep() {`  
Defines function `DetailsStep` — callable unit of UI/logic.

**L18:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L19:** `  const { data, updateDetails, setStep, setProduct } = useApplicationStore()`  
Constant/variable `?` — holds a value or React binding.

**L20:** `  const isDomestic = data.product === 'domestic'`  
Constant/variable `isDomestic` — holds a value or React binding.

**L21:** ``  
Blank line — visual spacing.

**L22:** `  const {`  
Executable statement: `const {`

**L23:** `    register,`  
Executable statement: `register,`

**L24:** `    handleSubmit,`  
Executable statement: `handleSubmit,`

**L25:** `    formState: { errors },`  
Executable statement: `formState: { errors },`

**L26:** `  } = useForm<DetailsForm>({`  
Closes the previous block/object/function.

**L27:** `    resolver: zodResolver(detailsSchema),`  
Executable statement: `resolver: zodResolver(detailsSchema),`

**L28:** `    defaultValues: {`  
Executable statement: `defaultValues: {`

**L29:** `      firstName: data.details.firstName ?? '',`  
Executable statement: `firstName: data.details.firstName ?? '',`

**L30:** `      lastName: data.details.lastName ?? '',`  
Executable statement: `lastName: data.details.lastName ?? '',`

**L31:** `      idNumber: data.details.idNumber ?? '',`  
Executable statement: `idNumber: data.details.idNumber ?? '',`

**L32:** `      phone: data.details.phone ?? '',`  
Executable statement: `phone: data.details.phone ?? '',`

**L33:** `      email: data.details.email ?? '',`  
Executable statement: `email: data.details.email ?? '',`

**L34:** `      employmentStatus:`  
Executable statement: `employmentStatus:`

**L35:** `        (data.details.employmentStatus as DetailsForm['employmentStatus']) ??`  
Executable statement: `(data.details.employmentStatus as DetailsForm['employmentStatus']) ??`

**L36:** `        (isDomestic ? 'domestic' : 'employed'),`  
Executable statement: `(isDomestic ? 'domestic' : 'employed'),`

**L37:** `      monthlyIncome: data.details.monthlyIncome ?? '',`  
Executable statement: `monthlyIncome: data.details.monthlyIncome ?? '',`

**L38:** `    },`  
Closes the previous block/object/function.

**L39:** `  })`  
Closes the previous block/object/function.

**L40:** ``  
Blank line — visual spacing.

**L41:** `  const onSubmit = (values: DetailsForm) => {`  
Constant/variable `onSubmit` — holds a value or React binding.

**L42:** `    updateDetails(values)`  
Executable statement: `updateDetails(values)`

**L43:** `    setStep(2)`  
Executable statement: `setStep(2)`

**L44:** `    navigate('/apply/documents')`  
React Router navigation — changes the URL/page without a full reload.

**L45:** `  }`  
Closes the previous block/object/function.

**L46:** ``  
Blank line — visual spacing.

**L47:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L48:** `    <div>`  
JSX markup — describes HTML structure React will render.

**L49:** `      <PageIntro title="Your details">`  
JSX markup — describes HTML structure React will render.

**L50:** `        We use this to check who you are and what you earn. It stays in this browser`  
Executable statement: `We use this to check who you are and what you earn. It stays in this b…`

**L51:** `        until you submit.`  
Executable statement: `until you submit.`

**L52:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L53:** ``  
Blank line — visual spacing.

**L54:** `      <div className="mt-6" role="group" aria-label="Loan product">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L55:** `        <p className="text-[0.9375rem] font-semibold text-ink">Which loan?</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L56:** `        <div className="mt-2 flex flex-wrap gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L57:** `          <SoftChip`  
JSX markup — describes HTML structure React will render.

**L58:** `            active={data.product === 'cash'}`  
Assignment / binding: `active={data.product === 'cash'}`

**L59:** `            aria-pressed={data.product === 'cash'}`  
Assignment / binding: `aria-pressed={data.product === 'cash'}`

**L60:** `            onClick={() => setProduct('cash')}`  
Assignment / binding: `onClick={() => setProduct('cash')}`

**L61:** `            className={cn('min-h-11 border', data.product === 'cash' ? 'border-transparent' : 'bo...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L62:** `          >`  
JSX markup — describes HTML structure React will render.

**L63:** `            Cash loan`  
Executable statement: `Cash loan`

**L64:** `          </SoftChip>`  
JSX markup — describes HTML structure React will render.

**L65:** `          <SoftChip`  
JSX markup — describes HTML structure React will render.

**L66:** `            active={data.product === 'domestic'}`  
Assignment / binding: `active={data.product === 'domestic'}`

**L67:** `            aria-pressed={data.product === 'domestic'}`  
Assignment / binding: `aria-pressed={data.product === 'domestic'}`

**L68:** `            onClick={() => setProduct('domestic')}`  
Assignment / binding: `onClick={() => setProduct('domestic')}`

**L69:** `            className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L70:** `              'min-h-11 border',`  
Executable statement: `'min-h-11 border',`

**L71:** `              data.product === 'domestic' ? 'border-transparent' : 'border-line bg-white',`  
Assignment / binding: `data.product === 'domestic' ? 'border-transparent' : 'border-line bg-w…`

**L72:** `            )}`  
Executable statement: `)}`

**L73:** `          >`  
JSX markup — describes HTML structure React will render.

**L74:** `            Domestic worker`  
Executable statement: `Domestic worker`

**L75:** `          </SoftChip>`  
JSX markup — describes HTML structure React will render.

**L76:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L77:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L78:** ``  
Blank line — visual spacing.

**L79:** `      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">`  
React Hook Form — wires inputs, validation, and submit handlers.

**L80:** `        <div className="grid gap-5 sm:grid-cols-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L81:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L82:** `            label="First name"`  
Assignment / binding: `label="First name"`

**L83:** `            autoComplete="given-name"`  
Assignment / binding: `autoComplete="given-name"`

**L84:** `            error={errors.firstName?.message}`  
Assignment / binding: `error={errors.firstName?.message}`

**L85:** `            {...register('firstName')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L86:** `          />`  
JSX markup — describes HTML structure React will render.

**L87:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L88:** `            label="Surname"`  
Assignment / binding: `label="Surname"`

**L89:** `            autoComplete="family-name"`  
Assignment / binding: `autoComplete="family-name"`

**L90:** `            error={errors.lastName?.message}`  
Assignment / binding: `error={errors.lastName?.message}`

**L91:** `            {...register('lastName')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L92:** `          />`  
JSX markup — describes HTML structure React will render.

**L93:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L94:** `        <Input`  
JSX markup — describes HTML structure React will render.

**L95:** `          label="SA ID number"`  
Assignment / binding: `label="SA ID number"`

**L96:** `          inputMode="numeric"`  
Assignment / binding: `inputMode="numeric"`

**L97:** `          autoComplete="off"`  
Assignment / binding: `autoComplete="off"`

**L98:** `          maxLength={13}`  
Assignment / binding: `maxLength={13}`

**L99:** `          hint="13 digits, no spaces."`  
Assignment / binding: `hint="13 digits, no spaces."`

**L100:** `          error={errors.idNumber?.message}`  
Assignment / binding: `error={errors.idNumber?.message}`

**L101:** `          {...register('idNumber')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L102:** `        />`  
JSX markup — describes HTML structure React will render.

**L103:** `        <div className="grid gap-5 sm:grid-cols-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L104:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L105:** `            label="Mobile number"`  
Assignment / binding: `label="Mobile number"`

**L106:** `            inputMode="tel"`  
Assignment / binding: `inputMode="tel"`

**L107:** `            autoComplete="tel"`  
Assignment / binding: `autoComplete="tel"`

**L108:** `            placeholder="0821234567"`  
Assignment / binding: `placeholder="0821234567"`

**L109:** `            error={errors.phone?.message}`  
Assignment / binding: `error={errors.phone?.message}`

**L110:** `            {...register('phone')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L111:** `          />`  
JSX markup — describes HTML structure React will render.

**L112:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L113:** `            label="Email"`  
Assignment / binding: `label="Email"`

**L114:** `            type="email"`  
Assignment / binding: `type="email"`

**L115:** `            autoComplete="email"`  
Assignment / binding: `autoComplete="email"`

**L116:** `            error={errors.email?.message}`  
Assignment / binding: `error={errors.email?.message}`

**L117:** `            {...register('email')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L118:** `          />`  
JSX markup — describes HTML structure React will render.

**L119:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L120:** `        <Select`  
JSX markup — describes HTML structure React will render.

**L121:** `          label="Employment"`  
Assignment / binding: `label="Employment"`

**L122:** `          error={errors.employmentStatus?.message}`  
Assignment / binding: `error={errors.employmentStatus?.message}`

**L123:** `          {...register('employmentStatus')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L124:** `        >`  
JSX markup — describes HTML structure React will render.

**L125:** `          <option value="employed">Employed (payslip)</option>`  
JSX markup — describes HTML structure React will render.

**L126:** `          <option value="self-employed">Self-employed</option>`  
JSX markup — describes HTML structure React will render.

**L127:** `          <option value="domestic">Domestic worker</option>`  
JSX markup — describes HTML structure React will render.

**L128:** `          <option value="other">Other</option>`  
JSX markup — describes HTML structure React will render.

**L129:** `        </Select>`  
JSX markup — describes HTML structure React will render.

**L130:** `        <Input`  
JSX markup — describes HTML structure React will render.

**L131:** `          label="Monthly income"`  
Assignment / binding: `label="Monthly income"`

**L132:** `          inputMode="numeric"`  
Assignment / binding: `inputMode="numeric"`

**L133:** `          hint="Rand, before deductions if you know that figure."`  
Assignment / binding: `hint="Rand, before deductions if you know that figure."`

**L134:** `          error={errors.monthlyIncome?.message}`  
Assignment / binding: `error={errors.monthlyIncome?.message}`

**L135:** `          {...register('monthlyIncome')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L136:** `        />`  
JSX markup — describes HTML structure React will render.

**L137:** ``  
Blank line — visual spacing.

**L138:** `        <StepActions>`  
JSX markup — describes HTML structure React will render.

**L139:** `          <span />`  
JSX markup — describes HTML structure React will render.

**L140:** `          <Button type="submit" variant="primary">`  
JSX markup — describes HTML structure React will render.

**L141:** `            Continue to documents`  
Executable statement: `Continue to documents`

**L142:** `          </Button>`  
JSX markup — describes HTML structure React will render.

**L143:** `        </StepActions>`  
JSX markup — describes HTML structure React will render.

**L144:** `      </form>`  
JSX markup — describes HTML structure React will render.

**L145:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L146:** `  )`  
Executable statement: `)`

**L147:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/application/DocumentsStep.tsx`

_159 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Apply step 2: ID, payslip, bank statements.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Uploads via useDocumentUpload -> ApplicationController documents endpoint.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Next: TermsStep. Route: /apply/documents.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useNavigate } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import {`  
Import — brings in `dependency` so this file can use it.

**L11:** `  useApplicationStore,`  
Executable statement: `useApplicationStore,`

**L12:** `  type DocumentKind,`  
TypeScript type — describes the shape of data (compile-time only).

**L13:** `  type DocumentStatus,`  
TypeScript type — describes the shape of data (compile-time only).

**L14:** `} from '@/store/applicationStore'`  
Closes the previous block/object/function.

**L15:** `import { useDocumentUpload } from '@/hooks/useDocumentUpload'`  
Import — brings in `@/hooks/useDocumentUpload` so this file can use it.

**L16:** `import { Button, IconTile, PageIntro, Panel, StepActions } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L17:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L18:** `import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'`  
Import — brings in `lucide-react` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `const DOCS: Array<{ kind: DocumentKind; title: string; hint: string }> = [`  
Constant/variable `DOCS` — holds a value or React binding.

**L21:** `  { kind: 'id', title: 'ID, passport, or work permit', hint: 'Photo or PDF' },`  
Executable statement: `{ kind: 'id', title: 'ID, passport, or work permit', hint: 'Photo or P…`

**L22:** `  { kind: 'payslip', title: 'Latest payslip', hint: 'Most recent month' },`  
Executable statement: `{ kind: 'payslip', title: 'Latest payslip', hint: 'Most recent month' …`

**L23:** `  { kind: 'bank1', title: 'Bank statement — month 1', hint: 'Last three months' },`  
Executable statement: `{ kind: 'bank1', title: 'Bank statement — month 1', hint: 'Last three …`

**L24:** `  { kind: 'bank2', title: 'Bank statement — month 2', hint: 'PDF preferred' },`  
Executable statement: `{ kind: 'bank2', title: 'Bank statement — month 2', hint: 'PDF preferr…`

**L25:** `  { kind: 'bank3', title: 'Bank statement — month 3', hint: 'PDF preferred' },`  
Executable statement: `{ kind: 'bank3', title: 'Bank statement — month 3', hint: 'PDF preferr…`

**L26:** `]`  
Executable statement: `]`

**L27:** ``  
Blank line — visual spacing.

**L28:** `function statusLabel(status: DocumentStatus) {`  
Defines function `statusLabel` — callable unit of UI/logic.

**L29:** `  switch (status) {`  
Executable statement: `switch (status) {`

**L30:** `    case 'uploading':`  
Executable statement: `case 'uploading':`

**L31:** `      return 'Uploading…'`  
Returns a value to the caller: `'Uploading…'`

**L32:** `    case 'uploaded':`  
Executable statement: `case 'uploaded':`

**L33:** `      return 'Uploaded'`  
Returns a value to the caller: `'Uploaded'`

**L34:** `    case 'rejected':`  
Executable statement: `case 'rejected':`

**L35:** `      return 'Couldn’t read that file — try again'`  
Returns a value to the caller: `'Couldn’t read that file — try again'`

**L36:** `    default:`  
Executable statement: `default:`

**L37:** `      return 'Not yet'`  
Returns a value to the caller: `'Not yet'`

**L38:** `  }`  
Closes the previous block/object/function.

**L39:** `}`  
Closes the previous block/object/function.

**L40:** ``  
Blank line — visual spacing.

**L41:** `function StatusIcon({ status }: { status: DocumentStatus }) {`  
Defines function `StatusIcon` — callable unit of UI/logic.

**L42:** `  if (status === 'uploaded') {`  
Conditional — runs the following block only when the condition is true.

**L43:** `    return <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden />`  
Returns JSX UI (or a value) to render / callers.

**L44:** `  }`  
Closes the previous block/object/function.

**L45:** `  if (status === 'rejected') {`  
Conditional — runs the following block only when the condition is true.

**L46:** `    return <AlertCircle size={16} strokeWidth={1.75} aria-hidden />`  
Returns JSX UI (or a value) to render / callers.

**L47:** `  }`  
Closes the previous block/object/function.

**L48:** `  if (status === 'uploading') {`  
Conditional — runs the following block only when the condition is true.

**L49:** `    return <Loader2 size={16} strokeWidth={1.75} className="animate-spin" aria-hidden />`  
Returns JSX UI (or a value) to render / callers.

**L50:** `  }`  
Closes the previous block/object/function.

**L51:** `  return <Upload size={16} strokeWidth={1.75} aria-hidden />`  
Returns JSX UI (or a value) to render / callers.

**L52:** `}`  
Closes the previous block/object/function.

**L53:** ``  
Blank line — visual spacing.

**L54:** `export function DocumentsStep() {`  
Defines function `DocumentsStep` — callable unit of UI/logic.

**L55:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L56:** `  const { data, setStep, allDocumentsReady } = useApplicationStore()`  
Constant/variable `?` — holds a value or React binding.

**L57:** `  const { upload, error } = useDocumentUpload()`  
Constant/variable `?` — holds a value or React binding.

**L58:** `  const ready = allDocumentsReady()`  
Constant/variable `ready` — holds a value or React binding.

**L59:** ``  
Blank line — visual spacing.

**L60:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L61:** `    <div>`  
JSX markup — describes HTML structure React will render.

**L62:** `      <PageIntro title="Documents">`  
JSX markup — describes HTML structure React will render.

**L63:** `        One file per slot. You can only continue when all five show as uploaded.`  
Executable statement: `One file per slot. You can only continue when all five show as uploade…`

**L64:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L65:** ``  
Blank line — visual spacing.

**L66:** `      {error ? (`  
Executable statement: `{error ? (`

**L67:** `        <p className="mt-4 text-[0.875rem] text-rust" role="alert">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L68:** `          {error}`  
Executable statement: `{error}`

**L69:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L70:** `      ) : null}`  
Executable statement: `) : null}`

**L71:** ``  
Blank line — visual spacing.

**L72:** `      <Panel className="mt-8 overflow-hidden">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L73:** `        <ul className="divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L74:** `          {DOCS.map((doc) => {`  
Assignment / binding: `{DOCS.map((doc) => {`

**L75:** `            const status = data.documents[doc.kind]`  
Constant/variable `status` — holds a value or React binding.

**L76:** `            const inputId = 'doc-${doc.kind}'`  
Constant/variable `inputId` — holds a value or React binding.

**L77:** `            return (`  
Returns JSX UI (or a value) to render / callers.

**L78:** `              <li`  
JSX markup — describes HTML structure React will render.

**L79:** `                key={doc.kind}`  
Assignment / binding: `key={doc.kind}`

**L80:** `                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-b...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L81:** `              >`  
JSX markup — describes HTML structure React will render.

**L82:** `                <div className="flex items-start gap-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L83:** `                  <IconTile`  
JSX markup — describes HTML structure React will render.

**L84:** `                    size="sm"`  
Assignment / binding: `size="sm"`

**L85:** `                    className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L86:** `                      status === 'uploaded' && 'bg-sage-soft text-sage',`  
Assignment / binding: `status === 'uploaded' && 'bg-sage-soft text-sage',`

**L87:** `                      status === 'rejected' && 'bg-rust-soft text-rust',`  
Assignment / binding: `status === 'rejected' && 'bg-rust-soft text-rust',`

**L88:** `                      status === 'idle' && 'bg-surface text-ink-muted',`  
Assignment / binding: `status === 'idle' && 'bg-surface text-ink-muted',`

**L89:** `                    )}`  
Executable statement: `)}`

**L90:** `                  >`  
JSX markup — describes HTML structure React will render.

**L91:** `                    <StatusIcon status={status} />`  
JSX markup — describes HTML structure React will render.

**L92:** `                  </IconTile>`  
JSX markup — describes HTML structure React will render.

**L93:** `                  <div>`  
JSX markup — describes HTML structure React will render.

**L94:** `                    <p className="font-semibold text-ink">{doc.title}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L95:** `                    <p className="text-[0.875rem] text-ink-muted">{doc.hint}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L96:** `                    <p`  
JSX markup — describes HTML structure React will render.

**L97:** `                      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L98:** `                        'mt-1 text-[0.8125rem] font-semibold',`  
Executable statement: `'mt-1 text-[0.8125rem] font-semibold',`

**L99:** `                        status === 'uploaded' && 'text-sage',`  
Assignment / binding: `status === 'uploaded' && 'text-sage',`

**L100:** `                        status === 'rejected' && 'text-rust',`  
Assignment / binding: `status === 'rejected' && 'text-rust',`

**L101:** `                        status === 'uploading' && 'text-teal',`  
Assignment / binding: `status === 'uploading' && 'text-teal',`

**L102:** `                        status === 'idle' && 'text-ink-muted',`  
Assignment / binding: `status === 'idle' && 'text-ink-muted',`

**L103:** `                      )}`  
Executable statement: `)}`

**L104:** `                    >`  
JSX markup — describes HTML structure React will render.

**L105:** `                      {statusLabel(status)}`  
Executable statement: `{statusLabel(status)}`

**L106:** `                    </p>`  
JSX markup — describes HTML structure React will render.

**L107:** `                  </div>`  
JSX markup — describes HTML structure React will render.

**L108:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L109:** `                <div>`  
JSX markup — describes HTML structure React will render.

**L110:** `                  <label`  
JSX markup — describes HTML structure React will render.

**L111:** `                    htmlFor={inputId}`  
Assignment / binding: `htmlFor={inputId}`

**L112:** `                    className="inline-flex min-h-11 cursor-pointer items-center rounded-sm border...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L113:** `                  >`  
JSX markup — describes HTML structure React will render.

**L114:** `                    {status === 'uploaded' ? 'Replace file' : 'Choose file'}`  
Assignment / binding: `{status === 'uploaded' ? 'Replace file' : 'Choose file'}`

**L115:** `                  </label>`  
JSX markup — describes HTML structure React will render.

**L116:** `                  <input`  
JSX markup — describes HTML structure React will render.

**L117:** `                    id={inputId}`  
Assignment / binding: `id={inputId}`

**L118:** `                    type="file"`  
Assignment / binding: `type="file"`

**L119:** `                    accept=".pdf,image/*"`  
Assignment / binding: `accept=".pdf,image/*"`

**L120:** `                    className="sr-only"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L121:** `                    disabled={status === 'uploading'}`  
Assignment / binding: `disabled={status === 'uploading'}`

**L122:** `                    onChange={(e) => {`  
Assignment / binding: `onChange={(e) => {`

**L123:** `                      const file = e.target.files?.[0]`  
Constant/variable `file` — holds a value or React binding.

**L124:** `                      if (file) void upload(doc.kind, file)`  
Conditional — runs the following block only when the condition is true.

**L125:** `                    }}`  
Closes the previous block/object/function.

**L126:** `                  />`  
JSX markup — describes HTML structure React will render.

**L127:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L128:** `              </li>`  
JSX markup — describes HTML structure React will render.

**L129:** `            )`  
Executable statement: `)`

**L130:** `          })}`  
Closes the previous block/object/function.

**L131:** `        </ul>`  
JSX markup — describes HTML structure React will render.

**L132:** `      </Panel>`  
JSX markup — describes HTML structure React will render.

**L133:** ``  
Blank line — visual spacing.

**L134:** `      <StepActions>`  
JSX markup — describes HTML structure React will render.

**L135:** `        <Button`  
JSX markup — describes HTML structure React will render.

**L136:** `          type="button"`  
Assignment / binding: `type="button"`

**L137:** `          variant="ghost"`  
Assignment / binding: `variant="ghost"`

**L138:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L139:** `            setStep(1)`  
Executable statement: `setStep(1)`

**L140:** `            navigate('/apply/details')`  
React Router navigation — changes the URL/page without a full reload.

**L141:** `          }}`  
Closes the previous block/object/function.

**L142:** `        >`  
JSX markup — describes HTML structure React will render.

**L143:** `          Back`  
Executable statement: `Back`

**L144:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L145:** `        <Button`  
JSX markup — describes HTML structure React will render.

**L146:** `          type="button"`  
Assignment / binding: `type="button"`

**L147:** `          variant="primary"`  
Assignment / binding: `variant="primary"`

**L148:** `          disabled={!ready}`  
Assignment / binding: `disabled={!ready}`

**L149:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L150:** `            setStep(3)`  
Executable statement: `setStep(3)`

**L151:** `            navigate('/apply/terms')`  
React Router navigation — changes the URL/page without a full reload.

**L152:** `          }}`  
Closes the previous block/object/function.

**L153:** `        >`  
JSX markup — describes HTML structure React will render.

**L154:** `          Continue to terms`  
Executable statement: `Continue to terms`

**L155:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L156:** `      </StepActions>`  
JSX markup — describes HTML structure React will render.

**L157:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L158:** `  )`  
Executable statement: `)`

**L159:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/application/DoneStep.tsx`

_48 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Apply step 5: confirmation + reference number.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Reads reference from applicationStore (set after submit).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Links to /dashboard while admin decision is pending.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { useApplicationStore } from '@/store/applicationStore'`  
Import — brings in `@/store/applicationStore` so this file can use it.

**L11:** `import { PageIntro, Panel, SectionLabel, accentBtn } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `export function DoneStep() {`  
Defines function `DoneStep` — callable unit of UI/logic.

**L14:** `  const { data, reset } = useApplicationStore()`  
Constant/variable `?` — holds a value or React binding.

**L15:** `  const reference = data.reference ?? 'TF-PENDING'`  
Constant/variable `reference` — holds a value or React binding.

**L16:** ``  
Blank line — visual spacing.

**L17:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L18:** `    <div>`  
JSX markup — describes HTML structure React will render.

**L19:** `      <PageIntro title="We have your application">`  
JSX markup — describes HTML structure React will render.

**L20:** `        Most decisions come back within one working day. Keep your phone nearby — we`  
Executable statement: `Most decisions come back within one working day. Keep your phone nearb…`

**L21:** `        may ask for one thing to be clearer.`  
Executable statement: `may ask for one thing to be clearer.`

**L22:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L23:** ``  
Blank line — visual spacing.

**L24:** `      <Panel className="mt-8 p-5 sm:p-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L25:** `        <SectionLabel>Your reference</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L26:** `        <p className="mt-2 select-all font-mono text-[1.5rem] font-semibold tracking-tight text-i...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L27:** `          {reference}`  
Executable statement: `{reference}`

**L28:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L29:** `        <p className="mt-2 text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L30:** `          Screenshot this or write it down. You’ll need it if you call us.`  
Executable statement: `Screenshot this or write it down. You’ll need it if you call us.`

**L31:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L32:** `      </Panel>`  
JSX markup — describes HTML structure React will render.

**L33:** ``  
Blank line — visual spacing.

**L34:** `      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L35:** `        <Link to="/dashboard" className={accentBtn}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L36:** `          Go to your account`  
Executable statement: `Go to your account`

**L37:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L38:** `        <Link`  
JSX markup — describes HTML structure React will render.

**L39:** `          to="/"`  
Assignment / binding: `to="/"`

**L40:** `          onClick={() => reset()}`  
Assignment / binding: `onClick={() => reset()}`

**L41:** `          className="inline-flex min-h-11 items-center text-[1rem] font-semibold text-teal hover:...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L42:** `        >`  
JSX markup — describes HTML structure React will render.

**L43:** `          Back to home`  
Executable statement: `Back to home`

**L44:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L45:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L46:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L47:** `  )`  
Executable statement: `)`

**L48:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/application/ReviewStep.tsx`

_144 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Apply step 4: confirm details, accept terms, submit.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - apiClient.submitApplication -> ApplicationController.submit -> status pending.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - After submit, application appears in AdminPanel queue for approve/decline.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Next: DoneStep. Route: /apply/review.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `import { useNavigate } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L11:** `import { useApplicationStore } from '@/store/applicationStore'`  
Import — brings in `@/store/applicationStore` so this file can use it.

**L12:** `import { calculateLoanQuote } from '@/lib/loanCalc'`  
Import — brings in `@/lib/loanCalc` so this file can use it.

**L13:** `import { formatRand } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L14:** `import { Button, PageIntro, Panel, SectionLabel, StepActions } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L15:** ``  
Blank line — visual spacing.

**L16:** `function RowList({`  
Defines function `RowList` — callable unit of UI/logic.

**L17:** `  title,`  
Executable statement: `title,`

**L18:** `  rows,`  
Executable statement: `rows,`

**L19:** `}: {`  
Closes the previous block/object/function.

**L20:** `  title: string`  
Executable statement: `title: string`

**L21:** `  rows: Array<[string, string]>`  
JSX markup — describes HTML structure React will render.

**L22:** `}) {`  
Closes the previous block/object/function.

**L23:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L24:** `    <Panel className="overflow-hidden">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L25:** `      <div className="border-b border-line px-5 py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L26:** `        <SectionLabel>{title}</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L27:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L28:** `      <dl className="divide-y divide-line px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L29:** `        {rows.map(([label, value]) => (`  
Assignment / binding: `{rows.map(([label, value]) => (`

**L30:** `          <div`  
JSX markup — describes HTML structure React will render.

**L31:** `            key={label}`  
Assignment / binding: `key={label}`

**L32:** `            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L33:** `          >`  
JSX markup — describes HTML structure React will render.

**L34:** `            <dt className="text-[0.875rem] text-ink-muted">{label}</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L35:** `            <dd className="text-[0.9375rem] text-ink sm:text-right sm:font-mono">{value}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L36:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L37:** `        ))}`  
Executable statement: `))}`

**L38:** `      </dl>`  
JSX markup — describes HTML structure React will render.

**L39:** `    </Panel>`  
JSX markup — describes HTML structure React will render.

**L40:** `  )`  
Executable statement: `)`

**L41:** `}`  
Closes the previous block/object/function.

**L42:** ``  
Blank line — visual spacing.

**L43:** `export function ReviewStep() {`  
Defines function `ReviewStep` — callable unit of UI/logic.

**L44:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L45:** `  const { data, setStep, setReference, allDocumentsReady } = useApplicationStore()`  
Constant/variable `?` — holds a value or React binding.

**L46:** `  const quote = calculateLoanQuote(data.amount, data.termMonths)`  
Constant/variable `quote` — holds a value or React binding.

**L47:** ``  
Blank line — visual spacing.

**L48:** `  const submit = () => {`  
Constant/variable `submit` — holds a value or React binding.

**L49:** `    if (!allDocumentsReady()) {`  
Conditional — runs the following block only when the condition is true.

**L50:** `      navigate('/apply/documents')`  
React Router navigation — changes the URL/page without a full reload.

**L51:** `      return`  
Executable statement: `return`

**L52:** `    }`  
Closes the previous block/object/function.

**L53:** `    const ref = 'TF-${Date.now().toString().slice(-8)}'`  
Constant/variable `ref` — holds a value or React binding.

**L54:** `    setReference(ref)`  
Executable statement: `setReference(ref)`

**L55:** `    setStep(5)`  
Executable statement: `setStep(5)`

**L56:** `    navigate('/apply/done')`  
React Router navigation — changes the URL/page without a full reload.

**L57:** `  }`  
Closes the previous block/object/function.

**L58:** ``  
Blank line — visual spacing.

**L59:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L60:** `    <div>`  
JSX markup — describes HTML structure React will render.

**L61:** `      <PageIntro title="Check this, then send it">`  
JSX markup — describes HTML structure React will render.

**L62:** `        Go back and change anything that looks wrong. Submitting starts the decision`  
Executable statement: `Go back and change anything that looks wrong. Submitting starts the de…`

**L63:** `        clock.`  
Executable statement: `clock.`

**L64:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L65:** ``  
Blank line — visual spacing.

**L66:** `      <div className="mt-8 space-y-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L67:** `        <RowList`  
JSX markup — describes HTML structure React will render.

**L68:** `          title="You"`  
Assignment / binding: `title="You"`

**L69:** `          rows={[`  
Assignment / binding: `rows={[`

**L70:** `            ['Product', data.product === 'domestic' ? 'Domestic worker loan' : 'Cash loan'],`  
Assignment / binding: `['Product', data.product === 'domestic' ? 'Domestic worker loan' : 'Ca…`

**L71:** `            ['Name', '${data.details.firstName ?? ''} ${data.details.lastName ?? ''}'.trim() || '...`  
Executable statement: `['Name', `${data.details.firstName ?? ''} ${data.details.lastName ?? '…`

**L72:** `            ['ID number', data.details.idNumber ?? '—'],`  
Executable statement: `['ID number', data.details.idNumber ?? '—'],`

**L73:** `            ['Phone', data.details.phone ?? '—'],`  
Executable statement: `['Phone', data.details.phone ?? '—'],`

**L74:** `            ['Email', data.details.email ?? '—'],`  
Executable statement: `['Email', data.details.email ?? '—'],`

**L75:** `            ['Employment', data.details.employmentStatus ?? '—'],`  
Executable statement: `['Employment', data.details.employmentStatus ?? '—'],`

**L76:** `            [`  
Executable statement: `[`

**L77:** `              'Monthly income',`  
Executable statement: `'Monthly income',`

**L78:** `              data.details.monthlyIncome ? 'R${data.details.monthlyIncome}' : '—',`  
Executable statement: `data.details.monthlyIncome ? `R${data.details.monthlyIncome}` : '—',`

**L79:** `            ],`  
Executable statement: `],`

**L80:** `          ]}`  
Executable statement: `]}`

**L81:** `        />`  
JSX markup — describes HTML structure React will render.

**L82:** `        <RowList`  
JSX markup — describes HTML structure React will render.

**L83:** `          title="The loan"`  
Assignment / binding: `title="The loan"`

**L84:** `          rows={[`  
Assignment / binding: `rows={[`

**L85:** `            ['Amount', formatRand(quote.amount)],`  
Executable statement: `['Amount', formatRand(quote.amount)],`

**L86:** `            ['Term', '${quote.termMonths} month${quote.termMonths === 1 ? '' : 's'}'],`  
Assignment / binding: `['Term', `${quote.termMonths} month${quote.termMonths === 1 ? '' : 's'…`

**L87:** `            ['Monthly instalment', formatRand(quote.monthlyInstalment)],`  
Executable statement: `['Monthly instalment', formatRand(quote.monthlyInstalment)],`

**L88:** `            ['Interest', formatRand(quote.interestCost)],`  
Executable statement: `['Interest', formatRand(quote.interestCost)],`

**L89:** `            ['Total you repay', formatRand(quote.totalRepayable)],`  
Executable statement: `['Total you repay', formatRand(quote.totalRepayable)],`

**L90:** `          ]}`  
Executable statement: `]}`

**L91:** `        />`  
JSX markup — describes HTML structure React will render.

**L92:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L93:** ``  
Blank line — visual spacing.

**L94:** `      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L95:** `        <button`  
JSX markup — describes HTML structure React will render.

**L96:** `          type="button"`  
Assignment / binding: `type="button"`

**L97:** `          className="font-semibold text-teal hover:underline"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L98:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L99:** `            setStep(1)`  
Executable statement: `setStep(1)`

**L100:** `            navigate('/apply/details')`  
React Router navigation — changes the URL/page without a full reload.

**L101:** `          }}`  
Closes the previous block/object/function.

**L102:** `        >`  
JSX markup — describes HTML structure React will render.

**L103:** `          Edit details`  
Executable statement: `Edit details`

**L104:** `        </button>`  
JSX markup — describes HTML structure React will render.

**L105:** `        <button`  
JSX markup — describes HTML structure React will render.

**L106:** `          type="button"`  
Assignment / binding: `type="button"`

**L107:** `          className="font-semibold text-teal hover:underline"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L108:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L109:** `            setStep(2)`  
Executable statement: `setStep(2)`

**L110:** `            navigate('/apply/documents')`  
React Router navigation — changes the URL/page without a full reload.

**L111:** `          }}`  
Closes the previous block/object/function.

**L112:** `        >`  
JSX markup — describes HTML structure React will render.

**L113:** `          Edit documents`  
Executable statement: `Edit documents`

**L114:** `        </button>`  
JSX markup — describes HTML structure React will render.

**L115:** `        <button`  
JSX markup — describes HTML structure React will render.

**L116:** `          type="button"`  
Assignment / binding: `type="button"`

**L117:** `          className="font-semibold text-teal hover:underline"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L118:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L119:** `            setStep(3)`  
Executable statement: `setStep(3)`

**L120:** `            navigate('/apply/terms')`  
React Router navigation — changes the URL/page without a full reload.

**L121:** `          }}`  
Closes the previous block/object/function.

**L122:** `        >`  
JSX markup — describes HTML structure React will render.

**L123:** `          Edit terms`  
Executable statement: `Edit terms`

**L124:** `        </button>`  
JSX markup — describes HTML structure React will render.

**L125:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L126:** ``  
Blank line — visual spacing.

**L127:** `      <StepActions>`  
JSX markup — describes HTML structure React will render.

**L128:** `        <Button`  
JSX markup — describes HTML structure React will render.

**L129:** `          type="button"`  
Assignment / binding: `type="button"`

**L130:** `          variant="ghost"`  
Assignment / binding: `variant="ghost"`

**L131:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L132:** `            setStep(3)`  
Executable statement: `setStep(3)`

**L133:** `            navigate('/apply/terms')`  
React Router navigation — changes the URL/page without a full reload.

**L134:** `          }}`  
Closes the previous block/object/function.

**L135:** `        >`  
JSX markup — describes HTML structure React will render.

**L136:** `          Back`  
Executable statement: `Back`

**L137:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L138:** `        <Button type="button" variant="primary" onClick={submit}>`  
JSX markup — describes HTML structure React will render.

**L139:** `          Submit application`  
Executable statement: `Submit application`

**L140:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L141:** `      </StepActions>`  
JSX markup — describes HTML structure React will render.

**L142:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L143:** `  )`  
Executable statement: `)`

**L144:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/application/TermsStep.tsx`

_57 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Apply step 3: choose amount + term (quote).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Updates applicationStore.setTerms; quote uses loanCalc.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Next: ReviewStep. Route: /apply/terms.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useNavigate } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { useApplicationStore } from '@/store/applicationStore'`  
Import — brings in `@/store/applicationStore` so this file can use it.

**L11:** `import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'`  
Import — brings in `@/components/ledger/RepaymentLedger` so this file can use it.

**L12:** `import { Button, PageIntro, StepActions } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `export function TermsStep() {`  
Defines function `TermsStep` — callable unit of UI/logic.

**L15:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L16:** `  const { data, setTerms, setStep } = useApplicationStore()`  
Constant/variable `?` — holds a value or React binding.

**L17:** ``  
Blank line — visual spacing.

**L18:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L19:** `    <div>`  
JSX markup — describes HTML structure React will render.

**L20:** `      <PageIntro title="Loan terms">`  
JSX markup — describes HTML structure React will render.

**L21:** `        Pick an amount and a term. The monthly instalment, interest, and total update`  
Executable statement: `Pick an amount and a term. The monthly instalment, interest, and total…`

**L22:** `        as you go.`  
Executable statement: `as you go.`

**L23:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L24:** ``  
Blank line — visual spacing.

**L25:** `      <div className="mt-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L26:** `        <RepaymentLedger`  
JSX markup — describes HTML structure React will render.

**L27:** `          initialAmount={data.amount}`  
Assignment / binding: `initialAmount={data.amount}`

**L28:** `          initialTerm={data.termMonths}`  
Assignment / binding: `initialTerm={data.termMonths}`

**L29:** `          onChange={(amount, termMonths) => setTerms(amount, termMonths)}`  
Assignment / binding: `onChange={(amount, termMonths) => setTerms(amount, termMonths)}`

**L30:** `        />`  
JSX markup — describes HTML structure React will render.

**L31:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L32:** ``  
Blank line — visual spacing.

**L33:** `      <StepActions>`  
JSX markup — describes HTML structure React will render.

**L34:** `        <Button`  
JSX markup — describes HTML structure React will render.

**L35:** `          type="button"`  
Assignment / binding: `type="button"`

**L36:** `          variant="ghost"`  
Assignment / binding: `variant="ghost"`

**L37:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L38:** `            setStep(2)`  
Executable statement: `setStep(2)`

**L39:** `            navigate('/apply/documents')`  
React Router navigation — changes the URL/page without a full reload.

**L40:** `          }}`  
Closes the previous block/object/function.

**L41:** `        >`  
JSX markup — describes HTML structure React will render.

**L42:** `          Back`  
Executable statement: `Back`

**L43:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L44:** `        <Button`  
JSX markup — describes HTML structure React will render.

**L45:** `          type="button"`  
Assignment / binding: `type="button"`

**L46:** `          variant="primary"`  
Assignment / binding: `variant="primary"`

**L47:** `          onClick={() => {`  
Assignment / binding: `onClick={() => {`

**L48:** `            setStep(4)`  
Executable statement: `setStep(4)`

**L49:** `            navigate('/apply/review')`  
React Router navigation — changes the URL/page without a full reload.

**L50:** `          }}`  
Closes the previous block/object/function.

**L51:** `        >`  
JSX markup — describes HTML structure React will render.

**L52:** `          Continue to review`  
Executable statement: `Continue to review`

**L53:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L54:** `      </StepActions>`  
JSX markup — describes HTML structure React will render.

**L55:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L56:** `  )`  
Executable statement: `)`

**L57:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/auth/RequireAdmin.tsx`

_27 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Route guard: logged-in user with role ADMIN.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Wraps /admin -> AdminPanel in App.tsx.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Role comes from login response (User.role); backend also requires ROLE_ADMIN on /api/admin/**.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Navigate, useLocation } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { useAuthStore } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L11:** `import type { ReactNode } from 'react'`  
Import — brings in `react` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `export function RequireAdmin({ children }: { children: ReactNode }) {`  
Defines function `RequireAdmin` — callable unit of UI/logic.

**L14:** `  const token = useAuthStore((s) => s.token)`  
Constant/variable `token` — holds a value or React binding.

**L15:** `  const user = useAuthStore((s) => s.user)`  
Constant/variable `user` — holds a value or React binding.

**L16:** `  const location = useLocation()`  
Constant/variable `location` — holds a value or React binding.

**L17:** ``  
Blank line — visual spacing.

**L18:** `  if (!token) {`  
Conditional — runs the following block only when the condition is true.

**L19:** `    return <Navigate to={'/login?next=${location.pathname}'} replace />`  
Returns JSX UI (or a value) to render / callers.

**L20:** `  }`  
Closes the previous block/object/function.

**L21:** ``  
Blank line — visual spacing.

**L22:** `  if (user?.role !== 'ADMIN') {`  
Conditional — runs the following block only when the condition is true.

**L23:** `    return <Navigate to="/dashboard" replace />`  
Returns JSX UI (or a value) to render / callers.

**L24:** `  }`  
Closes the previous block/object/function.

**L25:** ``  
Blank line — visual spacing.

**L26:** `  return children`  
Returns a value to the caller: `children`

**L27:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/auth/RequireAuth.tsx`

_22 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Route guard: any logged-in user (JWT present in authStore).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Wraps /apply and /dashboard in App.tsx.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Backend still enforces auth via SecurityConfig + JwtAuthenticationFilter.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Navigate, useLocation } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { useAuthStore } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L11:** `import type { ReactNode } from 'react'`  
Import — brings in `react` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `export function RequireAuth({ children }: { children: ReactNode }) {`  
Defines function `RequireAuth` — callable unit of UI/logic.

**L14:** `  const token = useAuthStore((s) => s.token)`  
Constant/variable `token` — holds a value or React binding.

**L15:** `  const location = useLocation()`  
Constant/variable `location` — holds a value or React binding.

**L16:** ``  
Blank line — visual spacing.

**L17:** `  if (!token) {`  
Conditional — runs the following block only when the condition is true.

**L18:** `    return <Navigate to={'/login?next=${location.pathname}'} replace />`  
Returns JSX UI (or a value) to render / callers.

**L19:** `  }`  
Closes the previous block/object/function.

**L20:** ``  
Blank line — visual spacing.

**L21:** `  return children`  
Returns a value to the caller: `children`

**L22:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/layout/ApplyLayout.tsx`

_83 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Shell + progress for /apply/* steps.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Progress driven by applicationStore.step / route segment.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Children: DetailsStep ... DoneStep (App.tsx nested routes).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Outlet, useLocation } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L11:** `import {`  
Import — brings in `dependency` so this file can use it.

**L12:** `  BrandMark,`  
Executable statement: `BrandMark,`

**L13:** `  IslandShell,`  
Executable statement: `IslandShell,`

**L14:** `  softChipActive,`  
Executable statement: `softChipActive,`

**L15:** `  softChipIdle,`  
Executable statement: `softChipIdle,`

**L16:** `} from '@/components/ui/primitives'`  
Closes the previous block/object/function.

**L17:** ``  
Blank line — visual spacing.

**L18:** `const STEPS = [`  
Constant/variable `STEPS` — holds a value or React binding.

**L19:** `  { n: 1, path: 'details', label: 'Details' },`  
Executable statement: `{ n: 1, path: 'details', label: 'Details' },`

**L20:** `  { n: 2, path: 'documents', label: 'Documents' },`  
Executable statement: `{ n: 2, path: 'documents', label: 'Documents' },`

**L21:** `  { n: 3, path: 'terms', label: 'Terms' },`  
Executable statement: `{ n: 3, path: 'terms', label: 'Terms' },`

**L22:** `  { n: 4, path: 'review', label: 'Review' },`  
Executable statement: `{ n: 4, path: 'review', label: 'Review' },`

**L23:** `  { n: 5, path: 'done', label: 'Done' },`  
Executable statement: `{ n: 5, path: 'done', label: 'Done' },`

**L24:** `]`  
Executable statement: `]`

**L25:** ``  
Blank line — visual spacing.

**L26:** `export function ApplyLayout() {`  
Defines function `ApplyLayout` — callable unit of UI/logic.

**L27:** `  const location = useLocation()`  
Constant/variable `location` — holds a value or React binding.

**L28:** `  const current =`  
Constant/variable `current` — holds a value or React binding.

**L29:** `    STEPS.find((s) => location.pathname.includes('/apply/${s.path}'))?.n ?? 1`  
Assignment / binding: `STEPS.find((s) => location.pathname.includes(`/apply/${s.path}`))?.n ?…`

**L30:** `  const currentStep = STEPS[current - 1]`  
Constant/variable `currentStep` — holds a value or React binding.

**L31:** `  const progress = ((current - 1) / (STEPS.length - 1)) * 100`  
Constant/variable `progress` — holds a value or React binding.

**L32:** ``  
Blank line — visual spacing.

**L33:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L34:** `    <div className="min-h-screen bg-surface">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L35:** `      <a href="#apply-main" className="skip-link">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L36:** `        Skip to form`  
Executable statement: `Skip to form`

**L37:** `      </a>`  
JSX markup — describes HTML structure React will render.

**L38:** `      <IslandShell contentClassName="max-w-2xl">`  
JSX markup — describes HTML structure React will render.

**L39:** `        <div className="flex items-center justify-between px-4 py-3 sm:px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L40:** `          <BrandMark compact />`  
JSX markup — describes HTML structure React will render.

**L41:** `          <p className="font-mono text-[0.8125rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L42:** `            Step {current} of {STEPS.length}`  
Executable statement: `Step {current} of {STEPS.length}`

**L43:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L44:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L45:** `        <div`  
JSX markup — describes HTML structure React will render.

**L46:** `          className="h-1 bg-surface"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L47:** `          role="progressbar"`  
Assignment / binding: `role="progressbar"`

**L48:** `          aria-valuemin={1}`  
Assignment / binding: `aria-valuemin={1}`

**L49:** `          aria-valuemax={STEPS.length}`  
Assignment / binding: `aria-valuemax={STEPS.length}`

**L50:** `          aria-valuenow={current}`  
Assignment / binding: `aria-valuenow={current}`

**L51:** `          aria-label={'Application step ${current} of ${STEPS.length}: ${currentStep.label}'}`  
Assignment / binding: `aria-label={`Application step ${current} of ${STEPS.length}: ${current…`

**L52:** `        >`  
JSX markup — describes HTML structure React will render.

**L53:** `          <div`  
JSX markup — describes HTML structure React will render.

**L54:** `            className="h-full bg-teal transition-[width] duration-300 ease-out"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L55:** `            style={{ width: '${progress}%' }}`  
Assignment / binding: `style={{ width: `${progress}%` }}`

**L56:** `          />`  
JSX markup — describes HTML structure React will render.

**L57:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L58:** `        <nav aria-label="Application steps" className="overflow-x-auto px-3 py-2 sm:px-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L59:** `          <ol className="flex gap-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L60:** `            {STEPS.map((step) => (`  
Assignment / binding: `{STEPS.map((step) => (`

**L61:** `              <li key={step.n} className="shrink-0">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L62:** `                <span`  
JSX markup — describes HTML structure React will render.

**L63:** `                  className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L64:** `                    'inline-flex px-3 py-2 text-[0.8125rem]',`  
Executable statement: `'inline-flex px-3 py-2 text-[0.8125rem]',`

**L65:** `                    step.n === current && softChipActive,`  
Assignment / binding: `step.n === current && softChipActive,`

**L66:** `                    step.n < current && 'rounded-sm font-medium text-teal',`  
Executable statement: `step.n < current && 'rounded-sm font-medium text-teal',`

**L67:** `                    step.n > current && softChipIdle,`  
Executable statement: `step.n > current && softChipIdle,`

**L68:** `                  )}`  
Executable statement: `)}`

**L69:** `                  aria-current={step.n === current ? 'step' : undefined}`  
Assignment / binding: `aria-current={step.n === current ? 'step' : undefined}`

**L70:** `                >`  
JSX markup — describes HTML structure React will render.

**L71:** `                  {step.n}. {step.label}`  
Executable statement: `{step.n}. {step.label}`

**L72:** `                </span>`  
JSX markup — describes HTML structure React will render.

**L73:** `              </li>`  
JSX markup — describes HTML structure React will render.

**L74:** `            ))}`  
Executable statement: `))}`

**L75:** `          </ol>`  
JSX markup — describes HTML structure React will render.

**L76:** `        </nav>`  
JSX markup — describes HTML structure React will render.

**L77:** `      </IslandShell>`  
JSX markup — describes HTML structure React will render.

**L78:** `      <div id="apply-main" className="mx-auto max-w-2xl px-4 py-8 sm:px-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L79:** `        <Outlet />`  
JSX markup — describes HTML structure React will render.

**L80:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L81:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L82:** `  )`  
Executable statement: `)`

**L83:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/layout/DashboardLayout.tsx`

_63 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Shell + side nav for /dashboard/*.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Nested routes: DashboardPage, LoanDetailPage, RepaymentsPage, etc.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ``  
Blank line — visual spacing.

**L8:** `import { Link, NavLink, Outlet } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L9:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L10:** `import { BrandMark, IslandShell, softChipActive, softChipIdle } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L11:** ``  
Blank line — visual spacing.

**L12:** `const links = [`  
Constant/variable `links` — holds a value or React binding.

**L13:** `  { to: '/dashboard', label: 'Overview', end: true },`  
Executable statement: `{ to: '/dashboard', label: 'Overview', end: true },`

**L14:** `  { to: '/dashboard/loans/LN-20481', label: 'This loan', end: false },`  
Executable statement: `{ to: '/dashboard/loans/LN-20481', label: 'This loan', end: false },`

**L15:** `  { to: '/dashboard/repayments', label: 'Payments', end: false },`  
Executable statement: `{ to: '/dashboard/repayments', label: 'Payments', end: false },`

**L16:** `  { to: '/dashboard/documents', label: 'Documents', end: false },`  
Executable statement: `{ to: '/dashboard/documents', label: 'Documents', end: false },`

**L17:** `  { to: '/dashboard/profile', label: 'Profile', end: false },`  
Executable statement: `{ to: '/dashboard/profile', label: 'Profile', end: false },`

**L18:** `]`  
Executable statement: `]`

**L19:** ``  
Blank line — visual spacing.

**L20:** `export function DashboardLayout() {`  
Defines function `DashboardLayout` — callable unit of UI/logic.

**L21:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L22:** `    <div className="min-h-screen bg-surface">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L23:** `      <a href="#dash-main" className="skip-link">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L24:** `        Skip to account`  
Executable statement: `Skip to account`

**L25:** `      </a>`  
JSX markup — describes HTML structure React will render.

**L26:** `      <IslandShell contentClassName="max-w-5xl">`  
JSX markup — describes HTML structure React will render.

**L27:** `        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L28:** `          <div className="flex items-baseline gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L29:** `            <BrandMark />`  
JSX markup — describes HTML structure React will render.

**L30:** `            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-mut...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L31:** `              Account`  
Executable statement: `Account`

**L32:** `            </span>`  
JSX markup — describes HTML structure React will render.

**L33:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L34:** `          <Link to="/" className="text-[0.875rem] text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L35:** `            Back to site`  
Executable statement: `Back to site`

**L36:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L37:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L38:** `        <div className="overflow-x-auto border-t border-line px-3 py-2 sm:px-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L39:** `          <nav className="flex gap-1" aria-label="Account">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L40:** `            {links.map((l) => (`  
Assignment / binding: `{links.map((l) => (`

**L41:** `              <NavLink`  
JSX markup — describes HTML structure React will render.

**L42:** `                key={l.to}`  
Assignment / binding: `key={l.to}`

**L43:** `                to={l.to}`  
Assignment / binding: `to={l.to}`

**L44:** `                end={l.end}`  
Assignment / binding: `end={l.end}`

**L45:** `                className={({ isActive }) =>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L46:** `                  cn(`  
Executable statement: `cn(`

**L47:** `                    'whitespace-nowrap px-3 py-2 text-[0.875rem] transition-colors',`  
Executable statement: `'whitespace-nowrap px-3 py-2 text-[0.875rem] transition-colors',`

**L48:** `                    isActive ? softChipActive : softChipIdle,`  
Executable statement: `isActive ? softChipActive : softChipIdle,`

**L49:** `                  )`  
Executable statement: `)`

**L50:** `                }`  
Closes the previous block/object/function.

**L51:** `              >`  
JSX markup — describes HTML structure React will render.

**L52:** `                {l.label}`  
Executable statement: `{l.label}`

**L53:** `              </NavLink>`  
JSX markup — describes HTML structure React will render.

**L54:** `            ))}`  
Executable statement: `))}`

**L55:** `          </nav>`  
JSX markup — describes HTML structure React will render.

**L56:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L57:** `      </IslandShell>`  
JSX markup — describes HTML structure React will render.

**L58:** `      <div id="dash-main" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L59:** `        <Outlet />`  
JSX markup — describes HTML structure React will render.

**L60:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L61:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L62:** `  )`  
Executable statement: `)`

**L63:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/layout/PublicLayout.tsx`

_521 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Site chrome for public pages: header, footer, outlet.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Shows Admin nav when authStore.user.role === 'ADMIN' -> /admin.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Sign-in / account links use authStore token state.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L11:** `import { useEffect, useId, useRef, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L12:** `import { BrandMark, buttonVariants, SectionLabel } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L13:** `import { useAuthStore } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L14:** `import { brand, legalEntityLine } from '@/content/brand'`  
Import — brings in `@/content/brand` so this file can use it.

**L15:** `import {`  
Import — brings in `dependency` so this file can use it.

**L16:** `  Banknote,`  
Executable statement: `Banknote,`

**L17:** `  ChevronDown,`  
Executable statement: `ChevronDown,`

**L18:** `  CircleHelp,`  
Executable statement: `CircleHelp,`

**L19:** `  HandCoins,`  
Executable statement: `HandCoins,`

**L20:** `  Home,`  
Executable statement: `Home,`

**L21:** `  LayoutDashboard,`  
Executable statement: `LayoutDashboard,`

**L22:** `  Menu,`  
Executable statement: `Menu,`

**L23:** `  Phone,`  
Executable statement: `Phone,`

**L24:** `  Send,`  
Executable statement: `Send,`

**L25:** `  Shield,`  
Executable statement: `Shield,`

**L26:** `  UserRound,`  
Executable statement: `UserRound,`

**L27:** `  X,`  
Executable statement: `X,`

**L28:** `} from 'lucide-react'`  
Closes the previous block/object/function.

**L29:** ``  
Blank line — visual spacing.

**L30:** `const products = [`  
Constant/variable `products` — holds a value or React binding.

**L31:** `  {`  
Opens a new code block.

**L32:** `    to: '/products/cash-loan',`  
Executable statement: `to: '/products/cash-loan',`

**L33:** `    label: 'Cash loan',`  
Executable statement: `label: 'Cash loan',`

**L34:** `    desc: 'R500–R20,000 · see the instalment first',`  
Executable statement: `desc: 'R500–R20,000 · see the instalment first',`

**L35:** `    Icon: Banknote,`  
Executable statement: `Icon: Banknote,`

**L36:** `  },`  
Closes the previous block/object/function.

**L37:** `  {`  
Opens a new code block.

**L38:** `    to: '/products/domestic',`  
Executable statement: `to: '/products/domestic',`

**L39:** `    label: 'Domestic worker',`  
Executable statement: `label: 'Domestic worker',`

**L40:** `    desc: 'Same range · shorter work questions',`  
Executable statement: `desc: 'Same range · shorter work questions',`

**L41:** `    Icon: Home,`  
Executable statement: `Icon: Home,`

**L42:** `  },`  
Closes the previous block/object/function.

**L43:** `  {`  
Opens a new code block.

**L44:** `    to: '/products/transfer',`  
Executable statement: `to: '/products/transfer',`

**L45:** `    label: 'Send money',`  
Executable statement: `label: 'Send money',`

**L46:** `    desc: 'Fee in rand before you pay',`  
Executable statement: `desc: 'Fee in rand before you pay',`

**L47:** `    Icon: Send,`  
Executable statement: `Icon: Send,`

**L48:** `  },`  
Closes the previous block/object/function.

**L49:** `  {`  
Opens a new code block.

**L50:** `    to: '/products/debt-review',`  
Executable statement: `to: '/products/debt-review',`

**L51:** `    label: 'Debt review',`  
Executable statement: `label: 'Debt review',`

**L52:** `    desc: 'Advice — not a loan',`  
Executable statement: `desc: 'Advice — not a loan',`

**L53:** `    Icon: HandCoins,`  
Executable statement: `Icon: HandCoins,`

**L54:** `  },`  
Closes the previous block/object/function.

**L55:** `]`  
Executable statement: `]`

**L56:** ``  
Blank line — visual spacing.

**L57:** `export function SiteHeader() {`  
Defines function `SiteHeader` — callable unit of UI/logic.

**L58:** `  const [mobileOpen, setMobileOpen] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L59:** `  const [productsOpen, setProductsOpen] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L60:** `  const user = useAuthStore((s) => s.user)`  
Constant/variable `user` — holds a value or React binding.

**L61:** `  const location = useLocation()`  
Constant/variable `location` — holds a value or React binding.

**L62:** `  const productsRef = useRef<HTMLDivElement>(null)`  
Constant/variable `productsRef` — holds a value or React binding.

**L63:** `  const productsBtnId = useId()`  
Constant/variable `productsBtnId` — holds a value or React binding.

**L64:** `  const productsPanelId = useId()`  
Constant/variable `productsPanelId` — holds a value or React binding.

**L65:** ``  
Blank line — visual spacing.

**L66:** `  const productActive = products.some((p) => location.pathname.startsWith(p.to))`  
Constant/variable `productActive` — holds a value or React binding.

**L67:** ``  
Blank line — visual spacing.

**L68:** `  useEffect(() => {`  
React effect hook — runs side effects after render (fetch, observers, sync).

**L69:** `    setMobileOpen(false)`  
Executable statement: `setMobileOpen(false)`

**L70:** `    setProductsOpen(false)`  
Executable statement: `setProductsOpen(false)`

**L71:** `  }, [location.pathname])`  
Closes the previous block/object/function.

**L72:** ``  
Blank line — visual spacing.

**L73:** `  useEffect(() => {`  
React effect hook — runs side effects after render (fetch, observers, sync).

**L74:** `    if (!mobileOpen) return`  
Conditional — runs the following block only when the condition is true.

**L75:** `    const prev = document.body.style.overflow`  
Constant/variable `prev` — holds a value or React binding.

**L76:** `    document.body.style.overflow = 'hidden'`  
Assignment / binding: `document.body.style.overflow = 'hidden'`

**L77:** `    return () => {`  
Returns JSX UI (or a value) to render / callers.

**L78:** `      document.body.style.overflow = prev`  
Assignment / binding: `document.body.style.overflow = prev`

**L79:** `    }`  
Closes the previous block/object/function.

**L80:** `  }, [mobileOpen])`  
Closes the previous block/object/function.

**L81:** ``  
Blank line — visual spacing.

**L82:** `  useEffect(() => {`  
React effect hook — runs side effects after render (fetch, observers, sync).

**L83:** `    if (!productsOpen) return`  
Conditional — runs the following block only when the condition is true.

**L84:** `    const onKey = (e: KeyboardEvent) => {`  
Constant/variable `onKey` — holds a value or React binding.

**L85:** `      if (e.key === 'Escape') setProductsOpen(false)`  
Conditional — runs the following block only when the condition is true.

**L86:** `    }`  
Closes the previous block/object/function.

**L87:** `    const onPointer = (e: MouseEvent) => {`  
Constant/variable `onPointer` — holds a value or React binding.

**L88:** `      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {`  
Conditional — runs the following block only when the condition is true.

**L89:** `        setProductsOpen(false)`  
Executable statement: `setProductsOpen(false)`

**L90:** `      }`  
Closes the previous block/object/function.

**L91:** `    }`  
Closes the previous block/object/function.

**L92:** `    document.addEventListener('keydown', onKey)`  
Executable statement: `document.addEventListener('keydown', onKey)`

**L93:** `    document.addEventListener('mousedown', onPointer)`  
Executable statement: `document.addEventListener('mousedown', onPointer)`

**L94:** `    return () => {`  
Returns JSX UI (or a value) to render / callers.

**L95:** `      document.removeEventListener('keydown', onKey)`  
Executable statement: `document.removeEventListener('keydown', onKey)`

**L96:** `      document.removeEventListener('mousedown', onPointer)`  
Executable statement: `document.removeEventListener('mousedown', onPointer)`

**L97:** `    }`  
Closes the previous block/object/function.

**L98:** `  }, [productsOpen])`  
Closes the previous block/object/function.

**L99:** ``  
Blank line — visual spacing.

**L100:** `  const accountHref = user ? '/dashboard' : '/login'`  
Constant/variable `accountHref` — holds a value or React binding.

**L101:** `  const accountLabel = user ? 'Account' : 'Sign in'`  
Constant/variable `accountLabel` — holds a value or React binding.

**L102:** ``  
Blank line — visual spacing.

**L103:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L104:** `    <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L105:** `      <header className="site-nav relative mx-auto max-w-6xl overflow-hidden rounded-md border bo...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L106:** `        <div className="accent-bar absolute inset-x-0 top-0" />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L107:** `        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L108:** `          <BrandMark onClick={() => setMobileOpen(false)} />`  
JSX markup — describes HTML structure React will render.

**L109:** ``  
Blank line — visual spacing.

**L110:** `          <nav className="ml-2 hidden flex-1 items-center justify-center gap-1 lg:flex" aria-labe...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L111:** `            <div className="relative" ref={productsRef}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L112:** `              <button`  
JSX markup — describes HTML structure React will render.

**L113:** `                id={productsBtnId}`  
Assignment / binding: `id={productsBtnId}`

**L114:** `                type="button"`  
Assignment / binding: `type="button"`

**L115:** `                aria-expanded={productsOpen}`  
Assignment / binding: `aria-expanded={productsOpen}`

**L116:** `                aria-controls={productsPanelId}`  
Assignment / binding: `aria-controls={productsPanelId}`

**L117:** `                aria-haspopup="true"`  
Assignment / binding: `aria-haspopup="true"`

**L118:** `                onClick={() => setProductsOpen((v) => !v)}`  
Assignment / binding: `onClick={() => setProductsOpen((v) => !v)}`

**L119:** `                className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L120:** `                  'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem] transiti...`  
Executable statement: `'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem]…`

**L121:** `                  productActive || productsOpen`  
Executable statement: `productActive || productsOpen`

**L122:** `                    ? 'bg-teal-soft font-semibold text-teal'`  
Executable statement: `? 'bg-teal-soft font-semibold text-teal'`

**L123:** `                    : 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`  
Executable statement: `: 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`

**L124:** `                )}`  
Executable statement: `)}`

**L125:** `              >`  
JSX markup — describes HTML structure React will render.

**L126:** `                Products`  
Executable statement: `Products`

**L127:** `                <ChevronDown`  
JSX markup — describes HTML structure React will render.

**L128:** `                  size={15}`  
Assignment / binding: `size={15}`

**L129:** `                  strokeWidth={2}`  
Assignment / binding: `strokeWidth={2}`

**L130:** `                  className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L131:** `                  aria-hidden`  
Executable statement: `aria-hidden`

**L132:** `                />`  
JSX markup — describes HTML structure React will render.

**L133:** `              </button>`  
JSX markup — describes HTML structure React will render.

**L134:** ``  
Blank line — visual spacing.

**L135:** `              {productsOpen ? (`  
Executable statement: `{productsOpen ? (`

**L136:** `                <div`  
JSX markup — describes HTML structure React will render.

**L137:** `                  id={productsPanelId}`  
Assignment / binding: `id={productsPanelId}`

**L138:** `                  role="menu"`  
Assignment / binding: `role="menu"`

**L139:** `                  aria-labelledby={productsBtnId}`  
Assignment / binding: `aria-labelledby={productsBtnId}`

**L140:** `                  className="absolute left-1/2 top-full z-50 mt-2 w-[22rem] -translate-x-1/2 roun...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L141:** `                >`  
JSX markup — describes HTML structure React will render.

**L142:** `                  <p className="px-3 pb-2 pt-1 text-[0.6875rem] font-semibold uppercase tracking-...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L143:** `                    What you can do`  
Executable statement: `What you can do`

**L144:** `                  </p>`  
JSX markup — describes HTML structure React will render.

**L145:** `                  <ul className="space-y-0.5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L146:** `                    {products.map(({ to, label, desc, Icon }) => (`  
Assignment / binding: `{products.map(({ to, label, desc, Icon }) => (`

**L147:** `                      <li key={to}>`  
JSX markup — describes HTML structure React will render.

**L148:** `                        <Link`  
JSX markup — describes HTML structure React will render.

**L149:** `                          to={to}`  
Assignment / binding: `to={to}`

**L150:** `                          role="menuitem"`  
Assignment / binding: `role="menuitem"`

**L151:** `                          onClick={() => setProductsOpen(false)}`  
Assignment / binding: `onClick={() => setProductsOpen(false)}`

**L152:** `                          className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L153:** `                            'flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hove...`  
Executable statement: `'flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hover…`

**L154:** `                            location.pathname === to && 'bg-teal-soft',`  
Assignment / binding: `location.pathname === to && 'bg-teal-soft',`

**L155:** `                          )}`  
Executable statement: `)}`

**L156:** `                        >`  
JSX markup — describes HTML structure React will render.

**L157:** `                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justi...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L158:** `                            <Icon size={16} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L159:** `                          </span>`  
JSX markup — describes HTML structure React will render.

**L160:** `                          <span className="min-w-0">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L161:** `                            <span className="block text-[0.875rem] font-semibold text-ink">{label...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L162:** `                            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L163:** `                              {desc}`  
Executable statement: `{desc}`

**L164:** `                            </span>`  
JSX markup — describes HTML structure React will render.

**L165:** `                          </span>`  
JSX markup — describes HTML structure React will render.

**L166:** `                        </Link>`  
JSX markup — describes HTML structure React will render.

**L167:** `                      </li>`  
JSX markup — describes HTML structure React will render.

**L168:** `                    ))}`  
Executable statement: `))}`

**L169:** `                  </ul>`  
JSX markup — describes HTML structure React will render.

**L170:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L171:** `              ) : null}`  
Executable statement: `) : null}`

**L172:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L173:** ``  
Blank line — visual spacing.

**L174:** `            <NavLink`  
JSX markup — describes HTML structure React will render.

**L175:** `              to="/faq"`  
Assignment / binding: `to="/faq"`

**L176:** `              className={({ isActive }) =>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L177:** `                cn(`  
Executable statement: `cn(`

**L178:** `                  'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem] transiti...`  
Executable statement: `'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem]…`

**L179:** `                  isActive`  
Executable statement: `isActive`

**L180:** `                    ? 'bg-teal-soft font-semibold text-teal'`  
Executable statement: `? 'bg-teal-soft font-semibold text-teal'`

**L181:** `                    : 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`  
Executable statement: `: 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`

**L182:** `                )`  
Executable statement: `)`

**L183:** `              }`  
Closes the previous block/object/function.

**L184:** `            >`  
JSX markup — describes HTML structure React will render.

**L185:** `              <CircleHelp size={15} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L186:** `              Help`  
Executable statement: `Help`

**L187:** `            </NavLink>`  
JSX markup — describes HTML structure React will render.

**L188:** `            <NavLink`  
JSX markup — describes HTML structure React will render.

**L189:** `              to="/contact"`  
Assignment / binding: `to="/contact"`

**L190:** `              className={({ isActive }) =>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L191:** `                cn(`  
Executable statement: `cn(`

**L192:** `                  'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem] transiti...`  
Executable statement: `'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.875rem]…`

**L193:** `                  isActive`  
Executable statement: `isActive`

**L194:** `                    ? 'bg-teal-soft font-semibold text-teal'`  
Executable statement: `? 'bg-teal-soft font-semibold text-teal'`

**L195:** `                    : 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`  
Executable statement: `: 'font-medium text-ink-muted hover:bg-surface hover:text-ink',`

**L196:** `                )`  
Executable statement: `)`

**L197:** `              }`  
Closes the previous block/object/function.

**L198:** `            >`  
JSX markup — describes HTML structure React will render.

**L199:** `              Contact`  
Executable statement: `Contact`

**L200:** `            </NavLink>`  
JSX markup — describes HTML structure React will render.

**L201:** `          </nav>`  
JSX markup — describes HTML structure React will render.

**L202:** ``  
Blank line — visual spacing.

**L203:** `          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L204:** `            <a`  
JSX markup — describes HTML structure React will render.

**L205:** `              href={brand.phoneHref}`  
Assignment / binding: `href={brand.phoneHref}`

**L206:** `              className="hidden items-center gap-1.5 rounded-sm px-2.5 py-2 text-[0.8125rem] font...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L207:** `            >`  
JSX markup — describes HTML structure React will render.

**L208:** `              <Phone size={14} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L209:** `              <span className="font-mono">{brand.phoneDisplay}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L210:** `            </a>`  
JSX markup — describes HTML structure React will render.

**L211:** ``  
Blank line — visual spacing.

**L212:** `            {user?.role === 'ADMIN' ? (`  
Assignment / binding: `{user?.role === 'ADMIN' ? (`

**L213:** `              <Link`  
JSX markup — describes HTML structure React will render.

**L214:** `                to="/admin"`  
Assignment / binding: `to="/admin"`

**L215:** `                className="hidden items-center gap-1.5 rounded-sm px-2.5 py-2 text-[0.8125rem] fo...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L216:** `              >`  
JSX markup — describes HTML structure React will render.

**L217:** `                <Shield size={14} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L218:** `                Admin`  
Executable statement: `Admin`

**L219:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L220:** `            ) : null}`  
Executable statement: `) : null}`

**L221:** ``  
Blank line — visual spacing.

**L222:** `            <Link`  
JSX markup — describes HTML structure React will render.

**L223:** `              to={accountHref}`  
Assignment / binding: `to={accountHref}`

**L224:** `              className="hidden items-center gap-1.5 rounded-sm px-2.5 py-2 text-[0.875rem] font-...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L225:** `            >`  
JSX markup — describes HTML structure React will render.

**L226:** `              {user ? (`  
Executable statement: `{user ? (`

**L227:** `                <LayoutDashboard size={15} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L228:** `              ) : (`  
Executable statement: `) : (`

**L229:** `                <UserRound size={15} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L230:** `              )}`  
Executable statement: `)}`

**L231:** `              {accountLabel}`  
Executable statement: `{accountLabel}`

**L232:** `            </Link>`  
JSX markup — describes HTML structure React will render.

**L233:** ``  
Blank line — visual spacing.

**L234:** `            <Link`  
JSX markup — describes HTML structure React will render.

**L235:** `              to="/apply/details"`  
Assignment / binding: `to="/apply/details"`

**L236:** `              className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L237:** `                buttonVariants({ variant: 'primary' }),`  
Executable statement: `buttonVariants({ variant: 'primary' }),`

**L238:** `                'min-h-10 px-4 text-[0.875rem]',`  
Executable statement: `'min-h-10 px-4 text-[0.875rem]',`

**L239:** `              )}`  
Executable statement: `)}`

**L240:** `            >`  
JSX markup — describes HTML structure React will render.

**L241:** `              Apply`  
Executable statement: `Apply`

**L242:** `            </Link>`  
JSX markup — describes HTML structure React will render.

**L243:** ``  
Blank line — visual spacing.

**L244:** `            <button`  
JSX markup — describes HTML structure React will render.

**L245:** `              type="button"`  
Assignment / binding: `type="button"`

**L246:** `              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm tex...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L247:** `              aria-expanded={mobileOpen}`  
Assignment / binding: `aria-expanded={mobileOpen}`

**L248:** `              aria-controls="mobile-nav"`  
Assignment / binding: `aria-controls="mobile-nav"`

**L249:** `              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}`  
Assignment / binding: `aria-label={mobileOpen ? 'Close menu' : 'Open menu'}`

**L250:** `              onClick={() => setMobileOpen((v) => !v)}`  
Assignment / binding: `onClick={() => setMobileOpen((v) => !v)}`

**L251:** `            >`  
JSX markup — describes HTML structure React will render.

**L252:** `              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.7...`  
Assignment / binding: `{mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} str…`

**L253:** `            </button>`  
JSX markup — describes HTML structure React will render.

**L254:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L255:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L256:** ``  
Blank line — visual spacing.

**L257:** `        {mobileOpen ? (`  
Executable statement: `{mobileOpen ? (`

**L258:** `          <nav`  
JSX markup — describes HTML structure React will render.

**L259:** `            id="mobile-nav"`  
Assignment / binding: `id="mobile-nav"`

**L260:** `            className="max-h-[min(78vh,36rem)] overflow-y-auto border-t border-line lg:hidden"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L261:** `            aria-label="Primary"`  
Assignment / binding: `aria-label="Primary"`

**L262:** `          >`  
JSX markup — describes HTML structure React will render.

**L263:** `            <div className="space-y-5 px-3 py-4 sm:px-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L264:** `              <div>`  
JSX markup — describes HTML structure React will render.

**L265:** `                <p className="px-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-i...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L266:** `                  Products`  
Executable statement: `Products`

**L267:** `                </p>`  
JSX markup — describes HTML structure React will render.

**L268:** `                <ul className="mt-2 space-y-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L269:** `                  {products.map(({ to, label, desc, Icon }) => (`  
Assignment / binding: `{products.map(({ to, label, desc, Icon }) => (`

**L270:** `                    <li key={to}>`  
JSX markup — describes HTML structure React will render.

**L271:** `                      <Link`  
JSX markup — describes HTML structure React will render.

**L272:** `                        to={to}`  
Assignment / binding: `to={to}`

**L273:** `                        onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L274:** `                        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L275:** `                          'flex items-start gap-3 rounded-sm px-2 py-3 transition-colors hover:bg...`  
Executable statement: `'flex items-start gap-3 rounded-sm px-2 py-3 transition-colors hover:b…`

**L276:** `                          location.pathname === to && 'bg-teal-soft',`  
Assignment / binding: `location.pathname === to && 'bg-teal-soft',`

**L277:** `                        )}`  
Executable statement: `)}`

**L278:** `                      >`  
JSX markup — describes HTML structure React will render.

**L279:** `                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L280:** `                          <Icon size={18} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L281:** `                        </span>`  
JSX markup — describes HTML structure React will render.

**L282:** `                        <span>`  
JSX markup — describes HTML structure React will render.

**L283:** `                          <span className="block text-[1rem] font-semibold text-ink">{label}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L284:** `                          <span className="mt-0.5 block text-[0.875rem] text-ink-muted">{desc}</s...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L285:** `                        </span>`  
JSX markup — describes HTML structure React will render.

**L286:** `                      </Link>`  
JSX markup — describes HTML structure React will render.

**L287:** `                    </li>`  
JSX markup — describes HTML structure React will render.

**L288:** `                  ))}`  
Executable statement: `))}`

**L289:** `                </ul>`  
JSX markup — describes HTML structure React will render.

**L290:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L291:** ``  
Blank line — visual spacing.

**L292:** `              <div className="border-t border-line pt-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L293:** `                <p className="px-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-i...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L294:** `                  Help`  
Executable statement: `Help`

**L295:** `                </p>`  
JSX markup — describes HTML structure React will render.

**L296:** `                <ul className="mt-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L297:** `                  <li>`  
JSX markup — describes HTML structure React will render.

**L298:** `                    <Link`  
JSX markup — describes HTML structure React will render.

**L299:** `                      to="/faq"`  
Assignment / binding: `to="/faq"`

**L300:** `                      className="flex min-h-11 items-center px-2 text-[1rem] text-ink"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L301:** `                      onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L302:** `                    >`  
JSX markup — describes HTML structure React will render.

**L303:** `                      FAQ`  
Executable statement: `FAQ`

**L304:** `                    </Link>`  
JSX markup — describes HTML structure React will render.

**L305:** `                  </li>`  
JSX markup — describes HTML structure React will render.

**L306:** `                  <li>`  
JSX markup — describes HTML structure React will render.

**L307:** `                    <Link`  
JSX markup — describes HTML structure React will render.

**L308:** `                      to="/contact"`  
Assignment / binding: `to="/contact"`

**L309:** `                      className="flex min-h-11 items-center px-2 text-[1rem] text-ink"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L310:** `                      onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L311:** `                    >`  
JSX markup — describes HTML structure React will render.

**L312:** `                      Contact`  
Executable statement: `Contact`

**L313:** `                    </Link>`  
JSX markup — describes HTML structure React will render.

**L314:** `                  </li>`  
JSX markup — describes HTML structure React will render.

**L315:** `                  <li>`  
JSX markup — describes HTML structure React will render.

**L316:** `                    <a`  
JSX markup — describes HTML structure React will render.

**L317:** `                      href={brand.phoneHref}`  
Assignment / binding: `href={brand.phoneHref}`

**L318:** `                      className="flex min-h-11 items-center gap-2 px-2 text-[1rem] text-ink"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L319:** `                    >`  
JSX markup — describes HTML structure React will render.

**L320:** `                      <Phone size={16} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L321:** `                      <span className="font-mono text-[0.9375rem]">{brand.phoneDisplay}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L322:** `                    </a>`  
JSX markup — describes HTML structure React will render.

**L323:** `                  </li>`  
JSX markup — describes HTML structure React will render.

**L324:** `                </ul>`  
JSX markup — describes HTML structure React will render.

**L325:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L326:** ``  
Blank line — visual spacing.

**L327:** `              <div className="border-t border-line pt-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L328:** `                <Link`  
JSX markup — describes HTML structure React will render.

**L329:** `                  to={accountHref}`  
Assignment / binding: `to={accountHref}`

**L330:** `                  className="flex min-h-11 items-center gap-2 px-2 text-[1rem] font-medium text-ink"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L331:** `                  onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L332:** `                >`  
JSX markup — describes HTML structure React will render.

**L333:** `                  {user ? (`  
Executable statement: `{user ? (`

**L334:** `                    <LayoutDashboard size={18} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L335:** `                  ) : (`  
Executable statement: `) : (`

**L336:** `                    <UserRound size={18} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L337:** `                  )}`  
Executable statement: `)}`

**L338:** `                  {accountLabel}`  
Executable statement: `{accountLabel}`

**L339:** `                </Link>`  
JSX markup — describes HTML structure React will render.

**L340:** `                {user?.role === 'ADMIN' ? (`  
Assignment / binding: `{user?.role === 'ADMIN' ? (`

**L341:** `                  <Link`  
JSX markup — describes HTML structure React will render.

**L342:** `                    to="/admin"`  
Assignment / binding: `to="/admin"`

**L343:** `                    className="flex min-h-11 items-center gap-2 px-2 text-[1rem] text-ink"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L344:** `                    onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L345:** `                  >`  
JSX markup — describes HTML structure React will render.

**L346:** `                    <Shield size={18} strokeWidth={1.75} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L347:** `                    Admin`  
Executable statement: `Admin`

**L348:** `                  </Link>`  
JSX markup — describes HTML structure React will render.

**L349:** `                ) : null}`  
Executable statement: `) : null}`

**L350:** `                <Link`  
JSX markup — describes HTML structure React will render.

**L351:** `                  to="/apply/details"`  
Assignment / binding: `to="/apply/details"`

**L352:** `                  onClick={() => setMobileOpen(false)}`  
Assignment / binding: `onClick={() => setMobileOpen(false)}`

**L353:** `                  className={cn(buttonVariants({ variant: 'primary' }), 'mt-3 w-full')}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L354:** `                >`  
JSX markup — describes HTML structure React will render.

**L355:** `                  Apply now`  
Executable statement: `Apply now`

**L356:** `                </Link>`  
JSX markup — describes HTML structure React will render.

**L357:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L358:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L359:** `          </nav>`  
JSX markup — describes HTML structure React will render.

**L360:** `        ) : null}`  
Executable statement: `) : null}`

**L361:** `      </header>`  
JSX markup — describes HTML structure React will render.

**L362:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L363:** `  )`  
Executable statement: `)`

**L364:** `}`  
Closes the previous block/object/function.

**L365:** ``  
Blank line — visual spacing.

**L366:** `export function SiteFooter() {`  
Defines function `SiteFooter` — callable unit of UI/logic.

**L367:** `  const user = useAuthStore((s) => s.user)`  
Constant/variable `user` — holds a value or React binding.

**L368:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L369:** `    <footer className="mt-auto border-t border-line bg-white">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L370:** `      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1f...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L371:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L372:** `          <BrandMark />`  
JSX markup — describes HTML structure React will render.

**L373:** `          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L374:** `            Short-term cash loans for people who want the repayment in rand, on the`  
Executable statement: `Short-term cash loans for people who want the repayment in rand, on th…`

**L375:** `            page, before they apply.`  
Executable statement: `page, before they apply.`

**L376:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L377:** `          <p className="mt-4 max-w-sm text-[0.8125rem] leading-relaxed text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L378:** `            {brand.productName} is a product of {brand.legalName}.`  
Executable statement: `{brand.productName} is a product of {brand.legalName}.`

**L379:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L380:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L381:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L382:** `          <SectionLabel>Products</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L383:** `          <ul className="mt-3 space-y-2 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L384:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L385:** `              <Link to="/products/cash-loan" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L386:** `                Cash loan`  
Executable statement: `Cash loan`

**L387:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L388:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L389:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L390:** `              <Link to="/products/domestic" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L391:** `                Domestic worker loan`  
Executable statement: `Domestic worker loan`

**L392:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L393:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L394:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L395:** `              <Link to="/products/transfer" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L396:** `                Send money`  
Executable statement: `Send money`

**L397:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L398:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L399:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L400:** `              <Link to="/products/debt-review" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L401:** `                Debt review`  
Executable statement: `Debt review`

**L402:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L403:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L404:** `          </ul>`  
JSX markup — describes HTML structure React will render.

**L405:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L406:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L407:** `          <SectionLabel>Help</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L408:** `          <ul className="mt-3 space-y-2 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L409:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L410:** `              <Link to="/faq" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L411:** `                FAQ`  
Executable statement: `FAQ`

**L412:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L413:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L414:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L415:** `              <Link to="/contact" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L416:** `                Contact`  
Executable statement: `Contact`

**L417:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L418:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L419:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L420:** `              <Link to="/login" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L421:** `                Client login`  
Executable statement: `Client login`

**L422:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L423:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L424:** `            {user?.role === 'ADMIN' ? (`  
Assignment / binding: `{user?.role === 'ADMIN' ? (`

**L425:** `              <li>`  
JSX markup — describes HTML structure React will render.

**L426:** `                <Link to="/admin" className="text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L427:** `                  Admin panel`  
Executable statement: `Admin panel`

**L428:** `                </Link>`  
JSX markup — describes HTML structure React will render.

**L429:** `              </li>`  
JSX markup — describes HTML structure React will render.

**L430:** `            ) : null}`  
Executable statement: `) : null}`

**L431:** `          </ul>`  
JSX markup — describes HTML structure React will render.

**L432:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L433:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L434:** ``  
Blank line — visual spacing.

**L435:** `      <div className="border-t border-line bg-teal text-white">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L436:** `        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L437:** `          <BrandMark inverse />`  
JSX markup — describes HTML structure React will render.

**L438:** `          <div className="space-y-1 text-[0.875rem] leading-relaxed text-white/80">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L439:** `            <p>{brand.copyright}</p>`  
JSX markup — describes HTML structure React will render.

**L440:** `            <p>{legalEntityLine()}</p>`  
JSX markup — describes HTML structure React will render.

**L441:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L442:** `          <ul className="flex flex-col gap-2 text-[0.875rem] sm:flex-row sm:gap-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L443:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L444:** `              <Link to="/privacy" className="text-white/80 underline-offset-2 hover:text-white ho...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L445:** `                Privacy Statement`  
Executable statement: `Privacy Statement`

**L446:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L447:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L448:** `            <li>`  
JSX markup — describes HTML structure React will render.

**L449:** `              <Link to="/terms" className="text-white/80 underline-offset-2 hover:text-white hove...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L450:** `                Terms &amp; Conditions`  
Executable statement: `Terms &amp; Conditions`

**L451:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L452:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L453:** `          </ul>`  
JSX markup — describes HTML structure React will render.

**L454:** `          <div>`  
JSX markup — describes HTML structure React will render.

**L455:** `            <p className="text-[0.75rem] font-semibold tracking-wider text-white/55">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L456:** `              FOLLOW {brand.productName.toUpperCase()}`  
Executable statement: `FOLLOW {brand.productName.toUpperCase()}`

**L457:** `            </p>`  
JSX markup — describes HTML structure React will render.

**L458:** `            <div className="mt-3 flex justify-center gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L459:** `              <a`  
JSX markup — describes HTML structure React will render.

**L460:** `                href={brand.social.facebook}`  
Assignment / binding: `href={brand.social.facebook}`

**L461:** `                target="_blank"`  
Assignment / binding: `target="_blank"`

**L462:** `                rel="noopener noreferrer"`  
Assignment / binding: `rel="noopener noreferrer"`

**L463:** `                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border bo...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L464:** `                aria-label="Tshedza Finance on Facebook"`  
Assignment / binding: `aria-label="Tshedza Finance on Facebook"`

**L465:** `              >`  
JSX markup — describes HTML structure React will render.

**L466:** `                <FacebookIcon />`  
JSX markup — describes HTML structure React will render.

**L467:** `              </a>`  
JSX markup — describes HTML structure React will render.

**L468:** `              <a`  
JSX markup — describes HTML structure React will render.

**L469:** `                href={brand.social.linkedin}`  
Assignment / binding: `href={brand.social.linkedin}`

**L470:** `                target="_blank"`  
Assignment / binding: `target="_blank"`

**L471:** `                rel="noopener noreferrer"`  
Assignment / binding: `rel="noopener noreferrer"`

**L472:** `                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border bo...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L473:** `                aria-label="Tshedza Finance on LinkedIn"`  
Assignment / binding: `aria-label="Tshedza Finance on LinkedIn"`

**L474:** `              >`  
JSX markup — describes HTML structure React will render.

**L475:** `                <LinkedInIcon />`  
JSX markup — describes HTML structure React will render.

**L476:** `              </a>`  
JSX markup — describes HTML structure React will render.

**L477:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L478:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L479:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L480:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L481:** ``  
Blank line — visual spacing.

**L482:** `      <div className="border-t border-line bg-white">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L483:** `        <p className="mx-auto max-w-6xl px-4 py-4 text-[0.8125rem] leading-relaxed text-ink-muted...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L484:** `          This is a portfolio frontend. Lending to the public in South Africa needs`  
Field or method declaration: `This is a portfolio frontend. Lending to the public in South Africa ne…`

**L485:** `          NCR credit-provider and FSP registration first.`  
Executable statement: `NCR credit-provider and FSP registration first.`

**L486:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L487:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L488:** `    </footer>`  
JSX markup — describes HTML structure React will render.

**L489:** `  )`  
Executable statement: `)`

**L490:** `}`  
Closes the previous block/object/function.

**L491:** ``  
Blank line — visual spacing.

**L492:** `function FacebookIcon() {`  
Defines function `FacebookIcon` — callable unit of UI/logic.

**L493:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L494:** `    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>`  
JSX markup — describes HTML structure React will render.

**L495:** `      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />`  
JSX markup — describes HTML structure React will render.

**L496:** `    </svg>`  
JSX markup — describes HTML structure React will render.

**L497:** `  )`  
Executable statement: `)`

**L498:** `}`  
Closes the previous block/object/function.

**L499:** ``  
Blank line — visual spacing.

**L500:** `function LinkedInIcon() {`  
Defines function `LinkedInIcon` — callable unit of UI/logic.

**L501:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L502:** `    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>`  
JSX markup — describes HTML structure React will render.

**L503:** `      <path d="M6.5 9H3.7v11.3h2.8V9zM5.1 3.7a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3zM20.3 9...`  
JSX markup — describes HTML structure React will render.

**L504:** `    </svg>`  
JSX markup — describes HTML structure React will render.

**L505:** `  )`  
Executable statement: `)`

**L506:** `}`  
Closes the previous block/object/function.

**L507:** ``  
Blank line — visual spacing.

**L508:** `export function PublicLayout() {`  
Defines function `PublicLayout` — callable unit of UI/logic.

**L509:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L510:** `    <div className="flex min-h-screen flex-col bg-surface">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L511:** `      <a href="#main" className="skip-link">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L512:** `        Skip to content`  
Executable statement: `Skip to content`

**L513:** `      </a>`  
JSX markup — describes HTML structure React will render.

**L514:** `      <SiteHeader />`  
JSX markup — describes HTML structure React will render.

**L515:** `      <main id="main" className="flex-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L516:** `        <Outlet />`  
JSX markup — describes HTML structure React will render.

**L517:** `      </main>`  
JSX markup — describes HTML structure React will render.

**L518:** `      <SiteFooter />`  
JSX markup — describes HTML structure React will render.

**L519:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L520:** `  )`  
Executable statement: `)`

**L521:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/ledger/RepaymentLedger.tsx`

_213 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Interactive quote widget (amount + term -> monthly / total).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Math from lib/loanCalc.ts (same idea as backend loan creation on approve).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Embedded on Home and product pages; CTA often links to /apply/details.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useMemo, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { calculateLoanQuote } from '@/lib/loanCalc'`  
Import — brings in `@/lib/loanCalc` so this file can use it.

**L11:** `import { formatRand, formatRandCompact, cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L12:** `import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'`  
Import — brings in `@/hooks/useAnimatedNumber` so this file can use it.

**L13:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L14:** `import {`  
Import — brings in `dependency` so this file can use it.

**L15:** `  accentBtn,`  
Executable statement: `accentBtn,`

**L16:** `  islandSurface,`  
Executable statement: `islandSurface,`

**L17:** `  SectionLabel,`  
Executable statement: `SectionLabel,`

**L18:** `  softChipActive,`  
Executable statement: `softChipActive,`

**L19:** `  softChipIdle,`  
Executable statement: `softChipIdle,`

**L20:** `} from '@/components/ui/primitives'`  
Closes the previous block/object/function.

**L21:** ``  
Blank line — visual spacing.

**L22:** `type LedgerProps = {`  
TypeScript type — describes the shape of data (compile-time only).

**L23:** `  initialAmount?: number`  
Executable statement: `initialAmount?: number`

**L24:** `  initialTerm?: number`  
Executable statement: `initialTerm?: number`

**L25:** `  showCta?: boolean`  
Executable statement: `showCta?: boolean`

**L26:** `  ctaTo?: string`  
Executable statement: `ctaTo?: string`

**L27:** `  onChange?: (amount: number, termMonths: number) => void`  
Assignment / binding: `onChange?: (amount: number, termMonths: number) => void`

**L28:** `  className?: string`  
Executable statement: `className?: string`

**L29:** `  compact?: boolean`  
Executable statement: `compact?: boolean`

**L30:** `  featured?: boolean`  
Executable statement: `featured?: boolean`

**L31:** `}`  
Closes the previous block/object/function.

**L32:** ``  
Blank line — visual spacing.

**L33:** `export function RepaymentLedger({`  
Defines function `RepaymentLedger` — callable unit of UI/logic.

**L34:** `  initialAmount = 5000,`  
Assignment / binding: `initialAmount = 5000,`

**L35:** `  initialTerm = 3,`  
Assignment / binding: `initialTerm = 3,`

**L36:** `  showCta = false,`  
Assignment / binding: `showCta = false,`

**L37:** `  ctaTo = '/apply/details',`  
Assignment / binding: `ctaTo = '/apply/details',`

**L38:** `  onChange,`  
Executable statement: `onChange,`

**L39:** `  className,`  
Executable statement: `className,`

**L40:** `  compact = false,`  
Assignment / binding: `compact = false,`

**L41:** `  featured = false,`  
Assignment / binding: `featured = false,`

**L42:** `}: LedgerProps) {`  
Closes the previous block/object/function.

**L43:** `  const [amount, setAmount] = useState(initialAmount)`  
Constant/variable `?` — holds a value or React binding.

**L44:** `  const [term, setTerm] = useState(initialTerm)`  
Constant/variable `?` — holds a value or React binding.

**L45:** ``  
Blank line — visual spacing.

**L46:** `  const quote = useMemo(() => calculateLoanQuote(amount, term), [amount, term])`  
Constant/variable `quote` — holds a value or React binding.

**L47:** ``  
Blank line — visual spacing.

**L48:** `  const animatedMonthly = useAnimatedNumber(quote.monthlyInstalment)`  
Constant/variable `animatedMonthly` — holds a value or React binding.

**L49:** `  const animatedTotal = useAnimatedNumber(quote.totalRepayable)`  
Constant/variable `animatedTotal` — holds a value or React binding.

**L50:** `  const animatedInterest = useAnimatedNumber(quote.interestCost)`  
Constant/variable `animatedInterest` — holds a value or React binding.

**L51:** ``  
Blank line — visual spacing.

**L52:** `  const updateAmount = (next: number) => {`  
Constant/variable `updateAmount` — holds a value or React binding.

**L53:** `    const clamped = Math.min(20_000, Math.max(500, next))`  
Constant/variable `clamped` — holds a value or React binding.

**L54:** `    setAmount(clamped)`  
Executable statement: `setAmount(clamped)`

**L55:** `    onChange?.(clamped, term)`  
Executable statement: `onChange?.(clamped, term)`

**L56:** `  }`  
Closes the previous block/object/function.

**L57:** ``  
Blank line — visual spacing.

**L58:** `  const updateTerm = (next: number) => {`  
Constant/variable `updateTerm` — holds a value or React binding.

**L59:** `    setTerm(next)`  
Executable statement: `setTerm(next)`

**L60:** `    onChange?.(amount, next)`  
Executable statement: `onChange?.(amount, next)`

**L61:** `  }`  
Closes the previous block/object/function.

**L62:** ``  
Blank line — visual spacing.

**L63:** `  const fill = ((amount - 500) / (20_000 - 500)) * 100`  
Constant/variable `fill` — holds a value or React binding.

**L64:** ``  
Blank line — visual spacing.

**L65:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L66:** `    <div`  
JSX markup — describes HTML structure React will render.

**L67:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L68:** `        islandSurface,`  
Executable statement: `islandSurface,`

**L69:** `        'relative overflow-hidden',`  
Executable statement: `'relative overflow-hidden',`

**L70:** `        featured && 'ledger-featured border-white/15',`  
Executable statement: `featured && 'ledger-featured border-white/15',`

**L71:** `        className,`  
Executable statement: `className,`

**L72:** `      )}`  
Executable statement: `)}`

**L73:** `    >`  
JSX markup — describes HTML structure React will render.

**L74:** `      <div className="accent-bar" />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L75:** `      <div className={cn('space-y-6', compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6')}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L76:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L77:** `          <SectionLabel>Your quote</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L78:** `          <p className="mt-1.5 text-[0.8125rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L79:** `            {quote.interestRateLabel} · estimate only, before a credit check`  
Executable statement: `{quote.interestRateLabel} · estimate only, before a credit check`

**L80:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L81:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L82:** ``  
Blank line — visual spacing.

**L83:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L84:** `          <div className="flex items-end justify-between gap-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L85:** `            <label htmlFor="loan-amount" className="text-[0.9375rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L86:** `              How much do you need?`  
Executable statement: `How much do you need?`

**L87:** `            </label>`  
JSX markup — describes HTML structure React will render.

**L88:** `            <label className="sr-only" htmlFor="loan-amount-input">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L89:** `              Amount in rand`  
Executable statement: `Amount in rand`

**L90:** `            </label>`  
JSX markup — describes HTML structure React will render.

**L91:** `            <input`  
JSX markup — describes HTML structure React will render.

**L92:** `              id="loan-amount-input"`  
Assignment / binding: `id="loan-amount-input"`

**L93:** `              type="number"`  
Assignment / binding: `type="number"`

**L94:** `              min={500}`  
Assignment / binding: `min={500}`

**L95:** `              max={20000}`  
Assignment / binding: `max={20000}`

**L96:** `              step={100}`  
Assignment / binding: `step={100}`

**L97:** `              value={amount}`  
Assignment / binding: `value={amount}`

**L98:** `              onChange={(e) => updateAmount(Number(e.target.value) || 500)}`  
Assignment / binding: `onChange={(e) => updateAmount(Number(e.target.value) || 500)}`

**L99:** `              className="w-[7.5rem] rounded-sm border border-line bg-white px-2 py-1.5 text-right...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L100:** `            />`  
JSX markup — describes HTML structure React will render.

**L101:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L102:** `          <input`  
JSX markup — describes HTML structure React will render.

**L103:** `            id="loan-amount"`  
Assignment / binding: `id="loan-amount"`

**L104:** `            type="range"`  
Assignment / binding: `type="range"`

**L105:** `            min={500}`  
Assignment / binding: `min={500}`

**L106:** `            max={20000}`  
Assignment / binding: `max={20000}`

**L107:** `            step={100}`  
Assignment / binding: `step={100}`

**L108:** `            value={amount}`  
Assignment / binding: `value={amount}`

**L109:** `            aria-valuetext={formatRandCompact(amount)}`  
Assignment / binding: `aria-valuetext={formatRandCompact(amount)}`

**L110:** `            onChange={(e) => updateAmount(Number(e.target.value))}`  
Assignment / binding: `onChange={(e) => updateAmount(Number(e.target.value))}`

**L111:** `            className="ledger-slider mt-3 w-full"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L112:** `          />`  
JSX markup — describes HTML structure React will render.

**L113:** `          <div className="mt-1 flex justify-between font-mono text-[0.75rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L114:** `            <span>R500</span>`  
JSX markup — describes HTML structure React will render.

**L115:** `            <span>R20,000</span>`  
JSX markup — describes HTML structure React will render.

**L116:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L117:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L118:** ``  
Blank line — visual spacing.

**L119:** `        <fieldset>`  
JSX markup — describes HTML structure React will render.

**L120:** `          <legend className="text-[0.9375rem] font-semibold text-ink">Over how many months?</legend>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L121:** `          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Loan term">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L122:** `            {Array.from({ length: 9 }, (_, i) => i + 1).map((m) => (`  
Assignment / binding: `{Array.from({ length: 9 }, (_, i) => i + 1).map((m) => (`

**L123:** `              <button`  
JSX markup — describes HTML structure React will render.

**L124:** `                key={m}`  
Assignment / binding: `key={m}`

**L125:** `                type="button"`  
Assignment / binding: `type="button"`

**L126:** `                role="radio"`  
Assignment / binding: `role="radio"`

**L127:** `                aria-checked={term === m}`  
Assignment / binding: `aria-checked={term === m}`

**L128:** `                onClick={() => updateTerm(m)}`  
Assignment / binding: `onClick={() => updateTerm(m)}`

**L129:** `                className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L130:** `                  'min-h-11 min-w-11 border px-3 font-mono text-[0.875rem] transition-colors',`  
Executable statement: `'min-h-11 min-w-11 border px-3 font-mono text-[0.875rem] transition-co…`

**L131:** `                  term === m`  
Assignment / binding: `term === m`

**L132:** `                    ? cn(softChipActive, 'border-transparent')`  
Executable statement: `? cn(softChipActive, 'border-transparent')`

**L133:** `                    : cn(softChipIdle, 'border-line bg-white'),`  
Executable statement: `: cn(softChipIdle, 'border-line bg-white'),`

**L134:** `                )}`  
Executable statement: `)}`

**L135:** `              >`  
JSX markup — describes HTML structure React will render.

**L136:** `                {m}`  
Executable statement: `{m}`

**L137:** `              </button>`  
JSX markup — describes HTML structure React will render.

**L138:** `            ))}`  
Executable statement: `))}`

**L139:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L140:** `        </fieldset>`  
JSX markup — describes HTML structure React will render.

**L141:** ``  
Blank line — visual spacing.

**L142:** `        <div className="border-t border-line pt-5" aria-live="polite" aria-atomic="true">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L143:** `          <p className="text-[0.8125rem] font-medium uppercase tracking-wider text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L144:** `            You would pay`  
Executable statement: `You would pay`

**L145:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L146:** `          <p className="mt-2 font-mono text-[2.15rem] font-semibold leading-none tracking-tight t...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L147:** `            {formatRand(animatedMonthly)}`  
Executable statement: `{formatRand(animatedMonthly)}`

**L148:** `            <span className="ml-1.5 font-sans text-[1rem] font-normal normal-case tracking-normal...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L149:** `              a month`  
Executable statement: `a month`

**L150:** `            </span>`  
JSX markup — describes HTML structure React will render.

**L151:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L152:** `          <dl className="mt-5 space-y-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L153:** `            <div className="flex justify-between gap-4 text-[0.875rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L154:** `              <dt className="text-ink-muted">Borrowed</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L155:** `              <dd className="font-mono tabular-nums text-ink">{formatRand(amount)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L156:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L157:** `            <div className="flex justify-between gap-4 text-[0.875rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L158:** `              <dt className="text-ink-muted">Interest</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L159:** `              <dd className="font-mono tabular-nums text-ink">{formatRand(animatedInterest)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L160:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L161:** `            <div className="flex justify-between gap-4 border-t border-line pt-2 text-[0.875rem] ...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L162:** `              <dt>Total you repay</dt>`  
JSX markup — describes HTML structure React will render.

**L163:** `              <dd className="font-mono tabular-nums">{formatRand(animatedTotal)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L164:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L165:** `          </dl>`  
JSX markup — describes HTML structure React will render.

**L166:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L167:** ``  
Blank line — visual spacing.

**L168:** `        {showCta ? (`  
Executable statement: `{showCta ? (`

**L169:** `          <Link to={ctaTo} className={cn(accentBtn, 'w-full')}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L170:** `            Apply for this loan`  
Executable statement: `Apply for this loan`

**L171:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L172:** `        ) : null}`  
Executable statement: `) : null}`

**L173:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L174:** ``  
Blank line — visual spacing.

**L175:** `      <style>{'`  
JSX markup — describes HTML structure React will render.

**L176:** `        .ledger-slider {`  
Executable statement: `.ledger-slider {`

**L177:** `          -webkit-appearance: none;`  
Executable statement: `-webkit-appearance: none;`

**L178:** `          appearance: none;`  
Executable statement: `appearance: none;`

**L179:** `          height: 6px;`  
Executable statement: `height: 6px;`

**L180:** `          border-radius: 999px;`  
Executable statement: `border-radius: 999px;`

**L181:** `          background: linear-gradient(`  
Executable statement: `background: linear-gradient(`

**L182:** `            to right,`  
Executable statement: `to right,`

**L183:** `            #0b3d3b 0%,`  
Inline comment documenting intent.

**L184:** `            #0b3d3b ${fill}%,`  
Inline comment documenting intent.

**L185:** `            #e2e8e5 ${fill}%,`  
Inline comment documenting intent.

**L186:** `            #e2e8e5 100%`  
Inline comment documenting intent.

**L187:** `          );`  
Executable statement: `);`

**L188:** `          outline: none;`  
Executable statement: `outline: none;`

**L189:** `        }`  
Closes the previous block/object/function.

**L190:** `        .ledger-slider::-webkit-slider-thumb {`  
Executable statement: `.ledger-slider::-webkit-slider-thumb {`

**L191:** `          -webkit-appearance: none;`  
Executable statement: `-webkit-appearance: none;`

**L192:** `          appearance: none;`  
Executable statement: `appearance: none;`

**L193:** `          width: 20px;`  
Executable statement: `width: 20px;`

**L194:** `          height: 20px;`  
Executable statement: `height: 20px;`

**L195:** `          border-radius: 50%;`  
Executable statement: `border-radius: 50%;`

**L196:** `          background: #0b3d3b;`  
Executable statement: `background: #0b3d3b;`

**L197:** `          border: 2px solid #fff;`  
Executable statement: `border: 2px solid #fff;`

**L198:** `          box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);`  
Executable statement: `box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);`

**L199:** `          cursor: pointer;`  
Executable statement: `cursor: pointer;`

**L200:** `        }`  
Closes the previous block/object/function.

**L201:** `        .ledger-slider::-moz-range-thumb {`  
Executable statement: `.ledger-slider::-moz-range-thumb {`

**L202:** `          width: 20px;`  
Executable statement: `width: 20px;`

**L203:** `          height: 20px;`  
Executable statement: `height: 20px;`

**L204:** `          border-radius: 50%;`  
Executable statement: `border-radius: 50%;`

**L205:** `          background: #0b3d3b;`  
Executable statement: `background: #0b3d3b;`

**L206:** `          border: 2px solid #fff;`  
Executable statement: `border: 2px solid #fff;`

**L207:** `          box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);`  
Executable statement: `box-shadow: 0 1px 3px rgb(12 18 16 / 0.25);`

**L208:** `          cursor: pointer;`  
Executable statement: `cursor: pointer;`

**L209:** `        }`  
Closes the previous block/object/function.

**L210:** `      '}</style>`  
JSX markup — describes HTML structure React will render.

**L211:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L212:** `  )`  
Executable statement: `)`

**L213:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/ui/primitives.tsx`

_422 lines_

**L1:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L2:** `import { cva, type VariantProps } from 'class-variance-authority'`  
Import — brings in `class-variance-authority` so this file can use it.

**L3:** `import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'`  
Import — brings in `react` so this file can use it.

**L4:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L5:** ``  
Blank line — visual spacing.

**L6:** `export const buttonVariants = cva(`  
Constant/variable `buttonVariants` — holds a value or React binding.

**L7:** `  'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-[0.9375rem]...`  
Executable statement: `'inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-…`

**L8:** `  {`  
Opens a new code block.

**L9:** `    variants: {`  
Executable statement: `variants: {`

**L10:** `      variant: {`  
Executable statement: `variant: {`

**L11:** `        primary:`  
Executable statement: `primary:`

**L12:** `          'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0_1px_0_rgb(255_25...`  
Executable statement: `'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0…`

**L13:** `        secondary:`  
Executable statement: `secondary:`

**L14:** `          'border border-line-strong bg-white text-ink hover:border-ink/30 hover:bg-surface hover...`  
Executable statement: `'border border-line-strong bg-white text-ink hover:border-ink/30 hover…`

**L15:** `        ghost: 'bg-transparent font-medium text-teal hover:bg-teal-soft',`  
Executable statement: `ghost: 'bg-transparent font-medium text-teal hover:bg-teal-soft',`

**L16:** `        outline:`  
Executable statement: `outline:`

**L17:** `          'border border-line bg-white font-medium text-ink hover:border-ink/30 hover:-translate-...`  
Executable statement: `'border border-line bg-white font-medium text-ink hover:border-ink/30 …`

**L18:** `        destructive: 'bg-rust text-white hover:bg-rust/90',`  
Executable statement: `destructive: 'bg-rust text-white hover:bg-rust/90',`

**L19:** `        accent:`  
Executable statement: `accent:`

**L20:** `          'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0_1px_0_rgb(255_25...`  
Executable statement: `'bg-teal text-white hover:bg-teal-deep hover:-translate-y-px shadow-[0…`

**L21:** `      },`  
Closes the previous block/object/function.

**L22:** `    },`  
Closes the previous block/object/function.

**L23:** `    defaultVariants: { variant: 'primary' },`  
Executable statement: `defaultVariants: { variant: 'primary' },`

**L24:** `  },`  
Closes the previous block/object/function.

**L25:** `)`  
Executable statement: `)`

**L26:** ``  
Blank line — visual spacing.

**L27:** `export const accentBtn = cn(buttonVariants({ variant: 'primary' }))`  
Constant/variable `accentBtn` — holds a value or React binding.

**L28:** ``  
Blank line — visual spacing.

**L29:** `export function BrandMark({`  
Defines function `BrandMark` — callable unit of UI/logic.

**L30:** `  to = '/',`  
Assignment / binding: `to = '/',`

**L31:** `  compact = false,`  
Assignment / binding: `compact = false,`

**L32:** `  inverse = false,`  
Assignment / binding: `inverse = false,`

**L33:** `  onClick,`  
Executable statement: `onClick,`

**L34:** `}: {`  
Closes the previous block/object/function.

**L35:** `  to?: string`  
Executable statement: `to?: string`

**L36:** `  compact?: boolean`  
Executable statement: `compact?: boolean`

**L37:** `  inverse?: boolean`  
Executable statement: `inverse?: boolean`

**L38:** `  onClick?: () => void`  
Assignment / binding: `onClick?: () => void`

**L39:** `}) {`  
Closes the previous block/object/function.

**L40:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L41:** `    <Link`  
JSX markup — describes HTML structure React will render.

**L42:** `      to={to}`  
Assignment / binding: `to={to}`

**L43:** `      onClick={onClick}`  
Assignment / binding: `onClick={onClick}`

**L44:** `      aria-label="Tshedza Finance"`  
Assignment / binding: `aria-label="Tshedza Finance"`

**L45:** `      className="inline-flex items-baseline gap-1.5"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L46:** `    >`  
JSX markup — describes HTML structure React will render.

**L47:** `      <span`  
JSX markup — describes HTML structure React will render.

**L48:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L49:** `          'text-[1.25rem] font-bold leading-none tracking-tight',`  
Executable statement: `'text-[1.25rem] font-bold leading-none tracking-tight',`

**L50:** `          inverse ? 'text-white' : 'text-teal',`  
Executable statement: `inverse ? 'text-white' : 'text-teal',`

**L51:** `        )}`  
Executable statement: `)}`

**L52:** `      >`  
JSX markup — describes HTML structure React will render.

**L53:** `        Tshedza`  
Executable statement: `Tshedza`

**L54:** `      </span>`  
JSX markup — describes HTML structure React will render.

**L55:** `      {compact ? null : (`  
Executable statement: `{compact ? null : (`

**L56:** `        <span`  
JSX markup — describes HTML structure React will render.

**L57:** `          className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L58:** `            'text-[0.8125rem] font-medium tracking-wide',`  
Executable statement: `'text-[0.8125rem] font-medium tracking-wide',`

**L59:** `            inverse ? 'text-white/65' : 'text-ink-muted',`  
Executable statement: `inverse ? 'text-white/65' : 'text-ink-muted',`

**L60:** `          )}`  
Executable statement: `)}`

**L61:** `        >`  
JSX markup — describes HTML structure React will render.

**L62:** `          Finance`  
Executable statement: `Finance`

**L63:** `        </span>`  
JSX markup — describes HTML structure React will render.

**L64:** `      )}`  
Executable statement: `)}`

**L65:** `    </Link>`  
JSX markup — describes HTML structure React will render.

**L66:** `  )`  
Executable statement: `)`

**L67:** `}`  
Closes the previous block/object/function.

**L68:** ``  
Blank line — visual spacing.

**L69:** `export function Button({`  
Defines function `Button` — callable unit of UI/logic.

**L70:** `  variant = 'primary',`  
Assignment / binding: `variant = 'primary',`

**L71:** `  className,`  
Executable statement: `className,`

**L72:** `  children,`  
Executable statement: `children,`

**L73:** `  ...props`  
Executable statement: `...props`

**L74:** `}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {`  
Closes the previous block/object/function.

**L75:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L76:** `    <button className={cn(buttonVariants({ variant }), className)} {...props}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L77:** `      {children}`  
Executable statement: `{children}`

**L78:** `    </button>`  
JSX markup — describes HTML structure React will render.

**L79:** `  )`  
Executable statement: `)`

**L80:** `}`  
Closes the previous block/object/function.

**L81:** ``  
Blank line — visual spacing.

**L82:** `const fieldClass =`  
Constant/variable `fieldClass` — holds a value or React binding.

**L83:** `  'mt-1.5 min-h-11 w-full rounded-sm border bg-white px-3 py-2.5 text-[1rem] text-ink outline-non...`  
Executable statement: `'mt-1.5 min-h-11 w-full rounded-sm border bg-white px-3 py-2.5 text-[1…`

**L84:** ``  
Blank line — visual spacing.

**L85:** `export function Input({`  
Defines function `Input` — callable unit of UI/logic.

**L86:** `  label,`  
Executable statement: `label,`

**L87:** `  error,`  
Executable statement: `error,`

**L88:** `  hint,`  
Executable statement: `hint,`

**L89:** `  className,`  
Executable statement: `className,`

**L90:** `  id,`  
Executable statement: `id,`

**L91:** `  ...props`  
Executable statement: `...props`

**L92:** `}: InputHTMLAttributes<HTMLInputElement> & {`  
Closes the previous block/object/function.

**L93:** `  label: string`  
Executable statement: `label: string`

**L94:** `  error?: string`  
Executable statement: `error?: string`

**L95:** `  hint?: string`  
Executable statement: `hint?: string`

**L96:** `}) {`  
Closes the previous block/object/function.

**L97:** `  const inputId = id ?? props.name`  
Constant/variable `inputId` — holds a value or React binding.

**L98:** `  const errorId = error ? '${inputId}-error' : undefined`  
Constant/variable `errorId` — holds a value or React binding.

**L99:** `  const hintId = hint ? '${inputId}-hint' : undefined`  
Constant/variable `hintId` — holds a value or React binding.

**L100:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L101:** `    <div className="block">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L102:** `      <label htmlFor={inputId} className="block text-[0.9375rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L103:** `        {label}`  
Executable statement: `{label}`

**L104:** `      </label>`  
JSX markup — describes HTML structure React will render.

**L105:** `      {hint ? (`  
Executable statement: `{hint ? (`

**L106:** `        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L107:** `          {hint}`  
Executable statement: `{hint}`

**L108:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L109:** `      ) : null}`  
Executable statement: `) : null}`

**L110:** `      <input`  
JSX markup — describes HTML structure React will render.

**L111:** `        id={inputId}`  
Assignment / binding: `id={inputId}`

**L112:** `        aria-invalid={error ? true : undefined}`  
Assignment / binding: `aria-invalid={error ? true : undefined}`

**L113:** `        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}`  
Assignment / binding: `aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undef…`

**L114:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L115:** `          fieldClass,`  
Executable statement: `fieldClass,`

**L116:** `          error ? 'border-rust' : 'border-line focus:border-teal',`  
Executable statement: `error ? 'border-rust' : 'border-line focus:border-teal',`

**L117:** `          className,`  
Executable statement: `className,`

**L118:** `        )}`  
Executable statement: `)}`

**L119:** `        {...props}`  
Executable statement: `{...props}`

**L120:** `      />`  
JSX markup — describes HTML structure React will render.

**L121:** `      {error ? (`  
Executable statement: `{error ? (`

**L122:** `        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L123:** `          {error}`  
Executable statement: `{error}`

**L124:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L125:** `      ) : null}`  
Executable statement: `) : null}`

**L126:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L127:** `  )`  
Executable statement: `)`

**L128:** `}`  
Closes the previous block/object/function.

**L129:** ``  
Blank line — visual spacing.

**L130:** `export function Select({`  
Defines function `Select` — callable unit of UI/logic.

**L131:** `  label,`  
Executable statement: `label,`

**L132:** `  error,`  
Executable statement: `error,`

**L133:** `  hint,`  
Executable statement: `hint,`

**L134:** `  children,`  
Executable statement: `children,`

**L135:** `  id,`  
Executable statement: `id,`

**L136:** `  className,`  
Executable statement: `className,`

**L137:** `  ...props`  
Executable statement: `...props`

**L138:** `}: React.SelectHTMLAttributes<HTMLSelectElement> & {`  
Closes the previous block/object/function.

**L139:** `  label: string`  
Executable statement: `label: string`

**L140:** `  error?: string`  
Executable statement: `error?: string`

**L141:** `  hint?: string`  
Executable statement: `hint?: string`

**L142:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L143:** `}) {`  
Closes the previous block/object/function.

**L144:** `  const selectId = id ?? props.name`  
Constant/variable `selectId` — holds a value or React binding.

**L145:** `  const errorId = error ? '${selectId}-error' : undefined`  
Constant/variable `errorId` — holds a value or React binding.

**L146:** `  const hintId = hint ? '${selectId}-hint' : undefined`  
Constant/variable `hintId` — holds a value or React binding.

**L147:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L148:** `    <div className="block">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L149:** `      <label htmlFor={selectId} className="block text-[0.9375rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L150:** `        {label}`  
Executable statement: `{label}`

**L151:** `      </label>`  
JSX markup — describes HTML structure React will render.

**L152:** `      {hint ? (`  
Executable statement: `{hint ? (`

**L153:** `        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L154:** `          {hint}`  
Executable statement: `{hint}`

**L155:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L156:** `      ) : null}`  
Executable statement: `) : null}`

**L157:** `      <select`  
JSX markup — describes HTML structure React will render.

**L158:** `        id={selectId}`  
Assignment / binding: `id={selectId}`

**L159:** `        aria-invalid={error ? true : undefined}`  
Assignment / binding: `aria-invalid={error ? true : undefined}`

**L160:** `        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}`  
Assignment / binding: `aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undef…`

**L161:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L162:** `          fieldClass,`  
Executable statement: `fieldClass,`

**L163:** `          'appearance-none',`  
Executable statement: `'appearance-none',`

**L164:** `          error ? 'border-rust' : 'border-line focus:border-teal',`  
Executable statement: `error ? 'border-rust' : 'border-line focus:border-teal',`

**L165:** `          className,`  
Executable statement: `className,`

**L166:** `        )}`  
Executable statement: `)}`

**L167:** `        {...props}`  
Executable statement: `{...props}`

**L168:** `      >`  
JSX markup — describes HTML structure React will render.

**L169:** `        {children}`  
Executable statement: `{children}`

**L170:** `      </select>`  
JSX markup — describes HTML structure React will render.

**L171:** `      {error ? (`  
Executable statement: `{error ? (`

**L172:** `        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L173:** `          {error}`  
Executable statement: `{error}`

**L174:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L175:** `      ) : null}`  
Executable statement: `) : null}`

**L176:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L177:** `  )`  
Executable statement: `)`

**L178:** `}`  
Closes the previous block/object/function.

**L179:** ``  
Blank line — visual spacing.

**L180:** `export function TextArea({`  
Defines function `TextArea` — callable unit of UI/logic.

**L181:** `  label,`  
Executable statement: `label,`

**L182:** `  error,`  
Executable statement: `error,`

**L183:** `  hint,`  
Executable statement: `hint,`

**L184:** `  className,`  
Executable statement: `className,`

**L185:** `  id,`  
Executable statement: `id,`

**L186:** `  ...props`  
Executable statement: `...props`

**L187:** `}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {`  
Closes the previous block/object/function.

**L188:** `  label: string`  
Executable statement: `label: string`

**L189:** `  error?: string`  
Executable statement: `error?: string`

**L190:** `  hint?: string`  
Executable statement: `hint?: string`

**L191:** `}) {`  
Closes the previous block/object/function.

**L192:** `  const areaId = id ?? props.name`  
Constant/variable `areaId` — holds a value or React binding.

**L193:** `  const errorId = error ? '${areaId}-error' : undefined`  
Constant/variable `errorId` — holds a value or React binding.

**L194:** `  const hintId = hint ? '${areaId}-hint' : undefined`  
Constant/variable `hintId` — holds a value or React binding.

**L195:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L196:** `    <div className="block">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L197:** `      <label htmlFor={areaId} className="block text-[0.9375rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L198:** `        {label}`  
Executable statement: `{label}`

**L199:** `      </label>`  
JSX markup — describes HTML structure React will render.

**L200:** `      {hint ? (`  
Executable statement: `{hint ? (`

**L201:** `        <p id={hintId} className="mt-1 text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L202:** `          {hint}`  
Executable statement: `{hint}`

**L203:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L204:** `      ) : null}`  
Executable statement: `) : null}`

**L205:** `      <textarea`  
JSX markup — describes HTML structure React will render.

**L206:** `        id={areaId}`  
Assignment / binding: `id={areaId}`

**L207:** `        aria-invalid={error ? true : undefined}`  
Assignment / binding: `aria-invalid={error ? true : undefined}`

**L208:** `        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}`  
Assignment / binding: `aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undef…`

**L209:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L210:** `          fieldClass,`  
Executable statement: `fieldClass,`

**L211:** `          'min-h-32',`  
Executable statement: `'min-h-32',`

**L212:** `          error ? 'border-rust' : 'border-line focus:border-teal',`  
Executable statement: `error ? 'border-rust' : 'border-line focus:border-teal',`

**L213:** `          className,`  
Executable statement: `className,`

**L214:** `        )}`  
Executable statement: `)}`

**L215:** `        {...props}`  
Executable statement: `{...props}`

**L216:** `      />`  
JSX markup — describes HTML structure React will render.

**L217:** `      {error ? (`  
Executable statement: `{error ? (`

**L218:** `        <p id={errorId} className="mt-1.5 text-[0.875rem] text-rust" role="alert">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L219:** `          {error}`  
Executable statement: `{error}`

**L220:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L221:** `      ) : null}`  
Executable statement: `) : null}`

**L222:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L223:** `  )`  
Executable statement: `)`

**L224:** `}`  
Closes the previous block/object/function.

**L225:** ``  
Blank line — visual spacing.

**L226:** `const statusStyles: Record<string, string> = {`  
Constant/variable `statusStyles` — holds a value or React binding.

**L227:** `  active: 'bg-sage-soft text-sage',`  
Executable statement: `active: 'bg-sage-soft text-sage',`

**L228:** `  approved: 'bg-sage-soft text-sage',`  
Executable statement: `approved: 'bg-sage-soft text-sage',`

**L229:** `  paid: 'bg-sage-soft text-sage',`  
Executable statement: `paid: 'bg-sage-soft text-sage',`

**L230:** `  cleared: 'bg-sage-soft text-sage',`  
Executable statement: `cleared: 'bg-sage-soft text-sage',`

**L231:** `  pending: 'bg-surface text-ink-muted',`  
Executable statement: `pending: 'bg-surface text-ink-muted',`

**L232:** `  upcoming: 'bg-surface text-ink-muted',`  
Executable statement: `upcoming: 'bg-surface text-ink-muted',`

**L233:** `  overdue: 'bg-rust-soft text-rust',`  
Executable statement: `overdue: 'bg-rust-soft text-rust',`

**L234:** `}`  
Closes the previous block/object/function.

**L235:** ``  
Blank line — visual spacing.

**L236:** `const statusLabels: Record<string, string> = {`  
Constant/variable `statusLabels` — holds a value or React binding.

**L237:** `  active: 'Active',`  
Executable statement: `active: 'Active',`

**L238:** `  approved: 'Approved',`  
Executable statement: `approved: 'Approved',`

**L239:** `  paid: 'Paid',`  
Executable statement: `paid: 'Paid',`

**L240:** `  cleared: 'Cleared',`  
Executable statement: `cleared: 'Cleared',`

**L241:** `  pending: 'Pending',`  
Executable statement: `pending: 'Pending',`

**L242:** `  upcoming: 'Upcoming',`  
Executable statement: `upcoming: 'Upcoming',`

**L243:** `  overdue: 'Overdue',`  
Executable statement: `overdue: 'Overdue',`

**L244:** `}`  
Closes the previous block/object/function.

**L245:** ``  
Blank line — visual spacing.

**L246:** `export function StatusPill({`  
Defines function `StatusPill` — callable unit of UI/logic.

**L247:** `  status,`  
Executable statement: `status,`

**L248:** `}: {`  
Closes the previous block/object/function.

**L249:** `  status: 'active' | 'approved' | 'pending' | 'overdue' | 'paid' | 'upcoming' | 'cleared'`  
Executable statement: `status: 'active' | 'approved' | 'pending' | 'overdue' | 'paid' | 'upco…`

**L250:** `}) {`  
Closes the previous block/object/function.

**L251:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L252:** `    <span`  
JSX markup — describes HTML structure React will render.

**L253:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L254:** `        'inline-flex rounded-sm px-2 py-0.5 text-[0.75rem] font-semibold uppercase tracking-wide',`  
Executable statement: `'inline-flex rounded-sm px-2 py-0.5 text-[0.75rem] font-semibold upper…`

**L255:** `        statusStyles[status],`  
Executable statement: `statusStyles[status],`

**L256:** `      )}`  
Executable statement: `)}`

**L257:** `    >`  
JSX markup — describes HTML structure React will render.

**L258:** `      {statusLabels[status] ?? status}`  
Executable statement: `{statusLabels[status] ?? status}`

**L259:** `    </span>`  
JSX markup — describes HTML structure React will render.

**L260:** `  )`  
Executable statement: `)`

**L261:** `}`  
Closes the previous block/object/function.

**L262:** ``  
Blank line — visual spacing.

**L263:** `export function PageIntro({`  
Defines function `PageIntro` — callable unit of UI/logic.

**L264:** `  kicker,`  
Executable statement: `kicker,`

**L265:** `  title,`  
Executable statement: `title,`

**L266:** `  children,`  
Executable statement: `children,`

**L267:** `}: {`  
Closes the previous block/object/function.

**L268:** `  kicker?: string`  
Executable statement: `kicker?: string`

**L269:** `  title: string`  
Executable statement: `title: string`

**L270:** `  children?: ReactNode`  
Executable statement: `children?: ReactNode`

**L271:** `}) {`  
Closes the previous block/object/function.

**L272:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L273:** `    <header className="max-w-2xl">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L274:** `      {kicker ? <SectionLabel>{kicker}</SectionLabel> : null}`  
Executable statement: `{kicker ? <SectionLabel>{kicker}</SectionLabel> : null}`

**L275:** `      <h1`  
JSX markup — describes HTML structure React will render.

**L276:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L277:** `          'text-[1.75rem] font-bold leading-tight tracking-tight text-ink sm:text-[2rem]',`  
Executable statement: `'text-[1.75rem] font-bold leading-tight tracking-tight text-ink sm:tex…`

**L278:** `          kicker && 'mt-2',`  
Executable statement: `kicker && 'mt-2',`

**L279:** `        )}`  
Executable statement: `)}`

**L280:** `      >`  
JSX markup — describes HTML structure React will render.

**L281:** `        {title}`  
Executable statement: `{title}`

**L282:** `      </h1>`  
JSX markup — describes HTML structure React will render.

**L283:** `      {children ? <div className="mt-3 text-[1rem] text-ink-muted">{children}</div> : null}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L284:** `    </header>`  
JSX markup — describes HTML structure React will render.

**L285:** `  )`  
Executable statement: `)`

**L286:** `}`  
Closes the previous block/object/function.

**L287:** ``  
Blank line — visual spacing.

**L288:** `export const islandSurface =`  
Constant/variable `islandSurface` — holds a value or React binding.

**L289:** `  'rounded-md border border-line bg-white shadow-[0_8px_30px_rgb(12_18_16/0.06)]'`  
Executable statement: `'rounded-md border border-line bg-white shadow-[0_8px_30px_rgb(12_18_1…`

**L290:** ``  
Blank line — visual spacing.

**L291:** `export const islandSticky =`  
Constant/variable `islandSticky` — holds a value or React binding.

**L292:** `  'rounded-md border border-line bg-white/92 shadow-[0_8px_30px_rgb(12_18_16/0.06)] backdrop-blur...`  
Executable statement: `'rounded-md border border-line bg-white/92 shadow-[0_8px_30px_rgb(12_1…`

**L293:** ``  
Blank line — visual spacing.

**L294:** `export const softChipActive = 'rounded-sm bg-teal-soft font-semibold text-teal'`  
Constant/variable `softChipActive` — holds a value or React binding.

**L295:** `export const softChipIdle =`  
Constant/variable `softChipIdle` — holds a value or React binding.

**L296:** `  'rounded-sm font-medium text-ink-muted hover:bg-surface hover:text-ink'`  
Executable statement: `'rounded-sm font-medium text-ink-muted hover:bg-surface hover:text-ink…`

**L297:** ``  
Blank line — visual spacing.

**L298:** `export function StepActions({ children }: { children: ReactNode }) {`  
Defines function `StepActions` — callable unit of UI/logic.

**L299:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L300:** `    <div className="sticky bottom-3 z-30 mt-10 px-0 sm:bottom-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L301:** `      <div`  
JSX markup — describes HTML structure React will render.

**L302:** `        className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L303:** `          islandSticky,`  
Executable statement: `islandSticky,`

**L304:** `          'flex items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-...`  
Executable statement: `'flex items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env…`

**L305:** `        )}`  
Executable statement: `)}`

**L306:** `      >`  
JSX markup — describes HTML structure React will render.

**L307:** `        {children}`  
Executable statement: `{children}`

**L308:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L309:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L310:** `  )`  
Executable statement: `)`

**L311:** `}`  
Closes the previous block/object/function.

**L312:** ``  
Blank line — visual spacing.

**L313:** `export function Notice({`  
Defines function `Notice` — callable unit of UI/logic.

**L314:** `  children,`  
Executable statement: `children,`

**L315:** `  tone = 'neutral',`  
Assignment / binding: `tone = 'neutral',`

**L316:** `}: {`  
Closes the previous block/object/function.

**L317:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L318:** `  tone?: 'neutral' | 'warning'`  
Executable statement: `tone?: 'neutral' | 'warning'`

**L319:** `}) {`  
Closes the previous block/object/function.

**L320:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L321:** `    <div`  
JSX markup — describes HTML structure React will render.

**L322:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L323:** `        'rounded-md border px-4 py-3 text-[0.9375rem] leading-relaxed',`  
Executable statement: `'rounded-md border px-4 py-3 text-[0.9375rem] leading-relaxed',`

**L324:** `        tone === 'warning'`  
Assignment / binding: `tone === 'warning'`

**L325:** `          ? 'border-amber/30 bg-amber-soft text-ink'`  
Executable statement: `? 'border-amber/30 bg-amber-soft text-ink'`

**L326:** `          : 'border-line bg-teal-soft/60 text-ink',`  
Executable statement: `: 'border-line bg-teal-soft/60 text-ink',`

**L327:** `      )}`  
Executable statement: `)}`

**L328:** `    >`  
JSX markup — describes HTML structure React will render.

**L329:** `      {children}`  
Executable statement: `{children}`

**L330:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L331:** `  )`  
Executable statement: `)`

**L332:** `}`  
Closes the previous block/object/function.

**L333:** ``  
Blank line — visual spacing.

**L334:** `export function Panel({`  
Defines function `Panel` — callable unit of UI/logic.

**L335:** `  children,`  
Executable statement: `children,`

**L336:** `  className,`  
Executable statement: `className,`

**L337:** `}: {`  
Closes the previous block/object/function.

**L338:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L339:** `  className?: string`  
Executable statement: `className?: string`

**L340:** `}) {`  
Closes the previous block/object/function.

**L341:** `  return <div className={cn(islandSurface, className)}>{children}</div>`  
Returns JSX UI (or a value) to render / callers.

**L342:** `}`  
Closes the previous block/object/function.

**L343:** ``  
Blank line — visual spacing.

**L344:** `export function SectionLabel({`  
Defines function `SectionLabel` — callable unit of UI/logic.

**L345:** `  children,`  
Executable statement: `children,`

**L346:** `  className,`  
Executable statement: `className,`

**L347:** `}: {`  
Closes the previous block/object/function.

**L348:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L349:** `  className?: string`  
Executable statement: `className?: string`

**L350:** `}) {`  
Closes the previous block/object/function.

**L351:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L352:** `    <p`  
JSX markup — describes HTML structure React will render.

**L353:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L354:** `        'text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted',`  
Executable statement: `'text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-mute…`

**L355:** `        className,`  
Executable statement: `className,`

**L356:** `      )}`  
Executable statement: `)}`

**L357:** `    >`  
JSX markup — describes HTML structure React will render.

**L358:** `      {children}`  
Executable statement: `{children}`

**L359:** `    </p>`  
JSX markup — describes HTML structure React will render.

**L360:** `  )`  
Executable statement: `)`

**L361:** `}`  
Closes the previous block/object/function.

**L362:** ``  
Blank line — visual spacing.

**L363:** `export function IconTile({`  
Defines function `IconTile` — callable unit of UI/logic.

**L364:** `  children,`  
Executable statement: `children,`

**L365:** `  size = 'md',`  
Assignment / binding: `size = 'md',`

**L366:** `  className,`  
Executable statement: `className,`

**L367:** `}: {`  
Closes the previous block/object/function.

**L368:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L369:** `  size?: 'sm' | 'md' | 'lg'`  
Executable statement: `size?: 'sm' | 'md' | 'lg'`

**L370:** `  className?: string`  
Executable statement: `className?: string`

**L371:** `}) {`  
Closes the previous block/object/function.

**L372:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L373:** `    <span`  
JSX markup — describes HTML structure React will render.

**L374:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L375:** `        'inline-flex shrink-0 items-center justify-center rounded-sm bg-teal-soft text-teal',`  
Executable statement: `'inline-flex shrink-0 items-center justify-center rounded-sm bg-teal-s…`

**L376:** `        size === 'sm' && 'h-8 w-8',`  
Assignment / binding: `size === 'sm' && 'h-8 w-8',`

**L377:** `        size === 'md' && 'h-9 w-9',`  
Assignment / binding: `size === 'md' && 'h-9 w-9',`

**L378:** `        size === 'lg' && 'h-11 w-11',`  
Assignment / binding: `size === 'lg' && 'h-11 w-11',`

**L379:** `        className,`  
Executable statement: `className,`

**L380:** `      )}`  
Executable statement: `)}`

**L381:** `    >`  
JSX markup — describes HTML structure React will render.

**L382:** `      {children}`  
Executable statement: `{children}`

**L383:** `    </span>`  
JSX markup — describes HTML structure React will render.

**L384:** `  )`  
Executable statement: `)`

**L385:** `}`  
Closes the previous block/object/function.

**L386:** ``  
Blank line — visual spacing.

**L387:** `export function SoftChip({`  
Defines function `SoftChip` — callable unit of UI/logic.

**L388:** `  active = false,`  
Assignment / binding: `active = false,`

**L389:** `  className,`  
Executable statement: `className,`

**L390:** `  children,`  
Executable statement: `children,`

**L391:** `  ...props`  
Executable statement: `...props`

**L392:** `}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {`  
Closes the previous block/object/function.

**L393:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L394:** `    <button`  
JSX markup — describes HTML structure React will render.

**L395:** `      type="button"`  
Assignment / binding: `type="button"`

**L396:** `      className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L397:** `        'inline-flex min-h-10 items-center gap-1.5 px-3 py-2 text-[0.875rem] transition-colors',`  
Executable statement: `'inline-flex min-h-10 items-center gap-1.5 px-3 py-2 text-[0.875rem] t…`

**L398:** `        active ? softChipActive : softChipIdle,`  
Executable statement: `active ? softChipActive : softChipIdle,`

**L399:** `        className,`  
Executable statement: `className,`

**L400:** `      )}`  
Executable statement: `)}`

**L401:** `      {...props}`  
Executable statement: `{...props}`

**L402:** `    >`  
JSX markup — describes HTML structure React will render.

**L403:** `      {children}`  
Executable statement: `{children}`

**L404:** `    </button>`  
JSX markup — describes HTML structure React will render.

**L405:** `  )`  
Executable statement: `)`

**L406:** `}`  
Closes the previous block/object/function.

**L407:** ``  
Blank line — visual spacing.

**L408:** `export function IslandShell({`  
Defines function `IslandShell` — callable unit of UI/logic.

**L409:** `  children,`  
Executable statement: `children,`

**L410:** `  className,`  
Executable statement: `className,`

**L411:** `  contentClassName,`  
Executable statement: `contentClassName,`

**L412:** `}: {`  
Closes the previous block/object/function.

**L413:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L414:** `  className?: string`  
Executable statement: `className?: string`

**L415:** `  contentClassName?: string`  
Executable statement: `contentClassName?: string`

**L416:** `}) {`  
Closes the previous block/object/function.

**L417:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L418:** `    <div className={cn('sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4', className)}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L419:** `      <div className={cn(islandSticky, 'mx-auto max-w-6xl', contentClassName)}>{children}</div>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L420:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L421:** `  )`  
Executable statement: `)`

**L422:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/components/ui/Reveal.tsx`

_53 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Scroll-in animation wrapper used across marketing and admin pages.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Pure UI; respects prefers-reduced-motion. Not tied to backend.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ``  
Blank line — visual spacing.

**L8:** `import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'`  
Import — brings in `react` so this file can use it.

**L9:** `import { cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L10:** ``  
Blank line — visual spacing.

**L11:** `export function Reveal({`  
Defines function `Reveal` — callable unit of UI/logic.

**L12:** `  children,`  
Executable statement: `children,`

**L13:** `  delay = 0,`  
Assignment / binding: `delay = 0,`

**L14:** `  className,`  
Executable statement: `className,`

**L15:** `}: {`  
Closes the previous block/object/function.

**L16:** `  children: ReactNode`  
Executable statement: `children: ReactNode`

**L17:** `  delay?: number`  
Executable statement: `delay?: number`

**L18:** `  className?: string`  
Executable statement: `className?: string`

**L19:** `}) {`  
Closes the previous block/object/function.

**L20:** `  const ref = useRef<HTMLDivElement>(null)`  
Constant/variable `ref` — holds a value or React binding.

**L21:** `  const [shown, setShown] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L22:** ``  
Blank line — visual spacing.

**L23:** `  useEffect(() => {`  
React effect hook — runs side effects after render (fetch, observers, sync).

**L24:** `    const el = ref.current`  
Constant/variable `el` — holds a value or React binding.

**L25:** `    if (!el) return`  
Conditional — runs the following block only when the condition is true.

**L26:** `    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches`  
Constant/variable `reduce` — holds a value or React binding.

**L27:** `    if (reduce) {`  
Conditional — runs the following block only when the condition is true.

**L28:** `      setShown(true)`  
Executable statement: `setShown(true)`

**L29:** `      return`  
Executable statement: `return`

**L30:** `    }`  
Closes the previous block/object/function.

**L31:** `    const io = new IntersectionObserver(`  
Constant/variable `io` — holds a value or React binding.

**L32:** `      ([entry]) => {`  
Assignment / binding: `([entry]) => {`

**L33:** `        if (entry.isIntersecting) {`  
Conditional — runs the following block only when the condition is true.

**L34:** `          setShown(true)`  
Executable statement: `setShown(true)`

**L35:** `          io.disconnect()`  
Executable statement: `io.disconnect()`

**L36:** `        }`  
Closes the previous block/object/function.

**L37:** `      },`  
Closes the previous block/object/function.

**L38:** `      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },`  
Executable statement: `{ threshold: 0.12, rootMargin: '0px 0px -32px 0px' },`

**L39:** `    )`  
Executable statement: `)`

**L40:** `    io.observe(el)`  
Executable statement: `io.observe(el)`

**L41:** `    return () => io.disconnect()`  
Returns JSX UI (or a value) to render / callers.

**L42:** `  }, [])`  
Closes the previous block/object/function.

**L43:** ``  
Blank line — visual spacing.

**L44:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L45:** `    <div`  
JSX markup — describes HTML structure React will render.

**L46:** `      ref={ref}`  
Assignment / binding: `ref={ref}`

**L47:** `      className={cn('reveal', shown && 'reveal-in', className)}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L48:** `      style={{ '--reveal-delay': '${delay}ms' } as CSSProperties}`  
Assignment / binding: `style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}`

**L49:** `    >`  
JSX markup — describes HTML structure React will render.

**L50:** `      {children}`  
Executable statement: `{children}`

**L51:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L52:** `  )`  
Executable statement: `)`

**L53:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/content/brand.ts`

_21 lines_

**L1:** `/** Product brand vs registered parent — same pattern as Tsebo / Tsebo Solutions Group. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** `export const brand = {`  
Constant/variable `brand` — holds a value or React binding.

**L3:** `  /** Public loan product name (header, wordmark, “follow” line). */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** `  productName: 'Tshedza Finance',`  
Executable statement: `productName: 'Tshedza Finance',`

**L5:** `  productShort: 'Tshedza',`  
Executable statement: `productShort: 'Tshedza',`

**L6:** `  /** Registered company that owns the product. */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** `  legalName: 'Tshedza and Canaan Group of Companies',`  
Executable statement: `legalName: 'Tshedza and Canaan Group of Companies',`

**L8:** `  registrationNumber: '2026/462710/07',`  
Executable statement: `registrationNumber: '2026/462710/07',`

**L9:** `  copyright: '© All rights reserved.',`  
Executable statement: `copyright: '© All rights reserved.',`

**L10:** `  email: 'hello@tshedza.example',`  
Executable statement: `email: 'hello@tshedza.example',`

**L11:** `  phoneDisplay: '0800 000 000',`  
Executable statement: `phoneDisplay: '0800 000 000',`

**L12:** `  phoneHref: 'tel:0800000000',`  
Executable statement: `phoneHref: 'tel:0800000000',`

**L13:** `  social: {`  
Executable statement: `social: {`

**L14:** `    facebook: 'https://www.facebook.com/',`  
Executable statement: `facebook: 'https://www.facebook.com/',`

**L15:** `    linkedin: 'https://www.linkedin.com/',`  
Executable statement: `linkedin: 'https://www.linkedin.com/',`

**L16:** `  },`  
Closes the previous block/object/function.

**L17:** `} as const`  
Closes the previous block/object/function.

**L18:** ``  
Blank line — visual spacing.

**L19:** `export function legalEntityLine() {`  
Defines function `legalEntityLine` — callable unit of UI/logic.

**L20:** `  return '${brand.legalName} (reg no ${brand.registrationNumber})'`  
Returns a value to the caller: ``${brand.legalName} (reg no ${brand.registrationNumbe`

**L21:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/content/loanTerms.ts`

_64 lines_

**L1:** `export const howItWorks = [`  
Constant/variable `howItWorks` — holds a value or React binding.

**L2:** `  {`  
Opens a new code block.

**L3:** `    title: 'From R100',`  
Executable statement: `title: 'From R100',`

**L4:** `    copy: 'Borrow what you need this month. Amounts go higher after we see income and bank activi...`  
Executable statement: `copy: 'Borrow what you need this month. Amounts go higher after we see…`

**L5:** `  },`  
Closes the previous block/object/function.

**L6:** `  {`  
Opens a new code block.

**L7:** `    title: 'No traditional credit score',`  
Executable statement: `title: 'No traditional credit score',`

**L8:** `    copy: 'We do not pull a bureau score. We still check identity, income, and your bank account.',`  
Executable statement: `copy: 'We do not pull a bureau score. We still check identity, income,…`

**L9:** `  },`  
Closes the previous block/object/function.

**L10:** `  {`  
Opens a new code block.

**L11:** `    title: 'One month, 40% interest',`  
Executable statement: `title: 'One month, 40% interest',`

**L12:** `    copy: 'A R1,000 loan costs R400 in interest. You repay R1,400 in one month.',`  
Executable statement: `copy: 'A R1,000 loan costs R400 in interest. You repay R1,400 in one m…`

**L13:** `  },`  
Closes the previous block/object/function.

**L14:** `  {`  
Opens a new code block.

**L15:** `    title: 'Quick decision',`  
Executable statement: `title: 'Quick decision',`

**L16:** `    copy: 'Once documents are in, most people hear back the next working day.',`  
Executable statement: `copy: 'Once documents are in, most people hear back the next working d…`

**L17:** `  },`  
Closes the previous block/object/function.

**L18:** `]`  
Executable statement: `]`

**L19:** ``  
Blank line — visual spacing.

**L20:** `export const eligibility = [`  
Constant/variable `eligibility` — holds a value or React binding.

**L21:** `  'South African resident, 18 or older',`  
Executable statement: `'South African resident, 18 or older',`

**L22:** `  'Permanent, contract, temporary work, or student with regular income',`  
Executable statement: `'Permanent, contract, temporary work, or student with regular income',`

**L23:** `  'A South African bank account in your name',`  
Executable statement: `'A South African bank account in your name',`

**L24:** `  'A residential address we can verify',`  
Executable statement: `'A residential address we can verify',`

**L25:** `  'A mobile number and email we can reach',`  
Executable statement: `'A mobile number and email we can reach',`

**L26:** `]`  
Executable statement: `]`

**L27:** ``  
Blank line — visual spacing.

**L28:** `export const requiredDocuments = [`  
Constant/variable `requiredDocuments` — holds a value or React binding.

**L29:** `  'South African ID, passport, or work permit',`  
Executable statement: `'South African ID, passport, or work permit',`

**L30:** `  'Proof of income or latest payslip',`  
Executable statement: `'Proof of income or latest payslip',`

**L31:** `  'Three months of bank statements',`  
Executable statement: `'Three months of bank statements',`

**L32:** `  'Proof of address',`  
Executable statement: `'Proof of address',`

**L33:** `]`  
Executable statement: `]`

**L34:** ``  
Blank line — visual spacing.

**L35:** `export const optionalDocuments = [`  
Constant/variable `optionalDocuments` — holds a value or React binding.

**L36:** `  'Employment or student confirmation, if it is not already on the payslip',`  
Executable statement: `'Employment or student confirmation, if it is not already on the paysl…`

**L37:** `]`  
Executable statement: `]`

**L38:** ``  
Blank line — visual spacing.

**L39:** `export const termsSections = [`  
Constant/variable `termsSections` — holds a value or React binding.

**L40:** `  {`  
Opens a new code block.

**L41:** `    title: 'Loan amount and term',`  
Executable statement: `title: 'Loan amount and term',`

**L42:** `    body: 'Cash loans start at R100 and may go up to R20,000. This product is a one-month loan. A...`  
Executable statement: `body: 'Cash loans start at R100 and may go up to R20,000. This product…`

**L43:** `  },`  
Closes the previous block/object/function.

**L44:** `  {`  
Opens a new code block.

**L45:** `    title: 'Interest and fees',`  
Executable statement: `title: 'Interest and fees',`

**L46:** `    body: 'Interest is 40% of the amount borrowed, due with the full balance after one month. Exa...`  
Assignment / binding: `body: 'Interest is 40% of the amount borrowed, due with the full balan…`

**L47:** `  },`  
Closes the previous block/object/function.

**L48:** `  {`  
Opens a new code block.

**L49:** `    title: 'Checks we still do',`  
Executable statement: `title: 'Checks we still do',`

**L50:** `    body: 'There is no traditional credit-bureau score. We still verify identity, income, and ban...`  
Executable statement: `body: 'There is no traditional credit-bureau score. We still verify id…`

**L51:** `  },`  
Closes the previous block/object/function.

**L52:** `  {`  
Opens a new code block.

**L53:** `    title: 'Repayment and debit order',`  
Executable statement: `title: 'Repayment and debit order',`

**L54:** `    body: 'You repay on the agreed date. A debit-order mandate and bank details are required so w...`  
Executable statement: `body: 'You repay on the agreed date. A debit-order mandate and bank de…`

**L55:** `  },`  
Closes the previous block/object/function.

**L56:** `  {`  
Opens a new code block.

**L57:** `    title: 'Privacy and cancellation',`  
Executable statement: `title: 'Privacy and cancellation',`

**L58:** `    body: 'We use your information only to assess and service the loan. You may cancel within a l...`  
Executable statement: `body: 'We use your information only to assess and service the loan. Yo…`

**L59:** `  },`  
Closes the previous block/object/function.

**L60:** `  {`  
Opens a new code block.

**L61:** `    title: 'Disclaimer',`  
Executable statement: `title: 'Disclaimer',`

**L62:** `    body: 'Approval is at our discretion. Tshedza Finance is a product of Tshedza and Canaan Grou...`  
Executable statement: `body: 'Approval is at our discretion. Tshedza Finance is a product of …`

**L63:** `  },`  
Closes the previous block/object/function.

**L64:** `]`  
Executable statement: `]`

---

## `frontend/src/hooks/useAnimatedNumber.ts`

_40 lines_

**L1:** `import { useEffect, useRef, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L2:** ``  
Blank line — visual spacing.

**L3:** `export function useAnimatedNumber(target: number, duration = 280) {`  
Defines function `useAnimatedNumber` — callable unit of UI/logic.

**L4:** `  const [value, setValue] = useState(target)`  
Constant/variable `?` — holds a value or React binding.

**L5:** `  const frame = useRef<number | null>(null)`  
Constant/variable `frame` — holds a value or React binding.

**L6:** `  const fromRef = useRef(target)`  
Constant/variable `fromRef` — holds a value or React binding.

**L7:** ``  
Blank line — visual spacing.

**L8:** `  useEffect(() => {`  
React effect hook — runs side effects after render (fetch, observers, sync).

**L9:** `    const reduce =`  
Constant/variable `reduce` — holds a value or React binding.

**L10:** `      typeof window !== 'undefined' &&`  
Assignment / binding: `typeof window !== 'undefined' &&`

**L11:** `      window.matchMedia('(prefers-reduced-motion: reduce)').matches`  
Executable statement: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`

**L12:** `    if (reduce) {`  
Conditional — runs the following block only when the condition is true.

**L13:** `      setValue(target)`  
Executable statement: `setValue(target)`

**L14:** `      fromRef.current = target`  
Assignment / binding: `fromRef.current = target`

**L15:** `      return`  
Executable statement: `return`

**L16:** `    }`  
Closes the previous block/object/function.

**L17:** ``  
Blank line — visual spacing.

**L18:** `    const from = fromRef.current`  
Constant/variable `from` — holds a value or React binding.

**L19:** `    const start = performance.now()`  
Constant/variable `start` — holds a value or React binding.

**L20:** ``  
Blank line — visual spacing.

**L21:** `    const tick = (now: number) => {`  
Constant/variable `tick` — holds a value or React binding.

**L22:** `      const t = Math.min(1, (now - start) / duration)`  
Constant/variable `t` — holds a value or React binding.

**L23:** `      const eased = 1 - Math.pow(1 - t, 3)`  
Constant/variable `eased` — holds a value or React binding.

**L24:** `      const next = from + (target - from) * eased`  
Constant/variable `next` — holds a value or React binding.

**L25:** `      setValue(next)`  
Executable statement: `setValue(next)`

**L26:** `      if (t < 1) {`  
Conditional — runs the following block only when the condition is true.

**L27:** `        frame.current = requestAnimationFrame(tick)`  
Assignment / binding: `frame.current = requestAnimationFrame(tick)`

**L28:** `      } else {`  
Alternate branch when the previous condition was false.

**L29:** `        fromRef.current = target`  
Assignment / binding: `fromRef.current = target`

**L30:** `      }`  
Closes the previous block/object/function.

**L31:** `    }`  
Closes the previous block/object/function.

**L32:** ``  
Blank line — visual spacing.

**L33:** `    frame.current = requestAnimationFrame(tick)`  
Assignment / binding: `frame.current = requestAnimationFrame(tick)`

**L34:** `    return () => {`  
Returns JSX UI (or a value) to render / callers.

**L35:** `      if (frame.current) cancelAnimationFrame(frame.current)`  
Conditional — runs the following block only when the condition is true.

**L36:** `    }`  
Closes the previous block/object/function.

**L37:** `  }, [target, duration])`  
Closes the previous block/object/function.

**L38:** ``  
Blank line — visual spacing.

**L39:** `  return value`  
Returns a value to the caller: `value`

**L40:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/hooks/useDocumentUpload.ts`

_47 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Uploads one KYC document for the in-progress application.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Needs applicationStore.data.applicationId (from createApplication).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Calls apiClient.uploadDocument -> POST /api/applications/{id}/documents.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Updates per-kind status shown in DocumentsStep.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `import { useCallback, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L11:** `import {`  
Import — brings in `dependency` so this file can use it.

**L12:** `  useApplicationStore,`  
Executable statement: `useApplicationStore,`

**L13:** `  type DocumentKind,`  
TypeScript type — describes the shape of data (compile-time only).

**L14:** `} from '@/store/applicationStore'`  
Closes the previous block/object/function.

**L15:** `import { uploadDocument } from '@/lib/apiClient'`  
Import — brings in `@/lib/apiClient` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `export function useDocumentUpload() {`  
Defines function `useDocumentUpload` — callable unit of UI/logic.

**L18:** `  const setDocumentStatus = useApplicationStore((s) => s.setDocumentStatus)`  
Constant/variable `setDocumentStatus` — holds a value or React binding.

**L19:** `  const applicationId = useApplicationStore((s) => s.data.applicationId)`  
Constant/variable `applicationId` — holds a value or React binding.

**L20:** `  const [error, setError] = useState<string | null>(null)`  
Constant/variable `?` — holds a value or React binding.

**L21:** ``  
Blank line — visual spacing.

**L22:** `  const upload = useCallback(`  
Constant/variable `upload` — holds a value or React binding.

**L23:** `    async (kind: DocumentKind, file: File) => {`  
Assignment / binding: `async (kind: DocumentKind, file: File) => {`

**L24:** `      setError(null)`  
Executable statement: `setError(null)`

**L25:** `      if (!applicationId) {`  
Conditional — runs the following block only when the condition is true.

**L26:** `        setError('Application not initialized.')`  
Executable statement: `setError('Application not initialized.')`

**L27:** `        return`  
Executable statement: `return`

**L28:** `      }`  
Closes the previous block/object/function.

**L29:** `      if (file.size > 8 * 1024 * 1024) {`  
Conditional — runs the following block only when the condition is true.

**L30:** `        setError('File must be under 8 MB')`  
Executable statement: `setError('File must be under 8 MB')`

**L31:** `        setDocumentStatus(kind, 'rejected')`  
Executable statement: `setDocumentStatus(kind, 'rejected')`

**L32:** `        return`  
Executable statement: `return`

**L33:** `      }`  
Closes the previous block/object/function.

**L34:** `      setDocumentStatus(kind, 'uploading')`  
Executable statement: `setDocumentStatus(kind, 'uploading')`

**L35:** `      try {`  
Try block — attempt work that might throw; catch handles failures.

**L36:** `        await uploadDocument(applicationId, kind, file)`  
Executable statement: `await uploadDocument(applicationId, kind, file)`

**L37:** `        setDocumentStatus(kind, 'uploaded')`  
Executable statement: `setDocumentStatus(kind, 'uploaded')`

**L38:** `      } catch {`  
Closes the previous block/object/function.

**L39:** `        setError('Upload failed')`  
Executable statement: `setError('Upload failed')`

**L40:** `        setDocumentStatus(kind, 'rejected')`  
Executable statement: `setDocumentStatus(kind, 'rejected')`

**L41:** `      }`  
Closes the previous block/object/function.

**L42:** `    },`  
Closes the previous block/object/function.

**L43:** `    [applicationId, setDocumentStatus],`  
Executable statement: `[applicationId, setDocumentStatus],`

**L44:** `  )`  
Executable statement: `)`

**L45:** ``  
Blank line — visual spacing.

**L46:** `  return { upload, error }`  
Returns a value to the caller: `{ upload, error }`

**L47:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/hooks/useLoanStatus.ts`

_93 lines_

**L1:** `import { useQuery } from '@tanstack/react-query'`  
Import — brings in `@tanstack/react-query` so this file can use it.

**L2:** `import { formatRand } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L3:** ``  
Blank line — visual spacing.

**L4:** `export type MockLoan = {`  
TypeScript type — describes the shape of data (compile-time only).

**L5:** `  id: string`  
Executable statement: `id: string`

**L6:** `  product: string`  
Executable statement: `product: string`

**L7:** `  status: 'active' | 'approved' | 'pending' | 'overdue'`  
Executable statement: `status: 'active' | 'approved' | 'pending' | 'overdue'`

**L8:** `  principal: number`  
Executable statement: `principal: number`

**L9:** `  remaining: number`  
Executable statement: `remaining: number`

**L10:** `  nextPaymentDate: string`  
Executable statement: `nextPaymentDate: string`

**L11:** `  nextPaymentAmount: number`  
Executable statement: `nextPaymentAmount: number`

**L12:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L13:** `  monthlyInstalment: number`  
Executable statement: `monthlyInstalment: number`

**L14:** `  schedule: Array<{`  
Executable statement: `schedule: Array<{`

**L15:** `    dueDate: string`  
Executable statement: `dueDate: string`

**L16:** `    amount: number`  
Executable statement: `amount: number`

**L17:** `    status: 'paid' | 'upcoming' | 'overdue'`  
Executable statement: `status: 'paid' | 'upcoming' | 'overdue'`

**L18:** `  }>`  
JSX markup — describes HTML structure React will render.

**L19:** `}`  
Closes the previous block/object/function.

**L20:** ``  
Blank line — visual spacing.

**L21:** `const MOCK_LOAN: MockLoan = {`  
Constant/variable `MOCK_LOAN` — holds a value or React binding.

**L22:** `  id: 'LN-20481',`  
Executable statement: `id: 'LN-20481',`

**L23:** `  product: 'Cash loan',`  
Executable statement: `product: 'Cash loan',`

**L24:** `  status: 'active',`  
Executable statement: `status: 'active',`

**L25:** `  principal: 8000,`  
Executable statement: `principal: 8000,`

**L26:** `  remaining: 5340.5,`  
Executable statement: `remaining: 5340.5,`

**L27:** `  nextPaymentDate: '2026-09-01',`  
Executable statement: `nextPaymentDate: '2026-09-01',`

**L28:** `  nextPaymentAmount: 1780.17,`  
Executable statement: `nextPaymentAmount: 1780.17,`

**L29:** `  termMonths: 5,`  
Executable statement: `termMonths: 5,`

**L30:** `  monthlyInstalment: 1780.17,`  
Executable statement: `monthlyInstalment: 1780.17,`

**L31:** `  schedule: [`  
Executable statement: `schedule: [`

**L32:** `    { dueDate: '2026-05-01', amount: 1780.17, status: 'paid' },`  
Executable statement: `{ dueDate: '2026-05-01', amount: 1780.17, status: 'paid' },`

**L33:** `    { dueDate: '2026-06-01', amount: 1780.17, status: 'paid' },`  
Executable statement: `{ dueDate: '2026-06-01', amount: 1780.17, status: 'paid' },`

**L34:** `    { dueDate: '2026-07-01', amount: 1780.17, status: 'paid' },`  
Executable statement: `{ dueDate: '2026-07-01', amount: 1780.17, status: 'paid' },`

**L35:** `    { dueDate: '2026-08-01', amount: 1780.17, status: 'paid' },`  
Executable statement: `{ dueDate: '2026-08-01', amount: 1780.17, status: 'paid' },`

**L36:** `    { dueDate: '2026-09-01', amount: 1780.17, status: 'upcoming' },`  
Executable statement: `{ dueDate: '2026-09-01', amount: 1780.17, status: 'upcoming' },`

**L37:** `  ],`  
Executable statement: `],`

**L38:** `}`  
Closes the previous block/object/function.

**L39:** ``  
Blank line — visual spacing.

**L40:** `export function useLoanStatus(loanId: string) {`  
Defines function `useLoanStatus` — callable unit of UI/logic.

**L41:** `  return useQuery({`  
TanStack Query — fetches/caches server data and tracks loading/error.

**L42:** `    queryKey: ['loan', loanId],`  
Executable statement: `queryKey: ['loan', loanId],`

**L43:** `    queryFn: async () => {`  
Assignment / binding: `queryFn: async () => {`

**L44:** `      await new Promise((r) => setTimeout(r, 200))`  
Assignment / binding: `await new Promise((r) => setTimeout(r, 200))`

**L45:** `      return { ...MOCK_LOAN, id: loanId }`  
Returns a value to the caller: `{ ...MOCK_LOAN, id: loanId }`

**L46:** `    },`  
Closes the previous block/object/function.

**L47:** `  })`  
Closes the previous block/object/function.

**L48:** `}`  
Closes the previous block/object/function.

**L49:** ``  
Blank line — visual spacing.

**L50:** `export function useDashboardLoans() {`  
Defines function `useDashboardLoans` — callable unit of UI/logic.

**L51:** `  return useQuery({`  
TanStack Query — fetches/caches server data and tracks loading/error.

**L52:** `    queryKey: ['loans', 'dashboard'],`  
Executable statement: `queryKey: ['loans', 'dashboard'],`

**L53:** `    queryFn: async () => {`  
Assignment / binding: `queryFn: async () => {`

**L54:** `      await new Promise((r) => setTimeout(r, 150))`  
Assignment / binding: `await new Promise((r) => setTimeout(r, 150))`

**L55:** `      return {`  
Returns a value to the caller: `{`

**L56:** `        loans: [MOCK_LOAN],`  
Executable statement: `loans: [MOCK_LOAN],`

**L57:** `        nextPaymentLabel: formatRand(MOCK_LOAN.nextPaymentAmount),`  
Executable statement: `nextPaymentLabel: formatRand(MOCK_LOAN.nextPaymentAmount),`

**L58:** `      }`  
Closes the previous block/object/function.

**L59:** `    },`  
Closes the previous block/object/function.

**L60:** `  })`  
Closes the previous block/object/function.

**L61:** `}`  
Closes the previous block/object/function.

**L62:** ``  
Blank line — visual spacing.

**L63:** `export function useRepaymentHistory() {`  
Defines function `useRepaymentHistory` — callable unit of UI/logic.

**L64:** `  return useQuery({`  
TanStack Query — fetches/caches server data and tracks loading/error.

**L65:** `    queryKey: ['repayments'],`  
Executable statement: `queryKey: ['repayments'],`

**L66:** `    queryFn: async () => {`  
Assignment / binding: `queryFn: async () => {`

**L67:** `      await new Promise((r) => setTimeout(r, 150))`  
Assignment / binding: `await new Promise((r) => setTimeout(r, 150))`

**L68:** `      return [`  
Returns a value to the caller: `[`

**L69:** `        {`  
Opens a new code block.

**L70:** `          id: 'PAY-991',`  
Executable statement: `id: 'PAY-991',`

**L71:** `          date: '2026-07-01',`  
Executable statement: `date: '2026-07-01',`

**L72:** `          amount: 1780.17,`  
Executable statement: `amount: 1780.17,`

**L73:** `          method: 'EFT',`  
Executable statement: `method: 'EFT',`

**L74:** `          status: 'cleared' as const,`  
Executable statement: `status: 'cleared' as const,`

**L75:** `        },`  
Closes the previous block/object/function.

**L76:** `        {`  
Opens a new code block.

**L77:** `          id: 'PAY-902',`  
Executable statement: `id: 'PAY-902',`

**L78:** `          date: '2026-06-01',`  
Executable statement: `date: '2026-06-01',`

**L79:** `          amount: 1780.17,`  
Executable statement: `amount: 1780.17,`

**L80:** `          method: 'Debit order',`  
Executable statement: `method: 'Debit order',`

**L81:** `          status: 'cleared' as const,`  
Executable statement: `status: 'cleared' as const,`

**L82:** `        },`  
Closes the previous block/object/function.

**L83:** `        {`  
Opens a new code block.

**L84:** `          id: 'PAY-841',`  
Executable statement: `id: 'PAY-841',`

**L85:** `          date: '2026-05-01',`  
Executable statement: `date: '2026-05-01',`

**L86:** `          amount: 1780.17,`  
Executable statement: `amount: 1780.17,`

**L87:** `          method: 'Debit order',`  
Executable statement: `method: 'Debit order',`

**L88:** `          status: 'cleared' as const,`  
Executable statement: `status: 'cleared' as const,`

**L89:** `        },`  
Closes the previous block/object/function.

**L90:** `      ]`  
Executable statement: `]`

**L91:** `    },`  
Closes the previous block/object/function.

**L92:** `  })`  
Closes the previous block/object/function.

**L93:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/index.css`

_379 lines_

**L1:** `@import "tailwindcss";`  
CSS rule/selector — styles matching elements: `@import "tailwindcss";`

**L2:** ``  
Blank line — visual spacing.

**L3:** `@theme {`  
CSS rule/selector — styles matching elements: `@theme {`

**L4:** `  --color-teal: #0b3d3b;`  
CSS declaration — visual property: `--color-teal: #0b3d3b;`

**L5:** `  --color-teal-deep: #072928;`  
CSS declaration — visual property: `--color-teal-deep: #072928;`

**L6:** `  --color-teal-soft: #e6f0ef;`  
CSS declaration — visual property: `--color-teal-soft: #e6f0ef;`

**L7:** `  --color-teal-mid: #14706c;`  
CSS declaration — visual property: `--color-teal-mid: #14706c;`

**L8:** `  --color-ink: #0c1210;`  
CSS declaration — visual property: `--color-ink: #0c1210;`

**L9:** `  --color-ink-muted: #5c6b66;`  
CSS declaration — visual property: `--color-ink-muted: #5c6b66;`

**L10:** `  --color-surface: #f4f6f5;`  
CSS declaration — visual property: `--color-surface: #f4f6f5;`

**L11:** `  --color-surface-raised: #ffffff;`  
CSS declaration — visual property: `--color-surface-raised: #ffffff;`

**L12:** `  --color-paper: #f4f6f5;`  
CSS declaration — visual property: `--color-paper: #f4f6f5;`

**L13:** `  --color-white: #ffffff;`  
CSS declaration — visual property: `--color-white: #ffffff;`

**L14:** `  --color-sage: #1f7a4d;`  
CSS declaration — visual property: `--color-sage: #1f7a4d;`

**L15:** `  --color-sage-soft: #e6f5ec;`  
CSS declaration — visual property: `--color-sage-soft: #e6f5ec;`

**L16:** `  --color-rust: #b42318;`  
CSS declaration — visual property: `--color-rust: #b42318;`

**L17:** `  --color-rust-soft: #fef3f2;`  
CSS declaration — visual property: `--color-rust-soft: #fef3f2;`

**L18:** `  --color-amber: #b54708;`  
CSS declaration — visual property: `--color-amber: #b54708;`

**L19:** `  --color-amber-soft: #fffaeb;`  
CSS declaration — visual property: `--color-amber-soft: #fffaeb;`

**L20:** `  --color-line: #e2e8e5;`  
CSS declaration — visual property: `--color-line: #e2e8e5;`

**L21:** `  --color-line-strong: #c5d0cb;`  
CSS declaration — visual property: `--color-line-strong: #c5d0cb;`

**L22:** ``  
Blank line — visual spacing.

**L23:** `  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;`  
CSS declaration — visual property: `--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, `

**L24:** `  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;`  
CSS declaration — visual property: `--font-display: "Plus Jakarta Sans", ui-sans-serif, system-u`

**L25:** `  --font-mono: "IBM Plex Mono", ui-monospace, monospace;`  
CSS declaration — visual property: `--font-mono: "IBM Plex Mono", ui-monospace, monospace;`

**L26:** ``  
Blank line — visual spacing.

**L27:** `  --radius-sm: 0.25rem;`  
CSS declaration — visual property: `--radius-sm: 0.25rem;`

**L28:** `  --radius-md: 0.375rem;`  
CSS declaration — visual property: `--radius-md: 0.375rem;`

**L29:** `}`  
Closes the previous block/object/function.

**L30:** ``  
Blank line — visual spacing.

**L31:** `@layer base {`  
CSS rule/selector — styles matching elements: `@layer base {`

**L32:** `  html {`  
CSS declaration — visual property: `html {`

**L33:** `    scroll-behavior: smooth;`  
CSS declaration — visual property: `scroll-behavior: smooth;`

**L34:** `  }`  
Closes the previous block/object/function.

**L35:** ``  
Blank line — visual spacing.

**L36:** `  @media (prefers-reduced-motion: reduce) {`  
CSS rule/selector — styles matching elements: `@media (prefers-reduced-motion: reduce) {`

**L37:** `    html {`  
CSS declaration — visual property: `html {`

**L38:** `      scroll-behavior: auto;`  
CSS declaration — visual property: `scroll-behavior: auto;`

**L39:** `    }`  
Closes the previous block/object/function.

**L40:** `  }`  
Closes the previous block/object/function.

**L41:** ``  
Blank line — visual spacing.

**L42:** `  body {`  
CSS declaration — visual property: `body {`

**L43:** `    margin: 0;`  
CSS declaration — visual property: `margin: 0;`

**L44:** `    min-height: 100vh;`  
CSS declaration — visual property: `min-height: 100vh;`

**L45:** `    font-family: var(--font-sans);`  
CSS declaration — visual property: `font-family: var(--font-sans);`

**L46:** `    font-size: 1rem;`  
CSS declaration — visual property: `font-size: 1rem;`

**L47:** `    line-height: 1.55;`  
CSS declaration — visual property: `line-height: 1.55;`

**L48:** `    color: var(--color-ink);`  
CSS declaration — visual property: `color: var(--color-ink);`

**L49:** `    background-color: var(--color-surface);`  
CSS declaration — visual property: `background-color: var(--color-surface);`

**L50:** `    background-image:`  
CSS declaration — visual property: `background-image:`

**L51:** `      radial-gradient(ellipse 80% 50% at 100% -10%, rgb(20 112 108 / 0.08), transparent 55%),`  
CSS declaration — visual property: `radial-gradient(ellipse 80% 50% at 100% -10%, rgb(20 112 108`

**L52:** `      radial-gradient(ellipse 60% 40% at 0% 100%, rgb(11 61 59 / 0.06), transparent 50%);`  
CSS declaration — visual property: `radial-gradient(ellipse 60% 40% at 0% 100%, rgb(11 61 59 / 0`

**L53:** `    background-attachment: fixed;`  
CSS declaration — visual property: `background-attachment: fixed;`

**L54:** `    -webkit-font-smoothing: antialiased;`  
CSS declaration — visual property: `-webkit-font-smoothing: antialiased;`

**L55:** `    text-rendering: optimizeLegibility;`  
CSS declaration — visual property: `text-rendering: optimizeLegibility;`

**L56:** `  }`  
Closes the previous block/object/function.

**L57:** ``  
Blank line — visual spacing.

**L58:** `  #root {`  
Inline comment documenting intent.

**L59:** `    min-height: 100vh;`  
CSS declaration — visual property: `min-height: 100vh;`

**L60:** `  }`  
Closes the previous block/object/function.

**L61:** ``  
Blank line — visual spacing.

**L62:** `  ::selection {`  
CSS rule/selector — styles matching elements: `::selection {`

**L63:** `    background: color-mix(in srgb, var(--color-teal-mid) 28%, transparent);`  
CSS declaration — visual property: `background: color-mix(in srgb, var(--color-teal-mid) 28%, tr`

**L64:** `  }`  
Closes the previous block/object/function.

**L65:** ``  
Blank line — visual spacing.

**L66:** `  :focus-visible {`  
CSS rule/selector — styles matching elements: `:focus-visible {`

**L67:** `    outline: 2px solid var(--color-teal-mid);`  
CSS declaration — visual property: `outline: 2px solid var(--color-teal-mid);`

**L68:** `    outline-offset: 2px;`  
CSS declaration — visual property: `outline-offset: 2px;`

**L69:** `  }`  
Closes the previous block/object/function.

**L70:** ``  
Blank line — visual spacing.

**L71:** `  :focus:not(:focus-visible) {`  
CSS rule/selector — styles matching elements: `:focus:not(:focus-visible) {`

**L72:** `    outline: none;`  
CSS declaration — visual property: `outline: none;`

**L73:** `  }`  
Closes the previous block/object/function.

**L74:** ``  
Blank line — visual spacing.

**L75:** `  summary {`  
CSS declaration — visual property: `summary {`

**L76:** `    list-style: none;`  
CSS declaration — visual property: `list-style: none;`

**L77:** `  }`  
Closes the previous block/object/function.

**L78:** ``  
Blank line — visual spacing.

**L79:** `  summary::-webkit-details-marker {`  
CSS declaration — visual property: `summary::-webkit-details-marker {`

**L80:** `    display: none;`  
CSS declaration — visual property: `display: none;`

**L81:** `  }`  
Closes the previous block/object/function.

**L82:** `}`  
Closes the previous block/object/function.

**L83:** ``  
Blank line — visual spacing.

**L84:** `@layer utilities {`  
CSS rule/selector — styles matching elements: `@layer utilities {`

**L85:** `  .font-display {`  
CSS rule/selector — styles matching elements: `.font-display {`

**L86:** `    font-family: var(--font-display);`  
CSS declaration — visual property: `font-family: var(--font-display);`

**L87:** `  }`  
Closes the previous block/object/function.

**L88:** ``  
Blank line — visual spacing.

**L89:** `  .font-mono {`  
CSS rule/selector — styles matching elements: `.font-mono {`

**L90:** `    font-family: var(--font-mono);`  
CSS declaration — visual property: `font-family: var(--font-mono);`

**L91:** `    font-variant-numeric: tabular-nums lining-nums;`  
CSS declaration — visual property: `font-variant-numeric: tabular-nums lining-nums;`

**L92:** `  }`  
Closes the previous block/object/function.

**L93:** ``  
Blank line — visual spacing.

**L94:** `  .text-balance {`  
CSS rule/selector — styles matching elements: `.text-balance {`

**L95:** `    text-wrap: balance;`  
CSS declaration — visual property: `text-wrap: balance;`

**L96:** `  }`  
Closes the previous block/object/function.

**L97:** ``  
Blank line — visual spacing.

**L98:** `  .skip-link {`  
CSS rule/selector — styles matching elements: `.skip-link {`

**L99:** `    position: absolute;`  
CSS declaration — visual property: `position: absolute;`

**L100:** `    left: 1rem;`  
CSS declaration — visual property: `left: 1rem;`

**L101:** `    top: -4rem;`  
CSS declaration — visual property: `top: -4rem;`

**L102:** `    z-index: 80;`  
CSS declaration — visual property: `z-index: 80;`

**L103:** `    background: var(--color-white);`  
CSS declaration — visual property: `background: var(--color-white);`

**L104:** `    color: var(--color-ink);`  
CSS declaration — visual property: `color: var(--color-ink);`

**L105:** `    padding: 0.5rem 0.85rem;`  
CSS declaration — visual property: `padding: 0.5rem 0.85rem;`

**L106:** `    font-size: 0.875rem;`  
CSS declaration — visual property: `font-size: 0.875rem;`

**L107:** `    font-weight: 600;`  
CSS declaration — visual property: `font-weight: 600;`

**L108:** `    border-radius: var(--radius-sm);`  
CSS declaration — visual property: `border-radius: var(--radius-sm);`

**L109:** `  }`  
Closes the previous block/object/function.

**L110:** ``  
Blank line — visual spacing.

**L111:** `  .skip-link:focus {`  
CSS rule/selector — styles matching elements: `.skip-link:focus {`

**L112:** `    top: 0.75rem;`  
CSS declaration — visual property: `top: 0.75rem;`

**L113:** `  }`  
Closes the previous block/object/function.

**L114:** ``  
Blank line — visual spacing.

**L115:** `  .reveal {`  
CSS rule/selector — styles matching elements: `.reveal {`

**L116:** `    opacity: 0;`  
CSS declaration — visual property: `opacity: 0;`

**L117:** `    transform: translateY(16px);`  
CSS declaration — visual property: `transform: translateY(16px);`

**L118:** `    transition:`  
CSS declaration — visual property: `transition:`

**L119:** `      opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),`  
CSS declaration — visual property: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),`

**L120:** `      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);`  
CSS declaration — visual property: `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);`

**L121:** `    transition-delay: var(--reveal-delay, 0ms);`  
CSS declaration — visual property: `transition-delay: var(--reveal-delay, 0ms);`

**L122:** `  }`  
Closes the previous block/object/function.

**L123:** ``  
Blank line — visual spacing.

**L124:** `  .reveal-in {`  
CSS rule/selector — styles matching elements: `.reveal-in {`

**L125:** `    opacity: 1;`  
CSS declaration — visual property: `opacity: 1;`

**L126:** `    transform: none;`  
CSS declaration — visual property: `transform: none;`

**L127:** `  }`  
Closes the previous block/object/function.

**L128:** ``  
Blank line — visual spacing.

**L129:** `  .hero-copy {`  
CSS rule/selector — styles matching elements: `.hero-copy {`

**L130:** `    animation: fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both`

**L131:** `  }`  
Closes the previous block/object/function.

**L132:** ``  
Blank line — visual spacing.

**L133:** `  .hero-copy-2 {`  
CSS rule/selector — styles matching elements: `.hero-copy-2 {`

**L134:** `    animation: fade-up 0.75s 0.08s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: fade-up 0.75s 0.08s cubic-bezier(0.22, 1, 0.36, 1`

**L135:** `  }`  
Closes the previous block/object/function.

**L136:** ``  
Blank line — visual spacing.

**L137:** `  .hero-copy-3 {`  
CSS rule/selector — styles matching elements: `.hero-copy-3 {`

**L138:** `    animation: fade-up 0.75s 0.16s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: fade-up 0.75s 0.16s cubic-bezier(0.22, 1, 0.36, 1`

**L139:** `  }`  
Closes the previous block/object/function.

**L140:** ``  
Blank line — visual spacing.

**L141:** `  .hero-copy-4 {`  
CSS rule/selector — styles matching elements: `.hero-copy-4 {`

**L142:** `    animation: fade-up 0.8s 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: fade-up 0.8s 0.24s cubic-bezier(0.22, 1, 0.36, 1)`

**L143:** `  }`  
Closes the previous block/object/function.

**L144:** ``  
Blank line — visual spacing.

**L145:** `  .ledger-featured {`  
CSS rule/selector — styles matching elements: `.ledger-featured {`

**L146:** `    box-shadow:`  
CSS declaration — visual property: `box-shadow:`

**L147:** `      0 0 0 1px rgb(255 255 255 / 0.12),`  
CSS declaration — visual property: `0 0 0 1px rgb(255 255 255 / 0.12),`

**L148:** `      0 24px 48px rgb(7 41 40 / 0.35);`  
CSS declaration — visual property: `0 24px 48px rgb(7 41 40 / 0.35);`

**L149:** `    animation: fade-up 0.85s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: fade-up 0.85s 0.15s cubic-bezier(0.22, 1, 0.36, 1`

**L150:** `  }`  
Closes the previous block/object/function.

**L151:** ``  
Blank line — visual spacing.

**L152:** `  .page-cascade {`  
CSS rule/selector — styles matching elements: `.page-cascade {`

**L153:** `    position: relative;`  
CSS declaration — visual property: `position: relative;`

**L154:** `  }`  
Closes the previous block/object/function.

**L155:** ``  
Blank line — visual spacing.

**L156:** `  .panel-soft {`  
CSS rule/selector — styles matching elements: `.panel-soft {`

**L157:** `    border: 1px solid var(--color-line);`  
CSS declaration — visual property: `border: 1px solid var(--color-line);`

**L158:** `    background: var(--color-white);`  
CSS declaration — visual property: `background: var(--color-white);`

**L159:** `    border-radius: var(--radius-md);`  
CSS declaration — visual property: `border-radius: var(--radius-md);`

**L160:** `    box-shadow: 0 8px 30px rgb(12 18 16 / 0.06);`  
CSS declaration — visual property: `box-shadow: 0 8px 30px rgb(12 18 16 / 0.06);`

**L161:** `  }`  
Closes the previous block/object/function.

**L162:** ``  
Blank line — visual spacing.

**L163:** `  .island-surface {`  
CSS rule/selector — styles matching elements: `.island-surface {`

**L164:** `    border: 1px solid var(--color-line);`  
CSS declaration — visual property: `border: 1px solid var(--color-line);`

**L165:** `    background: var(--color-white);`  
CSS declaration — visual property: `background: var(--color-white);`

**L166:** `    border-radius: var(--radius-md);`  
CSS declaration — visual property: `border-radius: var(--radius-md);`

**L167:** `    box-shadow: 0 8px 30px rgb(12 18 16 / 0.06);`  
CSS declaration — visual property: `box-shadow: 0 8px 30px rgb(12 18 16 / 0.06);`

**L168:** `  }`  
Closes the previous block/object/function.

**L169:** ``  
Blank line — visual spacing.

**L170:** `  .panel-lift {`  
CSS rule/selector — styles matching elements: `.panel-lift {`

**L171:** `    transition:`  
CSS declaration — visual property: `transition:`

**L172:** `      transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),`  
CSS declaration — visual property: `transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),`

**L173:** `      box-shadow 0.28s ease;`  
CSS declaration — visual property: `box-shadow 0.28s ease;`

**L174:** `  }`  
Closes the previous block/object/function.

**L175:** ``  
Blank line — visual spacing.

**L176:** `  .panel-lift:hover {`  
CSS rule/selector — styles matching elements: `.panel-lift:hover {`

**L177:** `    transform: translateY(-3px);`  
CSS declaration — visual property: `transform: translateY(-3px);`

**L178:** `    box-shadow: 0 16px 40px rgb(12 18 16 / 0.1);`  
CSS declaration — visual property: `box-shadow: 0 16px 40px rgb(12 18 16 / 0.1);`

**L179:** `  }`  
Closes the previous block/object/function.

**L180:** ``  
Blank line — visual spacing.

**L181:** `  .grain::after {`  
CSS rule/selector — styles matching elements: `.grain::after {`

**L182:** `    content: "";`  
CSS declaration — visual property: `content: "";`

**L183:** `    pointer-events: none;`  
CSS declaration — visual property: `pointer-events: none;`

**L184:** `    position: absolute;`  
CSS declaration — visual property: `position: absolute;`

**L185:** `    inset: 0;`  
CSS declaration — visual property: `inset: 0;`

**L186:** `    opacity: 0.035;`  
CSS declaration — visual property: `opacity: 0.035;`

**L187:** `    mix-blend-mode: overlay;`  
CSS declaration — visual property: `mix-blend-mode: overlay;`

**L188:** `    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.o...`  
CSS declaration — visual property: `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 `

**L189:** `  }`  
Closes the previous block/object/function.

**L190:** ``  
Blank line — visual spacing.

**L191:** `  .hero-mesh {`  
CSS rule/selector — styles matching elements: `.hero-mesh {`

**L192:** `    background:`  
CSS declaration — visual property: `background:`

**L193:** `      radial-gradient(ellipse 70% 60% at 85% 20%, rgb(20 112 108 / 0.55), transparent 55%),`  
CSS declaration — visual property: `radial-gradient(ellipse 70% 60% at 85% 20%, rgb(20 112 108 /`

**L194:** `      radial-gradient(ellipse 50% 40% at 10% 90%, rgb(7 41 40 / 0.7), transparent 50%),`  
CSS declaration — visual property: `radial-gradient(ellipse 50% 40% at 10% 90%, rgb(7 41 40 / 0.`

**L195:** `      linear-gradient(160deg, #0b3d3b 0%, #0a3533 45%, #072928 100%);`  
CSS declaration — visual property: `linear-gradient(160deg, #0b3d3b 0%, #0a3533 45%, #072928 100`

**L196:** `  }`  
Closes the previous block/object/function.

**L197:** ``  
Blank line — visual spacing.

**L198:** `  .marquee-track {`  
CSS rule/selector — styles matching elements: `.marquee-track {`

**L199:** `    display: flex;`  
CSS declaration — visual property: `display: flex;`

**L200:** `    width: max-content;`  
CSS declaration — visual property: `width: max-content;`

**L201:** `    animation: marquee 32s linear infinite;`  
CSS declaration — visual property: `animation: marquee 32s linear infinite;`

**L202:** `  }`  
Closes the previous block/object/function.

**L203:** ``  
Blank line — visual spacing.

**L204:** `  .display-xl {`  
CSS rule/selector — styles matching elements: `.display-xl {`

**L205:** `    font-size: clamp(2.75rem, 6vw, 4.25rem);`  
CSS declaration — visual property: `font-size: clamp(2.75rem, 6vw, 4.25rem);`

**L206:** `    font-weight: 700;`  
CSS declaration — visual property: `font-weight: 700;`

**L207:** `    letter-spacing: -0.04em;`  
CSS declaration — visual property: `letter-spacing: -0.04em;`

**L208:** `    line-height: 1.02;`  
CSS declaration — visual property: `line-height: 1.02;`

**L209:** `  }`  
Closes the previous block/object/function.

**L210:** ``  
Blank line — visual spacing.

**L211:** `  .watermark {`  
CSS rule/selector — styles matching elements: `.watermark {`

**L212:** `    font-family: var(--font-mono);`  
CSS declaration — visual property: `font-family: var(--font-mono);`

**L213:** `    font-size: clamp(6rem, 18vw, 14rem);`  
CSS declaration — visual property: `font-size: clamp(6rem, 18vw, 14rem);`

**L214:** `    font-weight: 600;`  
CSS declaration — visual property: `font-weight: 600;`

**L215:** `    letter-spacing: -0.06em;`  
CSS declaration — visual property: `letter-spacing: -0.06em;`

**L216:** `    line-height: 0.85;`  
CSS declaration — visual property: `line-height: 0.85;`

**L217:** `    color: rgb(255 255 255 / 0.04);`  
CSS declaration — visual property: `color: rgb(255 255 255 / 0.04);`

**L218:** `    user-select: none;`  
CSS declaration — visual property: `user-select: none;`

**L219:** `  }`  
Closes the previous block/object/function.

**L220:** ``  
Blank line — visual spacing.

**L221:** `  .accent-bar {`  
CSS rule/selector — styles matching elements: `.accent-bar {`

**L222:** `    height: 3px;`  
CSS declaration — visual property: `height: 3px;`

**L223:** `    width: 100%;`  
CSS declaration — visual property: `width: 100%;`

**L224:** `    background: linear-gradient(90deg, var(--color-teal-mid), transparent 70%);`  
CSS declaration — visual property: `background: linear-gradient(90deg, var(--color-teal-mid), tr`

**L225:** `  }`  
Closes the previous block/object/function.

**L226:** ``  
Blank line — visual spacing.

**L227:** `  .product-row {`  
CSS rule/selector — styles matching elements: `.product-row {`

**L228:** `    position: relative;`  
CSS declaration — visual property: `position: relative;`

**L229:** `    border-radius: var(--radius-sm);`  
CSS declaration — visual property: `border-radius: var(--radius-sm);`

**L230:** `    transition:`  
CSS declaration — visual property: `transition:`

**L231:** `      background-color 0.2s ease,`  
CSS declaration — visual property: `background-color 0.2s ease,`

**L232:** `      padding-left 0.25s cubic-bezier(0.22, 1, 0.36, 1);`  
CSS declaration — visual property: `padding-left 0.25s cubic-bezier(0.22, 1, 0.36, 1);`

**L233:** `  }`  
Closes the previous block/object/function.

**L234:** ``  
Blank line — visual spacing.

**L235:** `  .product-row::before {`  
CSS rule/selector — styles matching elements: `.product-row::before {`

**L236:** `    content: "";`  
CSS declaration — visual property: `content: "";`

**L237:** `    position: absolute;`  
CSS declaration — visual property: `position: absolute;`

**L238:** `    left: 0;`  
CSS declaration — visual property: `left: 0;`

**L239:** `    top: 0.75rem;`  
CSS declaration — visual property: `top: 0.75rem;`

**L240:** `    bottom: 0.75rem;`  
CSS declaration — visual property: `bottom: 0.75rem;`

**L241:** `    width: 3px;`  
CSS declaration — visual property: `width: 3px;`

**L242:** `    background: var(--color-teal-mid);`  
CSS declaration — visual property: `background: var(--color-teal-mid);`

**L243:** `    transform: scaleY(0);`  
CSS declaration — visual property: `transform: scaleY(0);`

**L244:** `    transform-origin: top;`  
CSS declaration — visual property: `transform-origin: top;`

**L245:** `    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);`  
CSS declaration — visual property: `transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);`

**L246:** `  }`  
Closes the previous block/object/function.

**L247:** ``  
Blank line — visual spacing.

**L248:** `  .product-row:hover,`  
CSS rule/selector — styles matching elements: `.product-row:hover,`

**L249:** `  .product-row:focus-visible {`  
CSS rule/selector — styles matching elements: `.product-row:focus-visible {`

**L250:** `    background: var(--color-teal-soft);`  
CSS declaration — visual property: `background: var(--color-teal-soft);`

**L251:** `    padding-left: 1.15rem;`  
CSS declaration — visual property: `padding-left: 1.15rem;`

**L252:** `  }`  
Closes the previous block/object/function.

**L253:** ``  
Blank line — visual spacing.

**L254:** `  .product-row:hover::before,`  
CSS rule/selector — styles matching elements: `.product-row:hover::before,`

**L255:** `  .product-row:focus-visible::before {`  
CSS rule/selector — styles matching elements: `.product-row:focus-visible::before {`

**L256:** `    transform: scaleY(1);`  
CSS declaration — visual property: `transform: scaleY(1);`

**L257:** `  }`  
Closes the previous block/object/function.

**L258:** ``  
Blank line — visual spacing.

**L259:** `  .step-num {`  
CSS rule/selector — styles matching elements: `.step-num {`

**L260:** `    color: var(--color-teal-mid);`  
CSS declaration — visual property: `color: var(--color-teal-mid);`

**L261:** `    font-family: var(--font-mono);`  
CSS declaration — visual property: `font-family: var(--font-mono);`

**L262:** `    font-variant-numeric: tabular-nums;`  
CSS declaration — visual property: `font-variant-numeric: tabular-nums;`

**L263:** `  }`  
Closes the previous block/object/function.

**L264:** ``  
Blank line — visual spacing.

**L265:** `  .site-nav {`  
CSS rule/selector — styles matching elements: `.site-nav {`

**L266:** `    animation: nav-settle 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;`  
CSS declaration — visual property: `animation: nav-settle 0.55s cubic-bezier(0.22, 1, 0.36, 1) b`

**L267:** `  }`  
Closes the previous block/object/function.

**L268:** ``  
Blank line — visual spacing.

**L269:** `  .cta-band {`  
CSS rule/selector — styles matching elements: `.cta-band {`

**L270:** `    position: relative;`  
CSS declaration — visual property: `position: relative;`

**L271:** `    overflow: hidden;`  
CSS declaration — visual property: `overflow: hidden;`

**L272:** `    background: var(--color-ink);`  
CSS declaration — visual property: `background: var(--color-ink);`

**L273:** `  }`  
Closes the previous block/object/function.

**L274:** ``  
Blank line — visual spacing.

**L275:** `  .cta-band::before {`  
CSS rule/selector — styles matching elements: `.cta-band::before {`

**L276:** `    content: "";`  
CSS declaration — visual property: `content: "";`

**L277:** `    position: absolute;`  
CSS declaration — visual property: `position: absolute;`

**L278:** `    inset: 0;`  
CSS declaration — visual property: `inset: 0;`

**L279:** `    background:`  
CSS declaration — visual property: `background:`

**L280:** `      linear-gradient(115deg, transparent 40%, rgb(20 112 108 / 0.35) 40.5%, rgb(20 112 108 / 0.3...`  
CSS declaration — visual property: `linear-gradient(115deg, transparent 40%, rgb(20 112 108 / 0.`

**L281:** `      radial-gradient(circle at 90% 50%, rgb(20 112 108 / 0.25), transparent 45%);`  
CSS declaration — visual property: `radial-gradient(circle at 90% 50%, rgb(20 112 108 / 0.25), t`

**L282:** `  }`  
Closes the previous block/object/function.

**L283:** ``  
Blank line — visual spacing.

**L284:** `  @keyframes nav-settle {`  
CSS rule/selector — styles matching elements: `@keyframes nav-settle {`

**L285:** `    from {`  
Import — brings in `dependency` so this file can use it.

**L286:** `      opacity: 0;`  
CSS declaration — visual property: `opacity: 0;`

**L287:** `      transform: translateY(-10px);`  
CSS declaration — visual property: `transform: translateY(-10px);`

**L288:** `    }`  
Closes the previous block/object/function.

**L289:** `    to {`  
CSS declaration — visual property: `to {`

**L290:** `      opacity: 1;`  
CSS declaration — visual property: `opacity: 1;`

**L291:** `      transform: none;`  
CSS declaration — visual property: `transform: none;`

**L292:** `    }`  
Closes the previous block/object/function.

**L293:** `  }`  
Closes the previous block/object/function.

**L294:** ``  
Blank line — visual spacing.

**L295:** `  @keyframes fade-up {`  
CSS rule/selector — styles matching elements: `@keyframes fade-up {`

**L296:** `    from {`  
Import — brings in `dependency` so this file can use it.

**L297:** `      opacity: 0;`  
CSS declaration — visual property: `opacity: 0;`

**L298:** `      transform: translateY(16px);`  
CSS declaration — visual property: `transform: translateY(16px);`

**L299:** `    }`  
Closes the previous block/object/function.

**L300:** `    to {`  
CSS declaration — visual property: `to {`

**L301:** `      opacity: 1;`  
CSS declaration — visual property: `opacity: 1;`

**L302:** `      transform: none;`  
CSS declaration — visual property: `transform: none;`

**L303:** `    }`  
Closes the previous block/object/function.

**L304:** `  }`  
Closes the previous block/object/function.

**L305:** ``  
Blank line — visual spacing.

**L306:** `  @keyframes marquee {`  
CSS rule/selector — styles matching elements: `@keyframes marquee {`

**L307:** `    from {`  
Import — brings in `dependency` so this file can use it.

**L308:** `      transform: translateX(0);`  
CSS declaration — visual property: `transform: translateX(0);`

**L309:** `    }`  
Closes the previous block/object/function.

**L310:** `    to {`  
CSS declaration — visual property: `to {`

**L311:** `      transform: translateX(-50%);`  
CSS declaration — visual property: `transform: translateX(-50%);`

**L312:** `    }`  
Closes the previous block/object/function.

**L313:** `  }`  
Closes the previous block/object/function.

**L314:** ``  
Blank line — visual spacing.

**L315:** `  @keyframes pulse-soft {`  
CSS rule/selector — styles matching elements: `@keyframes pulse-soft {`

**L316:** `    0%,`  
CSS declaration — visual property: `0%,`

**L317:** `    100% {`  
CSS declaration — visual property: `100% {`

**L318:** `      opacity: 0.45;`  
CSS declaration — visual property: `opacity: 0.45;`

**L319:** `    }`  
Closes the previous block/object/function.

**L320:** `    50% {`  
CSS declaration — visual property: `50% {`

**L321:** `      opacity: 0.85;`  
CSS declaration — visual property: `opacity: 0.85;`

**L322:** `    }`  
Closes the previous block/object/function.

**L323:** `  }`  
Closes the previous block/object/function.

**L324:** ``  
Blank line — visual spacing.

**L325:** `  .live-dot {`  
CSS rule/selector — styles matching elements: `.live-dot {`

**L326:** `    width: 0.45rem;`  
CSS declaration — visual property: `width: 0.45rem;`

**L327:** `    height: 0.45rem;`  
CSS declaration — visual property: `height: 0.45rem;`

**L328:** `    border-radius: 999px;`  
CSS declaration — visual property: `border-radius: 999px;`

**L329:** `    background: #3dba7a;`  
CSS declaration — visual property: `background: #3dba7a;`

**L330:** `    box-shadow: 0 0 0 0 rgb(61 186 122 / 0.5);`  
CSS declaration — visual property: `box-shadow: 0 0 0 0 rgb(61 186 122 / 0.5);`

**L331:** `    animation: live-ring 2s ease-out infinite;`  
CSS declaration — visual property: `animation: live-ring 2s ease-out infinite;`

**L332:** `  }`  
Closes the previous block/object/function.

**L333:** ``  
Blank line — visual spacing.

**L334:** `  @keyframes live-ring {`  
CSS rule/selector — styles matching elements: `@keyframes live-ring {`

**L335:** `    0% {`  
CSS declaration — visual property: `0% {`

**L336:** `      box-shadow: 0 0 0 0 rgb(61 186 122 / 0.45);`  
CSS declaration — visual property: `box-shadow: 0 0 0 0 rgb(61 186 122 / 0.45);`

**L337:** `    }`  
Closes the previous block/object/function.

**L338:** `    70% {`  
CSS declaration — visual property: `70% {`

**L339:** `      box-shadow: 0 0 0 8px rgb(61 186 122 / 0);`  
CSS declaration — visual property: `box-shadow: 0 0 0 8px rgb(61 186 122 / 0);`

**L340:** `    }`  
Closes the previous block/object/function.

**L341:** `    100% {`  
CSS declaration — visual property: `100% {`

**L342:** `      box-shadow: 0 0 0 0 rgb(61 186 122 / 0);`  
CSS declaration — visual property: `box-shadow: 0 0 0 0 rgb(61 186 122 / 0);`

**L343:** `    }`  
Closes the previous block/object/function.

**L344:** `  }`  
Closes the previous block/object/function.

**L345:** ``  
Blank line — visual spacing.

**L346:** `  @media (prefers-reduced-motion: reduce) {`  
CSS rule/selector — styles matching elements: `@media (prefers-reduced-motion: reduce) {`

**L347:** `    .site-nav,`  
CSS rule/selector — styles matching elements: `.site-nav,`

**L348:** `    .reveal,`  
CSS rule/selector — styles matching elements: `.reveal,`

**L349:** `    .hero-copy,`  
CSS rule/selector — styles matching elements: `.hero-copy,`

**L350:** `    .hero-copy-2,`  
CSS rule/selector — styles matching elements: `.hero-copy-2,`

**L351:** `    .hero-copy-3,`  
CSS rule/selector — styles matching elements: `.hero-copy-3,`

**L352:** `    .hero-copy-4,`  
CSS rule/selector — styles matching elements: `.hero-copy-4,`

**L353:** `    .ledger-featured,`  
CSS rule/selector — styles matching elements: `.ledger-featured,`

**L354:** `    .marquee-track,`  
CSS rule/selector — styles matching elements: `.marquee-track,`

**L355:** `    .live-dot {`  
CSS rule/selector — styles matching elements: `.live-dot {`

**L356:** `      animation: none;`  
CSS declaration — visual property: `animation: none;`

**L357:** `      opacity: 1;`  
CSS declaration — visual property: `opacity: 1;`

**L358:** `      transform: none;`  
CSS declaration — visual property: `transform: none;`

**L359:** `    }`  
Closes the previous block/object/function.

**L360:** ``  
Blank line — visual spacing.

**L361:** `    .panel-lift:hover {`  
CSS rule/selector — styles matching elements: `.panel-lift:hover {`

**L362:** `      transform: none;`  
CSS declaration — visual property: `transform: none;`

**L363:** `    }`  
Closes the previous block/object/function.

**L364:** ``  
Blank line — visual spacing.

**L365:** `    .product-row::before {`  
CSS rule/selector — styles matching elements: `.product-row::before {`

**L366:** `      transition: none;`  
CSS declaration — visual property: `transition: none;`

**L367:** `    }`  
Closes the previous block/object/function.

**L368:** ``  
Blank line — visual spacing.

**L369:** `    .product-row:hover,`  
CSS rule/selector — styles matching elements: `.product-row:hover,`

**L370:** `    .product-row:focus-visible {`  
CSS rule/selector — styles matching elements: `.product-row:focus-visible {`

**L371:** `      padding-left: 1rem;`  
CSS declaration — visual property: `padding-left: 1rem;`

**L372:** `    }`  
Closes the previous block/object/function.

**L373:** ``  
Blank line — visual spacing.

**L374:** `    a:hover,`  
CSS declaration — visual property: `a:hover,`

**L375:** `    button:hover {`  
CSS declaration — visual property: `button:hover {`

**L376:** `      transform: none;`  
CSS declaration — visual property: `transform: none;`

**L377:** `    }`  
Closes the previous block/object/function.

**L378:** `  }`  
Closes the previous block/object/function.

**L379:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/lib/api.ts`

_48 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Shared Axios instance for all backend calls.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - baseURL '/api' is proxied by Vite to Spring Boot :8080.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Request interceptor adds Authorization Bearer token from authStore/hydrateAuth.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - 401 response clears session and sends user to /login (pairs with JwtAuthenticationFilter).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Typed wrappers live in apiClient.ts; DTO shapes in apiTypes.ts.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ``  
Blank line — visual spacing.

**L11:** `import axios from 'axios'`  
Import — brings in `axios` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `export const api = axios.create({`  
Constant/variable `api` — holds a value or React binding.

**L14:** `  baseURL: import.meta.env.VITE_API_URL ?? '/api',`  
Executable statement: `baseURL: import.meta.env.VITE_API_URL ?? '/api',`

**L15:** `  withCredentials: true,`  
Executable statement: `withCredentials: true,`

**L16:** `})`  
Closes the previous block/object/function.

**L17:** ``  
Blank line — visual spacing.

**L18:** `let accessToken: string | null = null`  
Mutable variable declaration.

**L19:** ``  
Blank line — visual spacing.

**L20:** `export function setAccessToken(token: string | null) {`  
Defines function `setAccessToken` — callable unit of UI/logic.

**L21:** `  accessToken = token`  
Assignment / binding: `accessToken = token`

**L22:** `}`  
Closes the previous block/object/function.

**L23:** ``  
Blank line — visual spacing.

**L24:** `export function getAccessToken() {`  
Defines function `getAccessToken` — callable unit of UI/logic.

**L25:** `  return accessToken`  
Returns a value to the caller: `accessToken`

**L26:** `}`  
Closes the previous block/object/function.

**L27:** ``  
Blank line — visual spacing.

**L28:** `api.interceptors.request.use((config) => {`  
Assignment / binding: `api.interceptors.request.use((config) => {`

**L29:** `  if (accessToken) {`  
Conditional — runs the following block only when the condition is true.

**L30:** `    config.headers.Authorization = 'Bearer ${accessToken}'`  
JWT / auth header handling — proves who the caller is.

**L31:** `  }`  
Closes the previous block/object/function.

**L32:** `  return config`  
Returns a value to the caller: `config`

**L33:** `})`  
Closes the previous block/object/function.

**L34:** ``  
Blank line — visual spacing.

**L35:** `api.interceptors.response.use(`  
Executable statement: `api.interceptors.response.use(`

**L36:** `  (response) => response,`  
Assignment / binding: `(response) => response,`

**L37:** `  (error) => {`  
Assignment / binding: `(error) => {`

**L38:** `    if (error.response?.status === 401) {`  
Conditional — runs the following block only when the condition is true.

**L39:** `      sessionStorage.removeItem('tshedza-token')`  
Browser sessionStorage — persists token/user for this tab session.

**L40:** `      sessionStorage.removeItem('tshedza-user')`  
Browser sessionStorage — persists token/user for this tab session.

**L41:** `      accessToken = null`  
Assignment / binding: `accessToken = null`

**L42:** `      if (!window.location.pathname.startsWith('/login')) {`  
Conditional — runs the following block only when the condition is true.

**L43:** `        window.location.href = '/login?next=${window.location.pathname}'`  
Assignment / binding: `window.location.href = `/login?next=${window.location.pathname}``

**L44:** `      }`  
Closes the previous block/object/function.

**L45:** `    }`  
Closes the previous block/object/function.

**L46:** `    return Promise.reject(error)`  
Returns a value to the caller: `Promise.reject(error)`

**L47:** `  },`  
Closes the previous block/object/function.

**L48:** `)`  
Executable statement: `)`

---

## `frontend/src/lib/apiClient.ts`

_203 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * One function per backend endpoint -- the frontend/API contract.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP (selected)`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * Auth:      login/register/logout -> AuthenticationController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * Apply:     createApplication/uploadDocument/submitApplication -> ApplicationController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * Dashboard: fetchLoans/fetchLoan/makeRepayment -> LoanController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * Public:    createTransfer / createDebtReview -> TransferController / DebtReviewController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` * Admin:     fetchAdmin* / adminDecideApplication -> AdminController`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L11:** ` * Pages/hooks import these; they should not call axios directly.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L12:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L13:** ``  
Blank line — visual spacing.

**L14:** `import { api } from '@/lib/api'`  
Import — brings in `@/lib/api` so this file can use it.

**L15:** `import type { DetailsForm } from '@/lib/validation'`  
Import — brings in `@/lib/validation` so this file can use it.

**L16:** `import type {`  
Import — brings in `type` so this file can use it.

**L17:** `  AuthResponse,`  
Executable statement: `AuthResponse,`

**L18:** `  DocumentKind,`  
Executable statement: `DocumentKind,`

**L19:** `  Loan,`  
Executable statement: `Loan,`

**L20:** `  Payment,`  
Executable statement: `Payment,`

**L21:** `  ProductType,`  
Executable statement: `ProductType,`

**L22:** `  UserProfile,`  
Executable statement: `UserProfile,`

**L23:** `  AdminOverview,`  
Executable statement: `AdminOverview,`

**L24:** `  AdminApplication,`  
Executable statement: `AdminApplication,`

**L25:** `  AdminTransfer,`  
Executable statement: `AdminTransfer,`

**L26:** `  AdminDebtReview,`  
Executable statement: `AdminDebtReview,`

**L27:** `} from '@/lib/apiTypes'`  
Closes the previous block/object/function.

**L28:** ``  
Blank line — visual spacing.

**L29:** `// --- Auth (AuthenticationController) --- used by Login.tsx / Register.tsx / authStore ---`  
Inline comment documenting intent.

**L30:** ``  
Blank line — visual spacing.

**L31:** `/** POST /api/auth/login */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L32:** `export async function login(email: string, password: string) {`  
Async API helper `login` — awaits a backend HTTP call and returns data.

**L33:** `  const { data } = await api.post<AuthResponse>('/auth/login', { email, password })`  
Constant/variable `?` — holds a value or React binding.

**L34:** `  return data`  
Returns a value to the caller: `data`

**L35:** `}`  
Closes the previous block/object/function.

**L36:** ``  
Blank line — visual spacing.

**L37:** `/** POST /api/auth/register */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L38:** `export async function register(body: {`  
Async API helper `register` — awaits a backend HTTP call and returns data.

**L39:** `  email: string`  
Executable statement: `email: string`

**L40:** `  password: string`  
Executable statement: `password: string`

**L41:** `  firstName: string`  
Executable statement: `firstName: string`

**L42:** `  lastName: string`  
Executable statement: `lastName: string`

**L43:** `  phone: string`  
Executable statement: `phone: string`

**L44:** `}) {`  
Closes the previous block/object/function.

**L45:** `  const { data } = await api.post<AuthResponse>('/auth/register', body)`  
Constant/variable `?` — holds a value or React binding.

**L46:** `  return data`  
Returns a value to the caller: `data`

**L47:** `}`  
Closes the previous block/object/function.

**L48:** ``  
Blank line — visual spacing.

**L49:** `/** POST /api/auth/logout */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L50:** `export async function logout() {`  
Async API helper `logout` — awaits a backend HTTP call and returns data.

**L51:** `  await api.post('/auth/logout')`  
HTTP call to the backend API.

**L52:** `}`  
Closes the previous block/object/function.

**L53:** ``  
Blank line — visual spacing.

**L54:** `/** GET /api/me (MeController) */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L55:** `export async function fetchMe() {`  
Async API helper `fetchMe` — awaits a backend HTTP call and returns data.

**L56:** `  const { data } = await api.get<UserProfile>('/me')`  
Constant/variable `?` — holds a value or React binding.

**L57:** `  return data`  
Returns a value to the caller: `data`

**L58:** `}`  
Closes the previous block/object/function.

**L59:** ``  
Blank line — visual spacing.

**L60:** `// --- Apply flow (ApplicationController) --- DetailsStep / DocumentsStep / ReviewStep ---`  
Inline comment documenting intent.

**L61:** ``  
Blank line — visual spacing.

**L62:** `/** POST /api/applications — stores draft; returns id kept in applicationStore */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L63:** `export async function createApplication(body: {`  
Async API helper `createApplication` — awaits a backend HTTP call and returns data.

**L64:** `  product: ProductType`  
Executable statement: `product: ProductType`

**L65:** `  amount: number`  
Executable statement: `amount: number`

**L66:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L67:** `  details: Partial<DetailsForm> & { employerName?: string; weeklyWage?: string }`  
Executable statement: `details: Partial<DetailsForm> & { employerName?: string; weeklyWage?: …`

**L68:** `}) {`  
Closes the previous block/object/function.

**L69:** `  const { data } = await api.post<{ id: string; status: string }>('/applications', body)`  
Constant/variable `?` — holds a value or React binding.

**L70:** `  return data`  
Returns a value to the caller: `data`

**L71:** `}`  
Closes the previous block/object/function.

**L72:** ``  
Blank line — visual spacing.

**L73:** `/** POST /api/applications/{id}/documents — useDocumentUpload / DocumentsStep */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L74:** `export async function uploadDocument(applicationId: string, kind: DocumentKind, file: File) {`  
Async API helper `uploadDocument` — awaits a backend HTTP call and returns data.

**L75:** `  const form = new FormData()`  
Constant/variable `form` — holds a value or React binding.

**L76:** `  form.append('kind', kind)`  
Executable statement: `form.append('kind', kind)`

**L77:** `  form.append('file', file)`  
Executable statement: `form.append('file', file)`

**L78:** `  const { data } = await api.post<{ kind: DocumentKind; status: 'uploaded' | 'rejected' }>(`  
Constant/variable `?` — holds a value or React binding.

**L79:** `    '/applications/${applicationId}/documents',`  
Executable statement: ``/applications/${applicationId}/documents`,`

**L80:** `    form,`  
Executable statement: `form,`

**L81:** `  )`  
Executable statement: `)`

**L82:** `  return data`  
Returns a value to the caller: `data`

**L83:** `}`  
Closes the previous block/object/function.

**L84:** ``  
Blank line — visual spacing.

**L85:** `/** POST /api/applications/{id}/submit — ReviewStep; then admin queue */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L86:** `export async function submitApplication(`  
Async API helper `submitApplication` — awaits a backend HTTP call and returns data.

**L87:** `  applicationId: string,`  
Executable statement: `applicationId: string,`

**L88:** `  body: { acceptedTerms: boolean; signature: string },`  
Executable statement: `body: { acceptedTerms: boolean; signature: string },`

**L89:** `) {`  
Executable statement: `) {`

**L90:** `  const { data } = await api.post<{ id: string; reference: string; status: string }>(`  
Constant/variable `?` — holds a value or React binding.

**L91:** `    '/applications/${applicationId}/submit',`  
Executable statement: ``/applications/${applicationId}/submit`,`

**L92:** `    body,`  
Executable statement: `body,`

**L93:** `  )`  
Executable statement: `)`

**L94:** `  return data`  
Returns a value to the caller: `data`

**L95:** `}`  
Closes the previous block/object/function.

**L96:** ``  
Blank line — visual spacing.

**L97:** `// --- Dashboard (LoanController) --- Dashboard.tsx ---`  
Inline comment documenting intent.

**L98:** ``  
Blank line — visual spacing.

**L99:** `/** GET /api/loans */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L100:** `export async function fetchLoans() {`  
Async API helper `fetchLoans` — awaits a backend HTTP call and returns data.

**L101:** `  const { data } = await api.get<{ loans: Loan[] }>('/loans')`  
Constant/variable `?` — holds a value or React binding.

**L102:** `  return data`  
Returns a value to the caller: `data`

**L103:** `}`  
Closes the previous block/object/function.

**L104:** ``  
Blank line — visual spacing.

**L105:** `/** GET /api/loans/{id} */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L106:** `export async function fetchLoan(loanId: string) {`  
Async API helper `fetchLoan` — awaits a backend HTTP call and returns data.

**L107:** `  const { data } = await api.get<Loan>('/loans/${loanId}')`  
Constant/variable `?` — holds a value or React binding.

**L108:** `  return data`  
Returns a value to the caller: `data`

**L109:** `}`  
Closes the previous block/object/function.

**L110:** ``  
Blank line — visual spacing.

**L111:** `/** GET /api/repayments */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L112:** `export async function fetchRepayments() {`  
Async API helper `fetchRepayments` — awaits a backend HTTP call and returns data.

**L113:** `  const { data } = await api.get<Payment[]>('/repayments')`  
Constant/variable `?` — holds a value or React binding.

**L114:** `  return data`  
Returns a value to the caller: `data`

**L115:** `}`  
Closes the previous block/object/function.

**L116:** ``  
Blank line — visual spacing.

**L117:** `/** GET /api/me/documents */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L118:** `export async function fetchMyDocuments() {`  
Async API helper `fetchMyDocuments` — awaits a backend HTTP call and returns data.

**L119:** `  const { data } = await api.get<Array<{ kind: string; fileName: string; status: string }>>('/me/...`  
Constant/variable `?` — holds a value or React binding.

**L120:** `  return data`  
Returns a value to the caller: `data`

**L121:** `}`  
Closes the previous block/object/function.

**L122:** ``  
Blank line — visual spacing.

**L123:** `// --- Public flows ---`  
Inline comment documenting intent.

**L124:** ``  
Blank line — visual spacing.

**L125:** `/** POST /api/transfers — Transfer.tsx (no JWT required) */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L126:** `export async function createTransfer(body: {`  
Async API helper `createTransfer` — awaits a backend HTTP call and returns data.

**L127:** `  senderName: string`  
Executable statement: `senderName: string`

**L128:** `  senderPhone: string`  
Executable statement: `senderPhone: string`

**L129:** `  recipientName: string`  
Executable statement: `recipientName: string`

**L130:** `  recipientPhone: string`  
Executable statement: `recipientPhone: string`

**L131:** `  country: string`  
Executable statement: `country: string`

**L132:** `  amount: number`  
Executable statement: `amount: number`

**L133:** `}) {`  
Closes the previous block/object/function.

**L134:** `  const { data } = await api.post<{ id: string; reference: string; fee: number; total: number }>(`  
Constant/variable `?` — holds a value or React binding.

**L135:** `    '/transfers',`  
Executable statement: `'/transfers',`

**L136:** `    body,`  
Executable statement: `body,`

**L137:** `  )`  
Executable statement: `)`

**L138:** `  return data`  
Returns a value to the caller: `data`

**L139:** `}`  
Closes the previous block/object/function.

**L140:** ``  
Blank line — visual spacing.

**L141:** `/** POST /api/debt-review — DebtReview.tsx (no JWT required) */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L142:** `export async function createDebtReview(body: {`  
Async API helper `createDebtReview` — awaits a backend HTTP call and returns data.

**L143:** `  fullName: string`  
Executable statement: `fullName: string`

**L144:** `  phone: string`  
Executable statement: `phone: string`

**L145:** `  email: string`  
Executable statement: `email: string`

**L146:** `  situation: string`  
Executable statement: `situation: string`

**L147:** `}) {`  
Closes the previous block/object/function.

**L148:** `  const { data } = await api.post<{ id: string; status: string }>('/debt-review', body)`  
Constant/variable `?` — holds a value or React binding.

**L149:** `  return data`  
Returns a value to the caller: `data`

**L150:** `}`  
Closes the previous block/object/function.

**L151:** ``  
Blank line — visual spacing.

**L152:** `/** POST /api/repayments — pay next instalment on LoanDetailPage */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L153:** `export async function makeRepayment(loanId: string) {`  
Async API helper `makeRepayment` — awaits a backend HTTP call and returns data.

**L154:** `  const { data } = await api.post<Payment>('/repayments', { loanId })`  
Constant/variable `?` — holds a value or React binding.

**L155:** `  return data`  
Returns a value to the caller: `data`

**L156:** `}`  
Closes the previous block/object/function.

**L157:** ``  
Blank line — visual spacing.

**L158:** `// --- Admin (AdminController) — AdminPanel.tsx; needs ROLE_ADMIN ---`  
Inline comment documenting intent.

**L159:** ``  
Blank line — visual spacing.

**L160:** `/** GET /api/admin/overview */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L161:** `export async function fetchAdminOverview() {`  
Async API helper `fetchAdminOverview` — awaits a backend HTTP call and returns data.

**L162:** `  const { data } = await api.get<AdminOverview>('/admin/overview')`  
Constant/variable `?` — holds a value or React binding.

**L163:** `  return data`  
Returns a value to the caller: `data`

**L164:** `}`  
Closes the previous block/object/function.

**L165:** ``  
Blank line — visual spacing.

**L166:** `/** GET /api/admin/applications?status=pending */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L167:** `export async function fetchAdminApplications(status = 'pending') {`  
Async API helper `fetchAdminApplications` — awaits a backend HTTP call and returns data.

**L168:** `  const { data } = await api.get<AdminApplication[]>('/admin/applications', {`  
Constant/variable `?` — holds a value or React binding.

**L169:** `    params: { status },`  
Executable statement: `params: { status },`

**L170:** `  })`  
Closes the previous block/object/function.

**L171:** `  return data`  
Returns a value to the caller: `data`

**L172:** `}`  
Closes the previous block/object/function.

**L173:** ``  
Blank line — visual spacing.

**L174:** `/** POST /api/admin/applications/{id}/decision — approve creates Loan for user */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L175:** `export async function adminDecideApplication(`  
Async API helper `adminDecideApplication` — awaits a backend HTTP call and returns data.

**L176:** `  id: string,`  
Executable statement: `id: string,`

**L177:** `  decision: 'approve' | 'decline',`  
Executable statement: `decision: 'approve' | 'decline',`

**L178:** `  note?: string,`  
Executable statement: `note?: string,`

**L179:** `) {`  
Executable statement: `) {`

**L180:** `  const { data } = await api.post<AdminApplication>('/admin/applications/${id}/decision', {`  
Constant/variable `?` — holds a value or React binding.

**L181:** `    decision,`  
Executable statement: `decision,`

**L182:** `    note,`  
Executable statement: `note,`

**L183:** `  })`  
Closes the previous block/object/function.

**L184:** `  return data`  
Returns a value to the caller: `data`

**L185:** `}`  
Closes the previous block/object/function.

**L186:** ``  
Blank line — visual spacing.

**L187:** `/** GET /api/admin/loans */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L188:** `export async function fetchAdminLoans() {`  
Async API helper `fetchAdminLoans` — awaits a backend HTTP call and returns data.

**L189:** `  const { data } = await api.get<Loan[]>('/admin/loans')`  
Constant/variable `?` — holds a value or React binding.

**L190:** `  return data`  
Returns a value to the caller: `data`

**L191:** `}`  
Closes the previous block/object/function.

**L192:** ``  
Blank line — visual spacing.

**L193:** `/** GET /api/admin/transfers */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L194:** `export async function fetchAdminTransfers() {`  
Async API helper `fetchAdminTransfers` — awaits a backend HTTP call and returns data.

**L195:** `  const { data } = await api.get<AdminTransfer[]>('/admin/transfers')`  
Constant/variable `?` — holds a value or React binding.

**L196:** `  return data`  
Returns a value to the caller: `data`

**L197:** `}`  
Closes the previous block/object/function.

**L198:** ``  
Blank line — visual spacing.

**L199:** `/** GET /api/admin/debt-reviews */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L200:** `export async function fetchAdminDebtReviews() {`  
Async API helper `fetchAdminDebtReviews` — awaits a backend HTTP call and returns data.

**L201:** `  const { data } = await api.get<AdminDebtReview[]>('/admin/debt-reviews')`  
Constant/variable `?` — holds a value or React binding.

**L202:** `  return data`  
Returns a value to the caller: `data`

**L203:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/lib/apiTypes.ts`

_105 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * TypeScript shapes for API JSON (keep in sync with backend entities/DTOs).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - UserProfile.role <- User.role / AuthenticationResponse`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Loan / Payment <- LoanController responses`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - AdminOverview / AdminApplication <- AdminController DTOs`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `export type ProductType = 'cash' | 'domestic'`  
TypeScript type — describes the shape of data (compile-time only).

**L11:** ``  
Blank line — visual spacing.

**L12:** `export type DocumentKind =`  
TypeScript type — describes the shape of data (compile-time only).

**L13:** `  | 'id'`  
Executable statement: `| 'id'`

**L14:** `  | 'payslip'`  
Executable statement: `| 'payslip'`

**L15:** `  | 'bank1'`  
Executable statement: `| 'bank1'`

**L16:** `  | 'bank2'`  
Executable statement: `| 'bank2'`

**L17:** `  | 'bank3'`  
Executable statement: `| 'bank3'`

**L18:** `  | 'address'`  
Executable statement: `| 'address'`

**L19:** `  | 'employment'`  
Executable statement: `| 'employment'`

**L20:** ``  
Blank line — visual spacing.

**L21:** `export type LoanStatus = 'active' | 'approved' | 'pending' | 'overdue' | 'paid'`  
TypeScript type — describes the shape of data (compile-time only).

**L22:** ``  
Blank line — visual spacing.

**L23:** `export type Loan = {`  
TypeScript type — describes the shape of data (compile-time only).

**L24:** `  id: string`  
Executable statement: `id: string`

**L25:** `  product: string`  
Executable statement: `product: string`

**L26:** `  status: LoanStatus`  
Executable statement: `status: LoanStatus`

**L27:** `  principal: number`  
Executable statement: `principal: number`

**L28:** `  remaining: number`  
Executable statement: `remaining: number`

**L29:** `  nextPaymentDate: string`  
Executable statement: `nextPaymentDate: string`

**L30:** `  nextPaymentAmount: number`  
Executable statement: `nextPaymentAmount: number`

**L31:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L32:** `  monthlyInstalment: number`  
Executable statement: `monthlyInstalment: number`

**L33:** `  schedule: Array<{`  
Executable statement: `schedule: Array<{`

**L34:** `    dueDate: string`  
Executable statement: `dueDate: string`

**L35:** `    amount: number`  
Executable statement: `amount: number`

**L36:** `    status: 'paid' | 'upcoming' | 'overdue'`  
Executable statement: `status: 'paid' | 'upcoming' | 'overdue'`

**L37:** `  }>`  
JSX markup — describes HTML structure React will render.

**L38:** `}`  
Closes the previous block/object/function.

**L39:** ``  
Blank line — visual spacing.

**L40:** `export type Payment = {`  
TypeScript type — describes the shape of data (compile-time only).

**L41:** `  id: string`  
Executable statement: `id: string`

**L42:** `  date: string`  
Executable statement: `date: string`

**L43:** `  amount: number`  
Executable statement: `amount: number`

**L44:** `  method: string`  
Executable statement: `method: string`

**L45:** `  status: string`  
Executable statement: `status: string`

**L46:** `}`  
Closes the previous block/object/function.

**L47:** ``  
Blank line — visual spacing.

**L48:** `export type UserRole = 'USER' | 'ADMIN'`  
TypeScript type — describes the shape of data (compile-time only).

**L49:** ``  
Blank line — visual spacing.

**L50:** `export type UserProfile = {`  
TypeScript type — describes the shape of data (compile-time only).

**L51:** `  id: string`  
Executable statement: `id: string`

**L52:** `  firstName: string`  
Executable statement: `firstName: string`

**L53:** `  lastName: string`  
Executable statement: `lastName: string`

**L54:** `  email: string`  
Executable statement: `email: string`

**L55:** `  phone: string`  
Executable statement: `phone: string`

**L56:** `  idNumberMasked?: string`  
Executable statement: `idNumberMasked?: string`

**L57:** `  role?: UserRole`  
Executable statement: `role?: UserRole`

**L58:** `}`  
Closes the previous block/object/function.

**L59:** ``  
Blank line — visual spacing.

**L60:** `export type AuthResponse = {`  
TypeScript type — describes the shape of data (compile-time only).

**L61:** `  accessToken: string`  
Executable statement: `accessToken: string`

**L62:** `  user: UserProfile`  
Executable statement: `user: UserProfile`

**L63:** `}`  
Closes the previous block/object/function.

**L64:** ``  
Blank line — visual spacing.

**L65:** `export type AdminOverview = {`  
TypeScript type — describes the shape of data (compile-time only).

**L66:** `  pendingApplications: number`  
Executable statement: `pendingApplications: number`

**L67:** `  approvedApplications: number`  
Executable statement: `approvedApplications: number`

**L68:** `  declinedApplications: number`  
Executable statement: `declinedApplications: number`

**L69:** `  activeLoans: number`  
Executable statement: `activeLoans: number`

**L70:** `  pendingTransfers: number`  
Executable statement: `pendingTransfers: number`

**L71:** `  debtReviewRequests: number`  
Executable statement: `debtReviewRequests: number`

**L72:** `}`  
Closes the previous block/object/function.

**L73:** ``  
Blank line — visual spacing.

**L74:** `export type AdminApplication = {`  
TypeScript type — describes the shape of data (compile-time only).

**L75:** `  id: string`  
Executable statement: `id: string`

**L76:** `  product: string`  
Executable statement: `product: string`

**L77:** `  amount: number`  
Executable statement: `amount: number`

**L78:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L79:** `  status: string`  
Executable statement: `status: string`

**L80:** `  reference?: string`  
Executable statement: `reference?: string`

**L81:** `  decisionNote?: string`  
Executable statement: `decisionNote?: string`

**L82:** `  firstName?: string`  
Executable statement: `firstName?: string`

**L83:** `  lastName?: string`  
Executable statement: `lastName?: string`

**L84:** `  createdAt?: string`  
Executable statement: `createdAt?: string`

**L85:** `}`  
Closes the previous block/object/function.

**L86:** ``  
Blank line — visual spacing.

**L87:** `export type AdminTransfer = {`  
TypeScript type — describes the shape of data (compile-time only).

**L88:** `  id: string`  
Executable statement: `id: string`

**L89:** `  senderName: string`  
Executable statement: `senderName: string`

**L90:** `  recipientName: string`  
Executable statement: `recipientName: string`

**L91:** `  country: string`  
Executable statement: `country: string`

**L92:** `  total: number`  
Executable statement: `total: number`

**L93:** `  status: string`  
Executable statement: `status: string`

**L94:** `  createdAt?: string`  
Executable statement: `createdAt?: string`

**L95:** `}`  
Closes the previous block/object/function.

**L96:** ``  
Blank line — visual spacing.

**L97:** `export type AdminDebtReview = {`  
TypeScript type — describes the shape of data (compile-time only).

**L98:** `  id: string`  
Executable statement: `id: string`

**L99:** `  fullName: string`  
Executable statement: `fullName: string`

**L100:** `  phone: string`  
Executable statement: `phone: string`

**L101:** `  email: string`  
Executable statement: `email: string`

**L102:** `  situation: string`  
Executable statement: `situation: string`

**L103:** `  status: string`  
Executable statement: `status: string`

**L104:** `  createdAt?: string`  
Executable statement: `createdAt?: string`

**L105:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/lib/format.ts`

_34 lines_

**L1:** `import { clsx, type ClassValue } from 'clsx'`  
Import — brings in `clsx` so this file can use it.

**L2:** `import { twMerge } from 'tailwind-merge'`  
Import — brings in `tailwind-merge` so this file can use it.

**L3:** ``  
Blank line — visual spacing.

**L4:** `export function cn(...parts: ClassValue[]) {`  
Defines function `cn` — callable unit of UI/logic.

**L5:** `  return twMerge(clsx(parts))`  
Returns a value to the caller: `twMerge(clsx(parts))`

**L6:** `}`  
Closes the previous block/object/function.

**L7:** ``  
Blank line — visual spacing.

**L8:** `export function formatRand(amount: number, decimals = 2): string {`  
Defines function `formatRand` — callable unit of UI/logic.

**L9:** `  return new Intl.NumberFormat('en-ZA', {`  
Returns a value to the caller: `new Intl.NumberFormat('en-ZA', {`

**L10:** `    style: 'currency',`  
Executable statement: `style: 'currency',`

**L11:** `    currency: 'ZAR',`  
Executable statement: `currency: 'ZAR',`

**L12:** `    minimumFractionDigits: decimals,`  
Executable statement: `minimumFractionDigits: decimals,`

**L13:** `    maximumFractionDigits: decimals,`  
Executable statement: `maximumFractionDigits: decimals,`

**L14:** `  }).format(amount)`  
Closes the previous block/object/function.

**L15:** `}`  
Closes the previous block/object/function.

**L16:** ``  
Blank line — visual spacing.

**L17:** `export function formatRandCompact(amount: number): string {`  
Defines function `formatRandCompact` — callable unit of UI/logic.

**L18:** `  return new Intl.NumberFormat('en-ZA', {`  
Returns a value to the caller: `new Intl.NumberFormat('en-ZA', {`

**L19:** `    style: 'currency',`  
Executable statement: `style: 'currency',`

**L20:** `    currency: 'ZAR',`  
Executable statement: `currency: 'ZAR',`

**L21:** `    minimumFractionDigits: 0,`  
Executable statement: `minimumFractionDigits: 0,`

**L22:** `    maximumFractionDigits: 0,`  
Executable statement: `maximumFractionDigits: 0,`

**L23:** `  }).format(amount)`  
Closes the previous block/object/function.

**L24:** `}`  
Closes the previous block/object/function.

**L25:** ``  
Blank line — visual spacing.

**L26:** `export function formatDate(iso: string): string {`  
Defines function `formatDate` — callable unit of UI/logic.

**L27:** `  const [year, month, day] = iso.split('-').map(Number)`  
Constant/variable `?` — holds a value or React binding.

**L28:** `  if (!year || !month || !day) return iso`  
Conditional — runs the following block only when the condition is true.

**L29:** `  return new Intl.DateTimeFormat('en-ZA', {`  
Returns a value to the caller: `new Intl.DateTimeFormat('en-ZA', {`

**L30:** `    day: 'numeric',`  
Executable statement: `day: 'numeric',`

**L31:** `    month: 'short',`  
Executable statement: `month: 'short',`

**L32:** `    year: 'numeric',`  
Executable statement: `year: 'numeric',`

**L33:** `  }).format(new Date(year, month - 1, day))`  
Closes the previous block/object/function.

**L34:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/lib/loanCalc.ts`

_72 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Client-side loan quote calculator (marketing / apply terms UI).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Used by RepaymentLedger and TermsStep for live estimates.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Backend ApplicationService.calculateTotalRepayable should stay aligned`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` *   (rate: INTEREST_RATE_MONTHLY here <-> app.interest-rate in application.yml).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `export const LOAN_MIN = 500`  
Constant/variable `LOAN_MIN` — holds a value or React binding.

**L11:** `export const LOAN_MAX = 20_000`  
Constant/variable `LOAN_MAX` — holds a value or React binding.

**L12:** `export const LOAN_TERM_MIN = 1`  
Constant/variable `LOAN_TERM_MIN` — holds a value or React binding.

**L13:** `export const LOAN_TERM_MAX = 9`  
Constant/variable `LOAN_TERM_MAX` — holds a value or React binding.

**L14:** `export const INTEREST_RATE_MONTHLY = 0.035`  
Constant/variable `INTEREST_RATE_MONTHLY` — holds a value or React binding.

**L15:** ``  
Blank line — visual spacing.

**L16:** `export type LoanQuote = {`  
TypeScript type — describes the shape of data (compile-time only).

**L17:** `  amount: number`  
Executable statement: `amount: number`

**L18:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L19:** `  monthlyInstalment: number`  
Executable statement: `monthlyInstalment: number`

**L20:** `  totalRepayable: number`  
Executable statement: `totalRepayable: number`

**L21:** `  interestCost: number`  
Executable statement: `interestCost: number`

**L22:** `  interestRateLabel: string`  
Executable statement: `interestRateLabel: string`

**L23:** `}`  
Closes the previous block/object/function.

**L24:** ``  
Blank line — visual spacing.

**L25:** `export function calculateLoanQuote(amount: number, termMonths: number): LoanQuote {`  
Defines function `calculateLoanQuote` — callable unit of UI/logic.

**L26:** `  const principal = Math.min(LOAN_MAX, Math.max(LOAN_MIN, amount))`  
Constant/variable `principal` — holds a value or React binding.

**L27:** `  const term = Math.min(LOAN_TERM_MAX, Math.max(LOAN_TERM_MIN, Math.round(termMonths)))`  
Constant/variable `term` — holds a value or React binding.

**L28:** ``  
Blank line — visual spacing.

**L29:** `  if (term === 1) {`  
Conditional — runs the following block only when the condition is true.

**L30:** `    const interestCost = Math.round(principal * INTEREST_RATE_MONTHLY * 100) / 100`  
Constant/variable `interestCost` — holds a value or React binding.

**L31:** `    const totalRepayable = principal + interestCost`  
Constant/variable `totalRepayable` — holds a value or React binding.

**L32:** `    return {`  
Returns a value to the caller: `{`

**L33:** `      amount: principal,`  
Executable statement: `amount: principal,`

**L34:** `      termMonths: term,`  
Executable statement: `termMonths: term,`

**L35:** `      monthlyInstalment: totalRepayable,`  
Executable statement: `monthlyInstalment: totalRepayable,`

**L36:** `      totalRepayable,`  
Executable statement: `totalRepayable,`

**L37:** `      interestCost,`  
Executable statement: `interestCost,`

**L38:** `      interestRateLabel: '${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.',`  
Executable statement: `interestRateLabel: `${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.`…`

**L39:** `    }`  
Closes the previous block/object/function.

**L40:** `  }`  
Closes the previous block/object/function.

**L41:** ``  
Blank line — visual spacing.

**L42:** `  const r = INTEREST_RATE_MONTHLY`  
Constant/variable `r` — holds a value or React binding.

**L43:** `  const factor = Math.pow(1 + r, term)`  
Constant/variable `factor` — holds a value or React binding.

**L44:** `  const monthlyInstalment = Math.round(((principal * r * factor) / (factor - 1)) * 100) / 100`  
Constant/variable `monthlyInstalment` — holds a value or React binding.

**L45:** `  const totalRepayable = Math.round(monthlyInstalment * term * 100) / 100`  
Constant/variable `totalRepayable` — holds a value or React binding.

**L46:** `  const interestCost = Math.round((totalRepayable - principal) * 100) / 100`  
Constant/variable `interestCost` — holds a value or React binding.

**L47:** ``  
Blank line — visual spacing.

**L48:** `  return {`  
Returns a value to the caller: `{`

**L49:** `    amount: principal,`  
Executable statement: `amount: principal,`

**L50:** `    termMonths: term,`  
Executable statement: `termMonths: term,`

**L51:** `    monthlyInstalment,`  
Executable statement: `monthlyInstalment,`

**L52:** `    totalRepayable,`  
Executable statement: `totalRepayable,`

**L53:** `    interestCost,`  
Executable statement: `interestCost,`

**L54:** `    interestRateLabel: '${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.',`  
Executable statement: `interestRateLabel: `${(INTEREST_RATE_MONTHLY * 100).toFixed(1)}% p.m.`…`

**L55:** `  }`  
Closes the previous block/object/function.

**L56:** `}`  
Closes the previous block/object/function.

**L57:** ``  
Blank line — visual spacing.

**L58:** `export function calculateTransferFee(amount: number, countryCode: string): {`  
Defines function `calculateTransferFee` — callable unit of UI/logic.

**L59:** `  amount: number`  
Executable statement: `amount: number`

**L60:** `  fee: number`  
Executable statement: `fee: number`

**L61:** `  total: number`  
Executable statement: `total: number`

**L62:** `  receiveEstimate: number`  
Executable statement: `receiveEstimate: number`

**L63:** `} {`  
Closes the previous block/object/function.

**L64:** `  const feeRate = countryCode === 'ZW' ? 0.045 : countryCode === 'MZ' ? 0.04 : 0.035`  
Constant/variable `feeRate` — holds a value or React binding.

**L65:** `  const fee = Math.max(49, Math.round(amount * feeRate * 100) / 100)`  
Constant/variable `fee` — holds a value or React binding.

**L66:** `  return {`  
Returns a value to the caller: `{`

**L67:** `    amount,`  
Executable statement: `amount,`

**L68:** `    fee,`  
Executable statement: `fee,`

**L69:** `    total: amount + fee,`  
Executable statement: `total: amount + fee,`

**L70:** `    receiveEstimate: amount,`  
Executable statement: `receiveEstimate: amount,`

**L71:** `  }`  
Closes the previous block/object/function.

**L72:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/lib/validation.ts`

_102 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Zod schemas for frontend forms (details, terms, transfer, debt review).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - DetailsStep / DomesticDetails use detailsSchema before createApplication.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - TransferPage / DebtReviewPage validate before calling public APIs.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { z } from 'zod'`  
Import — brings in `zod` so this file can use it.

**L10:** `import { LOAN_MAX, LOAN_MIN } from '@/lib/loanCalc'`  
Import — brings in `@/lib/loanCalc` so this file can use it.

**L11:** ``  
Blank line — visual spacing.

**L12:** `const saIdRegex = /^\d{13}$/`  
Constant/variable `saIdRegex` — holds a value or React binding.

**L13:** ``  
Blank line — visual spacing.

**L14:** `function isAdult(isoDate: string) {`  
Defines function `isAdult` — callable unit of UI/logic.

**L15:** `  const born = new Date(isoDate)`  
Constant/variable `born` — holds a value or React binding.

**L16:** `  if (Number.isNaN(born.getTime())) return false`  
Conditional — runs the following block only when the condition is true.

**L17:** `  const cutoff = new Date()`  
Constant/variable `cutoff` — holds a value or React binding.

**L18:** `  cutoff.setFullYear(cutoff.getFullYear() - 18)`  
Executable statement: `cutoff.setFullYear(cutoff.getFullYear() - 18)`

**L19:** `  return born <= cutoff`  
Returns a value to the caller: `born <= cutoff`

**L20:** `}`  
Closes the previous block/object/function.

**L21:** ``  
Blank line — visual spacing.

**L22:** `export const detailsSchema = z.object({`  
Constant/variable `detailsSchema` — holds a value or React binding.

**L23:** `  firstName: z.string().min(2, 'Enter your first name'),`  
Executable statement: `firstName: z.string().min(2, 'Enter your first name'),`

**L24:** `  lastName: z.string().min(2, 'Enter your surname'),`  
Executable statement: `lastName: z.string().min(2, 'Enter your surname'),`

**L25:** `  nickname: z.string().optional(),`  
Executable statement: `nickname: z.string().optional(),`

**L26:** `  idNumber: z.string().regex(saIdRegex, 'Enter a valid 13-digit SA ID number'),`  
Executable statement: `idNumber: z.string().regex(saIdRegex, 'Enter a valid 13-digit SA ID nu…`

**L27:** `  dateOfBirth: z`  
Executable statement: `dateOfBirth: z`

**L28:** `    .string()`  
Executable statement: `.string()`

**L29:** `    .min(1, 'Enter your date of birth')`  
Executable statement: `.min(1, 'Enter your date of birth')`

**L30:** `    .refine(isAdult, 'You must be 18 or older'),`  
Executable statement: `.refine(isAdult, 'You must be 18 or older'),`

**L31:** `  gender: z.enum(['female', 'male', 'other'], {`  
Executable statement: `gender: z.enum(['female', 'male', 'other'], {`

**L32:** `    required_error: 'Select gender',`  
Executable statement: `required_error: 'Select gender',`

**L33:** `  }),`  
Closes the previous block/object/function.

**L34:** `  nationality: z.string().min(2, 'Enter nationality'),`  
Executable statement: `nationality: z.string().min(2, 'Enter nationality'),`

**L35:** `  country: z.string().min(2, 'Enter country'),`  
Executable statement: `country: z.string().min(2, 'Enter country'),`

**L36:** `  placeOfBirth: z.string().min(2, 'Enter place of birth'),`  
Executable statement: `placeOfBirth: z.string().min(2, 'Enter place of birth'),`

**L37:** `  phone: z`  
Executable statement: `phone: z`

**L38:** `    .string()`  
Executable statement: `.string()`

**L39:** `    .regex(/^0\d{9}$/, 'Enter a valid SA mobile number (e.g. 0821234567)'),`  
Executable statement: `.regex(/^0\d{9}$/, 'Enter a valid SA mobile number (e.g. 0821234567)')…`

**L40:** `  email: z.string().email('Enter a valid email address'),`  
Executable statement: `email: z.string().email('Enter a valid email address'),`

**L41:** `  preferredContactTime: z.string().optional(),`  
Executable statement: `preferredContactTime: z.string().optional(),`

**L42:** `  presentAddress: z.string().min(8, 'Enter your present address'),`  
Executable statement: `presentAddress: z.string().min(8, 'Enter your present address'),`

**L43:** `  city: z.string().min(2, 'Enter your city'),`  
Executable statement: `city: z.string().min(2, 'Enter your city'),`

**L44:** `  province: z.string().min(2, 'Enter your province'),`  
Executable statement: `province: z.string().min(2, 'Enter your province'),`

**L45:** `  postCode: z.string().min(4, 'Enter a postal code'),`  
Executable statement: `postCode: z.string().min(4, 'Enter a postal code'),`

**L46:** `  occupation: z.string().min(2, 'Enter your occupation'),`  
Executable statement: `occupation: z.string().min(2, 'Enter your occupation'),`

**L47:** `  employmentStatus: z.enum(`  
Executable statement: `employmentStatus: z.enum(`

**L48:** `    ['employed', 'self-employed', 'domestic', 'student', 'other'],`  
Executable statement: `['employed', 'self-employed', 'domestic', 'student', 'other'],`

**L49:** `    { required_error: 'Select your employment status' },`  
Executable statement: `{ required_error: 'Select your employment status' },`

**L50:** `  ),`  
Executable statement: `),`

**L51:** `  monthlyIncome: z`  
Executable statement: `monthlyIncome: z`

**L52:** `    .string()`  
Executable statement: `.string()`

**L53:** `    .min(1, 'Enter your monthly income')`  
Executable statement: `.min(1, 'Enter your monthly income')`

**L54:** `    .refine((v) => Number(v.replace(/\s/g, '')) >= 500, {`  
Assignment / binding: `.refine((v) => Number(v.replace(/\s/g, '')) >= 500, {`

**L55:** `      message: 'Income must be at least R500',`  
Executable statement: `message: 'Income must be at least R500',`

**L56:** `    }),`  
Closes the previous block/object/function.

**L57:** `  maritalStatus: z.string().optional(),`  
Executable statement: `maritalStatus: z.string().optional(),`

**L58:** `  witness1: z.string().optional(),`  
Executable statement: `witness1: z.string().optional(),`

**L59:** `  witness2: z.string().optional(),`  
Executable statement: `witness2: z.string().optional(),`

**L60:** `})`  
Closes the previous block/object/function.

**L61:** ``  
Blank line — visual spacing.

**L62:** `export const domesticDetailsSchema = detailsSchema.omit({`  
Constant/variable `domesticDetailsSchema` — holds a value or React binding.

**L63:** `  employmentStatus: true,`  
Executable statement: `employmentStatus: true,`

**L64:** `  monthlyIncome: true,`  
Executable statement: `monthlyIncome: true,`

**L65:** `}).extend({`  
Closes the previous block/object/function.

**L66:** `  employerName: z.string().min(2, 'Enter your employer’s name'),`  
Executable statement: `employerName: z.string().min(2, 'Enter your employer’s name'),`

**L67:** `  weeklyWage: z`  
Executable statement: `weeklyWage: z`

**L68:** `    .string()`  
Executable statement: `.string()`

**L69:** `    .min(1, 'Enter your weekly wage')`  
Executable statement: `.min(1, 'Enter your weekly wage')`

**L70:** `    .refine((v) => Number(v.replace(/\s/g, '')) >= 300, {`  
Assignment / binding: `.refine((v) => Number(v.replace(/\s/g, '')) >= 300, {`

**L71:** `      message: 'Wage must be at least R300',`  
Executable statement: `message: 'Wage must be at least R300',`

**L72:** `    }),`  
Closes the previous block/object/function.

**L73:** `})`  
Closes the previous block/object/function.

**L74:** ``  
Blank line — visual spacing.

**L75:** `export const termsSchema = z.object({`  
Constant/variable `termsSchema` — holds a value or React binding.

**L76:** `  amount: z.number().min(LOAN_MIN).max(LOAN_MAX),`  
Executable statement: `amount: z.number().min(LOAN_MIN).max(LOAN_MAX),`

**L77:** `  termMonths: z.literal(1),`  
Executable statement: `termMonths: z.literal(1),`

**L78:** `})`  
Closes the previous block/object/function.

**L79:** ``  
Blank line — visual spacing.

**L80:** `export const debtReviewSchema = z.object({`  
Constant/variable `debtReviewSchema` — holds a value or React binding.

**L81:** `  fullName: z.string().min(2, 'Enter your full name'),`  
Executable statement: `fullName: z.string().min(2, 'Enter your full name'),`

**L82:** `  phone: z`  
Executable statement: `phone: z`

**L83:** `    .string()`  
Executable statement: `.string()`

**L84:** `    .regex(/^0\d{9}$/, 'Enter a valid SA mobile number'),`  
Executable statement: `.regex(/^0\d{9}$/, 'Enter a valid SA mobile number'),`

**L85:** `  email: z.string().email('Enter a valid email'),`  
Executable statement: `email: z.string().email('Enter a valid email'),`

**L86:** `  situation: z.string().min(20, 'Tell us a little more (at least 20 characters)'),`  
Executable statement: `situation: z.string().min(20, 'Tell us a little more (at least 20 char…`

**L87:** `})`  
Closes the previous block/object/function.

**L88:** ``  
Blank line — visual spacing.

**L89:** `export const transferSchema = z.object({`  
Constant/variable `transferSchema` — holds a value or React binding.

**L90:** `  senderName: z.string().min(2),`  
Executable statement: `senderName: z.string().min(2),`

**L91:** `  senderPhone: z.string().regex(/^0\d{9}$/),`  
Executable statement: `senderPhone: z.string().regex(/^0\d{9}$/),`

**L92:** `  recipientName: z.string().min(2),`  
Executable statement: `recipientName: z.string().min(2),`

**L93:** `  recipientPhone: z.string().min(8),`  
Executable statement: `recipientPhone: z.string().min(8),`

**L94:** `  country: z.enum(['ZW', 'MZ', 'LS', 'BW']),`  
Executable statement: `country: z.enum(['ZW', 'MZ', 'LS', 'BW']),`

**L95:** `  amount: z.number().min(100).max(50_000),`  
Executable statement: `amount: z.number().min(100).max(50_000),`

**L96:** `})`  
Closes the previous block/object/function.

**L97:** ``  
Blank line — visual spacing.

**L98:** `export type DetailsForm = z.infer<typeof detailsSchema>`  
TypeScript type — describes the shape of data (compile-time only).

**L99:** `export type DomesticDetailsForm = z.infer<typeof domesticDetailsSchema>`  
TypeScript type — describes the shape of data (compile-time only).

**L100:** `export type TermsForm = z.infer<typeof termsSchema>`  
TypeScript type — describes the shape of data (compile-time only).

**L101:** `export type DebtReviewForm = z.infer<typeof debtReviewSchema>`  
TypeScript type — describes the shape of data (compile-time only).

**L102:** `export type TransferForm = z.infer<typeof transferSchema>`  
TypeScript type — describes the shape of data (compile-time only).

---

## `frontend/src/main.tsx`

_21 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Browser entry: hydrate JWT from sessionStorage, then mount App.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - hydrateAuth() -> lib/api.ts setAccessToken so axios sends Bearer token.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - App.tsx owns all React Router routes.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { StrictMode } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { createRoot } from 'react-dom/client'`  
Import — brings in `react-dom/client` so this file can use it.

**L11:** `import './index.css'`  
Import — brings in `./index.css` so this file can use it.

**L12:** `import App from './App'`  
Import — brings in `./App` so this file can use it.

**L13:** `import { hydrateAuth } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L14:** ``  
Blank line — visual spacing.

**L15:** `hydrateAuth()`  
Executable statement: `hydrateAuth()`

**L16:** ``  
Blank line — visual spacing.

**L17:** `createRoot(document.getElementById('root')!).render(`  
Executable statement: `createRoot(document.getElementById('root')!).render(`

**L18:** `  <StrictMode>`  
JSX markup — describes HTML structure React will render.

**L19:** `    <App />`  
JSX markup — describes HTML structure React will render.

**L20:** `  </StrictMode>,`  
JSX markup — describes HTML structure React will render.

**L21:** `)`  
Executable statement: `)`

---

## `frontend/src/pages/admin/AdminPanel.tsx`

_237 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Admin operations UI: pending applications, loans, transfers, debt reviews.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Data: apiClient fetchAdmin* -> AdminController /api/admin/*`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Approve/Decline -> adminDecideApplication -> ApplicationService.decide`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` *   (approve creates Loan visible on user Dashboard).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` * - Route protected by RequireAdmin; nav link shown in PublicLayout when role=ADMIN.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L10:** ``  
Blank line — visual spacing.

**L11:** `import { useMemo, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L12:** `import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'`  
Import — brings in `@tanstack/react-query` so this file can use it.

**L13:** `import {`  
Import — brings in `dependency` so this file can use it.

**L14:** `  adminDecideApplication,`  
Executable statement: `adminDecideApplication,`

**L15:** `  fetchAdminApplications,`  
Executable statement: `fetchAdminApplications,`

**L16:** `  fetchAdminDebtReviews,`  
Executable statement: `fetchAdminDebtReviews,`

**L17:** `  fetchAdminLoans,`  
Executable statement: `fetchAdminLoans,`

**L18:** `  fetchAdminOverview,`  
Executable statement: `fetchAdminOverview,`

**L19:** `  fetchAdminTransfers,`  
Executable statement: `fetchAdminTransfers,`

**L20:** `} from '@/lib/apiClient'`  
Closes the previous block/object/function.

**L21:** `import { cn, formatDate, formatRand } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L22:** `import {`  
Import — brings in `dependency` so this file can use it.

**L23:** `  BrandMark,`  
Executable statement: `BrandMark,`

**L24:** `  Button,`  
Executable statement: `Button,`

**L25:** `  IslandShell,`  
Executable statement: `IslandShell,`

**L26:** `  PageIntro,`  
Executable statement: `PageIntro,`

**L27:** `  Panel,`  
Executable statement: `Panel,`

**L28:** `  SoftChip,`  
Executable statement: `SoftChip,`

**L29:** `  StatusPill,`  
Executable statement: `StatusPill,`

**L30:** `} from '@/components/ui/primitives'`  
Closes the previous block/object/function.

**L31:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L32:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L33:** ``  
Blank line — visual spacing.

**L34:** `type QueueTab = 'applications' | 'loans' | 'transfers' | 'debt'`  
TypeScript type — describes the shape of data (compile-time only).

**L35:** ``  
Blank line — visual spacing.

**L36:** `export function AdminPanelPage() {`  
Defines function `AdminPanelPage` — callable unit of UI/logic.

**L37:** `  const [tab, setTab] = useState<QueueTab>('applications')`  
Constant/variable `?` — holds a value or React binding.

**L38:** `  const [note, setNote] = useState<Record<string, string>>({})`  
Constant/variable `?` — holds a value or React binding.

**L39:** `  const qc = useQueryClient()`  
Constant/variable `qc` — holds a value or React binding.

**L40:** ``  
Blank line — visual spacing.

**L41:** `  const { data: overview } = useQuery({ queryKey: ['admin-overview'], queryFn: fetchAdminOverview })`  
Constant/variable `?` — holds a value or React binding.

**L42:** `  const { data: applications } = useQuery({`  
Constant/variable `?` — holds a value or React binding.

**L43:** `    queryKey: ['admin-applications'],`  
Executable statement: `queryKey: ['admin-applications'],`

**L44:** `    queryFn: () => fetchAdminApplications('pending'),`  
Assignment / binding: `queryFn: () => fetchAdminApplications('pending'),`

**L45:** `  })`  
Closes the previous block/object/function.

**L46:** `  const { data: loans } = useQuery({ queryKey: ['admin-loans'], queryFn: fetchAdminLoans })`  
Constant/variable `?` — holds a value or React binding.

**L47:** `  const { data: transfers } = useQuery({ queryKey: ['admin-transfers'], queryFn: fetchAdminTransf...`  
Constant/variable `?` — holds a value or React binding.

**L48:** `  const { data: debtReviews } = useQuery({ queryKey: ['admin-debt'], queryFn: fetchAdminDebtRevie...`  
Constant/variable `?` — holds a value or React binding.

**L49:** ``  
Blank line — visual spacing.

**L50:** `  const decision = useMutation({`  
Constant/variable `decision` — holds a value or React binding.

**L51:** `    mutationFn: ({ id, value, note }: { id: string; value: 'approve' | 'decline'; note?: string }...`  
JSX markup — describes HTML structure React will render.

**L52:** `      adminDecideApplication(id, value, note),`  
Executable statement: `adminDecideApplication(id, value, note),`

**L53:** `    onSuccess: () => {`  
Assignment / binding: `onSuccess: () => {`

**L54:** `      void qc.invalidateQueries({ queryKey: ['admin-overview'] })`  
Executable statement: `void qc.invalidateQueries({ queryKey: ['admin-overview'] })`

**L55:** `      void qc.invalidateQueries({ queryKey: ['admin-applications'] })`  
Executable statement: `void qc.invalidateQueries({ queryKey: ['admin-applications'] })`

**L56:** `      void qc.invalidateQueries({ queryKey: ['admin-loans'] })`  
Executable statement: `void qc.invalidateQueries({ queryKey: ['admin-loans'] })`

**L57:** `    },`  
Closes the previous block/object/function.

**L58:** `  })`  
Closes the previous block/object/function.

**L59:** ``  
Blank line — visual spacing.

**L60:** `  const cards = useMemo(`  
Constant/variable `cards` — holds a value or React binding.

**L61:** `    () => [`  
Assignment / binding: `() => [`

**L62:** `      ['Pending applications', overview?.pendingApplications ?? 0],`  
Executable statement: `['Pending applications', overview?.pendingApplications ?? 0],`

**L63:** `      ['Approved today set', overview?.approvedApplications ?? 0],`  
Executable statement: `['Approved today set', overview?.approvedApplications ?? 0],`

**L64:** `      ['Declined', overview?.declinedApplications ?? 0],`  
Executable statement: `['Declined', overview?.declinedApplications ?? 0],`

**L65:** `      ['Active loans', overview?.activeLoans ?? 0],`  
Executable statement: `['Active loans', overview?.activeLoans ?? 0],`

**L66:** `      ['Pending transfers', overview?.pendingTransfers ?? 0],`  
Executable statement: `['Pending transfers', overview?.pendingTransfers ?? 0],`

**L67:** `      ['Debt-review requests', overview?.debtReviewRequests ?? 0],`  
Executable statement: `['Debt-review requests', overview?.debtReviewRequests ?? 0],`

**L68:** `    ],`  
Executable statement: `],`

**L69:** `    [overview],`  
Executable statement: `[overview],`

**L70:** `  )`  
Executable statement: `)`

**L71:** ``  
Blank line — visual spacing.

**L72:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L73:** `    <div className="min-h-screen bg-surface">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L74:** `      <IslandShell>`  
JSX markup — describes HTML structure React will render.

**L75:** `        <div className="flex items-center justify-between px-4 py-3 sm:px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L76:** `          <div className="flex items-baseline gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L77:** `            <BrandMark />`  
JSX markup — describes HTML structure React will render.

**L78:** `            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-mut...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L79:** `              Admin`  
Executable statement: `Admin`

**L80:** `            </span>`  
JSX markup — describes HTML structure React will render.

**L81:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L82:** `          <Link to="/" className="text-[0.875rem] text-ink-muted hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L83:** `            Back to site`  
Executable statement: `Back to site`

**L84:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L85:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L86:** `      </IslandShell>`  
JSX markup — describes HTML structure React will render.

**L87:** ``  
Blank line — visual spacing.

**L88:** `      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L89:** `        <Reveal>`  
JSX markup — describes HTML structure React will render.

**L90:** `          <PageIntro kicker="Operations" title="Queue">`  
JSX markup — describes HTML structure React will render.

**L91:** `            Decide loan applications, watch transfers, and follow debt-review requests.`  
Executable statement: `Decide loan applications, watch transfers, and follow debt-review requ…`

**L92:** `          </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L93:** `        </Reveal>`  
JSX markup — describes HTML structure React will render.

**L94:** ``  
Blank line — visual spacing.

**L95:** `        <Panel className="mt-8 grid gap-x-6 gap-y-4 p-5 sm:grid-cols-3 lg:grid-cols-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L96:** `          {cards.map(([label, value]) => (`  
Assignment / binding: `{cards.map(([label, value]) => (`

**L97:** `            <div key={label}>`  
JSX markup — describes HTML structure React will render.

**L98:** `              <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L99:** `                {label}`  
Executable statement: `{label}`

**L100:** `              </p>`  
JSX markup — describes HTML structure React will render.

**L101:** `              <p className="mt-1.5 font-mono text-[1.375rem] font-semibold text-ink">{value}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L102:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L103:** `          ))}`  
Executable statement: `))}`

**L104:** `        </Panel>`  
JSX markup — describes HTML structure React will render.

**L105:** ``  
Blank line — visual spacing.

**L106:** `        <div className="mt-8 flex flex-wrap gap-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L107:** `          {[`  
Executable statement: `{[`

**L108:** `            ['applications', 'Applications'],`  
Executable statement: `['applications', 'Applications'],`

**L109:** `            ['loans', 'Loans'],`  
Executable statement: `['loans', 'Loans'],`

**L110:** `            ['transfers', 'Transfers'],`  
Executable statement: `['transfers', 'Transfers'],`

**L111:** `            ['debt', 'Debt review'],`  
Executable statement: `['debt', 'Debt review'],`

**L112:** `          ].map(([k, label]) => (`  
Assignment / binding: `].map(([k, label]) => (`

**L113:** `            <SoftChip`  
JSX markup — describes HTML structure React will render.

**L114:** `              key={k}`  
Assignment / binding: `key={k}`

**L115:** `              active={tab === k}`  
Assignment / binding: `active={tab === k}`

**L116:** `              onClick={() => setTab(k as QueueTab)}`  
Assignment / binding: `onClick={() => setTab(k as QueueTab)}`

**L117:** `              className={cn(tab !== k && 'border border-transparent')}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L118:** `            >`  
JSX markup — describes HTML structure React will render.

**L119:** `              {label}`  
Executable statement: `{label}`

**L120:** `            </SoftChip>`  
JSX markup — describes HTML structure React will render.

**L121:** `          ))}`  
Executable statement: `))}`

**L122:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L123:** ``  
Blank line — visual spacing.

**L124:** `        {tab === 'applications' ? (`  
Assignment / binding: `{tab === 'applications' ? (`

**L125:** `          <div className="mt-6 space-y-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L126:** `            {(applications ?? []).map((app) => (`  
Assignment / binding: `{(applications ?? []).map((app) => (`

**L127:** `              <Panel key={app.id} className="p-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L128:** `                <div className="flex flex-wrap items-start justify-between gap-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L129:** `                  <div>`  
JSX markup — describes HTML structure React will render.

**L130:** `                    <p className="font-mono text-[0.75rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L131:** `                      {app.reference ?? app.id}`  
Executable statement: `{app.reference ?? app.id}`

**L132:** `                    </p>`  
JSX markup — describes HTML structure React will render.

**L133:** `                    <p className="text-[1rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L134:** `                      {app.firstName} {app.lastName} · {app.product}`  
Executable statement: `{app.firstName} {app.lastName} · {app.product}`

**L135:** `                    </p>`  
JSX markup — describes HTML structure React will render.

**L136:** `                    <p className="font-mono text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L137:** `                      {formatRand(Number(app.amount ?? 0), 0)} over {app.termMonths} month(s)`  
Executable statement: `{formatRand(Number(app.amount ?? 0), 0)} over {app.termMonths} month(s…`

**L138:** `                    </p>`  
JSX markup — describes HTML structure React will render.

**L139:** `                  </div>`  
JSX markup — describes HTML structure React will render.

**L140:** `                  <StatusPill status={app.status === 'declined' ? 'overdue' : 'pending'} />`  
JSX markup — describes HTML structure React will render.

**L141:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L142:** `                <textarea`  
JSX markup — describes HTML structure React will render.

**L143:** `                  value={note[app.id] ?? ''}`  
Assignment / binding: `value={note[app.id] ?? ''}`

**L144:** `                  onChange={(e) => setNote((n) => ({ ...n, [app.id]: e.target.value }))}`  
Assignment / binding: `onChange={(e) => setNote((n) => ({ ...n, [app.id]: e.target.value }))}`

**L145:** `                  className="mt-3 min-h-20 w-full rounded-sm border border-line bg-surface px-3 p...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L146:** `                  placeholder="Decision note (optional)"`  
Assignment / binding: `placeholder="Decision note (optional)"`

**L147:** `                />`  
JSX markup — describes HTML structure React will render.

**L148:** `                <div className="mt-3 flex gap-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L149:** `                  <Button`  
JSX markup — describes HTML structure React will render.

**L150:** `                    type="button"`  
Assignment / binding: `type="button"`

**L151:** `                    onClick={() =>`  
JSX markup — describes HTML structure React will render.

**L152:** `                      decision.mutate({ id: app.id, value: 'approve', note: note[app.id] })`  
Executable statement: `decision.mutate({ id: app.id, value: 'approve', note: note[app.id] })`

**L153:** `                    }`  
Closes the previous block/object/function.

**L154:** `                  >`  
JSX markup — describes HTML structure React will render.

**L155:** `                    Approve`  
Executable statement: `Approve`

**L156:** `                  </Button>`  
JSX markup — describes HTML structure React will render.

**L157:** `                  <Button`  
JSX markup — describes HTML structure React will render.

**L158:** `                    type="button"`  
Assignment / binding: `type="button"`

**L159:** `                    variant="outline"`  
Assignment / binding: `variant="outline"`

**L160:** `                    onClick={() =>`  
JSX markup — describes HTML structure React will render.

**L161:** `                      decision.mutate({ id: app.id, value: 'decline', note: note[app.id] })`  
Executable statement: `decision.mutate({ id: app.id, value: 'decline', note: note[app.id] })`

**L162:** `                    }`  
Closes the previous block/object/function.

**L163:** `                  >`  
JSX markup — describes HTML structure React will render.

**L164:** `                    Decline`  
Executable statement: `Decline`

**L165:** `                  </Button>`  
JSX markup — describes HTML structure React will render.

**L166:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L167:** `              </Panel>`  
JSX markup — describes HTML structure React will render.

**L168:** `            ))}`  
Executable statement: `))}`

**L169:** `            {!applications?.length ? (`  
Executable statement: `{!applications?.length ? (`

**L170:** `              <p className="text-[0.9375rem] text-ink-muted">No pending applications.</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L171:** `            ) : null}`  
Executable statement: `) : null}`

**L172:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L173:** `        ) : null}`  
Executable statement: `) : null}`

**L174:** ``  
Blank line — visual spacing.

**L175:** `        {tab === 'loans' ? (`  
Assignment / binding: `{tab === 'loans' ? (`

**L176:** `          <Panel className="mt-6 overflow-x-auto">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L177:** `            <table className="w-full min-w-[42rem] text-left text-[0.875rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L178:** `              <thead className="border-b border-line text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L179:** `                <tr>`  
JSX markup — describes HTML structure React will render.

**L180:** `                  <th className="px-4 py-3 font-medium">Loan</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L181:** `                  <th className="px-4 py-3 font-medium">Product</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L182:** `                  <th className="px-4 py-3 font-medium">Remaining</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L183:** `                  <th className="px-4 py-3 font-medium">Next payment</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L184:** `                  <th className="px-4 py-3 font-medium">Status</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L185:** `                </tr>`  
JSX markup — describes HTML structure React will render.

**L186:** `              </thead>`  
JSX markup — describes HTML structure React will render.

**L187:** `              <tbody className="divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L188:** `                {(loans ?? []).map((loan) => (`  
Assignment / binding: `{(loans ?? []).map((loan) => (`

**L189:** `                  <tr key={loan.id}>`  
JSX markup — describes HTML structure React will render.

**L190:** `                    <td className="px-4 py-3 font-mono">{loan.id}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L191:** `                    <td className="px-4 py-3">{loan.product}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L192:** `                    <td className="px-4 py-3 font-mono">{formatRand(loan.remaining)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L193:** `                    <td className="px-4 py-3">{formatDate(loan.nextPaymentDate)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L194:** `                    <td className="px-4 py-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L195:** `                      <StatusPill status={loan.status} />`  
JSX markup — describes HTML structure React will render.

**L196:** `                    </td>`  
JSX markup — describes HTML structure React will render.

**L197:** `                  </tr>`  
JSX markup — describes HTML structure React will render.

**L198:** `                ))}`  
Executable statement: `))}`

**L199:** `              </tbody>`  
JSX markup — describes HTML structure React will render.

**L200:** `            </table>`  
JSX markup — describes HTML structure React will render.

**L201:** `          </Panel>`  
JSX markup — describes HTML structure React will render.

**L202:** `        ) : null}`  
Executable statement: `) : null}`

**L203:** ``  
Blank line — visual spacing.

**L204:** `        {tab === 'transfers' ? (`  
Assignment / binding: `{tab === 'transfers' ? (`

**L205:** `          <Panel className="mt-6 divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L206:** `            {(transfers ?? []).map((t) => (`  
Assignment / binding: `{(transfers ?? []).map((t) => (`

**L207:** `              <div key={t.id} className="px-4 py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L208:** `                <p className="font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L209:** `                  <span className="font-mono text-[0.875rem]">{t.id}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L210:** `                  {' · ${t.country}'}`  
Executable statement: `{` · ${t.country}`}`

**L211:** `                </p>`  
JSX markup — describes HTML structure React will render.

**L212:** `                <p className="text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L213:** `                  {t.senderName} → {t.recipientName} ·{' '}`  
Executable statement: `{t.senderName} → {t.recipientName} ·{' '}`

**L214:** `                  <span className="font-mono">{formatRand(t.total)}</span> ({t.status})`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L215:** `                </p>`  
JSX markup — describes HTML structure React will render.

**L216:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L217:** `            ))}`  
Executable statement: `))}`

**L218:** `          </Panel>`  
JSX markup — describes HTML structure React will render.

**L219:** `        ) : null}`  
Executable statement: `) : null}`

**L220:** ``  
Blank line — visual spacing.

**L221:** `        {tab === 'debt' ? (`  
Assignment / binding: `{tab === 'debt' ? (`

**L222:** `          <Panel className="mt-6 divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L223:** `            {(debtReviews ?? []).map((d) => (`  
Assignment / binding: `{(debtReviews ?? []).map((d) => (`

**L224:** `              <div key={d.id} className="px-4 py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L225:** `                <p className="font-semibold text-ink">{d.fullName}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L226:** `                <p className="text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L227:** `                  {d.phone} · {d.email}`  
Executable statement: `{d.phone} · {d.email}`

**L228:** `                </p>`  
JSX markup — describes HTML structure React will render.

**L229:** `                <p className="mt-2 text-[0.875rem] text-ink">{d.situation}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L230:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L231:** `            ))}`  
Executable statement: `))}`

**L232:** `          </Panel>`  
JSX markup — describes HTML structure React will render.

**L233:** `        ) : null}`  
Executable statement: `) : null}`

**L234:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L235:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L236:** `  )`  
Executable statement: `)`

**L237:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Dashboard.tsx`

_238 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Authenticated customer area: loans, repayments, documents, profile.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - fetchLoans / fetchLoan / makeRepayment -> LoanController.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Loans appear after DataInitializer seed OR admin approval of an application.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - Layout/nav: DashboardLayout; routes under /dashboard/* in App.tsx.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L11:** `import { useDashboardLoans, useLoanStatus, useRepaymentHistory } from '@/hooks/useLoanStatus'`  
Import — brings in `@/hooks/useLoanStatus` so this file can use it.

**L12:** `import { formatDate, formatRand } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L13:** `import { Button, StatusPill, PageIntro, accentBtn } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L14:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L15:** ``  
Blank line — visual spacing.

**L16:** `function LoadingLine({ label }: { label: string }) {`  
Defines function `LoadingLine` — callable unit of UI/logic.

**L17:** `  return <p className="text-ink-muted">{label}</p>`  
Returns JSX UI (or a value) to render / callers.

**L18:** `}`  
Closes the previous block/object/function.

**L19:** ``  
Blank line — visual spacing.

**L20:** `export function DashboardPage() {`  
Defines function `DashboardPage` — callable unit of UI/logic.

**L21:** `  const { data, isLoading } = useDashboardLoans()`  
Constant/variable `?` — holds a value or React binding.

**L22:** `  const loan = data?.loans[0]`  
Constant/variable `loan` — holds a value or React binding.

**L23:** ``  
Blank line — visual spacing.

**L24:** `  if (isLoading || !loan) {`  
Conditional — runs the following block only when the condition is true.

**L25:** `    return <LoadingLine label="Loading your account…" />`  
Returns JSX UI (or a value) to render / callers.

**L26:** `  }`  
Closes the previous block/object/function.

**L27:** ``  
Blank line — visual spacing.

**L28:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L29:** `    <div className="page-cascade space-y-10">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L30:** `      <Reveal>`  
JSX markup — describes HTML structure React will render.

**L31:** `        <PageIntro title="Next payment">`  
JSX markup — describes HTML structure React will render.

**L32:** `          <span className="font-mono text-[1.35rem] font-semibold text-teal">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L33:** `            {formatRand(loan.nextPaymentAmount)}`  
Executable statement: `{formatRand(loan.nextPaymentAmount)}`

**L34:** `          </span>{' '}`  
JSX markup — describes HTML structure React will render.

**L35:** `          <span className="text-ink">on {formatDate(loan.nextPaymentDate)}.</span>{' '}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L36:** `          Remaining balance {formatRand(loan.remaining)}.`  
Executable statement: `Remaining balance {formatRand(loan.remaining)}.`

**L37:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L38:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L39:** ``  
Blank line — visual spacing.

**L40:** `      <div className="flex flex-wrap gap-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L41:** `        <Link to="/dashboard/repayments" className={accentBtn}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L42:** `          Make a payment`  
Executable statement: `Make a payment`

**L43:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L44:** `        <Link`  
JSX markup — describes HTML structure React will render.

**L45:** `          to={'/dashboard/loans/${loan.id}'}`  
Assignment / binding: `to={`/dashboard/loans/${loan.id}`}`

**L46:** `          className="inline-flex min-h-11 items-center px-2 text-[1rem] font-semibold text-teal h...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L47:** `        >`  
JSX markup — describes HTML structure React will render.

**L48:** `          Full schedule`  
Executable statement: `Full schedule`

**L49:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L50:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L51:** ``  
Blank line — visual spacing.

**L52:** `      <dl className="panel-soft grid gap-px overflow-hidden bg-line sm:grid-cols-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L53:** `        <div className="relative bg-white p-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L54:** `          <div className="accent-bar absolute inset-x-0 top-0" />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L55:** `          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L56:** `            Remaining`  
Executable statement: `Remaining`

**L57:** `          </dt>`  
JSX markup — describes HTML structure React will render.

**L58:** `          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L59:** `            {formatRand(loan.remaining)}`  
Executable statement: `{formatRand(loan.remaining)}`

**L60:** `          </dd>`  
JSX markup — describes HTML structure React will render.

**L61:** `          <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.8125rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L62:** `            <span className="font-mono">{loan.id}</span> · <StatusPill status={loan.status} />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L63:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L64:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L65:** `        <div className="bg-white p-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L66:** `          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L67:** `            Monthly instalment`  
Executable statement: `Monthly instalment`

**L68:** `          </dt>`  
JSX markup — describes HTML structure React will render.

**L69:** `          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-teal">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L70:** `            {formatRand(loan.nextPaymentAmount)}`  
Executable statement: `{formatRand(loan.nextPaymentAmount)}`

**L71:** `          </dd>`  
JSX markup — describes HTML structure React will render.

**L72:** `          <p className="mt-1 text-[0.8125rem] text-ink-muted">Due {formatDate(loan.nextPaymentDat...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L73:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L74:** `        <div className="bg-white p-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L75:** `          <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L76:** `            Originally borrowed`  
Executable statement: `Originally borrowed`

**L77:** `          </dt>`  
JSX markup — describes HTML structure React will render.

**L78:** `          <dd className="mt-2 font-mono text-[1.5rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L79:** `            {formatRand(loan.principal)}`  
Executable statement: `{formatRand(loan.principal)}`

**L80:** `          </dd>`  
JSX markup — describes HTML structure React will render.

**L81:** `          <p className="mt-1 text-[0.8125rem] text-ink-muted">{loan.termMonths}-month term</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L82:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L83:** `      </dl>`  
JSX markup — describes HTML structure React will render.

**L84:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L85:** `  )`  
Executable statement: `)`

**L86:** `}`  
Closes the previous block/object/function.

**L87:** ``  
Blank line — visual spacing.

**L88:** `export function LoanDetailPage() {`  
Defines function `LoanDetailPage` — callable unit of UI/logic.

**L89:** `  const { data: loan, isLoading } = useLoanStatus('LN-20481')`  
Constant/variable `?` — holds a value or React binding.

**L90:** ``  
Blank line — visual spacing.

**L91:** `  if (isLoading || !loan) {`  
Conditional — runs the following block only when the condition is true.

**L92:** `    return <LoadingLine label="Loading loan…" />`  
Returns JSX UI (or a value) to render / callers.

**L93:** `  }`  
Closes the previous block/object/function.

**L94:** ``  
Blank line — visual spacing.

**L95:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L96:** `    <div className="space-y-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L97:** `      <div>`  
JSX markup — describes HTML structure React will render.

**L98:** `        <p className="font-mono text-[0.875rem] text-ink-muted">{loan.id}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L99:** `        <div className="mt-1 flex flex-wrap items-center gap-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L100:** `          <h1 className="text-[1.75rem] font-bold tracking-tight text-ink">{loan.product}</h1>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L101:** `          <StatusPill status={loan.status} />`  
JSX markup — describes HTML structure React will render.

**L102:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L103:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L104:** ``  
Blank line — visual spacing.

**L105:** `      <dl className="panel-soft grid gap-px overflow-hidden bg-line sm:grid-cols-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L106:** `        {[`  
Executable statement: `{[`

**L107:** `          ['Remaining', formatRand(loan.remaining)],`  
Executable statement: `['Remaining', formatRand(loan.remaining)],`

**L108:** `          ['Monthly instalment', formatRand(loan.monthlyInstalment)],`  
Executable statement: `['Monthly instalment', formatRand(loan.monthlyInstalment)],`

**L109:** `          ['Originally borrowed', formatRand(loan.principal)],`  
Executable statement: `['Originally borrowed', formatRand(loan.principal)],`

**L110:** `        ].map(([label, value]) => (`  
Assignment / binding: `].map(([label, value]) => (`

**L111:** `          <div key={label} className="bg-white p-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L112:** `            <dt className="text-[0.8125rem] text-ink-muted">{label}</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L113:** `            <dd className="mt-1 font-mono text-[1.25rem] font-semibold text-ink">{value}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L114:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L115:** `        ))}`  
Executable statement: `))}`

**L116:** `      </dl>`  
JSX markup — describes HTML structure React will render.

**L117:** ``  
Blank line — visual spacing.

**L118:** `      <div className="panel-soft overflow-x-auto">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L119:** `        <table className="w-full min-w-[28rem] text-left text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L120:** `          <caption className="sr-only">Repayment schedule</caption>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L121:** `          <thead className="border-b border-line text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L122:** `            <tr>`  
JSX markup — describes HTML structure React will render.

**L123:** `              <th className="px-4 py-3 font-medium">Due</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L124:** `              <th className="px-4 py-3 font-medium">Amount</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L125:** `              <th className="px-4 py-3 font-medium">Status</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L126:** `            </tr>`  
JSX markup — describes HTML structure React will render.

**L127:** `          </thead>`  
JSX markup — describes HTML structure React will render.

**L128:** `          <tbody className="divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L129:** `            {loan.schedule.map((row) => (`  
Assignment / binding: `{loan.schedule.map((row) => (`

**L130:** `              <tr key={row.dueDate}>`  
JSX markup — describes HTML structure React will render.

**L131:** `                <td className="px-4 py-3.5">{formatDate(row.dueDate)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L132:** `                <td className="px-4 py-3.5 font-mono">{formatRand(row.amount)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L133:** `                <td className="px-4 py-3.5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L134:** `                  <StatusPill status={row.status} />`  
JSX markup — describes HTML structure React will render.

**L135:** `                </td>`  
JSX markup — describes HTML structure React will render.

**L136:** `              </tr>`  
JSX markup — describes HTML structure React will render.

**L137:** `            ))}`  
Executable statement: `))}`

**L138:** `          </tbody>`  
JSX markup — describes HTML structure React will render.

**L139:** `        </table>`  
JSX markup — describes HTML structure React will render.

**L140:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L141:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L142:** `  )`  
Executable statement: `)`

**L143:** `}`  
Closes the previous block/object/function.

**L144:** ``  
Blank line — visual spacing.

**L145:** `export function RepaymentsPage() {`  
Defines function `RepaymentsPage` — callable unit of UI/logic.

**L146:** `  const { data: payments, isLoading } = useRepaymentHistory()`  
Constant/variable `?` — holds a value or React binding.

**L147:** ``  
Blank line — visual spacing.

**L148:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L149:** `    <div className="space-y-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L150:** `      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L151:** `        <PageIntro title="Payments">History of what has gone out, and a button to pay the next in...`  
JSX markup — describes HTML structure React will render.

**L152:** `        <Button variant="primary">Make a payment</Button>`  
JSX markup — describes HTML structure React will render.

**L153:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L154:** ``  
Blank line — visual spacing.

**L155:** `      <div className="panel-soft overflow-x-auto">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L156:** `        {isLoading || !payments ? (`  
Executable statement: `{isLoading || !payments ? (`

**L157:** `          <p className="p-5 text-ink-muted">Loading payments…</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L158:** `        ) : (`  
Executable statement: `) : (`

**L159:** `          <table className="w-full min-w-[36rem] text-left text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L160:** `            <caption className="sr-only">Payment history</caption>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L161:** `            <thead className="border-b border-line text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L162:** `              <tr>`  
JSX markup — describes HTML structure React will render.

**L163:** `                <th className="px-4 py-3 font-medium">Reference</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L164:** `                <th className="px-4 py-3 font-medium">Date</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L165:** `                <th className="px-4 py-3 font-medium">Amount</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L166:** `                <th className="px-4 py-3 font-medium">Method</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L167:** `                <th className="px-4 py-3 font-medium">Status</th>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L168:** `              </tr>`  
JSX markup — describes HTML structure React will render.

**L169:** `            </thead>`  
JSX markup — describes HTML structure React will render.

**L170:** `            <tbody className="divide-y divide-line">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L171:** `              {payments.map((p) => (`  
Assignment / binding: `{payments.map((p) => (`

**L172:** `                <tr key={p.id}>`  
JSX markup — describes HTML structure React will render.

**L173:** `                  <td className="px-4 py-3.5 font-mono text-[0.875rem]">{p.id}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L174:** `                  <td className="px-4 py-3.5">{formatDate(p.date)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L175:** `                  <td className="px-4 py-3.5 font-mono">{formatRand(p.amount)}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L176:** `                  <td className="px-4 py-3.5">{p.method}</td>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L177:** `                  <td className="px-4 py-3.5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L178:** `                    <StatusPill status={p.status} />`  
JSX markup — describes HTML structure React will render.

**L179:** `                  </td>`  
JSX markup — describes HTML structure React will render.

**L180:** `                </tr>`  
JSX markup — describes HTML structure React will render.

**L181:** `              ))}`  
Executable statement: `))}`

**L182:** `            </tbody>`  
JSX markup — describes HTML structure React will render.

**L183:** `          </table>`  
JSX markup — describes HTML structure React will render.

**L184:** `        )}`  
Executable statement: `)}`

**L185:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L186:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L187:** `  )`  
Executable statement: `)`

**L188:** `}`  
Closes the previous block/object/function.

**L189:** ``  
Blank line — visual spacing.

**L190:** `export function DocumentsPage() {`  
Defines function `DocumentsPage` — callable unit of UI/logic.

**L191:** `  const docs = [`  
Constant/variable `docs` — holds a value or React binding.

**L192:** `    { name: 'ID document', status: 'Verified' },`  
Executable statement: `{ name: 'ID document', status: 'Verified' },`

**L193:** `    { name: 'Payslip — April 2026', status: 'Verified' },`  
Executable statement: `{ name: 'Payslip — April 2026', status: 'Verified' },`

**L194:** `    { name: 'Bank statement — Mar 2026', status: 'Verified' },`  
Executable statement: `{ name: 'Bank statement — Mar 2026', status: 'Verified' },`

**L195:** `    { name: 'Bank statement — Apr 2026', status: 'Verified' },`  
Executable statement: `{ name: 'Bank statement — Apr 2026', status: 'Verified' },`

**L196:** `    { name: 'Bank statement — May 2026', status: 'Verified' },`  
Executable statement: `{ name: 'Bank statement — May 2026', status: 'Verified' },`

**L197:** `  ]`  
Executable statement: `]`

**L198:** ``  
Blank line — visual spacing.

**L199:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L200:** `    <div className="space-y-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L201:** `      <PageIntro title="Documents">Submitted with your application. You can look, not replace, fr...`  
JSX markup — describes HTML structure React will render.

**L202:** `      <ul className="panel-soft divide-y divide-line px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L203:** `        {docs.map((d) => (`  
Assignment / binding: `{docs.map((d) => (`

**L204:** `          <li key={d.name} className="flex items-center justify-between gap-3 py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L205:** `            <span className="text-[0.9375rem] text-ink">{d.name}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L206:** `            <span className="text-[0.8125rem] font-semibold text-sage">{d.status}</span>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L207:** `          </li>`  
JSX markup — describes HTML structure React will render.

**L208:** `        ))}`  
Executable statement: `))}`

**L209:** `      </ul>`  
JSX markup — describes HTML structure React will render.

**L210:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L211:** `  )`  
Executable statement: `)`

**L212:** `}`  
Closes the previous block/object/function.

**L213:** ``  
Blank line — visual spacing.

**L214:** `export function ProfilePage() {`  
Defines function `ProfilePage` — callable unit of UI/logic.

**L215:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L216:** `    <div className="space-y-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L217:** `      <PageIntro title="Profile">How we reach you, and the ID we have on file.</PageIntro>`  
JSX markup — describes HTML structure React will render.

**L218:** `      <dl className="panel-soft divide-y divide-line px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L219:** `        {[`  
Executable statement: `{[`

**L220:** `          ['Name', 'Thabo Molefe'],`  
Executable statement: `['Name', 'Thabo Molefe'],`

**L221:** `          ['ID document', 'Verified'],`  
Executable statement: `['ID document', 'Verified'],`

**L222:** `          ['Mobile', '082 555 0142'],`  
Executable statement: `['Mobile', '082 555 0142'],`

**L223:** `          ['Email', 'thabo@example.com'],`  
Executable statement: `['Email', 'thabo@example.com'],`

**L224:** `          ['Password', '••••••••'],`  
Executable statement: `['Password', '••••••••'],`

**L225:** `        ].map(([label, value]) => (`  
Assignment / binding: `].map(([label, value]) => (`

**L226:** `          <div`  
JSX markup — describes HTML structure React will render.

**L227:** `            key={label}`  
Assignment / binding: `key={label}`

**L228:** `            className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L229:** `          >`  
JSX markup — describes HTML structure React will render.

**L230:** `            <dt className="text-[0.8125rem] text-ink-muted">{label}</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L231:** `            <dd className="text-[0.9375rem] text-ink">{value}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L232:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L233:** `        ))}`  
Executable statement: `))}`

**L234:** `      </dl>`  
JSX markup — describes HTML structure React will render.

**L235:** `      <Button variant="outline">Update security settings</Button>`  
JSX markup — describes HTML structure React will render.

**L236:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L237:** `  )`  
Executable statement: `)`

**L238:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/DebtReview.tsx`

_109 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Debt-review consultation request (public).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - createDebtReview -> POST /api/debt-review (DebtReviewController).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Requests show under AdminPanel Debt review tab.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { useForm } from 'react-hook-form'`  
Import — brings in `react-hook-form` so this file can use it.

**L11:** `import { zodResolver } from '@hookform/resolvers/zod'`  
Import — brings in `@hookform/resolvers/zod` so this file can use it.

**L12:** `import { debtReviewSchema, type DebtReviewForm } from '@/lib/validation'`  
Import — brings in `@/lib/validation` so this file can use it.

**L13:** `import { Button, Input, TextArea, PageIntro, Notice } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L14:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L15:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `export function DebtReviewPage() {`  
Defines function `DebtReviewPage` — callable unit of UI/logic.

**L18:** `  const [submitted, setSubmitted] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L19:** `  const {`  
Executable statement: `const {`

**L20:** `    register,`  
Executable statement: `register,`

**L21:** `    handleSubmit,`  
Executable statement: `handleSubmit,`

**L22:** `    formState: { errors },`  
Executable statement: `formState: { errors },`

**L23:** `  } = useForm<DebtReviewForm>({`  
Closes the previous block/object/function.

**L24:** `    resolver: zodResolver(debtReviewSchema),`  
Executable statement: `resolver: zodResolver(debtReviewSchema),`

**L25:** `  })`  
Closes the previous block/object/function.

**L26:** ``  
Blank line — visual spacing.

**L27:** `  if (submitted) {`  
Conditional — runs the following block only when the condition is true.

**L28:** `    return (`  
Returns JSX UI (or a value) to render / callers.

**L29:** `      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L30:** `        <PageIntro title="We’ll call you">`  
JSX markup — describes HTML structure React will render.

**L31:** `          Someone from the debt review team will follow up within two working days.`  
Executable statement: `Someone from the debt review team will follow up within two working da…`

**L32:** `          This was a consultation request — not a loan application.`  
Executable statement: `This was a consultation request — not a loan application.`

**L33:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L34:** `        <Link`  
JSX markup — describes HTML structure React will render.

**L35:** `          to="/"`  
Assignment / binding: `to="/"`

**L36:** `          className="mt-8 inline-flex min-h-11 items-center text-[1rem] font-semibold text-teal h...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L37:** `        >`  
JSX markup — describes HTML structure React will render.

**L38:** `          Back to home`  
Executable statement: `Back to home`

**L39:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L40:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L41:** `    )`  
Executable statement: `)`

**L42:** `  }`  
Closes the previous block/object/function.

**L43:** ``  
Blank line — visual spacing.

**L44:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L45:** `    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L46:** `      <p className="text-[0.9375rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L47:** `        <Link to="/" className="hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L48:** `          Home`  
Executable statement: `Home`

**L49:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L50:** `        <span aria-hidden className="mx-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L51:** `          /`  
Executable statement: `/`

**L52:** `        </span>`  
JSX markup — describes HTML structure React will render.

**L53:** `        Debt review`  
Executable statement: `Debt review`

**L54:** `      </p>`  
JSX markup — describes HTML structure React will render.

**L55:** ``  
Blank line — visual spacing.

**L56:** `      <Reveal className="mt-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L57:** `        <PageIntro title="If repayments are already too much">`  
JSX markup — describes HTML structure React will render.

**L58:** `          Debt review is a formal process under South African credit law. It is not a`  
Executable statement: `Debt review is a formal process under South African credit law. It is …`

**L59:** `          cash loan, and we will not offer you one from this page.`  
Executable statement: `cash loan, and we will not offer you one from this page.`

**L60:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L61:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L62:** ``  
Blank line — visual spacing.

**L63:** `      <Reveal className="mt-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L64:** `        <Notice>`  
JSX markup — describes HTML structure React will render.

**L65:** `          A counsellor looks at income and what you already owe, then may negotiate`  
Executable statement: `A counsellor looks at income and what you already owe, then may negoti…`

**L66:** `          with credit providers. It can take months. It is not a quick cash fix.`  
Executable statement: `with credit providers. It can take months. It is not a quick cash fix.`

**L67:** `        </Notice>`  
JSX markup — describes HTML structure React will render.

**L68:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L69:** ``  
Blank line — visual spacing.

**L70:** `      <form`  
JSX markup — describes HTML structure React will render.

**L71:** `        onSubmit={handleSubmit(() => setSubmitted(true))}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L72:** `        className="panel-soft mt-10 space-y-5 p-5 sm:p-6"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L73:** `      >`  
JSX markup — describes HTML structure React will render.

**L74:** `        <h2 className="text-[1.125rem] font-semibold">Request a consultation</h2>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L75:** `        <Input`  
JSX markup — describes HTML structure React will render.

**L76:** `          label="Full name"`  
Assignment / binding: `label="Full name"`

**L77:** `          autoComplete="name"`  
Assignment / binding: `autoComplete="name"`

**L78:** `          error={errors.fullName?.message}`  
Assignment / binding: `error={errors.fullName?.message}`

**L79:** `          {...register('fullName')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L80:** `        />`  
JSX markup — describes HTML structure React will render.

**L81:** `        <div className="grid gap-5 sm:grid-cols-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L82:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L83:** `            label="Phone"`  
Assignment / binding: `label="Phone"`

**L84:** `            inputMode="tel"`  
Assignment / binding: `inputMode="tel"`

**L85:** `            autoComplete="tel"`  
Assignment / binding: `autoComplete="tel"`

**L86:** `            error={errors.phone?.message}`  
Assignment / binding: `error={errors.phone?.message}`

**L87:** `            {...register('phone')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L88:** `          />`  
JSX markup — describes HTML structure React will render.

**L89:** `          <Input`  
JSX markup — describes HTML structure React will render.

**L90:** `            label="Email"`  
Assignment / binding: `label="Email"`

**L91:** `            type="email"`  
Assignment / binding: `type="email"`

**L92:** `            autoComplete="email"`  
Assignment / binding: `autoComplete="email"`

**L93:** `            error={errors.email?.message}`  
Assignment / binding: `error={errors.email?.message}`

**L94:** `            {...register('email')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L95:** `          />`  
JSX markup — describes HTML structure React will render.

**L96:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L97:** `        <TextArea`  
JSX markup — describes HTML structure React will render.

**L98:** `          label="What’s going on, roughly?"`  
Assignment / binding: `label="What’s going on, roughly?"`

**L99:** `          hint="Who you owe, and whether you’ve missed payments. No documents needed yet."`  
Assignment / binding: `hint="Who you owe, and whether you’ve missed payments. No documents ne…`

**L100:** `          error={errors.situation?.message}`  
Assignment / binding: `error={errors.situation?.message}`

**L101:** `          {...register('situation')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L102:** `        />`  
JSX markup — describes HTML structure React will render.

**L103:** `        <Button type="submit" variant="primary">`  
JSX markup — describes HTML structure React will render.

**L104:** `          Request consultation`  
Executable statement: `Request consultation`

**L105:** `        </Button>`  
JSX markup — describes HTML structure React will render.

**L106:** `      </form>`  
JSX markup — describes HTML structure React will render.

**L107:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L108:** `  )`  
Executable statement: `)`

**L109:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/FAQ.tsx`

_103 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * FAQ and Contact public pages.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Static content; Contact is informational (no backend ticket API yet).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ``  
Blank line — visual spacing.

**L8:** `import { PageIntro } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L9:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L10:** `import { brand, legalEntityLine } from '@/content/brand'`  
Import — brings in `@/content/brand` so this file can use it.

**L11:** `import { ChevronDown } from 'lucide-react'`  
Import — brings in `lucide-react` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `const faqs = [`  
Constant/variable `faqs` — holds a value or React binding.

**L14:** `  {`  
Opens a new code block.

**L15:** `    q: 'How much can I borrow?',`  
Executable statement: `q: 'How much can I borrow?',`

**L16:** `    a: 'From R500 to R20,000, over 1 to 9 months. Use the quote on the home page to see the month...`  
Executable statement: `a: 'From R500 to R20,000, over 1 to 9 months. Use the quote on the hom…`

**L17:** `  },`  
Closes the previous block/object/function.

**L18:** `  {`  
Opens a new code block.

**L19:** `    q: 'What documents do I need?',`  
Executable statement: `q: 'What documents do I need?',`

**L20:** `    a: 'A valid ID (or passport / work permit), your latest payslip, and three months of bank sta...`  
Executable statement: `a: 'A valid ID (or passport / work permit), your latest payslip, and t…`

**L21:** `  },`  
Closes the previous block/object/function.

**L22:** `  {`  
Opens a new code block.

**L23:** `    q: 'How long does a decision take?',`  
Executable statement: `q: 'How long does a decision take?',`

**L24:** `    a: 'Most applications get an answer within one working day once every document is in.',`  
Executable statement: `a: 'Most applications get an answer within one working day once every …`

**L25:** `  },`  
Closes the previous block/object/function.

**L26:** `  {`  
Opens a new code block.

**L27:** `    q: 'Who is behind Tshedza Finance?',`  
Executable statement: `q: 'Who is behind Tshedza Finance?',`

**L28:** `    a: '${brand.productName} is the loan product. It sits under ${legalEntityLine()}.',`  
Executable statement: `a: `${brand.productName} is the loan product. It sits under ${legalEnt…`

**L29:** `  },`  
Closes the previous block/object/function.

**L30:** `  {`  
Opens a new code block.

**L31:** `    q: 'Is Tshedza Finance a live lender?',`  
Executable statement: `q: 'Is Tshedza Finance a live lender?',`

**L32:** `    a: 'Not yet. This site is a portfolio frontend. Live lending in South Africa needs NCR credit...`  
Executable statement: `a: 'Not yet. This site is a portfolio frontend. Live lending in South …`

**L33:** `  },`  
Closes the previous block/object/function.

**L34:** `  {`  
Opens a new code block.

**L35:** `    q: 'I’m already in debt review. Can I still get a loan?',`  
Executable statement: `q: 'I’m already in debt review. Can I still get a loan?',`

**L36:** `    a: 'Use the debt review page to book a consultation. That flow is advice, not a loan applicat...`  
Executable statement: `a: 'Use the debt review page to book a consultation. That flow is advi…`

**L37:** `  },`  
Closes the previous block/object/function.

**L38:** `]`  
Executable statement: `]`

**L39:** ``  
Blank line — visual spacing.

**L40:** `export function FAQPage() {`  
Defines function `FAQPage` — callable unit of UI/logic.

**L41:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L42:** `    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L43:** `      <Reveal>`  
JSX markup — describes HTML structure React will render.

**L44:** `        <PageIntro title="Questions">`  
JSX markup — describes HTML structure React will render.

**L45:** `          Short answers. If yours isn’t here, use the contact page.`  
Executable statement: `Short answers. If yours isn’t here, use the contact page.`

**L46:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L47:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L48:** `      <div className="panel-soft mt-10 divide-y divide-line px-5 sm:px-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L49:** `        {faqs.map((item) => (`  
Assignment / binding: `{faqs.map((item) => (`

**L50:** `          <details key={item.q} className="group py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L51:** `            <summary className="cursor-pointer text-[1rem] font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L52:** `              <span className="flex items-start justify-between gap-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L53:** `                {item.q}`  
Executable statement: `{item.q}`

**L54:** `                <ChevronDown`  
JSX markup — describes HTML structure React will render.

**L55:** `                  size={18}`  
Assignment / binding: `size={18}`

**L56:** `                  strokeWidth={1.75}`  
Assignment / binding: `strokeWidth={1.75}`

**L57:** `                  className="mt-0.5 shrink-0 text-ink-muted transition-transform group-open:rotat...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L58:** `                  aria-hidden`  
Executable statement: `aria-hidden`

**L59:** `                />`  
JSX markup — describes HTML structure React will render.

**L60:** `              </span>`  
JSX markup — describes HTML structure React will render.

**L61:** `            </summary>`  
JSX markup — describes HTML structure React will render.

**L62:** `            <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L63:** `              {item.a}`  
Executable statement: `{item.a}`

**L64:** `            </p>`  
JSX markup — describes HTML structure React will render.

**L65:** `          </details>`  
JSX markup — describes HTML structure React will render.

**L66:** `        ))}`  
Executable statement: `))}`

**L67:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L68:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L69:** `  )`  
Executable statement: `)`

**L70:** `}`  
Closes the previous block/object/function.

**L71:** ``  
Blank line — visual spacing.

**L72:** `export function ContactPage() {`  
Defines function `ContactPage` — callable unit of UI/logic.

**L73:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L74:** `    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L75:** `      <PageIntro title="Contact">`  
JSX markup — describes HTML structure React will render.

**L76:** `        Reach {brand.productName} online. The registered company is{' '}`  
Executable statement: `Reach {brand.productName} online. The registered company is{' '}`

**L77:** `        {legalEntityLine()}.`  
Executable statement: `{legalEntityLine()}.`

**L78:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L79:** `      <dl className="panel-soft mt-10 divide-y divide-line px-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L80:** `        <div className="py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L81:** `          <dt className="text-[0.9375rem] text-ink-muted">Email</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L82:** `          <dd className="mt-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L83:** `            <a href={'mailto:${brand.email}'} className="text-[1.0625rem] text-teal hover:underli...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L84:** `              {brand.email}`  
Executable statement: `{brand.email}`

**L85:** `            </a>`  
JSX markup — describes HTML structure React will render.

**L86:** `          </dd>`  
JSX markup — describes HTML structure React will render.

**L87:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L88:** `        <div className="py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L89:** `          <dt className="text-[0.9375rem] text-ink-muted">Phone</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L90:** `          <dd className="mt-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L91:** `            <a href={brand.phoneHref} className="text-[1.0625rem] text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L92:** `              {brand.phoneDisplay}`  
Executable statement: `{brand.phoneDisplay}`

**L93:** `            </a>`  
JSX markup — describes HTML structure React will render.

**L94:** `          </dd>`  
JSX markup — describes HTML structure React will render.

**L95:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L96:** `        <div className="py-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L97:** `          <dt className="text-[0.9375rem] text-ink-muted">Hours</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L98:** `          <dd className="mt-1 text-[1.0625rem] text-ink">Weekdays 08:00 – 17:00 SAST</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L99:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L100:** `      </dl>`  
JSX markup — describes HTML structure React will render.

**L101:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L102:** `  )`  
Executable statement: `)`

**L103:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Home.tsx`

_283 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Marketing landing page (hero, quote ledger, products, docs checklist).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Public; CTAs go to /apply/details (auth required) or product pages.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - RepaymentLedger estimates only -- real loan created after admin approve.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { IdCard, FileText, Landmark, ArrowRight, ArrowUpRight } from 'lucide-react'`  
Import — brings in `lucide-react` so this file can use it.

**L11:** `import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'`  
Import — brings in `@/components/ledger/RepaymentLedger` so this file can use it.

**L12:** `import { accentBtn, IconTile, Panel, SectionLabel } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L13:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L14:** `import { brand } from '@/content/brand'`  
Import — brings in `@/content/brand` so this file can use it.

**L15:** ``  
Blank line — visual spacing.

**L16:** `const products = [`  
Constant/variable `products` — holds a value or React binding.

**L17:** `  {`  
Opens a new code block.

**L18:** `    to: '/products/cash-loan',`  
Executable statement: `to: '/products/cash-loan',`

**L19:** `    title: 'Cash loan',`  
Executable statement: `title: 'Cash loan',`

**L20:** `    meta: 'R500 – R20,000 · 1 to 9 months',`  
Executable statement: `meta: 'R500 – R20,000 · 1 to 9 months',`

**L21:** `    copy: 'Payslip and three months of bank statements.',`  
Executable statement: `copy: 'Payslip and three months of bank statements.',`

**L22:** `    n: '01',`  
Executable statement: `n: '01',`

**L23:** `  },`  
Closes the previous block/object/function.

**L24:** `  {`  
Opens a new code block.

**L25:** `    to: '/products/domestic',`  
Executable statement: `to: '/products/domestic',`

**L26:** `    title: 'Domestic worker loan',`  
Executable statement: `title: 'Domestic worker loan',`

**L27:** `    meta: 'Same amounts · fewer work questions',`  
Executable statement: `meta: 'Same amounts · fewer work questions',`

**L28:** `    copy: 'For wages you can show, even without a formal payslip pack.',`  
Executable statement: `copy: 'For wages you can show, even without a formal payslip pack.',`

**L29:** `    n: '02',`  
Executable statement: `n: '02',`

**L30:** `  },`  
Closes the previous block/object/function.

**L31:** `  {`  
Opens a new code block.

**L32:** `    to: '/products/transfer',`  
Executable statement: `to: '/products/transfer',`

**L33:** `    title: 'Send money',`  
Executable statement: `title: 'Send money',`

**L34:** `    meta: 'Zimbabwe, Mozambique, Lesotho, Botswana',`  
Executable statement: `meta: 'Zimbabwe, Mozambique, Lesotho, Botswana',`

**L35:** `    copy: 'Fee in rand before you pay. Recipient gets the amount you send.',`  
Executable statement: `copy: 'Fee in rand before you pay. Recipient gets the amount you send.…`

**L36:** `    n: '03',`  
Executable statement: `n: '03',`

**L37:** `  },`  
Closes the previous block/object/function.

**L38:** `  {`  
Opens a new code block.

**L39:** `    to: '/products/debt-review',`  
Executable statement: `to: '/products/debt-review',`

**L40:** `    title: 'Debt review',`  
Executable statement: `title: 'Debt review',`

**L41:** `    meta: 'Not a loan',`  
Executable statement: `meta: 'Not a loan',`

**L42:** `    copy: 'Book a conversation if repayments are already too much.',`  
Executable statement: `copy: 'Book a conversation if repayments are already too much.',`

**L43:** `    n: '04',`  
Executable statement: `n: '04',`

**L44:** `  },`  
Closes the previous block/object/function.

**L45:** `]`  
Executable statement: `]`

**L46:** ``  
Blank line — visual spacing.

**L47:** `const steps = [`  
Constant/variable `steps` — holds a value or React binding.

**L48:** `  {`  
Opens a new code block.

**L49:** `    n: '01',`  
Executable statement: `n: '01',`

**L50:** `    title: 'See the monthly amount',`  
Executable statement: `title: 'See the monthly amount',`

**L51:** `    copy: 'Move the quote until the instalment fits the month you actually have.',`  
Executable statement: `copy: 'Move the quote until the instalment fits the month you actually…`

**L52:** `  },`  
Closes the previous block/object/function.

**L53:** `  {`  
Opens a new code block.

**L54:** `    n: '02',`  
Executable statement: `n: '02',`

**L55:** `    title: 'Send the three things we need',`  
Executable statement: `title: 'Send the three things we need',`

**L56:** `    copy: 'ID, latest payslip, three months of statements — each in its own slot.',`  
Executable statement: `copy: 'ID, latest payslip, three months of statements — each in its ow…`

**L57:** `  },`  
Closes the previous block/object/function.

**L58:** `  {`  
Opens a new code block.

**L59:** `    n: '03',`  
Executable statement: `n: '03',`

**L60:** `    title: 'Hear back the next working day',`  
Executable statement: `title: 'Hear back the next working day',`

**L61:** `    copy: 'Most decisions come once those files are in. Keep your phone nearby.',`  
Executable statement: `copy: 'Most decisions come once those files are in. Keep your phone ne…`

**L62:** `  },`  
Closes the previous block/object/function.

**L63:** `]`  
Executable statement: `]`

**L64:** ``  
Blank line — visual spacing.

**L65:** `const docs = [`  
Constant/variable `docs` — holds a value or React binding.

**L66:** `  {`  
Opens a new code block.

**L67:** `    title: 'ID or work permit',`  
Executable statement: `title: 'ID or work permit',`

**L68:** `    copy: 'A clear photo or PDF of your SA ID, passport, or permit.',`  
Executable statement: `copy: 'A clear photo or PDF of your SA ID, passport, or permit.',`

**L69:** `    Icon: IdCard,`  
Executable statement: `Icon: IdCard,`

**L70:** `  },`  
Closes the previous block/object/function.

**L71:** `  {`  
Opens a new code block.

**L72:** `    title: 'Latest payslip',`  
Executable statement: `title: 'Latest payslip',`

**L73:** `    copy: 'The most recent month is enough. One file.',`  
Executable statement: `copy: 'The most recent month is enough. One file.',`

**L74:** `    Icon: FileText,`  
Executable statement: `Icon: FileText,`

**L75:** `  },`  
Closes the previous block/object/function.

**L76:** `  {`  
Opens a new code block.

**L77:** `    title: 'Three bank statements',`  
Executable statement: `title: 'Three bank statements',`

**L78:** `    copy: 'Last three months, each in its own slot.',`  
Executable statement: `copy: 'Last three months, each in its own slot.',`

**L79:** `    Icon: Landmark,`  
Executable statement: `Icon: Landmark,`

**L80:** `  },`  
Closes the previous block/object/function.

**L81:** `]`  
Executable statement: `]`

**L82:** ``  
Blank line — visual spacing.

**L83:** `const ticker = [`  
Constant/variable `ticker` — holds a value or React binding.

**L84:** `  'R500 – R20,000',`  
Executable statement: `'R500 – R20,000',`

**L85:** `  '1–9 month terms',`  
Executable statement: `'1–9 month terms',`

**L86:** `  'Instalment in rand',`  
Executable statement: `'Instalment in rand',`

**L87:** `  'Decision in ~1 day',`  
Executable statement: `'Decision in ~1 day',`

**L88:** `  'SA ID + payslip + statements',`  
Executable statement: `'SA ID + payslip + statements',`

**L89:** `  'No buried rates',`  
Executable statement: `'No buried rates',`

**L90:** `]`  
Executable statement: `]`

**L91:** ``  
Blank line — visual spacing.

**L92:** `export function HomePage() {`  
Defines function `HomePage` — callable unit of UI/logic.

**L93:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L94:** `    <>`  
JSX markup — describes HTML structure React will render.

**L95:** `      <section className="relative overflow-hidden hero-mesh grain text-white">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L96:** `        <p`  
JSX markup — describes HTML structure React will render.

**L97:** `          className="watermark pointer-events-none absolute -right-8 bottom-[-0.2em] hidden selec...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L98:** `          aria-hidden`  
Executable statement: `aria-hidden`

**L99:** `        >`  
JSX markup — describes HTML structure React will render.

**L100:** `          R`  
Executable statement: `R`

**L101:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L102:** ``  
Blank line — visual spacing.

**L103:** `        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:p...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L104:** `          <div>`  
JSX markup — describes HTML structure React will render.

**L105:** `            <p className="hero-copy inline-flex items-center gap-2 text-[0.8125rem] font-semibold...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L106:** `              <span className="live-dot" aria-hidden />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L107:** `              {brand.productName}`  
Executable statement: `{brand.productName}`

**L108:** `            </p>`  
JSX markup — describes HTML structure React will render.

**L109:** `            <h1 className="hero-copy-2 display-xl mt-5 max-w-xl text-balance">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L110:** `              See what you’ll repay{' '}`  
Executable statement: `See what you’ll repay{' '}`

**L111:** `              <span className="text-white/45">before</span> you apply.`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L112:** `            </h1>`  
JSX markup — describes HTML structure React will render.

**L113:** `            <p className="hero-copy-3 mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/70">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L114:** `              Move the amount and term. Monthly instalment, interest, and total show`  
Executable statement: `Move the amount and term. Monthly instalment, interest, and total show`

**L115:** `              in rand — not a rate buried in a footnote.`  
Executable statement: `in rand — not a rate buried in a footnote.`

**L116:** `            </p>`  
JSX markup — describes HTML structure React will render.

**L117:** `            <div className="hero-copy-4 mt-8 flex flex-wrap items-center gap-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L118:** `              <Link`  
JSX markup — describes HTML structure React will render.

**L119:** `                to="/apply/details"`  
Assignment / binding: `to="/apply/details"`

**L120:** `                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-s...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L121:** `              >`  
JSX markup — describes HTML structure React will render.

**L122:** `                Apply`  
Executable statement: `Apply`

**L123:** `                <ArrowUpRight`  
JSX markup — describes HTML structure React will render.

**L124:** `                  size={16}`  
Assignment / binding: `size={16}`

**L125:** `                  strokeWidth={2}`  
Assignment / binding: `strokeWidth={2}`

**L126:** `                  className="transition-transform group-hover:translate-x-0.5 group-hover:-transl...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L127:** `                  aria-hidden`  
Executable statement: `aria-hidden`

**L128:** `                />`  
JSX markup — describes HTML structure React will render.

**L129:** `              </Link>`  
JSX markup — describes HTML structure React will render.

**L130:** `              <a`  
JSX markup — describes HTML structure React will render.

**L131:** `                href="#quote"`  
Assignment / binding: `href="#quote"`

**L132:** `                className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L133:** `              >`  
JSX markup — describes HTML structure React will render.

**L134:** `                Try the quote`  
Executable statement: `Try the quote`

**L135:** `              </a>`  
JSX markup — describes HTML structure React will render.

**L136:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L137:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L138:** ``  
Blank line — visual spacing.

**L139:** `          <div id="quote" className="relative lg:justify-self-end lg:w-full lg:max-w-[28.5rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L140:** `            <div`  
JSX markup — describes HTML structure React will render.

**L141:** `              className="pointer-events-none absolute -inset-3 rounded-lg bg-teal-mid/20 blur-2xl"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L142:** `              aria-hidden`  
Executable statement: `aria-hidden`

**L143:** `            />`  
JSX markup — describes HTML structure React will render.

**L144:** `            <RepaymentLedger showCta featured className="relative" />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L145:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L146:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L147:** ``  
Blank line — visual spacing.

**L148:** `        <div className="relative border-t border-white/10 bg-teal-deep/40">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L149:** `          <div className="overflow-hidden py-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L150:** `            <div className="marquee-track gap-10 px-4 text-[0.8125rem] font-medium tracking-wide ...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L151:** `              {[...ticker, ...ticker].map((item, i) => (`  
Assignment / binding: `{[...ticker, ...ticker].map((item, i) => (`

**L152:** `                <span key={'${item}-${i}'} className="inline-flex items-center gap-10 whitespace-...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L153:** `                  {item}`  
Executable statement: `{item}`

**L154:** `                  <span className="h-1 w-1 rounded-full bg-teal-mid/80" aria-hidden />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L155:** `                </span>`  
JSX markup — describes HTML structure React will render.

**L156:** `              ))}`  
Executable statement: `))}`

**L157:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L158:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L159:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L160:** `      </section>`  
JSX markup — describes HTML structure React will render.

**L161:** ``  
Blank line — visual spacing.

**L162:** `      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L163:** `        <Reveal>`  
JSX markup — describes HTML structure React will render.

**L164:** `          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L165:** `            <div>`  
JSX markup — describes HTML structure React will render.

**L166:** `              <SectionLabel>How it works</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L167:** `              <h2 className="mt-2 max-w-lg text-[1.85rem] font-bold tracking-tight text-ink sm:te...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L168:** `                Three steps. No hunting.`  
Executable statement: `Three steps. No hunting.`

**L169:** `              </h2>`  
JSX markup — describes HTML structure React will render.

**L170:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L171:** `            <p className="max-w-xs text-[0.9375rem] text-ink-muted sm:text-right">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L172:** `              Quote first. Paperwork second. Answer when the files are in.`  
Executable statement: `Quote first. Paperwork second. Answer when the files are in.`

**L173:** `            </p>`  
JSX markup — describes HTML structure React will render.

**L174:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L175:** `        </Reveal>`  
JSX markup — describes HTML structure React will render.

**L176:** `        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L177:** `          {steps.map((step, i) => (`  
Assignment / binding: `{steps.map((step, i) => (`

**L178:** `            <li key={step.n}>`  
JSX markup — describes HTML structure React will render.

**L179:** `              <Reveal delay={i * 90}>`  
JSX markup — describes HTML structure React will render.

**L180:** `                <Panel className="panel-lift relative h-full overflow-hidden p-5 sm:p-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L181:** `                  <div className="accent-bar absolute inset-x-0 top-0" />`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L182:** `                  <p className="step-num text-[2rem] font-semibold leading-none opacity-90">{step...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L183:** `                  <h3 className="mt-6 text-[1.125rem] font-semibold tracking-tight text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L184:** `                    {step.title}`  
Executable statement: `{step.title}`

**L185:** `                  </h3>`  
JSX markup — describes HTML structure React will render.

**L186:** `                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.copy}...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L187:** `                </Panel>`  
JSX markup — describes HTML structure React will render.

**L188:** `              </Reveal>`  
JSX markup — describes HTML structure React will render.

**L189:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L190:** `          ))}`  
Executable statement: `))}`

**L191:** `        </ol>`  
JSX markup — describes HTML structure React will render.

**L192:** `      </section>`  
JSX markup — describes HTML structure React will render.

**L193:** ``  
Blank line — visual spacing.

**L194:** `      <section className="relative border-y border-line bg-white/70 backdrop-blur-sm">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L195:** `        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L196:** `          <Reveal>`  
JSX markup — describes HTML structure React will render.

**L197:** `            <SectionLabel>Products</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L198:** `            <h2 className="mt-2 text-[1.85rem] font-bold tracking-tight text-ink sm:text-[2.35rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L199:** `              What you can do`  
Executable statement: `What you can do`

**L200:** `            </h2>`  
JSX markup — describes HTML structure React will render.

**L201:** `          </Reveal>`  
JSX markup — describes HTML structure React will render.

**L202:** `          <ul className="mt-10">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L203:** `            {products.map((p, i) => (`  
Assignment / binding: `{products.map((p, i) => (`

**L204:** `              <li key={p.to} className="border-b border-line first:border-t">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L205:** `                <Reveal delay={i * 50}>`  
JSX markup — describes HTML structure React will render.

**L206:** `                  <Link`  
JSX markup — describes HTML structure React will render.

**L207:** `                    to={p.to}`  
Assignment / binding: `to={p.to}`

**L208:** `                    className="product-row group flex flex-col gap-3 px-3 py-7 sm:flex-row sm:ite...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L209:** `                  >`  
JSX markup — describes HTML structure React will render.

**L210:** `                    <div className="flex items-start gap-4 sm:gap-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L211:** `                      <span className="font-mono text-[0.875rem] font-semibold text-teal-mid/70">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L212:** `                        {p.n}`  
Executable statement: `{p.n}`

**L213:** `                      </span>`  
JSX markup — describes HTML structure React will render.

**L214:** `                      <div>`  
JSX markup — describes HTML structure React will render.

**L215:** `                        <p className="text-[1.2rem] font-semibold tracking-tight text-ink transit...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L216:** `                          {p.title}`  
Executable statement: `{p.title}`

**L217:** `                        </p>`  
JSX markup — describes HTML structure React will render.

**L218:** `                        <p className="mt-1 max-w-md text-[0.9375rem] text-ink-muted">{p.copy}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L219:** `                      </div>`  
JSX markup — describes HTML structure React will render.

**L220:** `                    </div>`  
JSX markup — describes HTML structure React will render.

**L221:** `                    <p className="flex shrink-0 items-center gap-2 pl-10 text-[0.875rem] font-med...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L222:** `                      {p.meta}`  
Executable statement: `{p.meta}`

**L223:** `                      <ArrowRight`  
JSX markup — describes HTML structure React will render.

**L224:** `                        size={16}`  
Assignment / binding: `size={16}`

**L225:** `                        strokeWidth={1.75}`  
Assignment / binding: `strokeWidth={1.75}`

**L226:** `                        className="transition-transform group-hover:translate-x-1"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L227:** `                        aria-hidden`  
Executable statement: `aria-hidden`

**L228:** `                      />`  
JSX markup — describes HTML structure React will render.

**L229:** `                    </p>`  
JSX markup — describes HTML structure React will render.

**L230:** `                  </Link>`  
JSX markup — describes HTML structure React will render.

**L231:** `                </Reveal>`  
JSX markup — describes HTML structure React will render.

**L232:** `              </li>`  
JSX markup — describes HTML structure React will render.

**L233:** `            ))}`  
Executable statement: `))}`

**L234:** `          </ul>`  
JSX markup — describes HTML structure React will render.

**L235:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L236:** `      </section>`  
JSX markup — describes HTML structure React will render.

**L237:** ``  
Blank line — visual spacing.

**L238:** `      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L239:** `        <Reveal>`  
JSX markup — describes HTML structure React will render.

**L240:** `          <SectionLabel>To apply</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L241:** `          <h2 className="mt-2 max-w-xl text-[1.85rem] font-bold tracking-tight text-ink sm:text-[...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L242:** `            Three documents. Then we can decide.`  
Executable statement: `Three documents. Then we can decide.`

**L243:** `          </h2>`  
JSX markup — describes HTML structure React will render.

**L244:** `        </Reveal>`  
JSX markup — describes HTML structure React will render.

**L245:** `        <ul className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L246:** `          {docs.map((doc, i) => (`  
Assignment / binding: `{docs.map((doc, i) => (`

**L247:** `            <li key={doc.title}>`  
JSX markup — describes HTML structure React will render.

**L248:** `              <Reveal delay={i * 90}>`  
JSX markup — describes HTML structure React will render.

**L249:** `                <Panel className="panel-lift group h-full p-5 sm:p-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L250:** `                  <IconTile size="lg" className="transition-transform duration-300 group-hover:sc...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L251:** `                    <doc.Icon size={22} strokeWidth={1.5} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L252:** `                  </IconTile>`  
JSX markup — describes HTML structure React will render.

**L253:** `                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{doc.title}</h3>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L254:** `                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{doc.copy}</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L255:** `                </Panel>`  
JSX markup — describes HTML structure React will render.

**L256:** `              </Reveal>`  
JSX markup — describes HTML structure React will render.

**L257:** `            </li>`  
JSX markup — describes HTML structure React will render.

**L258:** `          ))}`  
Executable statement: `))}`

**L259:** `        </ul>`  
JSX markup — describes HTML structure React will render.

**L260:** `      </section>`  
JSX markup — describes HTML structure React will render.

**L261:** ``  
Blank line — visual spacing.

**L262:** `      <section className="cta-band text-white">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L263:** `        <Reveal className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L264:** `          <SectionLabel className="text-white/45">Ready</SectionLabel>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L265:** `          <h2 className="mt-3 max-w-xl text-[2rem] font-bold leading-tight tracking-tight sm:text...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L266:** `            If the monthly amount works, apply from your phone.`  
Executable statement: `If the monthly amount works, apply from your phone.`

**L267:** `          </h2>`  
JSX markup — describes HTML structure React will render.

**L268:** `          <p className="mt-4 max-w-md text-[1rem] text-white/60">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L269:** `            One sitting. No account to start. You can go back and change a step`  
Executable statement: `One sitting. No account to start. You can go back and change a step`

**L270:** `            before you submit.`  
Executable statement: `before you submit.`

**L271:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L272:** `          <Link`  
JSX markup — describes HTML structure React will render.

**L273:** `            to="/apply/details"`  
Assignment / binding: `to="/apply/details"`

**L274:** `            className={'${accentBtn} mt-8 inline-flex gap-2 bg-teal-mid hover:bg-teal'}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L275:** `          >`  
JSX markup — describes HTML structure React will render.

**L276:** `            Start application`  
Executable statement: `Start application`

**L277:** `            <ArrowUpRight size={16} strokeWidth={2} aria-hidden />`  
JSX markup — describes HTML structure React will render.

**L278:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L279:** `        </Reveal>`  
JSX markup — describes HTML structure React will render.

**L280:** `      </section>`  
JSX markup — describes HTML structure React will render.

**L281:** `    </>`  
JSX markup — describes HTML structure React will render.

**L282:** `  )`  
Executable statement: `)`

**L283:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Legal.tsx`

_74 lines_

**L1:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L2:** `import { PageIntro } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L3:** `import { brand, legalEntityLine } from '@/content/brand'`  
Import — brings in `@/content/brand` so this file can use it.

**L4:** ``  
Blank line — visual spacing.

**L5:** `export function PrivacyPage() {`  
Defines function `PrivacyPage` — callable unit of UI/logic.

**L6:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L7:** `    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L8:** `      <PageIntro kicker={brand.productName} title="Privacy Statement">`  
JSX markup — describes HTML structure React will render.

**L9:** `        How {brand.productName} handles personal information when you use this site.`  
Executable statement: `How {brand.productName} handles personal information when you use this…`

**L10:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L11:** `      <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L12:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L13:** `          {brand.productName} is operated by {legalEntityLine()}. We use the details you`  
Executable statement: `{brand.productName} is operated by {legalEntityLine()}. We use the det…`

**L14:** `          submit only to assess and service a loan application, answer contact requests,`  
Executable statement: `submit only to assess and service a loan application, answer contact r…`

**L15:** `          and keep your account secure.`  
Executable statement: `and keep your account secure.`

**L16:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L17:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L18:** `          We do not sell your information. Documents you upload (ID, payslip, bank`  
Executable statement: `We do not sell your information. Documents you upload (ID, payslip, ba…`

**L19:** `          statements) are kept for underwriting and compliance and are not shared outside`  
Executable statement: `statements) are kept for underwriting and compliance and are not share…`

**L20:** `          that purpose except where the law requires it.`  
Executable statement: `that purpose except where the law requires it.`

**L21:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L22:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L23:** `          This page is a portfolio placeholder. A live credit provider would publish a`  
Executable statement: `This page is a portfolio placeholder. A live credit provider would pub…`

**L24:** `          full POPIA notice and contact details for their information officer here.`  
Executable statement: `full POPIA notice and contact details for their information officer he…`

**L25:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L26:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L27:** `          Questions? Use the{' '}`  
Executable statement: `Questions? Use the{' '}`

**L28:** `          <Link to="/contact" className="font-semibold text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L29:** `            contact page`  
Executable statement: `contact page`

**L30:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L31:** `          .`  
Executable statement: `.`

**L32:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L33:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L34:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L35:** `  )`  
Executable statement: `)`

**L36:** `}`  
Closes the previous block/object/function.

**L37:** ``  
Blank line — visual spacing.

**L38:** `export function TermsPage() {`  
Defines function `TermsPage` — callable unit of UI/logic.

**L39:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L40:** `    <div className="page-cascade mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L41:** `      <PageIntro kicker={brand.productName} title="Terms & Conditions">`  
JSX markup — describes HTML structure React will render.

**L42:** `        Site use terms for {brand.productName}.`  
Executable statement: `Site use terms for {brand.productName}.`

**L43:** `      </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L44:** `      <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L45:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L46:** `          By using this website you agree that quotes and application forms are`  
Executable statement: `By using this website you agree that quotes and application forms are`

**L47:** `          illustrative until a licensed credit provider issues a binding offer.`  
Executable statement: `illustrative until a licensed credit provider issues a binding offer.`

**L48:** `          {brand.productName} is a product of {brand.legalName} (reg no{' '}`  
Executable statement: `{brand.productName} is a product of {brand.legalName} (reg no{' '}`

**L49:** `          {brand.registrationNumber}).`  
Executable statement: `{brand.registrationNumber}).`

**L50:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L51:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L52:** `          Loan terms shown on product pages and in the application flow describe the`  
Executable statement: `Loan terms shown on product pages and in the application flow describe…`

**L53:** `          intended product. They are not a credit agreement until you sign one after`  
Executable statement: `intended product. They are not a credit agreement until you sign one a…`

**L54:** `          approval.`  
Executable statement: `approval.`

**L55:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L56:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L57:** `          This site is a portfolio frontend. Live lending in South Africa needs NCR`  
Executable statement: `This site is a portfolio frontend. Live lending in South Africa needs …`

**L58:** `          credit-provider and FSP registration first.`  
Executable statement: `credit-provider and FSP registration first.`

**L59:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L60:** `        <p>`  
JSX markup — describes HTML structure React will render.

**L61:** `          For application-specific terms, see the{' '}`  
Executable statement: `For application-specific terms, see the{' '}`

**L62:** `          <Link to="/apply/terms" className="font-semibold text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L63:** `            loan terms step`  
Executable statement: `loan terms step`

**L64:** `          </Link>{' '}`  
JSX markup — describes HTML structure React will render.

**L65:** `          in the apply flow, or read the{' '}`  
Executable statement: `in the apply flow, or read the{' '}`

**L66:** `          <Link to="/faq" className="font-semibold text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L67:** `            FAQ`  
Executable statement: `FAQ`

**L68:** `          </Link>`  
JSX markup — describes HTML structure React will render.

**L69:** `          .`  
Executable statement: `.`

**L70:** `        </p>`  
JSX markup — describes HTML structure React will render.

**L71:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L72:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L73:** `  )`  
Executable statement: `)`

**L74:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Login.tsx`

_110 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Sign-in form.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Submits via apiClient.login -> POST /api/auth/login (AuthenticationController).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - On success: authStore.setAuth -> navigate to ?next or /dashboard.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { useForm } from 'react-hook-form'`  
Import — brings in `react-hook-form` so this file can use it.

**L11:** `import { Link, useNavigate, useSearchParams } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L12:** `import { login } from '@/lib/apiClient'`  
Import — brings in `@/lib/apiClient` so this file can use it.

**L13:** `import { useAuthStore } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L14:** `import { BrandMark, Button, Input, PageIntro, Panel } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L15:** `import { brand } from '@/content/brand'`  
Import — brings in `@/content/brand` so this file can use it.

**L16:** ``  
Blank line — visual spacing.

**L17:** `export function LoginPage() {`  
Defines function `LoginPage` — callable unit of UI/logic.

**L18:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L19:** `  const [searchParams] = useSearchParams()`  
Constant/variable `?` — holds a value or React binding.

**L20:** `  const setAuth = useAuthStore((s) => s.setAuth)`  
Constant/variable `setAuth` — holds a value or React binding.

**L21:** `  const [error, setError] = useState<string | null>(null)`  
Constant/variable `?` — holds a value or React binding.

**L22:** `  const [isLoading, setIsLoading] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L23:** ``  
Blank line — visual spacing.

**L24:** `  const { register, handleSubmit } = useForm({`  
Constant/variable `?` — holds a value or React binding.

**L25:** `    defaultValues: { email: '', password: '' },`  
Executable statement: `defaultValues: { email: '', password: '' },`

**L26:** `  })`  
Closes the previous block/object/function.

**L27:** ``  
Blank line — visual spacing.

**L28:** `  const onSubmit = async (values: { email: string; password: string }) => {`  
Constant/variable `onSubmit` — holds a value or React binding.

**L29:** `    setIsLoading(true)`  
Executable statement: `setIsLoading(true)`

**L30:** `    setError(null)`  
Executable statement: `setError(null)`

**L31:** `    try {`  
Try block — attempt work that might throw; catch handles failures.

**L32:** `      const res = await login(values.email, values.password)`  
Constant/variable `res` — holds a value or React binding.

**L33:** `      setAuth(res.accessToken, res.user)`  
Executable statement: `setAuth(res.accessToken, res.user)`

**L34:** `      const next = searchParams.get('next') ?? '/dashboard'`  
Constant/variable `next` — holds a value or React binding.

**L35:** `      navigate(next)`  
React Router navigation — changes the URL/page without a full reload.

**L36:** `    } catch {`  
Closes the previous block/object/function.

**L37:** `      setError('Invalid email or password')`  
Executable statement: `setError('Invalid email or password')`

**L38:** `    } finally {`  
Closes the previous block/object/function.

**L39:** `      setIsLoading(false)`  
Executable statement: `setIsLoading(false)`

**L40:** `    }`  
Closes the previous block/object/function.

**L41:** `  }`  
Closes the previous block/object/function.

**L42:** ``  
Blank line — visual spacing.

**L43:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L44:** `    <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L45:** `      <aside className="relative hidden overflow-hidden rounded-md hero-mesh grain p-8 text-white...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L46:** `        <BrandMark inverse />`  
JSX markup — describes HTML structure React will render.

**L47:** `        <div>`  
JSX markup — describes HTML structure React will render.

**L48:** `          <p className="font-mono text-[0.75rem] uppercase tracking-wider text-white/45">Account</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L49:** `          <p className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L50:** `            Your loans, repayments, and documents — in one place.`  
Executable statement: `Your loans, repayments, and documents — in one place.`

**L51:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L52:** `          <p className="mt-3 text-[0.9375rem] text-white/65">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L53:** `            {brand.productName} keeps the numbers in rand, on the page.`  
Executable statement: `{brand.productName} keeps the numbers in rand, on the page.`

**L54:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L55:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L56:** `        <p className="font-mono text-[0.75rem] text-white/40">Secure sign-in</p>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L57:** `      </aside>`  
JSX markup — describes HTML structure React will render.

**L58:** ``  
Blank line — visual spacing.

**L59:** `      <div className="lg:flex lg:items-center">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L60:** `        <div className="w-full lg:pl-0">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L61:** `          <div className="mb-8 lg:hidden">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L62:** `            <BrandMark />`  
JSX markup — describes HTML structure React will render.

**L63:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L64:** `          <Panel className="p-6 sm:p-8 lg:rounded-l-none lg:border-l-0">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L65:** `            <PageIntro title="Welcome back">`  
JSX markup — describes HTML structure React will render.

**L66:** `              Sign in to manage your loans and repayments.`  
Executable statement: `Sign in to manage your loans and repayments.`

**L67:** `            </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L68:** ``  
Blank line — visual spacing.

**L69:** `            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">`  
React Hook Form — wires inputs, validation, and submit handlers.

**L70:** `              {error ? (`  
Executable statement: `{error ? (`

**L71:** `                <div`  
JSX markup — describes HTML structure React will render.

**L72:** `                  className="rounded-sm bg-rust-soft px-3 py-2.5 text-[0.875rem] text-rust"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L73:** `                  role="alert"`  
Assignment / binding: `role="alert"`

**L74:** `                >`  
JSX markup — describes HTML structure React will render.

**L75:** `                  {error}`  
Executable statement: `{error}`

**L76:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L77:** `              ) : null}`  
Executable statement: `) : null}`

**L78:** ``  
Blank line — visual spacing.

**L79:** `              <div className="space-y-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L80:** `                <Input`  
JSX markup — describes HTML structure React will render.

**L81:** `                  label="Email address"`  
Assignment / binding: `label="Email address"`

**L82:** `                  type="email"`  
Assignment / binding: `type="email"`

**L83:** `                  {...register('email', { required: true })}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L84:** `                  autoComplete="email"`  
Assignment / binding: `autoComplete="email"`

**L85:** `                />`  
JSX markup — describes HTML structure React will render.

**L86:** `                <Input`  
JSX markup — describes HTML structure React will render.

**L87:** `                  label="Password"`  
Assignment / binding: `label="Password"`

**L88:** `                  type="password"`  
Assignment / binding: `type="password"`

**L89:** `                  {...register('password', { required: true })}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L90:** `                  autoComplete="current-password"`  
Assignment / binding: `autoComplete="current-password"`

**L91:** `                />`  
JSX markup — describes HTML structure React will render.

**L92:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L93:** ``  
Blank line — visual spacing.

**L94:** `              <Button type="submit" className="w-full" disabled={isLoading}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L95:** `                {isLoading ? 'Signing in…' : 'Sign in'}`  
Executable statement: `{isLoading ? 'Signing in…' : 'Sign in'}`

**L96:** `              </Button>`  
JSX markup — describes HTML structure React will render.

**L97:** ``  
Blank line — visual spacing.

**L98:** `              <p className="text-center text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L99:** `                Don&apos;t have an account?{' '}`  
Executable statement: `Don&apos;t have an account?{' '}`

**L100:** `                <Link to="/register" className="font-semibold text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L101:** `                  Register here`  
Executable statement: `Register here`

**L102:** `                </Link>`  
JSX markup — describes HTML structure React will render.

**L103:** `              </p>`  
JSX markup — describes HTML structure React will render.

**L104:** `            </form>`  
JSX markup — describes HTML structure React will render.

**L105:** `          </Panel>`  
JSX markup — describes HTML structure React will render.

**L106:** `        </div>`  
JSX markup — describes HTML structure React will render.

**L107:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L108:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L109:** `  )`  
Executable statement: `)`

**L110:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Products.tsx`

_119 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Cash loan and domestic-worker product detail pages.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Linked from Home product rows; Apply CTA -> /apply/details.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Quote uses RepaymentLedger / loanCalc (not an API until apply submit).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L10:** `import { PageIntro, accentBtn, Panel, SectionLabel } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L11:** `import { RepaymentLedger } from '@/components/ledger/RepaymentLedger'`  
Import — brings in `@/components/ledger/RepaymentLedger` so this file can use it.

**L12:** `import { useApplicationStore } from '@/store/applicationStore'`  
Import — brings in `@/store/applicationStore` so this file can use it.

**L13:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L14:** ``  
Blank line — visual spacing.

**L15:** `type ProductPageProps = {`  
TypeScript type — describes the shape of data (compile-time only).

**L16:** `  title: string`  
Executable statement: `title: string`

**L17:** `  kicker: string`  
Executable statement: `kicker: string`

**L18:** `  summary: string`  
Executable statement: `summary: string`

**L19:** `  requirements: string[]`  
Executable statement: `requirements: string[]`

**L20:** `  ctaTo: string`  
Executable statement: `ctaTo: string`

**L21:** `  ctaLabel: string`  
Executable statement: `ctaLabel: string`

**L22:** `  showLedger?: boolean`  
Executable statement: `showLedger?: boolean`

**L23:** `  onStart?: () => void`  
Assignment / binding: `onStart?: () => void`

**L24:** `}`  
Closes the previous block/object/function.

**L25:** ``  
Blank line — visual spacing.

**L26:** `function ProductShell({`  
Defines function `ProductShell` — callable unit of UI/logic.

**L27:** `  title,`  
Executable statement: `title,`

**L28:** `  kicker,`  
Executable statement: `kicker,`

**L29:** `  summary,`  
Executable statement: `summary,`

**L30:** `  requirements,`  
Executable statement: `requirements,`

**L31:** `  ctaTo,`  
Executable statement: `ctaTo,`

**L32:** `  ctaLabel,`  
Executable statement: `ctaLabel,`

**L33:** `  showLedger,`  
Executable statement: `showLedger,`

**L34:** `  onStart,`  
Executable statement: `onStart,`

**L35:** `}: ProductPageProps) {`  
Closes the previous block/object/function.

**L36:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L37:** `    <div className="page-cascade mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L38:** `      <p className="text-[0.9375rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L39:** `        <Link to="/" className="hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L40:** `          Home`  
Executable statement: `Home`

**L41:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L42:** `        <span aria-hidden className="mx-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L43:** `          /`  
Executable statement: `/`

**L44:** `        </span>`  
JSX markup — describes HTML structure React will render.

**L45:** `        {title}`  
Executable statement: `{title}`

**L46:** `      </p>`  
JSX markup — describes HTML structure React will render.

**L47:** ``  
Blank line — visual spacing.

**L48:** `      <Reveal className="mt-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L49:** `        <PageIntro kicker={kicker} title={title}>`  
JSX markup — describes HTML structure React will render.

**L50:** `          {summary}`  
Executable statement: `{summary}`

**L51:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L52:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L53:** ``  
Blank line — visual spacing.

**L54:** `      <div className="mt-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L55:** `        <Link`  
JSX markup — describes HTML structure React will render.

**L56:** `          to={ctaTo}`  
Assignment / binding: `to={ctaTo}`

**L57:** `          onClick={onStart}`  
Assignment / binding: `onClick={onStart}`

**L58:** `          className={accentBtn}`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L59:** `        >`  
JSX markup — describes HTML structure React will render.

**L60:** `          {ctaLabel}`  
Executable statement: `{ctaLabel}`

**L61:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L62:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L63:** ``  
Blank line — visual spacing.

**L64:** `      <Reveal className={'mt-12 grid gap-10 ${showLedger ? 'lg:grid-cols-2' : 'max-w-2xl'}'}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L65:** `        <Panel className="p-5 sm:p-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L66:** `          <SectionLabel>What you need</SectionLabel>`  
JSX markup — describes HTML structure React will render.

**L67:** `          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L68:** `            {requirements.map((r) => (`  
Assignment / binding: `{requirements.map((r) => (`

**L69:** `              <li key={r}>{r}</li>`  
JSX markup — describes HTML structure React will render.

**L70:** `            ))}`  
Executable statement: `))}`

**L71:** `          </ul>`  
JSX markup — describes HTML structure React will render.

**L72:** `        </Panel>`  
JSX markup — describes HTML structure React will render.

**L73:** `        {showLedger ? <RepaymentLedger showCta ctaTo={ctaTo} /> : null}`  
Assignment / binding: `{showLedger ? <RepaymentLedger showCta ctaTo={ctaTo} /> : null}`

**L74:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L75:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L76:** `  )`  
Executable statement: `)`

**L77:** `}`  
Closes the previous block/object/function.

**L78:** ``  
Blank line — visual spacing.

**L79:** `export function CashLoanPage() {`  
Defines function `CashLoanPage` — callable unit of UI/logic.

**L80:** `  const setProduct = useApplicationStore((s) => s.setProduct)`  
Constant/variable `setProduct` — holds a value or React binding.

**L81:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L82:** `    <ProductShell`  
JSX markup — describes HTML structure React will render.

**L83:** `      kicker="Cash loan"`  
Assignment / binding: `kicker="Cash loan"`

**L84:** `      title="Borrow between R500 and R20,000"`  
Assignment / binding: `title="Borrow between R500 and R20,000"`

**L85:** `      summary="Pay it back over 1 to 9 months. The quote on this page is the same one you’ll see ...`  
Assignment / binding: `summary="Pay it back over 1 to 9 months. The quote on this page is the…`

**L86:** `      requirements={[`  
Assignment / binding: `requirements={[`

**L87:** `        'South African adult with a valid ID',`  
Executable statement: `'South African adult with a valid ID',`

**L88:** `        'Latest payslip or other proof of income',`  
Executable statement: `'Latest payslip or other proof of income',`

**L89:** `        'Three months of bank statements',`  
Executable statement: `'Three months of bank statements',`

**L90:** `        'A mobile number and email we can reach',`  
Executable statement: `'A mobile number and email we can reach',`

**L91:** `      ]}`  
Executable statement: `]}`

**L92:** `      ctaTo="/apply/details"`  
Assignment / binding: `ctaTo="/apply/details"`

**L93:** `      ctaLabel="Start application"`  
Assignment / binding: `ctaLabel="Start application"`

**L94:** `      showLedger`  
Executable statement: `showLedger`

**L95:** `      onStart={() => setProduct('cash')}`  
Assignment / binding: `onStart={() => setProduct('cash')}`

**L96:** `    />`  
JSX markup — describes HTML structure React will render.

**L97:** `  )`  
Executable statement: `)`

**L98:** `}`  
Closes the previous block/object/function.

**L99:** ``  
Blank line — visual spacing.

**L100:** `export function DomesticLoanPage() {`  
Defines function `DomesticLoanPage` — callable unit of UI/logic.

**L101:** `  const setProduct = useApplicationStore((s) => s.setProduct)`  
Constant/variable `setProduct` — holds a value or React binding.

**L102:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L103:** `    <ProductShell`  
JSX markup — describes HTML structure React will render.

**L104:** `      kicker="Domestic worker loan"`  
Assignment / binding: `kicker="Domestic worker loan"`

**L105:** `      title="A shorter form if you work in someone’s home"`  
Assignment / binding: `title="A shorter form if you work in someone’s home"`

**L106:** `      summary="Same loan range. Fewer employment questions. Defaults sit at amounts people in thi...`  
Assignment / binding: `summary="Same loan range. Fewer employment questions. Defaults sit at …`

**L107:** `      requirements={[`  
Assignment / binding: `requirements={[`

**L108:** `        'Valid SA ID or work permit',`  
Executable statement: `'Valid SA ID or work permit',`

**L109:** `        'Employer name and how you are paid',`  
Executable statement: `'Employer name and how you are paid',`

**L110:** `        'Bank statements if you have them',`  
Executable statement: `'Bank statements if you have them',`

**L111:** `        'A phone number we can call',`  
Executable statement: `'A phone number we can call',`

**L112:** `      ]}`  
Executable statement: `]}`

**L113:** `      ctaTo="/apply/details"`  
Assignment / binding: `ctaTo="/apply/details"`

**L114:** `      ctaLabel="Start application"`  
Assignment / binding: `ctaLabel="Start application"`

**L115:** `      showLedger`  
Executable statement: `showLedger`

**L116:** `      onStart={() => setProduct('domestic')}`  
Assignment / binding: `onStart={() => setProduct('domestic')}`

**L117:** `    />`  
JSX markup — describes HTML structure React will render.

**L118:** `  )`  
Executable statement: `)`

**L119:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Register.tsx`

_97 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Create account form.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - apiClient.register -> POST /api/auth/register -> AuthenticationService.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Then authStore.setAuth and navigate to /dashboard (same token path as login).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { useForm } from 'react-hook-form'`  
Import — brings in `react-hook-form` so this file can use it.

**L11:** `import { Link, useNavigate } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L12:** `import { register as apiRegister } from '@/lib/apiClient'`  
Import — brings in `@/lib/apiClient` so this file can use it.

**L13:** `import { useAuthStore } from '@/store/authStore'`  
Import — brings in `@/store/authStore` so this file can use it.

**L14:** `import { BrandMark, Button, Input, PageIntro, Panel } from '@/components/ui/primitives'`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L15:** ``  
Blank line — visual spacing.

**L16:** `export function RegisterPage() {`  
Defines function `RegisterPage` — callable unit of UI/logic.

**L17:** `  const navigate = useNavigate()`  
Constant/variable `navigate` — holds a value or React binding.

**L18:** `  const setAuth = useAuthStore((s) => s.setAuth)`  
Constant/variable `setAuth` — holds a value or React binding.

**L19:** `  const [error, setError] = useState<string | null>(null)`  
Constant/variable `?` — holds a value or React binding.

**L20:** `  const [isLoading, setIsLoading] = useState(false)`  
Constant/variable `?` — holds a value or React binding.

**L21:** ``  
Blank line — visual spacing.

**L22:** `  const { register, handleSubmit } = useForm({`  
Constant/variable `?` — holds a value or React binding.

**L23:** `    defaultValues: {`  
Executable statement: `defaultValues: {`

**L24:** `      firstName: '',`  
Executable statement: `firstName: '',`

**L25:** `      lastName: '',`  
Executable statement: `lastName: '',`

**L26:** `      email: '',`  
Executable statement: `email: '',`

**L27:** `      phone: '',`  
Executable statement: `phone: '',`

**L28:** `      password: '',`  
Executable statement: `password: '',`

**L29:** `    },`  
Closes the previous block/object/function.

**L30:** `  })`  
Closes the previous block/object/function.

**L31:** ``  
Blank line — visual spacing.

**L32:** `  const onSubmit = async (values: {`  
Constant/variable `onSubmit` — holds a value or React binding.

**L33:** `    firstName: string`  
Executable statement: `firstName: string`

**L34:** `    lastName: string`  
Executable statement: `lastName: string`

**L35:** `    email: string`  
Executable statement: `email: string`

**L36:** `    phone: string`  
Executable statement: `phone: string`

**L37:** `    password: string`  
Executable statement: `password: string`

**L38:** `  }) => {`  
Closes the previous block/object/function.

**L39:** `    setIsLoading(true)`  
Executable statement: `setIsLoading(true)`

**L40:** `    setError(null)`  
Executable statement: `setError(null)`

**L41:** `    try {`  
Try block — attempt work that might throw; catch handles failures.

**L42:** `      const res = await apiRegister(values)`  
Constant/variable `res` — holds a value or React binding.

**L43:** `      setAuth(res.accessToken, res.user)`  
Executable statement: `setAuth(res.accessToken, res.user)`

**L44:** `      navigate('/dashboard')`  
React Router navigation — changes the URL/page without a full reload.

**L45:** `    } catch {`  
Closes the previous block/object/function.

**L46:** `      setError('Registration failed. Please try again.')`  
Executable statement: `setError('Registration failed. Please try again.')`

**L47:** `    } finally {`  
Closes the previous block/object/function.

**L48:** `      setIsLoading(false)`  
Executable statement: `setIsLoading(false)`

**L49:** `    }`  
Closes the previous block/object/function.

**L50:** `  }`  
Closes the previous block/object/function.

**L51:** ``  
Blank line — visual spacing.

**L52:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L53:** `    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-20">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L54:** `      <div className="mb-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L55:** `        <BrandMark />`  
JSX markup — describes HTML structure React will render.

**L56:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L57:** `      <Panel className="p-6 sm:p-8">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L58:** `        <PageIntro title="Create your account">`  
JSX markup — describes HTML structure React will render.

**L59:** `          Start your application in seconds.`  
Executable statement: `Start your application in seconds.`

**L60:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L61:** ``  
Blank line — visual spacing.

**L62:** `        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">`  
React Hook Form — wires inputs, validation, and submit handlers.

**L63:** `          {error ? (`  
Executable statement: `{error ? (`

**L64:** `            <div className="rounded-sm bg-rust-soft px-3 py-2.5 text-[0.875rem] text-rust" role="...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L65:** `              {error}`  
Executable statement: `{error}`

**L66:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L67:** `          ) : null}`  
Executable statement: `) : null}`

**L68:** ``  
Blank line — visual spacing.

**L69:** `          <div className="space-y-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L70:** `            <div className="grid grid-cols-2 gap-4">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L71:** `              <Input label="First name" {...register('firstName', { required: true })} />`  
React Hook Form — wires inputs, validation, and submit handlers.

**L72:** `              <Input label="Surname" {...register('lastName', { required: true })} />`  
React Hook Form — wires inputs, validation, and submit handlers.

**L73:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L74:** `            <Input label="Email" type="email" {...register('email', { required: true })} />`  
React Hook Form — wires inputs, validation, and submit handlers.

**L75:** `            <Input label="Phone" type="tel" {...register('phone', { required: true })} />`  
React Hook Form — wires inputs, validation, and submit handlers.

**L76:** `            <Input`  
JSX markup — describes HTML structure React will render.

**L77:** `              label="Password"`  
Assignment / binding: `label="Password"`

**L78:** `              type="password"`  
Assignment / binding: `type="password"`

**L79:** `              {...register('password', { required: true })}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L80:** `            />`  
JSX markup — describes HTML structure React will render.

**L81:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L82:** ``  
Blank line — visual spacing.

**L83:** `          <Button type="submit" className="w-full" disabled={isLoading}>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L84:** `            {isLoading ? 'Creating account…' : 'Create account'}`  
Executable statement: `{isLoading ? 'Creating account…' : 'Create account'}`

**L85:** `          </Button>`  
JSX markup — describes HTML structure React will render.

**L86:** ``  
Blank line — visual spacing.

**L87:** `          <p className="text-center text-[0.875rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L88:** `            Already have an account?{' '}`  
Executable statement: `Already have an account?{' '}`

**L89:** `            <Link to="/login" className="font-semibold text-teal hover:underline">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L90:** `              Sign in`  
Executable statement: `Sign in`

**L91:** `            </Link>`  
JSX markup — describes HTML structure React will render.

**L92:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L93:** `        </form>`  
JSX markup — describes HTML structure React will render.

**L94:** `      </Panel>`  
JSX markup — describes HTML structure React will render.

**L95:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L96:** `  )`  
Executable statement: `)`

**L97:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/pages/Transfer.tsx`

_257 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Cross-border transfer form (public).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - createTransfer -> POST /api/transfers (TransferController, permitAll).`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - Fee estimate also uses loanCalc.calculateTransferFee locally.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ``  
Blank line — visual spacing.

**L9:** `import { useMemo, useState } from 'react'`  
Import — brings in `react` so this file can use it.

**L10:** `import { useForm } from 'react-hook-form'`  
Import — brings in `react-hook-form` so this file can use it.

**L11:** `import { zodResolver } from '@hookform/resolvers/zod'`  
Import — brings in `@hookform/resolvers/zod` so this file can use it.

**L12:** `import { transferSchema, type TransferForm } from '@/lib/validation'`  
Import — brings in `@/lib/validation` so this file can use it.

**L13:** `import { calculateTransferFee } from '@/lib/loanCalc'`  
Import — brings in `@/lib/loanCalc` so this file can use it.

**L14:** `import { formatRand, cn } from '@/lib/format'`  
Import — brings in `@/lib/format` so this file can use it.

**L15:** `import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'`  
Import — brings in `@/hooks/useAnimatedNumber` so this file can use it.

**L16:** `import { Button, Input, Select, PageIntro, Panel, softChipActive, softChipIdle } from '@/componen...`  
Import — brings in `@/components/ui/primitives` so this file can use it.

**L17:** `import { Link } from 'react-router-dom'`  
Import — brings in `react-router-dom` so this file can use it.

**L18:** `import { Reveal } from '@/components/ui/Reveal'`  
Import — brings in `@/components/ui/Reveal` so this file can use it.

**L19:** ``  
Blank line — visual spacing.

**L20:** `const countries = [`  
Constant/variable `countries` — holds a value or React binding.

**L21:** `  { code: 'ZW' as const, label: 'Zimbabwe' },`  
Executable statement: `{ code: 'ZW' as const, label: 'Zimbabwe' },`

**L22:** `  { code: 'MZ' as const, label: 'Mozambique' },`  
Executable statement: `{ code: 'MZ' as const, label: 'Mozambique' },`

**L23:** `  { code: 'LS' as const, label: 'Lesotho' },`  
Executable statement: `{ code: 'LS' as const, label: 'Lesotho' },`

**L24:** `  { code: 'BW' as const, label: 'Botswana' },`  
Executable statement: `{ code: 'BW' as const, label: 'Botswana' },`

**L25:** `]`  
Executable statement: `]`

**L26:** ``  
Blank line — visual spacing.

**L27:** `const STEPS = ['You', 'Recipient', 'Amount']`  
Constant/variable `STEPS` — holds a value or React binding.

**L28:** ``  
Blank line — visual spacing.

**L29:** `export function TransferPage() {`  
Defines function `TransferPage` — callable unit of UI/logic.

**L30:** `  const [step, setStep] = useState(1)`  
Constant/variable `?` — holds a value or React binding.

**L31:** `  const [doneRef, setDoneRef] = useState<string | null>(null)`  
Constant/variable `?` — holds a value or React binding.

**L32:** ``  
Blank line — visual spacing.

**L33:** `  const {`  
Executable statement: `const {`

**L34:** `    register,`  
Executable statement: `register,`

**L35:** `    handleSubmit,`  
Executable statement: `handleSubmit,`

**L36:** `    watch,`  
Executable statement: `watch,`

**L37:** `    setValue,`  
Executable statement: `setValue,`

**L38:** `    formState: { errors },`  
Executable statement: `formState: { errors },`

**L39:** `  } = useForm<TransferForm>({`  
Closes the previous block/object/function.

**L40:** `    resolver: zodResolver(transferSchema),`  
Executable statement: `resolver: zodResolver(transferSchema),`

**L41:** `    defaultValues: {`  
Executable statement: `defaultValues: {`

**L42:** `      senderName: '',`  
Executable statement: `senderName: '',`

**L43:** `      senderPhone: '',`  
Executable statement: `senderPhone: '',`

**L44:** `      recipientName: '',`  
Executable statement: `recipientName: '',`

**L45:** `      recipientPhone: '',`  
Executable statement: `recipientPhone: '',`

**L46:** `      country: 'ZW',`  
Executable statement: `country: 'ZW',`

**L47:** `      amount: 2000,`  
Executable statement: `amount: 2000,`

**L48:** `    },`  
Closes the previous block/object/function.

**L49:** `  })`  
Closes the previous block/object/function.

**L50:** ``  
Blank line — visual spacing.

**L51:** `  const amount = watch('amount')`  
Constant/variable `amount` — holds a value or React binding.

**L52:** `  const country = watch('country')`  
Constant/variable `country` — holds a value or React binding.

**L53:** `  const feeQuote = useMemo(`  
Constant/variable `feeQuote` — holds a value or React binding.

**L54:** `    () => calculateTransferFee(Number(amount) || 0, country),`  
Assignment / binding: `() => calculateTransferFee(Number(amount) || 0, country),`

**L55:** `    [amount, country],`  
Executable statement: `[amount, country],`

**L56:** `  )`  
Executable statement: `)`

**L57:** ``  
Blank line — visual spacing.

**L58:** `  const animFee = useAnimatedNumber(feeQuote.fee)`  
Constant/variable `animFee` — holds a value or React binding.

**L59:** `  const animTotal = useAnimatedNumber(feeQuote.total)`  
Constant/variable `animTotal` — holds a value or React binding.

**L60:** ``  
Blank line — visual spacing.

**L61:** `  const onSubmit = () => {`  
Constant/variable `onSubmit` — holds a value or React binding.

**L62:** `    if (step < 3) {`  
Conditional — runs the following block only when the condition is true.

**L63:** `      setStep(step + 1)`  
Executable statement: `setStep(step + 1)`

**L64:** `      return`  
Executable statement: `return`

**L65:** `    }`  
Closes the previous block/object/function.

**L66:** `    setDoneRef('TX-${Date.now().toString().slice(-8)}')`  
Executable statement: `setDoneRef(`TX-${Date.now().toString().slice(-8)}`)`

**L67:** `    setStep(4)`  
Executable statement: `setStep(4)`

**L68:** `  }`  
Closes the previous block/object/function.

**L69:** ``  
Blank line — visual spacing.

**L70:** `  if (step === 4 && doneRef) {`  
Conditional — runs the following block only when the condition is true.

**L71:** `    return (`  
Returns JSX UI (or a value) to render / callers.

**L72:** `      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L73:** `        <PageIntro title="Transfer submitted">`  
JSX markup — describes HTML structure React will render.

**L74:** `          <p>`  
JSX markup — describes HTML structure React will render.

**L75:** `            Reference <span className="select-all font-semibold text-ink">{doneRef}</span>.`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L76:** `            We’ll SMS you when the money is ready to collect.`  
Executable statement: `We’ll SMS you when the money is ready to collect.`

**L77:** `          </p>`  
JSX markup — describes HTML structure React will render.

**L78:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L79:** `        <Link`  
JSX markup — describes HTML structure React will render.

**L80:** `          to="/"`  
Assignment / binding: `to="/"`

**L81:** `          className="mt-8 inline-flex min-h-11 items-center text-[1rem] font-semibold text-teal h...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L82:** `        >`  
JSX markup — describes HTML structure React will render.

**L83:** `          Back to home`  
Executable statement: `Back to home`

**L84:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L85:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L86:** `    )`  
Executable statement: `)`

**L87:** `  }`  
Closes the previous block/object/function.

**L88:** ``  
Blank line — visual spacing.

**L89:** `  return (`  
Returns JSX UI (or a value) to render / callers.

**L90:** `    <div className="page-cascade mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L91:** `      <p className="text-[0.9375rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L92:** `        <Link to="/" className="hover:text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L93:** `          Home`  
Executable statement: `Home`

**L94:** `        </Link>`  
JSX markup — describes HTML structure React will render.

**L95:** `        <span aria-hidden className="mx-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L96:** `          /`  
Executable statement: `/`

**L97:** `        </span>`  
JSX markup — describes HTML structure React will render.

**L98:** `        Send money`  
Executable statement: `Send money`

**L99:** `      </p>`  
JSX markup — describes HTML structure React will render.

**L100:** ``  
Blank line — visual spacing.

**L101:** `      <Reveal className="mt-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L102:** `        <PageIntro title="Send money with the fee on the page">`  
JSX markup — describes HTML structure React will render.

**L103:** `          Step {step} of 3 — {STEPS[step - 1]}. Recipient gets the amount you send.`  
Executable statement: `Step {step} of 3 — {STEPS[step - 1]}. Recipient gets the amount you se…`

**L104:** `          You pay the fee on top.`  
Executable statement: `You pay the fee on top.`

**L105:** `        </PageIntro>`  
JSX markup — describes HTML structure React will render.

**L106:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L107:** ``  
Blank line — visual spacing.

**L108:** `      <div className="mt-6 flex flex-wrap gap-1">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L109:** `        {STEPS.map((label, i) => (`  
Assignment / binding: `{STEPS.map((label, i) => (`

**L110:** `          <span`  
JSX markup — describes HTML structure React will render.

**L111:** `            key={label}`  
Assignment / binding: `key={label}`

**L112:** `            className={cn(`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L113:** `              'inline-flex min-h-10 items-center px-3 py-2 text-[0.875rem]',`  
Executable statement: `'inline-flex min-h-10 items-center px-3 py-2 text-[0.875rem]',`

**L114:** `              i + 1 === step ? softChipActive : softChipIdle,`  
Assignment / binding: `i + 1 === step ? softChipActive : softChipIdle,`

**L115:** `            )}`  
Executable statement: `)}`

**L116:** `            aria-current={i + 1 === step ? 'step' : undefined}`  
Assignment / binding: `aria-current={i + 1 === step ? 'step' : undefined}`

**L117:** `          >`  
JSX markup — describes HTML structure React will render.

**L118:** `            {i + 1}. {label}`  
Executable statement: `{i + 1}. {label}`

**L119:** `          </span>`  
JSX markup — describes HTML structure React will render.

**L120:** `        ))}`  
Executable statement: `))}`

**L121:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L122:** `      <div`  
JSX markup — describes HTML structure React will render.

**L123:** `        className="mt-3 h-1 max-w-md rounded-sm bg-surface"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L124:** `        role="progressbar"`  
Assignment / binding: `role="progressbar"`

**L125:** `        aria-valuenow={step}`  
Assignment / binding: `aria-valuenow={step}`

**L126:** `        aria-valuemin={1}`  
Assignment / binding: `aria-valuemin={1}`

**L127:** `        aria-valuemax={3}`  
Assignment / binding: `aria-valuemax={3}`

**L128:** `        aria-label={'Transfer step ${step} of 3'}`  
Assignment / binding: `aria-label={`Transfer step ${step} of 3`}`

**L129:** `      >`  
JSX markup — describes HTML structure React will render.

**L130:** `        <div`  
JSX markup — describes HTML structure React will render.

**L131:** `          className="h-full rounded-sm bg-teal transition-[width] duration-300 ease-out"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L132:** `          style={{ width: '${((step - 1) / 2) * 100}%' }}`  
Assignment / binding: `style={{ width: `${((step - 1) / 2) * 100}%` }}`

**L133:** `        />`  
JSX markup — describes HTML structure React will render.

**L134:** `      </div>`  
JSX markup — describes HTML structure React will render.

**L135:** ``  
Blank line — visual spacing.

**L136:** `      <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L137:** `      <form onSubmit={handleSubmit(onSubmit)} className="contents">`  
React Hook Form — wires inputs, validation, and submit handlers.

**L138:** `        <Panel className="space-y-5 p-5 sm:p-6">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L139:** `          {step === 1 ? (`  
Assignment / binding: `{step === 1 ? (`

**L140:** `            <>`  
JSX markup — describes HTML structure React will render.

**L141:** `              <h2 className="text-[1.125rem] font-semibold">Your details</h2>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L142:** `              <Input`  
JSX markup — describes HTML structure React will render.

**L143:** `                label="Full name"`  
Assignment / binding: `label="Full name"`

**L144:** `                autoComplete="name"`  
Assignment / binding: `autoComplete="name"`

**L145:** `                error={errors.senderName?.message}`  
Assignment / binding: `error={errors.senderName?.message}`

**L146:** `                {...register('senderName')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L147:** `              />`  
JSX markup — describes HTML structure React will render.

**L148:** `              <Input`  
JSX markup — describes HTML structure React will render.

**L149:** `                label="Mobile number"`  
Assignment / binding: `label="Mobile number"`

**L150:** `                inputMode="tel"`  
Assignment / binding: `inputMode="tel"`

**L151:** `                autoComplete="tel"`  
Assignment / binding: `autoComplete="tel"`

**L152:** `                error={errors.senderPhone?.message}`  
Assignment / binding: `error={errors.senderPhone?.message}`

**L153:** `                {...register('senderPhone')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L154:** `              />`  
JSX markup — describes HTML structure React will render.

**L155:** `            </>`  
JSX markup — describes HTML structure React will render.

**L156:** `          ) : null}`  
Executable statement: `) : null}`

**L157:** ``  
Blank line — visual spacing.

**L158:** `          {step === 2 ? (`  
Assignment / binding: `{step === 2 ? (`

**L159:** `            <>`  
JSX markup — describes HTML structure React will render.

**L160:** `              <h2 className="text-[1.125rem] font-semibold">Who is receiving it?</h2>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L161:** `              <Input`  
JSX markup — describes HTML structure React will render.

**L162:** `                label="Recipient name"`  
Assignment / binding: `label="Recipient name"`

**L163:** `                autoComplete="off"`  
Assignment / binding: `autoComplete="off"`

**L164:** `                error={errors.recipientName?.message}`  
Assignment / binding: `error={errors.recipientName?.message}`

**L165:** `                {...register('recipientName')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L166:** `              />`  
JSX markup — describes HTML structure React will render.

**L167:** `              <Input`  
JSX markup — describes HTML structure React will render.

**L168:** `                label="Recipient phone"`  
Assignment / binding: `label="Recipient phone"`

**L169:** `                inputMode="tel"`  
Assignment / binding: `inputMode="tel"`

**L170:** `                error={errors.recipientPhone?.message}`  
Assignment / binding: `error={errors.recipientPhone?.message}`

**L171:** `                {...register('recipientPhone')}`  
React Hook Form — wires inputs, validation, and submit handlers.

**L172:** `              />`  
JSX markup — describes HTML structure React will render.

**L173:** `              <Select label="Country" {...register('country')}>`  
React Hook Form — wires inputs, validation, and submit handlers.

**L174:** `                {countries.map((c) => (`  
Assignment / binding: `{countries.map((c) => (`

**L175:** `                  <option key={c.code} value={c.code}>`  
JSX markup — describes HTML structure React will render.

**L176:** `                    {c.label}`  
Executable statement: `{c.label}`

**L177:** `                  </option>`  
JSX markup — describes HTML structure React will render.

**L178:** `                ))}`  
Executable statement: `))}`

**L179:** `              </Select>`  
JSX markup — describes HTML structure React will render.

**L180:** `            </>`  
JSX markup — describes HTML structure React will render.

**L181:** `          ) : null}`  
Executable statement: `) : null}`

**L182:** ``  
Blank line — visual spacing.

**L183:** `          {step === 3 ? (`  
Assignment / binding: `{step === 3 ? (`

**L184:** `            <>`  
JSX markup — describes HTML structure React will render.

**L185:** `              <h2 className="text-[1.125rem] font-semibold">How much are you sending?</h2>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L186:** `              <div>`  
JSX markup — describes HTML structure React will render.

**L187:** `                <div className="mb-2 flex justify-between text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L188:** `                  <label htmlFor="send-amount" className="font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L189:** `                    Send amount`  
Executable statement: `Send amount`

**L190:** `                  </label>`  
JSX markup — describes HTML structure React will render.

**L191:** `                  <span className="tabular-nums font-semibold text-ink">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L192:** `                    {formatRand(Number(amount) || 0, 0)}`  
Executable statement: `{formatRand(Number(amount) || 0, 0)}`

**L193:** `                  </span>`  
JSX markup — describes HTML structure React will render.

**L194:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L195:** `                <input`  
JSX markup — describes HTML structure React will render.

**L196:** `                  id="send-amount"`  
Assignment / binding: `id="send-amount"`

**L197:** `                  type="range"`  
Assignment / binding: `type="range"`

**L198:** `                  min={100}`  
Assignment / binding: `min={100}`

**L199:** `                  max={50000}`  
Assignment / binding: `max={50000}`

**L200:** `                  step={50}`  
Assignment / binding: `step={50}`

**L201:** `                  value={amount}`  
Assignment / binding: `value={amount}`

**L202:** `                  aria-valuetext={formatRand(Number(amount) || 0, 0)}`  
Assignment / binding: `aria-valuetext={formatRand(Number(amount) || 0, 0)}`

**L203:** `                  onChange={(e) => setValue('amount', Number(e.target.value))}`  
Assignment / binding: `onChange={(e) => setValue('amount', Number(e.target.value))}`

**L204:** `                  className="w-full accent-teal"`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L205:** `                />`  
JSX markup — describes HTML structure React will render.

**L206:** `                <div className="mt-1 flex justify-between text-[0.8125rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L207:** `                  <span>R100</span>`  
JSX markup — describes HTML structure React will render.

**L208:** `                  <span>R50,000</span>`  
JSX markup — describes HTML structure React will render.

**L209:** `                </div>`  
JSX markup — describes HTML structure React will render.

**L210:** `              </div>`  
JSX markup — describes HTML structure React will render.

**L211:** `              <p className="text-[0.9375rem] text-ink-muted">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L212:** `                Check the fee on the right before you confirm.`  
Executable statement: `Check the fee on the right before you confirm.`

**L213:** `              </p>`  
JSX markup — describes HTML structure React will render.

**L214:** `            </>`  
JSX markup — describes HTML structure React will render.

**L215:** `          ) : null}`  
Executable statement: `) : null}`

**L216:** ``  
Blank line — visual spacing.

**L217:** `          <div className="flex justify-between pt-2">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L218:** `            <Button`  
JSX markup — describes HTML structure React will render.

**L219:** `              type="button"`  
Assignment / binding: `type="button"`

**L220:** `              variant="ghost"`  
Assignment / binding: `variant="ghost"`

**L221:** `              disabled={step === 1}`  
Assignment / binding: `disabled={step === 1}`

**L222:** `              onClick={() => setStep((s) => Math.max(1, s - 1))}`  
Assignment / binding: `onClick={() => setStep((s) => Math.max(1, s - 1))}`

**L223:** `            >`  
JSX markup — describes HTML structure React will render.

**L224:** `              Back`  
Executable statement: `Back`

**L225:** `            </Button>`  
JSX markup — describes HTML structure React will render.

**L226:** `            <Button type="submit" variant="primary">`  
JSX markup — describes HTML structure React will render.

**L227:** `              {step === 3 ? 'Confirm and pay' : 'Continue'}`  
Assignment / binding: `{step === 3 ? 'Confirm and pay' : 'Continue'}`

**L228:** `            </Button>`  
JSX markup — describes HTML structure React will render.

**L229:** `          </div>`  
JSX markup — describes HTML structure React will render.

**L230:** `        </Panel>`  
JSX markup — describes HTML structure React will render.

**L231:** ``  
Blank line — visual spacing.

**L232:** `        <Panel className="h-fit p-5 sm:p-6" aria-live="polite">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L233:** `          <h2 className="text-[1.0625rem] font-semibold text-ink">What you pay</h2>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L234:** `          <dl className="mt-4 space-y-3">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L235:** `            <div className="flex justify-between gap-4 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L236:** `              <dt className="text-ink-muted">Send amount</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L237:** `              <dd className="font-mono tabular-nums">{formatRand(feeQuote.amount)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L238:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L239:** `            <div className="flex justify-between gap-4 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L240:** `              <dt className="text-ink-muted">Transfer fee</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L241:** `              <dd className="font-mono tabular-nums">{formatRand(animFee)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L242:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L243:** `            <div className="flex justify-between gap-4 border-t border-line pt-3 text-[1.0625rem]...`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L244:** `              <dt>You pay</dt>`  
JSX markup — describes HTML structure React will render.

**L245:** `              <dd className="font-mono tabular-nums">{formatRand(animTotal)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L246:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L247:** `            <div className="flex justify-between gap-4 text-[0.9375rem]">`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L248:** `              <dt className="text-ink-muted">Recipient gets</dt>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L249:** `              <dd className="font-mono tabular-nums">{formatRand(feeQuote.receiveEstimate)}</dd>`  
JSX element with Tailwind/CSS classes controlling layout/look.

**L250:** `            </div>`  
JSX markup — describes HTML structure React will render.

**L251:** `          </dl>`  
JSX markup — describes HTML structure React will render.

**L252:** `        </Panel>`  
JSX markup — describes HTML structure React will render.

**L253:** `      </form>`  
JSX markup — describes HTML structure React will render.

**L254:** `      </Reveal>`  
JSX markup — describes HTML structure React will render.

**L255:** `    </div>`  
JSX markup — describes HTML structure React will render.

**L256:** `  )`  
Executable statement: `)`

**L257:** `}`  
Closes the previous block/object/function.

---

## `frontend/src/store/applicationStore.ts`

_136 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Multi-step loan application draft kept in sessionStorage while the user applies.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - Steps in App.tsx /apply/* read/write this store.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - applicationId is set after createApplication; uploads use it in useDocumentUpload.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - On submit, ReviewStep posts to backend then DoneStep shows reference.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `import { create } from 'zustand'`  
Import — brings in `zustand` so this file can use it.

**L11:** `import type { DetailsForm } from '@/lib/validation'`  
Import — brings in `@/lib/validation` so this file can use it.

**L12:** ``  
Blank line — visual spacing.

**L13:** `export type DocumentKind = 'id' | 'payslip' | 'bank1' | 'bank2' | 'bank3'`  
TypeScript type — describes the shape of data (compile-time only).

**L14:** `export type DocumentStatus = 'idle' | 'uploading' | 'uploaded' | 'rejected'`  
TypeScript type — describes the shape of data (compile-time only).

**L15:** ``  
Blank line — visual spacing.

**L16:** `export type ProductType = 'cash' | 'domestic'`  
TypeScript type — describes the shape of data (compile-time only).

**L17:** ``  
Blank line — visual spacing.

**L18:** `export type ApplicationData = {`  
TypeScript type — describes the shape of data (compile-time only).

**L19:** `  product: ProductType`  
Executable statement: `product: ProductType`

**L20:** `  details: Partial<DetailsForm> & {`  
Executable statement: `details: Partial<DetailsForm> & {`

**L21:** `    employerName?: string`  
Executable statement: `employerName?: string`

**L22:** `    weeklyWage?: string`  
Executable statement: `weeklyWage?: string`

**L23:** `  }`  
Closes the previous block/object/function.

**L24:** `  documents: Record<DocumentKind, DocumentStatus>`  
JSX markup — describes HTML structure React will render.

**L25:** `  amount: number`  
Executable statement: `amount: number`

**L26:** `  termMonths: number`  
Executable statement: `termMonths: number`

**L27:** `  reference?: string`  
Executable statement: `reference?: string`

**L28:** `  applicationId?: string`  
Executable statement: `applicationId?: string`

**L29:** `}`  
Closes the previous block/object/function.

**L30:** ``  
Blank line — visual spacing.

**L31:** `type ApplicationStore = {`  
TypeScript type — describes the shape of data (compile-time only).

**L32:** `  step: number`  
Executable statement: `step: number`

**L33:** `  data: ApplicationData`  
Executable statement: `data: ApplicationData`

**L34:** `  setStep: (step: number) => void`  
Assignment / binding: `setStep: (step: number) => void`

**L35:** `  setProduct: (product: ProductType) => void`  
Assignment / binding: `setProduct: (product: ProductType) => void`

**L36:** `  updateDetails: (details: ApplicationData['details']) => void`  
Assignment / binding: `updateDetails: (details: ApplicationData['details']) => void`

**L37:** `  setDocumentStatus: (kind: DocumentKind, status: DocumentStatus) => void`  
Assignment / binding: `setDocumentStatus: (kind: DocumentKind, status: DocumentStatus) => voi…`

**L38:** `  setTerms: (amount: number, termMonths: number) => void`  
Assignment / binding: `setTerms: (amount: number, termMonths: number) => void`

**L39:** `  setReference: (reference: string) => void`  
Assignment / binding: `setReference: (reference: string) => void`

**L40:** `  reset: () => void`  
Assignment / binding: `reset: () => void`

**L41:** `  allDocumentsReady: () => boolean`  
Assignment / binding: `allDocumentsReady: () => boolean`

**L42:** `}`  
Closes the previous block/object/function.

**L43:** ``  
Blank line — visual spacing.

**L44:** `const defaultDocuments: Record<DocumentKind, DocumentStatus> = {`  
Constant/variable `defaultDocuments` — holds a value or React binding.

**L45:** `  id: 'idle',`  
Executable statement: `id: 'idle',`

**L46:** `  payslip: 'idle',`  
Executable statement: `payslip: 'idle',`

**L47:** `  bank1: 'idle',`  
Executable statement: `bank1: 'idle',`

**L48:** `  bank2: 'idle',`  
Executable statement: `bank2: 'idle',`

**L49:** `  bank3: 'idle',`  
Executable statement: `bank3: 'idle',`

**L50:** `}`  
Closes the previous block/object/function.

**L51:** ``  
Blank line — visual spacing.

**L52:** `const defaultData: ApplicationData = {`  
Constant/variable `defaultData` — holds a value or React binding.

**L53:** `  product: 'cash',`  
Executable statement: `product: 'cash',`

**L54:** `  details: {},`  
Executable statement: `details: {},`

**L55:** `  documents: { ...defaultDocuments },`  
Executable statement: `documents: { ...defaultDocuments },`

**L56:** `  amount: 5000,`  
Executable statement: `amount: 5000,`

**L57:** `  termMonths: 3,`  
Executable statement: `termMonths: 3,`

**L58:** `  applicationId: 'demo-app-local',`  
Executable statement: `applicationId: 'demo-app-local',`

**L59:** `}`  
Closes the previous block/object/function.

**L60:** ``  
Blank line — visual spacing.

**L61:** `const STORAGE_KEY = 'tshedza-application'`  
Constant/variable `STORAGE_KEY` — holds a value or React binding.

**L62:** ``  
Blank line — visual spacing.

**L63:** `function loadFromSession(): Pick<ApplicationStore, 'step' | 'data'> | null {`  
Defines function `loadFromSession` — callable unit of UI/logic.

**L64:** `  try {`  
Try block — attempt work that might throw; catch handles failures.

**L65:** `    const raw = sessionStorage.getItem(STORAGE_KEY)`  
Constant/variable `raw` — holds a value or React binding.

**L66:** `    if (!raw) return null`  
Conditional — runs the following block only when the condition is true.

**L67:** `    return JSON.parse(raw) as Pick<ApplicationStore, 'step' | 'data'>`  
Returns a value to the caller: `JSON.parse(raw) as Pick<ApplicationStore, 'step' | 'd`

**L68:** `  } catch {`  
Closes the previous block/object/function.

**L69:** `    return null`  
Returns a value to the caller: `null`

**L70:** `  }`  
Closes the previous block/object/function.

**L71:** `}`  
Closes the previous block/object/function.

**L72:** ``  
Blank line — visual spacing.

**L73:** `function persist(step: number, data: ApplicationData) {`  
Defines function `persist` — callable unit of UI/logic.

**L74:** `  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }))`  
Browser sessionStorage — persists token/user for this tab session.

**L75:** `}`  
Closes the previous block/object/function.

**L76:** ``  
Blank line — visual spacing.

**L77:** `const hydrated = loadFromSession()`  
Constant/variable `hydrated` — holds a value or React binding.

**L78:** ``  
Blank line — visual spacing.

**L79:** `export const useApplicationStore = create<ApplicationStore>((set, get) => ({`  
Constant/variable `useApplicationStore` — holds a value or React binding.

**L80:** `  step: hydrated?.step ?? 1,`  
Executable statement: `step: hydrated?.step ?? 1,`

**L81:** `  data: hydrated?.data ?? { ...defaultData, documents: { ...defaultDocuments } },`  
Executable statement: `data: hydrated?.data ?? { ...defaultData, documents: { ...defaultDocum…`

**L82:** ``  
Blank line — visual spacing.

**L83:** `  setStep: (step) => {`  
Assignment / binding: `setStep: (step) => {`

**L84:** `    set({ step })`  
Executable statement: `set({ step })`

**L85:** `    persist(step, get().data)`  
Executable statement: `persist(step, get().data)`

**L86:** `  },`  
Closes the previous block/object/function.

**L87:** ``  
Blank line — visual spacing.

**L88:** `  setProduct: (product) => {`  
Assignment / binding: `setProduct: (product) => {`

**L89:** `    const data = {`  
Constant/variable `data` — holds a value or React binding.

**L90:** `      ...get().data,`  
Executable statement: `...get().data,`

**L91:** `      product,`  
Executable statement: `product,`

**L92:** `      amount: product === 'domestic' ? 2500 : get().data.amount,`  
Assignment / binding: `amount: product === 'domestic' ? 2500 : get().data.amount,`

**L93:** `      termMonths: product === 'domestic' ? 2 : get().data.termMonths,`  
Assignment / binding: `termMonths: product === 'domestic' ? 2 : get().data.termMonths,`

**L94:** `    }`  
Closes the previous block/object/function.

**L95:** `    set({ data })`  
Executable statement: `set({ data })`

**L96:** `    persist(get().step, data)`  
Executable statement: `persist(get().step, data)`

**L97:** `  },`  
Closes the previous block/object/function.

**L98:** ``  
Blank line — visual spacing.

**L99:** `  updateDetails: (details) => {`  
Assignment / binding: `updateDetails: (details) => {`

**L100:** `    const data = { ...get().data, details: { ...get().data.details, ...details } }`  
Constant/variable `data` — holds a value or React binding.

**L101:** `    set({ data })`  
Executable statement: `set({ data })`

**L102:** `    persist(get().step, data)`  
Executable statement: `persist(get().step, data)`

**L103:** `  },`  
Closes the previous block/object/function.

**L104:** ``  
Blank line — visual spacing.

**L105:** `  setDocumentStatus: (kind, status) => {`  
Assignment / binding: `setDocumentStatus: (kind, status) => {`

**L106:** `    const data = {`  
Constant/variable `data` — holds a value or React binding.

**L107:** `      ...get().data,`  
Executable statement: `...get().data,`

**L108:** `      documents: { ...get().data.documents, [kind]: status },`  
Executable statement: `documents: { ...get().data.documents, [kind]: status },`

**L109:** `    }`  
Closes the previous block/object/function.

**L110:** `    set({ data })`  
Executable statement: `set({ data })`

**L111:** `    persist(get().step, data)`  
Executable statement: `persist(get().step, data)`

**L112:** `  },`  
Closes the previous block/object/function.

**L113:** ``  
Blank line — visual spacing.

**L114:** `  setTerms: (amount, termMonths) => {`  
Assignment / binding: `setTerms: (amount, termMonths) => {`

**L115:** `    const data = { ...get().data, amount, termMonths }`  
Constant/variable `data` — holds a value or React binding.

**L116:** `    set({ data })`  
Executable statement: `set({ data })`

**L117:** `    persist(get().step, data)`  
Executable statement: `persist(get().step, data)`

**L118:** `  },`  
Closes the previous block/object/function.

**L119:** ``  
Blank line — visual spacing.

**L120:** `  setReference: (reference) => {`  
Assignment / binding: `setReference: (reference) => {`

**L121:** `    const data = { ...get().data, reference }`  
Constant/variable `data` — holds a value or React binding.

**L122:** `    set({ data })`  
Executable statement: `set({ data })`

**L123:** `    persist(get().step, data)`  
Executable statement: `persist(get().step, data)`

**L124:** `  },`  
Closes the previous block/object/function.

**L125:** ``  
Blank line — visual spacing.

**L126:** `  reset: () => {`  
Assignment / binding: `reset: () => {`

**L127:** `    const data = { ...defaultData, documents: { ...defaultDocuments } }`  
Constant/variable `data` — holds a value or React binding.

**L128:** `    set({ step: 1, data })`  
Executable statement: `set({ step: 1, data })`

**L129:** `    sessionStorage.removeItem(STORAGE_KEY)`  
Browser sessionStorage — persists token/user for this tab session.

**L130:** `  },`  
Closes the previous block/object/function.

**L131:** ``  
Blank line — visual spacing.

**L132:** `  allDocumentsReady: () => {`  
Assignment / binding: `allDocumentsReady: () => {`

**L133:** `    const docs = get().data.documents`  
Constant/variable `docs` — holds a value or React binding.

**L134:** `    return (Object.keys(docs) as DocumentKind[]).every((k) => docs[k] === 'uploaded')`  
Returns JSX UI (or a value) to render / callers.

**L135:** `  },`  
Closes the previous block/object/function.

**L136:** `}))`  
Closes the previous block/object/function.

---

## `frontend/src/store/authStore.ts`

_49 lines_

**L1:** `/**`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L2:** ` * Client auth state (Zustand) + sessionStorage persistence.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L3:** ` *`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L4:** ` * LINK MAP`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L5:** ` * - setAuth called from Login/Register after apiClient login/register.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L6:** ` * - token synced into axios via lib/api.ts setAccessToken.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L7:** ` * - RequireAuth / RequireAdmin / PublicLayout admin link read user.role.`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L8:** ` */`  
Documentation / LINK MAP comment block (explains purpose and connections).

**L9:** ``  
Blank line — visual spacing.

**L10:** `import { create } from 'zustand'`  
Import — brings in `zustand` so this file can use it.

**L11:** `import type { UserProfile } from '@/lib/apiTypes'`  
Import — brings in `@/lib/apiTypes` so this file can use it.

**L12:** `import { setAccessToken as setAxiosToken } from '@/lib/api'`  
Import — brings in `@/lib/api` so this file can use it.

**L13:** ``  
Blank line — visual spacing.

**L14:** `type AuthStore = {`  
TypeScript type — describes the shape of data (compile-time only).

**L15:** `  token: string | null`  
Executable statement: `token: string | null`

**L16:** `  user: UserProfile | null`  
Executable statement: `user: UserProfile | null`

**L17:** `  setAuth: (token: string, user: UserProfile) => void`  
Assignment / binding: `setAuth: (token: string, user: UserProfile) => void`

**L18:** `  clearAuth: () => void`  
Assignment / binding: `clearAuth: () => void`

**L19:** `}`  
Closes the previous block/object/function.

**L20:** ``  
Blank line — visual spacing.

**L21:** `const TOKEN_KEY = 'tshedza-token'`  
Constant/variable `TOKEN_KEY` — holds a value or React binding.

**L22:** `const USER_KEY = 'tshedza-user'`  
Constant/variable `USER_KEY` — holds a value or React binding.

**L23:** ``  
Blank line — visual spacing.

**L24:** `export const useAuthStore = create<AuthStore>((set) => ({`  
Constant/variable `useAuthStore` — holds a value or React binding.

**L25:** `  token: sessionStorage.getItem(TOKEN_KEY),`  
Browser sessionStorage — persists token/user for this tab session.

**L26:** `  user: (() => {`  
Assignment / binding: `user: (() => {`

**L27:** `    const raw = sessionStorage.getItem(USER_KEY)`  
Constant/variable `raw` — holds a value or React binding.

**L28:** `    return raw ? JSON.parse(raw) : null`  
Returns a value to the caller: `raw ? JSON.parse(raw) : null`

**L29:** `  })(),`  
Closes the previous block/object/function.

**L30:** ``  
Blank line — visual spacing.

**L31:** `  setAuth: (token, user) => {`  
Assignment / binding: `setAuth: (token, user) => {`

**L32:** `    sessionStorage.setItem(TOKEN_KEY, token)`  
Browser sessionStorage — persists token/user for this tab session.

**L33:** `    sessionStorage.setItem(USER_KEY, JSON.stringify(user))`  
Browser sessionStorage — persists token/user for this tab session.

**L34:** `    setAxiosToken(token)`  
Executable statement: `setAxiosToken(token)`

**L35:** `    set({ token, user })`  
Executable statement: `set({ token, user })`

**L36:** `  },`  
Closes the previous block/object/function.

**L37:** ``  
Blank line — visual spacing.

**L38:** `  clearAuth: () => {`  
Assignment / binding: `clearAuth: () => {`

**L39:** `    sessionStorage.removeItem(TOKEN_KEY)`  
Browser sessionStorage — persists token/user for this tab session.

**L40:** `    sessionStorage.removeItem(USER_KEY)`  
Browser sessionStorage — persists token/user for this tab session.

**L41:** `    setAxiosToken(null)`  
Executable statement: `setAxiosToken(null)`

**L42:** `    set({ token: null, user: null })`  
Executable statement: `set({ token: null, user: null })`

**L43:** `  },`  
Closes the previous block/object/function.

**L44:** `}))`  
Closes the previous block/object/function.

**L45:** ``  
Blank line — visual spacing.

**L46:** `export function hydrateAuth() {`  
Defines function `hydrateAuth` — callable unit of UI/logic.

**L47:** `  const token = sessionStorage.getItem(TOKEN_KEY)`  
Constant/variable `token` — holds a value or React binding.

**L48:** `  if (token) setAxiosToken(token)`  
Conditional — runs the following block only when the condition is true.

**L49:** `}`  
Closes the previous block/object/function.

---

