import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { contact } from "@/data/contact";
import { ContactForm } from "./ContactForm";
import "./letter.css";

export const metadata: Metadata = { title: "Contact | Brajin S J" };
const icons = { Email: Mail, GitHub: Github, LinkedIn: Linkedin };

export default function ContactPage() {
  return <article className="correspondence">
    <section className="letter-intro" aria-labelledby="letter-title">
      <h1 id="letter-title" className="script">Let’s Connect</h1>
      <p>Thank you for taking the time to explore my work and journey.</p>
      <p>If you have an opportunity, a project idea, or simply want to discuss technology, AI, or space research, I’d be happy to connect!</p>
      <div className="letter-divider" aria-hidden="true">✦</div>
      <address>
        {contact.links.map(({ href, label, text }) => {
          const Icon = icons[label];
          return <a href={href} key={label} {...(label !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}>
            <Icon aria-hidden="true" />{text}
          </a>;
        })}
        <span><MapPin aria-hidden="true" />{contact.location}</span>
      </address>
    </section>
    <section className="letter-compose" aria-labelledby="compose-title">
      <h2 id="compose-title" className="script">Send Me a Message</h2>
      <ContactForm />
      <p className="letter-signature-note script">Best Regards,<br />Brajin S J</p>
    </section>
  </article>;
}
