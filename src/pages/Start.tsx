import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Start = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    document.title = "Start Your Healing Journey | HS Profiles";
  }, []);

  useEffect(() => {
    const checkCompletedAssessment = () => {
      // Check if guest user has completed assessment by looking at localStorage
      let hasResponses = false;
      for (let i = 1; i <= 23; i++) {
        const key = `guest_answer_${i}`;
        if (localStorage.getItem(key)) {
          hasResponses = true;
          break;
        }
      }
      setHasCompletedAssessment(hasResponses);
    };

    checkCompletedAssessment();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Store profile data in localStorage for guest users
      const profileData = {
        email: email || null,
        age: age ? Number(age) : null,
        occupation: occupation || null,
        gender: gender || null,
        location: location || null,
      };
      localStorage.setItem('guest_profile', JSON.stringify(profileData));
      
      toast({ title: "Profile saved", description: "Continue to complete your detailed profile." });
      navigate("/user-info");
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
          <CardDescription>
            {hasCompletedAssessment 
              ? "Update your profile or view your previous assessment results below."
              : "Tell us a bit about you to personalize your experience."
            }
          </CardDescription>
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
            <div className="md:col-span-2 flex justify-between items-center">
              {hasCompletedAssessment && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/assessment/results")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Previous Results
                </Button>
              )}
              <Button type="submit" className="bg-gradient-healing" disabled={saving}>
                {saving ? "Saving..." : "Start Assessment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Start;
