import React from 'react';
import { VisionBoardData, THEME_CONFIG, TIMEFRAME_LABELS, LayoutStyle } from './types';
import { ALL_CATEGORIES, AFFIRMATIONS } from './categoriesData';

interface Props {
  data: VisionBoardData;
  className?: string;
}

const VisionBoardCanvas = React.forwardRef<HTMLDivElement, Props>(({ data, className = '' }, ref) => {
  const theme = THEME_CONFIG[data.colorTheme];
  const getCatName = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.name || id;
  const getCatIcon = (id: string) => ALL_CATEGORIES.find(c => c.id === id)?.icon || '📌';
  const affirmation = AFFIRMATIONS[data.affirmationType]?.[0] || '';
  const timeLabel = data.timeframes.map(t => TIMEFRAME_LABELS[t]).join(' + ');

  const isMinimal = data.layoutStyle === 'minimal';
  const isCollage = data.layoutStyle === 'collage';
  const isPhotoFocused = data.layoutStyle === 'photo-focused';

  const gridCols = () => {
    const count = data.categoryDetails.length;
    if (isMinimal) return count <= 3 ? 'grid-cols-1' : 'grid-cols-2';
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br ${theme.gradient} p-6 md:p-10 rounded-3xl ${className}`}
      style={{ minHeight: '600px' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-sm text-sm font-medium mb-3">
          {timeLabel} Vision
        </div>
        <h1 className={`text-3xl md:text-5xl font-extrabold ${theme.text} leading-tight mb-3 drop-shadow-sm`}>
          {data.title || 'My Vision Board'}
        </h1>
        {data.mainQuote && (
          <p className={`text-lg md:text-xl ${theme.text} opacity-80 italic max-w-xl mx-auto font-medium`}>
            "{data.mainQuote}"
          </p>
        )}
      </div>

      {/* Category cards grid */}
      <div className={`grid ${gridCols()} gap-4 md:gap-5`}>
        {data.categoryDetails.map((detail, i) => {
          const hasImage = !!detail.image;
          const rotateClass = isCollage ? (i % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]') : '';

          return (
            <div
              key={detail.categoryId}
              className={`${theme.cardBg} backdrop-blur-md rounded-2xl border ${theme.cardBorder} overflow-hidden transition-transform hover:scale-[1.02] shadow-lg ${rotateClass} ${
                isPhotoFocused && hasImage ? 'row-span-2' : ''
              }`}
            >
              {/* Optional image */}
              {hasImage && (
                <div className={`w-full ${isPhotoFocused ? 'h-48' : 'h-32'} overflow-hidden`}>
                  <img
                    src={detail.image!}
                    alt={getCatName(detail.categoryId)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`p-4 ${isMinimal ? 'p-6' : 'p-4'}`}>
                {/* Category header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getCatIcon(detail.categoryId)}</span>
                  <h3 className={`font-bold ${theme.text} text-sm md:text-base`}>
                    {getCatName(detail.categoryId)}
                  </h3>
                </div>

                {/* Future statement */}
                {detail.futureStatement && (
                  <p className={`${theme.text} opacity-70 text-xs md:text-sm italic mb-2`}>
                    "{detail.futureStatement}"
                  </p>
                )}

                {/* Outcomes */}
                {!isMinimal && detail.outcomes.filter(Boolean).length > 0 && (
                  <ul className="space-y-1 mb-2">
                    {detail.outcomes.filter(Boolean).map((o, oi) => (
                      <li key={oi} className={`flex items-start gap-1.5 text-xs ${theme.text} opacity-80`}>
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Actions */}
                {detail.actions && !isMinimal && (
                  <p className={`text-[11px] ${theme.text} opacity-60 mb-1`}>
                    📅 {detail.actions}
                  </p>
                )}

                {/* Why it matters */}
                {detail.whyItMatters && (
                  <p className={`text-[11px] ${theme.text} opacity-50 italic`}>
                    💖 {detail.whyItMatters}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Affirmation footer */}
      {affirmation && (
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-sm">
            <p className={`text-sm md:text-base font-semibold ${theme.text} italic`}>
              ✨ {affirmation}
            </p>
          </div>
        </div>
      )}

      {/* Branding */}
      <div className="mt-6 text-center">
        <p className={`text-[10px] ${theme.text} opacity-30`}>
          Created with HealthyPlates Vision Board
        </p>
      </div>
    </div>
  );
});

VisionBoardCanvas.displayName = 'VisionBoardCanvas';

export default VisionBoardCanvas;
