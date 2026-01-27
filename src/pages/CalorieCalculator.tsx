import { useState } from "react";
import { Calculator, Scale, Ruler, RotateCcw, Flame, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalorieResult {
  bmr: number;
  tdee: number;
  activityLevel: string;
}

const activityLevels = [
  { value: "1.2", label: "Sedentary", description: "Little or no exercise" },
  { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
  { value: "1.9", label: "Super Active", description: "Very hard training / physical job" },
];

function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export default function CalorieCalculator() {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState('1.55');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    let weightNum: number;
    let heightNum: number;
    const ageNum = parseInt(age);

    if (weightUnit === 'kg') {
      weightNum = parseFloat(weight);
    } else {
      weightNum = parseFloat(weight) * 0.453592;
    }

    if (heightUnit === 'cm') {
      heightNum = parseFloat(height);
    } else {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightNum = (feetNum * 30.48) + (inchesNum * 2.54);
    }

    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setError('Please enter a valid age (1-120)');
      return;
    }
    if (weightNum > 500) {
      setError('Weight seems too high. Please check your input.');
      return;
    }
    if (heightNum > 300 || heightNum < 50) {
      setError('Height seems invalid. Please check your input.');
      return;
    }

    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    const tdee = bmr * parseFloat(activityFactor);
    const selectedActivity = activityLevels.find(a => a.value === activityFactor);

    setResult({
      bmr,
      tdee,
      activityLevel: selectedActivity?.label || 'Moderate'
    });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setAge('');
    setGender('male');
    setActivityFactor('1.55');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Daily Calorie Calculator
          </h1>
          <p className="text-xl text-muted-foreground">Calculate your BMR and daily calorie needs based on activity level</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-orange-500 text-white">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-200">Free Calorie Calculator</h2>
                  <p className="text-orange-600 dark:text-orange-400">
                    Uses the Mifflin-St Jeor formula for accurate results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Enter Your Details
              </CardTitle>
              <CardDescription>
                Provide your measurements, age, gender, and activity level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gender Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gender
                </Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value) => setGender(value as 'male' | 'female')}
                  className="flex gap-6"
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

              {/* Age Input */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Age (years)</Label>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="text-lg"
                  min="1"
                  max="120"
                />
              </div>

              {/* Weight Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Weight
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      variant={weightUnit === 'kg' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setWeightUnit('kg')}
                    >
                      kg
                    </Button>
                    <Button
                      variant={weightUnit === 'lb' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setWeightUnit('lb')}
                    >
                      lb
                    </Button>
                  </div>
                </div>
                <Input
                  type="number"
                  placeholder={`Enter weight in ${weightUnit}`}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg"
                  min="0"
                  max="500"
                />
              </div>

              {/* Height Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Height
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      variant={heightUnit === 'cm' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setHeightUnit('cm')}
                    >
                      cm
                    </Button>
                    <Button
                      variant={heightUnit === 'ft' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setHeightUnit('ft')}
                    >
                      ft/in
                    </Button>
                  </div>
                </div>
                {heightUnit === 'cm' ? (
                  <Input
                    type="number"
                    placeholder="Enter height in cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="300"
                  />
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="text-lg"
                        min="0"
                        max="8"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="text-lg"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Level */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Activity Level</Label>
                <Select value={activityFactor} onValueChange={setActivityFactor}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{level.label}</span>
                          <span className="text-xs text-muted-foreground">{level.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleCalculate} className="flex-1" size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Calories
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card className="mt-8 animate-fade-in shadow-lg overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30">
                <CardTitle className="text-center text-xl">Your Daily Calorie Needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Main Results */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Basal Metabolic Rate (BMR)</p>
                    <p className="text-4xl font-bold text-blue-600">{Math.round(result.bmr)}</p>
                    <p className="text-sm text-muted-foreground">calories/day</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Total Daily Energy (TDEE)</p>
                    <p className="text-4xl font-bold text-orange-600">{Math.round(result.tdee)}</p>
                    <p className="text-sm text-muted-foreground">calories/day</p>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-muted-foreground">
                    Based on your <strong>{result.activityLevel}</strong> activity level
                  </p>
                </div>

                {/* Calorie Goals */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-center">Daily Calorie Goals</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-xs text-muted-foreground mb-1">Weight Loss</p>
                      <p className="text-xl font-bold text-green-600">{Math.round(result.tdee - 500)}</p>
                      <p className="text-xs text-muted-foreground">-500 cal</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-muted-foreground mb-1">Maintain</p>
                      <p className="text-xl font-bold text-blue-600">{Math.round(result.tdee)}</p>
                      <p className="text-xs text-muted-foreground">TDEE</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-xs text-muted-foreground mb-1">Weight Gain</p>
                      <p className="text-xl font-bold text-purple-600">{Math.round(result.tdee + 500)}</p>
                      <p className="text-xs text-muted-foreground">+500 cal</p>
                    </div>
                  </div>
                </div>

                {/* Macros Suggestion */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-center">Suggested Macro Split (Balanced)</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Protein (30%)</p>
                      <p className="font-semibold">{Math.round((result.tdee * 0.3) / 4)}g</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Carbs (40%)</p>
                      <p className="font-semibold">{Math.round((result.tdee * 0.4) / 4)}g</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">Fat (30%)</p>
                      <p className="font-semibold">{Math.round((result.tdee * 0.3) / 9)}g</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-8 border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">What is BMR & TDEE?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs at complete rest to maintain vital functions like breathing, circulation, and cell production.
              </p>
              <p>
                <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR multiplied by an activity factor. This represents the total calories you burn in a day including physical activity.
              </p>
              <p>
                We use the <strong>Mifflin-St Jeor formula</strong>, which is considered the most accurate for estimating BMR.
              </p>
              <p className="text-xs italic">
                Note: These are estimates. Individual metabolism varies based on genetics, muscle mass, hormones, and other factors. Consult a healthcare provider for personalized advice.
              </p>
            </CardContent>
          </Card>

          {/* Educational Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Educational Disclaimer:</strong> This calculator is for informational purposes only. 
              Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
