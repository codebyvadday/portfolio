import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Experience({ experience }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);

  return (
    <section id="experience" ref={ref} style={{
      padding: "8rem 2.5rem",
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{
          opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease)",
          fontFamily: "var(--font-mono)", fontSize: "0.72rem",
          color: "var(--accent2)", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: "1rem",
        }}>04. Experience</p>

        <h2 style={{
          opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.1s",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700, marginBottom: "4rem",
        }}>
          Where I've worked
        </h2>

        <div style={{
          opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.2s",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "0",
        }}>
          {/* Tab list */}
          <div style={{
            borderLeft: "1px solid var(--border)",
          }}>
            {experience.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: "block", width: "100%",
                  padding: "1rem 1.25rem",
                  textAlign: "left",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem", letterSpacing: "0.05em",
                  color: active === i ? "var(--accent)" : "var(--text3)",
                  background: "transparent",
                  borderLeft: `2px solid ${active === i ? "var(--accent)" : "transparent"}`,
                  marginLeft: "-1px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.color = "var(--text2)"; }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.color = "var(--text3)"; }}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding: "0.5rem 0 0.5rem 3rem" }}>
            {experience.map((exp, i) => (
              <div key={i} style={{
                display: active === i ? "block" : "none",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem", fontWeight: 700,
                  marginBottom: "0.25rem",
                }}>
                  {exp.role}
                  <span style={{ color: "var(--accent2)" }}> @ {exp.company}</span>
                </h3>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                  color: "var(--text3)", letterSpacing: "0.08em",
                  marginBottom: "1.5rem",
                }}>
                  {exp.period}
                </p>
                <p style={{
                  color: "var(--text2)", lineHeight: 1.9,
                  fontSize: "0.95rem",
                }}>
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience > div > div:last-child { grid-template-columns: 1fr !important; }
          #experience > div > div:last-child > div:first-child { border-left: none; border-bottom: 1px solid var(--border); display: flex; }
          #experience > div > div:last-child > div:last-child { padding: 1.5rem 0 !important; }
        }
      `}</style>
    </section>
  );
}
