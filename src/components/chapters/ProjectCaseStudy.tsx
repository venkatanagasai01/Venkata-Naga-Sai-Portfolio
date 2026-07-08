"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectData } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, Code, ExternalLink, Activity, BookOpen, AlertCircle, Server, TrendingUp, Network } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.3em]">{subtitle}</span>}
    <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">{title}</h2>
  </div>
);

export default function ProjectCaseStudy({ project }: { project: ProjectData }) {
  const { scrollYProgress } = useScroll();
  
  const yParallax = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-[#030303] flex flex-col z-[100]"
    >
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <Link 
          href="/"
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <ArrowLeft size={16} className="text-white group-hover:-translate-x-1 transition-transform" />
          <span className="text-white text-xs uppercase tracking-widest font-mono">Return to Core OS</span>
        </Link>
      </div>

      {/* 1. Hero */}
      <motion.section 
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative w-full min-h-[90svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 border-b border-white/5"
      >
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#030303]/95 to-[#030303] z-10" />
          <Image 
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
        </div>

        <div className="relative z-20 flex flex-col items-center">
          <h1 className="text-5xl md:text-[8vw] font-serif tracking-tight text-white leading-none mb-6 drop-shadow-2xl">
            {project.title}
          </h1>
          
          <div className="flex flex-col items-center gap-8 max-w-4xl">
            <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.3em]">{project.tagline}</span>
            <p className="text-white font-sans text-xl md:text-2xl font-light leading-relaxed">
              {project.overview}
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60">
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-[#D4AF37]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.section>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-32 flex flex-col gap-40 relative z-10">
        
        {/* Links */}
        <div className="flex gap-6">
          {!project.githubUrl?.includes("[TODO") && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition-colors">
              <Code size={18} className="text-white" />
              <span className="text-white font-mono text-xs uppercase tracking-widest">View Source Code</span>
            </a>
          )}
        </div>

        {/* The Problem & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {!project.problemStatement.includes("[TODO") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading title="The Problem" subtitle="01 // Challenge" />
              <p className="text-white font-sans text-lg font-light leading-relaxed border-l border-red-500/30 pl-6">
                {project.problemStatement}
              </p>
            </motion.section>
          )}

          {!project.solution.includes("[TODO") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <SectionHeading title="The Solution" subtitle="02 // Approach" />
              <p className="text-white font-sans text-lg font-light leading-relaxed border-l border-[#D4AF37]/30 pl-6">
                {project.solution}
              </p>
            </motion.section>
          )}
        </div>

        {/* Features */}
        {project.features.filter(f => !f.includes("[TODO")).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading title="Key Features" subtitle="03 // Capabilities" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <Activity className="text-[#D4AF37] shrink-0 mt-1" size={20} />
                  <span className="text-white font-light leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* System Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading title="System Architecture" subtitle="04 // Engineering" />
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 flex flex-col gap-6">
              <p className="text-white font-sans text-lg font-light leading-relaxed">
                {project.systemArchitecture}
              </p>
              
              {project.architectureDiagramDesc && !project.architectureDiagramDesc.includes("[TODO") && (
                <div className="mt-4 p-6 bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center text-center">
                  <span className="text-[#D4AF37] font-mono text-sm tracking-widest">{project.architectureDiagramDesc}</span>
                </div>
              )}

              {project.deployment && !project.deployment.includes("[TODO") && (
                <div className="mt-8 p-8 bg-[#050505] border border-white/10 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <span className="text-blue-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Server size={14} /> Deployment & Infrastructure
                  </span>
                  <p className="text-white font-light">{project.deployment}</p>
                </div>
              )}

              {project.aiPipeline && !project.aiPipeline.includes("[TODO") && (
                <div className="mt-4 p-8 bg-[#050505] border border-white/10 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Network size={14} /> AI Pipeline
                  </span>
                  <p className="text-white font-light">{project.aiPipeline}</p>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-white font-serif text-2xl mb-8">Technology Stack</h4>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white font-mono tracking-wide hover:border-[#D4AF37]/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Challenges & Lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {project.challenges.filter(c => !c.includes("[TODO")).length > 0 && (
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading title="Technical Challenges" subtitle="05 // Obstacles" />
              <div className="flex flex-col gap-6">
                {project.challenges.map((chal, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-red-900/10 border border-red-500/20 rounded-2xl">
                    <AlertCircle className="text-red-400 shrink-0 mt-1" size={20} />
                    <span className="text-white font-light leading-relaxed">{chal}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {project.lessonsLearned.filter(l => !l.includes("[TODO")).length > 0 && (
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading title="Lessons Learned" subtitle="06 // Growth" />
              <div className="flex flex-col gap-6">
                {project.lessonsLearned.map((lesson, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-blue-900/10 border border-blue-500/20 rounded-2xl">
                    <BookOpen className="text-blue-400 shrink-0 mt-1" size={20} />
                    <span className="text-white font-light leading-relaxed">{lesson}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {project.futureImprovements && project.futureImprovements.filter(f => !f.includes("[TODO")).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16"
          >
            <SectionHeading title="Future Roadmap" subtitle="07 // Evolution" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.futureImprovements.map((imp, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <TrendingUp className="text-green-400 shrink-0 mt-1" size={20} />
                  <span className="text-white font-light leading-relaxed">{imp}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

      </div>
    </motion.div>
  );
}
