export const letterFields = [
  { key: "name", label: "Your Name", placeholder: "Write your name...", limit: 100 },
  { key: "email", label: "Your Email", placeholder: "Your email address...", limit: 254 },
  { key: "subject", label: "Subject", placeholder: "What shall we talk about?", limit: 160 },
  { key: "message", label: "Your Message", placeholder: "Write your message here...", limit: 4000 },
] as const;

export type Field = typeof letterFields[number]["key"];
export type Letter = Record<Field, string>;
export type Errors = Partial<Record<Field, string>>;

export function readLetter(data: FormData): Letter {
  function value(key: Field) {
    const entry = data.get(key);
    return typeof entry === "string" ? entry.trim() : "";
  }
  return { name: value("name"), email: value("email"), subject: value("subject"), message: value("message") };
}

export function validateLetter(letter: Letter): Errors {
  const errors: Errors = {};
  for (const { key, limit } of letterFields) {
    if (!letter[key]) errors[key] = { name: "Please enter your name.", email: "Please enter your email address.", subject: "Please add a subject.", message: "Please write a message." }[key];
    else if (letter[key].length > limit) errors[key] = `Please use ${limit} characters or fewer.`;
  }
  if (letter.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(letter.email)) errors.email = "Please enter a valid email address.";
  return errors;
}
