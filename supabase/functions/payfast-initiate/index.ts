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
import { generateSignature } from '../_shared/payfast.ts'

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
    if (!current.remaining || Number(current.remaining) <= 0) {
      return jsonResponse({ error: 'Loan has nothing left to pay' }, 400, origin)
    }
    if (!current.next_payment_amount || Number(current.next_payment_amount) <= 0) {
      return jsonResponse({ error: 'No instalment due' }, 400, origin)
    }

    const merchantId = Deno.env.get('PAYFAST_MERCHANT_ID') || ''
    const merchantKey = Deno.env.get('PAYFAST_MERCHANT_KEY') || ''
    const passphrase = Deno.env.get('PAYFAST_PASSPHRASE') || ''
    const sandbox = (Deno.env.get('PAYFAST_SANDBOX') || 'true') !== 'false'
    const returnUrl = Deno.env.get('PAYFAST_RETURN_URL') || 'http://localhost:5173/payments/return'
    const cancelUrl = Deno.env.get('PAYFAST_CANCEL_URL') || 'http://localhost:5173/payments/cancel'
    const notifyUrl = Deno.env.get('PAYFAST_NOTIFY_URL') || ''

    if (!merchantId || !merchantKey) {
      return jsonResponse({ error: 'PayFast not configured' }, 503, origin)
    }

    const paymentId = `PAY-${1000 + Math.floor(Math.random() * 9000)}`
    const amount = Number(Number(current.next_payment_amount).toFixed(2))

    const { error: payErr } = await service.from('repayments').insert({
      id: paymentId,
      loan_id: loanId,
      date: new Date().toISOString(),
      amount,
      method: 'PayFast',
      status: 'pending',
    })
    if (payErr) throw payErr

    const { data: profile } = await service.from('profiles').select('*').eq('id', user.id).single()

    const fields: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${returnUrl}?ref=${encodeURIComponent(paymentId)}`,
      cancel_url: `${cancelUrl}?ref=${encodeURIComponent(paymentId)}`,
    }
    if (notifyUrl) fields.notify_url = notifyUrl
    if (profile?.first_name) fields.name_first = String(profile.first_name).slice(0, 100)
    if (profile?.last_name) fields.name_last = String(profile.last_name).slice(0, 100)
    if (profile?.email || user.email) fields.email_address = profile?.email || user.email || ''
    if (profile?.phone) fields.cell_number = String(profile.phone).replace(/\D/g, '').slice(0, 20)
    fields.m_payment_id = paymentId
    fields.amount = amount.toFixed(2)
    fields.item_name = `Loan repayment ${loanId}`.slice(0, 100)
    fields.item_description = `Instalment for ${loan.product || loanId}`.slice(0, 255)
    fields.custom_str1 = loanId
    fields.custom_str2 = user.id

    const orderedKeys = Object.keys(fields)
    fields.signature = generateSignature(fields, passphrase, orderedKeys)

    const processUrl = sandbox
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process'

    return jsonResponse({ processUrl, paymentId, sandbox, fields }, 200, origin)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})
