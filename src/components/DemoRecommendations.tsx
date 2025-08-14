import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Target, Users, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

interface DemoRecommendation {
  id: string;
  category: 'health' | 'wealth' | 'relationships';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionableSteps: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nudgeType: 'micro-habit' | 'macro-change' | 'strategic-planning';
  behavioralPrinciple: 'loss-aversion' | 'social-proof' | 'commitment-device' | 'fresh-start';
}

const DemoRecommendations: React.FC = () => {
  const demoRecommendations: DemoRecommendation[] = [
    {
      id: 'health-nutrition-1',
      category: 'health',
      priority: 'high',
      title: 'Optimize Your Daily Nutrition',
      description: 'Based on your nutrition score, focus on improving food quality and variety to avoid health decline and boost energy levels.',
      actionableSteps: [
        'Add 2-3 different colored vegetables to each meal',
        'Replace processed snacks with fruits, nuts, or seeds',
        'Plan your meals 1-2 days in advance',
        'Drink 8 glasses of water daily'
      ],
      estimatedTime: '15-20 minutes daily',
      difficulty: 'beginner',
      nudgeType: 'macro-change',
      behavioralPrinciple: 'loss-aversion'
    },
    {
      id: 'health-exercise-1',
      category: 'health',
      priority: 'medium',
      title: 'Build Consistent Exercise Habits',
      description: 'Your exercise score indicates room for improvement. Start with micro-habits that build momentum.',
      actionableSteps: [
        'Do 10 push-ups every morning',
        'Take a 10-minute walk after meals',
        'Use stairs instead of elevators',
        'Schedule 3 workout sessions per week'
      ],
      estimatedTime: '20-30 minutes daily',
      difficulty: 'beginner',
      nudgeType: 'micro-habit',
      behavioralPrinciple: 'fresh-start'
    },
    {
      id: 'wealth-financial-1',
      category: 'wealth',
      priority: 'high',
      title: 'Strengthen Your Financial Foundation',
      description: 'Your financial scores suggest focusing on building security and multiple income streams.',
      actionableSteps: [
        'Set aside 10% of income for emergency fund',
        'Create a monthly budget and track expenses',
        'Research 2-3 additional income sources',
        'Review and optimize your spending habits'
      ],
      estimatedTime: '2-3 hours weekly',
      difficulty: 'intermediate',
      nudgeType: 'strategic-planning',
      behavioralPrinciple: 'commitment-device'
    },
    {
      id: 'relationships-connection-1',
      category: 'relationships',
      priority: 'medium',
      title: 'Deepen Your Social Connections',
      description: 'Focus on quality relationships and meaningful interactions to improve your social wellbeing.',
      actionableSteps: [
        'Schedule weekly calls with family members',
        'Join a community group or hobby club',
        'Practice active listening in conversations',
        'Plan monthly social activities with friends'
      ],
      estimatedTime: '1-2 hours weekly',
      difficulty: 'beginner',
      nudgeType: 'macro-change',
      behavioralPrinciple: 'social-proof'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'wealth': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'relationships': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrincipleIcon = (principle: string) => {
    switch (principle) {
      case 'loss-aversion': return <AlertCircle className="w-4 h-4" />;
      case 'social-proof': return <Users className="w-4 h-4" />;
      case 'commitment-device': return <Target className="w-4 h-4" />;
      case 'fresh-start': return <TrendingUp className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getPrincipleColor = (principle: string) => {
    switch (principle) {
      case 'loss-aversion': return 'bg-red-100 text-red-800 border-red-200';
      case 'social-proof': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'commitment-device': return 'bg-green-100 text-green-800 border-green-200';
      case 'fresh-start': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Recommendations
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          This is a demo of how AI would analyze your scores and generate personalized recommendations. 
          In production, these would be dynamically generated using OpenAI GPT-4.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> To enable real AI recommendations, add your OpenAI API key to the environment variables.
            See <code className="bg-blue-100 px-2 py-1 rounded">AI_SETUP.md</code> for setup instructions.
          </p>
        </div>
      </div>

      {/* Recommendations by Category */}
      {['health', 'wealth', 'relationships'].map(category => {
        const categoryRecommendations = demoRecommendations.filter(rec => rec.category === category);
        if (categoryRecommendations.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold text-center capitalize mb-6">
              {category} Recommendations
            </h3>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {categoryRecommendations.map(recommendation => (
                <Card 
                  key={recommendation.id} 
                  className="transition-all duration-300 hover:shadow-lg border-0 bg-white/95 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge className={getCategoryColor(recommendation.category)}>
                            {recommendation.category}
                          </Badge>
                          <Badge className={getPriorityColor(recommendation.priority)}>
                            {recommendation.priority} Priority
                          </Badge>
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                            {recommendation.difficulty}
                          </Badge>
                          <Badge className={getPrincipleColor(recommendation.behavioralPrinciple)}>
                            <div className="flex items-center gap-1">
                              {getPrincipleIcon(recommendation.behavioralPrinciple)}
                              {recommendation.behavioralPrinciple.replace('-', ' ')}
                            </div>
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-semibold mb-2">
                          {recommendation.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-3 text-base">
                          {recommendation.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Actionable Steps */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-blue-800 mb-3">Actionable Steps:</h4>
                        <ol className="space-y-2">
                          {recommendation.actionableSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-700">
                              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                        <div className="flex items-center gap-2 mt-3 text-sm text-blue-600">
                          <Clock className="w-4 h-4" />
                          {recommendation.estimatedTime}
                        </div>
                      </div>

                      {/* Behavioral Economics Context */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2">Why This Works:</h4>
                        <p className="text-green-700 text-sm">
                          This recommendation uses <strong>{recommendation.behavioralPrinciple.replace('-', ' ')}</strong> principles 
                          to help you make sustainable changes. The {recommendation.nudgeType.replace('-', ' ')} approach 
                          makes it easier to build lasting habits.
                        </p>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                      >
                        Start This Recommendation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DemoRecommendations;
