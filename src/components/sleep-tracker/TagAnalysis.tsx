import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from 'lucide-react';
import { SleepEntry, TAG_OPTIONS } from './types';
import { getTagAnalysis, formatDuration } from './utils';

interface TagAnalysisProps {
  entries: SleepEntry[];
}

const TagAnalysis: React.FC<TagAnalysisProps> = ({ entries }) => {
  const analysis = getTagAnalysis(entries);

  if (analysis.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Tags className="w-5 h-5 text-primary" />
          Sleep Factor Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {analysis.map(({ tag, avgDuration, count }) => {
            const tagInfo = TAG_OPTIONS.find(t => t.value === tag);
            return (
              <div key={tag} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tagInfo?.emoji}</span>
                  <div>
                    <p className="font-medium text-sm">{tagInfo?.label}</p>
                    <p className="text-xs text-muted-foreground">{count} nights</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatDuration(avgDuration)}</p>
                  <p className="text-xs text-muted-foreground">avg sleep</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Compare your average sleep duration across different factors
        </p>
      </CardContent>
    </Card>
  );
};

export default TagAnalysis;
