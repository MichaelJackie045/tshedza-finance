const BASE = 'http://127.0.0.1:8080/api'

function check(ok, message) {
  if (!ok) {
    throw new Error(message)
  }
}

async function postJson(path, body, token) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  return { res, data }
}

async function getJson(path, token) {
  const res = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  return { res, data }
}

async function postForm(path, fields, token) {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value)
  }
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  return { res, data }
}

async function main() {
  const now = Date.now()
  const userEmail = `audit.user.${now}@example.com`
  const debtEmail = `audit.debt.${now}@example.com`

  console.log('1. Registering fresh user')
  const register = await postJson('/auth/register', {
    email: userEmail,
    password: 'Password123!',
    firstName: 'Audit',
    lastName: 'User',
    phone: '0821234567',
  })
  check(register.res.ok, `register failed: ${register.res.status}`)
  check(register.data?.accessToken, 'register missing access token')
  const userToken = register.data.accessToken

  console.log('2. Creating application')
  const application = await postJson(
    '/applications',
    {
      product: 'cash',
      amount: 5000,
      termMonths: 1,
      details: {
        firstName: 'Audit',
        lastName: 'User',
        idNumber: '9001015800088',
        phone: '0821234567',
        email: userEmail,
        presentAddress: '12 Audit Street',
        city: 'Johannesburg',
        province: 'Gauteng',
        postCode: '2000',
        occupation: 'Clerk',
        employmentStatus: 'employed',
        monthlyIncome: '8500',
      },
    },
    userToken,
  )
  check(application.res.ok, `create application failed: ${application.res.status}`)
  const applicationId = application.data?.id
  check(applicationId, 'application missing id')

  console.log('3. Uploading documents')
  const file = new Blob(['audit-file'], { type: 'text/plain' })
  for (const kind of ['id', 'payslip', 'bank1', 'bank2', 'bank3']) {
    const upload = await postForm(
      `/applications/${applicationId}/documents`,
      { kind, file },
      userToken,
    )
    check(upload.res.ok, `upload ${kind} failed: ${upload.res.status}`)
  }

  console.log('4. Submitting application')
  const submitted = await postJson(
    `/applications/${applicationId}/submit`,
    { acceptedTerms: true, signature: 'Audit User' },
    userToken,
  )
  check(submitted.res.ok, `submit application failed: ${submitted.res.status}`)
  check(submitted.data?.status === 'pending', `expected pending status, got ${submitted.data?.status}`)

  console.log('5. User-side loan endpoints before admin decision')
  const preLoans = await getJson('/loans', userToken)
  check(preLoans.res.ok, `get loans failed: ${preLoans.res.status}`)
  check(Array.isArray(preLoans.data?.loans), 'loans response malformed')

  console.log('6. Creating transfer')
  const transfer = await postJson('/transfers', {
    senderName: 'Audit User',
    senderPhone: '0821234567',
    recipientName: 'Receiver',
    recipientPhone: '0712345678',
    country: 'ZW',
    amount: 2500,
  })
  check(transfer.res.ok, `create transfer failed: ${transfer.res.status}`)
  check(transfer.data?.status === 'pending', `expected pending transfer, got ${transfer.data?.status}`)

  console.log('7. Creating debt review request')
  const debt = await postJson('/debt-review', {
    fullName: 'Audit Debt',
    phone: '0821234567',
    email: debtEmail,
    situation: 'I am struggling with several repayments and need structured guidance.',
  })
  check(debt.res.ok, `create debt review failed: ${debt.res.status}`)
  check(debt.data?.status === 'received', `expected received debt review, got ${debt.data?.status}`)

  console.log('8. Logging in as seeded admin')
  const adminLogin = await postJson('/auth/login', {
    email: 'admin@tshedza.local',
    password: 'Admin123!',
  })
  check(adminLogin.res.ok, `admin login failed: ${adminLogin.res.status}`)
  const adminToken = adminLogin.data?.accessToken
  check(adminToken, 'admin login missing token')

  console.log('9. Verifying admin overview + queue')
  const overview = await getJson('/admin/overview', adminToken)
  check(overview.res.ok, `admin overview failed: ${overview.res.status}`)
  const queue = await getJson('/admin/applications?status=pending', adminToken)
  check(queue.res.ok, `admin applications failed: ${queue.res.status}`)
  check(Array.isArray(queue.data), 'admin queue malformed')
  check(queue.data.some((item) => item.id === applicationId), 'new application missing from admin queue')

  console.log('10. Approving application from admin')
  const approval = await postJson(
    `/admin/applications/${applicationId}/decision`,
    { decision: 'approve', note: 'Audit approval' },
    adminToken,
  )
  check(approval.res.ok, `approve application failed: ${approval.res.status}`)
  check(approval.data?.status === 'approved', `expected approved status, got ${approval.data?.status}`)

  console.log('11. Verifying admin loans after approval')
  const adminLoans = await getJson('/admin/loans', adminToken)
  check(adminLoans.res.ok, `admin loans failed: ${adminLoans.res.status}`)
  check(Array.isArray(adminLoans.data), 'admin loans malformed')

  console.log('12. Verifying user dashboard + repayment endpoints after approval')
  const userLoans = await getJson('/loans', userToken)
  check(userLoans.res.ok, `user loans after approval failed: ${userLoans.res.status}`)
  const latestLoan = userLoans.data?.loans?.at(-1)
  check(latestLoan?.id, 'approved application did not produce a loan')

  const loanDetail = await getJson(`/loans/${latestLoan.id}`, userToken)
  check(loanDetail.res.ok, `loan detail failed: ${loanDetail.res.status}`)

  const repayment = await postJson('/repayments', { loanId: latestLoan.id }, userToken)
  check(repayment.res.ok, `make repayment failed: ${repayment.res.status}`)

  const repayments = await getJson('/repayments', userToken)
  check(repayments.res.ok, `get repayments failed: ${repayments.res.status}`)
  check(Array.isArray(repayments.data), 'repayments response malformed')

  const debtList = await getJson('/admin/debt-reviews', adminToken)
  check(debtList.res.ok, `admin debt reviews failed: ${debtList.res.status}`)
  const transferList = await getJson('/admin/transfers', adminToken)
  check(transferList.res.ok, `admin transfers failed: ${transferList.res.status}`)

  console.log('Smoke audit passed')
  console.log(JSON.stringify({
    userEmail,
    applicationId,
    approvedLoanId: latestLoan.id,
    transferId: transfer.data?.id,
    debtReviewId: debt.data?.id,
  }, null, 2))
}

main().catch((error) => {
  console.error('Smoke audit failed')
  console.error(error)
  process.exit(1)
})
