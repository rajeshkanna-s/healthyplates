import { Clock, Sunrise, Utensils, Footprints, User, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { mindfulnessTips, mindfulnessQuotes } from './mindfulnessData';
import { useState, useEffect } from 'react';

const iconMap: Record<string, React.ElementType> = {
  Clock,
  Sunrise,
  Utensils,
  Footprints,
  User,
  Bell
};

const MindfulnessTips = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % mindfulnessQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const quote = mindfulnessQuotes[currentQuote];

  return (
    <section className="py-6 md:py-10">
      {/* Inspirational Quote */}
      <div className="mb-8 md:mb-10">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <CardContent className="p-6 md:p-8 text-center">
            <p className="text-base md:text-xl italic text-foreground mb-3 leading-relaxed">
              "{quote.quote}"
            </p>
            <p className="text-sm text-muted-foreground">— {quote.author}</p>
            <div className="flex justify-center gap-1.5 mt-4">
              {mindfulnessQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentQuote 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Tips */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
          Quick Mindfulness Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {mindfulnessTips.map((tip) => {
            const IconComponent = iconMap[tip.icon] || Clock;
            return (
              <Card 
                key={tip.id} 
                className="group border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MindfulnessTips;