export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodTag = 
  // Work & Productivity
  | 'work' | 'meetings' | 'deadlines' | 'achievement' | 'creative' | 'focused' | 'productive'
  // Relationships
  | 'family' | 'friends' | 'partner' | 'social' | 'alone_time' | 'conflict' | 'support'
  // Health & Body
  | 'health' | 'sleep' | 'exercise' | 'food' | 'hydration' | 'medication' | 'pain' | 'energy' | 'tired'
  // Mental & Emotional
  | 'stress' | 'anxiety' | 'calm' | 'grateful' | 'hopeful' | 'overwhelmed' | 'motivated' | 'bored'
  // Lifestyle
  | 'travel' | 'nature' | 'music' | 'reading' | 'gaming' | 'movies' | 'hobbies' | 'shopping'
  // Environment
  | 'weather' | 'home' | 'outdoors' | 'commute' | 'noise' | 'clean_space'
  // Life Events
  | 'celebration' | 'loss' | 'change' | 'news' | 'surprise' | 'routine'
  // Self-Care
  | 'meditation' | 'journaling' | 'therapy' | 'self_care' | 'spa' | 'rest'
  // Substances
  | 'caffeine' | 'alcohol' | 'sugar'
  // Other
  | 'pets' | 'learning' | 'volunteering' | 'spirituality' | 'finances' | 'chores';

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

export interface TagCategory {
  name: string;
  tags: { value: MoodTag; label: string; emoji: string }[];
}

export const TAG_CATEGORIES: TagCategory[] = [
  {
    name: 'Work & Productivity',
    tags: [
      { value: 'work', label: 'Work', emoji: '💼' },
      { value: 'meetings', label: 'Meetings', emoji: '🤝' },
      { value: 'deadlines', label: 'Deadlines', emoji: '⏰' },
      { value: 'achievement', label: 'Achievement', emoji: '🏆' },
      { value: 'creative', label: 'Creative', emoji: '🎨' },
      { value: 'focused', label: 'Focused', emoji: '🎯' },
      { value: 'productive', label: 'Productive', emoji: '✅' },
    ],
  },
  {
    name: 'Relationships',
    tags: [
      { value: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
      { value: 'friends', label: 'Friends', emoji: '👥' },
      { value: 'partner', label: 'Partner', emoji: '💕' },
      { value: 'social', label: 'Social', emoji: '🎉' },
      { value: 'alone_time', label: 'Alone Time', emoji: '🧘' },
      { value: 'conflict', label: 'Conflict', emoji: '😤' },
      { value: 'support', label: 'Support', emoji: '🤗' },
    ],
  },
  {
    name: 'Health & Body',
    tags: [
      { value: 'health', label: 'Health', emoji: '🏥' },
      { value: 'sleep', label: 'Sleep', emoji: '😴' },
      { value: 'exercise', label: 'Exercise', emoji: '🏃' },
      { value: 'food', label: 'Food', emoji: '🍽️' },
      { value: 'hydration', label: 'Hydration', emoji: '💧' },
      { value: 'medication', label: 'Medication', emoji: '💊' },
      { value: 'pain', label: 'Pain', emoji: '🤕' },
      { value: 'energy', label: 'Energy', emoji: '⚡' },
      { value: 'tired', label: 'Tired', emoji: '😩' },
    ],
  },
  {
    name: 'Mental & Emotional',
    tags: [
      { value: 'stress', label: 'Stress', emoji: '😰' },
      { value: 'anxiety', label: 'Anxiety', emoji: '😟' },
      { value: 'calm', label: 'Calm', emoji: '😌' },
      { value: 'grateful', label: 'Grateful', emoji: '🙏' },
      { value: 'hopeful', label: 'Hopeful', emoji: '🌈' },
      { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😵' },
      { value: 'motivated', label: 'Motivated', emoji: '🔥' },
      { value: 'bored', label: 'Bored', emoji: '😑' },
    ],
  },
  {
    name: 'Lifestyle',
    tags: [
      { value: 'travel', label: 'Travel', emoji: '✈️' },
      { value: 'nature', label: 'Nature', emoji: '🌳' },
      { value: 'music', label: 'Music', emoji: '🎵' },
      { value: 'reading', label: 'Reading', emoji: '📚' },
      { value: 'gaming', label: 'Gaming', emoji: '🎮' },
      { value: 'movies', label: 'Movies', emoji: '🎬' },
      { value: 'hobbies', label: 'Hobbies', emoji: '🧩' },
      { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
    ],
  },
  {
    name: 'Environment',
    tags: [
      { value: 'weather', label: 'Weather', emoji: '🌤️' },
      { value: 'home', label: 'Home', emoji: '🏠' },
      { value: 'outdoors', label: 'Outdoors', emoji: '🏞️' },
      { value: 'commute', label: 'Commute', emoji: '🚗' },
      { value: 'noise', label: 'Noise', emoji: '🔊' },
      { value: 'clean_space', label: 'Clean Space', emoji: '✨' },
    ],
  },
  {
    name: 'Life Events',
    tags: [
      { value: 'celebration', label: 'Celebration', emoji: '🎊' },
      { value: 'loss', label: 'Loss', emoji: '💔' },
      { value: 'change', label: 'Change', emoji: '🔄' },
      { value: 'news', label: 'News', emoji: '📰' },
      { value: 'surprise', label: 'Surprise', emoji: '😲' },
      { value: 'routine', label: 'Routine', emoji: '📅' },
    ],
  },
  {
    name: 'Self-Care',
    tags: [
      { value: 'meditation', label: 'Meditation', emoji: '🧘‍♀️' },
      { value: 'journaling', label: 'Journaling', emoji: '📝' },
      { value: 'therapy', label: 'Therapy', emoji: '💬' },
      { value: 'self_care', label: 'Self Care', emoji: '💆' },
      { value: 'spa', label: 'Spa', emoji: '🛁' },
      { value: 'rest', label: 'Rest', emoji: '🛋️' },
    ],
  },
  {
    name: 'Substances',
    tags: [
      { value: 'caffeine', label: 'Caffeine', emoji: '☕' },
      { value: 'alcohol', label: 'Alcohol', emoji: '🍷' },
      { value: 'sugar', label: 'Sugar', emoji: '🍬' },
    ],
  },
  {
    name: 'Other',
    tags: [
      { value: 'pets', label: 'Pets', emoji: '🐾' },
      { value: 'learning', label: 'Learning', emoji: '📖' },
      { value: 'volunteering', label: 'Volunteering', emoji: '🤲' },
      { value: 'spirituality', label: 'Spirituality', emoji: '🕊️' },
      { value: 'finances', label: 'Finances', emoji: '💰' },
      { value: 'chores', label: 'Chores', emoji: '🧹' },
    ],
  },
];

// Flat array for backward compatibility
export const TAG_OPTIONS = TAG_CATEGORIES.flatMap((cat) => cat.tags);

export const STORAGE_KEY = 'healthyplates_mood_tracker_entries';
export const LAST_EXPORT_KEY = 'healthyplates_mood_last_export';

export type DateFilter = 'all' | '7days' | '30days' | 'custom';
export type MoodFilter = 'all' | 'low' | 'neutral' | 'high';
export type SortOption = 'date_desc' | 'date_asc' | 'mood_desc' | 'mood_asc';
