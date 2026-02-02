import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MoodTag, TAG_OPTIONS } from './types';

interface MoodTagsInputProps {
  selectedTags: MoodTag[];
  onTagsChange: (tags: MoodTag[]) => void;
}

const MoodTagsInput: React.FC<MoodTagsInputProps> = ({ selectedTags, onTagsChange }) => {
  const toggleTag = (tag: MoodTag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Context Tags (optional)</p>
      <div className="flex flex-wrap gap-2">
        {TAG_OPTIONS.map((option) => {
          const isSelected = selectedTags.includes(option.value);
          return (
            <Badge
              key={option.value}
              variant={isSelected ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'bg-primary hover:bg-primary/90'
                  : 'hover:bg-primary/10'
              }`}
              onClick={() => toggleTag(option.value)}
            >
              <span className="mr-1">{option.emoji}</span>
              {option.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default MoodTagsInput;
