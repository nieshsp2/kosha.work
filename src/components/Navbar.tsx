import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-xl font-bold hover:opacity-80 transition-opacity"
            >
              <span className="bg-gradient-hero bg-clip-text text-transparent">Kosha</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">
              Solution
            </a>
            <a href="#advantage" className="text-muted-foreground hover:text-foreground transition-colors">
              Advantage
            </a>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-semibold ml-2">
              Wellbeing Dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border border-border rounded-lg mt-2">
              <a href="#solution" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Solution
              </a>
              <a href="#advantage" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Advantage
              </a>
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Wellbeing Dashboard
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