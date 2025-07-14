import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Star, Droplet, Church } from "lucide-react";

const AboutSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Bring Blessings Home",
      description: "Experience the divine grace of Lord Shiva by offering sacred water at our very own Kailashgiribetta."
    },
    {
      icon: Church,
      title: "Strengthen Our Spiritual Fabric",
      description: "Revive ancient traditions and foster a deeper connection to Hindu Dharma within our community."
    },
    {
      icon: Globe,
      title: "Boost Local Spiritual Tourism",
      description: "Be part of a movement that establishes Kailashgiribetta as a significant pilgrimage site."
    },
    {
      icon: Users,
      title: "Promote Unity & Harmony",
      description: "Walk alongside fellow devotees, chanting 'Bol Bam!', fostering camaraderie and collective faith."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* What is Kanwariya Yatra */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            What is the Kanwariya Yatra?
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-divine border border-saffron/20">
            <Droplet className="h-16 w-16 text-divine-blue mx-auto mb-6" />
            <p className="text-lg leading-relaxed text-foreground">
              The Kanwariya Yatra is a sacred pilgrimage undertaken by millions of Lord Shiva devotees 
              during the holy month of Shravan. Pilgrims, known as Kanwariyas, collect holy water from 
              sacred rivers and carry it in decorated pots (Kanwars) to offer to the Shiva Lingam. 
              It is an act of immense faith, devotion, and penance, believed to bring profound blessings, 
              peace, and prosperity.
            </p>
          </div>
        </div>

        {/* Why Kailashgiribetta */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Why Kailashgiribetta? 
            <span className="block text-saffron mt-2">A New Trend Begins!</span>
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-sunrise rounded-2xl p-8 mb-12 text-white shadow-sacred">
              <Star className="h-12 w-12 mx-auto mb-6" />
              <p className="text-xl text-center leading-relaxed">
                Kailashgiribetta holds a special place in our hearts and history. Its ancient caves 
                and the sacred Shiva Temple make it a powerful spiritual vortex. This Yatra will not 
                only honor this tradition but also establish a new spiritual movement in South India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border border-saffron/20 hover:shadow-divine transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <benefit.icon className="h-12 w-12 text-saffron mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Be Part of History */}
        <div className="text-center bg-gradient-divine rounded-2xl p-12 text-white shadow-sacred">
          <h2 className="text-4xl font-bold mb-6">Be a Part of History!</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether you wish to participate as a Kanwariya, offer your support as a volunteer, 
            or simply come to witness this grand spiritual event, your presence will be invaluable.
          </p>
          <div className="text-2xl font-bold">
            Your Devotion. Our Heritage. Chintamani's Pride!
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;