import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Utensils, Target, Leaf, ChevronDown, RefreshCw, Flame, Dumbbell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface MealSuggestion {
  id: string;
  goal: string;
  diet_type: string;
  meal_time: string;
  meal_name: string;
  items: string[];
  calories_min: number;
  calories_max: number;
  protein_grams: number;
  region: string;
}

const goalOptions = [
  { value: 'weight_loss', label: 'Weight Loss', icon: '🏃', color: 'bg-rose-500' },
  { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪', color: 'bg-blue-500' },
  { value: 'general_health', label: 'General Health', icon: '🌿', color: 'bg-green-500' },
  { value: 'light_dinner', label: 'Light Dinner', icon: '🌙', color: 'bg-purple-500' },
  { value: 'high_fiber', label: 'High Fiber', icon: '🌾', color: 'bg-amber-500' },
];

const dietOptions = [
  { value: 'veg', label: 'Vegetarian', icon: '🥗' },
  { value: 'non_veg', label: 'Non-Vegetarian', icon: '🍗' },
];

const mealTimeOptions = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { value: 'lunch', label: 'Lunch', icon: '☀️' },
  { value: 'dinner', label: 'Dinner', icon: '🌙' },
];

const DailyMealSuggestion = () => {
  const [goal, setGoal] = useState('weight_loss');
  const [dietType, setDietType] = useState('veg');
  const [mealTime, setMealTime] = useState('breakfast');

  // Get day of year for daily rotation
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const queryClient = useQueryClient();

  // Fetch meals based on filters
  const { data: meals, isLoading } = useQuery({
    queryKey: ['meal-suggestions', goal, dietType, mealTime],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meal_suggestions')
        .select('*')
        .eq('goal', goal)
        .eq('diet_type', dietType)
        .eq('meal_time', mealTime);
      
      if (error) throw error;
      return data as MealSuggestion[];
    },
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['meal-suggestions', goal, dietType, mealTime] });
  };

  // Get daily rotated meals (1-3 based on available)
  const dailyMeals = useMemo(() => {
    if (!meals || meals.length === 0) return [];
    
    // Use day of year to rotate through meals
    const startIndex = dayOfYear % meals.length;
    const numMeals = Math.min(3, meals.length);
    const rotatedMeals: MealSuggestion[] = [];
    
    for (let i = 0; i < numMeals; i++) {
      const index = (startIndex + i) % meals.length;
      rotatedMeals.push(meals[index]);
    }
    
    return rotatedMeals;
  }, [meals, dayOfYear]);

  const selectedGoal = goalOptions.find(g => g.value === goal);
  const selectedDiet = dietOptions.find(d => d.value === dietType);
  const selectedMealTime = mealTimeOptions.find(m => m.value === mealTime);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-health/10 text-health px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Utensils className="w-4 h-4" />
            Daily Meal Suggestions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Should I <span className="text-health">Eat Today?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized meal ideas based on your health goals. Quick, simple, and nutritionally balanced suggestions that rotate daily!
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-8 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Goal Selector */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Target className="w-4 h-4 inline mr-1" />
                Your Goal
              </label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  {goalOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Diet Type Selector */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Leaf className="w-4 h-4 inline mr-1" />
                Diet Type
              </label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select diet" />
                </SelectTrigger>
                <SelectContent>
                  {dietOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Meal Time Selector */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Utensils className="w-4 h-4 inline mr-1" />
                Meal Time
              </label>
              <Select value={mealTime} onValueChange={setMealTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meal time" />
                </SelectTrigger>
                <SelectContent>
                  {mealTimeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-foreground">
              Today's HealthyPlate
            </h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedGoal?.icon} {selectedGoal?.label}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {selectedDiet?.icon} {selectedDiet?.label}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {selectedMealTime?.icon} {selectedMealTime?.label}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>

        {/* Meal Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="overflow-hidden p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : dailyMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dailyMeals.map((meal, index) => (
              <Card 
                key={meal.id} 
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/60 bg-gradient-to-r from-health/5 via-background to-background"
              >
                {/* Option Badge - Top Right */}
                <Badge 
                  className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-3 py-1"
                >
                  Option {index + 1}
                </Badge>
                
                <CardContent className="p-6">
                  {/* Meal Name */}
                  <h3 className="text-lg font-semibold text-health mb-4 pr-20">
                    {meal.meal_name}
                  </h3>
                  
                  {/* Meal Items */}
                  <div className="space-y-2 mb-6 min-h-[60px]">
                    {meal.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {item}
                      </p>
                    ))}
                  </div>

                  {/* Nutrition Info */}
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-foreground">
                        {meal.calories_min === meal.calories_max 
                          ? `${meal.calories_min} kcal` 
                          : `${meal.calories_min}–${meal.calories_max} kcal`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-health" />
                      <span className="text-sm font-medium text-foreground">
                        {meal.protein_grams}g protein
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No meals found for this combination
            </h3>
            <p className="text-muted-foreground">
              Try changing your goal, diet type, or meal time to see suggestions.
            </p>
          </Card>
        )}

        {/* Tip Box */}
        <div className="mt-8 bg-gradient-to-r from-health/10 to-nutrition/10 rounded-xl p-6 border border-health/20">
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Daily Rotation Tip</h4>
              <p className="text-sm text-muted-foreground">
                Come back tomorrow for new meal suggestions! Our system automatically rotates through our database of 100+ healthy Indian meals to give you fresh ideas every day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyMealSuggestion;
