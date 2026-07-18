'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BirthdayPhase } from '../types';

// ─── Constants ─────────────────────────────────────────────────────────────────

const MAX_VELOCITY = 0.5; // units/sec
const MIN_OSCILLATION_PERIOD = 4; // seconds (frequency <= 0.25 Hz)
const BOUNDS = { x: 6, y: 4, z: 3 };

// Base counts per type (desktop)
const BASE_COUNTS = {
  sakura: 15,
  hearts: 12,
  butterflies: 8,
  stars: 15,
  dust: 10,
} as const;

type ParticleType = keyof typeof BASE_COUNTS;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number; // oscillation phase offset
  frequency: number; // oscillation frequency (<=0.25 Hz)
  scale: number;
  rotationSpeed: number;
}

interface ParticleSystemProps {
  phase: BirthdayPhase;
  scrollProgress: number;
  isMobile: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function clampVelocity(v: THREE.Vector3): THREE.Vector3 {
  const speed = v.length();
  if (speed > MAX_VELOCITY) {
    v.multiplyScalar(MAX_VELOCITY / speed);
  }
  return v;
}

function wrapBounds(pos: THREE.Vector3): void {
  if (pos.x > BOUNDS.x) pos.x = -BOUNDS.x;
  if (pos.x < -BOUNDS.x) pos.x = BOUNDS.x;
  if (pos.y > BOUNDS.y) pos.y = -BOUNDS.y;
  if (pos.y < -BOUNDS.y) pos.y = BOUNDS.y;
  if (pos.z > BOUNDS.z) pos.z = -BOUNDS.z;
  if (pos.z < -BOUNDS.z) pos.z = BOUNDS.z;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticleData(count: number): ParticleData[] {
  const particles: ParticleData[] = [];
  for (let i = 0; i < count; i++) {
    // Max frequency = 1/MIN_OSCILLATION_PERIOD = 0.25 Hz
    const maxFreq = 1 / MIN_OSCILLATION_PERIOD;
    particles.push({
      position: new THREE.Vector3(
        randomInRange(-BOUNDS.x, BOUNDS.x),
        randomInRange(-BOUNDS.y, BOUNDS.y),
        randomInRange(-BOUNDS.z, BOUNDS.z),
      ),
      velocity: new THREE.Vector3(
        randomInRange(-0.2, 0.2),
        randomInRange(-0.1, 0.1),
        randomInRange(-0.1, 0.1),
      ),
      phase: randomInRange(0, Math.PI * 2),
      frequency: randomInRange(0.05, maxFreq),
      scale: randomInRange(0.6, 1.4),
      rotationSpeed: randomInRange(-0.3, 0.3),
    });
  }
  return particles;
}

// ─── Geometry Creators ─────────────────────────────────────────────────────────

function createSakuraGeometry(): THREE.BufferGeometry {
  // Flat petal shape (5 petals arranged in a circle)
  const shape = new THREE.Shape();
  const petals = 5;
  const radius = 0.08;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const nextAngle = ((i + 0.5) / petals) * Math.PI * 2;
    const midAngle = ((i + 0.25) / petals) * Math.PI * 2;
    if (i === 0) {
      shape.moveTo(0, 0);
    }
    shape.quadraticCurveTo(
      Math.cos(midAngle) * radius * 1.5,
      Math.sin(midAngle) * radius * 1.5,
      Math.cos(nextAngle) * radius,
      Math.sin(nextAngle) * radius,
    );
    shape.lineTo(
      Math.cos(angle + (Math.PI * 2) / petals) * radius * 0.3,
      Math.sin(angle + (Math.PI * 2) / petals) * radius * 0.3,
    );
  }
  const geometry = new THREE.ShapeGeometry(shape);
  return geometry;
}

function createHeartGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const s = 0.06;
  shape.moveTo(0, s * -0.5);
  shape.bezierCurveTo(s * 1, s * 1.5, s * 2, s * 0, 0, s * -1.5);
  shape.moveTo(0, s * -0.5);
  shape.bezierCurveTo(s * -1, s * 1.5, s * -2, s * 0, 0, s * -1.5);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  return geometry;
}

function createButterflyGeometry(): THREE.BufferGeometry {
  // Simple wing shape using two mirrored triangles
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.08, 0.1, 0.12, 0.04);
  shape.quadraticCurveTo(0.1, -0.02, 0.06, -0.06);
  shape.lineTo(0, 0);

  const shape2 = new THREE.Shape();
  shape2.moveTo(0, 0);
  shape2.quadraticCurveTo(-0.08, 0.1, -0.12, 0.04);
  shape2.quadraticCurveTo(-0.1, -0.02, -0.06, -0.06);
  shape2.lineTo(0, 0);

  const geom1 = new THREE.ShapeGeometry(shape);
  const geom2 = new THREE.ShapeGeometry(shape2);

  // Merge both wings
  const merged = new THREE.BufferGeometry();
  const positions1 = geom1.getAttribute('position').array;
  const positions2 = geom2.getAttribute('position').array;
  const allPositions = new Float32Array(positions1.length + positions2.length);
  allPositions.set(positions1, 0);
  allPositions.set(positions2, positions1.length);
  merged.setAttribute('position', new THREE.BufferAttribute(allPositions, 3));
  merged.computeVertexNormals();

  geom1.dispose();
  geom2.dispose();

  return merged;
}

function createStarGeometry(): THREE.BufferGeometry {
  // Small bright point (icosahedron for sparkle)
  return new THREE.IcosahedronGeometry(0.03, 0);
}

function createDustGeometry(): THREE.BufferGeometry {
  // Tiny glowing sphere
  return new THREE.SphereGeometry(0.015, 6, 6);
}

// ─── Particle Group Component ──────────────────────────────────────────────────

interface ParticleGroupProps {
  type: ParticleType;
  count: number;
  geometry: THREE.BufferGeometry;
  color: THREE.Color;
  emissive: THREE.Color;
  opacity: number;
}

function ParticleGroup({ type, count, geometry, color, emissive, opacity }: ParticleGroupProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particlesData = useMemo(() => createParticleData(count), [count]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta;
    const t = timeRef.current;

    for (let i = 0; i < particlesData.length; i++) {
      const p = particlesData[i];

      // Oscillation-based movement (period >= 4s guaranteed by frequency <= 0.25)
      const oscX = Math.sin(t * p.frequency * Math.PI * 2 + p.phase) * 0.3;
      const oscY = Math.cos(t * p.frequency * Math.PI * 2 + p.phase * 0.7) * 0.2;

      // Apply velocity (clamped to MAX_VELOCITY)
      clampVelocity(p.velocity);
      p.position.x += p.velocity.x * delta + oscX * delta;
      p.position.y += p.velocity.y * delta + oscY * delta;
      p.position.z += p.velocity.z * delta;

      // Ensure within frustum bounds
      wrapBounds(p.position);

      // Set transform
      dummy.position.copy(p.position);
      dummy.rotation.x += p.rotationSpeed * delta;
      dummy.rotation.y += p.rotationSpeed * delta * 0.7;
      dummy.rotation.z += p.rotationSpeed * delta * 0.5;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─── Main ParticleSystem Component ─────────────────────────────────────────────

export function ParticleSystem({ phase, scrollProgress, isMobile }: ParticleSystemProps) {
  // Calculate counts based on device and phase
  const counts = useMemo(() => {
    const multiplier = isMobile ? 0.5 : 1;
    const phaseBoost = phase === 'text' ? 1.5 : 1;

    const computeCount = (base: number) => {
      const raw = Math.round(base * multiplier * phaseBoost);
      return Math.max(3, raw); // Ensure at least 3 per type
    };

    const result = {
      sakura: computeCount(BASE_COUNTS.sakura),
      hearts: computeCount(BASE_COUNTS.hearts),
      butterflies: computeCount(BASE_COUNTS.butterflies),
      stars: computeCount(BASE_COUNTS.stars),
      dust: computeCount(BASE_COUNTS.dust),
    };

    // Ensure minimum 20 total on mobile
    if (isMobile) {
      const total = Object.values(result).reduce((a, b) => a + b, 0);
      if (total < 20) {
        // Distribute evenly to meet minimum
        const deficit = 20 - total;
        const perType = Math.ceil(deficit / 5);
        result.sakura += perType;
        result.hearts += perType;
        result.butterflies += perType;
        result.stars += perType;
        result.dust += perType;
      }
    }

    return result;
  }, [isMobile, phase]);

  // Create geometries (memoized, disposed when component unmounts)
  const geometries = useMemo(() => ({
    sakura: createSakuraGeometry(),
    hearts: createHeartGeometry(),
    butterflies: createButterflyGeometry(),
    stars: createStarGeometry(),
    dust: createDustGeometry(),
  }), []);

  // Colors per particle type
  const colors = useMemo(() => ({
    sakura: { color: new THREE.Color('#FFB6C1'), emissive: new THREE.Color('#FF69B4') },
    hearts: { color: new THREE.Color('#FF69B4'), emissive: new THREE.Color('#FFB6C1') },
    butterflies: { color: new THREE.Color('#E6E6FA'), emissive: new THREE.Color('#DDA0DD') },
    stars: { color: new THREE.Color('#FFFDD0'), emissive: new THREE.Color('#FFD700') },
    dust: { color: new THREE.Color('#FFFFFF'), emissive: new THREE.Color('#FFE4E1') },
  }), []);

  // Opacity based on scroll progress for fade effect
  const baseOpacity = phase === 'loading' ? 0 : Math.min(1, scrollProgress * 3 + 0.6);

  return (
    <group>
      <ParticleGroup
        type="sakura"
        count={counts.sakura}
        geometry={geometries.sakura}
        color={colors.sakura.color}
        emissive={colors.sakura.emissive}
        opacity={baseOpacity * 0.8}
      />
      <ParticleGroup
        type="hearts"
        count={counts.hearts}
        geometry={geometries.hearts}
        color={colors.hearts.color}
        emissive={colors.hearts.emissive}
        opacity={baseOpacity * 0.7}
      />
      <ParticleGroup
        type="butterflies"
        count={counts.butterflies}
        geometry={geometries.butterflies}
        color={colors.butterflies.color}
        emissive={colors.butterflies.emissive}
        opacity={baseOpacity * 0.75}
      />
      <ParticleGroup
        type="stars"
        count={counts.stars}
        geometry={geometries.stars}
        color={colors.stars.color}
        emissive={colors.stars.emissive}
        opacity={baseOpacity * 0.9}
      />
      <ParticleGroup
        type="dust"
        count={counts.dust}
        geometry={geometries.dust}
        color={colors.dust.color}
        emissive={colors.dust.emissive}
        opacity={baseOpacity * 0.5}
      />
    </group>
  );
}
