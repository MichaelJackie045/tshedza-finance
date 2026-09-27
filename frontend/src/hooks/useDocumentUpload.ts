/**
 * Uploads one KYC document for the in-progress application.
 *
 * LINK MAP
 * - Needs applicationStore.data.applicationId (from createApplication).
 * - Calls apiClient.uploadDocument -> POST /api/applications/{id}/documents.
 * - Updates per-kind status shown in DocumentsStep.
 */

import { useCallback, useState } from 'react'
import {
  useApplicationStore,
  type DocumentKind,
} from '@/store/applicationStore'
import { uploadDocument } from '@/lib/apiClient'

export function useDocumentUpload() {
  const setDocumentStatus = useApplicationStore((s) => s.setDocumentStatus)
  const applicationId = useApplicationStore((s) => s.data.applicationId)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (kind: DocumentKind, file: File) => {
      setError(null)
      if (!applicationId) {
        setError('Application not initialized.')
        return
      }
      if (file.size > 8 * 1024 * 1024) {
        setError('File must be under 8 MB')
        setDocumentStatus(kind, 'rejected')
        return
      }
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (file.type && !allowedTypes.includes(file.type)) {
        setError('Unsupported file type (PDF, JPG, PNG, or Word)')
        setDocumentStatus(kind, 'rejected')
        return
      }
      setDocumentStatus(kind, 'uploading')
      try {
        await uploadDocument(applicationId, kind, file)
        setDocumentStatus(kind, 'uploaded')
      } catch {
        setError('Upload failed')
        setDocumentStatus(kind, 'rejected')
      }
    },
    [applicationId, setDocumentStatus],
  )

  return { upload, error }
}
