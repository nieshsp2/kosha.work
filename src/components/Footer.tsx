import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Sparkles
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Kosha
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
              First blockchain-powered B2B platform turning employee wellbeing into measurable assets. 
              Enterprise-grade holistic wellness intelligence for modern organizations.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Services</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Enterprise Wellbeing</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">AI Assessment</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Risk Analysis</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">ROI Analytics</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Compliance Tools</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Global Deployment</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Platform</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Authenticate</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Contact</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                <span>enterprise@kosha.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span>+91 (80) 4040-2030</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                <span>Bangalore, India</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-white mb-3 text-sm">Enterprise Solutions</h4>
              <Button variant="outline" size="sm" className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 md:pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs md:text-sm text-gray-400">
              <span>© 2025 Kosha Technologies. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
              <span>Enabling sustainability and trust</span>
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span>in enterprise wellness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;