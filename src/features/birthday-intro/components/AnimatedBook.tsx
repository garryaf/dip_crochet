'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { BirthdayPhase } from '../types';
import { BIRTHDAY_LETTER, TIMING } from '../utils/constants';

interface AnimatedBookProps {
  scrollProgress: number;
  phase: BirthdayPhase;
}

export function AnimatedBook({ scrollProgress, phase }: AnimatedBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isVisible = phase === 'book' || phase === 'entry';

  // Book opening animation when entering book phase
  useEffect(() => {
    if (phase === 'book') {
      const timer = setTimeout(() => setIsOpen(true), TIMING.bookAppear);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Typing effect: 30-50 chars/sec → use 40 chars/sec as middle ground
  useEffect(() => {
    if (!isOpen || typingComplete) return;

    const charsPerSecond = 40;
    const intervalMs = 1000 / charsPerSecond;

    intervalRef.current = setInterval(() => {
      setRevealedChars((prev) => {
        if (prev >= BIRTHDAY_LETTER.length) {
          setTypingComplete(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, typingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: TIMING.bookAppear / 1000, ease: 'easeOut' }}
    >
      <div className="relative w-full max-w-lg">
        {/* Book cover / frame with leather texture and gold borders */}
        <div className="relative bg-[#5C3317] rounded-lg p-1 shadow-2xl border-2 border-[rgba(255,215,0,0.4)]">
          {/* Pink ribbon decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-12 bg-pink-300 rounded-b-full opacity-80" />

          {/* Book pages container */}
          <div
            className="bg-[#FFFDD0] rounded p-6 md:p-8 min-h-[300px] md:min-h-[400px] overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {/* Page turning animation */}
            <motion.div
              className="absolute inset-1 bg-[#FFF8DC] rounded origin-left"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isOpen ? -180 : 0 }}
              transition={{
                duration: TIMING.pageTurn / 1000,
                ease: 'easeInOut',
              }}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Letter content with typing effect */}
            {isOpen && (
              <div className="relative z-10">
                <p
                  className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-wrap"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {BIRTHDAY_LETTER.slice(0, revealedChars)}
                  {!typingComplete && (
                    <span className="animate-pulse text-pink-400">|</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
