import {
  corsHeaders,
  createServiceClient,
  ensureNextDue,
  jsonResponse,
  methodNotAllowed,
  readJsonBody,
  requireUser,
  statusForError,
} from '../_shared/cors.ts'

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    if (req.method !== 'POST') return methodNotAllowed(origin)
    if (Deno.env.get('MOCK_PAYMENTS_ENABLED') !== 'true') {
      return jsonResponse({ error: 'Payments are not configured' }, 503, origin)
    }

    const { user } = await requireUser(req)
    const { loanId } = await readJsonBody<{ loanId?: string }>(req)
    if (!loanId || typeof loanId !== 'string' || loanId.length > 64) {
      return jsonResponse({ error: 'loanId required' }, 400, origin)
    }

    const service = createServiceClient()
    const { data: loan, error } = await service.from('loans').select('*').eq('id', loanId).single()
    if (error || !loan) return jsonResponse({ error: 'Loan not found' }, 404, origin)
    if (loan.user_id !== user.id) return jsonResponse({ error: 'Forbidden' }, 403, origin)

    const current = await ensureNextDue(service, loan)
    if (!current.remaining || Number(current.remaining) <= 0) {
      return jsonResponse({ error: 'Loan has nothing left to pay' }, 400, origin)
    }
    if (!current.next_payment_amount || Number(current.next_payment_amount) <= 0) {
      return jsonResponse({ error: 'No instalment due' }, 400, origin)
    }

    const paymentId = `PAY-${1000 + Math.floor(Math.random() * 9000)}`
    const amount = Number(Number(current.next_payment_amount).toFixed(2))

    const { error: payErr } = await service.from('repayments').insert({
      id: paymentId,
      loan_id: loanId,
      date: new Date().toISOString(),
      amount,
      method: 'Mock',
      status: 'pending',
    })
    if (payErr) throw payErr

    const base =
      Deno.env.get('MOCK_CHECKOUT_BASE_URL') ||
      'http://localhost:5173/dashboard/repayments/checkout'
    const sep = base.includes('?') ? '&' : '?'
    const checkoutUrl = `${base}${sep}ref=${encodeURIComponent(paymentId)}`

    return jsonResponse({ paymentId, checkoutUrl, amount }, 200, origin)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})
