/**
 * Client auth state (Zustand) + Supabase session sync.
 *
 * LINK MAP
 * - setAuth called from Login/Register after apiClient login/register.
 * - hydrateAuth() restores session from Supabase sessionStorage and refreshes profile.
 * - RequireAuth / RequireAdmin / PublicLayout admin link read user.role.
 */

import { create } from 'zustand'
import type { UserProfile } from '@/lib/apiTypes'
import { mapProfile } from '@/lib/mappers'
import { supabase } from '@/lib/supabase'

type AuthStore = {
  token: string | null
  user: UserProfile | null
  ready: boolean
  setAuth: (token: string, user: UserProfile) => void
  setUser: (user: UserProfile) => void
  clearAuth: () => void
  setReady: (ready: boolean) => void
}

const USER_KEY = 'tshedza-user'

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: (() => {
    try {
      const raw = sessionStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as UserProfile) : null
    } catch {
      return null
    }
  })(),
  ready: false,

  setAuth: (token, user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ token, user })
  },

  setUser: (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ user })
  },

  clearAuth: () => {
    sessionStorage.removeItem(USER_KEY)
    set({ token: null, user: null })
  },

  setReady: (ready) => set({ ready }),
}))

async function loadProfileIntoStore(userId: string, token: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error || !data) {
    useAuthStore.getState().setAuth(token, {
      id: userId,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'USER',
    })
    return
  }
  useAuthStore.getState().setAuth(token, mapProfile(data))
}

/** Restore session and subscribe to auth changes. Call once at app boot. */
export async function hydrateAuth() {
  const { data } = await supabase.auth.getSession()
  if (data.session?.user) {
    await loadProfileIntoStore(data.session.user.id, data.session.access_token)
  } else {
    useAuthStore.getState().clearAuth()
  }
  useAuthStore.getState().setReady(true)

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT' || !session?.user) {
      useAuthStore.getState().clearAuth()
      return
    }
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
      await loadProfileIntoStore(session.user.id, session.access_token)
    }
  })
}
