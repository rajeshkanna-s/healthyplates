import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Plus, Edit2, Trash2, Shield, Download, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';

interface PlannerItem {
  id: string;
  day: string;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  priority: 'low' | 'medium' | 'high';
  energyType: string;
  notes: string;
  tag: string;
  date: string;
}

interface WeekData {
  [weekStart: string]: PlannerItem[];
}

const STORAGE_KEY = 'healthyplates_weekly_planner_data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const categories = ['Work / Study', 'Health & Fitness', 'Personal / Self-care', 'Family & Relationships', 'Learning / Skills', 'Errands & Admin', 'Other'];
const energyTypes = ['Any', 'Deep focus', 'Light tasks', 'Social', 'Rest & recovery'];
const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const defaultItem: Omit<PlannerItem, 'id' | 'date'> = {
  day: 'Monday',
  title: '',
  category: 'Work / Study',
  startTime: '09:00',
  endTime: '10:00',
  priority: 'medium',
  energyType: 'Any',
  notes: '',
  tag: '',
};

const WeeklyPlanner = () => {
  const [weekData, setWeekData] = useState<WeekData>({});
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [formData, setFormData] = useState(defaultItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const weekKey = format(currentWeekStart, 'yyyy-MM-dd');
  const currentWeekItems = weekData[weekKey] || [];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWeekData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse planner data from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weekData));
  }, [weekData]);

  const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const getDateForDay = (day: string) => {
    const dayIndex = days.indexOf(day);
    return format(addDays(currentWeekStart, dayIndex), 'yyyy-MM-dd');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: 'Error', description: 'Title is required', variant: 'destructive' });
      return;
    }

    const date = getDateForDay(formData.day);
    const newItem: PlannerItem = {
      ...formData,
      id: editingId || generateId(),
      date,
    };

    if (editingId) {
      setWeekData(prev => ({
        ...prev,
        [weekKey]: prev[weekKey]?.map(item => item.id === editingId ? newItem : item) || [newItem],
      }));
      toast({ title: 'Updated', description: 'Plan item has been updated.' });
    } else {
      setWeekData(prev => ({
        ...prev,
        [weekKey]: [...(prev[weekKey] || []), newItem],
      }));
      toast({ title: 'Added', description: 'New plan item has been added.' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(defaultItem);
    setEditingId(null);
  };

  const handleEdit = (item: PlannerItem) => {
    setFormData({
      day: item.day,
      title: item.title,
      category: item.category,
      startTime: item.startTime,
      endTime: item.endTime,
      priority: item.priority,
      energyType: item.energyType,
      notes: item.notes,
      tag: item.tag,
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setWeekData(prev => ({
        ...prev,
        [weekKey]: prev[weekKey]?.filter(item => item.id !== deleteId) || [],
      }));
      toast({ title: 'Deleted', description: 'Plan item has been removed.' });
    }
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(weekData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthyplates-weekly-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export Complete', description: 'Your planner has been exported as JSON.' });
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }
      setWeekData(parsed);
      setShowImportDialog(false);
      setImportData('');
      toast({ title: 'Import Successful', description: 'Your planner data has been imported.' });
    } catch (e) {
      toast({ title: 'Import Failed', description: 'Invalid file or JSON format. Please use a backup exported from this Weekly Planner.', variant: 'destructive' });
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Work / Study': 'bg-blue-500',
      'Health & Fitness': 'bg-green-500',
      'Personal / Self-care': 'bg-purple-500',
      'Family & Relationships': 'bg-pink-500',
      'Learning / Skills': 'bg-orange-500',
      'Errands & Admin': 'bg-slate-500',
      'Other': 'bg-muted-foreground',
    };
    return colors[category] || 'bg-muted-foreground';
  };

  const getItemsForDay = (day: string) => {
    return currentWeekItems
      .filter(item => item.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const weekRangeText = `${format(currentWeekStart, 'MMM d')} – ${format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}`;

  const stats = {
    total: currentWeekItems.length,
  };

  return (
    <>
      <Helmet>
        <title>Weekly Planner | HealthyPlates</title>
        <meta name="description" content="Design your week with intention — balance focus, health, and rest. All data stored locally in your browser." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Weekly Planner</h1>
            <p className="text-muted-foreground">Design your week with intention — balance focus, health, and rest.</p>
          </div>

          {/* Privacy Info Card */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4" />
            <AlertTitle>Your data, your device</AlertTitle>
            <AlertDescription className="text-sm">
              This Weekly Planner stores all data only in your browser. We don't use any database or cloud storage. 
              If you clear your browser data, your plans may be lost. Please use the Export option regularly to back up your data.
            </AlertDescription>
          </Alert>

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
                    Today
                  </Button>
                </div>
                <h2 className="text-lg font-semibold">Week of {weekRangeText}</h2>
                <div className="text-sm text-muted-foreground">
                  {stats.total} item{stats.total !== 1 ? 's' : ''} planned
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Plan Item' : 'Add New Plan'}</CardTitle>
              <CardDescription>Add tasks, routines, or focus blocks for your week</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Deep Work – Project X"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value: PlannerItem['priority']) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(p => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="energyType">Energy Type</Label>
                    <Select value={formData.energyType} onValueChange={(value) => setFormData({ ...formData, energyType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {energyTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tag">Tag / Label</Label>
                    <Input
                      id="tag"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g., morning routine"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Extra details or reminders..."
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    {editingId ? 'Update' : 'Add to Week'}
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
              <Button variant="outline" onClick={handleExport} disabled={Object.keys(weekData).length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export Planner (JSON)
              </Button>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Import Planner (JSON)
              </Button>
            </CardContent>
          </Card>

          {/* Weekly Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {days.map((day, index) => {
              const dayDate = addDays(currentWeekStart, index);
              const isToday = isSameDay(dayDate, new Date());
              const dayItems = getItemsForDay(day);

              return (
                <Card key={day} className={`${isToday ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className={isToday ? 'text-primary font-bold' : ''}>{day}</span>
                      <span className="text-xs text-muted-foreground">{format(dayDate, 'MMM d')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ScrollArea className="h-[300px]">
                      {dayItems.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-4">No plans</p>
                      ) : (
                        <div className="space-y-2">
                          {dayItems.map(item => (
                            <div
                              key={item.id}
                              className={`p-2 rounded-lg border text-xs ${getPriorityColor(item.priority)}`}
                            >
                              <div className="flex items-center gap-1 mb-1">
                                <div className={`w-2 h-2 rounded-full ${getCategoryColor(item.category)}`} />
                                <span className="font-medium truncate flex-1">{item.title}</span>
                              </div>
                              {item.startTime && (
                                <p className="text-[10px] opacity-70">
                                  {item.startTime}{item.endTime && ` – ${item.endTime}`}
                                </p>
                              )}
                              <div className="flex gap-1 mt-1">
                                <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => handleEdit(item)}>
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => handleDelete(item.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Import Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Planner</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a JSON file or paste JSON data to import your planner. This will replace all existing data.
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
                placeholder='{"2026-02-02": [...]}'
                rows={5}
                className="mt-1 font-mono text-xs"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} disabled={!importData}>
              Replace Existing Planner Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plan Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
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

export default WeeklyPlanner;
