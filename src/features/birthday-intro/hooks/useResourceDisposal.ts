'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useBirthdayStore } from './useBirthdayStore';

export function useResourceDisposal() {
  const cleanupFns = useRef<Set<() => void>>(new Set());
  const rafIds = useRef<Set<number>>(new Set());

  const phase = useBirthdayStore((s) => s.phase);

  const registerCleanup = useCallback((fn: () => void) => {
    cleanupFns.current.add(fn);
    return () => {
      cleanupFns.current.delete(fn);
    };
  }, []);

  const registerRafId = useCallback((id: number) => {
    rafIds.current.add(id);
    return () => {
      rafIds.current.delete(id);
    };
  }, []);

  const dispose = useCallback(() => {
    // Cancel all registered animation frames
    rafIds.current.forEach((id) => cancelAnimationFrame(id));
    rafIds.current.clear();

    // Run all cleanup functions (dispose geometries, materials, textures, renderers, event listeners)
    cleanupFns.current.forEach((fn) => {
      try {
        fn();
      } catch {
        // Ignore cleanup errors — resource may already be disposed
      }
    });
    cleanupFns.current.clear();
  }, []);

  // Auto-dispose when phase becomes 'done'
  useEffect(() => {
    if (phase === 'done') {
      dispose();
    }
  }, [phase, dispose]);

  // Also dispose on unmount as safety net
  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  return { registerCleanup, registerRafId, dispose };
}
