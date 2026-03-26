import { Component, Output, EventEmitter, Input, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { QuizQuestion } from '../../core/models/interfaces';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

type QuizCardState = 'idle' | 'flipped' | 'rotating' | 'expanded' | 'showing';

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon]
})
export class QuizCardComponent implements OnDestroy {
  @Input() quiz: QuizQuestion | null = null;
  @Input() quizAnswered = false;

  state = signal<QuizCardState>('idle');

  @Output() startQuiz = new EventEmitter<void>();
  @Output() selectAnswer = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  constructor() {
    addIcons({ close });
  }

  async onCardClick(): Promise<void> {
    if (this.state() !== 'idle') return;

    this.state.set('flipped');
    await delay(500);

    this.state.set('rotating');
    await delay(200);

    this.state.set('expanded');
    document.body.classList.add('fullscreen-active');
    await delay(300);

    this.state.set('showing');
    this.startQuiz.emit();
  }

  async onOptionClick(option: string): Promise<void> {
    if (!this.quizAnswered) {
      this.selectAnswer.emit(option);
      await delay(1500);
      this.closeCard();
    }
  }

  closeCard(): void {
    this.state.set('idle');
    document.body.classList.remove('fullscreen-active');
    this.close.emit();
  }

  isCorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.correctAnswer === option;
  }

  isIncorrectOption(option: string): boolean {
    return this.quizAnswered && this.quiz?.selectedAnswer === option && !this.quiz?.isCorrect;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('fullscreen-active');
  }
}
