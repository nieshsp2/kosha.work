import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AssessmentRow { id: string; user_id: string; status: string; total_questions: number; current_index: number; }
interface QuestionRow { id: string; order_index: number; category: "health"|"wealth"|"relationships"; title: string; description: string | null; }
interface OptionRow { id: string; question_id: string; label: string; value: number; order_index: number; }

const Question = () => {
  const { user, loading } = useAuth();
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
      const sb: any = supabase;

      // Load question and options
      const { data: q } = await sb
        .from("HS_questions")
        .select("*")
        .eq("order_index", indexNum)
        .maybeSingle();
      setQuestion(q ?? null);
      if (q) {
        const { data: opts } = await sb
          .from("HS_question_options")
          .select("*")
          .eq("question_id", q.id)
          .order("order_index", { ascending: true });
        setOptions(opts ?? []);
      }

      if (user) {
        // Ensure assessment exists and load existing answer
        let a: AssessmentRow | null = null;
        const { data } = await sb.from("HS_assessments").select("*").eq("user_id", user.id).maybeSingle();
        a = data ?? null;
        if (!a) {
          const { data: created } = await sb
            .from("HS_assessments")
            .insert({ user_id: user.id, status: "in_progress", started_at: new Date().toISOString(), current_index: 0, total_questions: 23 })
            .select("*")
            .single();
          a = created;
        }
        setAssessment(a);
        if (q) {
          const { data: resp } = await sb
            .from("HS_responses")
            .select("option_id")
            .eq("assessment_id", a!.id)
            .eq("question_id", q.id)
            .maybeSingle();
          setSelected(resp?.option_id ?? null);
        }
      } else {
        // Guest mode: restore from localStorage
        const key = `guest_answer_${indexNum}`;
        const existing = localStorage.getItem(key);
        setSelected(existing ?? null);
        setAssessment(null);
      }
    };
    load();
  }, [user, indexNum]);

  const total = assessment?.total_questions ?? 23;
  const answeredCount = user && assessment ? Math.min(assessment.current_index, total) : Math.max(indexNum - 1, 0);
  const progressPct = Math.round((answeredCount / total) * 100);
  const isLast = indexNum >= total;

  const handlePrev = () => {
    if (indexNum > 1) navigate(`/assessment/question/${indexNum - 1}`);
  };

  const handleNext = async () => {
    if (!selected || !question) {
      toast({ title: "Select an option", description: "Please choose one to continue." });
      return;
    }
    setBusy(true);
    try {
      if (user && assessment) {
        const sb: any = supabase;
        // Save response
        const { error: respErr } = await sb
          .from("HS_responses")
          .upsert(
            { assessment_id: assessment.id, question_id: question.id, option_id: selected },
            { onConflict: "assessment_id,question_id" }
          );
        if (respErr) throw respErr;

        // Update progress
        const newIndex = Math.max(assessment.current_index, indexNum);
        const updates: any = { current_index: newIndex };
        if (indexNum >= total) {
          updates.status = "completed";
          updates.completed_at = new Date().toISOString();
        }
        const { error: updErr } = await sb
          .from("HS_assessments")
          .update(updates)
          .eq("id", assessment.id);
        if (updErr) throw updErr;
      } else {
        // Guest mode: store selection locally
        localStorage.setItem(`guest_answer_${indexNum}`, selected);
      }

      if (isLast) {
        toast({ title: "All done!", description: "Assessment completed." });
        navigate("/assessment");
      } else {
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
    <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-healing border-0">
        <CardHeader>
          <CardTitle as-child>
            <h1 className="text-2xl font-bold">{question.title}</h1>
          </CardTitle>
          <CardDescription>
            {question.description}
            <span className="ml-2 text-xs uppercase tracking-wide text-accent-foreground bg-accent px-2 py-1 rounded-full">{question.category}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {indexNum} of {total}</span>
              <span>{progressPct}%</span>
            </div>
            <Progress value={progressPct} />
          </div>

          <RadioGroup value={selected ?? undefined} onValueChange={setSelected} className="space-y-3">
            {options.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-muted/50">
                <RadioGroupItem id={opt.id} value={opt.id} />
                <Label htmlFor={opt.id} className="cursor-pointer text-base">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handlePrev} disabled={indexNum <= 1}>Back</Button>
            <Button className="bg-gradient-healing" onClick={handleNext} disabled={busy || !selected}>{isLast ? "Finish" : "Next"}</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Question;
