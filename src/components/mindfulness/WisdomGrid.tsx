import { Card, CardContent } from '@/components/ui/card';
import { wisdomCards } from './mindfulnessData';

const WisdomGrid = () => {
  return (
    <section className="py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">
        Wisdom from Spiritual Leaders
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Ancient traditions for modern peace
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wisdomCards.map((card, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-4 md:p-6 text-center">
              <span className="text-3xl md:text-4xl mb-3 block">
                {card.emoji}
              </span>
              <h3 className="font-semibold text-sm md:text-base text-foreground mb-2">
                {card.tradition}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
                {card.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WisdomGrid;
