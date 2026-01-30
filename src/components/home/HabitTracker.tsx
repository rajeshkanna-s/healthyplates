import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Flame, Droplets, Apple, Salad, Ban, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Habit {
  id: string;
  label: string;
  icon: React.ReactNode;
  streakKey: string;
}

const habits: Habit[] = [
  { id: 'water', label: 'Drank 8 glasses of water', icon: <Droplets className="w-5 h-5 text-blue-500" />, streakKey: 'water_streak' },
  { id: 'fruit', label: 'Ate 1 fruit', icon: <Apple className="w-5 h-5 text-red-500" />, streakKey: 'fruit_streak' },
  { id: 'vegetables', label: 'Ate 1 serving of vegetables', icon: <Salad className="w-5 h-5 text-green-500" />, streakKey: 'vegetables_streak' },
  { id: 'no_sugar', label: 'No sugary drinks today', icon: <Ban className="w-5 h-5 text-orange-500" />, streakKey: 'no_sugar_streak' },
  { id: 'sleep', label: 'Slept 7+ hours', icon: <Moon className="w-5 h-5 text-purple-500" />, streakKey: 'sleep_streak' },
];

const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

const HabitTracker = () => {
  const [checkedHabits, setCheckedHabits] = useState<Record<string, boolean>>({});
  const [streaks, setStreaks] = useState<Record<string, number>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const todayKey = getTodayKey();
    const savedData = localStorage.getItem(`habits_${todayKey}`);
    const savedStreaks = localStorage.getItem('habit_streaks');
    
    if (savedData) {
      setCheckedHabits(JSON.parse(savedData));
    }
    
    if (savedStreaks) {
      setStreaks(JSON.parse(savedStreaks));
    }

    // Check if we need to reset streaks (if user missed yesterday)
    checkAndUpdateStreaks();
  }, []);

  const checkAndUpdateStreaks = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
    
    const yesterdayData = localStorage.getItem(`habits_${yesterdayKey}`);
    const currentStreaks = JSON.parse(localStorage.getItem('habit_streaks') || '{}');
    
    // If no data from yesterday, reset streaks for unchecked habits
    if (!yesterdayData) {
      const resetStreaks: Record<string, number> = {};
      habits.forEach(habit => {
        resetStreaks[habit.streakKey] = 0;
      });
      localStorage.setItem('habit_streaks', JSON.stringify(resetStreaks));
      setStreaks(resetStreaks);
    } else {
      const yesterdayHabits = JSON.parse(yesterdayData);
      const updatedStreaks = { ...currentStreaks };
      
      habits.forEach(habit => {
        if (!yesterdayHabits[habit.id]) {
          updatedStreaks[habit.streakKey] = 0;
        }
      });
      
      localStorage.setItem('habit_streaks', JSON.stringify(updatedStreaks));
      setStreaks(updatedStreaks);
    }
  };

  const toggleHabit = (habitId: string, streakKey: string) => {
    const todayKey = getTodayKey();
    const newChecked = { ...checkedHabits, [habitId]: !checkedHabits[habitId] };
    setCheckedHabits(newChecked);
    localStorage.setItem(`habits_${todayKey}`, JSON.stringify(newChecked));

    // Update streak
    const currentStreaks = { ...streaks };
    if (newChecked[habitId]) {
      currentStreaks[streakKey] = (currentStreaks[streakKey] || 0) + 1;
    } else {
      currentStreaks[streakKey] = Math.max(0, (currentStreaks[streakKey] || 0) - 1);
    }
    setStreaks(currentStreaks);
    localStorage.setItem('habit_streaks', JSON.stringify(currentStreaks));
  };

  const completedCount = Object.values(checkedHabits).filter(Boolean).length;
  const highestStreak = Math.max(...Object.values(streaks), 0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-health/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-health/10 text-health px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Daily Health Checklist
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Build <span className="text-health">Healthy Habits</span> Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your daily health habits. Your progress is saved in your browser — no login required!
          </p>
        </div>

        {/* Progress Summary */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-health">{completedCount}/{habits.length}</div>
            <p className="text-sm text-muted-foreground">Today's Progress</p>
          </div>
          {highestStreak > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-orange-500">
                <Flame className="w-6 h-6" />
                {highestStreak}
              </div>
              <p className="text-sm text-muted-foreground">Best Streak</p>
            </div>
          )}
        </div>

        {/* Habit Cards */}
        <Card className="shadow-health border border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span>Today's Checklist</span>
              <Badge variant="secondary" className="ml-auto">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {habits.map((habit) => {
              const isChecked = checkedHabits[habit.id];
              const streak = streaks[habit.streakKey] || 0;
              
              return (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id, habit.streakKey)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    isChecked 
                      ? 'bg-health/10 border-2 border-health' 
                      : 'bg-muted/30 border-2 border-transparent hover:border-health/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-health" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {habit.icon}
                  </div>
                  <span className={`flex-1 text-left font-medium ${
                    isChecked ? 'text-health line-through' : 'text-foreground'
                  }`}>
                    {habit.label}
                  </span>
                  {streak > 1 && (
                    <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {streak} day streak
                    </Badge>
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Motivational Message */}
        {completedCount === habits.length && (
          <div className="mt-6 text-center p-6 bg-gradient-to-r from-health/20 to-nutrition/20 rounded-xl border border-health/30">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-health mb-1">Perfect Day!</h3>
            <p className="text-muted-foreground">You've completed all your healthy habits today. Keep it up!</p>
          </div>
        )}

        {/* Info Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          💡 Your progress is saved locally in your browser. Clearing browser data will reset your streaks.
        </p>
      </div>
    </section>
  );
};

export default HabitTracker;
