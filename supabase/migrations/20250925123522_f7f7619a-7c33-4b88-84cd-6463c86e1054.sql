-- Create categories table for organizing content
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('food_product', 'food_timing', 'disease', 'self_care')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create food products table
CREATE TABLE public.food_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  purpose TEXT NOT NULL,
  advantages TEXT[] DEFAULT '{}',
  disadvantages TEXT[] DEFAULT '{}',
  medicinal_benefits TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  origin TEXT,
  is_indian BOOLEAN DEFAULT false,
  region TEXT, -- 'south_indian', 'north_indian', 'foreign'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create food timing table (what to eat when)
CREATE TABLE public.food_timing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  meal_time TEXT NOT NULL CHECK (meal_time IN ('morning', 'afternoon', 'evening', 'snacks', 'dinner')),
  image_url TEXT,
  benefits TEXT NOT NULL,
  description TEXT,
  how_much TEXT,
  preparation_tips TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create diseases table
CREATE TABLE public.diseases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  symptoms TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create disease foods mapping table
CREATE TABLE public.disease_foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  disease_id UUID REFERENCES public.diseases(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  how_much TEXT,
  benefits TEXT NOT NULL,
  preparation_method TEXT,
  frequency TEXT, -- 'daily', 'weekly', 'as_needed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create self care categories table
CREATE TABLE public.self_care_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE, -- 'skin_care', 'hair_care', 'fitness_care', 'health_care'
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create self care procedures table
CREATE TABLE public.self_care_procedures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category_id UUID REFERENCES public.self_care_categories(id),
  image_url TEXT,
  description TEXT,
  steps TEXT[] NOT NULL,
  ingredients TEXT[],
  duration TEXT,
  frequency TEXT,
  benefits TEXT[],
  precautions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT DEFAULT 'HealthyPlates Team',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  keywords TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_timing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.self_care_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.self_care_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view the content)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view food products" ON public.food_products FOR SELECT USING (true);
CREATE POLICY "Anyone can view food timing" ON public.food_timing FOR SELECT USING (true);
CREATE POLICY "Anyone can view diseases" ON public.diseases FOR SELECT USING (true);
CREATE POLICY "Anyone can view disease foods" ON public.disease_foods FOR SELECT USING (true);
CREATE POLICY "Anyone can view self care categories" ON public.self_care_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view self care procedures" ON public.self_care_procedures FOR SELECT USING (true);
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can view faqs" ON public.faqs FOR SELECT USING (true);

-- Create policies for authenticated users to manage content (admin functions)
CREATE POLICY "Authenticated users can insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update categories" ON public.categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete categories" ON public.categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert food products" ON public.food_products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update food products" ON public.food_products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete food products" ON public.food_products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert food timing" ON public.food_timing FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update food timing" ON public.food_timing FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete food timing" ON public.food_timing FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert diseases" ON public.diseases FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update diseases" ON public.diseases FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete diseases" ON public.diseases FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert disease foods" ON public.disease_foods FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update disease foods" ON public.disease_foods FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete disease foods" ON public.disease_foods FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert self care categories" ON public.self_care_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update self care categories" ON public.self_care_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete self care categories" ON public.self_care_categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert self care procedures" ON public.self_care_procedures FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update self care procedures" ON public.self_care_procedures FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete self care procedures" ON public.self_care_procedures FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage blogs" ON public.blogs FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage faqs" ON public.faqs FOR ALL TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_food_products_updated_at BEFORE UPDATE ON public.food_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_food_timing_updated_at BEFORE UPDATE ON public.food_timing FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_diseases_updated_at BEFORE UPDATE ON public.diseases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_disease_foods_updated_at BEFORE UPDATE ON public.disease_foods FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_self_care_categories_updated_at BEFORE UPDATE ON public.self_care_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_self_care_procedures_updated_at BEFORE UPDATE ON public.self_care_procedures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories
INSERT INTO public.categories (name, type, description) VALUES
('Fruits', 'food_product', 'Fresh and dried fruits rich in vitamins and minerals'),
('Vegetables', 'food_product', 'Leafy greens and other vegetables for nutrition'),
('Nuts & Seeds', 'food_product', 'Protein-rich nuts and seeds for energy'),
('Spices', 'food_product', 'Natural spices with medicinal properties'),
('Grains', 'food_product', 'Whole grains and cereals for sustained energy'),
('Oils', 'food_product', 'Healthy cooking oils and fats');

-- Insert initial self care categories
INSERT INTO public.self_care_categories (name, description, icon) VALUES
('skin_care', 'Natural skincare routines and remedies', '✨'),
('hair_care', 'Hair care tips and natural treatments', '💇'),
('fitness_care', 'Exercise and physical wellness', '💪'),
('health_care', 'General health and wellness tips', '🏥');

-- Insert some sample diseases
INSERT INTO public.diseases (name, description, symptoms) VALUES
('Diabetes', 'A metabolic disorder characterized by high blood sugar levels', ARRAY['Frequent urination', 'Excessive thirst', 'Unexplained weight loss', 'Fatigue']),
('Heart Disease', 'Cardiovascular conditions affecting heart health', ARRAY['Chest pain', 'Shortness of breath', 'Fatigue', 'Irregular heartbeat']),
('High Blood Pressure', 'Elevated blood pressure levels', ARRAY['Headaches', 'Dizziness', 'Blurred vision', 'Nausea']),
('Skin Problems', 'Various dermatological conditions', ARRAY['Dryness', 'Irritation', 'Inflammation', 'Breakouts']);