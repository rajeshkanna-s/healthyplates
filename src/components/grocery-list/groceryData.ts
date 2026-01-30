import { GroceryTemplateItem, RecipeTemplate, GroceryGroup } from './types';

// South Indian Veg Low 7 Days Base Template
export const southVegLowBase: GroceryTemplateItem[] = [
  // Grains & Flours
  { name: 'Rice (raw/ponni)', group: 'Grains & Flours', quantity: 2, unit: 'kg', storage: 'Room', substitute: 'Boiled rice' },
  { name: 'Wheat Atta', group: 'Grains & Flours', quantity: 1, unit: 'kg', storage: 'Room', substitute: 'Multigrain atta' },
  { name: 'Rava/Sooji', group: 'Grains & Flours', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Poha (Aval)', group: 'Grains & Flours', quantity: 0.5, unit: 'kg', storage: 'Room' },
  
  // Pulses & Legumes
  { name: 'Toor Dal', group: 'Pulses & Legumes', quantity: 1, unit: 'kg', storage: 'Room' },
  { name: 'Moong Dal', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Chana Dal', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  
  // Vegetables
  { name: 'Onion', group: 'Vegetables', quantity: 1.5, unit: 'kg', storage: 'Room' },
  { name: 'Tomato', group: 'Vegetables', quantity: 1.5, unit: 'kg', storage: 'Room/Fridge', useWithin: '5 days' },
  { name: 'Potato', group: 'Vegetables', quantity: 1, unit: 'kg', storage: 'Room' },
  { name: 'Carrot', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '7 days' },
  { name: 'Beans', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '4 days' },
  { name: 'Brinjal', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '5 days' },
  { name: 'Okra/Ladies Finger', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Spinach/Greens', group: 'Vegetables', quantity: 2, unit: 'bunch', storage: 'Fridge', useWithin: '2 days' },
  { name: 'Cucumber', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '5 days' },
  { name: 'Drumstick', group: 'Vegetables', quantity: 0.25, unit: 'kg', storage: 'Fridge', useWithin: '4 days' },
  { name: 'Green Chilies', group: 'Vegetables', quantity: 100, unit: 'g', storage: 'Fridge' },
  { name: 'Ginger', group: 'Vegetables', quantity: 200, unit: 'g', storage: 'Fridge' },
  { name: 'Garlic', group: 'Vegetables', quantity: 250, unit: 'g', storage: 'Room/Fridge' },
  { name: 'Curry Leaves', group: 'Vegetables', quantity: 2, unit: 'bunch', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Lemon', group: 'Vegetables', quantity: 6, unit: 'count', storage: 'Room' },
  { name: 'Coriander Leaves', group: 'Vegetables', quantity: 2, unit: 'bunch', storage: 'Fridge', useWithin: '3 days' },
  
  // Fruits
  { name: 'Banana', group: 'Fruits', quantity: 12, unit: 'count', storage: 'Room', useWithin: '4 days' },
  { name: 'Papaya', group: 'Fruits', quantity: 1, unit: 'count', storage: 'Room', useWithin: '3 days' },
  { name: 'Guava', group: 'Fruits', quantity: 1, unit: 'kg', storage: 'Room/Fridge', useWithin: '5 days' },
  
  // Protein Sources
  { name: 'Soya Chunks', group: 'Protein Sources', quantity: 0.25, unit: 'kg', storage: 'Room' },
  
  // Dairy
  { name: 'Curd/Dahi', group: 'Dairy', quantity: 1.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Milk', group: 'Dairy', quantity: 2, unit: 'ltr', storage: 'Fridge', useWithin: '2 days' },
  
  // Healthy Fats
  { name: 'Groundnut Oil', group: 'Healthy Fats', quantity: 1, unit: 'ltr', storage: 'Room', substitute: 'Sunflower oil' },
  { name: 'Coconut (whole)', group: 'Healthy Fats', quantity: 2, unit: 'count', storage: 'Room/Fridge' },
  { name: 'Peanuts', group: 'Healthy Fats', quantity: 0.5, unit: 'kg', storage: 'Room' },
  
  // Spices & Basics
  { name: 'Salt', group: 'Spices & Basics', quantity: 1, unit: 'kg', storage: 'Room' },
  { name: 'Turmeric Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Red Chili Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Coriander Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Mustard Seeds', group: 'Spices & Basics', quantity: 100, unit: 'g', storage: 'Room' },
  { name: 'Cumin Seeds', group: 'Spices & Basics', quantity: 100, unit: 'g', storage: 'Room' },
  { name: 'Sambar Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Rasam Powder', group: 'Spices & Basics', quantity: 100, unit: 'g', storage: 'Room' },
  { name: 'Tamarind', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
];

// South Indian Veg Medium additions
export const southVegMediumAdditions: GroceryTemplateItem[] = [
  { name: 'Paneer', group: 'Protein Sources', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days', substitute: 'Tofu' },
  { name: 'Chickpeas (Kabuli)', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Oats', group: 'Grains & Flours', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Apple', group: 'Fruits', quantity: 1, unit: 'kg', storage: 'Room/Fridge', useWithin: '7 days' },
  { name: 'Orange/Sweet Lime', group: 'Fruits', quantity: 1, unit: 'kg', storage: 'Room/Fridge', useWithin: '7 days' },
  { name: 'Sesame Oil', group: 'Healthy Fats', quantity: 0.5, unit: 'ltr', storage: 'Room' },
  { name: 'Ghee', group: 'Healthy Fats', quantity: 0.25, unit: 'kg', storage: 'Room' },
];

// South Indian NonVeg additions
export const southNonVegAdditions: GroceryTemplateItem[] = [
  { name: 'Eggs', group: 'Protein Sources', quantity: 12, unit: 'count', storage: 'Fridge', useWithin: '14 days' },
  { name: 'Chicken', group: 'Protein Sources', quantity: 1.5, unit: 'kg', storage: 'Fridge', useWithin: '2 days', substitute: 'Eggs' },
  { name: 'Fish (Local/Seer)', group: 'Protein Sources', quantity: 0.75, unit: 'kg', storage: 'Fridge', useWithin: '1 day', substitute: 'Chicken' },
  { name: 'Pepper Powder', group: 'Spices & Basics', quantity: 50, unit: 'g', storage: 'Room' },
  { name: 'Fennel Seeds', group: 'Spices & Basics', quantity: 50, unit: 'g', storage: 'Room' },
];

// North Indian Veg Low 7 Days Base Template
export const northVegLowBase: GroceryTemplateItem[] = [
  // Grains & Flours
  { name: 'Wheat Atta', group: 'Grains & Flours', quantity: 2, unit: 'kg', storage: 'Room' },
  { name: 'Rice', group: 'Grains & Flours', quantity: 1, unit: 'kg', storage: 'Room' },
  { name: 'Dalia', group: 'Grains & Flours', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Poha', group: 'Grains & Flours', quantity: 0.5, unit: 'kg', storage: 'Room' },
  
  // Pulses & Legumes
  { name: 'Toor Dal', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Masoor Dal', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Chana Dal', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Chickpeas (Kabuli)', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Rajma', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  
  // Vegetables
  { name: 'Onion', group: 'Vegetables', quantity: 2, unit: 'kg', storage: 'Room' },
  { name: 'Tomato', group: 'Vegetables', quantity: 2, unit: 'kg', storage: 'Room/Fridge', useWithin: '5 days' },
  { name: 'Potato', group: 'Vegetables', quantity: 1.5, unit: 'kg', storage: 'Room' },
  { name: 'Cabbage', group: 'Vegetables', quantity: 1, unit: 'count', storage: 'Fridge', useWithin: '7 days' },
  { name: 'Cauliflower', group: 'Vegetables', quantity: 1, unit: 'count', storage: 'Fridge', useWithin: '5 days' },
  { name: 'Okra/Ladies Finger', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Spinach/Palak', group: 'Vegetables', quantity: 2, unit: 'bunch', storage: 'Fridge', useWithin: '2 days' },
  { name: 'Carrot', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '7 days' },
  { name: 'Cucumber', group: 'Vegetables', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '5 days' },
  { name: 'Garlic', group: 'Vegetables', quantity: 250, unit: 'g', storage: 'Room/Fridge' },
  { name: 'Ginger', group: 'Vegetables', quantity: 150, unit: 'g', storage: 'Fridge' },
  { name: 'Green Chilies', group: 'Vegetables', quantity: 100, unit: 'g', storage: 'Fridge' },
  { name: 'Coriander Leaves', group: 'Vegetables', quantity: 2, unit: 'bunch', storage: 'Fridge', useWithin: '3 days' },
  
  // Fruits
  { name: 'Banana', group: 'Fruits', quantity: 12, unit: 'count', storage: 'Room', useWithin: '4 days' },
  { name: 'Apple', group: 'Fruits', quantity: 1, unit: 'kg', storage: 'Room/Fridge', useWithin: '7 days' },
  { name: 'Seasonal Fruit', group: 'Fruits', quantity: 1, unit: 'kg', storage: 'Room/Fridge', useWithin: '5 days' },
  
  // Dairy
  { name: 'Curd/Dahi', group: 'Dairy', quantity: 1, unit: 'kg', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Milk', group: 'Dairy', quantity: 2, unit: 'ltr', storage: 'Fridge', useWithin: '2 days' },
  
  // Healthy Fats
  { name: 'Sunflower/Groundnut Oil', group: 'Healthy Fats', quantity: 1, unit: 'ltr', storage: 'Room' },
  { name: 'Ghee', group: 'Healthy Fats', quantity: 0.25, unit: 'kg', storage: 'Room' },
  
  // Spices & Basics
  { name: 'Salt', group: 'Spices & Basics', quantity: 1, unit: 'kg', storage: 'Room' },
  { name: 'Turmeric Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Red Chili Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Coriander Powder', group: 'Spices & Basics', quantity: 200, unit: 'g', storage: 'Room' },
  { name: 'Cumin Seeds', group: 'Spices & Basics', quantity: 100, unit: 'g', storage: 'Room' },
  { name: 'Garam Masala', group: 'Spices & Basics', quantity: 100, unit: 'g', storage: 'Room' },
  { name: 'Dry Mango Powder', group: 'Spices & Basics', quantity: 50, unit: 'g', storage: 'Room' },
];

// North Indian Veg Medium additions
export const northVegMediumAdditions: GroceryTemplateItem[] = [
  { name: 'Paneer', group: 'Protein Sources', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days', substitute: 'Tofu' },
  { name: 'Butter', group: 'Dairy', quantity: 0.1, unit: 'kg', storage: 'Fridge' },
  { name: 'Cream', group: 'Dairy', quantity: 0.2, unit: 'ltr', storage: 'Fridge', useWithin: '5 days' },
  { name: 'Kasuri Methi', group: 'Spices & Basics', quantity: 50, unit: 'g', storage: 'Room' },
];

// North Indian NonVeg additions
export const northNonVegAdditions: GroceryTemplateItem[] = [
  { name: 'Eggs', group: 'Protein Sources', quantity: 12, unit: 'count', storage: 'Fridge', useWithin: '14 days' },
  { name: 'Chicken', group: 'Protein Sources', quantity: 1.5, unit: 'kg', storage: 'Fridge', useWithin: '2 days', substitute: 'Eggs' },
  { name: 'Mutton', group: 'Protein Sources', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '2 days', substitute: 'Chicken' },
];

// High Protein additions
export const highProteinAdditions: GroceryTemplateItem[] = [
  { name: 'Soya Chunks (Extra)', group: 'Protein Sources', quantity: 0.25, unit: 'kg', storage: 'Room' },
  { name: 'Dal (Extra)', group: 'Pulses & Legumes', quantity: 0.5, unit: 'kg', storage: 'Room' },
  { name: 'Curd (Extra)', group: 'Dairy', quantity: 0.5, unit: 'kg', storage: 'Fridge', useWithin: '3 days' },
  { name: 'Eggs (Extra)', group: 'Protein Sources', quantity: 6, unit: 'count', storage: 'Fridge', useWithin: '14 days' },
  { name: 'Peanuts (Extra)', group: 'Healthy Fats', quantity: 0.25, unit: 'kg', storage: 'Room' },
];

// Recipe Templates
export const recipeTemplates: RecipeTemplate[] = [
  // South Indian Breakfast
  { name: 'Idli + Sambar', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'urad dal', 'toor dal', 'sambar powder'] },
  { name: 'Dosa + Chutney', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'urad dal', 'coconut', 'green chili'] },
  { name: 'Upma', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rava', 'onion', 'curry leaves'] },
  { name: 'Poha', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['poha', 'onion', 'peanuts', 'curry leaves'] },
  { name: 'Rava Dosa', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rava', 'rice flour', 'onion', 'curry leaves'] },
  { name: 'Pongal', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'moong dal', 'pepper', 'ghee'] },
  
  // South Indian Lunch
  { name: 'Sambar Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'toor dal', 'sambar powder', 'vegetables'] },
  { name: 'Curd Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'curd', 'curry leaves', 'mustard'] },
  { name: 'Rasam Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'rasam powder', 'tomato', 'tamarind'] },
  { name: 'Lemon Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['rice', 'lemon', 'peanuts', 'curry leaves'] },
  { name: 'Vegetable Kootu', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['chana dal', 'vegetables', 'coconut'] },
  { name: 'Poriyal', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['vegetables', 'coconut', 'mustard', 'curry leaves'] },
  
  // South Indian Dinner
  { name: 'Chapati + Dal', mealTime: 'Dinner', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['wheat atta', 'toor dal', 'tomato'] },
  { name: 'Appam + Stew', mealTime: 'Dinner', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Medium', keyIngredients: ['rice', 'coconut milk', 'vegetables'] },
  
  // South Indian NonVeg
  { name: 'Egg Curry + Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'NonVeg', budgetTier: 'Low', keyIngredients: ['eggs', 'onion', 'tomato', 'rice'] },
  { name: 'Chicken Curry + Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['chicken', 'onion', 'tomato', 'rice'] },
  { name: 'Fish Curry + Rice', mealTime: 'Lunch', cuisine: 'South', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['fish', 'tamarind', 'tomato', 'rice'] },
  { name: 'Pepper Chicken', mealTime: 'Dinner', cuisine: 'South', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['chicken', 'pepper', 'curry leaves'] },
  { name: 'Egg Dosa', mealTime: 'Breakfast', cuisine: 'South', vegFlag: 'NonVeg', budgetTier: 'Low', keyIngredients: ['rice', 'eggs', 'onion'] },
  
  // South Indian Snacks
  { name: 'Sundal', mealTime: 'Snack', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['chickpeas', 'coconut', 'curry leaves'] },
  { name: 'Fruit Bowl + Curd', mealTime: 'Snack', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['banana', 'papaya', 'curd'] },
  { name: 'Buttermilk', mealTime: 'Snack', cuisine: 'South', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['curd', 'curry leaves', 'ginger'] },
  
  // North Indian Breakfast
  { name: 'Paratha + Curd', mealTime: 'Breakfast', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['wheat atta', 'potato', 'curd'] },
  { name: 'Poha', mealTime: 'Breakfast', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['poha', 'onion', 'peanuts'] },
  { name: 'Dalia', mealTime: 'Breakfast', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['dalia', 'vegetables', 'ghee'] },
  { name: 'Aloo Paratha', mealTime: 'Breakfast', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['wheat atta', 'potato', 'spices'] },
  
  // North Indian Lunch
  { name: 'Dal + Roti', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['toor dal', 'wheat atta', 'ghee'] },
  { name: 'Chole + Rice', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Medium', keyIngredients: ['chickpeas', 'rice', 'onion', 'garam masala'] },
  { name: 'Rajma + Rice', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Medium', keyIngredients: ['rajma', 'rice', 'onion', 'tomato'] },
  { name: 'Palak Paneer + Roti', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Medium', keyIngredients: ['spinach', 'paneer', 'wheat atta'] },
  { name: 'Bhindi Masala + Roti', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['okra', 'wheat atta', 'onion'] },
  { name: 'Aloo Gobi + Roti', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['potato', 'cauliflower', 'wheat atta'] },
  
  // North Indian Dinner
  { name: 'Dal Tadka + Rice', mealTime: 'Dinner', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['masoor dal', 'rice', 'ghee', 'cumin'] },
  { name: 'Mixed Veg + Roti', mealTime: 'Dinner', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['vegetables', 'wheat atta', 'spices'] },
  
  // North Indian NonVeg
  { name: 'Egg Bhurji + Roti', mealTime: 'Breakfast', cuisine: 'North', vegFlag: 'NonVeg', budgetTier: 'Low', keyIngredients: ['eggs', 'wheat atta', 'onion', 'tomato'] },
  { name: 'Butter Chicken + Rice', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['chicken', 'butter', 'cream', 'rice'] },
  { name: 'Chicken Curry + Roti', mealTime: 'Lunch', cuisine: 'North', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['chicken', 'wheat atta', 'onion', 'tomato'] },
  { name: 'Keema + Roti', mealTime: 'Dinner', cuisine: 'North', vegFlag: 'NonVeg', budgetTier: 'Medium', keyIngredients: ['mutton', 'wheat atta', 'onion'] },
  
  // North Indian Snacks
  { name: 'Chana Chaat', mealTime: 'Snack', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['chickpeas', 'onion', 'lemon', 'spices'] },
  { name: 'Lassi', mealTime: 'Snack', cuisine: 'North', vegFlag: 'Veg', budgetTier: 'Low', keyIngredients: ['curd', 'sugar'] },
];

// Pantry staples that users might already have
export const pantryStaples = [
  'Rice',
  'Wheat Atta',
  'Toor Dal',
  'Salt',
  'Oil',
  'Basic Spices (Turmeric, Chili, Coriander)',
  'Mustard & Cumin Seeds',
  'Sambar/Rasam Powder',
  'Garam Masala',
  'Tamarind',
];

// Items to avoid options
export const avoidableItems = [
  'Eggs',
  'Dairy (Milk, Curd)',
  'Onion',
  'Garlic',
  'Paneer',
  'Fish',
  'Chicken',
  'Mutton',
  'Coconut',
  'Peanuts',
];

// Cost estimates (INR)
export const costEstimates = {
  'Veg-Low-3': { min: 400, max: 700 },
  'Veg-Low-7': { min: 900, max: 1600 },
  'Veg-Medium-3': { min: 650, max: 1100 },
  'Veg-Medium-7': { min: 1400, max: 2400 },
  'NonVeg-Low-3': { min: 600, max: 1000 },
  'NonVeg-Low-7': { min: 1200, max: 2200 },
  'NonVeg-Medium-3': { min: 850, max: 1500 },
  'NonVeg-Medium-7': { min: 1800, max: 3200 },
};

// Storage tips
export const storageTips = [
  { item: 'Greens/Spinach', tip: 'Use within 2 days, wrap in paper towel', priority: 'high' as const },
  { item: 'Fish', tip: 'Cook within 1 day or freeze immediately', priority: 'high' as const },
  { item: 'Milk', tip: 'Check expiry, use within 2-3 days of opening', priority: 'high' as const },
  { item: 'Curd', tip: 'Keep refrigerated, use within 3 days', priority: 'high' as const },
  { item: 'Chicken', tip: 'Use within 2 days or freeze', priority: 'high' as const },
  { item: 'Tomatoes', tip: 'Store at room temp if unripe, fridge if ripe', priority: 'medium' as const },
  { item: 'Bananas', tip: 'Keep separate from other fruits', priority: 'medium' as const },
  { item: 'Curry Leaves', tip: 'Freeze extras for longer storage', priority: 'medium' as const },
  { item: 'Onions/Potatoes', tip: 'Store in cool, dark place - lasts weeks', priority: 'low' as const },
  { item: 'Pulses/Rice', tip: 'Store in airtight containers - lasts months', priority: 'low' as const },
];

// Common substitutions
export const substitutions = [
  { original: 'Paneer', substitute: 'Tofu or Soya Chunks', reason: 'Protein alternative' },
  { original: 'Fish', substitute: 'Eggs or Chicken', reason: 'If unavailable or expensive' },
  { original: 'Groundnut Oil', substitute: 'Sunflower or Coconut Oil', reason: 'Cooking oil swap' },
  { original: 'Fresh Coconut', substitute: 'Coconut Powder or Grated (frozen)', reason: 'Convenience' },
  { original: 'Spinach', substitute: 'Any leafy green or Cabbage', reason: 'If not fresh' },
  { original: 'Ghee', substitute: 'Butter or Oil', reason: 'Budget option' },
  { original: 'Basmati Rice', substitute: 'Sona Masoori or Ponni Rice', reason: 'Budget option' },
  { original: 'Chicken', substitute: 'Eggs or Soya Chunks', reason: 'Budget-friendly protein' },
];

// Group order for display
export const groupOrder: GroceryGroup[] = [
  'Grains & Flours',
  'Pulses & Legumes',
  'Vegetables',
  'Fruits',
  'Protein Sources',
  'Dairy',
  'Healthy Fats',
  'Spices & Basics',
  'Optional Add-Ons',
];
