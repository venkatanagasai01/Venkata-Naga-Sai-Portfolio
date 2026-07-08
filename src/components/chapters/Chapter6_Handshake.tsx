"use client";

import { motion } from "framer-motion";
import { Mail, Code, User, FileDown, TerminalSquare, Phone, MapPin } from "lucide-react";

export default function Chapter6Handshake() {
  return (
    <section className="relative w-full bg-[#050505] py-32 px-6 lg:px-12 border-t border-white/10" id="contact">
      
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center gap-12 relative z-10">
        
        {/* Availability Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 bg-green-500/10 border border-green-500/30 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">
            Open for Software Engineering, AI & Full-Stack Roles
          </span>
        </motion.div>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
            Establish Connection
          </h2>
          <p className="text-white/80 font-sans text-lg md:text-xl font-light max-w-2xl mx-auto">
            Ready to architect the next generation of intelligent software. Initiate a secure line of communication below.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
          
          <a href="mailto:venkatanagasai01@gmail.com" className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors text-white">
                <Mail size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Email</span>
                <span className="text-white font-sans text-sm md:text-base">venkatanagasai01@gmail.com</span>
              </div>
            </div>
          </a>

          <a href="tel:+918919025292" className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors text-white">
                <Phone size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Phone</span>
                <span className="text-white font-sans text-sm md:text-base">+91 89190 25292</span>
              </div>
            </div>
          </a>

          <div className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl text-white">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Location</span>
                <span className="text-white font-sans text-sm md:text-base">Remote / India</span>
              </div>
            </div>
          </div>

          <a href="https://linkedin.com" target="_blank" className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors text-white">
                <User size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Network</span>
                <span className="text-white font-sans text-sm md:text-base">LinkedIn</span>
              </div>
            </div>
            <TerminalSquare size={16} className="text-white/50 group-hover:text-[#D4AF37] transition-colors hidden md:block" />
          </a>

          <a href="https://github.com/venkatanagasai01" target="_blank" className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors text-white">
                <Code size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Repositories</span>
                <span className="text-white font-sans text-sm md:text-base">GitHub</span>
              </div>
            </div>
            <TerminalSquare size={16} className="text-white/50 group-hover:text-[#D4AF37] transition-colors hidden md:block" />
          </a>

          <a href="/resume.pdf" target="_blank" className="group flex items-center justify-between p-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D4AF37]/20 rounded-xl text-[#D4AF37]">
                <FileDown size={24} />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest">Document</span>
                <span className="text-[#D4AF37] font-sans text-sm md:text-base">Download Resume</span>
              </div>
            </div>
            <TerminalSquare size={16} className="text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors hidden md:block" />
          </a>

        </div>

      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center opacity-30 mt-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white">
          VNS OS // System Terminal Ready
        </span>
      </div>

    </section>
  );
}
