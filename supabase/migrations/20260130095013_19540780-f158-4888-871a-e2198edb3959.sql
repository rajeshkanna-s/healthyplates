-- Insert Weight Loss Meals (General Region - 1-10)
INSERT INTO public.meal_suggestions (goal, diet_type, meal_time, meal_name, items, calories_min, calories_max, protein_grams, region) VALUES
('weight_loss', 'veg', 'breakfast', '2 Idlis with Sambar', ARRAY['2 idlis', '1 bowl sambar', '1 cup vegetable chutney (minimal coconut)'], 380, 420, 17, 'general'),
('weight_loss', 'veg', 'breakfast', 'Vegetable Oats Upma', ARRAY['Vegetable oats upma (1 medium bowl)', '1 cup buttermilk'], 400, 400, 14, 'general'),
('weight_loss', 'non_veg', 'breakfast', 'Egg White Omelette', ARRAY['2 egg white omelette + 1 whole egg', '1 multigrain toast'], 350, 400, 24, 'general'),
('weight_loss', 'veg', 'lunch', 'Multigrain Phulkas with Dal', ARRAY['2 multigrain phulkas', '1 bowl dal', '1 bowl salad', '1 cup curd'], 450, 500, 23, 'general'),
('weight_loss', 'non_veg', 'lunch', 'Lemon Rice with Grilled Chicken', ARRAY['1 cup lemon rice (small portion)', '100g grilled chicken', 'Salad'], 480, 520, 30, 'general'),
('weight_loss', 'veg', 'dinner', 'Vegetable Khichdi', ARRAY['Vegetable khichdi (1 bowl, less rice)', '1 cup curd'], 430, 430, 18, 'general'),
('weight_loss', 'non_veg', 'dinner', 'Millet Rotis with Fish Curry', ARRAY['2 millet rotis', '100g fish curry (less oil)', 'Vegetable stir-fry'], 480, 480, 28, 'general'),
('weight_loss', 'veg', 'breakfast', 'Pesarattu with Ginger Chutney', ARRAY['Pesarattu (1 medium)', 'Ginger chutney'], 400, 400, 18, 'general'),
('weight_loss', 'veg', 'lunch', 'Phulkas with Paneer Bhurji', ARRAY['2 phulkas', '1 bowl paneer bhurji (light)', 'Salad'], 480, 480, 22, 'general'),
('weight_loss', 'non_veg', 'lunch', 'Brown Rice with Egg Curry', ARRAY['Brown rice (3/4 cup)', 'Egg curry (2 eggs)', 'Vegetables'], 500, 500, 26, 'general'),

-- Muscle Gain Meals (General Region - 11-20)
('muscle_gain', 'veg', 'breakfast', 'Vegetable Uttapams', ARRAY['3 vegetable uttapams', '1 bowl sambar'], 550, 550, 22, 'general'),
('muscle_gain', 'non_veg', 'breakfast', 'Egg Omelette with Toast', ARRAY['3 egg omelette', '2 whole wheat toasts', '1 fruit'], 600, 600, 30, 'general'),
('muscle_gain', 'veg', 'lunch', 'Rice with Rajma', ARRAY['1 cup rice', '1 bowl rajma', 'Vegetable sabzi', 'Curd'], 650, 650, 26, 'general'),
('muscle_gain', 'non_veg', 'lunch', 'Phulkas with Chicken Curry', ARRAY['2 phulkas', '150g chicken curry', 'Dal'], 680, 680, 40, 'general'),
('muscle_gain', 'veg', 'dinner', 'Paneer Stuffed Rotis', ARRAY['2 paneer stuffed rotis', 'Vegetable curry'], 620, 620, 30, 'general'),
('muscle_gain', 'non_veg', 'dinner', 'Quinoa with Grilled Fish', ARRAY['Quinoa (1 cup cooked)', '150g grilled fish'], 600, 600, 38, 'general'),
('muscle_gain', 'veg', 'breakfast', 'Moong Dal Chilla', ARRAY['Moong dal chilla (2)', 'Curd dip'], 520, 520, 28, 'general'),
('muscle_gain', 'non_veg', 'lunch', 'Chicken Biryani', ARRAY['Chicken biryani (home-style, 1 plate)', 'Raita'], 700, 700, 38, 'general'),
('muscle_gain', 'veg', 'lunch', 'Veg Pulao with Paneer Curry', ARRAY['Veg pulao (1 cup)', 'Paneer curry (100g)'], 650, 650, 25, 'general'),
('muscle_gain', 'non_veg', 'dinner', 'Egg Fried Rice', ARRAY['Egg fried rice (2 eggs, less oil)'], 620, 620, 30, 'general'),

-- General Health Meals (21-30)
('general_health', 'veg', 'breakfast', 'Ragi Dosa with Sambar', ARRAY['Ragi dosa (2)', 'Sambar'], 420, 420, 15, 'general'),
('general_health', 'veg', 'breakfast', 'Poha with Vegetables', ARRAY['Poha with vegetables', 'Peanuts (1 tbsp)'], 450, 450, 12, 'general'),
('general_health', 'non_veg', 'breakfast', 'Egg Bhurji with Roti', ARRAY['Egg bhurji (2 eggs)', '1 roti'], 430, 430, 24, 'general'),
('general_health', 'veg', 'lunch', 'Phulkas with Mixed Veg', ARRAY['2 phulkas', 'Mixed veg curry', 'Curd'], 480, 480, 16, 'general'),
('general_health', 'non_veg', 'lunch', 'Rice with Fish Curry', ARRAY['Rice (1 cup)', 'Fish curry', 'Vegetables'], 520, 520, 28, 'general'),
('general_health', 'veg', 'dinner', 'Vegetable Soup with Paneer Salad', ARRAY['Vegetable soup', 'Paneer salad'], 400, 400, 20, 'general'),
('general_health', 'non_veg', 'dinner', 'Rotis with Chicken Curry', ARRAY['2 rotis', 'Chicken curry'], 500, 500, 32, 'general'),
('general_health', 'veg', 'breakfast', 'Vegetable Upma', ARRAY['Upma (vegetable)', 'Buttermilk'], 450, 450, 14, 'general'),
('general_health', 'veg', 'lunch', 'Sambar Sadham', ARRAY['Sambar sadham (small portion)', 'Poriyal'], 500, 500, 18, 'general'),
('general_health', 'non_veg', 'lunch', 'Curd Rice with Grilled Chicken', ARRAY['Curd rice (1 cup)', 'Grilled chicken (100g)'], 550, 550, 30, 'general'),

-- Light Dinner Meals (31-35)
('light_dinner', 'veg', 'dinner', 'Vegetable Dosa', ARRAY['Vegetable dosa (1 large)', 'Sambar'], 420, 420, 15, 'general'),
('light_dinner', 'non_veg', 'dinner', 'Chicken Soup with Toast', ARRAY['Chicken soup', '1 multigrain toast'], 380, 380, 25, 'general'),
('light_dinner', 'veg', 'dinner', 'Curd Rice with Stir Fry', ARRAY['Curd rice (small portion)', 'Vegetable stir fry'], 400, 400, 14, 'general'),
('light_dinner', 'veg', 'dinner', 'Idiyappam with Kurma', ARRAY['Idiyappam (2)', 'Vegetable kurma (light)'], 450, 450, 12, 'general'),
('light_dinner', 'non_veg', 'dinner', 'Grilled Fish with Salad', ARRAY['Grilled fish', 'Vegetable salad'], 420, 420, 32, 'general'),

-- Traditional Meals (36-40)
('traditional', 'veg', 'lunch', 'Rasam Rice', ARRAY['Rasam rice (small)', 'Beans poriyal', 'Curd'], 470, 470, 15, 'general'),
('traditional', 'veg', 'lunch', 'Chole with Phulkas', ARRAY['Chole (1 bowl)', '2 phulkas'], 520, 520, 20, 'general'),
('traditional', 'non_veg', 'lunch', 'Mutton Curry with Rotis', ARRAY['Mutton curry (100g)', '2 rotis'], 650, 650, 30, 'general'),
('traditional', 'veg', 'breakfast', 'Kanchipuram Idli', ARRAY['Kanchipuram idli (1)', 'Sambar'], 430, 430, 14, 'general'),
('traditional', 'veg', 'dinner', 'Vegetable Pongal', ARRAY['Vegetable pongal (small bowl)', 'Sambar'], 450, 450, 16, 'general'),

-- Quick & Modern Meals (41-46)
('quick_modern', 'veg', 'breakfast', 'Vegetable Sandwich', ARRAY['Vegetable sandwich (whole wheat)', 'Milk / soy milk'], 450, 450, 18, 'general'),
('quick_modern', 'non_veg', 'breakfast', 'Egg Sandwich', ARRAY['Egg sandwich (2 eggs)'], 500, 500, 28, 'general'),
('quick_modern', 'veg', 'lunch', 'Paneer Wrap', ARRAY['Paneer wrap (whole wheat)'], 550, 550, 25, 'general'),
('quick_modern', 'non_veg', 'lunch', 'Chicken Wrap', ARRAY['Chicken wrap'], 580, 580, 35, 'general'),
('quick_modern', 'veg', 'dinner', 'Vegetable Pulao with Raita', ARRAY['Vegetable pulao (small)', 'Raita'], 480, 480, 14, 'general'),
('quick_modern', 'non_veg', 'dinner', 'Egg Curry with Rotis', ARRAY['Egg curry', '2 rotis'], 520, 520, 30, 'general'),

-- High Fiber Meals (47-50)
('high_fiber', 'veg', 'breakfast', 'Sprouts Salad', ARRAY['Sprouts salad with lemon'], 350, 350, 20, 'general'),
('high_fiber', 'veg', 'lunch', 'Brown Rice with Sambar', ARRAY['Brown rice (3/4 cup)', 'Vegetable sambar'], 480, 480, 16, 'general'),
('high_fiber', 'non_veg', 'lunch', 'Grilled Chicken Salad', ARRAY['Grilled chicken salad'], 450, 450, 35, 'general'),
('high_fiber', 'veg', 'dinner', 'Vegetable Stir-fry with Paneer', ARRAY['Vegetable stir-fry', 'Paneer cubes (75g)'], 420, 420, 22, 'general');