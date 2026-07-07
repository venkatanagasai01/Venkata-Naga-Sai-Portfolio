"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

// 3D Particle Field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 500 subtle particles
  const [[positions, scales]] = useState(() => {
    const pos = new Float32Array(500 * 3);
    const scl = new Float32Array(500);
    for (let i = 0; i < 500; i++) {
      // Spread over a wide area
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
      scl[i] = Math.random() * 0.05 + 0.02;        // scale
    }
    return [pos, scl];
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Very slow rotation for the entire field
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#D4AF37"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BackgroundSystem() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#030303] overflow-hidden">
      
      {/* Layer 1: Dark Texture base is the bg color */}
      
      {/* Layer 2 & 4 & 5: Three.js WebGL (Depth Fog, Particles, Subtle Stars) */}
      <div className="absolute inset-0 z-10 opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }} dpr={[1, 1.5]}>
          <fog attach="fog" args={["#030303", 5, 15]} />
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Layer 3: Moving Gradient / Lighting */}
      <div className="absolute inset-0 z-20 mix-blend-screen opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4AF37] blur-[150px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[#ffffff] blur-[120px] animate-[pulse_8s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Layer 8: Glass/Noise overlay (Static CSS for performance) */}
      <div className="absolute inset-0 z-30 opacity-[0.02] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Vignette to frame the screen */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_150%)]" />

    </div>
  );
}
