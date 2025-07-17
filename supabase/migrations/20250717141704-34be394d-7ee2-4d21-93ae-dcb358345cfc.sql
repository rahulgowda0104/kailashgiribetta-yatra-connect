-- Add time_slot column to participant_registrations table
ALTER TABLE public.participant_registrations 
ADD COLUMN time_slot TEXT NOT NULL DEFAULT '8:00 AM';

-- Create a function to check slot capacity
CREATE OR REPLACE FUNCTION public.check_slot_capacity(slot_time TEXT)
RETURNS INTEGER
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.participant_registrations
  WHERE time_slot = slot_time;
$$;