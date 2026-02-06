import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

interface LoveScoreProps {
  name1: string;
  name2: string;
}

const LoveScore = ({ name1, name2 }: LoveScoreProps) => {
  const [showScore, setShowScore] = useState(false);
  const [animating, setAnimating] = useState(false);

  const calculateScore = (n1: string, n2: string): number => {
    const combined = (n1 + "loves" + n2).toLowerCase().replace(/\s/g, "");
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
      sum += combined.charCodeAt(i);
    }
    // Generate a score between 70-99 to keep it fun and positive
    return 70 + (sum % 30);
  };

  const score = calculateScore(name1, name2);

  const handleReveal = () => {
    setAnimating(true);
    setTimeout(() => {
      setShowScore(true);
      setAnimating(false);
    }, 1500);
  };

  const getScoreMessage = (s: number): string => {
    if (s >= 95) return "Soulmates! Written in the stars ⭐";
    if (s >= 90) return "A love story for the ages 💫";
    if (s >= 85) return "You two are perfect together! 🌟";
    if (s >= 80) return "Made for each other 💕";
    return "A beautiful connection 🌹";
  };

  return (
    <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/15 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <Sparkles className="w-4 h-4 text-rose-400" />
        <h3 className="text-rose-200 font-semibold text-sm">💘 Love Score Generator</h3>
      </div>

      {!showScore && !animating && (
        <div className="text-center">
          <p className="text-rose-300/60 text-xs mb-3">
            Discover your love compatibility score!
          </p>
          <button
            onClick={handleReveal}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium px-6 py-2.5 rounded-xl text-sm hover:from-rose-500 hover:to-pink-500 transition-all shadow-lg shadow-rose-500/20"
          >
            <Heart className="w-4 h-4 inline mr-2" fill="currentColor" />
            Reveal Love Score
          </button>
        </div>
      )}

      {animating && (
        <div className="text-center py-4">
          <div className="text-4xl animate-bounce">💘</div>
          <p className="text-rose-300/60 text-xs mt-2 animate-pulse">Calculating your love...</p>
        </div>
      )}

      {showScore && (
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-rose-200 font-medium text-sm">{name1}</span>
            <Heart className="w-5 h-5 text-rose-400 animate-pulse" fill="currentColor" />
            <span className="text-rose-200 font-medium text-sm">{name2}</span>
          </div>
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2">
            {score}%
          </div>
          <p className="text-rose-300/70 text-xs">{getScoreMessage(score)}</p>
          <button
            onClick={() => { setShowScore(false); }}
            className="text-rose-400/50 text-xs mt-3 hover:text-rose-400 transition-colors"
          >
            Calculate again
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveScore;
