'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../utils/constants';

const BALL_COUNT = 5;
const MIN_PERIOD = 4; // seconds — oscillation period >= 4s (Req 4.4)

/**
 * Instanced crochet yarn balls floating gently in the scene.
 * Uses InstancedMesh for draw-call efficiency (Req 9.4).
 * Animation respects velocity <= 0.5 units/sec and period >= 4s (Req 4.4).
 */
export function YarnBalls() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-defined scattered positions
  const positions = useMemo<[number, number, number][]>(
    () => [
      [-3, 2, -1],
      [-1, -2, 0.5],
      [2, 1, -0.5],
      [4, -1, -1.5],
      [-2, 0, 1],
    ],
    []
  );

  // Soft yarn-like colors (pink, cream, blush tones)
  const colors = useMemo(
    () => [
      new THREE.Color(COLORS.softPink),
      new THREE.Color(COLORS.cream),
      new THREE.Color(COLORS.blushPink),
      new THREE.Color(COLORS.softPink),
      new THREE.Color(COLORS.cream),
    ],
    []
  );

  // Set initial instance colors on mount
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.elapsedTime;

    for (let i = 0; i < BALL_COUNT; i++) {
      const [x, y, z] = positions[i];

      // Each ball gets a slightly longer period to keep things varied but always >= 4s
      const period = MIN_PERIOD + i * 0.5;
      const freq = (2 * Math.PI) / period;

      // Amplitude chosen so max combined velocity = sqrt(ampX²+ampY²)*freq <= 0.5
      // With ampX=0.22, ampY=0.18, freq=2π/4≈1.57: sqrt(0.22²+0.18²)*1.57 ≈ 0.446 < 0.5 ✓
      const ampX = 0.22;
      const ampY = 0.18;

      dummy.position.set(
        x + Math.sin(t * freq) * ampX,
        y + Math.cos(t * freq + i) * ampY,
        z
      );
      dummy.rotation.set(t * 0.1, t * 0.15 + i * 0.5, 0);
      dummy.scale.setScalar(0.3 + i * 0.05);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Set per-instance color
      mesh.setColorAt(i, colors[i]);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BALL_COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        vertexColors
        roughness={0.85}
        metalness={0}
      />
    </instancedMesh>
  );
}
