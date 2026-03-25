import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { SettingsService } from '../../core/services/settings.service';
import { PointsService } from '../../core/services/points.service';
import { ThemeService } from '../../core/services/theme.service';
import { addIcons } from 'ionicons';
import { sunny, moon, text, trophy, speedometer } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  private settingsService = inject(SettingsService);
  private pointsService = inject(PointsService);
  private themeService = inject(ThemeService);

  fontSize = signal<'small' | 'medium' | 'large'>('medium');
  difficulty = signal<'easy' | 'medium' | 'hard'>('easy');
  theme = signal<'light' | 'dark'>('light');

  totalPoints = 0;
  weeklyBest = 0;
  monthlyBest = 0;

  constructor() {
    addIcons({ sunny, moon, text, trophy, speedometer });
  }

  ngOnInit() {
    const settings = this.settingsService.getSettings();
    this.fontSize.set(settings.fontSize);
    this.difficulty.set(settings.difficulty);
    this.theme.set(settings.theme);

    this.themeService.setFontSize(settings.fontSize);
    this.themeService.setTheme(settings.theme);

    this.totalPoints = this.pointsService.getPoints();
    this.weeklyBest = this.pointsService.getWeeklyBest();
    this.monthlyBest = this.pointsService.getMonthlyBest();
  }

  onFontSizeChange(event: any) {
    const value = event.detail.value;
    this.fontSize.set(value);
    this.themeService.setFontSize(value);
    this.settingsService.updateSettings({ fontSize: value });
  }

  onDifficultyChange(event: any) {
    const value = event.detail.value;
    this.difficulty.set(value);
    this.settingsService.updateSettings({ difficulty: value });
  }

  onThemeChange(event: any) {
    const value = event.detail.value;
    this.theme.set(value);
    this.themeService.setTheme(value);
    this.settingsService.updateSettings({ theme: value });
  }
}
