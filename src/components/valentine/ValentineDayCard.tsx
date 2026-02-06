import { useState } from "react";
import { ArrowLeft, Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DayContentData } from "./types";

interface ValentineDayCardProps {
  dayContent: DayContentData;
  bonusMessage: string;
  allMessages: string[];
  partnerName: string;
  yourName: string;
  onBack: () => void;
}

const ValentineDayCard = ({ dayContent: day, bonusMessage, allMessages, partnerName, yourName, onBack }: ValentineDayCardProps) => {
  const [accepted, setAccepted] = useState(false);
  const [showMoreMessages, setShowMoreMessages] = useState(false);
  const [revealedPromises, setRevealedPromises] = useState<Set<number>>(new Set());
  const [visibleMessages, setVisibleMessages] = useState(5);

  const togglePromise = (index: number) => {
    setRevealedPromises((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-950 to-pink-950 flex flex-col relative overflow-auto">
      {/* Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-rose-500/20 rounded-full px-4 py-2 text-rose-200 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-12 max-w-lg mx-auto w-full">
        {/* Day Badge */}
        <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 rounded-full px-4 py-1.5 mb-6">
          <span className="text-sm text-rose-300 font-medium">Day {day.day} — {day.name}</span>
        </div>

        {/* Emoji */}
        <div className="text-6xl sm:text-7xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
          {day.emoji}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 leading-tight">
          {day.title}
        </h1>

        {/* Main Text */}
        <div className="bg-black/20 backdrop-blur-sm border border-rose-500/15 rounded-2xl p-6 mb-6 w-full">
          <p className="text-rose-100/90 text-center leading-relaxed whitespace-pre-line">
            {day.text}
          </p>
        </div>

        {/* Promises (Day 5) */}
        {day.promises && (
          <div className="w-full space-y-2 mb-6">
            <p className="text-rose-300/60 text-xs text-center mb-3">Tap to reveal each promise</p>
            {day.promises.map((promise, i) => (
              <button
                key={i}
                onClick={() => togglePromise(i)}
                className={`w-full p-3 rounded-xl border transition-all text-sm font-medium ${
                  revealedPromises.has(i)
                    ? "bg-rose-500/20 border-rose-400 text-rose-100"
                    : "bg-white/5 border-rose-500/20 text-rose-300/60"
                }`}
              >
                {revealedPromises.has(i) ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                    {promise}
                  </span>
                ) : (
                  <span>Tap to reveal promise {i + 1} ✨</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={() => setAccepted(true)}
          disabled={accepted}
          className={`px-8 py-6 text-base font-semibold rounded-xl transition-all ${
            accepted
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-500/25"
          }`}
        >
          {accepted ? (
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5" fill="currentColor" /> Accepted with Love
            </span>
          ) : (
            day.buttonText
          )}
        </Button>

        {/* Mini Line */}
        <p className="text-rose-400/50 text-xs mt-4">{day.miniLine}</p>

        {/* Bonus Message */}
        {bonusMessage && (
          <div className="mt-8 w-full">
            <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/15 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300 text-xs font-medium">Special message for {partnerName}</span>
              </div>
              <p className="text-rose-100/80 text-sm italic leading-relaxed text-center">
                "{bonusMessage}"
              </p>
              <p className="text-rose-400/40 text-xs text-right mt-2">— {yourName}</p>
            </div>
          </div>
        )}

        {/* More Messages */}
        <div className="mt-6 w-full">
          <button
            onClick={() => setShowMoreMessages(!showMoreMessages)}
            className="flex items-center gap-2 text-rose-300/60 text-xs hover:text-rose-300 transition-colors mx-auto"
          >
            {showMoreMessages ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showMoreMessages ? "Hide" : "More"} love messages ({allMessages.length})
          </button>
          {showMoreMessages && (
            <div className="mt-4 space-y-3">
              {allMessages.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} className="bg-white/5 border border-rose-500/10 rounded-xl p-3">
                  <p className="text-rose-200/70 text-xs italic">"{msg}"</p>
                </div>
              ))}
              {visibleMessages < allMessages.length && (
                <button
                  onClick={() => setVisibleMessages((v) => Math.min(v + 10, allMessages.length))}
                  className="text-rose-400 text-xs hover:text-rose-300 mx-auto block"
                >
                  Load more...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValentineDayCard;
