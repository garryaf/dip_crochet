import type { BirthdayPhase } from '../types';

export const SCROLL_SECTIONS = {
  cinematic: { start: 0, end: 0.15 },
  text: { start: 0.15, end: 0.50 },
  book: { start: 0.50, end: 0.85 },
  entry: { start: 0.85, end: 1.0 },
} as const;

export function scrollToPhase(progress: number): BirthdayPhase {
  if (progress < SCROLL_SECTIONS.cinematic.end) return 'cinematic';
  if (progress < SCROLL_SECTIONS.text.end) return 'text';
  if (progress < SCROLL_SECTIONS.book.end) return 'book';
  return 'entry';
}
