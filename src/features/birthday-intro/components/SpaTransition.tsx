'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TIMING } from '../utils/constants';

interface SpaTransitionProps {
  onComplete: () => void;
}

/**
 * SpaTransition – Exit animation overlay that plays when the user
 * clicks the Entry_Button or activates the Skip_Button.
 *
 * Renders a fade-to-white overlay that simulates:
 * - Forward camera movement (opacity ramp gives perception of rushing forward)
 * - Particle fade-out (particles behind the overlay disappear)
 * - Fade-to-white overlay covers the entire viewport
 *
 * Duration is within 1500–3000ms (Req 7.3).
 * Calls `onComplete` when the transition finishes, which triggers
 * dismiss() → unmount of the entire Birthday_Intro (Req 7.5, 2.3, 2.5).
 */
export function SpaTransition({ onComplete }: SpaTransitionProps) {
  const duration = 2000; // 2000ms — within the 1500–3000ms range

  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <motion.div
      className="fixed inset-0 z-[2500] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration / 1000, ease: 'easeIn' }}
      aria-hidden="true"
    >
      {/* Fade-to-white overlay */}
      <div className="absolute inset-0 bg-white" />
    </motion.div>
  );
}
