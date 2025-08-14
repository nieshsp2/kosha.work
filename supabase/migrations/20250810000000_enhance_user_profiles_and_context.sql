-- Migration: Enhance user profiles and add user context
-- Date: 2025-01-10

-- Add new fields to HS_user_profiles table
ALTER TABLE public."HS_user_profiles" 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS personality_type text CHECK (personality_type IN ('introvert', 'extrovert', 'ambivert')),
ADD COLUMN IF NOT EXISTS cultural_values text[],
ADD COLUMN IF NOT EXISTS lifestyle_constraints text[],
ADD COLUMN IF NOT EXISTS goals text[],
ADD COLUMN IF NOT EXISTS guest_id text UNIQUE; -- For guest users without auth

-- Create a function to generate guest IDs
CREATE OR REPLACE FUNCTION public.generate_guest_id()
RETURNS text AS $$
BEGIN
  RETURN 'guest_' || substr(md5(random()::text), 1, 12);
END;
$$ LANGUAGE plpgsql;

-- Update existing user profiles to have guest_id if user_id is null
UPDATE public."HS_user_profiles" 
SET guest_id = public.generate_guest_id()
WHERE user_id IS NULL AND guest_id IS NULL;

-- Ensure HS_responses table has user context
ALTER TABLE public."HS_responses" 
ADD COLUMN IF NOT EXISTS guest_id text;

-- Create index for guest_id lookups
CREATE INDEX IF NOT EXISTS idx_hs_responses_guest_id ON public."HS_responses"(guest_id);
CREATE INDEX IF NOT EXISTS idx_hs_user_profiles_guest_id ON public."HS_user_profiles"(guest_id);

-- Update RLS policies to allow guest access
DROP POLICY IF EXISTS "HS_user_profiles_select_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_insert_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_update_own" ON public."HS_user_profiles";

CREATE POLICY "HS_user_profiles_select_own"
ON public."HS_user_profiles"
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_user_profiles_insert_own"
ON public."HS_user_profiles"
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_user_profiles_update_own"
ON public."HS_user_profiles"
FOR UPDATE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

-- Update HS_responses policies for guest access
DROP POLICY IF EXISTS "HS_responses_select_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_insert_own" ON public."HS_responses";
DROP POLICY IF EXISTS "HS_responses_update_own" ON public."HS_responses";

CREATE POLICY "HS_responses_select_own"
ON public."HS_responses"
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_responses_insert_own"
ON public."HS_responses"
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_responses_update_own"
ON public."HS_responses"
FOR UPDATE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

-- Update HS_assessments policies for guest access
DROP POLICY IF EXISTS "HS_assessments_select_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_insert_own" ON public."HS_assessments";
DROP POLICY IF EXISTS "HS_assessments_update_own" ON public."HS_assessments";

CREATE POLICY "HS_assessments_select_own"
ON public."HS_assessments"
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_assessments_insert_own"
ON public."HS_assessments"
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

CREATE POLICY "HS_assessments_update_own"
ON public."HS_assessments"
FOR UPDATE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL AND guest_id = current_setting('app.guest_id', true)::text)
);

-- Add guest_id to HS_assessments table
ALTER TABLE public."HS_assessments" 
ADD COLUMN IF NOT EXISTS guest_id text;

CREATE INDEX IF NOT EXISTS idx_hs_assessments_guest_id ON public."HS_assessments"(guest_id);
