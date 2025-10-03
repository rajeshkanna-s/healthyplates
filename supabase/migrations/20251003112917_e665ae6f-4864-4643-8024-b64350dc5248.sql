-- Insert sample categories for food products
INSERT INTO public.categories (name, type, description) VALUES
('Fruits', 'food_product', 'Fresh and dried fruits'),
('Vegetables', 'food_product', 'Leafy and root vegetables'),
('Grains', 'food_product', 'Whole grains and cereals'),
('Nuts & Seeds', 'food_product', 'Healthy nuts and seeds'),
('Dairy', 'food_product', 'Dairy and alternatives')
ON CONFLICT DO NOTHING;

-- Insert sample self care categories
INSERT INTO public.self_care_categories (name, description, icon) VALUES
('Skin Care', 'Natural skin care remedies and routines', 'sparkles'),
('Hair Care', 'Hair care treatments and maintenance', 'scissors'),
('Fitness Care', 'Physical fitness and wellness routines', 'dumbbell')
ON CONFLICT DO NOTHING;

-- Insert sample diseases
INSERT INTO public.diseases (name, description, symptoms) VALUES
('Diabetes', 'A chronic condition affecting blood sugar regulation', ARRAY['Increased thirst', 'Frequent urination', 'Extreme hunger', 'Fatigue']),
('Hypertension', 'High blood pressure condition', ARRAY['Headaches', 'Shortness of breath', 'Nosebleeds', 'Chest pain']),
('Heart Disease', 'Cardiovascular health conditions', ARRAY['Chest pain', 'Shortness of breath', 'Fatigue', 'Irregular heartbeat'])
ON CONFLICT DO NOTHING;

-- Insert 10 sample food products
INSERT INTO public.food_products (name, category_id, purpose, medicinal_benefits, image_url) 
SELECT 
  name,
  (SELECT id FROM public.categories WHERE type = 'food_product' AND categories.name = category_name LIMIT 1),
  purpose,
  medicinal_benefits,
  image_url
FROM (VALUES
  ('Almonds', 'Nuts & Seeds', 'Rich source of vitamin E, magnesium, and healthy fats that support heart health and brain function', 'Helps lower cholesterol, improves heart health, supports brain function, and may help manage blood sugar levels', 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800'),
  ('Spinach', 'Vegetables', 'Nutrient-dense leafy green packed with iron, calcium, and vitamins A and K', 'Supports bone health, improves eye health, helps regulate blood pressure, and boosts immunity', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800'),
  ('Blueberries', 'Fruits', 'Antioxidant-rich berries that support cognitive function and heart health', 'High in antioxidants, improves brain function, supports heart health, and may help prevent cancer', 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800'),
  ('Quinoa', 'Grains', 'Complete protein grain rich in fiber, vitamins, and minerals', 'Supports digestive health, helps manage weight, provides complete protein, and improves metabolic health', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800'),
  ('Greek Yogurt', 'Dairy', 'Probiotic-rich dairy product high in protein and calcium', 'Supports gut health, strengthens bones, aids in weight management, and boosts immunity', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'),
  ('Sweet Potato', 'Vegetables', 'Nutrient-rich root vegetable high in beta-carotene and fiber', 'Supports eye health, boosts immunity, regulates blood sugar, and promotes digestive health', 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800'),
  ('Walnuts', 'Nuts & Seeds', 'Brain-shaped nuts rich in omega-3 fatty acids and antioxidants', 'Improves brain health, reduces inflammation, supports heart health, and may help prevent cancer', 'https://images.unsplash.com/photo-1622484211827-dd1ca3d1ddff?w=800'),
  ('Broccoli', 'Vegetables', 'Cruciferous vegetable packed with vitamins C, K, and fiber', 'Supports detoxification, boosts immunity, promotes bone health, and has anti-cancer properties', 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800'),
  ('Oats', 'Grains', 'Whole grain rich in beta-glucan fiber and essential nutrients', 'Lowers cholesterol, supports heart health, aids in weight management, and regulates blood sugar', 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800'),
  ('Avocado', 'Fruits', 'Nutrient-dense fruit rich in healthy fats and potassium', 'Supports heart health, improves skin health, aids nutrient absorption, and helps regulate blood pressure', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800')
) AS data(name, category_name, purpose, medicinal_benefits, image_url);

-- Insert 10 sample food timing entries (using correct meal_time values: morning, afternoon, evening, snacks, dinner)
INSERT INTO public.food_timing (name, meal_time, benefits, description, how_much, preparation_tips, image_url) VALUES
('Oatmeal with Berries', 'morning', 'Provides sustained energy, rich in fiber, supports heart health and digestive system', 'A wholesome breakfast combining whole grain oats with fresh berries', '1 cup cooked oats', 'Cook oats in milk or water, top with fresh berries and honey', 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800'),
('Green Smoothie', 'morning', 'Boosts energy, packed with vitamins and minerals, supports detoxification', 'Nutrient-dense smoothie with leafy greens and fruits', '1 large glass', 'Blend spinach, banana, mango, and coconut water', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800'),
('Grilled Chicken Salad', 'afternoon', 'High in protein, low in calories, supports muscle building and weight management', 'Protein-rich salad with mixed greens and lean chicken', '1 bowl', 'Grill chicken breast, toss with mixed greens and olive oil dressing', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800'),
('Quinoa Buddha Bowl', 'afternoon', 'Complete protein source, rich in fiber, supports digestive health and energy', 'Balanced meal with quinoa, vegetables, and healthy fats', '1 large bowl', 'Cook quinoa, add roasted vegetables, chickpeas, and tahini dressing', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'),
('Baked Salmon with Vegetables', 'dinner', 'Rich in omega-3 fatty acids, supports heart and brain health, anti-inflammatory', 'Heart-healthy dinner with fatty fish and roasted vegetables', '1 fillet with 1 cup vegetables', 'Bake salmon at 375°F for 15-20 minutes, roast vegetables with olive oil', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'),
('Vegetable Stir-Fry', 'evening', 'Low in calories, high in nutrients, supports weight management and immunity', 'Colorful mix of vegetables with light seasoning', '1 large bowl', 'Stir-fry mixed vegetables in sesame oil with garlic and ginger', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800'),
('Hummus with Veggie Sticks', 'snacks', 'Protein and fiber-rich, supports satiety and blood sugar control', 'Healthy snack combining protein-rich hummus with fresh vegetables', '1/4 cup hummus with vegetables', 'Serve store-bought or homemade hummus with carrot and cucumber sticks', 'https://images.unsplash.com/photo-1571696322788-6d6b3f4b5411?w=800'),
('Mixed Nuts', 'snacks', 'Rich in healthy fats, supports heart health and provides sustained energy', 'Nutrient-dense snack with variety of nuts', '1/4 cup', 'Mix almonds, walnuts, and cashews, lightly roasted', 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800'),
('Greek Yogurt with Honey', 'snacks', 'High in protein and probiotics, supports gut health and satiety', 'Probiotic-rich snack with natural sweetness', '1 cup', 'Top Greek yogurt with honey and berries', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'),
('Apple Slices with Almond Butter', 'snacks', 'Balances protein and carbs, provides energy and supports weight management', 'Healthy combination of fruit and nut butter', '1 apple with 2 tbsp almond butter', 'Slice apple and serve with natural almond butter', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800');

-- Insert 10 sample disease foods
INSERT INTO public.disease_foods (disease_id, food_name, benefits, how_much, frequency, preparation_method)
SELECT 
  (SELECT id FROM public.diseases WHERE name = disease_name LIMIT 1),
  food_name,
  benefits,
  how_much,
  frequency,
  preparation_method
FROM (VALUES
  ('Diabetes', 'Bitter Gourd', 'Contains compounds that act like insulin, helps lower blood glucose levels naturally', '1 small bitter gourd', 'Daily', 'Juice it or cook as a stir-fry with minimal oil'),
  ('Diabetes', 'Fenugreek Seeds', 'Slows down carbohydrate absorption and improves insulin sensitivity', '1 tablespoon soaked seeds', 'Daily morning', 'Soak overnight in water and consume on empty stomach'),
  ('Hypertension', 'Beetroot', 'Rich in nitrates that help lower blood pressure and improve blood flow', '1 medium beetroot', '3-4 times per week', 'Juice it or roast and add to salads'),
  ('Hypertension', 'Garlic', 'Contains allicin which helps relax blood vessels and lower blood pressure', '2-3 cloves', 'Daily', 'Consume raw or add to cooked dishes'),
  ('Heart Disease', 'Omega-3 Rich Fish', 'Reduces inflammation, lowers triglycerides, and improves heart health', '3-4 ounces', '2-3 times per week', 'Baked, grilled, or steamed'),
  ('Heart Disease', 'Oats', 'Beta-glucan fiber helps reduce LDL cholesterol and supports heart health', '1 cup cooked', 'Daily', 'Cook with water or milk, add fruits and nuts'),
  ('Diabetes', 'Cinnamon', 'Helps improve insulin sensitivity and lower blood sugar levels', '1/2 teaspoon', 'Daily', 'Add to tea, smoothies, or oatmeal'),
  ('Hypertension', 'Banana', 'High in potassium which helps balance sodium and lower blood pressure', '1-2 medium bananas', 'Daily', 'Eat fresh or add to smoothies'),
  ('Heart Disease', 'Dark Leafy Greens', 'Rich in vitamins, minerals, and antioxidants that protect the heart', '1-2 cups', 'Daily', 'Raw in salads or lightly sautéed'),
  ('Diabetes', 'Chia Seeds', 'High in fiber, helps stabilize blood sugar and improve digestion', '1 tablespoon', 'Daily', 'Soak in water or add to yogurt and smoothies')
) AS data(disease_name, food_name, benefits, how_much, frequency, preparation_method);

-- Insert 10 sample self care procedures
INSERT INTO public.self_care_procedures (category_id, title, description, steps, benefits, ingredients, duration, frequency, precautions, image_url)
SELECT 
  (SELECT id FROM public.self_care_categories WHERE name = category_name LIMIT 1),
  title,
  description,
  steps,
  benefits,
  ingredients,
  duration,
  frequency,
  precautions,
  image_url
FROM (VALUES
  ('Skin Care', 'Turmeric Face Mask', 'Natural face mask for glowing skin', ARRAY['Mix turmeric with yogurt and honey', 'Apply evenly on clean face', 'Leave for 15 minutes', 'Rinse with lukewarm water'], ARRAY['Brightens skin', 'Reduces inflammation', 'Anti-aging properties'], ARRAY['1 tsp turmeric', '2 tbsp yogurt', '1 tsp honey'], '15 minutes', '2-3 times per week', ARRAY['May stain skin temporarily', 'Do patch test first'], 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800'),
  ('Skin Care', 'Aloe Vera Gel Treatment', 'Soothing gel for skin hydration', ARRAY['Extract fresh aloe vera gel', 'Apply directly to clean skin', 'Massage gently in circular motions', 'Leave overnight or for 30 minutes'], ARRAY['Deep hydration', 'Soothes sunburn', 'Reduces acne'], ARRAY['Fresh aloe vera leaf'], '30 minutes or overnight', 'Daily', ARRAY['Use fresh gel only', 'Store in refrigerator'], 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800'),
  ('Hair Care', 'Coconut Oil Hair Massage', 'Deep conditioning treatment for hair', ARRAY['Warm coconut oil slightly', 'Section hair and apply oil to scalp', 'Massage for 10 minutes', 'Apply to hair length', 'Leave for 1 hour or overnight', 'Wash with mild shampoo'], ARRAY['Promotes hair growth', 'Reduces dandruff', 'Deep conditioning'], ARRAY['3-4 tbsp coconut oil'], '1-2 hours', '2 times per week', ARRAY['Do not overheat oil', 'May require double shampooing'], 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800'),
  ('Hair Care', 'Egg Hair Mask', 'Protein treatment for stronger hair', ARRAY['Beat 1-2 eggs', 'Apply to damp hair', 'Cover with shower cap', 'Leave for 30 minutes', 'Rinse with cool water', 'Shampoo as usual'], ARRAY['Strengthens hair', 'Adds shine', 'Repairs damage'], ARRAY['1-2 eggs', '1 tbsp olive oil'], '30 minutes', 'Once per week', ARRAY['Use cool water to rinse', 'May have strong smell'], 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800'),
  ('Fitness Care', 'Morning Yoga Routine', 'Energizing yoga flow for daily practice', ARRAY['Start with breathing exercises', 'Perform Sun Salutations (5 rounds)', 'Include standing poses', 'Add core strengthening', 'End with relaxation'], ARRAY['Increases flexibility', 'Builds strength', 'Reduces stress', 'Improves focus'], ARRAY['Yoga mat', 'Comfortable clothing'], '20-30 minutes', 'Daily', ARRAY['Warm up properly', 'Listen to your body', 'Avoid on full stomach'], 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'),
  ('Fitness Care', '7-Minute Workout', 'High-intensity interval training', ARRAY['Jumping jacks - 30 seconds', 'Wall sit - 30 seconds', 'Push-ups - 30 seconds', 'Abdominal crunches - 30 seconds', 'Repeat circuit'], ARRAY['Burns calories', 'Improves cardiovascular health', 'Builds strength', 'Time-efficient'], ARRAY['Exercise mat', 'Water bottle'], '7 minutes', 'Daily', ARRAY['Consult doctor if health issues', 'Stay hydrated', 'Proper form is essential'], 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800'),
  ('Skin Care', 'Honey Lemon Face Scrub', 'Exfoliating scrub for smooth skin', ARRAY['Mix honey with lemon juice and sugar', 'Apply on damp face', 'Gently scrub in circular motions', 'Focus on T-zone', 'Rinse thoroughly'], ARRAY['Exfoliates dead skin', 'Brightens complexion', 'Natural antibacterial'], ARRAY['2 tbsp honey', '1 tsp lemon juice', '1 tbsp sugar'], '10 minutes', 'Once per week', ARRAY['Avoid if sensitive skin', 'Do not use on active acne'], 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800'),
  ('Hair Care', 'Onion Juice Hair Growth Treatment', 'Natural remedy for hair growth', ARRAY['Blend onions and strain juice', 'Apply juice to scalp', 'Massage for 5 minutes', 'Leave for 30-60 minutes', 'Wash with mild shampoo'], ARRAY['Stimulates hair growth', 'Reduces hair fall', 'Improves hair texture'], ARRAY['2-3 onions', 'Few drops of essential oil'], '30-60 minutes', '2-3 times per week', ARRAY['Strong smell', 'May cause scalp irritation in some'], 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800'),
  ('Fitness Care', 'Walking Meditation', 'Mindful walking for mental and physical health', ARRAY['Find a quiet walking path', 'Walk at a slow, steady pace', 'Focus on your breath', 'Notice each step mindfully', 'Stay present in the moment'], ARRAY['Reduces stress', 'Improves focus', 'Gentle exercise', 'Connects mind and body'], ARRAY['Comfortable shoes', 'Quiet space'], '15-30 minutes', 'Daily', ARRAY['Watch your path', 'Start slow if new to meditation'], 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800'),
  ('Skin Care', 'Rose Water Toner', 'Refreshing toner for all skin types', ARRAY['Cleanse face thoroughly', 'Soak cotton pad in rose water', 'Apply to face and neck', 'Let it air dry', 'Follow with moisturizer'], ARRAY['Balances pH', 'Tightens pores', 'Hydrates skin', 'Reduces redness'], ARRAY['Pure rose water', 'Cotton pads'], '5 minutes', 'Daily (morning and night)', ARRAY['Use pure rose water', 'Store in cool place'], 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800')
) AS data(category_name, title, description, steps, benefits, ingredients, duration, frequency, precautions, image_url);

-- Insert 10 sample blog posts
INSERT INTO public.blogs (title, content, excerpt, cover_image_url, category, tags, author_name, status) VALUES
('10 Superfoods for a Healthier You', 'Discover the power of superfoods and how they can transform your health. From antioxidant-rich berries to omega-3 packed fish, learn about the top 10 superfoods that should be part of your daily diet. These nutrient-dense foods not only taste great but also provide incredible health benefits including improved heart health, better brain function, and enhanced immunity. Include foods like blueberries, salmon, kale, quinoa, and more in your meals to experience optimal health.', 'Explore the top 10 superfoods that can boost your health and vitality naturally', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', 'Nutrition', ARRAY['nutrition', 'superfoods', 'health'], 'HealthyPlates Team', 'published'),
('The Ultimate Guide to Meal Planning', 'Meal planning is the key to maintaining a healthy diet while saving time and money. This comprehensive guide walks you through the process of planning your weekly meals, creating shopping lists, and preparing nutritious meals in advance. Learn how to balance macronutrients, incorporate variety, and make healthy eating sustainable. We cover tips for batch cooking, proper food storage, and how to adapt meal plans for different dietary needs.', 'Master the art of meal planning with our step-by-step guide to healthier eating', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800', 'Meal Planning', ARRAY['meal planning', 'healthy eating', 'wellness'], 'Dr. Sarah Johnson', 'published'),
('Understanding Macronutrients: A Complete Guide', 'Macronutrients are the foundation of nutrition - proteins, carbohydrates, and fats. This article breaks down each macronutrient, explaining their roles in the body, best sources, and how to balance them for optimal health. Whether you are looking to lose weight, build muscle, or simply maintain good health, understanding macros is essential. Learn about portion sizes, quality sources, and how to calculate your personal macronutrient needs.', 'Learn everything about proteins, carbs, and fats for optimal nutrition', 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800', 'Nutrition', ARRAY['nutrition', 'macronutrients', 'education'], 'HealthyPlates Team', 'published'),
('Natural Remedies for Better Sleep', 'Quality sleep is crucial for overall health and wellbeing. Discover natural remedies and lifestyle changes that can help you achieve better sleep without medication. From herbal teas and relaxation techniques to creating the perfect sleep environment, this guide covers evidence-based methods to improve your sleep quality. Learn about the importance of sleep hygiene, circadian rhythms, and how diet affects your sleep patterns.', 'Improve your sleep quality naturally with these proven remedies and tips', 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800', 'Wellness', ARRAY['sleep', 'wellness', 'natural remedies'], 'Dr. Michael Chen', 'published'),
('Yoga for Beginners: Getting Started', 'Start your yoga journey with confidence using this beginner-friendly guide. Yoga offers numerous physical and mental health benefits including increased flexibility, reduced stress, and improved strength. This article covers basic poses, breathing techniques, and tips for establishing a regular practice. Learn about different yoga styles, what equipment you need, and how to prevent common mistakes beginners make.', 'Begin your yoga practice with this comprehensive guide for beginners', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Fitness', ARRAY['yoga', 'fitness', 'beginners'], 'Emma Williams', 'published'),
('The Anti-Inflammatory Diet Explained', 'Chronic inflammation is linked to many health conditions including heart disease, diabetes, and arthritis. Learn how an anti-inflammatory diet can help reduce inflammation and promote healing. This guide covers foods to include and avoid, sample meal plans, and the science behind why certain foods fight inflammation. Discover how simple dietary changes can have a profound impact on your health and wellbeing.', 'Combat inflammation naturally through diet with this evidence-based guide', 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800', 'Nutrition', ARRAY['anti-inflammatory', 'diet', 'health'], 'Dr. Sarah Johnson', 'published'),
('Mindful Eating: Transform Your Relationship with Food', 'Mindful eating is about being present and fully experiencing your meals. This practice can help you make healthier food choices, enjoy your meals more, and develop a better relationship with food. Learn techniques for eating mindfully, recognizing hunger and fullness cues, and overcoming emotional eating. Discover how slowing down and paying attention can transform not just what you eat, but how you eat.', 'Discover the power of mindful eating to improve your health and wellbeing', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 'Wellness', ARRAY['mindful eating', 'wellness', 'mental health'], 'HealthyPlates Team', 'published'),
('Building a Home Workout Routine', 'You do not need a gym membership to stay fit. This comprehensive guide shows you how to create an effective workout routine at home with minimal equipment. Learn about bodyweight exercises, creating a balanced routine, and how to progress safely. Whether you are a beginner or experienced exerciser, discover how to build strength, improve cardiovascular health, and maintain fitness from the comfort of your home.', 'Create an effective home workout routine with minimal equipment needed', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', 'Fitness', ARRAY['fitness', 'home workout', 'exercise'], 'Mike Roberts', 'published'),
('The Benefits of Intermittent Fasting', 'Intermittent fasting has gained popularity as both a weight loss tool and health optimization strategy. This article explores different fasting protocols, the science behind intermittent fasting, and its potential health benefits. Learn about the 16:8 method, 5:2 diet, and other approaches. Understand how fasting affects metabolism, cellular repair, and longevity. Includes practical tips for getting started safely and effectively.', 'Explore intermittent fasting and its potential health and weight loss benefits', 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800', 'Nutrition', ARRAY['intermittent fasting', 'diet', 'weight loss'], 'Dr. Michael Chen', 'published'),
('Natural Skincare Routine for Healthy Skin', 'Achieve radiant, healthy skin using natural ingredients and simple routines. This guide covers everything from understanding your skin type to creating a personalized skincare routine using natural products. Learn about the benefits of ingredients like aloe vera, honey, coconut oil, and essential oils. Discover DIY recipes for cleansers, toners, masks, and moisturizers that are gentle yet effective for all skin types.', 'Develop a natural skincare routine for glowing, healthy skin at any age', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800', 'Self Care', ARRAY['skincare', 'natural remedies', 'beauty'], 'Emma Williams', 'published');