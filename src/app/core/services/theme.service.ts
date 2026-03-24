import { Injectable, signal, effect } from '@angular/core';
import { Theme, FontSize } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>('light');
  private fontSizeSignal = signal<FontSize>('medium');

  theme = this.themeSignal.asReadonly();
  fontSize = this.fontSizeSignal.asReadonly();

  constructor() {
    // Effect: Apply theme to document
    effect(() => {
      const theme = this.themeSignal();
      document.documentElement.setAttribute('data-theme', theme);
    });

    // Effect: Apply font size to document
    // Uses data-font-size attribute which CSS variables react to
    effect(() => {
      const fontSize = this.fontSizeSignal();
      document.documentElement.setAttribute('data-font-size', fontSize);
    });
  }

  // ============================================
  // Theme Methods
  // ============================================

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

  // ============================================
  // Font Size Methods
  // ============================================

  getFontSize(): FontSize {
    return this.fontSizeSignal();
  }

  setFontSize(size: FontSize): void {
    this.fontSizeSignal.set(size);
  }
}
