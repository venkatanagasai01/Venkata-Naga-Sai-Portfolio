/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const PHILOSOPHIES = [
  { id: "P01", title: "Performance First", desc: "Every frame matters. Aggressive optimization, GPU-accelerated rendering, and minimal bundle sizes." },
  { id: "P02", title: "Elegant Simplicity", desc: "Complex systems distilled into readable, maintainable, and predictable architectures." },
  { id: "P03", title: "Scalable Systems", desc: "Designing for the next million users. Decoupled services, distributed state, and horizontal scaling." },
  { id: "P04", title: "AI with Purpose", desc: "Integrating machine learning not as a gimmick, but to solve deterministic engineering bottlenecks." }
];

function GlassPanel({ title, desc, id }: { title: string, desc: string, id: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[300px] rounded-2xl cursor-crosshair perspective-1000 group"
    >
      <div 
        className="absolute inset-0 bg-white/[0.01] border border-white/10 rounded-2xl p-8 flex flex-col justify-between backdrop-blur-md group-hover:border-[#D4AF37]/50 group-hover:bg-white/[0.03] transition-colors duration-500"
        style={{ transform: "translateZ(20px)" }}
      >
        <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest">{id}</span>
        
        <div>
          <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{title}</h3>
          <p className="text-white/60 font-sans font-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            {desc}
          </p>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 rounded-2xl blur-xl transition-colors duration-500 pointer-events-none" style={{ transform: "translateZ(-10px)" }} />
    </motion.div>
  );
}

export default function EngineeringPhilosophy() {
  // eslint-disable-next-line
  const [particles, setParticles] = useState<Array<{left: string, top: string, animationDuration: string, animationDelay: string}>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 5}s`
      }))
    );
  }, []);

  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="philosophy">
      
      {/* Background Particles (CSS based for simplicity in this component) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((style, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full animate-float"
            style={style}
          />
        ))}
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16 relative z-10">
        <div className="flex flex-col items-center text-center gap-4 border-b border-white/10 pb-8">
          <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]">Core Axioms</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">Engineering Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
          {PHILOSOPHIES.map((phil) => (
            <GlassPanel key={phil.id} {...phil} />
          ))}
        </div>
      </div>
    </section>
  );
}
