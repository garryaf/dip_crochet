import { Playfair_Display, Dancing_Script } from 'next/font/google';

/**
 * Serif/display font for birthday intro titles and headings.
 * Uses CSS variable so it can be applied via Tailwind (`font-[var(--font-playfair)]`)
 * or through the className on a container element.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

/**
 * Handwriting font for the birthday letter content and personal messages.
 * Uses CSS variable so it can be applied via Tailwind (`font-[var(--font-dancing)]`)
 * or through the className on a container element.
 */
export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
});

/**
 * Combined className string to apply both font CSS variables to a container.
 * Usage: <div className={birthdayFontVariables}>...</div>
 */
export const birthdayFontVariables = `${playfairDisplay.variable} ${dancingScript.variable}`;
