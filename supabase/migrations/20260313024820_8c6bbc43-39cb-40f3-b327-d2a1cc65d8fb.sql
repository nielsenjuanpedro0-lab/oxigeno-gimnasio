
-- Create members table for gym members who pay via MercadoPago
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  dni TEXT NOT NULL,
  plan TEXT NOT NULL,
  plan_price INTEGER NOT NULL,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  membership_start DATE NOT NULL DEFAULT CURRENT_DATE,
  membership_end DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Allow edge functions (service role) to insert/update members
-- Public read not needed - only accessed via edge functions
CREATE POLICY "Service role can manage members"
  ON public.members
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
