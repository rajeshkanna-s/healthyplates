import React from 'react';
import { VisionBoardData, THEME_CONFIG, TIMEFRAME_LABELS } from './types';
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
  const year = new Date().getFullYear();

  const isMinimal = data.layoutStyle === 'minimal';
  const isCollage = data.layoutStyle === 'collage';
  const isPhotoFocused = data.layoutStyle === 'photo-focused';

  const gridCols = () => {
    const count = data.categoryDetails.length;
    if (isMinimal) return count <= 3 ? 'grid-cols-2' : 'grid-cols-3';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br ${theme.gradient} p-8 md:p-12 rounded-3xl overflow-hidden ${className}`}
      style={{ minHeight: '500px' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-5 py-1.5 rounded-full bg-white/40 backdrop-blur-sm text-sm font-semibold text-gray-700 mb-3 shadow-sm">
          {timeLabel} Vision
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight mb-2 tracking-tight">
          {data.title || year.toString()}
        </h1>
        {data.mainQuote && (
          <p className="text-base md:text-lg text-gray-700 italic max-w-md mx-auto font-medium leading-snug">
            "{data.mainQuote}"
          </p>
        )}
      </div>

      {/* Category tiles grid */}
      <div className={`grid ${gridCols()} gap-3 md:gap-4 max-w-3xl mx-auto`}>
        {data.categoryDetails.map((detail, i) => {
          const hasImage = !!detail.image;
          const rotateClass = isCollage ? (i % 3 === 0 ? 'rotate-[-1.5deg]' : i % 3 === 1 ? 'rotate-[1deg]' : 'rotate-[-0.5deg]') : '';

          return (
            <div
              key={detail.categoryId}
              className={`bg-white/85 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.03] ${rotateClass} ${
                isPhotoFocused && hasImage ? 'row-span-2' : ''
              }`}
            >
              {/* Optional image */}
              {hasImage && (
                <div className={`w-full ${isPhotoFocused ? 'h-28' : 'h-20'} overflow-hidden`}>
                  <img
                    src={detail.image!}
                    alt={getCatName(detail.categoryId)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`p-3 ${isMinimal ? 'p-4' : 'p-3'} overflow-hidden`}>
                {/* Icon + Name - compact tile style */}
                <div className="flex flex-col items-center text-center gap-1 mb-1.5">
                  <span className="text-3xl leading-none">{getCatIcon(detail.categoryId)}</span>
                  <h3 className="font-bold text-gray-800 text-xs md:text-sm leading-tight break-words w-full overflow-hidden">
                    {getCatName(detail.categoryId)}
                  </h3>
                </div>

                {/* Note */}
                {detail.note && (
                  <p className="text-gray-600 text-[10px] md:text-xs leading-snug mb-1.5 line-clamp-2 text-center break-words overflow-hidden">
                    {detail.note}
                  </p>
                )}

                {/* Future statement (legacy support) */}
                {!detail.note && detail.futureStatement && (
                  <p className="text-gray-600 text-[10px] md:text-xs italic leading-snug mb-1.5 line-clamp-2 text-center break-words overflow-hidden">
                    {detail.futureStatement}
                  </p>
                )}

                {/* Outcomes */}
                {!isMinimal && detail.outcomes.filter(Boolean).length > 0 && (
                  <ul className="space-y-0.5 mb-1.5">
                    {detail.outcomes.filter(Boolean).slice(0, 3).map((o, oi) => (
                      <li key={oi} className="flex items-start gap-1 text-[10px] text-gray-600 leading-tight overflow-hidden">
                        <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1 break-words min-w-0">{o}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Affirmation footer */}
      {affirmation && (
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm">
            <p className="text-sm md:text-base font-semibold text-gray-700 italic">
              ✨ {affirmation}
            </p>
          </div>
        </div>
      )}

      {/* Branding */}
      <div className="mt-5 text-center">
        <p className="text-[9px] text-gray-500/50 font-medium">
          Created with HealthyPlates Vision Board
        </p>
      </div>
    </div>
  );
});

VisionBoardCanvas.displayName = 'VisionBoardCanvas';

export default VisionBoardCanvas;
