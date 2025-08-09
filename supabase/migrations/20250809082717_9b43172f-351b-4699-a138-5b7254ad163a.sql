-- Create enums if not exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hs_category') THEN
    CREATE TYPE public.hs_category AS ENUM ('health', 'wealth', 'relationships');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hs_assessment_status') THEN
    CREATE TYPE public.hs_assessment_status AS ENUM ('not_started', 'in_progress', 'completed');
  END IF;
END $$;

-- Common updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- HS_user_profiles
CREATE TABLE IF NOT EXISTS public."HS_user_profiles" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text,
  age integer,
  occupation text,
  gender text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public."HS_user_profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HS_user_profiles_select_own"
ON public."HS_user_profiles"
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "HS_user_profiles_insert_own"
ON public."HS_user_profiles"
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "HS_user_profiles_update_own"
ON public."HS_user_profiles"
FOR UPDATE
USING (auth.uid() = user_id);

CREATE TRIGGER update_HS_user_profiles_updated_at
BEFORE UPDATE ON public."HS_user_profiles"
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HS_assessments
CREATE TABLE IF NOT EXISTS public."HS_assessments" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status public.hs_assessment_status NOT NULL DEFAULT 'not_started',
  total_questions integer NOT NULL DEFAULT 23,
  current_index integer NOT NULL DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public."HS_assessments" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HS_assessments_select_own"
ON public."HS_assessments"
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "HS_assessments_insert_own"
ON public."HS_assessments"
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "HS_assessments_update_own"
ON public."HS_assessments"
FOR UPDATE
USING (auth.uid() = user_id);

CREATE TRIGGER update_HS_assessments_updated_at
BEFORE UPDATE ON public."HS_assessments"
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HS_questions (static catalog)
CREATE TABLE IF NOT EXISTS public."HS_questions" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category public.hs_category NOT NULL,
  order_index integer NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public."HS_questions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HS_questions_public_read"
ON public."HS_questions"
FOR SELECT
USING (true);

-- HS_question_options (static catalog)
CREATE TABLE IF NOT EXISTS public."HS_question_options" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES public."HS_questions"(id) ON DELETE CASCADE,
  label text NOT NULL,
  value integer NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(question_id, order_index)
);

ALTER TABLE public."HS_question_options" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HS_question_options_public_read"
ON public."HS_question_options"
FOR SELECT
USING (true);

-- HS_responses (user answers)
CREATE TABLE IF NOT EXISTS public."HS_responses" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES public."HS_assessments"(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public."HS_questions"(id) ON DELETE CASCADE,
  option_id uuid REFERENCES public."HS_question_options"(id) ON DELETE SET NULL,
  answer_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, question_id)
);

ALTER TABLE public."HS_responses" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HS_responses_select_own"
ON public."HS_responses"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public."HS_assessments" a
    WHERE a.id = assessment_id AND a.user_id = auth.uid()
  )
);

CREATE POLICY "HS_responses_insert_own"
ON public."HS_responses"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public."HS_assessments" a
    WHERE a.id = assessment_id AND a.user_id = auth.uid()
  )
);

CREATE POLICY "HS_responses_update_own"
ON public."HS_responses"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public."HS_assessments" a
    WHERE a.id = assessment_id AND a.user_id = auth.uid()
  )
);

CREATE TRIGGER update_HS_responses_updated_at
BEFORE UPDATE ON public."HS_responses"
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed questions (ON CONFLICT to avoid duplicates)
INSERT INTO public."HS_questions" (category, order_index, title, description)
VALUES
  ('health', 1, 'Nutrition Rainbow Check', 'How many different colored whole foods do you eat weekly?'),
  ('health', 2, 'Gut Health Reality Check', 'What''s your usual bathroom situation?'),
  ('health', 3, 'Move It or Lose It', 'Weekly exercise reality'),
  ('health', 4, 'Hydration Station', 'Daily water intake + quality awareness'),
  ('health', 5, 'Sunshine Vitamin', 'Weekly sun exposure (10-20 min without sunscreen)'),
  ('health', 6, 'Sleep Like a Baby', 'Average nightly sleep + quality'),
  ('health', 7, 'Fresh Air Enthusiast', 'Weekly outdoor time in nature'),
  ('health', 8, 'Breathe Like You Mean It', 'Breathing practices'),
  ('health', 9, 'Oral Care Superstar', 'Oral hygiene routine'),
  ('wealth', 10, 'Money Mindset', 'When you think about money, you feel'),
  ('wealth', 11, 'Financial Safety Net', 'Emergency fund reality'),
  ('wealth', 12, 'Income Diversity', 'Number of income sources'),
  ('wealth', 13, 'Workplace Vibes', 'At work, I feel'),
  ('wealth', 14, 'Creative Flow', 'Weekly creative time'),
  ('wealth', 15, 'Rest & Recharge', 'Weekly "doing absolutely nothing" time'),
  ('relationships', 16, 'Self-Relationship Status', 'Your inner dialogue is mostly'),
  ('relationships', 17, 'Judgment Detox', 'Labels and judgments about others/yourself'),
  ('relationships', 18, 'Identity Check', 'I primarily identify as'),
  ('relationships', 19, 'Partner Relationship', 'If you have a partner, your relationship feels'),
  ('relationships', 20, 'Family Foundation', 'Overall family relationships'),
  ('relationships', 21, 'Friend Squad', 'Friend relationships'),
  ('relationships', 22, 'Universal Connection', 'Sense of spiritual connection/purpose'),
  ('relationships', 23, 'Life Simplicity Score', 'Overall life simplicity (1-10)')
ON CONFLICT (order_index) DO NOTHING;

-- Seed options per question (value: 4=best to 1=least)
-- Q1 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🎨 I''m basically Picasso (20+ colors)', 4, 1),
  ('🌈 Decent rainbow (10-19 colors)', 3, 2),
  ('🟡 Monochrome Monday (5-9 colors)', 2, 3),
  ('⚪ Beige is my favorite color (0-4 colors)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 1
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q2 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🥒 Type 3-4: Perfect sausages (Bristol Chart gold standard)', 4, 1),
  ('🌰 Type 1-2: Hard nuggets (need more fiber, friend!)', 2, 2),
  ('🌊 Type 5-7: Too loose/liquid (time for some gut love)', 2, 3),
  ('🤷‍♀️ I don''t pay attention (ignorance isn''t bliss here!)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 2
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q3 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('💪 7+ hours (You''re crushing it!)', 4, 1),
  ('🚶‍♀️ 4-6 hours (Solid effort)', 3, 2),
  ('😅 1-3 hours (Room for improvement)', 2, 3),
  ('🛋️ Exercise? I thought you said extra fries', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 3
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q4 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌊 8+ glasses of quality water + I''m grateful for it', 4, 1),
  ('💧 6-8 glasses, decent quality', 3, 2),
  ('🥤 Mostly other beverages, some water', 2, 3),
  ('🏜️ What''s water? (Please don''t say this!)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 4
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q5 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌞 Daily sun worship (with safety!)', 4, 1),
  ('☀️ 4-6 times per week', 3, 2),
  ('🌤️ 1-3 times per week', 2, 3),
  ('🧛‍♀️ I am basically a vampire', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 5
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q6 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🛌 7-9 hours of blissful sleep', 4, 1),
  ('😴 7-9 hours but restless', 3, 2),
  ('⏰ 5-7 hours (surviving on fumes)', 2, 3),
  ('🦉 What is sleep?', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 6
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q7 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🏞️ 10+ hours (Nature child)', 4, 1),
  ('🌳 5-10 hours (Good balance)', 3, 2),
  ('🌿 1-4 hours (Could do better)', 2, 3),
  ('🏢 What''s outside?', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 7
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q8 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🧘‍♀️ Daily breathwork practice', 4, 1),
  ('🌬️ Occasional conscious breathing', 3, 2),
  ('😤 Only when stressed', 2, 3),
  ('🤷‍♀️ Breathing is automatic, right?', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 8
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q9 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('✨ Brush, floss, tongue scrape, oil pull (Dentist''s dream patient)', 4, 1),
  ('🦷 Brush twice + floss regularly', 3, 2),
  ('😬 Brush twice, floss sometimes', 2, 3),
  ('🤫 Don''t tell my dentist', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 9
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q10 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌟 Abundant (Money flows easily)', 4, 1),
  ('😌 Secure (I''ve got this handled)', 3, 2),
  ('😰 Anxious (Always worrying)', 2, 3),
  ('😵‍💫 Avoidant (La la la, can''t hear you)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 10
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q11 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('💎 12+ months expenses saved', 4, 1),
  ('💳 6-12 months covered', 3, 2),
  ('💸 3-6 months saved', 2, 3),
  ('🤡 Emergency fund? That''s what credit cards are for!', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 11
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q12 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌊 4+ streams (Diversification queen!)', 4, 1),
  ('💼 2-3 sources (Smart move)', 3, 2),
  ('💰 1 main source (All eggs, one basket)', 2, 3),
  ('🔍 Currently seeking income', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 12
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q13 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🚀 Ownership + autonomy (Dream job territory)', 4, 1),
  ('🤝 Trusted team member', 3, 2),
  ('😐 It pays the bills', 2, 3),
  ('😩 Sunday scaries every week', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 13
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q14 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🎭 10+ hours (Renaissance soul)', 4, 1),
  ('🖌️ 5-10 hours (Nice balance)', 3, 2),
  ('✏️ 1-4 hours (Could use more)', 2, 3),
  ('📺 Does watching Netflix count?', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 14
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q15 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🧘‍♀️ 10+ hours (Zen master)', 4, 1),
  ('😌 5-10 hours (Healthy balance)', 3, 2),
  ('⚡ 1-4 hours (Go-go-go lifestyle)', 2, 3),
  ('🏃‍♀️ Rest is for the weak! (Please rest)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 15
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q16 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌅 Present moment awareness', 4, 1),
  ('📚 Future planning mode', 3, 2),
  ('📖 Past reflection mode', 2, 3),
  ('🌪️ Mental chaos (thoughts everywhere!)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 16
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q17 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🕊️ Rarely judge (Zen level achieved)', 4, 1),
  ('🤔 Sometimes slip into judgment', 3, 2),
  ('😤 Often judgmental (Working on it)', 2, 3),
  ('👨‍⚖️ I''m basically a judgment factory', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 17
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q18 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🌟 The conscious observer', 4, 1),
  ('🧠 My thoughts and mind', 3, 2),
  ('💓 My emotions and feelings', 2, 3),
  ('🏃‍♀️ My physical body', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 18
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q19 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('💕 Deeply connected & collaborative (Goals!)', 4, 1),
  ('😊 Generally positive & supportive', 3, 2),
  ('😬 It''s complicated (Isn''t it always?)', 2, 3),
  ('🚫 Not applicable/Single by choice', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 19
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q20 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🥰 Grateful and connected (8-10/10)', 4, 1),
  ('😊 Pretty good overall (5-7/10)', 3, 2),
  ('😐 It''s complicated (3-4/10)', 2, 3),
  ('😔 Challenging relationships (1-2/10)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 20
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q21 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🎉 Amazing support system (8-10/10)', 4, 1),
  ('🤗 Solid friendships (5-7/10)', 3, 2),
  ('😕 Few but okay friends (3-4/10)', 2, 3),
  ('😞 Struggling with friendships (1-2/10)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 21
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q22 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('✨ Strong spiritual practice & purpose', 4, 1),
  ('🙏 Sometimes feel connected', 3, 2),
  ('🤷‍♀️ Questioning/exploring', 2, 3),
  ('🌀 Feeling pretty lost lately', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 22
ON CONFLICT (question_id, order_index) DO NOTHING;

-- Q23 options
INSERT INTO public."HS_question_options" (question_id, label, value, order_index)
SELECT q.id, x.label, x.value, x.order_index FROM public."HS_questions" q
JOIN (VALUES
  ('🧘‍♀️ 8-10 (Marie Kondo would be proud)', 4, 1),
  ('😌 6-7 (Pretty streamlined)', 3, 2),
  ('😅 4-5 (Moderately chaotic)', 2, 3),
  ('🌪️ 1-3 (Life is a beautiful disaster)', 1, 4)
) AS x(label, value, order_index) ON TRUE
WHERE q.order_index = 23
ON CONFLICT (question_id, order_index) DO NOTHING;
