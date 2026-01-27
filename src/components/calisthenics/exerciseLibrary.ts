import { Exercise, Equipment, InjuryFlag } from './types';

export const exerciseLibrary: Exercise[] = [
  // PUSH EXERCISES
  {
    id: 'kneeling_pushup',
    name: 'Kneeling Push-up',
    category: 'push',
    difficulty: 'beginner',
    primary_muscles: ['Chest', 'Triceps', 'Shoulders'],
    progressions: { easier: null, harder: 'standard_pushup' },
    contraindications: ['wrist', 'shoulder'],
    requires_equipment: ['none']
  },
  {
    id: 'incline_pushup',
    name: 'Incline Push-up',
    category: 'push',
    difficulty: 'beginner',
    primary_muscles: ['Chest', 'Triceps', 'Shoulders'],
    progressions: { easier: 'kneeling_pushup', harder: 'standard_pushup' },
    contraindications: ['wrist'],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'standard_pushup',
    name: 'Push-up',
    category: 'push',
    difficulty: 'beginner',
    primary_muscles: ['Chest', 'Triceps', 'Shoulders'],
    progressions: { easier: 'incline_pushup', harder: 'diamond_pushup' },
    contraindications: ['wrist', 'shoulder'],
    requires_equipment: ['none']
  },
  {
    id: 'diamond_pushup',
    name: 'Diamond Push-up',
    category: 'push',
    difficulty: 'intermediate',
    primary_muscles: ['Triceps', 'Chest', 'Shoulders'],
    progressions: { easier: 'standard_pushup', harder: 'decline_pushup' },
    contraindications: ['wrist', 'elbow'],
    requires_equipment: ['none']
  },
  {
    id: 'decline_pushup',
    name: 'Decline Push-up',
    category: 'push',
    difficulty: 'intermediate',
    primary_muscles: ['Upper Chest', 'Shoulders', 'Triceps'],
    progressions: { easier: 'standard_pushup', harder: 'pike_pushup' },
    contraindications: ['shoulder', 'wrist'],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'pike_pushup',
    name: 'Pike Push-up',
    category: 'push',
    difficulty: 'intermediate',
    primary_muscles: ['Shoulders', 'Triceps'],
    progressions: { easier: 'decline_pushup', harder: 'pseudo_planche_pushup' },
    contraindications: ['shoulder', 'wrist'],
    requires_equipment: ['none']
  },
  {
    id: 'pseudo_planche_pushup',
    name: 'Pseudo Planche Push-up',
    category: 'push',
    difficulty: 'advanced',
    primary_muscles: ['Chest', 'Shoulders', 'Core'],
    progressions: { easier: 'pike_pushup', harder: null },
    contraindications: ['wrist', 'shoulder', 'elbow'],
    requires_equipment: ['none']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'push',
    difficulty: 'intermediate',
    primary_muscles: ['Triceps', 'Chest', 'Shoulders'],
    progressions: { easier: 'bench_dips', harder: 'ring_dips' },
    contraindications: ['shoulder', 'elbow'],
    requires_equipment: ['dip_bars']
  },
  {
    id: 'bench_dips',
    name: 'Bench Dips',
    category: 'push',
    difficulty: 'beginner',
    primary_muscles: ['Triceps', 'Shoulders'],
    progressions: { easier: null, harder: 'dips' },
    contraindications: ['shoulder'],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'ring_dips',
    name: 'Ring Dips',
    category: 'push',
    difficulty: 'advanced',
    primary_muscles: ['Triceps', 'Chest', 'Shoulders', 'Core'],
    progressions: { easier: 'dips', harder: null },
    contraindications: ['shoulder', 'elbow'],
    requires_equipment: ['rings']
  },

  // PULL EXERCISES
  {
    id: 'assisted_pullup',
    name: 'Assisted Pull-up',
    category: 'pull',
    difficulty: 'beginner',
    primary_muscles: ['Lats', 'Biceps', 'Upper Back'],
    progressions: { easier: 'band_pulldown', harder: 'pullup' },
    contraindications: ['shoulder'],
    requires_equipment: ['pullup_bar', 'resistance_band']
  },
  {
    id: 'pullup',
    name: 'Pull-up',
    category: 'pull',
    difficulty: 'intermediate',
    primary_muscles: ['Lats', 'Biceps', 'Upper Back'],
    progressions: { easier: 'assisted_pullup', harder: 'weighted_pullup' },
    contraindications: ['shoulder', 'elbow'],
    requires_equipment: ['pullup_bar']
  },
  {
    id: 'chinup',
    name: 'Chin-up',
    category: 'pull',
    difficulty: 'intermediate',
    primary_muscles: ['Biceps', 'Lats', 'Upper Back'],
    progressions: { easier: 'assisted_pullup', harder: 'pullup' },
    contraindications: ['shoulder', 'elbow'],
    requires_equipment: ['pullup_bar']
  },
  {
    id: 'inverted_row',
    name: 'Inverted Row',
    category: 'pull',
    difficulty: 'beginner',
    primary_muscles: ['Upper Back', 'Biceps', 'Rear Delts'],
    progressions: { easier: null, harder: 'pullup' },
    contraindications: ['lower_back'],
    requires_equipment: ['none']
  },
  {
    id: 'band_pulldown',
    name: 'Band Lat Pulldown',
    category: 'pull',
    difficulty: 'beginner',
    primary_muscles: ['Lats', 'Biceps'],
    progressions: { easier: null, harder: 'assisted_pullup' },
    contraindications: [],
    requires_equipment: ['resistance_band']
  },
  {
    id: 'band_row',
    name: 'Band Row',
    category: 'pull',
    difficulty: 'beginner',
    primary_muscles: ['Upper Back', 'Biceps', 'Rear Delts'],
    progressions: { easier: null, harder: 'inverted_row' },
    contraindications: [],
    requires_equipment: ['resistance_band']
  },

  // LEG EXERCISES
  {
    id: 'air_squat',
    name: 'Air Squat',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    progressions: { easier: 'box_squat', harder: 'jump_squat' },
    contraindications: ['knee'],
    requires_equipment: ['none']
  },
  {
    id: 'box_squat',
    name: 'Box Squat',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Quadriceps', 'Glutes'],
    progressions: { easier: null, harder: 'air_squat' },
    contraindications: [],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'narrow_squat',
    name: 'Narrow Stance Squat',
    category: 'legs',
    difficulty: 'intermediate',
    primary_muscles: ['Quadriceps', 'Glutes'],
    progressions: { easier: 'air_squat', harder: 'pistol_squat' },
    contraindications: ['knee'],
    requires_equipment: ['none']
  },
  {
    id: 'wide_squat',
    name: 'Sumo Squat',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Inner Thighs', 'Glutes', 'Quadriceps'],
    progressions: { easier: 'air_squat', harder: 'jump_squat' },
    contraindications: ['knee'],
    requires_equipment: ['none']
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    progressions: { easier: 'reverse_lunges', harder: 'walking_lunges' },
    contraindications: ['knee', 'ankle'],
    requires_equipment: ['none']
  },
  {
    id: 'reverse_lunges',
    name: 'Reverse Lunges',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    progressions: { easier: null, harder: 'lunges' },
    contraindications: ['knee'],
    requires_equipment: ['none']
  },
  {
    id: 'split_squat',
    name: 'Split Squat',
    category: 'legs',
    difficulty: 'intermediate',
    primary_muscles: ['Quadriceps', 'Glutes'],
    progressions: { easier: 'lunges', harder: 'bulgarian_split_squat' },
    contraindications: ['knee', 'ankle'],
    requires_equipment: ['none']
  },
  {
    id: 'bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    difficulty: 'advanced',
    primary_muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    progressions: { easier: 'split_squat', harder: null },
    contraindications: ['knee', 'ankle'],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'step_ups',
    name: 'Step-ups',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Quadriceps', 'Glutes'],
    progressions: { easier: null, harder: 'jump_step_ups' },
    contraindications: ['knee'],
    requires_equipment: ['boxes_bench']
  },
  {
    id: 'calf_raises',
    name: 'Calf Raises',
    category: 'legs',
    difficulty: 'beginner',
    primary_muscles: ['Calves'],
    progressions: { easier: null, harder: 'single_leg_calf_raise' },
    contraindications: ['ankle'],
    requires_equipment: ['none']
  },
  {
    id: 'jump_squat',
    name: 'Jump Squat',
    category: 'legs',
    difficulty: 'intermediate',
    primary_muscles: ['Quadriceps', 'Glutes', 'Calves'],
    progressions: { easier: 'air_squat', harder: null },
    contraindications: ['knee', 'ankle', 'lower_back'],
    requires_equipment: ['none']
  },

  // CORE EXERCISES
  {
    id: 'front_plank',
    name: 'Front Plank',
    category: 'core',
    difficulty: 'beginner',
    primary_muscles: ['Core', 'Shoulders'],
    progressions: { easier: 'kneeling_plank', harder: 'plank_shoulder_tap' },
    contraindications: ['wrist', 'lower_back'],
    requires_equipment: ['none']
  },
  {
    id: 'side_plank',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    primary_muscles: ['Obliques', 'Core'],
    progressions: { easier: 'kneeling_side_plank', harder: 'side_plank_raise' },
    contraindications: ['wrist', 'shoulder'],
    requires_equipment: ['none']
  },
  {
    id: 'hollow_hold',
    name: 'Hollow Body Hold',
    category: 'core',
    difficulty: 'intermediate',
    primary_muscles: ['Core', 'Hip Flexors'],
    progressions: { easier: 'dead_bug', harder: 'hollow_rock' },
    contraindications: ['lower_back'],
    requires_equipment: ['none']
  },
  {
    id: 'dead_bug',
    name: 'Dead Bug',
    category: 'core',
    difficulty: 'beginner',
    primary_muscles: ['Core', 'Hip Flexors'],
    progressions: { easier: null, harder: 'hollow_hold' },
    contraindications: [],
    requires_equipment: ['none']
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'beginner',
    primary_muscles: ['Core', 'Hip Flexors', 'Shoulders'],
    progressions: { easier: null, harder: 'burpees' },
    contraindications: ['wrist', 'knee'],
    requires_equipment: ['none']
  },
  {
    id: 'lying_leg_raises',
    name: 'Lying Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    primary_muscles: ['Lower Abs', 'Hip Flexors'],
    progressions: { easier: 'dead_bug', harder: 'hanging_leg_raises' },
    contraindications: ['lower_back'],
    requires_equipment: ['none']
  },
  {
    id: 'hanging_leg_raises',
    name: 'Hanging Leg Raises',
    category: 'core',
    difficulty: 'advanced',
    primary_muscles: ['Lower Abs', 'Hip Flexors', 'Grip'],
    progressions: { easier: 'lying_leg_raises', harder: null },
    contraindications: ['shoulder', 'lower_back'],
    requires_equipment: ['pullup_bar']
  },
  {
    id: 'bicycle_crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    difficulty: 'beginner',
    primary_muscles: ['Obliques', 'Core'],
    progressions: { easier: null, harder: 'russian_twist' },
    contraindications: ['lower_back'],
    requires_equipment: ['none']
  },

  // METCON / FULL BODY
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'metcon',
    difficulty: 'intermediate',
    primary_muscles: ['Full Body'],
    progressions: { easier: 'squat_thrusts', harder: null },
    contraindications: ['wrist', 'knee', 'shoulder'],
    requires_equipment: ['none']
  },
  {
    id: 'squat_thrusts',
    name: 'Squat Thrusts',
    category: 'metcon',
    difficulty: 'beginner',
    primary_muscles: ['Full Body'],
    progressions: { easier: null, harder: 'burpees' },
    contraindications: ['wrist', 'knee'],
    requires_equipment: ['none']
  },
  {
    id: 'bear_crawl',
    name: 'Bear Crawl',
    category: 'metcon',
    difficulty: 'intermediate',
    primary_muscles: ['Core', 'Shoulders', 'Quadriceps'],
    progressions: { easier: null, harder: null },
    contraindications: ['wrist'],
    requires_equipment: ['none']
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    category: 'metcon',
    difficulty: 'beginner',
    primary_muscles: ['Full Body', 'Cardio'],
    progressions: { easier: null, harder: 'burpees' },
    contraindications: ['ankle', 'knee'],
    requires_equipment: ['none']
  },
  {
    id: 'high_knees',
    name: 'High Knees',
    category: 'metcon',
    difficulty: 'beginner',
    primary_muscles: ['Hip Flexors', 'Core', 'Cardio'],
    progressions: { easier: null, harder: null },
    contraindications: ['knee'],
    requires_equipment: ['none']
  }
];

export function getExerciseById(id: string): Exercise | undefined {
  return exerciseLibrary.find(ex => ex.id === id);
}

export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return exerciseLibrary.filter(ex => ex.category === category);
}

export function getExercisesForEquipment(equipment: Equipment[]): Exercise[] {
  return exerciseLibrary.filter(ex => 
    ex.requires_equipment.some(eq => equipment.includes(eq) || eq === 'none')
  );
}

export function getSafeExercises(injuries: InjuryFlag[], equipment: Equipment[]): Exercise[] {
  return exerciseLibrary.filter(ex => {
    const noContraindication = !ex.contraindications.some(ci => injuries.includes(ci));
    const hasEquipment = ex.requires_equipment.some(eq => equipment.includes(eq) || eq === 'none');
    return noContraindication && hasEquipment;
  });
}
