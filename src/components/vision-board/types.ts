export type Timeframe = '1M' | '2M' | '3M' | '6M' | '1Y' | '2Y' | '3Y' | '5Y' | '7Y' | '10Y';

export type ColorTheme =
  | 'fresh-green' | 'calm-blue' | 'sunrise-orange' | 'minimal-white'
  | 'rose-pink' | 'lavender-dream' | 'sunset-fire' | 'forest-deep'
  | 'midnight-dark' | 'golden-luxury' | 'coral-peach' | 'arctic-frost'
  | 'berry-blast' | 'ocean-deep';

export type LayoutStyle =
  | 'classic-grid' | 'collage' | 'minimal' | 'photo-focused'
  | 'masonry' | 'centered' | 'polaroid' | 'magazine'
  | 'bubble' | 'stacked' | 'cards-row' | 'elegant';

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
  note: string;
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
  'rose-pink': {
    name: 'Rose Pink',
    gradient: 'from-pink-400 via-rose-300 to-fuchsia-200',
    accent: 'bg-pink-500',
    bg: 'bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50',
    text: 'text-pink-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-pink-200',
  },
  'lavender-dream': {
    name: 'Lavender Dream',
    gradient: 'from-violet-400 via-purple-300 to-indigo-200',
    accent: 'bg-violet-500',
    bg: 'bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50',
    text: 'text-violet-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-violet-200',
  },
  'sunset-fire': {
    name: 'Sunset Fire',
    gradient: 'from-red-500 via-orange-400 to-yellow-300',
    accent: 'bg-red-500',
    bg: 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50',
    text: 'text-red-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-red-200',
  },
  'forest-deep': {
    name: 'Forest Deep',
    gradient: 'from-green-700 via-emerald-600 to-teal-500',
    accent: 'bg-green-700',
    bg: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50',
    text: 'text-green-100',
    cardBg: 'bg-white/20',
    cardBorder: 'border-green-400/30',
  },
  'midnight-dark': {
    name: 'Midnight Dark',
    gradient: 'from-gray-900 via-slate-800 to-zinc-700',
    accent: 'bg-gray-900',
    bg: 'bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-700',
    text: 'text-gray-100',
    cardBg: 'bg-white/10',
    cardBorder: 'border-gray-600',
  },
  'golden-luxury': {
    name: 'Golden Luxury',
    gradient: 'from-yellow-600 via-amber-400 to-yellow-200',
    accent: 'bg-yellow-600',
    bg: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
    text: 'text-yellow-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-yellow-300',
  },
  'coral-peach': {
    name: 'Coral Peach',
    gradient: 'from-rose-400 via-pink-300 to-orange-200',
    accent: 'bg-rose-500',
    bg: 'bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50',
    text: 'text-rose-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-rose-200',
  },
  'arctic-frost': {
    name: 'Arctic Frost',
    gradient: 'from-sky-300 via-blue-200 to-indigo-100',
    accent: 'bg-sky-500',
    bg: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50',
    text: 'text-sky-900',
    cardBg: 'bg-white/85',
    cardBorder: 'border-sky-200',
  },
  'berry-blast': {
    name: 'Berry Blast',
    gradient: 'from-purple-500 via-fuchsia-400 to-pink-300',
    accent: 'bg-purple-600',
    bg: 'bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50',
    text: 'text-purple-900',
    cardBg: 'bg-white/80',
    cardBorder: 'border-purple-200',
  },
  'ocean-deep': {
    name: 'Ocean Deep',
    gradient: 'from-blue-700 via-cyan-500 to-teal-400',
    accent: 'bg-blue-700',
    bg: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50',
    text: 'text-blue-100',
    cardBg: 'bg-white/20',
    cardBorder: 'border-blue-400/30',
  },
};

export const LAYOUT_CONFIG: Record<LayoutStyle, { name: string; icon: string }> = {
  'classic-grid': { name: 'Classic Grid', icon: '⊞' },
  'collage': { name: 'Collage', icon: '🎨' },
  'minimal': { name: 'Minimal', icon: '◻️' },
  'photo-focused': { name: 'Photo Focus', icon: '📷' },
  'masonry': { name: 'Masonry', icon: '🧱' },
  'centered': { name: 'Centered', icon: '🎯' },
  'polaroid': { name: 'Polaroid', icon: '🖼️' },
  'magazine': { name: 'Magazine', icon: '📰' },
  'bubble': { name: 'Bubble', icon: '🫧' },
  'stacked': { name: 'Stacked', icon: '📚' },
  'cards-row': { name: 'Card Rows', icon: '🃏' },
  'elegant': { name: 'Elegant', icon: '✨' },
};

export const SIZE_DIMENSIONS: Record<OutputSize, { width: number; height: number; label: string }> = {
  a4: { width: 794, height: 1123, label: 'A4 (21×29.7cm)' },
  a3: { width: 1123, height: 1587, label: 'A3 (29.7×42cm)' },
  '12x18': { width: 864, height: 1296, label: '12×18" Poster' },
  '18x24': { width: 1296, height: 1728, label: '18×24" Poster' },
  'instagram-post': { width: 1080, height: 1080, label: 'IG Post (1080×1080)' },
  'instagram-story': { width: 1080, height: 1920, label: 'IG Story (1080×1920)' },
  'whatsapp-status': { width: 1080, height: 1920, label: 'WhatsApp (1080×1920)' },
};

export const QUALITY_SCALE: Record<Quality, number> = {
  hd: 1,
  '2k': 1.5,
  '4k': 2,
  print: 3,
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
