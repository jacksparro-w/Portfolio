'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

// Project data mapped from DOC-20260904-WA0002.pdf
const projects = [
  {
    title: "Spring Boot E-Commerce Backend",
    description:
      "Designed REST APIs for core e-commerce operations. Implemented business logic using a layered Controller, Service, and Repository architecture with JPA-based data access.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    github: "https://github.com/jacksparro-w",
    demo: null,
  },
  {
    title: "E-DNA Analysis Solution",
    description:
      "Contributed to full-stack development and problem-solving for an E-DNA analysis pipeline. Integrated LLM-based functionality to support project workflows and application features.",
    tech: ["Full-Stack", "LLMs", "Integration"],
    github: "https://github.com/jacksparro-w",
    demo: null,
  },
  {
    title: "FastAPI Backend for Auction App",
    description:
      "Designed scalable REST APIs and backend logic for auction workflows. Integrated backend services with a React Native client through structured API communication.",
    tech: ["FastAPI", "Python", "React Native", "REST API"],
    github: "https://github.com/jacksparro-w",
    demo: null,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="projects"
      className="relative py-32 px-6 bg-slate-950 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="relative group h-full"
            >
              <motion.div
                whileHover={{ rotateX: 5, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl hover:border-emerald-400/40 transition-all"
              >
                {/* Index Badge */}
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl mb-6 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-emerald-500/20">
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-lg text-xs font-medium text-emerald-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {/* <Github className="w-4 h-4" /> */}
                    GitHub
                  </motion.a>

                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-lg text-sm text-black font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}