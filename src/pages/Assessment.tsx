import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  DollarSign, 
  Users, 
  Clock, 
  Target, 
  Award, 
  ArrowRight,
  Home,
  Play,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface AssessmentRow {
  id: string;
  user_id: string;
  status: "not_started" | "in_progress" | "completed";
  total_questions: number;
  current_index: number;
}

const Assessment = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<AssessmentRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => { 
    document.title = "Assessment | HS"; 
    
    // Load user profile from localStorage if available
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      try {
        setUserProfile(JSON.parse(profile));
      } catch (error) {
        console.warn('Failed to parse user profile:', error);
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const sb: any = supabase;
      const { data, error } = await sb
        .from("HS_assessments")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) console.warn(error);
      setAssessment(data);
    };
    load();
  }, [user]);

  const progress = useMemo(() => {
    const total = assessment?.total_questions ?? 23;
    const current = assessment?.current_index ?? 0;
    return Math.round((Math.min(current, total) / total) * 100);
  }, [assessment]);

  const handleBegin = async () => {
    if (!user) {
      navigate(`/assessment/question/1`);
      return;
    }
    setBusy(true);
    try {
      const sb: any = supabase;
      let a = assessment;
      if (!a) {
        const { data, error } = await sb
          .from("HS_assessments")
          .insert({ user_id: user.id, status: "in_progress", started_at: new Date().toISOString(), current_index: 0, total_questions: 23 })
          .select("*")
          .single();
        if (error) throw error;
        a = data;
        setAssessment(data);
      } else if (a.status === "not_started") {
        const { data, error } = await sb
          .from("HS_assessments")
          .update({ status: "in_progress", started_at: new Date().toISOString() })
          .eq("id", a.id)
          .select("*")
          .single();
        if (error) throw error;
        a = data;
        setAssessment(data);
      }
      const nextIndex = (a?.current_index ?? 0) + 1;
      navigate(`/assessment/question/${nextIndex}`);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const assessmentCategories = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Physical health, nutrition, exercise, sleep, and overall vitality",
      percentage: "40%",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      icon: DollarSign,
      title: "Wealth & Prosperity",
      description: "Financial stability, career growth, and abundance mindset",
      percentage: "30%",
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Users,
      title: "Relationships & Connection",
      description: "Social bonds, emotional intelligence, and spiritual growth",
      percentage: "30%",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Holistic Wellness Assessment
            </div>
          </div>
          
          {userProfile && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Welcome back, {userProfile.firstName}! 👋
              </h2>
              <p className="text-gray-600">
                Ready to continue your wellness journey?
              </p>
            </div>
          )}

          <CardTitle as-child>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-4">
              Your 5-Minute Holistic Wellbeing Journey
            </h1>
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover your current state across three key life areas and get personalized recommendations for improvement
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8">
          {/* Assessment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {assessmentCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.bgColor} ${category.borderColor} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-4 mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <Badge className={`bg-gradient-to-r ${category.color} text-white border-0`}>
                    {category.percentage} Weight
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Progress Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Assessment Progress</h3>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">~5 minutes</span>
              </div>
            </div>
            
            <div className="flex justify-between text-sm font-medium text-blue-700 mb-3">
              <span>Questions Completed</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-blue-100" />
            
            <div className="mt-3 text-sm text-blue-600">
              {assessment ? 
                assessment.status === "completed" 
                  ? "🎉 Assessment completed! View your results below." 
                  : `${assessment.current_index} of ${assessment.total_questions} questions answered`
                : `0 of 23 questions answered`
              }
            </div>
          </div>

          {/* What You'll Get */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              What You'll Get
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Personalized Score Analysis</h4>
                  <p className="text-sm text-gray-600">Detailed breakdown of your health, wealth, and relationship scores</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">AI-Powered Recommendations</h4>
                  <p className="text-sm text-gray-600">Smart suggestions tailored to your specific situation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Behavioral Nudges</h4>
                  <p className="text-sm text-gray-600">Science-based strategies to build better habits</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">Action Plan</h4>
                  <p className="text-sm text-gray-600">Step-by-step roadmap for improvement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-100">
            {assessment?.status === "completed" ? (
              <>
                <Link to="/assessment/results">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View Results
                  </Button>
                </Link>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleBegin} 
                  disabled={busy}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Take Again
                </Button>
              </>
            ) : (
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleBegin} 
                disabled={busy}
                size="lg"
              >
                {assessment?.current_index ? (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Resume Assessment
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            )}
            
            <Link to="/">
              <Button variant="outline" className="px-8 py-3 text-base font-medium border-2 hover:bg-gray-50">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Assessment;
