export interface SleepEntry {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number; // in minutes
  quality: 'poor' | 'average' | 'good' | 'excellent';
  notes: string;
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

export const STORAGE_KEY = 'healthyplates_sleep_tracker_entries';
