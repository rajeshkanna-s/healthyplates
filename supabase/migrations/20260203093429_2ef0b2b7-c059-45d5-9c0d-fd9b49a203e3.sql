-- First, let's add more diseases to the diseases table

-- Diabetes (Type 2)
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Diabetes (Type 2)',
  'Focus on high-fibre, minimally processed foods that digest slowly and help keep blood sugar stable. Avoid sugary drinks and refined carbs.',
  ARRAY['High blood sugar', 'Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing wounds']
) ON CONFLICT DO NOTHING;

-- Heart Disease
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Heart Disease',
  'Diet focuses on more plant foods, healthy fats, and less saturated and trans fat to help protect blood vessels and reduce risk of further heart problems.',
  ARRAY['Chest pain', 'Shortness of breath', 'Fatigue', 'Irregular heartbeat', 'Swelling in legs', 'Dizziness']
) ON CONFLICT DO NOTHING;

-- High Blood Pressure (Hypertension)
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'High Blood Pressure (Hypertension)',
  'Focus on low-salt, high-potassium, high-fibre meals with plenty of vegetables and fruits. Avoid salty and highly processed foods.',
  ARRAY['Headaches', 'Dizziness', 'Shortness of breath', 'Nosebleeds', 'Blurred vision', 'Often no symptoms']
) ON CONFLICT DO NOTHING;

-- Skin Problems
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Skin Problems (General Support)',
  'Support skin health with antioxidant-rich fruits and vegetables, omega-3 fats, enough protein and water, while reducing very sugary and highly processed foods.',
  ARRAY['Acne', 'Dry skin', 'Dull complexion', 'Eczema', 'Rashes', 'Inflammation']
) ON CONFLICT DO NOTHING;

-- High Cholesterol
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'High Cholesterol',
  'Emphasize soluble fibre and healthy fats while reducing trans fat, saturated fat, and refined carbohydrates.',
  ARRAY['Often no symptoms', 'Chest pain', 'Yellowish deposits on skin', 'Fatigue', 'Numbness in extremities']
) ON CONFLICT DO NOTHING;

-- Fatty Liver (Non-alcoholic)
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Fatty Liver (Non-alcoholic)',
  'Weight management, controlled carbohydrates and limiting sugary foods are key. Emphasize vegetables, whole grains and lean protein.',
  ARRAY['Fatigue', 'Abdominal discomfort', 'Enlarged liver', 'Often no symptoms', 'Weakness']
) ON CONFLICT DO NOTHING;

-- PCOS / Insulin Resistance
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'PCOS / Insulin Resistance',
  'Emphasize low-GI, high-fibre foods, adequate protein, and healthy fats to improve insulin sensitivity and hormone balance.',
  ARRAY['Irregular periods', 'Weight gain', 'Acne', 'Excess hair growth', 'Difficulty losing weight', 'Fatigue']
) ON CONFLICT DO NOTHING;

-- Constipation
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Constipation',
  'Increase fibre and fluids gradually. Include fruits, vegetables, whole grains and physical activity.',
  ARRAY['Infrequent bowel movements', 'Hard stools', 'Straining', 'Bloating', 'Abdominal discomfort']
) ON CONFLICT DO NOTHING;

-- Acid Reflux / GERD
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Acid Reflux / GERD',
  'Smaller, more frequent meals; avoid lying down soon after eating; limit common trigger foods.',
  ARRAY['Heartburn', 'Regurgitation', 'Chest pain', 'Difficulty swallowing', 'Sore throat', 'Chronic cough']
) ON CONFLICT DO NOTHING;

-- Iron-Deficiency Anemia
INSERT INTO public.diseases (name, description, symptoms)
VALUES (
  'Iron-Deficiency Anemia',
  'Include iron-rich foods with vitamin C sources to enhance absorption. Limit tea/coffee around meals.',
  ARRAY['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath', 'Dizziness', 'Cold hands and feet', 'Brittle nails']
) ON CONFLICT DO NOTHING;