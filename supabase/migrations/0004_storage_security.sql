-- Tighten Storage RLS: path must be {auth.uid()}/{application_id}/...
-- and application_id must belong to the uploader.

DROP POLICY IF EXISTS application_docs_insert_own ON storage.objects;
CREATE POLICY application_docs_insert_own
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id::text = (storage.foldername(name))[2]
        AND a.user_id = auth.uid()
        AND a.status IN ('draft', 'pending')
    )
  );

DROP POLICY IF EXISTS application_docs_select_own ON storage.objects;
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

DROP POLICY IF EXISTS application_docs_update_own ON storage.objects;
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

DROP POLICY IF EXISTS application_docs_delete_own ON storage.objects;
CREATE POLICY application_docs_delete_own
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'application-docs'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- anon has no allow policies on application-docs (default deny)
