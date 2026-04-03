export default function Footer({ name }) {
  return (
    <footer style={{
      padding: "2rem 2.5rem",
      borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "1rem",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.68rem",
        color: "var(--text3)", letterSpacing: "0.08em",
      }}>
        Designed &amp; Built by{" "}
        <span style={{ color: "var(--accent2)" }}>{name}</span>
      </p>
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.68rem",
        color: "var(--text3)", letterSpacing: "0.08em",
      }}>
        Built with React.js
      </p>
    </footer>
  );
}
