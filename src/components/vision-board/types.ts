export type Timeframe = '1M' | '2M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' | '7Y' | '10Y';

export type ColorTheme = 'fresh-green' | 'calm-blue' | 'sunrise-orange' | 'minimal-white';

export type LayoutStyle = 'classic-grid' | 'collage' | 'minimal' | 'photo-focused';

export type OutputSize = 'a4' | 'a3' | '12x18' | '18x24' | 'instagram-post' | 'instagram-story' | 'whatsapp-status';

export type Quality = 'hd' | '2k' | '4k' | 'print';

export type ExportFormat = 'png' | 'jpeg' | 'pdf';

export interface CategoryGroup {
  group: string;
  icon: string;
  categories: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  placeholder: string;
}

export interface CategoryDetail {
  categoryId: string;
  futureStatement: string;
  outcomes: string[];
  actions: string;
  whyItMatters: string;
  image?: string | null;
}

export interface VisionBoardData {
  timeframes: Timeframe[];
  selectedCategories: string[];
  categoryDetails: CategoryDetail[];
  title: string;
  mainQuote: string;
  affirmationType: 'confident' | 'calm' | 'motivational';
  colorTheme: ColorTheme;
  layoutStyle: LayoutStyle;
  selectedSizes: OutputSize[];
  quality: Quality;
  format: ExportFormat;
}

export const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  '1M': '1 Month',
  '2M': '2 Months',
  '3M': '3 Months',
  '6M': '6 Months',
  '1Y': '1 Year',
  '2Y': '2 Years',
  '3Y': '3 Years',
  '5Y': '5 Years',
  '7Y': '7 Years',
  '10Y': '10 Years',
};

export const THEME_CONFIG: Record<ColorTheme, { name: string; gradient: string; accent: string; bg: string; text: string; cardBg: string; cardBorder: string }> = {
  'fresh-green': {
    name: 'Fresh Green',
    gradient: 'from-emerald-400 via-green-300 to-yellow-200',
    accent: 'bg-emerald-500',
    bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50',
    text: 'text-emerald-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-emerald-200',
  },
  'calm-blue': {
    name: 'Calm Blue',
    gradient: 'from-teal-400 via-cyan-300 to-sky-200',
    accent: 'bg-teal-500',
    bg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50',
    text: 'text-teal-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-teal-200',
  },
  'sunrise-orange': {
    name: 'Sunrise Orange',
    gradient: 'from-orange-400 via-amber-300 to-yellow-200',
    accent: 'bg-orange-500',
    bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
    text: 'text-orange-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-orange-200',
  },
  'minimal-white': {
    name: 'Minimal White',
    gradient: 'from-gray-200 via-stone-100 to-white',
    accent: 'bg-gray-700',
    bg: 'bg-gradient-to-br from-stone-50 via-gray-50 to-white',
    text: 'text-gray-900',
    cardBg: 'bg-white/90',
    cardBorder: 'border-gray-200',
  },
};

export const DEFAULT_VISION_DATA: VisionBoardData = {
  timeframes: [],
  selectedCategories: [],
  categoryDetails: [],
  title: '',
  mainQuote: '',
  affirmationType: 'motivational',
  colorTheme: 'fresh-green',
  layoutStyle: 'classic-grid',
  selectedSizes: ['a4'],
  quality: '4k',
  format: 'png',
};
