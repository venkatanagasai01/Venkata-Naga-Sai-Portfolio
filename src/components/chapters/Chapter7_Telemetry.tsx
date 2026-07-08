"use client";

import { motion } from "framer-motion";

export default function Chapter7Telemetry() {
  return (
    <section className="relative w-full bg-[#050505] py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5" id="capabilities">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-16">
        
        {/* Full Width Abstract Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="text-accent text-xs md:text-sm uppercase tracking-[0.4em] font-medium block">
              Quantitative Recognition
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">
              System Capabilities
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right flex flex-col gap-2 border-l border-accent/30 pl-6 max-w-sm"
          >
            <p className="text-white/80 font-sans font-light text-sm leading-relaxed">
              Continuous validation of algorithmic proficiency and enterprise-level system architecture capabilities.
            </p>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/3 flex flex-col gap-8"
          >
            <h3 className="text-2xl font-serif text-white border-b border-white/10 pb-4">Algorithmic Benchmarks</h3>
            <div className="flex flex-col gap-8">
              <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl hover:border-accent/30 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-5xl font-serif text-accent block mb-4">200+</span>
                  <p className="text-white/90 font-sans font-light leading-relaxed mb-4">
                    Complex algorithmic problems solved and optimized across competitive programming environments.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                  {["Dynamic Programming", "Graph Theory", "Advanced Trees", "Heuristics"].map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-widest text-white/70">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl hover:border-accent/30 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-5xl font-serif text-accent block mb-4">3+</span>
                  <p className="text-white/90 font-sans font-light leading-relaxed mb-4">
                    Enterprise-grade, full-stack AI architectures engineered, containerized, and deployed to production.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                  {["Microservices", "REST APIs", "CI/CD", "Load Balancing"].map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-widest text-white/70">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-2/3 flex flex-col"
          >
            <h3 className="text-2xl font-serif text-white border-b border-white/10 pb-4 mb-8">Enterprise Knowledge Base</h3>
            <div className="flex flex-col gap-6">
              {[
                { 
                  title: "Data Analytics Job Simulation", 
                  issuer: "Deloitte",
                  description: "Executed comprehensive data lifecycle management, utilizing advanced SQL querying, data normalization, and Tableau visualization to extract actionable business intelligence from massive enterprise datasets." 
                },
                { 
                  title: "Data Structures & Algorithms Mastery", 
                  issuer: "Smart Interviews",
                  description: "Mastered high-efficiency algorithm design, focusing on time/space complexity optimization (Big-O), advanced data structures (Tries, Segment Trees), and system-level performance tuning."
                },
                { 
                  title: "Data Science With Python", 
                  issuer: "Smarted Innovations",
                  description: "Engineered end-to-end machine learning pipelines. Gained deep proficiency in statistical modeling, feature engineering, and neural network optimization using Pandas, NumPy, and TensorFlow."
                },
                { 
                  title: "Full-Stack Web Development", 
                  issuer: "Internshala Trainings",
                  description: "Architected decoupled web applications, focusing on scalable RESTful API design, relational database schema modeling, and strictly typed component-driven frontends."
                }
              ].map((cert, index) => (
                <div key={index} className="flex flex-col bg-white/[0.01] p-8 rounded-3xl border border-white/5 group hover:border-accent/30 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 relative z-10">
                    <span className="text-white/90 font-serif text-xl md:text-2xl group-hover:text-accent transition-colors">{cert.title}</span>
                    <span className="text-accent/90 font-sans text-xs uppercase tracking-[0.2em] mt-2 md:mt-0 bg-accent/5 px-3 py-1 rounded-full border border-accent/20">{cert.issuer}</span>
                  </div>
                  <p className="text-white/80 font-sans font-light leading-relaxed relative z-10">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
