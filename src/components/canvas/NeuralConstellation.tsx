"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, Sphere } from "@react-three/drei";
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

export default function NeuralConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

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
      // Gentle floating rotation
      if (!activeNode) {
        groupRef.current.rotation.y += 0.001;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      }
      
      // Cursor magnetism
      if (hoveredNode && !activeNode) {
        const targetX = (state.pointer.x * Math.PI) / 10;
        const targetY = (state.pointer.y * Math.PI) / 10;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
      }
    }
  });

  return (
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

      {/* Draw Nodes */}
      {NODES.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isActive = activeNode === node.id;
        
        return (
          <group key={node.id} position={node.position as [number, number, number]}>
            {/* The actual sphere */}
            <Sphere 
              args={[0.2, 32, 32]}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                setHoveredNode(node.id);
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHoveredNode(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNode(isActive ? null : node.id);
              }}
            >
              <meshBasicMaterial 
                color={isHovered || isActive ? "#D4AF37" : "#ffffff"} 
                transparent 
                opacity={isHovered || isActive ? 1 : 0.5} 
              />
            </Sphere>

            {/* Glowing ring when hovered/active */}
            {(isHovered || isActive) && (
              <mesh>
                <ringGeometry args={[0.25, 0.28, 32]} />
                <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* Holographic Label (Always visible but small) */}
            {!isActive && (
              <Html distanceFactor={10} center zIndexRange={[100, 0]}>
                <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-black/50 px-2 py-1 border border-white/10 backdrop-blur-sm whitespace-nowrap">
                    {node.category}
                  </span>
                </div>
              </Html>
            )}

            {/* Expanded Holographic Panel (When Clicked) */}
            {isActive && (
              <Html distanceFactor={8} position={[0.4, 0, 0]} zIndexRange={[100, 0]}>
                <div className="w-[300px] bg-black/80 border border-[#D4AF37]/40 backdrop-blur-xl p-6 rounded-lg text-white shadow-[0_0_30px_rgba(212,175,55,0.15)] animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl text-[#D4AF37]">{node.category}</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveNode(null); }}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-white/70 font-light text-sm mb-6 leading-relaxed">
                    {node.description}
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest block mb-2">Metrics</span>
                      <span className="text-white font-mono text-xs">{node.metrics}</span>
                    </div>
                    
                    <div>
                      <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest block mb-2">Stack Vectors</span>
                      <div className="flex flex-wrap gap-2">
                        {node.techs.map(t => (
                          <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
