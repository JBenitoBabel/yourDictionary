import { Injectable, signal, inject } from '@angular/core';
import { Card, CardsData, Word } from '../models/interfaces';
import { DictionaryService } from './dictionary.service';
import { UserService } from './user.service';

const STORAGE_KEY = 'yourDictionary_cards';

// Días consecutivos para cada carta de palabra del día
const WORD_OF_DAY_MILESTONES = [
  { cardNumber: 1, daysRequired: 0 },    // Al añadir primera palabra
  { cardNumber: 2, daysRequired: 30 },
  { cardNumber: 3, daysRequired: 60 },
  { cardNumber: 4, daysRequired: 90 },
  { cardNumber: 5, daysRequired: 120 },
  { cardNumber: 6, daysRequired: 150 },
];

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private dictionaryService = inject(DictionaryService);
  private userService = inject(UserService);
  private cardsSignal = signal<CardsData>(this.loadFromStorage());

  cards = this.cardsSignal.asReadonly();

  private loadFromStorage(): CardsData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      cards: []
    };
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cardsSignal()));
  }

  // ============================================
  // Obtener cartas
  // ============================================

  getCards(): Card[] {
    return this.cardsSignal().cards;
  }

  getCardsCount(): number {
    return this.cardsSignal().cards.length;
  }

  getWordOfDayCardsCount(): number {
    return this.cardsSignal().cards.filter(c => c.type === 'word-of-day').length;
  }

  getQuizCardsCount(): number {
    return this.cardsSignal().cards.filter(c => c.type === 'quiz').length;
  }

  // ============================================
  // Verificar y crear cartas de palabra del día
  // ============================================

  checkWordOfDayCards(): void {
    const words = this.dictionaryService.getWords();
    const consecutiveDays = this.userService.getProgress().consecutiveDays;
    const existingCards = this.cardsSignal().cards;

    WORD_OF_DAY_MILESTONES.forEach(milestone => {
      // Verificar si ya tiene esta carta
      const hasCard = existingCards.some(c => 
        c.type === 'word-of-day' && c.cardNumber === milestone.cardNumber
      );
      
      if (hasCard) return;

      // Verificar condiciones
      let shouldCreate = false;

      if (milestone.cardNumber === 1) {
        // Card 1: Al añadir primera palabra
        shouldCreate = words.length >= 1;
      } else {
        // Cards 2-6: Por días consecutivos
        shouldCreate = consecutiveDays >= milestone.daysRequired;
      }

      if (shouldCreate) {
        // Seleccionar una palabra aleatoria
        const randomWord = words.length > 0 
          ? words[Math.floor(Math.random() * words.length)]
          : undefined;

        const newCard: Card = {
          id: crypto.randomUUID(),
          type: 'word-of-day',
          cardNumber: milestone.cardNumber,
          wordId: randomWord?.id,
          revealedAt: Date.now(),
          word: randomWord
        };

        this.cardsSignal.update(current => ({
          ...current,
          cards: [...current.cards, newCard]
        }));
      }
    });

    this.saveToStorage();
  }

  // ============================================
  // Revelar carta de quiz
  // ============================================

  revealQuizCard(): void {
    const data = this.cardsSignal();
    
    // Verificar si ya se reveló un quiz
    const hasQuizCard = data.cards.some(card => card.type === 'quiz');
    if (hasQuizCard) {
      return; // Ya existe una carta de quiz
    }

    // Crear nueva carta de quiz
    const newCard: Card = {
      id: crypto.randomUUID(),
      type: 'quiz',
      revealedAt: Date.now()
    };

    this.cardsSignal.update(current => ({
      ...current,
      cards: [...current.cards, newCard]
    }));
    this.saveToStorage();
  }

  // ============================================
  // Verificar condiciones
  // ============================================

  canRevealQuiz(): boolean {
    // Verificar si ya se reveló un quiz
    const hasQuizCard = this.cardsSignal().cards.some(card => card.type === 'quiz');
    if (hasQuizCard) {
      return false;
    }

    // Necesita al menos 5 palabras
    const words = this.dictionaryService.getWords();
    return words.length >= 5;
  }

  // ============================================
  // Obtener carta con palabra para mostrar
  // ============================================

  getCardsWithWords(): Card[] {
    const cards = this.cardsSignal().cards;
    const words = this.dictionaryService.getWords();
    
    return cards.map(card => {
      if (card.type === 'word-of-day' && card.wordId) {
        const word = words.find(w => w.id === card.wordId);
        return { ...card, word };
      }
      return card;
    }).sort((a, b) => {
      // Ordenar: word-of-day primero (por cardNumber), luego quiz
      if (a.type === 'word-of-day' && b.type === 'quiz') return -1;
      if (a.type === 'quiz' && b.type === 'word-of-day') return 1;
      if (a.cardNumber && b.cardNumber) return a.cardNumber - b.cardNumber;
      return a.revealedAt - b.revealedAt;
    });
  }

  // ============================================
  // Reset (opcional)
  // ============================================

  resetCards(): void {
    this.cardsSignal.set({
      cards: []
    });
    this.saveToStorage();
  }
}
