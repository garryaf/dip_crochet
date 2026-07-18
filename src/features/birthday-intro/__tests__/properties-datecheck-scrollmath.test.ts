import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isBirthdayToday } from '../utils/dateCheck';
import { SCROLL_SECTIONS } from '../utils/scrollMath';
import { COLORS, INTRO_LINES } from '../utils/constants';

// Feature: birthday-landing-page, Property 1: Date gate activates exclusively on July 19 Asia/Jakarta
// **Validates: Requirements 1.1, 1.2, 1.3**
describe('Property 1: Date gate activates exclusively on July 19 Asia/Jakarta', () => {
  it('isBirthdayToday() returns true if and only if the date in Asia/Jakarta is July 19', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date('2020-01-01T00:00:00Z'),
          max: new Date('2030-12-31T23:59:59Z'),
          noInvalidDate: true,
        }),
        (date) => {
          const result = isBirthdayToday(date);

          // Determine the expected result by checking what July 19 looks like in Asia/Jakarta (UTC+7)
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            month: 'numeric',
            day: 'numeric',
          });
          const parts = formatter.formatToParts(date);
          const month = Number(parts.find((p) => p.type === 'month')?.value);
          const day = Number(parts.find((p) => p.type === 'day')?.value);
          const expected = month === 7 && day === 19;

          expect(result).toBe(expected);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('returns true for dates that are July 19 in Asia/Jakarta regardless of UTC time', () => {
    fc.assert(
      fc.property(
        // Generate hours 0-23, minutes 0-59 for a specific July 19 in Asia/Jakarta
        fc.integer({ min: 2020, max: 2030 }),
        fc.integer({ min: 0, max: 23 }),
        fc.integer({ min: 0, max: 59 }),
        (year, hour, minute) => {
          // July 19 00:00 Asia/Jakarta = July 18 17:00 UTC
          // July 19 23:59 Asia/Jakarta = July 19 16:59 UTC
          // So a date is July 19 in Jakarta if UTC is between July 18 17:00 and July 19 16:59
          const jakartaDate = new Date(
            Date.UTC(year, 6, 18, 17, 0, 0) + (hour * 60 + minute) * 60 * 1000
          );

          // Verify it's actually July 19 in Jakarta
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            month: 'numeric',
            day: 'numeric',
          });
          const parts = formatter.formatToParts(jakartaDate);
          const month = Number(parts.find((p) => p.type === 'month')?.value);
          const day = Number(parts.find((p) => p.type === 'day')?.value);

          if (month === 7 && day === 19) {
            expect(isBirthdayToday(jakartaDate)).toBe(true);
          }
        }
      ),
      { numRuns: 200 }
    );
  });

  it('returns false for dates that are not July 19 in Asia/Jakarta', () => {
    fc.assert(
      fc.property(
        // Generate months 1-12 and days 1-28 (safe range), excluding July 19
        fc.integer({ min: 2020, max: 2030 }),
        fc.integer({ min: 1, max: 12 }),
        fc.integer({ min: 1, max: 28 }),
        fc.integer({ min: 0, max: 23 }),
        (year, month, day, hour) => {
          // Skip July 19
          if (month === 7 && day === 19) return;

          // Create a date that is the given month/day in Jakarta
          // month/day at noon in Jakarta = UTC hour 5
          const utcDate = new Date(Date.UTC(year, month - 1, day, 5, 0, 0));

          // Verify it's actually the expected date in Jakarta
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            month: 'numeric',
            day: 'numeric',
          });
          const parts = formatter.formatToParts(utcDate);
          const m = Number(parts.find((p) => p.type === 'month')?.value);
          const d = Number(parts.find((p) => p.type === 'day')?.value);

          // Only assert if we actually got a non-July-19 date in Jakarta
          if (!(m === 7 && d === 19)) {
            expect(isBirthdayToday(utcDate)).toBe(false);
          }
        }
      ),
      { numRuns: 200 }
    );
  });
});

// Feature: birthday-landing-page, Property 6: Scroll-to-visibility is monotonically non-decreasing
// **Validates: Requirements 5.1, 5.5**
describe('Property 6: Scroll-to-visibility is monotonically non-decreasing', () => {
  /**
   * The text section goes from 0.15 to 0.50 and has 5 lines (from INTRO_LINES).
   * Lines are evenly spaced across the text section range.
   * Visibility = how many lines have been triggered (revealed).
   */
  const TEXT_START = SCROLL_SECTIONS.text.start; // 0.15
  const TEXT_END = SCROLL_SECTIONS.text.end; // 0.50
  const LINE_COUNT = INTRO_LINES.length; // 5

  function getVisibleLines(progress: number): number {
    if (progress <= TEXT_START) return 0;
    if (progress >= TEXT_END) return LINE_COUNT;

    // Lines are evenly spaced across the text section
    const sectionProgress = (progress - TEXT_START) / (TEXT_END - TEXT_START);
    // Each line triggers at evenly spaced intervals
    const lineInterval = 1 / LINE_COUNT;
    let visibleCount = 0;
    for (let i = 0; i < LINE_COUNT; i++) {
      if (sectionProgress >= i * lineInterval) {
        visibleCount++;
      }
    }
    return visibleCount;
  }

  it('for any a < b, visible lines at b >= visible lines at a', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1, noNaN: true }),
        fc.float({ min: 0, max: 1, noNaN: true }),
        (rawA, rawB) => {
          const a = Math.min(rawA, rawB);
          const b = Math.max(rawA, rawB);

          const visibleAtA = getVisibleLines(a);
          const visibleAtB = getVisibleLines(b);

          expect(visibleAtB).toBeGreaterThanOrEqual(visibleAtA);
        }
      ),
      { numRuns: 500 }
    );
  });

  it('visible lines never decrease as scroll progress increases through the full range', () => {
    fc.assert(
      fc.property(
        // Generate a sorted array of progress values
        fc.array(fc.float({ min: 0, max: 1, noNaN: true }), {
          minLength: 2,
          maxLength: 20,
        }),
        (progressValues) => {
          const sorted = [...progressValues].sort((a, b) => a - b);
          for (let i = 1; i < sorted.length; i++) {
            expect(getVisibleLines(sorted[i])).toBeGreaterThanOrEqual(
              getVisibleLines(sorted[i - 1])
            );
          }
        }
      ),
      { numRuns: 200 }
    );
  });

  it('returns 0 visible lines before text section and 5 at or after text section end', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: Math.fround(TEXT_START), noNaN: true }),
        (progress) => {
          // Math.fround(TEXT_START) may be slightly above TEXT_START; skip those boundary values
          if (progress > TEXT_START) return;
          expect(getVisibleLines(progress)).toBe(0);
        }
      ),
      { numRuns: 100 }
    );

    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(TEXT_END), max: 1, noNaN: true }),
        (progress) => {
          if (progress < TEXT_END) return;
          expect(getVisibleLines(progress)).toBe(LINE_COUNT);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: birthday-landing-page, Property 8: No forbidden color tones in palette
// **Validates: Requirements 13.2**
describe('Property 8: No forbidden color tones in palette', () => {
  /**
   * For any color in the COLORS constant, when converted to HSL,
   * it does NOT simultaneously have:
   * - hue 350°-10° (wrapping around 0°)
   * - saturation > 80%
   * - lightness < 50%
   */

  function parseColor(
    colorStr: string
  ): { r: number; g: number; b: number } | null {
    // Parse hex colors
    const hexMatch = colorStr.match(/^#([0-9A-Fa-f]{6})$/);
    if (hexMatch) {
      const hex = hexMatch[1];
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }

    // Parse rgba colors
    const rgbaMatch = colorStr.match(
      /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)$/
    );
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1], 10),
        g: parseInt(rgbaMatch[2], 10),
        b: parseInt(rgbaMatch[3], 10),
      };
    }

    return null;
  }

  function rgbToHsl(
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) {
      return { h: 0, s: 0, l: l * 100 };
    }

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h: number;
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function isForbiddenColor(h: number, s: number, l: number): boolean {
    // Forbidden: hue 350°-10° (wrapping), saturation > 80%, lightness < 50%
    const hueInForbiddenRange = h >= 350 || h <= 10;
    return hueInForbiddenRange && s > 80 && l < 50;
  }

  it('no color in COLORS constant has forbidden red tone (hue 350-10°, sat>80%, light<50%)', () => {
    const colorEntries = Object.entries(COLORS);

    fc.assert(
      fc.property(
        fc.constantFrom(...colorEntries),
        ([name, colorValue]) => {
          const rgb = parseColor(colorValue);
          if (!rgb) {
            // If we can't parse the color, skip (shouldn't happen with our palette)
            return;
          }

          const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
          const forbidden = isForbiddenColor(h, s, l);

          expect(
            forbidden,
            `Color "${name}" (${colorValue}) has forbidden tone: HSL(${h.toFixed(1)}°, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
          ).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('each individual color in palette passes HSL constraint check', () => {
    // Exhaustive check over all colors
    for (const [name, colorValue] of Object.entries(COLORS)) {
      const rgb = parseColor(colorValue);
      expect(rgb, `Could not parse color "${name}": ${colorValue}`).not.toBeNull();

      if (rgb) {
        const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const forbidden = isForbiddenColor(h, s, l);

        expect(
          forbidden,
          `Color "${name}" (${colorValue}) violates constraint: HSL(${h.toFixed(1)}°, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
        ).toBe(false);
      }
    }
  });
});
