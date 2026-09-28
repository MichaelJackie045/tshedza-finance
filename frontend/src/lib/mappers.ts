/**
 * Map Supabase snake_case rows → frontend camelCase API shapes.
 */

import type {
  AdminApplication,
  AdminDebtReview,
  AdminOverview,
  AdminTransfer,
  Loan,
  LoanStatus,
  Payment,
  UserProfile,
  UserRole,
} from '@/lib/apiTypes'

export function maskIdNumber(idNumber?: string | null): string | undefined {
  if (!idNumber) return undefined
  const digits = idNumber.replace(/\s/g, '')
  if (digits.length < 4) return '****'
  return `${'*'.repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`
}

export function mapProfile(row: {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  id_number?: string | null
  role?: string | null
}): UserProfile {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name ?? '',
    lastName: row.last_name ?? '',
    phone: row.phone ?? '',
    idNumberMasked: maskIdNumber(row.id_number),
    role: (row.role as UserRole) ?? 'USER',
  }
}

type ScheduleRow = {
  due_date: string
  amount: number | string
  status: string
}

export function mapLoan(
  row: {
    id: string
    product?: string | null
    status?: string | null
    principal?: number | string | null
    remaining?: number | string | null
    next_payment_date?: string | null
    next_payment_amount?: number | string | null
    term_months?: number | null
    monthly_instalment?: number | string | null
    loan_schedule_items?: ScheduleRow[] | null
  },
): Loan {
  const schedule = (row.loan_schedule_items ?? []).map((s) => ({
    dueDate: s.due_date,
    amount: Number(s.amount),
    status: s.status as 'paid' | 'upcoming' | 'overdue',
  }))
  return {
    id: row.id,
    product: row.product ?? '',
    status: (row.status as LoanStatus) ?? 'active',
    principal: Number(row.principal ?? 0),
    remaining: Number(row.remaining ?? 0),
    nextPaymentDate: row.next_payment_date ?? '',
    nextPaymentAmount: Number(row.next_payment_amount ?? 0),
    termMonths: Number(row.term_months ?? 0),
    monthlyInstalment: Number(row.monthly_instalment ?? 0),
    schedule,
  }
}

export function mapPayment(row: {
  id: string
  loan_id?: string | null
  date?: string | null
  amount?: number | string | null
  method?: string | null
  status?: string | null
}): Payment {
  return {
    id: row.id,
    loanId: row.loan_id ?? undefined,
    date: row.date ?? '',
    amount: Number(row.amount ?? 0),
    method: row.method ?? '',
    status: (row.status as Payment['status']) ?? 'pending',
  }
}

export function mapAdminApplication(row: {
  id: string
  product?: string | null
  amount?: number | string | null
  term_months?: number | null
  status?: string | null
  reference?: string | null
  decision_note?: string | null
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  email?: string | null
  created_at?: string | null
}): AdminApplication {
  return {
    id: row.id,
    product: row.product ?? '',
    amount: Number(row.amount ?? 0),
    termMonths: Number(row.term_months ?? 0),
    status: row.status ?? '',
    reference: row.reference ?? undefined,
    decisionNote: row.decision_note ?? undefined,
    firstName: row.first_name ?? undefined,
    lastName: row.last_name ?? undefined,
    phone: row.phone ?? undefined,
    email: row.email ?? undefined,
    createdAt: row.created_at ?? undefined,
  }
}

export function mapAdminTransfer(row: {
  id: string
  sender_name: string
  sender_phone?: string | null
  recipient_name: string
  recipient_phone?: string | null
  country: string
  total: number | string
  status: string
  created_at?: string | null
}): AdminTransfer {
  return {
    id: row.id,
    senderName: row.sender_name,
    senderPhone: row.sender_phone ?? undefined,
    recipientName: row.recipient_name,
    recipientPhone: row.recipient_phone ?? undefined,
    country: row.country,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at ?? undefined,
  }
}

export function mapAdminDebtReview(row: {
  id: string
  full_name: string
  phone: string
  email: string
  situation: string
  status: string
  created_at?: string | null
}): AdminDebtReview {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    situation: row.situation,
    status: row.status,
    createdAt: row.created_at ?? undefined,
  }
}

export function mapAdminOverview(row: {
  pending_applications?: number
  approved_applications?: number
  declined_applications?: number
  active_loans?: number
  pending_transfers?: number
  debt_review_requests?: number
}): AdminOverview {
  return {
    pendingApplications: Number(row.pending_applications ?? 0),
    approvedApplications: Number(row.approved_applications ?? 0),
    declinedApplications: Number(row.declined_applications ?? 0),
    activeLoans: Number(row.active_loans ?? 0),
    pendingTransfers: Number(row.pending_transfers ?? 0),
    debtReviewRequests: Number(row.debt_review_requests ?? 0),
  }
}
