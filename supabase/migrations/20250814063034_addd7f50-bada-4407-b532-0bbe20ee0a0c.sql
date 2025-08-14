-- Fix Assessment Summary Data Security Issue
-- Enable RLS and create policies for HS_assessment_scores_summary

-- First, enable Row Level Security on the summary table/view
ALTER TABLE public."HS_assessment_scores_summary" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the assessment scores summary that match the underlying table security
-- Policy for SELECT: Users can only see their own assessment data or guest data they own
CREATE POLICY "HS_assessment_scores_summary_select_own" 
ON public."HS_assessment_scores_summary" 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND guest_id IS NOT NULL AND guest_id = public.get_current_guest_id())
);

-- Note: Since this is a summary/reporting table, we typically only need SELECT policies
-- INSERT, UPDATE, DELETE should be handled through the underlying tables

-- Grant necessary permissions to authenticated users
GRANT SELECT ON public."HS_assessment_scores_summary" TO authenticated;

-- Ensure the view uses security invoker mode for proper RLS enforcement
ALTER VIEW public."HS_assessment_scores_summary" SET (security_invoker = true);