import "./journal.css";
import {
  BrainCircuit,
  Code2,
  Cog,
  GraduationCap,
  Github,
  Linkedin,
  MapPin,
  Rocket,
  Mail,
  Target,
  TrendingUp,
} from "lucide-react";

const education = [
  {
    title: "B.E. Computer Science and Engineering",
    institution: "Hindusthan College of Engineering and Technology",
    period: "2023 – 2027",
    result: "CGPA: 8.35",
  },
  {
    title: "HSC (12th)",
    institution: "S.N.M. Hindhu Vidyalaya Matric Higher Secondary School",
    period: "2022 – 2023",
    result: "90%",
  },
  {
    title: "SSLC (10th)",
    institution: "S.N.M. Hindhu Vidyalaya Matric Higher Secondary School",
    period: "2020 – 2021",
    result: "Pass",
  },
];

const interests = [
  { label: "Full-Stack\nDevelopment", icon: Code2 },
  { label: "AI / ML\n& GenAI", icon: BrainCircuit },
  { label: "Space\nTechnology", icon: Rocket },
  { label: "System\nDesign", icon: Cog },
  { label: "Real-world\nProblem Solving", icon: TrendingUp },
];

export default function AboutPage() {
  return (
    <div className="about-scene" aria-labelledby="about-heading">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <filter id="about-paper-fibers" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".085" numOctaves="3" seed="12" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <section className="about-spread">
        <aside className="about-profile-page">
          <div className="about-portrait-frame" role="img" aria-label="Brajin looking up at the sunset, in a paper-clipped photograph" />
          <h2 className="about-name">BRAJIN S J</h2>
          <p className="script about-role">Software Developer</p>
          <div className="about-profile-links">
            <span><MapPin aria-hidden="true" /> India</span>
            <a href="mailto:brajin@example.com"><Mail aria-hidden="true" /> brajin@example.com</a>
            <a href="https://github.com/brajinsj" target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> github.com/brajinsj
            </a>
            <a href="https://linkedin.com/in/brajinsj" target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /> linkedin.com/in/brajinsj
            </a>
          </div>
          <div className="about-mountain-art" aria-hidden="true" />
        </aside>

        <div className="about-spine" aria-hidden="true">
          <span /><span /><span />
        </div>

        <section className="about-letter-page">
          <div className="about-sky" aria-hidden="true" />
          <h1 id="about-heading" className="script about-heading">A Little About My Journey</h1>
          <div className="about-main-columns">
            <article className="about-story">
              <p className="script about-dear">Dear Visitor,</p>
              <p>
                I am a detail-oriented Software Engineer and a passionate Full-Stack Developer
                with a deep interest in building meaningful and scalable web applications. I
                enjoy turning ideas into real-world solutions through clean code, thoughtful
                design, and modern technologies.
              </p>
              <p>
                My core interest lies in backend development, full-stack engineering, and
                creating efficient, user-focused systems. I am also actively exploring
                Artificial Intelligence, Machine Learning, and Generative AI, with a curiosity
                to understand how these technologies can solve real-world problems at scale.
              </p>
              <p>
                Beyond software, I am fascinated by space technology and its possibilities, and
                I aspire to contribute to innovations that combine computing, AI, and space
                research.
              </p>
              <blockquote className="about-quote">
                <span aria-hidden="true">“</span>
                My goal is to build technology that solves practical problems and creates a
                positive impact.
                <span aria-hidden="true">”</span>
              </blockquote>
            </article>

            <aside className="about-details">
              <section className="about-education" aria-labelledby="education-heading">
                <h2 id="education-heading"><GraduationCap aria-hidden="true" /> Education</h2>
                <div className="about-education-list">
                  {education.map((item) => (
                    <article className="about-education-item" key={item.title}>
                      <span className="education-dot" aria-hidden="true" />
                      <h3>{item.title}</h3>
                      <p>{item.institution}</p>
                      <div className="education-meta">
                        <span>{item.period}</span>
                        <b>{item.result}</b>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="about-interests" aria-labelledby="interests-heading">
                <h2 id="interests-heading"><Target aria-hidden="true" /> My Interests</h2>
                <div className="about-interest-grid">
                  {interests.map(({ label, icon: Icon }) => (
                    <div className="about-interest" key={label}>
                      <Icon aria-hidden="true" />
                      <span>{label.split("\n").map((line) => <span key={line}>{line}</span>)}</span>
                    </div>
                  ))}
                </div>
              </section>
              <div className="about-signoff" role="img" aria-label="Signed Brajin S J, with a red wax seal" />
            </aside>
          </div>
          <div className="about-rocket-doodle" aria-hidden="true"></div>
        </section>
      </section>
    </div>
  );
}
