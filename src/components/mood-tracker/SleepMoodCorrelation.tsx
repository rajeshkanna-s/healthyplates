import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, TrendingUp, TrendingDown, BarChart3, Lightbulb } from 'lucide-react';
import { MoodEntry } from './types';
import { SleepEntry, STORAGE_KEY as SLEEP_STORAGE_KEY } from '@/components/sleep-tracker/types';
import { getMoodEmoji } from './utils';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface SleepMoodCorrelationProps {
  moodEntries: MoodEntry[];
}

interface CorrelatedData {
  date: string;
  sleepHours: number;
  mood: number;
}

interface SleepMoodStats {
  correlatedDays: number;
  avgMoodLowSleep: number | null;
  avgMoodMidSleep: number | null;
  avgMoodHighSleep: number | null;
  countLowSleep: number;
  countMidSleep: number;
  countHighSleep: number;
  overallCorrelation: 'positive' | 'negative' | 'neutral';
  insight: string;
}

const loadSleepEntries = (): SleepEntry[] => {
  try {
    const data = localStorage.getItem(SLEEP_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load sleep entries:', error);
  }
  return [];
};

const SleepMoodCorrelation: React.FC<SleepMoodCorrelationProps> = ({ moodEntries }) => {
  const sleepEntries = useMemo(() => loadSleepEntries(), []);

  const correlatedData = useMemo((): CorrelatedData[] => {
    const sleepByDate = new Map<string, SleepEntry>();
    sleepEntries.forEach((entry) => {
      sleepByDate.set(entry.date, entry);
    });

    const data: CorrelatedData[] = [];
    moodEntries.forEach((mood) => {
      const sleep = sleepByDate.get(mood.date);
      if (sleep) {
        data.push({
          date: mood.date,
          sleepHours: sleep.duration / 60,
          mood: mood.mood,
        });
      }
    });

    return data.sort((a, b) => a.sleepHours - b.sleepHours);
  }, [moodEntries, sleepEntries]);

  const stats = useMemo((): SleepMoodStats => {
    if (correlatedData.length === 0) {
      return {
        correlatedDays: 0,
        avgMoodLowSleep: null,
        avgMoodMidSleep: null,
        avgMoodHighSleep: null,
        countLowSleep: 0,
        countMidSleep: 0,
        countHighSleep: 0,
        overallCorrelation: 'neutral',
        insight: 'Track both sleep and mood on the same days to see correlations!',
      };
    }

    // Categorize by sleep duration
    const lowSleep = correlatedData.filter((d) => d.sleepHours < 6);
    const midSleep = correlatedData.filter((d) => d.sleepHours >= 6 && d.sleepHours <= 8);
    const highSleep = correlatedData.filter((d) => d.sleepHours > 8);

    const avgLow = lowSleep.length > 0
      ? lowSleep.reduce((sum, d) => sum + d.mood, 0) / lowSleep.length
      : null;
    const avgMid = midSleep.length > 0
      ? midSleep.reduce((sum, d) => sum + d.mood, 0) / midSleep.length
      : null;
    const avgHigh = highSleep.length > 0
      ? highSleep.reduce((sum, d) => sum + d.mood, 0) / highSleep.length
      : null;

    // Determine correlation direction
    let correlation: 'positive' | 'negative' | 'neutral' = 'neutral';
    const validAvgs = [avgLow, avgMid, avgHigh].filter((v) => v !== null) as number[];
    if (validAvgs.length >= 2) {
      if (avgLow !== null && avgMid !== null && avgMid > avgLow + 0.3) {
        correlation = 'positive';
      } else if (avgMid !== null && avgHigh !== null && avgHigh > avgMid + 0.3) {
        correlation = 'positive';
      } else if (avgLow !== null && avgMid !== null && avgLow > avgMid + 0.3) {
        correlation = 'negative';
      }
    }

    // Generate insight
    let insight = `You have ${correlatedData.length} days with both sleep and mood data. `;
    
    if (avgLow !== null && avgMid !== null && avgMid > avgLow) {
      insight += `Getting 6-8 hours of sleep is associated with a ${(avgMid - avgLow).toFixed(1)} point higher mood compared to less than 6 hours. `;
    } else if (avgLow !== null && avgMid !== null) {
      insight += `Your mood is similar regardless of sleep duration. `;
    }
    
    if (avgHigh !== null && avgMid !== null && Math.abs(avgHigh - avgMid) > 0.2) {
      if (avgHigh > avgMid) {
        insight += `Sleeping more than 8 hours seems beneficial for your mood.`;
      } else {
        insight += `Sleeping more than 8 hours doesn't necessarily improve your mood.`;
      }
    }

    return {
      correlatedDays: correlatedData.length,
      avgMoodLowSleep: avgLow,
      avgMoodMidSleep: avgMid,
      avgMoodHighSleep: avgHigh,
      countLowSleep: lowSleep.length,
      countMidSleep: midSleep.length,
      countHighSleep: highSleep.length,
      overallCorrelation: correlation,
      insight,
    };
  }, [correlatedData]);

  // Don't render if there's no sleep data at all
  if (sleepEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary" />
            Sleep & Mood Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Moon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="mb-2">No sleep data available</p>
            <p className="text-sm">
              Start using the Sleep Tracker to see how your sleep affects your mood!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          Sleep & Mood Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Insight Banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">{stats.insight}</p>
        </div>

        {/* Stats Grid */}
        {stats.correlatedDays > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Low Sleep */}
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-orange-500">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-medium">&lt; 6 hours</span>
                </div>
                <p className="text-2xl">
                  {stats.avgMoodLowSleep !== null
                    ? getMoodEmoji(Math.round(stats.avgMoodLowSleep))
                    : '—'}
                </p>
                <p className="text-lg font-bold">
                  {stats.avgMoodLowSleep?.toFixed(2) || '—'}
                </p>
                <Badge variant="outline" className="text-xs mt-1">
                  {stats.countLowSleep} days
                </Badge>
              </div>

              {/* Mid Sleep */}
              <div className="bg-muted/50 rounded-lg p-3 text-center border-2 border-green-500/30">
                <div className="flex items-center justify-center gap-1 mb-1 text-green-500">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs font-medium">6-8 hours</span>
                </div>
                <p className="text-2xl">
                  {stats.avgMoodMidSleep !== null
                    ? getMoodEmoji(Math.round(stats.avgMoodMidSleep))
                    : '—'}
                </p>
                <p className="text-lg font-bold">
                  {stats.avgMoodMidSleep?.toFixed(2) || '—'}
                </p>
                <Badge variant="outline" className="text-xs mt-1">
                  {stats.countMidSleep} days
                </Badge>
              </div>

              {/* High Sleep */}
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-blue-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">&gt; 8 hours</span>
                </div>
                <p className="text-2xl">
                  {stats.avgMoodHighSleep !== null
                    ? getMoodEmoji(Math.round(stats.avgMoodHighSleep))
                    : '—'}
                </p>
                <p className="text-lg font-bold">
                  {stats.avgMoodHighSleep?.toFixed(2) || '—'}
                </p>
                <Badge variant="outline" className="text-xs mt-1">
                  {stats.countHighSleep} days
                </Badge>
              </div>
            </div>

            {/* Scatter Chart */}
            {correlatedData.length >= 3 && (
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="sleepHours"
                      name="Sleep"
                      unit="h"
                      type="number"
                      domain={[4, 10]}
                      tickFormatter={(v) => `${v}h`}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="mood"
                      name="Mood"
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as CorrelatedData;
                          return (
                            <div className="bg-popover border rounded-lg p-2 shadow-lg">
                              <p className="text-sm font-medium">{data.date}</p>
                              <p className="text-xs">
                                Sleep: {data.sleepHours.toFixed(1)}h
                              </p>
                              <p className="text-xs">
                                Mood: {getMoodEmoji(data.mood)} {data.mood}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine x={6} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                    <ReferenceLine x={8} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                    <Scatter
                      data={correlatedData}
                      fill="hsl(var(--primary))"
                      fillOpacity={0.7}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepMoodCorrelation;
