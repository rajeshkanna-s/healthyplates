// Health Planner Multi-Step Form Component

import React, { useState } from "react";
import { 
  User, Target, Activity, Utensils, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle2, FileDown, FileSpreadsheet,
  Scale, Ruler, Calendar, Dumbbell, AlertCircle, Flame, Beef, Wheat, Droplets,
  ShoppingCart, ChefHat, Lightbulb, ClipboardList, TrendingUp, Clock, UtensilsCrossed, Loader2
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
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

  const handleDownloadPDF = async () => {
    if (generatedPlan) {
      setIsDownloadingPDF(true);
      try {
        const intake: UserIntake = { profile, goal, activity, dietary, medical };
        // Use setTimeout to allow UI to update before heavy PDF generation
        await new Promise(resolve => setTimeout(resolve, 100));
        generatePDF(generatedPlan, intake);
      } finally {
        setIsDownloadingPDF(false);
      }
    }
  };

  const handleDownloadExcel = async () => {
    if (generatedPlan) {
      setIsDownloadingExcel(true);
      try {
        const intake: UserIntake = { profile, goal, activity, dietary, medical };
        await new Promise(resolve => setTimeout(resolve, 100));
        generateExcel(generatedPlan, intake);
      } finally {
        setIsDownloadingExcel(false);
      }
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
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={profile.age === 0 ? '' : profile.age}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const num = parseInt(val) || 0;
                        setProfile({ ...profile, age: Math.min(num, 60) });
                      }}
                      className="pl-10"
                      placeholder="e.g., 30"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="height"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={profile.heightCm === 0 ? '' : profile.heightCm}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const num = parseInt(val) || 0;
                        setProfile({ ...profile, heightCm: Math.min(num, 225) });
                      }}
                      className="pl-10"
                      placeholder="e.g., 170"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={profile.weightKg === 0 ? '' : profile.weightKg}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const num = parseInt(val) || 0;
                        setProfile({ ...profile, weightKg: Math.min(num, 200) });
                      }}
                      className="pl-10"
                      placeholder="e.g., 70"
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="e.g., 20"
                    value={profile.bodyFatPercent ?? ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val === '') {
                        setProfile({ ...profile, bodyFatPercent: undefined });
                      } else {
                        const num = parseInt(val) || 0;
                        setProfile({ ...profile, bodyFatPercent: Math.min(num, 90) });
                      }
                    }}
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
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={medical.sleepHours === 0 ? '' : medical.sleepHours}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val === '') {
                          setMedical({ ...medical, sleepHours: 0 });
                        } else {
                          const num = parseInt(val) || 0;
                          setMedical({ ...medical, sleepHours: Math.min(num, 18) });
                        }
                      }}
                      placeholder="e.g., 7"
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

          {/* Step 6: Results - Comprehensive View */}
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

              {/* Download Buttons - Top */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleDownloadPDF} 
                  className="flex-1 gap-2" 
                  size="lg"
                  disabled={isDownloadingPDF || isDownloadingExcel}
                >
                  {isDownloadingPDF ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileDown className="w-5 h-5" />
                  )}
                  {isDownloadingPDF ? 'Generating PDF...' : 'Download PDF'}
                </Button>
                <Button 
                  onClick={handleDownloadExcel} 
                  variant="outline" 
                  className="flex-1 gap-2" 
                  size="lg"
                  disabled={isDownloadingPDF || isDownloadingExcel}
                >
                  {isDownloadingExcel ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="w-5 h-5" />
                  )}
                  {isDownloadingExcel ? 'Generating Excel...' : 'Download Excel'}
                </Button>
              </div>

              {/* Tabbed Content */}
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted p-1">
                  <TabsTrigger value="summary" className="flex-1 min-w-[80px] gap-1 text-xs sm:text-sm">
                    <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Summary</span>
                    <span className="sm:hidden">Summary</span>
                  </TabsTrigger>
                  <TabsTrigger value="meals" className="flex-1 min-w-[80px] gap-1 text-xs sm:text-sm">
                    <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Meal Plan</span>
                    <span className="sm:hidden">Meals</span>
                  </TabsTrigger>
                  <TabsTrigger value="shopping" className="flex-1 min-w-[80px] gap-1 text-xs sm:text-sm">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Shopping</span>
                    <span className="sm:hidden">Shop</span>
                  </TabsTrigger>
                  <TabsTrigger value="recipes" className="flex-1 min-w-[80px] gap-1 text-xs sm:text-sm">
                    <ChefHat className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Recipes</span>
                    <span className="sm:hidden">Recipes</span>
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="flex-1 min-w-[80px] gap-1 text-xs sm:text-sm">
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Tips</span>
                    <span className="sm:hidden">Tips</span>
                  </TabsTrigger>
                </TabsList>

                {/* Summary Tab */}
                <TabsContent value="summary" className="mt-4 space-y-4">
                  {/* Macro Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
                      <CardContent className="p-4 text-center">
                        <Flame className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                        <p className="text-2xl font-bold text-orange-600">{calculatedTargets.targetCalories}</p>
                        <p className="text-xs text-muted-foreground">Daily Calories</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4 text-center">
                        <Beef className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                        <p className="text-2xl font-bold text-blue-600">{calculatedTargets.proteinGrams}g</p>
                        <p className="text-xs text-muted-foreground">Protein</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-4 text-center">
                        <Wheat className="w-6 h-6 mx-auto mb-1 text-amber-600" />
                        <p className="text-2xl font-bold text-amber-600">{calculatedTargets.carbsGrams}g</p>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 border-rose-200 dark:border-rose-800">
                      <CardContent className="p-4 text-center">
                        <Droplets className="w-6 h-6 mx-auto mb-1 text-rose-600" />
                        <p className="text-2xl font-bold text-rose-600">{calculatedTargets.fatGrams}g</p>
                        <p className="text-xs text-muted-foreground">Fat</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Calculation Details */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Calculation Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground text-xs">BMR</p>
                        <p className="font-semibold text-lg">{calculatedTargets.bmr}</p>
                        <p className="text-xs text-muted-foreground">kcal/day</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground text-xs">TDEE</p>
                        <p className="font-semibold text-lg">{calculatedTargets.tdee}</p>
                        <p className="text-xs text-muted-foreground">kcal/day</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground text-xs">Deficit/Surplus</p>
                        <p className="font-semibold text-lg">
                          {calculatedTargets.deficitOrSurplus > 0 ? '+' : ''}{calculatedTargets.deficitOrSurplus}
                        </p>
                        <p className="text-xs text-muted-foreground">kcal/day</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground text-xs">Weekly Change</p>
                        <p className="font-semibold text-lg">
                          {calculatedTargets.weeklyWeightChangeKg > 0 ? '+' : ''}{calculatedTargets.weeklyWeightChangeKg}
                        </p>
                        <p className="text-xs text-muted-foreground">kg/week</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Profile Summary */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Your Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                        <div><span className="text-muted-foreground">Sex:</span> <span className="font-medium capitalize">{profile.sex}</span></div>
                        <div><span className="text-muted-foreground">Age:</span> <span className="font-medium">{profile.age} years</span></div>
                        <div><span className="text-muted-foreground">Height:</span> <span className="font-medium">{profile.heightCm} cm</span></div>
                        <div><span className="text-muted-foreground">Weight:</span> <span className="font-medium">{profile.weightKg} kg</span></div>
                        <div><span className="text-muted-foreground">Activity:</span> <span className="font-medium capitalize">{activity.activityLevel}</span></div>
                        <div><span className="text-muted-foreground">Meals/Day:</span> <span className="font-medium">{activity.mealsPerDay}</span></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Condition Notes */}
                  {generatedPlan.conditionNotes.length > 0 && (
                    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-400">
                          <HeartPulse className="w-4 h-4" />
                          Health Condition Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {generatedPlan.conditionNotes.map((note, index) => (
                          <div key={index} className="flex gap-2 text-sm">
                            <span className="text-amber-600 font-medium">{index + 1}.</span>
                            <p>{note}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Meal Plan Tab */}
                <TabsContent value="meals" className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Showing all {generatedPlan.days.length} days of your meal plan</span>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {generatedPlan.days.map((day, dayIndex) => (
                      <AccordionItem key={dayIndex} value={`day-${dayIndex}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">{day.day}</span>
                              </div>
                              <div className="text-left">
                                <p className="font-medium">{day.dayName}</p>
                                <p className="text-xs text-muted-foreground">{day.date}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="hidden sm:flex">
                              {day.totalKcal} kcal
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                          <div className="space-y-3">
                            {day.meals.map((meal, mealIndex) => (
                              <div key={mealIndex} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <Utensils className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{meal.name}</p>
                                    <p className="text-sm text-muted-foreground">{meal.recipeName}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Portion: {meal.portionGrams}g</p>
                                  </div>
                                </div>
                                <div className="flex gap-2 flex-wrap sm:text-right ml-11 sm:ml-0">
                                  <Badge variant="outline" className="text-xs">{meal.kcal} kcal</Badge>
                                  <Badge variant="outline" className="text-xs text-blue-600">P: {meal.proteinG}g</Badge>
                                  <Badge variant="outline" className="text-xs text-amber-600">C: {meal.carbsG}g</Badge>
                                  <Badge variant="outline" className="text-xs text-rose-600">F: {meal.fatG}g</Badge>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg font-medium">
                              <span>Daily Total</span>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <Badge className="bg-primary">{day.totalKcal} kcal</Badge>
                                <span className="text-xs hidden sm:inline">
                                  P: {day.totalProtein}g | C: {day.totalCarbs}g | F: {day.totalFat}g
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                {/* Shopping List Tab */}
                <TabsContent value="shopping" className="mt-4 space-y-4">
                  {generatedPlan.weeklyShoppingLists.map((week, weekIndex) => (
                    <Card key={weekIndex}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                          Week {week.weekNumber} Shopping List
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {week.items.map((category, catIndex) => (
                            <div key={catIndex} className="p-3 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-sm text-primary mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                {category.category}
                              </h4>
                              <ul className="space-y-1">
                                {category.ingredients.map((ing, ingIndex) => (
                                  <li key={ingIndex} className="text-sm flex justify-between">
                                    <span>{ing.name}</span>
                                    <span className="text-muted-foreground">{ing.quantity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Recipes Tab */}
                <TabsContent value="recipes" className="mt-4 space-y-4">
                  {(() => {
                    const uniqueRecipes = new Map<string, { ingredients: string[]; instructions: string[]; prepTime: number }>();
                    generatedPlan.days.forEach(day => {
                      day.meals.forEach(meal => {
                        if (!uniqueRecipes.has(meal.recipeName)) {
                          uniqueRecipes.set(meal.recipeName, {
                            ingredients: meal.ingredients,
                            instructions: meal.instructions,
                            prepTime: meal.prepTime,
                          });
                        }
                      });
                    });

                    return (
                      <Accordion type="single" collapsible className="w-full space-y-2">
                        {Array.from(uniqueRecipes.entries()).map(([recipeName, recipe], index) => (
                          <AccordionItem key={index} value={`recipe-${index}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  <ChefHat className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="text-left">
                                  <p className="font-medium">{recipeName}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {recipe.prepTime} mins
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-4">
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <ShoppingCart className="w-4 h-4 text-primary" />
                                  Ingredients
                                </h4>
                                <ul className="space-y-1 ml-6">
                                  {recipe.ingredients.map((ing, i) => (
                                    <li key={i} className="text-sm list-disc">{ing}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <ClipboardList className="w-4 h-4 text-primary" />
                                  Instructions
                                </h4>
                                <ol className="space-y-2 ml-6">
                                  {recipe.instructions.map((step, i) => (
                                    <li key={i} className="text-sm">
                                      <span className="font-medium text-primary mr-2">{i + 1}.</span>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    );
                  })()}
                </TabsContent>

                {/* Tips Tab */}
                <TabsContent value="tips" className="mt-4 space-y-4">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                        <Lightbulb className="w-4 h-4" />
                        Lifestyle Tips for Success
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {generatedPlan.tips.map((tip, index) => (
                        <div key={index} className="flex gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-green-600">{index + 1}</span>
                          </div>
                          <p className="text-sm pt-1">{tip}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Condition Guidelines in Tips Tab too */}
                  {generatedPlan.conditionNotes.length > 0 && (
                    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-400">
                          <HeartPulse className="w-4 h-4" />
                          Condition-Specific Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {generatedPlan.conditionNotes.map((note, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                              <HeartPulse className="w-4 h-4 text-amber-600" />
                            </div>
                            <p className="text-sm pt-1">{note}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>

              {/* Disclaimer */}
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
