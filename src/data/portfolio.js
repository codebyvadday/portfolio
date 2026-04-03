export const data = {
  name: "NAVEEN CHINTHAM",
  title: "Full Stack Developer",
  tagline: "I craft elegant web experiences with clean code and thoughtful design.",
  email: "naveenchintham3094@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "hyderabad, india",

  about: `I'm a full-stack developer with 4+ years of experience building modern web applications. I specialize in the MERN stack — MongoDB, Express, React, and Node.js — and I believe great software is both functional and beautiful.

I focus on writing clean, maintainable code and building products that people genuinely enjoy using. When I'm not coding, I'm exploring UI design, contributing to open source, or reading about distributed systems.`,

  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Redux"],
    backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets"],
    database: ["MongoDB", "PostgreSQL", "Redis", "Mongoose"],
    tools: ["Git", "Docker", "AWS", "Figma", "Vite", "Jest"],
  },

  projects: [
    {
      id: 1,
      title: "ShopStream",
      description: "A full-stack e-commerce platform with real-time inventory, Stripe payments, and an admin dashboard. Built with React, Node.js, Express, and MongoDB.",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      github: "https://github.com",
      live: "https://example.com",
      year: "2024",
      featured: true,
    },
    {
      id: 2,
      title: "TaskFlow",
      description: "Real-time collaborative task management app with WebSocket sync, drag-and-drop boards, and team workspaces.",
      tags: ["React", "Express", "Socket.io", "MongoDB"],
      github: "https://github.com",
      live: "https://example.com",
      year: "2024",
      featured: true,
    },
    {
      id: 3,
      title: "DevBlog CMS",
      description: "A headless CMS and blog platform with markdown support, code highlighting, and a React frontend powered by a REST API.",
      tags: ["React", "Node.js", "PostgreSQL", "REST API"],
      github: "https://github.com",
      live: "https://example.com",
      year: "2023",
      featured: true,
    },
    {
      id: 4,
      title: "WeatherAtlas",
      description: "A weather dashboard app consuming multiple third-party APIs, with animated visualizations and location search.",
      tags: ["React", "Chart.js", "OpenWeather API"],
      github: "https://github.com",
      live: null,
      year: "2023",
      featured: false,
    },
    {
      id: 5,
      title: "AuthKit",
      description: "Reusable authentication microservice with JWT, OAuth2 (Google/GitHub), refresh tokens, and role-based access control.",
      tags: ["Node.js", "Express", "MongoDB", "JWT", "OAuth2"],
      github: "https://github.com",
      live: null,
      year: "2023",
      featured: false,
    },
    {
      id: 6,
      title: "PortfolioGen",
      description: "A CLI tool that generates a static portfolio site from a JSON config file. Used by 200+ developers.",
      tags: ["Node.js", "CLI", "HTML", "CSS"],
      github: "https://github.com",
      live: null,
      year: "2022",
      featured: false,
    },
  ],

  experience: [
    {
      company: "Acme Technologies",
      role: "Senior Full Stack Developer",
      period: "2023 — Present",
      desc: "Lead engineer on a SaaS platform serving 50k+ users. Rebuilt the React frontend reducing load time by 40%, and designed a new MongoDB schema that cut query time by 60%.",
    },
    {
      company: "Pixel Studio",
      role: "Full Stack Developer",
      period: "2021 — 2023",
      desc: "Built and maintained 12+ client web apps using the MERN stack. Introduced CI/CD pipelines and improved deploy frequency by 3×.",
    },
    {
      company: "Freelance",
      role: "Web Developer",
      period: "2020 — 2021",
      desc: "Designed and developed websites for 20+ small businesses. Handled everything from React frontends to Express backends and MongoDB deployments.",
    },
  ],
}
