import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RegistrationSection from "@/components/RegistrationSection";
import VolunteerSection from "@/components/VolunteerSection";
import EventDetails from "@/components/EventDetails";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <RegistrationSection />
      <VolunteerSection />
      <EventDetails />
      <ContactSection />
    </div>
  );
};

export default Index;
