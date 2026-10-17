import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

// Linhas de "ar frio" fluindo pela tela (canvas leve, pausa fora da tela)
export default function AirFlow({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = prefersReducedMotion();
    let w = 0, h = 0, raf = 0, running = false;
    let parts = [];

    const spawn = (anywhere) => ({
      x: anywhere ? Math.random() * w : w + Math.random() * 80,
      y: Math.random() * h,
      len: 30 + Math.random() * 110,
      speed: 0.5 + Math.random() * 1.6,
      amp: 6 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.06 + Math.random() * 0.3,
      width: Math.random() < 0.2 ? 1.6 : 0.8,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(80, w / 16)) }, () => spawn(true));
    };

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x -= p.speed;
        const y = p.y + Math.sin(p.x * 0.008 + p.phase + t * 0.0005) * p.amp;
        const g = ctx.createLinearGradient(p.x, 0, p.x + p.len, 0);
        g.addColorStop(0, `rgba(150, 195, 255, ${p.alpha})`);
        g.addColorStop(1, "rgba(150, 195, 255, 0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.x, y);
        ctx.lineTo(p.x + p.len, y);
        ctx.stroke();
        if (p.x + p.len < 0) Object.assign(p, spawn(false));
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => { if (running || reduce) return; running = true; raf = requestAnimationFrame(draw); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => { stop(); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className={`airflow ${className}`} aria-hidden="true" />;
}
