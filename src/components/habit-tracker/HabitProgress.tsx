import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  color: string;
  frequencyType: 'daily' | 'weekly' | 'specific';
  timesPerWeek: number;
  daysOfWeek: string[];
  completedDates: string[];
  startDate: string;
  endDate: string;
  archived: boolean;
}

interface HabitProgressProps {
  habits: Habit[];
}

const getExpectedDays = (habit: Habit, startDate: Date, endDate: Date): number => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (habit.frequencyType === 'daily') return days;
  if (habit.frequencyType === 'weekly') return Math.ceil(days / 7) * habit.timesPerWeek;
  if (habit.frequencyType === 'specific') return Math.ceil(days / 7) * habit.daysOfWeek.length;
  return days;
};

const getCompletedInRange = (habit: Habit, start: Date, end: Date): number => {
  return habit.completedDates.filter(d => {
    const date = parseISO(d);
    return isWithinInterval(date, { start, end });
  }).length;
};

const HabitProgress: React.FC<HabitProgressProps> = ({ habits }) => {
  const activeHabits = habits.filter(h => !h.archived);
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const habitStats = useMemo(() => {
    return activeHabits.map(habit => {
      const totalCompleted = habit.completedDates.length;
      const habitStart = parseISO(habit.startDate);
      const totalExpected = getExpectedDays(habit, habitStart, today);
      const overallRate = totalExpected > 0 ? Math.min(100, Math.round((totalCompleted / totalExpected) * 100)) : 0;

      const thisWeekCompleted = getCompletedInRange(habit, weekStart, weekEnd);
      const weekExpected = getExpectedDays(habit, weekStart, today < weekEnd ? today : weekEnd);

      const thisMonthCompleted = getCompletedInRange(habit, monthStart, monthEnd);
      const monthExpected = getExpectedDays(habit, monthStart, today < monthEnd ? today : monthEnd);
      const monthRate = monthExpected > 0 ? Math.min(100, Math.round((thisMonthCompleted / monthExpected) * 100)) : 0;

      // Last week comparison
      const lastWeekStart = subDays(weekStart, 7);
      const lastWeekEnd = subDays(weekStart, 1);
      const lastWeekCompleted = getCompletedInRange(habit, lastWeekStart, lastWeekEnd);
      const trend = thisWeekCompleted - lastWeekCompleted;

      return {
        ...habit,
        totalCompleted,
        overallRate,
        thisWeekCompleted,
        weekExpected,
        thisMonthCompleted,
        monthRate,
        trend,
      };
    });
  }, [activeHabits, today.toDateString()]);

  const averageProgress = habitStats.length > 0
    ? Math.round(habitStats.reduce((sum, h) => sum + h.overallRate, 0) / habitStats.length)
    : 0;

  if (activeHabits.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">Add habits to see progress reports.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Average Progress */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">Average Progress</span>
            </div>
            <span className="text-2xl font-bold text-primary">{averageProgress}%</span>
          </div>
          <Progress value={averageProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {habitStats.filter(h => h.overallRate >= 80).length} of {habitStats.length} habits on track
          </p>
        </CardContent>
      </Card>

      {/* Individual Habits */}
      {habitStats.map(stat => (
        <Card key={stat.id}>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                <span className="font-medium text-sm">{stat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{stat.overallRate}%</span>
                {stat.trend > 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
                {stat.trend < 0 && <TrendingDown className="w-4 h-4 text-red-500" />}
                {stat.trend === 0 && <Minus className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>
            <Progress
              value={stat.overallRate}
              className={`h-2.5 mb-3 ${stat.overallRate >= 80 ? '[&>div]:bg-green-500' : stat.overallRate >= 50 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'}`}
            />
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>This week: <strong className="text-foreground">{stat.thisWeekCompleted}/{stat.weekExpected}</strong></span>
              <span>This month: <strong className="text-foreground">{stat.thisMonthCompleted}</strong> ({stat.monthRate}%)</span>
              <span>Total: <strong className="text-foreground">{stat.totalCompleted}</strong></span>
              {stat.trend !== 0 && (
                <Badge variant={stat.trend > 0 ? 'default' : 'destructive'} className="text-[10px] h-4">
                  {stat.trend > 0 ? '+' : ''}{stat.trend} vs last week
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HabitProgress;
