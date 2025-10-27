// src/components/layout/ThreeDCanvas.tsx
'use client'; // Required for client components in App Router

import { Canvas } from '@react-three/fiber';
import {  Environment } from '@react-three/drei';
import ThreeDBlobs from './ThreeDBlobs';
import React, { Suspense } from 'react';

export default function ThreeDCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.5} />
          {/* Directional light to create some shadows/highlights */}
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

          {/* Environment for realistic reflections and background */}
          <Environment preset="night" background={false} />

          <ThreeDBlobs
          />

          {/* Optional: OrbitControls for debugging - remove in production */}
          {/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}