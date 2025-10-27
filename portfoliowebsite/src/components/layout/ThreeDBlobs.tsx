  // src/components/layout/ThreeDBlobs.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec3 u_color;
  uniform float u_shininess;
  uniform float u_reflectivity;
  varying vec2 vUv;
  varying vec3 vNormal;

  // Noise function (simplified for demonstration, could use more complex ones like Simplex)
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }

  // A basic fBM noise
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5 * noise(p);       p *= 2.0;
    f += 0.25 * noise(p);      p *= 2.0;
    f += 0.125 * noise(p);     p *= 2.0;
    f += 0.0625 * noise(p);
    return f;
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Simple light direction

    // Basic diffuse lighting
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = u_color * diff;

    // Simulate glow/emissive effect
    vec3 emissive = u_color * 0.1;

    // Add some animated distortion based on time
    float distortion = fbm(vUv.xyx * 5.0 + u_time * 0.1) * 0.5 + 0.5; // Example distortion

    // Combine diffuse, emissive, and distortion for a synth look
    gl_FragColor = vec4(diffuse + emissive + u_color * distortion * 0.1, 1.0);

    // Apply some color shift or tint based on time for more retro feel
    vec3 finalColor = gl_FragColor.rgb;
    finalColor.r += sin(u_time * 0.5) * 0.05;
    finalColor.g += cos(u_time * 0.7) * 0.05;
    finalColor.b += sin(u_time * 0.9) * 0.05;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface ThreeDBlobsProps {
  count?: number; // Number of blobs
  speed?: number; // Animation speed
  color?: string; // Base color
}

export default function ThreeDBlobs({
  count = 10,
  speed = 0.1,
  color = '#8a2be2', // Blue Violet
}: ThreeDBlobsProps) {
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color: { value: new THREE.Color(color) },
      u_shininess: { value: 0.8 },
      u_reflectivity: { value: 0.2 },
    }),
    [color]
  );

  useFrame((state) => {
    uniforms.u_time.value = state.clock.getElapsedTime() * speed;
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        // Simple rotation
        mesh.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.002 * (i % 3 === 0 ? 1 : -1);
        // Subtle position oscillation
        mesh.position.y = Math.sin(state.clock.getElapsedTime() * (0.5 + i * 0.01)) * 0.2;
        mesh.position.x = Math.cos(state.clock.getElapsedTime() * (0.4 + i * 0.015)) * 0.2;
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el!)}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
          scale={[
            1 + Math.random() * 0.5,
            1 + Math.random() * 0.5,
            1 + Math.random() * 0.5,
          ]}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <shaderMaterial
            attach="material"
            args={[{
              uniforms: uniforms,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
            }]}
            // Ensure uniforms are passed
            uniforms={uniforms}
          />
        </mesh>
      ))}
    </>
  );
}