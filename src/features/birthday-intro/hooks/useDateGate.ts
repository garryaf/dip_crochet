'use client';

import { useState, useEffect, useCallback } from 'react';
import { isBirthdayToday } from '../utils/dateCheck';
import type { DateGateResult } from '../types';

const SESSION_KEY = 'dip_birthday_seen';

export function useDateGate(): DateGateResult {
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasSeenThisSession, setHasSeenThisSession] = useState(false);

  useEffect(() => {
    setIsBirthday(isBirthdayToday());
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      setHasSeenThisSession(seen === '1');
    } catch {
      // sessionStorage unavailable — default to not seen
    }
  }, []);

  const markAsSeen = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable — no-op
    }
    setHasSeenThisSession(true);
  }, []);

  return { isBirthday, hasSeenThisSession, markAsSeen };
}
