import { useState, useEffect } from 'react';
import { Save, Download, Trash2, Image, Calendar, Sparkles } from 'lucide-react';
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

  // Helper function to wrap text on canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // Export current items (what user is typing)
  const handleExportCurrent = () => {
    const filledItems = items.filter(item => item.trim() !== '');
    if (filledItems.length === 0) {
      toast({ title: 'Please add at least one gratitude item first', variant: 'destructive' });
      return;
    }
    exportToImage(filledItems, new Date());
  };

  // Export a saved entry
  const handleExportEntry = (entry: GratitudeEntry) => {
    exportToImage(entry.items, new Date(entry.date));
  };

  const exportToImage = (gratitudeItems: string[], date: Date) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
      gradient.addColorStop(0, '#ffecd2');
      gradient.addColorStop(1, '#fcb69f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1350);

      // Add subtle decorative elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(100, 200, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(980, 1200, 200, 0, Math.PI * 2);
      ctx.fill();
      
      // Title with shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = '#2d3748';
      ctx.font = 'bold 64px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText("Today I'm Grateful For", 540, 140);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      
      // Date
      ctx.font = '32px Georgia, serif';
      ctx.fillStyle = '#718096';
      ctx.fillText(date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), 540, 200);

      // Decorative line
      ctx.strokeStyle = '#e2a87c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(340, 240);
      ctx.lineTo(740, 240);
      ctx.stroke();
      
      // Items with better formatting
      ctx.font = '38px Georgia, serif';
      ctx.fillStyle = '#2d3748';
      ctx.textAlign = 'left';
      
      let currentY = 340;
      const maxWidth = 880;
      const lineHeight = 50;
      const itemSpacing = 80;
      
      gratitudeItems.forEach((item, index) => {
        if (item.trim()) {
          // Number circle
          ctx.fillStyle = '#e2a87c';
          ctx.beginPath();
          ctx.arc(130, currentY - 12, 28, 0, Math.PI * 2);
          ctx.fill();
          
          // Number
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 28px Georgia, serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${index + 1}`, 130, currentY - 2);
          
          // Item text
          ctx.fillStyle = '#2d3748';
          ctx.font = '38px Georgia, serif';
          ctx.textAlign = 'left';
          currentY = wrapText(ctx, item, 180, currentY, maxWidth, lineHeight);
          currentY += itemSpacing;
        }
      });
      
      // Footer with heart
      ctx.fillStyle = '#a0aec0';
      ctx.font = '28px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('🙏 HealthyPlates Mindfulness', 540, 1280);
      
      // Download
      const link = document.createElement('a');
      link.download = `gratitude-${date.toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({ title: '✨ Downloaded!', description: 'Share your gratitude with others' });
    }
  };

  const handleDelete = (id: string) => {
    const updated = savedEntries.filter(entry => entry.id !== id);
    localStorage.setItem('gratitudeJournal', JSON.stringify(updated));
    setSavedEntries(updated);
    toast({ title: 'Entry deleted' });
  };

  return (
    <section className="py-6 md:py-12">
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl md:text-2xl text-center">
              Gratitude Journal
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            What are you grateful for today?
          </p>
        </CardHeader>
        <CardContent className="space-y-4 p-4 md:p-6">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-start gap-2 md:gap-3">
              <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-medium text-sm shadow-sm">
                {index + 1}
              </span>
              <Textarea
                placeholder={`I'm grateful for...`}
                value={items[index]}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="min-h-[50px] md:min-h-[60px] resize-none text-sm md:text-base border-muted-foreground/20 focus:border-primary/50 transition-colors"
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4">
            <Button onClick={handleSave} className="gap-2 flex-1 sm:flex-none">
              <Save className="h-4 w-4" />
              Save Entry
            </Button>
            <Button variant="outline" onClick={handleExportCurrent} className="gap-2 flex-1 sm:flex-none">
              <Image className="h-4 w-4" />
              Export as Image
            </Button>
          </div>

          {/* Recent Entries */}
          {savedEntries.length > 0 && (
            <div className="pt-6 border-t border-border/50 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-foreground">Recent Entries</h4>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {savedEntries.length} saved
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {savedEntries.slice().reverse().map((entry) => (
                  <div 
                    key={entry.id} 
                    className="group bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 rounded-xl p-3 md:p-4 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <ul className="text-sm text-foreground space-y-1">
                          {entry.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary font-medium">•</span>
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-primary opacity-70 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleExportEntry(entry)}
                          title="Download as image"
                        >
                          <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-destructive opacity-70 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDelete(entry.id)}
                          title="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>
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
