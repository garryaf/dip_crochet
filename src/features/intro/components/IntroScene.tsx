"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Center, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Intro Scene — "dip.crochet" as premium 3D text centerpiece.
 * Uses drei Text (SDF-based) for reliable cross-platform rendering.
 * No external font file needed — uses system font rendering.
 */

function BrandText() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle breathing animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* "dip" — dark warm brown */}
        <Text
          position={[-1.95, 0.1, 0]}
          fontSize={1.4}
          color="#4a3a35"
          anchorX="right"
          anchorY="middle"
          letterSpacing={-0.05}
          fontWeight={900}
        >
          dip
          <meshStandardMaterial
            color="#4a3a35"
            roughness={0.8}
            metalness={0}
          />
        </Text>

        {/* "." — primary pink, slightly larger for emphasis */}
        <Text
          position={[-1.6, 0.1, 0.02]}
          fontSize={1.6}
          color="#ff8fb1"
          anchorX="center"
          anchorY="middle"
        >
          .
          <meshStandardMaterial
            color="#ff8fb1"
            roughness={0.4}
            metalness={0.1}
            emissive="#ff8fb1"
            emissiveIntensity={0.15}
          />
        </Text>

        {/* "crochet" — primary pink */}
        <Text
          position={[-1.2, 0.1, 0]}
          fontSize={1.4}
          color="#ff8fb1"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.03}
          fontStyle="italic"
        >
          crochet
          <meshStandardMaterial
            color="#ff8fb1"
            roughness={0.85}
            metalness={0}
          />
        </Text>

        {/* Subtle tagline below */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.22}
          color="#8a7a76"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          PREMIUM HANDMADE CROCHET
          <meshStandardMaterial color="#8a7a76" roughness={1} metalness={0} />
        </Text>
      </group>
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} color="#fffbf9" />
      <hemisphereLight intensity={0.4} groundColor="#f9d8d6" color="#ffffff" />
      <spotLight
        position={[5, 8, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1.0}
        color="#ffffff"
      />
      <pointLight position={[-4, 2, -3]} intensity={0.3} color="#ff8fb1" />
      <pointLight position={[4, -2, 3]} intensity={0.2} color="#6ebfb5" />
    </>
  );
}

// Decorative floating spheres (yarn balls)
function FloatingYarnBalls() {
  const positions: [number, number, number][] = [
    [-3.5, 1.5, -2],
    [3.8, -1.2, -1.5],
    [-2.5, -2, -3],
    [2.8, 2.2, -2.5],
    [0, -2.5, -2],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={0.8 + i * 0.2} floatIntensity={0.3} rotationIntensity={0.2}>
          <mesh position={pos}>
            <sphereGeometry args={[0.12 + i * 0.03, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff8fb1" : "#6ebfb5"}
              roughness={0.9}
              metalness={0}
              transparent
              opacity={0.25 + i * 0.05}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

interface IntroSceneProps {
  quality?: "high" | "low";
}

export default function IntroScene({ quality = "high" }: IntroSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{
          antialias: quality === "high",
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: quality === "high" ? "high-performance" : "low-power",
        }}
        dpr={quality === "high" ? [1, 2] : [1, 1]}
      >
        <SceneLighting />

        <Suspense fallback={null}>
          <BrandText />
          {quality === "high" && <FloatingYarnBalls />}
        </Suspense>
      </Canvas>
    </div>
  );
}
