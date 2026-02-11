import React from 'react';
import { Helmet } from 'react-helmet-async';
import VisionBoardWizard from '@/components/vision-board/VisionBoardWizard';

const VisionBoard: React.FC = () => (
  <>
    <Helmet>
      <title>Create Vision Board | HealthyPlates</title>
      <meta name="description" content="Design a beautiful, printable vision board for your health, life, and wellness goals. Export as PDF, PNG for Instagram, Stories, and posters." />
    </Helmet>
    <VisionBoardWizard />
  </>
);

export default VisionBoard;
