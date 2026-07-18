'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { LoadingIndicator } from './LoadingIndicator';

const BirthdayIntro = dynamic(() => import('./BirthdayIntro'), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});

export default function BirthdayIntroLoader() {
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only start timeout if not yet loaded
    timerRef.current = setTimeout(() => {
      if (!loaded) {
        setTimedOut(true);
      }
    }, 15000); // 15s timeout (increased for slow connections)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loaded]);

  // Mark as loaded once BirthdayIntro renders
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (timedOut && !loaded) {
    return (
      <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black">
        <p className="text-white text-lg mb-4">Loading is taking longer than expected...</p>
        <a
          href="/"
          className="text-pink-300 underline hover:text-pink-200"
          onClick={(e) => {
            e.preventDefault();
            try {
              sessionStorage.setItem('dip_birthday_seen', '1');
            } catch {
              // sessionStorage unavailable — skip silently
            }
            window.location.reload();
          }}
        >
          Skip to site →
        </a>
      </div>
    );
  }

  return <BirthdayIntro />;
}
