import {
  applyInstalment,
  corsHeaders,
  createServiceClient,
  readFormBody,
  textResponse,
} from '../_shared/cors.ts'
import { generateFromPostedOrder, pfEncode } from '../_shared/payfast.ts'

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    if (req.method !== 'POST') {
      return textResponse('Method not allowed', 405, origin)
    }

    const contentType = req.headers.get('content-type') || ''
    let posted: Record<string, string> = {}

    if (contentType.includes('application/json')) {
      const len = Number(req.headers.get('content-length') || '0')
      if (len > 64 * 1024) return textResponse('Payload too large', 413, origin)
      posted = await req.json()
    } else {
      posted = await readFormBody(req)
    }

    const passphrase = Deno.env.get('PAYFAST_PASSPHRASE') || ''
    const merchantId = Deno.env.get('PAYFAST_MERCHANT_ID') || ''
    const sandbox = (Deno.env.get('PAYFAST_SANDBOX') || 'true') !== 'false'

    const expectedSig = generateFromPostedOrder(posted, passphrase)
    const actualSig = posted.signature
    if (!actualSig || actualSig.toLowerCase() !== expectedSig.toLowerCase()) {
      console.warn('PayFast ITN signature mismatch')
      return textResponse('Invalid signature', 400, origin)
    }

    if (!merchantId || posted.merchant_id !== merchantId) {
      return textResponse('Merchant mismatch', 400, origin)
    }

    const paramString = Object.entries(posted)
      .filter(([k]) => k !== 'signature')
      .map(([k, v]) => `${k}=${pfEncode(v ?? '')}`)
      .join('&')

    const validateUrl = sandbox
      ? 'https://sandbox.payfast.co.za/eng/query/validate'
      : 'https://www.payfast.co.za/eng/query/validate'

    const validateRes = await fetch(validateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: paramString,
    })
    const validateBody = (await validateRes.text()).trim()
    if (validateBody.toUpperCase() !== 'VALID') {
      console.warn('PayFast validation failed', validateBody)
      return textResponse('PayFast validation failed', 400, origin)
    }

    if ((posted.payment_status || '').toUpperCase() !== 'COMPLETE') {
      return textResponse('OK', 200, origin)
    }

    const paymentId = posted.m_payment_id
    if (!paymentId || paymentId.length > 64) {
      return textResponse('OK', 200, origin)
    }

    const service = createServiceClient()
    const { data: repayment } = await service.from('repayments').select('*').eq('id', paymentId).single()
    if (!repayment) {
      console.warn('Unknown payment', paymentId)
      return textResponse('OK', 200, origin)
    }
    if ((repayment.status || '').toLowerCase() === 'cleared') {
      return textResponse('OK', 200, origin)
    }

    const expected = Number(repayment.amount)
    const gross = Number(posted.amount_gross || '0')
    if (Math.abs(expected - gross) > 0.01) {
      return textResponse('Amount mismatch', 400, origin)
    }

    // Bind custom fields if present
    if (posted.custom_str1 && posted.custom_str1 !== repayment.loan_id) {
      return textResponse('Loan mismatch', 400, origin)
    }

    await service
      .from('repayments')
      .update({
        status: 'cleared',
        method: 'PayFast',
        pf_payment_id: (posted.pf_payment_id || '').slice(0, 128) || null,
        date: new Date().toISOString(),
      })
      .eq('id', paymentId)

    await applyInstalment(service, repayment.loan_id, expected)

    return textResponse('OK', 200, origin)
  } catch (e) {
    console.error(e)
    return textResponse('Error', 500, origin)
  }
})
