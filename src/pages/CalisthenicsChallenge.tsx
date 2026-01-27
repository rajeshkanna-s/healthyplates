import { useState } from 'react';
import { 
  Dumbbell, Play, Download, FileSpreadsheet, FileText, Heart, 
  User, Target, Calendar, Clock, AlertTriangle, ChevronRight, 
  TrendingUp, Activity, Loader2, CheckCircle2, Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { 
  UserProfile, 
  BaselineTests, 
  ProgramSettings, 
  WorkoutPlan,
  Equipment,
  InjuryFlag 
} from '@/components/calisthenics/types';
import { generateWorkoutPlan, getVolumeChartData, getMuscleDistribution } from '@/components/calisthenics/calculations';
import { exportToPDF, exportToExcel } from '@/components/calisthenics/exportUtils';

const CalisthenicsChallenge = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  
  // Form state
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    sex: 'male',
    height_cm: 170,
    weight_kg: 70,
    experience: 'beginner',
    goal: 'general_fitness',
    available_days_per_week: 4,
    session_duration_min: 30,
    equipment: ['none'],
    injuries_flags: ['none']
  });
  
  const [baseline, setBaseline] = useState<BaselineTests>({
    max_pushups: 10,
    max_bodyweight_squat: 30,
    max_plank_sec: 30,
    max_pullups: 0,
    rpe_preference: 7
  });
  
  const [settings, setSettings] = useState<ProgramSettings>({
    duration_days: 14,
    split_preference: 'full_body',
    start_date: new Date().toISOString().split('T')[0],
    units: 'metric',
    include_warmup_cooldown: true,
    progression_model: 'double_progression',
    deload_rule: 'auto_based_on_fatigue',
    auto_substitute_if_no_equipment: true
  });

  const equipmentOptions: { value: Equipment; label: string }[] = [
    { value: 'none', label: 'No Equipment' },
    { value: 'pullup_bar', label: 'Pull-up Bar' },
    { value: 'dip_bars', label: 'Dip Bars' },
    { value: 'rings', label: 'Gymnastics Rings' },
    { value: 'resistance_band', label: 'Resistance Band' },
    { value: 'boxes_bench', label: 'Box / Bench' }
  ];

  const injuryOptions: { value: InjuryFlag; label: string }[] = [
    { value: 'none', label: 'No Injuries' },
    { value: 'shoulder', label: 'Shoulder' },
    { value: 'wrist', label: 'Wrist' },
    { value: 'elbow', label: 'Elbow' },
    { value: 'lower_back', label: 'Lower Back' },
    { value: 'knee', label: 'Knee' },
    { value: 'ankle', label: 'Ankle' }
  ];

  const handleEquipmentChange = (value: Equipment, checked: boolean) => {
    if (value === 'none' && checked) {
      setProfile(p => ({ ...p, equipment: ['none'] }));
    } else if (checked) {
      setProfile(p => ({
        ...p,
        equipment: [...p.equipment.filter(e => e !== 'none'), value]
      }));
    } else {
      const newEquipment = profile.equipment.filter(e => e !== value);
      setProfile(p => ({
        ...p,
        equipment: newEquipment.length === 0 ? ['none'] : newEquipment
      }));
    }
  };

  const handleInjuryChange = (value: InjuryFlag, checked: boolean) => {
    if (value === 'none' && checked) {
      setProfile(p => ({ ...p, injuries_flags: ['none'] }));
    } else if (checked) {
      setProfile(p => ({
        ...p,
        injuries_flags: [...p.injuries_flags.filter(i => i !== 'none'), value]
      }));
    } else {
      const newInjuries = profile.injuries_flags.filter(i => i !== value);
      setProfile(p => ({
        ...p,
        injuries_flags: newInjuries.length === 0 ? ['none'] : newInjuries
      }));
    }
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedPlan = generateWorkoutPlan(profile, baseline, settings);
      setPlan(generatedPlan);
      setStep(4);
      setIsGenerating(false);
    }, 1500);
  };

  const volumeData = plan ? getVolumeChartData(plan) : [];
  const muscleData = plan ? getMuscleDistribution(plan) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Dumbbell className="w-4 h-4" />
            Calisthenics Workout Challenge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bodyweight</span> Workout Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a personalized calisthenics program based on your fitness level, goals, and available equipment. 
            No gym required!
          </p>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110' 
                      : s < step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-1 mx-2 rounded ${s < step ? 'bg-green-500' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Your Profile
              </CardTitle>
              <CardDescription className="text-blue-100">
                Tell us about yourself so we can customize your workout plan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    type="number"
                    min={16}
                    max={75}
                    value={profile.age}
                    onChange={(e) => setProfile(p => ({ ...p, age: Math.min(75, Math.max(16, parseInt(e.target.value) || 16)) }))}
                  />
                </div>
              </div>

              <div>
                <Label>Sex</Label>
                <RadioGroup 
                  value={profile.sex}
                  onValueChange={(v) => setProfile(p => ({ ...p, sex: v as any }))}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height"
                    type="number"
                    min={120}
                    max={220}
                    value={profile.height_cm}
                    onChange={(e) => setProfile(p => ({ ...p, height_cm: Math.min(220, Math.max(120, parseInt(e.target.value) || 120)) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight"
                    type="number"
                    min={30}
                    max={200}
                    value={profile.weight_kg}
                    onChange={(e) => setProfile(p => ({ ...p, weight_kg: Math.min(200, Math.max(30, parseFloat(e.target.value) || 30)) }))}
                  />
                </div>
              </div>

              <div>
                <Label>Experience Level</Label>
                <Select value={profile.experience} onValueChange={(v) => setProfile(p => ({ ...p, experience: v as any }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-6 months)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (6-24 months)</SelectItem>
                    <SelectItem value="advanced">Advanced (2+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fitness Goal</Label>
                <Select value={profile.goal} onValueChange={(v) => setProfile(p => ({ ...p, goal: v as any }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general_fitness">General Fitness</SelectItem>
                    <SelectItem value="strength">Build Strength</SelectItem>
                    <SelectItem value="hypertrophy">Muscle Growth</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="fat_loss">Fat Loss</SelectItem>
                    <SelectItem value="skills">Calisthenics Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Training Days per Week</Label>
                  <Select 
                    value={String(profile.available_days_per_week)} 
                    onValueChange={(v) => setProfile(p => ({ ...p, available_days_per_week: parseInt(v) }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7].map(d => (
                        <SelectItem key={d} value={String(d)}>{d} days</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Session Duration (minutes)</Label>
                  <Select 
                    value={String(profile.session_duration_min)} 
                    onValueChange={(v) => setProfile(p => ({ ...p, session_duration_min: parseInt(v) }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[15, 20, 30, 45, 60, 75, 90].map(m => (
                        <SelectItem key={m} value={String(m)}>{m} min</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Available Equipment</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipmentOptions.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`eq-${opt.value}`}
                        checked={profile.equipment.includes(opt.value)}
                        onCheckedChange={(checked) => handleEquipmentChange(opt.value, !!checked)}
                      />
                      <Label htmlFor={`eq-${opt.value}`} className="text-sm">{opt.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Any Injuries or Limitations?
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {injuryOptions.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`inj-${opt.value}`}
                        checked={profile.injuries_flags.includes(opt.value)}
                        onCheckedChange={(checked) => handleInjuryChange(opt.value, !!checked)}
                      />
                      <Label htmlFor={`inj-${opt.value}`} className="text-sm">{opt.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setStep(2)}
                disabled={!profile.name}
              >
                Continue to Baseline Tests
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Baseline Tests */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Baseline Fitness Tests
              </CardTitle>
              <CardDescription className="text-green-100">
                Complete these simple tests to calibrate your workout intensity
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Do your best for each test. These numbers help us calculate your starting point. 
                  If you can't do an exercise, enter 0.
                </p>
              </div>

              <div>
                <Label htmlFor="pushups">Max Push-ups (AMRAP)</Label>
                <p className="text-sm text-muted-foreground mb-2">How many push-ups can you do without stopping?</p>
                <Input 
                  id="pushups"
                  type="number"
                  min={0}
                  max={100}
                  value={baseline.max_pushups}
                  onChange={(e) => setBaseline(b => ({ ...b, max_pushups: Math.min(100, parseInt(e.target.value) || 0) }))}
                />
              </div>

              <div>
                <Label htmlFor="squats">Max Bodyweight Squats (AMRAP)</Label>
                <p className="text-sm text-muted-foreground mb-2">How many air squats can you do without stopping?</p>
                <Input 
                  id="squats"
                  type="number"
                  min={0}
                  max={200}
                  value={baseline.max_bodyweight_squat}
                  onChange={(e) => setBaseline(b => ({ ...b, max_bodyweight_squat: Math.min(200, parseInt(e.target.value) || 0) }))}
                />
              </div>

              <div>
                <Label htmlFor="plank">Max Plank Hold (seconds)</Label>
                <p className="text-sm text-muted-foreground mb-2">How long can you hold a front plank?</p>
                <Input 
                  id="plank"
                  type="number"
                  min={0}
                  max={600}
                  value={baseline.max_plank_sec}
                  onChange={(e) => setBaseline(b => ({ ...b, max_plank_sec: Math.min(600, parseInt(e.target.value) || 0) }))}
                />
              </div>

              {profile.equipment.includes('pullup_bar') && (
                <div>
                  <Label htmlFor="pullups">Max Pull-ups (AMRAP)</Label>
                  <p className="text-sm text-muted-foreground mb-2">How many pull-ups can you do? (0 is okay!)</p>
                  <Input 
                    id="pullups"
                    type="number"
                    min={0}
                    max={30}
                    value={baseline.max_pullups}
                    onChange={(e) => setBaseline(b => ({ ...b, max_pullups: Math.min(30, parseInt(e.target.value) || 0) }))}
                  />
                </div>
              )}

              <div>
                <Label>Preferred Effort Level (RPE)</Label>
                <p className="text-sm text-muted-foreground mb-2">How hard do you want your workouts to feel? (6=Easy, 9=Very Hard)</p>
                <div className="flex gap-2 mt-2">
                  {[6, 7, 8, 9].map(rpe => (
                    <Button
                      key={rpe}
                      variant={baseline.rpe_preference === rpe ? 'default' : 'outline'}
                      className={baseline.rpe_preference === rpe ? 'bg-green-600 hover:bg-green-700' : ''}
                      onClick={() => setBaseline(b => ({ ...b, rpe_preference: rpe }))}
                    >
                      {rpe}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Easy</span>
                  <span>Moderate</span>
                  <span>Hard</span>
                  <span>Very Hard</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => setStep(3)}
                >
                  Continue to Program Settings
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Program Settings */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Program Settings
              </CardTitle>
              <CardDescription className="text-purple-100">
                Configure your challenge duration and training style
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label>Challenge Duration</Label>
                <RadioGroup 
                  value={String(settings.duration_days)}
                  onValueChange={(v) => setSettings(s => ({ ...s, duration_days: parseInt(v) as any }))}
                  className="grid grid-cols-3 gap-4 mt-2"
                >
                  {[{ value: 7, label: '7 Days' }, { value: 14, label: '14 Days' }, { value: 30, label: '30 Days' }].map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={String(opt.value)} id={`dur-${opt.value}`} />
                      <Label htmlFor={`dur-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="start">Start Date</Label>
                <Input 
                  id="start"
                  type="date"
                  value={settings.start_date}
                  onChange={(e) => setSettings(s => ({ ...s, start_date: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Progression Model</Label>
                <Select value={settings.progression_model} onValueChange={(v) => setSettings(s => ({ ...s, progression_model: v as any }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear (+1 rep when successful)</SelectItem>
                    <SelectItem value="double_progression">Double Progression (rep range → harder variant)</SelectItem>
                    <SelectItem value="amrap_based">AMRAP Based (retest every week)</SelectItem>
                    <SelectItem value="wave">Wave (moderate/heavy/light cycle)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Include Warm-up & Cooldown</Label>
                  <p className="text-sm text-muted-foreground">Recommended for injury prevention</p>
                </div>
                <Checkbox 
                  checked={settings.include_warmup_cooldown}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, include_warmup_cooldown: !!checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Auto-substitute if No Equipment</Label>
                  <p className="text-sm text-muted-foreground">Replace exercises automatically based on your equipment</p>
                </div>
                <Checkbox 
                  checked={settings.auto_substitute_if_no_equipment}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, auto_substitute_if_no_equipment: !!checked }))}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Your Plan...
                    </>
                  ) : (
                    <>
                      Generate My Workout Plan
                      <Play className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Results */}
        {step === 4 && plan && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{plan.summary.total_days}</div>
                  <div className="text-sm opacity-80">Total Days</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-4 text-center">
                  <Dumbbell className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{plan.summary.training_days}</div>
                  <div className="text-sm opacity-80">Training Days</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{plan.summary.avg_session_time}</div>
                  <div className="text-sm opacity-80">Avg. Minutes</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{plan.summary.total_volume}</div>
                  <div className="text-sm opacity-80">Total Volume</div>
                </CardContent>
              </Card>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={() => exportToPDF(plan)}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                onClick={() => exportToExcel(plan)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
              <Button 
                variant="outline"
                onClick={() => { setPlan(null); setStep(1); }}
              >
                Create New Plan
              </Button>
            </div>

            {/* Tabs for detailed view */}
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="library">Exercises</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="schedule" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your {plan.summary.total_days}-Day Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {plan.days.map((day, idx) => (
                        <AccordionItem key={idx} value={`day-${idx}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 w-full">
                              <Badge 
                                variant={day.theme === 'rest' ? 'secondary' : 'default'}
                                className={day.theme !== 'rest' ? 'bg-blue-600' : ''}
                              >
                                Day {day.day_number}
                              </Badge>
                              <span className="font-medium">{day.theme.toUpperCase()}</span>
                              <span className="text-sm text-muted-foreground ml-auto mr-4">
                                {day.theme !== 'rest' ? `${day.est_time_min} min` : 'Recovery'}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {day.theme === 'rest' ? (
                              <div className="p-4 bg-muted rounded-lg text-center">
                                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                                <p className="font-medium">Rest & Recovery Day</p>
                                <p className="text-sm text-muted-foreground">
                                  Focus on stretching, hydration, and sleep. Your muscles grow during rest!
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {day.warmup.length > 0 && (
                                  <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">🔥 Warm-up</p>
                                    <ul className="text-sm space-y-1">
                                      {day.warmup.map((w, i) => (
                                        <li key={i} className="text-muted-foreground">{w.name} ({w.duration_sec}s)</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="space-y-3">
                                  {day.exercises.map((ex, i) => (
                                    <div key={i} className="p-3 border rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">{ex.name}</span>
                                        <Badge variant="outline">{ex.category}</Badge>
                                      </div>
                                      <div className="grid grid-cols-4 gap-2 text-sm text-muted-foreground">
                                        <div>
                                          <span className="font-medium text-foreground">{ex.sets}</span> sets
                                        </div>
                                        <div>
                                          <span className="font-medium text-foreground">
                                            {Array.isArray(ex.reps_per_set) 
                                              ? ex.reps_per_set[0] 
                                              : `${ex.reps_per_set.hold_sec}s`}
                                          </span> {Array.isArray(ex.reps_per_set) ? 'reps' : 'hold'}
                                        </div>
                                        <div>
                                          <span className="font-medium text-foreground">{ex.rest_sec}s</span> rest
                                        </div>
                                        <div>
                                          <span className="font-medium text-foreground">{ex.tempo}</span> tempo
                                        </div>
                                      </div>
                                      {ex.notes && (
                                        <p className="text-xs text-muted-foreground mt-2 italic">{ex.notes}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                {day.cooldown.length > 0 && (
                                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">❄️ Cooldown</p>
                                    <ul className="text-sm space-y-1">
                                      {day.cooldown.map((c, i) => (
                                        <li key={i} className="text-muted-foreground">{c.name} ({c.duration_sec}s)</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="charts" className="mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Volume Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={volumeData}>
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line 
                              type="monotone" 
                              dataKey="volume" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={{ r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Muscle Group Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={muscleData}
                              dataKey="value"
                              nameKey="muscle"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={({ muscle }) => muscle}
                            >
                              {muscleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="library" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Exercises</CardTitle>
                    <CardDescription>
                      {plan.exercise_library.length} exercises available based on your equipment and injury profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {plan.exercise_library.map((ex, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{ex.name}</span>
                            <Badge variant="outline" className="text-xs">{ex.difficulty}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {ex.primary_muscles.slice(0, 3).join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🎯 Progression Tips</h4>
                      <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                        <li>• Focus on form before adding reps or sets</li>
                        <li>• When all sets feel easy (RPE {"<"} 7), progress to harder variation</li>
                        <li>• Track your workouts to see improvement over time</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💧 Recovery Tips</h4>
                      <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                        <li>• Get 7-9 hours of sleep per night</li>
                        <li>• Stay hydrated - aim for 2-3 liters of water daily</li>
                        <li>• Eat enough protein ({Math.round(plan.user_profile.weight_kg * 1.6)}g+ per day)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">⚠️ Safety Tips</h4>
                      <ul className="text-sm space-y-1 text-amber-700 dark:text-amber-300">
                        <li>• Never skip the warm-up</li>
                        <li>• Stop if you feel sharp pain (not muscle burn)</li>
                        <li>• Listen to your body - rest if needed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalisthenicsChallenge;
