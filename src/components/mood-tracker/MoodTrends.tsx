import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MoodEntry, MOOD_OPTIONS } from './types';
import { getMoodEmoji } from './utils';

interface MoodTrendsProps {
  entries: MoodEntry[];
}

const MoodTrends: React.FC<MoodTrendsProps> = ({ entries }) => {
  const chartData = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood,
      emoji: getMoodEmoji(entry.mood),
    }));

  if (chartData.length === 0) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{data.date}</p>
          <p className="text-2xl">{data.emoji}</p>
          <p className="text-xs text-muted-foreground">
            {MOOD_OPTIONS.find((o) => o.value === data.mood)?.label}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Mood Trend (Last 14 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length < 2 ? (
          <p className="text-muted-foreground text-center py-8">
            Log at least 2 days to see your mood trend.
          </p>
        ) : (
          <>
            {/* Mini emoji trend */}
            <div className="flex justify-center gap-1 mb-4 flex-wrap">
              {chartData.slice(-7).map((data, idx) => (
                <div key={idx} className="text-center">
                  <span className="text-2xl">{data.emoji}</span>
                  <p className="text-xs text-muted-foreground">{data.date.split(' ')[1]}</p>
                </div>
              ))}
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    domain={[1, 5]} 
                    ticks={[1, 2, 3, 4, 5]}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => getMoodEmoji(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine 
                    y={3} 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="3 3"
                    strokeOpacity={0.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#moodGradient)"
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTrends;
