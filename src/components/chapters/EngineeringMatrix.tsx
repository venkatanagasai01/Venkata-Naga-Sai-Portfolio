"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PIPELINES = [
  { id: "frontend", name: "Client Architecture", nodes: ["Next.js", "React", "Framer Motion", "Three.js"] },
  { id: "backend", name: "Server Logic", nodes: ["Node.js", "Express", "FastAPI", "Python"] },
  { id: "ai", name: "AI & ML", nodes: ["TensorFlow", "Scikit-Learn", "Claude 3", "OpenAI"] },
  { id: "data", name: "Data Persistence", nodes: ["PostgreSQL", "Supabase", "Redis", "Firebase"] }
];

export default function EngineeringMatrix() {
  const [hoveredPipeline, setHoveredPipeline] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] py-32 px-6 lg:px-12 border-t border-white/5 overflow-hidden" id="matrix">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[#D4AF37] font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">System Topography</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">Engineering Matrix</h2>
          </div>
          <div className="text-right flex flex-col gap-2 pl-6">
            <span className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-mono">Status</span>
            <span className="text-white text-sm uppercase tracking-widest font-sans flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Data Packets Flowing
            </span>
          </div>
        </div>

        {/* Command Center Graph */}
        <div className="relative w-full h-[600px] bg-black/50 border border-white/10 rounded-2xl p-12 overflow-hidden flex flex-col justify-between">
          
          {PIPELINES.map((pipeline, pIndex) => {
            const isHovered = hoveredPipeline === pipeline.id;
            const isDimmed = hoveredPipeline !== null && !isHovered;

            return (
              <div 
                key={pipeline.id} 
                className="flex items-center gap-8 relative z-10 w-full"
                onMouseEnter={() => setHoveredPipeline(pipeline.id)}
                onMouseLeave={() => setHoveredPipeline(null)}
              >
                {/* Label */}
                <div className={`w-48 text-right font-mono text-xs uppercase tracking-widest transition-opacity duration-300 ${isDimmed ? 'text-white/50' : 'text-[#D4AF37]'}`}>
                  {pipeline.name}
                </div>

                {/* Nodes & Paths */}
                <div className="flex-1 flex items-center justify-between relative">
                  
                  {/* Background Path Line */}
                  <div className={`absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 transition-colors duration-300 ${isDimmed ? 'bg-white/5' : 'bg-white/20'}`} />

                  {/* Animated Data Packets (Only if hovered or no hover) */}
                  {(!isDimmed) && (
                    <motion.div
                      className="absolute top-1/2 left-0 w-2 h-2 bg-[#D4AF37] rounded-full -translate-y-1/2 shadow-[0_0_10px_#D4AF37]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 2 + pIndex * 0.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {/* Nodes */}
                  {pipeline.nodes.map((node, nIndex) => (
                    <div 
                      key={node} 
                      className={`relative z-10 px-4 py-2 bg-[#050505] border transition-all duration-300 rounded ${isDimmed ? 'border-white/5 text-white/50' : isHovered ? 'border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-110' : 'border-white/20 text-white/90'}`}
                    >
                      <span className="font-sans text-xs tracking-widest">{node}</span>
                      
                      {/* Connection Dots */}
                      <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#050505] border transition-colors ${isDimmed ? 'border-white/5' : isHovered ? 'border-[#D4AF37]' : 'border-white/20'}`} />
                      <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#050505] border transition-colors ${isDimmed ? 'border-white/5' : isHovered ? 'border-[#D4AF37]' : 'border-white/20'}`} />
                    </div>
                  ))}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
