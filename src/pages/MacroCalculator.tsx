import { useState } from "react";
import { Calculator, Flame, Activity, Target, Dumbbell, Scale, Ruler, User, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface MacroResult {
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

const MacroCalculator = () => {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [result, setResult] = useState<MacroResult | null>(null);

  const activityMultipliers: { [key: string]: { multiplier: number; label: string; description: string } } = {
    sedentary: { multiplier: 1.2, label: "Sedentary", description: "Desk job, little exercise" },
    light: { multiplier: 1.375, label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    moderate: { multiplier: 1.55, label: "Moderate", description: "Gym 3-5 times/week" },
    active: { multiplier: 1.725, label: "Very Active", description: "Heavy workouts daily" },
    super: { multiplier: 1.9, label: "Super Active", description: "Athlete or physical job" },
  };

  const goalAdjustments: { [key: string]: { factor: number; label: string; icon: any; color: string; proteinMultiplier: number } } = {
    loss: { factor: 0.80, label: "Fat Loss", icon: TrendingDown, color: "text-orange-600", proteinMultiplier: 1.8 },
    maintain: { factor: 1.0, label: "Maintenance", icon: Minus, color: "text-green-600", proteinMultiplier: 1.6 },
    gain: { factor: 1.10, label: "Muscle Gain", icon: TrendingUp, color: "text-blue-600", proteinMultiplier: 2.0 },
  };

  const calculateMacros = () => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseInt(age);

    if (!weightKg || !heightCm || !ageYears) return;

    // Step 1: Calculate BMR using Mifflin-St Jeor formula
    let bmr: number;
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // Step 2: Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel].multiplier;

    // Step 3: Adjust for goal
    const goalCalories = tdee * goalAdjustments[goal].factor;

    // Step 4: Calculate Macros
    // Protein: varies by goal
    const proteinGrams = weightKg * goalAdjustments[goal].proteinMultiplier;
    const proteinCalories = proteinGrams * 4;

    // Fat: 25% of total calories
    const fatCalories = goalCalories * 0.25;
    const fatGrams = fatCalories / 9;

    // Carbs: remaining calories
    const carbsCalories = goalCalories - proteinCalories - fatCalories;
    const carbsGrams = carbsCalories / 4;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams),
      proteinCalories: Math.round(proteinCalories),
      carbsCalories: Math.round(carbsCalories),
      fatCalories: Math.round(fatCalories),
    });
  };

  const resetCalculator = () => {
    setSex("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivityLevel("moderate");
    setGoal("maintain");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-lime-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-600 via-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Macro Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculate Your Daily Macros
            </h1>
            <p className="text-xl text-lime-100 max-w-2xl mx-auto">
              Get personalized macronutrient targets based on your body and fitness goals
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-green-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/body-explorer" className="hover:text-green-600 transition-colors">Know Your Body</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Macro Calculator</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="shadow-xl border-2 border-lime-200/50">
            <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Dumbbell className="w-6 h-6 text-lime-600" />
                Enter Your Details
              </CardTitle>
              <CardDescription>
                Fill in your information to calculate your personalized macro targets
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Gender */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-lime-600" />
                  Gender
                </Label>
                <RadioGroup
                  value={sex}
                  onValueChange={(value) => setSex(value as "male" | "female")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Age, Weight, Height */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border-lime-200 focus:border-lime-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-1 text-sm font-medium">
                    <Scale className="w-3 h-3" /> Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border-lime-200 focus:border-lime-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center gap-1 text-sm font-medium">
                    <Ruler className="w-3 h-3" /> Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border-lime-200 focus:border-lime-500"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-lime-600" />
                  Activity Level
                </Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="border-lime-200">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(activityMultipliers).map(([key, { label, description, multiplier }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span className="font-medium">{label}</span>
                          <span className="text-xs text-muted-foreground">{description} (×{multiplier})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fitness Goal */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Target className="w-4 h-4 text-lime-600" />
                  Fitness Goal
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(goalAdjustments).map(([key, { label, icon: Icon, color }]) => (
                    <button
                      key={key}
                      onClick={() => setGoal(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        goal === key
                          ? "border-lime-500 bg-lime-50 dark:bg-lime-900/20 shadow-lg"
                          : "border-border hover:border-lime-300 hover:bg-lime-50/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={calculateMacros}
                  className="flex-1 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white py-6 text-lg font-bold"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Macros
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  className="border-lime-300 hover:bg-lime-50"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Calorie Summary */}
                <Card className="shadow-xl border-2 border-green-200/50 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-lime-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Flame className="w-5 h-5" />
                      Your Daily Calorie Targets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">{result.bmr}</div>
                        <div className="text-sm text-muted-foreground">BMR</div>
                        <div className="text-xs text-muted-foreground mt-1">Calories at rest</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">{result.tdee}</div>
                        <div className="text-sm text-muted-foreground">TDEE</div>
                        <div className="text-xs text-muted-foreground mt-1">Total daily burn</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-300">
                        <div className="text-2xl font-bold text-green-600">{result.goalCalories}</div>
                        <div className="text-sm text-muted-foreground">Target</div>
                        <div className="text-xs text-muted-foreground mt-1">Daily calories</div>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-900/30 dark:to-lime-900/30 rounded-xl">
                      <Badge className="bg-green-600 text-white mb-2">
                        {goalAdjustments[goal].label}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {goal === "loss" && `Eating ${result.tdee - result.goalCalories} kcal below TDEE for fat loss`}
                        {goal === "maintain" && "Eating at maintenance level to maintain weight"}
                        {goal === "gain" && `Eating ${result.goalCalories - result.tdee} kcal above TDEE for muscle gain`}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Macro Breakdown */}
                <Card className="shadow-xl border-2 border-lime-200/50">
                  <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="w-5 h-5 text-lime-600" />
                      Daily Macro Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Protein */}
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <span className="font-semibold text-red-700 dark:text-red-400">Protein</span>
                          </div>
                          <Badge variant="secondary" className="bg-red-100 text-red-700">
                            {result.proteinCalories} kcal
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-red-600">{result.protein}g</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {goalAdjustments[goal].proteinMultiplier}g per kg body weight • Muscle building & repair
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(result.proteinCalories / result.goalCalories) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Carbs */}
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                            <span className="font-semibold text-amber-700 dark:text-amber-400">Carbohydrates</span>
                          </div>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                            {result.carbsCalories} kcal
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-amber-600">{result.carbs}g</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Remaining calories • Primary energy source
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${(result.carbsCalories / result.goalCalories) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Fat */}
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <span className="font-semibold text-blue-700 dark:text-blue-400">Fat</span>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {result.fatCalories} kcal
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">{result.fat}g</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          25% of total calories • Hormone balance & energy storage
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(result.fatCalories / result.goalCalories) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Macro Summary Table */}
                    <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-semibold mb-3">Quick Reference</h4>
                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div className="font-medium text-muted-foreground">Macro</div>
                        <div className="font-medium text-muted-foreground">Grams</div>
                        <div className="font-medium text-muted-foreground">Calories</div>
                        <div className="font-medium text-muted-foreground">% of Total</div>
                        
                        <div className="text-red-600 font-medium">Protein</div>
                        <div>{result.protein}g</div>
                        <div>{result.proteinCalories}</div>
                        <div>{Math.round((result.proteinCalories / result.goalCalories) * 100)}%</div>
                        
                        <div className="text-amber-600 font-medium">Carbs</div>
                        <div>{result.carbs}g</div>
                        <div>{result.carbsCalories}</div>
                        <div>{Math.round((result.carbsCalories / result.goalCalories) * 100)}%</div>
                        
                        <div className="text-blue-600 font-medium">Fat</div>
                        <div>{result.fat}g</div>
                        <div>{result.fatCalories}</div>
                        <div>{Math.round((result.fatCalories / result.goalCalories) * 100)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Info Card when no result */
              <Card className="shadow-xl border-2 border-lime-200/50">
                <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-lime-600" />
                    What Are Macros?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">
                    Macronutrients (macros) are nutrients your body needs in large amounts:
                  </p>
                  
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5"></div>
                      <div>
                        <span className="font-semibold text-red-700 dark:text-red-400">Protein</span>
                        <p className="text-sm text-muted-foreground">Muscle building & repair • 4 cal/gram</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mt-1.5"></div>
                      <div>
                        <span className="font-semibold text-amber-700 dark:text-amber-400">Carbohydrates</span>
                        <p className="text-sm text-muted-foreground">Primary energy source • 4 cal/gram</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <span className="font-semibold text-blue-700 dark:text-blue-400">Fat</span>
                        <p className="text-sm text-muted-foreground">Hormone balance & energy storage • 9 cal/gram</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30 rounded-xl mt-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">How It Works</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Calculate your BMR (Basal Metabolic Rate)</li>
                      <li>Multiply by activity level for TDEE</li>
                      <li>Adjust calories for your goal</li>
                      <li>Distribute into protein, carbs, and fat</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Tools */}
            <Card className="shadow-lg border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Related Health Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/calorie-calculator" className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 transition-colors">
                    <Flame className="w-5 h-5 text-rose-600 mb-1" />
                    <div className="font-medium text-sm">Calorie Calculator</div>
                  </Link>
                  <Link to="/bmi-calculator" className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 transition-colors">
                    <Calculator className="w-5 h-5 text-orange-600 mb-1" />
                    <div className="font-medium text-sm">BMI Calculator</div>
                  </Link>
                  <Link to="/diet-planner" className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 transition-colors">
                    <Target className="w-5 h-5 text-green-600 mb-1" />
                    <div className="font-medium text-sm">Diet Planner</div>
                  </Link>
                  <Link to="/body-explorer" className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 transition-colors">
                    <Activity className="w-5 h-5 text-purple-600 mb-1" />
                    <div className="font-medium text-sm">Body Explorer</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculator;
