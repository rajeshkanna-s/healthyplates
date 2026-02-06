import { useState } from "react";
import { Plus, X, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemoryQuizItem } from "./types";

interface MemoryQuizInputProps {
  items: MemoryQuizItem[];
  onChange: (items: MemoryQuizItem[]) => void;
}

const PLACEHOLDERS = [
  { question: "Where did we first meet?", answer: "Coffee shop" },
  { question: "Favorite food?", answer: "Biryani" },
  { question: "Our song?", answer: "Unaley unaley song" },
];

const MemoryQuizInput = ({ items, onChange }: MemoryQuizInputProps) => {
  const addItem = () => {
    if (items.length >= 5) return;
    onChange([...items, { question: "", answer: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: "question" | "answer", value: string) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-rose-400" />
        <Label className="text-rose-200 text-xs">
          Memory Quiz For Partner <span className="text-rose-400/50">(Optional)</span>
        </Label>
      </div>
      <p className="text-rose-400/50 text-[10px]">
        Add fun questions about your relationship. Partner will see questions with hidden answers they can reveal!
      </p>

      {items.map((item, i) => (
        <div key={i} className="bg-white/5 border border-rose-500/15 rounded-xl p-3 space-y-2 relative">
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="absolute top-2 right-2 text-rose-400/50 hover:text-rose-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <Input
            value={item.question}
            onChange={(e) => updateItem(i, "question", e.target.value)}
            placeholder={PLACEHOLDERS[i]?.question || "Your question..."}
            className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/30 focus-visible:ring-rose-500 h-9 text-xs"
            maxLength={100}
          />
          <Input
            value={item.answer}
            onChange={(e) => updateItem(i, "answer", e.target.value)}
            placeholder={PLACEHOLDERS[i]?.answer || "Answer..."}
            className="bg-white/10 border-rose-500/30 text-white placeholder:text-rose-300/30 focus-visible:ring-rose-500 h-9 text-xs"
            maxLength={100}
          />
        </div>
      ))}

      {items.length < 5 && (
        <button
          type="button"
          onClick={addItem}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed border-rose-500/20 text-rose-300/60 hover:border-rose-400/40 hover:text-rose-300 transition-colors text-xs"
        >
          <Plus className="w-4 h-4" />
          Add Question ({items.length}/5)
        </button>
      )}
    </div>
  );
};

export default MemoryQuizInput;
