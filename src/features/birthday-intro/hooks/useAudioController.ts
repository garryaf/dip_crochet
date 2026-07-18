'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useBirthdayStore } from './useBirthdayStore';
import { AUDIO_CONFIG } from '../utils/constants';

/**
 * Manages ambient audio playback for the birthday intro experience.
 * Handles loading, autoplay deferral, fade-in/fade-out, mute sync, and error recovery.
 *
 * @param audioSrc - Path to the audio file
 * @returns Object with `fadeOut` function for exit transitions
 */
export function useAudioController(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStartedRef = useRef(false);

  const isMuted = useBirthdayStore((s) => s.isMuted);
  const hasInteracted = useBirthdayStore((s) => s.hasInteracted);
  const phase = useBirthdayStore((s) => s.phase);

  // Initialize audio element on mount
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      // Audio is ready — signal via assetsLoaded (audioReady is part of overall readiness)
      useBirthdayStore.getState().setAssetsLoaded();
    };

    const handleError = () => {
      // Audio failed to load — continue without audio (Req 8.6)
      // audioReady remains false; the experience proceeds silently
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };
  }, [audioSrc]);

  // Fade volume from 0 to target over AUDIO_CONFIG.fadeInDuration
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const targetVolume = AUDIO_CONFIG.volume;
    const duration = AUDIO_CONFIG.fadeInDuration * 1000;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(targetVolume, volumeStep * currentStep);
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, stepTime);
  }, []);

  // Start playback when user has interacted (Req 8.3: defer until first interaction)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasInteracted || hasStartedRef.current) return;
    if (phase === 'done' || phase === 'loading') return;

    hasStartedRef.current = true;

    audio.play().then(() => {
      fadeIn();
    }).catch(() => {
      // Autoplay still blocked or other error — continue silently (Req 8.6)
      hasStartedRef.current = false;
    });
  }, [hasInteracted, phase, fadeIn]);

  // Sync muted state with store (Req 8.5: persist mute across transitions)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Fade volume from current to 0 over AUDIO_CONFIG.fadeOutDuration, then pause
  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startVolume = audio.volume;
    if (startVolume === 0) {
      audio.pause();
      return;
    }

    const duration = AUDIO_CONFIG.fadeOutDuration * 1000;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, startVolume - volumeStep * currentStep);
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.pause();
      }
    }, stepTime);
  }, []);

  return { fadeOut };
}
