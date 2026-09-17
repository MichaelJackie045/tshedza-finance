# Tshedza Finance

A full-stack short-term microfinance web platform.

## Features

- **Auth**: JWT-based login and registration.
- **Applications**: 5-step loan application flow with document uploads.
- **Dashboard**: Manage active loans, view repayment schedules, and make payments.
- **Transfers**: Send money cross-border to Zimbabwe, Mozambique, Lesotho, and Botswana.
- **Debt Review**: Informational flow and consultation request.

## Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, TanStack Query, Zustand, Axios.
- **Backend**: Java 21, Spring Boot 3.3, Spring Security, Spring Data JPA, H2 Database.

## How the pieces link

Look for `LINK MAP` comments at the top of key files — they name the paired frontend/backend modules.

| Concern | Frontend | Backend |
| --- | --- | --- |
| Routes / guards | `frontend/src/App.tsx`, `RequireAuth`, `RequireAdmin` | `SecurityConfig`, JWT filter |
| HTTP client | `lib/api.ts` + `lib/apiClient.ts` | Controllers under `/api/*` |
| Auth | `pages/Login.tsx`, `store/authStore.ts` | `AuthenticationController` |
| Apply flow | `components/application/*`, `applicationStore` | `ApplicationController` / `ApplicationService` |
| Admin decide | `pages/admin/AdminPanel.tsx` | `AdminController` → `ApplicationService.decide` |
| Dashboard loans | `pages/Dashboard.tsx` | `LoanController` (loans created on approve) |
| Transfers / debt | `pages/Transfer.tsx`, `DebtReview.tsx` | `TransferController`, `DebtReviewController` |

Typical happy path: **Register/Login → Apply (create + docs + submit) → Admin approve → Loan on Dashboard → Repayment**.

## Getting Started

### Prerequisites

- Node.js 20+
- Java 21+

**Or** Docker Desktop / Docker Engine + Compose (no local Java/Node needed).

### Docker (recommended for a quick run)

From the project root:

```bash
# Optional: copy env overrides (JWT, Resend, PayFast)
cp .env.docker.example .env

docker compose up --build
```

- UI: http://localhost:5173  
- API: http://localhost:8080 (also proxied at http://localhost:5173/api)  
- H2 console: http://localhost:8080/h2-console  

Stop with `Ctrl+C`, or `docker compose down`. Data and uploads persist in named volumes (`backend_data`, `backend_uploads`).

Email keys can also live in `backend/.env.notify` (Compose loads it when present).

### Local (without Docker)

#### 1. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.
The database is a local H2 file at `backend/data/tshedza`.
H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/tshedza`, User: `sa`, Password: `password`).

#### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`.

## Running Tests

From the project root:

```bash
./scripts/test-all.sh
```

Or individually:

```bash
cd backend && ./mvnw test
cd frontend && npm test
```

If Java 21 is not installed globally, `setup-tools.sh` downloads a local JDK into `.tools/` automatically.

## Demo Credentials

- **Customer**: `thabo@example.com` / `Password123!`
- **Admin**: `admin@tshedza.local` / `Admin123!`

## Email (Resend) + WhatsApp

Transactional emails use the [Resend](https://resend.com) Java SDK (free tier).

1. Create an API key at https://resend.com/api-keys  
2. Copy [`backend/.env.notify.example`](backend/.env.notify.example) → `backend/.env.notify` and set `RESEND_API_KEY`  
3. Keep `NOTIFY_FROM_EMAIL=onboarding@resend.dev` until you verify your own domain (you cannot send *from* a Gmail address)  
4. Set `NOTIFY_OPS_EMAIL` to the inbox that should receive contact/ops mail (must be your Resend account email while using `onboarding@resend.dev`)  
5. Start the backend from `backend/` (it auto-loads `.env.notify`)

```bash
cd backend
cp .env.notify.example .env.notify
# edit .env.notify — add your re_ key
./mvnw spring-boot:run
```

If `RESEND_API_KEY` is empty, emails are skipped (logged only).

Emails are sent on: contact form, application submit, approve/decline, repayment cleared, new transfer (ops), debt-review request.

**WhatsApp** is click-to-chat only (`wa.me` links). There is no Meta WhatsApp Business API.

## Deploy (Render + Vercel)

Personal repo: push to GitHub, then connect both hosts to the same repo (not a work org).

### Backend — [Render](https://render.com) Web Service (Docker)

Use **Docker** (not Node). Easiest settings with the **repo-root** [`Dockerfile`](Dockerfile):

| Setting | Value |
| --- | --- |
| Language / Runtime | **Docker** |
| Root Directory | *(leave empty)* |
| Dockerfile Path | `./Dockerfile` or `Dockerfile` |
| Docker Build Context | `.` (repo root) |
| Health Check Path | *(leave empty)* |

Alternative (build only `backend/`):

| Setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Dockerfile Path | `Dockerfile` |

There is also a [`render.yaml`](render.yaml) blueprint.

Set env vars from [`backend/.env.deploy.example`](backend/.env.deploy.example). At minimum:

- `APP_JWT_SECRET` — long random string  
- `APP_UPLOAD_DIR=/app/uploads`  
- `CORS_ALLOWED_ORIGINS` — include your Vercel URL, e.g. `https://YOUR-APP.vercel.app,http://localhost:5173,http://127.0.0.1:5173`

`PORT` is set by Render; `application.yml` reads `${PORT:8080}`.

### Frontend — [Vercel](https://vercel.com)

| Setting | Value |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Env | `VITE_API_URL=https://YOUR-API.onrender.com/api` |

SPA routing is handled by [`frontend/vercel.json`](frontend/vercel.json). Redeploy the frontend after changing any `VITE_*` variable.

---

*Note: This is a portfolio piece. NCR/FSP registration is required for live lending in South Africa.*
