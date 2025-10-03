-- Remove rating column from food_products table
ALTER TABLE public.food_products DROP COLUMN IF EXISTS rating;
