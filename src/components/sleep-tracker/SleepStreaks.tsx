import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Trophy } from 'lucide-react';
import { SleepEntry } from './types';
import { calculateStreaks } from './utils';

interface SleepStreaksProps {
  entries: SleepEntry[];
}

const SleepStreaks: React.FC<SleepStreaksProps> = ({ entries }) => {
  const { currentStreak, bestStreak } = calculateStreaks(entries);

  if (entries.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{currentStreak}</p>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{bestStreak}</p>
              <p className="text-sm text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepStreaks;
