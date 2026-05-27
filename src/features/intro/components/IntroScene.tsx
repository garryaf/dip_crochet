"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Intro Scene — "dip.crochet" as premium floating text.
 * Uses drei Text (troika SDF) — no external font file needed.
 * The `color` prop on Text handles material internally.
 */

function BrandText() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Full brand name as single Text for reliable rendering */}
        <Text
          position={[0, 0.2, 0]}
          fontSize={1.3}
          color="#4a3a35"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.02}
          fontWeight={900}
          maxWidth={10}
        >
          {"dip.crochet"}
        </Text>

        {/* Overlay the dot with pink color */}
        <Text
          position={[-0.18, 0.2, 0.01]}
          fontSize={1.3}
          color="#ff8fb1"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          {"   .       "}
        </Text>

        {/* Tagline below */}
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.18}
          color="#8a7a76"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
          fontWeight={700}
        >
          PREMIUM HANDMADE CROCHET
        </Text>
      </group>
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.8} color="#fffbf9" />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.4} color="#ff8fb1" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#6ebfb5" />
    </>
  );
}

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
            <sphereGeometry args={[0.1 + i * 0.02, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff8fb1" : "#6ebfb5"}
              roughness={0.9}
              metalness={0}
              transparent
              opacity={0.3 + i * 0.05}
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
        camera={{ position: [0, 0, 6], fov: 42 }}
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
