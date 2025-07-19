-- Update the check_slot_capacity function to support up to 200 participants per slot
CREATE OR REPLACE FUNCTION public.check_slot_capacity(slot_time text)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT COUNT(*)::INTEGER
  FROM public.participant_registrations
  WHERE time_slot = slot_time;
$function$;