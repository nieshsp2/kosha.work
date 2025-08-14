-- Fix Assessment Summary Data Security Issue
-- Since HS_assessment_scores_summary is a view, we need to ensure it properly inherits security

-- First, let's drop and recreate the view with proper security
DROP VIEW IF EXISTS public."HS_assessment_scores_summary";

-- Recreate the view with explicit security invoker and proper joins
CREATE VIEW public."HS_assessment_scores_summary" 
WITH (security_invoker = true) AS
SELECT s.id,
    s.assessment_id,
    s.user_id,
    s.guest_id,
    s.assessment_date,
    s.overall_total_score,
    s.overall_percentage,
    s.overall_grade,
    s.overall_level,
    s.health_percentage,
    s.wealth_percentage,
    s.relationships_percentage,
    a.status AS assessment_status,
    a.completed_at,
    up.age,
    up.gender,
    up.occupation,
    up.location
FROM public."HS_assessment_scores" s
LEFT JOIN public."HS_assessments" a ON s.assessment_id = a.id
LEFT JOIN public."HS_user_profiles" up ON (
    (s.user_id IS NOT NULL AND up.user_id = s.user_id) OR 
    (s.guest_id IS NOT NULL AND up.guest_id = s.guest_id)
);

-- Grant SELECT permission to authenticated users
GRANT SELECT ON public."HS_assessment_scores_summary" TO authenticated;

-- Create a security definer function as an alternative secure access method
-- This ensures proper guest session validation
CREATE OR REPLACE FUNCTION public.get_user_assessment_summary()
RETURNS TABLE (
    id uuid,
    assessment_id uuid,
    user_id uuid,
    guest_id text,
    assessment_date timestamp with time zone,
    overall_total_score numeric,
    overall_percentage numeric,
    overall_grade text,
    overall_level text,
    health_percentage numeric,
    wealth_percentage numeric,
    relationships_percentage numeric,
    assessment_status hs_assessment_status,
    completed_at timestamp with time zone,
    age integer,
    gender text,
    occupation text,
    location text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_user_id uuid;
    current_guest_id text;
BEGIN
    -- Get current user context
    current_user_id := auth.uid();
    current_guest_id := public.get_current_guest_id();
    
    -- Return data filtered by proper ownership
    RETURN QUERY
    SELECT s.id,
           s.assessment_id,
           s.user_id,
           s.guest_id,
           s.assessment_date,
           s.overall_total_score,
           s.overall_percentage,
           s.overall_grade,
           s.overall_level,
           s.health_percentage,
           s.wealth_percentage,
           s.relationships_percentage,
           a.status AS assessment_status,
           a.completed_at,
           up.age,
           up.gender,
           up.occupation,
           up.location
    FROM public."HS_assessment_scores" s
    LEFT JOIN public."HS_assessments" a ON s.assessment_id = a.id
    LEFT JOIN public."HS_user_profiles" up ON (
        (s.user_id IS NOT NULL AND up.user_id = s.user_id) OR 
        (s.guest_id IS NOT NULL AND up.guest_id = s.guest_id)
    )
    WHERE (
        (current_user_id IS NOT NULL AND s.user_id = current_user_id) OR
        (current_guest_id IS NOT NULL AND s.guest_id = current_guest_id)
    );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_assessment_summary() TO authenticated;

COMMENT ON VIEW public."HS_assessment_scores_summary" IS 'Assessment scores summary view with inherited RLS from underlying tables';
COMMENT ON FUNCTION public.get_user_assessment_summary() IS 'Secure function to get user assessment summary with proper guest validation';