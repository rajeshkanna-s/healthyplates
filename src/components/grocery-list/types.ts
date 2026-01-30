export interface GroceryItem {
  name: string;
  group: GroceryGroup;
  vegFlag: 'Veg' | 'NonVeg';
  budgetTier: 'Low' | 'Medium';
  unit: string;
  defaultPack: number;
  storage: string;
  notes: string;
}

export type GroceryGroup = 
  | 'Grains & Flours'
  | 'Pulses & Legumes'
  | 'Vegetables'
  | 'Fruits'
  | 'Protein Sources'
  | 'Dairy'
  | 'Healthy Fats'
  | 'Spices & Basics'
  | 'Optional Add-Ons';

export interface RecipeTemplate {
  name: string;
  mealTime: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  cuisine: 'South' | 'North' | 'Mixed';
  vegFlag: 'Veg' | 'NonVeg';
  budgetTier: 'Low' | 'Medium';
  keyIngredients: string[];
}

export interface GroceryTemplate {
  diet: 'Veg' | 'NonVeg';
  cuisine: 'South' | 'North' | 'Mixed';
  budget: 'Low' | 'Medium';
  duration: 3 | 7;
  items: GroceryTemplateItem[];
}

export interface GroceryTemplateItem {
  name: string;
  group: GroceryGroup;
  quantity: number;
  unit: string;
  storage: 'Room' | 'Fridge' | 'Freezer' | 'Room/Fridge';
  useWithin?: string;
  substitute?: string;
}

export interface UserPreferences {
  diet: 'Veg' | 'NonVeg';
  cuisine: 'South' | 'North' | 'Mixed';
  budget: 'Low' | 'Medium';
  duration: 3 | 7;
  peopleCount: number;
  householdType: 'single' | 'family';
  proteinPriority: 'Normal' | 'High';
  staplesAvailable: string[];
  avoidItems: string[];
}

export interface GeneratedList {
  items: GeneratedGroceryItem[];
  recipes: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  storageTips: StorageTip[];
  substitutions: Substitution[];
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface GeneratedGroceryItem extends GroceryTemplateItem {
  scaledQuantity: number;
  isExcluded: boolean;
}

export interface StorageTip {
  item: string;
  tip: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Substitution {
  original: string;
  substitute: string;
  reason: string;
}
