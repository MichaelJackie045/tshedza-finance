# Pages and Flows

## Public pages

- Home: value prop, the live repayment ledger as the hero element, links into each product (cash loan, domestic worker loan, transfer, debt review)
- Product pages, one per product: what it is, requirements, a "start application" button
- FAQ
- Contact / branch finder - decide whether this project is online-only or also lists physical locations

## Application flow (cash loan, the primary path)

1. Details: name, ID number, contact info, employment status
2. Documents: upload ID or passport or work permit, latest payslip, 3 months of bank statements
3. Loan terms: amount (R500 to R20,000) and term (1 to 9 months), ledger updates live
4. Review: everything the user entered, editable, before submit
5. Done: confirmation screen with a reference number and expected decision timeframe

Each step is its own route (`/apply/details`, `/apply/documents`, and so on), so a user can be sent back to a specific step if something needs fixing, and the progress bar has something real to point at.

## Domestic worker loan flow

Same five steps, with a shorter Details step (fewer employment questions, since eligibility criteria differ) and pre-filled defaults on the Loan terms step reflecting typical amounts for this product.

## Cross-border transfer flow

A different shape, not a loan application:

1. Sender details (if not already logged in)
2. Recipient details and destination country
3. Amount and fee breakdown - same ledger-style transparency as the loan calculator, adapted to show transfer fee instead of interest
4. Confirm and pay

## Debt review flow

Informational, not transactional:

1. A short explainer on what debt review means
2. A form to request a consultation (name, contact info, rough debt situation)
3. Confirmation that someone will follow up

Build this as a consultation booking, not a loan application clone.

## Authenticated dashboard

- Dashboard home: active loan(s), next payment date and amount, quick link to repayments
- Loan detail: full repayment schedule, remaining balance, original loan terms
- Repayments: payment history, a "make a payment" action
- Documents: the documents submitted with the original application, read-only
- Profile: contact details, ID document status, password and security settings
