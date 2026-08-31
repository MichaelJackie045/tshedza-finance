/**
 * Browser entry: hydrate JWT from sessionStorage, then mount App.
 *
 * LINK MAP
 * - hydrateAuth() -> lib/api.ts setAccessToken so axios sends Bearer token.
 * - App.tsx owns all React Router routes.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { hydrateAuth } from '@/store/authStore'

hydrateAuth()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
