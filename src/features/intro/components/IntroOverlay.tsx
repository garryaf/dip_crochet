"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight, X } from "lucide-react";
import { useIntroState } from "../hooks/useIntroState";

// ============================================
// 3D ELEMENTS — All inline for reliability
// ============================================

function BouncyYarnBall({ position, color, size = 0.25, speed = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const startY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = startY + Math.abs(Math.sin(t * 1.2)) * 0.5;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial color={color} roughness={0.92} metalness={0} />
    </mesh>
  );
}

function PulsatingHeart({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.25;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.2;
    const s = 1 + Math.sin(t * 3) * 0.15;
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref} position={position} scale={0.8}>
      <mesh position={[-0.07, 0.04, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0.07, 0.04, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.12, 0.12, 0.09]} />
        <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function TwinkleStar({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.rotation.y = t * 2;
    ref.current.rotation.z = t * 1.5;
    const s = 0.3 + Math.abs(Math.sin(t * 2.5)) * 0.7;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} roughness={0.1} metalness={0.5} />
    </mesh>
  );
}

function CuteBunny() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -0.8 + Math.sin(t * 1.8) * 0.15;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    ref.current.rotation.z = Math.sin(t * 0.9) * 0.05;
  });

  return (
    <group ref={ref} position={[-2.2, -0.8, 1]} scale={0.55}>
      <mesh><sphereGeometry args={[0.4, 16, 16]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
      <mesh position={[0, 0.55, 0]}><sphereGeometry args={[0.33, 16, 16]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
      <mesh position={[-0.12, 1.0, 0]} rotation={[0, 0, 0.1]}><capsuleGeometry args={[0.07, 0.28, 4, 8]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
      <mesh position={[0.12, 1.0, 0]} rotation={[0, 0, -0.1]}><capsuleGeometry args={[0.07, 0.28, 4, 8]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
      <mesh position={[-0.11, 0.6, 0.28]}><sphereGeometry args={[0.045, 8, 8]} /><meshStandardMaterial color="#111" roughness={0.1} /></mesh>
      <mesh position={[0.11, 0.6, 0.28]}><sphereGeometry args={[0.045, 8, 8]} /><meshStandardMaterial color="#111" roughness={0.1} /></mesh>
      <mesh position={[0, 0.47, 0.3]}><sphereGeometry args={[0.03, 8, 8]} /><meshStandardMaterial color="#ffb5c2" roughness={0.8} /></mesh>
      <mesh position={[-0.2, 0.47, 0.22]}><sphereGeometry args={[0.06, 8, 8]} /><meshStandardMaterial color="#ff6b9d" transparent opacity={0.35} /></mesh>
      <mesh position={[0.2, 0.47, 0.22]}><sphereGeometry args={[0.06, 8, 8]} /><meshStandardMaterial color="#ff6b9d" transparent opacity={0.35} /></mesh>
    </group>
  );
}

function CuteDuck() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -0.9 + Math.sin(t * 2.0 + 1) * 0.12;
    ref.current.rotation.y = Math.sin(t * 0.6 + 2) * 0.25;
  });

  return (
    <group ref={ref} position={[2.2, -0.9, 1]} scale={0.5}>
      <mesh><sphereGeometry args={[0.38, 16, 16]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
      <mesh position={[0, 0.5, 0.05]}><sphereGeometry args={[0.28, 16, 16]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
      <mesh position={[0, 0.4, 0.28]} rotation={[0.3, 0, 0]}><coneGeometry args={[0.07, 0.14, 8]} /><meshStandardMaterial color="#FF8C00" roughness={0.6} /></mesh>
      <mesh position={[-0.09, 0.55, 0.22]}><sphereGeometry args={[0.035, 8, 8]} /><meshStandardMaterial color="#111" roughness={0.1} /></mesh>
      <mesh position={[0.09, 0.55, 0.22]}><sphereGeometry args={[0.035, 8, 8]} /><meshStandardMaterial color="#111" roughness={0.1} /></mesh>
      <mesh position={[-0.16, 0.42, 0.18]}><sphereGeometry args={[0.045, 8, 8]} /><meshStandardMaterial color="#ffaa00" transparent opacity={0.4} /></mesh>
      <mesh position={[0.16, 0.42, 0.18]}><sphereGeometry args={[0.045, 8, 8]} /><meshStandardMaterial color="#ffaa00" transparent opacity={0.4} /></mesh>
    </group>
  );
}

function SwingingHook() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.2 - 0.3;
  });

  return (
    <group ref={ref} position={[0, 1.8, -0.5]} rotation={[0, 0, -0.3]}>
      <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.03, 0.04, 0.9, 8]} /><meshStandardMaterial color="#DEB887" roughness={0.6} /></mesh>
      <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0]}><torusGeometry args={[0.06, 0.02, 8, 12, Math.PI]} /><meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.7} /></mesh>
    </group>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.7} color="#fffbf9" />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#ff8fb1" />
      <pointLight position={[3, -1, 3]} intensity={0.3} color="#6ebfb5" />

      <CuteBunny />
      <CuteDuck />
      <SwingingHook />

      <BouncyYarnBall position={[-1.2, 1.2, 0]} color="#ff8fb1" size={0.2} speed={0.9} />
      <BouncyYarnBall position={[1.4, 1.0, 0.3]} color="#6ebfb5" size={0.18} speed={1.1} />
      <BouncyYarnBall position={[0, 1.6, -0.5]} color="#ffca3a" size={0.15} speed={1.3} />

      <PulsatingHeart position={[-1.5, 0.5, 0.8]} delay={0} />
      <PulsatingHeart position={[1.6, 0.7, 0.5]} delay={1.5} />

      <TwinkleStar position={[-0.8, 1.5, 0.5]} delay={0} />
      <TwinkleStar position={[1.0, 1.7, 0.3]} delay={0.8} />
      <TwinkleStar position={[0.3, 2.0, 0]} delay={1.6} />
      <TwinkleStar position={[-1.8, 0.2, 0.6]} delay={2.2} />

      {!isMobile && (
        <>
          <BouncyYarnBall position={[-2.5, 0.3, -1]} color="#E8B4D8" size={0.13} speed={0.7} />
          <BouncyYarnBall position={[2.3, -0.3, -0.8]} color="#A4BE7B" size={0.14} speed={0.8} />
          <TwinkleStar position={[2.0, 0.3, 0.8]} delay={3} />
          <PulsatingHeart position={[0, 1.8, 0.3]} delay={3} />
        </>
      )}
    </>
  );
}

// ============================================
// MAIN OVERLAY COMPONENT
// ============================================

export default function IntroOverlay() {
  const { showIntro, dismissIntro, isReady } = useIntroState();
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => dismissIntro(), 800);
  }, [dismissIntro]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") handleDismiss();
    };
    if (showIntro) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [showIntro, handleDismiss]);

  if (!isReady || !showIntro) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-[#fffbf9] flex flex-col items-center justify-center overflow-hidden"
          role="dialog"
          aria-label="Welcome to dip.crochet"
        >
          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Skip <X className="w-4 h-4" />
          </motion.button>

          {/* FULL SCREEN 3D CANVAS — this is the main visual */}
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
              dpr={isMobile ? [1, 1] : [1, 1.5]}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={null}>
                <Scene isMobile={isMobile} />
              </Suspense>
            </Canvas>
          </div>

          {/* Brand text + CTA — on top of 3D */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 pointer-events-none">
            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight select-none"
              style={{ textShadow: "0 4px 30px rgba(255,143,177,0.15)" }}
            >
              <span className="text-[#4a3a35]">dip</span>
              <span className="text-primary">.</span>
              <span className="text-primary italic font-light">crochet</span>
            </motion.h1>

            {/* Tagline + CTA */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-5 pointer-events-auto"
                >
                  <p className="text-base md:text-lg text-muted-foreground font-medium text-center max-w-sm">
                    Every stitch tells a story.<br />
                    <span className="text-primary font-bold">Handmade with soul</span>, for yours.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDismiss}
                    className="group px-10 py-4 md:px-12 md:py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 text-sm uppercase tracking-widest hover:shadow-primary/50 transition-shadow"
                  >
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.3em] mt-2">
                    Bekasi, Indonesia ✦ Since 2023
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
