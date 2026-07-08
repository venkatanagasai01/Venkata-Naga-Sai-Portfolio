"use client";

import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import NeuralConstellation from "@/components/canvas/NeuralConstellation";
import { BrainCircuit, Code2, Layout, Server, Database, Bot, Wrench } from "lucide-react";
import { useRef } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "FastAPI"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["Supabase", "Firebase", "PostgreSQL", "MongoDB"]
  },
  {
    title: "AI / ML",
    icon: Bot,
    skills: ["TensorFlow", "Scikit-learn", "OpenAI", "Claude", "Computer Vision", "Data Science"]
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "Figma"]
  }
];

export default function Chapter3Synapses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "200px" });
  
  return (
    <section className="relative w-full min-h-screen bg-[#030303] border-t border-white/5 flex flex-col" id="expertise">
      
      {/* Top Half: Interactive Visualization */}
      <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        
        {/* Absolute Positioning for the Canvas */}
        <div className="absolute inset-0 z-0" ref={ref}>
          {isInView && (
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
              <NeuralConstellation />
            </Canvas>
          )}
        </div>

        {/* Floating HUD over the WebGL */}
        <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-6 lg:p-12 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4 pointer-events-auto"
            >
              <span className="text-[#D4AF37] font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center gap-2">
                <BrainCircuit size={14} /> Cognitive Architecture
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">
                Technical Mastery
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left md:text-right flex flex-col gap-2 pl-4 md:pl-6 max-w-sm pointer-events-auto bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl border border-white/5 md:border-transparent"
            >
              <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono">System Instructions</span>
              <p className="text-white/70 font-sans font-light text-sm leading-relaxed mt-2">
                Interact with the neural clusters to access deep architectural insights. 
                The constellation represents the interconnected intelligence of the operating system.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full border-t border-white/10 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-start md:items-center md:gap-0 gap-4 text-white/30 text-[10px] uppercase font-mono tracking-widest bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl md:rounded-none border border-white/5 md:border-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Nodes Active
              </span>
              <span className="hidden md:inline">|</span>
              <span>Telemetry Nominal</span>
            </div>
            <span>Engineering Intelligence Center</span>
          </div>
        </div>
      </div>

      {/* Bottom Half: Categorized Skills Grid */}
      <div className="w-full bg-[#050505] py-24 px-6 lg:px-12 border-t border-white/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col gap-6 p-8 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors text-white/60">
                    <category.icon size={20} />
                  </div>
                  <h3 className="text-white font-serif text-2xl tracking-wide">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white/70 font-mono tracking-wide hover:border-[#D4AF37]/50 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}
