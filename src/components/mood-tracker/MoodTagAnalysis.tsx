import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, TrendingUp, TrendingDown } from 'lucide-react';
import { MoodEntry, TAG_OPTIONS } from './types';
import { getTagAnalysis, getMoodEmoji } from './utils';

interface MoodTagAnalysisProps {
  entries: MoodEntry[];
}

const MoodTagAnalysis: React.FC<MoodTagAnalysisProps> = ({ entries }) => {
  const tagAnalysis = getTagAnalysis(entries);

  if (tagAnalysis.length === 0) {
    return null;
  }

  const getTagInfo = (tag: string) => {
    return TAG_OPTIONS.find((t) => t.value === tag);
  };

  const overallAvg = entries.length > 0 
    ? entries.reduce((sum, e) => sum + e.mood, 0) / entries.length 
    : 3;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          Mood by Context
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          How different factors affect your mood
        </p>
        
        <div className="space-y-3">
          {tagAnalysis.map((analysis) => {
            const tagInfo = getTagInfo(analysis.tag);
            const isAboveAvg = analysis.avgMood > overallAvg;
            const diff = Math.abs(analysis.avgMood - overallAvg);
            
            return (
              <div
                key={analysis.tag}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tagInfo?.emoji}</span>
                  <div>
                    <p className="font-medium">{tagInfo?.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {analysis.count} {analysis.count === 1 ? 'entry' : 'entries'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(Math.round(analysis.avgMood))}</span>
                  <div className="text-right">
                    <p className="font-medium">{analysis.avgMood.toFixed(1)}</p>
                    {diff > 0.2 && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          isAboveAvg 
                            ? 'text-primary border-primary/30' 
                            : 'text-destructive border-destructive/30'
                        }`}
                      >
                        {isAboveAvg ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {diff.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Compared to your overall average of {overallAvg.toFixed(1)}
        </p>
      </CardContent>
    </Card>
  );
};

export default MoodTagAnalysis;
