// Calisthenics Workout Challenge Types

export interface UserProfile {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  height_cm: number;
  weight_kg: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  goal: 'strength' | 'endurance' | 'fat_loss' | 'hypertrophy' | 'skills' | 'general_fitness';
  available_days_per_week: number;
  session_duration_min: number;
  equipment: Equipment[];
  injuries_flags: InjuryFlag[];
}

export type Equipment = 'none' | 'pullup_bar' | 'dip_bars' | 'rings' | 'resistance_band' | 'boxes_bench';
export type InjuryFlag = 'shoulder' | 'wrist' | 'elbow' | 'lower_back' | 'knee' | 'ankle' | 'none';

export interface BaselineTests {
  max_pushups: number;
  max_bodyweight_squat: number;
  max_plank_sec: number;
  max_pullups: number;
  rpe_preference: number;
}

export interface ProgramSettings {
  duration_days: 7 | 14 | 30;
  split_preference: 'full_body' | 'upper_lower' | 'push_pull_legs' | 'skills_focus';
  start_date: string;
  units: 'metric' | 'imperial';
  include_warmup_cooldown: boolean;
  progression_model: 'linear' | 'double_progression' | 'amrap_based' | 'wave';
  deload_rule: 'every_4th_week' | 'auto_based_on_fatigue';
  auto_substitute_if_no_equipment: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'metcon';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  primary_muscles: string[];
  progressions: {
    easier: string | null;
    harder: string | null;
  };
  contraindications: InjuryFlag[];
  requires_equipment: Equipment[];
}

export interface WorkoutExercise {
  name: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'metcon';
  variation: string;
  sets: number;
  reps_per_set: number[] | { hold_sec: number };
  rest_sec: number;
  tempo: string;
  target_muscles: string[];
  notes: string;
}

export interface WarmupCooldownItem {
  name: string;
  duration_sec: number;
}

export interface DayPlan {
  date: string;
  day_number: number;
  theme: 'full_body' | 'upper' | 'lower' | 'push' | 'pull' | 'skills' | 'rest';
  warmup: WarmupCooldownItem[];
  exercises: WorkoutExercise[];
  cooldown: WarmupCooldownItem[];
  est_time_min: number;
  progression_notes: string;
  compliance_fields: {
    completed_sets: number[];
    rpe: number;
    pain_flags: InjuryFlag[];
  };
}

export interface WorkoutPlan {
  user_profile: UserProfile;
  baseline_tests: BaselineTests;
  program_settings: ProgramSettings;
  bmi: number;
  tdee: number;
  days: DayPlan[];
  exercise_library: Exercise[];
  summary: {
    total_days: number;
    training_days: number;
    rest_days: number;
    total_volume: number;
    avg_session_time: number;
  };
}

export interface ChartData {
  date: string;
  volume: number;
  rpe?: number;
}

export interface MuscleDistribution {
  muscle: string;
  value: number;
  color: string;
}
