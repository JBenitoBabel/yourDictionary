import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Word } from '../../core/models/interfaces';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class WordCardComponent {
  @Input() word: Word | null = null;
  @Input() isFlipped = false;
  @Output() flip = new EventEmitter<void>();

  onCardClick(): void {
    this.flip.emit();
  }
}
