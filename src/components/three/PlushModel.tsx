"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";

interface CrochetMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  geometry: THREE.BufferGeometry;
  color: string;
  roughness?: number;
}

function CrochetMesh({ position, rotation, geometry, color, roughness = 0.9 }: CrochetMeshProps) {
    const mat = useMemo(() => {
    // Build highly detailed crochet texture procedurally
    const size = 512; // Higher resolution for better detail
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Parse color
    const tempEl = document.createElement("span");
    tempEl.style.color = color;
    document.body.appendChild(tempEl);
    const comp = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    const [r, g, b] = comp.match(/\d+/g)?.map(Number) ?? [255, 143, 177];

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);

    // Add noise for yarn fuzziness
    for (let i = 0; i < 20000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const alpha = Math.random() * 0.15;
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }

    const sw = 28, sh = 22; // Scaled for 512
    const rows = Math.ceil(size / sh) + 2;
    const cols = Math.ceil(size / sw) + 2;

    for (let row = 0; row < rows; row++) {
      const ox = (row % 2) * (sw / 2);
      for (let col = 0; col < cols; col++) {
        const x = col * sw + ox - sw;
        const y = row * sh - 4;
        const cx = x + sw / 2, cy = y + sh / 2;

        // The "Stitch" - more interlocking look
        // Shadow for depth
        ctx.beginPath();
        ctx.moveTo(cx - sw/2, cy);
        ctx.bezierCurveTo(cx - sw/4, cy - sh/2, cx + sw/4, cy - sh/2, cx + sw/2, cy);
        ctx.strokeStyle = `rgba(${Math.max(0, r - 60)},${Math.max(0, g - 60)},${Math.max(0, b - 60)},0.8)`;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Highlight for yarn twist
        ctx.beginPath();
        ctx.moveTo(cx - sw/3, cy - 2);
        ctx.lineTo(cx + sw/3, cy - 2);
        ctx.strokeStyle = `rgba(${Math.min(255, r + 50)},${Math.min(255, g + 50)},${Math.min(255, b + 50)},0.4)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Characteristic "V" - stronger
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy + 6);
        ctx.lineTo(cx, cy - 2);
        ctx.lineTo(cx + 8, cy + 6);
        ctx.strokeStyle = `rgba(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)},0.95)`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(6, 6);

    // Realistic Normal Map for deep bumps
    const nc = document.createElement("canvas");
    nc.width = nc.height = size;
    const nctx = nc.getContext("2d")!;
    nctx.fillStyle = "rgb(128,128,255)";
    nctx.fillRect(0, 0, size, size);

    for (let row = 0; row < rows; row++) {
      const ox = (row % 2) * (sw / 2);
      for (let col = 0; col < cols; col++) {
        const x = col * sw + ox - sw;
        const y = row * sh - 4;
        const cx = x + sw / 2, cy = y + sh / 2;

        const grd = nctx.createRadialGradient(cx, cy, 2, cx, cy, sw / 2);
        grd.addColorStop(0, "rgb(160,160,255)");
        grd.addColorStop(0.5, "rgb(128,200,255)");
        grd.addColorStop(1, "rgb(80,80,180)");
        nctx.fillStyle = grd;
        nctx.beginPath();
        nctx.ellipse(cx, cy, sw / 2 - 2, sh / 2 - 2, 0, 0, Math.PI * 2);
        nctx.fill();
        
        // Add vertical "crease" in normal map for yarn twist
        nctx.strokeStyle = "rgb(100,100,200)";
        nctx.lineWidth = 2;
        nctx.beginPath();
        nctx.moveTo(cx, cy - sh/2);
        nctx.lineTo(cx, cy + sh/2);
        nctx.stroke();
      }
    }

    const normalMap = new THREE.CanvasTexture(nc);
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(6, 6);

    return new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(2.5, 2.5), // Increased scale for more "bumpy" look
      roughness: 1.0, // Fully rough for yarn
      metalness: 0,
    });
  }, [color, roughness]);

  return <mesh position={position} rotation={rotation} geometry={geometry} material={mat} castShadow receiveShadow />;
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
  const [hovered, setHovered] = React.useState(false);
  useCursor(hovered);

  // Geometries — memoized so they're created once
  const geos = useMemo(() => ({
    body: new THREE.SphereGeometry(0.7, 32, 32),
    head: new THREE.SphereGeometry(0.75, 32, 32),
    ear: new THREE.CapsuleGeometry(0.15, 0.5, 4, 16),
    eyeBall: new THREE.SphereGeometry(0.08, 16, 16),
    eyeLoop: new THREE.TorusGeometry(0.1, 0.022, 8, 16, Math.PI),
    nose: new THREE.SphereGeometry(0.055, 16, 16),
    arm: new THREE.SphereGeometry(0.21, 16, 16),
    leg: new THREE.SphereGeometry(0.26, 16, 16),
    hatBrim: new THREE.CylinderGeometry(0.42, 0.52, 0.22, 32),
    hatBox: new THREE.CylinderGeometry(0.62, 0.62, 0.06, 32),
    cap: new THREE.BoxGeometry(0.82, 0.06, 0.82),
    capTop: new THREE.CylinderGeometry(0.31, 0.31, 0.32, 32),
    tassel: new THREE.SphereGeometry(0.055, 8, 8),
    tasselStr: new THREE.CylinderGeometry(0.022, 0.022, 0.62, 8),
  }), []);

  // Breathing / float animation (replacing useFrame which uses THREE.Clock internally)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
  });

  const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.1, metalness: 0.3 }), []);
  const noseMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffb5c2", roughness: 0.9 }), []);
  const blackMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.7 }), []);
  const goldMat  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffd54f", roughness: 0.5, metalness: 0.2 }), []);
  const brownMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#8d6e63", roughness: 0.8 }), []);

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
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
          {/* Tassel ball */}
          <mesh position={[0.41, 0, 0]} geometry={geos.tassel} material={goldMat} />
          {/* Tassel string */}
          <mesh position={[0.41, -0.31, 0]} geometry={geos.tasselStr} material={goldMat} />
        </group>
      )}
    </group>
  );
}
