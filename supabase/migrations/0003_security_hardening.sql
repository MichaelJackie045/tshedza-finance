-- Security hardening: least-privilege grants, tighter RLS, input CHECKs,
-- application status lock, admin-only overview RPC, storage path ownership.

-- ---------------------------------------------------------------------------
-- Force RLS (table owners cannot bypass via direct role)
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.applications FORCE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents FORCE ROW LEVEL SECURITY;
ALTER TABLE public.loans FORCE ROW LEVEL SECURITY;
ALTER TABLE public.loan_schedule_items FORCE ROW LEVEL SECURITY;
ALTER TABLE public.repayments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.transfers FORCE ROW LEVEL SECURITY;
ALTER TABLE public.debt_review_requests FORCE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Least-privilege: revoke blanket grants from 0001, re-grant narrowly
-- ---------------------------------------------------------------------------

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON public.admin_overview FROM authenticated;

-- profiles: read/update own (no insert/delete — created by auth trigger)
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- applications: owner CRUD within RLS; no delete from clients
GRANT SELECT, INSERT, UPDATE ON public.applications TO authenticated;

-- documents: insert + select
GRANT SELECT, INSERT ON public.application_documents TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.application_documents_id_seq TO authenticated;

-- loans / schedule / repayments: read-only for clients (writes via service role)
GRANT SELECT ON public.loans TO authenticated;
GRANT SELECT ON public.loan_schedule_items TO authenticated;
GRANT SELECT ON public.repayments TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.loan_schedule_items_id_seq TO authenticated;

-- public forms: INSERT only (no SELECT for anon — prevents scraping)
GRANT INSERT ON public.transfers TO anon, authenticated;
GRANT INSERT ON public.debt_review_requests TO anon, authenticated;
-- admins still need SELECT (authenticated + is_admin RLS)
GRANT SELECT ON public.transfers TO authenticated;
GRANT SELECT ON public.debt_review_requests TO authenticated;

-- ---------------------------------------------------------------------------
-- profiles: lock email + role from client updates
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.protect_profile_immutable_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- role only changeable by service_role
  IF NEW.role IS DISTINCT FROM OLD.role AND coalesce(auth.role(), '') <> 'service_role' THEN
    NEW.role := OLD.role;
  END IF;
  -- email follows auth.users; clients must not spoof it on profiles
  IF NEW.email IS DISTINCT FROM OLD.email AND coalesce(auth.role(), '') <> 'service_role' THEN
    NEW.email := OLD.email;
  END IF;
  -- id must never change
  NEW.id := OLD.id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_role ON public.profiles;
CREATE TRIGGER profiles_protect_immutable
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_immutable_fields();

-- No client INSERT into profiles
DROP POLICY IF EXISTS profiles_insert_deny ON public.profiles;
CREATE POLICY profiles_insert_deny
  ON public.profiles FOR INSERT
  WITH CHECK (false);

DROP POLICY IF EXISTS profiles_delete_deny ON public.profiles;
CREATE POLICY profiles_delete_deny
  ON public.profiles FOR DELETE
  USING (false);

-- ---------------------------------------------------------------------------
-- applications: prevent self-approve / decision_note spoofing; amount bounds
-- ---------------------------------------------------------------------------

ALTER TABLE public.applications
  DROP CONSTRAINT IF EXISTS applications_amount_range;
ALTER TABLE public.applications
  ADD CONSTRAINT applications_amount_range
  CHECK (amount IS NULL OR (amount >= 500 AND amount <= 20000));

ALTER TABLE public.applications
  DROP CONSTRAINT IF EXISTS applications_term_range;
ALTER TABLE public.applications
  ADD CONSTRAINT applications_term_range
  CHECK (term_months IS NULL OR (term_months >= 1 AND term_months <= 9));

CREATE OR REPLACE FUNCTION public.protect_application_decision_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF coalesce(auth.role(), '') = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- Clients cannot approve/decline themselves
  IF NEW.status IS DISTINCT FROM OLD.status
     AND NEW.status IN ('approved', 'declined', 'rejected') THEN
    RAISE EXCEPTION 'Forbidden status transition';
  END IF;

  -- Clients cannot write decision notes
  IF NEW.decision_note IS DISTINCT FROM OLD.decision_note THEN
    NEW.decision_note := OLD.decision_note;
  END IF;

  -- Cannot reassign ownership
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    NEW.user_id := OLD.user_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_protect_decision ON public.applications;
CREATE TRIGGER applications_protect_decision
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.protect_application_decision_fields();

-- Block client DELETE on applications
DROP POLICY IF EXISTS applications_delete_deny ON public.applications;
CREATE POLICY applications_delete_deny
  ON public.applications FOR DELETE
  USING (false);

-- INSERT must not start as approved/declined
DROP POLICY IF EXISTS applications_insert_own ON public.applications;
CREATE POLICY applications_insert_own
  ON public.applications FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND status IN ('draft', 'pending')
  );

-- ---------------------------------------------------------------------------
-- Public inserts: constrain payloads at the DB (defense in depth vs Zod)
-- ---------------------------------------------------------------------------

ALTER TABLE public.transfers
  DROP CONSTRAINT IF EXISTS transfers_amount_range;
ALTER TABLE public.transfers
  ADD CONSTRAINT transfers_amount_range
  CHECK (amount >= 100 AND amount <= 50000);

ALTER TABLE public.transfers
  DROP CONSTRAINT IF EXISTS transfers_country_code;
ALTER TABLE public.transfers
  ADD CONSTRAINT transfers_country_code
  CHECK (country IN ('ZW', 'MZ', 'LS', 'BW'));

ALTER TABLE public.transfers
  DROP CONSTRAINT IF EXISTS transfers_status_default;
ALTER TABLE public.transfers
  ADD CONSTRAINT transfers_status_values
  CHECK (status IN ('pending', 'processing', 'completed', 'cancelled'));

DROP POLICY IF EXISTS transfers_insert_anyone ON public.transfers;
CREATE POLICY transfers_insert_anyone
  ON public.transfers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(sender_name)) BETWEEN 2 AND 120
    AND char_length(trim(recipient_name)) BETWEEN 2 AND 120
    AND country IN ('ZW', 'MZ', 'LS', 'BW')
    AND amount >= 100 AND amount <= 50000
    AND fee >= 0 AND total >= amount
    AND status = 'pending'
  );

ALTER TABLE public.debt_review_requests
  DROP CONSTRAINT IF EXISTS debt_review_situation_len;
ALTER TABLE public.debt_review_requests
  ADD CONSTRAINT debt_review_situation_len
  CHECK (char_length(situation) BETWEEN 20 AND 2000);

DROP POLICY IF EXISTS debt_review_insert_anyone ON public.debt_review_requests;
CREATE POLICY debt_review_insert_anyone
  ON public.debt_review_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 120
    AND char_length(trim(phone)) BETWEEN 8 AND 20
    AND char_length(trim(email)) BETWEEN 5 AND 254
    AND char_length(situation) BETWEEN 20 AND 2000
    AND status = 'pending'
  );

-- ---------------------------------------------------------------------------
-- Documents: whitelist kinds
-- ---------------------------------------------------------------------------

ALTER TABLE public.application_documents
  DROP CONSTRAINT IF EXISTS application_documents_kind_check;
ALTER TABLE public.application_documents
  ADD CONSTRAINT application_documents_kind_check
  CHECK (kind IN ('id', 'payslip', 'bank1', 'bank2', 'bank3', 'address', 'employment'));

-- Storage path must start with owner uid and application id they own
DROP POLICY IF EXISTS application_documents_insert ON public.application_documents;
CREATE POLICY application_documents_insert
  ON public.application_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_id
        AND a.user_id = auth.uid()
        AND a.status IN ('draft', 'pending')
    )
    AND storage_path LIKE (auth.uid()::text || '/' || application_id::text || '/%')
  );

-- ---------------------------------------------------------------------------
-- Deny client writes on loans / schedule / repayments (Edge Functions only)
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS loans_client_write_deny ON public.loans;
CREATE POLICY loans_no_client_insert ON public.loans FOR INSERT WITH CHECK (false);
CREATE POLICY loans_no_client_update ON public.loans FOR UPDATE USING (false);
CREATE POLICY loans_no_client_delete ON public.loans FOR DELETE USING (false);

CREATE POLICY schedule_no_client_insert ON public.loan_schedule_items FOR INSERT WITH CHECK (false);
CREATE POLICY schedule_no_client_update ON public.loan_schedule_items FOR UPDATE USING (false);
CREATE POLICY schedule_no_client_delete ON public.loan_schedule_items FOR DELETE USING (false);

CREATE POLICY repayments_no_client_insert ON public.repayments FOR INSERT WITH CHECK (false);
CREATE POLICY repayments_no_client_update ON public.repayments FOR UPDATE USING (false);
CREATE POLICY repayments_no_client_delete ON public.repayments FOR DELETE USING (false);

-- ---------------------------------------------------------------------------
-- Admin overview: SECURITY DEFINER RPC (admins only) — replaces open view
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_admin_overview()
RETURNS json
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_admin() THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  RETURN json_build_object(
    'pending_applications', (SELECT count(*)::int FROM public.applications WHERE status = 'pending'),
    'approved_applications', (SELECT count(*)::int FROM public.applications WHERE status = 'approved'),
    'declined_applications', (SELECT count(*)::int FROM public.applications WHERE status IN ('declined', 'rejected')),
    'active_loans', (SELECT count(*)::int FROM public.loans WHERE status = 'active'),
    'pending_transfers', (SELECT count(*)::int FROM public.transfers WHERE status = 'pending'),
    'debt_review_requests', (SELECT count(*)::int FROM public.debt_review_requests WHERE status = 'pending')
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_overview() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_admin_overview() TO authenticated;

-- Keep view for convenience but revoke direct access
REVOKE ALL ON public.admin_overview FROM PUBLIC, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Lock down helper functions
-- ---------------------------------------------------------------------------

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.protect_profile_immutable_fields() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.protect_application_decision_fields() FROM PUBLIC;
