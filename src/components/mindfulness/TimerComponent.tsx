import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimerState } from './types';

interface TimerComponentProps {
  duration: number; // in minutes
  onStateChange?: (state: TimerState) => void;
  onComplete?: () => void;
}

const TimerComponent = ({ duration, onStateChange, onComplete }: TimerComponentProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [state, setState] = useState<TimerState>('idle');

  const totalSeconds = duration * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  useEffect(() => {
    setTimeLeft(duration * 60);
    setState('idle');
  }, [duration]);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  useEffect(() => {
    if (state !== 'running') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setState('completed');
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = useCallback(() => {
    setState('running');
  }, []);

  const handlePause = useCallback(() => {
    setState('paused');
  }, []);

  const handleResume = useCallback(() => {
    setState('running');
  }, []);

  const handleStop = useCallback(() => {
    setState('idle');
    setTimeLeft(duration * 60);
  }, [duration]);

  const handleReset = useCallback(() => {
    setTimeLeft(duration * 60);
    setState('idle');
  }, [duration]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Progress Ring */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * progress) / 100}
            className="text-primary transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground" role="status" aria-live="polite">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-muted-foreground capitalize mt-1">
            {state === 'idle' ? 'Ready' : state}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {state === 'idle' && (
          <Button onClick={handleStart} size="lg" className="gap-2">
            <Play className="h-5 w-5" />
            Start
          </Button>
        )}

        {state === 'running' && (
          <>
            <Button onClick={handlePause} variant="outline" size="lg" className="gap-2">
              <Pause className="h-5 w-5" />
              Pause
            </Button>
            <Button onClick={handleStop} variant="destructive" size="lg" className="gap-2">
              <Square className="h-5 w-5" />
              Stop
            </Button>
          </>
        )}

        {state === 'paused' && (
          <>
            <Button onClick={handleResume} size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Resume
            </Button>
            <Button onClick={handleStop} variant="destructive" size="lg" className="gap-2">
              <Square className="h-5 w-5" />
              Stop
            </Button>
          </>
        )}

        {state === 'completed' && (
          <Button onClick={handleReset} size="lg" className="gap-2">
            <RotateCcw className="h-5 w-5" />
            Restart
          </Button>
        )}
      </div>

      {/* Keyboard shortcuts hint */}
      <p className="text-xs text-muted-foreground">
        Press Space to play/pause
      </p>
    </div>
  );
};

export default TimerComponent;
