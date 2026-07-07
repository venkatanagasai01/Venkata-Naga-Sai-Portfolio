"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CircleDot } from "lucide-react";

type LogEntry = {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
};

const JOURNEY_LOGS: LogEntry[] = [
  { id: "L01", year: "2023", category: "Foundation", title: "Started DSA & Problem Solving", description: "Began mastering Data Structures and Algorithms, solving 200+ problems to build a strong engineering foundation." },
  { id: "L02", year: "March 2025", category: "Architecture", title: "Built Smart Style", description: "Engineered a scalable collaborative filtering recommendation system for personalized fashion curation." },
  { id: "L03", year: "May 2026", category: "Architecture", title: "Built QuantVision AI Terminal", description: "Designed and developed an end-to-end financial intelligence platform integrating ML pipelines and real-time indicators." },
  { id: "L04", year: "June 2026", category: "Industry", title: "Joined Testers Community (ReachFront AI)", description: "Recruited as a Software Developer Intern. Began engineering data-intensive frontend architectures and integrating AI workflows." },
  { id: "L05", year: "2027", category: "Trajectory", title: "Graduating from CBIT", description: "Expected graduation with a Bachelor of Engineering in Artificial Intelligence & Data Science." }
];

export default function Chapter5Crucible() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Grow a line down the middle based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-[#030303] py-32 overflow-hidden" id="timeline">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em]">Mission Log</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">Engineering Trajectory</h2>
          <p className="text-white/50 font-sans font-light leading-relaxed max-w-lg mt-4">
            A chronological record of algorithmic foundations, system architectures, and professional deployments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          
          {/* Central Line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-white/5">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-[#D4AF37] origin-top shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
            />
          </div>

          <div className="flex flex-col gap-24 py-12">
            {JOURNEY_LOGS.map((log, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[16px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050505] border-2 border-[#D4AF37] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <CircleDot size={12} className="text-[#D4AF37]" />
                  </div>

                  {/* Empty space for alternating layout on Desktop */}
                  <div className="hidden md:block flex-1" />

                  {/* Content Card */}
                  <div className="flex-1 pl-16 md:pl-0">
                    <div className="p-8 bg-[#0A0A0A] border border-white/10 rounded-2xl hover:border-[#D4AF37]/30 transition-colors shadow-2xl relative overflow-hidden group">
                      
                      {/* Watermark */}
                      <span className="absolute -bottom-4 -right-4 text-6xl font-serif font-bold text-white/[0.02] group-hover:text-[#D4AF37]/5 transition-colors pointer-events-none select-none">
                        {log.year}
                      </span>

                      <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] block mb-2">
                        {log.year} {"//"} {log.category}
                      </span>
                      <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{log.title}</h3>
                      <p className="text-white/60 font-sans font-light leading-relaxed">
                        {log.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
