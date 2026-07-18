'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useBirthdayStore } from '../hooks/useBirthdayStore';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAudioController } from '../hooks/useAudioController';
import { useResourceDisposal } from '../hooks/useResourceDisposal';
import { birthdayFontVariables } from '../utils/fonts';
import { BirthdayScene } from '../three/BirthdayScene';
import { CinematicOpening } from './CinematicOpening';
import { ScrollSequence } from './ScrollSequence';
import { AnimatedBook } from './AnimatedBook';
import { EntryButton } from './EntryButton';
import { SkipButton } from './SkipButton';
import { AudioToggle } from './AudioToggle';
import { SpaTransition } from './SpaTransition';

export default function BirthdayIntro() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const phase = useBirthdayStore((s) => s.phase);
  const scrollProgress = useBirthdayStore((s) => s.scrollProgress);
  const isMobile = useBirthdayStore((s) => s.isMobile);
  const isReducedMotion = useBirthdayStore((s) => s.isReducedMotion);

  // Initialize hooks
  useScrollProgress(scrollRef);
  const { fadeOut } = useAudioController('/audio/birthday-ambient.mp3');
  useResourceDisposal();

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    useBirthdayStore.setState({ isReducedMotion: mql.matches });
    const handler = (e: MediaQueryListEvent) => {
      useBirthdayStore.setState({ isReducedMotion: e.matches });
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      useBirthdayStore.setState({ isMobile: window.innerWidth <= 768 });
    };
    checkMobile();

    const handleResize = () => checkMobile();
    const handleOrientationChange = () => {
      // Reflow within 300ms per Req 10.6
      setTimeout(checkMobile, 300);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Register first-interaction listener for audio start
  useEffect(() => {
    const handleInteraction = () => {
      useBirthdayStore.getState().setHasInteracted();
    };
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // Set initial phase to cinematic after mount
  useEffect(() => {
    useBirthdayStore.getState().setPhase('cinematic');
  }, []);

  // Handle skip action
  const handleSkip = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    fadeOut();
    useBirthdayStore.getState().setPhase('transition');
  }, [fadeOut, isTransitioning]);

  // Keyboard: Escape triggers skip (Req 11.4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  const handleEnter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    fadeOut();
    useBirthdayStore.getState().setPhase('transition');
  }, [fadeOut, isTransitioning]);

  const handleTransitionComplete = useCallback(() => {
    useBirthdayStore.getState().dismiss();
  }, []);

  // Don't render if dismissed
  if (phase === 'done') return null;

  return (
    <div
      ref={scrollRef}
      className={`fixed inset-0 z-[2000] overflow-y-auto ${birthdayFontVariables}`}
      role="region"
      aria-label="Birthday celebration intro"
    >
      {/* Scroll height spacer: 5 viewport heights */}
      <div className="h-[500vh]">
        {/* 3D Scene (fixed background) */}
        <div className="fixed inset-0 z-0">
          <BirthdayScene
            phase={phase}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
            isReducedMotion={isReducedMotion}
          />
        </div>

        {/* Cinematic Opening */}
        <CinematicOpening phase={phase} />

        {/* Scroll-driven text */}
        <ScrollSequence scrollProgress={scrollProgress} />

        {/* Animated Book */}
        <AnimatedBook scrollProgress={scrollProgress} phase={phase} />

        {/* Entry Button (visible in entry phase) */}
        {phase === 'entry' && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <EntryButton onEnter={handleEnter} disabled={isTransitioning} />
          </div>
        )}
      </div>

      {/* Persistent UI */}
      <SkipButton onSkip={handleSkip} />
      <AudioToggle />

      {/* SPA Transition overlay */}
      {isTransitioning && (
        <SpaTransition onComplete={handleTransitionComplete} />
      )}
    </div>
  );
}
