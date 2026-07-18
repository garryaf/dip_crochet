import { create } from 'zustand';
import type { BirthdayState, BirthdayActions, BirthdayPhase } from '../types';

export const SESSION_KEY = 'dip_birthday_seen';

interface BirthdayStore extends BirthdayState, BirthdayActions {}

export const useBirthdayStore = create<BirthdayStore>((set) => ({
  // State
  phase: 'loading',
  scrollProgress: 0,
  isMuted: false,
  audioReady: false,
  hasInteracted: false,
  isReducedMotion: false,
  isMobile: false,
  assetsLoaded: false,

  // Actions
  setPhase: (phase: BirthdayPhase) => set({ phase }),
  setScrollProgress: (scrollProgress: number) => set({ scrollProgress }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setHasInteracted: () => set({ hasInteracted: true }),
  setAssetsLoaded: () => set({ assetsLoaded: true }),
  dismiss: () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable — allow repeat shows per Req 12.5
    }
    set({ phase: 'done' });
  },
}));
