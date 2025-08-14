import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, AlertTriangle, BarChart3, Brain, Target, Users, Building2, GraduationCap, Heart, TrendingUp, CheckCircle, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroImage from "@/assets/hwr-hero.jpg";
import behaviorSystemImage from "@/assets/behavior-system.jpg";
import corporateWellnessImage from "@/assets/corporate-wellness.jpg";
import individualWellnessImage from "@/assets/individual-wellness.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/start');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Human Behavior Operating System Visualization" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Floating Particles - matching the original exactly */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge with rocket icon */}
            <Badge className="mb-8 bg-black/30 text-white border border-gray-600 hover:bg-black/40 px-6 py-2 text-base backdrop-blur-sm">
              <Rocket className="w-4 h-4 mr-2" />
              🚀 The World's First Human Behavior Operating System
            </Badge>

            {/* Main Heading with exact gradient colors */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Break Free from the{" "}
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Performance Death Spiral
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              73% of professionals are stuck in cascading failures across health, wealth, and relationships. 
              HWR architechts solutions instead of just tracking symptoms.
            </p>

            {/* CTA Button with gradient background exactly like original */}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold mb-16 shadow-2xl border-0"
              onClick={handleStartAssessment}
            >
              <Play className="w-5 h-5 mr-3" />
              Start Your HWR Assessment
            </Button>

            {/* Stats Cards - exactly matching the original layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold text-green-400 mb-3">73%</div>
                  <div className="text-gray-300 text-lg">Professionals in Death Spirals</div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">3x</div>
                  <div className="text-gray-300 text-lg">Faster Problem Resolution</div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold text-purple-400 mb-3">360°</div>
                  <div className="text-gray-300 text-lg">Holistic Behavior Analysis</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-8 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              ⚠️ The Crisis
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              The Distributed System Failure
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Current wellness solutions are like trying to fix a car by only checking the oil. 
              They're fragmented apps tracking symptoms while the real problems cascade through your entire life system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-gray-800/50 border border-red-500/30">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-red-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-white">Wealth Stress</h3>
                  <p className="text-gray-300">Financial pressure creates cortisol spikes that sabotage decision-making and relationships</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-orange-500/30">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 text-orange-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-white">Health Decline</h3>
                  <p className="text-gray-300">Poor health impacts earning potential and strains personal relationships</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-yellow-500/30">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-white">Relationship Breakdown</h3>
                  <p className="text-gray-300">Isolation reduces support systems needed for career growth and health maintenance</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg"
                onClick={handleStartAssessment}
              >
                Break the Cycle with HWR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is HWR Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-8 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2">
              Revolutionary Technology
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              What is a HWR?
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Your <strong className="text-white">Holistic Well-being Report</strong> that assesses your health, wealth, and relationships through the lens of behavioral science. 
              It's not just another wellness app—it's your personal Human Behavior Operating System.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-gray-800/50 border border-blue-500/30">
                <CardContent className="p-6">
                  <Brain className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="text-lg font-bold mb-3 text-white">Behavioral Pattern Analysis</h4>
                  <p className="text-gray-300">Deep-dive into your decision-making patterns and behavioral triggers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-green-500/30">
                <CardContent className="p-6">
                  <Target className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="text-lg font-bold mb-3 text-white">Customized Action Plans</h4>
                  <p className="text-gray-300">Personalized recommendations based on your unique behavioral profile</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-purple-500/30">
                <CardContent className="p-6">
                  <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-lg font-bold mb-3 text-white">Systemic Integration</h4>
                  <p className="text-gray-300">See how your health, wealth, and relationships interconnect and influence each other</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
                onClick={handleStartAssessment}
              >
                Start HWR Assessment
              </Button>
            </div>

            <div className="text-center">
              <img 
                src={behaviorSystemImage} 
                alt="Human Behavior Operating System Visualization" 
                className="w-full max-w-4xl mx-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Transforms Section */}
      <section id="clients" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
              Who Transforms with HWR?
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 text-center leading-relaxed">
              From Fortune 500 companies to individuals seeking breakthrough performance, 
              HWR serves anyone ready to architect their human behavior system.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Enterprise Solutions */}
              <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-blue-500/30">
                  <CardContent className="p-8">
                    <img src={corporateWellnessImage} alt="Corporate Wellness Programs" className="w-full h-48 object-cover rounded-lg mb-6" />
                    <Badge className="mb-4 bg-blue-500/20 text-blue-400 border border-blue-500/30">Enterprise</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Corporate Wellness Programs</h3>
                    <p className="text-gray-300 mb-6">
                      Enhance employee holistic wellness, reduce burnout, and boost productivity through behavioral insights and personalized wellness strategies.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Reduce healthcare costs by 30%
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Increase productivity by 25%
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Improve employee retention
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-purple-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-400 border border-purple-500/30">Dating Tech</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Dating App Integration</h3>
                    <p className="text-gray-300 mb-6">
                      Provide comprehensive behavioral matching and differentiate in the crowded dating market with deeper compatibility insights.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Behavioral compatibility scoring
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Deeper user insights
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Higher match success rates
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-green-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30">FinTech</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Financial Services</h3>
                    <p className="text-gray-300 mb-6">
                      Gain deep customer behavioral insights for better risk assessment, personalized financial products, and improved customer relationships.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Enhanced risk profiling
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Personalized financial advice
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Improved customer retention
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Individual & Research Solutions */}
              <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-yellow-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Education</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Educational Institutions</h3>
                    <p className="text-gray-300 mb-6">
                      Enhance student self-awareness and life skills through behavioral insights, preparing them for success in all life domains.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Student self-awareness programs
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Career readiness assessment
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mental health support
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-red-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-red-500/20 text-red-400 border border-red-500/30">Research</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Longevity & Health Tech Research</h3>
                    <p className="text-gray-300 mb-6">
                      Access unprecedented data correlations between health, wealth, and relationships for groundbreaking longevity and health technology research.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Large-scale behavioral data
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Cross-domain correlations
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Longitudinal studies
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-pink-500/30">
                  <CardContent className="p-8">
                    <img src={individualWellnessImage} alt="Individual Wellness Journey" className="w-full h-48 object-cover rounded-lg mb-6" />
                    <Badge className="mb-4 bg-pink-500/20 text-pink-400 border border-pink-500/30">Personal</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Individual Optimization</h3>
                    <p className="text-gray-300 mb-6">
                      Transform your life with personalized insights and actionable recommendations for holistic wellbeing and peak performance.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Personalized action plans
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Behavioral breakthrough insights
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Life optimization strategies
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Architect Your Human Behavior System?
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands who've broken free from the performance death spiral and designed their optimal life system.
            </p>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold shadow-2xl"
              onClick={handleStartAssessment}
            >
              <Play className="w-6 h-6 mr-3" />
              Start Your HWR Assessment Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;