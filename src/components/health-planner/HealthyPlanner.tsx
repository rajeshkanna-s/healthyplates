// Health Planner Multi-Step Form Component

import React, { useState } from "react";
import { 
  User, Target, Activity, Utensils, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle2, FileDown, FileSpreadsheet,
  Scale, Ruler, Calendar, Dumbbell, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserIntake, ProfileMetrics, GoalTimeline, ActivityRoutine, 
  DietaryPreferences, MedicalConditions, FormStep, CalculatedTargets, MealPlan 
} from "./types";
import { calculateTargets, generateMealPlan } from "./calculations";
import { generatePDF, generateExcel } from "./exportUtils";

const FORM_STEPS: { id: FormStep; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { id: 'goal', label: 'Goal', icon: <Target className="w-4 h-4" /> },
  { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
  { id: 'dietary', label: 'Diet', icon: <Utensils className="w-4 h-4" /> },
  { id: 'medical', label: 'Health', icon: <HeartPulse className="w-4 h-4" /> },
  { id: 'results', label: 'Plan', icon: <CheckCircle2 className="w-4 h-4" /> },
];

const DIET_TYPES = [
  'Vegetarian', 'Vegan', 'Eggetarian', 'Non-vegetarian', 'Jain',
  'Gluten-free', 'Dairy-free', 'Low-carb', 'High-protein', 'Mediterranean'
];

const CUISINES = [
  'Indian (North)', 'Indian (South)', 'Continental', 'Asian', 'Mediterranean'
];

const ALLERGIES = [
  'Nuts', 'Shellfish', 'Eggs', 'Dairy/Lactose', 'Gluten/Wheat', 'Soy', 'Fish', 'Sesame'
];

const CONDITIONS = [
  { id: 'diabetes', label: 'Diabetes (Type 2)' },
  { id: 'diabetes-t1', label: 'Diabetes (Type 1)' },
  { id: 'hypertension', label: 'Hypertension (High BP)' },
  { id: 'hypothyroidism', label: 'Hypothyroidism' },
  { id: 'hyperthyroidism', label: 'Hyperthyroidism' },
  { id: 'pcos', label: 'PCOS' },
  { id: 'dyslipidemia', label: 'Dyslipidemia (High Cholesterol)' },
  { id: 'gerd', label: 'GERD/Acid Reflux' },
  { id: 'ckd', label: 'Chronic Kidney Disease' },
  { id: 'ibs', label: 'IBS' },
  { id: 'celiac', label: 'Celiac Disease' },
  { id: 'pregnancy', label: 'Pregnancy/Lactation' },
];

const EQUIPMENT = [
  'Stove', 'Oven', 'Microwave', 'Mixer/Blender', 'OTG', 'Air Fryer', 'Steamer', 'Pressure Cooker'
];

export default function HealthyPlanner() {
  const [currentStep, setCurrentStep] = useState<FormStep>('profile');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);
  const [calculatedTargets, setCalculatedTargets] = useState<CalculatedTargets | null>(null);

  // Form state
  const [profile, setProfile] = useState<ProfileMetrics>({
    sex: 'male',
    age: 30,
    heightCm: 170,
    weightKg: 70,
    bodyType: undefined,
    bodyFatPercent: undefined,
  });

  const [goal, setGoal] = useState<GoalTimeline>({
    primaryGoal: 'maintain',
    targetPace: 'standard',
    planLength: '1-week',
    targetWeightKg: undefined,
  });

  const [activity, setActivity] = useState<ActivityRoutine>({
    activityLevel: 'moderate',
    stepsPerDay: '5k-8k',
    mealsPerDay: 3,
  });

  const [dietary, setDietary] = useState<DietaryPreferences>({
    dietTypes: ['Vegetarian'],
    cuisinePrefs: ['Indian (North)'],
    religiousRestrictions: [],
    spicePreference: 'medium',
    allergies: [],
    dislikes: '',
    budget: 'medium',
    cookingTime: '30',
    equipment: ['Stove', 'Pressure Cooker'],
  });

  const [medical, setMedical] = useState<MedicalConditions>({
    conditions: [],
    medications: '',
    doctorRestrictions: '',
    sleepHours: 7,
    stressLevel: 'medium',
  });

  const getCurrentStepIndex = () => FORM_STEPS.findIndex(s => s.id === currentStep);
  const progress = ((getCurrentStepIndex() + 1) / FORM_STEPS.length) * 100;

  const goToNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(FORM_STEPS[currentIndex - 1].id);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const intake: UserIntake = { profile, goal, activity, dietary, medical };
    const targets = calculateTargets(intake);
    const plan = generateMealPlan(intake, targets);

    setCalculatedTargets(targets);
    setGeneratedPlan(plan);
    setIsGenerating(false);
    setCurrentStep('results');
  };

  const handleDownloadPDF = () => {
    if (generatedPlan) {
      const intake: UserIntake = { profile, goal, activity, dietary, medical };
      generatePDF(generatedPlan, intake);
    }
  };

  const handleDownloadExcel = () => {
    if (generatedPlan) {
      const intake: UserIntake = { profile, goal, activity, dietary, medical };
      generateExcel(generatedPlan, intake);
    }
  };

  const toggleArrayItem = <T,>(arr: T[], item: T): T[] => {
    return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-foreground">Health & Diet Planner</h2>
          <span className="text-sm text-muted-foreground">
            Step {getCurrentStepIndex() + 1} of {FORM_STEPS.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        
        {/* Step indicators */}
        <div className="flex justify-between mt-4 overflow-x-auto pb-2">
          {FORM_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => index <= getCurrentStepIndex() && setCurrentStep(step.id)}
              disabled={index > getCurrentStepIndex()}
              className={`flex flex-col items-center gap-1 px-2 min-w-[60px] transition-colors ${
                step.id === currentStep 
                  ? 'text-primary' 
                  : index < getCurrentStepIndex() 
                    ? 'text-primary/60 cursor-pointer hover:text-primary' 
                    : 'text-muted-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.id === currentStep 
                  ? 'border-primary bg-primary text-primary-foreground' 
                  : index < getCurrentStepIndex() 
                    ? 'border-primary/60 bg-primary/10' 
                    : 'border-muted'
              }`}>
                {step.icon}
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Profile & Body Metrics */}
          {currentStep === 'profile' && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile & Body Metrics
                </CardTitle>
                <CardDescription>Tell us about yourself to calculate your needs accurately</CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Biological Sex *</Label>
                  <RadioGroup
                    value={profile.sex}
                    onValueChange={(v) => setProfile({ ...profile, sex: v as any })}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="age">Age (years) *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="age"
                      type="number"
                      min={10}
                      max={100}
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="height"
                      type="number"
                      min={100}
                      max={250}
                      value={profile.heightCm}
                      onChange={(e) => setProfile({ ...profile, heightCm: parseInt(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="number"
                      min={30}
                      max={300}
                      value={profile.weightKg}
                      onChange={(e) => setProfile({ ...profile, weightKg: parseInt(e.target.value) || 0 })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Body Type (Optional)</Label>
                  <Select
                    value={profile.bodyType || ''}
                    onValueChange={(v) => setProfile({ ...profile, bodyType: v as any || undefined })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="overweight">Overweight</SelectItem>
                      <SelectItem value="obese">Obese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bodyfat">Body Fat % (Optional)</Label>
                  <Input
                    id="bodyfat"
                    type="number"
                    min={5}
                    max={60}
                    placeholder="e.g., 20"
                    value={profile.bodyFatPercent || ''}
                    onChange={(e) => setProfile({ ...profile, bodyFatPercent: parseInt(e.target.value) || undefined })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goal & Timeline */}
          {currentStep === 'goal' && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Goal & Timeline
                </CardTitle>
                <CardDescription>What do you want to achieve with this plan?</CardDescription>
              </CardHeader>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Primary Goal *</Label>
                  <RadioGroup
                    value={goal.primaryGoal}
                    onValueChange={(v) => setGoal({ ...goal, primaryGoal: v as any })}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {[
                      { value: 'weight-loss', label: 'Weight Loss', desc: 'Reduce body fat' },
                      { value: 'weight-gain', label: 'Weight Gain', desc: 'Build lean mass' },
                      { value: 'maintain', label: 'Maintain', desc: 'Stay at current weight' },
                      { value: 'recomp', label: 'Recomposition', desc: 'Lose fat & gain muscle' },
                      { value: 'manage-condition', label: 'Manage Condition', desc: 'Focus on health' },
                    ].map((item) => (
                      <div key={item.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={item.value} id={item.value} className="mt-1" />
                        <div>
                          <Label htmlFor={item.value} className="cursor-pointer font-medium">{item.label}</Label>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {(goal.primaryGoal === 'weight-loss' || goal.primaryGoal === 'weight-gain') && (
                  <div className="space-y-3">
                    <Label>Target Pace *</Label>
                    <RadioGroup
                      value={goal.targetPace || 'standard'}
                      onValueChange={(v) => setGoal({ ...goal, targetPace: v as any })}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <RadioGroupItem value="slow" id="pace-slow" />
                        <Label htmlFor="pace-slow" className="cursor-pointer">
                          <span className="font-medium">Slow</span>
                          <span className="text-xs text-muted-foreground ml-1">(~0.25%/week)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <RadioGroupItem value="standard" id="pace-standard" />
                        <Label htmlFor="pace-standard" className="cursor-pointer">
                          <span className="font-medium">Standard</span>
                          <span className="text-xs text-muted-foreground ml-1">(~0.5-1%/week)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded-lg">
                        <RadioGroupItem value="aggressive" id="pace-aggressive" />
                        <Label htmlFor="pace-aggressive" className="cursor-pointer">
                          <span className="font-medium">Aggressive</span>
                          <span className="text-xs text-muted-foreground ml-1">(~1%+/week)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    {goal.targetPace === 'aggressive' && (
                      <Alert variant="destructive" className="bg-destructive/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Aggressive pace is only recommended for those with high body fat. Consult a professional.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Plan Length *</Label>
                  <Select
                    value={goal.planLength}
                    onValueChange={(v) => setGoal({ ...goal, planLength: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Activity & Routine */}
          {currentStep === 'activity' && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Activity & Routine
                </CardTitle>
                <CardDescription>How active are you on a typical day?</CardDescription>
              </CardHeader>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Activity Level *</Label>
                  <RadioGroup
                    value={activity.activityLevel}
                    onValueChange={(v) => setActivity({ ...activity, activityLevel: v as any })}
                    className="space-y-2"
                  >
                    {[
                      { value: 'sedentary', label: 'Sedentary', desc: 'Desk job, minimal exercise', mult: '×1.2' },
                      { value: 'light', label: 'Light Activity', desc: '1-3 workouts/week', mult: '×1.375' },
                      { value: 'moderate', label: 'Moderate', desc: '3-5 workouts/week', mult: '×1.55' },
                      { value: 'very-active', label: 'Very Active', desc: '6-7 workouts/week', mult: '×1.725' },
                      { value: 'super-active', label: 'Super Active', desc: 'Physical job or 2x daily training', mult: '×1.9' },
                    ].map((item) => (
                      <div key={item.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={item.value} id={`activity-${item.value}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`activity-${item.value}`} className="cursor-pointer font-medium">{item.label}</Label>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">{item.mult}</Badge>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Steps per Day (Optional)</Label>
                    <Select
                      value={activity.stepsPerDay || ''}
                      onValueChange={(v) => setActivity({ ...activity, stepsPerDay: v as any || undefined })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Estimate daily steps" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Less than 5,000</SelectItem>
                        <SelectItem value="5k-8k">5,000 - 8,000</SelectItem>
                        <SelectItem value="over-8k">More than 8,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Meals per Day *</Label>
                    <Select
                      value={activity.mealsPerDay.toString()}
                      onValueChange={(v) => setActivity({ ...activity, mealsPerDay: parseInt(v) as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meals/day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Meals</SelectItem>
                        <SelectItem value="3">3 Meals</SelectItem>
                        <SelectItem value="4">4 Meals (+ snack)</SelectItem>
                        <SelectItem value="5">5 Meals (+ 2 snacks)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Dietary Preferences */}
          {currentStep === 'dietary' && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  Dietary Preferences
                </CardTitle>
                <CardDescription>What are your food preferences and restrictions?</CardDescription>
              </CardHeader>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Diet Type *</Label>
                  <div className="flex flex-wrap gap-2">
                    {DIET_TYPES.map((type) => (
                      <Badge
                        key={type}
                        variant={dietary.dietTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => setDietary({ ...dietary, dietTypes: toggleArrayItem(dietary.dietTypes, type) })}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Cuisine Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map((cuisine) => (
                      <Badge
                        key={cuisine}
                        variant={dietary.cuisinePrefs.includes(cuisine) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => setDietary({ ...dietary, cuisinePrefs: toggleArrayItem(dietary.cuisinePrefs, cuisine) })}
                      >
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Allergies & Intolerances (if any)</Label>
                  <div className="flex flex-wrap gap-2">
                    {ALLERGIES.map((allergy) => (
                      <Badge
                        key={allergy}
                        variant={dietary.allergies.includes(allergy) ? "destructive" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => setDietary({ ...dietary, allergies: toggleArrayItem(dietary.allergies, allergy) })}
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <Label>Spice Preference</Label>
                    <Select
                      value={dietary.spicePreference}
                      onValueChange={(v) => setDietary({ ...dietary, spicePreference: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="spicy">Spicy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Budget</Label>
                    <Select
                      value={dietary.budget}
                      onValueChange={(v) => setDietary({ ...dietary, budget: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Budget-friendly)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Premium)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Cooking Time/Meal</Label>
                    <Select
                      value={dietary.cookingTime}
                      onValueChange={(v) => setDietary({ ...dietary, cookingTime: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 mins (Quick)</SelectItem>
                        <SelectItem value="30">30 mins</SelectItem>
                        <SelectItem value="45+">45+ mins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Kitchen Equipment</Label>
                  <div className="flex flex-wrap gap-2">
                    {EQUIPMENT.map((item) => (
                      <Badge
                        key={item}
                        variant={dietary.equipment.includes(item) ? "secondary" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => setDietary({ ...dietary, equipment: toggleArrayItem(dietary.equipment, item) })}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dislikes">Foods to Avoid (Optional)</Label>
                  <Textarea
                    id="dislikes"
                    placeholder="e.g., bitter gourd, okra, mushrooms..."
                    value={dietary.dislikes}
                    onChange={(e) => setDietary({ ...dietary, dislikes: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Medical & Health Conditions */}
          {currentStep === 'medical' && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-primary" />
                  Medical & Health Considerations
                </CardTitle>
                <CardDescription>
                  This helps us personalize your plan. All information is kept private.
                </CardDescription>
              </CardHeader>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This plan is for informational purposes only. Always consult your doctor before making dietary changes if you have medical conditions.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Existing Health Conditions (if any)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CONDITIONS.map((condition) => (
                      <div key={condition.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition.id}
                          checked={medical.conditions.includes(condition.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMedical({ ...medical, conditions: [...medical.conditions, condition.id] });
                            } else {
                              setMedical({ ...medical, conditions: medical.conditions.filter(c => c !== condition.id) });
                            }
                          }}
                        />
                        <Label htmlFor={condition.id} className="cursor-pointer text-sm">{condition.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="medications">Current Medications/Supplements (Optional)</Label>
                  <Textarea
                    id="medications"
                    placeholder="e.g., Metformin, Levothyroxine, Multivitamins..."
                    value={medical.medications}
                    onChange={(e) => setMedical({ ...medical, medications: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="restrictions">Doctor-Advised Dietary Restrictions (Optional)</Label>
                  <Textarea
                    id="restrictions"
                    placeholder="e.g., Low sodium, potassium restriction..."
                    value={medical.doctorRestrictions}
                    onChange={(e) => setMedical({ ...medical, doctorRestrictions: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="sleep">Sleep Hours/Night</Label>
                    <Input
                      id="sleep"
                      type="number"
                      min={3}
                      max={12}
                      value={medical.sleepHours}
                      onChange={(e) => setMedical({ ...medical, sleepHours: parseInt(e.target.value) || 7 })}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Perceived Stress Level</Label>
                    <Select
                      value={medical.stressLevel}
                      onValueChange={(v) => setMedical({ ...medical, stressLevel: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Results */}
          {currentStep === 'results' && generatedPlan && calculatedTargets && (
            <div className="space-y-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Your Personalized Plan is Ready!
                </CardTitle>
                <CardDescription>
                  Based on your inputs, here's your customized health & diet plan
                </CardDescription>
              </CardHeader>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="bg-primary/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{calculatedTargets.targetCalories}</p>
                    <p className="text-xs text-muted-foreground">Daily Calories</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{calculatedTargets.proteinGrams}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 dark:bg-amber-950/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{calculatedTargets.carbsGrams}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </CardContent>
                </Card>
                <Card className="bg-rose-50 dark:bg-rose-950/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-rose-600">{calculatedTargets.fatGrams}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </CardContent>
                </Card>
              </div>

              {/* Calculation Details */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Calculation Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">BMR</p>
                    <p className="font-medium">{calculatedTargets.bmr} kcal/day</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">TDEE</p>
                    <p className="font-medium">{calculatedTargets.tdee} kcal/day</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weekly Change</p>
                    <p className="font-medium">
                      {calculatedTargets.weeklyWeightChangeKg > 0 ? '+' : ''}
                      {calculatedTargets.weeklyWeightChangeKg} kg
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Condition Notes */}
              {generatedPlan.conditionNotes.length > 0 && (
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <HeartPulse className="w-4 h-4" />
                      Health Condition Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {generatedPlan.conditionNotes.map((note, index) => (
                      <p key={index} className="text-sm">{note}</p>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Sample Meal Plan */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sample Day Plan (Day 1)</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedPlan.days[0] && (
                    <div className="space-y-3">
                      {generatedPlan.days[0].meals.map((meal, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{meal.name}</p>
                            <p className="text-sm text-muted-foreground">{meal.recipeName}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{meal.kcal} kcal</p>
                            <p className="text-xs text-muted-foreground">
                              P: {meal.proteinG}g | C: {meal.carbsG}g | F: {meal.fatG}g
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg font-medium">
                        <span>Daily Total</span>
                        <span>{generatedPlan.days[0].totalKcal} kcal</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleDownloadPDF} className="flex-1 gap-2" size="lg">
                  <FileDown className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button onClick={handleDownloadExcel} variant="outline" className="flex-1 gap-2" size="lg">
                  <FileSpreadsheet className="w-5 h-5" />
                  Download Excel
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Disclaimer:</strong> This plan is for informational purposes only and does not substitute professional medical advice. 
                  Always consult with a healthcare provider before starting any new diet plan.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'results' && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={goToPrevStep}
                disabled={getCurrentStepIndex() === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep === 'medical' ? (
                <Button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      Generate My Plan
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={goToNextStep} className="gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {/* Restart Button on Results */}
          {currentStep === 'results' && (
            <div className="mt-6 pt-6 border-t text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep('profile');
                  setGeneratedPlan(null);
                  setCalculatedTargets(null);
                }}
              >
                Create New Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
