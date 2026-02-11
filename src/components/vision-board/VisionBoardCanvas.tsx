import React from 'react';
import { VisionBoardData, THEME_CONFIG, TIMEFRAME_LABELS, LayoutStyle } from './types';
import { ALL_CATEGORIES, AFFIRMATIONS } from './categoriesData';

interface Props {
  data: VisionBoardData;
  className?: string;
  exportStyle?: React.CSSProperties;
}

const VisionBoardCanvas = React.forwardRef<HTMLDivElement, Props>(({ data, className = '', exportStyle }, ref) => {
  const theme = THEME_CONFIG[data.colorTheme];
  const getCatName = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.name || id;
  const getCatIcon = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.icon || '📌';
  const affirmation = AFFIRMATIONS[data.affirmationType]?.[0] || '';
  const timeLabel = data.timeframes.map(t => TIMEFRAME_LABELS[t]).join(' + ');
  const year = new Date().getFullYear();
  const layout = data.layoutStyle;

  const isDark = ['midnight-dark', 'forest-deep', 'ocean-deep'].includes(data.colorTheme);
  const textMain = isDark ? 'text-white' : 'text-gray-800';
  const textSub = isDark ? 'text-white/80' : 'text-gray-700';
  const textMuted = isDark ? 'text-white/60' : 'text-gray-600';
  const badgeBg = isDark ? 'bg-white/20 text-white' : 'bg-white/40 text-gray-700';
  const cardBase = isDark ? 'bg-white/15 backdrop-blur-sm' : 'bg-white/85 backdrop-blur-sm';
  const footerBg = isDark ? 'bg-white/15' : 'bg-white/40';
  const brandColor = isDark ? 'text-white/30' : 'text-gray-500/50';

  const getGridClass = (): string => {
    const count = data.categoryDetails.length;
    switch (layout) {
      case 'centered':
        return 'flex flex-col items-center gap-4';
      case 'stacked':
        return 'flex flex-col gap-3';
      case 'cards-row':
        return 'flex flex-wrap justify-center gap-3';
      case 'masonry':
        return count <= 4 ? 'columns-2 gap-3 space-y-3' : 'columns-3 gap-3 space-y-3';
      case 'minimal':
        return count <= 3 ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-3 gap-4';
      case 'magazine': {
        return 'grid grid-cols-3 gap-3';
      }
      default: {
        if (count <= 4) return 'grid grid-cols-2 gap-3 md:gap-4';
        if (count <= 9) return 'grid grid-cols-3 gap-3 md:gap-4';
        return 'grid grid-cols-4 gap-3';
      }
    }
  };

  const getCardClass = (index: number): string => {
    const base = `${cardBase} transition-transform`;

    switch (layout) {
      case 'collage': {
        const rotations = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-0.5deg]', 'rotate-[2deg]', 'rotate-[-1deg]'];
        return `${base} rounded-2xl shadow-lg ${rotations[index % rotations.length]}`;
      }
      case 'minimal':
        return `${base} rounded-xl shadow-sm border ${isDark ? 'border-white/10' : 'border-gray-100'}`;
      case 'photo-focused':
        return `${base} rounded-2xl shadow-md`;
      case 'polaroid':
        return `${base} rounded-sm shadow-lg p-1 ${isDark ? 'bg-white/20' : 'bg-white'} border-b-8 ${isDark ? 'border-white/20' : 'border-white'}`;
      case 'magazine':
        return `${base} rounded-xl shadow-md ${index === 0 ? 'col-span-2 row-span-2' : ''}`;
      case 'bubble':
        return `${base} rounded-[2rem] shadow-md`;
      case 'stacked':
        return `${base} rounded-xl shadow-sm`;
      case 'centered':
        return `${base} rounded-2xl shadow-md w-full max-w-sm`;
      case 'cards-row':
        return `${base} rounded-xl shadow-md w-40`;
      case 'elegant':
        return `${base} rounded-3xl shadow-xl border-2 ${isDark ? 'border-white/20' : 'border-gray-200/50'}`;
      case 'masonry':
        return `${base} rounded-xl shadow-md break-inside-avoid`;
      default:
        return `${base} rounded-2xl shadow-md`;
    }
  };

  const renderCard = (detail: typeof data.categoryDetails[0], index: number) => {
    const hasImage = !!detail.image;
    const isFirstMagazine = layout === 'magazine' && index === 0;
    const imageHeight = layout === 'photo-focused' ? 'h-28' : isFirstMagazine ? 'h-40' : 'h-20';

    return (
      <div key={detail.categoryId} className={getCardClass(index)}>
        {hasImage && (
          <div className={`w-full ${imageHeight} overflow-hidden`}>
            <img
              src={detail.image!}
              alt={getCatName(detail.categoryId)}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        )}
        <div className={`${layout === 'minimal' ? 'p-4' : layout === 'polaroid' ? 'p-2' : 'p-3'}`}>
          <div className={`flex flex-col items-center text-center gap-1 ${layout === 'stacked' ? 'flex-row text-left gap-3' : ''} mb-1.5`}>
            <span className={`leading-none ${isFirstMagazine ? 'text-5xl' : 'text-3xl'}`}>
              {getCatIcon(detail.categoryId)}
            </span>
            <h3 className={`font-bold ${textMain} ${isFirstMagazine ? 'text-base' : 'text-xs md:text-sm'} leading-tight break-words w-full`}>
              {getCatName(detail.categoryId)}
            </h3>
          </div>
          {detail.note && (
            <p className={`${textMuted} text-[10px] md:text-xs leading-snug mb-1.5 ${layout === 'stacked' ? 'text-left' : 'text-center'} break-words`}>
              {detail.note}
            </p>
          )}
          {!detail.note && detail.futureStatement && (
            <p className={`${textMuted} text-[10px] md:text-xs italic leading-snug mb-1.5 text-center break-words`}>
              {detail.futureStatement}
            </p>
          )}
          {!['minimal', 'bubble', 'cards-row'].includes(layout) && detail.outcomes.filter(Boolean).length > 0 && (
            <ul className="space-y-0.5 mb-1.5">
              {detail.outcomes.filter(Boolean).slice(0, 3).map((o, oi) => (
                <li key={oi} className={`flex items-start gap-1 text-[10px] ${textMuted} leading-tight`}>
                  <span className={`mt-1 w-1 h-1 rounded-full ${isDark ? 'bg-white/40' : 'bg-gray-400'} flex-shrink-0`} />
                  <span className="break-words min-w-0">{o}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br ${theme.gradient} p-8 md:p-12 rounded-3xl overflow-hidden ${className}`}
      style={{ minHeight: '500px', ...exportStyle }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-block px-5 py-1.5 rounded-full ${badgeBg} backdrop-blur-sm text-sm font-semibold mb-3 shadow-sm`}>
          {timeLabel} Vision
        </div>
        <h1 className={`text-4xl md:text-6xl font-black ${textMain} leading-tight mb-2 tracking-tight`}>
          {data.title || year.toString()}
        </h1>
        {data.mainQuote && (
          <p className={`text-base md:text-lg ${textSub} italic max-w-md mx-auto font-medium leading-snug`}>
            "{data.mainQuote}"
          </p>
        )}
      </div>

      {/* Category tiles */}
      <div className={`${getGridClass()} max-w-3xl mx-auto`}>
        {data.categoryDetails.map((detail, i) => renderCard(detail, i))}
      </div>

      {/* Affirmation footer */}
      {affirmation && (
        <div className="mt-8 text-center">
          <div className={`inline-block px-6 py-3 rounded-2xl ${footerBg} backdrop-blur-sm shadow-sm`}>
            <p className={`text-sm md:text-base font-semibold ${textSub} italic`}>
              ✨ {affirmation}
            </p>
          </div>
        </div>
      )}

      {/* Branding */}
      <div className="mt-5 text-center">
        <p className={`text-[9px] ${brandColor} font-medium`}>
          Created with HealthyPlates Vision Board
        </p>
      </div>
    </div>
  );
});

VisionBoardCanvas.displayName = 'VisionBoardCanvas';

export default VisionBoardCanvas;
