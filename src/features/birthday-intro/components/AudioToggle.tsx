'use client';

import { useBirthdayStore } from '../hooks/useBirthdayStore';

export function AudioToggle() {
  const isMuted = useBirthdayStore((s) => s.isMuted);
  const assetsLoaded = useBirthdayStore((s) => s.assetsLoaded);
  const toggleMute = useBirthdayStore((s) => s.toggleMute);

  // If assets haven't loaded (including audio), show disabled state
  const isDisabled = !assetsLoaded;

  return (
    <button
      className={`
        fixed bottom-4 right-4 z-[2100]
        min-w-[44px] min-h-[44px] w-11 h-11
        flex items-center justify-center
        rounded-full
        bg-white/20 backdrop-blur-sm
        border border-white/30
        text-white text-lg
        transition-all duration-200
        hover:bg-white/30 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer select-none
      `}
      onClick={toggleMute}
      disabled={isDisabled}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      type="button"
    >
      {isMuted || isDisabled ? '🔇' : '🔊'}
    </button>
  );
}
