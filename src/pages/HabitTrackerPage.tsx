import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Plus, Edit2, Trash2, Shield, Download, Upload, ChevronLeft, ChevronRight, Flame, Trophy, BarChart3, CalendarDays, Medal, TrendingUp, X, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, parseISO, differenceInDays } from 'date-fns';
import HabitProgress from '@/components/habit-tracker/HabitProgress';
import HabitTrends from '@/components/habit-tracker/HabitTrends';
import HabitCalendar from '@/components/habit-tracker/HabitCalendar';
import HabitRankings from '@/components/habit-tracker/HabitRankings';

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
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

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
    const endLimit = habit.endDate ? parseISO(habit.endDate) : new Date();
    const start = parseISO(habit.startDate);
    
    // Filter dates within start-end range only
    const validDates = habit.completedDates
      .filter(d => {
        const date = parseISO(d);
        return date >= start && date <= endLimit;
      })
      .sort();

    if (validDates.length === 0) return { current: 0, best: 0 };

    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 1;

    const endStr = format(endLimit, 'yyyy-MM-dd');
    const yesterdayStr = format(addDays(endLimit, -1), 'yyyy-MM-dd');

    // Current streak from end date backwards
    const sorted = [...validDates].sort().reverse();
    if (sorted.includes(endStr) || sorted.includes(yesterdayStr)) {
      let checkDate = sorted.includes(endStr) ? endLimit : addDays(endLimit, -1);
      while (sorted.includes(format(checkDate, 'yyyy-MM-dd'))) {
        currentStreak++;
        checkDate = addDays(checkDate, -1);
      }
    }

    // Best streak within range
    for (let i = 1; i < validDates.length; i++) {
      const prev = parseISO(validDates[i - 1]);
      const curr = parseISO(validDates[i]);
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
              <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6 overflow-x-auto">
                <ScrollArea className="w-full whitespace-nowrap" type="always">
                  <div className="min-w-[600px] pb-4 inline-block">
                    {/* Header row with dates */}
                    <div className="grid grid-cols-[150px_repeat(7,44px)_56px] sm:grid-cols-[minmax(120px,160px)_repeat(7,minmax(44px,1fr))_minmax(60px,80px)] gap-1 sm:gap-2 mb-4 pb-2 border-b">
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
                        <div key={habit.id} className="grid grid-cols-[150px_repeat(7,44px)_56px] sm:grid-cols-[minmax(120px,160px)_repeat(7,minmax(44px,1fr))_minmax(60px,80px)] gap-1 sm:gap-2 items-center py-2 border-b last:border-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: habit.color }} />
                            <button
                              type="button"
                              className="text-xs sm:text-sm font-medium whitespace-nowrap hover:underline text-left cursor-pointer"
                              onClick={() => setSelectedHabit(habit)}
                            >
                              {habit.name}
                            </button>
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
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Reports Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Reports & Analytics
            </h2>
            <Tabs defaultValue="progress" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="progress" className="gap-1.5 text-xs sm:text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Progress</span>
                </TabsTrigger>
                <TabsTrigger value="trends" className="gap-1.5 text-xs sm:text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Trends</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="gap-1.5 text-xs sm:text-sm">
                  <CalendarDays className="w-4 h-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="rankings" className="gap-1.5 text-xs sm:text-sm">
                  <Medal className="w-4 h-4" />
                  <span className="hidden sm:inline">Rankings</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="progress">
                <HabitProgress habits={habits} />
              </TabsContent>
              <TabsContent value="trends">
                <HabitTrends habits={habits} />
              </TabsContent>
              <TabsContent value="calendar">
                <HabitCalendar habits={habits} />
              </TabsContent>
              <TabsContent value="rankings">
                <HabitRankings habits={habits} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Habit Detail Dialog */}
      <AlertDialog open={!!selectedHabit} onOpenChange={(open) => !open && setSelectedHabit(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedHabit?.color }} />
                {selectedHabit?.name}
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          {selectedHabit && (() => {
            const streak = calculateStreak(selectedHabit);
            const start = parseISO(selectedHabit.startDate);
            const end = selectedHabit.endDate ? parseISO(selectedHabit.endDate) : new Date();
            const totalDays = Math.max(1, differenceInDays(end, start) + 1);
            const completedInRange = selectedHabit.completedDates.filter(d => {
              const date = parseISO(d);
              return date >= start && date <= end;
            }).length;
            const completionRate = Math.min(100, Math.round((completedInRange / totalDays) * 100));

            return (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">Category</div>
                    <div className="font-medium">{selectedHabit.category}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">Frequency</div>
                    <div className="font-medium">
                      {selectedHabit.frequencyType === 'daily' ? 'Daily' :
                       selectedHabit.frequencyType === 'weekly' ? `${selectedHabit.timesPerWeek}x per week` :
                       selectedHabit.daysOfWeek.join(', ')}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">Start Date</div>
                    <div className="font-medium">{format(start, 'MMM d, yyyy')}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">End Date</div>
                    <div className="font-medium">{selectedHabit.endDate ? format(end, 'MMM d, yyyy') : 'Ongoing'}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">Time of Day</div>
                    <div className="font-medium">{selectedHabit.timeOfDay}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs">Total Days</div>
                    <div className="font-medium">{totalDays} days</div>
                  </div>
                </div>

                <div className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-bold text-primary">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} className="h-2.5" />
                  <div className="text-xs text-muted-foreground">
                    {completedInRange} of {totalDays} days completed
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-xl font-bold">{streak.current}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-xl font-bold">{streak.best}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </div>
                </div>

                {selectedHabit.notes && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-muted-foreground text-xs mb-1">Notes</div>
                    <div className="text-sm">{selectedHabit.notes}</div>
                  </div>
                )}
              </div>
            );
          })()}
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
