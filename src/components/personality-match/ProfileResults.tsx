import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PersonalityProfile } from './types';
import { getMBTIName, loveLanguageLabels } from './calculations';
import { User, Brain, Heart, Users, Target, Trash2, Sparkles } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface ProfileResultsProps {
  profile: PersonalityProfile;
  onCompare?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const ProfileResults: React.FC<ProfileResultsProps> = ({ 
  profile, 
  onCompare, 
  onDelete,
  showActions = true 
}) => {
  const mbtiType = profile.mbtiType || 'N/A';
  const mbtiName = getMBTIName(mbtiType);

  const bigFiveData = [
    { trait: 'Openness', value: profile.traits.openness },
    { trait: 'Conscientiousness', value: profile.traits.conscientiousness },
    { trait: 'Extraversion', value: profile.traits.extraversion },
    { trait: 'Agreeableness', value: profile.traits.agreeableness },
    { trait: 'Stability', value: 100 - profile.traits.neuroticism },
  ];

  const emotionalData = [
    { label: 'Emotional Intelligence', value: profile.traits.emotionalIntelligence },
    { label: 'Empathy', value: profile.traits.empathy },
    { label: 'Resilience', value: profile.traits.resilience },
  ];

  const socialData = [
    { label: 'Social Energy', value: profile.traits.socialEnergy },
    { label: 'Adventurousness', value: profile.traits.adventurousness },
    { label: 'Communication', value: profile.traits.communicationStyle },
  ];

  const valuesData = [
    { label: 'Family Orientation', value: profile.traits.familyOrientation },
    { label: 'Career Drive', value: profile.traits.careerDrive },
    { label: 'Traditionalism', value: profile.traits.traditionalism },
    { label: 'Spirituality', value: profile.traits.spirituality },
  ];

  const getTraitLevel = (value: number): { label: string; color: string } => {
    if (value >= 80) return { label: 'Very High', color: 'text-green-600' };
    if (value >= 60) return { label: 'High', color: 'text-emerald-600' };
    if (value >= 40) return { label: 'Moderate', color: 'text-amber-600' };
    if (value >= 20) return { label: 'Low', color: 'text-orange-600' };
    return { label: 'Very Low', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">
                {profile.age} years old • {profile.location}
              </p>
              {profile.bio && (
                <p className="text-sm text-muted-foreground mt-2 italic">"{profile.bio}"</p>
              )}
            </div>
            <div className="text-center">
              <Badge className="bg-green-700 text-lg px-4 py-2">
                {mbtiType}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">{mbtiName}</p>
            </div>
          </div>
          
          {showActions && (
            <div className="flex gap-3 mt-6 justify-center md:justify-end">
              {onCompare && (
                <Button onClick={onCompare} className="bg-green-700 hover:bg-green-800 gap-2">
                  <Users className="h-4 w-4" />
                  Compare Profiles
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" onClick={onDelete} className="gap-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Big Five Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Big Five Personality Traits
            </CardTitle>
            <CardDescription>Your core personality dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={bigFiveData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Traits"
                  dataKey="value"
                  stroke="#15803d"
                  fill="#22c55e"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Love Language & Attachment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Relationship Style
            </CardTitle>
            <CardDescription>How you connect with others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Sparkles className="h-8 w-8 mx-auto text-pink-500 mb-2" />
              <p className="text-sm text-muted-foreground">Primary Love Language</p>
              <p className="text-xl font-semibold text-pink-600">
                {loveLanguageLabels[profile.traits.loveLanguage] || profile.traits.loveLanguage}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Attachment Style</span>
                  <span className={getTraitLevel(profile.traits.attachment).color}>
                    {getTraitLevel(profile.traits.attachment).label}
                  </span>
                </div>
                <Progress value={profile.traits.attachment} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Conflict Resolution</span>
                  <span className={getTraitLevel(profile.traits.conflictResolution).color}>
                    {getTraitLevel(profile.traits.conflictResolution).label}
                  </span>
                </div>
                <Progress value={profile.traits.conflictResolution} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Intelligence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Emotional Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emotionalData.map((item) => {
              const level = getTraitLevel(item.value);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className={level.color}>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Social & Lifestyle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Social & Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialData.map((item) => {
              const level = getTraitLevel(item.value);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className={level.color}>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Values & Future */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Values & Life Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {valuesData.map((item) => {
                const level = getTraitLevel(item.value);
                return (
                  <div key={item.label} className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className={`text-2xl font-bold ${level.color}`}>{item.value}%</p>
                    <p className="text-xs text-muted-foreground">{level.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileResults;
