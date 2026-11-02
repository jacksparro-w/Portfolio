'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle } from "lucide-react";

// Experience data mapped from DOC-20260904-WA0002.pdf
const experiences = [
  {
    title: "FastAPI Developer",
    company: "Auction App Backend",
    period: "Dec 2025 - 18 Jan 2026",
    description: [
      "Designed and developed FastAPI backend services for an auction-based application.",
      "Implemented RESTful APIs for auction workflows, request handling and application data.",
      "Integrated the FastAPI backend with a React Native frontend through API integration.",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="experience"
      className="py-32 px-6 relative overflow-hidden bg-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent pointer-events-none" />

      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 mx-auto rounded-full" />
        </div>

        {/* Timeline Wrapper */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-400 via-teal-500 to-emerald-400"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1 }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="relative mb-16"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Left Card */}
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <motion.div
                    whileHover={{ rotateX: 5, rotateY: -5 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:border-emerald-400/40 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3 md:justify-end">
                      <Briefcase className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-emerald-400 font-semibold mb-2">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-400">{exp.period}</p>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-8 md:left-1/2 w-5 h-5 -ml-2.5 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full border-4 border-slate-950 shadow-lg shadow-emerald-500/30"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 }}
                />

                {/* Right Card */}
                <div className="md:w-1/2 md:pl-12 ml-16 md:ml-0">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:border-emerald-400/40 transition-all"
                  >
                    <ul className="space-y-4">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ delay: 0.7 + itemIndex * 0.15 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}