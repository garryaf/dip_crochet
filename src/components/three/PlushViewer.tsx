"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import { PlushModel } from "./PlushModel";

interface PlushViewerProps {
  color?: string;
  eyeStyle?: string;
  accessory?: string;
  autoRotate?: boolean;
}

export default function PlushViewer({
  color,
  eyeStyle,
  accessory,
  autoRotate = false,
}: PlushViewerProps) {
  const [canvasKey, setCanvasKey] = React.useState(0);

  return (
    <div 
      className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing touch-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ 
            antialias: true, 
            toneMapping: ACESFilmicToneMapping,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
        }}
        dpr={[1, 2]} // Support higher DPI for premium feel
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL Context Lost. Attempting to restore...");
          });
          gl.domElement.addEventListener("webglcontextrestored", () => {
            console.log("WebGL Context Restored.");
            setCanvasKey(prev => prev + 1); // Force remount
          });
        }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.5} groundColor="#f9d8d6" color="#ffffff" />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6ebfb5" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
            <PlushModel color={color} eyeStyle={eyeStyle} accessory={accessory} />
          </Float>

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.3}
            scale={8}
            blur={2}
            far={4}
          />
        </Suspense>

        {/* Single control system — no more PresentationControls + OrbitControls conflict */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
