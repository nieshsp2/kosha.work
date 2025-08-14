import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-white">
              <span className="text-green-400">Kosha</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#market" className="text-gray-300 hover:text-white transition-colors">
              Market
            </a>
            <a href="#solution" className="text-gray-300 hover:text-white transition-colors">
              Solution
            </a>
            <a href="#advantage" className="text-gray-300 hover:text-white transition-colors">
              Advantage
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 font-semibold"
              onClick={() => navigate('/user-info')}
            >
              Demo Platform
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border border-gray-800 rounded-lg mt-2">
              <a href="#market" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Market
              </a>
              <a href="#solution" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Solution
              </a>
              <a href="#advantage" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Advantage
              </a>
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate('/user-info')}
                >
                  Demo Platform
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