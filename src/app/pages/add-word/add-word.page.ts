import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonInput, IonLabel, IonSelect, IonSelectOption, IonIcon, IonItem, IonList, IonToast, IonProgressBar, IonSpinner, IonBackButton } from '@ionic/angular/standalone';
import { DictionaryService } from '../../core/services/dictionary.service';
import { PointsService } from '../../core/services/points.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, checkmark, close, book, create } from 'ionicons/icons';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.page.html',
  styleUrls: ['./add-word.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonInput, IonLabel, IonSelect, IonSelectOption, IonIcon, IonItem, IonList, IonToast, IonProgressBar, IonSpinner, IonBackButton, CommonModule, FormsModule]
})
export class AddWordPage implements OnInit {
  private dictionaryService = inject(DictionaryService);
  private pointsService = inject(PointsService);
  private router = inject(Router);

  originalWord = signal('');
  translation = signal('');
  selectedCategory = signal('');
  newCategory = signal('');
  showNewCategoryInput = signal(false);

  categories = this.dictionaryService.categories;
  isSubmitting = signal(false);
  showToast = signal(false);
  toastMessage = signal('');
  toastColor = signal('success');

  constructor() {
    addIcons({ add, checkmark, close, book, create });
  }

  ngOnInit() {}

  onOriginalChange(event: any) {
    this.originalWord.set(event.detail.value);
  }

  onTranslationChange(event: any) {
    this.translation.set(event.detail.value);
  }

  onCategoryChange(event: any) {
    const value = event.detail.value;
    if (value === '__new__') {
      this.showNewCategoryInput.set(true);
      this.selectedCategory.set('');
    } else {
      this.showNewCategoryInput.set(false);
      this.selectedCategory.set(value);
    }
  }

  onNewCategoryChange(event: any) {
    this.newCategory.set(event.detail.value);
  }

  isValid(): boolean {
    const hasOriginal = this.originalWord().trim().length > 0;
    const hasTranslation = this.translation().trim().length > 0;
    const hasCategory = this.selectedCategory().trim().length > 0 || 
                        (this.showNewCategoryInput() && this.newCategory().trim().length > 0);
    return hasOriginal && hasTranslation && hasCategory;
  }

  async addWord() {
    if (!this.isValid()) {
      this.toastMessage.set('Por favor, completa todos los campos');
      this.toastColor.set('danger');
      this.showToast.set(true);
      return;
    }

    this.isSubmitting.set(true);

    const category = this.showNewCategoryInput() ? this.newCategory().trim() : this.selectedCategory();

    this.dictionaryService.addWord({
      original: this.originalWord().trim(),
      translation: this.translation().trim(),
      category: category
    });

    this.pointsService.addPoints(1);

    this.toastMessage.set('¡Palabra añadida! +1 punto');
    this.toastColor.set('success');
    this.showToast.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.originalWord.set('');
      this.translation.set('');
      this.selectedCategory.set('');
      this.newCategory.set('');
      this.showNewCategoryInput.set(false);
      this.router.navigate(['/home']);
    }, 1500);
  }
}
