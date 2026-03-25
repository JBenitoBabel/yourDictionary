import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { CardsService } from '../../core/services/cards.service';
import { Card } from '../../core/models/interfaces';
import { addIcons } from 'ionicons';
import { card, book, flag, trophy } from 'ionicons/icons';

@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.page.html',
  styleUrls: ['./mazo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, CommonModule]
})
export class MazoPage {
  private cardsService = inject(CardsService);

  constructor() {
    addIcons({ card, book, flag, trophy });
  }

  cards = computed(() => this.cardsService.getCardsWithWords());
  cardsCount = computed(() => this.cardsService.getCardsCount());
  wordOfDayCount = computed(() => this.cardsService.getWordOfDayCardsCount());
  quizCount = computed(() => this.cardsService.getQuizCardsCount());

  getCardTypeLabel(type: string): string {
    return type === 'word-of-day' ? 'Palabra del día' : 'Quiz';
  }

  getCardTypeIcon(type: string): string {
    return type === 'word-of-day' ? 'book' : 'flag';
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}
