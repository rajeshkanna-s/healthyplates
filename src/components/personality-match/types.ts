export interface PersonalityProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  bio: string;
  photoUrl?: string;
  createdAt: string;
  answers: Record<string, number>;
  traits: PersonalityTraits;
  mbtiType?: string;
  enneagramType?: number;
}

export interface PersonalityTraits {
  // Big Five
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  // Emotional
  emotionalIntelligence: number;
  empathy: number;
  resilience: number;
  // Relationship
  communicationStyle: number;
  conflictResolution: number;
  attachment: number;
  loveLanguage: string;
  // Lifestyle
  adventurousness: number;
  socialEnergy: number;
  familyOrientation: number;
  careerDrive: number;
  // Values
  traditionalism: number;
  spirituality: number;
  intellectualism: number;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  textMale?: string;
  textFemale?: string;
  type: 'scale' | 'choice' | 'multi';
  options?: string[];
  trait: keyof PersonalityTraits | 'mbti' | 'enneagram';
  isMandatory: boolean;
  weight: number;
}

export type QuestionCategory = 
  | 'personality'
  | 'emotional'
  | 'social'
  | 'lifestyle'
  | 'values'
  | 'relationship'
  | 'communication'
  | 'intimacy'
  | 'conflict'
  | 'future';

export interface CompatibilityResult {
  overallScore: number;
  traitScores: Record<string, number>;
  matchedTraits: string[];
  differences: string[];
  strengths: string[];
  challenges: string[];
  suggestions: string[];
  personalityTypeMatch: string;
}

export interface ComparisonData {
  male: PersonalityProfile;
  female: PersonalityProfile;
  result: CompatibilityResult;
  comparedAt: string;
}
