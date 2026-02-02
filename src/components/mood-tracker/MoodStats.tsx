import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { MoodEntry } from './types';
import { calculateAverageMood, calculateAverageMoodLast7Days, getMoodEmoji } from './utils';

interface MoodStatsProps {
  entries: MoodEntry[];
}

const MoodStats: React.FC<MoodStatsProps> = ({ entries }) => {
  const totalDays = new Set(entries.map((e) => e.date)).size;
  const avgMood = calculateAverageMood(entries);
  const avgMoodLast7 = calculateAverageMoodLast7Days(entries);

  const stats = [
    {
      label: 'Days Tracked',
      value: totalDays.toString(),
      icon: Calendar,
      subtext: 'total entries',
    },
    {
      label: 'Average Mood',
      value: avgMood > 0 ? getMoodEmoji(Math.round(avgMood)) : '-',
      icon: BarChart3,
      subtext: avgMood > 0 ? `${avgMood.toFixed(1)} / 5` : 'no data',
    },
    {
      label: 'Last 7 Days',
      value: avgMoodLast7 > 0 ? getMoodEmoji(Math.round(avgMoodLast7)) : '-',
      icon: TrendingUp,
      subtext: avgMoodLast7 > 0 ? `${avgMoodLast7.toFixed(1)} / 5` : 'no data',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MoodStats;
