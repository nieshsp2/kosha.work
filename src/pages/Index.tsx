import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KoshaLogo from "@/components/KoshaLogo";
import { 
  Brain, 
  TrendingUp, 
  Heart, 
  Users, 
  Building2, 
  Smartphone, 
  GraduationCap, 
  DollarSign,
  Play,
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  Shield,
  Sparkles,
  Coins,
  LineChart,
  Database,
  Lock,
  Globe,
  Award,
  Briefcase,
  TrendingDown,
  AlertTriangle,
  Star,
  Banknote,
  CreditCard,
  PieChart
} from "lucide-react";

// Import the generated images
import hwrHero from "@/assets/hwr-hero.jpg";

import individualWellness from "@/assets/individual-wellness.jpg";
import behaviorSystem from "@/assets/behavior-system.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2">
            <KoshaLogo size="lg" />
          </div>
          
          {/* Center section - Navigation items */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">Solution</a>
            <a href="#advantage" className="text-muted-foreground hover:text-foreground transition-colors">Advantage</a>
            <Button variant="cta" size="sm" className="cursor-pointer hover:opacity-90 transition-opacity">
              <Heart className="mr-1 h-4 w-4" />
              Wellbeing Dashboard
            </Button>
          </div>
          
          {/* Right section - Empty for balance */}
          <div className="flex items-center gap-2">
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20" />
        <img 
          src={hwrHero} 
          alt="Human Behavior Operating System Visualization" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in-up bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Holistic Wellbeing<br />
            <span className="text-brand-relationships">Intelligence Platform</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-4xl mx-auto animate-fade-in-up leading-relaxed px-2">
            First blockchain-powered B2B platform turning employee wellbeing into measurable assets. 
            <span className="text-primary font-semibold"> 87% of the comprehensive employee wellbeing programs fail</span> due to poor or no outcome measurement and engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in-up px-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-pulse-slow hover:animate-none" 
              onClick={() => window.open('/user-info', '_self')}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
                     {/* Shimmer effect */}
       <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center">
                <Target className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-bounce" />
                <span className="font-bold">Take Your Holistic Assessment</span>
              </div>
            </Button>
          </div>
          
          {/* Market Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 max-w-6xl mx-auto px-2">
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-wellness mb-2">B2B</div>
                <div className="text-xs md:text-sm text-muted-foreground">Enterprise Focus</div>
              </CardContent>
            </Card>

            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-relationships mb-2">87%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Programs Fail (Poor Measurement)</div>
              </CardContent>
            </Card>
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float sm:col-span-2 md:col-span-1" style={{ animationDelay: '0.9s' }}>
              <CardContent className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">150</div>
                <div className="text-xs md:text-sm text-muted-foreground">Countries Available</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Crisis Section */}
      <section id="market" className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 md:mb-4" variant="destructive">
              <AlertTriangle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">The Corporate Wellbeing Crisis</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">$120B Lost Productivity Emergency</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
              <span className="text-destructive font-semibold">Lost productivity due to absenteeism</span> related to physical and mental health 
              is expected to cross <span className="text-destructive font-semibold">USD 120 billion by 2032</span>, making wellbeing measurement a <span className="text-primary font-semibold">fiduciary duty for corporate boards</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
            <Card className="text-center p-4 md:p-8 border-destructive/20 bg-destructive/5">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingDown className="h-6 w-6 md:h-8 md:w-8 text-destructive" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-destructive">Market Size Gap</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">$69B market growing to $120B by 2032</p>
              <p className="text-xs md:text-sm text-destructive font-medium">Yet 87% of programs fail due to poor engagement and no outcome measurement</p>
            </Card>
            
            <Card className="text-center p-4 md:p-8 border-destructive/20 bg-destructive/5">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-destructive">Measurement Crisis</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">No comprehensive wellbeing ROI tracking</p>
              <p className="text-xs md:text-sm text-destructive font-medium">Boards can't justify spending without measurable outcomes</p>
            </Card>
            
            <Card className="text-center p-4 md:p-8 border-destructive/20 bg-destructive/5 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-destructive" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-destructive">Engagement Failure</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">Fragmented solutions, poor adoption</p>
              <p className="text-xs md:text-sm text-destructive font-medium">Employees need holistic, not siloed approaches</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Kosha Solution Section */}
      <section id="solution" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
                <Database className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Blockchain-Powered B2B Intelligence</span>
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                Meet <span className="bg-gradient-hero bg-clip-text text-transparent">Kosha</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                The world's first <strong>blockchain-powered B2B holistic wellbeing intelligence platform </strong> 
                addressing three critical corporate segments with RLUSD-native payments and measurable ROI.
              </p>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-brand-wellness mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">HR Compliance & Governance</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Holistic Wellbeing Reports providing measurable wellbeing ROI for corporate governance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-brand-wealth mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">Loans Risk Assessment</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Behavioral insights for enhanced KYC 2.0 and to provide customised financial services</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-brand-relationships mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">Insurance Optimization</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Dynamic wellbeing data enabling personalized premium calculations</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <Card className="p-3 md:p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="font-semibold text-xs md:text-sm">RLUSD Native</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Enterprise treasury-friendly settlement reducing procurement friction by 67%</p>
                </Card>
                <Card className="p-3 md:p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="font-semibold text-xs md:text-sm">5 Corporates</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Piloting institutional DeFi adoption through measurable outcomes</p>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button variant="cta" size="lg" className="text-sm md:text-base px-4 md:px-6 py-2 md:py-3" onClick={() => window.open('/user-info', '_self')}>
                  <Database className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Your Holistic Wellbeing Report
                </Button>
                <Button variant="outline" size="lg" className="text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                  <Award className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  View Case Studies
                </Button>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <img 
                src={behaviorSystem} 
                alt="Kosha Blockchain Wellbeing Intelligence Platform" 
                className="rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl animate-float w-full"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-xl md:rounded-2xl" />
              <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-primary/90 text-primary-foreground px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                <Lock className="inline h-3 w-3 md:h-4 md:w-4 mr-1" />
                Blockchain Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section id="advantage" className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <Badge className="mb-3 md:mb-4 bg-brand-wealth/10 text-brand-wealth border-brand-wealth/20">
              <PieChart className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Market Opportunity & Unit Economics</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">Multi-Trillion Dollar Value Capture</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
              Targeting three massive markets with proven enterprise value: comprehensive wellbeing intelligence across HR compliance, financial risk assessment, and insurance optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            {/* HR Departments */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-wellness/20">
              <div className="relative h-32 md:h-48 overflow-hidden rounded-t-lg bg-gradient-wellness p-4 md:p-8 flex items-center justify-center">
                <Users className="h-16 w-16 md:h-24 md:w-24 text-white animate-glow-pulse" />
              </div>
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 md:h-6 md:w-6 text-brand-wellness" />
                    <Badge className="bg-brand-wellness/10 text-brand-wellness border-brand-wellness/20 text-xs">Primary Market</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$120B TAM</Badge>
                </div>
                <CardTitle className="text-lg md:text-xl">HR Departments</CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground">Corporate HR Managers (1000+ employees)</p>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                 <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Market Focus:</span>
                     <span className="text-brand-wellness font-bold text-xs md:text-sm">Enterprise B2B</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Target:</span>
                     <span className="text-brand-wellness font-bold text-xs md:text-sm">1000+ Employees</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">ROI:</span>
                     <span className="text-brand-wellness font-bold text-xs md:text-sm">Measurable</span>
                   </div>
                 </div>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wellness flex-shrink-0" />
                    Predictive wellbeing analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wellness flex-shrink-0" />
                    ESG compliance reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wellness flex-shrink-0" />
                    Measurable ROI for boards
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Financial Services */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-wealth/20">
              <div className="relative h-32 md:h-48 overflow-hidden rounded-t-lg bg-gradient-wealth p-4 md:p-8 flex items-center justify-center">
                <CreditCard className="h-16 w-16 md:h-24 md:w-24 text-white animate-glow-pulse" />
              </div>
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 md:h-6 md:w-6 text-brand-wealth" />
                    <Badge className="bg-brand-wealth/10 text-brand-wealth border-brand-wealth/20 text-xs">Secondary</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$847B TAM</Badge>
                </div>
                <CardTitle className="text-lg md:text-xl">Financial Services</CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground">Customised KYC through behavioral scoring</p>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                 <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Default Improvement:</span>
                     <span className="text-brand-wealth font-bold text-xs md:text-sm">23%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Market Size:</span>
                     <span className="text-brand-wealth font-bold text-xs md:text-sm">Global</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Implementation:</span>
                     <span className="text-brand-wealth font-bold text-xs md:text-sm">Scalable</span>
                   </div>
                 </div>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wealth flex-shrink-0" />
                    Behavioral wellbeing scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wealth flex-shrink-0" />
                    Enhanced risk profiling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-wealth flex-shrink-0" />
                    Loan default prediction
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Insurance Companies */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-relationships/20 sm:col-span-2 md:col-span-1">
              <div className="relative h-32 md:h-48 overflow-hidden rounded-t-lg bg-gradient-relationships p-4 md:p-8 flex items-center justify-center">
                <Shield className="h-16 w-16 md:h-24 md:w-24 text-white animate-glow-pulse" />
              </div>
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 md:h-6 md:w-6 text-brand-relationships" />
                    <Badge className="bg-brand-relationships/10 text-brand-relationships border-brand-relationships/20 text-xs">Secondary</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$1.4T TAM</Badge>
                </div>
                <CardTitle className="text-lg md:text-xl">Insurance Industry</CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground">Dynamic premium calculation via wellbeing data</p>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                 <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Precision Increase:</span>
                     <span className="text-brand-relationships font-bold text-xs md:text-sm">31%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Data Quality:</span>
                     <span className="text-brand-relationships font-bold text-xs md:text-sm">Enhanced</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs md:text-sm font-medium">Premium Accuracy:</span>
                     <span className="text-brand-relationships font-bold text-xs md:text-sm">+31%</span>
                   </div>
                 </div>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-relationships flex-shrink-0" />
                    Holistic wellbeing scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-relationships flex-shrink-0" />
                    Dynamic premium calculation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-brand-relationships flex-shrink-0" />
                    Risk assessment optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
            
          </div>
          
          {/* Competitive Advantage */}
          <div className="mt-12 md:mt-20">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20">
                <Star className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Competitive Advantage & XRPL Integration</span>
              </Badge>
              <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">First-Mover in On-Chain Wellbeing Outcomes</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <Card className="p-4 md:p-6">
                <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                  <Database className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Existing Solutions vs Kosha
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-xs md:text-sm">Headspace/Calm</p>
                      <p className="text-muted-foreground text-xs">Consumer-focused, no B2B compliance reporting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-xs md:text-sm">Fitbit/Wellness platforms</p>
                      <p className="text-muted-foreground text-xs">Single metrics, no holistic behavioral insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-xs md:text-sm">Traditional assessments</p>
                      <p className="text-muted-foreground text-xs">Annual surveys, no real-time governance data</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 md:p-6 border-primary/20 bg-primary/5">
                <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2 text-primary">
                  <Coins className="h-4 w-4 md:h-5 md:w-5" />
                  Kosha's XRPL Advantage
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs md:text-sm">Regulatory Compliance</p>
                      <p className="text-muted-foreground text-xs">First platform for corporate ESG reporting requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs md:text-sm">Blockchain Verification</p>
                      <p className="text-muted-foreground text-xs">Immutable wellbeing records for audit requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs md:text-sm">RLUSD Integration</p>
                      <p className="text-muted-foreground text-xs">67% reduction in procurement friction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs md:text-sm">Network Effects</p>
                      <p className="text-muted-foreground text-xs">More data = better models = higher value partnerships</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Building the Future of<br />
            <span className="text-brand-wellness">Corporate Wellbeing Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            First-mover advantage in corporate wellbeing intelligence with proven technology. 
            <span className="text-white font-semibold"> Blockchain-native platform</span> for enterprise adoption through measurable wellbeing outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button variant="secondary" size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-white/90 w-full sm:w-auto" onClick={() => window.open('/user-info', '_self')}>
              <Database className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              View Your Holistic Wellbeing Report
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <KoshaLogo size="md" />
            <Badge variant="outline" className="ml-2 text-xs">Blockchain Powered</Badge>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 px-2">
            World's first blockchain-powered B2B holistic wellbeing intelligence platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            <span>🏆 B2B Enterprise Platform</span>
            <span className="hidden sm:inline">•</span>
            <span>💎 Blockchain Native</span>
            <span className="hidden sm:inline">•</span>
            <span>📊 Global Scalability</span>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm">
            © 2024 Kosha. All rights reserved. | 
            <a href="https://kosha.work" className="text-primary hover:underline ml-1">kosha.work</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
