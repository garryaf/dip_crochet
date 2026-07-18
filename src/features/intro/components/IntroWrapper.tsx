"use client";

import dynamic from "next/dynamic";
import { useDateGate } from "@/features/birthday-intro/hooks/useDateGate";

const IntroOverlay = dynamic(() => import("./IntroOverlay"), { ssr: false });
const BirthdayIntroLoader = dynamic(
  () => import("@/features/birthday-intro/components/BirthdayIntroLoader"),
  { ssr: false }
);

export default function IntroWrapper() {
  const { isBirthday, hasSeenThisSession } = useDateGate();

  if (isBirthday && !hasSeenThisSession) {
    return <BirthdayIntroLoader />;
  }

  return <IntroOverlay />;
}
