import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { guestUserService } from '@/services/guestUserService';
import KoshaLogo from '@/components/KoshaLogo';
import { 
  Brain, 
  Heart, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Shield,
  Zap,
  Sparkles,
  Trophy
} from 'lucide-react';

const AssessmentExplanation = () => {
  const navigate = useNavigate();

  // Add debugging to see if component is rendering
  console.log('AssessmentExplanation component rendering...');
  console.log('guestUserService available:', !!guestUserService);
  console.log('guestUserService methods:', Object.keys(guestUserService));
  console.log('navigate function available:', !!navigate);

  const handleStartAssessment = async () => {
    console.log('🎯 Start Assessment button clicked!');
    try {
      // Create a new assessment before starting
      console.log('Creating assessment before starting...');
      
      // Check if guestUserService is available
      if (!guestUserService) {
        console.error('guestUserService is not available!');
        alert('Service not available - navigating anyway');
        navigate('/assessment/question/1');
        return;
      }
      
      const assessment = await guestUserService.createAssessment();
      console.log('Assessment created successfully:', assessment);
      
      // Navigate to the first question
      console.log('Navigating to first question...');
      navigate('/assessment/question/1');
    } catch (error) {
      console.error('Error creating assessment:', error);
      // Still navigate even if assessment creation fails
      console.log('Assessment creation failed, but still navigating...');
      navigate('/assessment/question/1');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <div className="mb-8 text-center">
          <KoshaLogo size="lg" />
        </div>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
          <CardHeader className="text-center relative pb-8">
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <CardTitle className="text-3xl mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Ready for Your Holistic Wellbeing Journey?
            </CardTitle>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Take a moment to settle in. This isn't just another quiz—it's a mindful exploration of your Health, Wealth, and Relationships.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Time Investment
              </h3>
              <p className="text-sm text-muted-foreground">
                Please spare at least <strong>5 uninterrupted minutes</strong>. Find a quiet space, maybe grab a warm beverage, and let's dive deep into your wellbeing landscape.
              </p>
            </div>
            <div className="grid gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">💝</span>
                <div>
                  <strong>Be honest:</strong> This is your safe space for authentic self-reflection
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🌱</span>
                <div>
                  <strong>Be curious:</strong> Approach each question with gentle curiosity, not judgment
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div>
                  <strong>Be present:</strong> Your future self will thank you for this moment of awareness
                </div>
              </div>
            </div>
            <Button 
              onClick={handleStartAssessment} 
              size="lg" 
              className="w-full bg-gradient-hero hover:opacity-90"
            >
              I'm Ready - Let's Begin ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentExplanation;
