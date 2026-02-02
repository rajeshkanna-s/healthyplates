import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, X } from 'lucide-react';
import { SleepEntry, SleepQuality, QUALITY_OPTIONS } from './types';
import { calculateDuration, formatDuration, generateId } from './utils';

interface SleepEntryFormProps {
  editingEntry: SleepEntry | null;
  onSave: (entry: SleepEntry) => void;
  onCancel: () => void;
}

const SleepEntryForm: React.FC<SleepEntryFormProps> = ({ editingEntry, onSave, onCancel }) => {
  const [date, setDate] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState<SleepQuality>('good');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setBedtime(editingEntry.bedtime);
      setWakeTime(editingEntry.wakeTime);
      setQuality(editingEntry.quality);
      setNotes(editingEntry.notes);
      setDuration(editingEntry.duration);
    } else {
      clearForm();
    }
  }, [editingEntry]);

  useEffect(() => {
    if (bedtime && wakeTime) {
      const calculatedDuration = calculateDuration(bedtime, wakeTime);
      setDuration(calculatedDuration);
    }
  }, [bedtime, wakeTime]);

  const clearForm = () => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setBedtime('22:00');
    setWakeTime('06:00');
    setQuality('good');
    setNotes('');
    setDuration(calculateDuration('22:00', '06:00'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !bedtime || !wakeTime) {
      return;
    }

    const now = new Date().toISOString();
    const entry: SleepEntry = {
      id: editingEntry?.id || generateId(),
      date,
      bedtime,
      wakeTime,
      duration,
      quality,
      notes,
      createdAt: editingEntry?.createdAt || now,
      updatedAt: now,
    };

    onSave(entry);
    if (!editingEntry) {
      clearForm();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {editingEntry ? (
            <>
              <Save className="w-5 h-5 text-primary" />
              Edit Sleep Entry
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-primary" />
              Add Sleep Entry
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Label htmlFor="bedtime">Bedtime</Label>
              <Input
                id="bedtime"
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center text-sm font-medium">
                {formatDuration(duration)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Sleep Quality</Label>
              <Select value={quality} onValueChange={(value: SleepQuality) => setQuality(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  {QUALITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        <span>{option.emoji}</span>
                        <span>{option.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="e.g., Had coffee late, exercised, stressed..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[40px] resize-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="submit">
              {editingEntry ? (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  Update Entry
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Entry
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

export default SleepEntryForm;
