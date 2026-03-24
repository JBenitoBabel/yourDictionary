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
      const root = document.documentElement;
      switch (fontSize) {
        case 'small':
          root.style.fontSize = '14px';
          break;
        case 'medium':
          root.style.fontSize = '16px';
          break;
        case 'large':
          root.style.fontSize = '18px';
          break;
      }
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

  getFontSize(): FontSize {
    return this.fontSizeSignal();
  }

  setFontSize(size: FontSize): void {
    this.fontSizeSignal.set(size);
  }
}
