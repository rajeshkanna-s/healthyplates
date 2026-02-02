import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Target, Lightbulb } from 'lucide-react';
import { MoodEntry, TAG_OPTIONS } from './types';
import { getMoodEmoji, getMoodLabel } from './utils';
import { format, subDays, startOfMonth, isAfter, isBefore, parseISO } from 'date-fns';

interface MoodSummaryProps {
  entries: MoodEntry[];
}

type PeriodType = '7days' | '30days' | 'thisMonth' | 'allTime';

interface SummaryStats {
  daysTracked: number;
  totalDays: number;
  averageMood: number;
  highestMoodDay: MoodEntry | null;
  lowestMoodDay: MoodEntry | null;
  positiveDaysPercent: number;
  moodVariability: 'Low' | 'Medium' | 'High';
  insight: string;
}

const MoodSummary: React.FC<MoodSummaryProps> = ({ entries }) => {
  const [period, setPeriod] = useState<PeriodType>('7days');

  const stats = useMemo((): SummaryStats => {
    const now = new Date();
    let startDate: Date;
    let endDate = now;
    let totalDays = 0;

    switch (period) {
      case '7days':
        startDate = subDays(now, 6);
        totalDays = 7;
        break;
      case '30days':
        startDate = subDays(now, 29);
        totalDays = 30;
        break;
      case 'thisMonth':
        startDate = startOfMonth(now);
        totalDays = now.getDate();
        break;
      case 'allTime':
      default:
        startDate = new Date(0);
        totalDays = entries.length > 0 ? 
          Math.ceil((now.getTime() - parseISO(entries[entries.length - 1]?.date || now.toISOString()).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;
        break;
    }

    // Filter entries within the period
    const filteredEntries = entries.filter((entry) => {
      const entryDate = parseISO(entry.date);
      return isAfter(entryDate, subDays(startDate, 1)) && isBefore(entryDate, subDays(endDate, -1));
    });

    if (filteredEntries.length === 0) {
      return {
        daysTracked: 0,
        totalDays,
        averageMood: 0,
        highestMoodDay: null,
        lowestMoodDay: null,
        positiveDaysPercent: 0,
        moodVariability: 'Low',
        insight: 'Start tracking your mood to see insights!',
      };
    }

    const daysTracked = new Set(filteredEntries.map((e) => e.date)).size;
    const moodSum = filteredEntries.reduce((sum, e) => sum + e.mood, 0);
    const averageMood = moodSum / filteredEntries.length;

    // Find highest and lowest mood days
    const sortedByMood = [...filteredEntries].sort((a, b) => b.mood - a.mood);
    const highestMoodDay = sortedByMood[0];
    const lowestMoodDay = sortedByMood[sortedByMood.length - 1];

    // Calculate positive days (mood >= 4)
    const positiveDays = filteredEntries.filter((e) => e.mood >= 4).length;
    const positiveDaysPercent = (positiveDays / filteredEntries.length) * 100;

    // Calculate mood variability (standard deviation)
    const variance =
      filteredEntries.reduce((sum, e) => sum + Math.pow(e.mood - averageMood, 2), 0) /
      filteredEntries.length;
    const stdDev = Math.sqrt(variance);
    
    let moodVariability: 'Low' | 'Medium' | 'High';
    if (stdDev < 0.8) moodVariability = 'Low';
    else if (stdDev < 1.5) moodVariability = 'Medium';
    else moodVariability = 'High';

    // Generate insight
    let insight = '';
    const trackingRate = (daysTracked / totalDays) * 100;
    
    if (trackingRate >= 80) {
      insight = `Great consistency! You tracked your mood on ${daysTracked} of ${totalDays} days. `;
    } else if (trackingRate >= 50) {
      insight = `You tracked ${daysTracked} of ${totalDays} days. `;
    } else {
      insight = `You tracked ${daysTracked} days. Try logging daily for better insights. `;
    }

    if (averageMood >= 4) {
      insight += `Your average mood was ${getMoodEmoji(Math.round(averageMood))} (${averageMood.toFixed(1)}) — you've been feeling good!`;
    } else if (averageMood >= 3) {
      insight += `Your average mood was ${getMoodEmoji(Math.round(averageMood))} (${averageMood.toFixed(1)}) — mostly balanced.`;
    } else {
      insight += `Your average mood was ${getMoodEmoji(Math.round(averageMood))} (${averageMood.toFixed(1)}). Remember, all feelings are valid.`;
    }

    return {
      daysTracked,
      totalDays,
      averageMood,
      highestMoodDay,
      lowestMoodDay,
      positiveDaysPercent,
      moodVariability,
      insight,
    };
  }, [entries, period]);

  const getTagInfo = (tag: string) => TAG_OPTIONS.find((t) => t.value === tag);

  const periodLabels: Record<PeriodType, string> = {
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    'thisMonth': 'This Month',
    'allTime': 'All Time',
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Mood Summary
          </CardTitle>
          <Select value={period} onValueChange={(v) => setPeriod(v as PeriodType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Insight Banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">{stats.insight}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Calendar className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xl font-bold">{stats.daysTracked}</p>
            <p className="text-xs text-muted-foreground">Days Tracked</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <span className="text-xl">{stats.averageMood > 0 ? getMoodEmoji(Math.round(stats.averageMood)) : '—'}</span>
            <p className="text-lg font-bold">{stats.averageMood > 0 ? stats.averageMood.toFixed(1) : '—'}</p>
            <p className="text-xs text-muted-foreground">Average Mood</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Target className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xl font-bold">{stats.positiveDaysPercent.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Positive Days</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <BarChart3 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <Badge variant={
              stats.moodVariability === 'Low' ? 'secondary' :
              stats.moodVariability === 'Medium' ? 'outline' : 'destructive'
            }>
              {stats.moodVariability}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">Variability</p>
          </div>
        </div>

        {/* Best & Worst Days */}
        {(stats.highestMoodDay || stats.lowestMoodDay) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats.highestMoodDay && (
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Best Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(stats.highestMoodDay.mood)}</span>
                  <div>
                    <p className="text-sm font-medium">
                      {format(parseISO(stats.highestMoodDay.date), 'MMM d, yyyy')}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stats.highestMoodDay.tags.slice(0, 2).map((tag) => {
                        const tagInfo = getTagInfo(tag);
                        return (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            {tagInfo?.emoji}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {stats.lowestMoodDay && stats.lowestMoodDay.id !== stats.highestMoodDay?.id && (
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Challenging Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(stats.lowestMoodDay.mood)}</span>
                  <div>
                    <p className="text-sm font-medium">
                      {format(parseISO(stats.lowestMoodDay.date), 'MMM d, yyyy')}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stats.lowestMoodDay.tags.slice(0, 2).map((tag) => {
                        const tagInfo = getTagInfo(tag);
                        return (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            {tagInfo?.emoji}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodSummary;
