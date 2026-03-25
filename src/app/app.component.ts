import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './core/services/theme.service';
import { TranslationService } from './core/services/translation.service';
import { UserService } from './core/services/user.service';
import { CardsService } from './core/services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private translationService = inject(TranslationService);
  private userService = inject(UserService);
  private cardsService = inject(CardsService);

  ngOnInit(): void {
    // Cargar configuración
    const settings = localStorage.getItem('yourDictionary_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      this.themeService.setTheme(parsed.theme || 'light');
      this.themeService.setFontSize(parsed.fontSize || 'medium');
      this.translationService.setLanguage(parsed.language || 'es');
    }

    // Verificar login diario y cartas
    this.userService.checkDailyLogin();
    this.cardsService.checkWordOfDayCards();

    // Verificar si es primera visita
    const firstVisit = localStorage.getItem('firstVisit');
    if (firstVisit === null || firstVisit === 'true') {
      this.router.navigate(['/onboarding']);
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEvent = event as NavigationEnd;
        const firstVisit = localStorage.getItem('firstVisit');
        if ((firstVisit === null || firstVisit === 'true') && navEvent.url !== '/onboarding') {
          this.router.navigate(['/onboarding']);
        }
      });
  }
}
