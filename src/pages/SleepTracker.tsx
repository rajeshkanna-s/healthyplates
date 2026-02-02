import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Moon, Shield, Info } from 'lucide-react';
import { SleepEntry } from '@/components/sleep-tracker/types';
import { loadEntries, saveEntries } from '@/components/sleep-tracker/utils';
import SleepEntryForm from '@/components/sleep-tracker/SleepEntryForm';
import SleepEntriesTable from '@/components/sleep-tracker/SleepEntriesTable';
import SleepStats from '@/components/sleep-tracker/SleepStats';
import ImportExportSection from '@/components/sleep-tracker/ImportExportSection';

const SleepTracker = () => {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<SleepEntry | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSaveEntry = (entry: SleepEntry) => {
    let updatedEntries: SleepEntry[];
    
    if (editingEntry) {
      // Update existing entry
      updatedEntries = entries.map((e) => (e.id === entry.id ? entry : e));
      setEditingEntry(null);
    } else {
      // Add new entry
      updatedEntries = [entry, ...entries];
    }
    
    // Sort by date, newest first
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  const handleEditEntry = (entry: SleepEntry) => {
    setEditingEntry(entry);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImport = (importedEntries: SleepEntry[], replace: boolean) => {
    let updatedEntries: SleepEntry[];
    
    if (replace) {
      updatedEntries = importedEntries;
    } else {
      // Merge: add imported entries that don't exist (by id)
      const existingIds = new Set(entries.map((e) => e.id));
      const newEntries = importedEntries.filter((e) => !existingIds.has(e.id));
      updatedEntries = [...entries, ...newEntries];
    }
    
    // Sort by date, newest first
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return (
    <>
      <Helmet>
        <title>Sleep Tracker | HealthyPlates</title>
        <meta name="description" content="Track your sleep patterns, duration, and quality. All data stays in your browser - no account needed." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Moon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Sleep Tracker</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your sleep patterns and improve your rest. Small improvements start with awareness.
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
                    <li>• All your sleep data is stored <strong>only in your browser</strong></li>
                    <li>• We don't upload or store your data on any server</li>
                    <li>• Export your data as JSON to backup or move to another device</li>
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
              <strong>How to use:</strong> Add your sleep entries below. The tracker automatically calculates your sleep duration, even if you sleep past midnight. View your stats and export your data anytime.
            </AlertDescription>
          </Alert>

          {/* Stats Section */}
          <div className="mb-6">
            <SleepStats entries={entries} />
          </div>

          {/* Entry Form */}
          <div className="mb-6">
            <SleepEntryForm
              editingEntry={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => setEditingEntry(null)}
            />
          </div>

          {/* Entries Table */}
          <div className="mb-6">
            <SleepEntriesTable
              entries={entries}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          </div>

          {/* Import/Export Section */}
          <ImportExportSection entries={entries} onImport={handleImport} />
        </div>
      </div>
    </>
  );
};

export default SleepTracker;
