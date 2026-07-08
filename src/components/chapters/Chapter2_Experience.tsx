"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Cpu, MapPin, CheckCircle2, ChevronRight, Layers, Network, Terminal, ShieldAlert, TrendingUp, Database, Zap, BookOpen } from "lucide-react";
import { useState } from "react";

const EXPERIENCES = [
  {
    id: "reachfront-ai",
    company: "Testers Community",
    product: "ReachFront AI",
    role: "Software Developer Intern",
    duration: "June 2026 - Present",
    location: "Remote",
    overview: "Engineered a scalable, AI-driven SaaS ecosystem designed to automate lead generation and streamline customer engagement. Tasked with constructing highly responsive, data-intensive architectures using modern web technologies and advanced machine learning integrations.",
    responsibilities: [
      "Integrated complex REST APIs and AI-powered workflows into a high-performance frontend.",
      "Automated structured data collection and lead enrichment pipelines.",
      "Architected secure user authentication and real-time database synchronization.",
      "Collaborated using Git, GitHub, Agile workflows, and peer code reviews.",
      "Optimized production builds for maximum lighthouse performance scores."
    ],
    aiFeaturesBuilt: [
      "Designed intelligent lead qualification pipelines leveraging Claude AI for natural language parsing.",
      "Built automated extraction systems to map unstructured web data into actionable client profiles.",
      "Implemented semantic search capabilities for filtering high-value targets."
    ],
    frontendContributions: [
      "Engineered an interactive analytics dashboard for real-time lead visualization using React and Next.js.",
      "Implemented aggressive memoization and virtualized lists to handle rendering thousands of nodes.",
      "Designed a responsive, premium user interface utilizing Tailwind CSS."
    ],
    backendContributions: [
      "Deployed automated background workers to handle large-scale data enrichment asynchronously.",
      "Configured robust Supabase schemas for real-time Postgres synchronization.",
      "Engineered secure, scalable RESTful API endpoints for seamless data flow."
    ],
    apisUsed: [
      "Claude AI for advanced natural language processing and semantic data analysis.",
      "Serper API for programmatic real-time search engine scraping and validation.",
      "Oxylabs for high-throughput, distributed proxy routing and web extraction.",
      "Supabase for database synchronization and secure JWT authentication."
    ],
    performanceImprovements: [
      "Achieved a 95+ Lighthouse performance score through rigorous Core Web Vitals optimization.",
      "Reduced bundle size by 40% using dynamic imports and tree-shaking.",
      "Eliminated layout shifts and achieved stable 60 FPS scrolling on heavy data grids."
    ],
    techStack: ["React", "Next.js", "TypeScript", "Supabase", "REST APIs", "Claude AI", "Serper API", "Oxylabs", "Tailwind CSS", "Git", "GitHub"],
    problemsSolved: [
      "Resolved complex state synchronization issues between the Next.js client components and the Supabase real-time backend.",
      "Overcame severe rate-limiting constraints by implementing distributed proxy routing via Oxylabs."
    ],
    engineeringLearnings: [
      "Mastered the complexities of scaling real-time distributed state in modern React applications.",
      "Gained deep insights into orchestrating LLM APIs reliably within asynchronous production workflows."
    ],
    businessImpact: [
      "Dramatically accelerated the automated lead generation pipeline, effectively eliminating manual data entry.",
      "Increased user retention by providing a fluid, zero-latency dashboard experience."
    ]
  }
];

export default function Chapter2Experience() {
  const [expandedSection, setExpandedSection] = useState<string>("responsibilities");
  const exp = EXPERIENCES[0];

  const SECTIONS = [
    { id: "responsibilities", title: "Responsibilities", icon: Terminal, data: exp.responsibilities },
    { id: "aiFeaturesBuilt", title: "AI Features Built", icon: Cpu, data: exp.aiFeaturesBuilt },
    { id: "frontendContributions", title: "Frontend Contributions", icon: Layers, data: exp.frontendContributions },
    { id: "backendContributions", title: "Backend Contributions", icon: Database, data: exp.backendContributions },
    { id: "apisUsed", title: "APIs Used", icon: Network, data: exp.apisUsed },
    { id: "performanceImprovements", title: "Performance Improvements", icon: Zap, data: exp.performanceImprovements },
    { id: "problemsSolved", title: "Problems Solved", icon: ShieldAlert, data: exp.problemsSolved },
    { id: "engineeringLearnings", title: "Engineering Learnings", icon: BookOpen, data: exp.engineeringLearnings },
    { id: "businessImpact", title: "Business Impact", icon: TrendingUp, data: exp.businessImpact },
  ];

  return (
    <section className="relative min-h-screen bg-[#050505] py-32 px-6 md:px-12 flex flex-col items-center border-t border-white/10" id="experience">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[1400px] z-10 flex flex-col gap-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.4em] flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50" />
            Classified Dossier
          </span>
          <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-none">Engineering Experience</h2>
        </motion.div>

        {/* Dossier Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col xl:flex-row"
        >
          {/* Left Column: Core Metadata & Overview */}
          <div className="w-full xl:w-[400px] bg-black/50 p-8 md:p-12 border-b xl:border-b-0 xl:border-r border-white/10 flex flex-col shrink-0">
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4 text-white/70 font-mono text-xs uppercase tracking-widest">
                <Briefcase size={16} className="text-[#D4AF37]" />
                Primary Deployment
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-serif text-white">{exp.company}</h3>
                <span className="text-[#D4AF37] font-mono text-sm">{exp.product}</span>
                <span className="text-white font-sans text-lg mt-2">{exp.role}</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-white/90 font-mono text-xs">
                  <Calendar size={14} /> {exp.duration}
                </div>
                <div className="flex items-center gap-3 text-white/90 font-mono text-xs">
                  <MapPin size={14} /> {exp.location}
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              <div className="flex flex-col gap-2">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Overview</span>
                <p className="text-white font-sans font-light leading-relaxed text-sm">
                  {exp.overview}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              <div className="flex flex-col gap-4">
                <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white font-mono uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Expandable Engineering Panels */}
          <div className="w-full p-8 md:p-12 flex flex-col gap-4">
            
            <div className="grid grid-cols-1 gap-4">
              {SECTIONS.map((section) => (
                <div 
                  key={section.id} 
                  className={`w-full border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${expandedSection === section.id ? "bg-white/[0.03]" : "bg-transparent hover:bg-white/[0.01]"}`}
                >
                  <button 
                    onClick={() => setExpandedSection(section.id === expandedSection ? "" : section.id)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <section.icon size={18} className={expandedSection === section.id ? "text-[#D4AF37]" : "text-white/70"} />
                      <span className={`font-serif text-lg md:text-xl transition-colors ${expandedSection === section.id ? "text-white" : "text-white/90"}`}>
                        {section.title}
                      </span>
                    </div>
                    <ChevronRight size={18} className={`text-white/70 transition-transform duration-300 ${expandedSection === section.id ? "rotate-90 text-[#D4AF37]" : ""}`} />
                  </button>

                  <div 
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${expandedSection === section.id ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <ul className="flex flex-col gap-4">
                      {section.data.map((item, idx) => {
                        const words = item.split(" ");
                        const firstWord = words[0];
                        const rest = words.slice(1).join(" ");
                        
                        return (
                          <li key={idx} className="flex items-start gap-4 text-white font-light leading-relaxed">
                            <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-1" />
                            <span>
                              <strong className="text-white font-medium">{firstWord}</strong> {rest}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
