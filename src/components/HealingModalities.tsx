import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Waves, 
  Heart, 
  Brain, 
  Zap, 
  Moon, 
  Sun, 
  Sparkles, 
  TreePine,
  Wind
} from "lucide-react";

const modalities = [
  {
    icon: Heart,
    title: "Reiki Healing",
    description: "Energy healing technique that promotes relaxation and reduces stress through gentle touch.",
    color: "chakra-heart",
    benefits: ["Stress Relief", "Energy Balance", "Emotional Healing"],
    duration: "45-60 mins"
  },
  {
    icon: Sparkles,
    title: "Chakra Healing",
    description: "Balance your seven energy centers for optimal physical and emotional well-being.",
    color: "chakra-crown",
    benefits: ["Energy Alignment", "Spiritual Growth", "Inner Balance"],
    duration: "60-90 mins"
  },
  {
    icon: Waves,
    title: "Sound Therapy",
    description: "Healing vibrations using singing bowls, gongs, and other instruments for deep relaxation.",
    color: "chakra-throat",
    benefits: ["Deep Relaxation", "Mental Clarity", "Stress Release"],
    duration: "30-45 mins"
  },
  {
    icon: Brain,
    title: "NLP Therapy",
    description: "Neuro-linguistic programming to rewire thought patterns and behaviors.",
    color: "chakra-third-eye",
    benefits: ["Mindset Shift", "Goal Achievement", "Confidence Building"],
    duration: "60-75 mins"
  },
  {
    icon: Moon,
    title: "Hypnotherapy",
    description: "Access your subconscious mind to create positive changes and overcome limitations.",
    color: "primary",
    benefits: ["Habit Change", "Trauma Healing", "Performance Enhancement"],
    duration: "75-90 mins"
  },
  {
    icon: Sun,
    title: "Past Life Regression",
    description: "Explore past experiences to understand current life patterns and challenges.",
    color: "chakra-solar",
    benefits: ["Soul Healing", "Pattern Recognition", "Spiritual Insight"],
    duration: "90-120 mins"
  },
  {
    icon: Zap,
    title: "Energy Balancing",
    description: "Restore your natural energy flow and remove energetic blocks.",
    color: "healing",
    benefits: ["Energy Restoration", "Vitality Boost", "Emotional Clarity"],
    duration: "45-60 mins"
  },
  {
    icon: Wind,
    title: "Breathwork & Meditation",
    description: "Guided breathing techniques and meditation practices for inner peace.",
    color: "chakra-root",
    benefits: ["Mental Peace", "Anxiety Relief", "Spiritual Connection"],
    duration: "30-45 mins"
  },
  {
    icon: TreePine,
    title: "Ayurvedic Healing",
    description: "Ancient wisdom for holistic health through personalized nutrition and lifestyle.",
    color: "chakra-sacral",
    benefits: ["Holistic Wellbeing", "Natural Healing", "Life Balance"],
    duration: "60-90 mins"
  }
];

const HealingModalities = () => {
  return (
    <section id="modalities" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-healing/10 text-healing border-healing/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Healing Modalities
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Discover Your Path to{" "}
            <span className="bg-gradient-healing bg-clip-text text-transparent">
              Wellbeing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform analyzes your unique needs and recommends the most suitable healing modalities 
            from our comprehensive collection of time-tested practices.
          </p>
        </div>

        {/* Modalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modalities.map((modality, index) => {
            const IconComponent = modality.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-healing transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-${modality.color}/10 flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 text-${modality.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {modality.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {modality.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {modality.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-foreground/80">Key Benefits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {modality.benefits.map((benefit, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs bg-muted/50"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary/10 group-hover:border-primary/30"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-healing text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Not Sure Which Modality Is Right for You?</h3>
              <p className="mb-6 text-white/90">
                Take our AI-powered assessment to discover personalized healing recommendations 
                based on your unique needs and life circumstances.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
              >
                <Brain className="w-5 h-5 mr-2" />
                Take Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealingModalities;