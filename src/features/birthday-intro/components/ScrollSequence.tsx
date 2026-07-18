'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { INTRO_LINES } from '../utils/constants';
import { SCROLL_SECTIONS } from '../utils/scrollMath';

interface ScrollSequenceProps {
  scrollProgress: number;
}

export function ScrollSequence({ scrollProgress }: ScrollSequenceProps) {
  const TEXT_START = SCROLL_SECTIONS.text.start;
  const TEXT_END = SCROLL_SECTIONS.text.end;

  const visibleLines = useMemo(() => {
    if (scrollProgress <= TEXT_START) return 0;
    if (scrollProgress >= TEXT_END) return INTRO_LINES.length;

    const sectionProgress =
      (scrollProgress - TEXT_START) / (TEXT_END - TEXT_START);
    const lineInterval = 1 / INTRO_LINES.length;
    let count = 0;
    for (let i = 0; i < INTRO_LINES.length; i++) {
      if (sectionProgress >= i * lineInterval) {
        count++;
      }
    }
    return count;
  }, [scrollProgress]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
      {INTRO_LINES.map((line, index) => (
        <motion.p
          key={index}
          className="text-white text-xl md:text-3xl font-serif text-center mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index < visibleLines ? 1 : 0,
            y: index < visibleLines ? 0 : 20,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
