# Security Runbook — Tshedza Finance

This runbook describes non-destructive fixes applied in `security/hardening` branch and safe steps to purge secrets from git history.

Non-destructive changes applied:
- Removed hardcoded Supabase anon key from `frontend/src/lib/supabase.ts` and switched to env-only usage.
- Replaced committed anon keys in `frontend/.env.*` and `.env.docker.example` with placeholders.
- Stopped baking secrets into frontend Dockerfile build args.
- Removed default `APP_JWT_SECRET` fallback and disabled H2 console in `backend/src/main/resources/application.yml`.
- Tightened CORS handler in `supabase/functions/_shared/cors.ts` to require allowlist and opt-in local reflection.
- Added `uploads/` to `.gitignore`.

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
- Supabase anon & service-role keys
- PayFast merchant key and passphrase
- Any APP_JWT_SECRET or credentials used

Verification checklist:
- Confirm no sensitive files appear in `git log --all -- uploads`.
- Confirm deployed services reject old credentials.

Rollback: keep the backup mirror created in step 2.

Contact: ops email set in configs should be moved to secret store; do not rely on committed email addresses.
