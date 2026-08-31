/**
 * One function per backend endpoint -- the frontend/API contract.
 *
 * LINK MAP (selected)
 * Auth:      login/register/logout -> AuthenticationController
 * Apply:     createApplication/uploadDocument/submitApplication -> ApplicationController
 * Dashboard: fetchLoans/fetchLoan/makeRepayment -> LoanController
 * Public:    createTransfer / createDebtReview -> TransferController / DebtReviewController
 * Admin:     fetchAdmin* / adminDecideApplication -> AdminController
 *
 * Pages/hooks import these; they should not call axios directly.
 */

import { api } from '@/lib/api'
import type { DetailsForm } from '@/lib/validation'
import type {
  AuthResponse,
  DocumentKind,
  Loan,
  Payment,
  ProductType,
  UserProfile,
  AdminOverview,
  AdminApplication,
  AdminTransfer,
  AdminDebtReview,
} from '@/lib/apiTypes'

// --- Auth (AuthenticationController) --- used by Login.tsx / Register.tsx / authStore ---

/** POST /api/auth/login */
export async function login(email: string, password: string) {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
  return data
}

/** POST /api/auth/register */
export async function register(body: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}) {
  const { data } = await api.post<AuthResponse>('/auth/register', body)
  return data
}

/** POST /api/auth/logout */
export async function logout() {
  await api.post('/auth/logout')
}

/** GET /api/me (MeController) */
export async function fetchMe() {
  const { data } = await api.get<UserProfile>('/me')
  return data
}

// --- Apply flow (ApplicationController) --- DetailsStep / DocumentsStep / ReviewStep ---

/** POST /api/applications — stores draft; returns id kept in applicationStore */
export async function createApplication(body: {
  product: ProductType
  amount: number
  termMonths: number
  details: Partial<DetailsForm> & { employerName?: string; weeklyWage?: string }
}) {
  const { data } = await api.post<{ id: string; status: string }>('/applications', body)
  return data
}

/** POST /api/applications/{id}/documents — useDocumentUpload / DocumentsStep */
export async function uploadDocument(applicationId: string, kind: DocumentKind, file: File) {
  const form = new FormData()
  form.append('kind', kind)
  form.append('file', file)
  const { data } = await api.post<{ kind: DocumentKind; status: 'uploaded' | 'rejected' }>(
    `/applications/${applicationId}/documents`,
    form,
  )
  return data
}

/** POST /api/applications/{id}/submit — ReviewStep; then admin queue */
export async function submitApplication(
  applicationId: string,
  body: {
    acceptedTerms: boolean
    signature: string
    amount: number
    termMonths: number
  },
) {
  const { data } = await api.post<{ id: string; reference: string; status: string }>(
    `/applications/${applicationId}/submit`,
    body,
  )
  return data
}

// --- Dashboard (LoanController) --- Dashboard.tsx ---

/** GET /api/loans */
export async function fetchLoans() {
  const { data } = await api.get<{ loans: Loan[] }>('/loans')
  return data
}

/** GET /api/loans/{id} */
export async function fetchLoan(loanId: string) {
  const { data } = await api.get<Loan>(`/loans/${loanId}`)
  return data
}

/** GET /api/repayments */
export async function fetchRepayments() {
  const { data } = await api.get<Payment[]>('/repayments')
  return data
}

/** GET /api/me/documents */
export async function fetchMyDocuments() {
  const { data } = await api.get<Array<{ kind: string; fileName: string; status: string }>>('/me/documents')
  return data
}

// --- Public flows ---

/** POST /api/transfers — Transfer.tsx (no JWT required) */
export async function createTransfer(body: {
  senderName: string
  senderPhone: string
  recipientName: string
  recipientPhone: string
  country: string
  amount: number
}) {
  const { data } = await api.post<{ id: string; reference?: string; fee: number; total: number }>(
    '/transfers',
    body,
  )
  return { ...data, reference: data.reference ?? data.id }
}

/** POST /api/debt-review — DebtReview.tsx (no JWT required) */
export async function createDebtReview(body: {
  fullName: string
  phone: string
  email: string
  situation: string
}) {
  const { data } = await api.post<{ id: string; status: string }>('/debt-review', body)
  return data
}

/** POST /api/contact — ContactPage form → ops inbox via Resend */
export async function createContactMessage(body: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const { data } = await api.post<{ ok: boolean }>('/contact', body)
  return data
}

/** POST /api/repayments — legacy instant demo pay (kept for smoke tests) */
export async function makeRepayment(loanId: string) {
  const { data } = await api.post<Payment>('/repayments', { loanId })
  return data
}

export type PayFastInitiateResponse = {
  processUrl: string
  paymentId: string
  sandbox: boolean
  fields: Record<string, string>
}

/** POST /api/payments/payfast/initiate — signed PayFast form fields */
export async function initiatePayFast(loanId: string) {
  const { data } = await api.post<PayFastInitiateResponse>('/payments/payfast/initiate', { loanId })
  return data
}

/** POST /api/payments/payfast/confirm — sandbox return completion when ITN cannot reach localhost */
export async function confirmPayFastPayment(paymentId: string) {
  const { data } = await api.post<Payment>('/payments/payfast/confirm', { paymentId })
  return data
}

/** POST /api/payments/payfast/cancel — mark abandoned checkout as cancelled */
export async function cancelPayFastPayment(paymentId: string) {
  const { data } = await api.post<Payment>('/payments/payfast/cancel', { paymentId })
  return data
}

/** Build and auto-submit a PayFast checkout form in the browser. */
export function redirectToPayFast(processUrl: string, fields: Record<string, string>) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = processUrl
  form.style.display = 'none'
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}

// --- Admin (AdminController) — AdminPanel.tsx; needs ROLE_ADMIN ---

/** GET /api/admin/overview */
export async function fetchAdminOverview() {
  const { data } = await api.get<AdminOverview>('/admin/overview')
  return data
}

/** GET /api/admin/applications?status=pending */
export async function fetchAdminApplications(status = 'pending') {
  const { data } = await api.get<AdminApplication[]>('/admin/applications', {
    params: { status },
  })
  return data
}

/** POST /api/admin/applications/{id}/decision — approve creates Loan for user */
export async function adminDecideApplication(
  id: string,
  decision: 'approve' | 'decline',
  note?: string,
) {
  const { data } = await api.post<AdminApplication>(`/admin/applications/${id}/decision`, {
    decision,
    note,
  })
  return data
}

/** GET /api/admin/loans */
export async function fetchAdminLoans() {
  const { data } = await api.get<Loan[]>('/admin/loans')
  return data
}

/** GET /api/admin/transfers */
export async function fetchAdminTransfers() {
  const { data } = await api.get<AdminTransfer[]>('/admin/transfers')
  return data
}

/** GET /api/admin/debt-reviews */
export async function fetchAdminDebtReviews() {
  const { data } = await api.get<AdminDebtReview[]>('/admin/debt-reviews')
  return data
}
