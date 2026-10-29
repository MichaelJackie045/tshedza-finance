package com.tshedza.fallback.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class FallbackService {
    private final Map<String, UserRecord> users = new ConcurrentHashMap<>();
    private final Map<String, ApplicationRecord> applications = new ConcurrentHashMap<>();
    private final Map<String, LoanRecord> loans = new ConcurrentHashMap<>();
    private final Map<String, PaymentRecord> payments = new ConcurrentHashMap<>();
    private final List<TransferRecord> transfers = new CopyOnWriteArrayList<>();
    private final List<DebtReviewRecord> debtReviews = new CopyOnWriteArrayList<>();
    private final List<DocumentRecord> documents = new CopyOnWriteArrayList<>();

    private final DateTimeFormatter isoFmt = DateTimeFormatter.ISO_LOCAL_DATE;

    public FallbackService() {
        UserRecord admin = new UserRecord(
            "admin-1",
            "admin@tshedza.local",
            "$2a$10$N8r0g2mV8idg9nP1A0pGmOKH5YwI8kekdIy6wJLG0F1Q2llh6wz9W",
            "System",
            "Admin",
            "+27000000000",
            "ADMIN"
        );
        users.put(admin.email.toLowerCase(), admin);
    }

    public UserRecord register(String email, String password, String firstName, String lastName, String phone) {
        String normalized = email.trim().toLowerCase();
        if (users.containsKey(normalized)) {
            throw new IllegalArgumentException("User already exists");
        }
        UserRecord user = new UserRecord(UUID.randomUUID().toString(), normalized, password, firstName, lastName, phone, "USER");
        users.put(normalized, user);
        return user;
    }

    public UserRecord findUserByEmail(String email) {
        return users.get(email.trim().toLowerCase());
    }

    public UserRecord login(String email, String password) {
        UserRecord user = findUserByEmail(email);
        if (user == null || !org.springframework.security.crypto.bcrypt.BCrypt.checkpw(password, user.passwordHash)) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return user;
    }

    public ApplicationRecord createApplication(String userEmail, ApplicationDraftRequest request) {
        UserRecord user = findUserByEmail(userEmail);
        if (user == null) throw new IllegalArgumentException("User not found");

        String appId = UUID.randomUUID().toString();
        ApplicationRecord record = new ApplicationRecord(
            appId,
            user.id,
            user.email,
            user.firstName,
            user.lastName,
            request.product,
            request.amount,
            request.termMonths,
            request.details,
            "draft",
            null,
            null,
            LocalDate.now().toString(),
            null
        );
        applications.put(appId, record);
        if (record.details != null) {
            Object firstName = record.details.getOrDefault("firstName", user.firstName);
            Object lastName = record.details.getOrDefault("lastName", user.lastName);
            Object phone = record.details.getOrDefault("phone", user.phone);
            user.firstName = firstName != null ? firstName.toString() : user.firstName;
            user.lastName = lastName != null ? lastName.toString() : user.lastName;
            user.phone = phone != null ? phone.toString() : user.phone;
        }
        return record;
    }

    public ApplicationRecord updateDraftApplication(String userEmail, String applicationId, ApplicationDraftRequest request) {
        ApplicationRecord application = applications.get(applicationId);
        if (application == null || !Objects.equals(application.userId, findUserByEmail(userEmail).id)) {
            throw new IllegalArgumentException("Application not found");
        }
        application.product = request.product;
        application.amount = request.amount;
        application.termMonths = request.termMonths;
        application.details = request.details;
        application.updatedAt = LocalDate.now().toString();
        return application;
    }

    public String uploadDocument(String userEmail, String applicationId, String kind, String fileName) {
        ApplicationRecord application = applications.get(applicationId);
        if (application == null || !Objects.equals(application.userId, findUserByEmail(userEmail).id)) {
            throw new IllegalArgumentException("Application not found");
        }
        String docId = UUID.randomUUID().toString();
        documents.add(new DocumentRecord(docId, applicationId, kind, fileName, "uploaded"));
        return docId;
    }

    public ApplicationRecord submitApplication(String userEmail, String applicationId, SubmitRequest request) {
        ApplicationRecord application = applications.get(applicationId);
        if (application == null || !Objects.equals(application.userId, findUserByEmail(userEmail).id)) {
            throw new IllegalArgumentException("Application not found");
        }
        String ref = "TF-" + (System.currentTimeMillis() % 100000000L);
        application.status = "pending";
        application.reference = ref;
        application.amount = request.amount;
        application.termMonths = request.termMonths;
        application.submittedAt = LocalDate.now().toString();
        return application;
    }

    public List<ApplicationRecord> listUserApplications(String userEmail) {
        UserRecord user = findUserByEmail(userEmail);
        if (user == null) throw new IllegalArgumentException("User not found");
        return applications.values().stream().filter(a -> a.userId.equals(user.id)).toList();
    }

    public List<Map<String, Object>> listUserDocuments(String userEmail) {
        UserRecord user = findUserByEmail(userEmail);
        if (user == null) throw new IllegalArgumentException("User not found");

        List<Map<String, Object>> result = new ArrayList<>();
        for (DocumentRecord doc : documents) {
            ApplicationRecord app = applications.get(doc.applicationId);
            if (app != null && app.userId.equals(user.id)) {
                result.add(mapOf(
                    "kind", doc.kind,
                    "file_name", doc.fileName,
                    "status", doc.status
                ));
            }
        }
        return result;
    }

    public List<Map<String, Object>> listLoansForUser(String userEmail) {
        UserRecord user = findUserByEmail(userEmail);
        if (user == null) throw new IllegalArgumentException("User not found");
        return loans.values().stream()
            .filter(loan -> loan.userId.equals(user.id))
            .map(this::loanAsMap)
            .toList();
    }

    public Map<String, Object> getLoanForUser(String userEmail, String loanId) {
        UserRecord user = findUserByEmail(userEmail);
        LoanRecord loan = loans.get(loanId);
        if (loan == null || !loan.userId.equals(user.id)) {
            throw new IllegalArgumentException("Loan not found");
        }
        return loanAsMap(loan);
    }

    public List<Map<String, Object>> listRepaymentsForUser(String userEmail) {
        UserRecord user = findUserByEmail(userEmail);
        if (user == null) throw new IllegalArgumentException("User not found");
        return payments.values().stream()
            .filter(p -> p.userId.equals(user.id))
            .map(p -> mapOf(
                "id", p.id,
                "loan_id", p.loanId,
                "date", p.date,
                "amount", p.amount,
                "method", p.method,
                "status", p.status
            ))
            .toList();
    }

    public Map<String, Object> initiatePayment(String userEmail, String loanId) {
        UserRecord user = findUserByEmail(userEmail);
        LoanRecord loan = loans.get(loanId);
        if (user == null || loan == null || !loan.userId.equals(user.id)) {
            throw new IllegalArgumentException("Loan not found");
        }

        String paymentId = UUID.randomUUID().toString();
        PaymentRecord payment = new PaymentRecord(paymentId, loanId, user.id, loan.nextPaymentAmount, "mock", "pending", LocalDate.now().toString());
        payments.put(paymentId, payment);
        return Map.of(
            "paymentId", paymentId,
            "checkoutUrl", "https://example.com/checkout?paymentId=" + paymentId,
            "amount", loan.nextPaymentAmount
        );
    }

    public Map<String, Object> makeRepayment(String userEmail, String loanId) {
        return initiatePayment(userEmail, loanId);
    }

    public Map<String, Object> completePayment(String userEmail, String paymentId) {
        UserRecord user = findUserByEmail(userEmail);
        PaymentRecord payment = payments.get(paymentId);
        if (user == null || payment == null || !payment.userId.equals(user.id)) {
            throw new IllegalArgumentException("Payment not found");
        }

        payment.status = "paid";
        LoanRecord loan = loans.get(payment.loanId);
        if (loan != null) {
            loan.remaining = Math.max(0, loan.remaining - payment.amount);
            loan.status = loan.remaining <= 0 ? "paid" : "active";
            loan.nextPaymentDate = LocalDate.now().plusMonths(1L).toString();
            loan.nextPaymentAmount = Math.max(0, loan.nextPaymentAmount);
        }

        return Map.of(
            "id", payment.id,
            "loanId", payment.loanId,
            "date", payment.date,
            "amount", payment.amount,
            "method", payment.method,
            "status", payment.status
        );
    }

    public Map<String, Object> cancelPayment(String userEmail, String paymentId) {
        UserRecord user = findUserByEmail(userEmail);
        PaymentRecord payment = payments.get(paymentId);
        if (user == null || payment == null || !payment.userId.equals(user.id)) {
            throw new IllegalArgumentException("Payment not found");
        }
        payment.status = "cancelled";
        return Map.of(
            "id", payment.id,
            "loanId", payment.loanId,
            "date", payment.date,
            "amount", payment.amount,
            "method", payment.method,
            "status", payment.status
        );
    }

    public String createTransfer(TransferRequest request) {
        String id = "TX-" + (System.currentTimeMillis() % 100000000L);
        BigDecimal amount = BigDecimal.valueOf(request.amount);
        BigDecimal fee = amount.multiply(BigDecimal.valueOf(0.02)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = amount.add(fee);
        transfers.add(new TransferRecord(id, request.senderName, request.senderPhone, request.recipientName, request.recipientPhone, request.country, total.doubleValue(), "pending", LocalDate.now().toString()));
        return id;
    }

    public Map<String, Object> createDebtReview(DebtReviewRequest request) {
        String id = UUID.randomUUID().toString();
        DebtReviewRecord record = new DebtReviewRecord(id, request.fullName, request.phone, request.email, request.situation, "pending", LocalDate.now().toString());
        debtReviews.add(record);
        return Map.of("id", id, "status", "pending");
    }

    public Map<String, Object> createContactMessage(ContactRequest request) {
        return Map.of("ok", true);
    }

    public Map<String, Object> adminOverview() {
        return mapOf(
            "pending_applications", (int) applications.values().stream().filter(a -> "pending".equals(a.status)).count(),
            "approved_applications", (int) applications.values().stream().filter(a -> "approved".equals(a.status)).count(),
            "declined_applications", (int) applications.values().stream().filter(a -> "declined".equals(a.status)).count(),
            "active_loans", (int) loans.values().stream().filter(l -> "active".equals(l.status) || "approved".equals(l.status)).count(),
            "pending_transfers", (int) transfers.stream().filter(t -> "pending".equals(t.status)).count(),
            "debt_review_requests", debtReviews.size()
        );
    }

    public List<Map<String, Object>> adminApplications(String status) {
        return applications.values().stream()
            .filter(app -> status == null || status.isBlank() || status.equals(app.status))
            .map(app -> mapOf(
                "id", app.id,
                "product", app.product,
                "amount", app.amount,
                "term_months", app.termMonths,
                "status", app.status,
                "reference", app.reference,
                "decision_note", app.decisionNote,
                "first_name", app.firstName,
                "last_name", app.lastName,
                "phone", app.phone,
                "email", app.email,
                "created_at", app.createdAt
            ))
            .toList();
    }

    public Map<String, Object> decideApplication(String applicationId, String decision, String note) {
        ApplicationRecord app = applications.get(applicationId);
        if (app == null) {
            throw new IllegalArgumentException("Application not found");
        }
        app.status = "approved".equals(decision) ? "approved" : "declined";
        app.decisionNote = note;

        if ("approved".equals(decision)) {
            String loanId = "LN-" + System.currentTimeMillis() % 100000000L;
            LoanRecord loan = new LoanRecord(
                loanId,
                app.userId,
                app.product,
                "active",
                app.amount,
                app.amount,
                LocalDate.now().plusMonths(1L).toString(),
                roundAmount(app.amount / Math.max(1, app.termMonths)),
                app.termMonths,
                roundAmount(app.amount / Math.max(1, app.termMonths)),
                buildSchedule(app.amount, app.termMonths)
            );
            loans.put(loanId, loan);
            return loanAsMap(loan);
        }

        return mapOf(
            "id", app.id,
            "product", app.product,
            "amount", app.amount,
            "term_months", app.termMonths,
            "status", app.status,
            "reference", app.reference,
            "decision_note", app.decisionNote,
            "first_name", app.firstName,
            "last_name", app.lastName,
            "phone", app.phone,
            "email", app.email,
            "created_at", app.createdAt
        );
    }

    public List<Map<String, Object>> adminLoans() {
        return loans.values().stream().map(this::loanAsMap).toList();
    }

    public List<Map<String, Object>> adminTransfers() {
        return transfers.stream().map(t -> mapOf(
            "id", t.id,
            "sender_name", t.senderName,
            "sender_phone", t.senderPhone,
            "recipient_name", t.recipientName,
            "recipient_phone", t.recipientPhone,
            "country", t.country,
            "total", t.total,
            "status", t.status,
            "created_at", t.createdAt
        )).toList();
    }

    public List<Map<String, Object>> adminDebtReviews() {
        return debtReviews.stream().map(r -> mapOf(
            "id", r.id,
            "full_name", r.fullName,
            "phone", r.phone,
            "email", r.email,
            "situation", r.situation,
            "status", r.status,
            "created_at", r.createdAt
        )).toList();
    }

    private Map<String, Object> loanAsMap(LoanRecord loan) {
        return mapOf(
            "id", loan.id,
            "product", loan.product,
            "status", loan.status,
            "principal", loan.principal,
            "remaining", loan.remaining,
            "next_payment_date", loan.nextPaymentDate,
            "next_payment_amount", loan.nextPaymentAmount,
            "term_months", loan.termMonths,
            "monthly_instalment", loan.monthlyInstalment,
            "loan_schedule_items", loan.schedule.stream().map(item -> mapOf(
                "due_date", item.dueDate,
                "amount", item.amount,
                "status", item.status
            )).toList()
        );
    }

    private static Map<String, Object> mapOf(Object... entries) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            map.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return map;
    }

    private double roundAmount(double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    private List<ScheduleItem> buildSchedule(double principal, int termMonths) {
        List<ScheduleItem> items = new ArrayList<>();
        double monthly = principal / Math.max(1, termMonths);
        LocalDate start = LocalDate.now().plusDays(1);
        for (int i = 1; i <= termMonths; i++) {
            items.add(new ScheduleItem(start.plusMonths(i).toString(), roundAmount(monthly), "upcoming"));
        }
        return items;
    }

    public static class UserRecord {
        public final String id;
        public final String email;
        public final String passwordHash;
        public String firstName;
        public String lastName;
        public String phone;
        public final String role;

        public UserRecord(String id, String email, String passwordHash, String firstName, String lastName, String phone, String role) {
            this.id = id;
            this.email = email;
            this.passwordHash = passwordHash;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.role = role;
        }
    }

    public static class ApplicationDraftRequest {
        public String product;
        public double amount;
        public int termMonths;
        public Map<String, Object> details;
    }

    public static class SubmitRequest {
        public boolean acceptedTerms;
        public String signature;
        public double amount;
        public int termMonths;
    }

    public static class TransferRequest {
        public String senderName;
        public String senderPhone;
        public String recipientName;
        public String recipientPhone;
        public String country;
        public double amount;
    }

    public static class DebtReviewRequest {
        public String fullName;
        public String phone;
        public String email;
        public String situation;
    }

    public static class ContactRequest {
        public String name;
        public String email;
        public String phone;
        public String message;
    }

    public static class ApplicationRecord {
        public final String id;
        public final String userId;
        public final String email;
        public String firstName;
        public String lastName;
        public String product;
        public double amount;
        public int termMonths;
        public Map<String, Object> details;
        public String status;
        public String reference;
        public String decisionNote;
        public String createdAt;
        public String submittedAt;
        public String updatedAt;
        public String phone;

        public ApplicationRecord(String id, String userId, String email, String firstName, String lastName, String product, double amount, int termMonths, Map<String, Object> details, String status, String reference, String decisionNote, String createdAt, String submittedAt) {
            this.id = id;
            this.userId = userId;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.product = product;
            this.amount = amount;
            this.termMonths = termMonths;
            this.details = details;
            this.status = status;
            this.reference = reference;
            this.decisionNote = decisionNote;
            this.createdAt = createdAt;
            this.submittedAt = submittedAt;
            this.updatedAt = createdAt;
            this.phone = details != null ? (String) details.getOrDefault("phone", "") : "";
        }
    }

    public static class LoanRecord {
        public final String id;
        public final String userId;
        public final String product;
        public String status;
        public double principal;
        public double remaining;
        public String nextPaymentDate;
        public double nextPaymentAmount;
        public int termMonths;
        public double monthlyInstalment;
        public final List<ScheduleItem> schedule;

        public LoanRecord(String id, String userId, String product, String status, double principal, double remaining, String nextPaymentDate, double nextPaymentAmount, int termMonths, double monthlyInstalment, List<ScheduleItem> schedule) {
            this.id = id;
            this.userId = userId;
            this.product = product;
            this.status = status;
            this.principal = principal;
            this.remaining = remaining;
            this.nextPaymentDate = nextPaymentDate;
            this.nextPaymentAmount = nextPaymentAmount;
            this.termMonths = termMonths;
            this.monthlyInstalment = monthlyInstalment;
            this.schedule = schedule;
        }
    }

    public static class ScheduleItem {
        public final String dueDate;
        public final double amount;
        public final String status;

        public ScheduleItem(String dueDate, double amount, String status) {
            this.dueDate = dueDate;
            this.amount = amount;
            this.status = status;
        }
    }

    public static class PaymentRecord {
        public final String id;
        public final String loanId;
        public final String userId;
        public double amount;
        public final String method;
        public String status;
        public final String date;

        public PaymentRecord(String id, String loanId, String userId, double amount, String method, String status, String date) {
            this.id = id;
            this.loanId = loanId;
            this.userId = userId;
            this.amount = amount;
            this.method = method;
            this.status = status;
            this.date = date;
        }
    }

    public static class TransferRecord {
        public final String id;
        public final String senderName;
        public final String senderPhone;
        public final String recipientName;
        public final String recipientPhone;
        public final String country;
        public final double total;
        public final String status;
        public final String createdAt;

        public TransferRecord(String id, String senderName, String senderPhone, String recipientName, String recipientPhone, String country, double total, String status, String createdAt) {
            this.id = id;
            this.senderName = senderName;
            this.senderPhone = senderPhone;
            this.recipientName = recipientName;
            this.recipientPhone = recipientPhone;
            this.country = country;
            this.total = total;
            this.status = status;
            this.createdAt = createdAt;
        }
    }

    public static class DebtReviewRecord {
        public final String id;
        public final String fullName;
        public final String phone;
        public final String email;
        public final String situation;
        public final String status;
        public final String createdAt;

        public DebtReviewRecord(String id, String fullName, String phone, String email, String situation, String status, String createdAt) {
            this.id = id;
            this.fullName = fullName;
            this.phone = phone;
            this.email = email;
            this.situation = situation;
            this.status = status;
            this.createdAt = createdAt;
        }
    }

    public static class DocumentRecord {
        public final String id;
        public final String applicationId;
        public final String kind;
        public final String fileName;
        public final String status;

        public DocumentRecord(String id, String applicationId, String kind, String fileName, String status) {
            this.id = id;
            this.applicationId = applicationId;
            this.kind = kind;
            this.fileName = fileName;
            this.status = status;
        }
    }
}
