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

  const dateSlots = [
    // Week 1
    {
      date: "26th July 2025 - Week 1",
      slots: [
        { value: "2025-07-26-08:00", time: "8:00 AM" },
        { value: "2025-07-26-10:00", time: "10:00 AM" },
        { value: "2025-07-26-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "27th July 2025 - Week 1",
      slots: [
        { value: "2025-07-27-08:00", time: "8:00 AM" },
        { value: "2025-07-27-10:00", time: "10:00 AM" },
        { value: "2025-07-27-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "28th July 2025 - Week 1",
      slots: [
        { value: "2025-07-28-08:00", time: "8:00 AM" },
        { value: "2025-07-28-10:00", time: "10:00 AM" },
        { value: "2025-07-28-12:00", time: "12:00 PM" },
      ]
    },
    // Week 2
    {
      date: "2nd August 2025 - Week 2",
      slots: [
        { value: "2025-08-02-08:00", time: "8:00 AM" },
        { value: "2025-08-02-10:00", time: "10:00 AM" },
        { value: "2025-08-02-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "3rd August 2025 - Week 2",
      slots: [
        { value: "2025-08-03-08:00", time: "8:00 AM" },
        { value: "2025-08-03-10:00", time: "10:00 AM" },
        { value: "2025-08-03-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "4th August 2025 - Week 2",
      slots: [
        { value: "2025-08-04-08:00", time: "8:00 AM" },
        { value: "2025-08-04-10:00", time: "10:00 AM" },
        { value: "2025-08-04-12:00", time: "12:00 PM" },
      ]
    },
    // Week 3
    {
      date: "9th August 2025 - Week 3",
      slots: [
        { value: "2025-08-09-08:00", time: "8:00 AM" },
        { value: "2025-08-09-10:00", time: "10:00 AM" },
        { value: "2025-08-09-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "10th August 2025 - Week 3",
      slots: [
        { value: "2025-08-10-08:00", time: "8:00 AM" },
        { value: "2025-08-10-10:00", time: "10:00 AM" },
        { value: "2025-08-10-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "11th August 2025 - Week 3",
      slots: [
        { value: "2025-08-11-08:00", time: "8:00 AM" },
        { value: "2025-08-11-10:00", time: "10:00 AM" },
        { value: "2025-08-11-12:00", time: "12:00 PM" },
      ]
    },
    // Week 4
    {
      date: "16th August 2025 - Week 4",
      slots: [
        { value: "2025-08-16-08:00", time: "8:00 AM" },
        { value: "2025-08-16-10:00", time: "10:00 AM" },
        { value: "2025-08-16-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "17th August 2025 - Week 4",
      slots: [
        { value: "2025-08-17-08:00", time: "8:00 AM" },
        { value: "2025-08-17-10:00", time: "10:00 AM" },
        { value: "2025-08-17-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "18th August 2025 - Week 4",
      slots: [
        { value: "2025-08-18-08:00", time: "8:00 AM" },
        { value: "2025-08-18-10:00", time: "10:00 AM" },
        { value: "2025-08-18-12:00", time: "12:00 PM" },
      ]
    },
    // Week 5
    {
      date: "23rd August 2025 - Week 5",
      slots: [
        { value: "2025-08-23-08:00", time: "8:00 AM" },
        { value: "2025-08-23-10:00", time: "10:00 AM" },
        { value: "2025-08-23-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "24th August 2025 - Week 5",
      slots: [
        { value: "2025-08-24-08:00", time: "8:00 AM" },
        { value: "2025-08-24-10:00", time: "10:00 AM" },
        { value: "2025-08-24-12:00", time: "12:00 PM" },
      ]
    },
    {
      date: "25th August 2025 - Week 5",
      slots: [
        { value: "2025-08-25-08:00", time: "8:00 AM" },
        { value: "2025-08-25-10:00", time: "10:00 AM" },
        { value: "2025-08-25-12:00", time: "12:00 PM" },
      ]
    },
  ];

  useEffect(() => {
    fetchSlotCounts();
  }, []);

  const fetchSlotCounts = async () => {
    try {
      const counts: {[key: string]: number} = {};
      
      // Flatten all slots from dateSlots
      const allSlots = dateSlots.flatMap(dateSlot => dateSlot.slots);
      
      for (const slot of allSlots) {
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
                  className="space-y-6"
                >
                  {dateSlots.map((dateSlot) => (
                    <div key={dateSlot.date} className="space-y-3">
                      <h3 className="text-lg font-semibold text-primary border-b pb-2">
                        {dateSlot.date}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {dateSlot.slots.map((slot) => {
                          const isSlotFull = slotCounts[slot.value] >= 200;
                          const availableSpots = 200 - (slotCounts[slot.value] || 0);
                          
                          return (
                            <div key={slot.value} className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                              <RadioGroupItem 
                                value={slot.value} 
                                id={slot.value}
                                disabled={isSlotFull}
                              />
                              <Label 
                                htmlFor={slot.value} 
                                className={`flex-1 cursor-pointer ${isSlotFull ? 'opacity-50' : ''}`}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{slot.time}</span>
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
                      </div>
                    </div>
                  ))}
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