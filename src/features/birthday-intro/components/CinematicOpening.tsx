'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayPhase } from '../types';
import { TIMING } from '../utils/constants';

interface CinematicOpeningProps {
  phase: BirthdayPhase;
}

export function CinematicOpening({ phase }: CinematicOpeningProps) {
  const [stage, setStage] = useState<'black' | 'particles' | 'title' | 'name' | 'done'>('black');

  useEffect(() => {
    if (phase !== 'cinematic') return;

    const timers: NodeJS.Timeout[] = [];

    // Black screen → particles fade-in at 500ms
    timers.push(setTimeout(() => setStage('particles'), TIMING.blackScreen));

    // Title reveal at 4s (500 + 1500 + 2000 = 4000ms)
    timers.push(
      setTimeout(
        () => setStage('title'),
        TIMING.blackScreen + TIMING.particleFadeIn + TIMING.cameraReveal
      )
    );

    // Name reveal at 6s (4000 + 1500 + 500 = 6000ms)
    timers.push(
      setTimeout(
        () => setStage('name'),
        TIMING.blackScreen + TIMING.particleFadeIn + TIMING.cameraReveal + TIMING.titleReveal + 500
      )
    );

    // Done at 8s — component unmounts
    timers.push(setTimeout(() => setStage('done'), 8000));

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  if (phase !== 'cinematic' || stage === 'done') return null;

  const title = 'HAPPY BIRTHDAY';

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      {/* Black screen overlay */}
      <AnimatePresence>
        {stage === 'black' && (
          <motion.div
            className="absolute inset-0 bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: TIMING.particleFadeIn / 1000 }}
          />
        )}
      </AnimatePresence>

      {/* Semi-transparent backdrop for text readability */}
      {(stage === 'particles' || stage === 'title' || stage === 'name') && (
        <div className="absolute inset-0 bg-black/60" />
      )}

      {/* Title: HAPPY BIRTHDAY letter-by-letter */}
      {(stage === 'title' || stage === 'name') && (
        <motion.h1
          className="text-4xl md:text-6xl font-serif text-white tracking-widest mb-8 drop-shadow-lg relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * (TIMING.titleReveal / 1000 / title.length),
                duration: 0.1,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      )}

      {/* Name: fade and scale */}
      {stage === 'name' && (
        <motion.h2
          className="text-2xl md:text-4xl font-serif text-pink-200 drop-shadow-lg relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: TIMING.nameReveal / 1000, ease: 'easeOut' }}
        >
          Dinar Intan Permatasari
        </motion.h2>
      )}

      {/* Scroll hint after name appears */}
      {stage === 'name' && (
        <motion.p
          className="absolute bottom-10 text-white/60 text-sm animate-bounce relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          ↓ Scroll untuk melanjutkan ↓
        </motion.p>
      )}
    </div>
  );
}
