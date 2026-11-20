"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Send, ChevronDown, Feather, Orbit } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

let openedDuringVisit = false;

export function EnvelopeHero() {
  const root = useRef<HTMLDivElement>(null);
  const flap = useRef<HTMLDivElement>(null);
  const letter = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLButtonElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  const { contextSafe } = useGSAP(() => {
    if (openedDuringVisit) {
      setOpened(true);
      gsap.set(seal.current, { opacity: 0 });
      gsap.set(flap.current, { rotateX: 180, zIndex: 0, transformOrigin: "top center" });
      gsap.set(letter.current, { y: -56, scale: 1.015, zIndex: 6, opacity: 1 });
      gsap.set([".open-story", ".open-story-tether"], { opacity: 0 });
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".envelope-stage", { y: 34, opacity: 0, duration: 1.05 })
      .from(".hero-copy > *", { y: 18, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.35")
      .from(".hero-actions > *", { y: 12, opacity: 0, stagger: 0.12, duration: 0.5 }, "-=0.2");

    gsap.to(seal.current, {
      scale: 1.055,
      rotate: 2,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-dust", {
      y: -18,
      x: 7,
      opacity: 0.15,
      duration: 4,
      stagger: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: root });

  const openLetter = contextSafe(() => {
    if (opened || !flap.current || !letter.current || !seal.current) return;
    openedDuringVisit = true;
    setOpened(true);

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(seal.current, { scale: 0.45, rotate: -18, opacity: 0, duration: 0.28 })
      .to(flap.current, { rotateX: 180, zIndex: 0, duration: 0.8, transformOrigin: "top center" }, "-=0.05")
      // Keep the extracted letter inside the visible envelope/viewport area.
      // The previous sequence moved it up by 247px, placing most of it behind the sticky header.
      .to(letter.current, { y: -56, scale: 1.015, zIndex: 6, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.18")
      .fromTo(".letter-reveal > *", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.45 }, "-=0.25")
      .to([".open-story", ".open-story-tether"], { y: 8, opacity: 0, duration: 0.25 }, "-=0.35");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.progress(1);
  });

  return (
    <div ref={root} className="home-hero">
      <span className="floating-dust dust-one" aria-hidden="true" />
      <span className="floating-dust dust-two" aria-hidden="true" />
      <span className="floating-dust dust-three" aria-hidden="true" />

      <div className="hero-ornament ornament-left"><Orbit size={40} strokeWidth={1} /></div>
      <div className="hero-ornament ornament-right"><Feather size={58} strokeWidth={1} /></div>

      <div className={`envelope-stage ${opened ? "is-open" : ""}`}>
        <div className="envelope">
          <div className="letter-inside" ref={letter} aria-live="polite">
            <div className="letter-reveal">
              <p className="letter-kicker">A PERSONAL LETTER FROM AN ASPIRING ENGINEER</p>
              <p className="script small-script">Dear Visitor,</p>
              <p className="letter-body">I am Brajin S J, an aspiring software engineer passionate about building meaningful technology, solving real-world problems, and exploring AI and space technology.</p>
              <p className="script letter-motto">Every line of code is another chapter in my journey.</p>
              <div className="letter-bottom">
                <p className="letter-signature script">Brajin S J</p>
              </div>
            </div>
          </div>
          <div className="envelope-back" />
          <div className="envelope-front">
            <div className="envelope-stamp"><span>✦</span><b>SPACE<br/>POST</b></div>
            <div className="envelope-art"><span>♧</span><span>⌁</span><span>✦</span></div>
            <div className="envelope-fold" />
            <div className="envelope-flap" ref={flap} />
            <div className="envelope-twine" aria-hidden="true" />
            <button ref={seal} className="wax-seal" disabled={opened} onClick={openLetter} aria-label="Break the wax seal and open the letter"><span>B</span></button>
          </div>
          <div className="envelope-heading" aria-label="A Letter From An Aspiring Engineer, Brajin S J, Software Developer, Full Stack Developer and AI/ML Enthusiast">
            <p className="script">A Letter From An Aspiring Engineer</p>
            <h1>BRAJIN S J</h1>
            <p className="role script">Software Developer</p>
            <p className="hero-tags">FULL STACK DEVELOPER <span>✦</span> AI/ML ENTHUSIAST</p>
          </div>
        </div>
        <svg className="open-story-tether" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
          <path className="tether-shadow" d="M 884 365 C 918 372 925 396 958 414" />
          <path className="tether-line" d="M 884 362 C 918 369 925 393 958 411" />
          <circle cx="884" cy="362" r="6" className="tether-knot" />
        </svg>
        <button className="open-story" onClick={openLetter} disabled={opened}>
          <span className="tag-hole" aria-hidden="true" />
          {opened ? "The story begins" : "Open My Story"} <span className="tag-arrow">→</span>
        </button>
      </div>

      <div ref={copy} className="hero-copy">
        <p className="script greeting">Dear Visitor,</p>
        <p className="hero-description">I am an aspiring software engineer passionate about building meaningful technology, solving real-world problems, and exploring the future of artificial intelligence and space technology.</p>
        <p className="script golden-line">Every line of code I write is another chapter in my journey.</p>
        <div className="hero-actions">
          <a className="button button-paper" href="/resume.pdf" download><Download size={17} /> Download Resume</a>
          <Link className="button button-outline" href="/contact"><Send size={16} /> Contact Me</Link>
        </div>
      </div>

      <a className="scroll-cue" href="#next" aria-label="Scroll to explore">
        <span className="scroll-mouse"/><span>Scroll To Explore</span><ChevronDown size={17}/>
      </a>
    </div>
  );
}
