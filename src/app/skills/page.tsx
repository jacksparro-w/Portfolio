import type { CSSProperties } from "react";
import { skills } from "@/data/portfolio";
import "./toolkit.css";

const symbols: Record<string, number> = {
  Python: 0, "Java (learning)": 1, "React.js": 2, "Next.js": 3, HTML: 4,
  CSS: 5, JavaScript: 6, TypeScript: 7, "Tailwind CSS": 8, FastAPI: 9,
  "Django (basic)": 10, "REST APIs": 11, PostgreSQL: 12, "JWT authentication": 13,
  "Role-based access control": 14, "Generative AI": 15, "AI chatbots": 16,
  "Prompt engineering": 17, Git: 18, GitHub: 19, Docker: 20, Vercel: 21,
  Netlify: 22, "VS Code": 23, "API integration": 24, "SEO basics": 25, "Responsive design": 26,
};

const proficiency: Record<string, number> = { Python: 90, "Java (learning)": 70, PostgreSQL: 90 };
const learning = ["Advanced Java & DSA", "Machine Learning & Deep Learning", "System Design", "Space Technology & Research"];

export default function SkillsPage() {
  return (
    <div className="toolkit" aria-labelledby="toolkit-title">
      <header className="toolkit-intro">
        <h1 className="script" id="toolkit-title">My Toolkit</h1>
        <p>The technologies, tools, and skills I use to turn ideas into real-world solutions.</p>
      </header>
      {skills.map(({ title, items }) => (
        <section key={title} className="toolkit-card">
          <h2>{title === "Security & Authentication" ? "Security & Auth" : title}</h2>
          <ul>{[...items].sort((a, b) => symbols[a] - symbols[b]).map(item => (
            <li key={item}>
              <i aria-hidden="true" className="toolkit-symbol" style={{ "--index": symbols[item] } as CSSProperties} />
              <span>{item}</span>
              {proficiency[item] && <span className="toolkit-rating">
                <meter aria-label={item + " proficiency"} min="0" max="100" value={proficiency[item]} />
                {proficiency[item]}%
              </span>}
            </li>
          ))}</ul>
        </section>
      ))}
      <aside className="toolkit-note">
        <h2>Continuously Learning...</h2>
        <ul>{learning.map(topic => <li key={topic}>{topic}</li>)}</ul>
      </aside>
    </div>
  );
}
