export type AppLanguage = 'es' | 'en' | 'fr';

export type WordStatus = 'normal' | 'star' | 'important';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type FontSize = 'small' | 'medium' | 'large';

export type Theme = 'light' | 'dark';

export interface Word {
  id: string;
  original: string;
  translation: string;
  category: string;
  status: WordStatus;
  createdAt: number;
}

export interface UserSettings {
  language: AppLanguage;
  fontSize: FontSize;
  difficulty: Difficulty;
  theme: Theme;
}

export interface UserProgress {
  totalPoints: number;
  weeklyBest: number;
  monthlyBest: number;
  consecutiveDays: number;
  lastLoginDate: string;
  wordsAdded: number;
  quizzesCorrect: number;
}

export interface AppState {
  words: Word[];
  categories: string[];
  settings: UserSettings;
  progress: UserProgress;
  firstVisit: boolean;
}

// Sistema de Cartas
export type CardType = 'word-of-day' | 'quiz';

export interface Card {
  id: string;
  type: CardType;
  cardNumber?: number;      // Para word-of-day: 1-6
  wordId?: string;          // Para word-of-day: palabra asociada
  revealedAt: number;       // Timestamp
  word?: Word;              // Para mostrar en mazo
}

export interface CardsData {
  cards: Card[];
}
