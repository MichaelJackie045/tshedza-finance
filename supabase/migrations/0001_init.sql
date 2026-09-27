-- Tshedza Finance schema: profiles + lending domain + RLS
-- Mirrors former Spring/JPA entities under za.co.tshedza.*

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text,
  last_name text,
  phone text,
  id_number text,
  role text NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX profiles_role_idx ON public.profiles (role);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'ADMIN'
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'USER'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND coalesce(auth.role(), '') <> 'service_role' THEN
    NEW.role := OLD.role;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_protect_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select_own_or_admin
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY profiles_update_own
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  product text,
  amount numeric(12, 2),
  term_months integer,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending', 'approved', 'declined', 'rejected')),
  reference text,
  decision_note text,
  first_name text,
  last_name text,
  id_number text,
  phone text,
  email text,
  present_address text,
  city text,
  province text,
  post_code text,
  occupation text,
  employment_status text,
  monthly_income numeric(12, 2),
  employer_name text,
  weekly_wage numeric(12, 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX applications_user_id_idx ON public.applications (user_id);
CREATE INDEX applications_status_idx ON public.applications (status);

CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY applications_select_own_or_admin
  ON public.applications FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY applications_insert_own
  ON public.applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users may update own draft/pending apps but cannot approve/decline themselves
CREATE POLICY applications_update_own_draft_pending
  ON public.applications FOR UPDATE
  USING (
    user_id = auth.uid()
    AND status IN ('draft', 'pending')
  )
  WITH CHECK (
    user_id = auth.uid()
    AND status IN ('draft', 'pending')
  );

CREATE POLICY applications_admin_update
  ON public.applications FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- application_documents
-- ---------------------------------------------------------------------------

CREATE TABLE public.application_documents (
  id bigserial PRIMARY KEY,
  application_id uuid NOT NULL REFERENCES public.applications (id) ON DELETE CASCADE,
  kind text NOT NULL,
  file_name text,
  storage_path text NOT NULL,
  status text NOT NULL DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX application_documents_app_idx ON public.application_documents (application_id);

ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY application_documents_select
  ON public.application_documents FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_id AND a.user_id = auth.uid()
    )
  );

CREATE POLICY application_documents_insert
  ON public.application_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications a
      WHERE a.id = application_id
        AND a.user_id = auth.uid()
        AND a.status IN ('draft', 'pending')
    )
  );

CREATE POLICY application_documents_update_admin
  ON public.application_documents FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---------------------------------------------------------------------------
-- loans
-- ---------------------------------------------------------------------------

CREATE TABLE public.loans (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  application_id uuid REFERENCES public.applications (id) ON DELETE SET NULL,
  product text,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'approved', 'pending', 'overdue', 'paid')),
  principal numeric(12, 2) NOT NULL,
  remaining numeric(12, 2) NOT NULL,
  term_months integer NOT NULL,
  monthly_instalment numeric(12, 2) NOT NULL,
  next_payment_date date,
  next_payment_amount numeric(12, 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX loans_user_id_idx ON public.loans (user_id);

CREATE TRIGGER loans_updated_at
  BEFORE UPDATE ON public.loans
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY loans_select_own_or_admin
  ON public.loans FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Inserts/updates for loans go through Edge Functions (service role)

-- ---------------------------------------------------------------------------
-- loan_schedule_items
-- ---------------------------------------------------------------------------

CREATE TABLE public.loan_schedule_items (
  id bigserial PRIMARY KEY,
  loan_id text NOT NULL REFERENCES public.loans (id) ON DELETE CASCADE,
  due_date date NOT NULL,
  amount numeric(12, 2) NOT NULL,
  status text NOT NULL DEFAULT 'upcoming'
    CHECK (status IN ('paid', 'upcoming', 'overdue')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX loan_schedule_loan_idx ON public.loan_schedule_items (loan_id);

ALTER TABLE public.loan_schedule_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY loan_schedule_select
  ON public.loan_schedule_items FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.loans l
      WHERE l.id = loan_id AND l.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- repayments
-- ---------------------------------------------------------------------------

CREATE TABLE public.repayments (
  id text PRIMARY KEY,
  loan_id text NOT NULL REFERENCES public.loans (id) ON DELETE CASCADE,
  date timestamptz NOT NULL DEFAULT now(),
  amount numeric(12, 2) NOT NULL,
  method text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'cleared', 'cancelled', 'paid', 'active', 'approved', 'upcoming', 'overdue')),
  pf_payment_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX repayments_loan_idx ON public.repayments (loan_id);

ALTER TABLE public.repayments ENABLE ROW LEVEL SECURITY;

CREATE POLICY repayments_select_own_or_admin
  ON public.repayments FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.loans l
      WHERE l.id = loan_id AND l.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- transfers (public create)
-- ---------------------------------------------------------------------------

CREATE TABLE public.transfers (
  id text PRIMARY KEY,
  sender_name text NOT NULL,
  sender_phone text,
  recipient_name text NOT NULL,
  recipient_phone text,
  country text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  fee numeric(12, 2) NOT NULL,
  total numeric(12, 2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

CREATE POLICY transfers_insert_anyone
  ON public.transfers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY transfers_select_admin
  ON public.transfers FOR SELECT
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- debt_review_requests (public create)
-- ---------------------------------------------------------------------------

CREATE TABLE public.debt_review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  situation text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.debt_review_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY debt_review_insert_anyone
  ON public.debt_review_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY debt_review_select_admin
  ON public.debt_review_requests FOR SELECT
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- Admin overview helper view (counts; RLS still applies via underlying tables)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.admin_overview
WITH (security_invoker = true)
AS
SELECT
  (SELECT count(*)::int FROM public.applications WHERE status = 'pending') AS pending_applications,
  (SELECT count(*)::int FROM public.applications WHERE status = 'approved') AS approved_applications,
  (SELECT count(*)::int FROM public.applications WHERE status IN ('declined', 'rejected')) AS declined_applications,
  (SELECT count(*)::int FROM public.loans WHERE status = 'active') AS active_loans,
  (SELECT count(*)::int FROM public.transfers WHERE status = 'pending') AS pending_transfers,
  (SELECT count(*)::int FROM public.debt_review_requests WHERE status = 'pending') AS debt_review_requests;

GRANT SELECT ON public.admin_overview TO authenticated;

-- Privileges for API roles (RLS still applies)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT ON public.transfers TO anon;
GRANT SELECT, INSERT ON public.debt_review_requests TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

COMMENT ON TABLE public.profiles IS 'App user profile linked to auth.users; role USER|ADMIN';
COMMENT ON TABLE public.applications IS 'Loan applications (draft → pending → approved/declined)';
COMMENT ON TABLE public.loans IS 'Active loans created on admin approve';
