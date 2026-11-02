'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// Removed unused logo import - Next.js handles public assets directly via root paths (e.g., "/logo.png")

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollY, scrollYProgress } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );

      sections.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // Trigger active state when section is near the top of the viewport
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(navItems[index].href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 shadow-lg shadow-black/30">
            
            {/* Name Logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center group"
            >
              <span className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
                  BRAJIN
                </span>{" "}
                <span className="text-white">S J</span>
              </span>
              {/* Underline Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-600 transition-all duration-300 group-hover:w-full" />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10 relative">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`relative text-sm uppercase tracking-widest transition-all duration-300 ${
                    active === item.href
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  {active === item.href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-600"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-3xl font-bold text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}