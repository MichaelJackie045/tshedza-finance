import {
  applyInstalment,
  corsHeaders,
  createServiceClient,
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

    const { user } = await requireUser(req)
    const sandbox = (Deno.env.get('PAYFAST_SANDBOX') || 'true') !== 'false'
    if (!sandbox) {
      return jsonResponse({ error: 'Return confirm only allowed in sandbox' }, 400, origin)
    }

    const { paymentId } = await readJsonBody<{ paymentId?: string }>(req)
    if (!paymentId || typeof paymentId !== 'string' || paymentId.length > 64) {
      return jsonResponse({ error: 'paymentId required' }, 400, origin)
    }

    const service = createServiceClient()
    const { data: repayment, error } = await service
      .from('repayments')
      .select('*, loans!inner(user_id)')
      .eq('id', paymentId)
      .single()

    if (error || !repayment) return jsonResponse({ error: 'Not found' }, 404, origin)
    const loanUserId = (repayment as { loans: { user_id: string } }).loans?.user_id
    if (loanUserId !== user.id) return jsonResponse({ error: 'Forbidden' }, 403, origin)

    if ((repayment.status || '').toLowerCase() === 'cleared') {
      return jsonResponse(mapPayment(repayment), 200, origin)
    }
    if ((repayment.status || '').toLowerCase() !== 'pending') {
      return jsonResponse({ error: 'Payment is not pending' }, 400, origin)
    }

    await service
      .from('repayments')
      .update({
        status: 'cleared',
        method: 'PayFast',
        pf_payment_id: 'SANDBOX-LOCAL',
        date: new Date().toISOString(),
      })
      .eq('id', paymentId)

    await applyInstalment(service, repayment.loan_id, Number(repayment.amount))

    const { data: updated } = await service.from('repayments').select('*').eq('id', paymentId).single()
    return jsonResponse(mapPayment(updated ?? repayment), 200, origin)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})

function mapPayment(row: Record<string, unknown>) {
  return {
    id: row.id,
    date: row.date,
    amount: Number(row.amount),
    method: row.method,
    status: row.status,
  }
}
