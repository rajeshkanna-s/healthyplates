import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { affirmations } from './mindfulnessData';
import { toast } from '@/hooks/use-toast';

const AffirmationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? affirmations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === affirmations.length - 1 ? 0 : prev + 1));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(affirmations[currentIndex].text);
    toast({ title: 'Copied!', description: 'Affirmation copied to clipboard' });
  };

  const handleShare = async () => {
    const affirmation = affirmations[currentIndex];
    const shareData = {
      title: affirmation.label,
      text: `"${affirmation.text}" - Daily Affirmation`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    // Create a simple canvas with the affirmation text
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1080);
      
      // Text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Word wrap
      const words = affirmations[currentIndex].text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 900 && currentLine !== '') {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });
      lines.push(currentLine.trim());
      
      const lineHeight = 70;
      const startY = 540 - ((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, index) => {
        ctx.fillText(`"${line}"`, 540, startY + index * lineHeight);
      });
      
      // Label
      ctx.font = '24px system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(affirmations[currentIndex].label, 540, 980);
      
      // Download
      const link = document.createElement('a');
      link.download = `affirmation-${affirmations[currentIndex].id}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({ title: 'Downloaded!', description: 'Use as your wallpaper' });
    }
  };

  return (
    <section className="py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
        Daily Affirmations
      </h2>
      
      <div className="relative max-w-2xl mx-auto px-4">
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="p-6 md:p-10 text-center">
            <span className="text-xs md:text-sm font-medium text-primary mb-4 block">
              {affirmations[currentIndex].label}
            </span>
            <p className="text-lg md:text-2xl font-medium text-foreground leading-relaxed mb-6">
              "{affirmations[currentIndex].text}"
            </p>
            
            {/* Actions */}
            <div className="flex justify-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Wallpaper
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {affirmations.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AffirmationsCarousel;
