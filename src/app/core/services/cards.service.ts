import { Injectable, signal, inject } from '@angular/core';
import { Card, CardsData, Word } from '../models/interfaces';
import { DictionaryService } from './dictionary.service';

const STORAGE_KEY = 'yourDictionary_cards';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private dictionaryService = inject(DictionaryService);
  private cardsSignal = signal<CardsData>(this.loadFromStorage());

  cards = this.cardsSignal.asReadonly();

  private loadFromStorage(): CardsData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      cards: [],
      lastWordOfDayDate: ''
    };
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cardsSignal()));
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
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
  // Revelar carta de palabra del día
  // ============================================

  revealWordOfDayCard(word: Word): void {
    const today = this.getTodayDate();
    const data = this.cardsSignal();
    
    // Verificar si ya se reveló hoy
    if (data.lastWordOfDayDate === today) {
      return; // Ya se reveló hoy
    }

    // Verificar si la palabra ya fue revelada hoy
    const wordAlreadyRevealedToday = data.cards.some(card => {
      const cardDate = new Date(card.revealedAt).toISOString().split('T')[0];
      return card.wordId === word.id && cardDate === today;
    });

    if (wordAlreadyRevealedToday) {
      return; // Esta palabra ya se reveló hoy
    }

    // Crear nueva carta
    const newCard: Card = {
      id: crypto.randomUUID(),
      type: 'word-of-day',
      wordId: word.id,
      revealedAt: Date.now(),
      word: word
    };

    this.cardsSignal.update(current => ({
      ...current,
      cards: [...current.cards, newCard],
      lastWordOfDayDate: today
    }));
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

  canRevealWordOfDay(): boolean {
    const today = this.getTodayDate();
    const data = this.cardsSignal();
    
    // Si ya se reveló hoy, no se puede
    if (data.lastWordOfDayDate === today) {
      return false;
    }

    // Necesita al menos 1 palabra
    const words = this.dictionaryService.getWords();
    return words.length >= 1;
  }

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
  // Calcular cartas disponibles vs obtenidas
  // ============================================

  getAvailableCardsCount(): number {
    let count = 0;
    const words = this.dictionaryService.getWords();

    // Carta de palabra del día: si hay palabras y no se reveló hoy
    if (words.length >= 1 && this.canRevealWordOfDay()) {
      count++;
    }

    // Carta de quiz: si hay 5+ palabras y no se reveló
    if (words.length >= 5 && this.canRevealQuiz()) {
      count++;
    }

    return count;
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
    });
  }

  // ============================================
  // Reset (opcional)
  // ============================================

  resetCards(): void {
    this.cardsSignal.set({
      cards: [],
      lastWordOfDayDate: ''
    });
    this.saveToStorage();
  }
}
