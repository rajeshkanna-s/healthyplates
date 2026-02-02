import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const BookshelfTracker = () => {
  return (
    <>
      <Helmet>
        <title>Bookshelf Tracker | HealthyPlates</title>
        <meta name="description" content="Track your reading progress and manage your bookshelf." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Bookshelf Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon! Organize your reading list and track books you've read.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookshelfTracker;
