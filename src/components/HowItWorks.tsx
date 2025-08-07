import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Brain, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Complete Assessment",
    description: "Fill out our comprehensive questionnaire about your lifestyle, health, emotions, relationships, and goals.",
    details: [
      "Guided lifestyle analysis",
      "Health & emotional mapping",
      "Goal identification",
      "Challenge assessment"
    ],
    color: "chakra-root"
  },
  {
    icon: Brain,
    title: "AI Analysis & Recommendations",
    description: "Our AI engine analyzes your inputs and creates a personalized wellness plan with modality suggestions.",
    details: [
      "Advanced AI processing",
      "Personalized healing path",
      "Modality matching",
      "Custom wellness plan"
    ],
    color: "chakra-third-eye"
  },
  {
    icon: Users,
    title: "Connect with Healers",
    description: "Get matched with verified, top-rated healers who specialize in your recommended modalities.",
    details: [
      "Verified healer network",
      "Specialty matching",
      "Reviews & ratings",
      "Flexible scheduling"
    ],
    color: "chakra-heart"
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Follow your healing journey with structured schedules, reminders, and progress tracking tools.",
    details: [
      "Progress monitoring",
      "Session reminders",
      "Outcome tracking",
      "Continuous optimization"
    ],
    color: "healing"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Journey to{" "}
            <span className="bg-gradient-healing bg-clip-text text-transparent">
              Holistic Wellness
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience a seamless, AI-powered approach to holistic healing that connects you 
            with the right practitioners and modalities for your unique needs.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="flex lg:justify-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${step.color} flex items-center justify-center text-white font-bold text-lg relative z-10`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <Card className="hover:shadow-healing transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-${step.color}/10 flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 text-${step.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-healing" />
                            <span className="text-foreground/80">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Arrow - Mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-6">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 via-healing/5 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Healing Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of others who have transformed their lives through personalized holistic healing. 
                Start with a free 15-minute consultation to experience our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-healing hover:shadow-healing">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Assessment
                </Button>
                <Button size="lg" variant="outline">
                  Book Free Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;