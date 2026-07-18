'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { LoadingIndicator } from './LoadingIndicator';

const BirthdayIntro = dynamic(() => import('./BirthdayIntro'), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});

export default function BirthdayIntroLoader() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 10000); // 10s asset load timeout

    return () => clearTimeout(timer);
  }, []);

  if (timedOut) {
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
