# Project Brief: Tshedza Finance

## Brand structure

Same pattern as Tsebo (product brand) / Tsebo Solutions Group (registered company):

- **Tshedza Finance** — the loan product and public website brand (header wordmark, apply flow, “follow” line).
- **Tshedza and Canaan Group of Companies** — the registered parent (footer legal line). Enterprise number **2026/462710/07**.

## What this is

A short-term microfinance web platform. Users apply for cash loans from R500 to R20,000, upload ID and income documents, get a decision, and manage repayments online. Same market as Atlas Finance, different brand and build.

## Target users

- South African adults with a payslip or verifiable income, applying for cash loans between paydays
- Domestic workers needing a dedicated, simpler loan product
- Users sending cross-border money transfers
- Users in debt review needing guidance, not just loans

## Core products (the frontend needs a flow for each)

- Short-term cash loan: R500 to R20,000, 1 to 9 month terms
- Domestic worker loan: same core flow, simplified eligibility questions
- Cross-border transfer: separate flow, recipient details instead of loan terms
- Debt review assistance: an informational flow that routes to a consultation booking, not a loan application

## Compliance context - flag this before you build further

Atlas operates as an NCR-registered credit provider (NCRCP 3994) and an authorised FSP (FSP 46412). If this project moves past a portfolio piece, you need the same registrations before you can legally originate loans in South Africa. Build the frontend now. Treat "connect to a licensed backend" as a separate, later milestone, not something to skip past.

## What "done" looks like for the frontend

- A user completes a full loan application in one sitting on mobile, start to finish
- Every required document (ID, payslip, 3 months of bank statements) has a clear, obvious upload point
- A logged-in user sees loan status, next payment date, and amount owing without hunting for it
