import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Plus, Edit2, Trash2, Star, Shield, Download, Upload, Search, Filter, BookMarked, BookCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'to-read' | 'reading' | 'completed' | 'on-hold' | 'dropped';
  startDate: string;
  finishDate: string;
  format: 'physical' | 'ebook' | 'audiobook';
  rating: number;
  pages: number;
  currentPage: number;
  language: string;
  notes: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'healthyplates_bookshelf_data';

const defaultBook: Omit<Book, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  author: '',
  category: 'Fiction',
  status: 'to-read',
  startDate: '',
  finishDate: '',
  format: 'physical',
  rating: 0,
  pages: 0,
  currentPage: 0,
  language: 'English',
  notes: '',
  tags: '',
};

const categories = ['Fiction', 'Non-fiction', 'Self-help', 'Biography', 'Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'History', 'Science', 'Business', 'Other'];
const statuses = [
  { value: 'to-read', label: 'To Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'dropped', label: 'Dropped' },
];
const formats = [
  { value: 'physical', label: 'Physical' },
  { value: 'ebook', label: 'Ebook' },
  { value: 'audiobook', label: 'Audiobook' },
];

const BookshelfTracker = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState(defaultBook);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBooks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse books from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const generateId = () => `book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: 'Error', description: 'Book title is required', variant: 'destructive' });
      return;
    }

    const now = new Date().toISOString();
    if (editingId) {
      setBooks(prev => prev.map(b => b.id === editingId ? { ...b, ...formData, updatedAt: now } : b));
      toast({ title: 'Book Updated', description: 'Your book has been updated successfully.' });
    } else {
      const newBook: Book = {
        ...formData,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setBooks(prev => [...prev, newBook]);
      toast({ title: 'Book Added', description: 'New book has been added to your shelf.' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(defaultBook);
    setEditingId(null);
  };

  const handleEdit = (book: Book) => {
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      status: book.status,
      startDate: book.startDate,
      finishDate: book.finishDate,
      format: book.format,
      rating: book.rating,
      pages: book.pages,
      currentPage: book.currentPage,
      language: book.language,
      notes: book.notes,
      tags: book.tags,
    });
    setEditingId(book.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setBooks(prev => prev.filter(b => b.id !== deleteId));
      toast({ title: 'Book Removed', description: 'Book has been removed from your shelf.' });
    }
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleMarkReading = (id: string) => {
    const now = new Date().toISOString();
    setBooks(prev => prev.map(b => b.id === id ? { 
      ...b, 
      status: 'reading' as const, 
      startDate: b.startDate || now.split('T')[0],
      updatedAt: now 
    } : b));
    toast({ title: 'Status Updated', description: 'Book marked as Reading.' });
  };

  const handleMarkComplete = (id: string) => {
    const now = new Date().toISOString();
    setBooks(prev => prev.map(b => b.id === id ? { 
      ...b, 
      status: 'completed' as const, 
      finishDate: now.split('T')[0],
      currentPage: b.pages || b.currentPage,
      updatedAt: now 
    } : b));
    toast({ title: 'Congratulations!', description: 'Book marked as Completed.' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthyplates-bookshelf-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export Complete', description: 'Your bookshelf has been exported as JSON.' });
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }
      setBooks(parsed);
      setShowImportDialog(false);
      setImportData('');
      toast({ title: 'Import Successful', description: 'Your bookshelf has been imported.' });
    } catch (e) {
      toast({ title: 'Import Failed', description: 'Invalid file or JSON format. Please use a backup exported from this Bookshelf Tracker.', variant: 'destructive' });
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

  const filteredBooks = books.filter(book => {
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    const matchesFormat = filterFormat === 'all' || book.format === filterFormat;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesFormat && matchesSearch;
  });

  const stats = {
    total: books.length,
    toRead: books.filter(b => b.status === 'to-read').length,
    reading: books.filter(b => b.status === 'reading').length,
    completed: books.filter(b => b.status === 'completed').length,
    totalPages: books.filter(b => b.status === 'completed').reduce((acc, b) => acc + (b.pages || 0), 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'to-read': return 'bg-gray-500';
      case 'reading': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'dropped': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Bookshelf Tracker | HealthyPlates</title>
        <meta name="description" content="Track your reading progress and manage your bookshelf. All data stored locally in your browser." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Bookshelf Tracker</h1>
            <p className="text-muted-foreground">Organize your reading list and track your progress across all your books.</p>
          </div>

          {/* Privacy Info Card */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4" />
            <AlertTitle>Your data, your device</AlertTitle>
            <AlertDescription className="text-sm">
              This Bookshelf Tracker stores all data only in your browser. We don't use any database or cloud storage. 
              If you clear your browser data, your books may be lost. Please use the Export option regularly to back up your data.
            </AlertDescription>
          </Alert>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Card className="text-center p-3">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Books</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-gray-600">{stats.toRead}</div>
              <div className="text-xs text-muted-foreground">To Read</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.reading}</div>
              <div className="text-xs text-muted-foreground">Reading</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">{stats.totalPages}</div>
              <div className="text-xs text-muted-foreground">Pages Read</div>
            </Card>
          </div>

          {/* Book Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Book' : 'Add New Book'}</CardTitle>
              <CardDescription>Fill in the details to {editingId ? 'update your' : 'add a new'} book</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Book Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Atomic Habits"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g., James Clear"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
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
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: Book['status']) => setFormData({ ...formData, status: value })}>
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
                    <Label htmlFor="format">Format</Label>
                    <Select value={formData.format} onValueChange={(value: Book['format']) => setFormData({ ...formData, format: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map(f => (
                          <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
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
                    <Label htmlFor="finishDate">Finish Date</Label>
                    <Input
                      id="finishDate"
                      type="date"
                      value={formData.finishDate}
                      onChange={(e) => setFormData({ ...formData, finishDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Total Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      min="0"
                      value={formData.pages || ''}
                      onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) || 0 })}
                      placeholder="e.g., 320"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPage">Current Page</Label>
                    <Input
                      id="currentPage"
                      type="number"
                      min="0"
                      value={formData.currentPage || ''}
                      onChange={(e) => setFormData({ ...formData, currentPage: parseInt(e.target.value) || 0 })}
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select value={String(formData.rating)} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Not rated</SelectItem>
                        <SelectItem value="1">⭐ 1 Star</SelectItem>
                        <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      placeholder="e.g., English"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g., productivity, habits"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes / Thoughts</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Your notes about this book..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    {editingId ? 'Update Book' : 'Add Book'}
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
              <Button variant="outline" onClick={handleExport} disabled={books.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export Books (JSON)
              </Button>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Import Books (JSON)
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
                      placeholder="Search books by title, author, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {statuses.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterFormat} onValueChange={setFilterFormat}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      {formats.map(f => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Books List */}
          {filteredBooks.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {books.length === 0 
                    ? "Your shelf is empty. Start by adding a book using the form above."
                    : "No books match your current filters."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[calc(100vh-400px)] min-h-[300px]" type="always">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pr-2">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="overflow-hidden">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-1.5 sm:w-2 h-full min-h-[70px] sm:min-h-[80px] rounded-full flex-shrink-0 ${getStatusColor(book.status)}`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-lg truncate">{book.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{book.author}</p>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                            <Badge variant="outline" className="text-[10px] sm:text-xs">{book.category}</Badge>
                            <Badge variant="secondary" className="text-[10px] sm:text-xs">{book.format}</Badge>
                            <Badge variant="secondary" className="text-[10px] sm:text-xs">{statuses.find(s => s.value === book.status)?.label}</Badge>
                          </div>
                          {book.rating > 0 && (
                            <div className="mt-1.5 sm:mt-2">{renderStars(book.rating)}</div>
                          )}
                          {book.pages > 0 && book.status === 'reading' && (
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
                              Page {book.currentPage} of {book.pages} ({Math.round((book.currentPage / book.pages) * 100)}%)
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1 flex-shrink-0">
                          {book.status === 'to-read' && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => handleMarkReading(book.id)} title="Mark as Reading">
                              <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          )}
                          {book.status === 'reading' && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => handleMarkComplete(book.id)} title="Mark as Complete">
                              <BookCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => handleEdit(book)}>
                            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => handleDelete(book.id)}>
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      {/* Import Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Books</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a JSON file or paste JSON data to import your bookshelf. This will replace all existing books.
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
              Replace Existing Bookshelf
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this book from your shelf? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookshelfTracker;
