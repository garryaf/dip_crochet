"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  ContactShadows, 
  Float,
  PresentationControls 
} from "@react-three/drei";
import { ACESFilmicToneMapping, PCFShadowMap } from "three";
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
  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows={{ type: PCFShadowMap }} 
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.5} groundColor="#f9d8d6" color="#ffffff" />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6ebfb5" />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <PlushModel color={color} eyeStyle={eyeStyle} accessory={accessory} />
            </Float>
          </PresentationControls>
          
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10} 
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
