/**
 * Legacy Axios helpers — kept as thin stubs so older imports do not break.
 * All API traffic now goes through lib/supabase.ts + lib/apiClient.ts.
 */

/** @deprecated Prefer supabase session; token is managed by authStore. */
export function setAccessToken(_token: string | null) {
  /* no-op: Supabase client holds the session */
}

/** @deprecated */
export function getAccessToken(): string | null {
  return useLazyToken()
}

function useLazyToken(): string | null {
  try {
    return sessionStorage.getItem('tshedza-user') ? 'session' : null
  } catch {
    return null
  }
}
