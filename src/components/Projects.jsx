import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function ProjectCard({ project, index, inView }) {
  const featured = project.featured;
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(40px)",
      transition: `all 0.8s var(--ease) ${index * 120}ms`,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "4px",
      padding: "2rem",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
      gridColumn: featured && index === 0 ? "span 2" : "span 1",
      transition: `all 0.8s var(--ease) ${index * 120}ms, border-color 0.3s ease`,
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent2)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Year badge */}
      <span style={{
        position: "absolute", top: "1.5rem", right: "1.5rem",
        fontFamily: "var(--font-mono)", fontSize: "0.65rem",
        color: "var(--text3)", letterSpacing: "0.1em",
      }}>
        {project.year}
      </span>

      {/* Folder icon */}
      <div style={{ marginBottom: "1.25rem" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" strokeWidth="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: featured && index === 0 ? "1.6rem" : "1.2rem",
        fontWeight: 700, marginBottom: "0.75rem",
        color: "var(--text)",
      }}>
        {project.title}
      </h3>

      <p style={{
        color: "var(--text2)", fontSize: "0.88rem",
        lineHeight: 1.8, marginBottom: "1.5rem", flex: 1,
      }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--accent2)", letterSpacing: "0.08em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <a href={project.github} target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          color: "var(--text2)", letterSpacing: "0.08em",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: "var(--text2)", letterSpacing: "0.08em",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const [ref, inView] = useInView();
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  const displayed = showAll ? others : [];

  return (
    <section id="projects" ref={ref} style={{
      padding: "8rem 2.5rem",
      maxWidth: "1100px", margin: "0 auto",
    }}>
      <p style={{
        opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease)",
        fontFamily: "var(--font-mono)", fontSize: "0.72rem",
        color: "var(--accent2)", letterSpacing: "0.15em",
        textTransform: "uppercase", marginBottom: "1rem",
      }}>03. Projects</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <h2 style={{
          opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.1s",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
        }}>
          Things I've built
        </h2>
      </div>

      {/* Featured grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.25rem",
        marginBottom: "1.25rem",
      }}>
        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} inView={inView} />
        ))}
      </div>

      {/* Other projects */}
      {displayed.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}>
          {displayed.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: "0.85rem 2rem",
            background: "transparent",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem", letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid var(--accent)", borderRadius: "2px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "rgba(232,213,163,0.08)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >
          {showAll ? "Show Less" : `Show ${others.length} More Projects`}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects > div:nth-child(3) { grid-template-columns: 1fr !important; }
          #projects > div:nth-child(3) > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
