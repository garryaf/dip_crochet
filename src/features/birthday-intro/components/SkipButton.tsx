'use client';

interface SkipButtonProps {
  onSkip: () => void;
}

export function SkipButton({ onSkip }: SkipButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSkip();
    }
  };

  return (
    <button
      className="
        fixed top-4 right-4 z-[2100]
        min-w-[44px] min-h-[44px] px-4 py-2
        bg-black/60 backdrop-blur-sm
        text-white text-sm font-medium
        rounded-full
        border border-white/30
        hover:bg-black/70 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
        transition-all duration-200
        cursor-pointer select-none
      "
      onClick={onSkip}
      onKeyDown={handleKeyDown}
      aria-label="Skip birthday intro and enter website"
      tabIndex={0}
    >
      Skip ✕
    </button>
  );
}
