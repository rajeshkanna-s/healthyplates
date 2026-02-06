export interface ValentineFormData {
  yourName: string;
  partnerName: string;
  relationshipType: string;
  loveStyle: string;
}

export interface DaySelection {
  dayNumber: number;
  messageIndices: number[]; // indices into dayMessages[dayNumber-1], max 3
}

export interface MemoryQuizItem {
  question: string;
  answer: string;
}

export interface DayContentData {
  day: number;
  name: string;
  emoji: string;
  title: string;
  text: string;
  buttonText: string;
  miniLine: string;
  promises?: string[];
  date: string;
  weekday: string;
}

export interface ValentineSurprise {
  formData: ValentineFormData;
  createdAt: string;
  shareUrl: string;
  customMessage?: string;
  selections: DaySelection[];
  memoryQuiz?: MemoryQuizItem[];
}

export interface ShareTextData {
  whatsapp: string;
  instagram: string;
  twitter: string;
  challenge: string;
}
