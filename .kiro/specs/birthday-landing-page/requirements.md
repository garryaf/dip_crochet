# Requirements Document

## Introduction

A cinematic, award-winning birthday landing page experience for the DipCrochet website that appears exclusively on July 19 each year (Asia/Jakarta timezone). The experience acts as an intro layer before the main site — a scroll-driven, 3D animated celebration with animated text, a magical opening book containing a birthday letter, ambient music, and premium particle effects. The existing website remains completely untouched; the birthday intro overlays or precedes it via SPA transition.

## Glossary

- **Birthday_Intro**: The full-screen cinematic birthday experience that appears before the main DipCrochet website on July 19
- **Date_Gate**: The timezone-aware logic that determines whether the current date is July 19 in Asia/Jakarta timezone
- **Three_Scene**: The React Three Fiber canvas containing 3D objects, particles, lighting, and camera parallax
- **Scroll_Sequence**: The scroll-driven progression through the birthday intro scenes
- **Animated_Book**: A 3D or 2D-animated storybook element that opens via scroll to reveal the birthday letter
- **Typing_Effect**: A character-by-character text reveal animation simulating handwriting
- **Particle_System**: The collection of floating sakura petals, hearts, butterflies, sparkles, crochet yarn particles, and stars
- **Entry_Button**: The interactive button that triggers the cinematic transition from the Birthday_Intro to the main website
- **SPA_Transition**: A seamless fade/fly-forward animation that reveals the original homepage without a full page reload
- **Parallax_Camera**: A Three.js camera that subtly shifts position based on mouse or touch input
- **Ambient_Audio**: Background instrumental piano and strings music that loops at low volume
- **Skip_Button**: A persistent accessibility control that allows users to bypass the Birthday_Intro at any time
- **Anime_Silhouette**: An original anime-inspired illustration of a couple (white-haired boy and long-haired girl) in a dreamy romantic scene
- **Reduced_Motion_Mode**: A simplified experience served when the user has enabled prefers-reduced-motion in their operating system

## Requirements

### Requirement 1: Date-Based Activation

**User Story:** As a visitor, I want the birthday intro to appear only on July 19 so that the website behaves normally on all other days.

#### Acceptance Criteria

1. WHEN the current date in Asia/Jakarta timezone (UTC+7) is July 19 and the visitor loads the page for the first time in that browser session, THE Date_Gate SHALL activate the Birthday_Intro before rendering the main website content
2. WHEN the current date in Asia/Jakarta timezone is any day other than July 19, THE Date_Gate SHALL bypass the Birthday_Intro and render the main website immediately without delay
3. THE Date_Gate SHALL evaluate the date on the client side at page load time using the Asia/Jakarta timezone (UTC+7) regardless of the visitor's local timezone
4. WHEN the date changes from July 19 to July 20 in Asia/Jakarta timezone while a visitor has the page open, THE Date_Gate SHALL allow the current Birthday_Intro sequence to run to its final state without interruption rather than forcibly removing it mid-display
5. WHEN the visitor navigates to another page or refreshes the browser during July 19 after having already completed the Birthday_Intro in the same browser session, THE Date_Gate SHALL bypass the Birthday_Intro and render the main website immediately

### Requirement 2: Non-Destructive Integration

**User Story:** As the site owner, I want the birthday feature to leave the existing website completely untouched so that no existing functionality breaks.

#### Acceptance Criteria

1. THE Birthday_Intro SHALL render as a fixed-position overlay using a z-index higher than all existing application layers, without inserting elements into or modifying the DOM structure of existing components
2. THE Birthday_Intro SHALL not modify any existing file outside of its own feature module directory; no existing route, layout, component, or style definition in the DipCrochet application shall be changed
3. WHEN the Birthday_Intro is dismissed or completed, THE Birthday_Intro SHALL unmount entirely, disposing any WebGL contexts, cancelling animation frames, and removing all event listeners registered by the feature, within 1 second of the dismiss action
4. THE Birthday_Intro SHALL be implemented as a self-contained feature module within the existing `src/features/` directory structure, importing only from `src/shared/` or third-party packages and never importing from or being imported by other feature modules
5. WHEN the Birthday_Intro is dismissed or completed, THE Birthday_Intro SHALL remove all of its DOM nodes so that underlying page elements receive pointer events and remain fully interactive

### Requirement 3: Cinematic Opening Sequence

**User Story:** As a visitor on July 19, I want to see a dramatic cinematic opening so that the birthday experience feels premium and magical.

#### Acceptance Criteria

1. WHEN the Birthday_Intro activates, THE Three_Scene SHALL start with a completely black screen (background color #000000) for a minimum of 500 milliseconds
2. WHEN the Birthday_Intro activates and the user has interacted with the page, THE Ambient_Audio SHALL begin playing with a fade-in to 20% volume over 2 seconds; IF the user has not interacted, THE Ambient_Audio SHALL defer until the first interaction event
3. WHEN 1 second has elapsed from activation, THE Three_Scene SHALL fade in glowing particles against the black background over a duration of 1500 milliseconds
4. WHEN 2.5 seconds have elapsed from activation, THE Parallax_Camera SHALL begin slow forward movement revealing the 3D scene over a duration of 2000 milliseconds
5. WHEN 4 seconds have elapsed from activation, THE Three_Scene SHALL display the animated title text "HAPPY BIRTHDAY" with a letter-by-letter reveal over 1500 milliseconds
6. WHEN 6 seconds have elapsed from activation, THE Three_Scene SHALL display the name "Dinar Intan Permatasari" with a fade-and-scale reveal animation over 1200 milliseconds

### Requirement 4: 3D Scene and Particle Effects

**User Story:** As a visitor, I want to see a beautiful 3D environment with floating objects so that the experience feels immersive and magical.

#### Acceptance Criteria

1. THE Three_Scene SHALL render a 3D environment containing at least 3 instances each of crochet yarn balls, crochet flowers, sakura petals, butterflies, hearts, floating stars, clouds, and light particles, all visually distinguishable by type
2. THE Three_Scene SHALL apply a background gradient of pink sky tones with fog, bloom lighting, light rays, floating dust, and depth-of-field effects
3. THE Three_Scene SHALL use warm sunset-tone lighting with soft shadows and bloom effects
4. THE Particle_System SHALL animate all floating objects with a maximum linear velocity of 0.5 scene units per second and a full oscillation cycle of no less than 4 seconds, ensuring objects remain within the camera frustum at all times
5. WHILE the visitor is using a desktop device, WHEN the mouse moves, THE Parallax_Camera SHALL shift position by a maximum of 0.3 scene units from center in any axis, interpolated smoothly over at least 200 milliseconds
6. WHEN the visitor uses a touch device, THE Parallax_Camera SHALL respond to device tilt or touch drag with a maximum position shift of 0.3 scene units from center, interpolated smoothly over at least 200 milliseconds
7. IF WebGL is unavailable or the Three_Scene fails to initialize, THEN THE Birthday_Intro SHALL display a static fallback background image with the particle effects disabled and allow the visitor to proceed to the Entry_Button

### Requirement 5: Scroll-Driven Intro Text Animation

**User Story:** As a visitor, I want to see animated birthday messages as I scroll so that the experience feels personal and emotional.

#### Acceptance Criteria

1. THE Scroll_Sequence SHALL reveal intro text lines one at a time as the user scrolls, where each line fades in and translates upward over a duration of 600 milliseconds, triggered at evenly spaced scroll intervals across the total scroll section height
2. THE Scroll_Sequence SHALL display the following lines in order: "Happy Birthday...", "Dinar Intan Permatasari...", "Today is your day...", "Every stitch you make brings warmth.", "Every smile you give makes my world brighter."
3. WHEN the user scrolls within the Scroll_Sequence section, THE Particle_System SHALL increase the visible particle count by at least 50% compared to the baseline particle count from the preceding cinematic opening scene
4. WHEN the user scrolls past the final intro text line, THE Scroll_Sequence SHALL display the Anime_Silhouette scene of a couple with cherry blossoms, sunset gradient background, and bloom lighting consistent with the Three_Scene lighting
5. WHEN the user scrolls backward within the Scroll_Sequence, THE Scroll_Sequence SHALL reverse the text reveal state so that lines not yet scrolled past return to their hidden state

### Requirement 6: Animated Book with Birthday Letter

**User Story:** As a visitor, I want to see a magical book open and reveal a heartfelt birthday letter so that the experience feels intimate and emotional.

#### Acceptance Criteria

1. WHEN the user scrolls past the intro text section, THE Animated_Book SHALL appear with a scale-up and fade-in animation over a duration of 800 milliseconds
2. THE Animated_Book SHALL have the visual appearance of a realistic magical storybook with a leather cover texture, pink ribbon element, and gold-colored decorative borders
3. WHEN the user continues scrolling, THE Animated_Book SHALL open with a page-turning animation that rotates pages from right to left over a duration of 1200 milliseconds per page
4. WHEN the Animated_Book is fully open, THE Typing_Effect SHALL reveal the birthday letter text character by character at a rate of 30 to 50 characters per second using a handwriting-style font
5. THE Typing_Effect SHALL display the following birthday letter content: "Happy Birthday.\nMakasih ya udah lahir ke dunia dan hadir di hidup aku.\nAku sering mikir, kalau waktu itu kita gak dipertemukan, mungkin hidup aku gak akan sehangat sekarang.\nBuat aku, kamu bukan cuma seseorang yang aku sayang, tapi juga rumah tempat hati ini selalu ingin pulang.\nAku gak bisa janji perjalanan kita selalu mudah, tapi aku janji akan selalu berusaha tetap menggenggam tangan kamu, apa pun yang terjadi.\nSemoga tahun ini membawa lebih banyak bahagia, kesehatan, rezeki, dan mimpi yang pelan-pelan jadi nyata.\nI love you, today, tomorrow, and every day after that. ❤️"
6. WHEN the entire letter has been revealed, THE Entry_Button SHALL appear with a fade-in animation over a duration of 600 milliseconds

### Requirement 7: Entry Button and Site Transition

**User Story:** As a visitor, I want a clear way to enter the main website after the birthday experience so that I can access the DipCrochet store.

#### Acceptance Criteria

1. THE Entry_Button SHALL display the text "💖 Enter DipCrochet 💖" with a rounded border-radius of at least 20px, a semi-transparent pink background, and an animated outer glow with a blur radius between 8px and 20px
2. WHEN the user hovers over the Entry_Button, THE Entry_Button SHALL increase the outer glow blur radius by at least 50% and scale up by at least 1.02x within a transition duration of 200ms to 400ms
3. WHEN the user clicks the Entry_Button, THE SPA_Transition SHALL execute an exit sequence consisting of a forward camera movement, particle fade-out, and a fade-to-white overlay, completing within 1500ms to 3000ms total duration
4. WHILE the SPA_Transition is in progress, THE Entry_Button SHALL be disabled and ignore additional click or keyboard activation events
5. WHEN the SPA_Transition completes, THE Birthday_Intro SHALL unmount and reveal the original homepage without a page refresh
6. THE Entry_Button SHALL be keyboard-focusable and activatable via Enter or Space key, and SHALL display a visible focus indicator with a minimum 2px outline offset when focused

### Requirement 8: Audio Experience

**User Story:** As a visitor, I want ambient romantic music to accompany the birthday experience so that the atmosphere feels complete.

#### Acceptance Criteria

1. THE Ambient_Audio SHALL use a non-copyrighted instrumental track featuring romantic piano and soft strings
2. THE Ambient_Audio SHALL play at 20% volume, loop continuously, apply a fade-in over 2 seconds on start, and apply a fade-out over 1.5 seconds on exit
3. WHEN the user has not yet interacted with the page, THE Ambient_Audio SHALL defer playback until the first user interaction (click, tap, or keypress) to comply with browser autoplay policies
4. THE Ambient_Audio SHALL provide a mute/unmute toggle control with a minimum tap target of 44×44 pixels, visible in a fixed position at all times during the Birthday_Intro
5. WHEN the user toggles mute, THE Ambient_Audio SHALL persist the muted or unmuted state for the remainder of the Birthday_Intro session without resetting on scroll or scene transitions
6. IF the audio file fails to load or encounters a playback error, THEN THE Ambient_Audio SHALL allow the Birthday_Intro to continue without audio and SHALL display the toggle control in a disabled state

### Requirement 9: Performance Optimization

**User Story:** As a visitor, I want the birthday experience to run smoothly so that it feels premium rather than sluggish.

#### Acceptance Criteria

1. THE Three_Scene SHALL maintain a minimum of 60 frames per second on desktop devices with dedicated GPUs and a minimum of 30 frames per second on mobile devices, measured as the average over any 5-second window during the Birthday_Intro
2. THE Birthday_Intro SHALL lazy-load all 3D assets, textures, and audio files using dynamic imports so that they are not included in the initial page bundle and do not impact page load on non-birthday days
3. WHEN the Birthday_Intro is dismissed, THE Birthday_Intro SHALL dispose all Three.js geometries, materials, textures, and renderers, cancel all requestAnimationFrame loops, and remove all event listeners within 1 second of dismissal
4. THE Birthday_Intro SHALL compress all texture assets to a maximum of 512×512 pixels for mobile and 1024×1024 pixels for desktop, and minimize draw calls using instanced meshes where applicable
5. THE Birthday_Intro SHALL not increase the main JavaScript bundle size for non-birthday visitors; all Birthday_Intro code and assets SHALL be loaded via dynamic import only when the Date_Gate activates
6. WHILE Birthday_Intro assets are loading after Date_Gate activation, THE Birthday_Intro SHALL display a minimal loading indicator (animated or static) so the visitor does not see a blank screen

### Requirement 10: Mobile Responsiveness

**User Story:** As a mobile visitor on July 19, I want the birthday experience to work beautifully on my phone so that the premium feel is preserved.

#### Acceptance Criteria

1. THE Birthday_Intro SHALL render without horizontal overflow, content truncation, or overlapping elements across all screen widths from 320px to 2560px, with layout breakpoints at 768px (mobile/tablet) and 1024px (tablet/desktop)
2. WHEN the viewport width is 768px or less, THE Particle_System SHALL reduce particle count to no more than 50% of the desktop count while maintaining a minimum of 20 visible particles on screen
3. WHEN the viewport width is 768px or less, THE Three_Scene SHALL use a device pixel ratio capped at 1.5 to maintain frame rate
4. WHILE the visitor is using a touch-enabled device, THE Scroll_Sequence SHALL support native touch scrolling without blocking default scroll behavior or requiring custom gesture handlers for forward progression
5. WHEN the viewport width is 768px or less, THE Parallax_Camera SHALL respond to touch drag instead of mouse movement
6. WHEN the device orientation changes between portrait and landscape, THE Birthday_Intro SHALL reflow layout and resize the Three_Scene canvas to fit the new viewport dimensions within 300 milliseconds

### Requirement 11: Accessibility

**User Story:** As a visitor with accessibility needs, I want to be able to skip or experience a reduced-motion version of the birthday intro so that I am not excluded.

#### Acceptance Criteria

1. WHILE the Birthday_Intro is active, THE Skip_Button SHALL be visible in the top-right corner of the viewport with a minimum touch target size of 44x44 pixels and a contrast ratio of at least 4.5:1 against its background
2. WHEN the user activates the Skip_Button, THE Birthday_Intro SHALL execute the SPA_Transition to the main website within 500 milliseconds
3. IF the user's operating system has prefers-reduced-motion enabled, THEN THE Birthday_Intro SHALL disable all particle animations, 3D scene movement, and scroll-driven motion, displaying static content with fade transitions of 300 milliseconds duration instead
4. THE Birthday_Intro SHALL support keyboard navigation where Tab moves focus through interactive elements in top-to-bottom visual order, Enter or Space activates the focused element, and Escape triggers the same transition as the Skip_Button
5. THE Birthday_Intro SHALL display a visible focus indicator on all interactive elements when focused via keyboard
6. THE Birthday_Intro SHALL provide ARIA labels on the Skip_Button, Entry_Button, and mute/unmute toggle, and assign a role of "region" with an aria-label to the Birthday_Intro container for screen reader identification

### Requirement 12: Session Persistence

**User Story:** As a visitor, I want to not see the birthday intro repeatedly if I navigate away and come back so that the experience is not annoying.

#### Acceptance Criteria

1. WHEN the visitor has completed the SPA_Transition via the Entry_Button or activated the Skip_Button, THE Date_Gate SHALL store a session flag in sessionStorage preventing the Birthday_Intro from appearing again during the same browser session
2. WHEN the visitor closes all browser tabs for the site and reopens the page on July 19, THE Date_Gate SHALL show the Birthday_Intro again because sessionStorage is cleared when no tabs for the site remain open
3. WHEN the visitor navigates to a sub-page and returns to the homepage within the same session, THE Date_Gate SHALL not show the Birthday_Intro again
4. WHEN the visitor refreshes the page or closes and reopens the tab without having completed or skipped the Birthday_Intro, THE Date_Gate SHALL show the Birthday_Intro again from the beginning
5. IF sessionStorage is unavailable or blocked, THEN THE Date_Gate SHALL allow the Birthday_Intro to display on each homepage visit without preventing repeated showings

### Requirement 13: Color Palette and Visual Design

**User Story:** As the site owner, I want the birthday page to have an elegant Korean aesthetic with a specific color palette so that it matches the desired premium romantic mood.

#### Acceptance Criteria

1. THE Birthday_Intro SHALL use a color palette consisting of soft pink (#FFB6C1, #FFC0CB), rose pink (#FF69B4 at reduced opacity), blush pink (#FFE4E1), white (#FFFFFF), cream (#FFFDD0), light gold (#FFD700 at reduced opacity), and soft purple (#E6E6FA) as the primary design tokens
2. THE Birthday_Intro SHALL not use any color with a hue between 350° and 10° at saturation above 80% and lightness below 50% in any visual element to avoid strong red tones
3. THE Birthday_Intro SHALL apply glassmorphism effects using backdrop-filter blur of 8px to 20px with semi-transparent backgrounds, soft bloom via post-processing, lens glow on light sources, and floating dust particles
4. THE Birthday_Intro SHALL use a serif or display font (e.g., Playfair Display or similar) for title text and a handwriting-style font (e.g., Dancing Script or similar) for the letter content, both loaded via next/font or equivalent optimized loading
5. THE Three_Scene SHALL incorporate the Anime_Silhouette as an original illustration depicting a white-haired boy and a long-haired girl that does not copy or resemble any specific copyrighted character

### Requirement 14: Technology Stack Compliance

**User Story:** As a developer, I want the birthday feature to use the project's existing technology stack so that it integrates cleanly.

#### Acceptance Criteria

1. THE Birthday_Intro SHALL be built using React, Three.js, React Three Fiber, Drei, and Framer Motion as the primary animation technologies
2. IF Framer Motion cannot achieve a specific animation effect using its documented API, THEN THE Birthday_Intro SHALL use CSS animations as the fallback, and SHALL NOT introduce new animation libraries as dependencies
3. IF standard Three.js materials from the Three.js and Drei libraries cannot achieve a required visual effect, THEN THE Birthday_Intro SHALL use custom shaders, provided they do not require additional dependencies beyond the existing `three` package
4. THE Birthday_Intro SHALL integrate with the existing Next.js application architecture without requiring modifications to next.config.ts, package.json build scripts, or postcss.config.mjs
5. THE Birthday_Intro SHALL work within the existing deployment pipeline on Vercel without requiring additional serverless functions, edge functions, external services, or environment variables beyond those already defined in .env.example
6. WHEN the Birthday_Intro feature is included in a production build, THE Birthday_Intro SHALL not increase the total JavaScript bundle size by more than 150 KB gzipped
