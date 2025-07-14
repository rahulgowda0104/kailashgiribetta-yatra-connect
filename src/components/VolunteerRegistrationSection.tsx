import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Phone, Mail, User, Clock, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VolunteerRegistrationSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredRole: "",
    availability: "",
    skillsQualifications: "",
    previousExperience: "",
    motivation: ""
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.preferredRole || !formData.availability || !formData.motivation) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('volunteer_registrations')
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            preferred_role: formData.preferredRole,
            availability: formData.availability,
            skills_qualifications: formData.skillsQualifications || null,
            previous_experience: formData.previousExperience || null,
            motivation: formData.motivation
          }
        ]);

      if (error) {
        toast({
          title: "Registration Failed",
          description: "There was an error submitting your volunteer registration. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Volunteer Registration Successful! 🙏",
        description: "Har Har Mahadev! Thank you for volunteering. We will contact you soon with further details.",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        preferredRole: "",
        availability: "",
        skillsQualifications: "",
        previousExperience: "",
        motivation: ""
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your volunteer registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Volunteer for
            <span className="block text-saffron mt-2">Sacred Seva</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of this divine service. Join our team of dedicated volunteers and contribute to making 
            this historic Kanwariya Yatra a memorable spiritual experience for all participants.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border border-saffron/20 shadow-divine">
            <CardHeader className="text-center bg-gradient-sunrise text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Heart className="h-8 w-8" />
                Volunteer Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-saffron" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                      <Phone className="h-4 w-4 text-saffron" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-saffron" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredRole" className="text-base font-semibold flex items-center gap-2">
                      <Award className="h-4 w-4 text-saffron" />
                      Preferred Volunteer Role *
                    </Label>
                    <Select value={formData.preferredRole} onValueChange={(value) => handleInputChange("preferredRole", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your preferred volunteer role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registration">Registration Support</SelectItem>
                        <SelectItem value="crowd-management">Crowd Management</SelectItem>
                        <SelectItem value="first-aid">First Aid & Medical Support</SelectItem>
                        <SelectItem value="food-distribution">Food & Water Distribution</SelectItem>
                        <SelectItem value="route-guidance">Route Guidance</SelectItem>
                        <SelectItem value="security">Security Support</SelectItem>
                        <SelectItem value="logistics">Logistics & Transport</SelectItem>
                        <SelectItem value="communication">Communication & Announcements</SelectItem>
                        <SelectItem value="cleanup">Cleanup & Environment</SelectItem>
                        <SelectItem value="photography">Photography & Documentation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-base font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-saffron" />
                      Availability *
                    </Label>
                    <Select value={formData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-event">Full Event (All Days)</SelectItem>
                        <SelectItem value="weekends-only">Weekends Only</SelectItem>
                        <SelectItem value="specific-days">Specific Days (will discuss)</SelectItem>
                        <SelectItem value="morning-shift">Morning Shift (6 AM - 2 PM)</SelectItem>
                        <SelectItem value="evening-shift">Evening Shift (2 PM - 10 PM)</SelectItem>
                        <SelectItem value="night-shift">Night Shift (10 PM - 6 AM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="skillsQualifications" className="text-base font-semibold">
                      Skills & Qualifications
                    </Label>
                    <Textarea
                      id="skillsQualifications"
                      value={formData.skillsQualifications}
                      onChange={(e) => handleInputChange("skillsQualifications", e.target.value)}
                      placeholder="List your relevant skills, qualifications, languages spoken, etc."
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="previousExperience" className="text-base font-semibold">
                      Previous Volunteer Experience
                    </Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange("previousExperience", e.target.value)}
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
                      placeholder="Share your motivation for volunteering in this sacred yatra"
                      required
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="divine" 
                  size="lg" 
                  className="w-full text-lg py-6"
                >
                  Register as Volunteer • Har Har Mahadev
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerRegistrationSection;