"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrambleText from "@/components/ui/ScrambleText";

const EDUCATION = {
  degree: "Bachelor of Engineering in Artificial Intelligence & Data Science",
  university: "Chaitanya Bharathi Institute of Technology (CBIT), Osmania University",
  year: "Expected Graduation: May 2027",
  cgpa: "8.02",
  subjects: [
    { name: "Data Structures & Algorithms", desc: "Core algorithms, space-time complexity analysis.", apps: "Foundation for optimized problem-solving." },
    { name: "Machine Learning & Deep Learning", desc: "Neural Networks, CNNs, LSTMs, optimization.", apps: "Building predictive financial models." },
    { name: "Database Systems", desc: "ACID, normalization, indexing, distributed systems.", apps: "Architecting Supabase/PostgreSQL backends." },
    { name: "Operating Systems & Computer Networks", desc: "Process management, memory management, TCP/IP.", apps: "Understanding low-level hardware interactions." },
    { name: "Cloud Computing & Software Engineering", desc: "Distributed architectures, SDLC, Agile.", apps: "Deploying scalable applications to production." }
  ]
};

export default function Chapter9Knowledge() {
  const [activeSubject, setActiveSubject] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="knowledge">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[#D4AF37] font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-sm" /> Knowledge Foundation
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">Classified Index</h2>
          </div>
          <div className="text-right flex flex-col gap-2 pl-6">
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono">Clearance</span>
            <span className="text-red-500 text-sm uppercase tracking-widest font-sans flex items-center gap-2">
              Level 4 Granted
            </span>
          </div>
        </div>

        {/* Top Secret Document Wrapper */}
        <div className="border border-white/10 bg-[#030303] rounded-sm p-8 md:p-12 relative overflow-hidden group">
          
          <div className="absolute top-4 right-4 border border-white/20 text-white/20 px-2 py-1 font-mono text-[8px] uppercase tracking-widest -rotate-12 pointer-events-none group-hover:border-red-500/50 group-hover:text-red-500/50 transition-colors">
            Confidential
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-16 border-b border-white/5 pb-8">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Designation</span>
                <h3 className="text-2xl md:text-3xl font-serif text-white"><ScrambleText text={EDUCATION.degree} /></h3>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Facility</span>
                <span className="text-white text-lg font-sans"><ScrambleText text={EDUCATION.university} /></span>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-[#D4AF37] font-mono text-xs">{EDUCATION.year}</span>
                  <span className="text-white/30">|</span>
                  <span className="text-green-400 font-mono text-xs uppercase tracking-widest">CGPA: {EDUCATION.cgpa}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Core Vectors (Click to Expand)</span>
              
              <div className="grid grid-cols-1 gap-2">
                {EDUCATION.subjects.map((sub, i) => {
                  const isActive = activeSubject === i;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setActiveSubject(isActive ? null : i)}
                      className={`border p-4 cursor-pointer transition-all duration-300 ${isActive ? 'bg-white/[0.05] border-[#D4AF37]/50' : 'bg-transparent border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-mono text-sm uppercase tracking-widest ${isActive ? 'text-[#D4AF37]' : 'text-white/80'}`}>{sub.name}</span>
                        <span className="text-white/40 text-lg">{isActive ? '−' : '+'}</span>
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-4">
                              <div>
                                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest block mb-1">Theoretical Focus</span>
                                <p className="text-white/80 font-light text-sm">{sub.desc}</p>
                              </div>
                              <div>
                                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest block mb-1">Applied Engineering</span>
                                <p className="text-white/80 font-light text-sm text-[#D4AF37]">{sub.apps}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
