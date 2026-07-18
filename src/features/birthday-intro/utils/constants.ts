export const BIRTHDAY_DATE = { month: 7, day: 19 }; // July 19
export const TIMEZONE = 'Asia/Jakarta';

export const COLORS = {
  softPink: '#FFB6C1',
  blushPink: '#FFE4E1',
  rosePink: 'rgba(255, 105, 180, 0.6)',
  white: '#FFFFFF',
  cream: '#FFFDD0',
  lightGold: 'rgba(255, 215, 0, 0.4)',
  softPurple: '#E6E6FA',
  black: '#000000',
} as const;

export const TIMING = {
  blackScreen: 500,
  particleFadeIn: 1500,
  cameraReveal: 2000,
  titleReveal: 1500,
  nameReveal: 1200,
  audioFadeIn: 2000,
  audioFadeOut: 1500,
  textLineFadeIn: 600,
  bookAppear: 800,
  pageTurn: 1200,
  typingSpeed: { min: 30, max: 50 },
  entryButtonFadeIn: 600,
  spaTransition: { min: 1500, max: 3000 },
  skipTransition: 500,
} as const;

export const INTRO_LINES = [
  'Happy Birthday...',
  'Dinar Intan Permatasari...',
  'Today is your day...',
  'Every stitch you make brings warmth.',
  'Every smile you give makes my world brighter.',
] as const;

export const BIRTHDAY_LETTER = `Happy Birthday.
Makasih ya udah lahir ke dunia dan hadir di hidup aku.
Aku sering mikir, kalau waktu itu kita gak dipertemukan, mungkin hidup aku gak akan sehangat sekarang.
Buat aku, kamu bukan cuma seseorang yang aku sayang, tapi juga rumah tempat hati ini selalu ingin pulang.
Aku gak bisa janji perjalanan kita selalu mudah, tapi aku janji akan selalu berusaha tetap menggenggam tangan kamu, apa pun yang terjadi.
Semoga tahun ini membawa lebih banyak bahagia, kesehatan, rezeki, dan mimpi yang pelan-pelan jadi nyata.
I love you, today, tomorrow, and every day after that. ❤️`;

export const AUDIO_CONFIG = {
  volume: 0.2,
  fadeInDuration: 2,
  fadeOutDuration: 1.5,
} as const;
