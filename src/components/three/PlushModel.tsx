"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Parse a CSS color string to RGB values without DOM manipulation.
 * Safe for SSR and non-browser environments.
 */
function parseColor(color: string): [number, number, number] {
  const hex = color.replace("#", "");
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
    ];
  }
  return [255, 143, 177]; // fallback pink
}

/**
 * Build a crochet stitch texture on a 256px canvas.
 * Noise iterations reduced from 20k to 5k for performance.
 */
function buildCrochetTexture(color: string, size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const [r, g, b] = parseColor(color);

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);

  // Reduced noise for performance
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const sw = 14,
    sh = 11;
  const rows = Math.ceil(size / sh) + 2;
  const cols = Math.ceil(size / sw) + 2;

  for (let row = 0; row < rows; row++) {
    const ox = (row % 2) * (sw / 2);
    for (let col = 0; col < cols; col++) {
      const x = col * sw + ox - sw;
      const y = row * sh - 4;
      const cx = x + sw / 2,
        cy = y + sh / 2;

      // Shadow arc
      ctx.beginPath();
      ctx.moveTo(cx - sw / 2, cy);
      ctx.bezierCurveTo(cx - sw / 4, cy - sh / 2, cx + sw / 4, cy - sh / 2, cx + sw / 2, cy);
      ctx.strokeStyle = `rgba(${Math.max(0, r - 50)},${Math.max(0, g - 50)},${Math.max(0, b - 50)},0.7)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Highlight
      ctx.beginPath();
      ctx.moveTo(cx - sw / 3, cy - 1);
      ctx.lineTo(cx + sw / 3, cy - 1);
      ctx.strokeStyle = `rgba(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${Math.min(255, b + 40)},0.35)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // V stitch
      ctx.beginPath();
      ctx.moveTo(cx - 4, cy + 3);
      ctx.lineTo(cx, cy - 1);
      ctx.lineTo(cx + 4, cy + 3);
      ctx.strokeStyle = `rgba(${Math.max(0, r - 35)},${Math.max(0, g - 35)},${Math.max(0, b - 35)},0.9)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function buildNormalMap(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, size, size);

  const sw = 14,
    sh = 11;
  const rows = Math.ceil(size / sh) + 2;
  const cols = Math.ceil(size / sw) + 2;

  for (let row = 0; row < rows; row++) {
    const ox = (row % 2) * (sw / 2);
    for (let col = 0; col < cols; col++) {
      const x = col * sw + ox - sw;
      const y = row * sh - 4;
      const cx = x + sw / 2,
        cy = y + sh / 2;

      const grd = ctx.createRadialGradient(cx, cy, 1, cx, cy, sw / 2);
      grd.addColorStop(0, "rgb(148,148,255)");
      grd.addColorStop(0.5, "rgb(128,170,255)");
      grd.addColorStop(1, "rgb(90,90,200)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(cx, cy, sw / 2 - 1, sh / 2 - 1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

interface CrochetMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  geometry: THREE.BufferGeometry;
  color: string;
}

function CrochetMesh({ position, rotation, geometry, color }: CrochetMeshProps) {
  const matRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const mat = useMemo(() => {
    // Dispose previous material and textures if they exist
    if (matRef.current) {
      matRef.current.map?.dispose();
      matRef.current.normalMap?.dispose();
      matRef.current.dispose();
    }

    const map = buildCrochetTexture(color);
    const normalMap = buildNormalMap();

    const material = new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(2, 2),
      roughness: 1.0,
      metalness: 0,
    });

    matRef.current = material;
    return material;
  }, [color]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (matRef.current) {
        matRef.current.map?.dispose();
        matRef.current.normalMap?.dispose();
        matRef.current.dispose();
        matRef.current = null;
      }
    };
  }, []);

  return (
    <mesh
      position={position}
      rotation={rotation}
      geometry={geometry}
      material={mat}
      castShadow
      receiveShadow
    />
  );
}

interface PlushModelProps {
  color?: string;
  eyeStyle?: string;
  accessory?: string;
}

export function PlushModel({
  color = "#ff8fb1",
  eyeStyle = "cute",
  accessory = "none",
}: PlushModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Geometries — memoized so they're created once
  const geos = useMemo(
    () => ({
      body: new THREE.SphereGeometry(0.7, 28, 28),
      head: new THREE.SphereGeometry(0.75, 28, 28),
      ear: new THREE.CapsuleGeometry(0.15, 0.5, 4, 12),
      eyeBall: new THREE.SphereGeometry(0.08, 12, 12),
      eyeLoop: new THREE.TorusGeometry(0.1, 0.022, 8, 12, Math.PI),
      nose: new THREE.SphereGeometry(0.055, 12, 12),
      arm: new THREE.SphereGeometry(0.21, 12, 12),
      leg: new THREE.SphereGeometry(0.26, 12, 12),
      hatBrim: new THREE.CylinderGeometry(0.42, 0.52, 0.22, 24),
      hatBox: new THREE.CylinderGeometry(0.62, 0.62, 0.06, 24),
      cap: new THREE.BoxGeometry(0.82, 0.06, 0.82),
      capTop: new THREE.CylinderGeometry(0.31, 0.31, 0.32, 24),
      tassel: new THREE.SphereGeometry(0.055, 8, 8),
      tasselStr: new THREE.CylinderGeometry(0.022, 0.022, 0.62, 8),
    }),
    []
  );

  // Dispose geometries on unmount
  useEffect(() => {
    return () => {
      Object.values(geos).forEach((geo) => geo.dispose());
    };
  }, [geos]);

  // Gentle breathing animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
  });

  const eyeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.1, metalness: 0.3 }),
    []
  );
  const noseMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffb5c2", roughness: 0.9 }),
    []
  );
  const blackMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.7 }),
    []
  );
  const goldMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffd54f", roughness: 0.5, metalness: 0.2 }),
    []
  );
  const brownMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#8d6e63", roughness: 0.8 }),
    []
  );

  // Dispose static materials on unmount
  useEffect(() => {
    return () => {
      eyeMat.dispose();
      noseMat.dispose();
      blackMat.dispose();
      goldMat.dispose();
      brownMat.dispose();
    };
  }, [eyeMat, noseMat, blackMat, goldMat, brownMat]);

  return (
    <group ref={groupRef}>
      {/* Body */}
      <CrochetMesh position={[0, -0.6, 0]} geometry={geos.body} color={color} />
      {/* Head */}
      <CrochetMesh position={[0, 0.4, 0]} geometry={geos.head} color={color} />
      {/* Ears */}
      <CrochetMesh position={[-0.4, 1.15, 0]} rotation={[0, 0, 0.2]} geometry={geos.ear} color={color} />
      <CrochetMesh position={[0.4, 1.15, 0]} rotation={[0, 0, -0.2]} geometry={geos.ear} color={color} />
      {/* Arms */}
      <CrochetMesh position={[-0.72, -0.3, 0]} rotation={[0, 0, 0.5]} geometry={geos.arm} color={color} />
      <CrochetMesh position={[0.72, -0.3, 0]} rotation={[0, 0, -0.5]} geometry={geos.arm} color={color} />
      {/* Legs */}
      <CrochetMesh position={[-0.36, -1.22, 0]} geometry={geos.leg} color={color} />
      <CrochetMesh position={[0.36, -1.22, 0]} geometry={geos.leg} color={color} />

      {/* Eyes */}
      <group position={[0, 0.42, 0.65]}>
        {eyeStyle === "cute" && (
          <>
            <mesh position={[-0.3, 0, 0]} geometry={geos.eyeBall} material={eyeMat} />
            <mesh position={[0.3, 0, 0]} geometry={geos.eyeBall} material={eyeMat} />
          </>
        )}
        {eyeStyle === "sleepy" && (
          <>
            <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI]} geometry={geos.eyeLoop} material={eyeMat} />
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI]} geometry={geos.eyeLoop} material={eyeMat} />
          </>
        )}
        {eyeStyle === "happy" && (
          <>
            <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0]} geometry={geos.eyeLoop} material={eyeMat} />
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0]} geometry={geos.eyeLoop} material={eyeMat} />
          </>
        )}
      </group>

      {/* Nose */}
      <mesh position={[0, 0.28, 0.72]} geometry={geos.nose} material={noseMat} />

      {/* Accessories */}
      {accessory === "hat" && (
        <group position={[0, 1.05, 0]}>
          <mesh geometry={geos.hatBrim} material={brownMat} />
          <mesh position={[0, 0.16, 0]} geometry={geos.hatBox} material={brownMat} />
        </group>
      )}

      {accessory === "grad-cap" && (
        <group position={[0, 1.15, 0]}>
          <mesh geometry={geos.cap} material={blackMat} />
          <mesh position={[0, -0.18, 0]} geometry={geos.capTop} material={blackMat} />
          <mesh position={[0.41, 0, 0]} geometry={geos.tassel} material={goldMat} />
          <mesh position={[0.41, -0.31, 0]} geometry={geos.tasselStr} material={goldMat} />
        </group>
      )}
    </group>
  );
}
