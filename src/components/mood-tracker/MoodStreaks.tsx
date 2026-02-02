import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy } from 'lucide-react';
import { MoodEntry } from './types';
import { calculateStreaks } from './utils';

interface MoodStreaksProps {
  entries: MoodEntry[];
}

const MoodStreaks: React.FC<MoodStreaksProps> = ({ entries }) => {
  const { current, best } = calculateStreaks(entries);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          Logging Streaks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">
              {current}
            </p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-xs text-muted-foreground">
              {current === 1 ? 'day' : 'days'} in a row
            </p>
          </div>

          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <Trophy className="w-8 h-8 text-secondary-foreground mx-auto mb-2" />
            <p className="text-3xl font-bold text-secondary-foreground">
              {best}
            </p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
            <p className="text-xs text-muted-foreground">
              {best === 1 ? 'day' : 'days'} personal record
            </p>
          </div>
        </div>

        {current === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Log your mood today to start a new streak!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodStreaks;
