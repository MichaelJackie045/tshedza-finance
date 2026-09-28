# Security Runbook — Tshedza Finance

This runbook describes non-destructive fixes applied in `security/hardening` branch and safe steps to purge secrets from git history.

Non-destructive changes applied:
- Removed hardcoded Supabase anon key from `frontend/src/lib/supabase.ts` and switched to env-only usage. Production builds throw if `VITE_SUPABASE_ANON_KEY` is missing.
- Replaced committed anon keys in `frontend/.env.*` and `.env.docker.example` with placeholders.
- Stopped baking secrets into frontend Dockerfile build args. Vercel is the production frontend host; Docker does not inject the anon key.
- Tightened CORS handler in `supabase/functions/_shared/cors.ts` to require allowlist and opt-in local reflection.
- Added security headers on Vercel (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). Add HSTS only after the custom domain serves HTTPS.
- Replaced PayFast with a mock gateway that stays off unless `MOCK_PAYMENTS_ENABLED=true`. The checkout page always states that no real money is charged.
- Rate-limited `send-contact` to 5 requests per IP per 15 minutes.
- Added `uploads/`, `supabase/.env.local`, and `supabase/.env.production.local` to `.gitignore`.

The Spring Boot backend is retired. Older notes about `application.yml` and H2 no longer apply to this tree.

Production secret checklist (set in Supabase, not in git):

- `ALLOWED_ORIGINS` — exact frontend origins, comma-separated. Do not set `ALLOW_LOCAL_ORIGINS` in production.
- `MOCK_PAYMENTS_ENABLED` and `MOCK_CHECKOUT_BASE_URL` — demo checkout only.
- `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_INBOX`.
- Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MOCK_PAYMENTS`.

Auth site URL and redirect URLs must match the Vercel origin. Confirm migrations `0003_security_hardening.sql` and `0004_storage_security.sql` are applied (`npx supabase db push`). Clients cannot write loans or repayments; Edge Functions use the service role.

Recommended destructive purge (manual steps):

1. Install `git-filter-repo` (preferred) or BFG.

2. Create a backup clone:

```bash
git clone --mirror "$(git rev-parse --show-toplevel)" repo-backup.git
```

3. Use `git-filter-repo` to remove paths and secrets (example):

```bash
git filter-repo --invert-paths --path uploads --path supabase/.temp --path frontend/.env.local --path frontend/.env.development
```

4. Inspect history and force-push to remote (coordinate with team):

```bash
git push --force --all
git push --force --tags
```

5. Rotate compromised secrets immediately after pushing purge:
- Supabase anon and service-role keys
- Resend API key
- Any credentials that were ever committed (including old PayFast keys, if they remain in history)

Verification checklist:
- Confirm no sensitive files appear in `git log --all -- uploads`.
- Confirm deployed services reject old credentials.
- Confirm payment functions return 503 when `MOCK_PAYMENTS_ENABLED` is not `true`.
- Confirm Edge Function responses only allow origins listed in `ALLOWED_ORIGINS`.
- Confirm a non-admin cannot approve their own application, and a client cannot insert a repayment directly.

Rollback: keep the backup mirror created in step 2.

Contact: ops email set in configs should be moved to secret store; do not rely on committed email addresses.
