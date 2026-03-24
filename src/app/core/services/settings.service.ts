import { Injectable, signal, inject } from '@angular/core';
import { UserSettings, AppLanguage, FontSize, Difficulty } from '../models/interfaces';
import { ThemeService } from './theme.service';

const STORAGE_KEY = 'yourDictionary_settings';

const DEFAULT_SETTINGS: UserSettings = {
  language: 'es',
  fontSize: 'medium',
  difficulty: 'easy',
  theme: 'light'
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private themeService = inject(ThemeService);
  private settingsSignal = signal<UserSettings>(this.loadFromStorage());

  settings = this.settingsSignal.asReadonly();

  private loadFromStorage(): UserSettings {
    const stored = localStorage.getItem(STORAGE_KEY);
    const settings = stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    this.themeService.setTheme(settings.theme);
    return settings;
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settingsSignal()));
  }

  getSettings(): UserSettings {
    return this.settingsSignal();
  }

  updateSettings(updates: Partial<UserSettings>): void {
    this.settingsSignal.update(current => {
      const newSettings = { ...current, ...updates };
      if (updates.theme) {
        this.themeService.setTheme(updates.theme);
      }
      return newSettings;
    });
    this.saveToStorage();
  }

  setLanguage(language: AppLanguage): void {
    this.updateSettings({ language });
  }

  setFontSize(fontSize: FontSize): void {
    this.updateSettings({ fontSize });
  }

  setDifficulty(difficulty: Difficulty): void {
    this.updateSettings({ difficulty });
  }
}
