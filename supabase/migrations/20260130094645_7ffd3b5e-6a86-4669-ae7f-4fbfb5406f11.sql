-- Create meal_suggestions table for daily meal recommendations
CREATE TABLE public.meal_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal TEXT NOT NULL, -- weight_loss, muscle_gain, general_health, light_dinner, traditional, quick_modern, high_fiber
  diet_type TEXT NOT NULL, -- veg, non_veg
  meal_time TEXT NOT NULL, -- breakfast, lunch, dinner
  meal_name TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  calories_min INTEGER NOT NULL,
  calories_max INTEGER NOT NULL,
  protein_grams INTEGER NOT NULL,
  region TEXT DEFAULT 'general', -- general, north_indian, south_indian
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meal_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view meal suggestions"
ON public.meal_suggestions
FOR SELECT
USING (true);

-- Create policy for authenticated users to manage
CREATE POLICY "Authenticated users can manage meal suggestions"
ON public.meal_suggestions
FOR ALL
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_meal_suggestions_updated_at
BEFORE UPDATE ON public.meal_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_meal_suggestions_filters ON public.meal_suggestions(goal, diet_type, meal_time);
CREATE INDEX idx_meal_suggestions_region ON public.meal_suggestions(region);