"use client";

import { motion } from "framer-motion";

export default function FloatingNavbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-6 py-4 bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-serif text-sm tracking-widest text-white uppercase">VNS</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-white/60">
          <a href="#projects" className="hover:text-[#D4AF37] transition-colors" data-cursor="magnetic">Projects</a>
          <a href="#experience" className="hover:text-[#D4AF37] transition-colors" data-cursor="magnetic">Experience</a>
          <a href="#expertise" className="hover:text-[#D4AF37] transition-colors" data-cursor="magnetic">Expertise</a>
        </div>

        {/* CTA */}
        <div>
          <a href="#contact" className="px-5 py-2.5 bg-white text-black rounded-full font-sans text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors" data-cursor="magnetic">
            Contact
          </a>
        </div>

      </div>
    </motion.nav>
  );
}
