"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function Chapter4Keynotes() {
  const projects = Object.values(projectsData);

  return (
    <section className="relative w-full bg-[#030303] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="projects">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Full Width Abstract Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[#D4AF37] text-xs md:text-sm uppercase tracking-[0.4em] font-medium block">
              Algorithmic Models
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">
              Data Engines
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right flex flex-col gap-2 border-l border-[#D4AF37]/30 pl-6"
          >
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">System</span>
            <span className="text-[#D4AF37] text-sm uppercase tracking-widest">Active Nodes: {projects.length}</span>
          </motion.div>
        </div>

        {/* The Data Nodes */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`} className="block group">
                <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-white/[0.01] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.03] hover:border-[#D4AF37]/30 transition-all duration-500 relative">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-[#D4AF37]/5 blur-[60px] rounded-full group-hover:w-[120%] group-hover:h-[200%] transition-all duration-700 pointer-events-none" />

                  <div className="flex flex-col gap-4 relative z-10 w-full md:w-1/2">
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">Node {String(index + 1).padStart(2, '0')}</span>
                    <motion.h3 
                      layoutId={`project-title-${project.id}`}
                      className="text-3xl md:text-5xl font-serif text-white group-hover:text-[#D4AF37] transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-white/50 font-sans font-light mt-2 line-clamp-2">
                      {project.overview}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-6 relative z-10 mt-8 md:mt-0 w-full md:w-auto">
                    <div className="flex gap-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-black border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-xs uppercase tracking-[0.2em] font-sans">Initialize Connect</span>
                      <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-colors">
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
