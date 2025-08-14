import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Building2, TrendingUp, CheckCircle, Play, Eye, User, Shield, DollarSign, Users, Briefcase, BookOpen, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroImage from "@/assets/hwr-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleStartDemo = () => {
    navigate('/user-info');
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
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-green-900/40 to-black/80"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <Badge className="mb-8 bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-2 text-base backdrop-blur-sm">
              🧬 RLUSD-Native B2B Wellbeing Intelligence Platform
            </Badge>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Human Behaviour{" "}
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              First blockchain-powered B2B platform turning employee wellbeing into measurable assets.{" "}
              <span className="text-green-400 font-semibold">87% of corporate programs fail</span> - we solve 
              compliance, risk assessment, and premium optimization.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="default" 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base font-medium transition-all duration-300 hover:scale-[1.02] animate-pulse-glow"
                onClick={handleStartDemo}
              >
                <Eye className="w-4 h-4 mr-2" />
                See Platform Demo
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">B2B</div>
                  <div className="text-gray-300 text-xs md:text-sm">Enterprise Focus</div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">6:1</div>
                  <div className="text-gray-300 text-xs md:text-sm">Proven Wellbeing ROI</div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-2">87%</div>
                  <div className="text-gray-300 text-xs md:text-sm">Programs Fail (Poor Measurement)</div>
                </CardContent>
              </Card>
              <Card className="bg-black/30 border border-gray-700 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">150</div>
                  <div className="text-gray-300 text-xs md:text-sm">Countries Available</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Wellbeing Crisis Section */}
      <section id="market" className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              The Corporate Wellbeing Crisis
            </h2>
            
            <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-8 text-red-400">
              $150B Lost Productivity Emergency
            </h3>
            
            <p className="text-lg md:text-xl text-gray-300 mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed">
              Lost productivity due to absenteeism related to physical and mental health is expected to cross USD 150 billion, 
              making wellbeing measurement a fiduciary duty for corporate boards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              <Card className="bg-gray-800/50 border border-red-500/30 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6">
                  <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-red-400 mb-4 mx-auto" />
                  <h4 className="text-lg md:text-xl font-bold mb-3 text-white">Market Size Gap</h4>
                  <p className="text-gray-300 mb-4 text-sm md:text-base">$69B market growing to $120B by 2032</p>
                  <p className="text-xs md:text-sm text-red-400">Yet 87% of programs fail due to poor engagement and no outcome measurement</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-orange-500/30 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6">
                  <BarChart3 className="w-6 md:w-8 h-6 md:h-8 text-orange-400 mb-4 mx-auto" />
                  <h4 className="text-lg md:text-xl font-bold mb-3 text-white">Measurement Crisis</h4>
                  <p className="text-gray-300 mb-4 text-sm md:text-base">No comprehensive wellbeing ROI tracking</p>
                  <p className="text-xs md:text-sm text-orange-400">Boards can't justify spending without measurable outcomes</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-yellow-500/30 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
                <CardContent className="p-4 md:p-6">
                  <Users className="w-6 md:w-8 h-6 md:h-8 text-yellow-400 mb-4 mx-auto" />
                  <h4 className="text-lg md:text-xl font-bold mb-3 text-white">Engagement Failure</h4>
                  <p className="text-gray-300 mb-4 text-sm md:text-base">Fragmented solutions, poor adoption</p>
                  <p className="text-xs md:text-sm text-yellow-400">Employees need holistic, not siloed approaches</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              onClick={handleStartDemo}
            >
              See Kosha's Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Kosha Section */}
      <section id="solution" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-8 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 mx-auto block w-fit">
              Blockchain-Powered B2B Intelligence
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
              Meet Kosha
            </h2>
            
            <p className="text-xl text-gray-300 mb-16 text-center leading-relaxed max-w-4xl mx-auto">
              The world's first <strong className="text-white">blockchain-powered B2B holistic wellbeing intelligence platform</strong> addressing 
              three critical corporate segments with RLUSD-native payments and measurable ROI.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="bg-gray-800/50 border border-blue-500/30">
                <CardContent className="p-8 text-center">
                  <Shield className="w-12 h-12 text-blue-400 mb-6 mx-auto" />
                  <h4 className="text-xl font-bold mb-4 text-white">HR Compliance & Governance</h4>
                  <p className="text-gray-300">Holistic Wellbeing Reports providing measurable wellbeing ROI for corporate governance</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-green-500/30">
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-12 h-12 text-green-400 mb-6 mx-auto" />
                  <h4 className="text-xl font-bold mb-4 text-white">Loans Risk Assessment</h4>
                  <p className="text-gray-300">Behavioral insights for enhanced KYC 2.0 and customer profiling</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border border-purple-500/30">
                <CardContent className="p-8 text-center">
                  <Activity className="w-12 h-12 text-purple-400 mb-6 mx-auto" />
                  <h4 className="text-xl font-bold mb-4 text-white">Insurance Premium Optimization</h4>
                  <p className="text-gray-300">Data-driven insights for accurate risk assessment and premium calculations</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
                onClick={handleStartDemo}
              >
                <Eye className="w-5 h-5 mr-3" />
                Platform Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kosha Advantage Section */}
      <section id="advantage" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              The Kosha Advantage
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-green-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30">Blockchain Native</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">RLUSD Payment Integration</h3>
                    <p className="text-gray-300 mb-6">
                      First platform to offer seamless RLUSD payments for enterprise wellbeing services, ensuring transparent and efficient transactions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Instant settlement with RLUSD
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Transparent pricing model
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Global accessibility
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-blue-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-blue-500/20 text-blue-400 border border-blue-500/30">B2B Focus</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Enterprise-Grade Analytics</h3>
                    <p className="text-gray-300 mb-6">
                      Designed specifically for corporate environments with advanced security, compliance, and integration capabilities.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        SOC 2 Type II compliance
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        API-first architecture
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        White-label solutions
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-purple-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-400 border border-purple-500/30">Proven ROI</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">Measurable Business Impact</h3>
                    <p className="text-gray-300 mb-6">
                      Track and quantify the financial impact of wellbeing initiatives with comprehensive ROI analytics and reporting.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        6:1 average ROI demonstrated
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Real-time impact tracking
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Custom KPI dashboards
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border border-yellow-500/30">
                  <CardContent className="p-8">
                    <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Global Reach</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">150 Countries Available</h3>
                    <p className="text-gray-300 mb-6">
                      Comprehensive global deployment with localized insights and cultural adaptations for multinational enterprises.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Multi-language support
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Cultural customization
                      </li>
                      <li className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Local compliance ready
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold"
                onClick={handleStartDemo}
              >
                Start Your Enterprise Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;