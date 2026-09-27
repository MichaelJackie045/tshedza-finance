# Tshedza Finance

A full-stack short-term microfinance web platform.

## Features

- **Auth**: Supabase Auth (email/password) with profile roles (`USER` / `ADMIN`).
- **Applications**: 5-step loan application flow with document uploads to Storage.
- **Dashboard**: Active loans, repayment schedules, PayFast (or demo EFT) payments.
- **Transfers**: Cross-border transfer requests (ZW / MZ / LS / BW).
- **Debt Review**: Consultation request form.
- **Admin**: Approve/decline applications (creates loans via Edge Function).

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, TanStack Query, Zustand, React Hook Form + Zod |
| Backend | **Supabase** — Auth, Postgres (RLS), Storage, Edge Functions |
| Payments | PayFast (sandbox/live) via Edge Functions |
| Email | Resend via Edge Functions |

The legacy Spring Boot + H2 API under `backend/` is **retired** (kept in-repo for reference only).

## Architecture

```
React (Vite)  →  supabase-js  →  Auth / Postgres / Storage
                              →  Edge Functions (admin decide, PayFast, contact, repay)
```

| Concern | Frontend | Supabase |
| --- | --- | --- |
| Auth | `store/authStore.ts`, Login/Register | Auth + `profiles` trigger |
| Apply | `apiClient` create/upload/submit | `applications`, Storage `application-docs` |
| Admin decide | `adminDecideApplication` | Edge Function `admin-decide-application` |
| Loans / repay | Dashboard hooks | `loans`, `loan_schedule_items`, `repayments` + `make-repayment` / PayFast functions |
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

Serve Edge Functions (separate terminal):

```bash
cp supabase/.env.example supabase/.env.local
# edit secrets (PayFast / Resend optional for basic flows)
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

## Edge Function secrets

See [`supabase/.env.example`](supabase/.env.example). On hosted Supabase:

```bash
npx supabase secrets set --env-file supabase/.env.local
```

Set `PAYFAST_NOTIFY_URL` to:

`https://YOUR_PROJECT.supabase.co/functions/v1/payfast-notify`

## Running Tests

```bash
cd frontend && npm test
```

## Deploy

### Supabase

1. Create a project at https://supabase.com  
2. `npx supabase link` + `npx supabase db push`  
3. `npx supabase functions deploy`  
4. Set function secrets (Resend, PayFast)

### Frontend — [Vercel](https://vercel.com)

| Setting | Value |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Env | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

In Supabase Auth → URL config, add your Vercel origin to Site URL / Redirect URLs.

### Docker (frontend only)

```bash
export VITE_SUPABASE_URL=...
export VITE_SUPABASE_ANON_KEY=...
docker compose up --build
```

---

*Note: This is a portfolio piece. NCR/FSP registration is required for live lending in South Africa.*
