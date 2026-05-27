"use client";

import dynamic from "next/dynamic";

// Lazy load the full intro overlay — no SSR
const IntroOverlay = dynamic(() => import("./IntroOverlay"), {
  ssr: false,
});

/**
 * Client wrapper for IntroOverlay.
 * Needed because `dynamic` with `ssr: false` requires a Client Component.
 */
export default function IntroWrapper() {
  return <IntroOverlay />;
}
