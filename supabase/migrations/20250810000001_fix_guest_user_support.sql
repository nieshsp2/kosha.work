-- Migration: Fix guest user support in HS_user_profiles table
-- Date: 2025-01-10

-- Make user_id nullable to support guest users
ALTER TABLE public."HS_user_profiles" 
ALTER COLUMN user_id DROP NOT NULL;

-- Add guest_id column if it doesn't exist
ALTER TABLE public."HS_user_profiles" 
ADD COLUMN IF NOT EXISTS guest_id text;

-- Create unique constraint on guest_id
ALTER TABLE public."HS_user_profiles" 
ADD CONSTRAINT "HS_user_profiles_guest_id_unique" 
UNIQUE (guest_id);

-- Update RLS policies to allow guest access
DROP POLICY IF EXISTS "HS_user_profiles_select_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_insert_own" ON public."HS_user_profiles";
DROP POLICY IF EXISTS "HS_user_profiles_update_own" ON public."HS_user_profiles";

CREATE POLICY "HS_user_profiles_select_own"
ON public."HS_user_profiles"
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

CREATE POLICY "HS_user_profiles_insert_own"
ON public."HS_user_profiles"
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

CREATE POLICY "HS_user_profiles_update_own"
ON public."HS_user_profiles"
FOR UPDATE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

-- Create index for guest_id lookups
CREATE INDEX IF NOT EXISTS idx_hs_user_profiles_guest_id ON public."HS_user_profiles"(guest_id);

-- Update existing guest user profiles to have guest_id
UPDATE public."HS_user_profiles" 
SET guest_id = 'guest_' || substr(md5(random()::text), 1, 12)
WHERE user_id IS NULL AND guest_id IS NULL;

