import { OccasionCategory } from "./types";

export const occasionCategories: OccasionCategory[] = [
  {
    id: "personal",
    label: "Personal Life Events",
    emoji: "🎂",
    occasions: [
      { id: "birthday", label: "Birthday", emoji: "🎂" },
      { id: "wedding", label: "Wedding / Marriage", emoji: "💒" },
      { id: "engagement", label: "Engagement", emoji: "💍" },
      { id: "anniversary", label: "Anniversary", emoji: "💑" },
      { id: "new_baby", label: "New Baby / Baby Shower", emoji: "👶" },
      { id: "housewarming", label: "Housewarming / New Home", emoji: "🏠" },
      { id: "farewell", label: "Farewell / Goodbye", emoji: "👋" },
    ],
  },
  {
    id: "festivals",
    label: "Festivals & Religious",
    emoji: "🎆",
    occasions: [
      { id: "new_year", label: "New Year", emoji: "🎉" },
      { id: "christmas", label: "Christmas", emoji: "🎄" },
      { id: "diwali", label: "Diwali", emoji: "🪔" },
      { id: "eid", label: "Eid", emoji: "🌙" },
      { id: "navratri", label: "Navratri / Dussehra", emoji: "🙏" },
      { id: "holi", label: "Holi", emoji: "🎨" },
      { id: "pongal", label: "Pongal / Makar Sankranti", emoji: "🌾" },
      { id: "onam", label: "Onam / Vishu", emoji: "🌸" },
      { id: "raksha_bandhan", label: "Raksha Bandhan", emoji: "🧶" },
      { id: "bhai_dooj", label: "Bhai Dooj", emoji: "👫" },
      { id: "thanksgiving", label: "Thanksgiving", emoji: "🦃" },
    ],
  },
  {
    id: "love",
    label: "Love & Relationship Days",
    emoji: "❤️",
    occasions: [
      { id: "valentines", label: "Valentine's Day", emoji: "💝" },
    ],
  },
  {
    id: "professional",
    label: "Professional / Academic",
    emoji: "💼",
    occasions: [
      { id: "new_job", label: "New Job", emoji: "💼" },
      { id: "promotion", label: "Promotion", emoji: "📈" },
      { id: "exam", label: "Exam Wishes", emoji: "📚" },
      { id: "result", label: "Result Congratulations", emoji: "🏆" },
      { id: "work_anniversary", label: "Work Anniversary", emoji: "🎖️" },
      { id: "business_opening", label: "Business Opening", emoji: "🏪" },
    ],
  },
  {
    id: "general",
    label: "General Good Wishes",
    emoji: "✨",
    occasions: [
      { id: "get_well", label: "Get Well Soon", emoji: "🌻" },
      { id: "congratulations", label: "Congratulations", emoji: "🎊" },
      { id: "sorry", label: "Sorry / Apology", emoji: "🙇" },
      { id: "thank_you", label: "Thank You / Appreciation", emoji: "🙏" },
    ],
  },
];
