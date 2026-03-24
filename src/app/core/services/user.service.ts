import { Injectable, signal, inject } from '@angular/core';
import { UserProgress } from '../models/interfaces';
import { PointsService } from './points.service';

const STORAGE_KEY = 'yourDictionary_progress';

const DEFAULT_PROGRESS: UserProgress = {
  totalPoints: 0,
  weeklyBest: 0,
  monthlyBest: 0,
  consecutiveDays: 0,
  lastLoginDate: '',
  wordsAdded: 0,
  quizzesCorrect: 0
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pointsService = inject(PointsService);
  private progressSignal = signal<UserProgress>(this.loadFromStorage());

  progress = this.progressSignal.asReadonly();

  private loadFromStorage(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progressSignal()));
  }

  getProgress(): UserProgress {
    return this.progressSignal();
  }

  updateProgress(updates: Partial<UserProgress>): void {
    this.progressSignal.update(current => ({ ...current, ...updates }));
    this.saveToStorage();
  }

  incrementWordsAdded(): void {
    this.progressSignal.update(p => ({ ...p, wordsAdded: p.wordsAdded + 1 }));
    this.saveToStorage();
  }

  incrementQuizzesCorrect(): void {
    this.progressSignal.update(p => ({ ...p, quizzesCorrect: p.quizzesCorrect + 1 }));
    this.saveToStorage();
  }

  checkDailyLogin(): boolean {
    const today = new Date().toISOString().split('T')[0];
    const current = this.progressSignal();
    
    if (current.lastLoginDate === today) {
      return false;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newConsecutiveDays = 1;
    if (current.lastLoginDate === yesterdayStr) {
      newConsecutiveDays = current.consecutiveDays + 1;
    }

    const loginPoints = this.pointsService.calculateDailyLoginPoints(newConsecutiveDays);
    this.pointsService.addPoints(loginPoints);

    this.progressSignal.update(p => ({
      ...p,
      consecutiveDays: newConsecutiveDays,
      lastLoginDate: today,
      totalPoints: p.totalPoints + loginPoints
    }));
    this.saveToStorage();

    return true;
  }
}
