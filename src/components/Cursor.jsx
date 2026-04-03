import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let animFrame;
    let target = { x: -100, y: -100 };

    const move = (e) => {
      target = { x: e.clientX, y: e.clientY };
      setDot({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      setPos(prev => ({
        x: prev.x + (target.x - prev.x) * 0.12,
        y: prev.y + (target.y - prev.y) * 0.12,
      }));
      animFrame = requestAnimationFrame(animate);
    };

    const over = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setHovered(true);
    };
    const out = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setHovered(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
        width: hovered ? 48 : 32, height: hovered ? 48 : 32,
        border: `1.5px solid ${hovered ? "#e8d5a3" : "#5a5652"}`,
        borderRadius: "50%",
        transform: `translate(${pos.x - (hovered ? 24 : 16)}px, ${pos.y - (hovered ? 24 : 16)}px)`,
        transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
        width: 4, height: 4,
        background: "#e8d5a3",
        borderRadius: "50%",
        transform: `translate(${dot.x - 2}px, ${dot.y - 2}px)`,
      }} />
    </>
  );
}
