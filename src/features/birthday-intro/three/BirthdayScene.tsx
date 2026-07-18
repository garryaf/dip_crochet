'use client';

import { Component, Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import type { BirthdayPhase } from '../types';
import { CinematicLighting } from './CinematicLighting';
import { ParticleSystem } from './ParticleSystem';
import { YarnBalls } from './YarnBalls';
import { CrochetFlowers } from './CrochetFlowers';
import { Clouds } from './Clouds';
import { ParallaxCamera } from './ParallaxCamera';
import { AnimeSilhouette } from './AnimeSilhouette';
import { PostProcessing } from './PostProcessing';
import { SCROLL_SECTIONS } from '../utils/scrollMath';

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
  // Show anime silhouette after the final intro text line
  const showSilhouette = scrollProgress >= SCROLL_SECTIONS.text.end;

  // For reduced motion or if WebGL is likely to struggle, use a simpler scene
  if (isReducedMotion) {
    return <StaticFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false,
          alpha: false,
          failIfMajorPerformanceCaveat: false,
          powerPreference: 'default',
        }}
        onCreated={({ gl }) => {
          // Handle WebGL context lost gracefully
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
          });
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting and atmosphere */}
          <CinematicLighting />

          {/* Particles */}
          <ParticleSystem
            phase={phase}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
          />

          {/* Floating objects */}
          <YarnBalls />
          <CrochetFlowers />
          <Clouds />

          {/* Anime couple silhouette — shown after text section */}
          <AnimeSilhouette visible={showSilhouette} />

          {/* Camera parallax */}
          <ParallaxCamera isMobile={isMobile} isReducedMotion={isReducedMotion} />

          {/* Post-processing effects — skip on mobile for performance */}
          {!isMobile && <PostProcessing />}
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
