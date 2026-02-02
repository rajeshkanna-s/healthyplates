import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download, FileSpreadsheet, Printer, FileJson, Clock } from 'lucide-react';
import { MoodEntry, TAG_OPTIONS } from './types';
import { getMoodEmoji, getMoodLabel, calculateStreaks, calculateAverageMood, getLastExportTime, setLastExportTime } from './utils';
import { format, parseISO, subDays } from 'date-fns';

interface MoodExportOptionsProps {
  entries: MoodEntry[];
}

const MoodExportOptions: React.FC<MoodExportOptionsProps> = ({ entries }) => {
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(getLastExportTime());
  const printRef = useRef<HTMLDivElement>(null);

  const getTagLabel = (tag: string) => {
    const tagInfo = TAG_OPTIONS.find((t) => t.value === tag);
    return tagInfo?.label || tag;
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Mood Level', 'Mood', 'Tags', 'Notes'];
    const rows = entries.map((entry) => [
      entry.date,
      entry.mood.toString(),
      getMoodLabel(entry.mood),
      entry.tags.map(getTagLabel).join('; '),
      `"${entry.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const today = format(new Date(), 'yyyy-MM-dd');
    const filename = `healthplates-mood-data-${today}.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setLastExportTime();
    setLastExport(getLastExportTime());
  };

  // Export to JSON
  const exportToJSON = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const today = format(new Date(), 'yyyy-MM-dd');
    const filename = `healthplates-mood-data-${today}.json`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setLastExportTime();
    setLastExport(getLastExportTime());
  };

  // Print summary
  const handlePrint = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Calculate stats for print preview
  const streaks = calculateStreaks(entries);
  const avgMood = calculateAverageMood(entries);
  const last30Days = entries.filter((e) => {
    const entryDate = parseISO(e.date);
    const thirtyDaysAgo = subDays(new Date(), 30);
    return entryDate >= thirtyDaysAgo;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lastExport && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last export: {format(parseISO(lastExport), 'MMM d, yyyy h:mm a')}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={exportToJSON}
              className="flex items-center gap-2"
            >
              <FileJson className="w-4 h-4" />
              Export JSON
            </Button>
            
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export CSV
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Summary
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            JSON: For backup & restore. CSV: For Excel/Sheets. Print: For a physical summary.
          </p>
        </CardContent>
      </Card>

      {/* Print Preview Dialog */}
      <Dialog open={showPrintPreview} onOpenChange={setShowPrintPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none print:border-none">
          <DialogHeader className="print:hidden">
            <DialogTitle>Print Preview</DialogTitle>
            <DialogDescription>
              Use your browser's print function (Ctrl+P / Cmd+P) to save as PDF
            </DialogDescription>
          </DialogHeader>

          <div ref={printRef} className="print-content p-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Daily Mood Tracker Summary</h1>
              <p className="text-muted-foreground">
                Generated on {format(new Date(), 'MMMM d, yyyy')}
              </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6 border-b pb-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{entries.length}</p>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {avgMood > 0 ? `${getMoodEmoji(Math.round(avgMood))} ${avgMood.toFixed(1)}` : '—'}
                </p>
                <p className="text-sm text-muted-foreground">Average Mood</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{streaks.current}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{streaks.best}</p>
                <p className="text-sm text-muted-foreground">Best Streak</p>
              </div>
            </div>

            {/* Recent Entries Table */}
            <h2 className="text-lg font-semibold mb-3">Last 30 Days</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-2">Date</th>
                  <th className="text-left py-2 px-2">Mood</th>
                  <th className="text-left py-2 px-2">Tags</th>
                  <th className="text-left py-2 pl-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {last30Days.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-2 pr-2">
                      {format(parseISO(entry.date), 'MMM d')}
                    </td>
                    <td className="py-2 px-2">
                      {getMoodEmoji(entry.mood)} {getMoodLabel(entry.mood)}
                    </td>
                    <td className="py-2 px-2">
                      {entry.tags.map(getTagLabel).join(', ') || '—'}
                    </td>
                    <td className="py-2 pl-2 max-w-[200px] truncate">
                      {entry.notes || '—'}
                    </td>
                  </tr>
                ))}
                {last30Days.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-muted-foreground">
                      No entries in the last 30 days
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              HealthyPlates Daily Mood Tracker • All data stored locally in your browser
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MoodExportOptions;
