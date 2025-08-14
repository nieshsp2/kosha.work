import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { guestUserService } from "@/services/guestUserService";

interface AssessmentRow { id: string; user_id?: string; status: string; total_questions: number; current_index: number; }
interface QuestionRow { id: string; order_index: number; category: "health"|"wealth"|"relationships"; title: string; description: string | null; question_text: string | null; }
interface OptionRow { id: string; question_id: string; label: string; value: number; order_index: number; }

const Question = () => {
  const { orderIndex } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [assessment, setAssessment] = useState<AssessmentRow | null>(null);
  const [question, setQuestion] = useState<QuestionRow | null>(null);
  const [options, setOptions] = useState<OptionRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const indexNum = useMemo(() => Number(orderIndex ?? 1), [orderIndex]);

  useEffect(() => {
    document.title = `Question ${indexNum} | HS Assessment`;
  }, [indexNum]);

  useEffect(() => {
    const load = async () => {
      try {
        // Load question and options from Supabase
        const { data: q, error: qError } = await supabase
          .from("HS_questions")
          .select("*")
          .eq("order_index", indexNum)
          .maybeSingle();

        if (qError) {
          console.error("Error loading question:", qError);
          toast({ title: "Error", description: "Failed to load question", variant: "destructive" });
          return;
        }

        if (!q) {
          toast({ title: "Error", description: "Question not found", variant: "destructive" });
          return;
        }

        setQuestion(q);

        // Load options for this question
        const { data: opts, error: optsError } = await supabase
          .from("HS_question_options")
          .select("*")
          .eq("question_id", q.id)
          .order("order_index", { ascending: true });

        if (optsError) {
          console.error("Error loading options:", optsError);
          toast({ title: "Error", description: "Failed to load options", variant: "destructive" });
          return;
        }

        setOptions(opts || []);

        // Clear previous selection when loading new question
        setSelected(null);
        setAssessment(null);
      } catch (error) {
        console.error("Error in load function:", error);
        toast({ title: "Error", description: "Failed to load question data", variant: "destructive" });
      }
    };
    load();
  }, [indexNum, toast]);

  const total = 23;
  const answeredCount = Math.max(indexNum - 1, 0);
  const progressPct = Math.round((answeredCount / total) * 100);
  const isLast = indexNum >= total;

  // Category information with descriptions
  const categoryInfo = {
    health: {
      title: "🏃‍♀️ HEALTH FOUNDATION",
      subtitle: "(40% of your wellbeing score)",
      description: '"Your body is your temple, but even temples need a good cleaning crew!"',
      firstQuestion: 1
    },
    wealth: {
      title: "💰 WEALTH & WORK",
      subtitle: "(30% of your wellbeing score)",
      description: '"Money can\'t buy happiness, but poverty can definitely rent you some stress!"',
      firstQuestion: 10
    },
    relationships: {
      title: "💕 RELATIONSHIPS & INNER WORLD",
      subtitle: "(30% of your wellbeing score)",
      description: '"We\'re only as healthy as our relationships - including the one with ourselves!"',
      firstQuestion: 16
    }
  };

  const currentCategoryInfo = question ? categoryInfo[question.category] : null;
  const isFirstQuestionInCategory = currentCategoryInfo && indexNum === currentCategoryInfo.firstQuestion;

  const handlePrev = () => {
    if (indexNum > 1) {
      setSelected(null); // Clear selection when going back
      navigate(`/assessment/question/${indexNum - 1}`);
    }
  };

  const handleNext = async () => {
    if (!selected || !question) {
      toast({ title: "Select an option", description: "Please choose one to continue." });
      return;
    }
    setBusy(true);
    try {
      // Ensure we have an assessment before saving responses
      let currentAssessment = await guestUserService.getAssessment();
      if (!currentAssessment) {
        console.log('No assessment found, creating one...');
        currentAssessment = await guestUserService.createAssessment();
        console.log('Created new assessment:', currentAssessment);
      }

      // Guest mode: store selection in database
      try {
        await guestUserService.saveResponse(question.id, selected);
        
        // For the last question, mark as completed with current index
        // For other questions, mark as in_progress with next index
        if (isLast) {
          await guestUserService.updateAssessmentProgress(indexNum, 'completed');
        } else {
          await guestUserService.updateAssessmentProgress(indexNum + 1, 'in_progress');
        }
      } catch (error) {
        console.error('Error saving response:', error);
        // Fallback to localStorage
        localStorage.setItem(`guest_answer_${indexNum}`, selected);
      }

      if (isLast) {
        toast({ title: "All done!", description: "Assessment completed. Redirecting to results..." });
        navigate("/assessment/results");
      } else {
        // Clear selection before navigating to next question
        setSelected(null);
        navigate(`/assessment/question/${indexNum + 1}`);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-muted-foreground">Loading question...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span className="text-gray-600 font-medium text-sm">Question {indexNum} of {total}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 shadow-sm" 
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>

        {/* Category Header - Show when starting a new category */}
        {isFirstQuestionInCategory && currentCategoryInfo && (
          <Card className="bg-white border border-gray-200 shadow-sm mb-6">
            <CardContent className="p-4 md:p-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {currentCategoryInfo.title}
              </h2>
              <p className="text-blue-600 text-base md:text-lg font-medium mb-3">
                {currentCategoryInfo.subtitle}
              </p>
              <p className="text-gray-600 text-base md:text-lg italic max-w-lg mx-auto">
                {currentCategoryInfo.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Question Card */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardContent className="p-6 md:p-8">

            {/* Question Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl">💧</span>
              </div>
            </div>

            {/* Question Title and Content */}
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                {question.title}
              </h2>
              {question.description && (
                <p className="text-base md:text-lg text-gray-600 mb-6 italic max-w-xl mx-auto bg-blue-50 px-4 py-3 rounded-lg border-l-4 border-blue-400">
                  {question.description}
                </p>
              )}
              {question.question_text && (
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto">
                  {question.question_text}
                </h1>
              )}
            </div>

            {/* Select Dropdown */}
            <div className="mb-8">
              <Select value={selected ?? undefined} onValueChange={setSelected}>
                <SelectTrigger className="w-full h-12 md:h-14 text-base md:text-lg bg-white border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-900 rounded-lg shadow-sm">
                  <SelectValue placeholder="select an option" className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg max-h-64 overflow-y-auto">
                  {options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id} className="py-4 px-6 hover:bg-blue-50 cursor-pointer text-gray-900 border-b border-gray-100 last:border-b-0">
                      <div className="font-medium text-base">
                        {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={indexNum <= 1}
                className="px-6 md:px-8 py-3 text-base font-medium bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm"
              >
                ← Previous
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 md:px-8 py-3 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleNext} 
                disabled={busy || !selected}
              >
                {isLast ? "Complete" : "Next"} →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Question;
