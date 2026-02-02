export interface DayContent {
  day: number;
  title: string;
  task: string;
  mealIdeas: string[];
  whyItMatters: string;
}

export interface Challenge {
  id: string;
  title: string;
  duration: number;
  description: string;
  icon: string;
  color: string;
  days: DayContent[];
}
