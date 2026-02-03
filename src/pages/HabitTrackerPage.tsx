import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Plus, Edit2, Trash2, Shield, Download, Upload, ChevronLeft, ChevronRight, Flame, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, parseISO, differenceInDays } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  category: string;
  frequencyType: 'daily' | 'weekly' | 'specific';
  timesPerWeek: number;
  daysOfWeek: string[];
  startDate: string;
  endDate: string;
  timeOfDay: string;
  notes: string;
  color: string;
  archived: boolean;
  completedDates: string[];
  createdAt: string;
}

const STORAGE_KEY = 'healthyplates_habit_tracker_data';

const categories = ['Health', 'Fitness', 'Mind & Focus', 'Productivity', 'Learning', 'Self-care', 'Other'];
const timeOfDayOptions = ['Any time', 'Morning', 'Afternoon', 'Evening', 'Night'];
const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63', '#00BCD4', '#795548', '#607D8B'];
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysMap: Record<string, number> = { 'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6 };

const defaultHabit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'> = {
  name: '',
  category: 'Health',
  frequencyType: 'daily',
  timesPerWeek: 3,
  daysOfWeek: daysShort,
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  timeOfDay: 'Any time',
  notes: '',
  color: '#4CAF50',
  archived: false,
};

const HabitTrackerPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [formData, setFormData] = useState(defaultHabit);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHabits(data.habits || []);
      } catch (e) {
        console.error('Failed to parse habits from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits }));
  }, [habits]);

  const generateId = () => `habit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: 'Error', description: 'Habit name is required', variant: 'destructive' });
      return;
    }

    if (editingId) {
      setHabits(prev => prev.map(h => h.id === editingId ? { ...h, ...formData } : h));
      toast({ title: 'Habit Updated', description: 'Your habit has been updated.' });
    } else {
      const newHabit: Habit = {
        ...formData,
        id: generateId(),
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      setHabits(prev => [...prev, newHabit]);
      toast({ title: 'Habit Added', description: 'New habit has been added.' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(defaultHabit);
    setEditingId(null);
  };

  const handleEdit = (habit: Habit) => {
    setFormData({
      name: habit.name,
      category: habit.category,
      frequencyType: habit.frequencyType,
      timesPerWeek: habit.timesPerWeek,
      daysOfWeek: habit.daysOfWeek,
      startDate: habit.startDate,
      endDate: habit.endDate,
      timeOfDay: habit.timeOfDay,
      notes: habit.notes,
      color: habit.color,
      archived: habit.archived,
    });
    setEditingId(habit.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setHabits(prev => prev.filter(h => h.id !== deleteId));
      toast({ title: 'Habit Deleted', description: 'Habit has been removed.' });
    }
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const toggleCompletion = (habitId: string, date: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h;
      const completed = h.completedDates.includes(date);
      return {
        ...h,
        completedDates: completed
          ? h.completedDates.filter(d => d !== date)
          : [...h.completedDates, date],
      };
    }));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ habits }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthyplates-habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export Complete', description: 'Your habits have been exported as JSON.' });
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      if (!parsed.habits || !Array.isArray(parsed.habits)) {
        throw new Error('Invalid format');
      }
      setHabits(parsed.habits);
      setShowImportDialog(false);
      setImportData('');
      toast({ title: 'Import Successful', description: 'Your habits have been imported.' });
    } catch (e) {
      toast({ title: 'Import Failed', description: 'Invalid file or JSON format. Please use a backup exported from this Habit Tracker.', variant: 'destructive' });
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImportData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const goToPreviousWeek = () => setCurrentWeekStart(prev => subWeeks(prev, 1));
  const goToNextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1));
  const goToThisWeek = () => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const calculateStreak = (habit: Habit) => {
    const sortedDates = [...habit.completedDates].sort().reverse();
    if (sortedDates.length === 0) return { current: 0, best: 0 };

    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 1;

    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(addDays(new Date(), -1), 'yyyy-MM-dd');

    // Calculate current streak
    if (sortedDates.includes(today) || sortedDates.includes(yesterday)) {
      let checkDate = sortedDates.includes(today) ? new Date() : addDays(new Date(), -1);
      while (sortedDates.includes(format(checkDate, 'yyyy-MM-dd'))) {
        currentStreak++;
        checkDate = addDays(checkDate, -1);
      }
    }

    // Calculate best streak
    const allDates = [...habit.completedDates].sort();
    for (let i = 1; i < allDates.length; i++) {
      const prev = parseISO(allDates[i - 1]);
      const curr = parseISO(allDates[i]);
      if (differenceInDays(curr, prev) === 1) {
        tempStreak++;
      } else {
        bestStreak = Math.max(bestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak, currentStreak);

    return { current: currentStreak, best: bestStreak };
  };

  const activeHabits = habits.filter(h => !h.archived);
  const weekRangeText = `${format(currentWeekStart, 'MMM d')} – ${format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}`;

  const weeklyCheckIns = useMemo(() => {
    return activeHabits.reduce((total, habit) => {
      return total + weekDates.filter(date => habit.completedDates.includes(format(date, 'yyyy-MM-dd'))).length;
    }, 0);
  }, [activeHabits, weekDates]);

  const toggleDayOfWeek = (day: string) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Habit Tracker | HealthyPlates</title>
        <meta name="description" content="Build healthy habits with small, consistent actions every day. All data stored locally in your browser." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Habit Tracker</h1>
            <p className="text-muted-foreground">Build healthy habits with small, consistent actions every day.</p>
          </div>

          {/* Privacy Info Card */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4" />
            <AlertTitle>Your data, your device</AlertTitle>
            <AlertDescription className="text-sm">
              This Habit Tracker stores all data only in your browser. We don't use any database or cloud storage. 
              If you clear your browser data, your habits may be lost. Please use the Export option regularly to back up your data.
            </AlertDescription>
          </Alert>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="text-center p-3">
              <div className="text-2xl font-bold">{activeHabits.length}</div>
              <div className="text-xs text-muted-foreground">Active Habits</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">{weeklyCheckIns}</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </Card>
            <Card className="text-center p-3">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold text-orange-500">
                  {Math.max(...activeHabits.map(h => calculateStreak(h).current), 0)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Best Current</div>
            </Card>
            <Card className="text-center p-3">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">
                  {Math.max(...activeHabits.map(h => calculateStreak(h).best), 0)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Best Ever</div>
            </Card>
          </div>

          {/* Add/Edit Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Habit' : 'Add New Habit'}</CardTitle>
              <CardDescription>Define a habit you want to build</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Habit Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Drink 2L water"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={formData.frequencyType} onValueChange={(value: Habit['frequencyType']) => setFormData({ ...formData, frequencyType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">X days per week</SelectItem>
                        <SelectItem value="specific">Specific days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.frequencyType === 'weekly' && (
                    <div className="space-y-2">
                      <Label>Times per week</Label>
                      <Input
                        type="number"
                        min="1"
                        max="7"
                        value={formData.timesPerWeek}
                        onChange={(e) => setFormData({ ...formData, timesPerWeek: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  )}
                  {formData.frequencyType === 'specific' && (
                    <div className="space-y-2 md:col-span-2">
                      <Label>Days of Week</Label>
                      <div className="flex flex-wrap gap-2">
                        {daysShort.map(day => (
                          <Button
                            key={day}
                            type="button"
                            variant={formData.daysOfWeek.includes(day) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleDayOfWeek(day)}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Time of Day</Label>
                    <Select value={formData.timeOfDay} onValueChange={(value) => setFormData({ ...formData, timeOfDay: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOfDayOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date (optional)</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2 flex-wrap">
                      {colors.map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-foreground scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setFormData({ ...formData, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any notes about this habit..."
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    {editingId ? 'Update Habit' : 'Add Habit'}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Import/Export Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Backup & Restore</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleExport} disabled={habits.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export Habits (JSON)
              </Button>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Import Habits (JSON)
              </Button>
            </CardContent>
          </Card>

          {/* Week Navigation */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextWeek}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={goToThisWeek}>
                    This Week
                  </Button>
                </div>
                <h2 className="text-lg font-semibold">{weekRangeText}</h2>
              </div>
            </CardContent>
          </Card>

          {/* Habit Tracking Grid */}
          {activeHabits.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No habits yet. Add your first habit using the form above.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
                <ScrollArea className="w-full" type="always">
                  <div className="min-w-[580px] pb-4">
                    {/* Header row with dates */}
                    <div className="grid grid-cols-[100px_repeat(7,40px)_60px] sm:grid-cols-[minmax(120px,160px)_repeat(7,minmax(44px,1fr))_minmax(60px,80px)] gap-1 sm:gap-2 mb-4 pb-2 border-b">
                      <div className="font-medium text-xs sm:text-sm">Habit</div>
                      {weekDates.map(date => (
                        <div key={date.toISOString()} className="text-center">
                          <div className="text-[10px] sm:text-xs text-muted-foreground">{format(date, 'EEE').slice(0, 2)}</div>
                          <div className={`text-xs sm:text-sm font-medium ${isSameDay(date, new Date()) ? 'text-primary' : ''}`}>
                            {format(date, 'd')}
                          </div>
                        </div>
                      ))}
                      <div className="text-center text-[10px] sm:text-sm font-medium">Streak</div>
                    </div>

                    {/* Habit rows */}
                    {activeHabits.map(habit => {
                      const streak = calculateStreak(habit);
                      return (
                        <div key={habit.id} className="grid grid-cols-[100px_repeat(7,40px)_60px] sm:grid-cols-[minmax(120px,160px)_repeat(7,minmax(44px,1fr))_minmax(60px,80px)] gap-1 sm:gap-2 items-center py-2 border-b last:border-0">
                          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: habit.color }} />
                            <span className="text-xs sm:text-sm font-medium truncate">{habit.name}</span>
                            <div className="flex gap-0.5 ml-auto flex-shrink-0">
                              <Button size="sm" variant="ghost" className="h-5 w-5 sm:h-6 sm:w-6 p-0" onClick={() => handleEdit(habit)}>
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-5 w-5 sm:h-6 sm:w-6 p-0" onClick={() => handleDelete(habit.id)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {weekDates.map(date => {
                            const dateStr = format(date, 'yyyy-MM-dd');
                            const isCompleted = habit.completedDates.includes(dateStr);
                            const isToday = isSameDay(date, new Date());
                            return (
                              <div key={dateStr} className="flex justify-center">
                                <button
                                  onClick={() => toggleCompletion(habit.id, dateStr)}
                                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    isCompleted
                                      ? 'border-transparent'
                                      : isToday
                                      ? 'border-primary/50 bg-primary/5'
                                      : 'border-muted hover:border-primary/30'
                                  }`}
                                  style={{ backgroundColor: isCompleted ? habit.color : undefined }}
                                >
                                  {isCompleted && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                </button>
                              </div>
                            );
                          })}
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-0.5">
                              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                              <span className="text-xs sm:text-sm font-medium">{streak.current}</span>
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">Best: {streak.best}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Import Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Habits</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a JSON file or paste JSON data to import your habits. This will replace all existing habits.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-input">Upload JSON File</Label>
              <Input
                id="file-input"
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="json-input">Or Paste JSON</Label>
              <Textarea
                id="json-input"
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder='{"habits": [...]}'
                rows={5}
                className="mt-1 font-mono text-xs"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} disabled={!importData}>
              Replace Existing Habits & History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Habit</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this habit and all its history? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HabitTrackerPage;
