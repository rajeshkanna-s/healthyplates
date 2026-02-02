import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';
import { MoodEntry, TAG_OPTIONS } from './types';
import { getMoodEmoji, getMoodLabel } from './utils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';

interface MoodCalendarProps {
  entries: MoodEntry[];
  onEditEntry: (entry: MoodEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddEntry: (date: string) => void;
}

const MOOD_COLORS: Record<number, string> = {
  1: 'bg-red-500/80 hover:bg-red-500',
  2: 'bg-orange-400/80 hover:bg-orange-400',
  3: 'bg-yellow-400/80 hover:bg-yellow-400',
  4: 'bg-lime-400/80 hover:bg-lime-400',
  5: 'bg-green-500/80 hover:bg-green-500',
};

const MOOD_BG_COLORS: Record<number, string> = {
  1: 'bg-red-100 dark:bg-red-950/50',
  2: 'bg-orange-100 dark:bg-orange-950/50',
  3: 'bg-yellow-100 dark:bg-yellow-950/50',
  4: 'bg-lime-100 dark:bg-lime-950/50',
  5: 'bg-green-100 dark:bg-green-950/50',
};

const MoodCalendar: React.FC<MoodCalendarProps> = ({
  entries,
  onEditEntry,
  onDeleteEntry,
  onAddEntry,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Create a map of date -> entry for quick lookup
  const entriesByDate = useMemo(() => {
    const map = new Map<string, MoodEntry>();
    entries.forEach((entry) => {
      map.set(entry.date, entry);
    });
    return map;
  }, [entries]);

  // Generate calendar days for the current month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const handleDayClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = entriesByDate.get(dateStr);
    
    if (entry) {
      setSelectedEntry(entry);
      setShowDetailDialog(true);
    } else {
      onAddEntry(dateStr);
    }
  };

  const handleEdit = () => {
    if (selectedEntry) {
      setShowDetailDialog(false);
      onEditEntry(selectedEntry);
    }
  };

  const handleDeleteClick = () => {
    setShowDetailDialog(false);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEntry) {
      onDeleteEntry(selectedEntry.id);
      setShowDeleteDialog(false);
      setSelectedEntry(null);
    }
  };

  const getTagInfo = (tag: string) => {
    return TAG_OPTIONS.find((t) => t.value === tag);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Mood Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const entry = entriesByDate.get(dateStr);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    'aspect-square p-1 rounded-lg border transition-all flex flex-col items-center justify-center gap-0.5',
                    isCurrentMonth
                      ? 'bg-card hover:bg-accent/50'
                      : 'bg-muted/30 text-muted-foreground',
                    isTodayDate && 'ring-2 ring-primary',
                    entry && isCurrentMonth && MOOD_BG_COLORS[entry.mood]
                  )}
                >
                  <span
                    className={cn(
                      'text-xs font-medium',
                      !isCurrentMonth && 'text-muted-foreground/50'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  {entry && isCurrentMonth ? (
                    <span className="text-lg leading-none">
                      {getMoodEmoji(entry.mood)}
                    </span>
                  ) : isCurrentMonth ? (
                    <Plus className="w-3 h-3 text-muted-foreground/50" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Heatmap Legend */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Low</span>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={cn(
                  'w-6 h-6 rounded flex items-center justify-center text-xs',
                  MOOD_COLORS[level],
                  'text-white font-medium'
                )}
              >
                {level}
              </div>
            ))}
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </CardContent>
      </Card>

      {/* Entry Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedEntry && getMoodEmoji(selectedEntry.mood)}</span>
              {selectedEntry && format(new Date(selectedEntry.date), 'EEEE, MMMM d, yyyy')}
            </DialogTitle>
            <DialogDescription>
              {selectedEntry && getMoodLabel(selectedEntry.mood)} mood
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="space-y-4">
              {selectedEntry.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Context Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map((tag) => {
                      const tagInfo = getTagInfo(tag);
                      return (
                        <Badge key={tag} variant="secondary">
                          {tagInfo?.emoji} {tagInfo?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {selectedEntry.notes && (
                <div>
                  <p className="text-sm font-medium mb-2">Notes</p>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {selectedEntry.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleDeleteClick}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete mood entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your mood entry for{' '}
              {selectedEntry && format(new Date(selectedEntry.date), 'MMMM d, yyyy')}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MoodCalendar;
