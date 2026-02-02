import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon } from 'lucide-react';

const SleepTracker = () => {
  return (
    <>
      <Helmet>
        <title>Sleep Tracking | HealthyPlates</title>
        <meta name="description" content="Monitor your sleep patterns and improve your rest with our sleep tracker." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Moon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Sleep Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon! Track your sleep duration and quality for better rest.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SleepTracker;
