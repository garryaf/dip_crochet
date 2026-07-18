'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CloudData {
  position: [number, number, number];
  scale: number;
  speed: number;
}

const clouds: CloudData[] = [
  { position: [-4, 3, -5], scale: 1.5, speed: 0.02 },
  { position: [2, 3.5, -6], scale: 2, speed: 0.015 },
  { position: [5, 2.5, -4], scale: 1.2, speed: 0.025 },
  { position: [-1, 4, -7], scale: 1.8, speed: 0.018 },
];

/**
 * Volumetric cloud meshes (≥3 instances) with gentle horizontal drift animation.
 * Each cloud is composed of overlapping semi-transparent spheres to create
 * a soft, volumetric appearance. Positioned in the upper portion of the scene.
 */
export function Clouds() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const t = clock.elapsedTime;

    group.children.forEach((child, i) => {
      const cloud = clouds[i];
      if (!cloud) return;
      // Gentle horizontal drift using sine wave
      child.position.x = cloud.position[0] + Math.sin(t * cloud.speed) * 2;
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <group key={i} position={cloud.position} scale={cloud.scale}>
          {/* Multiple overlapping spheres create a volumetric cloud shape */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.8, 0.2, 0]}>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.6, 0.1, 0.3]}>
            <sphereGeometry args={[0.7, 8, 8]} />
            <meshStandardMaterial color="#FFFDD0" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
