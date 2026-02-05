import { useState, useEffect } from 'react';
import { Save, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { GratitudeEntry } from './types';

const GratitudeJournal = () => {
  const [items, setItems] = useState(['', '', '']);
  const [savedEntries, setSavedEntries] = useState<GratitudeEntry[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gratitudeJournal') || '[]');
    setSavedEntries(saved);
  }, []);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleSave = () => {
    if (items.every(item => item.trim() === '')) {
      toast({ title: 'Please add at least one gratitude item', variant: 'destructive' });
      return;
    }

    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      items: items.filter(item => item.trim() !== ''),
      date: new Date().toISOString(),
    };

    const updated = [...savedEntries, entry];
    localStorage.setItem('gratitudeJournal', JSON.stringify(updated));
    setSavedEntries(updated);
    setItems(['', '', '']);
    
    toast({ title: '✨ Saved!', description: 'Your gratitude entry has been saved' });
  };

  const handleExport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
      gradient.addColorStop(0, '#ffecd2');
      gradient.addColorStop(1, '#fcb69f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1350);
      
      // Title
      ctx.fillStyle = '#333';
      ctx.font = 'bold 56px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Today I\'m Grateful For', 540, 150);
      
      // Date
      ctx.font = '28px system-ui, sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), 540, 210);
      
      // Items
      ctx.font = '36px system-ui, sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      
      items.forEach((item, index) => {
        if (item.trim()) {
          const y = 350 + index * 200;
          ctx.fillText(`${index + 1}. ${item}`, 100, y);
        }
      });
      
      // Footer
      ctx.font = '24px system-ui, sans-serif';
      ctx.fillStyle = '#888';
      ctx.textAlign = 'center';
      ctx.fillText('HealthyPlates Mindfulness', 540, 1280);
      
      // Download
      const link = document.createElement('a');
      link.download = `gratitude-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({ title: 'Downloaded!', description: 'Share your gratitude with others' });
    }
  };

  const handleDelete = (id: string) => {
    const updated = savedEntries.filter(entry => entry.id !== id);
    localStorage.setItem('gratitudeJournal', JSON.stringify(updated));
    setSavedEntries(updated);
    toast({ title: 'Entry deleted' });
  };

  return (
    <section className="py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl text-center">
            🙏 Gratitude Journal
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            What are you grateful for today?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                {index + 1}
              </span>
              <Textarea
                placeholder={`I'm grateful for...`}
                value={items[index]}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>
          ))}

          <div className="flex gap-2 justify-center pt-4">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Entry
            </Button>
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export as Image
            </Button>
          </div>

          {/* Recent Entries */}
          {savedEntries.length > 0 && (
            <div className="pt-6 border-t mt-6">
              <h4 className="font-semibold text-foreground mb-4">Recent Entries</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {savedEntries.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="flex items-start justify-between bg-muted/50 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      <ul className="text-sm text-foreground">
                        {entry.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default GratitudeJournal;
