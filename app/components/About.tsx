'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Creates a subtle parallax vertical shift
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: easeCurve } 
    },
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full py-40 text-white overflow-hidden bg-slate-950"
    >
      {/* Background Glow matching Contact/Footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Image (Glassmorphic Container with Parallax) */}
        <motion.div 
          className="md:col-span-5 relative group"
          style={{ y }} 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-2 shadow-2xl">
            {/* Ensure Profile.png is placed in your public/ folder */}
            <img
              src="/Profile.jpeg"
              alt="Brajin S J"
              className="w-full h-[400px] md:h-[550px] object-cover rounded-2xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Decorative Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <motion.div variants={textVariants} className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-400 to-teal-600" />
            <span className="text-emerald-400 uppercase tracking-widest font-semibold text-sm">
              Discover My Journey
            </span>
          </motion.div>

          <motion.h2 variants={textVariants} className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 tracking-tight text-white">
            Engineering <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              The Future.
            </span>
          </motion.h2>

          <motion.p variants={textVariants} className="text-lg md:text-xl leading-relaxed text-gray-400 mb-8">
            I am a Full-Stack Developer specializing in <span className="text-white font-semibold">React, Next.js, FastAPI,</span> and <span className="text-white font-semibold">PostgreSQL</span>. I build scalable, performance-focused applications seamlessly blending clean backend architecture with high-end UI experiences.
          </motion.p>

          <motion.div 
            variants={textVariants} 
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg border-l-4 border-l-emerald-400">
              <p className="text-lg leading-relaxed text-gray-300">
                Currently pursuing a <span className="text-emerald-400 font-semibold">B.E in Computer Science</span> with a <span className="text-emerald-400 font-semibold">CGPA of 8.35</span>, actively pushing boundaries in <span className="text-emerald-400">Generative AI</span> and backend development.
              </p>
            </div>
          </motion.div>

          <motion.div variants={textVariants}>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-3 relative group px-8 py-4 font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-emerald-400 to-teal-600 text-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
            >
              <span>View Projects</span>
              <svg 
                className="w-5 h-5 transform transition-transform group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}