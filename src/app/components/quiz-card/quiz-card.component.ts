import { Component, Output, EventEmitter, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { QuizQuestion } from '../../core/models/interfaces';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class QuizCardComponent {
  @Input() quiz: QuizQuestion | null = null;
  @Input() quizAnswered = false;
  
  isFlipped = signal(false);
  isRotating = signal(false);
  isExpanding = signal(false);
  showContent = signal(false);
  
  @Output() startQuiz = new EventEmitter<void>();
  @Output() selectAnswer = new EventEmitter<Event>();

  onCardClick(): void {
    if (!this.isFlipped()) {
      this.isFlipped.set(true);
      
      setTimeout(() => {
        this.isRotating.set(true);
        
        setTimeout(() => {
          this.isExpanding.set(true);
          
          setTimeout(() => {
            this.showContent.set(true);
            this.startQuiz.emit();
          }, 400);
        }, 600);
      }, 600);
    }
  }

  onOptionClick(option: string, event: Event): void {
    if (!this.quizAnswered) {
      this.selectAnswer.emit(event);
    }
  }

  isCorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.correctAnswer === option;
  }

  isIncorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.selectedAnswer === option && !this.quiz?.isCorrect;
  }
}
