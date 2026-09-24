"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sphere, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type NodeData = {
  id: string;
  category: string;
  position: [number, number, number];
  techs: string[];
  metrics: string;
  description: string;
};

const NODES: NodeData[] = [
  { id: "ai", category: "Artificial Intelligence", position: [-3, 1, 0], techs: ["TensorFlow", "PyTorch", "LLMs", "Claude"], metrics: "82% Acc, <800ms Latency", description: "Deep learning models and predictive pipelines." },
  { id: "backend", category: "Backend Systems", position: [2, 2, -1], techs: ["Node.js", "FastAPI", "Spring Boot", "Redis"], metrics: "10K+ Req/s, 99.9% Uptime", description: "Highly concurrent, distributed microservices." },
  { id: "frontend", category: "Frontend Arch", position: [0, -2, 1], techs: ["React", "Next.js", "WebGL", "Framer Motion"], metrics: "60 FPS, 100% Lighthouse", description: "GPU-accelerated, cinematic user interfaces." },
  { id: "data", category: "Data Engineering", position: [-2, -1, -2], techs: ["PostgreSQL", "Supabase", "Vector DBs"], metrics: "10ms Vector Search", description: "Scalable schema design and indexing." },
  { id: "devops", category: "DevOps & Cloud", position: [3, -1, 0], techs: ["Docker", "GitHub Actions", "Vercel"], metrics: "Zero Downtime Deploy", description: "Automated CI/CD and containerization." }
];

// Performance: Completely removed <Html> portals from inside the R3F scene.
// Each <Html> creates its own React root and syncs position on every frame,
// which was the direct cause of the unmount race condition AND scroll jank.
// Labels are now rendered as pure 3D Text using @react-three/drei.

export default function NeuralConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Connection lines between all nodes
  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        l.push({
          start: NODES[i].position,
          end: NODES[j].position,
          id1: NODES[i].id,
          id2: NODES[j].id
        });
      }
    }
    return l;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  const handlePointerOver = useCallback((nodeId: string) => {
    document.body.style.cursor = 'pointer';
    React.startTransition(() => setHoveredNode(nodeId));
  }, []);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto';
    React.startTransition(() => setHoveredNode(null));
  }, []);

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.8}
        makeDefault
      />
      <group ref={groupRef}>
      {/* Draw connections */}
      {lines.map((line, idx) => {
        const isConnectedToHovered = hoveredNode === line.id1 || hoveredNode === line.id2;
        const opacity = isConnectedToHovered ? 0.6 : 0.1;
        const color = isConnectedToHovered ? "#D4AF37" : "#ffffff";
        
        return (
          <Line
            key={idx}
            points={[line.start, line.end]}
            color={color}
            lineWidth={isConnectedToHovered ? 2 : 1}
            transparent
            opacity={opacity}
          />
        );
      })}

      {/* Draw Nodes — pure 3D, no Html portals */}
      {NODES.map((node) => {
        const isHovered = hoveredNode === node.id;
        
        return (
          <group key={node.id} position={node.position as [number, number, number]}>
            <Sphere 
              args={[0.2, 16, 16]}
              onPointerOver={(e) => {
                e.stopPropagation();
                handlePointerOver(node.id);
              }}
              onPointerOut={handlePointerOut}
            >
              <meshBasicMaterial 
                color={isHovered ? "#D4AF37" : "#ffffff"} 
                transparent 
                opacity={isHovered ? 1 : 0.5} 
              />
            </Sphere>

            {/* Glowing ring when hovered */}
            {isHovered && (
              <mesh>
                <ringGeometry args={[0.25, 0.28, 16]} />
                <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* 3D Text Label */}
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.2}
              color={isHovered ? "#D4AF37" : "#ffffff"}
              anchorX="center"
              anchorY="middle"
              fillOpacity={isHovered ? 1 : 0.6}
            >
              {node.category}
            </Text>
            
            {isHovered && (
              <Text
                position={[0, -0.7, 0]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.8}
              >
                {node.techs.join(" • ")}
              </Text>
            )}
          </group>
        );
      })}
      </group>
    </>
  );
}
