"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight, X } from "lucide-react";
import { useIntroState } from "../hooks/useIntroState";

// ============================================
// MOUSE PARALLAX SYSTEM
// ============================================

function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Range: -30 to +30 pixels movement
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return { smoothX, smoothY };
}

// Camera that reacts to mouse
function ParallaxCamera() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2.0;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.05;
    camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// 3D ELEMENTS — Premium, slow, elegant
// ============================================

function SoftYarnBall({ position, color, size = 0.2, speed = 0.4, layer = 0 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  layer?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.2;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <Float speed={0.5} floatIntensity={0.1} rotationIntensity={0.05}>
      <group ref={ref} position={position}>
        {/* Main sphere */}
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
        </mesh>
        {/* Yarn wrap rings for texture */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[size * 0.9, size * 0.08, 8, 32]} />
          <meshStandardMaterial color={color} roughness={1} transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[size * 0.85, size * 0.06, 8, 32]} />
          <meshStandardMaterial color={color} roughness={1} transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrb({ position, color, size = 0.08 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = size * (0.7 + Math.sin(t * 2 + position[0]) * 0.3);
    ref.current.scale.setScalar(s / size);
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0] * 2) * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function ElegantBunny() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -0.6 + Math.sin(t * 0.8) * 0.08;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <Float speed={0.6} floatIntensity={0.08}>
      <group ref={ref} position={[-2.8, -0.6, 0.5]} scale={0.65}>
        {/* Body */}
        <mesh><sphereGeometry args={[0.42, 20, 20]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
        {/* Head */}
        <mesh position={[0, 0.58, 0.05]}><sphereGeometry args={[0.35, 20, 20]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
        {/* Ears */}
        <mesh position={[-0.13, 1.08, 0]} rotation={[0.1, 0, 0.08]}><capsuleGeometry args={[0.065, 0.32, 4, 10]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
        <mesh position={[0.13, 1.08, 0]} rotation={[0.1, 0, -0.08]}><capsuleGeometry args={[0.065, 0.32, 4, 10]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
        {/* Inner ears */}
        <mesh position={[-0.13, 1.08, 0.04]} rotation={[0.1, 0, 0.08]}><capsuleGeometry args={[0.035, 0.2, 4, 8]} /><meshStandardMaterial color="#ffb5c2" roughness={0.95} /></mesh>
        <mesh position={[0.13, 1.08, 0.04]} rotation={[0.1, 0, -0.08]}><capsuleGeometry args={[0.035, 0.2, 4, 8]} /><meshStandardMaterial color="#ffb5c2" roughness={0.95} /></mesh>
        {/* Eyes */}
        <mesh position={[-0.11, 0.63, 0.3]}><sphereGeometry args={[0.05, 10, 10]} /><meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.3} /></mesh>
        <mesh position={[0.11, 0.63, 0.3]}><sphereGeometry args={[0.05, 10, 10]} /><meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.3} /></mesh>
        {/* Eye highlights */}
        <mesh position={[-0.09, 0.65, 0.34]}><sphereGeometry args={[0.015, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        <mesh position={[0.13, 0.65, 0.34]}><sphereGeometry args={[0.015, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        {/* Nose */}
        <mesh position={[0, 0.5, 0.33]}><sphereGeometry args={[0.028, 8, 8]} /><meshStandardMaterial color="#ff6b9d" roughness={0.7} /></mesh>
        {/* Blush */}
        <mesh position={[-0.2, 0.5, 0.24]}><sphereGeometry args={[0.055, 8, 8]} /><meshStandardMaterial color="#ff6b9d" transparent opacity={0.25} /></mesh>
        <mesh position={[0.2, 0.5, 0.24]}><sphereGeometry args={[0.055, 8, 8]} /><meshStandardMaterial color="#ff6b9d" transparent opacity={0.25} /></mesh>
        {/* Arms */}
        <mesh position={[-0.32, 0.1, 0.15]} rotation={[0, 0, 0.4]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
        <mesh position={[0.32, 0.1, 0.15]} rotation={[0, 0, -0.4]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#ff8fb1" roughness={0.95} /></mesh>
      </group>
    </Float>
  );
}

function ElegantDuck() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -0.7 + Math.sin(t * 0.9 + 1) * 0.07;
    ref.current.rotation.y = Math.sin(t * 0.35 + 1) * 0.12;
  });

  return (
    <Float speed={0.5} floatIntensity={0.06}>
      <group ref={ref} position={[2.8, -0.7, 0.5]} scale={0.6}>
        {/* Body */}
        <mesh><sphereGeometry args={[0.4, 20, 20]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
        {/* Head */}
        <mesh position={[0, 0.52, 0.08]}><sphereGeometry args={[0.3, 20, 20]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
        {/* Beak */}
        <mesh position={[0, 0.42, 0.32]} rotation={[0.2, 0, 0]}><capsuleGeometry args={[0.05, 0.08, 4, 8]} /><meshStandardMaterial color="#FF8C00" roughness={0.6} /></mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 0.57, 0.25]}><sphereGeometry args={[0.04, 10, 10]} /><meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.3} /></mesh>
        <mesh position={[0.1, 0.57, 0.25]}><sphereGeometry args={[0.04, 10, 10]} /><meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.3} /></mesh>
        {/* Eye highlights */}
        <mesh position={[-0.08, 0.59, 0.28]}><sphereGeometry args={[0.012, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        <mesh position={[0.12, 0.59, 0.28]}><sphereGeometry args={[0.012, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        {/* Blush */}
        <mesh position={[-0.16, 0.45, 0.2]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#ffaa00" transparent opacity={0.35} /></mesh>
        <mesh position={[0.16, 0.45, 0.2]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#ffaa00" transparent opacity={0.35} /></mesh>
        {/* Wings */}
        <mesh position={[-0.35, 0.05, 0]} rotation={[0, 0, 0.3]} scale={[0.6, 1, 0.4]}><sphereGeometry args={[0.2, 10, 10]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
        <mesh position={[0.35, 0.05, 0]} rotation={[0, 0, -0.3]} scale={[0.6, 1, 0.4]}><sphereGeometry args={[0.2, 10, 10]} /><meshStandardMaterial color="#ffca3a" roughness={0.95} /></mesh>
      </group>
    </Float>
  );
}

function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.5} color="#fffbf9" />
      <hemisphereLight intensity={0.3} groundColor="#f9d8d6" color="#ffffff" />
      {/* Key light — warm */}
      <directionalLight position={[4, 6, 4]} intensity={0.9} color="#fff5f0" />
      {/* Fill — pink accent */}
      <pointLight position={[-4, 2, 3]} intensity={0.4} color="#ff8fb1" distance={10} />
      {/* Rim — mint accent */}
      <pointLight position={[4, -1, -2]} intensity={0.3} color="#6ebfb5" distance={8} />
      {/* Top glow */}
      <pointLight position={[0, 4, 2]} intensity={0.2} color="#FFD700" distance={6} />
    </>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <CinematicLighting />
      <ParallaxCamera />

      {/* Characters */}
      <ElegantBunny />
      <ElegantDuck />

      {/* Yarn balls — layered depth */}
      <SoftYarnBall position={[-1.5, 1.4, -1]} color="#ff8fb1" size={0.22} speed={0.35} />
      <SoftYarnBall position={[1.6, 1.2, -0.5]} color="#6ebfb5" size={0.18} speed={0.45} />
      <SoftYarnBall position={[0.3, 1.8, -1.5]} color="#ffca3a" size={0.14} speed={0.5} />
      <SoftYarnBall position={[-0.8, -1.5, -0.8]} color="#E8B4D8" size={0.16} speed={0.3} />
      <SoftYarnBall position={[1.0, -1.3, -1.2]} color="#A4BE7B" size={0.13} speed={0.4} />

      {/* Glow orbs — soft ambient particles */}
      <GlowOrb position={[-1.8, 0.8, 1]} color="#ff8fb1" size={0.05} />
      <GlowOrb position={[1.5, 1.5, 0.8]} color="#6ebfb5" size={0.04} />
      <GlowOrb position={[-0.5, 1.8, 0.5]} color="#FFD700" size={0.035} />
      <GlowOrb position={[2.0, 0.2, 1.2]} color="#ff8fb1" size={0.04} />
      <GlowOrb position={[-2.2, -0.5, 0.8]} color="#E8B4D8" size={0.045} />
      <GlowOrb position={[0.8, -1.0, 1.5]} color="#ffca3a" size={0.03} />

      {!isMobile && (
        <>
          <SoftYarnBall position={[-2.8, 0.2, -2]} color="#B4E4FF" size={0.11} speed={0.25} />
          <SoftYarnBall position={[2.5, -0.8, -1.8]} color="#F5C6AA" size={0.12} speed={0.35} />
          <GlowOrb position={[-1.0, -1.5, 1.0]} color="#6ebfb5" size={0.03} />
          <GlowOrb position={[2.5, 1.0, 0.5]} color="#FFD700" size={0.035} />
        </>
      )}
    </>
  );
}

// ============================================
// MAIN OVERLAY
// ============================================

export default function IntroOverlay() {
  const { showIntro, dismissIntro, isReady } = useIntroState();
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { smoothX, smoothY } = useMouseParallax();

  // Tilt values (smaller range for rotation: -5deg to +5deg)
  const tiltX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const timer = setTimeout(() => setShowContent(true), 1500);

    // Tilt listener
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -8; // -4 to +4 degrees
      const y = (e.clientY / window.innerHeight - 0.5) * 6;  // -3 to +3 degrees
      tiltX.set(y); // rotateX based on Y mouse
      tiltY.set(-x); // rotateY based on X mouse (inverted for natural feel)
    };
    window.addEventListener("mousemove", handleMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [tiltX, tiltY]);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => dismissIntro(), 900);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 25% 15%, rgba(255,143,177,0.1) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(110,191,181,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,240,243,0.5) 0%, transparent 70%), #fffbf9",
          }}
          role="dialog"
          aria-label="Welcome to dip.crochet"
        >
          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary font-medium text-xs uppercase tracking-widest transition-all"
          >
            Skip <X className="w-3.5 h-3.5" />
          </motion.button>

          {/* 3D CANVAS — full screen */}
          <div className="absolute inset-0 z-[2]">
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 42 }}
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, alpha: true }}
              dpr={isMobile ? [1, 1] : [1, 1.5]}
            >
              <Suspense fallback={null}>
                <Scene isMobile={isMobile} />
              </Suspense>
            </Canvas>
          </div>

          {/* PARALLAX HTML LAYERS — react to mouse */}
          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none">
            {/* Brand name — parallax layer 1 (subtle movement) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                x: smoothX,
                y: smoothY,
                rotateX: tiltX,
                rotateY: tiltY,
                perspective: 1000,
              }}
              className="relative"
            >
              <h1
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter select-none leading-none"
                style={{
                  textShadow: "0 8px 40px rgba(255,143,177,0.12), 0 2px 10px rgba(74,58,53,0.06)",
                }}
              >
                <span className="text-[#4a3a35]">dip</span>
                <span className="text-primary text-[1.1em]">.</span>
                <span className="text-primary italic font-light">crochet</span>
              </h1>

              {/* Subtle underline accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-4 mx-auto w-3/4 origin-center"
              />
            </motion.div>

            {/* Tagline + CTA */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-6 mt-8 md:mt-10 pointer-events-auto"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-base md:text-lg text-muted-foreground font-medium text-center max-w-md leading-relaxed"
                  >
                    Every stitch tells a story.<br />
                    <span className="text-primary font-bold">Handmade with soul</span>, for yours.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDismiss}
                    className="group px-10 py-4 md:px-14 md:py-5 bg-primary text-white font-black rounded-2xl shadow-[0_20px_50px_-12px_rgba(255,143,177,0.4)] flex items-center gap-3 text-sm uppercase tracking-widest hover:shadow-[0_25px_60px_-10px_rgba(255,143,177,0.5)] transition-all duration-300"
                  >
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mt-3"
                  >
                    Bekasi, Indonesia ✦ Since 2023
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
