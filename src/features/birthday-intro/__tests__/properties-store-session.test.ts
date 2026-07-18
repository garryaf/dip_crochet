import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useBirthdayStore, SESSION_KEY } from '../hooks/useBirthdayStore';
import type { BirthdayPhase } from '../types';

// In-memory sessionStorage mock
const createSessionStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

// Reset store and sessionStorage before each test
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

// Non-done phases for Property 3 (actions that don't trigger dismiss)
const NON_DONE_PHASES: BirthdayPhase[] = [
  'loading',
  'cinematic',
  'text',
  'book',
  'entry',
  'transition',
];

// Arbitrary for generating random store actions (excluding dismiss)
type StoreAction =
  | { type: 'setPhase'; phase: BirthdayPhase }
  | { type: 'setScrollProgress'; progress: number }
  | { type: 'toggleMute' }
  | { type: 'setHasInteracted' }
  | { type: 'setAssetsLoaded' };

const nonDismissActionArb: fc.Arbitrary<StoreAction> = fc.oneof(
  fc.constantFrom(...NON_DONE_PHASES).map((phase) => ({
    type: 'setPhase' as const,
    phase,
  })),
  fc.float({ min: 0, max: 1, noNaN: true }).map((progress) => ({
    type: 'setScrollProgress' as const,
    progress,
  })),
  fc.constant({ type: 'toggleMute' as const }),
  fc.constant({ type: 'setHasInteracted' as const }),
  fc.constant({ type: 'setAssetsLoaded' as const })
);

function executeAction(action: StoreAction): void {
  const store = useBirthdayStore.getState();
  switch (action.type) {
    case 'setPhase':
      store.setPhase(action.phase);
      break;
    case 'setScrollProgress':
      store.setScrollProgress(action.progress);
      break;
    case 'toggleMute':
      store.toggleMute();
      break;
    case 'setHasInteracted':
      store.setHasInteracted();
      break;
    case 'setAssetsLoaded':
      store.setAssetsLoaded();
      break;
  }
}

// Feature: birthday-landing-page, Property 2: Session flag prevents re-display after dismissal
// **Validates: Requirements 1.5, 12.1, 12.3**
describe('Property 2: Session flag prevents re-display after dismissal', () => {
  it('after dismiss(), sessionStorage has the session key set to "1"', () => {
    fc.assert(
      fc.property(
        fc.array(nonDismissActionArb, { minLength: 0, maxLength: 10 }),
        (actions) => {
          // Reset store and storage for each iteration
          sessionStorage.clear();
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

          // Execute random actions before dismiss
          for (const action of actions) {
            executeAction(action);
          }

          // Call dismiss
          useBirthdayStore.getState().dismiss();

          // Verify sessionStorage has the key set
          expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('after dismiss(), store phase is "done"', () => {
    fc.assert(
      fc.property(
        fc.array(nonDismissActionArb, { minLength: 0, maxLength: 10 }),
        (actions) => {
          // Reset store and storage for each iteration
          sessionStorage.clear();
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

          // Execute random actions before dismiss
          for (const action of actions) {
            executeAction(action);
          }

          // Call dismiss
          useBirthdayStore.getState().dismiss();

          // Verify phase is 'done'
          expect(useBirthdayStore.getState().phase).toBe('done');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('session key remains set even after further actions post-dismiss', () => {
    fc.assert(
      fc.property(
        fc.array(nonDismissActionArb, { minLength: 0, maxLength: 5 }),
        fc.array(nonDismissActionArb, { minLength: 1, maxLength: 5 }),
        (preActions, postActions) => {
          // Reset store and storage for each iteration
          sessionStorage.clear();
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

          // Execute random actions before dismiss
          for (const action of preActions) {
            executeAction(action);
          }

          // Call dismiss
          useBirthdayStore.getState().dismiss();

          // Execute random actions after dismiss
          for (const action of postActions) {
            executeAction(action);
          }

          // Session key should still be set
          expect(sessionStorage.getItem(SESSION_KEY)).toBe('1');
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: birthday-landing-page, Property 3: Session flag is not set before explicit dismissal
// **Validates: Requirements 12.4**
describe('Property 3: Session flag is not set before explicit dismissal', () => {
  it('without dismiss(), sessionStorage does NOT have the session key', () => {
    fc.assert(
      fc.property(
        fc.array(nonDismissActionArb, { minLength: 0, maxLength: 15 }),
        (actions) => {
          // Reset store and storage for each iteration
          sessionStorage.clear();
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

          // Execute random actions (none of which are dismiss)
          for (const action of actions) {
            executeAction(action);
          }

          // Verify sessionStorage does NOT have the key
          expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('session key remains absent regardless of how many non-dismiss actions are executed', () => {
    fc.assert(
      fc.property(
        fc.array(nonDismissActionArb, { minLength: 5, maxLength: 20 }),
        (actions) => {
          // Reset store and storage for each iteration
          sessionStorage.clear();
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

          // Execute many random actions (none of which are dismiss)
          for (const action of actions) {
            executeAction(action);
            // After each action, session key should still be absent
            expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
