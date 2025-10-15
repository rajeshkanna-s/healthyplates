-- Add new columns to food_products table for detailed product information
ALTER TABLE public.food_products 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS key_ingredients text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS nutrition_facts jsonb DEFAULT '{}';

COMMENT ON COLUMN public.food_products.description IS 'Detailed product description';
COMMENT ON COLUMN public.food_products.key_ingredients IS 'Array of key ingredients/nutrients';
COMMENT ON COLUMN public.food_products.nutrition_facts IS 'Nutrition information per serving (calories, protein, carbs, fat, fiber)';
