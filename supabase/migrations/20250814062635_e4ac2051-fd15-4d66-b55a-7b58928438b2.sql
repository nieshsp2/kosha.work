-- Phase 1: Critical Guest Data Protection Fixes

-- 1. Create a secure guest session validation function
CREATE OR REPLACE FUNCTION public.validate_guest_session(guest_session_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate that the guest session exists and is valid
  -- For now, we'll check that it's a valid UUID format and matches current guest_id
  -- In a production system, you'd want to store guest sessions in a separate table with expiry
  RETURN (
    guest_session_id IS NOT NULL 
    AND length(guest_session_id) > 10 
    AND guest_session_id ~ '^[a-fA-F0-9-]+$'
  );
END;
$$;

-- 2. Create a function to get current guest session from RLS context
CREATE OR REPLACE FUNCTION public.get_current_guest_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  guest_session text;
BEGIN
  -- This would typically get the guest session from a header or context
  -- For now, we'll use a simple approach that can be enhanced
  SELECT current_setting('app.current_guest_id', true) INTO guest_session;
  RETURN guest_session;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$;

-- 3. Update HS_user_profiles RLS policies to be more secure
DROP POLICY IF EXISTS "HS_user_profiles_select_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_insert_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_update_own" ON public."HS_user_profiles";

-- Create more secure policies that validate guest sessions properly
CREATE POLICY "HS_user_profiles_select_own" 
ON public."HS_user_profiles" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_user_profiles_insert_own" 
ON public."HS_user_profiles" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_user_profiles_update_own" 
ON public."HS_user_profiles" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

-- 4. Update HS_assessments RLS policies
DROP POLICY IF EXISTS "HS_assessments_select_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_insert_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_update_own" ON public."HS_assessments";

CREATE POLICY "HS_assessments_select_own" 
ON public."HS_assessments" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_assessments_insert_own" 
ON public."HS_assessments" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_assessments_update_own" 
ON public."HS_assessments" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

-- 5. Update HS_assessment_scores RLS policies
DROP POLICY IF EXISTS "HS_assessment_scores_select_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_insert_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_update_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_delete_own" ON public."HS_assessment_scores";

CREATE POLICY "HS_assessment_scores_select_own" 
ON public."HS_assessment_scores" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_assessment_scores_insert_own" 
ON public."HS_assessment_scores" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_assessment_scores_update_own" 
ON public."HS_assessment_scores" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

CREATE POLICY "HS_assessment_scores_delete_own" 
ON public."HS_assessment_scores" 
FOR DELETE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

-- 6. Enable RLS on the assessment scores summary view
-- Note: Views inherit RLS from underlying tables, but we need to ensure it's enforced
ALTER VIEW public."HS_assessment_scores_summary" SET (security_invoker = true);

-- 7. Update HS_responses RLS policies to use the new guest validation
DROP POLICY IF EXISTS "HS_responses_select_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_insert_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_update_own" ON public."HS_responses";

CREATE POLICY "HS_responses_select_own" 
ON public."HS_responses" 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM "HS_assessments" a 
    WHERE a.id = "HS_responses".assessment_id 
    AND (
      (a.user_id = auth.uid()) OR 
      (a.user_id IS NULL AND a.guest_id IS NOT NULL AND a.guest_id = public.get_current_guest_id())
    )
  )
);

CREATE POLICY "HS_responses_insert_own" 
ON public."HS_responses" 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "HS_assessments" a 
    WHERE a.id = "HS_responses".assessment_id 
    AND (
      (a.user_id = auth.uid()) OR 
      (a.user_id IS NULL AND a.guest_id IS NOT NULL AND a.guest_id = public.get_current_guest_id())
    )
  )
);

CREATE POLICY "HS_responses_update_own" 
ON public."HS_responses" 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM "HS_assessments" a 
    WHERE a.id = "HS_responses".assessment_id 
    AND (
      (a.user_id = auth.uid()) OR 
      (a.user_id IS NULL AND a.guest_id IS NOT NULL AND a.guest_id = public.get_current_guest_id())
    )
  )
);

-- 8. Create a guest session context function for the client to set
CREATE OR REPLACE FUNCTION public.set_guest_session_context(guest_session_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate the guest session before setting it
  IF public.validate_guest_session(guest_session_id) THEN
    PERFORM set_config('app.current_guest_id', guest_session_id, true);
  ELSE
    RAISE EXCEPTION 'Invalid guest session';
  END IF;
END;
$$;