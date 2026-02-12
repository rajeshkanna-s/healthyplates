import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { format, subDays, subWeeks, startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  color: string;
  completedDates: string[];
  archived: boolean;
}

interface HabitTrendsProps {
  habits: Habit[];
}

const HabitTrends: React.FC<HabitTrendsProps> = ({ habits }) => {
  const activeHabits = habits.filter(h => !h.archived);

  // Daily completions for last 30 days
  const dailyData = useMemo(() => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const count = activeHabits.filter(h => h.completedDates.includes(dateStr)).length;
      data.push({
        date: format(date, 'MMM d'),
        completed: count,
        total: activeHabits.length,
        rate: activeHabits.length > 0 ? Math.round((count / activeHabits.length) * 100) : 0,
      });
    }
    return data;
  }, [activeHabits]);

  // Weekly totals for last 8 weeks
  const weeklyData = useMemo(() => {
    const data = [];
    for (let i = 7; i >= 0; i--) {
      const ws = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 1 });
      const we = endOfWeek(ws, { weekStartsOn: 1 });
      let total = 0;
      activeHabits.forEach(h => {
        total += h.completedDates.filter(d => {
          const date = parseISO(d);
          return isWithinInterval(date, { start: ws, end: we });
        }).length;
      });
      data.push({
        week: format(ws, 'MMM d'),
        checkIns: total,
      });
    }
    return data;
  }, [activeHabits]);

  // Per-habit weekly breakdown (last 4 weeks)
  const perHabitWeekly = useMemo(() => {
    const weeks: { label: string; start: Date; end: Date }[] = [];
    for (let i = 3; i >= 0; i--) {
      const ws = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 1 });
      const we = endOfWeek(ws, { weekStartsOn: 1 });
      weeks.push({ label: format(ws, 'MMM d'), start: ws, end: we });
    }
    return weeks.map(w => {
      const entry: Record<string, string | number> = { week: w.label };
      activeHabits.forEach(h => {
        entry[h.name] = h.completedDates.filter(d => {
          const date = parseISO(d);
          return isWithinInterval(date, { start: w.start, end: w.end });
        }).length;
      });
      return entry;
    });
  }, [activeHabits]);

  if (activeHabits.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">Add habits to see trends.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Completion Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Completion Rate (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
              <Tooltip formatter={(val: number) => [`${val}%`, 'Completion Rate']} />
              <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Check-ins (Last 8 Weeks)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="checkIns" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Check-ins" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Per-Habit Breakdown */}
      {activeHabits.length <= 6 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Per-Habit Weekly Breakdown (Last 4 Weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={perHabitWeekly}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {activeHabits.map(h => (
                  <Bar key={h.id} dataKey={h.name} fill={h.color} radius={[2, 2, 0, 0]} stackId="a" />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HabitTrends;
