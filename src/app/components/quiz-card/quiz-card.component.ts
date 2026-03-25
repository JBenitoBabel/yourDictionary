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
  isRotating = signal(false);
  isExpanding = signal(false);
  @Output() startQuiz = new EventEmitter<void>();

  onCardClick(): void {
    if (!this.isFlipped()) {
      this.isFlipped.set(true);
      
      // Después de voltear, rotar 90 grados
      setTimeout(() => {
        this.isRotating.set(true);
        
        // Después de rotar, expandir a pantalla completa
        setTimeout(() => {
          this.isExpanding.set(true);
          
          // Después de expandir, emitir evento
          setTimeout(() => {
            this.startQuiz.emit();
          }, 600);
        }, 600);
      }, 600);
    }
  }
}
