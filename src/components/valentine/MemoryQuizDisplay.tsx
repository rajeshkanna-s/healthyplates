import { useState } from "react";
import { HelpCircle, Eye } from "lucide-react";
import { MemoryQuizItem } from "./types";

interface MemoryQuizDisplayProps {
  items: MemoryQuizItem[];
  creatorName: string;
}

const MemoryQuizDisplay = ({ items, creatorName }: MemoryQuizDisplayProps) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());

  if (!items || items.length === 0) return null;

  const toggleReveal = (index: number) => {
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-center gap-2 mb-3 justify-center">
        <HelpCircle className="w-4 h-4 text-rose-400" />
        <span className="text-rose-300 text-xs font-medium">
          Memory Quiz from {creatorName}
        </span>
      </div>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-black/20 border border-rose-500/15 rounded-xl p-4"
          >
            <p className="text-rose-200 text-sm font-medium mb-2">
              {item.question}
            </p>
            <button
              type="button"
              onClick={() => toggleReveal(i)}
              className={`w-full text-left rounded-lg p-2.5 transition-all ${
                revealedAnswers.has(i)
                  ? "bg-rose-500/15 border border-rose-400/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              {revealedAnswers.has(i) ? (
                <span className="text-rose-100 text-sm">{item.answer}</span>
              ) : (
                <span className="flex items-center gap-2 text-rose-400/60 text-xs">
                  <Eye className="w-4 h-4" />
                  Swipe to reveal answer
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryQuizDisplay;
