import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

  useEffect(() => { document.title = "Assessment | HS"; }, []);

  useEffect(() => {
    if (!loading && !user) {
      toast({ title: "Sign in required", description: "Please sign in to continue" });
      navigate("/auth");
    }
  }, [user, loading, navigate, toast]);

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
    if (!user) return;
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

  return (
    <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-healing border-0">
        <CardHeader>
          <CardTitle as-child>
            <h1 className="text-3xl font-bold">Your 5-Minute Holistic Wellbeing Journey</h1>
          </CardTitle>
          <CardDescription>23 questions across Health (40%), Wealth (30%), and Relationships (30%).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <p className="text-sm text-muted-foreground mt-2">
                {assessment ? `${assessment.current_index} of ${assessment.total_questions} answered` : `0 of 23 answered`}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button className="bg-gradient-healing" onClick={handleBegin} disabled={busy}>
                {assessment?.current_index ? "Resume" : "Let's begin"}
              </Button>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Assessment;
