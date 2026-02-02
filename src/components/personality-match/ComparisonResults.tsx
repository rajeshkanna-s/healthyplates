import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { PersonalityProfile, CompatibilityResult } from './types';
import { getMBTIName, loveLanguageLabels } from './calculations';
import { exportCompatibilityReport } from './exportUtils';
import {
  Heart,
  Download,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Users,
  Sparkles,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface ComparisonResultsProps {
  male: PersonalityProfile;
  female: PersonalityProfile;
  result: CompatibilityResult;
  onBack: () => void;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({
  male,
  female,
  result,
  onBack,
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'hsl(var(--chart-2))';
    if (score >= 60) return 'hsl(var(--chart-4))';
    if (score >= 40) return 'hsl(var(--chart-5))';
    return 'hsl(var(--destructive))';
  };

  const bigFiveData = [
    { trait: 'Openness', male: male.traits.openness, female: female.traits.openness },
    { trait: 'Conscientiousness', male: male.traits.conscientiousness, female: female.traits.conscientiousness },
    { trait: 'Extraversion', male: male.traits.extraversion, female: female.traits.extraversion },
    { trait: 'Agreeableness', male: male.traits.agreeableness, female: female.traits.agreeableness },
    { trait: 'Stability', male: 100 - male.traits.neuroticism, female: 100 - female.traits.neuroticism },
  ];

  const traitComparisonData = Object.entries(result.traitScores)
    .slice(0, 10)
    .map(([trait, score]) => ({
      trait: trait.replace(/([A-Z])/g, ' $1').trim(),
      score,
      fill: score >= 70 ? 'hsl(var(--chart-2))' : score >= 50 ? 'hsl(var(--chart-4))' : 'hsl(var(--chart-5))',
    }));

  const handleExport = () => {
    exportCompatibilityReport(male, female, result);
  };

  const maleMBTI = male.mbtiType || 'N/A';
  const femaleMBTI = female.mbtiType || 'N/A';

  return (
    <div className="space-y-6">
      {/* Compatibility Score Header */}
      <Card className="bg-gradient-to-r from-pink-50 via-red-50 to-pink-50 border-pink-200">
        <CardContent className="py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-blue-300">
                  {male.name.charAt(0)}
                </div>
                <p className="text-sm font-medium mt-1">{male.name}</p>
              </div>
              <Heart className="h-10 w-10 text-pink-500 animate-pulse" />
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-bold text-pink-600 border-2 border-pink-300">
                  {female.name.charAt(0)}
                </div>
                <p className="text-sm font-medium mt-1">{female.name}</p>
              </div>
            </div>

            <div className="mb-4">
              <div 
                className="text-6xl font-bold"
                style={{ color: getScoreColor(result.overallScore) }}
              >
                {result.overallScore}%
              </div>
              <p className="text-lg text-muted-foreground">Compatibility Score</p>
            </div>

            <Badge className="bg-primary text-lg px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              {result.personalityTypeMatch}
            </Badge>

            <p className="text-sm text-muted-foreground mt-3">
              {getMBTIName(maleMBTI)} ({maleMBTI}) × {getMBTIName(femaleMBTI)} ({femaleMBTI})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Profile Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Attribute</th>
                  <th className="text-center py-2 font-medium text-blue-600">{male.name}</th>
                  <th className="text-center py-2 font-medium text-pink-600">{female.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2">Age</td>
                  <td className="text-center py-2">{male.age}</td>
                  <td className="text-center py-2">{female.age}</td>
                </tr>
                <tr>
                  <td className="py-2">Location</td>
                  <td className="text-center py-2">{male.location}</td>
                  <td className="text-center py-2">{female.location}</td>
                </tr>
                <tr>
                  <td className="py-2">Personality Type</td>
                  <td className="text-center py-2">{maleMBTI}</td>
                  <td className="text-center py-2">{femaleMBTI}</td>
                </tr>
                <tr>
                  <td className="py-2">Love Language</td>
                  <td className="text-center py-2">{loveLanguageLabels[male.traits.loveLanguage]}</td>
                  <td className="text-center py-2">{loveLanguageLabels[female.traits.loveLanguage]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Big Five Comparison Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Big Five Comparison</CardTitle>
            <CardDescription>Personality trait overlay</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={bigFiveData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name={male.name}
                  dataKey="male"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.3}
                />
                <Radar
                  name={female.name}
                  dataKey="female"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trait Match Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Trait Match Scores</CardTitle>
            <CardDescription>How well each trait aligns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={traitComparisonData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="trait" width={100} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {traitComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Matched Traits & Differences */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Matched Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.matchedTraits.length > 0 ? (
                result.matchedTraits.map((trait) => (
                  <Badge key={trait} variant="secondary" className="bg-green-100 text-green-700">
                    {trait}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Few exact matches, but differences can complement!</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              Key Differences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.differences.length > 0 ? (
                result.differences.map((diff) => (
                  <Badge key={diff} variant="secondary" className="bg-amber-100 text-amber-700">
                    {diff}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Very few differences - strong alignment!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <TrendingUp className="h-5 w-5" />
            Relationship Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Potential Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">{challenge}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Lightbulb className="h-5 w-5" />
            Suggestions for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={onBack}>
          Back to Profiles
        </Button>
        <Button onClick={handleExport} className="bg-primary gap-2">
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
};

export default ComparisonResults;
