# Implementation Plan

- [x] 1. Setup project structure and dependencies



  - Create new component files in src/components/
  - Create utils directory with counter-utils.ts
  - Create futuristic.css in src/styles/
  - Install testing dependencies (vitest, fast-check, happy-dom)
  - Move video file to public/video/ directory
  - _Requirements: 1.1, 8.1_

- [x] 2. Implement VideoBackground component


  - Create VideoBackground.astro with video element
  - Add autoplay, loop, muted, and playsinline attributes
  - Implement fixed positioning with full viewport coverage
  - Add dark overlay with gradient for content legibility
  - Set appropriate z-index to keep video behind content
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 3. Create CSS variables and base futuristic styles


  - Define color variables (cyan, red, backgrounds)
  - Define border and glow effect variables
  - Define border-radius variables
  - Create utility classes for futuristic borders and glows
  - Add animation keyframes for pulse, blink, and scan effects
  - _Requirements: 2.1, 2.2, 2.4, 5.1, 5.2_

- [x] 4. Implement HUDPanel component


  - Create HUDPanel.astro with slot for content
  - Add cyan border with glow effect
  - Implement semi-transparent dark background
  - Add backdrop-filter blur with fallback
  - Apply rounded corners
  - Make panel responsive with max-width
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 5. Implement counter utility functions



  - Create counter-utils.ts with time calculation logic
  - Implement formatCounterTime function
  - Calculate months, days, hours, minutes, seconds from start date
  - Format output as "XX MONTHS / XX DAYS / HH:MM:SS"
  - Add proper zero-padding for all values
  - _Requirements: 3.4_

- [x] 5.1 Write property test for counter format


  - **Property 1: Formato consistente del contador**


  - **Validates: Requirements 3.4**

- [ ] 6. Implement CircularCounter component
  - Create CircularCounter.astro with circular design
  - Add three concentric rings (outer, middle, inner) with different opacities
  - Implement counter display with months, days, and time
  - Use Share Tech Mono font for numbers
  - Add decorative dots around outer ring
  - Integrate counter-utils.ts for time calculation


  - Add JavaScript to update counter every second
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [ ] 6.1 Write unit tests for CircularCounter
  - Test that component renders three rings
  - Test that counter updates correctly
  - Test that decorative dots are present
  - _Requirements: 3.1, 3.2, 3.5_

- [x] 7. Implement FuturisticNav component

  - Create FuturisticNav.astro with navigation links
  - Accept links prop as array of NavLink objects
  - Apply cyan border with glow effect
  - Implement semi-transparent background
  - Add hover effects with increased glow
  - Add active state with cyan underline
  - Include links: HOME, HISTORY, UPDATES, DONATE, ABOUT
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [x] 7.1 Write unit tests for FuturisticNav


  - Test that all provided links render
  - Test that active link has correct styling
  - Test that nav has cyan border
  - _Requirements: 6.1, 6.5_

- [x] 8. Implement StatsPanel component



  - Create StatsPanel.astro with title and content slots
  - Accept title, value, and type props
  - Apply cyan border with subtle glow
  - Implement semi-transparent dark background
  - Create variants for circular, line, and text types
  - Add rounded corners
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 8.1 Write unit tests for StatsPanel


  - Test that panel renders with correct border
  - Test that different types render correctly
  - Test that background is semi-transparent
  - _Requirements: 4.1, 4.4_

- [x] 9. Implement ActionButtons component


  - Create ActionButtons.astro with button array
  - Accept buttons prop with label, href, and onClick
  - Apply cyan border with transparent background
  - Implement hover effects with glow and semi-opaque background
  - Use uppercase text with wide letter-spacing
  - Add rounded corners
  - Ensure smooth transitions
  - _Requirements: 7.1, 7.3, 7.4, 7.5_

- [x] 9.1 Write unit tests for ActionButtons


  - Test that all buttons render
  - Test button styling (border, background, text-transform)
  - Test that minimum 3 buttons can be displayed
  - _Requirements: 7.1, 7.3, 7.4, 7.5_

- [x] 10. Implement DecorativeElements component


  - Create DecorativeElements.astro with decorative visuals
  - Add floating dots with slow movement animation
  - Add scan lines with scroll animation
  - Add corner accents
  - Ensure elements don't interfere with content interaction
  - Use cyan color scheme
  - _Requirements: 5.1, 5.5_

- [x] 11. Update index.astro with new layout


  - Import and add VideoBackground component
  - Import and add FuturisticNav component
  - Wrap content in HUDPanel component
  - Replace old WarCounter with new CircularCounter
  - Add StatsPanel components for additional info
  - Add ActionButtons component
  - Add DecorativeElements component
  - Update page title and heading
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1, 7.1_

- [x] 12. Implement responsive design

  - Add mobile breakpoint styles (< 768px)
  - Stack panels vertically on mobile
  - Reduce font sizes proportionally using clamp()
  - Adjust padding and margins for small screens
  - Ensure video maintains aspect ratio on mobile
  - Add tablet breakpoint styles (768px - 1024px)
  - Test layout at various viewport sizes
  - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [x] 12.1 Write unit tests for responsive behavior

  - Test layout changes at mobile breakpoint
  - Test font size scaling
  - Test video aspect ratio preservation
  - _Requirements: 8.1, 8.2, 8.4_

- [x] 13. Add animations and effects

  - Implement pulse animation for borders
  - Add blink animation for decorative dots
  - Add fade-in transitions for elements
  - Implement scan line animation
  - Add prefers-reduced-motion media query
  - Optimize animations for GPU acceleration
  - _Requirements: 5.1, 5.2, 5.5_

- [x] 13.1 Write unit tests for animations

  - Test that animations are applied
  - Test prefers-reduced-motion behavior
  - _Requirements: 5.1, 5.2_

- [x] 14. Implement error handling

  - Add video error handler with fallback gradient
  - Add @supports checks for backdrop-filter
  - Implement fallback styles for unsupported features
  - Add console error logging
  - Test error scenarios
  - _Requirements: 1.1, 2.3_

- [x] 14.1 Write unit tests for error handling

  - Test video error fallback
  - Test backdrop-filter fallback
  - _Requirements: 1.1, 2.3_

- [x] 15. Add accessibility features

  - Add aria-labels to navigation
  - Add role="timer" to counter
  - Add aria-live to counter for screen readers
  - Ensure keyboard navigation works
  - Verify color contrast meets WCAG AA
  - Test with screen reader
  - _Requirements: 6.1, 3.1_

- [x] 15.1 Write unit tests for accessibility

  - Test that aria attributes are present
  - Test that navigation is keyboard accessible
  - _Requirements: 6.1, 3.1_

- [x] 16. Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. Final polish and optimization


  - Optimize video file size if needed
  - Add video poster image
  - Minify CSS
  - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
  - Verify performance (no lag in animations)
  - Final visual review
  - _Requirements: 1.1, 5.4_
