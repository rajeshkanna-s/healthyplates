import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, RefreshCw, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

const MOTIVATIONAL_QUOTES = [
  { quote: "The greatest wealth is health.", author: "Virgil" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { quote: "Health is not valued until sickness comes.", author: "Thomas Fuller" },
  { quote: "A healthy outside starts from the inside.", author: "Robert Urich" },
  { quote: "Your body hears everything your mind says.", author: "Naomi Judd" },
  { quote: "The first wealth is health.", author: "Ralph Waldo Emerson" },
  { quote: "Happiness is the highest form of health.", author: "Dalai Lama" },
  { quote: "He who has health has hope, and he who has hope has everything.", author: "Arabian Proverb" },
  { quote: "To keep the body in good health is a duty.", author: "Buddha" },
  { quote: "Early to bed and early to rise makes a man healthy, wealthy, and wise.", author: "Benjamin Franklin" },
  { quote: "Physical fitness is the first requisite of happiness.", author: "Joseph Pilates" },
  { quote: "Let food be thy medicine and medicine be thy food.", author: "Hippocrates" },
  { quote: "Health is a state of complete harmony of the body, mind, and spirit.", author: "B.K.S. Iyengar" },
  { quote: "Good health is not something we can buy. However, it can be an extremely valuable savings account.", author: "Anne Wilson Schaef" },
  { quote: "A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned.", author: "Naval Ravikant" },
  { quote: "Wellness is the complete integration of body, mind, and spirit.", author: "Greg Anderson" },
  { quote: "The human body is the best picture of the human soul.", author: "Ludwig Wittgenstein" },
  { quote: "Those who think they have no time for healthy eating will sooner or later have to find time for illness.", author: "Edward Stanley" },
  { quote: "Movement is a medicine for creating change in a person's physical, emotional, and mental states.", author: "Carol Welch" },
  { quote: "Healthy citizens are the greatest asset any country can have.", author: "Winston Churchill" },
  { quote: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn" },
  { quote: "The groundwork for all happiness is good health.", author: "Leigh Hunt" },
  { quote: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston" },
  { quote: "Water is the driving force of all nature.", author: "Leonardo da Vinci" },
  { quote: "Sleep is the best meditation.", author: "Dalai Lama" },
  { quote: "An apple a day keeps the doctor away.", author: "Welsh Proverb" },
  { quote: "Keeping your body healthy is an expression of gratitude to the whole cosmos.", author: "Thich Nhat Hanh" },
  { quote: "A good laugh and a long sleep are the best cures in the doctor's book.", author: "Irish Proverb" },
  { quote: "Nurturing yourself is not selfish – it's essential to your survival and your well-being.", author: "Renee Peterson Trudeau" },
  { quote: "Health is like money, we never have a true idea of its value until we lose it.", author: "Josh Billings" },
];

const STORAGE_KEY = "healthyplates_motivation_favorites";

const DailyMotivation = () => {
  const [currentQuote, setCurrentQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }

    // Get quote of the day based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % MOTIVATIONAL_QUOTES.length;
    setCurrentQuote(MOTIVATIONAL_QUOTES[quoteIndex]);
  }, []);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      setCurrentQuote(MOTIVATIONAL_QUOTES[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  const isFavorite = favorites.includes(currentQuote.quote);

  const toggleFavorite = () => {
    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter(q => q !== currentQuote.quote);
      toast.success("Removed from favorites");
    } else {
      newFavorites = [...favorites, currentQuote.quote];
      toast.success("Added to favorites");
    }
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const handleShare = async () => {
    const shareText = `"${currentQuote.quote}" — ${currentQuote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Daily Motivation",
          text: shareText,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Quote copied to clipboard!");
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 border-none shadow-health-lg">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <CardContent className="relative p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 bg-primary/20 rounded-full items-center justify-center shrink-0">
              <Quote className="h-6 w-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Daily Motivation</span>
              </div>
              
              <blockquote className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-3">
                  "{currentQuote.quote}"
                </p>
                <footer className="text-sm text-muted-foreground">
                  — {currentQuote.author}
                </footer>
              </blockquote>
              
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewQuote}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">New Quote</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFavorite}
                  className={`gap-2 ${isFavorite ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DailyMotivation;
