import { 
  UserProfile, 
  BaselineTests, 
  ProgramSettings, 
  DayPlan, 
  WorkoutExercise,
  WarmupCooldownItem,
  WorkoutPlan,
  Exercise,
  InjuryFlag
} from './types';
import { exerciseLibrary, getSafeExercises } from './exerciseLibrary';

// Calculate BMI
export function calculateBMI(weight_kg: number, height_cm: number): number {
  const height_m = height_cm / 100;
  return Math.round((weight_kg / (height_m * height_m)) * 10) / 10;
}

// Calculate BMR using Mifflin-St Jeor formula
export function calculateBMR(profile: UserProfile): number {
  const { weight_kg, height_cm, age, sex } = profile;
  if (sex === 'male') {
    return Math.round((10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5);
  }
  return Math.round((10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161);
}

// Activity multiplier based on days per week
function getActivityMultiplier(days: number): number {
  if (days <= 2) return 1.2;    // Sedentary
  if (days <= 3) return 1.375;  // Lightly Active
  if (days <= 4) return 1.55;   // Moderate
  if (days <= 5) return 1.725;  // Very Active
  return 1.9;                    // Super Active
}

// Calculate TDEE
export function calculateTDEE(bmr: number, days_per_week: number): number {
  return Math.round(bmr * getActivityMultiplier(days_per_week));
}

// Determine split based on user preferences
export function determineSplit(profile: UserProfile): 'full_body' | 'upper_lower' | 'push_pull_legs' | 'skills_focus' {
  const { available_days_per_week, session_duration_min, goal } = profile;
  
  if (goal === 'skills') return 'skills_focus';
  if (available_days_per_week <= 3 || session_duration_min < 30) return 'full_body';
  if (available_days_per_week === 4) return 'upper_lower';
  if (available_days_per_week >= 5 && session_duration_min >= 40) return 'push_pull_legs';
  return 'full_body';
}

// Calculate starting reps from AMRAP
export function calculateStartingReps(amrap: number, goal: UserProfile['goal']): number {
  const baseReps = Math.ceil(amrap * 0.6);
  
  const ranges: Record<UserProfile['goal'], { min: number; max: number }> = {
    strength: { min: 4, max: 8 },
    hypertrophy: { min: 8, max: 15 },
    endurance: { min: 12, max: 20 },
    fat_loss: { min: 12, max: 20 },
    skills: { min: 5, max: 10 },
    general_fitness: { min: 8, max: 15 }
  };
  
  const { min, max } = ranges[goal];
  return Math.max(min, Math.min(max, baseReps));
}

// Get sets based on experience
export function getSetsForExperience(experience: UserProfile['experience'], goal: UserProfile['goal']): number {
  const baseSets: Record<UserProfile['experience'], number> = {
    beginner: 3,
    intermediate: 4,
    advanced: 5
  };
  
  if (goal === 'strength') return Math.min(baseSets[experience] + 1, 5);
  if (goal === 'endurance' || goal === 'fat_loss') return Math.max(baseSets[experience] - 1, 2);
  return baseSets[experience];
}

// Get rest time based on goal
export function getRestTime(goal: UserProfile['goal']): number {
  const restTimes: Record<UserProfile['goal'], number> = {
    strength: 120,
    hypertrophy: 75,
    endurance: 45,
    fat_loss: 45,
    skills: 90,
    general_fitness: 60
  };
  return restTimes[goal];
}

// Generate warmup
export function generateWarmup(): WarmupCooldownItem[] {
  return [
    { name: 'Joint Circles (Neck, Shoulders, Wrists, Hips)', duration_sec: 60 },
    { name: 'Dynamic Leg Swings (Front/Side)', duration_sec: 60 },
    { name: 'Arm Circles & Shoulder Rotations', duration_sec: 45 },
    { name: 'Air Squats (Light)', duration_sec: 45 },
    { name: 'Incline Push-ups (Light)', duration_sec: 45 },
    { name: 'Cat-Cow Stretch', duration_sec: 45 }
  ];
}

// Generate cooldown
export function generateCooldown(): WarmupCooldownItem[] {
  return [
    { name: 'Standing Quad Stretch', duration_sec: 45 },
    { name: 'Standing Hamstring Stretch', duration_sec: 45 },
    { name: 'Chest & Shoulder Stretch', duration_sec: 45 },
    { name: 'Tricep Stretch', duration_sec: 30 },
    { name: 'Child\'s Pose', duration_sec: 45 },
    { name: 'Deep Breathing', duration_sec: 30 }
  ];
}

// Select exercises for a theme
function selectExercisesForTheme(
  theme: DayPlan['theme'],
  safeExercises: Exercise[],
  profile: UserProfile,
  baseline: BaselineTests
): WorkoutExercise[] {
  const exercises: WorkoutExercise[] = [];
  const sets = getSetsForExperience(profile.experience, profile.goal);
  const rest = getRestTime(profile.goal);
  
  const categoriesForTheme: Record<DayPlan['theme'], ('push' | 'pull' | 'legs' | 'core' | 'metcon')[]> = {
    full_body: ['push', 'pull', 'legs', 'core'],
    upper: ['push', 'pull', 'core'],
    lower: ['legs', 'core'],
    push: ['push', 'core'],
    pull: ['pull', 'core'],
    skills: ['push', 'pull', 'core'],
    rest: []
  };
  
  const categories = categoriesForTheme[theme];
  
  categories.forEach(cat => {
    const available = safeExercises.filter(ex => 
      ex.category === cat && 
      ex.difficulty === profile.experience || 
      (profile.experience === 'advanced' && ex.difficulty === 'intermediate') ||
      (profile.experience === 'intermediate' && ex.difficulty === 'beginner')
    );
    
    if (available.length > 0) {
      // Sort by difficulty and pick appropriate exercise
      const sorted = available.sort((a, b) => {
        const diff = { beginner: 1, intermediate: 2, advanced: 3 };
        return diff[a.difficulty] - diff[b.difficulty];
      });
      
      const selectedIdx = profile.experience === 'advanced' ? Math.min(2, sorted.length - 1) :
                          profile.experience === 'intermediate' ? Math.min(1, sorted.length - 1) : 0;
      const selected = sorted[selectedIdx];
      
      // Calculate reps based on category
      let reps: number[] | { hold_sec: number };
      const repsArray: number[] = [];
      
      if (cat === 'core' && selected.name.toLowerCase().includes('plank')) {
        // Isometric hold
        const holdSec = Math.min(Math.round(baseline.max_plank_sec * 0.6), 60);
        reps = { hold_sec: holdSec };
      } else {
        // Dynamic exercise
        let baseReps: number;
        if (cat === 'push') baseReps = calculateStartingReps(baseline.max_pushups, profile.goal);
        else if (cat === 'legs') baseReps = calculateStartingReps(baseline.max_bodyweight_squat, profile.goal);
        else if (cat === 'pull') baseReps = calculateStartingReps(baseline.max_pullups || 6, profile.goal);
        else baseReps = calculateStartingReps(12, profile.goal);
        
        for (let i = 0; i < sets; i++) {
          repsArray.push(baseReps);
        }
        reps = repsArray;
      }
      
      exercises.push({
        name: selected.name,
        category: cat,
        variation: selected.difficulty,
        sets,
        reps_per_set: reps,
        rest_sec: rest,
        tempo: profile.goal === 'strength' ? '3-1-2' : '2-1-1',
        target_muscles: selected.primary_muscles,
        notes: selected.progressions.harder ? `Progress to ${selected.progressions.harder}` : ''
      });
    }
  });
  
  // Add metcon for fat loss or endurance
  if ((profile.goal === 'fat_loss' || profile.goal === 'endurance') && theme !== 'rest') {
    const metcon = safeExercises.find(ex => ex.category === 'metcon' && ex.difficulty === 'beginner');
    if (metcon) {
      exercises.push({
        name: metcon.name,
        category: 'metcon',
        variation: 'beginner',
        sets: 2,
        reps_per_set: [15, 15],
        rest_sec: 30,
        tempo: 'fast',
        target_muscles: ['Full Body'],
        notes: 'High intensity finisher'
      });
    }
  }
  
  return exercises;
}

// Calculate estimated session time
function calculateSessionTime(exercises: WorkoutExercise[], includeWarmupCooldown: boolean): number {
  const warmupTime = includeWarmupCooldown ? 6 : 0;
  const cooldownTime = includeWarmupCooldown ? 5 : 0;
  
  let exerciseTime = 0;
  exercises.forEach(ex => {
    const repsCount = Array.isArray(ex.reps_per_set) 
      ? ex.reps_per_set.reduce((a, b) => a + b, 0)
      : ex.sets * (ex.reps_per_set.hold_sec / 3);
    
    const timePerRep = 3; // seconds per rep
    const repTime = repsCount * timePerRep;
    const restTime = (ex.sets - 1) * ex.rest_sec;
    exerciseTime += (repTime + restTime) / 60;
  });
  
  return Math.round(warmupTime + exerciseTime + cooldownTime);
}

// Get day themes based on split
function getDayThemes(
  split: ProgramSettings['split_preference'], 
  totalDays: number,
  daysPerWeek: number
): DayPlan['theme'][] {
  const themes: DayPlan['theme'][] = [];
  let dayIndex = 0;
  
  for (let i = 0; i < totalDays; i++) {
    const dayOfWeek = i % 7;
    const isTrainingDay = dayOfWeek < daysPerWeek;
    
    if (!isTrainingDay) {
      themes.push('rest');
    } else {
      switch (split) {
        case 'full_body':
          themes.push('full_body');
          break;
        case 'upper_lower':
          themes.push(dayIndex % 2 === 0 ? 'upper' : 'lower');
          dayIndex++;
          break;
        case 'push_pull_legs':
          const pplThemes: DayPlan['theme'][] = ['push', 'pull', 'lower'];
          themes.push(pplThemes[dayIndex % 3]);
          dayIndex++;
          break;
        case 'skills_focus':
          themes.push(dayIndex % 2 === 0 ? 'skills' : 'full_body');
          dayIndex++;
          break;
      }
    }
  }
  
  return themes;
}

// Main plan generation function
export function generateWorkoutPlan(
  profile: UserProfile,
  baseline: BaselineTests,
  settings: ProgramSettings
): WorkoutPlan {
  const bmi = calculateBMI(profile.weight_kg, profile.height_cm);
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.available_days_per_week);
  
  const split = determineSplit(profile);
  const safeExercises = getSafeExercises(
    profile.injuries_flags.filter(i => i !== 'none'), 
    [...profile.equipment, 'none'] as any
  );
  
  const dayThemes = getDayThemes(split, settings.duration_days, profile.available_days_per_week);
  
  const startDate = new Date(settings.start_date);
  const days: DayPlan[] = [];
  
  let totalVolume = 0;
  let trainingDays = 0;
  let totalTime = 0;
  
  for (let i = 0; i < settings.duration_days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const theme = dayThemes[i];
    const isRest = theme === 'rest';
    
    const exercises = isRest ? [] : selectExercisesForTheme(theme, safeExercises, profile, baseline);
    const warmup = isRest || !settings.include_warmup_cooldown ? [] : generateWarmup();
    const cooldown = isRest || !settings.include_warmup_cooldown ? [] : generateCooldown();
    const estTime = isRest ? 0 : calculateSessionTime(exercises, settings.include_warmup_cooldown);
    
    // Calculate day volume
    let dayVolume = 0;
    exercises.forEach(ex => {
      if (Array.isArray(ex.reps_per_set)) {
        dayVolume += ex.sets * ex.reps_per_set.reduce((a, b) => a + b, 0) / ex.reps_per_set.length;
      } else {
        dayVolume += ex.sets * (ex.reps_per_set.hold_sec / 3);
      }
    });
    
    if (!isRest) {
      trainingDays++;
      totalTime += estTime;
    }
    totalVolume += dayVolume;
    
    days.push({
      date: currentDate.toISOString().split('T')[0],
      day_number: i + 1,
      theme,
      warmup,
      exercises,
      cooldown,
      est_time_min: estTime,
      progression_notes: getProgressionNote(settings.progression_model, i),
      compliance_fields: {
        completed_sets: [],
        rpe: 0,
        pain_flags: ['none']
      }
    });
  }
  
  return {
    user_profile: profile,
    baseline_tests: baseline,
    program_settings: settings,
    bmi,
    tdee,
    days,
    exercise_library: safeExercises,
    summary: {
      total_days: settings.duration_days,
      training_days: trainingDays,
      rest_days: settings.duration_days - trainingDays,
      total_volume: Math.round(totalVolume),
      avg_session_time: trainingDays > 0 ? Math.round(totalTime / trainingDays) : 0
    }
  };
}

function getProgressionNote(model: ProgramSettings['progression_model'], dayIndex: number): string {
  switch (model) {
    case 'linear':
      return 'Add +1 rep per set when all sets completed successfully';
    case 'double_progression':
      return 'Hit top of rep range → increase difficulty next session';
    case 'amrap_based':
      return dayIndex % 7 === 6 ? 'AMRAP test day - update baselines' : 'Train at 60% of AMRAP';
    case 'wave':
      const wave = dayIndex % 3;
      return wave === 0 ? 'Moderate day' : wave === 1 ? 'Heavy day' : 'Light/technique day';
    default:
      return '';
  }
}

// Calculate volume data for charts
export function getVolumeChartData(plan: WorkoutPlan): { date: string; volume: number }[] {
  return plan.days.map(day => {
    let volume = 0;
    day.exercises.forEach(ex => {
      if (Array.isArray(ex.reps_per_set)) {
        volume += ex.sets * ex.reps_per_set.reduce((a, b) => a + b, 0) / ex.reps_per_set.length;
      } else {
        volume += ex.sets * (ex.reps_per_set.hold_sec / 3);
      }
    });
    return { date: day.date, volume: Math.round(volume) };
  });
}

// Get muscle distribution
export function getMuscleDistribution(plan: WorkoutPlan): { muscle: string; value: number; color: string }[] {
  const muscleCount: Record<string, number> = {};
  const colors: Record<string, string> = {
    'Chest': '#f97316',
    'Triceps': '#f59e0b',
    'Shoulders': '#eab308',
    'Lats': '#3b82f6',
    'Biceps': '#6366f1',
    'Upper Back': '#8b5cf6',
    'Quadriceps': '#22c55e',
    'Glutes': '#10b981',
    'Hamstrings': '#14b8a6',
    'Core': '#a855f7',
    'Full Body': '#ef4444'
  };
  
  plan.days.forEach(day => {
    day.exercises.forEach(ex => {
      ex.target_muscles.forEach(muscle => {
        muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
      });
    });
  });
  
  return Object.entries(muscleCount).map(([muscle, value]) => ({
    muscle,
    value,
    color: colors[muscle] || '#6b7280'
  })).sort((a, b) => b.value - a.value);
}
