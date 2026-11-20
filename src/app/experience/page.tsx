import { CalendarDays } from "lucide-react";
import { experiences } from "@/data/portfolio";
import "./journal.css";

export default function ExperiencePage() {
  return (
    <section className="work-journal" aria-labelledby="work-title">
      <header className="work-heading">
        <h1 className="script" id="work-title">My Experience</h1>
        <p>Professional Journey &amp; Internships</p>
      </header>
      <aside className="work-scrapbook">
        <div className="work-photo" role="img" aria-label="Clipped photograph of a visitor looking toward a rocket at sunset" />
        <blockquote className="script">“Real learning happens when we build, break, fix and ship in the real world.”</blockquote>
      </aside>
      <ol className="work-timeline">
        {experiences.map(({ title, date, points }) => (
          <li key={title} className="work-entry">
            <article>
              <h2>{title}</h2>
              <p className="work-date"><CalendarDays aria-hidden="true" /><span>{date}</span></p>
              <ul>{points.map(point => <li key={point}>{point}</li>)}</ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
