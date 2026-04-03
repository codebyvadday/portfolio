import { useEffect, useState } from "react";

export default function Hero({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s var(--ease) ${delay}ms, transform 0.8s var(--ease) ${delay}ms`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: "0 2.5rem",
      maxWidth: "1100px", margin: "0 auto",
      position: "relative",
    }}>
      {/* Background grid decoration */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(42,42,42,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(42,42,42,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          ...anim(0),
          fontFamily: "var(--font-mono)", fontSize: "0.75rem",
          color: "var(--accent2)", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: "1.5rem",
        }}>
          Hello, I'm
        </p>

        <h1 style={{
          ...anim(150),
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 700, lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          marginBottom: "1rem",
        }}>
          {data.name}
        </h1>

        <h2 style={{
          ...anim(300),
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "var(--text3)",
          marginBottom: "2rem",
        }}>
          {data.title}
        </h2>

        <p style={{
          ...anim(450),
          maxWidth: "540px",
          fontSize: "1.05rem", color: "var(--text2)",
          lineHeight: 1.8, marginBottom: "3rem",
        }}>
          {data.tagline}
        </p>

        <div style={{ ...anim(600), display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              padding: "0.85rem 2rem",
              background: "var(--accent)",
              color: "var(--bg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem", letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "none", borderRadius: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.background = "var(--accent2)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "var(--accent)"; e.target.style.transform = "translateY(0)"; }}
          >
            View My Work
          </button>

          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "0.85rem 2rem",
              background: "transparent",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem", letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid var(--border)", borderRadius: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text)"; }}
          >
            Get In Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          ...anim(900),
          position: "absolute", bottom: "-12vh", left: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text3)", letterSpacing: "0.1em", writingMode: "vertical-rl" }}>scroll</span>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(var(--accent2), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
