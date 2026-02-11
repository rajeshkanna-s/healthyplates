import { CategoryGroup } from './types';

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    group: 'Career & Professional',
    icon: '💼',
    categories: [
      { id: 'career-growth', name: 'Career Growth', icon: '📈', placeholder: 'Get promoted, lead a team...' },
      { id: 'entrepreneurship', name: 'Entrepreneurship', icon: '🚀', placeholder: 'Launch my side business...' },
      { id: 'leadership', name: 'Leadership Skills', icon: '👑', placeholder: 'Become a confident leader...' },
      { id: 'networking', name: 'Professional Networking', icon: '🤝', placeholder: 'Build meaningful connections...' },
    ],
  },
  {
    group: 'Finance & Wealth',
    icon: '💰',
    categories: [
      { id: 'financial-freedom', name: 'Financial Freedom', icon: '🏦', placeholder: 'Achieve financial independence...' },
      { id: 'savings', name: 'Savings Goals', icon: '🐖', placeholder: 'Save ₹X / $X by...' },
      { id: 'investments', name: 'Investments', icon: '📊', placeholder: 'Start SIP, diversify portfolio...' },
      { id: 'income-growth', name: 'Income Growth', icon: '💸', placeholder: 'Increase income by X%...' },
      { id: 'debt-free', name: 'Debt-Free Goals', icon: '🔓', placeholder: 'Pay off all loans...' },
      { id: 'major-purchases', name: 'Major Purchases', icon: '🏡', placeholder: 'Buy a home, new car...' },
    ],
  },
  {
    group: 'Health & Wellness',
    icon: '💪',
    categories: [
      { id: 'physical-fitness', name: 'Physical Fitness', icon: '🏋️', placeholder: 'Run 5K, do 20 pushups...' },
      { id: 'healthy-eating', name: 'Healthy Eating', icon: '🥗', placeholder: 'Cook at home, less junk...' },
      { id: 'weight-management', name: 'Weight Management', icon: '⚖️', placeholder: 'Reach ideal weight of...' },
      { id: 'mental-health', name: 'Mental Health', icon: '🧠', placeholder: 'Feel calm, manage anxiety...' },
      { id: 'sleep-rest', name: 'Sleep & Rest', icon: '😴', placeholder: '8 hours sleep, better routine...' },
      { id: 'medical-checkups', name: 'Medical Checkups', icon: '🩺', placeholder: 'Annual checkup, dental visit...' },
      { id: 'stress-management', name: 'Stress Management', icon: '🧘', placeholder: 'Daily breathing, less worry...' },
      { id: 'active-lifestyle', name: 'Active Lifestyle', icon: '🚶', placeholder: '10K steps daily, outdoor play...' },
    ],
  },
  {
    group: 'Relationships & Social',
    icon: '❤️',
    categories: [
      { id: 'family-bonding', name: 'Family Bonding', icon: '👨‍👩‍👧‍👦', placeholder: 'Weekly family dinners, trips...' },
      { id: 'friendships', name: 'Friendships', icon: '👯', placeholder: 'Reconnect with old friends...' },
      { id: 'romantic-goals', name: 'Romantic Relationship', icon: '💕', placeholder: 'Deeper connection, date nights...' },
      { id: 'communication', name: 'Communication Skills', icon: '🗣️', placeholder: 'Listen more, express better...' },
      { id: 'social-connections', name: 'Social Connections', icon: '🌐', placeholder: 'Join communities, meet people...' },
      { id: 'community', name: 'Community Engagement', icon: '🏘️', placeholder: 'Volunteer locally, help neighbors...' },
    ],
  },
  {
    group: 'Personal Growth',
    icon: '🌱',
    categories: [
      { id: 'self-confidence', name: 'Self-Confidence', icon: '💎', placeholder: 'Speak up, believe in myself...' },
      { id: 'discipline', name: 'Discipline & Habits', icon: '⏰', placeholder: 'Wake early, stay consistent...' },
      { id: 'learning', name: 'Learning New Skills', icon: '📚', placeholder: 'Learn a language, new tech...' },
      { id: 'emotional-intelligence', name: 'Emotional Intelligence', icon: '🎭', placeholder: 'Handle emotions, empathy...' },
      { id: 'self-discovery', name: 'Self-Discovery', icon: '🔍', placeholder: 'Understand my values, purpose...' },
      { id: 'mindset', name: 'Mindset Transformation', icon: '🧩', placeholder: 'Growth mindset, positive thinking...' },
    ],
  },
  {
    group: 'Spiritual & Mindfulness',
    icon: '🕊️',
    categories: [
      { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️', placeholder: 'Daily 10-min meditation...' },
      { id: 'mindfulness', name: 'Mindfulness', icon: '🌸', placeholder: 'Present moment, less phone...' },
      { id: 'gratitude', name: 'Gratitude Practice', icon: '🙏', placeholder: 'Daily gratitude journal...' },
      { id: 'faith', name: 'Prayer / Faith', icon: '✨', placeholder: 'Deepen spiritual connection...' },
    ],
  },
  {
    group: 'Travel & Lifestyle',
    icon: '✈️',
    categories: [
      { id: 'travel', name: 'Travel Goals', icon: '🌍', placeholder: 'Visit Japan, Europe trip...' },
      { id: 'adventure', name: 'Adventure Activities', icon: '🏔️', placeholder: 'Skydiving, scuba diving...' },
      { id: 'bucket-list', name: 'Bucket List', icon: '📝', placeholder: 'Northern lights, safari...' },
      { id: 'luxury', name: 'Luxury Lifestyle', icon: '🥂', placeholder: 'Fine dining, premium experiences...' },
      { id: 'minimalism', name: 'Minimalism & Declutter', icon: '🗂️', placeholder: 'Own less, live more...' },
    ],
  },
  {
    group: 'Home & Living',
    icon: '🏠',
    categories: [
      { id: 'interior-design', name: 'Home Interior', icon: '🛋️', placeholder: 'Cozy living room, art walls...' },
      { id: 'dream-home', name: 'Dream Home', icon: '🏡', placeholder: 'Garden, balcony, open kitchen...' },
      { id: 'workspace', name: 'Workspace Setup', icon: '🖥️', placeholder: 'Standing desk, dual monitors...' },
      { id: 'home-organization', name: 'Home Organization', icon: '📦', placeholder: 'Declutter, Marie Kondo...' },
    ],
  },
  {
    group: 'Creative & Hobbies',
    icon: '🎨',
    categories: [
      { id: 'art-design', name: 'Art & Design', icon: '🖌️', placeholder: 'Learn painting, digital art...' },
      { id: 'music', name: 'Music & Instruments', icon: '🎸', placeholder: 'Learn guitar, piano...' },
      { id: 'writing', name: 'Writing & Journaling', icon: '✍️', placeholder: 'Write a book, daily journal...' },
      { id: 'photography', name: 'Photography', icon: '📷', placeholder: 'Nature shots, portraits...' },
      { id: 'diy', name: 'DIY Projects', icon: '🔧', placeholder: 'Build furniture, crafts...' },
    ],
  },
  {
    group: 'Giving Back',
    icon: '🤲',
    categories: [
      { id: 'charity', name: 'Charity & Giving Back', icon: '💝', placeholder: 'Donate monthly, sponsor a child...' },
      { id: 'volunteering', name: 'Volunteering & Impact', icon: '🌟', placeholder: 'Teach free, help shelters...' },
    ],
  },
];

export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap(g => g.categories);

export const SUGGESTED_QUOTES = [
  "Small steps, daily, create big change.",
  "I am becoming the best version of myself.",
  "My health is my greatest wealth.",
  "Every day is a fresh start.",
  "I attract abundance in all areas of life.",
  "Progress, not perfection.",
  "I am worthy of all the good things coming my way.",
  "Dream big. Start small. Act now.",
  "I choose joy, peace, and growth.",
  "The best time to start is today.",
];

export const AFFIRMATIONS: Record<string, string[]> = {
  confident: [
    "I believe in my ability to achieve great things.",
    "I am strong, capable, and unstoppable.",
    "I trust myself and my journey.",
    "I radiate confidence and attract success.",
  ],
  calm: [
    "I am at peace with who I am and where I'm going.",
    "I release what I can't control and embrace what I can.",
    "Every breath brings me closer to calm and clarity.",
    "I trust the timing of my life.",
  ],
  motivational: [
    "I am building the life of my dreams, one day at a time.",
    "Every challenge makes me stronger and wiser.",
    "I turn my dreams into plans and my plans into reality.",
    "Nothing can stop me when I'm focused and consistent.",
  ],
};
