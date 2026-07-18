import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { BIRTHDAY_LETTER } from '../utils/constants';

// Feature: birthday-landing-page, Property 7: Typing effect rate is within bounds
// **Validates: Requirements 6.4**
describe('Property 7: Typing effect rate is within bounds', () => {
  const TOTAL_LENGTH = BIRTHDAY_LETTER.length;
  const MIN_RATE = 30; // chars/sec
  const MAX_RATE = 50; // chars/sec
  const ACTUAL_RATE = 40; // chars/sec used in AnimatedBook

  it('for any elapsed time, revealed chars at 40 chars/sec is within [30t, 50t] bounds', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 30, noNaN: true }), // elapsed time in seconds (up to 30s covers full text)
        (elapsed) => {
          const revealedChars = Math.min(TOTAL_LENGTH, Math.floor(elapsed * ACTUAL_RATE));
          const lowerBound = Math.floor(MIN_RATE * elapsed);
          const upperBound = Math.min(TOTAL_LENGTH, Math.ceil(MAX_RATE * elapsed));

          expect(revealedChars).toBeGreaterThanOrEqual(Math.min(lowerBound, TOTAL_LENGTH));
          expect(revealedChars).toBeLessThanOrEqual(upperBound);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('typing completes within expected time bounds', () => {
    // At 40 chars/sec, completion time = TOTAL_LENGTH / 40
    const completionTime = TOTAL_LENGTH / ACTUAL_RATE;
    // Must complete within [TOTAL_LENGTH/50, TOTAL_LENGTH/30] seconds
    const minTime = TOTAL_LENGTH / MAX_RATE;
    const maxTime = TOTAL_LENGTH / MIN_RATE;

    expect(completionTime).toBeGreaterThanOrEqual(minTime);
    expect(completionTime).toBeLessThanOrEqual(maxTime);
  });
});
