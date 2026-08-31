/**
 * Multi-step loan application draft kept in sessionStorage while the user applies.
 *
 * LINK MAP
 * - Steps in App.tsx /apply/* read/write this store.
 * - applicationId is set after createApplication; uploads use it in useDocumentUpload.
 * - On submit, ReviewStep posts to backend then DoneStep shows reference.
 */

import { create } from 'zustand'
import type { DetailsForm } from '@/lib/validation'

export type DocumentKind = 'id' | 'payslip' | 'bank1' | 'bank2' | 'bank3'
export type DocumentStatus = 'idle' | 'uploading' | 'uploaded' | 'rejected'

export type ProductType = 'cash' | 'domestic'

export type ApplicationData = {
  product: ProductType
  details: Partial<DetailsForm> & {
    employerName?: string
    weeklyWage?: string
  }
  documents: Record<DocumentKind, DocumentStatus>
  amount: number
  termMonths: number
  reference?: string
  applicationId?: string
}

type ApplicationStore = {
  step: number
  data: ApplicationData
  setStep: (step: number) => void
  setProduct: (product: ProductType) => void
  updateDetails: (details: ApplicationData['details']) => void
  setApplicationId: (applicationId: string) => void
  setDocumentStatus: (kind: DocumentKind, status: DocumentStatus) => void
  setTerms: (amount: number, termMonths: number) => void
  setReference: (reference: string) => void
  reset: () => void
  allDocumentsReady: () => boolean
}

const defaultDocuments: Record<DocumentKind, DocumentStatus> = {
  id: 'idle',
  payslip: 'idle',
  bank1: 'idle',
  bank2: 'idle',
  bank3: 'idle',
}

const defaultData: ApplicationData = {
  product: 'cash',
  details: {},
  documents: { ...defaultDocuments },
  amount: 5000,
  termMonths: 3,
}

const STORAGE_KEY = 'tshedza-application'

function loadFromSession(): Pick<ApplicationStore, 'step' | 'data'> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Pick<ApplicationStore, 'step' | 'data'>
  } catch {
    return null
  }
}

function persist(step: number, data: ApplicationData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }))
}

const hydrated = loadFromSession()

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
  step: hydrated?.step ?? 1,
  data: hydrated?.data ?? { ...defaultData, documents: { ...defaultDocuments } },

  setStep: (step) => {
    set({ step })
    persist(step, get().data)
  },

  setProduct: (product) => {
    const data = {
      ...get().data,
      product,
      amount: product === 'domestic' ? 2500 : get().data.amount,
      termMonths: product === 'domestic' ? 2 : get().data.termMonths,
    }
    set({ data })
    persist(get().step, data)
  },

  updateDetails: (details) => {
    const data = { ...get().data, details: { ...get().data.details, ...details } }
    set({ data })
    persist(get().step, data)
  },

  setApplicationId: (applicationId) => {
    const data = { ...get().data, applicationId }
    set({ data })
    persist(get().step, data)
  },

  setDocumentStatus: (kind, status) => {
    const data = {
      ...get().data,
      documents: { ...get().data.documents, [kind]: status },
    }
    set({ data })
    persist(get().step, data)
  },

  setTerms: (amount, termMonths) => {
    const data = { ...get().data, amount, termMonths }
    set({ data })
    persist(get().step, data)
  },

  setReference: (reference) => {
    const data = { ...get().data, reference }
    set({ data })
    persist(get().step, data)
  },

  reset: () => {
    const data = { ...defaultData, documents: { ...defaultDocuments } }
    set({ step: 1, data })
    sessionStorage.removeItem(STORAGE_KEY)
  },

  allDocumentsReady: () => {
    const docs = get().data.documents
    return (Object.keys(docs) as DocumentKind[]).every((k) => docs[k] === 'uploaded')
  },
}))
