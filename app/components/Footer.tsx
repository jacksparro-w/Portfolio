'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  
  Mail,
  ArrowUp,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-4">
              BRAJIN S J
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Full Stack Developer building scalable web applications,
              AI-powered solutions, and performance-driven systems.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              India
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Education",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Core Technologies
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>React / Next.js</li>
              <li>FastAPI</li>
              <li>PostgreSQL</li>
              <li>TypeScript</li>
              <li>Generative AI</li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Connect
            </h4>
            <div className="space-y-4 text-gray-400 text-sm mb-6">
              <a
                href="mailto:brajinbrajin10@gmail.com"
                className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Me
              </a>
              <a
                href="https://github.com/jacksparro-w"
                target="_blank"
                className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
              >
                {/* <Github className="w-4 h-4" /> */}
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/brajin-s-j"
                target="_blank"
                className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
              >
                {/* <Linkedin className="w-4 h-4" /> */}
                LinkedIn
              </a>
            </div>

            {/* Availability Badge */}
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs">
              Available for opportunities
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {year ?? ""} Brajin S J. All rights reserved.
          </p>

          {/* Scroll To Top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl text-black shadow-lg shadow-emerald-500/20"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}