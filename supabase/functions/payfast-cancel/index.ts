import {
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
    if ((repayment.status || '').toLowerCase() === 'pending') {
      await service.from('repayments').update({ status: 'cancelled' }).eq('id', paymentId)
      repayment.status = 'cancelled'
    }

    return jsonResponse(mapPayment(repayment), 200, origin)
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
