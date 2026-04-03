import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function About({ data }) {
  const [ref, inView] = useInView();

  const anim = (delay) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <p style={{ ...anim(0), color: "#38bdf8", fontSize: "0.75rem" }}>
            01. About Me
          </p>

          <h2 style={{ ...anim(100), fontSize: "2.5rem" }}>
            The person behind the code
          </h2>

          {data.about.split("\n\n").map((para, i) => (
            <p key={i} style={{ ...anim(200 + i * 100), color: "#94a3b8" }}>
              {para}
            </p>
          ))}

          <div style={{ ...anim(400), display: "flex", gap: "20px" }}>
            {[["4+", "Years Exp."], ["20+", "Projects"], ["50k+", "Users"]].map(
              ([n, l]) => (
                <div key={l}>
                  <h3 style={{ color: "#38bdf8" }}>{n}</h3>
                  <p style={{ fontSize: "12px" }}>{l}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ ...anim(200), position: "relative" }}>
          <div
            style={{
              background: "#1e293b",
              padding: "2rem",
              borderRadius: "10px",
            }}
          >
            <p style={{ color: "#38bdf8" }}>
            </p>

            {[
              ["location", data.location],
              ["role", data.title],
              ["available", "true"],
              ["email", data.email],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: "10px" }}>
                <span style={{ color: "#94a3b8" }}>"{k}"</span>
                <span>: </span>
                <span style={{ color: "#22c55e" }}>"{v}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}