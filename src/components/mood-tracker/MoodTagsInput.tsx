import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MoodTag, TAG_CATEGORIES, TAG_OPTIONS } from './types';

interface MoodTagsInputProps {
  selectedTags: MoodTag[];
  onTagsChange: (tags: MoodTag[]) => void;
}

const MoodTagsInput: React.FC<MoodTagsInputProps> = ({ selectedTags, onTagsChange }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const toggleTag = (tag: MoodTag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Get frequently used tags (first 2 from each category for quick access)
  const quickTags = TAG_CATEGORIES.flatMap((cat) => cat.tags.slice(0, 2));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Context Tags (optional)</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="text-xs h-7"
        >
          {showAll ? 'Show Less' : `Show All (${TAG_OPTIONS.length})`}
        </Button>
      </div>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-muted/50 rounded-md">
          <span className="text-xs text-muted-foreground mr-1">Selected:</span>
          {selectedTags.map((tagValue) => {
            const option = TAG_OPTIONS.find((o) => o.value === tagValue);
            if (!option) return null;
            return (
              <Badge
                key={tagValue}
                variant="default"
                className="cursor-pointer bg-primary hover:bg-primary/90 text-xs"
                onClick={() => toggleTag(tagValue)}
              >
                <span className="mr-1">{option.emoji}</span>
                {option.label} ×
              </Badge>
            );
          })}
        </div>
      )}

      {!showAll ? (
        /* Quick tags view */
        <div className="flex flex-wrap gap-2">
          {quickTags.map((option) => {
            const isSelected = selectedTags.includes(option.value);
            return (
              <Badge
                key={option.value}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all text-xs ${
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
      ) : (
        /* Full categorized view */
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {TAG_CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.includes(category.name);
            const selectedInCategory = category.tags.filter((t) =>
              selectedTags.includes(t.value)
            ).length;

            return (
              <Collapsible
                key={category.name}
                open={isExpanded}
                onOpenChange={() => toggleCategory(category.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between h-8 px-2 hover:bg-muted"
                  >
                    <span className="text-sm font-medium">
                      {category.name}
                      {selectedInCategory > 0 && (
                        <Badge variant="secondary" className="ml-2 h-5 text-xs">
                          {selectedInCategory}
                        </Badge>
                      )}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-1">
                  <div className="flex flex-wrap gap-1.5 pl-2">
                    {category.tags.map((option) => {
                      const isSelected = selectedTags.includes(option.value);
                      return (
                        <Badge
                          key={option.value}
                          variant={isSelected ? 'default' : 'outline'}
                          className={`cursor-pointer transition-all text-xs ${
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
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
      </p>
    </div>
  );
};

export default MoodTagsInput;
