// components/layout/ThreeDCanvas.tsx
import { Canvas } from '@react-three/fiber';
import ThreeDBlobs from '../ThreeDBlobs';

export default function ThreeDCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <ThreeDBlobs />
    </Canvas>
  );
}

// components/ThreeDBlobs.tsx (example using a simple sphere and shader for blob-like effect)
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function ThreeDBlobs() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      // Add more complex deformations here via a custom shader
    }
  });

  // Basic sphere, will be replaced with custom shader for blob effect
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="#8a2be2" emissive="#4b0082" />
      {/* Replace with a custom ShaderMaterial for procedural blobs */}
    </mesh>
  );
}