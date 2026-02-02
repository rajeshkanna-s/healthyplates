import { SleepEntry, STORAGE_KEY } from './types';

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
    wakeTotalMinutes += 24 * 60; // Add 24 hours in minutes
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

export const loadEntries = (): SleepEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const entries = JSON.parse(stored);
      // Sort by date, newest first
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
  
  // Last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const last7Days = entries.filter(entry => new Date(entry.date) >= sevenDaysAgo);
  const last7DaysAvg = last7Days.length > 0 
    ? last7Days.reduce((sum, entry) => sum + entry.duration, 0) / last7Days.length 
    : 0;
  
  return {
    avgDuration,
    totalDays: entries.length,
    last7DaysAvg,
  };
};
