# Design Document

## Overview

Este diseño transforma la interfaz actual del contador de guerra en una experiencia visual futurista tipo HUD (Heads-Up Display) inspirada en interfaces de ciencia ficción. La implementación utiliza un video de fondo del mapa europeo nocturno, elementos con bordes brillantes cyan, animaciones sutiles y una paleta de colores oscura con acentos neón.

El diseño mantiene la funcionalidad core del contador mientras añade capas visuales que mejoran significativamente el atractivo estético sin comprometer la legibilidad o el rendimiento.

## Architecture

### Component Structure

```
Layout.astro
└── index.astro
    ├── VideoBackground.astro (nuevo)
    ├── FuturisticNav.astro (nuevo)
    ├── HUDPanel.astro (nuevo)
    │   ├── CircularCounter.astro (rediseñado)
    │   ├── StatsPanel.astro (nuevo)
    │   └── ActionButtons.astro (nuevo)
    └── DecorativeElements.astro (nuevo)
```

### Technology Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 4.x
- **Animations**: CSS animations + Tailwind animate utilities
- **Video**: HTML5 video element
- **Fonts**: 
  - Inter (UI text)
  - Share Tech Mono (números del contador - fuente monoespaciada futurista)

## Components and Interfaces

### 1. VideoBackground Component

**Purpose**: Renderizar el video de fondo con overlay oscuro

**Props**: Ninguno

**Structure**:
```astro
<div class="video-background">
  <video autoplay loop muted playsinline>
    <source src="/video/fondo.mp4" type="video/mp4">
  </video>
  <div class="video-overlay"></div>
</div>
```

**Styling**:
- Position: fixed, full viewport
- Z-index: -1
- Overlay: gradient oscuro con opacity 0.7-0.8
- Object-fit: cover para mantener aspect ratio

### 2. FuturisticNav Component

**Purpose**: Barra de navegación horizontal con estilo HUD

**Props**: 
- `links`: Array de objetos `{ label: string, href: string, active?: boolean }`

**Structure**:
```astro
<nav class="futuristic-nav">
  <div class="nav-border"></div>
  <ul>
    {links.map(link => (
      <li>
        <a href={link.href} class:list={['nav-link', { active: link.active }]}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

**Styling**:
- Border: 2px solid cyan con glow effect
- Background: rgba(0, 20, 40, 0.6)
- Hover: aumentar glow + background más opaco
- Active: underline cyan brillante

### 3. HUDPanel Component

**Purpose**: Contenedor principal con bordes brillantes que envuelve todo el contenido

**Props**: Ninguno (usa slots para contenido)

**Structure**:
```astro
<div class="hud-panel">
  <div class="hud-border"></div>
  <div class="hud-corners"></div>
  <div class="hud-content">
    <slot />
  </div>
</div>
```

**Styling**:
- Border: 2-3px solid #00ffff (cyan)
- Border-radius: 24px
- Box-shadow: 0 0 20px rgba(0, 255, 255, 0.5) (glow effect)
- Background: rgba(0, 10, 20, 0.7)
- Backdrop-filter: blur(10px)
- Padding: 3rem
- Max-width: 1200px

### 4. CircularCounter Component

**Purpose**: Contador de tiempo en diseño circular futurista

**Props**: Ninguno (calcula tiempo internamente)

**Structure**:
```astro
<div class="circular-counter">
  <div class="outer-ring"></div>
  <div class="middle-ring"></div>
  <div class="inner-ring"></div>
  <div class="counter-content">
    <div class="time-display">
      <span class="months" id="months">00</span>
      <span class="label">MONTHS</span>
      <span class="days" id="days">00</span>
      <span class="label">DAYS</span>
      <span class="time" id="time">00:00:00</span>
      <span class="label">HOURS/MINUTES/SECONDS</span>
    </div>
  </div>
  <div class="decorative-dots"></div>
</div>
```

**Styling**:
- Outer ring: 400px diameter, border 3px cyan, opacity 0.3
- Middle ring: 380px diameter, border 2px cyan, opacity 0.5
- Inner ring: 360px diameter, border 2px cyan, opacity 0.8
- Números: Share Tech Mono, tamaño grande (48-72px)
- Dots: 8-12 puntos pequeños en el perímetro con animación de parpadeo

**JavaScript**:
```javascript
function updateCounter() {
  const startDate = new Date('2022-02-24T00:00:00');
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('months').textContent = months.toString().padStart(2, '0');
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('time').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCounter, 1000);
updateCounter();
```

### 5. StatsPanel Component

**Purpose**: Paneles de información adicional con gráficos visuales

**Props**:
- `title`: string
- `value`: string | number
- `type`: 'circular' | 'line' | 'text'

**Structure**:
```astro
<div class="stats-panel">
  <div class="panel-border"></div>
  <h3 class="panel-title">{title}</h3>
  <div class="panel-content">
    {type === 'circular' && <CircularGraph value={value} />}
    {type === 'line' && <LineGraph />}
    {type === 'text' && <span class="stat-value">{value}</span>}
  </div>
</div>
```

**Styling**:
- Border: 1px solid cyan con glow sutil
- Background: rgba(0, 10, 20, 0.5)
- Padding: 1.5rem
- Border-radius: 12px

### 6. ActionButtons Component

**Purpose**: Botones de acción con estilo futurista

**Props**:
- `buttons`: Array de objetos `{ label: string, href?: string, onClick?: Function }`

**Structure**:
```astro
<div class="action-buttons">
  {buttons.map(btn => (
    <button class="futuristic-button">
      <span class="button-border"></span>
      <span class="button-text">{btn.label}</span>
    </button>
  ))}
</div>
```

**Styling**:
- Border: 2px solid cyan
- Background: transparent
- Hover: background rgba(0, 255, 255, 0.1) + glow aumentado
- Text: uppercase, letter-spacing: 0.2em
- Padding: 1rem 2rem
- Border-radius: 8px
- Transition: all 0.3s ease

### 7. DecorativeElements Component

**Purpose**: Elementos decorativos (puntos, líneas) para enriquecer la interfaz

**Structure**:
```astro
<div class="decorative-elements">
  <div class="floating-dots"></div>
  <div class="scan-lines"></div>
  <div class="corner-accents"></div>
</div>
```

**Styling**:
- Floating dots: puntos cyan pequeños con animación de movimiento lento
- Scan lines: líneas horizontales sutiles con animación de scroll
- Corner accents: elementos en las esquinas del viewport

## Data Models

### CounterData Interface

```typescript
interface CounterData {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  startDate: Date;
}
```

### NavLink Interface

```typescript
interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}
```

### StatsPanelData Interface

```typescript
interface StatsPanelData {
  title: string;
  value: string | number;
  type: 'circular' | 'line' | 'text';
  unit?: string;
  color?: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

Después de revisar todas las propiedades identificadas en el prework, la mayoría son ejemplos específicos de verificación de estilos y estructura DOM. La única propiedad universal identificada es:

- **3.4**: Formato del contador - esta es una propiedad que debe mantenerse para todos los valores posibles del tiempo transcurrido

Las demás son verificaciones de ejemplos específicos (presencia de elementos, valores de estilos CSS específicos) que no requieren testing basado en propiedades, sino tests de ejemplo/integración.

### Correctness Properties

Property 1: Formato consistente del contador
*Para cualquier* timestamp válido después de la fecha de inicio (2022-02-24), el texto del contador debe seguir el formato "XX MONTHS / XX DAYS / HH:MM:SS" donde XX son dígitos con padding de ceros y HH:MM:SS es tiempo en formato 24 horas con padding de ceros.
**Validates: Requirements 3.4**

## Error Handling

### Video Loading Errors

**Scenario**: El video fondo.mp4 no se carga correctamente

**Handling**:
1. Mostrar un fallback de gradiente estático similar al video
2. Log error en consola para debugging
3. No bloquear la renderización del resto de la interfaz

```javascript
video.addEventListener('error', (e) => {
  console.error('Video failed to load:', e);
  videoContainer.classList.add('fallback-gradient');
});
```

### Browser Compatibility

**Scenario**: El navegador no soporta ciertas características CSS (backdrop-filter, etc.)

**Handling**:
1. Usar @supports para detectar soporte de características
2. Proveer fallbacks visuales aceptables
3. Mantener funcionalidad core intacta

```css
@supports (backdrop-filter: blur(10px)) {
  .hud-panel {
    backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .hud-panel {
    background: rgba(0, 10, 20, 0.9);
  }
}
```

### Performance Issues

**Scenario**: Animaciones causan lag en dispositivos de baja potencia

**Handling**:
1. Usar `prefers-reduced-motion` media query
2. Reducir o eliminar animaciones para usuarios que lo prefieran
3. Optimizar animaciones usando transform y opacity (GPU-accelerated)

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Layout Issues

**Scenario**: Contenido no cabe en pantallas muy pequeñas

**Handling**:
1. Usar overflow-y: auto en contenedores cuando sea necesario
2. Reducir padding y márgenes en breakpoints móviles
3. Escalar fuentes proporcionalmente usando clamp()

```css
.counter-text {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

## Testing Strategy

### Unit Testing

**Framework**: Vitest

**Test Coverage**:

1. **Counter Calculation Tests**
   - Verificar cálculo correcto de meses, días, horas, minutos, segundos
   - Test con fechas específicas conocidas
   - Test de edge cases (mismo día, años completos, etc.)

2. **Component Rendering Tests**
   - Verificar que VideoBackground renderiza elemento video con atributos correctos
   - Verificar que FuturisticNav renderiza todos los links proporcionados
   - Verificar que HUDPanel renderiza contenido del slot
   - Verificar que CircularCounter renderiza estructura de anillos
   - Verificar que StatsPanel renderiza según el tipo especificado
   - Verificar que ActionButtons renderiza todos los botones proporcionados

3. **Style Verification Tests**
   - Verificar colores cyan en bordes (#00ffff o similar)
   - Verificar presencia de box-shadow para glow effects
   - Verificar border-radius en elementos apropiados
   - Verificar z-index del video background

4. **Responsive Behavior Tests**
   - Verificar layout en viewport móvil (< 768px)
   - Verificar layout en viewport tablet (768px - 1024px)
   - Verificar layout en viewport desktop (> 1024px)

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Cada test de propiedad debe ejecutar un mínimo de 100 iteraciones

**Property Tests**:

1. **Counter Format Property Test**
   - **Tag**: Feature: futuristic-ui-redesign, Property 1: Formato consistente del contador
   - **Generator**: Generar timestamps aleatorios entre 2022-02-24 y 100 años en el futuro
   - **Property**: Para cualquier timestamp válido, el formato del texto debe ser "XX MONTHS / XX DAYS / HH:MM:SS"
   - **Verification**: 
     - Regex match: `/^\d{2} MONTHS \/ \d{2} DAYS \/ \d{2}:\d{2}:\d{2}$/`
     - Valores numéricos deben ser válidos (meses >= 0, días 0-29, horas 0-23, minutos 0-59, segundos 0-59)

**Example Test Structure**:

```javascript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';
import { formatCounterTime } from './counter-utils';

describe('Counter Format Property Tests', () => {
  it('should format any valid timestamp correctly', () => {
    // Feature: futuristic-ui-redesign, Property 1: Formato consistente del contador
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2022-02-24'), max: new Date('2122-12-31') }),
        (timestamp) => {
          const formatted = formatCounterTime(new Date('2022-02-24'), timestamp);
          
          // Verify format matches pattern
          const formatRegex = /^(\d{2}) MONTHS \/ (\d{2}) DAYS \/ (\d{2}):(\d{2}):(\d{2})$/;
          expect(formatted).toMatch(formatRegex);
          
          // Extract and verify values
          const match = formatted.match(formatRegex);
          const [_, months, days, hours, minutes, seconds] = match.map(Number);
          
          expect(months).toBeGreaterThanOrEqual(0);
          expect(days).toBeGreaterThanOrEqual(0);
          expect(days).toBeLessThan(30);
          expect(hours).toBeGreaterThanOrEqual(0);
          expect(hours).toBeLessThan(24);
          expect(minutes).toBeGreaterThanOrEqual(0);
          expect(minutes).toBeLessThan(60);
          expect(seconds).toBeGreaterThanOrEqual(0);
          expect(seconds).toBeLessThan(60);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Scope**: Verificar que todos los componentes trabajan juntos correctamente

**Test Scenarios**:

1. **Full Page Render Test**
   - Cargar página completa
   - Verificar que video, nav, panel HUD, contador, stats y botones están presentes
   - Verificar que no hay errores de consola

2. **Counter Update Test**
   - Verificar que el contador se actualiza cada segundo
   - Verificar que los valores incrementan correctamente
   - Verificar que no hay flickering o saltos visuales

3. **Responsive Layout Test**
   - Cambiar viewport size
   - Verificar que layout se adapta correctamente
   - Verificar que no hay overflow horizontal

### Visual Regression Testing

**Tool**: Playwright con screenshots

**Test Cases**:
- Screenshot de página completa en desktop
- Screenshot de página completa en mobile
- Screenshot de hover states en botones
- Screenshot de animaciones en diferentes frames

## Implementation Notes

### CSS Custom Properties

Definir variables CSS para mantener consistencia:

```css
:root {
  --color-cyan: #00ffff;
  --color-cyan-glow: rgba(0, 255, 255, 0.5);
  --color-red: #ff0040;
  --color-bg-dark: rgba(0, 10, 20, 0.7);
  --color-bg-darker: rgba(0, 5, 10, 0.9);
  --border-width: 2px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 24px;
  --glow-sm: 0 0 10px var(--color-cyan-glow);
  --glow-md: 0 0 20px var(--color-cyan-glow);
  --glow-lg: 0 0 30px var(--color-cyan-glow);
}
```

### Animation Performance

Usar solo propiedades GPU-accelerated:
- `transform`
- `opacity`
- `filter`

Evitar animar:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Video Optimization

1. Comprimir video para web (H.264, tamaño < 5MB si es posible)
2. Usar poster image para mostrar mientras carga
3. Considerar lazy loading si el video es grande

```html
<video poster="/video-poster.jpg" preload="metadata">
  <source src="/video/fondo.mp4" type="video/mp4">
</video>
```

### Accessibility Considerations

1. Asegurar contraste suficiente para texto (WCAG AA mínimo)
2. Proveer alternativas para animaciones (prefers-reduced-motion)
3. Asegurar que navegación es accesible por teclado
4. Añadir aria-labels apropiados

```html
<nav aria-label="Main navigation">
  <a href="/" aria-current="page">Home</a>
</nav>

<div role="timer" aria-live="polite" aria-atomic="true">
  <!-- Counter content -->
</div>
```

### File Structure

```
src/
├── components/
│   ├── VideoBackground.astro
│   ├── FuturisticNav.astro
│   ├── HUDPanel.astro
│   ├── CircularCounter.astro
│   ├── StatsPanel.astro
│   ├── ActionButtons.astro
│   └── DecorativeElements.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── styles/
│   ├── global.css
│   └── futuristic.css (nuevo)
├── utils/
│   └── counter-utils.ts (nuevo)
└── video/
    └── fondo.mp4

tests/
├── unit/
│   ├── counter-utils.test.ts
│   └── components.test.ts
└── property/
    └── counter-format.property.test.ts
```

### Dependencies to Add

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "fast-check": "^3.15.0",
    "@vitest/ui": "^1.0.0",
    "happy-dom": "^12.0.0"
  }
}
```

## Migration Strategy

### Phase 1: Setup
1. Añadir video a carpeta public/video/
2. Instalar dependencias de testing
3. Crear estructura de archivos

### Phase 2: Core Components
1. Implementar VideoBackground
2. Implementar HUDPanel
3. Implementar CircularCounter (migrar lógica existente)

### Phase 3: Additional Components
1. Implementar FuturisticNav
2. Implementar StatsPanel
3. Implementar ActionButtons
4. Implementar DecorativeElements

### Phase 4: Styling
1. Crear futuristic.css con variables y utilidades
2. Aplicar estilos a todos los componentes
3. Implementar animaciones

### Phase 5: Testing
1. Escribir unit tests
2. Escribir property-based test para formato de contador
3. Ejecutar tests y corregir issues

### Phase 6: Polish
1. Optimizar rendimiento
2. Verificar responsive design
3. Añadir accessibility features
4. Testing final en múltiples navegadores
