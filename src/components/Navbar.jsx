import { useState, useEffect } from "react";

const navLinks = ["about", "skills", "projects", "experience", "contact"];

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem",
      height: scrolled ? "56px" : "72px",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #1e1e1e" : "none",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <button onClick={() => scrollTo("hero")} style={{
        fontFamily: "var(--font-display)", fontSize: "1.1rem",
        color: "var(--accent)", letterSpacing: "0.02em",
      }}>
        {name.split(" ")[0]}<span style={{ color: "var(--text3)" }}>.</span>
      </button>

      {/* Desktop nav */}
      <ul style={{
        display: "flex", gap: "2.5rem", listStyle: "none",
        fontFamily: "var(--font-mono)", fontSize: "0.72rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {navLinks.map((link, i) => (
          <li key={link} style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
            <button onClick={() => scrollTo(link)} style={{
              color: "var(--text2)",
              transition: "color 0.2s",
              position: "relative",
            }}
              onMouseEnter={e => e.target.style.color = "var(--accent)"}
              onMouseLeave={e => e.target.style.color = "var(--text2)"}
            >
              <span style={{ color: "var(--text3)", marginRight: "0.3em" }}>
                0{i + 1}.
              </span>
              {link}
            </button>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none", flexDirection: "column", gap: "5px",
          padding: "8px",
        }}
        className="hamburger"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: "block", width: "22px", height: "1.5px",
            background: "var(--text)",
            transition: "all 0.3s ease",
            transform: menuOpen
              ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                : "scaleX(0)"
              : "none",
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "56px", left: 0, right: 0, bottom: 0,
          background: "var(--bg)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem",
          zIndex: 99,
        }}>
          {navLinks.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              fontFamily: "var(--font-display)", fontSize: "2rem",
              color: "var(--text)", textTransform: "capitalize",
            }}>
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav ul { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
