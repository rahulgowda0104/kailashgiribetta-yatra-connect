import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Heart, Phone, Mail, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    age: "",
    gender: "",
    emergencyContact: "",
    medicalConditions: "",
    agreedToTerms: false
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and guidelines before registering.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('participant_registrations')
        .insert([
          {
            full_name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            age: parseInt(formData.age),
            gender: formData.gender,
            address: formData.address,
            emergency_contact: formData.emergencyContact,
            medical_conditions: formData.medicalConditions || null,
            agreed_to_terms: formData.agreedToTerms
          }
        ]);

      if (error) {
        toast({
          title: "Registration Failed",
          description: "There was an error submitting your registration. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Registration Successful! 🙏",
        description: "Har Har Mahadev! Your registration has been submitted. We will contact you soon with further details.",
      });
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        age: "",
        gender: "",
        emergencyContact: "",
        medicalConditions: "",
        agreedToTerms: false
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Register as 
            <span className="block text-saffron mt-2">Kanwariya Participant</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of devotees in this sacred journey. Fill out the form below to secure your place 
            in this historic first Kanwariya Yatra to Kailashgiribetta.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border border-saffron/20 shadow-divine">
            <CardHeader className="text-center bg-gradient-sunrise text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Users className="h-8 w-8" />
                Participant Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-saffron" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
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

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-saffron" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-base font-semibold">
                      Age *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Enter your age"
                      required
                      min="18"
                      max="80"
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="gender" className="text-base font-semibold">
                      Gender *
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-saffron" />
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      required
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="emergencyContact" className="text-base font-semibold flex items-center gap-2">
                      <Heart className="h-4 w-4 text-sacred-red" />
                      Emergency Contact Number *
                    </Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      placeholder="Emergency contact phone number"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="medicalConditions" className="text-base font-semibold">
                      Medical Conditions (if any)
                    </Label>
                    <Textarea
                      id="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                      placeholder="Please mention any medical conditions, allergies, or medications"
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gradient-to-r from-saffron/10 to-sacred-red/10 p-6 rounded-lg border border-saffron/20">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to follow all Yatra guidelines including wearing saffron attire, maintaining 
                        purity of mind and body, walking barefoot when possible, and following all safety 
                        instructions. I understand this is a spiritual journey requiring dedication and respect. *
                      </Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="divine" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={!formData.agreedToTerms}
                >
                  Register for Sacred Yatra • Har Har Mahadev
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;