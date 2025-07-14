import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HandHeart, Shield, Users, Clock, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    availability: "",
    skills: "",
    volunteerRole: "",
    motivation: "",
    agreedToTerms: false
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the volunteer terms before registering.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Volunteer Registration Successful! 🙏",
      description: "Thank you for your seva! We will contact you soon with volunteer details and assignments.",
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      experience: "",
      availability: "",
      skills: "",
      volunteerRole: "",
      motivation: "",
      agreedToTerms: false
    });
  };

  const volunteerRoles = [
    "Event Coordination",
    "First Aid & Medical Support",
    "Route Management & Safety",
    "Registration & Check-in",
    "Food & Water Distribution",
    "Transportation Coordination",
    "Media & Documentation",
    "Crowd Management",
    "Emergency Response",
    "General Support"
  ];

  return (
    <section id="volunteer" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Volunteer for 
            <span className="block text-saffron mt-2">Sacred Seva</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Serve the divine by helping fellow devotees on their spiritual journey. 
            Your seva (selfless service) will be a blessing to thousands of pilgrims.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border border-saffron/20 shadow-divine">
            <CardHeader className="text-center bg-gradient-sacred text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <HandHeart className="h-8 w-8" />
                Volunteer Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vol-name" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-saffron" />
                      Full Name *
                    </Label>
                    <Input
                      id="vol-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vol-phone" className="text-base font-semibold flex items-center gap-2">
                      <Phone className="h-4 w-4 text-saffron" />
                      Phone Number *
                    </Label>
                    <Input
                      id="vol-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="vol-email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-saffron" />
                      Email Address *
                    </Label>
                    <Input
                      id="vol-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="volunteerRole" className="text-base font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4 text-saffron" />
                      Preferred Volunteer Role *
                    </Label>
                    <Select value={formData.volunteerRole} onValueChange={(value) => handleInputChange("volunteerRole", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your preferred volunteer role" />
                      </SelectTrigger>
                      <SelectContent>
                        {volunteerRoles.map((role) => (
                          <SelectItem key={role} value={role.toLowerCase().replace(/\s+/g, '-')}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="availability" className="text-base font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-saffron" />
                      Availability *
                    </Label>
                    <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-event">Full Event (July 20-22)</SelectItem>
                        <SelectItem value="day-1">July 20 only</SelectItem>
                        <SelectItem value="day-2">July 21 only</SelectItem>
                        <SelectItem value="day-3">July 22 only</SelectItem>
                        <SelectItem value="flexible">Flexible timing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="skills" className="text-base font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-saffron" />
                      Skills & Qualifications
                    </Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      placeholder="List your relevant skills, qualifications, languages spoken, etc."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="experience" className="text-base font-semibold">
                      Previous Volunteer Experience
                    </Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="Describe any previous volunteer experience, especially in religious or community events"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="motivation" className="text-base font-semibold">
                      Why do you want to volunteer? *
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Share your motivation for volunteering in this sacred Yatra"
                      required
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gradient-to-r from-sacred-red/10 to-saffron/10 p-6 rounded-lg border border-sacred-red/20">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="vol-terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="vol-terms" className="text-sm cursor-pointer">
                        I commit to serving with dedication, following all volunteer guidelines, maintaining 
                        the sanctity of the event, and supporting fellow devotees with compassion and respect. 
                        I understand this is seva (selfless service) for the divine. *
                      </Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="sacred" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={!formData.agreedToTerms}
                >
                  Register for Sacred Seva • Jai Bholenath
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;