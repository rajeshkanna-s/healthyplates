import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Play, Bell, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PracticeCard from '@/components/mindfulness/PracticeCard';
import PracticeDetail from '@/components/mindfulness/PracticeDetail';
import AffirmationsCarousel from '@/components/mindfulness/AffirmationsCarousel';
import WisdomGrid from '@/components/mindfulness/WisdomGrid';
import GratitudeJournal from '@/components/mindfulness/GratitudeJournal';
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
    document.getElementById('practice-section')?.scrollIntoView({ behavior: 'smooth' });
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
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Find Your Inner Peace
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Mindfulness
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Calm the mind. Restore balance. Practice 5 minutes a day.
            </p>
            
            <Button size="lg" onClick={handleStartPractice} className="gap-2">
              <Play className="h-5 w-5" />
              Start a Practice
            </Button>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Practice Selector Cards */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              Choose Your Practice
            </h2>
            
            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
              {practices.map((practice) => (
                <div key={practice.id} className="flex-shrink-0 w-64 md:w-auto">
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
          <section id="practice-section" className="mb-12">
            {showPractice && <PracticeDetail practice={selectedPractice} />}
            
            {!showPractice && (
              <div className="text-center py-12 bg-muted/30 rounded-2xl">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to Begin?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Select a practice above and click "Start a Practice" to begin your session
                </p>
                <Button onClick={handleStartPractice}>
                  Start {selectedPractice.title}
                </Button>
              </div>
            )}
          </section>

          {/* Affirmations */}
          <AffirmationsCarousel />

          {/* Gratitude Journal - only show when gratitude practice is selected */}
          {selectedPractice.id === 'gratitude' && showPractice && (
            <GratitudeJournal />
          )}

          {/* Wisdom Grid */}
          <WisdomGrid />

          {/* Bottom Mobile Navigation (Fixed) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border py-3 px-4 z-40">
            <div className="flex justify-around items-center">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 h-auto py-2"
                onClick={handleStartPractice}
              >
                <Play className="h-5 w-5" />
                <span className="text-xs">Start</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-col gap-1 h-auto py-2"
                onClick={() => {
                  // Scroll to saved section or show saved practices
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
                <span className="text-xs">Saved</span>
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
