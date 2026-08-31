/**
 * Apply step 2: ID, payslip, bank statements — paper-form layout.
 *
 * LINK MAP
 * - Uploads via useDocumentUpload -> ApplicationController documents endpoint.
 * - Next: TermsStep. Route: /apply/documents.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useApplicationStore,
  type DocumentKind,
  type DocumentStatus,
} from '@/store/applicationStore'
import { useDocumentUpload } from '@/hooks/useDocumentUpload'
import { Button } from '@/components/ui/primitives'
import { cn } from '@/lib/format'
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { requiredDocuments } from '@/content/loanTerms'

const DOCS: Array<{ kind: DocumentKind; title: string; hint: string }> = [
  { kind: 'id', title: 'ID, passport, or work permit', hint: 'Photo or PDF' },
  { kind: 'payslip', title: 'Latest payslip', hint: 'Most recent month' },
  { kind: 'bank1', title: 'Bank statement — month 1', hint: 'Last three months' },
  { kind: 'bank2', title: 'Bank statement — month 2', hint: 'PDF preferred' },
  { kind: 'bank3', title: 'Bank statement — month 3', hint: 'PDF preferred' },
]

function statusLabel(status: DocumentStatus) {
  switch (status) {
    case 'uploading':
      return 'Uploading…'
    case 'uploaded':
      return 'Uploaded'
    case 'rejected':
      return 'Couldn’t read that file — try again'
    default:
      return 'Not yet'
  }
}

function StatusIcon({ status }: { status: DocumentStatus }) {
  if (status === 'uploaded') {
    return <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden />
  }
  if (status === 'rejected') {
    return <AlertCircle size={16} strokeWidth={1.75} aria-hidden />
  }
  if (status === 'uploading') {
    return <Loader2 size={16} strokeWidth={1.75} className="animate-spin" aria-hidden />
  }
  return <Upload size={16} strokeWidth={1.75} aria-hidden />
}

export function DocumentsStep() {
  const navigate = useNavigate()
  const { data, setStep, allDocumentsReady } = useApplicationStore()
  const { upload, error } = useDocumentUpload()
  const ready = allDocumentsReady()

  useEffect(() => {
    if (!data.applicationId) {
      navigate('/apply/details', { replace: true })
    }
  }, [data.applicationId, navigate])

  if (!data.applicationId) {
    return <p className="text-ink-muted">Save your details first…</p>
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="loan-form-section-label">Required documents</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.875rem] text-ink-muted">
          {requiredDocuments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-[0.8125rem] text-ink-muted">
          Upload one file per slot below. You can only continue when all five show as uploaded.
        </p>
      </section>

      {error ? (
        <p className="text-[0.875rem] text-rust" role="alert">
          {error}
        </p>
      ) : null}

      <section>
        <p className="loan-form-section-label">Upload files</p>
        <ul className="mt-4 divide-y divide-line border border-line">
          {DOCS.map((doc) => {
            const status = data.documents[doc.kind]
            const inputId = `doc-${doc.kind}`
            return (
              <li
                key={doc.kind}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-8 w-8 items-center justify-center border',
                      status === 'uploaded' && 'border-sage bg-sage-soft text-sage',
                      status === 'rejected' && 'border-rust bg-rust-soft text-rust',
                      status === 'idle' && 'border-line bg-surface text-ink-muted',
                      status === 'uploading' && 'border-teal-mid/40 bg-teal-soft text-teal',
                    )}
                  >
                    <StatusIcon status={status} />
                  </span>
                  <div>
                    <p className="text-[0.9375rem] font-semibold text-ink">{doc.title}</p>
                    <p className="text-[0.8125rem] text-ink-muted">{doc.hint}</p>
                    <p
                      className={cn(
                        'mt-1 text-[0.75rem] font-bold uppercase tracking-wide',
                        status === 'uploaded' && 'text-sage',
                        status === 'rejected' && 'text-rust',
                        status === 'uploading' && 'text-teal',
                        status === 'idle' && 'text-ink-muted',
                      )}
                    >
                      {statusLabel(status)}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={inputId}
                    className="inline-flex min-h-10 cursor-pointer items-center border border-line bg-white px-4 text-[0.8125rem] font-bold uppercase tracking-wide text-ink hover:border-teal-mid/50"
                  >
                    {status === 'uploaded' ? 'Replace' : 'Choose file'}
                  </label>
                  <input
                    id={inputId}
                    type="file"
                    accept=".pdf,image/*"
                    className="sr-only"
                    disabled={status === 'uploading'}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) void upload(doc.kind, file)
                    }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="loan-form-actions">
        <Button
          type="button"
          variant="ghost"
          className="min-h-11"
          onClick={() => {
            setStep(1)
            navigate('/apply/details')
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          className="min-h-11"
          disabled={!ready}
          onClick={() => {
            setStep(3)
            navigate('/apply/terms')
          }}
        >
          Continue to terms
        </Button>
      </div>
    </div>
  )
}
