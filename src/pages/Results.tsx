import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth"; // Disabled for guest users
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  TrendingUp, 
  Heart, 
  DollarSign, 
  Users, 
  Target,
  Award,
  ArrowRight,
  Home,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import BehavioralNudges from "@/components/BehavioralNudges";
import { recommendationService, Recommendation } from "@/services/recommendationService";
import { guestUserService } from "@/services/guestUserService";

interface AssessmentRow {
  id: string;
  user_id?: string;
  status: string;
  total_questions: number;
  current_index: number;
  completed_at?: string;
}

interface QuestionRow {
  id: string;
  order_index: number;
  category: "health" | "wealth" | "relationships";
  title: string;
  description: string | null;
}

interface OptionRow {
  id: string;
  question_id: string;
  label: string;
  value: number;
  order_index: number;
}

interface ResponseRow {
  id?: string;
  assessment_id?: string;
  question_id?: string;
  option_id: string;
  answer_text?: string | null;
}

interface ScoreBreakdown {
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
    level: string;
  };
}

const Results = () => {
  // const { user, loading } = useAuth(); // Disabled for guest users
  const user = null; // Guest users only for now
  const loading = false;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<AssessmentRow | null>(null);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [options, setOptions] = useState<OptionRow[]>([]);
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [scores, setScores] = useState<ScoreBreakdown | null>(null);
  const [loadingResults, setLoadingResults] = useState(true);
  const [behavioralNudges, setBehavioralNudges] = useState<any[]>([]);
  
  // New state for AI recommendations
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);
  const [loadingAiRecommendations, setLoadingAiRecommendations] = useState(false);
  const [aiRecommendationsError, setAiRecommendationsError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    document.title = "Assessment Results | HS";
  }, []);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const sb: any = supabase;

        // Load questions
        const { data: questionsData, error: questionsError } = await sb
          .from("HS_questions")
          .select("*")
          .order("order_index", { ascending: true });

        if (questionsError) throw questionsError;
        setQuestions(questionsData);

        // Load options
        const { data: optionsData, error: optionsError } = await sb
          .from("HS_question_options")
          .select("*")
          .order("order_index", { ascending: true });

        if (optionsError) throw optionsError;
        setOptions(optionsData);

        let assessmentData: AssessmentRow | null = null;
        let responsesData: ResponseRow[] = [];

        if (user) {
          // Authenticated user: load from database
          const { data: assessmentFromDb, error: assessmentError } = await sb
            .from("HS_assessments")
            .select("*")
            .eq("user_id", user.id)
            .eq("status", "completed")
            .order("completed_at", { ascending: false })
            .limit(1)
            .single();

          if (assessmentError || !assessmentFromDb) {
            toast({ title: "No completed assessment found", description: "Please complete an assessment first.", variant: "destructive" });
            navigate("/assessment");
            return;
          }

          assessmentData = assessmentFromDb;

          // Load responses from database
          const { data: responsesFromDb, error: responsesError } = await sb
            .from("HS_responses")
            .select("*")
            .eq("assessment_id", assessmentFromDb.id);

          if (responsesError) throw responsesError;
          responsesData = responsesFromDb;
        } else {
          // Guest user: load from localStorage using guestUserService
          console.log('Loading guest user results...');
          
          // First check if assessment is completed
          const isCompleted = await guestUserService.isAssessmentCompleted();
          if (!isCompleted) {
            toast({ title: "No completed assessment found", description: "Please complete an assessment first.", variant: "destructive" });
            navigate("/assessment");
            return;
          }
          
          // Get the completed assessment
          const guestAssessment = await guestUserService.getAssessment();
          if (!guestAssessment || guestAssessment.status !== 'completed') {
            toast({ title: "No completed assessment found", description: "Please complete an assessment first.", variant: "destructive" });
            navigate("/assessment");
            return;
          }
          
          // Get responses using guestUserService
          const guestResponses = await guestUserService.getResponses();
          if (guestResponses.length === 0) {
            toast({ title: "No responses found", description: "Please complete an assessment first.", variant: "destructive" });
            navigate("/assessment");
            return;
          }
          
          console.log(`Found ${guestResponses.length} responses for completed assessment`);
          
          // Create assessment data for the results page
          assessmentData = {
            id: guestAssessment.id || "guest-assessment",
            status: guestAssessment.status,
            total_questions: guestAssessment.total_questions,
            current_index: guestAssessment.current_index,
            completed_at: guestAssessment.completed_at
          };
          
          // Convert responses to the format expected by the results page
          responsesData = guestResponses.map(response => ({
            id: response.id,
            assessment_id: response.assessment_id,
            question_id: response.question_id,
            option_id: response.option_id
          }));
        }

        setAssessment(assessmentData);
        setResponses(responsesData);

      } catch (error: any) {
        console.error("Error loading results:", error);
        toast({ title: "Error", description: "Failed to load assessment results.", variant: "destructive" });
        navigate("/assessment");
      } finally {
        setLoadingResults(false);
      }
    };

    loadResults();
  }, [user, navigate, toast]);

  // Calculate scores based on the algorithm
  const calculateScores = useMemo(() => {
    if (!questions.length || !options.length || !responses.length) return null;

    const healthScore = { 
      total: 0, 
      max: 4.0, 
      components: { 
        nutrition: 0, digestion: 0, exercise: 0, water: 0, sunlight: 0,
        sleep: 0, outdoorAir: 0, oralCare: 0, skinCare: 0 
      } 
    };
    const wealthScore = { 
      total: 0, 
      max: 3.0, 
      components: { 
        quality: 0, quantity: 0, diversity: 0, workplace: 0, creativity: 0, restRelaxation: 0 
      } 
    };
    const relationshipsScore = { 
      total: 0, 
      max: 3.0, 
      components: { 
        mentalWellbeing: 0, emotionalWellbeing: 0, partner: 0, parents: 0,
        children: 0, relatives: 0, friends: 0, universalOneness: 0 
      } 
    };

    // Map questions to scoring components
    const questionMapping: { [key: number]: { category: string; component: string; weight: number } } = {
      // Health questions (40% - 4.0 points)
      1: { category: "health", component: "nutrition", weight: 0.6 },
      2: { category: "health", component: "digestion", weight: 0.2 },
      3: { category: "health", component: "exercise", weight: 0.6 },
      4: { category: "health", component: "water", weight: 0.4 },
      5: { category: "health", component: "sunlight", weight: 0.6 },
      6: { category: "health", component: "sleep", weight: 0.6 },
      7: { category: "health", component: "outdoorAir", weight: 0.6 },
      8: { category: "health", component: "oralCare", weight: 0.2 },
      9: { category: "health", component: "skinCare", weight: 0.2 },
      
      // Wealth questions (30% - 3.0 points)
      10: { category: "wealth", component: "quality", weight: 1.0 },
      11: { category: "wealth", component: "quantity", weight: 0.3 },
      12: { category: "wealth", component: "diversity", weight: 0.2 },
      13: { category: "wealth", component: "workplace", weight: 0.5 },
      14: { category: "wealth", component: "creativity", weight: 0.5 },
      15: { category: "wealth", component: "restRelaxation", weight: 0.5 },
      
      // Relationships questions (30% - 3.0 points)
      16: { category: "relationships", component: "mentalWellbeing", weight: 0.4 },
      17: { category: "relationships", component: "emotionalWellbeing", weight: 0.4 },
      18: { category: "relationships", component: "partner", weight: 0.5 },
      19: { category: "relationships", component: "parents", weight: 0.3 },
      20: { category: "relationships", component: "children", weight: 0.3 },
      21: { category: "relationships", component: "relatives", weight: 0.3 },
      22: { category: "relationships", component: "friends", weight: 0.3 },
      23: { category: "relationships", component: "universalOneness", weight: 0.5 },
    };

    // Calculate scores for each response
    responses.forEach(response => {
      let question: QuestionRow | undefined;
      
      // Handle both guest mode (question_id is order_index) and authenticated mode (question_id is actual ID)
      if (response.question_id && isNaN(Number(response.question_id))) {
        // Authenticated mode: find question by ID
        question = questions.find(q => q.id === response.question_id);
      } else {
        // Guest mode: find question by order_index
        const orderIndex = Number(response.question_id);
        question = questions.find(q => q.order_index === orderIndex);
      }
      
      const option = options.find(o => o.id === response.option_id);
      
      if (question && option) {
        const mapping = questionMapping[question.order_index];
        if (mapping) {
          const score = (option.value / 5) * mapping.weight; // Assuming 5-point scale
          
          if (mapping.category === "health") {
            healthScore.total += score;
            (healthScore.components as any)[mapping.component] += score;
          } else if (mapping.category === "wealth") {
            wealthScore.total += score;
            (wealthScore.components as any)[mapping.component] += score;
          } else if (mapping.category === "relationships") {
            relationshipsScore.total += score;
            (relationshipsScore.components as any)[mapping.component] += score;
          }
        }
      }
    });

    const overallTotal = healthScore.total + wealthScore.total + relationshipsScore.total;
    const overallMax = healthScore.max + wealthScore.max + relationshipsScore.max;

    // Calculate grade and level
    const percentage = (overallTotal / overallMax) * 100;
    let grade = "F";
    let level = "Needs Improvement";

    if (percentage >= 90) { grade = "A+"; level = "Exceptional"; }
    else if (percentage >= 85) { grade = "A"; level = "Excellent"; }
    else if (percentage >= 80) { grade = "A-"; level = "Very Good"; }
    else if (percentage >= 75) { grade = "B+"; level = "Good"; }
    else if (percentage >= 70) { grade = "B"; level = "Above Average"; }
    else if (percentage >= 65) { grade = "B-"; level = "Average"; }
    else if (percentage >= 60) { grade = "C+"; level = "Below Average"; }
    else if (percentage >= 55) { grade = "C"; level = "Needs Work"; }
    else if (percentage >= 50) { grade = "C-"; level = "Poor"; }
    else { grade = "F"; level = "Critical"; }

    const scoreBreakdown: ScoreBreakdown = {
      health: {
        total: Math.round(healthScore.total * 100) / 100,
        max: healthScore.max,
        percentage: Math.round((healthScore.total / healthScore.max) * 100),
        components: {
          nutrition: Math.round((healthScore.components.nutrition / 0.6) * 100),
          digestion: Math.round((healthScore.components.digestion / 0.2) * 100),
          exercise: Math.round((healthScore.components.exercise / 0.6) * 100),
          water: Math.round((healthScore.components.water / 0.4) * 100),
          sunlight: Math.round((healthScore.components.sunlight / 0.6) * 100),
          sleep: Math.round((healthScore.components.sleep / 0.6) * 100),
          outdoorAir: Math.round((healthScore.components.outdoorAir / 0.6) * 100),
          oralCare: Math.round((healthScore.components.oralCare / 0.2) * 100),
          skinCare: Math.round((healthScore.components.skinCare / 0.2) * 100)
        }
      },
      wealth: {
        total: Math.round(wealthScore.total * 100) / 100,
        max: wealthScore.max,
        percentage: Math.round((wealthScore.total / wealthScore.max) * 100),
        components: {
          quality: Math.round((wealthScore.components.quality / 1.0) * 100),
          quantity: Math.round((wealthScore.components.quantity / 0.3) * 100),
          diversity: Math.round((wealthScore.components.diversity / 0.2) * 100),
          workplace: Math.round((wealthScore.components.workplace / 0.5) * 100),
          creativity: Math.round((wealthScore.components.creativity / 0.5) * 100),
          restRelaxation: Math.round((wealthScore.components.restRelaxation / 0.5) * 100)
        }
      },
      relationships: {
        total: Math.round(relationshipsScore.total * 100) / 100,
        max: relationshipsScore.max,
        percentage: Math.round((relationshipsScore.total / relationshipsScore.max) * 100),
        components: {
          mentalWellbeing: Math.round((relationshipsScore.components.mentalWellbeing / 0.4) * 100),
          emotionalWellbeing: Math.round((relationshipsScore.components.emotionalWellbeing / 0.4) * 100),
          partner: Math.round((relationshipsScore.components.partner / 0.5) * 100),
          parents: Math.round((relationshipsScore.components.parents / 0.3) * 100),
          children: Math.round((relationshipsScore.components.children / 0.3) * 100),
          relatives: Math.round((relationshipsScore.components.relatives / 0.3) * 100),
          friends: Math.round((relationshipsScore.components.friends / 0.3) * 100),
          universalOneness: Math.round((relationshipsScore.components.universalOneness / 0.5) * 100)
        }
      },
      overall: {
        total: Math.round(overallTotal * 100) / 100,
        max: overallMax,
        percentage: Math.round(percentage),
        grade,
        level
      }
    };

    return scoreBreakdown;
  }, [questions, options, responses]);

  useEffect(() => {
    if (calculateScores) {
      console.log('📊 Results: Scores calculated, setting state and generating nudges...');
      setScores(calculateScores);
      
      // Generate behavioral nudges based on scores
      console.log('🎯 Results: Calling recommendationService.generateBehavioralNudges...');
      const nudges = recommendationService.generateBehavioralNudges(calculateScores, {
        // You can enhance this with actual user profile data
        age: undefined,
        occupation: undefined,
        gender: undefined,
        location: undefined,
        personalityType: undefined,
        culturalValues: [],
        lifestyleConstraints: []
      });
      console.log(`✅ Results: Generated ${nudges.length} behavioral nudges:`, nudges);
      setBehavioralNudges(nudges);
      
      // Note: AI recommendations are not currently being called here
      // They would need to be explicitly called with recommendationService.generateRecommendations()
      console.log('ℹ️ Results: AI recommendations not automatically generated. To test OpenAI API, call recommendationService.generateRecommendations() manually.');
    }
  }, [calculateScores]);

  // New useEffect to automatically generate AI recommendations when scores are available
  useEffect(() => {
    const generateAiRecommendations = async () => {
      if (!scores || !responses.length) return;
      
      setLoadingAiRecommendations(true);
      setAiRecommendationsError(null);
      
      try {
        console.log('🤖 Automatically generating Gemini AI recommendations...');
        
        // Get user profile from guestUserService or create a default one
        let profile = userProfile;
        if (!profile) {
          try {
            profile = await guestUserService.getProfile();
          } catch (error) {
            console.log('Using default profile for AI recommendations');
            profile = {
              age: 30,
              occupation: 'Professional',
              gender: 'Not specified',
              location: 'Global',
              personalityType: 'ambivert' as const,
              culturalValues: ['Wellness', 'Growth'],
              lifestyleConstraints: ['Modern lifestyle']
            };
          }
        }
        
        console.log('📝 Generating Gemini AI recommendations with profile:', profile);
        
        const recommendations = await recommendationService.generateRecommendations(
          scores,
          profile,
          responses
        );
        
        console.log('✅ Gemini AI recommendations generated successfully:', recommendations);
        setAiRecommendations(recommendations);
        
        // Show success toast
        toast({
          title: "Gemini AI Recommendations Generated",
          description: `Successfully generated ${recommendations.length} personalized recommendations`,
          variant: "default"
        });
        
      } catch (error) {
        console.error('❌ Failed to generate Gemini AI recommendations:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setAiRecommendationsError(errorMessage);
        
        // Show error toast
        toast({
          title: "Gemini AI Recommendations Failed",
          description: "Using fallback recommendations instead",
          variant: "destructive"
        });
      } finally {
        setLoadingAiRecommendations(false);
      }
    };

    generateAiRecommendations();
  }, [scores, responses, userProfile, toast]);

  if (loadingResults) {
    return (
      <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </main>
    );
  }

  if (!scores) {
    return (
      <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Unable to calculate scores. Please try again.</p>
          <Button onClick={() => navigate("/assessment")} className="mt-4">Back to Assessment</Button>
        </div>
      </main>
    );
  }

  // Prepare data for charts
  const categoryData = [
    { name: "Health", score: scores.health.total, max: scores.health.max, percentage: scores.health.percentage, color: "#10b981" },
    { name: "Wealth", score: scores.wealth.total, max: scores.wealth.max, percentage: scores.wealth.percentage, color: "#f59e0b" },
    { name: "Relationships", score: scores.relationships.total, max: scores.relationships.max, percentage: scores.relationships.percentage, color: "#3b82f6" }
  ];

  const radarData = [
    { category: "Health", score: scores.health.percentage, fullMark: 100 },
    { category: "Wealth", score: scores.wealth.percentage, fullMark: 100 },
    { category: "Relationships", score: scores.relationships.percentage, fullMark: 100 }
  ];

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

  return (
    <main className="min-h-screen bg-gradient-peaceful p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Your Assessment Results</h1>
          <p className="text-xl text-white/80">Discover where you stand in your holistic wellbeing journey</p>
        </div>

        {/* Overall Score Card */}
        <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center gap-3">
              <Award className="h-8 w-8 text-yellow-500" />
              Overall Score: {scores.overall.grade}
            </CardTitle>
            <CardDescription className="text-lg">
              {scores.overall.total} out of {scores.overall.max} points ({scores.overall.percentage}%)
            </CardDescription>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {scores.overall.level}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${(scores.overall.percentage / 100) * 251.2} 251.2`}
                    className="text-primary transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{scores.overall.percentage}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Health */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-6 w-6 text-green-500" />
                <CardTitle>Health</CardTitle>
              </div>
              <CardDescription>40% of total score</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-green-600">
                {scores.health.total}/{scores.health.max}
              </div>
              <Progress value={scores.health.percentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {scores.health.percentage}% achieved
              </div>
            </CardContent>
          </Card>

          {/* Wealth */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-6 w-6 text-yellow-500" />
                <CardTitle>Wealth</CardTitle>
              </div>
              <CardDescription>30% of total score</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-yellow-600">
                {scores.wealth.total}/{scores.wealth.max}
              </div>
              <Progress value={scores.wealth.percentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {scores.wealth.percentage}% achieved
              </div>
            </CardContent>
          </Card>

          {/* Relationships */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-blue-500" />
                <CardTitle>Relationships</CardTitle>
              </div>
              <CardDescription>30% of total score</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-blue-600">
                {scores.relationships.total}/{scores.relationships.max}
              </div>
              <Progress value={scores.relationships.percentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {scores.relationships.percentage}% achieved
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Category Breakdown
              </CardTitle>
              <CardDescription>Visual representation of your scores across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value} points`, "Score"]}
                    labelFormatter={(label) => `${label} Category`}
                  />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Radar
              </CardTitle>
              <CardDescription>Your performance across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Score Distribution
            </CardTitle>
            <CardDescription>How your total score is distributed across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="score"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} points`, "Score"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Component Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Components */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Heart className="h-5 w-5" />
                Health Components
              </CardTitle>
              <CardDescription>Detailed breakdown of your health score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nutrition (0.6)</span>
                  <span className="font-medium">0.6 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exercise (0.6)</span>
                  <span className="font-medium">0.6 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sunlight (0.6)</span>
                  <span className="font-medium">0.6 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sleep (0.6)</span>
                  <span className="font-medium">0.6 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Outdoor Air (0.6)</span>
                  <span className="font-medium">0.6 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Water (0.4)</span>
                  <span className="font-medium">0.4 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Digestion (0.2)</span>
                  <span className="font-medium">0.2 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Oral Care (0.2)</span>
                  <span className="font-medium">0.2 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Skin Care (0.2)</span>
                  <span className="font-medium">0.2 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Wealth Components */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-600">
                <DollarSign className="h-5 w-5" />
                Wealth Components
              </CardTitle>
              <CardDescription>Detailed breakdown of your wealth score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quality (1.0)</span>
                  <span className="font-medium">1.0 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Workplace (0.5)</span>
                  <span className="font-medium">0.5 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Creativity (0.5)</span>
                  <span className="font-medium">0.5 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rest/Relaxation (0.5)</span>
                  <span className="font-medium">0.5 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quantity (0.3)</span>
                  <span className="font-medium">0.3 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Diversity (0.2)</span>
                  <span className="font-medium">0.2 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Relationships Components */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Users className="h-5 w-5" />
                Relationships Components
              </CardTitle>
              <CardDescription>Detailed breakdown of your relationships score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Partner (0.5)</span>
                  <span className="font-medium">0.5 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Universal Oneness (0.5)</span>
                  <span className="font-medium">0.5 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mental Wellbeing (0.4)</span>
                  <span className="font-medium">0.4 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Emotional Wellbeing (0.4)</span>
                  <span className="font-medium">0.4 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Parents (0.3)</span>
                  <span className="font-medium">0.3 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Children (0.3)</span>
                  <span className="font-medium">0.3 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Relatives (0.3)</span>
                  <span className="font-medium">0.3 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Friends (0.3)</span>
                  <span className="font-medium">0.3 pts</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI-Powered Recommendations Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your Personalized AI Action Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Based on your assessment results, here are AI-powered recommendations and behavioral nudges to help you improve your wellness scores.
            </p>
          </div>

          {/* AI Recommendations Display */}
          {loadingAiRecommendations && (
            <Card className="max-w-4xl mx-auto shadow-healing border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-medium text-gray-700">Generating AI recommendations...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </CardContent>
            </Card>
          )}

          {aiRecommendationsError && (
            <Card className="max-w-4xl mx-auto shadow-healing border-0 bg-red-50 border-red-200">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-600" />
                <p className="text-lg font-medium text-red-700">AI Recommendations Unavailable</p>
                <p className="text-sm text-red-600 mt-2">{aiRecommendationsError}</p>
                <p className="text-sm text-gray-500 mt-2">Using fallback recommendations instead</p>
              </CardContent>
            </Card>
          )}

          {!loadingAiRecommendations && aiRecommendations.length > 0 && (
            <div className="space-y-6 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  AI-Powered Recommendations
                </h3>
                <p className="text-gray-600">Personalized suggestions based on your unique assessment results using AI</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {aiRecommendations.map((recommendation, index) => (
                  <Card key={index} className="shadow-healing border-0 bg-white/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className={`${
                            recommendation.category === 'health' ? 'bg-green-100 text-green-800 border-green-200' :
                            recommendation.category === 'wealth' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-purple-100 text-purple-800 border-purple-200'
                          }`}
                        >
                          {recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}
                        </Badge>
                        <Badge 
                          className={`${
                            recommendation.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                            recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }`}
                        >
                          {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm">{recommendation.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Actionable Steps:</p>
                        <ul className="space-y-1">
                          {recommendation.actionableSteps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>⏱️ {recommendation.estimatedTime}</span>
                        <span>📊 {recommendation.difficulty}</span>
                      </div>
                      
                      <div className="pt-2">
                        <Badge variant="outline" className="text-xs">
                          {recommendation.nudgeType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Behavioral Nudges (fallback) */}
          {!loadingAiRecommendations && aiRecommendations.length === 0 && (
            <BehavioralNudges 
              nudges={behavioralNudges}
              onNudgeComplete={(nudgeId) => {
                console.log('Nudge completed:', nudgeId);
              }}
            />
          )}

          {/* Manual Test Button (for debugging) */}
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                🧪 Debug: Gemini API Testing
              </CardTitle>
              <CardDescription className="text-center">
                Use these buttons to test and debug Gemini API functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {/* Model Testing Button */}
              <div>
                <Button 
                  onClick={async () => {
                    try {
                      console.log('🧪 Testing edge function connectivity...');
                      
                      // Test edge function connectivity
                      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
                        body: {
                          scores: { 
                            health: { total: 1, max: 4, percentage: 25, components: {} },
                            wealth: { total: 1, max: 3, percentage: 33, components: {} },
                            relationships: { total: 1, max: 3, percentage: 33, components: {} },
                            overall: { total: 3, max: 10, percentage: 30, grade: 'D', level: 'Beginner' }
                          },
                          userProfile: { age: 30, occupation: 'Test' },
                          responses: []
                        }
                      });
                      
                      if (error) {
                        console.error('❌ Edge function test failed:', error);
                        toast({
                          title: "Edge Function Test Failed",
                          description: error.message || 'Unknown error',
                          variant: "destructive"
                        });
                        return;
                      }
                      
                      console.log('✅ Edge function response:', data);
                      
                      if (data?.recommendations) {
                        toast({
                          title: "Edge Function Working",
                          description: `Successfully generated ${data.recommendations.length} test recommendations`,
                          variant: "default"
                        });
                      } else {
                        toast({
                          title: "Edge Function Issue",
                          description: "Function responded but no recommendations received",
                          variant: "destructive"
                        });
                      }
                      
                    } catch (error) {
                      console.error('❌ Edge function test error:', error);
                      toast({
                        title: "Edge Function Test Error",
                        description: error instanceof Error ? error.message : 'Unknown error',
                        variant: "destructive"
                      });
                    }
                  }}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 mr-4"
                >
                  🔍 Test Edge Function Connection
                </Button>
                
                <Button 
                  onClick={async () => {
                    if (!scores) return;
                    
                    console.log('🧪 Manual AI recommendations test...');
                    try {
                      setLoadingAiRecommendations(true);
                      setAiRecommendationsError(null);
                      
                      // Create mock user profile and responses for testing
                      const mockUserProfile = {
                        age: 30,
                        occupation: 'Software Developer',
                        gender: 'Male',
                        location: 'San Francisco',
                        personalityType: 'ambivert' as const,
                        culturalValues: ['Innovation', 'Work-Life Balance'],
                        lifestyleConstraints: ['Busy schedule', 'Remote work']
                      };
                      
                      const mockResponses = [
                        { question_id: '1', option_id: '1', answer_text: 'Test response' }
                      ];
                      
                      console.log('📝 Calling Gemini API with:', { scores, mockUserProfile, mockResponses });
                      
                      const aiRecommendations = await recommendationService.generateRecommendations(
                        scores,
                        mockUserProfile,
                        mockResponses
                      );
                      
                      console.log('🎉 Manual Gemini API test successful! Generated recommendations:', aiRecommendations);
                      setAiRecommendations(aiRecommendations);
                      
                      toast({
                        title: "Manual Gemini API Test Successful",
                        description: `Generated ${aiRecommendations.length} AI recommendations`,
                        variant: "default"
                      });
                      
                    } catch (error) {
                      console.error('❌ Manual OpenAI API test failed:', error);
                      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                      setAiRecommendationsError(errorMessage);
                      
                      toast({
                        title: "Manual Gemini API Test Failed",
                        description: errorMessage,
                        variant: "destructive"
                      });
                    } finally {
                      setLoadingAiRecommendations(false);
                    }
                  }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3"
                  disabled={!scores || loadingAiRecommendations}
                >
                  {loadingAiRecommendations ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Testing...
                    </>
                  ) : (
                    '🧪 Test Recommendations API'
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Use "Test Available Gemini Models" to check which Gemini models your API key can access.
                Use "Test Recommendations API" to manually test the recommendations generation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            onClick={() => navigate("/assessment")} 
            className="bg-gradient-healing text-white px-8 py-3 text-lg"
          >
            Take Assessment Again
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="px-8 py-3 text-lg"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Completion Info */}
        {assessment?.completed_at && (
          <Card className="shadow-healing border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>Assessment completed on {new Date(assessment.completed_at).toLocaleDateString()}</p>
              <p className="text-sm mt-1">Your results are saved and can be reviewed anytime</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Results;
