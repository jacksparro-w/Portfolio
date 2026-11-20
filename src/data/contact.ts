const email = "brajinbrajin10@gmail.com";

export const contact = {
  name: "Brajin S J",
  profession: "Software Developer",
  location: "India",
  email,
  links: [
    { label: "Email", text: email, href: `mailto:${email}` },
    { label: "GitHub", text: "github.com/jacksparro-w", href: "https://github.com/jacksparro-w" },
    { label: "LinkedIn", text: "linkedin.com/in/brajin-s-j", href: "https://www.linkedin.com/in/brajin-s-j/" },
  ],
} as const;
