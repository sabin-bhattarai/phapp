"use client";

import { useState, useEffect } from "react";

interface Particle {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: number;
  opacity: number;
  rotate: number;
}

export default function LeafParticles({
  count = 12,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${6 + Math.random() * 6}s`,
        delay: `${Math.random() * 8}s`,
        size: 10 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.5,
        rotate: Math.random() * 360,
      }))
    );
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="leaf-particle absolute bottom-0"
          style={
            {
              left: p.left,
              "--duration": p.duration,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
              filter: "drop-shadow(0 2px 4px rgba(141,198,63,0.3))",
            }}
          >
            <path
              d="M17 8C8 10 5.9 16.17 3.82 19.34C3.82 19.34 4.32 17.88 5.35 16.58C2.09 19.27 2 22 2 22s9 2 14-5c-1.77 3.93-3.46 5.8-5.5 6.78C13.25 23.22 16 22 18 19c2.5-4.5 1-11 1-11z"
              fill="#8DC63F"
            />
            <path
              d="M17 8s-2 6-6 8c-4 2-7 2-7 2 4-2 7-5 9-8 1.5-2.5 3-5 4-6-.5 1.5-1 2.5 0 4z"
              fill="#006D3A"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
