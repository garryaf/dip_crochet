# 🎬 Premium 3D Intro Experience — Gap Analysis & Task Specification

## Document Version: 1.0
## Status: Planning Phase
## Priority: High (First Impression = Conversion Driver)

---

## 1. CURRENT ARCHITECTURE ANALYSIS

### 1.1 Current Entry Flow
```
User visits / → Immediately sees Homepage (Navigation + Hero + Sections)
```

**Problems:**
- No emotional build-up
- No brand immersion before content
- No curiosity trigger
- Feels like a standard e-commerce page
- First impression is "functional" not "premium"
- No differentiation from mass-produced brand sites

### 1.2 Current Tech Stack (Relevant)
| Technology | Version | Usage |
|-----------|---------|-------|
| Next.js | 16.2.4 | App Router, Server Components |
| React | 19.2.4 | UI framework |
| React Three Fiber | ^9.6.0 | 3D rendering (already installed) |
| @react-three/drei | ^10.7.7 | 3D helpers (already installed) |
| Three.js | ^0.184.0 | 3D engine (already installed) |
| Framer Motion | ^12.38.0 | Animations (already installed) |
| Tailwind CSS | v4 | Styling |

### 1.3 Current Animation Stack
- **Framer Motion**: Page entrance animations (fadeUp, scaleIn, stagger)
- **Three.js Float**: Gentle breathing on 3D models
- **CSS**: `animate-float` keyframe, hover transitions
- **No GSAP** currently installed

### 1.4 Current Design System
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#ff8fb1` | Soft Pink — CTAs, highlights |
| Secondary | `#6ebfb5` | Mint Green — secondary actions |
| Background | `#fffbf9` | Warm Cream — base |
| Foreground | `#2d2320` | Dark Brown — text |
| Accent | `#fff0f3` | Light Pink — badges |
| Muted | `#f5eeeb` | Warm Gray — subtle bg |
| Border | `#e8dedb` | Soft border |
| Heading Color | `#4a3a35` | Dark Warm Brown |

### 1.5 Typography
- **Headlines**: Outfit (900 weight, tracking-tight)
- **Body**: System sans-serif
- **Style**: Kawaii-Minimal, large border-radius, soft shadows

### 1.6 Reusable Systems Identified
- `PlushViewer` — Canvas + lighting + controls (reusable for intro)
- `PlushModel` — Procedural crochet mesh with texture generation
- `Float` component from drei — gentle motion
- `glass-card` CSS class — glassmorphism
- `texture-bg` — felt texture background
- Framer Motion variants pattern (staggerContainer, fadeUp, scaleIn)

### 1.7 Performance-Sensitive Areas
- Three.js Canvas already lazy-loaded via `next/dynamic`
- WebGL context management (context lost/restored handling exists)
- DPR capped at [1, 2]
- Texture generation is CPU-intensive (canvas-based)
- Mobile GPU considerations already documented

---

## 2. GAP ANALYSIS

### 2.1 What Exists vs What's Needed

| Aspect | Current State | Required State | Gap |
|--------|--------------|----------------|-----|
| Entry experience | Direct homepage | Cinematic intro → homepage | Full implementation needed |
| 3D text rendering | Not present | "dip.crochet" as 3D centerpiece | New component |
| Intro animation | None | Cinematic reveal sequence | New animation system |
| Background elements | Static felt texture | Animated crochet patterns | New decorative layer |
| Transition system | None (hard page load) | Smooth intro → homepage transition | New transition logic |
| GSAP | Not installed | Needed for timeline control | Package installation |
| 3D text geometry | Not available | TextGeometry or custom mesh | Font/geometry setup |
| Intro state management | Not needed | Show/hide intro, persist "seen" | New state logic |
| Mobile fallback | N/A | Lighter intro for mobile | Adaptive rendering |
| Loading state | Basic skeleton | Premium loading indicator | New component |

### 2.2 Dependencies to Add
| Package | Purpose | Size Impact |
|---------|---------|-------------|
| `three/examples/jsm/geometries/TextGeometry` | 3D text (already in three.js) | 0KB (included) |
| `three/examples/jsm/loaders/FontLoader` | Load 3D fonts | 0KB (included) |
| None additional needed | R3F + drei already cover everything | — |

> **Key insight**: No new packages needed. Three.js, R3F, and drei already provide everything required. GSAP is optional — Framer Motion can handle the timeline.

### 2.3 SEO Impact Assessment
| Concern | Risk | Mitigation |
|---------|------|------------|
| Intro blocks content from crawlers | Medium | Intro is client-only; SSR HTML still contains full homepage content |
| LCP delayed by intro | Low | Intro is overlay; homepage renders underneath |
| User bounce from slow intro | Low | "Skip" option + sessionStorage to not show again |

---

## 3. IMPLEMENTATION TASKS

### Task 1: Create Intro Scene Component
**File**: `src/features/intro/components/IntroScene.tsx`
**Type**: Client Component (dynamic import, ssr: false)
**Complexity**: High
**Estimated effort**: 3-4 hours

**Requirements:**
- Full-viewport 3D canvas
- "dip.crochet" as 3D text centerpiece
- Soft pink/cream lighting matching brand
- Gentle floating animation
- Cinematic camera position
- Warm ambient atmosphere

**Technical approach:**
- Use `@react-three/drei` `Text3D` component with a rounded font
- Apply crochet-like material (reuse existing texture generator)
- Soft spotlight + ambient light matching brand palette
- Float animation via drei `Float`
- Camera at slight angle for depth perception

---

### Task 2: Create Animated Background Layer
**File**: `src/features/intro/components/IntroBackground.tsx`
**Type**: Client Component (CSS + SVG animations)
**Complexity**: Medium
**Estimated effort**: 2 hours

**Requirements:**
- Transparent crochet/yarn pattern elements
- Soft floating motion (CSS or Framer Motion)
- Multiple depth layers (parallax feel)
- Must not compete with 3D text
- Opacity: 5-15% for subtlety

**Technical approach:**
- SVG crochet stitch patterns as decorative elements
- Positioned absolutely with varying opacity
- Framer Motion for gentle drift animation
- 3-4 elements at different sizes and positions
- Blur on distant elements for depth

---

### Task 3: Create "Get Started" CTA Button
**File**: Part of `IntroScene.tsx` or `IntroOverlay.tsx`
**Type**: Client Component
**Complexity**: Low
**Estimated effort**: 30 minutes

**Requirements:**
- Premium button design matching brand
- Appears after intro animation completes (~2-3s)
- Subtle entrance animation (fade + scale)
- Hover state: glow + lift
- Click triggers transition to homepage

**Design:**
- Rounded-2xl, bg-primary, text-white, font-black
- Shadow: `shadow-2xl shadow-primary/30`
- Text: "Explore Collection" or "Enter the Workshop"

---

### Task 4: Create Transition System
**File**: `src/features/intro/components/IntroTransition.tsx`
**Type**: Client Component
**Complexity**: Medium-High
**Estimated effort**: 2-3 hours

**Requirements:**
- Smooth exit animation when "Get Started" clicked
- 3D scene fades/scales out
- Background elements dissolve
- Homepage content reveals underneath
- No page reload (SPA behavior preserved)
- Total transition duration: 800-1200ms

**Technical approach:**
- Intro is an overlay (`fixed inset-0 z-[1000]`)
- Homepage renders underneath (already SSR'd)
- On "Get Started": animate intro opacity to 0, scale to 1.05
- After animation: unmount intro component
- Use Framer Motion `AnimatePresence` for clean exit

---

### Task 5: Create Intro Controller (State Logic)
**File**: `src/features/intro/hooks/useIntroState.ts`
**Type**: Hook
**Complexity**: Low
**Estimated effort**: 30 minutes

**Requirements:**
- Track if intro has been shown this session
- Store in `sessionStorage` (show once per session)
- Provide `showIntro` boolean and `dismissIntro` function
- Skip intro on direct navigation to sub-pages
- Skip intro if user has seen it (sessionStorage)

**Logic:**
```
if (pathname === "/" && !sessionStorage.get("intro_seen")) → show intro
else → skip intro
```

---

### Task 6: Create Intro Wrapper in Homepage
**File**: Modify `src/app/page.tsx`
**Type**: Integration
**Complexity**: Low
**Estimated effort**: 30 minutes

**Requirements:**
- Import IntroOverlay (dynamic, ssr: false)
- Render as overlay on top of existing homepage
- Homepage content remains SSR (SEO safe)
- Intro only renders client-side
- No impact on existing page structure

---

### Task 7: Mobile Optimization
**File**: Part of IntroScene
**Type**: Enhancement
**Complexity**: Medium
**Estimated effort**: 1 hour

**Requirements:**
- Detect mobile/low-end GPU
- Reduce 3D complexity on mobile:
  - Lower DPR (1 instead of 2)
  - Simpler geometry (fewer segments)
  - Disable shadows
  - Reduce floating elements
- Ensure 60fps on mid-range phones
- Touch-friendly "Get Started" button (larger hit area)

---

### Task 8: Loading State
**File**: `src/features/intro/components/IntroLoader.tsx`
**Type**: Client Component
**Complexity**: Low
**Estimated effort**: 30 minutes

**Requirements:**
- Show while 3D assets load
- Brand-consistent design (yarn ball spinning, or simple pulse)
- Smooth transition from loader → intro scene
- Maximum wait: 3 seconds (then force-show even if not fully loaded)

---

## 4. FILE STRUCTURE (New)

```
src/features/intro/
├── components/
│   ├── IntroOverlay.tsx        # Main wrapper (overlay + state)
│   ├── IntroScene.tsx          # 3D Canvas with text + lighting
│   ├── IntroBackground.tsx     # Decorative crochet patterns
│   ├── IntroTransition.tsx     # Exit animation controller
│   └── IntroLoader.tsx         # Loading state
├── hooks/
│   └── useIntroState.ts        # Session-based show/hide logic
└── assets/
    └── (SVG patterns if needed)
```

---

## 5. ANIMATION TIMELINE

```
0.0s  — Loader appears (if assets loading)
0.5s  — Background patterns fade in (opacity 0 → 0.1)
1.0s  — 3D "dip.crochet" text scales in (0.8 → 1.0, opacity 0 → 1)
1.5s  — Lighting intensifies subtly
2.0s  — Tagline text fades in below 3D text
2.5s  — "Get Started" button appears (fade + translateY)
∞     — Gentle float animation continues until dismissed

[User clicks "Get Started"]
0.0s  — Button scales down (feedback)
0.1s  — 3D scene starts fading (opacity 1 → 0, scale 1 → 1.05)
0.4s  — Background dissolves
0.8s  — Intro fully gone, homepage visible
0.9s  — Intro component unmounted
```

---

## 6. PERFORMANCE BUDGET

| Metric | Target | Strategy |
|--------|--------|----------|
| Intro load time | < 1.5s | Lazy load, minimal geometry |
| FPS during intro | 60fps | Low-poly text, no particles |
| Memory usage | < 50MB GPU | Single canvas, dispose on exit |
| Bundle impact | < 5KB gzipped | No new packages, tree-shake |
| LCP impact | None | Homepage SSR underneath |
| CLS impact | None | Intro is fixed overlay |

---

## 7. RESPONSIVE BEHAVIOR

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full 3D experience, all decorative elements |
| Tablet (768-1024px) | 3D text slightly smaller, fewer bg elements |
| Mobile (<768px) | Simplified 3D (lower quality), larger CTA button, fewer decorations |
| Low-end device | CSS-only fallback (no WebGL), 2D animated text |

---

## 8. ACCESSIBILITY

| Requirement | Implementation |
|-------------|---------------|
| Skip intro | "Skip" button visible immediately (top-right) |
| Reduced motion | Respect `prefers-reduced-motion` — show static version |
| Screen reader | `aria-label` on intro, announce "Loading experience" |
| Keyboard | Enter/Space on "Get Started" works |
| Focus trap | Focus stays within intro while visible |

---

## 9. RISK ASSESSMENT

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| WebGL not supported | Low (2%) | High | CSS fallback with 2D animated text |
| Slow load on 3G | Medium | Medium | Show intro after max 3s regardless |
| User annoyance (repeat visits) | High | Medium | sessionStorage — show once per session |
| SEO impact | Low | Low | Homepage SSR unaffected, intro is overlay |
| Mobile performance | Medium | High | Adaptive quality, simplified geometry |

---

## 10. SUCCESS CRITERIA

| Metric | Target |
|--------|--------|
| First impression score (user testing) | "Premium" / "Wow" reaction |
| Bounce rate change | -5% or better |
| Time to interactive (homepage) | No regression |
| Mobile FPS | 60fps sustained |
| Lighthouse Performance | No regression from current |
| Session duration | +10% (curiosity-driven exploration) |

---

## 11. IMPLEMENTATION ORDER

```
Priority 1 (Core):
  Task 5 → Task 6 → Task 1 → Task 3 → Task 4

Priority 2 (Polish):
  Task 2 → Task 8 → Task 7

Priority 3 (Edge cases):
  Accessibility → CSS fallback → reduced motion
```

**Estimated total effort: 10-12 hours**

---

## 12. DECISION LOG

| Decision | Rationale |
|----------|-----------|
| No GSAP (use Framer Motion) | Already installed, sufficient for timeline, saves 30KB |
| No new font file for 3D text | Use drei `Text3D` with CDN font or procedural geometry |
| Overlay approach (not route) | Preserves SSR, no routing complexity, SEO safe |
| sessionStorage (not localStorage) | Show once per session, not permanently hidden |
| No particles | GPU budget, mobile performance, brand is "calm not chaotic" |
| Dispose on exit | Prevent GPU memory leak after intro dismissed |
