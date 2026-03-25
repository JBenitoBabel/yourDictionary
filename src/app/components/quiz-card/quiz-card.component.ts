import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class QuizCardComponent {
  isFlipped = signal(false);
  isExpanding = false;
  @Output() startQuiz = new EventEmitter<void>();

  onCardClick(): void {
    this.isFlipped.update(v => !v);
    
    if (this.isFlipped()) {
      setTimeout(() => {
        this.startQuiz.emit();
      }, 600);
    }
  }
}
