import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, FileImage, FileText, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  VisionBoardData, ColorTheme, LayoutStyle, OutputSize, Quality, ExportFormat,
  THEME_CONFIG, LAYOUT_CONFIG, SIZE_DIMENSIONS, QUALITY_SCALE,
} from './types';
import VisionBoardCanvas from './VisionBoardCanvas';

interface Props {
  data: VisionBoardData;
  onDataChange: (partial: Partial<VisionBoardData>) => void;
  onBack: () => void;
}

const SIZE_LABELS: Record<OutputSize, { label: string; desc: string }> = {
  a4: { label: 'A4', desc: '21×29.7 cm' },
  a3: { label: 'A3', desc: '29.7×42 cm' },
  '12x18': { label: '12×18"', desc: 'Small poster' },
  '18x24': { label: '18×24"', desc: 'Large poster' },
  'instagram-post': { label: 'IG Post', desc: '1080×1080' },
  'instagram-story': { label: 'IG Story', desc: '1080×1920' },
  'whatsapp-status': { label: 'WhatsApp', desc: '1080×1920' },
};

const QUALITY_LABELS: Record<Quality, { label: string; px: string }> = {
  hd: { label: 'HD', px: '1920×1080' },
  '2k': { label: '2K', px: '2560×1440' },
  '4k': { label: '4K', px: '3840×2160' },
  print: { label: 'Print-Ready', px: '300 DPI' },
};

const VisionBoardPreview: React.FC<Props> = ({ data, onDataChange, onBack }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  const doExport = async (format: ExportFormat) => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const el = canvasRef.current;
      const size = SIZE_DIMENSIONS[data.selectedSizes[0] || 'a4'];
      const scale = QUALITY_SCALE[data.quality] || 2;

      // Save original styles
      const origWidth = el.style.width;
      const origMinHeight = el.style.minHeight;
      const origHeight = el.style.height;
      const origMaxWidth = el.style.maxWidth;

      // Apply export dimensions
      el.style.width = `${size.width}px`;
      el.style.minHeight = `${size.height}px`;
      el.style.height = 'auto';
      el.style.maxWidth = 'none';

      // Wait for reflow
      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: size.width,
        windowWidth: size.width,
      });

      // Restore original styles
      el.style.width = origWidth;
      el.style.minHeight = origMinHeight;
      el.style.height = origHeight;
      el.style.maxWidth = origMaxWidth;

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`vision-board-${data.title || 'my-vision'}.pdf`);
        toast.success('PDF downloaded! Ready for print.');
      } else {
        const link = document.createElement('a');
        link.download = `vision-board-${data.title || 'my-vision'}.${format}`;
        link.href = canvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', 0.95);
        link.click();
        toast.success(`${format.toUpperCase()} downloaded!`);
      }
    } catch (err) {
      toast.error('Export failed. Please try again.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Edit Content
          </Button>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Vision Board</h2>
          <p className="text-muted-foreground text-sm">Preview, customize, and download your creation.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => doExport(data.format)} disabled={isExporting} className="gap-2">
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : `Download ${data.format.toUpperCase()}`}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Preview area */}
        <div className="space-y-3">
          <div className="bg-muted/30 rounded-2xl p-4 overflow-auto border border-border/30">
            <div
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
              className="transition-transform duration-200"
            >
              <VisionBoardCanvas ref={canvasRef} data={data} />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span>Preview only. Downloads are high resolution.</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom(Math.max(50, zoom - 10))}><ZoomOut className="w-4 h-4" /></button>
              <span className="w-10 text-center">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 10))}><ZoomIn className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Customization panel */}
        <div className="space-y-4">
          {/* Color Theme */}
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Color Theme</Label>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {(Object.entries(THEME_CONFIG) as [ColorTheme, typeof THEME_CONFIG[ColorTheme]][]).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => onDataChange({ colorTheme: key })}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      data.colorTheme === key
                        ? 'border-primary shadow-md'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className={`w-full h-5 rounded-lg bg-gradient-to-r ${t.gradient} mb-1.5`} />
                    <span className="text-[11px] font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Layout Style */}
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layout Style</Label>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {(Object.entries(LAYOUT_CONFIG) as [LayoutStyle, typeof LAYOUT_CONFIG[LayoutStyle]][]).map(([key, l]) => (
                  <button
                    key={key}
                    onClick={() => onDataChange({ layoutStyle: key })}
                    className={`p-2.5 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                      data.layoutStyle === key
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="text-lg">{l.icon}</span>
                    <div className="text-[10px] mt-0.5">{l.name}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Size */}
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size / Format</Label>
              <div className="space-y-1.5">
                <p className="text-[10px] text-muted-foreground font-medium uppercase">Print Poster</p>
                <div className="flex flex-wrap gap-1.5">
                  {(['a4','a3','12x18','18x24'] as OutputSize[]).map(s => (
                    <button
                      key={s}
                      onClick={() => onDataChange({ selectedSizes: [s] })}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        data.selectedSizes.includes(s)
                          ? 'border-primary bg-primary/10 font-medium'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      {SIZE_LABELS[s].label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase mt-2">Social Media</p>
                <div className="flex flex-wrap gap-1.5">
                  {(['instagram-post','instagram-story','whatsapp-status'] as OutputSize[]).map(s => (
                    <button
                      key={s}
                      onClick={() => onDataChange({ selectedSizes: [s] })}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        data.selectedSizes.includes(s)
                          ? 'border-primary bg-primary/10 font-medium'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      {SIZE_LABELS[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality & Format */}
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quality & Format</Label>
              <div className="flex flex-wrap gap-1.5">
                {(Object.entries(QUALITY_LABELS) as [Quality, typeof QUALITY_LABELS[Quality]][]).map(([key, q]) => (
                  <button
                    key={key}
                    onClick={() => onDataChange({ quality: key })}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                      data.quality === key
                        ? 'border-primary bg-primary/10 font-medium'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    {q.label} <span className="text-muted-foreground ml-1">{q.px}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {(['png','jpeg','pdf'] as ExportFormat[]).map(f => (
                  <button
                    key={f}
                    onClick={() => onDataChange({ format: f })}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs border-2 uppercase font-semibold transition-all ${
                      data.format === f
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    {f === 'png' && <FileImage className="w-3 h-3 inline mr-1" />}
                    {f === 'jpeg' && <ImageIcon className="w-3 h-3 inline mr-1" />}
                    {f === 'pdf' && <FileText className="w-3 h-3 inline mr-1" />}
                    {f}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Download buttons */}
          <div className="space-y-2">
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => doExport(data.format)}
              disabled={isExporting}
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating...' : 'Download Vision Board'}
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => doExport('pdf')} disabled={isExporting} className="text-xs">
                <FileText className="w-3 h-3 mr-1" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => doExport('png')} disabled={isExporting} className="text-xs">
                <FileImage className="w-3 h-3 mr-1" /> PNG
              </Button>
              <Button variant="outline" size="sm" onClick={() => doExport('jpeg')} disabled={isExporting} className="text-xs">
                <ImageIcon className="w-3 h-3 mr-1" /> JPEG
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground">
              4K and Print‑Ready may take slightly longer. PDF is ideal for color poster printing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoardPreview;
