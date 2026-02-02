import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Target, Plus, Edit2, Trash2, CheckCircle, Shield, Download, Upload, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  category: string;
  description: string;
  startDate: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  priority: 'low' | 'medium' | 'high';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'healthyplates_goals_data';

const defaultGoal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  category: 'Health',
  description: '',
  startDate: new Date().toISOString().split('T')[0],
  targetDate: '',
  status: 'not-started',
  progress: 0,
  priority: 'medium',
  notes: '',
};

const categories = ['Health', 'Fitness', 'Learning', 'Career', 'Finance', 'Personal', 'Other'];
const statuses = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
];
const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const GoalTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [formData, setFormData] = useState(defaultGoal);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse goals from localStorage');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const generateId = () => `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: 'Error', description: 'Goal title is required', variant: 'destructive' });
      return;
    }

    const now = new Date().toISOString();
    if (editingId) {
      setGoals(prev => prev.map(g => g.id === editingId ? { ...g, ...formData, updatedAt: now } : g));
      toast({ title: 'Goal Updated', description: 'Your goal has been updated successfully.' });
    } else {
      const newGoal: Goal = {
        ...formData,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setGoals(prev => [...prev, newGoal]);
      toast({ title: 'Goal Added', description: 'New goal has been added to your tracker.' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(defaultGoal);
    setEditingId(null);
  };

  const handleEdit = (goal: Goal) => {
    setFormData({
      title: goal.title,
      category: goal.category,
      description: goal.description,
      startDate: goal.startDate,
      targetDate: goal.targetDate,
      status: goal.status,
      progress: goal.progress,
      priority: goal.priority,
      notes: goal.notes,
    });
    setEditingId(goal.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setGoals(prev => prev.filter(g => g.id !== deleteId));
      toast({ title: 'Goal Deleted', description: 'Goal has been removed from your tracker.' });
    }
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleMarkComplete = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status: 'completed' as const, progress: 100, updatedAt: new Date().toISOString() } : g));
    toast({ title: 'Goal Completed!', description: 'Congratulations on achieving your goal!' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(goals, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthyplates-goals-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export Complete', description: 'Your goals have been exported as JSON.' });
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }
      setGoals(parsed);
      setShowImportDialog(false);
      setImportData('');
      toast({ title: 'Import Successful', description: 'Your goals have been imported.' });
    } catch (e) {
      toast({ title: 'Import Failed', description: 'Invalid file or JSON format. Please use a backup exported from this Goal Tracker.', variant: 'destructive' });
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

  const filteredGoals = goals.filter(goal => {
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: goals.length,
    notStarted: goals.filter(g => g.status === 'not-started').length,
    inProgress: goals.filter(g => g.status === 'in-progress').length,
    completed: goals.filter(g => g.status === 'completed').length,
    onHold: goals.filter(g => g.status === 'on-hold').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'on-hold': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Goal Tracker | HealthyPlates</title>
        <meta name="description" content="Set and track your personal goals with our privacy-first goal tracking tool. All data stored locally in your browser." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Goal Tracker</h1>
            <p className="text-muted-foreground">Plan your goals, track your progress, and stay consistent.</p>
          </div>

          {/* Privacy Info Card */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4" />
            <AlertTitle>Your data, your device</AlertTitle>
            <AlertDescription className="text-sm">
              This Goal Tracker stores all data only in your browser. We don't use any database or cloud storage. 
              If you clear your browser data, your goals may be lost. Please use the Export option regularly to back up your data.
            </AlertDescription>
          </Alert>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Card className="text-center p-3">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Goals</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
              <div className="text-xs text-muted-foreground">Not Started</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-yellow-600">{stats.onHold}</div>
              <div className="text-xs text-muted-foreground">On Hold</div>
            </Card>
          </div>

          {/* Goal Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Goal' : 'Add New Goal'}</CardTitle>
              <CardDescription>Fill in the details to {editingId ? 'update your' : 'create a new'} goal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Learn a new language"
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your goal in detail..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: Goal['status']) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(s => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value: Goal['priority']) => setFormData({ ...formData, priority: value })}>
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
                  <div className="space-y-2">
                    <Label>Progress: {formData.progress}%</Label>
                    <Slider
                      value={[formData.progress]}
                      onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any additional notes..."
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    {editingId ? 'Update Goal' : 'Add Goal'}
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
              <Button variant="outline" onClick={handleExport} disabled={goals.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export Goals (JSON)
              </Button>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Import Goals (JSON)
              </Button>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search goals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {statuses.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals List */}
          {filteredGoals.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {goals.length === 0 
                    ? "You don't have any goals yet. Start by adding one above."
                    : "No goals match your current filters."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredGoals.map((goal) => (
                <Card key={goal.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full mt-1.5 ${getStatusColor(goal.status)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{goal.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline">{goal.category}</Badge>
                              <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                              <Badge variant="secondary">{statuses.find(s => s.value === goal.status)?.label}</Badge>
                            </div>
                          </div>
                        </div>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mb-2 ml-6">{goal.description}</p>
                        )}
                        <div className="ml-6 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Progress:</span>
                            <div className="flex-1 max-w-[200px]">
                              <Progress value={goal.progress} className="h-2" />
                            </div>
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          </div>
                          {goal.targetDate && (
                            <p className="text-xs text-muted-foreground">
                              Target: {new Date(goal.targetDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-6 md:ml-0">
                        {goal.status !== 'completed' && (
                          <Button size="sm" variant="outline" onClick={() => handleMarkComplete(goal.id)}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleEdit(goal)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(goal.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Import Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Goals</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a JSON file or paste JSON data to import your goals. This will replace all existing goals.
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
                placeholder='[{"id": "...", "title": "...", ...}]'
                rows={5}
                className="mt-1 font-mono text-xs"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} disabled={!importData}>
              Replace All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Goal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this goal? This action cannot be undone.
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

export default GoalTracker;
