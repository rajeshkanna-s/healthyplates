import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { SleepEntry } from './types';
import { getAverageStats, formatDuration } from './utils';

interface SleepStatsProps {
  entries: SleepEntry[];
}

const SleepStats: React.FC<SleepStatsProps> = ({ entries }) => {
  const stats = getAverageStats(entries);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalDays}</p>
              <p className="text-sm text-muted-foreground">Days Tracked</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatDuration(Math.round(stats.avgDuration))}</p>
              <p className="text-sm text-muted-foreground">Average Sleep</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatDuration(Math.round(stats.last7DaysAvg))}</p>
              <p className="text-sm text-muted-foreground">Last 7 Days Avg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepStats;
