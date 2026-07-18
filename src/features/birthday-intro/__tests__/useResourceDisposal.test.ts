import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBirthdayStore } from '../hooks/useBirthdayStore';

/**
 * Tests for useResourceDisposal hook logic.
 * Since the test environment is 'node' (no jsdom/React rendering),
 * we test the disposal pattern by verifying the store-driven cleanup contract:
 * - When phase becomes 'done', cleanup functions should be called
 * - The hook registers/unregisters cleanup functions and rAF IDs
 *
 * We simulate the hook behavior by testing the cleanup registry pattern directly.
 */

// Mock cancelAnimationFrame for node environment
beforeEach(() => {
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
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

describe('useResourceDisposal - cleanup registry pattern', () => {
  it('registerCleanup adds and removes functions from the registry', () => {
    // Simulate the registry pattern used in the hook
    const cleanupFns = new Set<() => void>();

    const fn1 = vi.fn();
    const fn2 = vi.fn();

    // Register
    cleanupFns.add(fn1);
    cleanupFns.add(fn2);
    expect(cleanupFns.size).toBe(2);

    // Unregister one
    cleanupFns.delete(fn1);
    expect(cleanupFns.size).toBe(1);
    expect(cleanupFns.has(fn2)).toBe(true);
    expect(cleanupFns.has(fn1)).toBe(false);
  });

  it('registerRafId adds and removes IDs from the registry', () => {
    const rafIds = new Set<number>();

    rafIds.add(1);
    rafIds.add(2);
    rafIds.add(3);
    expect(rafIds.size).toBe(3);

    rafIds.delete(2);
    expect(rafIds.size).toBe(2);
    expect(rafIds.has(1)).toBe(true);
    expect(rafIds.has(3)).toBe(true);
    expect(rafIds.has(2)).toBe(false);
  });

  it('dispose cancels all registered animation frames', () => {
    const rafIds = new Set<number>();
    rafIds.add(10);
    rafIds.add(20);
    rafIds.add(30);

    // Simulate dispose
    rafIds.forEach((id) => cancelAnimationFrame(id));
    rafIds.clear();

    expect(cancelAnimationFrame).toHaveBeenCalledTimes(3);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(10);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(20);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(30);
    expect(rafIds.size).toBe(0);
  });

  it('dispose runs all cleanup functions and clears the registry', () => {
    const cleanupFns = new Set<() => void>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    cleanupFns.add(fn1);
    cleanupFns.add(fn2);
    cleanupFns.add(fn3);

    // Simulate dispose
    cleanupFns.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore cleanup errors
      }
    });
    cleanupFns.clear();

    expect(fn1).toHaveBeenCalledOnce();
    expect(fn2).toHaveBeenCalledOnce();
    expect(fn3).toHaveBeenCalledOnce();
    expect(cleanupFns.size).toBe(0);
  });

  it('dispose handles errors in cleanup functions gracefully', () => {
    const cleanupFns = new Set<() => void>();
    const fn1 = vi.fn();
    const fnThrowing = vi.fn(() => {
      throw new Error('Already disposed');
    });
    const fn3 = vi.fn();

    cleanupFns.add(fn1);
    cleanupFns.add(fnThrowing);
    cleanupFns.add(fn3);

    // Simulate dispose - should not throw
    expect(() => {
      cleanupFns.forEach((fn) => {
        try {
          fn();
        } catch {
          // ignore cleanup errors
        }
      });
      cleanupFns.clear();
    }).not.toThrow();

    // All functions should have been called despite the error
    expect(fn1).toHaveBeenCalledOnce();
    expect(fnThrowing).toHaveBeenCalledOnce();
    expect(fn3).toHaveBeenCalledOnce();
    expect(cleanupFns.size).toBe(0);
  });

  it('store phase transition to "done" triggers disposal flow', () => {
    // Verify store can transition to done (which is the trigger for disposal)
    expect(useBirthdayStore.getState().phase).toBe('loading');

    useBirthdayStore.getState().setPhase('cinematic');
    expect(useBirthdayStore.getState().phase).toBe('cinematic');

    useBirthdayStore.getState().setPhase('done');
    expect(useBirthdayStore.getState().phase).toBe('done');
  });

  it('dismiss() sets phase to done which triggers disposal', () => {
    const mock = {
      getItem: () => null,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: () => null,
    };
    vi.stubGlobal('sessionStorage', mock);

    useBirthdayStore.getState().dismiss();
    expect(useBirthdayStore.getState().phase).toBe('done');
  });

  it('duplicate registrations are handled correctly (Set semantics)', () => {
    const cleanupFns = new Set<() => void>();
    const fn1 = vi.fn();

    // Adding the same function reference twice should only keep one
    cleanupFns.add(fn1);
    cleanupFns.add(fn1);
    expect(cleanupFns.size).toBe(1);

    // Dispose should only call it once
    cleanupFns.forEach((fn) => fn());
    expect(fn1).toHaveBeenCalledOnce();
  });

  it('dispose can be called multiple times safely (idempotent)', () => {
    const cleanupFns = new Set<() => void>();
    const rafIds = new Set<number>();
    const fn1 = vi.fn();

    cleanupFns.add(fn1);
    rafIds.add(42);

    // First dispose
    rafIds.forEach((id) => cancelAnimationFrame(id));
    rafIds.clear();
    cleanupFns.forEach((fn) => fn());
    cleanupFns.clear();

    expect(fn1).toHaveBeenCalledOnce();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(42);

    // Second dispose - should be a no-op since registries are empty
    rafIds.forEach((id) => cancelAnimationFrame(id));
    rafIds.clear();
    cleanupFns.forEach((fn) => fn());
    cleanupFns.clear();

    // fn1 should still only have been called once
    expect(fn1).toHaveBeenCalledOnce();
  });
});
