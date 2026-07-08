"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[90] w-[95%] md:w-[90%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl relative z-50">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-serif text-sm tracking-widest text-white uppercase">VNS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-white/90">
          <a href="#projects" className="hover:text-accent transition-colors" data-cursor="magnetic">Projects</a>
          <a href="#experience" className="hover:text-accent transition-colors" data-cursor="magnetic">Experience</a>
          <a href="#expertise" className="hover:text-accent transition-colors" data-cursor="magnetic">Expertise</a>
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <a href="#contact" className="hidden md:inline-block px-5 py-2.5 bg-white text-black rounded-full font-sans text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-colors" data-cursor="magnetic">
            Contact
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 md:hidden shadow-2xl z-40"
          >
            <a href="#projects" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm uppercase tracking-widest text-white hover:text-accent hover:bg-white/5 rounded-xl transition-all">Projects</a>
            <a href="#experience" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm uppercase tracking-widest text-white hover:text-accent hover:bg-white/5 rounded-xl transition-all">Experience</a>
            <a href="#expertise" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm uppercase tracking-widest text-white hover:text-accent hover:bg-white/5 rounded-xl transition-all">Expertise</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 px-4 py-3 text-sm uppercase tracking-widest text-black bg-white text-center rounded-xl hover:bg-accent hover:text-white transition-all">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
