"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import AICore from "@/components/canvas/AICore";
import { FileDown, Code, User, Mail } from "lucide-react";

// Advanced text assembly animation
const AssembleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <div className="relative inline-block overflow-hidden pb-4">
      {/* Light Sweep Effect */}
      <motion.div
        initial={{ left: "-100%" }}
        whileInView={{ left: "200%" }}
        viewport={{ once: false }}
        transition={{ delay: delay + 1, duration: 2, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] mix-blend-overlay z-20 pointer-events-none"
      />
      
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(20px)", y: 50, scale: 2 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 1.5,
            delay: delay + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block relative z-10"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  
  // Cinematic scroll descent into the AI Core
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 5]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const blurParallax = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(20px)"]);

  return (
    <motion.section 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black" 
      id="about"
    >
      {/* 3D Core Layer */}
      <motion.div 
        ref={ref}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ scale: scaleParallax }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
          <AICore />
        </Canvas>
      </motion.div>

      {/* Layered Background Enhancements (Noise, Grid) */}
      <div className="absolute inset-0 z-[1] bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Content Layer */}
      <motion.div 
        style={{ opacity: opacityParallax, filter: blurParallax }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-24"
      >
        
        {/* Assemble Text Reveal */}
        <h1 className="text-[14vw] md:text-[clamp(3rem,7.5vw,10rem)] font-serif font-light tracking-tighter text-white leading-[0.9] select-none flex flex-wrap md:flex-nowrap md:whitespace-nowrap justify-center gap-x-4 md:gap-x-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          <AssembleText text="Venkata" delay={1.0} />
          <AssembleText text="Naga" delay={1.2} />
          <AssembleText text="Sai" delay={1.4} />
        </h1>

        {/* Explicit Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
          className="mt-6 flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-[#D4AF37] font-mono text-sm md:text-base uppercase tracking-[0.3em]">
            AI & Full Stack Developer
          </h2>
          <p className="text-white/90 font-sans text-lg md:text-xl font-light max-w-2xl mx-auto">
            Building Intelligent Systems with AI, Machine Learning, and Modern Web Technologies.
          </p>
        </motion.div>

        {/* Primary Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a href="/resume.pdf" download="Venkata_Naga_Sai_Resume.pdf" className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/50 rounded-full hover:bg-[#D4AF37]/20 transition-all text-[#D4AF37] font-sans text-xs uppercase tracking-widest">
            <FileDown size={16} /> Download Resume
          </a>
          <a href="https://github.com/venkatanagasai01" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/10 rounded-full hover:bg-white/[0.1] hover:border-white/30 transition-all text-white font-sans text-xs uppercase tracking-widest">
            <Code size={16} /> View GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/10 rounded-full hover:bg-white/[0.1] hover:border-white/30 transition-all text-white font-sans text-xs uppercase tracking-widest">
            <User size={16} /> View LinkedIn
          </a>
          <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-[#D4AF37] hover:text-white transition-all font-sans text-xs uppercase tracking-widest">
            <Mail size={16} /> Contact Me
          </a>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2, delay: 3.0 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white/70 font-mono text-[10px] md:text-xs uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Software Developer Intern @ Testers Community
          </span>
          <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
          <span>Open to Full-Time Opportunities</span>
          <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
          <span>Expected Graduation: May 2027</span>
        </motion.div>

      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 4.0, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/60"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-mono opacity-50">Initiate System Descent</span>
        <div className="w-[1px] h-20 bg-white/5 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </motion.section>
  );
}
