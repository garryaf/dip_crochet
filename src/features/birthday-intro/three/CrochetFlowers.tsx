'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../utils/constants';

const FLOWER_COUNT = 5;
const PETALS_PER_FLOWER = 6;
const MIN_PERIOD = 4; // seconds — oscillation period >= 4s (Req 4.4)

/**
 * Creates a simple crochet flower geometry composed of a center sphere
 * and torus petals arranged in a ring. Returns a merged BufferGeometry.
 */
function createFlowerGeometry(): THREE.BufferGeometry {
  const center = new THREE.SphereGeometry(0.15, 12, 12);
  const petalGeometry = new THREE.TorusGeometry(0.2, 0.07, 8, 12);

  const geometries: THREE.BufferGeometry[] = [center];

  for (let i = 0; i < PETALS_PER_FLOWER; i++) {
    const angle = (i / PETALS_PER_FLOWER) * Math.PI * 2;
    const petal = petalGeometry.clone();

    // Position petals in a ring around center
    const matrix = new THREE.Matrix4();
    matrix.makeRotationZ(angle);
    matrix.setPosition(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0);
    petal.applyMatrix4(matrix);

    geometries.push(petal);
  }

  // Merge all geometries into one for instancing efficiency
  return mergeGeometries(geometries);
}

/**
 * Simple geometry merge — concatenates position, normal, and index buffers.
 */
function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  let vertexOffset = 0;

  for (const geom of geometries) {
    const pos = geom.getAttribute('position');
    const norm = geom.getAttribute('normal');
    const idx = geom.getIndex();

    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      if (norm) {
        normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
      }
    }

    if (idx) {
      for (let i = 0; i < idx.count; i++) {
        indices.push(idx.getX(i) + vertexOffset);
      }
    }

    vertexOffset += pos.count;
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (normals.length > 0) {
    merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  }
  if (indices.length > 0) {
    merged.setIndex(indices);
  }

  return merged;
}

/**
 * Instanced crochet flowers floating gently in the scene.
 * Uses InstancedMesh for draw-call efficiency (Req 9.4).
 * Animation respects velocity <= 0.5 units/sec and period >= 4s (Req 4.4).
 */
export function CrochetFlowers() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-computed flower geometry (merged petals + center)
  const geometry = useMemo(() => createFlowerGeometry(), []);

  // Scattered positions different from yarn balls
  const positions = useMemo<[number, number, number][]>(
    () => [
      [-2.5, 1.5, 0],
      [1, -1.5, -0.5],
      [3, 2, -1],
      [-1, 0.5, 0.8],
      [0, -2.5, -0.3],
    ],
    []
  );

  // Flower colors — soft pinks, cream, lavender
  const colors = useMemo(
    () => [
      new THREE.Color(COLORS.softPink),
      new THREE.Color(COLORS.softPurple),
      new THREE.Color(COLORS.cream),
      new THREE.Color(COLORS.blushPink),
      new THREE.Color(COLORS.softPink),
    ],
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.elapsedTime;

    for (let i = 0; i < FLOWER_COUNT; i++) {
      const [x, y, z] = positions[i];

      // Period >= 4s for each instance, staggered
      const period = MIN_PERIOD + i * 0.7;
      const freq = (2 * Math.PI) / period;

      // Amplitude chosen so velocity = amplitude * freq <= 0.5
      // Max: amp 0.2 * freq 1.57 (period=4) = 0.314 < 0.5 ✓
      const ampX = 0.2;
      const ampY = 0.18;

      dummy.position.set(
        x + Math.sin(t * freq + i * 1.2) * ampX,
        y + Math.cos(t * freq + i * 0.8) * ampY,
        z
      );
      // Gentle rotation — flowers spin slowly
      dummy.rotation.set(0, 0, t * 0.2 + i * (Math.PI / FLOWER_COUNT));
      dummy.scale.setScalar(0.8 + i * 0.1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Set per-instance color
      mesh.setColorAt(i, colors[i]);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, FLOWER_COUNT]}>
      <meshStandardMaterial
        vertexColors
        roughness={0.75}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
