import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const categoryColors = {
  frontend: "#e8d5a3",
  backend: "#85c1f5",
  database: "#b5e0a4",
  tools: "#d4a5f5",
};

export default function Skills({ skills }) {
  const [ref, inView] = useInView();

  return (
    <section id="skills" ref={ref} style={{
      padding: "8rem 2.5rem",
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(20px)",
          transition: "all 0.7s var(--ease)",
          fontFamily: "var(--font-mono)", fontSize: "0.72rem",
          color: "var(--accent2)", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: "1rem",
        }}>
          02. Skills
        </p>
        <h2 style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(20px)",
          transition: "all 0.7s var(--ease) 0.1s",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700, marginBottom: "4rem",
        }}>
          My technical toolkit
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {Object.entries(skills).map(([cat, items], ci) => (
            <div key={cat} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: `all 0.7s var(--ease) ${ci * 100 + 200}ms`,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "1.75rem",
              borderTop: `2px solid ${categoryColors[cat]}`,
            }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem", letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: categoryColors[cat],
                marginBottom: "1.25rem",
              }}>
                {cat}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {items.map((skill) => (
                  <span key={skill} style={{
                    padding: "0.35rem 0.8rem",
                    background: "var(--bg3)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text2)",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => {
                      e.target.style.borderColor = categoryColors[cat];
                      e.target.style.color = categoryColors[cat];
                    }}
                    onMouseLeave={e => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.color = "var(--text2)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
