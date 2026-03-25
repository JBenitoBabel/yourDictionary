import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonButtons, IonButton, IonSelect, IonSelectOption, IonBackButton } from '@ionic/angular/standalone';
import { DictionaryService } from '../../core/services/dictionary.service';
import { Word, WordStatus } from '../../core/models/interfaces';
import { addIcons } from 'ionicons';
import { trash, star, flag, book, search, close } from 'ionicons/icons';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonButtons, IonButton, IonSelect, IonSelectOption, IonBackButton, CommonModule, FormsModule]
})
export class DictionaryPage implements OnInit {
  private dictionaryService = inject(DictionaryService);

  searchQuery = signal('');
  selectedCategory = signal<string>('all');
  selectedStatus = signal<WordStatus | 'all'>('all');

  words = this.dictionaryService.words;
  categories = computed(() => ['all', ...this.dictionaryService.categories()]);

  filteredWords = computed(() => {
    let result = this.words();
    
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(w => 
        w.original.toLowerCase().includes(query) || 
        w.translation.toLowerCase().includes(query)
      );
    }

    if (this.selectedCategory() !== 'all') {
      result = result.filter(w => w.category === this.selectedCategory());
    }

    if (this.selectedStatus() !== 'all') {
      result = result.filter(w => w.status === this.selectedStatus());
    }

    return result;
  });

  constructor() {
    addIcons({ trash, star, flag, book, search, close });
  }

  ngOnInit() {}

  onSearchChange(event: any) {
    this.searchQuery.set(event.detail.value);
  }

  onCategoryChange(event: any) {
    this.selectedCategory.set(event.detail.value);
  }

  onStatusChange(event: any) {
    this.selectedStatus.set(event.detail.value);
  }

  deleteWord(word: Word) {
    this.dictionaryService.deleteWord(word.id);
  }

  cycleStatus(word: Word) {
    const currentStatus = word.status;
    let newStatus: WordStatus;
    
    switch (currentStatus) {
      case 'normal':
        newStatus = 'star';
        break;
      case 'star':
        newStatus = 'important';
        break;
      case 'important':
        newStatus = 'normal';
        break;
    }
    
    this.dictionaryService.updateWordStatus(word.id, newStatus);
  }

  getStatusLabel(status: WordStatus): string {
    switch (status) {
      case 'normal': return 'Normal';
      case 'star': return 'Estrella';
      case 'important': return 'Importante';
    }
  }

  getStatusIcon(status: WordStatus): string {
    switch (status) {
      case 'normal': return 'book';
      case 'star': return 'star';
      case 'important': return 'flag';
    }
  }

  getStatusColor(status: WordStatus): string {
    switch (status) {
      case 'normal': return 'medium';
      case 'star': return 'warning';
      case 'important': return 'danger';
    }
  }
}
