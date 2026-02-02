import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { SleepEntry } from './types';
import { formatShortDate, loadGoal } from './utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface SleepTrendsProps {
  entries: SleepEntry[];
}

const SleepTrends: React.FC<SleepTrendsProps> = ({ entries }) => {
  const chartData = useMemo(() => {
    const sortedEntries = [...entries]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14);
    
    return sortedEntries.map(entry => ({
      date: formatShortDate(entry.date),
      hours: parseFloat((entry.duration / 60).toFixed(1)),
      quality: entry.quality,
    }));
  }, [entries]);

  const goal = loadGoal();
  const goalHours = goal / 60;

  if (entries.length < 2) {
    return null;
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: { quality: string } }>; label?: string }) => {
    if (active && payload && payload.length) {
      const qualityEmoji = {
        poor: '😴',
        average: '😐',
        good: '🙂',
        excellent: '😊',
      }[payload[0].payload.quality] || '';
      
      return (
        <div className="bg-popover border rounded-lg p-2 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary">{payload[0].value}h sleep {qualityEmoji}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Sleep Trends (Last 14 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11 }} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11 }} 
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={goalHours} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5"
                label={{ value: 'Goal', position: 'right', fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#sleepGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTrends;
