
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RegistrationSection from "@/components/RegistrationSection";
import VolunteerSection from "@/components/VolunteerSection";
import VolunteerRegistrationSection from "@/components/VolunteerRegistrationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <RegistrationSection />
      <VolunteerRegistrationSection />
      <ContactSection />
    </div>
  );
};

export default Index;
