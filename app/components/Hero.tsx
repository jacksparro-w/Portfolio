'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";

const techStack = [
  "React",
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Generative AI",
  "TypeScript",
  "Spring Boot",
];

const Hero: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  /* ================= Scroll Effects ================= */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.15), transparent)",
      "radial-gradient(circle at 70% 60%, rgba(20,184,166,0.25), transparent)",
    ]
  );

  /* ================= Rotating Tech Stack ================= */
  const [currentTech, setCurrentTech] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ================= 3D Tilt Effect ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  /* ================= Magnetic Button ================= */
  const magnetRef = useRef<HTMLAnchorElement>(null);

  const handleMagnet = (e: React.MouseEvent) => {
    const bounds = magnetRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    magnetRef.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetMagnet = () => {
    if (magnetRef.current)
      magnetRef.current.style.transform = "translate(0px,0px)";
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-slate-950 pt-28 pb-20"
    >
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ scale, y }} 
        className="absolute inset-0 w-full h-full z-0 opacity-40"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dynamic Scroll Gradient */}
      <motion.div
        style={{ background: bgGradient }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Floating Emerald Glow */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl z-10 pointer-events-none"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 h-full flex items-center px-8 md:px-20 max-w-7xl mx-auto"
      >
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="max-w-3xl"
        >
          {/* Micro Tag */}
          <p className="text-emerald-400 uppercase tracking-widest text-sm font-semibold">
            Full Stack Developer • AI Enthusiast
          </p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 text-5xl md:text-7xl font-black leading-tight text-white"
          >
            I build{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              scalable, intelligent
            </span>{" "}
            full stack applications.
          </motion.h1>

          {/* Supporting Line */}
          <p className="mt-6 text-gray-300 text-xl">
            Delivering production-ready systems with clean architecture and
            performance-focused engineering.
          </p>

          {/* Rotating Tech Stack */}
          <p className="mt-4 text-gray-400 text-lg">
            Specialized in{" "}
            <span className="text-emerald-400 font-semibold inline-block min-w-[120px]">
              {techStack[currentTech]}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-6">
            <a
              ref={magnetRef}
              href="#projects"
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-600 text-black font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-300 rounded-xl hover:scale-105"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-300 rounded-xl shadow-sm shadow-emerald-400/20"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 border-2 border-emerald-400/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-emerald-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;