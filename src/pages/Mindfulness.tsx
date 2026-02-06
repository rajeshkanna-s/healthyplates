import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Play, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PracticeCard from '@/components/mindfulness/PracticeCard';
import PracticeDetail from '@/components/mindfulness/PracticeDetail';
import AffirmationsCarousel from '@/components/mindfulness/AffirmationsCarousel';
import WisdomGrid from '@/components/mindfulness/WisdomGrid';
import GratitudeJournal from '@/components/mindfulness/GratitudeJournal';
import MindfulnessTips from '@/components/mindfulness/MindfulnessTips';
import { practices } from '@/components/mindfulness/mindfulnessData';

const Mindfulness = () => {
  const [selectedPractice, setSelectedPractice] = useState(practices[0]);
  const [showPractice, setShowPractice] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const practice = practices.find(p => p.id === hash);
      if (practice) {
        setSelectedPractice(practice);
        setShowPractice(true);
      }
    }
  }, []);

  const handleStartPractice = () => {
    setShowPractice(true);
    window.location.hash = selectedPractice.id;
    
    // Scroll to practice section
    setTimeout(() => {
      document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectPractice = (practice: typeof practices[0]) => {
    setSelectedPractice(practice);
    window.location.hash = practice.id;
  };

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mindfulness — Daily practices for calm",
    "description": "Short guided practices — mindful breathing, silent meditation, and gratitude exercises. Built for busy lives.",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": practices.map(p => ({
        "@type": "Question",
        "name": `How do I practice ${p.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": p.steps.join(' ')
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Mindfulness — Daily practices for calm | HealthyPlates</title>
        <meta name="description" content="Short guided practices — mindful breathing, silent meditation, and gratitude exercises. Built for busy lives. Start a 5-minute session now." />
        <meta property="og:title" content="Mindfulness — Daily practices for calm | HealthyPlates" />
        <meta property="og:description" content="Short guided practices — mindful breathing, silent meditation, and gratitude exercises." />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section - Mobile Optimized */}
        <section className="relative py-8 md:py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              Find Your Inner Peace
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
              Mindfulness
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Calm the mind. Restore balance. Practice 5 minutes a day.
            </p>
            
            <Button 
              size="lg" 
              onClick={handleStartPractice} 
              className="gap-2 text-sm md:text-base px-6 md:px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="h-4 w-4 md:h-5 md:w-5" />
              Start a Practice
            </Button>
            
            {/* Scroll indicator */}
            <div className="mt-8 md:mt-12 animate-bounce">
              <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground mx-auto" />
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-12">
          {/* Practice Selector Cards */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold text-foreground text-center mb-4 md:mb-6">
              Choose Your Practice
            </h2>
            
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none -mx-3 px-3 md:mx-0 md:px-0">
              {practices.map((practice) => (
                <div key={practice.id} className="flex-shrink-0 w-[280px] md:w-auto snap-start">
                  <PracticeCard
                    practice={practice}
                    isSelected={selectedPractice.id === practice.id}
                    onSelect={() => handleSelectPractice(practice)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Practice Detail Section */}
          <section id="practice-section" className="mb-8 md:mb-12">
            {showPractice && <PracticeDetail practice={selectedPractice} />}
            
            {!showPractice && (
              <div className="text-center py-8 md:py-12 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl border border-border/50">
                <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  Ready to Begin?
                </h3>
                <p className="text-sm text-muted-foreground mb-4 px-4">
                  Select a practice above and click "Start a Practice" to begin
                </p>
                <Button onClick={handleStartPractice} className="shadow-md">
                  Start {selectedPractice.title}
                </Button>
              </div>
            )}
          </section>

          {/* Affirmations */}
          <AffirmationsCarousel />

          {/* Gratitude Journal */}
          <GratitudeJournal />

          {/* Mindfulness Tips & Quotes */}
          <MindfulnessTips />

          {/* Wisdom Grid */}
          <WisdomGrid />

          {/* Bottom Mobile Navigation (Fixed) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border py-2 px-4 z-40 safe-area-inset-bottom">
            <div className="flex justify-around items-center max-w-sm mx-auto">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-0.5 h-auto py-2 px-4 rounded-xl hover:bg-primary/10"
                onClick={handleStartPractice}
              >
                <Play className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Start</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-0.5 h-auto py-2 px-4 rounded-xl hover:bg-primary/10"
                onClick={() => {
                  const saved = JSON.parse(localStorage.getItem('savedPractices') || '[]');
                  if (saved.length > 0) {
                    const practice = practices.find(p => p.id === saved[0]);
                    if (practice) {
                      setSelectedPractice(practice);
                      setShowPractice(true);
                    }
                  }
                }}
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs font-medium">Saved</span>
              </Button>
            </div>
          </div>

          {/* Spacer for mobile bottom nav */}
          <div className="h-20 md:hidden" />
        </div>
      </div>
    </>
  );
};

export default Mindfulness;
