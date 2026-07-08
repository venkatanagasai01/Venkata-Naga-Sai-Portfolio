"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "DSA Problems Solved", value: 200, suffix: "+" },
  { label: "Major Projects", value: 3, suffix: "" },
  { label: "Software Internship", value: 1, suffix: "" },
  { label: "Certifications", value: 4, suffix: "" }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end);

      const timer = setInterval(() => {
        start += 1;
        setCount(prev => {
          if (prev >= end) {
            clearInterval(timer);
            return end;
          }
          return start;
        });
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-7xl text-white">
      {count}{suffix}
    </span>
  );
}

export default function LiveStatus() {
  return (
    <section className="relative w-full bg-[#030303] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="status">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-accent font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" /> AI & Full Stack Development
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">Engineering Achievements</h2>
          </div>
          <div className="text-right flex flex-col gap-2 pl-6">
            <span className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-mono">Uptime</span>
            <span className="text-accent text-sm uppercase tracking-widest font-sans flex items-center gap-2">
              99.99% Nominal
            </span>
          </div>
        </div>

        {/* HUD Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col p-6 bg-white/[0.01] border border-white/5 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(var(--color-accent),0.05)_50%,transparent_100%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] pointer-events-none" />
              
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">{stat.label}</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <span key={j} className="w-1 h-3 bg-accent/20 group-hover:bg-accent transition-colors" style={{ transitionDelay: `${j * 100}ms` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
