import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./pages/onboarding/onboarding.page').then( m => m.OnboardingPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'add-word',
    loadComponent: () => import('./pages/add-word/add-word.page').then( m => m.AddWordPage)
  },
  {
    path: 'dictionary',
    loadComponent: () => import('./pages/dictionary/dictionary.page').then( m => m.DictionaryPage)
  },
  {
    path: 'mazo',
    loadComponent: () => import('./pages/mazo/mazo.page').then( m => m.MazoPage)
  },
];
