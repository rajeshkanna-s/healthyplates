import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Moon } from 'lucide-react';
import { SleepEntry, QUALITY_OPTIONS } from './types';
import { formatDate, formatTime, formatDuration } from './utils';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          Your Sleep Entries ({entries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{formatDate(entry.date)}</TableCell>
                  <TableCell>{formatTime(entry.bedtime)}</TableCell>
                  <TableCell>{formatTime(entry.wakeTime)}</TableCell>
                  <TableCell className="font-semibold">{formatDuration(entry.duration)}</TableCell>
                  <TableCell>{getQualityBadge(entry.quality)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{entry.notes || '—'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => onEdit(entry)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
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
          {entries.map((entry) => (
            <div key={entry.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{formatDate(entry.date)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(entry.bedtime)} → {formatTime(entry.wakeTime)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(entry)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
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
              {entry.notes && (
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{entry.notes}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepEntriesTable;
