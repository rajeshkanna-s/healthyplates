import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Sparkles, Target, Palette, Eye, Check, Plus, X } from 'lucide-react';
import { VisionBoardData, Timeframe, TIMEFRAME_LABELS, CategoryDetail, DEFAULT_VISION_DATA } from './types';
import { CATEGORY_GROUPS, ALL_CATEGORIES, SUGGESTED_QUOTES, AFFIRMATIONS } from './categoriesData';
import VisionBoardPreview from './VisionBoardPreview';

const STEPS = [
  { label: 'Timeframe', icon: '⏳' },
  { label: 'Categories', icon: '📋' },
  { label: 'Details', icon: '✏️' },
  { label: 'Title & Quote', icon: '💬' },
  { label: 'Preview & Download', icon: '🎨' },
];

const VisionBoardWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<VisionBoardData>({ ...DEFAULT_VISION_DATA });
  

  const updateData = useCallback((partial: Partial<VisionBoardData>) => {
    setData(prev => ({ ...prev, ...partial }));
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return data.timeframes.length > 0;
      case 1: return data.selectedCategories.length > 0;
      case 2: return data.categoryDetails.length > 0;
      case 3: return data.title.trim().length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === 1) {
      // Initialize category details for newly selected categories
      const existingIds = data.categoryDetails.map(d => d.categoryId);
      const newDetails = data.selectedCategories
        .filter(id => !existingIds.includes(id))
        .map(id => ({
          categoryId: id,
          futureStatement: '',
          outcomes: ['', '', ''],
          actions: '',
          whyItMatters: '',
          note: '',
          image: null,
        }));
      const kept = data.categoryDetails.filter(d => data.selectedCategories.includes(d.categoryId));
      updateData({ categoryDetails: [...kept, ...newDetails] });
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Timeframe toggle
  const toggleTimeframe = (tf: Timeframe) => {
    const tfs = data.timeframes.includes(tf)
      ? data.timeframes.filter(t => t !== tf)
      : [...data.timeframes, tf];
    updateData({ timeframes: tfs });
  };

  // Category toggle
  const toggleCategory = (id: string) => {
    const cats = data.selectedCategories.includes(id)
      ? data.selectedCategories.filter(c => c !== id)
      : [...data.selectedCategories, id];
    updateData({ selectedCategories: cats });
  };

  // Update category detail
  const updateDetail = (index: number, partial: Partial<CategoryDetail>) => {
    const details = [...data.categoryDetails];
    details[index] = { ...details[index], ...partial };
    updateData({ categoryDetails: details });
  };

  const getCategoryName = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.name || id;
  const getCategoryIcon = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.icon || '📌';
  const getCategoryPlaceholder = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.placeholder || '';

  // STEP RENDERERS
  const renderTimeframe = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Your Vision Timeframe</h2>
        <p className="text-muted-foreground">How far into the future are you visioning? Pick one or more.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
        {(Object.keys(TIMEFRAME_LABELS) as Timeframe[]).map(tf => {
          const selected = data.timeframes.includes(tf);
          const isShort = ['1M','2M','3M','6M'].includes(tf);
          const isMedium = ['1Y','2Y','3Y'].includes(tf);
          return (
            <button
              key={tf}
              onClick={() => toggleTimeframe(tf)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-center group hover:scale-105 ${
                selected
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                  : 'border-border hover:border-primary/40 bg-card'
              }`}
            >
              {selected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <div className="text-2xl font-bold text-foreground">{tf}</div>
              <div className="text-xs text-muted-foreground mt-1">{TIMEFRAME_LABELS[tf]}</div>
              <div className={`text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block ${
                isShort ? 'bg-emerald-100 text-emerald-700' : isMedium ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {isShort ? 'Short-term' : isMedium ? 'Medium-term' : 'Long-term'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Vision Areas</h2>
        <p className="text-muted-foreground">
          Select the life areas that matter to you.
          <Badge variant="secondary" className="ml-2">{data.selectedCategories.length} selected</Badge>
        </p>
      </div>
      <div className="space-y-6 max-w-4xl mx-auto">
        {CATEGORY_GROUPS.map(group => (
          <div key={group.group}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>{group.icon}</span> {group.group}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {group.categories.map(cat => {
                const selected = data.selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 text-left ${
                      selected
                        ? 'border-primary bg-primary/10 text-foreground font-medium'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-primary ml-auto flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = ev => {
      updateDetail(index, { image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const renderDetails = () => {
    if (data.categoryDetails.length === 0) return null;

    return (
      <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Add Details & Images</h2>
          <p className="text-muted-foreground">Add optional notes and inspiration images for each area</p>
        </div>

        <div className="space-y-4">
          {data.categoryDetails.map((detail, index) => (
            <Card key={detail.categoryId} className="border-border/50">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(detail.categoryId)}</span>
                  <span className="font-semibold text-foreground">{getCategoryName(detail.categoryId)}</span>
                  <Input
                    placeholder={`e.g., ${getCategoryPlaceholder(detail.categoryId)}`}
                    value={detail.note}
                    onChange={e => updateDetail(index, { note: e.target.value })}
                    className="flex-1"
                  />
                </div>
                <div>
                  {detail.image ? (
                    <div className="relative inline-block">
                      <img src={detail.image} alt="Inspiration" className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        onClick={() => updateDetail(index, { image: null })}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      <Plus className="w-4 h-4" />
                      Add image (optional)
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderTitleQuote = () => (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Name Your Vision</h2>
        <p className="text-muted-foreground">Give your board a title and pick a quote that inspires you.</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">🏷️ Vision Board Title</Label>
            <Input
              placeholder={`e.g., "My ${data.timeframes[0] ? TIMEFRAME_LABELS[data.timeframes[0]] : ''} Transformation"`}
              value={data.title}
              onChange={e => updateData({ title: e.target.value })}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">💬 Main Quote / Affirmation</Label>
            <Textarea
              placeholder="Your main motivational quote..."
              value={data.mainQuote}
              onChange={e => updateData({ mainQuote: e.target.value })}
              rows={2}
              className="resize-none"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SUGGESTED_QUOTES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => updateData({ mainQuote: q })}
                  className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-primary/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">🌟 Affirmation Style</Label>
            <div className="flex gap-2">
              {(['confident', 'calm', 'motivational'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => updateData({ affirmationType: type })}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                    data.affirmationType === type
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {type === 'confident' ? '💪' : type === 'calm' ? '🧘' : '🔥'} {type}
                </button>
              ))}
            </div>
            <div className="mt-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground italic">
              "{AFFIRMATIONS[data.affirmationType]?.[0]}"
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        {step < STEPS.length - 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-1 mb-4">
              {STEPS.map((s, i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => {
                      if (i < step || (i === step)) return;
                      if (i <= step) setStep(i);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      i === step
                        ? 'bg-primary text-primary-foreground'
                        : i < step
                        ? 'bg-primary/20 text-foreground cursor-pointer'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        {step === 0 && renderTimeframe()}
        {step === 1 && renderCategories()}
        {step === 2 && renderDetails()}
        {step === 3 && renderTitleQuote()}
        {step === 4 && <VisionBoardPreview data={data} onDataChange={updateData} onBack={handleBack} />}

        {/* Navigation */}
        {step < STEPS.length - 1 && (
          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === STEPS.length - 2 ? (
                <>Preview Board <Eye className="w-4 h-4 ml-1" /></>
              ) : (
                <>Next <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionBoardWizard;
