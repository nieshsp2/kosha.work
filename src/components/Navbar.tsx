import { Button } from "@/components/ui/button";
import { Menu, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-healing bg-clip-text text-transparent">
              HealSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#modalities" className="text-foreground hover:text-primary transition-colors">
              Healing Modalities
            </a>
            <a href="#healers" className="text-foreground hover:text-primary transition-colors">
              Find Healers
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button className="bg-gradient-healing hover:shadow-healing" onClick={() => navigate(user ? '/start' : '/auth')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Start Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border border-border rounded-lg mt-2">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#modalities" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Healing Modalities
              </a>
              <a href="#healers" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                Find Healers
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" className="w-full" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-healing" onClick={() => navigate(user ? '/start' : '/auth')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;