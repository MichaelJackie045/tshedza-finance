import {
  corsHeaders,
  escapeHtml,
  isValidEmail,
  jsonResponse,
  methodNotAllowed,
  readJsonBody,
  sendResendEmail,
  statusForError,
} from '../_shared/cors.ts'

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for') || ''
  const first = forwarded.split(',')[0]?.trim()
  return first || req.headers.get('cf-connecting-ip') || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  try {
    if (req.method !== 'POST') return methodNotAllowed(origin)
    if (isRateLimited(clientIp(req))) {
      return jsonResponse({ error: 'Too many requests' }, 429, origin)
    }

    const body = await readJsonBody<{
      name?: string
      email?: string
      phone?: string
      message?: string
      website?: string // honeypot
    }>(req, 16 * 1024)

    // Honeypot: bots fill hidden fields
    if (body.website) {
      return jsonResponse({ ok: true }, 200, origin)
    }

    const name = String(body.name || '').trim().slice(0, 120)
    const email = String(body.email || '').trim().slice(0, 254)
    const phone = String(body.phone || '').trim().slice(0, 20)
    const message = String(body.message || '').trim().slice(0, 4000)

    if (name.length < 2 || !isValidEmail(email) || message.length < 5) {
      return jsonResponse({ error: 'name, email, and message are required' }, 400, origin)
    }

    const inbox = Deno.env.get('CONTACT_INBOX') || Deno.env.get('RESEND_TO') || ''
    if (!inbox || !isValidEmail(inbox)) {
      console.warn('CONTACT_INBOX not configured')
      return jsonResponse({ ok: true }, 200, origin)
    }

    await sendResendEmail({
      to: inbox,
      subject: `Contact form: ${name}`.slice(0, 200),
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
             <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
             <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    })

    return jsonResponse({ ok: true }, 200, origin)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})
