import { useState, useEffect } from 'react';
import { Check, Heart, Share2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Practice, TimerState } from './types';
import TimerComponent from './TimerComponent';
import BreathingCircle from './BreathingCircle';
import { toast } from '@/hooks/use-toast';

interface PracticeDetailProps {
  practice: Practice;
}

const PracticeDetail = ({ practice }: PracticeDetailProps) => {
  const [selectedDuration, setSelectedDuration] = useState(practice.durations[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  useEffect(() => {
    // Check if practice is saved
    const savedPractices = JSON.parse(localStorage.getItem('savedPractices') || '[]');
    setIsSaved(savedPractices.includes(practice.id));
    setSelectedDuration(practice.durations[0]);
    setTimerState('idle');
  }, [practice.id, practice.durations]);

  const handleSave = () => {
    const savedPractices = JSON.parse(localStorage.getItem('savedPractices') || '[]');
    
    if (isSaved) {
      const filtered = savedPractices.filter((id: string) => id !== practice.id);
      localStorage.setItem('savedPractices', JSON.stringify(filtered));
      setIsSaved(false);
      toast({ title: 'Removed from favorites' });
    } else {
      savedPractices.push(practice.id);
      localStorage.setItem('savedPractices', JSON.stringify(savedPractices));
      setIsSaved(true);
      toast({ title: 'Added to favorites', description: 'Practice saved for quick access' });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: practice.title,
      text: `Try ${practice.title} - ${practice.summary}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied!', description: 'Share this practice with others' });
    }
  };

  const handleComplete = () => {
    toast({
      title: '🎉 Practice Complete!',
      description: `You completed ${selectedDuration} minutes of ${practice.title}`,
    });
    
    // Log practice completion
    const completedPractices = JSON.parse(localStorage.getItem('completedPractices') || '[]');
    completedPractices.push({
      id: practice.id,
      duration: selectedDuration,
      date: new Date().toISOString(),
    });
    localStorage.setItem('completedPractices', JSON.stringify(completedPractices));
  };

  const handleTimerStateChange = (state: TimerState) => {
    setTimerState(state);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl md:text-2xl text-foreground">
              {practice.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {practice.lead}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="h-9 w-9"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={`h-9 w-9 ${isSaved ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2 mt-4">
          {practice.benefits.map((benefit, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {benefit}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Duration Selector */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-3">Select Duration</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {practice.durations.map((duration) => (
              <Button
                key={duration}
                variant={selectedDuration === duration ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDuration(duration)}
                disabled={timerState === 'running'}
              >
                {duration} min
              </Button>
            ))}
          </div>
        </div>

        {/* Breathing Circle for breathing practice */}
        {practice.id === 'breathing' && (
          <BreathingCircle isRunning={timerState === 'running'} />
        )}

        {/* Timer */}
        <TimerComponent 
          duration={selectedDuration} 
          onComplete={handleComplete}
          onStateChange={handleTimerStateChange}
        />

        {/* Steps */}
        <div className="bg-muted/50 rounded-lg p-4 md:p-6">
          <h4 className="font-semibold text-foreground mb-4">How to Practice</h4>
          <ol className="space-y-3">
            {practice.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Practical tip */}
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">💡 Tip: </span>
            {practice.id === 'breathing' && 
              "If 4-4-6 feels too long, try 3-3-5 to start. Keep the exhale longer than the inhale."
            }
            {practice.id === 'meditation' && 
              "Use a gentle chime every 5 minutes if you want checkpoints."
            }
            {practice.id === 'gratitude' && 
              "Write down your three items to deepen the practice."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeDetail;
