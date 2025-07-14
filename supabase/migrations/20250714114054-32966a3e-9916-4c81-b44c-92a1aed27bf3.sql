-- Create participant registrations table
CREATE TABLE public.participant_registrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    address TEXT NOT NULL,
    emergency_contact TEXT NOT NULL,
    medical_conditions TEXT,
    agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteer registrations table
CREATE TABLE public.volunteer_registrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_role TEXT NOT NULL,
    availability TEXT NOT NULL,
    skills_qualifications TEXT,
    previous_experience TEXT,
    motivation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.participant_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are registration forms)
CREATE POLICY "Anyone can insert participant registrations" 
ON public.participant_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert volunteer registrations" 
ON public.volunteer_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_participant_registrations_updated_at
    BEFORE UPDATE ON public.participant_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_registrations_updated_at
    BEFORE UPDATE ON public.volunteer_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();