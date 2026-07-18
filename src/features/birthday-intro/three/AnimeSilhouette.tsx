'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimeSilhouetteProps {
  visible: boolean;
}

/**
 * Abstract anime couple silhouette rendered as a plane with procedural Canvas2D texture.
 * Displays a white-haired boy and long-haired girl in a dreamy romantic scene.
 * Fades in with opacity transition when `visible` becomes true.
 * Rendered during the scroll text section (after final intro line).
 *
 * NOTE: This is an original, abstract silhouette — not resembling any copyrighted character.
 */
export function AnimeSilhouette({ visible }: AnimeSilhouetteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef(0);

  // Create a procedural silhouette texture using Canvas2D
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d')!;

    // Background: dreamy sunset gradient (soft pink → blush → lavender)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#FFB6C1');
    bgGradient.addColorStop(0.5, '#FFE4E1');
    bgGradient.addColorStop(1, '#E6E6FA');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cherry blossom decorative circles (scattered petals)
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 3 + Math.random() * 8;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 182, 193, ${0.3 + Math.random() * 0.4})`;
      ctx.fill();
    }

    // --- Boy silhouette (left, shorter, white/light hair) ---
    const boyX = 200;
    const boyHeadY = 200;

    // Body
    ctx.fillStyle = 'rgba(100, 80, 120, 0.7)';
    ctx.beginPath();
    ctx.roundRect(boyX - 18, boyHeadY + 30, 36, 80, 8);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(boyX, boyHeadY, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // White/light hair (short, slightly messy)
    ctx.fillStyle = 'rgba(240, 240, 250, 0.85)';
    ctx.beginPath();
    ctx.ellipse(boyX, boyHeadY - 10, 24, 20, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    // Hair fringe detail
    ctx.beginPath();
    ctx.ellipse(boyX + 8, boyHeadY - 5, 10, 12, 0.3, Math.PI, Math.PI * 2);
    ctx.fill();

    // --- Girl silhouette (right, taller, long flowing hair) ---
    const girlX = 310;
    const girlHeadY = 185;

    // Body (slightly taller)
    ctx.fillStyle = 'rgba(100, 80, 120, 0.7)';
    ctx.beginPath();
    ctx.roundRect(girlX - 18, girlHeadY + 30, 36, 90, 8);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(girlX, girlHeadY, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Long flowing hair (dark, reaching past shoulders)
    ctx.fillStyle = 'rgba(80, 60, 100, 0.6)';
    ctx.beginPath();
    ctx.ellipse(girlX, girlHeadY + 20, 28, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    // Hair flowing to the right
    ctx.beginPath();
    ctx.ellipse(girlX + 15, girlHeadY + 40, 12, 50, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(80, 60, 100, 0.4)';
    ctx.fill();

    // --- Decorative elements: more cherry blossom petals in foreground ---
    for (let i = 0; i < 8; i++) {
      const px = 100 + Math.random() * 312;
      const py = 50 + Math.random() * 280;
      ctx.beginPath();
      ctx.ellipse(px, py, 4, 6, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 150, 180, ${0.2 + Math.random() * 0.3})`;
      ctx.fill();
    }

    // Soft glow around the couple (radial gradient overlay)
    const glowGradient = ctx.createRadialGradient(256, 220, 40, 256, 220, 180);
    glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    const targetOpacity = visible ? 1 : 0;
    opacityRef.current += (targetOpacity - opacityRef.current) * Math.min(delta * 2, 1);
    material.opacity = opacityRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[4, 3]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
