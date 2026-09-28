# Frontend (Vite + React)

## Setup

```bash
npm install
cp .env.example .env.local
# set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

Application progress persists to `sessionStorage` only. API calls go to Supabase (Auth, Postgres, Storage, Edge Functions) via `@supabase/supabase-js` — see `src/lib/apiClient.ts` and `src/lib/supabase.ts`.
