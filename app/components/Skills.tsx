'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  Code,
  Layout,
  Server,
  Database,
  Shield,
  Sparkles,
  Wrench,
  LucideIcon,
} from 'lucide-react';

type Accent = 'emerald' | 'cyan' | 'sky' | 'teal';

interface SkillCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
  accent: Accent;
}

// Custom data mapped from your resume content
const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    description: 'Strong foundations for scalable systems and application logic.',
    icon: Code,
    skills: ['Python', 'Java', 'JavaScript'],
    accent: 'emerald',
  },
  {
    title: 'Frontend',
    description: 'Responsive interfaces with performance-first architecture.',
    icon: Layout,
    skills: ['React.js', 'Next.js', 'HTML & CSS', 'Tailwind CSS', 'TypeScript'],
    accent: 'cyan',
  },
  {
    title: 'Backend',
    description: 'Reliable service layers designed for maintainability and speed.',
    icon: Server,
    skills: ['Spring Boot', 'FastAPI', 'Django (Basic)', 'REST APIs'],
    accent: 'sky',
  },
  {
    title: 'Database',
    description: 'Structured schemas and query design with production reliability.',
    icon: Database,
    skills: ['PostgreSQL'],
    accent: 'teal',
  },
  {
    title: 'Security & AI',
    description: 'Applied Generative AI workflows and secure access control models.',
    icon: Sparkles,
    skills: ['Gen AI', 'AI Chatbots', 'Prompt Engineering', 'JWT Auth', 'RBAC'],
    accent: 'emerald',
  },
  {
    title: 'Tools',
    description: 'Delivery tooling that keeps deployments stable and efficient.',
    icon: Wrench,
    skills: ['Git & GitHub', 'Docker', 'Vercel', 'Netlify', 'VS Code', 'Postman'],
    accent: 'sky',
  },
];

const SkillCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Spotlight position values
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const accentMap: Record<Accent, { glow: string; icon: string; ring: string }> = {
    emerald: { glow: 'rgba(16,185,129,0.3)', icon: 'text-emerald-300', ring: 'group-hover:border-emerald-400/50' },
    cyan: { glow: 'rgba(34,211,238,0.3)', icon: 'text-cyan-300', ring: 'group-hover:border-cyan-400/50' },
    sky: { glow: 'rgba(56,189,248,0.3)', icon: 'text-sky-300', ring: 'group-hover:border-sky-400/50' },
    teal: { glow: 'rgba(45,212,191,0.3)', icon: 'text-teal-300', ring: 'group-hover:border-teal-400/50' },
  };
  
  const accent = accentMap[category.accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={prefersReducedMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-full h-full group"
    >
      {/* Dynamic Background Aura */}
      <div className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
           style={{ backgroundColor: accent.glow }} />

      <div className={`relative overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 ${accent.ring} p-6 rounded-2xl h-full flex flex-col min-h-[245px] transition-all duration-300 shadow-2xl`}>
        
        {/* Interactive Spotlight Shine */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.06), transparent 40%)`
            )
          }}
        />

        {/* Laser-Scan Line Effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-scan" />

        <div style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(40px)' }} className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-slate-800 border border-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <category.icon className={`w-5 h-5 ${accent.icon}`} />
          </div>
          <h3 className="font-bold text-white text-lg tracking-tight">{category.title}</h3>
        </div>

        <p style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(25px)' }} className="text-sm leading-relaxed text-slate-300 mb-5">
          {category.description}
        </p>

        <div style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(20px)' }} className="flex flex-wrap gap-2 mt-auto">
          {category.skills.map((s, i) => (
            <span key={i} className="px-2.5 py-1 bg-black/40 border border-slate-800 rounded-md text-[11px] text-slate-300 group-hover:border-white/20 transition-colors">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const cardsCount = skillCategories.length;
  const skillsCount = skillCategories.reduce((total, category) => total + category.skills.length, 0);

  return (
    <section id="skills" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
      {/* CSS Keyframes for Scan Line Effect */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(800%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section (Persisted Content) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-emerald-400" />
            <span className="text-emerald-300 uppercase tracking-widest font-semibold text-xs">Technical Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Expertise.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-light">
            Building production-ready systems with a stack focused on scalability, robust APIs, and modern UI engineering.
          </p>
          
          {/* Stats Bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm text-slate-300">{cardsCount} Domains</div>
            <div className="px-5 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm text-slate-300">{skillsCount}+ Core Technologies</div>
            <div className="px-5 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm text-slate-300">FastAPI & Gen AI Focus</div>
          </div>
        </motion.div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <SkillCard category={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}