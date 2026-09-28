/**
 * One function per former Spring endpoint — now backed by Supabase.
 *
 * Auth / tables / storage: direct supabase-js + RLS
 * Privileged flows: Edge Functions (admin decide, mock payments, repayments, contact)
 */

import { calculateTransferFee } from '@/lib/loanCalc'
import { mapAdminApplication, mapAdminDebtReview, mapAdminOverview, mapAdminTransfer, mapLoan, mapPayment, mapProfile } from '@/lib/mappers'
import { invokeFunction, supabase } from '@/lib/supabase'
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

function assertNoError(error: { message: string } | null) {
  if (error) throw new Error(error.message)
}

function assertData<T>(data: T | null, error: { message: string } | null): T {
  assertNoError(error)
  if (data == null) throw new Error('No data returned')
  return data
}

async function currentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser()
  assertNoError(error)
  if (!data.user) throw new Error('Not authenticated')
  return data.user.id
}

async function fetchProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  assertNoError(error)
  return mapProfile(data)
}

// --- Auth ---

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  assertNoError(error)
  if (!data.session || !data.user) throw new Error('Login failed')
  const user = await fetchProfile(data.user.id)
  return { accessToken: data.session.access_token, user }
}

export async function register(body: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        first_name: body.firstName,
        last_name: body.lastName,
        phone: body.phone,
      },
    },
  })
  assertNoError(error)
  if (!data.user) throw new Error('Registration failed')

  // Ensure profile name/phone are set (email/role locked by DB trigger)
  await supabase
    .from('profiles')
    .update({
      first_name: body.firstName,
      last_name: body.lastName,
      phone: body.phone,
    })
    .eq('id', data.user.id)

  if (!data.session) {
    // Email confirmations enabled — session may be null
    throw new Error('Check your email to confirm your account, then log in.')
  }

  const user = await fetchProfile(data.user.id)
  return { accessToken: data.session.access_token, user }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  assertNoError(error)
}

export async function fetchMe(): Promise<UserProfile> {
  const userId = await currentUserId()
  return fetchProfile(userId)
}

// --- Apply flow ---

export async function createApplication(body: {
  product: ProductType
  amount: number
  termMonths: number
  details: Partial<DetailsForm> & { employerName?: string; weeklyWage?: string }
}) {
  const userId = await currentUserId()
  const details = body.details ?? {}

  // Sync profile from application details
  const profilePatch: Record<string, string> = {}
  if (details.firstName) profilePatch.first_name = details.firstName.trim()
  if (details.lastName) profilePatch.last_name = details.lastName.trim()
  if (details.phone) profilePatch.phone = details.phone.trim()
  if (details.idNumber) profilePatch.id_number = details.idNumber.trim()
  if (Object.keys(profilePatch).length) {
    await supabase.from('profiles').update(profilePatch).eq('id', userId)
  }

  const parseIncome = (value?: string) => {
    if (!value || !String(value).trim()) return null
    return Number(String(value).replace(/\s/g, ''))
  }

  const row = {
    user_id: userId,
    product: body.product,
    amount: body.amount,
    term_months: body.termMonths,
    status: 'draft',
    first_name: details.firstName ?? null,
    last_name: details.lastName ?? null,
    id_number: details.idNumber ?? null,
    phone: details.phone ?? null,
    email: details.email ?? null,
    present_address: details.presentAddress ?? null,
    city: details.city ?? null,
    province: details.province ?? null,
    post_code: details.postCode ?? null,
    occupation: details.occupation ?? null,
    employment_status: details.employmentStatus ?? null,
    monthly_income: parseIncome(details.monthlyIncome),
    employer_name: details.employerName ?? null,
    weekly_wage: parseIncome(details.weeklyWage),
  }

  // Reuse latest draft if present
  const { data: existing } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'draft')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing?.id) {
    const { data, error } = await supabase
      .from('applications')
      .update(row)
      .eq('id', existing.id)
      .select('id, status')
      .single()
    const saved = assertData(data, error)
    return { id: saved.id as string, status: saved.status as string }
  }

  const { data, error } = await supabase.from('applications').insert(row).select('id, status').single()
  const saved = assertData(data, error)
  return { id: saved.id as string, status: saved.status as string }
}

export async function uploadDocument(applicationId: string, kind: DocumentKind, file: File) {
  const allowedKinds: DocumentKind[] = [
    'id',
    'payslip',
    'bank1',
    'bank2',
    'bank3',
    'address',
    'employment',
  ]
  if (!allowedKinds.includes(kind)) {
    throw new Error('Invalid document kind')
  }

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (file.type && !allowedTypes.includes(file.type)) {
    throw new Error('Unsupported file type')
  }
  if (file.size <= 0 || file.size > 8 * 1024 * 1024) {
    throw new Error('File must be under 8 MB')
  }

  const userId = await currentUserId()
  const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(0, 120)
  const path = `${userId}/${applicationId}/${kind}_${crypto.randomUUID()}_${safeName}`

  const { error: upErr } = await supabase.storage.from('application-docs').upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  })
  assertNoError(upErr)

  const { error: metaErr } = await supabase.from('application_documents').insert({
    application_id: applicationId,
    kind,
    file_name: file.name.slice(0, 255),
    storage_path: path,
    status: 'uploaded',
  })
  assertNoError(metaErr)

  return { kind, status: 'uploaded' as const }
}

export async function submitApplication(
  applicationId: string,
  body: {
    acceptedTerms: boolean
    signature: string
    amount: number
    termMonths: number
  },
) {
  const reference = `TF-${Date.now() % 100000000}`
  const { data, error } = await supabase
    .from('applications')
    .update({
      status: 'pending',
      reference,
      amount: body.amount,
      term_months: body.termMonths,
    })
    .eq('id', applicationId)
    .select('id, reference, status')
    .single()
  const saved = assertData(data, error)
  return {
    id: saved.id as string,
    reference: (saved.reference as string) ?? reference,
    status: saved.status as string,
  }
}

// --- Dashboard ---

export async function fetchLoans() {
  const { data, error } = await supabase
    .from('loans')
    .select('*, loan_schedule_items(*)')
    .order('created_at', { ascending: false })
  assertNoError(error)
  return { loans: (data ?? []).map(mapLoan) }
}

export async function fetchLoan(loanId: string): Promise<Loan> {
  const { data, error } = await supabase
    .from('loans')
    .select('*, loan_schedule_items(*)')
    .eq('id', loanId)
    .single()
  assertNoError(error)
  return mapLoan(data)
}

export async function fetchRepayments(): Promise<Payment[]> {
  const userId = await currentUserId()
  const { data: loans, error: loanErr } = await supabase.from('loans').select('id').eq('user_id', userId)
  assertNoError(loanErr)
  const loanIds = (loans ?? []).map((l) => l.id)
  if (!loanIds.length) return []

  const { data, error } = await supabase
    .from('repayments')
    .select('*')
    .in('loan_id', loanIds)
    .order('date', { ascending: false })
  assertNoError(error)
  return (data ?? []).map(mapPayment)
}

export async function fetchMyDocuments() {
  const userId = await currentUserId()
  const { data: apps, error: appErr } = await supabase.from('applications').select('id').eq('user_id', userId)
  assertNoError(appErr)
  const appIds = (apps ?? []).map((a) => a.id)
  if (!appIds.length) return []

  const { data, error } = await supabase
    .from('application_documents')
    .select('kind, file_name, status')
    .in('application_id', appIds)
  assertNoError(error)
  return (data ?? []).map((d) => ({
    kind: d.kind as string,
    fileName: d.file_name as string,
    status: d.status as string,
  }))
}

// --- Public flows ---

export async function createTransfer(body: {
  senderName: string
  senderPhone: string
  recipientName: string
  recipientPhone: string
  country: string
  amount: number
}) {
  const quote = calculateTransferFee(body.amount, body.country)
  const id = `TX-${Date.now() % 100000000}`
  // No .select() — anon/authenticated can INSERT but only admins can SELECT
  const { error } = await supabase.from('transfers').insert({
    id,
    sender_name: body.senderName,
    sender_phone: body.senderPhone,
    recipient_name: body.recipientName,
    recipient_phone: body.recipientPhone,
    country: body.country,
    amount: quote.amount,
    fee: quote.fee,
    total: quote.total,
    status: 'pending',
  })
  assertNoError(error)
  return {
    id,
    reference: id,
    fee: quote.fee,
    total: quote.total,
  }
}

export async function createDebtReview(body: {
  fullName: string
  phone: string
  email: string
  situation: string
}) {
  const id = crypto.randomUUID()
  const { error } = await supabase.from('debt_review_requests').insert({
    id,
    full_name: body.fullName,
    phone: body.phone,
    email: body.email,
    situation: body.situation,
    status: 'pending',
  })
  assertNoError(error)
  return { id, status: 'pending' }
}

export async function createContactMessage(body: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  return invokeFunction<{ ok: boolean }>('send-contact', body)
}

export async function makeRepayment(loanId: string): Promise<Payment> {
  return invokeFunction<Payment>('make-repayment', { loanId })
}

export type PaymentInitiateResponse = {
  paymentId: string
  checkoutUrl: string
  amount: number
}

export async function initiatePayment(loanId: string) {
  return invokeFunction<PaymentInitiateResponse>('payment-initiate', { loanId })
}

export async function completePayment(paymentId: string) {
  return invokeFunction<Payment>('payment-complete', { paymentId })
}

export async function cancelPayment(paymentId: string) {
  return invokeFunction<Payment>('payment-cancel', { paymentId })
}

// --- Admin ---

export async function fetchAdminOverview(): Promise<AdminOverview> {
  const { data, error } = await supabase.rpc('get_admin_overview')
  assertNoError(error)
  return mapAdminOverview((data as Record<string, number>) ?? {})
}

export async function fetchAdminApplications(status = 'pending'): Promise<AdminApplication[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  assertNoError(error)
  return (data ?? []).map(mapAdminApplication)
}

export async function adminDecideApplication(
  id: string,
  decision: 'approve' | 'decline',
  note?: string,
): Promise<AdminApplication> {
  return invokeFunction<AdminApplication>('admin-decide-application', {
    applicationId: id,
    decision,
    note,
  })
}

export async function fetchAdminLoans(): Promise<Loan[]> {
  const { data, error } = await supabase
    .from('loans')
    .select('*, loan_schedule_items(*)')
    .order('created_at', { ascending: false })
  assertNoError(error)
  return (data ?? []).map(mapLoan)
}

export async function fetchAdminTransfers(): Promise<AdminTransfer[]> {
  const { data, error } = await supabase
    .from('transfers')
    .select('*')
    .order('created_at', { ascending: false })
  assertNoError(error)
  return (data ?? []).map(mapAdminTransfer)
}

export async function fetchAdminDebtReviews(): Promise<AdminDebtReview[]> {
  const { data, error } = await supabase
    .from('debt_review_requests')
    .select('*')
    .order('created_at', { ascending: false })
  assertNoError(error)
  return (data ?? []).map(mapAdminDebtReview)
}
