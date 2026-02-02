import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PersonalityProfile, CompatibilityResult } from './types';
import {
  getProfiles,
  getProfilesByGender,
  saveProfile,
  deleteProfile,
  calculateTraits,
  calculateMBTI,
  calculateCompatibility,
  generateProfileId,
} from './calculations';
import ProfileForm from './ProfileForm';
import Questionnaire from './Questionnaire';
import ProfileResults from './ProfileResults';
import ComparisonResults from './ComparisonResults';
import {
  Heart,
  Users,
  UserPlus,
  Sparkles,
  ArrowRight,
  Trash2,
  RotateCcw,
} from 'lucide-react';

type ViewMode = 'home' | 'create-profile' | 'questionnaire' | 'profile-result' | 'compare-select' | 'compare-result';

const PersonalityMatchApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [profiles, setProfiles] = useState<PersonalityProfile[]>([]);
  const [currentProfileData, setCurrentProfileData] = useState<{
    name: string;
    age: number;
    gender: 'male' | 'female';
    location: string;
    bio: string;
  } | null>(null);
  const [currentProfile, setCurrentProfile] = useState<PersonalityProfile | null>(null);
  const [selectedMale, setSelectedMale] = useState<string>('');
  const [selectedFemale, setSelectedFemale] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<{
    male: PersonalityProfile;
    female: PersonalityProfile;
    result: CompatibilityResult;
  } | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    setProfiles(getProfiles());
  };

  const handleProfileSubmit = (data: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    location: string;
    bio: string;
  }) => {
    setCurrentProfileData(data);
    setViewMode('questionnaire');
  };

  const handleQuestionnaireComplete = (answers: Record<string, number>) => {
    if (!currentProfileData) return;

    const traits = calculateTraits(answers);
    const mbtiType = calculateMBTI(traits);

    const newProfile: PersonalityProfile = {
      id: generateProfileId(),
      ...currentProfileData,
      createdAt: new Date().toISOString(),
      answers,
      traits,
      mbtiType,
    };

    saveProfile(newProfile);
    setCurrentProfile(newProfile);
    loadProfiles();
    setCurrentProfileData(null);
    setViewMode('profile-result');
    toast.success('Profile created successfully!');
  };

  const handleDeleteProfile = (id: string) => {
    deleteProfile(id);
    loadProfiles();
    if (currentProfile?.id === id) {
      setCurrentProfile(null);
      setViewMode('home');
    }
    toast.success('Profile deleted');
  };

  const handleCompare = () => {
    const male = profiles.find(p => p.id === selectedMale);
    const female = profiles.find(p => p.id === selectedFemale);

    if (!male || !female) {
      toast.error('Please select both profiles');
      return;
    }

    const result = calculateCompatibility(male, female);
    setComparisonResult({ male, female, result });
    setViewMode('compare-result');
  };

  const maleProfiles = getProfilesByGender('male');
  const femaleProfiles = getProfilesByGender('female');

  const resetAll = () => {
    localStorage.removeItem('personality_profiles');
    localStorage.removeItem('personality_comparisons');
    loadProfiles();
    setViewMode('home');
    toast.success('All data cleared');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-10 w-10 text-pink-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Personality Match
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover your personality traits, understand your compatibility with others, 
          and get personalized insights for better relationships.
        </p>
      </div>

      {/* Home View */}
      {viewMode === 'home' && (
        <div className="space-y-8">
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
              onClick={() => setViewMode('create-profile')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-6 w-6 text-primary" />
                  Create New Profile
                </CardTitle>
                <CardDescription>
                  Take our comprehensive personality assessment with 100 questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline">Big Five</Badge>
                    <Badge variant="outline">MBTI</Badge>
                    <Badge variant="outline">Love Language</Badge>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`hover:shadow-lg transition-shadow ${
                maleProfiles.length > 0 && femaleProfiles.length > 0 
                  ? 'cursor-pointer border-2 hover:border-pink-500' 
                  : 'opacity-60'
              }`}
              onClick={() => {
                if (maleProfiles.length > 0 && femaleProfiles.length > 0) {
                  setViewMode('compare-select');
                }
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  Compare Profiles
                </CardTitle>
                <CardDescription>
                  {maleProfiles.length > 0 && femaleProfiles.length > 0
                    ? 'Get compatibility scores and relationship insights'
                    : 'Create at least one male and one female profile first'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {maleProfiles.length} Male • {femaleProfiles.length} Female profiles
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Existing Profiles */}
          {profiles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Saved Profiles ({profiles.length})
                </h2>
                <Button variant="outline" size="sm" onClick={resetAll} className="gap-2 text-destructive">
                  <RotateCcw className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profile) => (
                  <Card key={profile.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white ${
                          profile.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          {profile.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{profile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {profile.age} • {profile.gender} • {profile.mbtiType}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setCurrentProfile(profile);
                            setViewMode('profile-result');
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => handleDeleteProfile(profile.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <Separator />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-primary">100</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary">20</div>
              <div className="text-sm text-muted-foreground">Mandatory</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary">18+</div>
              <div className="text-sm text-muted-foreground">Trait Analysis</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary">PDF</div>
              <div className="text-sm text-muted-foreground">Report Export</div>
            </div>
          </div>
        </div>
      )}

      {/* Create Profile View */}
      {viewMode === 'create-profile' && (
        <div>
          <Button variant="ghost" onClick={() => setViewMode('home')} className="mb-4">
            ← Back
          </Button>
          <ProfileForm onSubmit={handleProfileSubmit} initialData={currentProfileData || undefined} />
        </div>
      )}

      {/* Questionnaire View */}
      {viewMode === 'questionnaire' && currentProfileData && (
        <Questionnaire
          gender={currentProfileData.gender}
          onComplete={handleQuestionnaireComplete}
          onBack={() => setViewMode('create-profile')}
        />
      )}

      {/* Profile Result View */}
      {viewMode === 'profile-result' && currentProfile && (
        <div>
          <Button variant="ghost" onClick={() => setViewMode('home')} className="mb-4">
            ← Back to Home
          </Button>
          <ProfileResults
            profile={currentProfile}
            onCompare={() => {
              if (maleProfiles.length > 0 && femaleProfiles.length > 0) {
                setViewMode('compare-select');
              } else {
                toast.error('Need at least one profile of each gender to compare');
              }
            }}
            onDelete={() => handleDeleteProfile(currentProfile.id)}
          />
        </div>
      )}

      {/* Compare Select View */}
      {viewMode === 'compare-select' && (
        <div>
          <Button variant="ghost" onClick={() => setViewMode('home')} className="mb-4">
            ← Back
          </Button>
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                Compare Profiles
              </CardTitle>
              <CardDescription>
                Select one male and one female profile to compare
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  Male Profile
                </label>
                <Select value={selectedMale} onValueChange={setSelectedMale}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select male profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {maleProfiles.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.mbtiType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <Heart className="h-8 w-8 text-pink-400" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pink-500" />
                  Female Profile
                </label>
                <Select value={selectedFemale} onValueChange={setSelectedFemale}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select female profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {femaleProfiles.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.mbtiType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-primary gap-2"
                disabled={!selectedMale || !selectedFemale}
                onClick={handleCompare}
              >
                <Sparkles className="h-4 w-4" />
                Calculate Compatibility
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comparison Results View */}
      {viewMode === 'compare-result' && comparisonResult && (
        <ComparisonResults
          male={comparisonResult.male}
          female={comparisonResult.female}
          result={comparisonResult.result}
          onBack={() => {
            setComparisonResult(null);
            setViewMode('compare-select');
          }}
        />
      )}
    </div>
  );
};

export default PersonalityMatchApp;
