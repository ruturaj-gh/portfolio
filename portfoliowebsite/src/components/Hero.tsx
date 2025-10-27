// components/layout/ThreeDCanvas.tsx
import { Canvas } from '@react-three/fiber';
import ThreeDBlobs from '../components/layout/ThreeDBlobs';

export default function ThreeDCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <ThreeDBlobs />
    </Canvas>
  );
}

