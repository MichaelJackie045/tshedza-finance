import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

export const INTEREST_RATE_MONTHLY = 0.035
export const MAX_JSON_BYTES = 64 * 1024

/** Comma-separated allowlist; empty = reflect request origin only if localhost / unset = * for local only */
export function allowedOrigins(): string[] {
  const raw = Deno.env.get('ALLOWED_ORIGINS') || Deno.env.get('CORS_ALLOWED_ORIGINS') || ''
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function resolveCorsOrigin(requestOrigin?: string | null): string | null {
  const allow = allowedOrigins()
  if (allow.length === 0) {
    // In production, do not reflect origin. Require explicit ALLOWED_ORIGINS.
    // For local dev, reflect localhost origins.
    if (
      Deno.env.get('ALLOW_LOCAL_ORIGINS') === 'true' &&
      requestOrigin &&
      (requestOrigin.startsWith('http://localhost:') || requestOrigin.startsWith('http://127.0.0.1:'))
    ) {
      return requestOrigin
    }
    return null
  }
  if (requestOrigin && allow.includes(requestOrigin)) return requestOrigin
  return allow[0]
}

export function corsHeaders(origin?: string | null): Record<string, string> {
  const resolved = resolveCorsOrigin(origin)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
    'X-Content-Type-Options': 'nosniff',
  }
  if (resolved) {
    headers['Access-Control-Allow-Origin'] = resolved
  }
  return headers
}

export function jsonResponse(body: unknown, status = 200, origin?: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  })
}

export function textResponse(body: string, status = 200, origin?: string | null) {
  return new Response(body, {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export function methodNotAllowed(origin?: string | null) {
  return jsonResponse({ error: 'Method not allowed' }, 405, origin)
}

/** Reject oversized bodies before JSON parse. */
export async function readJsonBody<T = Record<string, unknown>>(
  req: Request,
  maxBytes = MAX_JSON_BYTES,
): Promise<T> {
  const len = Number(req.headers.get('content-length') || '0')
  if (len > maxBytes) throw new Error('Payload too large')
  const buf = await req.arrayBuffer()
  if (buf.byteLength > maxBytes) throw new Error('Payload too large')
  if (buf.byteLength === 0) return {} as T
  try {
    return JSON.parse(new TextDecoder().decode(buf)) as T
  } catch {
    throw new Error('Invalid JSON')
  }
}

export async function readFormBody(
  req: Request,
  maxBytes = MAX_JSON_BYTES,
): Promise<Record<string, string>> {
  const len = Number(req.headers.get('content-length') || '0')
  if (len > maxBytes) throw new Error('Payload too large')
  const text = await req.text()
  if (text.length > maxBytes) throw new Error('Payload too large')
  return Object.fromEntries(new URLSearchParams(text))
}

export function createServiceClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) throw new Error('Server misconfigured')
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

export function createUserClient(authHeader: string): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')
  const anon = Deno.env.get('SUPABASE_ANON_KEY')
  if (!url || !anon) throw new Error('Server misconfigured')
  return createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function requireUser(req: Request) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Unauthorized')
  }
  const userClient = createUserClient(authHeader)
  const { data, error } = await userClient.auth.getUser()
  if (error || !data.user) throw new Error('Unauthorized')
  return { user: data.user, userClient, authHeader }
}

export async function requireAdmin(req: Request) {
  const ctx = await requireUser(req)
  const service = createServiceClient()
  const { data: profile, error } = await service
    .from('profiles')
    .select('role')
    .eq('id', ctx.user.id)
    .single()
  if (error || profile?.role !== 'ADMIN') throw new Error('Forbidden')
  return { ...ctx, service }
}

export function statusForError(message: string): number {
  if (message === 'Unauthorized' || message === 'Missing Authorization') return 401
  if (message === 'Forbidden') return 403
  if (message === 'Payload too large') return 413
  if (message === 'Invalid JSON' || message === 'Method not allowed') return 400
  if (message.includes('required') || message.includes('Invalid')) return 400
  return 500
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

export function calculateTotalRepayable(principal: number, termMonths: number): number {
  const term = Math.max(1, termMonths)
  if (term === 1) {
    return round2(principal + principal * INTEREST_RATE_MONTHLY)
  }
  const r = INTEREST_RATE_MONTHLY
  const factor = Math.pow(1 + r, term)
  const monthly = (principal * r * factor) / (factor - 1)
  return round2(monthly * term)
}

export function addMonths(date: Date, months: number): string {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

export type LoanRow = {
  id: string
  user_id: string
  remaining: number
  monthly_instalment: number | null
  next_payment_date: string | null
  next_payment_amount: number | null
  status: string
}

export type ScheduleItem = {
  id: number
  loan_id: string
  due_date: string
  amount: number
  status: string
}

export async function ensureNextDue(service: SupabaseClient, loan: LoanRow) {
  if (!loan.remaining || loan.remaining <= 0) return loan
  if (loan.next_payment_amount != null && loan.next_payment_amount > 0) return loan

  const instalment = loan.monthly_instalment != null ? loan.monthly_instalment : loan.remaining
  const nextAmount = Math.min(instalment, loan.remaining)
  const nextDate = loan.next_payment_date ?? addMonths(new Date(), 1)

  const { data } = await service
    .from('loans')
    .update({
      next_payment_amount: nextAmount,
      next_payment_date: nextDate,
    })
    .eq('id', loan.id)
    .select('*')
    .single()

  return (data as LoanRow) ?? { ...loan, next_payment_amount: nextAmount, next_payment_date: nextDate }
}

export async function applyInstalment(service: SupabaseClient, loanId: string, amount: number) {
  const { data: loan, error } = await service.from('loans').select('*').eq('id', loanId).single()
  if (error || !loan) throw new Error('Loan not found')

  const { data: schedule } = await service
    .from('loan_schedule_items')
    .select('*')
    .eq('loan_id', loanId)
    .order('due_date', { ascending: true })

  let remaining = Number(loan.remaining) - amount
  let status = loan.status as string
  let nextPaymentDate: string | null = loan.next_payment_date
  let nextPaymentAmount: number | null = Number(loan.next_payment_amount)

  const items = (schedule ?? []) as ScheduleItem[]
  const firstUpcoming = items.find((i) => i.status === 'upcoming')

  if (remaining <= 0) {
    remaining = 0
    status = 'paid'
    nextPaymentAmount = 0
    nextPaymentDate = null
    if (firstUpcoming) {
      await service.from('loan_schedule_items').update({ status: 'paid' }).eq('id', firstUpcoming.id)
    }
  } else {
    if (firstUpcoming) {
      await service.from('loan_schedule_items').update({ status: 'paid' }).eq('id', firstUpcoming.id)
    }
    const nextUpcoming = items.find((i) => i.status === 'upcoming' && i.id !== firstUpcoming?.id)
    if (nextUpcoming) {
      nextPaymentDate = nextUpcoming.due_date
      nextPaymentAmount = Number(nextUpcoming.amount)
    } else {
      const instalment = loan.monthly_instalment != null ? Number(loan.monthly_instalment) : amount
      nextPaymentAmount = Math.min(instalment, remaining)
      const base = loan.next_payment_date ? new Date(loan.next_payment_date) : new Date()
      nextPaymentDate = addMonths(base, 1)
    }
  }

  const { data: updated } = await service
    .from('loans')
    .update({
      remaining,
      status,
      next_payment_date: nextPaymentDate,
      next_payment_amount: nextPaymentAmount,
    })
    .eq('id', loanId)
    .select('*')
    .single()

  return updated
}

export async function sendResendEmail(opts: {
  to: string
  subject: string
  html: string
}) {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const from = Deno.env.get('RESEND_FROM') || 'Tshedza Finance <onboarding@resend.dev>'
  if (!apiKey) {
    console.log('RESEND_API_KEY not set; skipping email', opts.subject)
    return
  }
  if (!isValidEmail(opts.to)) {
    console.warn('Refusing to send to invalid email')
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
  })
}
