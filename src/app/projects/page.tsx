import type { Metadata } from "next";
import { ProjectCollection } from "./ProjectCollection";
import "./chronicles.css";

export const metadata: Metadata = { title: "Projects | Brajin S J" };

export default function ProjectsPage() {
  return (
    <section className="chronicles" aria-labelledby="chronicles-title">
      <header className="chron-hero">
        <h1 id="chronicles-title" className="script">My Projects</h1>
        <p>Real-world solutions · Full-stack development · AI &amp; data</p>
      </header>
      <ProjectCollection />
      <footer className="chron-footer"><span>More Projects Coming Soon…</span></footer>
    </section>
  );
}

