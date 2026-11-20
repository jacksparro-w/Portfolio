"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Atom, Braces, Code2, Cpu, Database, ExternalLink, Github, FolderOpen, GraduationCap, Users, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { categories, projects, type Category, type Project } from "@/data/projects";

function ProjectCover({ project, detailed = false }: { project: Project; detailed?: boolean }) {
  const screenshot = detailed || !project.image ? project.screenshot : undefined;
  const file = screenshot?.file ?? project.image;
  return <div className="chron-cover">
    {file ? <Image src={`/images/projects/${file}.webp`} alt={screenshot?.alt ?? project.alt ?? project.title}
      width={screenshot ? 880 : 250} height={screenshot ? 624 : 195} sizes="(max-width: 640px) 85vw, 440px" /> :
      <div className="chron-diagram" role="img" aria-label="Design sketch connecting administrators and students through internship records">
        <FolderOpen /><strong>Internship records</strong>
        <div className="chron-branches"><span><Users />Administrators</span><span><GraduationCap />Students</span></div>
      </div>}
  </div>;
}

function ProjectLinks({ project, primaryOnly = false }: { project: Project; primaryOnly?: boolean }) {
  const links = primaryOnly ? project.links?.slice(0, 1) : project.links;
  return links?.map(link => <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>{link.label === "Live demo" ? <ExternalLink size={16} aria-hidden="true" /> : <Github size={16} aria-hidden="true" />}{link.label === "Live demo" ? "View Demo" : link.label}</a>);
}

const stackIcons: Record<string, typeof Code2> = {
  React: Atom, "React Native integration": Atom, PostgreSQL: Database,
  "LLM-assisted workflows": Cpu, Python: Braces, FastAPI: Braces,
};

function Stack({ project }: { project: Project }) {
  return project.stack.length ? <ul className="chron-tags" aria-label="Technology stack">{project.stack.map(tag => {
    const Icon = stackIcons[tag] ?? Code2;
    return <li key={tag}><Icon size={17} aria-hidden="true" />{tag}</li>;
  })}</ul> : null;
}

function ProjectDetails({ project, dismiss }: { project: Project; dismiss: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);
  return <dialog className="chron-dialog" ref={ref} aria-labelledby="dossier-title" onClose={() => { if (!ref.current?.open) dismiss(); }} data-lenis-prevent="">
    <div className="chron-dialog-bar">
      <button type="button" autoFocus onClick={() => ref.current?.close()}><X size={16} aria-hidden="true" /> Close</button>
    </div>
    <div className="chron-dialog-body">
      <header className="dossier-cover-sheet">
        <figure>
          <ProjectCover project={project} detailed />
          <figcaption className="script">{project.status}</figcaption>
        </figure>
        <div className="dossier-summary">
          <div className="dossier-index"><p className="chron-kicker">{project.category}</p>
            <span className="dossier-postage"><span className="chron-sr">Project </span>{project.number}</span>
          </div>
          <h2 id="dossier-title">{project.title}</h2>
          <p>{project.overview}</p>
          <Stack project={project} />
          {project.links?.length && <div className="chron-actions"><ProjectLinks project={project} /></div>}
        </div>
      </header>
      <div className="dossier-notes">
        <dl>{[["Problem", project.problem], ["Solution", project.solution], ["Architecture", project.architecture], ["Engineering challenge", project.challenge], ["My contribution", project.contribution]].map(([label, value]) => value && <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <section className="dossier-highlights">
          <h3>{project.status === "Design brief" ? "Design scope" : "Project highlights"}</h3>
          <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          {project.evidence && <p className="chron-evidence">{project.evidence}</p>}
        </section>
      </div>
    </div>
  </dialog>;
}

function ProjectCard({ project, open }: { project: Project; open: () => void }) {
  const reduced = useReducedMotion();
  return <motion.article layout={reduced ? false : "position"} initial={false} className="chron-card">
    <figure className="chron-plate">
      <button className="chron-photo-button" type="button" onClick={open} aria-label={`Open ${project.title}`}>
        <ProjectCover project={project} />
      </button>
      <figcaption className="chron-sr">{project.status}</figcaption>
    </figure>
    <div className="chron-copy">
      <span className="chron-stamp" aria-label={`Project ${project.number}`}>{project.number}</span>
      <h2>{project.title}</h2>
      <p>{project.overview}</p>
      <Stack project={project} />
      <div className="chron-actions">
        <button type="button" aria-label={`View details for ${project.title}`} onClick={open}><BookOpen size={16} aria-hidden="true" />View Details</button>
        <ProjectLinks project={project} primaryOnly />
      </div>
    </div>
  </motion.article>;
}

export function ProjectCollection() {
  const [category, setCategory] = useState<Category>("All Projects");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter(p => category === "All Projects" || p.filters.includes(category));
  return <>
    <label className="chron-filter"><span className="chron-sr">Filter projects by category</span>
      <select value={category} onChange={event => setCategory(event.target.value as Category)}>
        {categories.map(name => <option key={name}>{name}</option>)}
      </select>
    </label>
    <p role="status" className="chron-sr">{visible.length} projects displayed</p>
    <div className="chron-grid" id="project-collection">
      {visible.map(project => <ProjectCard key={project.number} project={project} open={() => setSelected(project)} />)}
    </div>
    {selected && <ProjectDetails project={selected} dismiss={() => setSelected(null)} />}
  </>;
}



