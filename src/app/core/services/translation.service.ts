import { Injectable, signal, computed, effect } from '@angular/core';
import { AppLanguage } from '../models/interfaces';
import { translations, Translation } from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageSignal = signal<AppLanguage>('es');
  
  language = this.languageSignal.asReadonly();
  
  private translations: { [lang: string]: Translation } = translations;

  constructor() {}

  setLanguage(lang: AppLanguage): void {
    this.languageSignal.set(lang);
  }

  getLanguage(): AppLanguage {
    return this.languageSignal();
  }

  t(key: string): string {
    const lang = this.languageSignal();
    const trans = this.translations[lang];
    return trans[key] || key;
  }

  tCategory(category: string): string {
    const key = 'category.' + category.toLowerCase();
    return this.t(key);
  }
}
