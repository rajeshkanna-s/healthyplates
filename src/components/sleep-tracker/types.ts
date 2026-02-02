export type SleepTag = 'caffeine' | 'screen_time' | 'exercise' | 'stress' | 'alcohol' | 'late_meal';

export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number; // in minutes
  quality: 'poor' | 'average' | 'good' | 'excellent';
  notes: string;
  tags?: SleepTag[];
  createdAt: string;
  updatedAt: string;
}

export type SleepQuality = SleepEntry['quality'];

export const QUALITY_OPTIONS: { value: SleepQuality; label: string; emoji: string }[] = [
  { value: 'poor', label: 'Poor', emoji: '😴' },
  { value: 'average', label: 'Average', emoji: '😐' },
  { value: 'good', label: 'Good', emoji: '🙂' },
  { value: 'excellent', label: 'Excellent', emoji: '😊' },
];

export const TAG_OPTIONS: { value: SleepTag; label: string; emoji: string }[] = [
  { value: 'caffeine', label: 'Caffeine Late', emoji: '☕' },
  { value: 'screen_time', label: 'Screen Time', emoji: '📱' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'stress', label: 'Stressful Day', emoji: '😰' },
  { value: 'alcohol', label: 'Alcohol', emoji: '🍷' },
  { value: 'late_meal', label: 'Late Meal', emoji: '🍽️' },
];

export const STORAGE_KEY = 'healthyplates_sleep_tracker_entries';
export const GOAL_STORAGE_KEY = 'healthyplates_sleep_goal_minutes';
export const LAST_EXPORT_KEY = 'healthyplates_sleep_last_export';

export type DateFilter = 'all' | '7days' | '30days' | 'custom';
export type SortOption = 'date_desc' | 'date_asc' | 'duration_desc' | 'duration_asc';
