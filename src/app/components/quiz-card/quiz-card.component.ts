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
  isExpanding = false;
  @Output() startQuiz = new EventEmitter<void>();

  onStartQuiz(): void {
    this.isExpanding = true;
    setTimeout(() => {
      this.startQuiz.emit();
      this.isExpanding = false;
    }, 600);
  }
}
