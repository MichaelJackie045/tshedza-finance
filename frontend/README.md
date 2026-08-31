# Tshedza Finance — Frontend

Short-term microfinance UI built from the project brief and design system.

## Stack

React 19 + Vite + TypeScript · Tailwind CSS 4 · React Router · TanStack Query · Zustand · React Hook Form + Zod

## Run

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## What’s included

- **Home** — brand hero + live repayment ledger
- **Products** — cash loan, domestic worker, cross-border transfer, debt review
- **Apply** — 5-step flow (`/apply/details` → documents → terms → review → done)
- **Dashboard** — loan status, schedule, repayments, documents, profile

Application progress persists to `sessionStorage` only. API calls are mocked until a Django backend is connected (`VITE_API_URL`).
