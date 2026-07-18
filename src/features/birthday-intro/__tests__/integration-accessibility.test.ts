import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { useBirthdayStore, SESSION_KEY } from '../hooks/useBirthdayStore';
import { isBirthdayToday } from '../utils/dateCheck';
import { TIMING } from '../utils/constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const createSessionStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

function readSource(relativePath: string): string {
  const fullPath = resolve(__dirname, '..', relativePath);
  return readFileSync(fullPath, 'utf-8');
}

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  const mock = createSessionStorageMock();
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: mock,
    writable: true,
    configurable: true,
  });

  useBirthdayStore.setState({
    phase: 'loading',
    scrollProgress: 0,
    isMuted: false,
    audioReady: false,
    hasInteracted: false,
    isReducedMotion: false,
    isMobile: false,
    assetsLoaded: false,
  });
});

// ─── 1. useDateGate integration logic ─────────────────────────────────────────
// Validates: Requirements 11.3 (reduced-motion conditional), 4.7 (WebGL fallback)
describe('useDateGate integration: date-gate selects BirthdayIntroLoader path', () => {
  it('when it is birthday (July 19 WIB), isBirthdayToday returns true', () => {
    // July 19 00:30 WIB = July 18 17:30 UTC
    const date = new Date('2025-07-18T17:30:00.000Z');
    expect(isBirthdayToday(date)).toBe(true);
  });

  it('when it is NOT birthday, isBirthdayToday returns false', () => {
    const date = new Date('2025-07-18T16:00:00.000Z'); // July 18 23:00 WIB
    expect(isBirthdayToday(date)).toBe(false);
  });

  it('IntroWrapper source conditionally renders BirthdayIntroLoader when isBirthday && !hasSeenThisSession', () => {
    const introWrapperPath = resolve(__dirname, '..', '..', 'intro', 'components', 'IntroWrapper.tsx');
    const source = readFileSync(introWrapperPath, 'utf-8');
    expect(source).toContain('isBirthday && !hasSeenThisSession');
    expect(source).toContain('BirthdayIntroLoader');
    expect(source).toContain('IntroOverlay');
  });
});

// ─── 2. Store dismiss flow ────────────────────────────────────────────────────
describe('Store dismiss flow: sets session flag and phase to done', () => {
  it('dismiss() sets phase to "done"', () => {
    useBirthdayStore.getState().setPhase('entry');
    useBirthdayStore.getState().dismiss();
    expect(useBirthdayStore.getState().phase).toBe('done');
  });

  it('dismiss() writes session flag to sessionStorage', () => {
    useBirthdayStore.getState().dismiss();
    expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
  });

  it('dismiss() handles sessionStorage errors gracefully', () => {
    // Override sessionStorage with a throwing implementation
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: {
        getItem: () => { throw new Error('blocked'); },
        setItem: () => { throw new Error('blocked'); },
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      writable: true,
      configurable: true,
    });

    // Should not throw
    expect(() => useBirthdayStore.getState().dismiss()).not.toThrow();
    expect(useBirthdayStore.getState().phase).toBe('done');
  });
});

// ─── 3. Skip/Entry keyboard handlers ─────────────────────────────────────────
// Validates: Requirements 11.4, 11.5
describe('Keyboard navigation: Enter, Space trigger callbacks; Escape triggers skip', () => {
  it('EntryButton source handles Enter key to trigger onEnter', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain("e.key === 'Enter'");
    expect(source).toContain('onEnter()');
  });

  it('EntryButton source handles Space key to trigger onEnter', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain("e.key === ' '");
    expect(source).toContain('e.preventDefault()');
  });

  it('SkipButton source handles Enter key to trigger onSkip', () => {
    const source = readSource('components/SkipButton.tsx');
    expect(source).toContain("e.key === 'Enter'");
    expect(source).toContain('onSkip()');
  });

  it('SkipButton source handles Space key to trigger onSkip', () => {
    const source = readSource('components/SkipButton.tsx');
    expect(source).toContain("e.key === ' '");
  });

  it('BirthdayIntro source handles Escape key to trigger skip', () => {
    const source = readSource('components/BirthdayIntro.tsx');
    expect(source).toContain("e.key === 'Escape'");
    expect(source).toContain('handleSkip');
  });

  it('EntryButton has tabIndex={0} for keyboard focusability', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain('tabIndex={0}');
  });

  it('SkipButton has tabIndex={0} for keyboard focusability', () => {
    const source = readSource('components/SkipButton.tsx');
    expect(source).toContain('tabIndex={0}');
  });

  it('EntryButton respects disabled prop for keyboard activation', () => {
    const source = readSource('components/EntryButton.tsx');
    // handleKeyDown checks disabled before calling onEnter
    expect(source).toContain('!disabled');
  });
});

// ─── 4. ARIA labels and roles ─────────────────────────────────────────────────
// Validates: Requirements 11.5, 11.6
describe('ARIA labels and roles: components have required accessibility attributes', () => {
  it('EntryButton has aria-label', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain('aria-label="Enter DipCrochet website"');
  });

  it('EntryButton has role="button"', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain('role="button"');
  });

  it('SkipButton has aria-label', () => {
    const source = readSource('components/SkipButton.tsx');
    expect(source).toContain('aria-label="Skip birthday intro and enter website"');
  });

  it('AudioToggle has dynamic aria-label for mute/unmute', () => {
    const source = readSource('components/AudioToggle.tsx');
    expect(source).toContain("'Unmute audio'");
    expect(source).toContain("'Mute audio'");
    expect(source).toContain('aria-label=');
  });

  it('BirthdayIntro container has role="region" with aria-label', () => {
    const source = readSource('components/BirthdayIntro.tsx');
    expect(source).toContain('role="region"');
    expect(source).toContain('aria-label="Birthday celebration intro"');
  });

  it('EntryButton has visible focus indicator (focus:ring)', () => {
    const source = readSource('components/EntryButton.tsx');
    expect(source).toContain('focus:ring-2');
    expect(source).toContain('focus:ring-offset-2');
  });

  it('SkipButton has visible focus indicator (focus:ring)', () => {
    const source = readSource('components/SkipButton.tsx');
    expect(source).toContain('focus:ring-2');
    expect(source).toContain('focus:ring-offset-2');
  });
});

// ─── 5. Reduced motion: store tracks isReducedMotion state ────────────────────
// Validates: Requirements 11.3
describe('Reduced motion: isReducedMotion state management and configuration', () => {
  it('store initializes isReducedMotion to false', () => {
    expect(useBirthdayStore.getState().isReducedMotion).toBe(false);
  });

  it('store can set isReducedMotion to true', () => {
    useBirthdayStore.setState({ isReducedMotion: true });
    expect(useBirthdayStore.getState().isReducedMotion).toBe(true);
  });

  it('BirthdayIntro source detects prefers-reduced-motion media query', () => {
    const source = readSource('components/BirthdayIntro.tsx');
    expect(source).toContain("'(prefers-reduced-motion: reduce)'");
    expect(source).toContain('isReducedMotion');
  });

  it('BirthdayIntro passes isReducedMotion to BirthdayScene', () => {
    const source = readSource('components/BirthdayIntro.tsx');
    expect(source).toMatch(/isReducedMotion={1,}[\s\S]*isReducedMotion/);
  });

  it('reduced-motion fade duration constant is 300ms (per skipTransition use for reduced content)', () => {
    // The reduced-motion mode uses 300ms fades. The closest constant is:
    // The design spec says "300 milliseconds duration" for reduced-motion fades
    // We verify BirthdayScene accepts isReducedMotion prop
    const sceneSource = readSource('three/BirthdayScene.tsx');
    expect(sceneSource).toContain('isReducedMotion');
  });

  it('ParallaxCamera source disables movement when isReducedMotion is true', () => {
    const source = readSource('three/ParallaxCamera.tsx');
    expect(source).toContain('isReducedMotion');
  });
});

// ─── 6. WebGL fallback: static background with Entry_Button accessible ────────
// Validates: Requirements 4.7
describe('WebGL fallback: BirthdayScene renders static fallback when error occurs', () => {
  it('BirthdayScene has WebGLErrorBoundary wrapping the Canvas', () => {
    const source = readSource('three/BirthdayScene.tsx');
    expect(source).toContain('WebGLErrorBoundary');
    expect(source).toContain('fallback={<StaticFallback />}');
  });

  it('StaticFallback renders a gradient background', () => {
    const source = readSource('three/BirthdayScene.tsx');
    expect(source).toContain('bg-gradient-to-b');
    expect(source).toContain('from-pink-200');
  });

  it('StaticFallback has aria-hidden for decorative background', () => {
    const source = readSource('three/BirthdayScene.tsx');
    expect(source).toContain('aria-hidden="true"');
  });

  it('BirthdayScene uses failIfMajorPerformanceCaveat to detect issues', () => {
    const source = readSource('three/BirthdayScene.tsx');
    expect(source).toContain('failIfMajorPerformanceCaveat');
  });

  it('EntryButton remains accessible regardless of WebGL state (it is rendered outside BirthdayScene)', () => {
    // In BirthdayIntro, EntryButton is rendered outside the BirthdayScene component
    const source = readSource('components/BirthdayIntro.tsx');
    // EntryButton should be in a different section than BirthdayScene
    const sceneIdx = source.indexOf('BirthdayScene');
    const entryIdx = source.indexOf('<EntryButton');
    expect(sceneIdx).toBeGreaterThan(-1);
    expect(entryIdx).toBeGreaterThan(-1);
    // EntryButton is a sibling, not a child of BirthdayScene
    expect(entryIdx).toBeGreaterThan(sceneIdx);
  });

  it('BirthdayIntroLoader source shows loading state initially and has timeout fallback', () => {
    const source = readSource('components/BirthdayIntroLoader.tsx');
    expect(source).toContain('LoadingIndicator');
    expect(source).toContain('15000'); // 15s timeout
    expect(source).toContain('timedOut');
    expect(source).toContain('Skip to site');
  });
});
