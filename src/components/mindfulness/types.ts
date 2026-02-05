export interface Practice {
  id: string;
  title: string;
  summary: string;
  lead: string;
  benefits: string[];
  steps: string[];
  durations: number[];
  icon: string;
}

export interface Affirmation {
  id: string;
  label: string;
  text: string;
}

export interface WisdomCard {
  tradition: string;
  emoji: string;
  text: string;
}

export interface GratitudeEntry {
  id: string;
  items: string[];
  date: string;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';
