import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  Heart,
  Award,
  Globe
} from "lucide-react";

const healers = [
  {
    name: "Dr. Priya Sharma",
    title: "Reiki Master & Energy Healer",
    location: "Mumbai, India",
    rating: 4.9,
    reviews: 234,
    sessions: 1500,
    specialties: ["Reiki", "Chakra Healing", "Energy Balancing"],
    languages: ["English", "Hindi", "Marathi"],
    experience: "12 years",
    price: "$60-80",
    avatar: "PS",
    verified: true,
    description: "Certified Reiki Master with extensive experience in energy healing and chakra balancing."
  },
  {
    name: "Michael Chen",
    title: "NLP Practitioner & Life Coach",
    location: "Singapore",
    rating: 4.8,
    reviews: 189,
    sessions: 890,
    specialties: ["NLP", "Hypnotherapy", "Goal Achievement"],
    languages: ["English", "Mandarin", "Cantonese"],
    experience: "8 years",
    price: "$80-120",
    avatar: "MC",
    verified: true,
    description: "Expert NLP practitioner helping clients overcome limiting beliefs and achieve their goals."
  },
  {
    name: "Sarah Williams",
    title: "Sound Therapist & Meditation Guide",
    location: "London, UK",
    rating: 4.9,
    reviews: 156,
    sessions: 750,
    specialties: ["Sound Therapy", "Meditation", "Stress Relief"],
    languages: ["English", "French"],
    experience: "10 years",
    price: "$70-90",
    avatar: "SW",
    verified: true,
    description: "Certified sound therapist using Tibetan bowls and guided meditation for deep healing."
  },
  {
    name: "Carlos Rodriguez",
    title: "Past Life Regression Therapist",
    location: "Mexico City, Mexico",
    rating: 4.7,
    reviews: 98,
    sessions: 420,
    specialties: ["Past Life Regression", "Spiritual Healing", "Soul Therapy"],
    languages: ["Spanish", "English"],
    experience: "15 years",
    price: "$90-130",
    avatar: "CR",
    verified: true,
    description: "Experienced therapist specializing in past life regression and spiritual healing journeys."
  },
  {
    name: "Dr. Anjali Patel",
    title: "Ayurvedic Healer & Nutritionist",
    location: "Pune, India",
    rating: 4.8,
    reviews: 167,
    sessions: 980,
    specialties: ["Ayurveda", "Nutrition", "Holistic Wellbeing"],
    languages: ["English", "Hindi", "Gujarati"],
    experience: "18 years",
    price: "$50-70",
    avatar: "AP",
    verified: true,
    description: "Ayurvedic doctor combining ancient wisdom with modern nutrition for holistic healing."
  },
  {
    name: "Emma Thompson",
    title: "Breathwork & Trauma Specialist",
    location: "Sydney, Australia",
    rating: 4.9,
    reviews: 143,
    sessions: 620,
    specialties: ["Breathwork", "Trauma Healing", "EMDR"],
    languages: ["English"],
    experience: "9 years",
    price: "$85-110",
    avatar: "ET",
    verified: true,
    description: "Trauma-informed breathwork specialist helping clients release stored emotional pain."
  }
];

const HealerProfiles = () => {
  return (
    <section id="healers" className="py-20 bg-gradient-peaceful">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-healing/10 text-healing border-healing/20">
            <Users className="w-4 h-4 mr-2" />
            Our Healers
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Connect with{" "}
            <span className="bg-gradient-healing bg-clip-text text-transparent">
              Verified Healers
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our global network of certified healers undergoes rigorous vetting and continuous training 
            to provide you with the highest quality holistic wellbeing experiences.
          </p>
        </div>

        {/* Healers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {healers.map((healer, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-healing transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="" alt={healer.name} />
                      <AvatarFallback className="bg-gradient-healing text-white font-semibold">
                        {healer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {healer.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-healing rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {healer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{healer.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{healer.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating & Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{healer.rating}</span>
                    <span className="text-muted-foreground">({healer.reviews})</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">{healer.sessions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{healer.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {healer.description}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="text-xs font-medium mb-2 text-foreground/80">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {healer.specialties.map((specialty, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages & Price */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>{healer.languages.join(", ")}</span>
                  </div>
                  <span className="font-medium text-foreground">{healer.price}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-healing hover:shadow-healing"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Book Session
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-healing/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Can't Find the Right Healer?</h3>
              <p className="text-muted-foreground mb-6">
                Let our AI-powered matching system find the perfect healer for your specific needs and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-healing">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get AI Recommendations
                </Button>
                <Button size="lg" variant="outline">
                  Browse All Healers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealerProfiles;