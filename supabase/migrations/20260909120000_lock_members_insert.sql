-- El alta de socios pasa por la edge function create-payment, que usa la service role
-- key y no está sujeta a RLS. La política pública de INSERT dejaba que cualquiera
-- escribiera filas arbitrarias en members desde el navegador con la clave publishable.
DROP POLICY IF EXISTS "Anyone can insert members" ON public.members;
