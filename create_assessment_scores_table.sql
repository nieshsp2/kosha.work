-- Create new assessment scores table for storing calculated assessment results
-- This table maintains context and required reference IDs linked to other tables

-- Create the HS_assessment_scores table
CREATE TABLE IF NOT EXISTS public."HS_assessment_scores" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign key relationships
  assessment_id uuid NOT NULL REFERENCES public."HS_assessments"(id) ON DELETE CASCADE,
  user_id uuid NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_id text NULL,
  
  -- Assessment metadata
  assessment_date timestamptz NOT NULL DEFAULT now(),
  total_questions_answered integer NOT NULL,
  
  -- Overall scores (calculated from individual components)
  overall_total_score numeric(5,2) NOT NULL,
  overall_max_score numeric(5,2) NOT NULL,
  overall_percentage numeric(5,2) NOT NULL,
  overall_grade text NOT NULL,
  overall_level text NOT NULL,
  
  -- Health category scores (40% weight - 4.0 max points)
  health_total_score numeric(5,2) NOT NULL,
  health_max_score numeric(5,2) NOT NULL DEFAULT 4.0,
  health_percentage numeric(5,2) NOT NULL,
  health_nutrition_score numeric(5,2) NOT NULL,
  health_digestion_score numeric(5,2) NOT NULL,
  health_exercise_score numeric(5,2) NOT NULL,
  health_water_score numeric(5,2) NOT NULL,
  health_sunlight_score numeric(5,2) NOT NULL,
  health_sleep_score numeric(5,2) NOT NULL,
  health_outdoor_air_score numeric(5,2) NOT NULL,
  health_oral_care_score numeric(5,2) NOT NULL,
  health_skin_care_score numeric(5,2) NOT NULL,
  
  -- Wealth category scores (30% weight - 3.0 max points)
  wealth_total_score numeric(5,2) NOT NULL,
  wealth_max_score numeric(5,2) NOT NULL DEFAULT 3.0,
  wealth_percentage numeric(5,2) NOT NULL,
  wealth_quality_score numeric(5,2) NOT NULL,
  wealth_quantity_score numeric(5,2) NOT NULL,
  wealth_diversity_score numeric(5,2) NOT NULL,
  wealth_workplace_score numeric(5,2) NOT NULL,
  wealth_creativity_score numeric(5,2) NOT NULL,
  wealth_rest_relaxation_score numeric(5,2) NOT NULL,
  
  -- Relationships category scores (30% weight - 3.0 max points)
  relationships_total_score numeric(5,2) NOT NULL,
  relationships_max_score numeric(5,2) NOT NULL DEFAULT 3.0,
  relationships_percentage numeric(5,2) NOT NULL,
  relationships_mental_wellbeing_score numeric(5,2) NOT NULL,
  relationships_emotional_wellbeing_score numeric(5,2) NOT NULL,
  relationships_partner_score numeric(5,2) NOT NULL,
  relationships_parents_score numeric(5,2) NOT NULL,
  relationships_children_score numeric(5,2) NOT NULL,
  relationships_relatives_score numeric(5,2) NOT NULL,
  relationships_friends_score numeric(5,2) NOT NULL,
  relationships_universal_oneness_score numeric(5,2) NOT NULL,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT "HS_assessment_scores_assessment_unique" UNIQUE(assessment_id),
  CONSTRAINT "HS_assessment_scores_user_guest_check" CHECK (
    (user_id IS NOT NULL AND guest_id IS NULL) OR 
    (user_id IS NULL AND guest_id IS NOT NULL)
  ),
  CONSTRAINT "HS_assessment_scores_percentage_range" CHECK (
    overall_percentage >= 0 AND overall_percentage <= 100
  ),
  CONSTRAINT "HS_assessment_scores_grade_valid" CHECK (
    overall_grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F')
  )
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_user_id_idx" ON public."HS_assessment_scores"(user_id);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_guest_id_idx" ON public."HS_assessment_scores"(guest_id);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_assessment_date_idx" ON public."HS_assessment_scores"(assessment_date);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_overall_percentage_idx" ON public."HS_assessment_scores"(overall_percentage);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_health_percentage_idx" ON public."HS_assessment_scores"(health_percentage);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_wealth_percentage_idx" ON public."HS_assessment_scores"(wealth_percentage);
CREATE INDEX IF NOT EXISTS "HS_assessment_scores_relationships_percentage_idx" ON public."HS_assessment_scores"(relationships_percentage);

-- Enable Row Level Security
ALTER TABLE public."HS_assessment_scores" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the new table
-- Policy for selecting scores: users can see their own scores or guest scores they created
CREATE POLICY "HS_assessment_scores_select_own" ON public."HS_assessment_scores"
FOR SELECT
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

-- Policy for inserting scores: users can insert their own scores or guest scores
CREATE POLICY "HS_assessment_scores_insert_own" ON public."HS_assessment_scores"
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

-- Policy for updating scores: users can update their own scores or guest scores they created
CREATE POLICY "HS_assessment_scores_update_own" ON public."HS_assessment_scores"
FOR UPDATE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

-- Policy for deleting scores: users can delete their own scores or guest scores they created
CREATE POLICY "HS_assessment_scores_delete_own" ON public."HS_assessment_scores"
FOR DELETE
USING (
  (auth.uid() = user_id) OR 
  (guest_id IS NOT NULL)
);

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_assessment_scores_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_HS_assessment_scores_updated_at
  BEFORE UPDATE ON public."HS_assessment_scores"
  FOR EACH ROW
  EXECUTE FUNCTION public.update_assessment_scores_updated_at();

-- Add comments to document the table structure
COMMENT ON TABLE public."HS_assessment_scores" IS 'Stores calculated assessment scores for both authenticated users and guest users';
COMMENT ON COLUMN public."HS_assessment_scores".assessment_id IS 'Reference to the assessment this score belongs to';
COMMENT ON COLUMN public."HS_assessment_scores".user_id IS 'User ID for authenticated users (NULL for guest users)';
COMMENT ON COLUMN public."HS_assessment_scores".guest_id IS 'Guest ID for unauthenticated users (NULL for authenticated users)';
COMMENT ON COLUMN public."HS_assessment_scores".overall_total_score IS 'Total calculated score across all categories';
COMMENT ON COLUMN public."HS_assessment_scores".overall_max_score IS 'Maximum possible score (10.0)';
COMMENT ON COLUMN public."HS_assessment_scores".overall_percentage IS 'Percentage score (0-100)';
COMMENT ON COLUMN public."HS_assessment_scores".overall_grade IS 'Letter grade (A+, A, A-, B+, B, B-, C+, C, C-, F)';
COMMENT ON COLUMN public."HS_assessment_scores".overall_level IS 'Performance level description';

-- Create a view for easier score analysis (optional)
CREATE OR REPLACE VIEW public."HS_assessment_scores_summary" AS
SELECT 
  s.id,
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
  a.status as assessment_status,
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

-- Grant appropriate permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public."HS_assessment_scores" TO authenticated;
GRANT SELECT ON public."HS_assessment_scores_summary" TO authenticated;

-- Enable RLS on the view
ALTER VIEW public."HS_assessment_scores_summary" SET (security_invoker = true);

