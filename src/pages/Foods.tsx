import { useState, useEffect } from 'react';
import { Clock, Utensils, Heart, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Foods = () => {
  const { toast } = useToast();
  const [selectedMealTime, setSelectedMealTime] = useState('morning');
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mealTimes = [
    { id: 'morning', label: 'Morning', icon: '🌅', color: 'text-orange-500' },
    { id: 'afternoon', label: 'Afternoon', icon: '☀️', color: 'text-yellow-500' },
    { id: 'evening', label: 'Evening', icon: '🌇', color: 'text-pink-500' },
    { id: 'snacks', label: 'Snacks', icon: '🍎', color: 'text-green-500' },
    { id: 'dinner', label: 'Dinner', icon: '🌙', color: 'text-blue-500' }
  ];

  useEffect(() => {
    fetchFoodsByTime();
  }, [selectedMealTime]);

  const fetchFoodsByTime = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('food_timing')
        .select('*')
        .eq('meal_time', selectedMealTime);

      if (error) throw error;
      setFoods(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load foods data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Foods by Meal Time</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the perfect foods for every meal time. Learn what to eat and when for optimal nutrition and health benefits.
          </p>
        </div>

        {/* Meal Time Tabs */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {mealTimes.map((mealTime) => (
              <button
                key={mealTime.id}
                onClick={() => setSelectedMealTime(mealTime.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  selectedMealTime === mealTime.id
                    ? 'bg-gradient-health text-white shadow-health-glow'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="text-xl">{mealTime.icon}</span>
                <span className="font-medium">{mealTime.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Meal Time Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-card rounded-2xl px-8 py-4 shadow-health">
            <span className="text-3xl">
              {mealTimes.find(m => m.id === selectedMealTime)?.icon}
            </span>
            <h2 className="text-2xl font-semibold text-foreground">
              {mealTimes.find(m => m.id === selectedMealTime)?.label} Foods
            </h2>
          </div>
        </div>

        {/* Foods Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-health p-6 animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div key={food.id} className="card-health p-6 group hover:scale-105 transition-all duration-200">
                {food.image_url ? (
                  <img 
                    src={food.image_url} 
                    alt={food.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-health transition-colors">
                  {food.name}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-health" />
                      Benefits
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {food.benefits}
                    </p>
                  </div>

                  {food.description && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-1 text-health" />
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {food.description}
                      </p>
                    </div>
                  )}

                  {food.how_much && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-health" />
                        Recommended Amount
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {food.how_much}
                      </p>
                    </div>
                  )}

                  {food.preparation_tips && (
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic">
                        💡 {food.preparation_tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No foods found</h3>
            <p className="text-muted-foreground">No foods available for this meal time yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foods;