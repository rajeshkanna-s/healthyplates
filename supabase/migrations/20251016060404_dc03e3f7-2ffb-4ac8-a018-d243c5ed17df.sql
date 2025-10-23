-- Create site_settings table for managing contact info and other site-wide settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  setting_key text NOT NULL UNIQUE,
  setting_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON public.site_settings
  FOR ALL
  USING (true);

-- Insert default contact information
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
  ('contact_email', '"info.healthyplates@gmail.com"'::jsonb, 'Primary contact email address'),
  ('contact_phone', '"+91 8667454755"'::jsonb, 'Primary contact phone number'),
  ('site_description', '"Your trusted source for healthy eating, nutrition tips, and wellness guidance. Discover the power of natural foods for a healthier lifestyle."'::jsonb, 'Site description for footer'),
  ('social_instagram', '"https://www.instagram.com/healthyplates.in"'::jsonb, 'Instagram profile URL'),
  ('social_youtube', '"https://www.youtube.com/@HealthyPlates-hp"'::jsonb, 'YouTube channel URL'),
  ('social_whatsapp', '"https://wa.me/918667454755"'::jsonb, 'WhatsApp contact URL'),
  ('contact_hours', '{
    "weekdays": "Monday - Friday: 9:00 AM - 6:00 PM",
    "saturday": "Saturday: 10:00 AM - 4:00 PM",
    "sunday": "Sunday: Closed"
  }'::jsonb, 'Contact hours information')
ON CONFLICT (setting_key) DO NOTHING;

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();