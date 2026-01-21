// Health Planner Types

export type Sex = 'male' | 'female' | 'other';
export type BodyType = 'slim' | 'average' | 'overweight' | 'obese';
export type Goal = 'weight-loss' | 'weight-gain' | 'maintain' | 'recomp' | 'manage-condition';
export type TargetPace = 'slow' | 'standard' | 'aggressive';
export type PlanLength = '1-week' | '1-month' | '3-months' | '6-months' | '1-year';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very-active' | 'super-active';
export type StepsPerDay = 'under-5k' | '5k-8k' | 'over-8k';
export type MealsPerDay = 2 | 3 | 4 | 5;
export type Budget = 'low' | 'medium' | 'high';
export type CookingTime = '15' | '30' | '45+';
export type StressLevel = 'low' | 'medium' | 'high';

export interface ProfileMetrics {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  bodyType?: BodyType;
  bodyFatPercent?: number;
}

export interface GoalTimeline {
  primaryGoal: Goal;
  targetPace?: TargetPace;
  planLength: PlanLength;
  targetWeightKg?: number;
}

export interface ActivityRoutine {
  activityLevel: ActivityLevel;
  stepsPerDay?: StepsPerDay;
  mealsPerDay: MealsPerDay;
}

export interface DietaryPreferences {
  dietTypes: string[];
  cuisinePrefs: string[];
  religiousRestrictions: string[];
  spicePreference: 'mild' | 'medium' | 'spicy';
  allergies: string[];
  dislikes: string;
  budget: Budget;
  cookingTime: CookingTime;
  equipment: string[];
}

export interface MedicalConditions {
  conditions: string[];
  medications: string;
  doctorRestrictions: string;
  sleepHours: number;
  stressLevel: StressLevel;
}

export interface UserIntake {
  profile: ProfileMetrics;
  goal: GoalTimeline;
  activity: ActivityRoutine;
  dietary: DietaryPreferences;
  medical: MedicalConditions;
}

export interface CalculatedTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  weeklyWeightChangeKg: number;
  deficitOrSurplus: number;
}

export interface Meal {
  name: string;
  recipeName: string;
  portionGrams: number;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  ingredients: string[];
  prepTime: number;
  instructions: string[];
}

export interface DayPlan {
  day: number;
  dayName: string;
  date: string;
  meals: Meal[];
  totalKcal: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface WeeklyShoppingList {
  weekNumber: number;
  items: {
    category: string;
    ingredients: { name: string; quantity: string }[];
  }[];
}

export interface MealPlan {
  userSummary: {
    goal: string;
    dailyTargets: CalculatedTargets;
    planLength: string;
    startDate: string;
  };
  days: DayPlan[];
  weeklyShoppingLists: WeeklyShoppingList[];
  conditionNotes: string[];
  tips: string[];
}

export type FormStep = 'profile' | 'goal' | 'activity' | 'dietary' | 'medical' | 'results';
