import { GoogleGenerativeAI } from '@google/generative-ai';
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
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('✅ Gemini API initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Gemini API:', error);
      }
    } else {
      console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment variables');
    }
  }

  async generateRecommendations(
    scores: ScoreBreakdown,
    userProfile: UserProfile,
    responses: any[]
  ): Promise<Recommendation[]> {
    if (!this.model) {
      console.log('🔄 Gemini API not available, falling back to rule-based recommendations');
      return this.generateFallbackRecommendations(scores);
    }

    try {
      console.log('🤖 Generating AI recommendations with Gemini...');
      
      const prompt = this.buildRecommendationPrompt(scores, userProfile, responses);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('📝 Gemini response received:', text);
      
      // Parse the Gemini response
      const recommendations = this.parseGeminiResponse(text);
      
      if (recommendations.length > 0) {
        console.log('✅ Successfully parsed Gemini recommendations:', recommendations);
        return recommendations;
      } else {
        console.log('⚠️ Failed to parse Gemini response, using fallback');
        return this.generateFallbackRecommendations(scores);
      }
      
    } catch (error) {
      console.error('❌ Error generating AI recommendations with Gemini:', error);
      
      // Check for specific error types and provide helpful feedback
      if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID')) {
          console.error('🔑 Invalid Gemini API key - check your VITE_GEMINI_API_KEY');
        } else if (error.message.includes('QUOTA_EXCEEDED')) {
          console.error('💰 Quota exceeded - API usage limit reached');
        } else if (error.message.includes('MODEL_NOT_FOUND')) {
          console.error('🚫 Model not found - check model name');
        } else {
          console.error('❓ Unknown Gemini API error:', error.message);
        }
      }
      
      console.log('🔄 Falling back to rule-based recommendations due to error');
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
        id: 'general-wellness',
        title: 'Start Your Wellness Journey',
        description: 'Begin with small, manageable changes to build momentum and improve your overall wellness score',
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

  /**
   * Test different OpenAI models to find one that works
   */
  async testAvailableModels(): Promise<{ available: string[]; error?: string }> {
    if (!this.genAI) {
      return { available: [], error: 'Gemini client not initialized' };
    }

    const modelsToTest = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro',
      'gemini-pro'
    ];

    const available: string[] = [];

    for (const modelName of modelsToTest) {
      try {
        console.log(`🧪 Testing Gemini model: ${modelName}`);
        const model = this.genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        
        if (response.text()) {
          available.push(modelName);
          console.log(`✅ Gemini model ${modelName} is available`);
        }
      } catch (error) {
        console.log(`❌ Gemini model ${modelName} failed:`, error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    return { available };
  }

  /**
   * Get the best available model for recommendations
   */
  private getBestAvailableModel(): string {
    // Priority order for models
    const modelPriority = [
      'gpt-5',
      'gpt-5-mini',
      'gpt-4o',
      'gpt-4o-mini', 
      'gpt-4-turbo-preview',
      'gpt-4',
      'gpt-3.5-turbo-16k',
      'gpt-3.5-turbo'
    ];

    // For now, return gpt-3.5-turbo as it's most widely available
    return 'gpt-3.5-turbo';
  }

  private buildRecommendationPrompt(
    scores: ScoreBreakdown,
    userProfile: UserProfile,
    responses: any[]
  ): string {
    return `You are a wellness and life optimization expert. Based on the following assessment results, generate personalized recommendations for the user.

ASSESSMENT SCORES:
- Overall Score: ${scores.overall.total}/${scores.overall.max} (${scores.overall.percentage}%) - Grade: ${scores.overall.grade}
- Health: ${scores.health.total}/4.0 (${scores.health.percentage}%)
- Wealth: ${scores.wealth.total}/3.0 (${scores.wealth.percentage}%)
- Relationships: ${scores.relationships.total}/3.0 (${scores.relationships.percentage}%)

USER PROFILE:
- Age: ${userProfile.age || 'Not specified'}
- Occupation: ${userProfile.occupation || 'Not specified'}
- Gender: ${userProfile.gender || 'Not specified'}
- Location: ${userProfile.location || 'Not specified'}
- Personality: ${userProfile.personalityType || 'Not specified'}
- Cultural Values: ${userProfile.culturalValues?.join(', ') || 'Not specified'}
- Lifestyle Constraints: ${userProfile.lifestyleConstraints?.join(', ') || 'Not specified'}

Generate 6 personalized recommendations in the following JSON format:
[
  {
    "title": "Short, actionable title",
    "description": "Detailed explanation of the recommendation",
    "category": "health|wealth|relationships",
    "priority": "high|medium|low",
    "actionableSteps": ["Step 1", "Step 2", "Step 3"],
    "estimatedTime": "5-10 minutes daily",
    "difficulty": "beginner|intermediate|advanced",
    "nudgeType": "micro-habit|macro-change|strategic-planning"
  }
]

Focus on practical, actionable advice that addresses the user's specific scores and profile. Prioritize recommendations that will have the most impact on their overall wellness score.`;
  }

  private parseGeminiResponse(text: string): Recommendation[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const recommendations = JSON.parse(jsonStr);
        
        // Validate the structure
        if (Array.isArray(recommendations) && recommendations.length > 0) {
          return recommendations.map(rec => ({
            title: rec.title || 'Personalized Recommendation',
            description: rec.description || 'Based on your assessment results',
            category: rec.category || 'health',
            priority: rec.priority || 'medium',
            actionableSteps: Array.isArray(rec.actionableSteps) ? rec.actionableSteps : ['Take action based on this recommendation'],
            estimatedTime: rec.estimatedTime || 'Varies',
            difficulty: rec.difficulty || 'beginner',
            nudgeType: rec.nudgeType || 'micro-habit'
          }));
        }
      }
      
      // If JSON parsing fails, try to extract structured information
      console.log('⚠️ JSON parsing failed, attempting to extract structured information');
      return this.extractStructuredRecommendations(text);
      
    } catch (error) {
      console.error('❌ Failed to parse Gemini response:', error);
      return [];
    }
  }

  private extractStructuredRecommendations(text: string): Recommendation[] {
    // Fallback: create basic recommendations based on the text
    const recommendations: Recommendation[] = [];
    
    // Extract any clear recommendations from the text
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    let currentRec: Partial<Recommendation> = {};
    
    for (const line of lines) {
      if (line.includes('Title:') || line.includes('Recommendation:')) {
        if (currentRec.title) {
          recommendations.push(this.completeRecommendation(currentRec));
        }
        currentRec = { title: line.split(':')[1]?.trim() || 'Personalized Recommendation' };
      } else if (line.includes('Description:') || line.includes('Details:')) {
        currentRec.description = line.split(':')[1]?.trim() || 'Based on your assessment results';
      } else if (line.includes('Category:') || line.includes('Type:')) {
        const category = line.split(':')[1]?.trim().toLowerCase() || 'health';
        currentRec.category = (['health', 'wealth', 'relationships'].includes(category) ? category : 'health') as 'health' | 'wealth' | 'relationships';
      } else if (line.includes('Priority:') || line.includes('Importance:')) {
        const priority = line.split(':')[1]?.trim().toLowerCase() || 'medium';
        currentRec.priority = (['high', 'medium', 'low'].includes(priority) ? priority : 'medium') as 'high' | 'medium' | 'low';
      }
    }
    
    // Add the last recommendation if it exists
    if (currentRec.title) {
      recommendations.push(this.completeRecommendation(currentRec));
    }
    
    // If we still don't have recommendations, create some basic ones
    if (recommendations.length === 0) {
      return this.generateFallbackRecommendations({
        health: { 
          total: 0, 
          max: 4, 
          percentage: 0, 
          components: {
            nutrition: 0,
            digestion: 0,
            exercise: 0,
            water: 0,
            sunlight: 0,
            sleep: 0,
            outdoorAir: 0,
            oralCare: 0,
            skinCare: 0
          }
        },
        wealth: { 
          total: 0, 
          max: 3, 
          percentage: 0, 
          components: {
            quality: 0,
            quantity: 0,
            diversity: 0,
            workplace: 0,
            creativity: 0,
            restRelaxation: 0
          }
        },
        relationships: { 
          total: 0, 
          max: 3, 
          percentage: 0, 
          components: {
            mentalWellbeing: 0,
            emotionalWellbeing: 0,
            partner: 0,
            parents: 0,
            children: 0,
            relatives: 0,
            friends: 0,
            universalOneness: 0
          }
        },
        overall: { total: 0, max: 10, percentage: 0, grade: 'F', level: 'Beginner' }
      });
    }
    
    return recommendations;
  }

  private completeRecommendation(partial: Partial<Recommendation>): Recommendation {
    return {
      title: partial.title || 'Personalized Recommendation',
      description: partial.description || 'Based on your assessment results',
      category: partial.category || 'health',
      priority: partial.priority || 'medium',
      actionableSteps: partial.actionableSteps || ['Take action based on this recommendation'],
      estimatedTime: partial.estimatedTime || 'Varies',
      difficulty: partial.difficulty || 'beginner',
      nudgeType: partial.nudgeType || 'micro-habit'
    };
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
        description: 'Focus on building healthy habits in nutrition, exercise, and sleep to improve your overall wellness score.',
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
    
    // Always add at least one general recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Start Your Wellness Journey',
        description: 'Begin with small, manageable changes to build momentum and improve your overall wellness score.',
        category: 'health',
        priority: 'medium',
        actionableSteps: [
          'Choose one area to focus on this week',
          'Set a specific, measurable goal',
          'Track your progress daily'
        ],
        estimatedTime: '5-10 minutes daily',
        difficulty: 'beginner',
        nudgeType: 'micro-habit'
      });
    }
    
    console.log(`✅ Generated ${recommendations.length} fallback recommendations`);
    return recommendations;
  }
}

export const recommendationService = new RecommendationService();
