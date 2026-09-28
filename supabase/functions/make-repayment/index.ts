import {
  applyInstalment,
  corsHeaders,
  createServiceClient,
  ensureNextDue,
  escapeHtml,
  jsonResponse,
  methodNotAllowed,
  readJsonBody,
  requireUser,
  sendResendEmail,
  statusForError,
} from '../_shared/cors.ts'

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    if (req.method !== 'POST') return methodNotAllowed(origin)

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
    if (!current.next_payment_amount || Number(current.next_payment_amount) <= 0) {
      return jsonResponse({ error: 'No instalment due' }, 400, origin)
    }

    const paymentId = `PAY-${1000 + Math.floor(Math.random() * 9000)}`
    const amount = Number(current.next_payment_amount)

    const { data: repayment, error: payErr } = await service
      .from('repayments')
      .insert({
        id: paymentId,
        loan_id: loanId,
        date: new Date().toISOString(),
        amount,
        method: 'EFT',
        status: 'cleared',
      })
      .select('*')
      .single()
    if (payErr) throw payErr

    await applyInstalment(service, loanId, amount)

    const { data: profile } = await service
      .from('profiles')
      .select('email, first_name')
      .eq('id', user.id)
      .single()
    if (profile?.email) {
      await sendResendEmail({
        to: profile.email,
        subject: 'Tshedza Finance — repayment received',
        html: `<p>Hi ${escapeHtml(profile.first_name || 'there')},</p><p>We received your repayment of R${amount.toFixed(2)} for loan ${escapeHtml(loanId)}.</p>`,
      })
    }

    return jsonResponse(
      {
        id: repayment.id,
        date: repayment.date,
        amount: Number(repayment.amount),
        method: repayment.method,
        status: repayment.status,
      },
      200,
      origin,
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})
