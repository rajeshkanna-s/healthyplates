export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodTag = 'work' | 'family' | 'health' | 'sleep' | 'stress' | 'friends' | 'exercise' | 'food';

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodLevel;
  tags: MoodTag[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const MOOD_OPTIONS: { value: MoodLevel; label: string; emoji: string }[] = [
  { value: 1, label: 'Very Low', emoji: '😢' },
  { value: 2, label: 'Low', emoji: '😕' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Great', emoji: '😄' },
];

export const TAG_OPTIONS: { value: MoodTag; label: string; emoji: string }[] = [
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { value: 'health', label: 'Health', emoji: '🏥' },
  { value: 'sleep', label: 'Sleep', emoji: '😴' },
  { value: 'stress', label: 'Stress', emoji: '😰' },
  { value: 'friends', label: 'Friends', emoji: '👥' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'food', label: 'Food', emoji: '🍽️' },
];

export const STORAGE_KEY = 'healthyplates_mood_tracker_entries';
export const LAST_EXPORT_KEY = 'healthyplates_mood_last_export';

export type DateFilter = 'all' | '7days' | '30days' | 'custom';
export type MoodFilter = 'all' | 'low' | 'neutral' | 'high';
export type SortOption = 'date_desc' | 'date_asc' | 'mood_desc' | 'mood_asc';
