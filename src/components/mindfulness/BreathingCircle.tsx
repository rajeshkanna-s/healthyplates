import { useEffect, useState } from 'react';
import { BreathPhase } from './types';

interface BreathingCircleProps {
  isRunning: boolean;
  pattern?: { inhale: number; hold: number; exhale: number };
}

const BreathingCircle = ({ isRunning, pattern = { inhale: 4, hold: 4, exhale: 6 } }: BreathingCircleProps) => {
  const [phase, setPhase] = useState<BreathPhase>('rest');
  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isRunning) {
      setPhase('rest');
      setScale(1);
      setCount(0);
      return;
    }

    const totalCycle = pattern.inhale + pattern.hold + pattern.exhale;
    let currentSecond = 0;

    const interval = setInterval(() => {
      currentSecond = (currentSecond + 1) % totalCycle;

      if (currentSecond < pattern.inhale) {
        setPhase('inhale');
        setCount(pattern.inhale - currentSecond);
        setScale(1 + (currentSecond / pattern.inhale) * 0.5);
      } else if (currentSecond < pattern.inhale + pattern.hold) {
        setPhase('hold');
        setCount(pattern.inhale + pattern.hold - currentSecond);
        setScale(1.5);
      } else {
        setPhase('exhale');
        const exhaleProgress = currentSecond - pattern.inhale - pattern.hold;
        setCount(pattern.exhale - exhaleProgress);
        setScale(1.5 - (exhaleProgress / pattern.exhale) * 0.5);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, pattern]);

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold':
        return 'from-purple-400 to-purple-600';
      case 'exhale':
        return 'from-green-400 to-green-600';
      default:
        return 'from-gray-300 to-gray-400';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} shadow-2xl transition-transform duration-1000 ease-in-out flex items-center justify-center`}
        style={{ transform: `scale(${scale})` }}
        role="status"
        aria-live="polite"
      >
        <div className="absolute inset-4 rounded-full bg-background/90 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-foreground">
            {isRunning ? count : '—'}
          </span>
          <span className="text-sm md:text-base text-muted-foreground mt-2">
            {getPhaseText()}
          </span>
        </div>
      </div>
      
      {isRunning && (
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          {phase === 'inhale' && 'Breathe in through your nose...'}
          {phase === 'hold' && 'Hold your breath gently...'}
          {phase === 'exhale' && 'Slowly release through your mouth...'}
        </p>
      )}
    </div>
  );
};

export default BreathingCircle;
