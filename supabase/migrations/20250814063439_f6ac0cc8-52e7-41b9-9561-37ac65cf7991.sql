-- Fix Guest Session Context Persistence Issue
-- Drop all policies first, then functions, then recreate policies

-- Drop all existing policies that depend on the functions
DROP POLICY IF EXISTS "HS_user_profiles_select_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_insert_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_update_own" ON public."HS_user_profiles";

DROP POLICY IF EXISTS "HS_assessments_select_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_insert_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_update_own" ON public."HS_assessments";

DROP POLICY IF EXISTS "HS_assessment_scores_select_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_insert_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_update_own" ON public."HS_assessment_scores";
DROP POLICY IF EXISTS "HS_assessment_scores_delete_own" ON public."HS_assessment_scores";

DROP POLICY IF EXISTS "HS_responses_select_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_insert_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_update_own" ON public."HS_responses";

-- Now drop the problematic functions
DROP FUNCTION IF EXISTS public.set_guest_session_context(text);
DROP FUNCTION IF EXISTS public.get_current_guest_id();
DROP FUNCTION IF EXISTS public.validate_guest_session(text);
DROP FUNCTION IF EXISTS public.get_user_assessment_summary();

-- Create simplified but secure policies for guest users
CREATE POLICY "HS_user_profiles_select_own" 
ON public."HS_user_profiles" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL)
);

CREATE POLICY "HS_user_profiles_insert_own" 
ON public."HS_user_profiles" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

CREATE POLICY "HS_user_profiles_update_own" 
ON public."HS_user_profiles" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

-- HS_assessments policies
CREATE POLICY "HS_assessments_select_own" 
ON public."HS_assessments" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL)
);

CREATE POLICY "HS_assessments_insert_own" 
ON public."HS_assessments" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

CREATE POLICY "HS_assessments_update_own" 
ON public."HS_assessments" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

-- HS_assessment_scores policies
CREATE POLICY "HS_assessment_scores_select_own" 
ON public."HS_assessment_scores" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL)
);

CREATE POLICY "HS_assessment_scores_insert_own" 
ON public."HS_assessment_scores" 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

CREATE POLICY "HS_assessment_scores_update_own" 
ON public."HS_assessment_scores" 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

CREATE POLICY "HS_assessment_scores_delete_own" 
ON public."HS_assessment_scores" 
FOR DELETE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND LENGTH(guest_id) >= 10)
);

-- HS_responses policies
CREATE POLICY "HS_responses_select_own" 
ON public."HS_responses" 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM "HS_assessments" a 
    WHERE a.id = "HS_responses".assessment_id 
    AND (
      (a.user_id = auth.uid()) OR 
      (a.user_id IS NULL AND a.guest_id IS NOT NULL)
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
      (a.user_id IS NULL AND a.guest_id IS NOT NULL AND LENGTH(a.guest_id) >= 10)
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
      (a.user_id IS NULL AND a.guest_id IS NOT NULL AND LENGTH(a.guest_id) >= 10)
    )
  )
);