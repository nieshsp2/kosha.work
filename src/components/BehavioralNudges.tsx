import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Target, Users, TrendingUp, CheckCircle, AlertCircle, Heart, DollarSign } from 'lucide-react';

export interface BehavioralNudge {
  id: string;
  category: 'health' | 'wealth' | 'relationships';
  type: 'micro-habit' | 'macro-change' | 'strategic-planning';
  title: string;
  description: string;
  action: string;
  estimatedTime: string;
  behavioralPrinciple: 'loss-aversion' | 'social-proof' | 'commitment-device' | 'fresh-start';
  socialProof?: string;
  commitmentDevice?: string;
  freshStartTrigger?: string;
}

interface BehavioralNudgesProps {
  nudges: BehavioralNudge[];
  onNudgeComplete?: (nudgeId: string) => void;
}

const BehavioralNudges: React.FC<BehavioralNudgesProps> = ({ nudges, onNudgeComplete }) => {
  const [completedNudges, setCompletedNudges] = useState<Set<string>>(new Set());

  const handleNudgeComplete = (nudgeId: string) => {
    setCompletedNudges(prev => new Set([...prev, nudgeId]));
    onNudgeComplete?.(nudgeId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'wealth': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'relationships': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'micro-habit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'macro-change': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'strategic-planning': return 'bg-pink-100 text-pink-800 border-pink-200';
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

  const getPrincipleLabel = (principle: string) => {
    switch (principle) {
      case 'loss-aversion': return 'Loss Aversion';
      case 'social-proof': return 'Social Proof';
      case 'commitment-device': return 'Commitment Device';
      case 'fresh-start': return 'Fresh Start Effect';
      default: return principle;
    }
  };

  if (nudges.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-600">
            🎯 Fallback Recommendations
          </CardTitle>
          <CardDescription className="text-center">
            AI recommendations are not available. Here are some general wellness tips to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-800">Health & Wellness</h4>
              <p className="text-sm text-green-600 mt-1">Focus on nutrition, exercise, and sleep</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-blue-800">Wealth & Growth</h4>
              <p className="text-sm text-blue-600 mt-1">Develop skills and create value</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-purple-800">Relationships</h4>
              <p className="text-sm text-purple-600 mt-1">Build meaningful connections</p>
            </div>
          </div>
                              <p className="text-sm text-gray-500 mt-4">
                      Complete the assessment to receive personalized Gemini AI-powered recommendations.
                    </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI-Powered Behavioral Nudging
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Awareness without action is just expensive self-knowledge. Our AI transforms insights into sustainable behavioral change.
        </p>
      </div>

      {/* Behavioral Economics Principles */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center mb-4">
            The Science of Nudging
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-sm font-medium text-red-800">Loss Aversion</p>
              <p className="text-xs text-gray-600">Avoiding losses</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-blue-800">Social Proof</p>
              <p className="text-xs text-gray-600">Community success</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-800">Commitment</p>
              <p className="text-xs text-gray-600">Binding promises</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-purple-800">Fresh Start</p>
              <p className="text-xs text-gray-600">New beginnings</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Nudges by Category */}
      {['health', 'wealth', 'relationships'].map(category => {
        const categoryNudges = nudges.filter(nudge => nudge.category === category);
        if (categoryNudges.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold text-center capitalize mb-6">
              {category} Nudges
            </h3>
            
            <div className="grid gap-4 max-w-4xl mx-auto">
              {categoryNudges.map(nudge => {
                const isCompleted = completedNudges.has(nudge.id);
                
                return (
                  <Card 
                    key={nudge.id} 
                    className={`transition-all duration-300 hover:shadow-lg ${
                      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getCategoryColor(nudge.category)}>
                              {nudge.category}
                            </Badge>
                            <Badge className={getTypeColor(nudge.type)}>
                              {nudge.type.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPrincipleColor(nudge.behavioralPrinciple)}>
                              <div className="flex items-center gap-1">
                                {getPrincipleIcon(nudge.behavioralPrinciple)}
                                {getPrincipleLabel(nudge.behavioralPrinciple)}
                              </div>
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-semibold mb-2">
                            {nudge.title}
                          </CardTitle>
                          <CardDescription className="text-gray-600 mb-3">
                            {nudge.description}
                          </CardDescription>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Action Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                          <h4 className="font-semibold text-blue-800 mb-2">Action Required:</h4>
                          <p className="text-blue-700 font-medium">{nudge.action}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                            <Clock className="w-4 h-4" />
                            {nudge.estimatedTime}
                          </div>
                        </div>

                        {/* Behavioral Economics Elements */}
                        <div className="grid md:grid-cols-3 gap-3">
                          {nudge.socialProof && (
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                              <h5 className="font-medium text-green-800 text-sm mb-1">Social Proof</h5>
                              <p className="text-green-700 text-xs">{nudge.socialProof}</p>
                            </div>
                          )}
                          
                          {nudge.commitmentDevice && (
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <h5 className="font-medium text-blue-800 text-sm mb-1">Commitment Device</h5>
                              <p className="text-blue-700 text-xs">{nudge.commitmentDevice}</p>
                            </div>
                          )}
                          
                          {nudge.freshStartTrigger && (
                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                              <h5 className="font-medium text-purple-800 text-sm mb-1">Fresh Start Trigger</h5>
                              <p className="text-purple-700 text-xs">{nudge.freshStartTrigger}</p>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        {!isCompleted ? (
                          <Button 
                            onClick={() => handleNudgeComplete(nudge.id)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                          >
                            Mark as Completed
                          </Button>
                        ) : (
                          <div className="text-center py-2">
                            <span className="text-green-600 font-medium">✅ Completed!</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BehavioralNudges;
