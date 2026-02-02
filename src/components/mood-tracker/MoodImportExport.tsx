import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload, AlertTriangle, Database, Clock } from 'lucide-react';
import { MoodEntry } from './types';
import { exportToJSON, validateImportData, getLastExportTime, setLastExportTime } from './utils';
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
import { useToast } from '@/hooks/use-toast';

interface MoodImportExportProps {
  entries: MoodEntry[];
  onImport: (entries: MoodEntry[], replace: boolean) => void;
}

const MoodImportExport: React.FC<MoodImportExportProps> = ({ entries, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImport, setPendingImport] = useState<MoodEntry[] | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLastExport(getLastExportTime());
  }, []);

  const formatLastExport = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleExport = () => {
    if (entries.length === 0) {
      toast({
        title: "No data to export",
        description: "Add some mood entries first before exporting.",
        variant: "destructive",
      });
      return;
    }
    exportToJSON(entries);
    setLastExportTime();
    setLastExport(new Date().toISOString());
    toast({
      title: "Export successful!",
      description: `Exported ${entries.length} mood entries to JSON file.`,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        const validEntries = validateImportData(data);
        
        if (!validEntries) {
          toast({
            title: "Invalid file format",
            description: "The file doesn't contain valid mood tracking data.",
            variant: "destructive",
          });
          return;
        }

        setPendingImport(validEntries);
        setShowImportDialog(true);
      } catch (error) {
        toast({
          title: "Error reading file",
          description: "Could not parse the JSON file. Make sure it's a valid export.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportReplace = () => {
    if (pendingImport) {
      onImport(pendingImport, true);
      toast({
        title: "Import successful!",
        description: `Replaced with ${pendingImport.length} mood entries.`,
      });
    }
    setShowImportDialog(false);
    setPendingImport(null);
  };

  const handleImportMerge = () => {
    if (pendingImport) {
      onImport(pendingImport, false);
      toast({
        title: "Import successful!",
        description: `Merged ${pendingImport.length} mood entries with existing data.`,
      });
    }
    setShowImportDialog(false);
    setPendingImport(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Backup & Restore Data
          </CardTitle>
          <CardDescription>
            Export your mood data to save it or import a previous backup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Importing data may overwrite your current entries. Only import JSON files exported from this Mood Tracker.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Mood Data ({entries.length} entries)
            </Button>

            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Mood Data (JSON)
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Import mood data JSON file"
            />
          </div>

          {lastExport && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Clock className="w-4 h-4" />
              <span>Last export: {formatLastExport(lastExport)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Mood Data</AlertDialogTitle>
            <AlertDialogDescription>
              Found {pendingImport?.length || 0} valid mood entries. How would you like to import them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleImportMerge} className="bg-primary hover:bg-primary/90">
              Merge with Existing
            </AlertDialogAction>
            <AlertDialogAction onClick={handleImportReplace} className="bg-destructive hover:bg-destructive/90">
              Replace All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MoodImportExport;
