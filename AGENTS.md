# AGENTS.md - yourDictionary

## Descripción del Proyecto

App móvil para aprender inglés (Ionic + Capacitor + Angular standalone). El usuario crea su diccionario personal de palabras/expresiones y tiene herramientas para repasar y motivarse.

---

## Stack Tecnológico

- **Framework**: Ionic 8 + Capacitor + Angular 19+ (standalone)
- **Persistencia**: LocalStorage
- **Estado**: Angular Signals
- **Estilos**: SCSS con CSS Variables
- **Repo**: https://github.com/JBenitoBabel/yourDictionary.git

---

## Agentes Definidos (8)

| # | Agente | Tarea | Depende de |
|---|--------|-------|------------|
| 1 | **Setup** | Inicializar proyecto Ionic, crear repo GitHub, configurar Git (dev/main), estructura carpetas base | - |
| 2 | **Core** | Modelos TypeScript, servicios (Dictionary, Points, User, Settings, Theme) con LocalStorage | Setup |
| 3 | **Onboarding** | Pantalla selección idioma (español/inglés/francés), guard primera vez | Core |
| 4 | **Home** | Header con título/puntos, palabra del día (flip card), quiz card, FAB (+) | Core, Onboarding |
| 5 | **Dictionary** | Lista palabras, buscador, estados (normal/star/important), footer leyenda | Core |
| 6 | **AddWord** | Formulario añadir palabra, select categorías + nueva categoría | Core |
| 7 | **Settings** | Tamaño fuente, dificultad, vista puntos (total/semanal/mensual) | Core |
| 8 | **Styling** | Temas CSS (naranja + claro/oscuro), animaciones flip card, polish UI/UX | Todos |

### Paralelismo

- **Setup** → solo
- **Core**, **Onboarding** → pueden并行 (tras Setup)
- **Home**, **Dictionary**, **AddWord**, **Settings** → pueden并行 (tras Core)
- **Styling** → al final, necesita todos los features

---

## Flujo Git

```bash
# Rama principal: dev
# main: solo para producción (via PR)

# Crear rama para tarea:
git checkout -b feature/nombre-tarea dev

# Commitear:
git commit -m "[Tarea] Descripción"

# Push y crear PR:
git push -u origin feature/nombre-tarea
gh pr create --title "[Tarea] Descripción" --body "Cambios..." --base dev
```

### Reglas

- ❌ Nunca commitear directamente a `dev` o `main`
- ✅ Cada tarea en su propia rama → PR a `dev`
- ✅ `main` solo acepta merge via PR cuando la app esté completa

---

## Comandos Ionic CLI

```bash
# ============ SETUP ============
ionic start yourDictionary --type=angular --standalone

# ============ PÁGINAS (routed) ============
ionic g page pages/onboarding
ionic g page pages/home
ionic g page pages/dictionary
ionic g page pages/add-word
ionic g page pages/settings

# ============ COMPONENTES ============
ionic g component components/word-card
ionic g component components/quiz-card
ionic g component components/word-list-item
ionic g component components/language-select
ionic g component components/header
ionic g component components/footer

# ============ SERVICIOS ============
ionic g service services/dictionary
ionic g service services/points
ionic g service services/user
ionic g service services/settings
ionic g service services/theme
```

**Nota**: Las interfaces se crean manualmente en `src/app/core/models/interfaces.ts`

---

## Definition of Done (por tarea)

- [ ] Compila sin errores: `ionic build`
- [ ] Funciona en navegador: `ionic serve`
- [ ] Cumple requisitos del usuario
- [ ] Código sigue convenciones del proyecto
- [ ] PR creada a rama `dev`

---

## Estructura del Proyecto

```
yourDictionary/
├── src/app/
│   ├── core/
│   │   ├── models/
│   │   │   └── interfaces.ts
│   │   └── services/
│   │       ├── dictionary.service.ts
│   │       ├── points.service.ts
│   │       ├── user.service.ts
│   │       ├── settings.service.ts
│   │       └── theme.service.ts
│   ├── features/
│   │   ├── onboarding/
│   │   ├── home/
│   │   ├── dictionary/
│   │   ├── add-word/
│   │   └── settings/
│   ├── shared/
│   │   └── components/
│   └── app.routes.ts
├── .gitignore
├── ionic.config.json
└── package.json
```

---

## Configuración Inicial

### Categorías por Defecto
Al iniciar, el diccionario tendrá:
- Verbos
- Expresiones
- Deporte

### Títulos por Puntos

| Puntos | Título |
|--------|--------|
| 0-50 | Novato |
| 51-150 | Aprendíz |
| 151-300 | Estudiante |
| 301-500 | Erudito |
| 501-800 | Sabio |
| 801-1200 | Maestro |
| 1200+ | Gurú del Vocabulario 🎓 |

### Sistema de Puntos

| Acción | Puntos |
|--------|--------|
| Login diario (1-5 días) | 1-5 puntos |
| Añadir palabra | +1 punto |
| Quiz fácil (3 opciones) | +3 puntos |
| Quiz medio (4 opciones) | +4 puntos |
| Quiz difícil (5 opciones) | +5 puntos |

### Colores (CSS Variables)

```scss
:root {
  --primary: #FF6B35;        // Naranja principal
  --secondary: #F7931A;     // Naranja secundario
  --accent: #FFD23F;         // Amarillo/dorado
  --bg-light: #FFF8F0;
  --bg-dark: #1A1A1A;
  --text-light: #333333;
  --text-dark: #F5F5F5;
}
```

---

## Convenciones de Código

### Angular 19+ Best Practices

- ✅ Usar **standalone components** (por defecto)
- ✅ **Signals** para estado reactivo
- ✅ `inject()` en lugar de constructor
- ✅ Proveer servicios con `providedIn: 'root'`
- ✅ Tipado fuerte con TypeScript interfaces

### Nomenclatura

- Archivos: `kebab-case` (ej: `word-card.component.ts`)
- Componentes: `PascalCase` (ej: `WordCardComponent`)
- Servicios: `nombre.service.ts`

### Estructura Feature-Based

Cada feature en su propia carpeta bajo `src/app/features/`:
```
features/
  home/
    home.component.ts
    home.component.html
    home.component.scss
```

---

## Primera Tarea: Setup

El agente **Setup** debe:

1. Crear proyecto Ionic: `ionic start yourDictionary --type=angular --standalone`
2. Configurar Git:
   ```bash
   cd yourDictionary
   git init
   git checkout -b dev
   git checkout -b main
   git checkout dev
   ```
3. Crear repo GitHub y push:
   ```bash
   gh repo create yourDictionary --public --source=. --description "App para aprender inglés"
   gh repo set-default JBenitoBabel/yourDictionary
   git push -u origin dev
   git push -u origin main
   ```
4. Crear estructura de carpetas:
   ```bash
   mkdir -p src/app/core/models
   mkdir -p src/app/core/services
   mkdir -p src/app/features/onboarding
   mkdir -p src/app/features/home
   mkdir -p src/app/features/dictionary
   mkdir -p src/app/features/add-word
   mkdir -p src/app/features/settings
   mkdir -p src/app/shared/components
   ```
5. Commit y push a `dev`:
   ```bash
   git add .
   git commit -m "[Setup] Estructura base del proyecto"
   git push -u origin dev
   ```

---

# UI/UX Guidelines

## Objetivo
La aplicación debe tener un diseño moderno, limpio y usable, priorizando mobile-first.

## Principios
- Simplicidad sobre complejidad
- Consistencia visual en toda la app
- Jerarquía clara (títulos, contenido, acciones)
- Acciones importantes destacadas
- Espaciado generoso

## Layout
- Usar spacing basado en múltiplos de 8px
- Evitar elementos pegados a bordes
- Usar cards con padding uniforme (16px–24px)
- Evitar scrolls internos innecesarios
- Siempre añadir padding-bottom adecuado en ion-content para evitar superposiciones con elementos fixed

## Tipografía
- Tamaños recomendados:
  - Título: 20–24px
  - Subtítulo: 16–18px
  - Texto: 14–16px
- Usar máximo 2 pesos de fuente

## Colores
- Definir variables CSS:
  - primary
  - secondary
  - background
  - surface
  - text (para texto principal)
  - text-secondary (para texto secundario)
  - text-on-primary (para texto sobre color primario)
- Asegurar contraste accesible (WCAG AA mínimo)

## Componentes
### Botones
- Altura mínima: 44px
- Bordes redondeados (8px–12px)
- Estados: hover, active, disabled
- Usar siempre colores primary para acciones principales

### Cards
- Border-radius: 12px–16px
- Padding: 16px–24px
- Fondo: var(--surface)

### Inputs
- Altura mínima: 44px
- Labels claros
- Bordes consistentes

## Ionic
- Respetar variables de Ionic (`--ion-color-*`)
- No sobreescribir estilos base sin necesidad
- Usar componentes Ionic como base
- Forzar colores con CSS variables en todos los elementos

## Buenas prácticas
- No usar estilos inline
- Reutilizar clases
- Evitar duplicación de SCSS
- Usar variables y mixins
- Definir estilos comunes en global.scss
