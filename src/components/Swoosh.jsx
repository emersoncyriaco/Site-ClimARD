import { useId } from "react";

// Arcos curvos inspirados no logo da Climard
export default function Swoosh({ className = "" }) {
  const id = useId();

  return (
    <svg className={`swoosh ${className}`} viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f5fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#1f5fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5fb4ff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f5fff" stopOpacity="0" />
          <stop offset="1" stopColor="#1f5fff" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path className="swoosh__a" d="M0 720 C 380 690, 820 560, 1200 250 L1200 360 C 860 620, 420 760, 0 800 Z" fill={`url(#${id}a)`} />
      <path className="swoosh__b" d="M0 800 C 460 770, 900 650, 1200 440 L1200 500 C 900 700, 480 800, 0 800 Z" fill={`url(#${id}b)`} />
    </svg>
  );
}
