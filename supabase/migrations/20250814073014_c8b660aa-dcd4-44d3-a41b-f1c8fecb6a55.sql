-- First, let's clear existing questions and options
DELETE FROM "HS_question_options";
DELETE FROM "HS_questions";

-- Insert new health questions (9 questions, 40% weight)
INSERT INTO "HS_questions" (id, category, order_index, title, description) VALUES
(gen_random_uuid(), 'health', 1, 'Nutrition Rainbow Check', 'Fun fact: Your gut has more bacteria than your body has cells - let''s keep those little friends happy! How many different colored whole foods do you eat weekly?'),
(gen_random_uuid(), 'health', 2, 'Gut Health Reality Check', 'Bristol Stool Chart - yes, we''re going there! Your poop is basically your gut''s report card. What''s your usual bathroom situation?'),
(gen_random_uuid(), 'health', 3, 'Move It or Lose It', 'Your ancestors walked 20+ miles daily. Now we celebrate 10,000 steps! Weekly exercise reality:'),
(gen_random_uuid(), 'health', 4, 'Hydration Station', 'Your brain is 75% water - dehydration literally makes you less smart! Daily water intake + quality awareness:'),
(gen_random_uuid(), 'health', 5, 'Sunshine Vitamin', 'Vitamin D deficiency affects 1 billion people globally - don''t be a statistic! Weekly sun exposure (without sunscreen for 10-20 min):'),
(gen_random_uuid(), 'health', 6, 'Sleep Like a Baby', 'Fun fact: Sleep cleans your brain literally - like a dishwasher for your neurons! Average nightly sleep + quality:'),
(gen_random_uuid(), 'health', 7, 'Fresh Air Enthusiast', 'Indoor air can be 5x more polluted than outdoor air. Step outside! Weekly outdoor time in nature:'),
(gen_random_uuid(), 'health', 8, 'Breathe Like You Mean It', 'Most people use only 30% of their lung capacity - you''re missing out! Breathing practices:'),
(gen_random_uuid(), 'health', 9, 'Oral Care Superstar', 'Your mouth is the gateway to your body - 90% of diseases show oral symptoms first! Oral hygiene routine:');

-- Insert wealth questions (6 questions, 30% weight)
INSERT INTO "HS_questions" (id, category, order_index, title, description) VALUES
(gen_random_uuid(), 'wealth', 10, 'Money Mindset', 'Your relationship with money affects every financial decision you make! When you think about money, you feel:'),
(gen_random_uuid(), 'wealth', 11, 'Financial Safety Net', 'Financial stress literally rewires your brain for anxiety! Emergency fund reality:'),
(gen_random_uuid(), 'wealth', 12, 'Income Diversity', 'The average millionaire has 7 income streams. How''s your portfolio? Number of income sources:'),
(gen_random_uuid(), 'wealth', 13, 'Workplace Vibes', 'You spend 1/3 of your life working - better make it count! At work, I feel:'),
(gen_random_uuid(), 'wealth', 14, 'Creative Flow', 'Creativity isn''t just for artists - it''s brain food for everyone! Weekly creative time:'),
(gen_random_uuid(), 'wealth', 15, 'Rest & Recharge', 'Doing nothing is actually doing something - it''s called restoration! Weekly "doing absolutely nothing" time:');

-- Insert relationships questions (8 questions, 30% weight)
INSERT INTO "HS_questions" (id, category, order_index, title, description) VALUES
(gen_random_uuid(), 'relationships', 16, 'Self-Relationship Status', 'The most important relationship you''ll ever have! Your inner dialogue is mostly:'),
(gen_random_uuid(), 'relationships', 17, 'Judgment Detox', 'Holding onto judgments is like drinking poison and expecting others to suffer! Labels and judgments about others/yourself:'),
(gen_random_uuid(), 'relationships', 18, 'Identity Check', 'You are not your thoughts, emotions, or even your body - you''re the observer! I primarily identify as:'),
(gen_random_uuid(), 'relationships', 19, 'Partner Relationship', 'Romantic relationships can either multiply your joy or divide your peace! If you have a partner, your relationship feels:'),
(gen_random_uuid(), 'relationships', 20, 'Family Foundation', 'Family relationships shape our attachment patterns for life! Overall family relationships (parents, siblings, relatives):'),
(gen_random_uuid(), 'relationships', 21, 'Friend Squad', 'Good friends are like good wine - they get better with time and help you forget your troubles! Friend relationships:'),
(gen_random_uuid(), 'relationships', 22, 'Universal Connection', 'Feeling connected to something bigger than yourself is linked to better mental health! Sense of spiritual connection/purpose:'),
(gen_random_uuid(), 'relationships', 23, 'Life Simplicity Score', 'Complexity is the enemy of execution - how simple is your beautiful life? Overall life simplicity (1-10, where 10 = blissfully simple):');

-- Now insert the options for each question
-- Question 1: Nutrition Rainbow Check
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🎨 I''m basically Picasso (20+ colors)', 4, 1 FROM "HS_questions" WHERE order_index = 1
UNION ALL
SELECT id, '🌈 Decent rainbow (10-19 colors)', 3, 2 FROM "HS_questions" WHERE order_index = 1
UNION ALL
SELECT id, '🟡 Monochrome Monday (5-9 colors)', 2, 3 FROM "HS_questions" WHERE order_index = 1
UNION ALL
SELECT id, '⚪ Beige is my favorite color (0-4 colors)', 1, 4 FROM "HS_questions" WHERE order_index = 1;

-- Question 2: Gut Health Reality Check
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🥒 Type 3-4: Perfect sausages (Bristol Chart gold standard)', 4, 1 FROM "HS_questions" WHERE order_index = 2
UNION ALL
SELECT id, '🌰 Type 1-2: Hard nuggets (need more fiber, friend!)', 2, 2 FROM "HS_questions" WHERE order_index = 2
UNION ALL
SELECT id, '🌊 Type 5-7: Too loose/liquid (time for some gut love)', 2, 3 FROM "HS_questions" WHERE order_index = 2
UNION ALL
SELECT id, '🤷‍♀️ I don''t pay attention (ignorance isn''t bliss here!)', 1, 4 FROM "HS_questions" WHERE order_index = 2;

-- Question 3: Move It or Lose It
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '💪 7+ hours (You''re crushing it!)', 4, 1 FROM "HS_questions" WHERE order_index = 3
UNION ALL
SELECT id, '🚶‍♀️ 4-6 hours (Solid effort)', 3, 2 FROM "HS_questions" WHERE order_index = 3
UNION ALL
SELECT id, '😅 1-3 hours (Room for improvement)', 2, 3 FROM "HS_questions" WHERE order_index = 3
UNION ALL
SELECT id, '🛋️ Exercise? I thought you said extra fries', 1, 4 FROM "HS_questions" WHERE order_index = 3;

-- Question 4: Hydration Station
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌊 8+ glasses of quality water + I''m grateful for it', 4, 1 FROM "HS_questions" WHERE order_index = 4
UNION ALL
SELECT id, '💧 6-8 glasses, decent quality', 3, 2 FROM "HS_questions" WHERE order_index = 4
UNION ALL
SELECT id, '🥤 Mostly other beverages, some water', 2, 3 FROM "HS_questions" WHERE order_index = 4
UNION ALL
SELECT id, '🏜️ What''s water? (Please don''t say this!)', 1, 4 FROM "HS_questions" WHERE order_index = 4;

-- Question 5: Sunshine Vitamin
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌞 Daily sun worship (with safety!)', 4, 1 FROM "HS_questions" WHERE order_index = 5
UNION ALL
SELECT id, '☀️ 4-6 times per week', 3, 2 FROM "HS_questions" WHERE order_index = 5
UNION ALL
SELECT id, '🌤️ 1-3 times per week', 2, 3 FROM "HS_questions" WHERE order_index = 5
UNION ALL
SELECT id, '🧛‍♀️ I am basically a vampire', 1, 4 FROM "HS_questions" WHERE order_index = 5;

-- Question 6: Sleep Like a Baby
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🛌 7-9 hours of blissful sleep', 4, 1 FROM "HS_questions" WHERE order_index = 6
UNION ALL
SELECT id, '😴 7-9 hours but restless', 3, 2 FROM "HS_questions" WHERE order_index = 6
UNION ALL
SELECT id, '⏰ 5-7 hours (surviving on fumes)', 2, 3 FROM "HS_questions" WHERE order_index = 6
UNION ALL
SELECT id, '🦉 What is sleep?', 1, 4 FROM "HS_questions" WHERE order_index = 6;

-- Question 7: Fresh Air Enthusiast
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🏞️ 10+ hours (Nature child)', 4, 1 FROM "HS_questions" WHERE order_index = 7
UNION ALL
SELECT id, '🌳 5-10 hours (Good balance)', 3, 2 FROM "HS_questions" WHERE order_index = 7
UNION ALL
SELECT id, '🌿 1-4 hours (Could do better)', 2, 3 FROM "HS_questions" WHERE order_index = 7
UNION ALL
SELECT id, '🏢 What''s outside?', 1, 4 FROM "HS_questions" WHERE order_index = 7;

-- Question 8: Breathe Like You Mean It
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🧘‍♀️ Daily breathwork practice', 4, 1 FROM "HS_questions" WHERE order_index = 8
UNION ALL
SELECT id, '🌬️ Occasional conscious breathing', 3, 2 FROM "HS_questions" WHERE order_index = 8
UNION ALL
SELECT id, '😤 Only when stressed', 2, 3 FROM "HS_questions" WHERE order_index = 8
UNION ALL
SELECT id, '🤷‍♀️ Breathing is automatic, right?', 1, 4 FROM "HS_questions" WHERE order_index = 8;

-- Question 9: Oral Care Superstar
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '✨ Brush, floss, tongue scrape, oil pull (Dentist''s dream patient)', 4, 1 FROM "HS_questions" WHERE order_index = 9
UNION ALL
SELECT id, '🦷 Brush twice + floss regularly', 3, 2 FROM "HS_questions" WHERE order_index = 9
UNION ALL
SELECT id, '😬 Brush twice, floss sometimes', 2, 3 FROM "HS_questions" WHERE order_index = 9
UNION ALL
SELECT id, '🤫 Don''t tell my dentist', 1, 4 FROM "HS_questions" WHERE order_index = 9;

-- Question 10: Money Mindset
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌟 Abundant (Money flows easily)', 4, 1 FROM "HS_questions" WHERE order_index = 10
UNION ALL
SELECT id, '😌 Secure (I''ve got this handled)', 3, 2 FROM "HS_questions" WHERE order_index = 10
UNION ALL
SELECT id, '😰 Anxious (Always worrying)', 2, 3 FROM "HS_questions" WHERE order_index = 10
UNION ALL
SELECT id, '😵‍💫 Avoidant (La la la, can''t hear you)', 1, 4 FROM "HS_questions" WHERE order_index = 10;

-- Question 11: Financial Safety Net
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '💎 12+ months expenses saved', 4, 1 FROM "HS_questions" WHERE order_index = 11
UNION ALL
SELECT id, '💳 6-12 months covered', 3, 2 FROM "HS_questions" WHERE order_index = 11
UNION ALL
SELECT id, '💸 3-6 months saved', 2, 3 FROM "HS_questions" WHERE order_index = 11
UNION ALL
SELECT id, '🤡 Emergency fund? That''s what credit cards are for!', 1, 4 FROM "HS_questions" WHERE order_index = 11;

-- Question 12: Income Diversity
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌊 4+ streams (Diversification queen!)', 4, 1 FROM "HS_questions" WHERE order_index = 12
UNION ALL
SELECT id, '💼 2-3 sources (Smart move)', 3, 2 FROM "HS_questions" WHERE order_index = 12
UNION ALL
SELECT id, '💰 1 main source (All eggs, one basket)', 2, 3 FROM "HS_questions" WHERE order_index = 12
UNION ALL
SELECT id, '🔍 Currently seeking income', 1, 4 FROM "HS_questions" WHERE order_index = 12;

-- Question 13: Workplace Vibes
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🚀 Ownership + autonomy (Dream job territory)', 4, 1 FROM "HS_questions" WHERE order_index = 13
UNION ALL
SELECT id, '🤝 Trusted team member', 3, 2 FROM "HS_questions" WHERE order_index = 13
UNION ALL
SELECT id, '😐 It pays the bills', 2, 3 FROM "HS_questions" WHERE order_index = 13
UNION ALL
SELECT id, '😩 Sunday scaries every week', 1, 4 FROM "HS_questions" WHERE order_index = 13;

-- Question 14: Creative Flow
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🎭 10+ hours (Renaissance soul)', 4, 1 FROM "HS_questions" WHERE order_index = 14
UNION ALL
SELECT id, '🖌️ 5-10 hours (Nice balance)', 3, 2 FROM "HS_questions" WHERE order_index = 14
UNION ALL
SELECT id, '✏️ 1-4 hours (Could use more)', 2, 3 FROM "HS_questions" WHERE order_index = 14
UNION ALL
SELECT id, '📺 Does watching Netflix count?', 1, 4 FROM "HS_questions" WHERE order_index = 14;

-- Question 15: Rest & Recharge
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🧘‍♀️ 10+ hours (Zen master)', 4, 1 FROM "HS_questions" WHERE order_index = 15
UNION ALL
SELECT id, '😌 5-10 hours (Healthy balance)', 3, 2 FROM "HS_questions" WHERE order_index = 15
UNION ALL
SELECT id, '⚡ 1-4 hours (Go-go-go lifestyle)', 2, 3 FROM "HS_questions" WHERE order_index = 15
UNION ALL
SELECT id, '🏃‍♀️ Rest is for the weak! (Please rest)', 1, 4 FROM "HS_questions" WHERE order_index = 15;

-- Question 16: Self-Relationship Status
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌅 Present moment awareness', 4, 1 FROM "HS_questions" WHERE order_index = 16
UNION ALL
SELECT id, '📚 Future planning mode', 3, 2 FROM "HS_questions" WHERE order_index = 16
UNION ALL
SELECT id, '📖 Past reflection mode', 2, 3 FROM "HS_questions" WHERE order_index = 16
UNION ALL
SELECT id, '🌪️ Mental chaos (thoughts everywhere!)', 1, 4 FROM "HS_questions" WHERE order_index = 16;

-- Question 17: Judgment Detox
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🕊️ Rarely judge (Zen level achieved)', 4, 1 FROM "HS_questions" WHERE order_index = 17
UNION ALL
SELECT id, '🤔 Sometimes slip into judgment', 3, 2 FROM "HS_questions" WHERE order_index = 17
UNION ALL
SELECT id, '😤 Often judgmental (Working on it)', 2, 3 FROM "HS_questions" WHERE order_index = 17
UNION ALL
SELECT id, '👨‍⚖️ I''m basically a judgment factory', 1, 4 FROM "HS_questions" WHERE order_index = 17;

-- Question 18: Identity Check
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🌟 The conscious observer', 4, 1 FROM "HS_questions" WHERE order_index = 18
UNION ALL
SELECT id, '🧠 My thoughts and mind', 3, 2 FROM "HS_questions" WHERE order_index = 18
UNION ALL
SELECT id, '💓 My emotions and feelings', 2, 3 FROM "HS_questions" WHERE order_index = 18
UNION ALL
SELECT id, '🏃‍♀️ My physical body', 1, 4 FROM "HS_questions" WHERE order_index = 18;

-- Question 19: Partner Relationship
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '💕 Deeply connected & collaborative (Goals!)', 4, 1 FROM "HS_questions" WHERE order_index = 19
UNION ALL
SELECT id, '😊 Generally positive & supportive', 3, 2 FROM "HS_questions" WHERE order_index = 19
UNION ALL
SELECT id, '😬 It''s complicated (Isn''t it always?)', 2, 3 FROM "HS_questions" WHERE order_index = 19
UNION ALL
SELECT id, '🚫 Not applicable/Single by choice', 1, 4 FROM "HS_questions" WHERE order_index = 19;

-- Question 20: Family Foundation
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🥰 Grateful and connected (8-10/10)', 4, 1 FROM "HS_questions" WHERE order_index = 20
UNION ALL
SELECT id, '😊 Pretty good overall (5-7/10)', 3, 2 FROM "HS_questions" WHERE order_index = 20
UNION ALL
SELECT id, '😐 It''s complicated (3-4/10)', 2, 3 FROM "HS_questions" WHERE order_index = 20
UNION ALL
SELECT id, '😔 Challenging relationships (1-2/10)', 1, 4 FROM "HS_questions" WHERE order_index = 20;

-- Question 21: Friend Squad
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🎉 Amazing support system (8-10/10)', 4, 1 FROM "HS_questions" WHERE order_index = 21
UNION ALL
SELECT id, '🤗 Solid friendships (5-7/10)', 3, 2 FROM "HS_questions" WHERE order_index = 21
UNION ALL
SELECT id, '😕 Few but okay friends (3-4/10)', 2, 3 FROM "HS_questions" WHERE order_index = 21
UNION ALL
SELECT id, '😞 Struggling with friendships (1-2/10)', 1, 4 FROM "HS_questions" WHERE order_index = 21;

-- Question 22: Universal Connection
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '✨ Strong spiritual practice & purpose', 4, 1 FROM "HS_questions" WHERE order_index = 22
UNION ALL
SELECT id, '🙏 Sometimes feel connected', 3, 2 FROM "HS_questions" WHERE order_index = 22
UNION ALL
SELECT id, '🤷‍♀️ Questioning/exploring', 2, 3 FROM "HS_questions" WHERE order_index = 22
UNION ALL
SELECT id, '🌀 Feeling pretty lost lately', 1, 4 FROM "HS_questions" WHERE order_index = 22;

-- Question 23: Life Simplicity Score
INSERT INTO "HS_question_options" (question_id, label, value, order_index)
SELECT id, '🧘‍♀️ 8-10 (Marie Kondo would be proud)', 4, 1 FROM "HS_questions" WHERE order_index = 23
UNION ALL
SELECT id, '😌 6-7 (Pretty streamlined)', 3, 2 FROM "HS_questions" WHERE order_index = 23
UNION ALL
SELECT id, '😅 4-5 (Moderately chaotic)', 2, 3 FROM "HS_questions" WHERE order_index = 23
UNION ALL
SELECT id, '🌪️ 1-3 (Life is a beautiful disaster)', 1, 4 FROM "HS_questions" WHERE order_index = 23;