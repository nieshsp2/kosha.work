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
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-healing bg-clip-text text-transparent">
                HealSpace
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transforming lives through AI-powered holistic wellness solutions. 
              Connect with verified healers worldwide and discover your path to healing.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="hover:bg-primary/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary/10">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Find Healers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Healing Modalities</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Assessment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Group Sessions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Workshops</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Progress Tracking</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@healspace.global</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Join Our Healers Network</h4>
              <Button variant="outline" size="sm" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Become a Healer
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>© 2025 HealSpace. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-healing" />
            <span>for holistic wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;