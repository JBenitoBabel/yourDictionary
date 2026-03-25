import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { SettingsService } from '../../core/services/settings.service';
import { TranslationService } from '../../core/services/translation.service';
import { AppLanguage } from '../../core/models/interfaces';

interface LanguageOption {
  code: AppLanguage;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardContent,
  ]
})
export class OnboardingPage {
  private settingsService = inject(SettingsService);
  private translationService = inject(TranslationService);
  private router = inject(Router);

  languages: LanguageOption[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  getTitle(): string {
    return this.translationService.t('onboarding.title');
  }

  getSubtitle(): string {
    return this.translationService.t('onboarding.subtitle');
  }

  getLanguageName(lang: LanguageOption): string {
    return lang.name;
  }

  selectLanguage(language: AppLanguage): void {
    this.settingsService.setLanguage(language);
    this.translationService.setLanguage(language);
    localStorage.setItem('firstVisit', 'false');
    this.router.navigate(['/home']);
  }
}
