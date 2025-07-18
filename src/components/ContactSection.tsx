import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 72594 26555"],
      action: ""
    },
    {
      icon: Mail,
      title: "Email",
      details: ["kanwariyayatra2025@gmail.com"],
      action: ""
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["narayanahalli cross towards kailasagiribetta", "Chintamani, Karnataka"],
      action: ""
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Contact Us for
            <span className="block text-saffron mt-2">Divine Guidance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about the Yatra? Need assistance with registration? 
            Our dedicated team is here to help you on your spiritual journey.
          </p>
        </div>

          <div className="max-w-6xl mx-auto">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border border-saffron/20 hover:shadow-divine transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <contact.icon className="h-12 w-12 text-saffron mx-auto mb-4" />
                  <CardTitle className="text-xl text-foreground">{contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2 mb-4">
                    {contact.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                  {contact.action && (
                    <Button variant="outline" size="sm" className="text-saffron border-saffron hover:bg-saffron hover:text-white">
                      {contact.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Organization Info */}
            <Card className="bg-gradient-sunrise text-white border-0 shadow-divine">
              <CardHeader>
                <CardTitle className="text-2xl">Kanwariya Yatra Organization Committee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg opacity-90">
                  Dedicated to organizing the first-ever Kanwariya Yatra to Kailashgiribetta, 
                  bringing this sacred tradition to South India.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span>24/7 Helpline: +91 72594 26555</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <span>kanwariyayatra2025@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span>narayanahalli cross towards kailasagiribetta, Chintamani, Karnataka</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm border border-saffron/20">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="divine" className="w-full" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Support
                </Button>
                <Button variant="sacred" className="w-full" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Helpline
                </Button>
                
                {/* Social Media */}
                  <div className="pt-4 border-t border-saffron/20">
                    <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open('https://www.facebook.com/share/16rkg4Cf4t/', '_blank')}
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open('https://www.instagram.com/u2v.agency?igsh=MWFvc2tiMTh6bXc0YQ==', '_blank')}
                      >
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </Button>
                    </div>
                  </div>
              </CardContent>
            </Card>
          </div>

          {/* Final Message */}
          <div className="text-center mt-12 bg-gradient-divine rounded-2xl p-8 text-white shadow-sacred">
            <h3 className="text-3xl font-bold mb-4">Let Us Help You on Your Sacred Journey</h3>
            <p className="text-xl mb-6 opacity-90">
              For route information, volunteering opportunities, or any spiritual guidance, 
              reach out to us. We're here to ensure your Yatra experience is truly divine.
            </p>
            <div className="text-2xl font-bold">
              HAR HAR MAHADEV! • BOL BAM!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;