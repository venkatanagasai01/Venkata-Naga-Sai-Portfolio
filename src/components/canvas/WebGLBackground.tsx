"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 100 + 20;
      const speed = Math.random() * 0.01 + 0.005;
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 100 - 50;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  });

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { factor, speed, x, y, z } = particle;
      const time = particle.time += speed / 2;
      
      // Floating animation
      dummy.position.set(
        x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
        y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
        z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
      );
      
      const scale = (Math.cos(time) + 1.2) * 0.05;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      // Very slow rotation of the whole system
      mesh.current.rotation.y += 0.0005;
      mesh.current.rotation.x += 0.0002;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#6b21a8" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <fog attach="fog" args={["#050505", 10, 40]} />
        <Particles count={1500} />
      </Canvas>
    </div>
  );
}
