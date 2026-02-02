import React from 'react';
import { Helmet } from 'react-helmet-async';
import HabitTracker from '@/components/home/HabitTracker';

const HabitTrackerPage = () => {
  return (
    <>
      <Helmet>
        <title>Habit Tracker | HealthyPlates</title>
        <meta name="description" content="Build and track healthy daily habits with our habit tracker." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <HabitTracker />
      </div>
    </>
  );
};

export default HabitTrackerPage;
