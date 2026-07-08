"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SystemMetrics() {
  const [uptime, setUptime] = useState(0);
  const [cpu, setCpu] = useState(12);

  useEffect(() => {
    // Uptime counter
    const timeInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    // Fake CPU jitter
    const cpuInterval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 20) + 5);
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen">
      
      {/* Top Right: System Status */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-6 right-6 flex flex-col items-end font-mono text-[9px] md:text-[10px] text-[#00E5FF]/70 uppercase tracking-widest leading-relaxed"
      >
        <span>SYS_UPTIME : {formatTime(uptime)}</span>
        <span>CPU_LOAD   : {cpu}%</span>
        <span>MEM_ALLOC  : 1.2GB / 64GB</span>
        <span className="mt-2 text-[#00E5FF]">{"[ACTIVE]"} LISTENING ON PORT 8080</span>
      </motion.div>

      {/* Bottom Left: Data Stream Log */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-6 flex flex-col font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest leading-relaxed"
      >
        <span>{">"} FETCHING DEPENDENCIES... OK</span>
        <span>{">"} MOUNTING REACT_DOM... OK</span>
        <span>{">"} ESTABLISHING SECURE CONNECTION</span>
        <span className="text-white/80 animate-pulse">_ AWAITING INPUT</span>
      </motion.div>

      {/* Vertical Scanner Lines (Left & Right) */}
      <div className="absolute top-0 left-4 w-[1px] h-full bg-white/5">
        <motion.div 
          className="w-full h-32 bg-gradient-to-b from-transparent via-[#00E5FF]/50 to-transparent absolute top-0"
          animate={{ y: ["-100vh", "100vh"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute top-0 right-4 w-[1px] h-full bg-white/5">
        <motion.div 
          className="w-full h-32 bg-gradient-to-b from-transparent via-[#00E5FF]/50 to-transparent absolute top-0"
          animate={{ y: ["100vh", "-100vh"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

    </div>
  );
}
