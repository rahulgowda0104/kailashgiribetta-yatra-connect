import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

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
  timeSlot: string;
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
    timeSlot: "",
  });

  const [slotCounts, setSlotCounts] = useState<{[key: string]: number}>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    // Week 1
    { value: "2024-07-26", label: "26th July 2024 - Week 1" },
    { value: "2024-07-27", label: "27th July 2024 - Week 1" },
    { value: "2024-07-28", label: "28th July 2024 - Week 1" },
    // Week 2
    { value: "2024-08-02", label: "2nd August 2024 - Week 2" },
    { value: "2024-08-03", label: "3rd August 2024 - Week 2" },
    { value: "2024-08-04", label: "4th August 2024 - Week 2" },
    // Week 3
    { value: "2024-08-09", label: "9th August 2024 - Week 3" },
    { value: "2024-08-10", label: "10th August 2024 - Week 3" },
    { value: "2024-08-11", label: "11th August 2024 - Week 3" },
    // Week 4
    { value: "2024-08-16", label: "16th August 2024 - Week 4" },
    { value: "2024-08-17", label: "17th August 2024 - Week 4" },
    { value: "2024-08-18", label: "18th August 2024 - Week 4" },
    // Week 5
    { value: "2024-08-23", label: "23rd August 2024 - Week 5" },
    { value: "2024-08-24", label: "24th August 2024 - Week 5" },
    { value: "2024-08-25", label: "25th August 2024 - Week 5" },
  ];

  useEffect(() => {
    fetchSlotCounts();
  }, []);

  const fetchSlotCounts = async () => {
    try {
      const counts: {[key: string]: number} = {};
      
      for (const slot of timeSlots) {
        const { data, error } = await supabase.rpc('check_slot_capacity', {
          slot_time: slot.value
        });
        
        if (error) {
          console.error('Error fetching slot count:', error);
          counts[slot.value] = 0;
        } else {
          counts[slot.value] = data || 0;
        }
      }
      
      setSlotCounts(counts);
    } catch (error) {
      console.error('Error fetching slot counts:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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

    if (!formData.timeSlot) {
      toast({
        title: "Date Required",
        description: "Please select a date for your registration.",
        variant: "destructive",
      });
      return;
    }

    if (slotCounts[formData.timeSlot] >= 200) {
      toast({
        title: "Date Full",
        description: "This date is fully booked. Please select another date.",
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
            time_slot: formData.timeSlot,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Successful!",
        description: `Your registration for ${formData.timeSlot} has been confirmed. Har Har Mahadev!`,
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
        timeSlot: "",
      });

      // Refresh slot counts
      fetchSlotCounts();

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
                <Label className="text-base font-semibold">Select Date</Label>
                <RadioGroup 
                  value={formData.timeSlot} 
                  onValueChange={(value) => handleInputChange('timeSlot', value)}
                  className="space-y-3"
                >
                  {timeSlots.map((slot) => {
                    const isSlotFull = slotCounts[slot.value] >= 200;
                    const availableSpots = 200 - slotCounts[slot.value];
                    
                    return (
                      <div key={slot.value} className="flex items-center space-x-3 p-4 rounded-lg border">
                        <RadioGroupItem 
                          value={slot.value} 
                          id={slot.value}
                          disabled={isSlotFull}
                        />
                        <Label 
                          htmlFor={slot.value} 
                          className={`flex-1 cursor-pointer ${isSlotFull ? 'opacity-50' : ''}`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{slot.label}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Users className="h-4 w-4" />
                              <span className={isSlotFull ? "text-destructive font-semibold" : "text-muted-foreground"}>
                                {isSlotFull ? "FULL" : `${availableSpots} spots left`}
                              </span>
                            </div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
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