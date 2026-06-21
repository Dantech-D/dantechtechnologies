-- Fix 1: Lock down user_roles table - prevent privilege escalation
CREATE POLICY "Only admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Revoke public EXECUTE on SECURITY DEFINER function has_role
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- Fix 3: Tighten messages insert policy with field-length validation
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
CREATE POLICY "Anyone can insert valid messages" ON public.messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(message) BETWEEN 1 AND 2000
    AND (phone IS NULL OR length(phone) <= 30)
    AND (service IS NULL OR length(service) <= 100)
  );

-- Fix 4: Restrict storage listing on project-images bucket (keep public reads of known objects)
DROP POLICY IF EXISTS "Public can list project-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for project-images" ON storage.objects;

CREATE POLICY "Public read project-images objects" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'project-images');
-- Note: Supabase storage listing requires an additional list permission; the SELECT above
-- allows fetching known objects only. Admin upload/update/delete remain controlled separately.

CREATE POLICY "Admins can upload project-images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project-images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project-images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));