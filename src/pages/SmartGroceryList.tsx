import { useState, useEffect } from 'react';
import GroceryForm from '@/components/grocery-list/GroceryForm';
import GroceryResults from '@/components/grocery-list/GroceryResults';
import { UserPreferences, GeneratedList } from '@/components/grocery-list/types';
import { generateGroceryList } from '@/components/grocery-list/generateGroceryList';
import { ShoppingCart, Sparkles, IndianRupee, Clock, Leaf } from 'lucide-react';
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer';

const SmartGroceryList = () => {
  const [generatedList, setGeneratedList] = useState<GeneratedList | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  
  useEffect(() => {
    document.title = 'Smart Grocery List Generator | HealthyPlates';
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (prefs: UserPreferences) => {
    setIsLoading(true);
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const list = generateGroceryList(prefs);
      setGeneratedList(list);
      setPreferences(prefs);
      setIsLoading(false);
      // Scroll to results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleReset = () => {
    setGeneratedList(null);
    setPreferences(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-health/5 via-background to-background">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-health/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health/10 text-health mb-4">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Smart Grocery Planner</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-health via-health/80 to-green-600 bg-clip-text text-transparent">
                Smart Grocery List Generator
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Plan your Indian grocery shopping with AI-powered recommendations. 
                Get personalized lists based on your diet, budget, and cooking preferences.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50">
                  <div className="p-2 rounded-full bg-health/10">
                    <Leaf className="w-5 h-5 text-health" />
                  </div>
                  <span className="text-sm font-medium">Veg & Non-Veg</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50">
                  <div className="p-2 rounded-full bg-health/10">
                    <IndianRupee className="w-5 h-5 text-health" />
                  </div>
                  <span className="text-sm font-medium">Budget Options</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50">
                  <div className="p-2 rounded-full bg-health/10">
                    <Clock className="w-5 h-5 text-health" />
                  </div>
                  <span className="text-sm font-medium">3 or 7 Days</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50">
                  <div className="p-2 rounded-full bg-health/10">
                    <Sparkles className="w-5 h-5 text-health" />
                  </div>
                  <span className="text-sm font-medium">Meal Ideas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {generatedList && preferences ? (
              <GroceryResults 
                list={generatedList} 
                preferences={preferences}
                onReset={handleReset}
              />
            ) : (
              <div className="max-w-2xl mx-auto">
                <GroceryForm onGenerate={handleGenerate} isLoading={isLoading} />
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        {!generatedList && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8 text-health">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-6 rounded-xl bg-card border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-health/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-health">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Select diet type, cuisine, budget, and duration that fits your lifestyle.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-health/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-health">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Your List</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a complete grocery list with quantities scaled for your household.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-health/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-health">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Cook & Enjoy</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the meal ideas and storage tips to cook delicious, healthy meals.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <MedicalDisclaimer />
      </div>
  );
};

export default SmartGroceryList;
