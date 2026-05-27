"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Cute animated 3D scene with floating yarn balls, a crochet hook,
 * and a bouncy plush bunny silhouette — all procedural, no external assets.
 */

// Bouncy yarn ball with stitch texture
function YarnBall({ position, color, size = 0.3, speed = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    // Bouncy motion
    meshRef.current.position.y = startY + Math.abs(Math.sin(t * 1.5)) * 0.4;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        roughness={0.95}
        metalness={0}
      />
      {/* Yarn wrap lines */}
      <mesh>
        <torusGeometry args={[size * 0.85, size * 0.06, 8, 24]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 0.8, size * 0.05, 8, 24]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[size * 0.75, size * 0.04, 8, 24]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
    </mesh>
  );
}

// Cute floating heart
function FloatingHeart({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + delay;
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.3;
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    groupRef.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.1); // pulse
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Heart shape from two spheres + cone */}
      <mesh position={[-0.06, 0.03, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ff8fb1" roughness={0.6} emissive="#ff8fb1" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.06, 0.03, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ff8fb1" roughness={0.6} emissive="#ff8fb1" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, -0.04, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.08]} />
        <meshStandardMaterial color="#ff8fb1" roughness={0.6} emissive="#ff8fb1" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Crochet hook swinging gently
function CrochetHook() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.15 - 0.3;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <group ref={groupRef} position={[2.8, 1.2, -1]} rotation={[0, 0, -0.3]}>
      {/* Handle */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 1.2, 12]} />
        <meshStandardMaterial color="#DEB887" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Hook tip */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.08, 0.025, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Grip rings */}
      {[-0.3, -0.5, -0.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.055, 0.015, 8, 16]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#ff8fb1" : "#6ebfb5"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Tiny floating stars/sparkles
function Sparkle({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    meshRef.current.rotation.z = t * 2;
    const scale = 0.5 + Math.sin(t * 3) * 0.5;
    meshRef.current.scale.setScalar(Math.max(0.1, scale));
    meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

// Mini plush bunny (cute mascot)
function MiniBunny() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = -1.2 + Math.sin(t * 1.5) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    // Cute tilt
    groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.05;
  });

  return (
    <Float speed={1.5} floatIntensity={0.2}>
      <group ref={groupRef} position={[-2.5, -1.2, 0]} scale={0.7}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshStandardMaterial color="#ff8fb1" roughness={0.95} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.35, 20, 20]} />
          <meshStandardMaterial color="#ff8fb1" roughness={0.95} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.12, 1.05, 0]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
          <meshStandardMaterial color="#ff8fb1" roughness={0.95} />
        </mesh>
        <mesh position={[0.12, 1.05, 0]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
          <meshStandardMaterial color="#ff8fb1" roughness={0.95} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.12, 0.6, 0.3]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
        </mesh>
        <mesh position={[0.12, 0.6, 0.3]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.48, 0.33]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffb5c2" roughness={0.8} />
        </mesh>
        {/* Blush cheeks */}
        <mesh position={[-0.2, 0.48, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ff6b9d" roughness={1} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.2, 0.48, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ff6b9d" roughness={1} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Mini duck on the other side
function MiniDuck() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = -1.3 + Math.sin(t * 1.8 + 1) * 0.12;
    groupRef.current.rotation.y = Math.sin(t * 0.5 + 2) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.9) * 0.04;
  });

  return (
    <Float speed={1.2} floatIntensity={0.15}>
      <group ref={groupRef} position={[2.5, -1.3, 0.5]} scale={0.6}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.38, 20, 20]} />
          <meshStandardMaterial color="#ffca3a" roughness={0.95} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.5, 0.05]}>
          <sphereGeometry args={[0.28, 20, 20]} />
          <meshStandardMaterial color="#ffca3a" roughness={0.95} />
        </mesh>
        {/* Beak */}
        <mesh position={[0, 0.42, 0.3]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color="#FF8C00" roughness={0.7} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 0.55, 0.22]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
        </mesh>
        <mesh position={[0.1, 0.55, 0.22]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
        </mesh>
        {/* Blush */}
        <mesh position={[-0.17, 0.43, 0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffaa00" roughness={1} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0.17, 0.43, 0.2]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffaa00" roughness={1} transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} color="#fffbf9" />
      <hemisphereLight intensity={0.4} groundColor="#f9d8d6" color="#ffffff" />
      <directionalLight position={[3, 5, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#ff8fb1" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#6ebfb5" />
      <pointLight position={[0, 3, 2]} intensity={0.2} color="#FFD700" />
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
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: quality === "high",
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: quality === "high" ? "high-performance" : "low-power",
        }}
        dpr={quality === "high" ? [1, 1.5] : [1, 1]}
      >
        <SceneLighting />
        <Suspense fallback={null}>
          {/* Cute mascots on each side */}
          <MiniBunny />
          <MiniDuck />

          {/* Floating yarn balls */}
          <YarnBall position={[-1.5, 1.8, -1]} color="#ff8fb1" size={0.2} speed={0.8} />
          <YarnBall position={[1.8, 1.5, -0.5]} color="#6ebfb5" size={0.18} speed={1.1} />
          <YarnBall position={[0, 2.2, -1.5]} color="#ffca3a" size={0.15} speed={0.9} />
          {quality === "high" && (
            <>
              <YarnBall position={[-2.8, 0.5, -2]} color="#E8B4D8" size={0.12} speed={1.3} />
              <YarnBall position={[2.5, -0.5, -1.8]} color="#A4BE7B" size={0.14} speed={0.7} />
            </>
          )}

          {/* Crochet hook */}
          <CrochetHook />

          {/* Floating hearts */}
          <FloatingHeart position={[-1.8, 0.8, 0.5]} delay={0} />
          <FloatingHeart position={[1.5, 1.0, 0.3]} delay={1.5} />
          {quality === "high" && (
            <FloatingHeart position={[0.5, 1.8, -0.5]} delay={3} />
          )}

          {/* Sparkles */}
          <Sparkle position={[-1.0, 1.5, 0.5]} delay={0} />
          <Sparkle position={[1.2, 1.8, 0.3]} delay={1} />
          <Sparkle position={[0, 2.0, 0]} delay={2} />
          <Sparkle position={[-2.0, 0.3, 0.8]} delay={0.5} />
          <Sparkle position={[2.2, 0.5, 0.5]} delay={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
