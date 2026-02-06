export interface ValentineFormData {
  yourName: string;
  partnerName: string;
  relationshipType: string;
  loveStyle: string;
  partnerPhoto: string | null;
  yourPhoto: string | null;
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
}

export interface ValentineSurprise {
  formData: ValentineFormData;
  createdAt: string;
  shareUrl: string;
}

export interface ShareTextData {
  whatsapp: string;
  instagram: string;
  twitter: string;
  challenge: string;
}
