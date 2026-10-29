# Java fallback backend

This is a compact Spring Boot fallback for environments where the primary Supabase flow is unavailable or intentionally disabled.

## Run locally

```bash
cd backend
./mvnw spring-boot:run
```

If you prefer a direct Maven command instead of the wrapper:

```bash
cd backend
mvn spring-boot:run
```

Environment variables:

- `JAVA_BACKEND_JWT_SECRET` — secret used for JWT signing. Required in production.
- `JAVA_BACKEND_ALLOWED_ORIGINS` — comma-separated CORS allowlist.

Example:

```bash
export JAVA_BACKEND_JWT_SECRET='replace-with-a-long-random-secret-at-least-32-characters'
export JAVA_BACKEND_ALLOWED_ORIGINS='http://localhost:5173,https://localhost:5173'
./mvnw spring-boot:run
```

The API starts on http://localhost:8080.

## Login / register

- `POST /api/auth/login`
- `POST /api/auth/register`

## Health

- `GET /api/health`

## Security notes

- JWT-based authentication
- CORS limited to configured origins
- CSRF disabled for stateless API usage
- No database dependency in the fallback path
- Keep secrets out of source control
