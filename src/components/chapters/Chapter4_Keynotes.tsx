"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData, ProjectData } from "@/data/projects";
import { useRef } from "react";
import Image from "next/image";

const ProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-500 relative min-h-[300px]">
          
          {/* Parallax Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-700">
            <motion.div style={{ y }} className="w-full h-[140%] absolute top-[-20%] left-0 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image 
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-[1]" />

          <div className="flex flex-col gap-4 relative z-10 w-full md:w-1/2">
            <span className="text-white/70 font-mono text-[10px] uppercase tracking-[0.3em]">Node {String(index + 1).padStart(2, '0')}</span>
            <motion.h3 
              layoutId={`project-title-${project.id}`}
              className="text-3xl md:text-5xl font-serif text-white group-hover:text-accent transition-colors"
            >
              {project.title}
            </motion.h3>
            <p className="text-white/80 font-sans font-light mt-2 line-clamp-2">
              {project.overview}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-6 relative z-10 mt-8 md:mt-0 w-full md:w-auto">
            <div className="flex gap-4 flex-wrap justify-end">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-white/90 group-hover:text-white transition-colors">
              <span className="text-xs uppercase tracking-[0.2em] font-sans">Initialize Connect</span>
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-full group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
        </div>
      </Link>
    </motion.div>
  );
};

export default function Chapter4Keynotes() {
  const projects = Object.values(projectsData);

  return (
    <section className="relative w-full bg-[#030303] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="projects">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Full Width Abstract Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="text-accent text-xs md:text-sm uppercase tracking-[0.4em] font-medium block">
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
            className="text-left md:text-right flex flex-col gap-2 border-l border-accent/30 pl-4 md:pl-6"
          >
            <span className="text-white/70 text-[10px] uppercase tracking-[0.3em]">System</span>
            <span className="text-accent text-sm uppercase tracking-widest">Active Nodes: {projects.length}</span>
          </motion.div>
        </div>

        {/* The Data Nodes */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
