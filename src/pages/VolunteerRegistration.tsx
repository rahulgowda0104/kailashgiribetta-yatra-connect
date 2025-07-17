import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  preferredRole: string;
  availability: string;
  skillsQualifications: string;
  previousExperience: string;
  motivation: string;
}

const VolunteerRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    preferredRole: "",
    availability: "",
    skillsQualifications: "",
    previousExperience: "",
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const volunteerRoles = [
    { value: "crowd_management", label: "Crowd Management" },
    { value: "logistics_support", label: "Logistics Support" },
    { value: "first_aid", label: "First Aid & Medical Support" },
    { value: "food_service", label: "Food & Refreshment Service" },
    { value: "registration_help", label: "Registration & Check-in" },
    { value: "route_guidance", label: "Route Guidance" },
    { value: "photography", label: "Photography & Documentation" },
    { value: "general_assistance", label: "General Assistance" },
  ];

  const availabilityOptions = [
    { value: "full_event", label: "Full Event (All Days)" },
    { value: "morning_only", label: "Morning Sessions Only" },
    { value: "afternoon_only", label: "Afternoon Sessions Only" },
    { value: "specific_days", label: "Specific Days (mention in experience)" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
            motivation: formData.motivation,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Volunteer Registration Successful!",
        description: "Thank you for volunteering for the sacred Kanwariya Yatra. Har Har Mahadev!",
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
        motivation: "",
      });

    } catch (error) {
      console.error('Volunteer registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your volunteer registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              Volunteer Registration
            </CardTitle>
            <CardDescription className="text-lg">
              Serve in the Sacred Kanwariya Yatra to Kailashgiribetta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Volunteer Preferences */}
              <div className="space-y-2">
                <Label>Preferred Volunteer Role *</Label>
                <Select value={formData.preferredRole} onValueChange={(value) => handleInputChange('preferredRole', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred role" />
                  </SelectTrigger>
                  <SelectContent>
                    {volunteerRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Availability *</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsQualifications">Skills & Qualifications</Label>
                <Textarea
                  id="skillsQualifications"
                  value={formData.skillsQualifications}
                  onChange={(e) => handleInputChange('skillsQualifications', e.target.value)}
                  rows={3}
                  placeholder="Please mention any relevant skills, certifications, or qualifications"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousExperience">Previous Volunteer Experience</Label>
                <Textarea
                  id="previousExperience"
                  value={formData.previousExperience}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                  rows={3}
                  placeholder="Tell us about your previous volunteer experience in events, religious gatherings, or community service"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation to Volunteer *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={4}
                  placeholder="Share your motivation and what drives you to volunteer for this sacred yatra"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register as Volunteer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerRegistration;