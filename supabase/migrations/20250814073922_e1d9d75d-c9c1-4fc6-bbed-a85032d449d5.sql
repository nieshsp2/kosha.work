-- Update existing questions to separate fun facts from actual questions
-- Question 1: Nutrition Rainbow Check
UPDATE "HS_questions" SET 
  description = 'Fun fact: Your gut has more bacteria than your body has cells - let''s keep those little friends happy!',
  question_text = 'How many different colored whole foods do you eat weekly?'
WHERE order_index = 1;

-- Question 2: Gut Health Reality Check  
UPDATE "HS_questions" SET 
  description = 'Bristol Stool Chart - yes, we''re going there! Your poop is basically your gut''s report card.',
  question_text = 'What''s your usual bathroom situation?'
WHERE order_index = 2;

-- Question 3: Move It or Lose It
UPDATE "HS_questions" SET 
  description = 'Your ancestors walked 20+ miles daily. Now we celebrate 10,000 steps!',
  question_text = 'Weekly exercise reality:'
WHERE order_index = 3;

-- Question 4: Hydration Station
UPDATE "HS_questions" SET 
  description = 'Your brain is 75% water - dehydration literally makes you less smart!',
  question_text = 'Daily water intake + quality awareness:'
WHERE order_index = 4;

-- Question 5: Sunshine Vitamin
UPDATE "HS_questions" SET 
  description = 'Vitamin D deficiency affects 1 billion people globally - don''t be a statistic!',
  question_text = 'Weekly sun exposure (without sunscreen for 10-20 min):'
WHERE order_index = 5;

-- Question 6: Sleep Like a Baby
UPDATE "HS_questions" SET 
  description = 'Fun fact: Sleep cleans your brain literally - like a dishwasher for your neurons!',
  question_text = 'Average nightly sleep + quality:'
WHERE order_index = 6;

-- Question 7: Fresh Air Enthusiast
UPDATE "HS_questions" SET 
  description = 'Indoor air can be 5x more polluted than outdoor air. Step outside!',
  question_text = 'Weekly outdoor time in nature:'
WHERE order_index = 7;

-- Question 8: Breathe Like You Mean It
UPDATE "HS_questions" SET 
  description = 'Most people use only 30% of their lung capacity - you''re missing out!',
  question_text = 'Breathing practices:'
WHERE order_index = 8;

-- Question 9: Oral Care Superstar
UPDATE "HS_questions" SET 
  description = 'Your mouth is the gateway to your body - 90% of diseases show oral symptoms first!',
  question_text = 'Oral hygiene routine:'
WHERE order_index = 9;

-- Question 10: Money Mindset
UPDATE "HS_questions" SET 
  description = 'Your relationship with money affects every financial decision you make!',
  question_text = 'When you think about money, you feel:'
WHERE order_index = 10;

-- Question 11: Financial Safety Net
UPDATE "HS_questions" SET 
  description = 'Financial stress literally rewires your brain for anxiety!',
  question_text = 'Emergency fund reality:'
WHERE order_index = 11;

-- Question 12: Income Diversity
UPDATE "HS_questions" SET 
  description = 'The average millionaire has 7 income streams. How''s your portfolio?',
  question_text = 'Number of income sources:'
WHERE order_index = 12;

-- Question 13: Workplace Vibes
UPDATE "HS_questions" SET 
  description = 'You spend 1/3 of your life working - better make it count!',
  question_text = 'At work, I feel:'
WHERE order_index = 13;

-- Question 14: Creative Flow
UPDATE "HS_questions" SET 
  description = 'Creativity isn''t just for artists - it''s brain food for everyone!',
  question_text = 'Weekly creative time:'
WHERE order_index = 14;

-- Question 15: Rest & Recharge
UPDATE "HS_questions" SET 
  description = 'Doing nothing is actually doing something - it''s called restoration!',
  question_text = 'Weekly "doing absolutely nothing" time:'
WHERE order_index = 15;

-- Question 16: Self-Relationship Status
UPDATE "HS_questions" SET 
  description = 'The most important relationship you''ll ever have!',
  question_text = 'Your inner dialogue is mostly:'
WHERE order_index = 16;

-- Question 17: Judgment Detox
UPDATE "HS_questions" SET 
  description = 'Holding onto judgments is like drinking poison and expecting others to suffer!',
  question_text = 'Labels and judgments about others/yourself:'
WHERE order_index = 17;

-- Question 18: Identity Check
UPDATE "HS_questions" SET 
  description = 'You are not your thoughts, emotions, or even your body - you''re the observer!',
  question_text = 'I primarily identify as:'
WHERE order_index = 18;

-- Question 19: Partner Relationship
UPDATE "HS_questions" SET 
  description = 'Romantic relationships can either multiply your joy or divide your peace!',
  question_text = 'If you have a partner, your relationship feels:'
WHERE order_index = 19;

-- Question 20: Family Foundation
UPDATE "HS_questions" SET 
  description = 'Family relationships shape our attachment patterns for life!',
  question_text = 'Overall family relationships (parents, siblings, relatives):'
WHERE order_index = 20;

-- Question 21: Friend Squad
UPDATE "HS_questions" SET 
  description = 'Good friends are like good wine - they get better with time and help you forget your troubles!',
  question_text = 'Friend relationships:'
WHERE order_index = 21;

-- Question 22: Universal Connection
UPDATE "HS_questions" SET 
  description = 'Feeling connected to something bigger than yourself is linked to better mental health!',
  question_text = 'Sense of spiritual connection/purpose:'
WHERE order_index = 22;

-- Question 23: Life Simplicity Score
UPDATE "HS_questions" SET 
  description = 'Complexity is the enemy of execution - how simple is your beautiful life?',
  question_text = 'Overall life simplicity (1-10, where 10 = blissfully simple):'
WHERE order_index = 23;