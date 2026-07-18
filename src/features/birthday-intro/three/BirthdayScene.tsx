'use client';

import { Component, Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import type { BirthdayPhase } from '../types';

// ─── Error Boundary for WebGL failures ─────────────────────────────────────────

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ─── Static Fallback ───────────────────────────────────────────────────────────

function StaticFallback() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-pink-200 via-pink-100 to-white"
      aria-hidden="true"
    />
  );
}

// ─── Main Scene Component ──────────────────────────────────────────────────────

interface BirthdaySceneProps {
  phase: BirthdayPhase;
  scrollProgress: number;
  isMobile: boolean;
  isReducedMotion: boolean;
}

export function BirthdayScene({
  phase,
  scrollProgress,
  isMobile,
  isReducedMotion,
}: BirthdaySceneProps) {
  return (
    <WebGLErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: !isMobile,
          alpha: false,
          failIfMajorPerformanceCaveat: true,
        }}
      >
        <Suspense fallback={null}>
          {/* 3D scene children will be added in subsequent tasks:
              - CinematicLighting
              - ParticleSystem
              - ParallaxCamera
              - PostProcessing
              etc. */}
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
