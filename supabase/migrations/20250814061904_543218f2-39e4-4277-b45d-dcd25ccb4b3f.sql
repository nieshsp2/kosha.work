-- Fix security vulnerability in user_profiles table

-- First, add the missing user_id column to associate profiles with users
ALTER TABLE public.user_profiles 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security on the table (if not already enabled)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Allow insert for all users" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow update for all users" ON public.user_profiles;

-- Create secure RLS policies that only allow users to access their own data

-- Allow users to select only their own profile data
CREATE POLICY "user_profiles_select_own" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert only their own profile data
CREATE POLICY "user_profiles_insert_own" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own profile data
CREATE POLICY "user_profiles_update_own" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own profile data
CREATE POLICY "user_profiles_delete_own" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- Add a unique constraint to ensure one profile per user
ALTER TABLE public.user_profiles 
ADD CONSTRAINT unique_user_profile UNIQUE (user_id);