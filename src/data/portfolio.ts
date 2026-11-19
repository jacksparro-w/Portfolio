export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const skills = [
  { title: "Programming Languages", items: ["Python", "Java (learning)"] },
  { title: "Frontend Development", items: ["React.js", "Next.js", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"] },
  { title: "Backend Development", items: ["FastAPI", "Django (basic)", "REST APIs"] },
  { title: "Database", items: ["PostgreSQL"] },
  { title: "Security & Authentication", items: ["JWT authentication", "Role-based access control"] },
  { title: "AI & Machine Learning", items: ["Generative AI", "AI chatbots", "Prompt engineering"] },
  { title: "Tools & Platforms", items: ["Git", "GitHub", "Vercel", "Netlify", "Docker", "VS Code"] },
  { title: "Other Skills", items: ["API integration", "SEO basics", "Responsive design"] },
];

export const experiences = [
  {
    title: "Technology Peak — Web Developer (Intern)",
    date: "March 2025",
    kind: "Internship",
    points: [
      "Developed and maintained a production-ready website.",
      "Integrated backend APIs into frontend interfaces.",
      "Collaborated with team members to support feature delivery.",
      "Improved performance and usability through iterative enhancements.",
    ],
  },
  {
    title: "Auction App Backend — FastAPI Developer",
    date: "December 2025 – 18 January 2026",
    kind: "Project experience",
    points: [
      "Designed and developed FastAPI backend services for an auction-based application.",
      "Implemented RESTful APIs for auction workflows and data handling.",
      "Integrated the FastAPI backend with a React Native frontend.",
    ],
  },
];

export const projects = [
  {
    number: "01",
    title: "Auction Management System",
    description: "Designed and developed backend services for an auction-based application, including auction workflows and API integration.",
    stack: ["FastAPI", "React Native", "REST APIs"],
    image: "/images/projects/auction-placeholder.webp",
    github: "",
    demo: "",
  },
  {
    number: "02",
    title: "E-DNA Analysis",
    description: "Smart India Hackathon project focused on eDNA analysis and problem-solving with LLM-assisted workflows.",
    stack: ["Python", "LLM", "AI / ML"],
    image: "/images/projects/edna-placeholder.webp",
    github: "",
    demo: "",
  },
  {
    number: "03",
    title: "Techazura 2026",
    description: "Department symposium registration website with event information and participant-facing experiences.",
    stack: ["Next.js", "TanStack Router", "Tailwind CSS"],
    image: "/images/projects/techazura-placeholder.webp",
    github: "",
    demo: "",
  },
  {
    number: "04",
    title: "Truck Tracking System",
    description: "Logistics management application covering trucks, cargo, destinations and trips.",
    stack: ["Node.js", "PostgreSQL", "Prisma"],
    image: "/images/projects/truck-placeholder.webp",
    github: "",
    demo: "",
  },
];
