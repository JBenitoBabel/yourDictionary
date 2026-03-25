import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settings, add, checkmark, close, language, book, list, bookOutline, settingsOutline, addCircleOutline, libraryOutline, cardOutline } from 'ionicons/icons';
import { DictionaryService } from '../../core/services/dictionary.service';
import { PointsService } from '../../core/services/points.service';
import { UserService } from '../../core/services/user.service';
import { SettingsService } from '../../core/services/settings.service';
import { CardsService } from '../../core/services/cards.service';
import { Word, Difficulty } from '../../core/models/interfaces';
import { Router } from '@angular/router';
import { WordCardComponent } from '../../components/word-card/word-card.component';
import { QuizCardComponent } from '../../components/quiz-card/quiz-card.component';

interface QuizQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    WordCardComponent,
    QuizCardComponent
  ]
})
export class HomePage {
  private dictionaryService = inject(DictionaryService);
  private pointsService = inject(PointsService);
  private userService = inject(UserService);
  private cardsService = inject(CardsService);
  settingsService = inject(SettingsService);
  private router = inject(Router);

  title = computed(() => this.getTitleByPoints(this.pointsService.totalPoints()));
  points = computed(() => this.pointsService.totalPoints());
  words = this.dictionaryService.words;
  wordsCount = computed(() => this.words().length);
  cardsCount = computed(() => this.cardsService.getCardsCount());
  hasWords = computed(() => this.words().length > 0);
  hasEnoughWordsForQuiz = computed(() => this.words().length >= 5);

  wordOfTheDay = signal<Word | null>(null);
  isFlipped = signal(false);
  showQuizModal = signal(false);
  currentQuiz = signal<QuizQuestion | null>(null);
  quizAnswered = signal(false);

  constructor() {
    addIcons({ settings, settingsOutline, add, addCircleOutline, checkmark, close, language, book, bookOutline, list, libraryOutline, cardOutline });
    this.loadWordOfTheDay();
  }

  private getTitleByPoints(points: number): string {
    if (points <= 50) return 'Novato';
    if (points <= 150) return 'Aprendíz';
    if (points <= 300) return 'Estudiante';
    if (points <= 500) return 'Erudito';
    if (points <= 800) return 'Sabio';
    if (points <= 1200) return 'Maestro';
    return 'Gurú del Vocabulario 🎓';
  }

  loadWordOfTheDay(): void {
    this.wordOfTheDay.set(this.dictionaryService.wordOfTheDay());
    this.isFlipped.set(false);
  }

  flipCard(): void {
    this.isFlipped.update(v => !v);
  }

  startQuiz(): void {
    if (!this.hasEnoughWordsForQuiz()) return;

    // Guardar carta de quiz
    this.cardsService.revealQuizCard();

    const allWords = this.words();
    const difficulty = this.settingsService.getSettings().difficulty;
    const targetWord = allWords[Math.floor(Math.random() * allWords.length)];
    const numOptions = this.getNumOptionsByDifficulty(difficulty);

    const otherWords = allWords.filter(w => w.id !== targetWord.id);
    const shuffled = otherWords.sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, numOptions - 1).map(w => w.translation);

    const allOptions = [targetWord.translation, ...wrongAnswers];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    this.currentQuiz.set({
      word: targetWord,
      options: shuffledOptions,
      correctAnswer: targetWord.translation
    });
    this.quizAnswered.set(false);
    this.showQuizModal.set(true);
  }

  private getNumOptionsByDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
      case 'easy': return 3;
      case 'medium': return 4;
      case 'hard': return 5;
    }
  }

  getPointsByDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
      case 'easy': return 3;
      case 'medium': return 4;
      case 'hard': return 5;
    }
  }

  selectAnswer(answer: string): void {
    if (this.quizAnswered()) return;

    const quiz = this.currentQuiz();
    if (!quiz) return;

    const isCorrect = answer === quiz.correctAnswer;
    this.currentQuiz.set({ ...quiz, selectedAnswer: answer, isCorrect });
    this.quizAnswered.set(true);

    if (isCorrect) {
      const difficulty = this.settingsService.getSettings().difficulty;
      const points = this.getPointsByDifficulty(difficulty);
      this.pointsService.addPoints(points);
      this.userService.incrementQuizzesCorrect();
    }
  }

  closeQuiz(): void {
    this.showQuizModal.set(false);
    this.currentQuiz.set(null);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  goToAddWord(): void {
    this.router.navigate(['/add-word']);
  }

  goToDictionary(): void {
    this.router.navigate(['/dictionary']);
  }

  goToMazo(): void {
    this.router.navigate(['/mazo']);
  }
}
