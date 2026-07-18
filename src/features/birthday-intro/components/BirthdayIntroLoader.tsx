'use client';

import dynamic from 'next/dynamic';
import { LoadingIndicator } from './LoadingIndicator';

const BirthdayIntro = dynamic(() => import('./BirthdayIntro'), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});

export default function BirthdayIntroLoader() {
  return <BirthdayIntro />;
}
