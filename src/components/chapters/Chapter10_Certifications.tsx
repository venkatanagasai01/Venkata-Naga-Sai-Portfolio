"use client";

import { motion } from "framer-motion";
import { Shield, ExternalLink, Award, Calendar, CheckCircle2 } from "lucide-react";

const CERTIFICATIONS = [
  { id: "C01", name: "Data Structures & Algorithms Mastery", issuer: "Smart Interviews", year: "2025", skillsLearned: "Data Structures, Algorithms, Time Complexity Optimization", url: "#" },
  { id: "C02", name: "Data Science With Python", issuer: "Smarted Innovations", year: "2025", skillsLearned: "Python, Data Science, Pandas, Numpy", url: "#" },
  { id: "C03", name: "Data Analytics Job Simulation", issuer: "Deloitte", year: "2025", skillsLearned: "Data Analysis, Consulting, Problem Solving", url: "#" },
  { id: "C04", name: "Web Development", issuer: "Internshala Trainings", year: "2024", skillsLearned: "Web Development, HTML/CSS/JS", url: "#" }
];

export default function Chapter10Certifications() {
  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5 overflow-hidden" id="certifications">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[#D4AF37] font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center gap-2">
            <Shield size={14} /> Security Clearance
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">
            Verified Credentials
          </h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors backdrop-blur-sm"
            >
              {/* Highlight sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              <div className="relative z-10 flex flex-col gap-6">
                
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-xl text-[#D4AF37]">
                    <Award size={24} />
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-mono text-[10px] uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{cert.name}</h3>
                  <div className="flex items-center gap-4 text-white/80 font-mono text-xs">
                    <span>{cert.issuer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {cert.year}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Skills Acquired</span>
                  <span className="text-white font-sans text-sm">{cert.skillsLearned}</span>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-white/60 font-mono text-[10px] tracking-widest">ID: {cert.id}</span>
                  <a href={cert.url} className="flex items-center gap-2 text-white/90 hover:text-[#D4AF37] text-xs uppercase tracking-widest font-mono transition-colors">
                    View Credential <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
