import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smile, Shield, Info, Calendar, BarChart3, List } from 'lucide-react';
import { MoodEntry } from '@/components/mood-tracker/types';
import { loadEntries, saveEntries } from '@/components/mood-tracker/utils';
import MoodEntryForm from '@/components/mood-tracker/MoodEntryForm';
import MoodEntriesTable from '@/components/mood-tracker/MoodEntriesTable';
import MoodStats from '@/components/mood-tracker/MoodStats';
import MoodStreaks from '@/components/mood-tracker/MoodStreaks';
import MoodTrends from '@/components/mood-tracker/MoodTrends';
import MoodTagAnalysis from '@/components/mood-tracker/MoodTagAnalysis';
import MoodImportExport from '@/components/mood-tracker/MoodImportExport';
import MoodCalendar from '@/components/mood-tracker/MoodCalendar';
import MoodSummary from '@/components/mood-tracker/MoodSummary';
import TagComparison from '@/components/mood-tracker/TagComparison';
import SleepMoodCorrelation from '@/components/mood-tracker/SleepMoodCorrelation';
import MoodExportOptions from '@/components/mood-tracker/MoodExportOptions';

const MoodTracker = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [prefilledDate, setPrefilledDate] = useState<string | undefined>();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSaveEntry = (entry: MoodEntry) => {
    let updatedEntries: MoodEntry[];
    
    // Check if entry with same id exists (editing) or same date (updating)
    const existingIndex = entries.findIndex(
      (e) => e.id === entry.id || e.date === entry.date
    );
    
    if (existingIndex !== -1) {
      updatedEntries = [...entries];
      updatedEntries[existingIndex] = entry;
      setEditingEntry(null);
    } else {
      updatedEntries = [entry, ...entries];
    }
    
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
    setPrefilledDate(undefined);
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  const handleEditEntry = (entry: MoodEntry) => {
    setEditingEntry(entry);
    setPrefilledDate(undefined);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddEntryFromCalendar = (date: string) => {
    setPrefilledDate(date);
    setEditingEntry(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImport = (importedEntries: MoodEntry[], replace: boolean) => {
    let updatedEntries: MoodEntry[];
    
    if (replace) {
      updatedEntries = importedEntries;
    } else {
      const existingIds = new Set(entries.map((e) => e.id));
      const existingDates = new Set(entries.map((e) => e.date));
      const newEntries = importedEntries.filter(
        (e) => !existingIds.has(e.id) && !existingDates.has(e.date)
      );
      updatedEntries = [...entries, ...newEntries];
    }
    
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return (
    <>
      <Helmet>
        <title>Daily Mood Tracker | HealthyPlates</title>
        <meta name="description" content="Track your daily mood and emotional well-being. All data stays in your browser - no account needed." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Smile className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Daily Mood Tracker</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your daily emotions and discover patterns. All feelings are valid — this is about awareness, not judgment.
            </p>
          </div>

          {/* Privacy Notice */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Your Privacy is Protected</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• All your mood data is stored <strong>only in your browser</strong></li>
                    <li>• We don't upload or store your data on any server</li>
                    <li>• Export your data as JSON or CSV to backup or move to another device</li>
                    <li>• If you clear browser data without exporting, entries will be lost</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>How to use:</strong> Log your mood each day using the form below. Track patterns with context tags like Work, Sleep, or Exercise. View your trends in the calendar and charts, then export your data anytime.
            </AlertDescription>
          </Alert>

          {/* Stats Section */}
          <div className="mb-6">
            <MoodStats entries={entries} />
          </div>

          {/* Summary & Insights */}
          <div className="mb-6">
            <MoodSummary entries={entries} />
          </div>

          {/* Streaks and Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <MoodStreaks entries={entries} />
            <MoodTrends entries={entries} />
          </div>

          {/* Calendar & Tag Analysis Tabs */}
          <Tabs defaultValue="calendar" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="tags" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Tag Insights</span>
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Sleep Connection</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="mt-4">
              <MoodCalendar
                entries={entries}
                onEditEntry={handleEditEntry}
                onDeleteEntry={handleDeleteEntry}
                onAddEntry={handleAddEntryFromCalendar}
              />
            </TabsContent>
            
            <TabsContent value="tags" className="mt-4 space-y-6">
              <MoodTagAnalysis entries={entries} />
              <TagComparison entries={entries} />
            </TabsContent>
            
            <TabsContent value="sleep" className="mt-4">
              <SleepMoodCorrelation moodEntries={entries} />
            </TabsContent>
          </Tabs>

          {/* Entry Form */}
          <div className="mb-6" ref={formRef}>
            <MoodEntryForm
              editingEntry={editingEntry}
              entries={entries}
              onSave={handleSaveEntry}
              onCancel={() => {
                setEditingEntry(null);
                setPrefilledDate(undefined);
              }}
              prefilledDate={prefilledDate}
            />
          </div>

          {/* Entries Table */}
          <div className="mb-6">
            <MoodEntriesTable
              entries={entries}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          </div>

          {/* Export Options */}
          <div className="mb-6">
            <MoodExportOptions entries={entries} />
          </div>

          {/* Import/Export Section */}
          <MoodImportExport entries={entries} onImport={handleImport} />
        </div>
      </div>
    </>
  );
};

export default MoodTracker;
