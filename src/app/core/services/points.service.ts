import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'yourDictionary_points';

export interface PointsData {
  totalPoints: number;
  weeklyBest: number;
  monthlyBest: number;
  lastWeeklyReset: number;
  lastMonthlyReset: number;
}

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private pointsSignal = signal<PointsData>(this.loadFromStorage());

  totalPoints = computed(() => this.pointsSignal().totalPoints);
  weeklyBest = computed(() => this.pointsSignal().weeklyBest);
  monthlyBest = computed(() => this.pointsSignal().monthlyBest);

  private loadFromStorage(): PointsData {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const monthMs = 30 * 24 * 60 * 60 * 1000;

    if (stored) {
      const data = JSON.parse(stored) as PointsData;
      if (now - data.lastWeeklyReset > weekMs) {
        data.weeklyBest = 0;
        data.lastWeeklyReset = now;
      }
      if (now - data.lastMonthlyReset > monthMs) {
        data.monthlyBest = 0;
        data.lastMonthlyReset = now;
      }
      return data;
    }

    return {
      totalPoints: 0,
      weeklyBest: 0,
      monthlyBest: 0,
      lastWeeklyReset: now,
      lastMonthlyReset: now
    };
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pointsSignal()));
  }

  addPoints(points: number): void {
    this.pointsSignal.update(data => {
      const newTotal = data.totalPoints + points;
      const newWeekly = Math.max(data.weeklyBest, newTotal);
      const newMonthly = Math.max(data.monthlyBest, newTotal);
      return {
        ...data,
        totalPoints: newTotal,
        weeklyBest: newWeekly,
        monthlyBest: newMonthly
      };
    });
    this.saveToStorage();
  }

  getPoints(): number {
    return this.pointsSignal().totalPoints;
  }

  getWeeklyBest(): number {
    return this.pointsSignal().weeklyBest;
  }

  getMonthlyBest(): number {
    return this.pointsSignal().monthlyBest;
  }

  calculateDailyLoginPoints(consecutiveDays: number): number {
    const basePoints = 10;
    const multiplier = Math.min(consecutiveDays, 7);
    return basePoints + (multiplier * 5);
  }
}
