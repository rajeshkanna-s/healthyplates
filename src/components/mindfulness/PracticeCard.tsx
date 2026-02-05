import { Wind, Brain, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Practice } from './types';

interface PracticeCardProps {
  practice: Practice;
  isSelected: boolean;
  onSelect: () => void;
}

const iconMap = {
  Wind: Wind,
  Brain: Brain,
  Heart: Heart,
};

const PracticeCard = ({ practice, isSelected, onSelect }: PracticeCardProps) => {
  const Icon = iconMap[practice.icon as keyof typeof iconMap] || Wind;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-primary shadow-lg bg-primary/5' 
          : 'hover:bg-accent/50'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 ${
          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}>
          <Icon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">
          {practice.title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
          {practice.summary}
        </p>
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"}
          className="w-full"
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PracticeCard;
