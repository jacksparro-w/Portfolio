import { Paper } from "@/components/ui/Paper";
import { experiences } from "@/data/portfolio";
import { BriefcaseBusiness, Code2, CalendarDays } from "lucide-react";
export default function ExperiencePage() {
  return <div className="page-wrap"><Paper className="experience-page"><div className="section-heading"><p className="script page-title">My Experience</p><p className="eyebrow">PROFESSIONAL JOURNEY & INTERNSHIPS</p></div><div className="experience-layout"><aside className="experience-aside"><div className="photo-note"><RocketMark/></div><p className="script quote">“Real learning happens when we build, break, fix and ship.”</p><div className="dish-sketch">⌁　⌁　⌁</div></aside><div className="experience-list">{experiences.map((item, i) => <article className="experience-card" key={item.title}><div className="experience-icon">{i === 0 ? <BriefcaseBusiness/> : <Code2/>}</div><div className="experience-body"><h2>{item.title}</h2><span className="date-label"><CalendarDays/> {item.date}</span><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div></div></Paper></div>;
}
function RocketMark(){return <div className="rocket-mark">♧<br/>▲<br/>│</div>}
