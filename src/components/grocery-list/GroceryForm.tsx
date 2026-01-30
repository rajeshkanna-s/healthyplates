import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Leaf, 
  Drumstick, 
  IndianRupee,
  Calendar,
  Users,
  ChefHat,
  Dumbbell,
  X,
  Sparkles
} from 'lucide-react';
import { UserPreferences } from './types';
import { pantryStaples, avoidableItems } from './groceryData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface GroceryFormProps {
  onGenerate: (preferences: UserPreferences) => void;
  isLoading?: boolean;
}

export default function GroceryForm({ onGenerate, isLoading }: GroceryFormProps) {
  const [diet, setDiet] = useState<'Veg' | 'NonVeg'>('Veg');
  const [cuisine, setCuisine] = useState<'South' | 'North' | 'Mixed'>('South');
  const [budget, setBudget] = useState<'Low' | 'Medium'>('Low');
  const [duration, setDuration] = useState<3 | 7>(7);
  const [householdType, setHouseholdType] = useState<'single' | 'family'>('single');
  const [peopleCount, setPeopleCount] = useState(1);
  const [proteinPriority, setProteinPriority] = useState<'Normal' | 'High'>('Normal');
  const [staplesAvailable, setStaplesAvailable] = useState<string[]>([]);
  const [avoidItems, setAvoidItems] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleStapleToggle = (staple: string) => {
    setStaplesAvailable(prev => 
      prev.includes(staple) 
        ? prev.filter(s => s !== staple)
        : [...prev, staple]
    );
  };

  const handleAvoidToggle = (item: string) => {
    setAvoidItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = () => {
    const finalPeopleCount = householdType === 'single' ? 1 : peopleCount;
    onGenerate({
      diet,
      cuisine,
      budget,
      duration,
      peopleCount: finalPeopleCount,
      householdType,
      proteinPriority,
      staplesAvailable,
      avoidItems,
    });
  };

  return (
    <Card className="border-health/20 bg-gradient-to-br from-health/5 via-background to-background">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-health">
          <ShoppingCart className="w-5 h-5" />
          Customize Your Grocery List
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Diet Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Leaf className="w-4 h-4 text-health" />
            Diet Preference
          </Label>
          <RadioGroup 
            value={diet} 
            onValueChange={(v) => setDiet(v as 'Veg' | 'NonVeg')}
            className="grid grid-cols-2 gap-3"
          >
            <Label 
              htmlFor="veg" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                diet === 'Veg' 
                  ? 'border-health bg-health/10 text-health' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <RadioGroupItem value="Veg" id="veg" className="sr-only" />
              <Leaf className="w-5 h-5" />
              <span className="font-medium">Vegetarian</span>
            </Label>
            <Label 
              htmlFor="nonveg" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                diet === 'NonVeg' 
                  ? 'border-orange-500 bg-orange-500/10 text-orange-600' 
                  : 'border-border hover:border-orange-500/50'
              }`}
            >
              <RadioGroupItem value="NonVeg" id="nonveg" className="sr-only" />
              <Drumstick className="w-5 h-5" />
              <span className="font-medium">Non-Vegetarian</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Cuisine Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-health" />
            Cuisine Preference
          </Label>
          <RadioGroup 
            value={cuisine} 
            onValueChange={(v) => setCuisine(v as 'South' | 'North' | 'Mixed')}
            className="grid grid-cols-3 gap-3"
          >
            {(['South', 'North', 'Mixed'] as const).map((c) => (
              <Label 
                key={c}
                htmlFor={c} 
                className={`flex items-center justify-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                  cuisine === c 
                    ? 'border-health bg-health/10 text-health font-medium' 
                    : 'border-border hover:border-health/50'
                }`}
              >
                <RadioGroupItem value={c} id={c} className="sr-only" />
                {c === 'South' && '🥥'}
                {c === 'North' && '🫓'}
                {c === 'Mixed' && '🍽️'}
                <span>{c} Indian</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Budget Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-health" />
            Budget
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBudget('Low')}
              className={`flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                budget === 'Low' 
                  ? 'border-health bg-health/10' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <span className="font-medium">Budget-Friendly</span>
              <span className="text-xs text-muted-foreground">Essential items</span>
            </button>
            <button
              type="button"
              onClick={() => setBudget('Medium')}
              className={`flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                budget === 'Medium' 
                  ? 'border-health bg-health/10' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <span className="font-medium">Comfortable</span>
              <span className="text-xs text-muted-foreground">More variety</span>
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-health" />
            Duration
          </Label>
          <RadioGroup 
            value={duration.toString()} 
            onValueChange={(v) => setDuration(parseInt(v) as 3 | 7)}
            className="grid grid-cols-2 gap-3"
          >
            <Label 
              htmlFor="3days" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                duration === 3 
                  ? 'border-health bg-health/10 text-health' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <RadioGroupItem value="3" id="3days" className="sr-only" />
              <span className="font-medium">3 Days</span>
            </Label>
            <Label 
              htmlFor="7days" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                duration === 7 
                  ? 'border-health bg-health/10 text-health' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <RadioGroupItem value="7" id="7days" className="sr-only" />
              <span className="font-medium">7 Days</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Household Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-health" />
            Household
          </Label>
          <RadioGroup 
            value={householdType} 
            onValueChange={(v) => {
              setHouseholdType(v as 'single' | 'family');
              if (v === 'single') setPeopleCount(1);
              if (v === 'family') setPeopleCount(4);
            }}
            className="grid grid-cols-2 gap-3"
          >
            <Label 
              htmlFor="single" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                householdType === 'single' 
                  ? 'border-health bg-health/10 text-health' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <RadioGroupItem value="single" id="single" className="sr-only" />
              <span className="font-medium">Single Person</span>
            </Label>
            <Label 
              htmlFor="family" 
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                householdType === 'family' 
                  ? 'border-health bg-health/10 text-health' 
                  : 'border-border hover:border-health/50'
              }`}
            >
              <RadioGroupItem value="family" id="family" className="sr-only" />
              <span className="font-medium">Family</span>
            </Label>
          </RadioGroup>
          
          {householdType === 'family' && (
            <div className="flex items-center gap-3 mt-3">
              <Label htmlFor="peopleCount" className="whitespace-nowrap">
                Number of members:
              </Label>
              <Input
                id="peopleCount"
                type="number"
                min={2}
                max={10}
                value={peopleCount}
                onChange={(e) => setPeopleCount(Math.min(10, Math.max(2, parseInt(e.target.value) || 2)))}
                className="w-20"
              />
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Advanced Options
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-4">
            {/* Protein Priority */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-health" />
                Protein Priority
              </Label>
              <RadioGroup 
                value={proteinPriority} 
                onValueChange={(v) => setProteinPriority(v as 'Normal' | 'High')}
                className="grid grid-cols-2 gap-3"
              >
                <Label 
                  htmlFor="normalProtein" 
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    proteinPriority === 'Normal' 
                      ? 'border-health bg-health/10 text-health' 
                      : 'border-border hover:border-health/50'
                  }`}
                >
                  <RadioGroupItem value="Normal" id="normalProtein" className="sr-only" />
                  <span className="font-medium">Normal</span>
                </Label>
                <Label 
                  htmlFor="highProtein" 
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    proteinPriority === 'High' 
                      ? 'border-health bg-health/10 text-health' 
                      : 'border-border hover:border-health/50'
                  }`}
                >
                  <RadioGroupItem value="High" id="highProtein" className="sr-only" />
                  <span className="font-medium">High Protein 💪</span>
                </Label>
              </RadioGroup>
            </div>

            {/* Pantry Staples */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                I Already Have (Skip these items)
              </Label>
              <div className="flex flex-wrap gap-2">
                {pantryStaples.map((staple) => (
                  <Label
                    key={staple}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer transition-all text-sm ${
                      staplesAvailable.includes(staple)
                        ? 'border-health bg-health/10 text-health'
                        : 'border-border hover:border-health/50'
                    }`}
                  >
                    <Checkbox
                      checked={staplesAvailable.includes(staple)}
                      onCheckedChange={() => handleStapleToggle(staple)}
                      className="sr-only"
                    />
                    {staplesAvailable.includes(staple) && <X className="w-3 h-3" />}
                    {staple}
                  </Label>
                ))}
              </div>
            </div>

            {/* Avoid Items */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Avoid These Items
              </Label>
              <div className="flex flex-wrap gap-2">
                {avoidableItems.map((item) => (
                  <Label
                    key={item}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer transition-all text-sm ${
                      avoidItems.includes(item)
                        ? 'border-destructive bg-destructive/10 text-destructive'
                        : 'border-border hover:border-destructive/50'
                    }`}
                  >
                    <Checkbox
                      checked={avoidItems.includes(item)}
                      onCheckedChange={() => handleAvoidToggle(item)}
                      className="sr-only"
                    />
                    {avoidItems.includes(item) && <X className="w-3 h-3" />}
                    {item}
                  </Label>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Generate Button - Always Visible */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-background via-background to-transparent -mx-6 px-6">
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-6 text-lg font-semibold shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate My Grocery List'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
