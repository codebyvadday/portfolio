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

export default function Contact({ data }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "2px",
    color: "var(--text)",
    fontFamily: "var(--font-body)", fontSize: "0.9rem",
    outline: "none", transition: "border-color 0.2s ease",
  };

  return (
    <section id="contact" ref={ref} style={{
      padding: "8rem 2.5rem 6rem",
      maxWidth: "1100px", margin: "0 auto",
    }}>
      <p style={{
        opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease)",
        fontFamily: "var(--font-mono)", fontSize: "0.72rem",
        color: "var(--accent2)", letterSpacing: "0.15em",
        textTransform: "uppercase", marginBottom: "1rem",
      }}>05. Contact</p>

      <h2 style={{
        opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.1s",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        fontWeight: 700, marginBottom: "1rem", lineHeight: 1.15,
      }}>
        Let's build something<br />
        <span style={{ fontStyle: "italic", color: "var(--text3)" }}>together.</span>
      </h2>

      <p style={{
        opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.2s",
        color: "var(--text2)", maxWidth: "480px",
        marginBottom: "4rem", fontSize: "0.95rem", lineHeight: 1.8,
      }}>
        I'm currently open to new opportunities. Whether you have a project in mind, a question, or just want to say hello — my inbox is always open.
      </p>

      <div style={{
        opacity: inView ? 1 : 0, transition: "all 0.7s var(--ease) 0.3s",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
      }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "var(--accent2)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <input
            required type="email"
            placeholder="Your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "var(--accent2)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <textarea
            required rows={5}
            placeholder="Your message..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={e => e.target.style.borderColor = "var(--accent2)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <button
            type="submit"
            style={{
              padding: "0.9rem",
              background: sent ? "var(--bg3)" : "var(--accent)",
              color: sent ? "var(--accent)" : "var(--bg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem", letterSpacing: "0.12em",
              textTransform: "uppercase", border: sent ? "1px solid var(--accent)" : "none",
              borderRadius: "2px", transition: "all 0.3s ease",
            }}
          >
            {sent ? "✓ Message Sent!" : "Send Message"}
          </button>
        </form>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", paddingTop: "0.5rem" }}>
          {[
            { label: "Email", value: data.email, href: `mailto:${data.email}` },
            { label: "Location", value: data.location, href: null },
            { label: "GitHub", value: "github.com/alexmorgan", href: data.github },
            { label: "LinkedIn", value: "linkedin.com/in/alexmorgan", href: data.linkedin },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                color: "var(--text3)", letterSpacing: "0.12em",
                textTransform: "uppercase", marginBottom: "0.3rem",
              }}>
                {label}
              </div>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" style={{
                  color: "var(--text)", fontSize: "0.9rem",
                  borderBottom: "1px solid var(--border)",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                  paddingBottom: "2px",
                }}
                  onMouseEnter={e => { e.target.style.color = "var(--accent)"; e.target.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.target.style.color = "var(--text)"; e.target.style.borderColor = "var(--border)"; }}
                >
                  {value}
                </a>
              ) : (
                <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div:last-child { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
