import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import corporateWellness from "@/assets/corporate-wellness.jpg";
import individualWellness from "@/assets/individual-wellness.jpg";
import behaviorSystem from "@/assets/behavior-system.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-8 w-8 text-primary animate-glow-pulse" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Kosha
            </span>
            
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#market" className="text-muted-foreground hover:text-foreground transition-colors">Market</a>
            <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">Solution</a>
            <a href="#advantage" className="text-muted-foreground hover:text-foreground transition-colors">Advantage</a>
            <Button variant="cta" size="sm" onClick={() => window.open('/user-info', '_self')}>
              <Banknote className="mr-1 h-4 w-4" />
              Demo Platform
            </Button>
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
          <Badge className="mb-6 animate-fade-in-up bg-primary/10 text-primary border-primary/20">
            <Coins className="mr-2 h-4 w-4" />
            RLUSD-Native B2B Wellbeing Intelligence Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-hero bg-clip-text text-transparent">
            Human Behaviour<br />
            <span className="text-brand-relationships">Operating System</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto animate-fade-in-up">
            First blockchain-powered B2B platform turning employee wellbeing into measurable assets. 
            <span className="text-primary font-semibold">87% of corporate programs fail</span> - we solve compliance, risk assessment, and premium optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6" onClick={() => window.open('/user-info', '_self')}>
              <Database className="mr-2 h-5 w-5" />
              See Platform Demo
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LineChart className="mr-2 h-5 w-5" />
              View Market Data
            </Button>
          </div>
          
          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-brand-wellness mb-2">B2B</div>
                <div className="text-sm text-muted-foreground">Enterprise Focus</div>
              </CardContent>
            </Card>
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-brand-wealth mb-2">6:1</div>
                <div className="text-sm text-muted-foreground">Proven Wellbeing ROI</div>
              </CardContent>
            </Card>
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-brand-relationships mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Programs Fail (Poor Measurement)</div>
              </CardContent>
            </Card>
            <Card className="bg-card/10 backdrop-blur-sm border-white/10 animate-float" style={{ animationDelay: '0.9s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">150</div>
                <div className="text-sm text-muted-foreground">Countries Available</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Crisis Section */}
      <section id="market" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="destructive">
              <AlertTriangle className="mr-2 h-4 w-4" />
              The Corporate Wellbeing Crisis
            </Badge>
            <h2 className="text-4xl font-bold mb-6">$150B Lost Productivity Emergency</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              <span className="text-destructive font-semibold">Lost productivity due to absenteeism</span> related to physical and mental health 
              is expected to cross <span className="text-destructive font-semibold">USD 150 billion</span>, making wellbeing measurement a <span className="text-primary font-semibold">fiduciary duty for corporate boards</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-destructive/20 bg-destructive/5">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-destructive">Market Size Gap</h3>
              <p className="text-muted-foreground mb-4">$69B market growing to $120B by 2032</p>
              <p className="text-sm text-destructive font-medium">Yet 87% of programs fail due to poor engagement and no outcome measurement</p>
            </Card>
            
            <Card className="text-center p-8 border-destructive/20 bg-destructive/5">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-destructive">Measurement Crisis</h3>
              <p className="text-muted-foreground mb-4">No comprehensive wellbeing ROI tracking</p>
              <p className="text-sm text-destructive font-medium">Boards can't justify spending without measurable outcomes</p>
            </Card>
            
            <Card className="text-center p-8 border-destructive/20 bg-destructive/5">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-destructive">Engagement Failure</h3>
              <p className="text-muted-foreground mb-4">Fragmented solutions, poor adoption</p>
              <p className="text-sm text-destructive font-medium">Employees need holistic, not siloed approaches</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Kosha Solution Section */}
      <section id="solution" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Database className="mr-2 h-4 w-4" />
                Blockchain-Powered B2B Intelligence
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Meet <span className="bg-gradient-hero bg-clip-text text-transparent">Kosha</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                The world's first <strong>blockchain-powered B2B holistic wellbeing intelligence platform</strong> 
                addressing three critical corporate segments with RLUSD-native payments and measurable ROI.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-brand-wellness mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">HR Compliance & Governance</h4>
                    <p className="text-muted-foreground">Holistic Wellbeing Reports providing measurable wellbeing ROI for corporate governance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-brand-wealth mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Loans Risk Assessment</h4>
                    <p className="text-muted-foreground">Behavioral insights for enhanced KYC 2.0 and customer profiling</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-brand-relationships mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Insurance Optimization</h4>
                    <p className="text-muted-foreground">Dynamic wellbeing data enabling personalized premium calculations</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-sm">RLUSD Native</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Enterprise treasury-friendly settlement reducing procurement friction by 67%</p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-sm">800+ Community</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Targeting institutional DeFi adoption through measurable outcomes</p>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" onClick={() => window.open('/user-info', '_self')}>
                  <Database className="mr-2 h-5 w-5" />
                  Platform Demo
                </Button>
                <Button variant="outline" size="lg">
                  <Award className="mr-2 h-5 w-5" />
                  View Case Studies
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={behaviorSystem} 
                alt="Kosha Blockchain Wellbeing Intelligence Platform" 
                className="rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl" />
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                <Lock className="inline h-4 w-4 mr-1" />
                Blockchain Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section id="advantage" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-wealth/10 text-brand-wealth border-brand-wealth/20">
              <PieChart className="mr-2 h-4 w-4" />
              Market Opportunity & Unit Economics
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Multi-Trillion Dollar Value Capture</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Targeting three massive markets with proven enterprise value: comprehensive wellbeing intelligence across HR compliance, financial risk assessment, and insurance optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* HR Departments */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-wellness/20">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={corporateWellness} 
                  alt="HR Compliance & Governance" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-wellness opacity-20" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-brand-wellness" />
                    <Badge className="bg-brand-wellness/10 text-brand-wellness border-brand-wellness/20">Primary Market</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$120B TAM</Badge>
                </div>
                <CardTitle className="text-xl">HR Departments</CardTitle>
                <p className="text-sm text-muted-foreground">Corporate HR Managers (1000+ employees)</p>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3 mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Market Focus:</span>
                     <span className="text-brand-wellness font-bold">Enterprise B2B</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Target:</span>
                     <span className="text-brand-wellness font-bold">1000+ Employees</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">ROI:</span>
                     <span className="text-brand-wellness font-bold">Measurable</span>
                   </div>
                 </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wellness" />
                    Predictive wellbeing analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wellness" />
                    ESG compliance reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wellness" />
                    Measurable ROI for boards
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Financial Services */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-wealth/20">
              <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-wealth p-8 flex items-center justify-center">
                <CreditCard className="h-24 w-24 text-white animate-glow-pulse" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-brand-wealth" />
                    <Badge className="bg-brand-wealth/10 text-brand-wealth border-brand-wealth/20">Secondary</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$847B TAM</Badge>
                </div>
                <CardTitle className="text-xl">Financial Services</CardTitle>
                <p className="text-sm text-muted-foreground">Enhanced KYC through behavioral scoring</p>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3 mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Default Improvement:</span>
                     <span className="text-brand-wealth font-bold">23%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Market Size:</span>
                     <span className="text-brand-wealth font-bold">Global</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Implementation:</span>
                     <span className="text-brand-wealth font-bold">Scalable</span>
                   </div>
                 </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wealth" />
                    Behavioral wellbeing scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wealth" />
                    Enhanced risk profiling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-wealth" />
                    Loan default prediction
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Insurance Companies */}
            <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer border-brand-relationships/20">
              <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-relationships p-8 flex items-center justify-center">
                <Shield className="h-24 w-24 text-white animate-glow-pulse" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-brand-relationships" />
                    <Badge className="bg-brand-relationships/10 text-brand-relationships border-brand-relationships/20">Secondary</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">$1.4T TAM</Badge>
                </div>
                <CardTitle className="text-xl">Insurance Industry</CardTitle>
                <p className="text-sm text-muted-foreground">Dynamic premium calculation via wellbeing data</p>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3 mb-4">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Precision Increase:</span>
                     <span className="text-brand-relationships font-bold">31%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Data Quality:</span>
                     <span className="text-brand-relationships font-bold">Enhanced</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-medium">Premium Accuracy:</span>
                     <span className="text-brand-relationships font-bold">+31%</span>
                   </div>
                 </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-relationships" />
                    Holistic wellbeing scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-relationships" />
                    Dynamic premium calculation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-relationships" />
                    Risk assessment optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
            
          </div>
          
          {/* Competitive Advantage */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Star className="mr-2 h-4 w-4" />
                Competitive Advantage & XRPL Integration
              </Badge>
              <h3 className="text-3xl font-bold mb-6">First-Mover in On-Chain Wellbeing Outcomes</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Existing Solutions vs Kosha
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Headspace/Calm</p>
                      <p className="text-muted-foreground text-xs">Consumer-focused, no B2B compliance reporting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Fitbit/Wellness platforms</p>
                      <p className="text-muted-foreground text-xs">Single metrics, no holistic behavioral insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">Traditional assessments</p>
                      <p className="text-muted-foreground text-xs">Annual surveys, no real-time governance data</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                  <Coins className="h-5 w-5" />
                  Kosha's XRPL Advantage
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Regulatory Compliance</p>
                      <p className="text-muted-foreground text-xs">First platform for corporate ESG reporting requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Blockchain Verification</p>
                      <p className="text-muted-foreground text-xs">Immutable wellbeing records for audit requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">RLUSD Integration</p>
                      <p className="text-muted-foreground text-xs">67% reduction in procurement friction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Network Effects</p>
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
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            <Globe className="mr-2 h-4 w-4" />
            B2B Enterprise Wellbeing Intelligence Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Building the Future of<br />
            <span className="text-brand-wellness">Corporate Wellbeing Intelligence</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            First-mover advantage in corporate wellbeing intelligence with proven technology. 
            <span className="text-white font-semibold">Blockchain-native platform</span> for enterprise adoption through measurable wellbeing outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90" onClick={() => window.open('/user-info', '_self')}>
              <Database className="mr-2 h-5 w-5" />
              View Platform Demo
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Award className="mr-2 h-5 w-5" />
              View Whitepaper
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coins className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Kosha</span>
            <Badge variant="outline" className="ml-2 text-xs">Blockchain Powered</Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            World's first blockchain-powered B2B holistic wellbeing intelligence platform
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
            <span>🏆 B2B Enterprise Platform</span>
            <span>•</span>
            <span>💎 Blockchain Native</span>
            <span>•</span>
            <span>📊 Global Scalability</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Kosha. All rights reserved. | 
            <a href="https://kosha.health" className="text-primary hover:underline ml-1">kosha.health</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
