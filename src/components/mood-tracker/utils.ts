import { MoodEntry, STORAGE_KEY, LAST_EXPORT_KEY, MOOD_OPTIONS } from './types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const loadEntries = (): MoodEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load mood entries:', error);
  }
  return [];
};

export const saveEntries = (entries: MoodEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save mood entries:', error);
  }
};

export const getMoodEmoji = (mood: number): string => {
  const option = MOOD_OPTIONS.find((o) => o.value === mood);
  return option?.emoji || '😐';
};

export const getMoodLabel = (mood: number): string => {
  const option = MOOD_OPTIONS.find((o) => o.value === mood);
  return option?.label || 'Neutral';
};

export const calculateAverageMood = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
  return sum / entries.length;
};

export const calculateAverageMoodLast7Days = (entries: MoodEntry[]): number => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentEntries = entries.filter(
    (entry) => new Date(entry.date) >= sevenDaysAgo
  );
  
  return calculateAverageMood(recentEntries);
};

export const calculateStreaks = (entries: MoodEntry[]): { current: number; best: number } => {
  if (entries.length === 0) return { current: 0, best: 0 };

  const sortedDates = [...new Set(entries.map((e) => e.date))]
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (sortedDates.length === 0) return { current: 0, best: 0 };

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const mostRecentDate = new Date(sortedDates[0]);
  mostRecentDate.setHours(0, 0, 0, 0);

  // Check if streak is current (today or yesterday)
  const isCurrentStreak =
    mostRecentDate.getTime() === today.getTime() ||
    mostRecentDate.getTime() === yesterday.getTime();

  // Calculate streaks
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i - 1]);
    const previousDate = new Date(sortedDates[i]);
    
    const diffDays = Math.round(
      (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      tempStreak++;
    } else {
      bestStreak = Math.max(bestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  bestStreak = Math.max(bestStreak, tempStreak);

  // Current streak calculation
  if (isCurrentStreak) {
    tempStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i - 1]);
      const previousDate = new Date(sortedDates[i]);
      
      const diffDays = Math.round(
        (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        tempStreak++;
      } else {
        break;
      }
    }
    currentStreak = tempStreak;
  }

  return { current: currentStreak, best: bestStreak };
};

export const getRecentMoodTrend = (entries: MoodEntry[], days: number = 7): { date: string; mood: number }[] => {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  return sortedEntries.slice(-days).map((entry) => ({
    date: entry.date,
    mood: entry.mood,
  }));
};

export const getTagAnalysis = (entries: MoodEntry[]): { tag: string; avgMood: number; count: number }[] => {
  const tagStats: Record<string, { total: number; count: number }> = {};
  
  entries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      if (!tagStats[tag]) {
        tagStats[tag] = { total: 0, count: 0 };
      }
      tagStats[tag].total += entry.mood;
      tagStats[tag].count++;
    });
  });
  
  return Object.entries(tagStats)
    .map(([tag, stats]) => ({
      tag,
      avgMood: stats.total / stats.count,
      count: stats.count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const exportToJSON = (entries: MoodEntry[]): void => {
  const dataStr = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const today = new Date().toISOString().split('T')[0];
  const filename = `healthplates-mood-data-${today}.json`;
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateImportData = (data: unknown): MoodEntry[] | null => {
  if (!Array.isArray(data)) return null;
  
  const validEntries: MoodEntry[] = [];
  
  for (const item of data) {
    if (
      typeof item === 'object' &&
      item !== null &&
      typeof item.date === 'string' &&
      typeof item.mood === 'number' &&
      item.mood >= 1 &&
      item.mood <= 5
    ) {
      validEntries.push({
        id: item.id || generateId(),
        date: item.date,
        mood: item.mood,
        tags: Array.isArray(item.tags) ? item.tags : [],
        notes: typeof item.notes === 'string' ? item.notes : '',
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
      });
    }
  }
  
  return validEntries.length > 0 ? validEntries : null;
};

export const getLastExportTime = (): string | null => {
  return localStorage.getItem(LAST_EXPORT_KEY);
};

export const setLastExportTime = (): void => {
  localStorage.setItem(LAST_EXPORT_KEY, new Date().toISOString());
};

export const findExistingEntryByDate = (entries: MoodEntry[], date: string): MoodEntry | undefined => {
  return entries.find((entry) => entry.date === date);
};
