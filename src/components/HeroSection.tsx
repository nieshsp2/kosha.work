import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Brain, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-meditation.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartJourney = () => {
    if (user) {
      navigate('/start');
    } else {
      navigate('/auth');
    }
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-peaceful">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Peaceful meditation and healing" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-chakra-heart/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-chakra-throat/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-chakra-crown/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Holistic Wellness Platform
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your Life with{" "}
            <span className="bg-gradient-healing bg-clip-text text-transparent">
              Holistic Healing
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover personalized healing paths through AI-powered assessments and connect with verified healers worldwide. 
            Address your health, wealth, and relationship challenges holistically.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm bg-card/50 backdrop-blur px-4 py-2 rounded-full border border-border">
              <Brain className="w-4 h-4 text-primary" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center gap-2 text-sm bg-card/50 backdrop-blur px-4 py-2 rounded-full border border-border">
              <Heart className="w-4 h-4 text-healing" />
              Verified Healers
            </div>
            <div className="flex items-center gap-2 text-sm bg-card/50 backdrop-blur px-4 py-2 rounded-full border border-border">
              <Zap className="w-4 h-4 text-chakra-crown" />
              Multiple Modalities
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-healing hover:shadow-healing animate-pulse-glow px-8 py-6 text-lg"
              onClick={handleStartJourney}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Healing Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg"
            >
              Explore Modalities
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-sm text-muted-foreground">
            <p>Trusted by 10,000+ seekers worldwide • 500+ verified healers • 15+ healing modalities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;