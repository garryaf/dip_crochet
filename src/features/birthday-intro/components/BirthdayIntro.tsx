'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthdayStore } from '../hooks/useBirthdayStore';
import { BIRTHDAY_LETTER, INTRO_LINES } from '../utils/constants';
import { SkipButton } from './SkipButton';
import { EntryButton } from './EntryButton';
import { SpaTransition } from './SpaTransition';

type Stage = 'title' | 'name' | 'lines' | 'letter' | 'entry';

export default function BirthdayIntro() {
  const [stage, setStage] = useState<Stage>('title');
  const [visibleLines, setVisibleLines] = useState(0);
  const [revealedChars, setRevealedChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const phase = useBirthdayStore((s) => s.phase);

  useEffect(() => {
    useBirthdayStore.getState().setPhase('cinematic');
  }, []);

  // Auto progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Title → Name at 3s
    timers.push(setTimeout(() => setStage('name'), 3000));

    // Name → Lines at 5.5s
    timers.push(setTimeout(() => setStage('lines'), 5500));

    // Lines appear one by one
    for (let i = 0; i < INTRO_LINES.length; i++) {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 5500 + i * 1800));
    }

    // After lines → letter with book animation
    const letterStart = 5500 + INTRO_LINES.length * 1800 + 2000;
    timers.push(setTimeout(() => {
      setStage('letter');
      // Book opens after appearing
      setTimeout(() => setBookOpen(true), 800);
    }, letterStart));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (stage !== 'letter' || !bookOpen) return;

    const charsPerSecond = 35;
    const intervalMs = 1000 / charsPerSecond;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      if (current >= BIRTHDAY_LETTER.length) {
        clearInterval(interval);
        setRevealedChars(BIRTHDAY_LETTER.length);
        setTimeout(() => setStage('entry'), 1500);
      } else {
        setRevealedChars(current);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [stage, bookOpen]);

  const handleSkip = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    useBirthdayStore.getState().setPhase('transition');
  }, [isTransitioning]);

  const handleEnter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    useBirthdayStore.getState().setPhase('transition');
  }, [isTransitioning]);

  const handleTransitionComplete = useCallback(() => {
    useBirthdayStore.getState().dismiss();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (phase === 'done') return null;

  const title = 'HAPPY BIRTHDAY';

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black overflow-hidden"
      role="region"
      aria-label="Birthday celebration intro"
    >
      {/* Subtle animated background particles (CSS only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${330 + Math.random() * 30}, 80%, 70%)`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12">

        {/* Title + Name */}
        <AnimatePresence mode="wait">
          {(stage === 'title' || stage === 'name') && (
            <motion.div
              key="title-section"
              className="flex flex-col items-center"
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-[0.15em] mb-8">
                {title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ textShadow: '0 0 20px rgba(255,182,193,0.5)' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>

              {stage === 'name' && (
                <motion.h2
                  className="text-3xl md:text-6xl font-light text-pink-300 tracking-wide"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ textShadow: '0 0 30px rgba(255,182,193,0.4)' }}
                >
                  Dinar Intan Permatasari
                </motion.h2>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intro Lines */}
        <AnimatePresence mode="wait">
          {stage === 'lines' && (
            <motion.div
              key="lines-section"
              className="flex flex-col items-center gap-5 md:gap-8 max-w-2xl"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              {INTRO_LINES.map((line, index) => (
                <motion.p
                  key={index}
                  className="text-xl md:text-3xl text-white font-light text-center leading-relaxed"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: index < visibleLines ? 1 : 0,
                    y: index < visibleLines ? 0 : 40,
                  }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    textShadow: index < visibleLines ? '0 0 15px rgba(255,255,255,0.2)' : 'none',
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Birthday Letter in Book Frame */}
        <AnimatePresence mode="wait">
          {(stage === 'letter' || stage === 'entry') && (
            <motion.div
              key="book-section"
              className="w-full max-w-md md:max-w-2xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Book outer frame — leather with gold border */}
              <div className="relative bg-gradient-to-b from-[#4a2c17] to-[#3a1f0f] rounded-xl p-[3px] shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                {/* Gold border */}
                <div className="absolute inset-0 rounded-xl border-2 border-yellow-600/50" />

                {/* Gold corner ornaments */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-yellow-500/70 rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-yellow-500/70 rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-yellow-500/70 rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-yellow-500/70 rounded-br-sm" />

                {/* Pink ribbon */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-10 h-8 bg-pink-400 rounded-b-full shadow-lg" />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-400 rotate-45" />
                </div>

                {/* Book page — cream background */}
                <motion.div
                  className="relative bg-[#FFF8EC] rounded-lg overflow-hidden"
                  initial={{ rotateY: -90 }}
                  animate={{ rotateY: bookOpen ? 0 : -90 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: 'left center', perspective: '1000px' }}
                >
                  {/* Page texture lines */}
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 28px, #8B4513 28px, #8B4513 29px)',
                    }}
                  />

                  {/* Letter content */}
                  <div className="relative p-6 md:p-10 min-h-[300px] md:min-h-[400px]">
                    <p
                      className="text-base md:text-lg text-gray-800 leading-[2] whitespace-pre-wrap"
                      style={{
                        fontFamily: "'Dancing Script', 'Segoe Script', cursive",
                      }}
                    >
                      {BIRTHDAY_LETTER.slice(0, revealedChars)}
                      {revealedChars < BIRTHDAY_LETTER.length && revealedChars > 0 && (
                        <span className="animate-pulse text-pink-500 font-bold">|</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Entry button below book */}
              {stage === 'entry' && !isTransitioning && (
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <EntryButton onEnter={handleEnter} disabled={isTransitioning} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <SkipButton onSkip={handleSkip} />

      {/* Transition */}
      {isTransitioning && (
        <SpaTransition onComplete={handleTransitionComplete} />
      )}

      {/* CSS animation for floating particles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}
