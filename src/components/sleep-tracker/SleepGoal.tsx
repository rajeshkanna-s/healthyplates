import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, Award, Settings2 } from 'lucide-react';
import { SleepEntry } from './types';
import { loadGoal, saveGoal, getGoalProgress, formatDuration } from './utils';

interface SleepGoalProps {
  entries: SleepEntry[];
}

const GOAL_OPTIONS = [
  { value: 360, label: '6 hours' },
  { value: 390, label: '6h 30m' },
  { value: 420, label: '7 hours' },
  { value: 450, label: '7h 30m' },
  { value: 480, label: '8 hours' },
  { value: 510, label: '8h 30m' },
  { value: 540, label: '9 hours' },
];

const SleepGoal: React.FC<SleepGoalProps> = ({ entries }) => {
  const [goal, setGoal] = useState(450);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setGoal(loadGoal());
  }, []);

  const handleGoalChange = (value: string) => {
    const newGoal = parseInt(value, 10);
    setGoal(newGoal);
    saveGoal(newGoal);
    setShowSettings(false);
  };

  const progress = getGoalProgress(entries, goal, 7);
  
  const getStatusBadge = () => {
    if (progress.totalDays === 0) return { text: 'Start Tracking', color: 'text-muted-foreground' };
    if (progress.percentage >= 80) return { text: '🎯 On Track!', color: 'text-green-600 dark:text-green-400' };
    if (progress.percentage >= 50) return { text: '💪 Making Progress', color: 'text-yellow-600 dark:text-yellow-400' };
    return { text: '⚡ Needs Attention', color: 'text-orange-600 dark:text-orange-400' };
  };

  const status = getStatusBadge();

  if (entries.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Sleep Goal
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Change sleep goal"
          >
            <Settings2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Set your nightly sleep goal:</p>
            <Select value={goal.toString()} onValueChange={handleGoalChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                {GOAL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Target: {formatDuration(goal)}/night</p>
                <p className={`text-lg font-semibold ${status.color}`}>
                  {status.text}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{progress.daysMetGoal}</span>
                  <span className="text-muted-foreground">/ {progress.totalDays}</span>
                </div>
                <p className="text-xs text-muted-foreground">days (last 7)</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress value={progress.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {Math.round(progress.percentage)}% of nights met goal
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepGoal;
