import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, List, Filter, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { MoodEntry, DateFilter, MoodFilter, SortOption, TAG_OPTIONS } from './types';
import { getMoodEmoji, getMoodLabel } from './utils';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MoodEntriesTableProps {
  entries: MoodEntry[];
  onEdit: (entry: MoodEntry) => void;
  onDelete: (id: string) => void;
}

const MoodEntriesTable: React.FC<MoodEntriesTableProps> = ({ entries, onEdit, onDelete }) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [moodFilter, setMoodFilter] = useState<MoodFilter>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date_desc');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedEntries = useMemo(() => {
    let result = [...entries];

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const daysAgo = dateFilter === '7days' ? 7 : 30;
      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
      result = result.filter((entry) => new Date(entry.date) >= cutoffDate);
    }

    // Mood filter
    if (moodFilter !== 'all') {
      result = result.filter((entry) => {
        if (moodFilter === 'low') return entry.mood <= 2;
        if (moodFilter === 'neutral') return entry.mood === 3;
        if (moodFilter === 'high') return entry.mood >= 4;
        return true;
      });
    }

    // Tag filter
    if (tagFilter !== 'all') {
      result = result.filter((entry) => entry.tags.includes(tagFilter as any));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'mood_desc':
          return b.mood - a.mood;
        case 'mood_asc':
          return a.mood - b.mood;
        case 'date_desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [entries, dateFilter, moodFilter, tagFilter, sortOption]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const getTagLabel = (tag: string) => {
    const option = TAG_OPTIONS.find((t) => t.value === tag);
    return option ? `${option.emoji} ${option.label}` : tag;
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <List className="w-5 h-5 text-primary" />
            Your Mood History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No mood entries yet. Start logging your mood to see your history here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <List className="w-5 h-5 text-primary" />
              Your Mood History ({filteredAndSortedEntries.length} entries)
            </CardTitle>

            <Collapsible open={showFilters} onOpenChange={setShowFilters}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <Select value={dateFilter} onValueChange={(v: DateFilter) => setDateFilter(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={moodFilter} onValueChange={(v: MoodFilter) => setMoodFilter(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mood level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="low">😢 Low (1-2)</SelectItem>
                    <SelectItem value="neutral">😐 Neutral (3)</SelectItem>
                    <SelectItem value="high">🙂 Good (4-5)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    {TAG_OPTIONS.map((tag) => (
                      <SelectItem key={tag.value} value={tag.value}>
                        {tag.emoji} {tag.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortOption} onValueChange={(v: SortOption) => setSortOption(v)}>
                  <SelectTrigger>
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date_desc">Newest First</SelectItem>
                    <SelectItem value="date_asc">Oldest First</SelectItem>
                    <SelectItem value="mood_desc">Mood: High → Low</SelectItem>
                    <SelectItem value="mood_asc">Mood: Low → High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>

        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{formatDate(entry.date)}</TableCell>
                    <TableCell>
                      <span className="text-2xl" title={getMoodLabel(entry.mood)}>
                        {getMoodEmoji(entry.mood)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {getTagLabel(tag)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={entry.notes}>
                      {entry.notes || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(entry)}
                          aria-label="Edit entry"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(entry.id)}
                          aria-label="Delete entry"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredAndSortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{formatDate(entry.date)}</span>
                  <span className="text-3xl" title={getMoodLabel(entry.mood)}>
                    {getMoodEmoji(entry.mood)}
                  </span>
                </div>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {getTagLabel(tag)}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {entry.notes && (
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(entry)}
                    className="flex-1"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(entry.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mood Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this mood entry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MoodEntriesTable;
