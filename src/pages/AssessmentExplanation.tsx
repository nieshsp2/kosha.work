import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { guestUserService } from '@/services/guestUserService';
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
  Zap
} from 'lucide-react';

const AssessmentExplanation = () => {
  const navigate = useNavigate();

  // Add debugging to see if component is rendering
  console.log('AssessmentExplanation component rendering...');
  console.log('guestUserService available:', !!guestUserService);
  console.log('guestUserService methods:', Object.keys(guestUserService));
  console.log('navigate function available:', !!navigate);

  const assessmentSteps = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: "Health Assessment",
      description: "Evaluate your physical wellbeing including nutrition, exercise, sleep, and more",
      duration: "5-7 minutes",
      questions: 9,
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-amber-600" />,
      title: "Wealth Assessment", 
      description: "Assess your financial wellness, work satisfaction, and creative fulfillment",
      duration: "4-6 minutes",
      questions: 6,
      color: "bg-amber-50 border-amber-200"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Relationships Assessment",
      description: "Explore your social connections, emotional wellbeing, and spiritual purpose",
      duration: "4-6 minutes", 
      questions: 8,
      color: "bg-green-50 border-green-200"
    }
  ];

  const benefits = [
    {
      icon: <Target className="h-5 w-5 text-primary" />,
      title: "Personalized Insights",
      description: "Get detailed breakdown of your wellness across all dimensions"
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
      title: "AI-Powered Recommendations",
      description: "Receive tailored suggestions based on behavioral science principles"
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Privacy Protected",
      description: "Your data is secure and used only to improve your experience"
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Actionable Steps",
      description: "Transform insights into practical daily habits and changes"
    }
  ];

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

  const handleGoBack = () => {
    console.log('🔙 Back button clicked!');
    navigate('/user-info');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Wellness Assessment Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your holistic wellness score across health, wealth, and relationships. 
            This comprehensive assessment will help you understand where you are and guide you toward where you want to be.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Profile Complete</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Assessment Overview</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-xs font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-gray-500">Questions</span>
            </div>
          </div>
          <Progress value={66} className="w-full max-w-md mx-auto" />
        </div>

        {/* Assessment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {assessmentSteps.map((step, index) => (
            <Card key={index} className={`${step.color} border-2`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-3">
                  {step.icon}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-gray-700">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{step.questions} questions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You'll Get */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Get</CardTitle>
            <CardDescription>
              Your comprehensive wellness report includes detailed insights and actionable recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Estimate */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Total Time Estimate</h3>
            </div>
            <p className="text-gray-600 mb-4">
              The complete assessment takes approximately <span className="font-semibold text-blue-600">15-20 minutes</span> to complete.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>23 questions total</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>One question per page</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Easy dropdown selection</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Test button to verify button functionality */}
          <Button
            onClick={() => {
              console.log('🧪 Test button clicked!');
              alert('Test button is working!');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
          >
            🧪 Test Button
          </Button>
          
          {/* Simple navigation test button */}
          <Button
            onClick={() => {
              console.log('🧪 Simple navigation test clicked!');
              navigate('/assessment/question/1');
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2"
          >
            🧪 Simple Nav Test
          </Button>
          
          {/* Test navigation to home route */}
          <Button
            onClick={() => {
              console.log('🧪 Home navigation test clicked!');
              navigate('/');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
          >
            🧪 Home Nav Test
          </Button>
          
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="px-8 py-3 text-lg border-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </Button>
          
          <Button
            onClick={handleStartAssessment}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="start-assessment-button"
            onMouseEnter={() => console.log('Mouse entered Start Assessment button')}
            onMouseLeave={() => console.log('Mouse left Start Assessment button')}
          >
            Start Assessment
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            💡 <strong>Tip:</strong> Find a quiet place where you can focus. Answer honestly - there are no right or wrong answers!
          </p>
        </div>
      </div>
    </main>
  );
};

export default AssessmentExplanation;
