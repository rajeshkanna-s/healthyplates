import { PersonalityProfile, PersonalityTraits, CompatibilityResult } from './types';
import { personalityQuestions } from './questionsData';

export const calculateTraits = (answers: Record<string, number>): PersonalityTraits => {
  const traits: PersonalityTraits = {
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
    emotionalIntelligence: 50,
    empathy: 50,
    resilience: 50,
    communicationStyle: 50,
    conflictResolution: 50,
    attachment: 50,
    loveLanguage: 'quality_time',
    adventurousness: 50,
    socialEnergy: 50,
    familyOrientation: 50,
    careerDrive: 50,
    traditionalism: 50,
    spirituality: 50,
    intellectualism: 50,
  };

  const traitSums: Record<string, { sum: number; count: number }> = {};

  personalityQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined && question.trait !== 'mbti' && question.trait !== 'enneagram' && question.trait !== 'loveLanguage') {
      const trait = question.trait as keyof PersonalityTraits;
      if (!traitSums[trait]) {
        traitSums[trait] = { sum: 0, count: 0 };
      }
      const weightedValue = question.weight > 0 
        ? answer * Math.abs(question.weight)
        : (6 - answer) * Math.abs(question.weight);
      traitSums[trait].sum += weightedValue;
      traitSums[trait].count += Math.abs(question.weight);
    }
  });

  Object.keys(traitSums).forEach((trait) => {
    const { sum, count } = traitSums[trait];
    if (count > 0) {
      const avg = sum / count;
      const traitKey = trait as keyof PersonalityTraits;
      if (traitKey !== 'loveLanguage') {
        (traits[traitKey] as number) = Math.round((avg / 5) * 100);
      }
    }
  });

  // Determine love language
  const loveLanguageScores = {
    physical_touch: (answers['q58'] || 3) + (answers['q65'] || 3),
    quality_time: (answers['q59'] || 3) + (answers['q68'] || 3),
    words_of_affirmation: (answers['q60'] || 3) + (answers['q32'] || 3),
    acts_of_service: (answers['q77'] || 3) + (answers['q97'] || 3),
    gifts: (answers['q87'] || 3),
  };

  const maxLoveLanguage = Object.entries(loveLanguageScores).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );
  traits.loveLanguage = maxLoveLanguage[0];

  return traits;
};

export const calculateMBTI = (traits: PersonalityTraits): string => {
  const e_i = traits.extraversion > 50 ? 'E' : 'I';
  const s_n = traits.openness > 50 ? 'N' : 'S';
  const t_f = traits.agreeableness > 50 ? 'F' : 'T';
  const j_p = traits.conscientiousness > 50 ? 'J' : 'P';
  return `${e_i}${s_n}${t_f}${j_p}`;
};

export const getMBTIName = (mbti: string): string => {
  const names: Record<string, string> = {
    'INTJ': 'Architect',
    'INTP': 'Logician',
    'ENTJ': 'Commander',
    'ENTP': 'Debater',
    'INFJ': 'Advocate',
    'INFP': 'Mediator',
    'ENFJ': 'Protagonist',
    'ENFP': 'Campaigner',
    'ISTJ': 'Logistician',
    'ISFJ': 'Defender',
    'ESTJ': 'Executive',
    'ESFJ': 'Consul',
    'ISTP': 'Virtuoso',
    'ISFP': 'Adventurer',
    'ESTP': 'Entrepreneur',
    'ESFP': 'Entertainer',
  };
  return names[mbti] || 'Unknown';
};

export const calculateCompatibility = (
  male: PersonalityProfile,
  female: PersonalityProfile
): CompatibilityResult => {
  const traitScores: Record<string, number> = {};
  const matchedTraits: string[] = [];
  const differences: string[] = [];
  const strengths: string[] = [];
  const challenges: string[] = [];
  const suggestions: string[] = [];

  const traitLabels: Record<string, string> = {
    openness: 'Openness to Experience',
    conscientiousness: 'Organization & Discipline',
    extraversion: 'Social Energy',
    agreeableness: 'Empathy & Cooperation',
    neuroticism: 'Emotional Stability',
    emotionalIntelligence: 'Emotional Intelligence',
    empathy: 'Empathy',
    resilience: 'Resilience',
    communicationStyle: 'Communication Style',
    conflictResolution: 'Conflict Resolution',
    attachment: 'Attachment Style',
    adventurousness: 'Adventurousness',
    socialEnergy: 'Social Energy',
    familyOrientation: 'Family Orientation',
    careerDrive: 'Career Ambition',
    traditionalism: 'Traditional Values',
    spirituality: 'Spirituality',
    intellectualism: 'Intellectualism',
  };

  const numericTraits = Object.keys(traitLabels);
  let totalScore = 0;

  numericTraits.forEach((trait) => {
    const maleValue = male.traits[trait as keyof PersonalityTraits] as number;
    const femaleValue = female.traits[trait as keyof PersonalityTraits] as number;
    const diff = Math.abs(maleValue - femaleValue);
    const similarity = 100 - diff;
    traitScores[trait] = similarity;
    totalScore += similarity;

    if (similarity >= 80) {
      matchedTraits.push(traitLabels[trait]);
    } else if (similarity < 50) {
      differences.push(traitLabels[trait]);
    }
  });

  const overallScore = Math.round(totalScore / numericTraits.length);

  // Generate strengths
  if (traitScores['emotionalIntelligence'] > 70) {
    strengths.push('High emotional understanding between partners');
  }
  if (traitScores['communicationStyle'] > 70) {
    strengths.push('Compatible communication preferences');
  }
  if (traitScores['familyOrientation'] > 70) {
    strengths.push('Aligned family and future goals');
  }
  if (traitScores['conflictResolution'] > 70) {
    strengths.push('Similar approach to handling disagreements');
  }
  if (matchedTraits.length >= 5) {
    strengths.push('Strong foundation of shared values and traits');
  }

  // Generate challenges
  if (traitScores['extraversion'] < 50) {
    challenges.push('Different social energy levels (Introvert vs Extrovert)');
    suggestions.push('Balance social time with personal space for both partners');
  }
  if (traitScores['conscientiousness'] < 50) {
    challenges.push('Different levels of organization and planning');
    suggestions.push('Create shared systems for household tasks and schedules');
  }
  if (traitScores['attachment'] < 50) {
    challenges.push('Different attachment and intimacy needs');
    suggestions.push('Have open conversations about emotional needs and boundaries');
  }
  if (traitScores['careerDrive'] < 50) {
    challenges.push('Different career ambitions and priorities');
    suggestions.push('Discuss work-life balance expectations early on');
  }
  if (traitScores['spirituality'] < 50) {
    challenges.push('Different spiritual or religious views');
    suggestions.push('Respect each other\'s beliefs and find common moral ground');
  }

  // Additional suggestions based on overall compatibility
  if (overallScore < 60) {
    suggestions.push('Focus on building understanding through regular deep conversations');
    suggestions.push('Consider couples communication workshops or counseling');
  } else if (overallScore >= 80) {
    suggestions.push('Your strong compatibility is a great foundation - keep nurturing it');
    suggestions.push('Continue exploring shared interests and creating new experiences');
  }

  // MBTI-based match description
  const maleMBTI = male.mbtiType || calculateMBTI(male.traits);
  const femaleMBTI = female.mbtiType || calculateMBTI(female.traits);
  const personalityTypeMatch = `${getMBTIName(maleMBTI)} + ${getMBTIName(femaleMBTI)}`;

  return {
    overallScore,
    traitScores,
    matchedTraits,
    differences,
    strengths: strengths.length > 0 ? strengths : ['Unique combination of perspectives'],
    challenges: challenges.length > 0 ? challenges : ['Minor adjustments may be needed'],
    suggestions: suggestions.length > 0 ? suggestions : ['Keep communicating openly with each other'],
    personalityTypeMatch,
  };
};

export const generateProfileId = (): string => {
  return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const saveProfile = (profile: PersonalityProfile): void => {
  const profiles = getProfiles();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem('personality_profiles', JSON.stringify(profiles));
};

export const getProfiles = (): PersonalityProfile[] => {
  const stored = localStorage.getItem('personality_profiles');
  return stored ? JSON.parse(stored) : [];
};

export const getProfilesByGender = (gender: 'male' | 'female'): PersonalityProfile[] => {
  return getProfiles().filter(p => p.gender === gender);
};

export const deleteProfile = (id: string): void => {
  const profiles = getProfiles().filter(p => p.id !== id);
  localStorage.setItem('personality_profiles', JSON.stringify(profiles));
};

export const saveComparison = (comparison: { maleId: string; femaleId: string; result: CompatibilityResult }): void => {
  const comparisons = getComparisons();
  comparisons.push({ ...comparison, comparedAt: new Date().toISOString() });
  localStorage.setItem('personality_comparisons', JSON.stringify(comparisons));
};

export const getComparisons = (): Array<{ maleId: string; femaleId: string; result: CompatibilityResult; comparedAt: string }> => {
  const stored = localStorage.getItem('personality_comparisons');
  return stored ? JSON.parse(stored) : [];
};

export const loveLanguageLabels: Record<string, string> = {
  physical_touch: 'Physical Touch',
  quality_time: 'Quality Time',
  words_of_affirmation: 'Words of Affirmation',
  acts_of_service: 'Acts of Service',
  gifts: 'Receiving Gifts',
};
