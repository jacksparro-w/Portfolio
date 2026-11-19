import { Paper } from "@/components/ui/Paper";
import { skills } from "@/data/portfolio";
import { Code2, Monitor, Server, Database, ShieldCheck, BrainCircuit, Wrench, Layers } from "lucide-react";
const icons = [Code2, Monitor, Server, Database, ShieldCheck, BrainCircuit, Wrench, Layers];
export default function SkillsPage() {
  return <div className="page-wrap"><Paper className="skills-book"><aside className="skills-intro"><p className="script page-title">My Toolkit</p><p className="script">The technologies, tools, and skills I use to turn ideas into real-world solutions.</p><div className="rocket-doodle">♧<br/>│<br/>▲<br/>╱ ╲</div><div className="satellite-doodle">✧　⌁　✧</div></aside><div className="skills-content"><div className="skills-grid">{skills.map((group, index) => {const Icon = icons[index]; return <article className="skill-card" key={group.title}><h2><Icon/>{group.title}</h2><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>;})}</div><div className="learning-note"><h3 className="script">Continuously Learning...</h3><p>Advanced Java & DSA · Machine Learning & Deep Learning · System Design · Space Technology & Research</p></div></div></Paper></div>;
}
