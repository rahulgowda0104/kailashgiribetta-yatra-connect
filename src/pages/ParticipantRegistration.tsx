import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalConditions: string;
  agreedToTerms: boolean;
  selectedDate: Date | undefined;
}

const ParticipantRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    emergencyContact: "",
    medicalConditions: "",
    agreedToTerms: false,
    selectedDate: undefined,
  });

  // Available dates for the Yatra
  const availableDates = [
    new Date(2025, 6, 26), // July 26, 2025
    new Date(2025, 6, 27), // July 27, 2025
    new Date(2025, 6, 28), // July 28, 2025
    new Date(2025, 7, 2),  // August 2, 2025
    new Date(2025, 7, 3),  // August 3, 2025
    new Date(2025, 7, 4),  // August 4, 2025
    new Date(2025, 7, 9),  // August 9, 2025
    new Date(2025, 7, 10), // August 10, 2025
    new Date(2025, 7, 11), // August 11, 2025
    new Date(2025, 7, 16), // August 16, 2025
    new Date(2025, 7, 17), // August 17, 2025
    new Date(2025, 7, 18), // August 18, 2025
    new Date(2025, 7, 23), // August 23, 2025
    new Date(2025, 7, 24), // August 24, 2025
    new Date(2025, 7, 25), // August 25, 2025
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for your registration.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('participant_registrations')
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email || null,
            age: parseInt(formData.age),
            gender: formData.gender,
            address: formData.address,
            emergency_contact: formData.emergencyContact,
            medical_conditions: formData.medicalConditions || null,
            agreed_to_terms: formData.agreedToTerms,
            time_slot: format(formData.selectedDate, "yyyy-MM-dd"),
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: `Your registration for ${format(formData.selectedDate, "MMMM dd, yyyy")} has been confirmed. Har Har Mahadev!`,
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        age: "",
        gender: "",
        address: "",
        emergencyContact: "",
        medicalConditions: "",
        agreedToTerms: false,
        selectedDate: undefined,
      });


    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
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
            <CardTitle className="text-3xl font-bold text-primary">
              Participant Registration
            </CardTitle>
            <CardDescription className="text-lg">
              Join the Sacred Kanwariya Yatra to Kailashgiribetta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <Label className="text-base font-semibold">Select Your Yatra Date</Label>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/20">
                  <Calendar
                    mode="single"
                    selected={formData.selectedDate}
                    onSelect={(date) => handleInputChange('selectedDate', date)}
                    modifiers={{
                      available: availableDates,
                    }}
                    modifiersStyles={{
                      available: { 
                        backgroundColor: 'hsl(var(--primary))', 
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}
                    disabled={(date) => !availableDates.some(
                      availableDate => 
                        date.getDate() === availableDate.getDate() &&
                        date.getMonth() === availableDate.getMonth() &&
                        date.getFullYear() === availableDate.getFullYear()
                    )}
                    className="mx-auto"
                  />
                  <p className="text-center text-muted-foreground mt-4 text-sm">
                    Available dates are highlighted. Click to select your preferred date.
                  </p>
                  {formData.selectedDate && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-md text-center">
                      <p className="font-semibold text-primary">
                        Selected Date: {format(formData.selectedDate, "EEEE, MMMM dd, yyyy")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

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

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Number *</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  rows={3}
                  placeholder="Please mention any medical conditions, allergies, or special requirements"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and understand the risks involved in the pilgrimage *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register for Yatra"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantRegistration;