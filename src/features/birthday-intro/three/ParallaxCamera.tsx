'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParallaxCameraProps {
  isMobile: boolean;
  isReducedMotion: boolean;
}

const MAX_OFFSET = 0.3;
const LERP_FACTOR = 0.05; // Gives smooth ~200ms+ interpolation at 60fps

export function ParallaxCamera({ isMobile, isReducedMotion }: ParallaxCameraProps) {
  const { camera } = useThree();
  const targetOffset = useRef(new THREE.Vector2(0, 0));
  const currentOffset = useRef(new THREE.Vector2(0, 0));
  const basePosition = useRef(new THREE.Vector3(0, 0, 5));

  useEffect(() => {
    if (isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetOffset.current.set(x * MAX_OFFSET, y * MAX_OFFSET);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = -(touch.clientY / window.innerHeight) * 2 + 1;
      targetOffset.current.set(x * MAX_OFFSET, y * MAX_OFFSET);
    };

    if (isMobile) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, isReducedMotion]);

  useFrame(() => {
    if (isReducedMotion) return;

    // Lerp current offset toward target
    currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * LERP_FACTOR;
    currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * LERP_FACTOR;

    // Clamp to max offset
    currentOffset.current.x = THREE.MathUtils.clamp(currentOffset.current.x, -MAX_OFFSET, MAX_OFFSET);
    currentOffset.current.y = THREE.MathUtils.clamp(currentOffset.current.y, -MAX_OFFSET, MAX_OFFSET);

    // Apply to camera
    camera.position.x = basePosition.current.x + currentOffset.current.x;
    camera.position.y = basePosition.current.y + currentOffset.current.y;
  });

  return null; // This component only affects the camera, no visual output
}
