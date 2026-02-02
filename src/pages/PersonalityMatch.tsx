import React from 'react';
import { Helmet } from 'react-helmet-async';
import PersonalityMatchApp from '@/components/personality-match/PersonalityMatchApp';
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer';

const PersonalityMatch = () => {
  return (
    <>
      <Helmet>
        <title>Personality Match - Compatibility Analysis | HealthyPlates</title>
        <meta
          name="description"
          content="Discover your personality type with our comprehensive 100-question assessment. Compare male-female profiles and get detailed compatibility analysis with relationship insights."
        />
        <meta
          name="keywords"
          content="personality test, compatibility, MBTI, Big Five, relationship, love language, personality match"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <PersonalityMatchApp />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <MedicalDisclaimer />
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This personality assessment tool is for entertainment and self-reflection purposes only. 
              It is not a substitute for professional psychological evaluation or relationship counseling. 
              Results are based on self-reported responses and may not fully represent your actual personality traits.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalityMatch;
