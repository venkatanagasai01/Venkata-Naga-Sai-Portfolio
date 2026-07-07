"use client";

import { motion } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";

export default function SystemLogs() {
  return (
    <section className="relative w-full bg-transparent border-b border-white/20 p-6 lg:p-12 font-mono">
      
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Dense Metadata */}
        <div className="lg:col-span-3 flex flex-col gap-6 text-xs text-white/50 uppercase tracking-[0.2em] pt-4 border-t border-[#00E5FF]/30">
          <div className="flex flex-col gap-1">
            <span className="text-[#00E5FF] mb-2 font-bold">SYSTEM_LOGS // MODULE_01</span>
            <span>SUBJECT: BACKGROUND_DATA</span>
            <span>ACCESS_LEVEL: PUBLIC</span>
          </div>

          <div className="flex flex-col gap-2 mt-8 border-l border-white/10 pl-4">
            <div className="flex flex-col">
              <span className="text-white/30 text-[9px]">LOCATION</span>
              <span className="text-white/70">Hyderabad Telangana India</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/30 text-[9px]">TIMEZONE</span>
              <span className="text-white/70">IST (UTC +5:30)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/30 text-[9px]">STATUS</span>
              <span className="text-[#00E5FF]">Undergraduate AI & DS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/30 text-[9px]">CORE_COMPETENCY</span>
              <span className="text-white/70">Full-Stack AI Solutions</span>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Dense Data Block */}
        <div className="lg:col-span-9 flex flex-col gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 border-l border-white/10 pl-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white uppercase leading-none font-sans">
              <ScrambleText text="Professional Summary" />
            </h2>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-4xl mt-4 text-justify font-sans">
              AI & Data Science undergraduate at CBIT with strong foundations in Data Structures & Algorithms, Object-Oriented Programming, Java, Python, SQL, and Software Engineering. Experienced in building scalable full-stack applications using React, Next.js, Spring Boot, REST APIs, and modern databases while developing AI-powered solutions. Passionate about designing scalable software systems and building high-quality software solutions following software engineering principles.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 border-l border-white/10 pl-6 mt-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white uppercase leading-none font-sans mb-4">
              <ScrambleText text="Education" />
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base text-white/80 font-sans bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:border-[#00E5FF]/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6">
                <span className="text-[#00E5FF] font-bold text-xl md:text-2xl tracking-tight">Chaitanya Bharathi Institute of Technology (CBIT)</span>
                <span className="text-xs text-white/50 tracking-[0.2em] uppercase mt-2 md:mt-0 font-mono">Sep 2023 - Present</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4">
                <span className="font-semibold text-white/90 text-lg">Bachelor of Engineering (BE) in Artificial Intelligence And Data Science</span>
                <span className="text-xs text-white/50 tracking-[0.2em] font-mono mt-2 md:mt-0">(OU) Osmania University</span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-2 text-white/60 text-sm font-medium">
                <span className="px-3 py-1 bg-[#00E5FF]/10 text-[#00E5FF] rounded-full border border-[#00E5FF]/20">CGPA: 8.02/10</span>
                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">Expected Graduation: May 2027</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
