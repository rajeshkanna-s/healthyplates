import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { differenceInDays, parseISO, isWithinInterval, format, subDays } from 'date-fns';

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

const getDateRange = (habit: Habit) => {
  const start = parseISO(habit.startDate);
  const end = habit.endDate ? parseISO(habit.endDate) : new Date();
  return { start, end };
};

const getTotalDays = (habit: Habit): number => {
  const { start, end } = getDateRange(habit);
  return Math.max(1, differenceInDays(end, start) + 1);
};

const getCompletedInRange = (habit: Habit): number => {
  const { start, end } = getDateRange(habit);
  return habit.completedDates.filter(d => {
    const date = parseISO(d);
    return isWithinInterval(date, { start, end });
  }).length;
};

const getStreakInRange = (habit: Habit): { current: number; best: number } => {
  const { start, end } = getDateRange(habit);
  const validDates = habit.completedDates
    .filter(d => {
      const date = parseISO(d);
      return isWithinInterval(date, { start, end });
    })
    .sort();

  if (validDates.length === 0) return { current: 0, best: 0 };

  // Best streak
  let bestStreak = 1;
  let tempStreak = 1;
  for (let i = 1; i < validDates.length; i++) {
    if (differenceInDays(parseISO(validDates[i]), parseISO(validDates[i - 1])) === 1) {
      tempStreak++;
    } else {
      bestStreak = Math.max(bestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  bestStreak = Math.max(bestStreak, tempStreak);

  // Current streak (from end date backwards)
  let currentStreak = 0;
  const endStr = format(end, 'yyyy-MM-dd');
  const yesterdayStr = format(subDays(end, 1), 'yyyy-MM-dd');
  const sorted = [...validDates].sort().reverse();
  if (sorted.includes(endStr) || sorted.includes(yesterdayStr)) {
    let checkDate = sorted.includes(endStr) ? end : subDays(end, 1);
    while (sorted.includes(format(checkDate, 'yyyy-MM-dd'))) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    }
  }

  return { current: currentStreak, best: Math.max(bestStreak, currentStreak) };
};

const HabitProgress: React.FC<HabitProgressProps> = ({ habits }) => {
  const activeHabits = habits.filter(h => !h.archived);

  const habitStats = useMemo(() => {
    return activeHabits.map(habit => {
      const totalDays = getTotalDays(habit);
      const completed = getCompletedInRange(habit);
      const completionRate = Math.min(100, Math.round((completed / totalDays) * 100));
      const streak = getStreakInRange(habit);
      const remaining = totalDays - completed;

      return {
        ...habit,
        totalDays,
        completed,
        completionRate,
        currentStreak: streak.current,
        bestStreak: streak.best,
        remaining: Math.max(0, remaining),
      };
    });
  }, [activeHabits]);

  const averageProgress = habitStats.length > 0
    ? Math.round(habitStats.reduce((sum, h) => sum + h.completionRate, 0) / habitStats.length)
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
            {habitStats.filter(h => h.completionRate >= 80).length} of {habitStats.length} habits on track
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
              <span className="text-lg font-bold">{stat.completionRate}%</span>
            </div>
            <Progress
              value={stat.completionRate}
              className={`h-2.5 mb-3 ${stat.completionRate >= 80 ? '[&>div]:bg-green-500' : stat.completionRate >= 50 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'}`}
            />
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>Completed: <strong className="text-foreground">{stat.completed}/{stat.totalDays} days</strong></span>
              <span>Remaining: <strong className="text-foreground">{stat.remaining} days</strong></span>
              <Badge variant="outline" className="text-[10px] h-4 gap-1">
                🔥 {stat.currentStreak} streak
              </Badge>
              <Badge variant="outline" className="text-[10px] h-4 gap-1">
                🏆 {stat.bestStreak} best
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HabitProgress;
