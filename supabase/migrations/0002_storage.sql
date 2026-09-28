-- Storage bucket for application supporting documents
-- Path convention: {user_id}/{application_id}/{kind}_{uuid}_{filename}

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'application-docs',
  'application-docs',
  false,
  26214400,
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Owner can upload/read under their user_id prefix
CREATE POLICY application_docs_insert_own
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY application_docs_select_own
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'application-docs'
    AND (
      (storage.foldername(name))[1] = auth.uid()::text
      OR public.is_admin()
    )
  );

CREATE POLICY application_docs_update_own
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY application_docs_delete_own
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
