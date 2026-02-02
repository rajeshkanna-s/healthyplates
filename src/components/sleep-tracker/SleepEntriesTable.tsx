import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Moon, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { SleepEntry, QUALITY_OPTIONS, TAG_OPTIONS, DateFilter, SortOption, SleepQuality } from './types';
import { formatDate, formatTime, formatDuration, loadGoal } from './utils';
import SleepFilters from './SleepFilters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SleepEntriesTableProps {
  entries: SleepEntry[];
  onEdit: (entry: SleepEntry) => void;
  onDelete: (id: string) => void;
}

const getQualityBadge = (quality: SleepEntry['quality']) => {
  const option = QUALITY_OPTIONS.find(q => q.value === quality);
  const colorMap = {
    poor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    average: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    good: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    excellent: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  };
  
  return (
    <Badge className={colorMap[quality]} variant="outline">
      {option?.emoji} {option?.label}
    </Badge>
  );
};

const SleepEntriesTable: React.FC<SleepEntriesTableProps> = ({ entries, onEdit, onDelete }) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date_desc');
  const [qualityFilter, setQualityFilter] = useState<SleepQuality | 'all'>('all');
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  const goal = loadGoal();

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = [...entries];
    
    // Date filter
    if (dateFilter !== 'all') {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - (dateFilter === '7days' ? 7 : 30));
      filtered = filtered.filter(e => new Date(e.date) >= cutoffDate);
    }
    
    // Quality filter
    if (qualityFilter !== 'all') {
      filtered = filtered.filter(e => e.quality === qualityFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'duration_desc':
          return b.duration - a.duration;
        case 'duration_asc':
          return a.duration - b.duration;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    
    return filtered;
  }, [entries, dateFilter, sortOption, qualityFilter]);

  const resetFilters = () => {
    setDateFilter('all');
    setSortOption('date_desc');
    setQualityFilter('all');
  };

  const toggleNotes = (id: string) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotes(newExpanded);
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Moon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No sleep entries yet</h3>
          <p className="text-muted-foreground">
            Start tracking your sleep by adding your first entry above.
          </p>
        </CardContent>
      </Card>
    );
  }

  const renderTags = (entry: SleepEntry) => {
    if (!entry.tags || entry.tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {entry.tags.map(tag => {
          const tagInfo = TAG_OPTIONS.find(t => t.value === tag);
          return (
            <span key={tag} className="text-xs bg-muted px-1.5 py-0.5 rounded" title={tagInfo?.label}>
              {tagInfo?.emoji}
            </span>
          );
        })}
      </div>
    );
  };

  const meetsGoal = (duration: number) => duration >= goal;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          Your Sleep Entries ({filteredAndSortedEntries.length} of {entries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SleepFilters
          dateFilter={dateFilter}
          sortOption={sortOption}
          qualityFilter={qualityFilter}
          onDateFilterChange={setDateFilter}
          onSortChange={setSortOption}
          onQualityFilterChange={setQualityFilter}
          onReset={resetFilters}
        />

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bedtime</TableHead>
                <TableHead>Wake Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Tags/Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedEntries.map((entry) => (
                <TableRow key={entry.id} className={meetsGoal(entry.duration) ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">{formatDate(entry.date)}</TableCell>
                  <TableCell>{formatTime(entry.bedtime)}</TableCell>
                  <TableCell>{formatTime(entry.wakeTime)}</TableCell>
                  <TableCell>
                    <span className="font-semibold flex items-center gap-1">
                      {formatDuration(entry.duration)}
                      {meetsGoal(entry.duration) && <Check className="w-4 h-4 text-primary" />}
                    </span>
                  </TableCell>
                  <TableCell>{getQualityBadge(entry.quality)}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {renderTags(entry)}
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground truncate mt-1">{entry.notes}</p>
                    )}
                    {!entry.notes && (!entry.tags || entry.tags.length === 0) && '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onEdit(entry)} aria-label="Edit entry">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" aria-label="Delete entry">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Sleep Entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this sleep entry from {formatDate(entry.date)}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(entry.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
            <div key={entry.id} className={`border rounded-lg p-4 space-y-3 ${meetsGoal(entry.duration) ? 'border-primary/30 bg-primary/5' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium flex items-center gap-1">
                    {formatDate(entry.date)}
                    {meetsGoal(entry.duration) && <Check className="w-4 h-4 text-primary" />}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(entry.bedtime)} → {formatTime(entry.wakeTime)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(entry)} aria-label="Edit entry">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" aria-label="Delete entry">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Sleep Entry?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this sleep entry. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(entry.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">{formatDuration(entry.duration)}</div>
                {getQualityBadge(entry.quality)}
              </div>
              {renderTags(entry)}
              {entry.notes && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs p-0"
                      onClick={() => toggleNotes(entry.id)}
                    >
                      {expandedNotes.has(entry.id) ? (
                        <><ChevronUp className="w-3 h-3 mr-1" /> Hide notes</>
                      ) : (
                        <><ChevronDown className="w-3 h-3 mr-1" /> View notes</>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  {expandedNotes.has(entry.id) && (
                    <CollapsibleContent>
                      <p className="text-sm text-muted-foreground bg-muted p-2 rounded mt-2">{entry.notes}</p>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepEntriesTable;
