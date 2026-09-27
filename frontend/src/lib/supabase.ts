/**
 * Shared Supabase browser client.
 *
 * Env: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js'

const url =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'http://127.0.0.1:54321'
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)

if (!anonKey) {
  console.error(
    'VITE_SUPABASE_ANON_KEY is not set. Do NOT commit secrets. Set this via environment or runtime config.',
  )
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
  },
})

export async function invokeFunction<T>(
  name: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body: body ?? {} })
  if (error) {
    let message = error.message
    try {
      const ctx = (error as { context?: Response }).context
      if (ctx) {
        const payload = await ctx.json()
        if (payload?.error) message = String(payload.error)
      }
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message)
  }
  if (data && typeof data === 'object' && 'error' in data && (data as { error?: string }).error) {
    throw new Error(String((data as { error: string }).error))
  }
  return data as T
}
