"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";

export default function AICore({ particleCount = 2000 }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with a hole in the middle
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

  // Create a local pointer ref to track lerped values without modifying global state
  const localPointer = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth pointer tracking for interactive distortion
    localPointer.current.x = THREE.MathUtils.lerp(localPointer.current.x, (state.pointer.x * 2), 0.1);
    localPointer.current.y = THREE.MathUtils.lerp(localPointer.current.y, (state.pointer.y * 2), 0.1);
    localPointer.current.z = THREE.MathUtils.lerp(localPointer.current.z, 2, 0.1); // Fake depth

    // Core pulsing and rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.1;
      coreRef.current.rotation.x = time * 0.05;
      
      // Look at mouse
      coreRef.current.lookAt(localPointer.current);
    }

    // Outer rings rotation
    if (ringRef.current) {
      ringRef.current.rotation.y = time * -0.05;
      ringRef.current.rotation.z = time * 0.02;
    }

    // Particle cloud slow rotation and breathing
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      
      // Subtle scale breathing
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      particlesRef.current.scale.set(scale, scale, scale);
    }
    
    // Subtle overall camera drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#D4AF37" distance={10} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* The Central Intelligence Core */}
        <Sphere ref={coreRef} args={[2, 64, 64]} scale={1}>
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
        <Sphere args={[2.2, 32, 32]}>
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
              <torusGeometry args={[3 + i * 0.5, 0.01, 16, 100]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
      </Float>

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
  );
}
