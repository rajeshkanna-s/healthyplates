import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Medal, Award, TrendingUp, Calendar } from 'lucide-react';
import { format, differenceInDays, parseISO, subDays } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  color: string;
  completedDates: string[];
  startDate: string;
  archived: boolean;
}

interface HabitRankingsProps {
  habits: Habit[];
}

const getRankIcon = (index: number) => {
  if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
  if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
  if (index === 2) return <Award className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-muted-foreground">#{index + 1}</span>;
};

const HabitRankings: React.FC<HabitRankingsProps> = ({ habits }) => {
  const activeHabits = habits.filter(h => !h.archived);

  const rankings = useMemo(() => {
    return activeHabits.map(habit => {
      const totalDays = Math.max(1, differenceInDays(new Date(), parseISO(habit.startDate)) + 1);
      const completionRate = Math.min(100, Math.round((habit.completedDates.length / totalDays) * 100));

      // Current streak
      let currentStreak = 0;
      const today = format(new Date(), 'yyyy-MM-dd');
      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
      const sorted = [...habit.completedDates].sort().reverse();
      if (sorted.includes(today) || sorted.includes(yesterday)) {
        let checkDate = sorted.includes(today) ? new Date() : subDays(new Date(), 1);
        while (sorted.includes(format(checkDate, 'yyyy-MM-dd'))) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        }
      }

      // Best streak
      let bestStreak = 0;
      let tempStreak = 1;
      const asc = [...habit.completedDates].sort();
      for (let i = 1; i < asc.length; i++) {
        if (differenceInDays(parseISO(asc[i]), parseISO(asc[i - 1])) === 1) {
          tempStreak++;
        } else {
          bestStreak = Math.max(bestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      bestStreak = Math.max(bestStreak, tempStreak, currentStreak);
      if (asc.length === 0) bestStreak = 0;

      return {
        ...habit,
        completionRate,
        currentStreak,
        bestStreak,
        totalCheckins: habit.completedDates.length,
        totalDays,
      };
    }).sort((a, b) => b.completionRate - a.completionRate);
  }, [activeHabits]);

  if (activeHabits.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">Add habits to see rankings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {rankings.map((habit, index) => (
        <Card key={habit.id} className={index === 0 ? 'border-yellow-500/50 bg-yellow-500/5' : ''}>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-start gap-3">
              <div className="pt-1">{getRankIcon(index)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: habit.color }} />
                  <span className="font-semibold text-sm">{habit.name}</span>
                </div>
                <Progress
                  value={habit.completionRate}
                  className={`h-2 mb-2 ${habit.completionRate >= 80 ? '[&>div]:bg-green-500' : habit.completionRate >= 50 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'}`}
                />
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {habit.completionRate}% rate
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    🔥 {habit.currentStreak} streak
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    🏆 {habit.bestStreak} best
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    {habit.totalCheckins} check-ins
                  </Badge>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-bold">{habit.completionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HabitRankings;
