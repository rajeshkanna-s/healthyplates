import { Practice, Affirmation, WisdomCard } from './types';

export const practices: Practice[] = [
  {
    id: "breathing",
    title: "Mindful Breathing",
    summary: "Recenter quickly with guided breath cycles.",
    lead: "A simple breathing pattern to calm the nervous system. Great for stress relief, pauses during workouts, and quick resets.",
    benefits: ["Reduces stress", "Lowers heart rate", "Improves focus"],
    steps: [
      "Find a comfortable seated position.",
      "Close your eyes gently.",
      "Breathe in deeply through your nose for 4 counts.",
      "Hold your breath for 4 counts.",
      "Exhale slowly through your mouth for 6 counts.",
      "Repeat for 5–10 minutes."
    ],
    durations: [3, 5, 10],
    icon: "Wind"
  },
  {
    id: "meditation",
    title: "Silent Meditation",
    summary: "Build attention and clarity through focused quiet.",
    lead: "Practice noticing your breath and returning gently whenever the mind wanders. This strengthens attention and reduces reactivity.",
    benefits: ["Improves concentration", "Enhances emotional balance", "Supports sleep"],
    steps: [
      "Sit in a quiet space with your spine straight.",
      "Rest your hands on your knees or lap.",
      "Focus your attention on your breath.",
      "When thoughts arise, acknowledge them without judgment.",
      "Gently return your focus to your breath.",
      "Continue for 10–20 minutes."
    ],
    durations: [5, 10, 15, 20],
    icon: "Brain"
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    summary: "Cultivate joy by noticing what's good today.",
    lead: "A short, heart-opening exercise to notice blessings and lift your mood.",
    benefits: ["Boosts positivity", "Strengthens relationships", "Improves wellbeing"],
    steps: [
      "Take a moment to settle into stillness.",
      "Think of three things you are grateful for today.",
      "Feel the gratitude in your heart.",
      "Visualize each blessing with appreciation.",
      "Send thanks to those who have helped you.",
      "End with a smile and a deep breath."
    ],
    durations: [3, 5, 7],
    icon: "Heart"
  }
];

export const affirmations: Affirmation[] = [
  {
    id: "morning",
    label: "Morning Intention",
    text: "I embrace this day with an open heart and peaceful mind"
  },
  {
    id: "midday",
    label: "Midday Reminder",
    text: "I am worthy of love, peace, and all good things"
  },
  {
    id: "evening",
    label: "Evening Reflection",
    text: "I release what no longer serves me and rest in gratitude"
  },
  {
    id: "bedtime",
    label: "Bedtime Blessing",
    text: "I trust in the wisdom of my journey and sleep peacefully"
  }
];

export const wisdomCards: WisdomCard[] = [
  {
    tradition: "Buddhism",
    emoji: "🕉️",
    text: "Mindfulness, compassion, and liberation from suffering"
  },
  {
    tradition: "Sufism",
    emoji: "☪️",
    text: "Divine love, poetry, and mystical union"
  },
  {
    tradition: "Taoism",
    emoji: "☯️",
    text: "Flow, balance, and harmony with nature"
  },
  {
    tradition: "Universal",
    emoji: "✨",
    text: "Compassion, peace, and loving kindness"
  }
];
