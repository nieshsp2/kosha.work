import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Start = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Start Your Healing Journey | HS Profiles";
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      toast({ title: "Sign in required", description: "Please sign in to continue" });
      navigate("/auth");
    }
  }, [user, loading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const sb: any = supabase; // avoid TS mismatch with generated types
      const { error } = await sb
        .from("HS_user_profiles")
        .upsert(
          {
            user_id: user.id,
            email: email || null,
            age: age ? Number(age) : null,
            occupation: occupation || null,
            gender: gender || null,
            location: location || null,
          },
          { onConflict: "user_id" }
        );
      if (error) throw error;
      toast({ title: "Saved", description: "Profile saved. Continue to assessment." });
      navigate("/assessment");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-healing border-0">
        <CardHeader>
          <CardTitle as-child>
            <h1 className="text-3xl font-bold">Start your healing journey</h1>
          </CardTitle>
          <CardDescription>Tell us a bit about you to personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min={1} max={120} placeholder="e.g. 29" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="e.g. Designer" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" placeholder="e.g. Female / Male / Non-binary" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Country" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-gradient-healing" disabled={saving}>
                {saving ? "Saving..." : "Continue to Assessment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Start;
