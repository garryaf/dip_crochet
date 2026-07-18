'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useBirthdayStore } from './useBirthdayStore';
import { scrollToPhase } from '../utils/scrollMath';

export function useScrollProgress(containerRef: RefObject<HTMLDivElement | null>) {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const maxScroll = scrollHeight - clientHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

        const store = useBirthdayStore.getState();
        store.setScrollProgress(progress);

        const currentPhase = store.phase;
        const newPhase = scrollToPhase(progress);
        // Only update phase during scrollable phases (don't override 'loading', 'transition', 'done')
        if (currentPhase !== 'loading' && currentPhase !== 'transition' && currentPhase !== 'done') {
          store.setPhase(newPhase);
        }

        rafId.current = null;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef]);
}
