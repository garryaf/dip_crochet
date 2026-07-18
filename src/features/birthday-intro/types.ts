export type BirthdayPhase =
  | 'loading'
  | 'cinematic'
  | 'text'
  | 'book'
  | 'entry'
  | 'transition'
  | 'done';

export interface BirthdayState {
  phase: BirthdayPhase;
  scrollProgress: number; // 0 to 1 across entire scroll height
  isMuted: boolean;
  audioReady: boolean;
  hasInteracted: boolean;
  isReducedMotion: boolean;
  isMobile: boolean;
  assetsLoaded: boolean;
}

export interface BirthdayActions {
  setPhase: (phase: BirthdayPhase) => void;
  setScrollProgress: (progress: number) => void;
  toggleMute: () => void;
  setHasInteracted: () => void;
  setAssetsLoaded: () => void;
  dismiss: () => void;
}

// useDateGate return type
export interface DateGateResult {
  isBirthday: boolean;
  hasSeenThisSession: boolean;
  markAsSeen: () => void;
}
