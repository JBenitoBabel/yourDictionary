import { Injectable, signal, effect } from '@angular/core';
import { Theme } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>('light');

  theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  getTheme(): Theme {
    return this.themeSignal();
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  toggleTheme(): void {
    this.themeSignal.update(current => current === 'light' ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.themeSignal() === 'dark';
  }
}
