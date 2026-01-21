// Health Planner Calculation Engine

import { UserIntake, CalculatedTargets, MealPlan, DayPlan, Meal, WeeklyShoppingList } from './types';
import { recipeDatabase, type Recipe } from './recipeDatabase';

// Activity multipliers
const ACTIVITY_MULTIPLIERS = {
  'sedentary': 1.2,
  'light': 1.375,
  'moderate': 1.55,
  'very-active': 1.725,
  'super-active': 1.9,
};

// Plan length in days
const PLAN_DAYS = {
  '1-week': 7,
  '1-month': 30,
  '3-months': 90,
  '6-months': 180,
  '1-year': 365,
};

// Mifflin-St Jeor BMR Formula
export function calculateBMR(sex: string, weightKg: number, heightCm: number, age: number): number {
  if (sex === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

// Calculate TDEE
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel as keyof typeof ACTIVITY_MULTIPLIERS] || 1.2;
  return Math.round(bmr * multiplier);
}

// Calculate target calories based on goal
export function calculateTargetCalories(
  tdee: number,
  goal: string,
  targetPace: string | undefined,
  weightKg: number
): { targetCalories: number; weeklyChangeKg: number; deficitOrSurplus: number } {
  let targetCalories = tdee;
  let weeklyChangeKg = 0;
  let deficitOrSurplus = 0;

  switch (goal) {
    case 'weight-loss':
      // Deficit based on pace
      const deficitPercent = targetPace === 'slow' ? 0.10 : targetPace === 'aggressive' ? 0.20 : 0.15;
      deficitOrSurplus = -Math.round(tdee * deficitPercent);
      targetCalories = tdee + deficitOrSurplus;
      // ~7700 kcal = 1kg fat
      weeklyChangeKg = -(deficitOrSurplus * 7) / 7700;
      break;
    case 'weight-gain':
      // Surplus based on pace
      const surplus = targetPace === 'slow' ? 250 : targetPace === 'aggressive' ? 500 : 350;
      deficitOrSurplus = surplus;
      targetCalories = tdee + surplus;
      weeklyChangeKg = (surplus * 7) / 7700;
      break;
    case 'maintain':
      targetCalories = tdee;
      weeklyChangeKg = 0;
      break;
    case 'recomp':
      // Slight deficit for body recomposition
      deficitOrSurplus = -Math.round(tdee * 0.05);
      targetCalories = tdee + deficitOrSurplus;
      weeklyChangeKg = 0;
      break;
    case 'manage-condition':
      // Maintenance with focus on food quality
      targetCalories = tdee;
      weeklyChangeKg = 0;
      break;
  }

  // Ensure minimum calories
  const minCalories = 1200;
  if (targetCalories < minCalories) {
    targetCalories = minCalories;
  }

  return { targetCalories, weeklyChangeKg, deficitOrSurplus };
}

// Calculate macros
export function calculateMacros(
  targetCalories: number,
  weightKg: number,
  goal: string,
  conditions: string[]
): { proteinGrams: number; carbsGrams: number; fatGrams: number } {
  // Protein: 1.6g/kg for weight loss/gain, 1.2g/kg for maintenance
  let proteinMultiplier = 1.4;
  if (goal === 'weight-loss' || goal === 'weight-gain' || goal === 'recomp') {
    proteinMultiplier = 1.6;
  }
  
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% of total calories
  let fatPercent = 0.25;
  if (conditions.includes('diabetes')) {
    fatPercent = 0.30; // Higher fat, lower carbs for diabetes
  }
  
  const fatCalories = targetCalories * fatPercent;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: remaining calories
  const carbsCalories = targetCalories - proteinCalories - fatCalories;
  let carbsGrams = Math.round(carbsCalories / 4);

  // Adjust for diabetes - cap carbs
  if (conditions.includes('diabetes')) {
    const maxCarbsPerMeal = 50;
    const maxDailyCarbs = maxCarbsPerMeal * 3 + 30; // 3 meals + snacks
    if (carbsGrams > maxDailyCarbs) {
      carbsGrams = maxDailyCarbs;
    }
  }

  return { proteinGrams, carbsGrams, fatGrams };
}

// Main calculation function
export function calculateTargets(intake: UserIntake): CalculatedTargets {
  const { profile, goal, activity, medical } = intake;

  const bmr = calculateBMR(profile.sex, profile.weightKg, profile.heightCm, profile.age);
  const tdee = calculateTDEE(bmr, activity.activityLevel);
  
  const { targetCalories, weeklyChangeKg, deficitOrSurplus } = calculateTargetCalories(
    tdee,
    goal.primaryGoal,
    goal.targetPace,
    profile.weightKg
  );

  const { proteinGrams, carbsGrams, fatGrams } = calculateMacros(
    targetCalories,
    profile.weightKg,
    goal.primaryGoal,
    medical.conditions
  );

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    weeklyWeightChangeKg: Math.round(weeklyChangeKg * 100) / 100,
    deficitOrSurplus,
  };
}

// Filter recipes based on user preferences
function filterRecipes(intake: UserIntake): Recipe[] {
  const { dietary, medical } = intake;
  
  return recipeDatabase.filter(recipe => {
    // Check allergies
    for (const allergy of dietary.allergies) {
      if (recipe.allergens.includes(allergy.toLowerCase())) {
        return false;
      }
    }

    // Check diet type
    if (dietary.dietTypes.includes('vegetarian') && !recipe.isVegetarian) {
      return false;
    }
    if (dietary.dietTypes.includes('vegan') && !recipe.isVegan) {
      return false;
    }
    if (dietary.dietTypes.includes('eggetarian') && !recipe.isVegetarian && !recipe.tags.includes('egg')) {
      return false;
    }

    // Check conditions
    if (medical.conditions.includes('diabetes') && !recipe.conditionFlags.diabetes_ok) {
      return false;
    }
    if (medical.conditions.includes('hypertension') && !recipe.conditionFlags.bp_ok) {
      return false;
    }

    // Check cooking time
    const maxTime = parseInt(dietary.cookingTime) || 45;
    if (recipe.prepTimeMinutes > maxTime) {
      return false;
    }

    return true;
  });
}

// Generate a single day's meal plan
function generateDayPlan(
  dayNumber: number,
  targets: CalculatedTargets,
  filteredRecipes: Recipe[],
  mealsPerDay: number,
  startDate: Date
): DayPlan {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayNumber - 1);

  const mealTypes = mealsPerDay === 2 
    ? ['Brunch', 'Dinner']
    : mealsPerDay === 3 
    ? ['Breakfast', 'Lunch', 'Dinner']
    : mealsPerDay === 4 
    ? ['Breakfast', 'Lunch', 'Snack', 'Dinner']
    : ['Breakfast', 'Mid-Morning Snack', 'Lunch', 'Evening Snack', 'Dinner'];

  const targetPerMeal = {
    kcal: Math.round(targets.targetCalories / mealsPerDay),
    protein: Math.round(targets.proteinGrams / mealsPerDay),
    carbs: Math.round(targets.carbsGrams / mealsPerDay),
    fat: Math.round(targets.fatGrams / mealsPerDay),
  };

  const meals: Meal[] = [];
  const usedRecipes = new Set<string>();

  for (const mealType of mealTypes) {
    // Filter recipes by meal type
    let mealRecipes = filteredRecipes.filter(r => {
      if (mealType.toLowerCase().includes('breakfast') || mealType.toLowerCase().includes('brunch')) {
        return r.mealType === 'breakfast' || r.mealType === 'any';
      }
      if (mealType.toLowerCase().includes('snack')) {
        return r.mealType === 'snack' || r.mealType === 'any';
      }
      return r.mealType === 'lunch' || r.mealType === 'dinner' || r.mealType === 'any';
    });

    // Avoid repetition
    mealRecipes = mealRecipes.filter(r => !usedRecipes.has(r.id));

    if (mealRecipes.length === 0) {
      mealRecipes = filteredRecipes.filter(r => !usedRecipes.has(r.id));
    }

    if (mealRecipes.length === 0) {
      mealRecipes = filteredRecipes;
    }

    // Pick a random recipe with some variety
    const randomIndex = (dayNumber + mealType.length) % mealRecipes.length;
    const recipe = mealRecipes[randomIndex] || mealRecipes[0];
    
    if (recipe) {
      usedRecipes.add(recipe.id);

      // Calculate portion to match target macros
      const portionMultiplier = targetPerMeal.kcal / recipe.macrosPer100g.kcal;
      const portionGrams = Math.round(100 * portionMultiplier);

      meals.push({
        name: mealType,
        recipeName: recipe.name,
        portionGrams: Math.min(portionGrams, 400), // Cap at 400g
        kcal: Math.round((recipe.macrosPer100g.kcal * portionGrams) / 100),
        proteinG: Math.round((recipe.macrosPer100g.protein * portionGrams) / 100),
        carbsG: Math.round((recipe.macrosPer100g.carbs * portionGrams) / 100),
        fatG: Math.round((recipe.macrosPer100g.fat * portionGrams) / 100),
        ingredients: recipe.ingredients,
        prepTime: recipe.prepTimeMinutes,
        instructions: recipe.instructions,
      });
    }
  }

  const totals = meals.reduce(
    (acc, meal) => ({
      kcal: acc.kcal + meal.kcal,
      protein: acc.protein + meal.proteinG,
      carbs: acc.carbs + meal.carbsG,
      fat: acc.fat + meal.fatG,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return {
    day: dayNumber,
    dayName: dayNames[date.getDay()],
    date: date.toISOString().split('T')[0],
    meals,
    totalKcal: totals.kcal,
    totalProtein: totals.protein,
    totalCarbs: totals.carbs,
    totalFat: totals.fat,
  };
}

// Generate shopping list for a week
function generateShoppingList(days: DayPlan[], weekNumber: number): WeeklyShoppingList {
  const ingredientMap = new Map<string, Set<string>>();
  
  const categories = {
    'Grains & Cereals': ['oats', 'rice', 'wheat', 'bread', 'roti', 'chapati', 'flour', 'poha', 'upma'],
    'Proteins': ['chicken', 'fish', 'egg', 'paneer', 'tofu', 'dal', 'lentil', 'beans', 'chickpea'],
    'Dairy': ['milk', 'curd', 'yogurt', 'cheese', 'butter', 'ghee'],
    'Vegetables': ['tomato', 'onion', 'potato', 'carrot', 'spinach', 'broccoli', 'capsicum', 'cucumber'],
    'Fruits': ['banana', 'apple', 'orange', 'mango', 'papaya', 'berries'],
    'Spices & Condiments': ['salt', 'pepper', 'turmeric', 'cumin', 'coriander', 'ginger', 'garlic'],
    'Others': [],
  };

  days.forEach(day => {
    day.meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        const ingLower = ing.toLowerCase();
        let category = 'Others';
        
        for (const [cat, keywords] of Object.entries(categories)) {
          if (keywords.some(kw => ingLower.includes(kw))) {
            category = cat;
            break;
          }
        }

        if (!ingredientMap.has(category)) {
          ingredientMap.set(category, new Set());
        }
        ingredientMap.get(category)?.add(ing);
      });
    });
  });

  const items = Array.from(ingredientMap.entries()).map(([category, ingredients]) => ({
    category,
    ingredients: Array.from(ingredients).map(name => ({
      name,
      quantity: 'As needed',
    })),
  }));

  return { weekNumber, items };
}

// Generate condition-specific notes
function generateConditionNotes(conditions: string[]): string[] {
  const notes: string[] = [];

  if (conditions.includes('diabetes')) {
    notes.push('Diabetes Management: Follow the plate method - 1/2 non-starchy vegetables, 1/4 lean protein, 1/4 whole grains.');
    notes.push('Spread carbohydrate intake evenly across meals to avoid blood sugar spikes.');
    notes.push('Avoid sugary drinks, fruit juices, and foods with added sugars.');
    notes.push('Monitor blood glucose levels regularly, especially when changing diet.');
  }

  if (conditions.includes('hypothyroidism')) {
    notes.push('Thyroid Medication: Take levothyroxine on empty stomach, 30-60 minutes before breakfast.');
    notes.push('Avoid iron and calcium supplements within 4 hours of thyroid medication.');
    notes.push('Include selenium-rich foods: Brazil nuts (1-2/day), seafood, eggs.');
    notes.push('Cook goitrogenic vegetables (cabbage, broccoli, cauliflower) to reduce impact.');
  }

  if (conditions.includes('hypertension')) {
    notes.push('Sodium Limit: Keep sodium under 2,300mg/day (ideally 1,500mg for better BP control).');
    notes.push('Include potassium-rich foods: bananas, potatoes, spinach, beans.');
    notes.push('Follow DASH diet principles: high fruits, vegetables, whole grains, lean proteins.');
    notes.push('Avoid processed foods, canned soups, and high-sodium condiments.');
  }

  if (conditions.includes('pcos')) {
    notes.push('Focus on low-glycemic foods to help manage insulin resistance.');
    notes.push('Include adequate protein at each meal to promote satiety.');
    notes.push('Include anti-inflammatory foods: fatty fish, olive oil, leafy greens.');
  }

  return notes;
}

// Generate general tips
function generateTips(intake: UserIntake): string[] {
  const tips = [
    'Stay hydrated: Aim for 8-10 glasses of water daily.',
    'Eat mindfully: Chew thoroughly and avoid distractions during meals.',
    'Prioritize sleep: Aim for 7-9 hours for optimal metabolism and recovery.',
    'Stay active: Include daily movement beyond structured exercise.',
    'Track progress: Keep a food diary and monitor weight weekly.',
  ];

  if (intake.medical.stressLevel === 'high') {
    tips.push('Manage stress: High cortisol can affect weight. Try meditation or deep breathing.');
  }

  if (intake.goal.primaryGoal === 'weight-loss') {
    tips.push('Protein first: Start meals with protein to boost satiety.');
    tips.push('Volume eating: Fill up on low-calorie, high-fiber vegetables.');
  }

  if (intake.goal.primaryGoal === 'weight-gain') {
    tips.push('Calorie-dense foods: Include nuts, dried fruits, and healthy oils.');
    tips.push('Meal timing: Eat every 3-4 hours to maintain calorie intake.');
  }

  return tips.slice(0, 6);
}

// Main meal plan generator
export function generateMealPlan(intake: UserIntake, targets: CalculatedTargets): MealPlan {
  const planDays = PLAN_DAYS[intake.goal.planLength as keyof typeof PLAN_DAYS] || 7;
  const filteredRecipes = filterRecipes(intake);
  const startDate = new Date();

  // Generate day plans
  const days: DayPlan[] = [];
  for (let i = 1; i <= planDays; i++) {
    days.push(generateDayPlan(i, targets, filteredRecipes, intake.activity.mealsPerDay, startDate));
  }

  // Generate weekly shopping lists
  const weeklyShoppingLists: WeeklyShoppingList[] = [];
  const numWeeks = Math.ceil(planDays / 7);
  for (let week = 1; week <= numWeeks; week++) {
    const weekDays = days.slice((week - 1) * 7, week * 7);
    weeklyShoppingLists.push(generateShoppingList(weekDays, week));
  }

  // Goal description
  const goalDescriptions = {
    'weight-loss': 'Weight Loss (Fat Loss)',
    'weight-gain': 'Weight Gain (Lean Mass)',
    'maintain': 'Weight Maintenance',
    'recomp': 'Body Recomposition',
    'manage-condition': 'Condition Management',
  };

  const planLengthDescriptions = {
    '1-week': '1 Week',
    '1-month': '1 Month',
    '3-months': '3 Months',
    '6-months': '6 Months',
    '1-year': '1 Year',
  };

  return {
    userSummary: {
      goal: goalDescriptions[intake.goal.primaryGoal as keyof typeof goalDescriptions] || intake.goal.primaryGoal,
      dailyTargets: targets,
      planLength: planLengthDescriptions[intake.goal.planLength as keyof typeof planLengthDescriptions] || intake.goal.planLength,
      startDate: startDate.toISOString().split('T')[0],
    },
    days,
    weeklyShoppingLists,
    conditionNotes: generateConditionNotes(intake.medical.conditions),
    tips: generateTips(intake),
  };
}
