
import { Button } from "@/components/ui/button";
import { Mountain, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/kailashgiribetta-hero.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Sacred Greeting */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-sunrise bg-clip-text text-transparent">
            JAI BHOLENATH!
          </h1>
          <div className="w-24 h-1 bg-gradient-sacred mx-auto mb-4"></div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Join the Sacred
          <span className="block text-saffron">Kanwariya Yatra</span>
          to Kailashgiribetta
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
          Experience the first-ever Kanwariya Yatra in South India. 
          A divine pilgrimage to the sacred Shiva Cave Temple at Kailashgiribetta.
        </p>

        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Calendar className="h-8 w-8 text-saffron mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Date</h3>
            <p className="text-gray-200">July 26, 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <MapPin className="h-8 w-8 text-saffron mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Starting Point</h3>
            <p className="text-gray-200">Narayanhalli Cross</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Mountain className="h-8 w-8 text-saffron mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Destination</h3>
            <p className="text-gray-200">Kailasagiri Guhanthaara Devalaya, Dakshina Kailasa Kshethra</p>
          </div>
        </div>

        {/* Duration Banner */}
        <div className="bg-gradient-divine rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">Sacred Duration</h3>
          <p className="text-xl">Shravanmasa</p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register-participant">
            <Button 
              variant="divine" 
              size="lg" 
              className="text-lg px-8 py-4"
            >
              <Users className="mr-2 h-5 w-5" />
              Register as Participant
            </Button>
          </Link>
          <Link to="/register-volunteer">
            <Button 
              variant="sacred" 
              size="lg" 
              className="text-lg px-8 py-4"
            >
              <Mountain className="mr-2 h-5 w-5" />
              Volunteer for Yatra
            </Button>
          </Link>
        </div>

        {/* Sacred Chant */}
        <div className="mt-12 text-2xl font-bold text-saffron">
          HAR HAR MAHADEV! • BOL BAM!
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
