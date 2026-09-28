# Tshedza Finance

A full-stack short-term microfinance web platform.

## Features

- **Auth**: Supabase Auth (email/password) with profile roles (`USER` / `ADMIN`).
- **Applications**: 5-step loan application flow with document uploads to Storage.
- **Dashboard**: Active loans, repayment schedules, and demo checkout (mock payment gateway).
- **Transfers**: Cross-border transfer requests (ZW / MZ / LS / BW).
- **Debt Review**: Consultation request form.
- **Admin**: Approve/decline applications (creates loans via Edge Function).

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, TanStack Query, Zustand, React Hook Form + Zod |
| Backend | **Supabase** — Auth, Postgres (RLS), Storage, Edge Functions |
| Payments | Mock gateway (demo only — not real money) via Edge Functions |
| Email | Resend via Edge Functions |

The legacy Spring Boot + H2 API under `backend/` is **retired** (kept in-repo for reference only).

## Architecture

```
React (Vite)  →  supabase-js  →  Auth / Postgres / Storage
                              →  Edge Functions (admin decide, mock payments, contact, repay)
```

| Concern | Frontend | Supabase |
| --- | --- | --- |
| Auth | `store/authStore.ts`, Login/Register | Auth + `profiles` trigger |
| Apply | `apiClient` create/upload/submit | `applications`, Storage `application-docs` |
| Admin decide | `adminDecideApplication` | Edge Function `admin-decide-application` |
| Loans / repay | Dashboard hooks + mock checkout | `loans`, `loan_schedule_items`, `repayments` + `payment-initiate` / `payment-complete` / `payment-cancel` |
| Transfers / debt | public pages | tables + RLS insert |
| Contact | FAQ form | Edge Function `send-contact` (Resend) |

Happy path: **Register/Login → Apply → Admin approve → Loan on Dashboard → Repayment**.

## Getting Started

### Prerequisites

- Node.js 20+
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local backend) **or** a hosted Supabase project

### 1. Supabase (local)

```bash
# From repo root
npx supabase start
npx supabase db reset          # applies supabase/migrations/*
npx supabase status            # copy API URL + anon key
```

Copy keys into `frontend/.env.development` (or `.env.local`):

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon key from status>
```

`supabase start` loads local function env from `[edge_runtime.secrets]` in [`supabase/config.toml`](supabase/config.toml). That turns the mock gateway on and allows localhost CORS. Resend and other API keys stay in `supabase/.env.local` (gitignored). If you serve functions yourself instead of using the stack from `supabase start`:

```bash
cp supabase/.env.example supabase/.env.local
# edit Resend if you want contact email locally
npx supabase functions serve --env-file supabase/.env.local
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI: http://localhost:5173

### 3. Promote an admin

Register via the UI, then in Supabase Studio SQL:

```sql
UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'you@example.com';
```

## Payments

Checkout is an in-app **mock gateway**. It creates a pending repayment, then the customer confirms or cancels on `/dashboard/repayments/checkout`. Confirming calls `payment-complete`, which clears the repayment and applies the instalment. **No real money is collected.** Leave `MOCK_PAYMENTS_ENABLED` unset (or anything other than `true`) to disable the functions (they return 503). Set `VITE_MOCK_PAYMENTS=true` so the payments page shows a demo banner.

## Edge Function secrets

See [`supabase/.env.example`](supabase/.env.example) (local) and [`supabase/.env.production.example`](supabase/.env.production.example) (hosted). Copy the production template to `supabase/.env.production.local` (gitignored) and apply it with:

```bash
npx supabase secrets set --env-file supabase/.env.production.local
```

Required for a working hosted app:

| Secret | Purpose |
| --- | --- |
| `ALLOWED_ORIGINS` | Comma-separated frontend origins. Browser calls fail CORS without this. |
| `MOCK_PAYMENTS_ENABLED` | `true` to allow demo checkout. Omit it to turn payments off. |
| `MOCK_CHECKOUT_BASE_URL` | Public checkout URL, including `https://…/dashboard/repayments/checkout`. |
| `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_INBOX` | Contact-form email. |

Do not set `ALLOW_LOCAL_ORIGINS` on the hosted project. That flag is for local `supabase functions serve` only.

Security notes: [`SECURITY_RUNBOOK.md`](SECURITY_RUNBOOK.md).

## Running Tests

```bash
cd frontend && npm test
```

## Deploy

Vercel hosts the frontend. Supabase hosts Auth, Postgres, Storage, and Edge Functions. Docker is not the production path: the image does not receive the anon key.

### Supabase

```bash
npx supabase login
npx supabase link --project-ref YOUR_REF
npx supabase db push
npx supabase functions deploy
npx supabase secrets set --env-file supabase/.env.production.local
```

In the Supabase dashboard:

1. Auth → URL configuration: set Site URL and Redirect URLs to the Vercel origin (for example `https://your-app.vercel.app`).
2. Edge Functions: JWT verification should match [`supabase/config.toml`](supabase/config.toml). `payment-initiate`, `payment-complete`, `payment-cancel`, `make-repayment`, and `admin-decide-application` require a JWT. `send-contact` does not.
3. Promote the first admin after they register:

```sql
UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'you@example.com';
```

### Frontend — [Vercel](https://vercel.com)

| Setting | Value |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Env | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MOCK_PAYMENTS=true` |

`VITE_SUPABASE_ANON_KEY` is required at build time. A production build fails if it is missing.

Add the same origin to `ALLOWED_ORIGINS` on Supabase. If you add a custom domain later, add it to Auth URLs, `ALLOWED_ORIGINS`, and `MOCK_CHECKOUT_BASE_URL`, then consider HSTS.

### After deploy

1. Register, apply, upload documents, and submit.
2. Promote an admin, approve the application, and confirm the loan appears on the dashboard.
3. Make a payment, confirm on the demo checkout page, and confirm the balance updates. The demo banner must be visible.
4. Send the contact form and confirm the inbox receives it (Resend secrets set).
5. In the browser network panel, Edge Function responses include `Access-Control-Allow-Origin` for your site.
6. With `MOCK_PAYMENTS_ENABLED` unset, `payment-initiate` returns 503.

---

*Note: This is a portfolio piece. NCR/FSP registration is required for live lending in South Africa.*
