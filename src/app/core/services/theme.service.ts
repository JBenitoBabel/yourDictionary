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
    effect(() => {
      const theme = this.themeSignal();
      document.documentElement.setAttribute('data-theme', theme);
    });

    effect(() => {
      const fontSize = this.fontSizeSignal();
      document.documentElement.setAttribute('data-font-size', fontSize);
      document.body.style.fontSize = this.getFontSizeValue(fontSize);
    });
  }

  private getFontSizeValue(size: FontSize): string {
    switch (size) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
    }
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

  getFontSize(): FontSize {
    return this.fontSizeSignal();
  }

  setFontSize(size: FontSize): void {
    this.fontSizeSignal.set(size);
  }
}
