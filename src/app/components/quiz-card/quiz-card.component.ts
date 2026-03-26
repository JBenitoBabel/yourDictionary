import { Component, Output, EventEmitter, Input, signal, OnDestroy } from '@angular/core';
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
export class QuizCardComponent implements OnDestroy {
  @Input() quiz: QuizQuestion | null = null;
  @Input() quizAnswered = false;

  isFlipped = signal(false);
  isRotating = signal(false);
  isExpanding = signal(false);
  showContent = signal(false);

  @Output() startQuiz = new EventEmitter<void>();
  @Output() selectAnswer = new EventEmitter<string>();

  private timeoutIds: ReturnType<typeof setTimeout>[] = [];

  onCardClick(): void {
    if (!this.isFlipped()) {
      this.isFlipped.set(true);

      const id1 = setTimeout(() => {
        this.isRotating.set(true);

        const id2 = setTimeout(() => {
          this.isExpanding.set(true);

          const id3 = setTimeout(() => {
            this.showContent.set(true);
            this.startQuiz.emit();
          }, 400);
          this.timeoutIds.push(id3);
        }, 600);
        this.timeoutIds.push(id2);
      }, 600);
      this.timeoutIds.push(id1);
    }
  }

  onOptionClick(option: string): void {
    if (!this.quizAnswered) {
      this.selectAnswer.emit(option);
    }
  }

  isCorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.correctAnswer === option;
  }

  isIncorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.selectedAnswer === option && !this.quiz?.isCorrect;
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
  }
}
