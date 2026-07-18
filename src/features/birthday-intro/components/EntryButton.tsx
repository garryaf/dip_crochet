'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TIMING } from '../utils/constants';

interface EntryButtonProps {
  onEnter: () => void;
  disabled?: boolean;
}

export function EntryButton({ onEnter, disabled = false }: EntryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) onEnter();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <motion.button
      className={`
        relative px-8 py-4 rounded-[20px]
        bg-pink-300/60 backdrop-blur-sm
        text-white text-lg md:text-xl font-medium
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer select-none
      `}
      style={{
        boxShadow: `0 0 ${isHovered ? '30px' : '15px'} rgba(255, 182, 193, ${isHovered ? 0.9 : 0.6})`,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: TIMING.entryButtonFadeIn / 1000, ease: 'easeOut' }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label="Enter DipCrochet website"
      role="button"
      tabIndex={0}
    >
      💖 Enter DipCrochet 💖
    </motion.button>
  );
}
