import {
  addMonths,
  calculateTotalRepayable,
  corsHeaders,
  escapeHtml,
  jsonResponse,
  methodNotAllowed,
  readJsonBody,
  requireAdmin,
  round2,
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

    const { service } = await requireAdmin(req)
    const body = await readJsonBody<{
      applicationId?: string
      id?: string
      decision?: string
      note?: string
      decisionNote?: string
    }>(req)

    const applicationId = body.applicationId ?? body.id
    const decision = String(body.decision || '').toLowerCase()
    const note = typeof (body.note ?? body.decisionNote) === 'string'
      ? String(body.note ?? body.decisionNote).slice(0, 2000)
      : null

    if (!applicationId || typeof applicationId !== 'string') {
      return jsonResponse({ error: 'applicationId required' }, 400, origin)
    }
    if (decision !== 'approve' && decision !== 'decline') {
      return jsonResponse({ error: 'decision must be approve or decline' }, 400, origin)
    }

    const { data: app, error } = await service
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (error || !app) {
      return jsonResponse({ error: 'Application not found' }, 404, origin)
    }
    if (app.status !== 'pending') {
      return jsonResponse({ error: 'Only pending applications can be decided' }, 400, origin)
    }

    if (decision === 'decline') {
      const { data: saved, error: upErr } = await service
        .from('applications')
        .update({ status: 'declined', decision_note: note })
        .eq('id', applicationId)
        .select('*')
        .single()
      if (upErr) throw upErr

      if (saved.email) {
        await sendResendEmail({
          to: saved.email,
          subject: 'Tshedza Finance — application update',
          html: `<p>Hi ${escapeHtml(saved.first_name || 'there')},</p><p>Your application ${escapeHtml(saved.reference || saved.id)} was declined.</p><p>${escapeHtml(note || '')}</p>`,
        })
      }

      return jsonResponse(mapAdminApplication(saved), 200, origin)
    }

    const termMonths = Math.max(1, Math.min(9, Number(app.term_months) || 1))
    const principal = Number(app.amount)
    if (!Number.isFinite(principal) || principal < 500 || principal > 20000) {
      return jsonResponse({ error: 'Invalid application amount' }, 400, origin)
    }

    const total = calculateTotalRepayable(principal, termMonths)
    const monthlyInstalment = round2(total / termMonths)
    const loanId = `LN-${10000 + Math.floor(Math.random() * 90000)}`
    const productLabel = app.product === 'domestic' ? 'Domestic worker loan' : 'Cash loan'
    const now = new Date()

    const { error: loanErr } = await service.from('loans').insert({
      id: loanId,
      user_id: app.user_id,
      application_id: app.id,
      product: productLabel,
      status: 'active',
      principal,
      remaining: total,
      term_months: termMonths,
      monthly_instalment: monthlyInstalment,
      next_payment_date: addMonths(now, 1),
      next_payment_amount: monthlyInstalment,
    })
    if (loanErr) throw loanErr

    const scheduleRows = []
    for (let month = 1; month <= termMonths; month++) {
      const amount =
        month === termMonths
          ? round2(total - monthlyInstalment * (termMonths - 1))
          : monthlyInstalment
      scheduleRows.push({
        loan_id: loanId,
        due_date: addMonths(now, month),
        amount,
        status: 'upcoming',
      })
    }
    const { error: schedErr } = await service.from('loan_schedule_items').insert(scheduleRows)
    if (schedErr) throw schedErr

    const { data: saved, error: upErr } = await service
      .from('applications')
      .update({ status: 'approved', decision_note: note })
      .eq('id', applicationId)
      .select('*')
      .single()
    if (upErr) throw upErr

    if (saved.email) {
      await sendResendEmail({
        to: saved.email,
        subject: 'Tshedza Finance — application approved',
        html: `<p>Hi ${escapeHtml(saved.first_name || 'there')},</p><p>Your application ${escapeHtml(saved.reference || saved.id)} was approved. Loan ${escapeHtml(loanId)} is now on your dashboard.</p>`,
      })
    }

    return jsonResponse(mapAdminApplication(saved), 200, origin)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return jsonResponse({ error: message }, statusForError(message), origin)
  }
})

function mapAdminApplication(row: Record<string, unknown>) {
  return {
    id: row.id,
    product: row.product,
    amount: Number(row.amount),
    termMonths: row.term_months,
    status: row.status,
    reference: row.reference,
    decisionNote: row.decision_note,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    createdAt: row.created_at,
  }
}
