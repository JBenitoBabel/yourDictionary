export interface Translation {
  [key: string]: string;
}

export const translations: { [lang: string]: Translation } = {
  es: {
    // App
    'app.title': 'YourDictionary',
    'app.subtitle': 'Tu diccionario personal de inglés',
    
    // Onboarding
    'onboarding.title': 'Elige tu idioma',
    'onboarding.subtitle': 'Selecciona el idioma de la aplicación',
    'onboarding.spanish': 'Español',
    'onboarding.english': 'Inglés',
    'onboarding.french': 'Francés',
    'onboarding.continue': 'Continuar',
    
    // Home
    'home.points': 'Puntos',
    'home.wordOfTheDay': 'Palabra del día',
    'home.tapToReveal': 'Toca para ver la traducción',
    'home.claimWord': 'Reclamar otra palabra',
    'home.cost': 'puntos',
    'home.quiz': 'Quiz',
    'home.startQuiz': 'Haz el quiz',
    'home.addWords': 'Añade palabras a tu diccionario para comenzar',
    'home.needMoreWords': 'Necesitas al menos 5 palabras para el quiz',
    
    // Quiz
    'quiz.title': 'Quiz',
    'quiz.question': '¿Cuál es la traducción de?',
    'quiz.correct': '¡Correcto!',
    'quiz.incorrect': 'Incorrecto. La respuesta era:',
    'quiz.points': 'puntos',
    
    // Dictionary
    'dictionary.title': 'Mi Diccionario',
    'dictionary.search': 'Buscar palabras...',
    'dictionary.all': 'Todas',
    'dictionary.normal': 'Normal',
    'dictionary.star': 'Estrella',
    'dictionary.important': 'Importante',
    'dictionary.words': 'palabras',
    'dictionary.empty': 'No hay palabras',
    'dictionary.emptyHint': 'Añade palabras a tu diccionario para verlas aquí',
    'dictionary.legend': 'Leyenda:',
    'dictionary.legendNormal': 'Normal - Aparece en palabra del día y quiz',
    'dictionary.legendStar': 'Estrella - No aparece en palabra del día ni quiz',
    'dictionary.legendImportant': 'Importante - Aparece más veces para aprender',
    'dictionary.tip': 'Click en la palabra para cambiar su estado',
    
    // Add Word
    'addWord.title': 'Nueva Palabra',
    'addWord.subtitle': 'Expande tu vocabulario cada día',
    'addWord.newWord': 'Palabra nueva',
    'addWord.newWordPlaceholder': 'Ej: Hello',
    'addWord.translation': 'Traducción',
    'addWord.translationPlaceholder': 'Ej: Hola',
    'addWord.category': 'Categoría',
    'addWord.selectCategory': 'Selecciona una categoría',
    'addWord.newCategory': 'Nueva categoría',
    'addWord.newCategoryPlaceholder': 'Ej: Comida, Viajes, Trabajo...',
    'addWord.addButton': 'Añadir al diccionario',
    'addWord.pointsInfo': 'punto por cada palabra añadida',
    'addWord.wordAdded': '¡Palabra añadida!',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.yourPoints': 'Tus Puntos',
    'settings.total': 'Total',
    'settings.weeklyBest': 'Mejor Semana',
    'settings.monthlyBest': 'Mejor Mes',
    'settings.preferences': 'Preferencias',
    'settings.fontSize': 'Tamaño de letra',
    'settings.small': 'Pequeño',
    'settings.medium': 'Mediano',
    'settings.large': 'Grande',
    'settings.difficulty': 'Dificultad del quiz',
    'settings.easy': 'Fácil (3 opciones)',
    'settings.mediumOption': 'Medio (4 opciones)',
    'settings.hard': 'Difícil (5 opciones)',
    'settings.theme': 'Tema',
    'settings.light': 'Claro',
    'settings.dark': 'Oscuro',
    'settings.infoTitle': '¡Gana puntos cada día!',
    'settings.infoLogin': 'Entrar en la app: 1-5 puntos',
    'settings.infoWord': 'Añadir palabra: 1 punto',
    'settings.infoQuiz': 'Quiz acertado: 3-5 puntos',
    
    // Categories default
    'category.verbos': 'Verbos',
    'category.expresiones': 'Expresiones',
    'category.deporte': 'Deporte',
  },
  
  en: {
    // App
    'app.title': 'YourDictionary',
    'app.subtitle': 'Your personal English dictionary',
    
    // Onboarding
    'onboarding.title': 'Choose your language',
    'onboarding.subtitle': 'Select the app language',
    'onboarding.spanish': 'Spanish',
    'onboarding.english': 'English',
    'onboarding.french': 'French',
    'onboarding.continue': 'Continue',
    
    // Home
    'home.points': 'Points',
    'home.wordOfTheDay': 'Word of the day',
    'home.tapToReveal': 'Tap to reveal translation',
    'home.claimWord': 'Claim another word',
    'home.cost': 'points',
    'home.quiz': 'Quiz',
    'home.startQuiz': 'Take the quiz',
    'home.addWords': 'Add words to your dictionary to start',
    'home.needMoreWords': 'You need at least 5 words for the quiz',
    
    // Quiz
    'quiz.title': 'Quiz',
    'quiz.question': 'What is the translation of?',
    'quiz.correct': 'Correct!',
    'quiz.incorrect': 'Incorrect. The answer was:',
    'quiz.points': 'points',
    
    // Dictionary
    'dictionary.title': 'My Dictionary',
    'dictionary.search': 'Search words...',
    'dictionary.all': 'All',
    'dictionary.normal': 'Normal',
    'dictionary.star': 'Star',
    'dictionary.important': 'Important',
    'dictionary.words': 'words',
    'dictionary.empty': 'No words',
    'dictionary.emptyHint': 'Add words to your dictionary to see them here',
    'dictionary.legend': 'Legend:',
    'dictionary.legendNormal': 'Normal - Appears in word of the day and quiz',
    'dictionary.legendStar': 'Star - Does not appear in word of the day or quiz',
    'dictionary.legendImportant': 'Important - Appears more often to learn',
    'dictionary.tip': 'Click on the word to change its status',
    
    // Add Word
    'addWord.title': 'New Word',
    'addWord.subtitle': 'Expand your vocabulary every day',
    'addWord.newWord': 'New word',
    'addWord.newWordPlaceholder': 'Ex: Hello',
    'addWord.translation': 'Translation',
    'addWord.translationPlaceholder': 'Ex: Hola',
    'addWord.category': 'Category',
    'addWord.selectCategory': 'Select a category',
    'addWord.newCategory': 'New category',
    'addWord.newCategoryPlaceholder': 'Ex: Food, Travel, Work...',
    'addWord.addButton': 'Add to dictionary',
    'addWord.pointsInfo': 'point per word added',
    'addWord.wordAdded': 'Word added!',
    
    // Settings
    'settings.title': 'Settings',
    'settings.yourPoints': 'Your Points',
    'settings.total': 'Total',
    'settings.weeklyBest': 'Best Week',
    'settings.monthlyBest': 'Best Month',
    'settings.preferences': 'Preferences',
    'settings.fontSize': 'Font size',
    'settings.small': 'Small',
    'settings.medium': 'Medium',
    'settings.large': 'Large',
    'settings.difficulty': 'Quiz difficulty',
    'settings.easy': 'Easy (3 options)',
    'settings.mediumOption': 'Medium (4 options)',
    'settings.hard': 'Hard (5 options)',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.infoTitle': 'Earn points every day!',
    'settings.infoLogin': 'Enter the app: 1-5 points',
    'settings.infoWord': 'Add word: 1 point',
    'settings.infoQuiz': 'Correct quiz: 3-5 points',
    
    // Categories default
    'category.verbos': 'Verbs',
    'category.expresiones': 'Expressions',
    'category.deporte': 'Sports',
  },
  
  fr: {
    // App
    'app.title': 'YourDictionary',
    'app.subtitle': 'Votre dictionnaire personnel d\'anglais',
    
    // Onboarding
    'onboarding.title': 'Choisissez votre langue',
    'onboarding.subtitle': 'Sélectionnez la langue de l\'application',
    'onboarding.spanish': 'Espagnol',
    'onboarding.english': 'Anglais',
    'onboarding.french': 'Français',
    'onboarding.continue': 'Continuer',
    
    // Home
    'home.points': 'Points',
    'home.wordOfTheDay': 'Mot du jour',
    'home.tapToReveal': 'Appuyez pour voir la traduction',
    'home.claimWord': 'Réclamer un autre mot',
    'home.cost': 'points',
    'home.quiz': 'Quiz',
    'home.startQuiz': 'Faire le quiz',
    'home.addWords': 'Ajoutez des mots à votre dictionnaire pour commencer',
    'home.needMoreWords': 'Vous avez besoin d\'au moins 5 mots pour le quiz',
    
    // Quiz
    'quiz.title': 'Quiz',
    'quiz.question': 'Quelle est la traduction de?',
    'quiz.correct': 'Correct!',
    'quiz.incorrect': 'Incorrect. La réponse était:',
    'quiz.points': 'points',
    
    // Dictionary
    'dictionary.title': 'Mon Dictionnaire',
    'dictionary.search': 'Rechercher des mots...',
    'dictionary.all': 'Tous',
    'dictionary.normal': 'Normal',
    'dictionary.star': 'Étoile',
    'dictionary.important': 'Important',
    'dictionary.words': 'mots',
    'dictionary.empty': 'Pas de mots',
    'dictionary.emptyHint': 'Ajoutez des mots à votre dictionnaire pour les voir ici',
    'dictionary.legend': 'Légende:',
    'dictionary.legendNormal': 'Normal - Apparaît dans le mot du jour et le quiz',
    'dictionary.legendStar': 'Étoile - N\'apparaît pas dans le mot du jour ni le quiz',
    'dictionary.legendImportant': 'Important - Apparaît plus souvent pour apprendre',
    'dictionary.tip': 'Cliquez sur le mot pour changer son statut',
    
    // Add Word
    'addWord.title': 'Nouveau Mot',
    'addWord.subtitle': 'Développez votre vocabulaire chaque jour',
    'addWord.newWord': 'Nouveau mot',
    'addWord.newWordPlaceholder': 'Ex: Hello',
    'addWord.translation': 'Traduction',
    'addWord.translationPlaceholder': 'Ex: Bonjour',
    'addWord.category': 'Catégorie',
    'addWord.selectCategory': 'Sélectionnez une catégorie',
    'addWord.newCategory': 'Nouvelle catégorie',
    'addWord.newCategoryPlaceholder': 'Ex: Nourriture, Voyage, Travail...',
    'addWord.addButton': 'Ajouter au dictionnaire',
    'addWord.pointsInfo': 'point par mot ajouté',
    'addWord.wordAdded': 'Mot ajouté!',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.yourPoints': 'Vos Points',
    'settings.total': 'Total',
    'settings.weeklyBest': 'Meilleure Semaine',
    'settings.monthlyBest': 'Meilleur Mois',
    'settings.preferences': 'Préférences',
    'settings.fontSize': 'Taille de police',
    'settings.small': 'Petit',
    'settings.medium': 'Moyen',
    'settings.large': 'Grand',
    'settings.difficulty': 'Difficulté du quiz',
    'settings.easy': 'Facile (3 options)',
    'settings.mediumOption': 'Moyen (4 options)',
    'settings.hard': 'Difficile (5 options)',
    'settings.theme': 'Thème',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    'settings.infoTitle': 'Gagnez des points chaque jour!',
    'settings.infoLogin': 'Entrer dans l\'app: 1-5 points',
    'settings.infoWord': 'Ajouter un mot: 1 point',
    'settings.infoQuiz': 'Quiz correct: 3-5 points',
    
    // Categories default
    'category.verbos': 'Verbes',
    'category.expresiones': 'Expressions',
    'category.deporte': 'Sport',
  }
};
