-- Create volunteer_registrations table
CREATE TABLE public.volunteer_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_role TEXT NOT NULL,
  availability TEXT NOT NULL,
  skills_qualifications TEXT NOT NULL,
  previous_experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.volunteer_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (anyone can insert volunteer registrations)
CREATE POLICY "Anyone can insert volunteer registrations" 
ON public.volunteer_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_volunteer_registrations_updated_at
BEFORE UPDATE ON public.volunteer_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();