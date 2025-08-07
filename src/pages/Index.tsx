import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HealingModalities from "@/components/HealingModalities";
import HowItWorks from "@/components/HowItWorks";
import HealerProfiles from "@/components/HealerProfiles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HealingModalities />
        <HowItWorks />
        <HealerProfiles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
