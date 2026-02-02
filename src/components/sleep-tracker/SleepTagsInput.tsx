import React from 'react';
import { Label } from '@/components/ui/label';
import { SleepTag, TAG_OPTIONS } from './types';
import { cn } from '@/lib/utils';

interface SleepTagsInputProps {
  selectedTags: SleepTag[];
  onTagsChange: (tags: SleepTag[]) => void;
}

const SleepTagsInput: React.FC<SleepTagsInputProps> = ({ selectedTags, onTagsChange }) => {
  const toggleTag = (tag: SleepTag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Sleep Factors (optional)</Label>
      <div className="flex flex-wrap gap-2">
        {TAG_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleTag(option.value)}
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors border",
              selectedTags.includes(option.value)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 hover:bg-muted border-border"
            )}
          >
            <span>{option.emoji}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Track factors that might affect your sleep quality
      </p>
    </div>
  );
};

export default SleepTagsInput;
