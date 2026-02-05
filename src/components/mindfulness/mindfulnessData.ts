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
  },
  {
    id: "strength",
    label: "Inner Strength",
    text: "I am resilient, capable, and growing stronger every day"
  },
  {
    id: "peace",
    label: "Finding Peace",
    text: "In stillness, I find clarity. In breath, I find calm"
  },
  {
    id: "self-love",
    label: "Self-Love",
    text: "I treat myself with kindness, patience, and understanding"
  },
  {
    id: "abundance",
    label: "Abundance Mindset",
    text: "I am surrounded by abundance and open to receiving good things"
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
    tradition: "Hinduism",
    emoji: "🙏",
    text: "Unity of self with the divine through meditation and devotion"
  },
  {
    tradition: "Stoicism",
    emoji: "🏛️",
    text: "Inner peace through acceptance and virtue"
  },
  {
    tradition: "Zen",
    emoji: "🎋",
    text: "Present-moment awareness and simplicity"
  },
  {
    tradition: "Universal",
    emoji: "✨",
    text: "Compassion, peace, and loving kindness"
  },
  {
    tradition: "Indigenous",
    emoji: "🌿",
    text: "Connection with nature and ancestral wisdom"
  }
];

// Quick mindfulness tips for daily practice
export const mindfulnessTips = [
  {
    id: "tip1",
    title: "Start Small",
    description: "Begin with just 2 minutes of breathing. Consistency matters more than duration.",
    icon: "Clock"
  },
  {
    id: "tip2",
    title: "Morning Ritual",
    description: "Practice gratitude before checking your phone. It sets a positive tone for the day.",
    icon: "Sunrise"
  },
  {
    id: "tip3",
    title: "Mindful Eating",
    description: "Take three deep breaths before meals. Notice colors, textures, and flavors.",
    icon: "Utensils"
  },
  {
    id: "tip4",
    title: "Walking Meditation",
    description: "Feel each step. Notice the ground beneath you during your daily walk.",
    icon: "Footprints"
  },
  {
    id: "tip5",
    title: "Body Scan",
    description: "Before sleep, mentally scan from head to toe, releasing tension in each area.",
    icon: "User"
  },
  {
    id: "tip6",
    title: "Pause & Breathe",
    description: "Set hourly reminders to take 3 conscious breaths throughout your day.",
    icon: "Bell"
  }
];

// Mindfulness quotes for inspiration
export const mindfulnessQuotes = [
  {
    quote: "The present moment is the only moment available to us, and it is the door to all moments.",
    author: "Thich Nhat Hanh"
  },
  {
    quote: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh"
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    quote: "Be where you are, not where you think you should be.",
    author: "Unknown"
  },
  {
    quote: "In today's rush, we all think too much, seek too much, want too much, and forget about the joy of just being.",
    author: "Eckhart Tolle"
  },
  {
    quote: "Mindfulness is a way of befriending ourselves and our experience.",
    author: "Jon Kabat-Zinn"
  },
  {
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James"
  },
  {
    quote: "Smile, breathe, and go slowly.",
    author: "Thich Nhat Hanh"
  }
];
