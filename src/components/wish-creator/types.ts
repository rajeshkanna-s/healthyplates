export interface OccasionCategory {
  id: string;
  label: string;
  emoji: string;
  occasions: Occasion[];
}

export interface Occasion {
  id: string;
  label: string;
  emoji: string;
}

export interface WishInput {
  occasion: string;
  category: string;
  recipientName: string;
  relationship: string;
  tone: string;
  length: "short" | "medium" | "long";
  extraDetails: string;
}

export interface GeneratedWish {
  type: string;
  label: string;
  text: string;
}

export interface WishResult {
  occasion: string;
  category: string;
  tone: string;
  relationship: string;
  recipientName: string;
  wishes: GeneratedWish[];
}

export const relationships = [
  "Friend", "Best Friend", "Mother", "Father", "Sister", "Brother",
  "Wife", "Husband", "Girlfriend", "Boyfriend", "Cousin",
  "Colleague", "Boss", "Teacher", "Mentor", "Neighbour", "General"
];

export const tones = [
  { value: "simple", label: "Simple", emoji: "📝" },
  { value: "heartfelt", label: "Heartfelt", emoji: "💖" },
  { value: "funny", label: "Funny", emoji: "😄" },
  { value: "formal", label: "Formal", emoji: "🎩" },
  { value: "romantic", label: "Romantic", emoji: "💕" },
  { value: "emotional", label: "Emotional", emoji: "🥺" },
];

export const lengths = [
  { value: "short" as const, label: "Short", desc: "1–2 lines" },
  { value: "medium" as const, label: "Medium", desc: "3–4 lines" },
  { value: "long" as const, label: "Long", desc: "5–8 lines" },
];
