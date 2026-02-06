import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DaySelection, DayContentData } from "./types";
import { dayContent, dayMessages } from "@/data/valentineData";

interface DayMessageSelectorProps {
  onComplete: (selections: DaySelection[]) => void;
  onBack: () => void;
}

const DayMessageSelector = ({ onComplete, onBack }: DayMessageSelectorProps) => {
  // Calculate which day of Valentine's week it is (Feb 7-14, 2026)
  const getCurrentValentineDay = (): number => {
    const now = new Date();
    const feb7 = new Date(2026, 1, 7); // Feb 7, 2026
    const feb14 = new Date(2026, 1, 14); // Feb 14, 2026
    if (now < feb7) return 1;
    if (now > feb14) return 8;
    const diff = Math.floor((now.getTime() - feb7.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(diff + 1, 8);
  };

  const currentDay = getCurrentValentineDay();
  const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set([currentDay]));
  const [expandedDay, setExpandedDay] = useState<number | null>(currentDay);
  const [selectedMessages, setSelectedMessages] = useState<Record<number, Set<number>>>({});

  const toggleDay = (dayNum: number) => {
    setSelectedDays(prev => {
      const next = new Set(prev);
      if (next.has(dayNum)) {
        next.delete(dayNum);
        // Clear messages for this day
        setSelectedMessages(prev => {
          const copy = { ...prev };
          delete copy[dayNum];
          return copy;
        });
        // Collapse if it was expanded
        if (expandedDay === dayNum) setExpandedDay(null);
      } else {
        next.add(dayNum);
        // Auto-expand the newly selected day
        setExpandedDay(dayNum);
      }
      return next;
    });
  };

  const toggleExpand = (dayNum: number) => {
    setExpandedDay(prev => prev === dayNum ? null : dayNum);
  };

  const toggleMessage = (dayNum: number, msgIndex: number) => {
    setSelectedMessages(prev => {
      const current = prev[dayNum] || new Set();
      const next = new Set(current);
      if (next.has(msgIndex)) {
        next.delete(msgIndex);
      } else {
        if (next.size >= 3) return prev; // max 3
        next.add(msgIndex);
      }
      return { ...prev, [dayNum]: next };
    });
  };

  const getSelectedCount = (dayNum: number): number => {
    return selectedMessages[dayNum]?.size || 0;
  };

  const handleGenerate = () => {
    const selections: DaySelection[] = Array.from(selectedDays)
      .sort((a, b) => a - b)
      .map(dayNum => ({
        dayNumber: dayNum,
        messageIndices: Array.from(selectedMessages[dayNum] || []),
      }));
    onComplete(selections);
  };

  const totalSelected = Array.from(selectedDays).reduce((sum, d) => sum + getSelectedCount(d), 0);

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold text-white mb-1">Choose Days & Messages</h2>
        <p className="text-rose-300/60 text-xs">
          Select which days to include & pick up to 3 messages per day
        </p>
      </div>

      <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
        {dayContent.map((day) => {
          const isSelected = selectedDays.has(day.day);
          const isExpanded = expandedDay === day.day;
          const msgCount = getSelectedCount(day.day);
          const messages = dayMessages[day.day - 1] || [];

          return (
            <div
              key={day.day}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? "bg-rose-500/10 border-rose-500/30"
                  : "bg-white/5 border-white/10 opacity-60"
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center gap-2 p-3">
                <button
                  type="button"
                  onClick={() => toggleDay(day.day)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? "bg-rose-500 border-rose-500"
                      : "border-rose-500/40 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-lg">{day.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-100 text-xs font-semibold">Day {day.day}</span>
                    <span className="text-rose-300 text-xs">— {day.name}</span>
                  </div>
                  <span className="text-rose-400/50 text-[10px] block">
                    {day.weekday}, {day.date}
                  </span>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-2 shrink-0">
                    {msgCount > 0 && (
                      <span className="text-[10px] text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded-full">
                        {msgCount}/3
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleExpand(day.day)}
                      className="text-rose-300/60 hover:text-rose-300 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Messages List */}
              {isSelected && isExpanded && (
                <div className="border-t border-rose-500/15 px-3 py-2">
                  <p className="text-rose-400/50 text-[10px] mb-2">
                    Pick up to 3 messages to send ({msgCount}/3 selected)
                  </p>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {messages.map((msg, i) => {
                      const isChecked = selectedMessages[day.day]?.has(i) || false;
                      const isDisabled = !isChecked && msgCount >= 3;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => !isDisabled && toggleMessage(day.day, i)}
                          className={`w-full text-left p-2 rounded-lg text-[11px] leading-snug transition-all flex gap-2 items-start ${
                            isChecked
                              ? "bg-rose-500/20 border border-rose-400/40 text-rose-100"
                              : isDisabled
                              ? "bg-white/3 text-rose-400/30 cursor-not-allowed"
                              : "bg-white/5 text-rose-300/70 hover:bg-white/10 border border-transparent"
                          }`}
                          disabled={isDisabled}
                        >
                          <span className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center ${
                            isChecked ? "bg-rose-500 border-rose-500" : "border-rose-500/30"
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                          </span>
                          <span className="flex-1">"{msg}"</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 border-rose-500/30 text-rose-200 hover:bg-white/10 bg-transparent"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={selectedDays.size === 0}
          className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-rose-500/25"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate ({selectedDays.size} days)
        </Button>
      </div>
    </div>
  );
};

export default DayMessageSelector;
