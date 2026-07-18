import { BIRTHDAY_DATE, TIMEZONE } from './constants';

export function isBirthdayToday(now: Date = new Date()): boolean {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    month: 'numeric',
    day: 'numeric',
  });
  const parts = formatter.formatToParts(now);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);
  return month === BIRTHDAY_DATE.month && day === BIRTHDAY_DATE.day;
}
