'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { COLORS } from '../utils/constants';

/**
 * CinematicLighting sets up warm sunset-tone lighting, fog, and a pink sky background
 * for the birthday intro 3D scene.
 */
export function CinematicLighting() {
  const { scene } = useThree();

  useEffect(() => {
    // Set background to blush pink sky tone
    scene.background = new THREE.Color(COLORS.blushPink);
    // Atmospheric fog for depth — matches background color for seamless fade
    scene.fog = new THREE.Fog(COLORS.blushPink, 5, 30);

    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      {/* Warm ambient light for overall soft illumination */}
      <ambientLight intensity={0.6} color={COLORS.softPink} />

      {/* Main directional light (sunset angle) with soft shadows */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#FFD700"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-bias={-0.001}
      />

      {/* Fill light from opposite side for subtle purple accent */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.4}
        color={COLORS.softPurple}
      />

      {/* Soft point light for bloom-like glow effect */}
      <pointLight
        position={[0, 3, 2]}
        intensity={0.8}
        color={COLORS.softPink}
        distance={15}
        decay={2}
      />
    </>
  );
}
