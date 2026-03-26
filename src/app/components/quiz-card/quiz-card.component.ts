import { Component, Output, EventEmitter, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { QuizQuestion } from '../../core/models/interfaces';

type QuizCardState = 'idle' | 'flipped' | 'rotating' | 'expanded' | 'showing';

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

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

  state = signal<QuizCardState>('idle');

  @Output() startQuiz = new EventEmitter<void>();
  @Output() selectAnswer = new EventEmitter<string>();

  async onCardClick(): Promise<void> {
    if (this.state() !== 'idle') return;

    this.state.set('flipped');
    await delay(600);

    this.state.set('rotating');
    await delay(600);

    this.state.set('expanded');
    await delay(400);

    this.state.set('showing');
    this.startQuiz.emit();
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
}
