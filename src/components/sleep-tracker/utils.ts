import { SleepEntry, SleepTag, STORAGE_KEY, GOAL_STORAGE_KEY, LAST_EXPORT_KEY } from './types';

export const generateId = (): string => {
  return `sleep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateDuration = (bedtime: string, wakeTime: string): number => {
  const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
  const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
  
  let bedTotalMinutes = bedHours * 60 + bedMinutes;
  let wakeTotalMinutes = wakeHours * 60 + wakeMinutes;
  
  // Handle cross-midnight sleep (e.g., 11:30 PM to 6:30 AM)
  if (wakeTotalMinutes < bedTotalMinutes) {
    wakeTotalMinutes += 24 * 60;
  }
  
  return wakeTotalMinutes - bedTotalMinutes;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const loadEntries = (): SleepEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const entries = JSON.parse(stored);
      return entries.sort((a: SleepEntry, b: SleepEntry) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch (error) {
    console.error('Error loading sleep entries:', error);
  }
  return [];
};

export const saveEntries = (entries: SleepEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving sleep entries:', error);
  }
};

// Goal functions
export const loadGoal = (): number => {
  try {
    const stored = localStorage.getItem(GOAL_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 450; // Default 7h 30m
  } catch {
    return 450;
  }
};

export const saveGoal = (minutes: number): void => {
  localStorage.setItem(GOAL_STORAGE_KEY, minutes.toString());
};

// Last export timestamp
export const getLastExportTime = (): string | null => {
  return localStorage.getItem(LAST_EXPORT_KEY);
};

export const setLastExportTime = (): void => {
  localStorage.setItem(LAST_EXPORT_KEY, new Date().toISOString());
};

export const exportToJSON = (entries: SleepEntry[]): void => {
  const dataStr = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const date = new Date().toISOString().split('T')[0];
  const filename = `healthyplates-sleep-data-${date}.json`;
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  setLastExportTime();
};

export const validateImportData = (data: unknown): SleepEntry[] | null => {
  if (!Array.isArray(data)) return null;
  
  const validEntries: SleepEntry[] = [];
  
  for (const item of data) {
    if (
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.date === 'string' &&
      typeof item.bedtime === 'string' &&
      typeof item.wakeTime === 'string' &&
      typeof item.duration === 'number' &&
      ['poor', 'average', 'good', 'excellent'].includes(item.quality)
    ) {
      validEntries.push({
        id: item.id,
        date: item.date,
        bedtime: item.bedtime,
        wakeTime: item.wakeTime,
        duration: item.duration,
        quality: item.quality,
        notes: item.notes || '',
        tags: Array.isArray(item.tags) ? item.tags : [],
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
      });
    }
  }
  
  return validEntries.length > 0 ? validEntries : null;
};

export const getAverageStats = (entries: SleepEntry[]): { avgDuration: number; totalDays: number; last7DaysAvg: number } => {
  if (entries.length === 0) {
    return { avgDuration: 0, totalDays: 0, last7DaysAvg: 0 };
  }
  
  const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0);
  const avgDuration = totalDuration / entries.length;
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const last7Days = entries.filter(entry => new Date(entry.date) >= sevenDaysAgo);
  const last7DaysAvg = last7Days.length > 0 
    ? last7Days.reduce((sum, entry) => sum + entry.duration, 0) / last7Days.length 
    : 0;
  
  return { avgDuration, totalDays: entries.length, last7DaysAvg };
};

// Streak calculations
export const calculateStreaks = (entries: SleepEntry[]): { currentStreak: number; bestStreak: number } => {
  if (entries.length === 0) return { currentStreak: 0, bestStreak: 0 };
  
  const sortedDates = [...new Set(entries.map(e => e.date))].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  if (sortedDates.length === 0) return { currentStreak: 0, bestStreak: 0 };
  
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 1;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const latestDate = new Date(sortedDates[0]);
  latestDate.setHours(0, 0, 0, 0);
  
  // Check if current streak is active (entry today or yesterday)
  const isStreakActive = latestDate.getTime() === today.getTime() || 
                         latestDate.getTime() === yesterday.getTime();
  
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(sortedDates[i + 1]);
    const diffDays = Math.round((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      if (i === 0 || tempStreak > 1) {
        bestStreak = Math.max(bestStreak, tempStreak);
      }
      tempStreak = 1;
    }
  }
  
  bestStreak = Math.max(bestStreak, tempStreak);
  currentStreak = isStreakActive ? tempStreak : 0;
  
  // If only one entry and it's today/yesterday, streak is 1
  if (sortedDates.length === 1 && isStreakActive) {
    currentStreak = 1;
  }
  
  return { currentStreak, bestStreak };
};

// Goal progress calculations
export const getGoalProgress = (entries: SleepEntry[], goalMinutes: number, days: number = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentEntries = entries.filter(e => new Date(e.date) >= cutoffDate);
  const metGoal = recentEntries.filter(e => e.duration >= goalMinutes);
  
  return {
    totalDays: recentEntries.length,
    daysMetGoal: metGoal.length,
    percentage: recentEntries.length > 0 ? (metGoal.length / recentEntries.length) * 100 : 0,
  };
};

// Tag analysis
export const getTagAnalysis = (entries: SleepEntry[]): { tag: SleepTag; avgDuration: number; count: number }[] => {
  const tagData: Record<SleepTag, { total: number; count: number }> = {
    caffeine: { total: 0, count: 0 },
    screen_time: { total: 0, count: 0 },
    exercise: { total: 0, count: 0 },
    stress: { total: 0, count: 0 },
    alcohol: { total: 0, count: 0 },
    late_meal: { total: 0, count: 0 },
  };
  
  entries.forEach(entry => {
    entry.tags?.forEach(tag => {
      tagData[tag].total += entry.duration;
      tagData[tag].count++;
    });
  });
  
  return Object.entries(tagData)
    .filter(([, data]) => data.count > 0)
    .map(([tag, data]) => ({
      tag: tag as SleepTag,
      avgDuration: Math.round(data.total / data.count),
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);
};

// Get last entry's times for quick fill
export const getLastEntryTimes = (entries: SleepEntry[]): { bedtime: string; wakeTime: string } | null => {
  if (entries.length === 0) return null;
  const last = entries[0];
  return { bedtime: last.bedtime, wakeTime: last.wakeTime };
};
