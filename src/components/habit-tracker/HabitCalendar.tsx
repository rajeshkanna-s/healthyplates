import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  color: string;
  completedDates: string[];
  archived: boolean;
}

interface HabitCalendarProps {
  habits: Habit[];
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habits }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const activeHabits = habits.filter(h => !h.archived);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const getCompletionForDay = (date: Date): { completed: number; total: number } => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const completed = activeHabits.filter(h => h.completedDates.includes(dateStr)).length;
    return { completed, total: activeHabits.length };
  };

  const getHeatColor = (ratio: number): string => {
    if (ratio === 0) return 'bg-muted/50';
    if (ratio < 0.33) return 'bg-red-400/60';
    if (ratio < 0.66) return 'bg-yellow-400/60';
    if (ratio < 1) return 'bg-green-400/60';
    return 'bg-green-500/80';
  };

  if (activeHabits.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">Add habits to see the calendar view.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-base">{format(currentMonth, 'MMMM yyyy')}</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(day => {
            const inMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());
            const { completed, total } = getCompletionForDay(day);
            const ratio = total > 0 ? completed / total : 0;

            return (
              <div
                key={day.toISOString()}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs relative group cursor-default
                  ${!inMonth ? 'opacity-30' : ''}
                  ${isToday ? 'ring-2 ring-primary' : ''}
                  ${inMonth ? getHeatColor(ratio) : 'bg-transparent'}
                `}
              >
                <span className={`font-medium ${isToday ? 'text-primary' : ''}`}>
                  {format(day, 'd')}
                </span>
                {inMonth && completed > 0 && (
                  <span className="text-[9px] font-bold">{completed}/{total}</span>
                )}

                {/* Tooltip */}
                {inMonth && (
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border rounded-md px-2 py-1 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-md">
                    {format(day, 'MMM d')}: {completed}/{total} completed
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-muted/50" /> None
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-400/60" /> &lt;33%
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-400/60" /> 33-66%
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-400/60" /> 66-99%
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500/80" /> 100%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCalendar;
