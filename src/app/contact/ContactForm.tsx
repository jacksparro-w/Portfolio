"use client";

import { useRef, useState, type FormEvent } from "react";
import { Mail, MessageCircle, Send, Tag, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/contact";
import { sendLetter } from "./actions";
import { letterFields, readLetter, validateLetter, type Errors, type Field } from "./letter";

const fieldIcons = { name: UserRound, email: Mail, subject: Tag, message: MessageCircle };

export function ContactForm() {
  const inFlight = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "draft" | "sent" | "failed">("idle");
  const [draft, setDraft] = useState("");
  const reduced = useReducedMotion();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const letter = readLetter(data);
    function showErrors(next: Errors) {
      setErrors(next);
      const first = form.elements.namedItem(Object.keys(next)[0]);
      if (first instanceof HTMLElement) first.focus();
      setState("idle");
    }
    const next = validateLetter(letter);
    if (Object.keys(next).length) return showErrors(next);
    inFlight.current = true;
    setErrors({});
    setState("sending");
    const body = `${letter.message}\n\n${letter.name}\n${letter.email}`;
    setDraft(`mailto:${contact.email}?subject=${encodeURIComponent(letter.subject)}&body=${encodeURIComponent(body)}`);
    try {
      const result = await sendLetter(data);
      if (result.status === "invalid") return showErrors(result.errors);
      if (result.status === "sent") form.reset();
      setState(result.status);
    } catch {
      setState("failed");
    } finally {
      inFlight.current = false;
    }
  }

  return <form className="correspondence-form" onSubmit={submit} noValidate onChange={event => {
    const control: EventTarget = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;
    const field = control.name as Field;
    if (errors[field]) setErrors({ ...errors, [field]: validateLetter(readLetter(new FormData(event.currentTarget)))[field] });
    if (!inFlight.current) setState("idle");
  }}>
    <fieldset disabled={state === "sending"}>
      <legend className="correspondence-sr">Your letter</legend>
      {letterFields.map(({ key, label, limit }) => {
        const Icon = fieldIcons[key];
        const placeholder = key === "message" ? "Your Message…" : label;
        const props = { id: `letter-${key}`, name: key, placeholder, required: true, maxLength: limit,
          "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `error-${key}` : undefined };
        return <div className={`correspondence-field field-${key}`} key={key}>
          <label className="correspondence-sr" htmlFor={props.id}>{label}</label>
          <Icon className="letter-field-icon" aria-hidden="true" />
          {key === "message" ? <textarea {...props} rows={5} /> :
            <input {...props} list={key === "subject" ? "letter-subjects" : undefined} type={key === "email" ? "email" : "text"} autoComplete={key === "subject" ? "off" : key} />}
          {errors[key] && <small id={`error-${key}`}>{errors[key]}</small>}
        </div>;
      })}
    </fieldset>
    <datalist id="letter-subjects"><option value="Project inquiry" /><option value="Work opportunity" /><option value="General message" /></datalist>
    <div className="correspondence-submit"><motion.button type="submit" disabled={state === "sending"} whileTap={reduced ? undefined : { scale: .98 }}>
      <Send size={20} aria-hidden="true" />{state === "sending" ? "Sending…" : "Send Message"}
    </motion.button></div>
    <div role="status" aria-live="polite" className="correspondence-feedback">
      {state === "draft" && <p>Your draft is ready. <a href={draft}>Open your email app</a> to send it.</p>}
      {state === "sent" && <p>Your letter was accepted for delivery. Thank you for writing!</p>}
      {state === "failed" && <p>Delivery could not be confirmed. Your letter is still here. <a href={draft}>Send it with your email app</a>.</p>}
    </div>
  </form>;
}

