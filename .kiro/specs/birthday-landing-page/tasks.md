# Implementation Plan: Birthday Landing Page

## Overview

Build a cinematic, scroll-driven 3D birthday experience that overlays the DipCrochet homepage exclusively on July 19 (Asia/Jakarta timezone). The feature is self-contained in `src/features/birthday-intro/`, uses dynamic imports for zero bundle impact on non-birthday days, and integrates via a single modification to the existing `IntroWrapper.tsx`.

## Tasks

- [x] 1. Set up module structure, types, and constants
  - [x] 1.1 Create the feature directory structure and shared types
    - Create `src/features/birthday-intro/` with subdirectories: `components/`, `three/`, `hooks/`, `utils/`, `assets/audio/`, `assets/textures/`
    - Create `types.ts` defining `BirthdayPhase`, `BirthdayState`, `BirthdayActions`, and `DateGateResult` interfaces exactly as specified in design
    - Create `index.ts` barrel export
    - _Requirements: 2.4, 14.1, 14.4_

  - [x] 1.2 Create constants and utility modules
    - Create `utils/constants.ts` with `BIRTHDAY_DATE`, `TIMEZONE`, `COLORS`, `TIMING`, `INTRO_LINES`, `BIRTHDAY_LETTER`, and `AUDIO_CONFIG` as defined in design
    - Create `utils/scrollMath.ts` with `SCROLL_SECTIONS` mapping and `scrollToPhase()` function
    - Create `utils/dateCheck.ts` with `isBirthdayToday()` pure function that checks July 19 in Asia/Jakarta timezone using `Intl.DateTimeFormat`
    - _Requirements: 1.3, 5.2, 6.5, 13.1_

  - [x] 1.3 Write property tests for date check and scroll math
    - **Property 1: Date gate activates exclusively on July 19 Asia/Jakarta**
    - **Property 6: Scroll-to-visibility is monotonically non-decreasing**
    - **Property 8: No forbidden color tones in palette**
    - **Validates: Requirements 1.1, 1.2, 1.3, 5.1, 5.5, 13.2**

- [x] 2. Implement state management and core hooks
  - [x] 2.1 Create Zustand store (`useBirthdayStore`)
    - Implement the store with all state fields and actions as defined in design
    - Include `dismiss()` with sessionStorage write wrapped in try/catch
    - Include `phase`, `scrollProgress`, `isMuted`, `audioReady`, `hasInteracted`, `isReducedMotion`, `isMobile`, `assetsLoaded` state
    - _Requirements: 12.1, 12.4, 12.5_

  - [x] 2.2 Create `useDateGate` hook
    - Implement client-side date check using `isBirthdayToday()` from utils
    - Read/write `dip_birthday_seen` sessionStorage key with try/catch fallback
    - Return `{ isBirthday, hasSeenThisSession, markAsSeen }` interface
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 12.1, 12.2, 12.3, 12.5_

  - [x] 2.3 Create `useScrollProgress` hook
    - Track scroll position within the birthday intro scroll container
    - Normalize to 0–1 range across the total scroll height (~5 viewport heights)
    - Update store `scrollProgress` and derive phase via `scrollToPhase()`
    - _Requirements: 5.1, 5.5_

  - [x] 2.4 Create `useAudioController` hook
    - Handle audio loading, playback deferral until first interaction, fade-in/fade-out
    - Respect `isMuted` from store, handle audio load errors gracefully
    - Comply with browser autoplay policies by deferring until interaction
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_

  - [x] 2.5 Create `useResourceDisposal` hook
    - Centralized cleanup: dispose Three.js geometries, materials, textures, renderers
    - Cancel all requestAnimationFrame loops, remove all event listeners
    - Execute within 1 second of dismissal
    - _Requirements: 2.3, 2.5, 9.3_

  - [x] 2.6 Write property tests for store and session logic
    - **Property 2: Session flag prevents re-display after dismissal**
    - **Property 3: Session flag is not set before explicit dismissal**
    - **Validates: Requirements 1.5, 12.1, 12.3, 12.4**

- [x] 3. Checkpoint - Core logic verification
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement 3D scene and particle system
  - [x] 4.1 Create `BirthdayScene.tsx` (main R3F Canvas)
    - Set up React Three Fiber Canvas with appropriate settings
    - Configure device pixel ratio: uncapped on desktop, capped at 1.5 on mobile (viewport ≤ 768px)
    - Include WebGL failure detection with try/catch and fallback to static background
    - _Requirements: 4.2, 4.3, 4.7, 9.1, 10.3_

  - [x] 4.2 Create `CinematicLighting.tsx`
    - Warm sunset-tone ambient + directional lights with soft shadows
    - Configure fog, background gradient of pink sky tones
    - _Requirements: 4.2, 4.3_

  - [x] 4.3 Create `PostProcessing.tsx`
    - Add bloom, depth-of-field, and light ray effects using Drei/Three.js post-processing
    - Use custom shaders only if standard materials cannot achieve the effect
    - _Requirements: 4.2, 13.3, 14.3_

  - [x] 4.4 Create `ParticleSystem.tsx`
    - Implement instanced meshes for sakura petals, hearts, butterflies, stars, floating dust
    - At least 3 instances of each type, visually distinguishable
    - Enforce max velocity of 0.5 units/sec and min oscillation period of 4 seconds
    - Reduce to 50% count on mobile (min 20 visible), increase 50% during scroll text phase
    - Keep particles within camera frustum at all times
    - _Requirements: 4.1, 4.4, 5.3, 10.2_

  - [x] 4.5 Create `YarnBalls.tsx` and `CrochetFlowers.tsx`
    - Instanced meshes for crochet yarn balls (≥3) and crochet flowers (≥3)
    - Floating animation respecting velocity/oscillation constraints
    - _Requirements: 4.1, 4.4, 9.4_

  - [x] 4.6 Create `Clouds.tsx`
    - Volumetric cloud meshes (≥3 instances) with gentle drift animation
    - _Requirements: 4.1_

  - [x] 4.7 Create `ParallaxCamera.tsx`
    - Mouse parallax on desktop, touch drag on mobile (viewport ≤ 768px)
    - Max offset ±0.3 scene units from center in any axis
    - Smooth interpolation over ≥200ms (lerp)
    - Disable movement when `isReducedMotion` is true
    - _Requirements: 4.5, 4.6, 10.5, 11.3_

  - [x] 4.8 Create `AnimeSilhouette.tsx`
    - Sprite or plane displaying the anime couple illustration
    - White-haired boy and long-haired girl in a dreamy romantic scene
    - Rendered during the scroll text section (after final intro line)
    - _Requirements: 5.4, 13.5_

  - [x] 4.9 Write property tests for particle and camera constraints
    - **Property 4: Particle velocity and oscillation constraints**
    - **Property 5: Camera parallax offset is bounded**
    - **Validates: Requirements 4.4, 4.5, 4.6**

- [x] 5. Checkpoint - 3D scene verification
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement UI components and scroll-driven animations
  - [x] 6.1 Create `CinematicOpening.tsx`
    - Black screen for 500ms → particle fade-in over 1500ms → camera reveal over 2000ms
    - "HAPPY BIRTHDAY" letter-by-letter at 4s → name fade-and-scale at 6s
    - Use Framer Motion for opacity/scale animations
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6_

  - [x] 6.2 Create `ScrollSequence.tsx`
    - Scroll-driven text reveals using Framer Motion
    - Each line fades in + translates upward over 600ms at evenly spaced scroll intervals
    - Lines hide when scrolling backward (scroll-to-visibility monotonically non-decreasing going forward)
    - Display 5 intro lines in the specified order
    - _Requirements: 5.1, 5.2, 5.5_

  - [x] 6.3 Create `AnimatedBook.tsx`
    - Scale-up + fade-in appearance over 800ms when scrolling past text section
    - Leather cover texture, pink ribbon, gold borders visual design
    - Page-turning animation (right-to-left rotation) over 1200ms per page
    - Typing effect for birthday letter at 30–50 chars/sec with handwriting font
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 6.4 Write property test for typing effect rate
    - **Property 7: Typing effect rate is within bounds**
    - **Validates: Requirements 6.4**

  - [x] 6.5 Create `EntryButton.tsx`
    - Text "💖 Enter DipCrochet 💖", rounded ≥20px, semi-transparent pink background
    - Animated glow (blur 8–20px), hover increases glow 50%+ and scales ≥1.02x (200–400ms)
    - Keyboard focusable (Tab/Enter/Space), visible focus indicator (2px outline)
    - ARIA label, disabled state during transition
    - Fade-in over 600ms after letter completes
    - _Requirements: 7.1, 7.2, 7.4, 7.6, 11.4, 11.5, 11.6_

  - [x] 6.6 Create `SkipButton.tsx`
    - Persistent top-right corner, min 44×44px touch target
    - Contrast ratio ≥4.5:1, ARIA label
    - On click/Enter/Space: triggers SPA transition within 500ms
    - _Requirements: 11.1, 11.2, 11.4, 11.5, 11.6_

  - [x] 6.7 Create `AudioToggle.tsx`
    - Mute/unmute floating button, min 44×44px touch target
    - Fixed position, visible throughout Birthday_Intro
    - Disabled state when audio fails to load
    - ARIA label, persists mute state across scroll/scene transitions
    - _Requirements: 8.4, 8.5, 8.6, 11.6_

  - [x] 6.8 Create `SpaTransition.tsx`
    - Forward camera movement + particle fade-out + fade-to-white overlay
    - Duration 1500–3000ms total, calls `dismiss()` on complete
    - Triggers unmount of entire Birthday_Intro
    - _Requirements: 7.3, 7.5, 2.3, 2.5_

  - [x] 6.9 Create `LoadingIndicator.tsx`
    - Minimal animated loading indicator shown while assets load
    - Prevents blank screen during dynamic import and asset loading
    - _Requirements: 9.6_

- [x] 7. Checkpoint - UI components verification
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement orchestration and integration
  - [x] 8.1 Create `BirthdayIntro.tsx` (root orchestrator)
    - Manages scroll container (total height ~5 viewport heights)
    - Coordinates all sub-components based on store phase
    - Handles `prefers-reduced-motion` detection → sets `isReducedMotion` in store
    - Handles viewport width detection → sets `isMobile` in store
    - Handles orientation change reflow within 300ms
    - Registers first-interaction listener for audio start
    - Keyboard navigation: Tab order, Escape triggers skip
    - Assigns `role="region"` with `aria-label` to container
    - _Requirements: 10.1, 10.4, 10.6, 11.3, 11.4, 11.6, 3.2_

  - [x] 8.2 Create `BirthdayIntroLoader.tsx`
    - Dynamic import of `BirthdayIntro` using `next/dynamic` with `ssr: false`
    - Shows `LoadingIndicator` while loading
    - Renders as fixed overlay with `z-[2000]`
    - Handles asset load timeout (10s) with skip prompt
    - _Requirements: 2.1, 9.2, 9.5, 9.6_

  - [x] 8.3 Modify `IntroWrapper.tsx` for birthday gate integration
    - Import `useDateGate` from birthday-intro feature
    - Conditionally render `BirthdayIntroLoader` when `isBirthday && !hasSeenThisSession`
    - Fall back to existing `IntroOverlay` on non-birthday days
    - This is the ONLY existing file modification
    - _Requirements: 1.1, 1.2, 1.5, 2.2_

  - [x] 8.4 Configure fonts via next/font or equivalent
    - Load serif/display font (e.g., Playfair Display) for titles
    - Load handwriting font (e.g., Dancing Script) for letter content
    - Use optimized loading to avoid layout shift
    - _Requirements: 13.4_

  - [x] 8.5 Write unit tests for integration and accessibility
    - Test BirthdayIntroLoader renders loading state then birthday content
    - Test IntroWrapper conditional rendering logic
    - Test keyboard navigation (Tab, Enter, Space, Escape)
    - Test ARIA labels and roles
    - Test reduced-motion mode displays static content with 300ms fades
    - Test WebGL fallback renders static background with Entry_Button accessible
    - _Requirements: 11.3, 11.4, 11.5, 11.6, 4.7_

- [x] 9. Final checkpoint - Full integration verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check`
- Unit tests validate specific examples and edge cases
- The only existing file modification is `src/features/intro/components/IntroWrapper.tsx` (task 8.3)
- All Three.js assets should be compressed: max 512×512 mobile, 1024×1024 desktop
- Audio file must be non-copyrighted instrumental (piano + strings)
- The anime silhouette must be an original illustration, not resembling any copyrighted character
- `fast-check` must be added as a devDependency for property-based tests

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1", "2.2"] },
    { "id": 2, "tasks": ["2.3", "2.4", "2.5", "2.6"] },
    { "id": 3, "tasks": ["4.1", "4.2", "6.9"] },
    { "id": 4, "tasks": ["4.3", "4.4", "4.5", "4.6", "4.7", "4.8"] },
    { "id": 5, "tasks": ["4.9", "6.1", "6.2"] },
    { "id": 6, "tasks": ["6.3", "6.5", "6.6", "6.7"] },
    { "id": 7, "tasks": ["6.4", "6.8", "8.4"] },
    { "id": 8, "tasks": ["8.1"] },
    { "id": 9, "tasks": ["8.2"] },
    { "id": 10, "tasks": ["8.3", "8.5"] }
  ]
}
```
