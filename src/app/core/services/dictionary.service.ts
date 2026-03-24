import { Injectable, signal, computed, inject } from '@angular/core';
import { Word, WordStatus } from '../models/interfaces';

const STORAGE_KEY = 'yourDictionary_words';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private wordsSignal = signal<Word[]>(this.loadFromStorage());
  private categoriesSignal = signal<string[]>(this.loadCategories());

  words = this.wordsSignal.asReadonly();
  categories = this.categoriesSignal.asReadonly();

  private loadFromStorage(): Word[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.wordsSignal()));
  }

  private loadCategories(): string[] {
    const words = this.wordsSignal();
    const cats = [...new Set(words.map(w => w.category))];
    return cats.length > 0 ? cats : ['General'];
  }

  getWords(): Word[] {
    return this.wordsSignal();
  }

  getWordById(id: string): Word | undefined {
    return this.wordsSignal().find(w => w.id === id);
  }

  getWordsByCategory(category: string): Word[] {
    return this.wordsSignal().filter(w => w.category === category);
  }

  getWordsByStatus(status: WordStatus): Word[] {
    return this.wordsSignal().filter(w => w.status === status);
  }

  wordOfTheDay(): Word | null {
    const words = this.wordsSignal();
    if (words.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  addWord(word: Omit<Word, 'id' | 'createdAt'>): void {
    const newWord: Word = {
      ...word,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    this.wordsSignal.update(words => [...words, newWord]);
    this.updateCategories();
    this.saveToStorage();
  }

  deleteWord(id: string): void {
    this.wordsSignal.update(words => words.filter(w => w.id !== id));
    this.updateCategories();
    this.saveToStorage();
  }

  updateWordStatus(id: string, status: WordStatus): void {
    this.wordsSignal.update(words =>
      words.map(w => w.id === id ? { ...w, status } : w)
    );
    this.saveToStorage();
  }

  updateWord(word: Word): void {
    this.wordsSignal.update(words =>
      words.map(w => w.id === word.id ? word : w)
    );
    this.saveToStorage();
  }

  private updateCategories(): void {
    const words = this.wordsSignal();
    const cats = [...new Set(words.map(w => w.category))];
    this.categoriesSignal.set(cats.length > 0 ? cats : ['General']);
  }
}
