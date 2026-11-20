export const categories = ["All Projects", "Full-Stack Development", "AI / Machine Learning", "Backend Engineering", "Web Applications", "Experimental Projects"] as const;
export type Category = typeof categories[number];

export type Project = {
  number: string;
  title: string;
  category: string;
  filters: Category[];
  status: string;
  overview: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture?: string;
  contribution?: string;
  challenge?: string;
  evidence?: string;
  image?: string;
  alt?: string;
  screenshot?: { file: string; alt: string };
  links?: { label: string; href: string }[];
};

export const featuredNumber = "04";

export const projects: Project[] = [
  {
    number: "01", title: "Auction Application Backend", category: "Backend Engineering",
    filters: ["Backend Engineering"], status: "Internship project",
    overview: "A FastAPI backend that connects auction workflows to a React Native mobile application.",
    stack: ["Python", "FastAPI", "REST APIs", "React Native integration"],
    features: ["Auction workflow endpoints", "Mobile client integration"],
    problem: "The mobile app needed a consistent way to submit and retrieve auction data.",
    solution: "Expose the auction workflows through REST endpoints that the React Native client can call.",
    architecture: "The mobile client sends HTTP requests to a Python service. FastAPI handles the API boundary and the backend processes auction data.",
    contribution: "I designed and developed the backend services, implemented the REST APIs, and integrated them with the mobile frontend.",
    image: "auction", alt: "Auction cover illustration showing a gavel in front of a laptop.",
  },
  {
    number: "02", title: "eDNA Analysis", category: "AI / Machine Learning",
    filters: ["AI / Machine Learning", "Experimental Projects"], status: "Hackathon project",
    overview: "A Smart India Hackathon exploration of how language models could assist environmental DNA analysis.",
    stack: ["Python", "LLM-assisted workflows"], features: ["Environmental DNA analysis", "LLM-assisted exploration"],
    problem: "How could software help a team work with environmental DNA information during a hackathon?",
    solution: "Explore an LLM-assisted analysis workflow in a full-stack project.",
    contribution: "I contributed to the team's problem-solving and full-stack development work.",
    evidence: "The project record describes the objective and my role. Dataset details, model evaluation, and scientific outcomes are undocumented.",
    image: "edna", alt: "Illustrated DNA double helix surrounded by leaves.",
  },
  {
    number: "03", title: "Techazura 2026", category: "Web Applications",
    filters: ["Web Applications"], status: "Event site published",
    overview: "A department symposium website that brings event information and participant registration together.",
    stack: ["React", "Tailwind CSS", "Google Forms"], features: ["Technical and non-technical event listings", "Interactive event schedule", "Registration form link"],
    problem: "Symposium visitors needed one place to read about the event and register.",
    solution: "Bring the event pages and registration experience into one participant-facing website.",
    architecture: "The React frontend presents event listings, a time-slot schedule, and participant information. Registration links hand off to Google Forms.",
    links: [{ label: "Live demo", href: "https://symposium-2026.vercel.app/" }],
    screenshot: { file: "techazura-site", alt: "Techazura 2026 homepage with the symposium date, venue, and registration navigation." },
    image: "techazura", alt: "Reference artwork for the purple Techazura 2026 symposium website.",
  },
  {
    number: "04", title: "Truck Tracking System", category: "Full-Stack Development",
    filters: ["Full-Stack Development", "Backend Engineering"], status: "Source available",
    overview: "A logistics application for managing the trucks, drivers, cargo, and destinations behind each trip.",
    stack: ["Node.js", "PostgreSQL", "Prisma", "Flutter"],
    features: ["Truck and cargo records", "Driver and destination management", "Trip management"],
    problem: "A trip connects a vehicle, a driver, cargo, and a destination. Operators need to keep those records consistent.",
    solution: "Manage fleet records and trips through a shared API and a Flutter operations client.",
    architecture: "Node.js modules separate trucks, cargo, drivers, destinations, and trips. Prisma models the records in PostgreSQL. The Flutter client groups screens and API services by workflow.",
    contribution: "The project covers backend architecture, relational data modeling, and trip management.",
    evidence: "The repositories include tracking routes and client screens. Live vehicle telemetry has not been verified.",
    image: "trucks", alt: "Illustrated cargo truck at sunset with a route drawn across a map.",
    links: [{ label: "GitHub", href: "https://github.com/jacksparro-w/truck_management" }, { label: "Flutter client", href: "https://github.com/jacksparro-w/voc_truck_frontend" }],
  },
  {
    number: "05", title: "InternForte", category: "Full-Stack Development",
    filters: ["Full-Stack Development", "Web Applications"], status: "Design brief",
    overview: "An internship portal designed around two audiences: administrators coordinating internships and students taking part.",
    stack: [], features: ["Administrator portal design", "Student portal design"],
    problem: "Administrators and students need different views of the same internship workflow.",
    solution: "Organize the portal around separate administrative and student experiences.",
    evidence: "The available brief establishes the two roles. Implementation status, technology choices, and individual contributions are undocumented.",
  },
  {
    number: "06", screenshot: { file: "nexushr-site", alt: "NexusHR sign-in screen with work email and password fields." }, title: "NexusHR", category: "Enterprise / Java Full-Stack",
    filters: ["Full-Stack Development", "AI / Machine Learning"], status: "In development",
    overview: "An enterprise HR application combining employee operations with aggregate workforce intelligence.",
    stack: ["Java 21", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Spring AI", "Docker"],
    features: ["Employee directory and leave workflows", "Role-based dashboards", "Aggregate workforce questions"],
    problem: "HR teams need operational records and workforce summaries while controlling access to individual employee information.",
    solution: "Combine role-scoped HR workflows with workforce questions answered from aggregate data.",
    architecture: "A React and TypeScript client calls a modular Spring Boot API backed by PostgreSQL. An optional Spring AI provider handles aggregate queries, with a deterministic summary when the provider is unavailable.",
    challenge: "The intelligence module restricts model inputs to aggregate counts, keeping employee identifiers and free-text records outside the prompt.",
    evidence: "The repository includes Docker Compose services. Redis is provisioned but has no application integration. Kubernetes remains planned.",
    links: [{ label: "GitHub", href: "https://github.com/jacksparro-w/nexushr" }, { label: "Live demo", href: "https://nexushr-eosin.vercel.app" }],
  },
];
