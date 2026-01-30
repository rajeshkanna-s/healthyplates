import {
  UserPreferences,
  GeneratedList,
  GeneratedGroceryItem,
  GroceryTemplateItem,
  GroceryGroup,
} from './types';
import {
  southVegLowBase,
  southVegMediumAdditions,
  southNonVegAdditions,
  northVegLowBase,
  northVegMediumAdditions,
  northNonVegAdditions,
  highProteinAdditions,
  recipeTemplates,
  costEstimates,
  storageTips,
  substitutions,
  groupOrder,
} from './groceryData';

export function generateGroceryList(preferences: UserPreferences): GeneratedList {
  const {
    diet,
    cuisine,
    budget,
    duration,
    peopleCount,
    proteinPriority,
    staplesAvailable,
    avoidItems,
  } = preferences;

  // Step 1: Select base template based on cuisine
  let baseItems: GroceryTemplateItem[] = [];
  
  if (cuisine === 'South' || cuisine === 'Mixed') {
    baseItems = [...southVegLowBase];
  }
  if (cuisine === 'North') {
    baseItems = [...northVegLowBase];
  }
  if (cuisine === 'Mixed') {
    // Merge some North items for mixed
    const northAdditions = northVegLowBase.filter(item => 
      !baseItems.some(base => base.name === item.name) &&
      ['Rajma', 'Dalia', 'Garam Masala', 'Cauliflower'].some(n => item.name.includes(n))
    );
    baseItems = [...baseItems, ...northAdditions];
  }

  // Step 2: Add medium budget items if applicable
  if (budget === 'Medium') {
    const mediumAdditions = cuisine === 'North' ? northVegMediumAdditions : southVegMediumAdditions;
    baseItems = [...baseItems, ...mediumAdditions.filter(item => 
      !baseItems.some(base => base.name === item.name)
    )];
  }

  // Step 3: Add non-veg items if applicable
  if (diet === 'NonVeg') {
    const nonVegAdditions = cuisine === 'North' ? northNonVegAdditions : southNonVegAdditions;
    baseItems = [...baseItems, ...nonVegAdditions.filter(item => 
      !baseItems.some(base => base.name === item.name)
    )];
  }

  // Step 4: Add high protein items if selected
  if (proteinPriority === 'High') {
    baseItems = [...baseItems, ...highProteinAdditions.filter(item => 
      !baseItems.some(base => base.name === item.name) &&
      (diet === 'NonVeg' || !item.name.includes('Eggs'))
    )];
  }

  // Step 5: Calculate scaling factor
  const durationFactor = duration === 3 ? 0.45 : 1;
  const scalingFactor = peopleCount * durationFactor;

  // Step 6: Scale quantities and mark excluded items
  const scaledItems: GeneratedGroceryItem[] = baseItems.map(item => {
    const scaledQuantity = Math.ceil(item.quantity * scalingFactor * 10) / 10;
    
    // Check if item should be excluded
    const isStaple = staplesAvailable.some(staple => 
      item.name.toLowerCase().includes(staple.toLowerCase()) ||
      staple.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
    );
    
    const isAvoided = avoidItems.some(avoid => 
      item.name.toLowerCase().includes(avoid.toLowerCase()) ||
      avoid.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
    );

    return {
      ...item,
      scaledQuantity,
      isExcluded: isStaple || isAvoided,
    };
  });

  // Step 7: Filter recipes based on preferences
  const matchingRecipes = recipeTemplates.filter(recipe => {
    const cuisineMatch = cuisine === 'Mixed' || recipe.cuisine === cuisine || recipe.cuisine === 'Mixed';
    const dietMatch = diet === 'NonVeg' || recipe.vegFlag === 'Veg';
    const budgetMatch = budget === 'Medium' || recipe.budgetTier === 'Low';
    return cuisineMatch && dietMatch && budgetMatch;
  });

  const recipes = {
    breakfast: matchingRecipes.filter(r => r.mealTime === 'Breakfast').map(r => r.name),
    lunch: matchingRecipes.filter(r => r.mealTime === 'Lunch').map(r => r.name),
    dinner: matchingRecipes.filter(r => r.mealTime === 'Dinner').map(r => r.name),
    snacks: matchingRecipes.filter(r => r.mealTime === 'Snack').map(r => r.name),
  };

  // Step 8: Get cost estimate
  const costKey = `${diet}-${budget}-${duration}` as keyof typeof costEstimates;
  const baseCost = costEstimates[costKey] || { min: 1000, max: 2000 };
  const estimatedCost = {
    min: Math.round(baseCost.min * peopleCount),
    max: Math.round(baseCost.max * peopleCount),
    currency: '₹',
  };

  // Step 9: Filter relevant storage tips
  const relevantStorageTips = storageTips.filter(tip => 
    scaledItems.some(item => 
      !item.isExcluded && 
      item.name.toLowerCase().includes(tip.item.toLowerCase().split('/')[0])
    )
  );

  // Step 10: Filter relevant substitutions
  const relevantSubstitutions = substitutions.filter(sub =>
    scaledItems.some(item => 
      !item.isExcluded && 
      item.name.toLowerCase().includes(sub.original.toLowerCase())
    )
  );

  return {
    items: scaledItems,
    recipes,
    storageTips: relevantStorageTips,
    substitutions: relevantSubstitutions,
    estimatedCost,
  };
}

// Helper to group items by category
export function groupItemsByCategory(items: GeneratedGroceryItem[]): Record<GroceryGroup, GeneratedGroceryItem[]> {
  const grouped: Record<GroceryGroup, GeneratedGroceryItem[]> = {
    'Grains & Flours': [],
    'Pulses & Legumes': [],
    'Vegetables': [],
    'Fruits': [],
    'Protein Sources': [],
    'Dairy': [],
    'Healthy Fats': [],
    'Spices & Basics': [],
    'Optional Add-Ons': [],
  };

  items.forEach(item => {
    if (!item.isExcluded) {
      grouped[item.group].push(item);
    }
  });

  return grouped;
}

// Helper to format quantity display
export function formatQuantity(quantity: number, unit: string): string {
  if (unit === 'g' && quantity >= 1000) {
    return `${quantity / 1000} kg`;
  }
  if (unit === 'count') {
    return `${quantity}`;
  }
  return `${quantity} ${unit}`;
}

export { groupOrder };
