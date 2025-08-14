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
interface QuestionRow { id: string; order_index: number; category: "health"|"wealth"|"relationships"; title: string; description: string | null; }
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mb-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)} Assessment
            </div>
          </div>
          <CardTitle as-child>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {question.title}
            </h1>
          </CardTitle>
          {question.description && (
            <CardDescription className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              {question.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="space-y-8 px-8">
          {/* Progress Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex justify-between text-sm font-medium text-blue-700 mb-3">
              <span>Question {indexNum} of {total}</span>
              <span>{progressPct}% Complete</span>
            </div>
            <Progress value={progressPct} className="h-3 bg-blue-100" />
            <div className="mt-2 text-xs text-blue-600">
              {answeredCount} questions answered • {total - answeredCount} remaining
            </div>
          </div>

          {/* Options Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
              Select the option that best describes you:
            </h3>
            
            <Select value={selected ?? undefined} onValueChange={setSelected}>
              <SelectTrigger className="w-full h-16 text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500">
                <SelectValue placeholder="Select the option that best describes you" />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-800">{opt.label}</span>
                      {opt.value && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          Score: {opt.value}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={indexNum <= 1}
              className="px-8 py-3 text-base font-medium border-2 hover:bg-gray-50"
            >
              ← Previous
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300" 
              onClick={handleNext} 
              disabled={busy || !selected}
            >
              {isLast ? "🎯 Complete Assessment" : "Next Question →"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Question;
