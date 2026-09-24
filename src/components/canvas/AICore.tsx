"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, MeshDistortMaterial, Points, PointMaterial, OrbitControls } from "@react-three/drei";

// Performance: Reduced from 2000 to 800 particles, removed Float wrapper
// (which ran its own spring animation on top of everything), and reduced
// sphere tessellation from 64 to 32.
export default function AICore({ particleCount = 800 }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  const [ringRotations] = useState(() => [
    [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
  ]);

  const localPointer = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    localPointer.current.x = THREE.MathUtils.lerp(localPointer.current.x, (state.pointer.x * 2), 0.1);
    localPointer.current.y = THREE.MathUtils.lerp(localPointer.current.y, (state.pointer.y * 2), 0.1);

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.1 + localPointer.current.x * 0.5;
      coreRef.current.rotation.x = time * 0.05 - localPointer.current.y * 0.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = time * -0.05;
      ringRef.current.rotation.z = time * 0.02;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={0.5}
        autoRotate={true}
        autoRotateSpeed={0.5}
        makeDefault
      />
      <group>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#D4AF37" distance={10} />

      {/* The Central Intelligence Core — no Float wrapper */}
      <Sphere ref={coreRef} args={[2, 32, 32]} scale={1}>
        <MeshDistortMaterial
          color="#050505"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={2}
        />
      </Sphere>

      {/* Wireframe Energy Shell */}
      <Sphere args={[2.2, 24, 24]}>
        <meshBasicMaterial 
          color="#D4AF37" 
          wireframe 
          transparent 
          opacity={0.05} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Neural Rings */}
      <group ref={ringRef}>
        {[1, 2, 3].map((i, index) => (
          <mesh key={i} rotation={ringRotations[index]}>
            <torusGeometry args={[3 + i * 0.5, 0.01, 8, 64]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>

      {/* Volumetric Particle Cloud */}
      <Points ref={particlesRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
        />
      </Points>
    </group>
    </>
  );
}
