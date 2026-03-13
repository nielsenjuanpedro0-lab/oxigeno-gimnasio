
-- Fix overly permissive RLS: restrict to service role only (edge functions bypass RLS with service role key)
DROP POLICY "Service role can manage members" ON public.members;

-- No public policies needed - edge functions use service role which bypasses RLS
-- This means the table is locked down from client-side access
CREATE POLICY "Authenticated users can view their own membership"
  ON public.members
  FOR SELECT
  USING (email = auth.jwt()->>'email');
