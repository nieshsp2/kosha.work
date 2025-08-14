import { supabase } from '@/integrations/supabase/client';

// Types moved locally
export interface AssessmentScoreData {
  assessment_id: string;
  total_questions_answered: number;
  overall_total_score: number;
  overall_max_score: number;
  // Add other fields as needed
}

export interface ScoreBreakdown {
  health: {
    total: number;
    max: number;
    percentage: number;
    components: {
      nutrition: number;
      digestion: number;
      exercise: number;
      water: number;
      sunlight: number;
      sleep: number;
      outdoorAir: number;
      oralCare: number;
      skinCare: number;
    };
  };
  wealth: {
    total: number;
    max: number;
    percentage: number;
    components: {
      quality: number;
      quantity: number;
      diversity: number;
      workplace: number;
      creativity: number;
      restRelaxation: number;
    };
  };
  relationships: {
    total: number;
    max: number;
    percentage: number;
    components: {
      mentalWellbeing: number;
      emotionalWellbeing: number;
      partner: number;
      parents: number;
      children: number;
      relatives: number;
      friends: number;
      universalOneness: number;
    };
  };
  overall: {
    total: number;
    max: number;
    percentage: number;
    grade: string;
    level?: string;
  };
}

// Types for recommendations
export interface Recommendation {
  title: string;
  description: string;
  category: 'health' | 'wealth' | 'relationships';
  priority: 'high' | 'medium' | 'low';
  actionableSteps: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nudgeType: 'micro-habit' | 'macro-change' | 'strategic-planning';
  behavioralPrinciple?: string;
}

export interface BehavioralNudge {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'wealth' | 'relationships';
  priority: 'high' | 'medium' | 'low';
  actionableSteps: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nudgeType: 'micro-habit' | 'macro-change' | 'strategic-planning';
  behavioralPrinciple: string;
  type: 'micro-habit' | 'macro-change' | 'strategic-planning'; // Add this property
}

export interface UserProfile {
  age?: number;
  occupation?: string;
  gender?: string;
  location?: string;
  personalityType?: 'introvert' | 'extrovert' | 'ambivert';
  culturalValues?: string[];
  lifestyleConstraints?: string[];
}

export class RecommendationService {
  constructor() {
    // API calls now handled through Supabase edge functions
    console.log('✅ RecommendationService initialized (using edge functions)');
  }

  async generateRecommendations(
    scores: ScoreBreakdown,
    userProfile: UserProfile,
    responses: any[]
  ): Promise<Recommendation[]> {
    try {
      console.log('🤖 Calling edge function for AI recommendations...');
      
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: {
          scores,
          userProfile,
          responses
        }
      });

      if (error) {
        console.error('❌ Edge function error:', error);
        return this.generateFallbackRecommendations(scores);
      }

      if (data?.recommendations && Array.isArray(data.recommendations)) {
        console.log(`✅ Received ${data.recommendations.length} AI recommendations`);
        // Limit to exactly 3 recommendations
        const limitedRecommendations = data.recommendations.slice(0, 3);
        console.log(`📊 Limited to ${limitedRecommendations.length} recommendations`);
        return limitedRecommendations;
      } else {
        console.warn('⚠️ No recommendations in response, using fallback');
        return this.generateFallbackRecommendations(scores);
      }
      
    } catch (error) {
      console.error('❌ Error calling recommendations edge function:', error);
      return this.generateFallbackRecommendations(scores);
    }
  }

  generateBehavioralNudges(scores: ScoreBreakdown, userProfile: UserProfile): BehavioralNudge[] {
    console.log('🎯 generateBehavioralNudges called with scores:', {
      health: `${scores.health.total}/${scores.health.max} (${scores.health.percentage}%)`,
      wealth: `${scores.wealth.total}/${scores.wealth.max} (${scores.wealth.percentage}%)`,
      relationships: `${scores.relationships.total}/${scores.relationships.max} (${scores.relationships.percentage}%)`
    });
    
    const nudges: BehavioralNudge[] = [];
    
    // Health Nudges
    if (scores.health.total < scores.health.max * 0.7) {
      nudges.push({
        id: 'health-nutrition',
        title: 'Improve Daily Nutrition',
        description: 'Focus on eating a variety of colorful whole foods daily to avoid health decline',
        category: 'health',
        priority: 'high',
        actionableSteps: [
          'Add 2-3 different colored vegetables to each meal',
          'Replace processed snacks with fruits or nuts',
          'Drink 8 glasses of water daily'
        ],
        estimatedTime: '10-15 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit',
        behavioralPrinciple: 'loss-aversion',
        type: 'micro-habit'
      });
    }
    
    if (scores.health.total < scores.health.max * 0.5) {
      nudges.push({
        id: 'health-exercise',
        title: 'Start Daily Movement',
        description: 'Begin with simple exercises to build momentum and avoid sedentary lifestyle risks',
        category: 'health',
        priority: 'high',
        actionableSteps: [
          'Start with 5 minutes of stretching',
          'Take a 10-minute walk daily',
          'Use stairs instead of elevator'
        ],
        estimatedTime: '15-20 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit',
        behavioralPrinciple: 'loss-aversion',
        type: 'micro-habit'
      });
    }
    
    // Wealth Nudges
    if (scores.wealth.total < scores.wealth.max * 0.7) {
      nudges.push({
        id: 'wealth-planning',
        title: 'Build Financial Foundation',
        description: 'Start with basic financial planning to avoid future financial stress',
        category: 'wealth',
        priority: 'high',
        actionableSteps: [
          'Set aside 10% of income for savings',
          'Create a monthly budget',
          'Research additional income sources'
        ],
        estimatedTime: '1-2 hours weekly',
        difficulty: 'beginner',
        nudgeType: 'strategic-planning',
        behavioralPrinciple: 'commitment-device',
        type: 'strategic-planning'
      });
    }
    
    if (scores.wealth.total < scores.wealth.max * 0.5) {
      nudges.push({
        id: 'wealth-skills',
        title: 'Develop Marketable Skills',
        description: 'Invest in learning new skills to increase earning potential and career growth',
        category: 'wealth',
        priority: 'medium',
        actionableSteps: [
          'Identify one skill to learn this month',
          'Dedicate 30 minutes daily to learning',
          'Join online courses or workshops'
        ],
        estimatedTime: '30 minutes daily',
        difficulty: 'intermediate',
        nudgeType: 'macro-change',
        behavioralPrinciple: 'commitment-device',
        type: 'macro-change'
      });
    }
    
    // Relationships Nudges
    if (scores.relationships.total < scores.relationships.max * 0.7) {
      nudges.push({
        id: 'relationships-connection',
        title: 'Strengthen Social Bonds',
        description: 'Invest time in building meaningful relationships to avoid social isolation',
        category: 'relationships',
        priority: 'high',
        actionableSteps: [
          'Schedule weekly calls with family/friends',
          'Join a community group or club',
          'Practice active listening in conversations'
        ],
        estimatedTime: '30 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'macro-change',
        behavioralPrinciple: 'social-proof',
        type: 'macro-change'
      });
    }
    
    if (scores.relationships.total < scores.relationships.max * 0.5) {
      nudges.push({
        id: 'relationships-self',
        title: 'Improve Self-Awareness',
        description: 'Work on understanding yourself better to build healthier relationships',
        category: 'relationships',
        priority: 'medium',
        actionableSteps: [
          'Practice daily gratitude journaling',
          'Reflect on your communication style',
          'Identify areas for personal growth'
        ],
        estimatedTime: '15 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit',
        behavioralPrinciple: 'fresh-start',
        type: 'micro-habit'
      });
    }
    
    // Always add at least one general nudge
    if (nudges.length === 0) {
      nudges.push({
        id: 'general-wellbeing',
        title: 'Start Your Wellbeing Journey',
        description: 'Begin with small, manageable changes to build momentum and improve your overall wellbeing score',
        category: 'health',
        priority: 'medium',
        actionableSteps: [
          'Choose one area to focus on this week',
          'Set a specific, measurable goal',
          'Track your progress daily'
        ],
        estimatedTime: '5-10 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit',
        behavioralPrinciple: 'fresh-start',
        type: 'micro-habit'
      });
    }
    
    console.log(`✅ Generated ${nudges.length} behavioral nudges`);
    return nudges;
  }

  private generateFallbackRecommendations(scores: ScoreBreakdown): Recommendation[] {
    console.log('🔄 Generating fallback rule-based recommendations...');
    console.log('📊 Fallback triggered for scores:', {
      health: `${scores.health.total}/${scores.health.max} (${scores.health.percentage}%)`,
      wealth: `${scores.wealth.total}/${scores.wealth.max} (${scores.wealth.percentage}%)`,
      relationships: `${scores.relationships.total}/${scores.relationships.max} (${scores.relationships.percentage}%)`
    });
    
    const recommendations: Recommendation[] = [];
    
    // Health recommendations
    if (scores.health.total < scores.health.max * 0.7) {
      console.log('💚 Adding health fallback recommendation (score below 70%)');
      recommendations.push({
        title: 'Prioritize Health Fundamentals',
        description: 'Focus on building healthy habits in nutrition, exercise, and sleep to improve your overall wellbeing score.',
        category: 'health',
        priority: 'high',
        actionableSteps: [
          'Start with 10 minutes of daily exercise',
          'Add one serving of vegetables to each meal',
          'Establish a consistent sleep schedule'
        ],
        estimatedTime: '15-20 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit'
      });
    }
    
    // Wealth recommendations
    if (scores.wealth.total < scores.wealth.max * 0.7) {
      console.log('💰 Adding wealth fallback recommendation (score below 70%)');
      recommendations.push({
        title: 'Develop Wealth-Building Skills',
        description: 'Focus on improving your work quality, creativity, and finding balance between work and rest.',
        category: 'wealth',
        priority: 'medium',
        actionableSteps: [
          'Identify one skill to improve this week',
          'Schedule dedicated creative time',
          'Plan regular rest periods'
        ],
        estimatedTime: '30 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'strategic-planning'
      });
    }
    
    // Relationships recommendations
    if (scores.relationships.total < scores.relationships.max * 0.7) {
      console.log('❤️ Adding relationships fallback recommendation (score below 70%)');
      recommendations.push({
        title: 'Strengthen Social Connections',
        description: 'Work on improving your mental and emotional wellbeing, and strengthen connections with family and friends.',
        category: 'relationships',
        priority: 'medium',
        actionableSteps: [
          'Practice daily gratitude journaling',
          'Reach out to one friend or family member',
          'Set aside time for self-reflection'
        ],
        estimatedTime: '10-15 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit'
      });
    }
    
    // Limit to exactly 3 recommendations
    const limitedRecommendations = recommendations.slice(0, 3);
    console.log(`✅ Generated ${limitedRecommendations.length} fallback recommendations (limited to 3)`);
    return limitedRecommendations;
  }
}

export const recommendationService = new RecommendationService();