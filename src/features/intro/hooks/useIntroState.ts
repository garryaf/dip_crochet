"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cotcret_intro_seen";

/**
 * Hook to manage intro visibility state.
 * Shows intro once per session on homepage only.
 */
export function useIntroState() {
  const [showIntro, setShowIntro] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only show on client
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setShowIntro(true);
    }
    setIsReady(true);
  }, []);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  return { showIntro, dismissIntro, isReady };
}
