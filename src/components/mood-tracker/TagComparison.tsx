import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GitCompareArrows, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MoodEntry, TAG_OPTIONS, MoodTag } from './types';
import { getMoodEmoji } from './utils';

interface TagComparisonProps {
  entries: MoodEntry[];
}

interface TagStats {
  tag: MoodTag;
  label: string;
  emoji: string;
  avgMood: number;
  count: number;
}

const TagComparison: React.FC<TagComparisonProps> = ({ entries }) => {
  const [tagA, setTagA] = useState<MoodTag | ''>('');
  const [tagB, setTagB] = useState<MoodTag | ''>('');

  // Compute stats for all tags
  const allTagStats = useMemo((): TagStats[] => {
    const tagMap = new Map<MoodTag, { total: number; count: number }>();

    entries.forEach((entry) => {
      entry.tags.forEach((tag) => {
        const existing = tagMap.get(tag) || { total: 0, count: 0 };
        existing.total += entry.mood;
        existing.count++;
        tagMap.set(tag, existing);
      });
    });

    const stats: TagStats[] = [];
    tagMap.forEach((data, tag) => {
      const tagInfo = TAG_OPTIONS.find((t) => t.value === tag);
      if (tagInfo) {
        stats.push({
          tag,
          label: tagInfo.label,
          emoji: tagInfo.emoji,
          avgMood: data.total / data.count,
          count: data.count,
        });
      }
    });

    return stats.sort((a, b) => b.avgMood - a.avgMood);
  }, [entries]);

  const statsA = useMemo(() => {
    return tagA ? allTagStats.find((s) => s.tag === tagA) : null;
  }, [tagA, allTagStats]);

  const statsB = useMemo(() => {
    return tagB ? allTagStats.find((s) => s.tag === tagB) : null;
  }, [tagB, allTagStats]);

  const comparison = useMemo(() => {
    if (!statsA || !statsB) return null;
    const diff = statsA.avgMood - statsB.avgMood;
    return {
      diff,
      winner: diff > 0.1 ? 'A' : diff < -0.1 ? 'B' : 'tie',
    };
  }, [statsA, statsB]);

  if (allTagStats.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GitCompareArrows className="w-5 h-5 text-primary" />
          Tag Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Compare how different factors affect your mood
        </p>

        {/* Tag Leaderboard */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            All Tags Ranked by Average Mood
          </p>
          <div className="space-y-1.5">
            {allTagStats.map((stat, index) => (
              <div
                key={stat.tag}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground w-5">
                    #{index + 1}
                  </span>
                  <span>{stat.emoji}</span>
                  <span className="text-sm font-medium">{stat.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {stat.count} days
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getMoodEmoji(Math.round(stat.avgMood))}</span>
                  <span className="text-sm font-medium">{stat.avgMood.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tag Comparison Tool */}
        <div className="border-t pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Compare Two Tags
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <Select value={tagA} onValueChange={(v) => setTagA(v as MoodTag)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tag A" />
              </SelectTrigger>
              <SelectContent>
                {allTagStats.map((stat) => (
                  <SelectItem key={stat.tag} value={stat.tag}>
                    {stat.emoji} {stat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={tagB} onValueChange={(v) => setTagB(v as MoodTag)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tag B" />
              </SelectTrigger>
              <SelectContent>
                {allTagStats.map((stat) => (
                  <SelectItem key={stat.tag} value={stat.tag}>
                    {stat.emoji} {stat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comparison Results */}
          {statsA && statsB && comparison && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tag A */}
              <div
                className={`p-3 rounded-lg border-2 ${
                  comparison.winner === 'A'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : 'border-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{statsA.emoji}</span>
                  <span className="font-medium">{statsA.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(Math.round(statsA.avgMood))}</span>
                  <div>
                    <p className="text-lg font-bold">{statsA.avgMood.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{statsA.count} entries</p>
                  </div>
                </div>
              </div>

              {/* Comparison Icon */}
              <div className="flex items-center justify-center">
                {comparison.winner === 'A' ? (
                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <span className="text-xs text-muted-foreground mt-1">
                      +{Math.abs(comparison.diff).toFixed(2)}
                    </span>
                  </div>
                ) : comparison.winner === 'B' ? (
                  <div className="flex flex-col items-center">
                    <TrendingDown className="w-6 h-6 text-orange-500" />
                    <span className="text-xs text-muted-foreground mt-1">
                      -{Math.abs(comparison.diff).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Minus className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Similar</span>
                  </div>
                )}
              </div>

              {/* Tag B */}
              <div
                className={`p-3 rounded-lg border-2 ${
                  comparison.winner === 'B'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : 'border-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{statsB.emoji}</span>
                  <span className="font-medium">{statsB.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(Math.round(statsB.avgMood))}</span>
                  <div>
                    <p className="text-lg font-bold">{statsB.avgMood.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{statsB.count} entries</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Insight Text */}
          {statsA && statsB && comparison && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
              {comparison.winner === 'A' ? (
                <p>
                  When you tag days with <strong>{statsA.emoji} {statsA.label}</strong>, your average mood is{' '}
                  <strong>{Math.abs(comparison.diff).toFixed(2)} points higher</strong> than days with{' '}
                  <strong>{statsB.emoji} {statsB.label}</strong>.
                </p>
              ) : comparison.winner === 'B' ? (
                <p>
                  When you tag days with <strong>{statsB.emoji} {statsB.label}</strong>, your average mood is{' '}
                  <strong>{Math.abs(comparison.diff).toFixed(2)} points higher</strong> than days with{' '}
                  <strong>{statsA.emoji} {statsA.label}</strong>.
                </p>
              ) : (
                <p>
                  Your mood is similar on days with <strong>{statsA.emoji} {statsA.label}</strong> and{' '}
                  <strong>{statsB.emoji} {statsB.label}</strong> (within 0.1 points).
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagComparison;
