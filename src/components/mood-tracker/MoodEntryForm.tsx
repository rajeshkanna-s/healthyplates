import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X, AlertCircle } from 'lucide-react';
import { MoodEntry, MoodLevel, MoodTag, MOOD_OPTIONS } from './types';
import { generateId, findExistingEntryByDate } from './utils';
import MoodTagsInput from './MoodTagsInput';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MoodEntryFormProps {
  editingEntry: MoodEntry | null;
  entries: MoodEntry[];
  onSave: (entry: MoodEntry) => void;
  onCancel: () => void;
}

const MoodEntryForm: React.FC<MoodEntryFormProps> = ({ editingEntry, entries, onSave, onCancel }) => {
  const [date, setDate] = useState('');
  const [mood, setMood] = useState<MoodLevel>(3);
  const [tags, setTags] = useState<MoodTag[]>([]);
  const [notes, setNotes] = useState('');
  const [existingEntry, setExistingEntry] = useState<MoodEntry | null>(null);

  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setMood(editingEntry.mood);
      setTags(editingEntry.tags || []);
      setNotes(editingEntry.notes);
      setExistingEntry(null);
    } else {
      clearForm();
    }
  }, [editingEntry]);

  useEffect(() => {
    if (!editingEntry && date) {
      const existing = findExistingEntryByDate(entries, date);
      setExistingEntry(existing || null);
    }
  }, [date, entries, editingEntry]);

  const clearForm = () => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setMood(3);
    setTags([]);
    setNotes('');
    setExistingEntry(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !mood) {
      return;
    }

    const now = new Date().toISOString();
    const entry: MoodEntry = {
      id: editingEntry?.id || existingEntry?.id || generateId(),
      date,
      mood,
      tags,
      notes,
      createdAt: editingEntry?.createdAt || existingEntry?.createdAt || now,
      updatedAt: now,
    };

    onSave(entry);
    if (!editingEntry) {
      clearForm();
    }
  };

  const handleEditExisting = () => {
    if (existingEntry) {
      setMood(existingEntry.mood);
      setTags(existingEntry.tags || []);
      setNotes(existingEntry.notes);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {editingEntry ? (
            <>
              <Save className="w-5 h-5 text-primary" />
              Edit Mood Entry
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-primary" />
              Log Today's Mood
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {existingEntry && !editingEntry && (
            <Alert className="border-primary/50 bg-accent">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span>An entry for this date already exists.</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditExisting}
                  className="w-fit"
                >
                  Load existing entry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>How are you feeling?</Label>
              <div className="flex gap-2 flex-wrap">
                {MOOD_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={mood === option.value ? 'default' : 'outline'}
                    size="lg"
                    className={`flex-1 min-w-[50px] text-xl transition-all ${
                      mood === option.value ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    onClick={() => setMood(option.value)}
                    title={option.label}
                  >
                    {option.emoji}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {MOOD_OPTIONS.find((o) => o.value === mood)?.label}
              </p>
            </div>
          </div>

          <MoodTagsInput selectedTags={tags} onTagsChange={setTags} />

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="What influenced your mood today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[60px] resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="submit">
              {editingEntry || existingEntry ? (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  {existingEntry && !editingEntry ? 'Update Entry' : 'Save Changes'}
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Save Mood
                </>
              )}
            </Button>
            
            {editingEntry && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            )}
            
            <Button type="button" variant="ghost" onClick={clearForm}>
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodEntryForm;
