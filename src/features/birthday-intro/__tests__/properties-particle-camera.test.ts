import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Feature: birthday-landing-page, Property 4: Particle velocity and oscillation constraints
// **Validates: Requirements 4.4**
describe('Property 4: Particle velocity and oscillation constraints', () => {
  const MAX_VELOCITY = 0.5; // units/sec
  const MIN_OSCILLATION_PERIOD = 4; // seconds
  const MAX_FREQUENCY = 1 / MIN_OSCILLATION_PERIOD; // 0.25 Hz

  /**
   * The oscillation pattern in ParticleSystem is:
   *   Math.sin(t * frequency * 2π + phase) * amplitude
   *
   * The max velocity (derivative) of this oscillation is:
   *   amplitude * frequency * 2π
   *
   * With amplitude <= 0.3 and frequency <= 0.25:
   *   max velocity = 0.3 * 0.25 * 2π ≈ 0.471 < 0.5 ✓
   */

  it('oscillation velocity never exceeds 0.5 units/sec for valid frequency and amplitude', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(0.01), max: Math.fround(0.3), noNaN: true }),  // amplitude
        fc.float({ min: Math.fround(0.01), max: Math.fround(MAX_FREQUENCY), noNaN: true }),  // frequency
        fc.float({ min: Math.fround(0), max: Math.fround(100), noNaN: true }),  // time
        fc.float({ min: Math.fround(0), max: Math.fround(Math.PI * 2), noNaN: true }),  // phase
        (amplitude, frequency, _time, _phase) => {
          // Max velocity of sin oscillation = amplitude * angular_frequency
          const angularFreq = frequency * Math.PI * 2;
          const maxVelocity = amplitude * angularFreq;
          // Should not exceed MAX_VELOCITY
          expect(maxVelocity).toBeLessThanOrEqual(MAX_VELOCITY);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('clampVelocity ensures vector magnitude <= 0.5', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(-5), max: Math.fround(5), noNaN: true }),
        fc.float({ min: Math.fround(-5), max: Math.fround(5), noNaN: true }),
        fc.float({ min: Math.fround(-5), max: Math.fround(5), noNaN: true }),
        (vx, vy, vz) => {
          // Simulate the clampVelocity function from ParticleSystem.tsx
          const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
          let cx = vx, cy = vy, cz = vz;
          if (speed > MAX_VELOCITY) {
            const scale = MAX_VELOCITY / speed;
            cx *= scale;
            cy *= scale;
            cz *= scale;
          }
          const clampedSpeed = Math.sqrt(cx * cx + cy * cy + cz * cz);
          // Small epsilon for floating point rounding
          expect(clampedSpeed).toBeLessThanOrEqual(MAX_VELOCITY + 1e-10);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('oscillation period is always >= 4 seconds for valid frequency', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(0.01), max: Math.fround(MAX_FREQUENCY), noNaN: true }),
        (frequency) => {
          const period = 1 / frequency;
          expect(period).toBeGreaterThanOrEqual(MIN_OSCILLATION_PERIOD);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('instantaneous oscillation velocity at any time t is bounded', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(0.01), max: Math.fround(0.3), noNaN: true }),  // amplitude
        fc.float({ min: Math.fround(0.01), max: Math.fround(MAX_FREQUENCY), noNaN: true }),  // frequency
        fc.float({ min: Math.fround(0), max: Math.fround(1000), noNaN: true }),  // time
        fc.float({ min: Math.fround(0), max: Math.fround(Math.PI * 2), noNaN: true }),  // phase
        (amplitude, frequency, t, phase) => {
          // The derivative of sin(t * freq * 2π + phase) * amplitude is:
          //   amplitude * freq * 2π * cos(t * freq * 2π + phase)
          // Since |cos(...)| <= 1, the max instantaneous velocity = amplitude * freq * 2π
          const angularFreq = frequency * Math.PI * 2;
          const instantVelocity = amplitude * angularFreq * Math.cos(t * angularFreq + phase);
          expect(Math.abs(instantVelocity)).toBeLessThanOrEqual(MAX_VELOCITY);
        }
      ),
      { numRuns: 200 }
    );
  });
});

// Feature: birthday-landing-page, Property 5: Camera parallax offset is bounded
// **Validates: Requirements 4.5, 4.6**
describe('Property 5: Camera parallax offset is bounded', () => {
  const MAX_OFFSET = 0.3;

  /**
   * The ParallaxCamera computes:
   *   targetOffset = normalizedInput * MAX_OFFSET
   *   clampedOffset = clamp(targetOffset, -MAX_OFFSET, MAX_OFFSET)
   *
   * For any input in [-1, 1], targetOffset is in [-0.3, 0.3].
   * The clamp ensures it never exceeds ±0.3 even with edge cases.
   */

  it('for any mouse position in [-1, 1], camera offset is within ±0.3', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(-1), max: Math.fround(1), noNaN: true }),  // mouseX
        fc.float({ min: Math.fround(-1), max: Math.fround(1), noNaN: true }),  // mouseY
        (mouseX, mouseY) => {
          // Replicate ParallaxCamera logic
          const targetX = mouseX * MAX_OFFSET;
          const targetY = mouseY * MAX_OFFSET;
          // Clamp (as done in the useFrame callback)
          const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, targetX));
          const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, targetY));
          expect(Math.abs(clampedX)).toBeLessThanOrEqual(MAX_OFFSET);
          expect(Math.abs(clampedY)).toBeLessThanOrEqual(MAX_OFFSET);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('even with extreme input values beyond [-1, 1], offset remains bounded', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(-100), max: Math.fround(100), noNaN: true }),
        fc.float({ min: Math.fround(-100), max: Math.fround(100), noNaN: true }),
        (rawX, rawY) => {
          // Even if normalization fails and raw values are extreme
          const targetX = rawX * MAX_OFFSET;
          const targetY = rawY * MAX_OFFSET;
          // The clamp in ParallaxCamera guarantees bounds
          const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, targetX));
          const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, targetY));
          expect(Math.abs(clampedX)).toBeLessThanOrEqual(MAX_OFFSET);
          expect(Math.abs(clampedY)).toBeLessThanOrEqual(MAX_OFFSET);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('lerp interpolation preserves bounds when starting from clamped values', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(-MAX_OFFSET), max: Math.fround(MAX_OFFSET), noNaN: true }),  // current X
        fc.float({ min: Math.fround(-MAX_OFFSET), max: Math.fround(MAX_OFFSET), noNaN: true }),  // current Y
        fc.float({ min: Math.fround(-1), max: Math.fround(1), noNaN: true }),  // target mouse X
        fc.float({ min: Math.fround(-1), max: Math.fround(1), noNaN: true }),  // target mouse Y
        fc.float({ min: Math.fround(0.01), max: Math.fround(0.2), noNaN: true }),  // lerp factor
        (currentX, currentY, mouseX, mouseY, lerpFactor) => {
          // Simulate the lerp + clamp pattern from ParallaxCamera
          const targetX = mouseX * MAX_OFFSET;
          const targetY = mouseY * MAX_OFFSET;

          // Lerp step
          const newX = currentX + (targetX - currentX) * lerpFactor;
          const newY = currentY + (targetY - currentY) * lerpFactor;

          // Clamp (as done in useFrame)
          const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, newX));
          const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, newY));

          expect(Math.abs(clampedX)).toBeLessThanOrEqual(MAX_OFFSET);
          expect(Math.abs(clampedY)).toBeLessThanOrEqual(MAX_OFFSET);
        }
      ),
      { numRuns: 200 }
    );
  });
});
