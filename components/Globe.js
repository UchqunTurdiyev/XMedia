"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/** Neon wireframe globus + kamera obyektivi halqalari (aylanuvchi) */
export default function Globe() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rx = useTransform(sy, [-1, 1], [12, -12]);
  const ry = useTransform(sx, [-1, 1], [-14, 14]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const meridians = [0, 1, 2, 3, 4, 5];
  const parallels = [-60, -30, 0, 30, 60];

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className="relative aspect-square w-full">
      {/* glow */}
      <div className="absolute inset-[18%] rounded-full bg-neon/25 blur-[70px]" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="gFill" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#39ff6a" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#0f3d1b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#050705" stopOpacity="0.9" />
          </radialGradient>
          <clipPath id="gClip">
            <circle cx="200" cy="200" r="118" />
          </clipPath>
        </defs>

        {/* tashqi o'lchov halqasi */}
        <g className="origin-center animate-[spin_40s_linear_infinite]" style={{ transformOrigin: "200px 200px" }}>
          {Array.from({ length: 72 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="12"
              x2="200"
              y2={i % 6 === 0 ? "28" : "20"}
              stroke="#39ff6a"
              strokeOpacity={i % 6 === 0 ? 0.9 : 0.35}
              strokeWidth="1.5"
              transform={`rotate(${i * 5} 200 200)`}
            />
          ))}
        </g>

        {/* obyektiv halqalari */}
        <circle cx="200" cy="200" r="168" fill="none" stroke="#39ff6a" strokeOpacity="0.18" />
        <g style={{ transformOrigin: "200px 200px" }} className="animate-[spin_18s_linear_infinite_reverse]">
          <circle cx="200" cy="200" r="148" fill="none" stroke="#39ff6a" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 10" />
          <circle cx="200" cy="52" r="5" fill="#39ff6a" />
        </g>
        <g style={{ transformOrigin: "200px 200px" }} className="animate-[spin_11s_linear_infinite]">
          <circle cx="200" cy="200" r="134" fill="none" stroke="#39ff6a" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="120 300" />
          <circle cx="334" cy="200" r="3.5" fill="#eef3ee" />
        </g>

        {/* globus */}
        <circle cx="200" cy="200" r="118" fill="url(#gFill)" stroke="#39ff6a" strokeWidth="2" />
        <g clipPath="url(#gClip)" fill="none" stroke="#39ff6a" strokeWidth="1.1">
          {parallels.map((lat) => {
            const y = 200 + (lat / 90) * 118;
            const r = Math.cos((lat * Math.PI) / 180) * 118;
            return <ellipse key={lat} cx="200" cy={y} rx={r} ry={r * 0.16} strokeOpacity="0.45" />;
          })}
          {meridians.map((i) => (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              ry="118"
              rx="118"
              strokeOpacity="0.6"
              style={{ animation: `meridian 9s linear ${-i * 1.5}s infinite`, transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
          {/* materiklar (stilizatsiya) */}
          <g style={{ animation: "drift 9s linear infinite" }} fill="#39ff6a" fillOpacity="0.55" stroke="none">
            <path d="M120 150c20-14 46-10 58 4s-4 30-22 32-18 18-34 14-22-36-2-50z" />
            <path d="M230 120c18-6 40 0 46 14s-10 22-24 20-34-24-22-34z" />
            <path d="M240 210c22-4 44 10 40 30s-30 34-48 22-14-48 8-52z" />
            <path d="M420 150c20-14 46-10 58 4s-4 30-22 32-18 18-34 14-22-36-2-50z" />
            <path d="M530 120c18-6 40 0 46 14s-10 22-24 20-34-24-22-34z" />
            <path d="M540 210c22-4 44 10 40 30s-30 34-48 22-14-48 8-52z" />
          </g>
          {/* yaltirash */}
          <ellipse cx="160" cy="150" rx="60" ry="34" fill="#fff" fillOpacity="0.06" stroke="none" transform="rotate(-30 160 150)" />
        </g>
      </svg>

      <style>{`
        @keyframes meridian {
          0% { transform: scaleX(1); opacity: .15 }
          25% { transform: scaleX(0.02); opacity: .9 }
          50% { transform: scaleX(1); opacity: .15 }
          75% { transform: scaleX(0.02); opacity: .9 }
          100% { transform: scaleX(1); opacity: .15 }
        }
        @keyframes drift { from { transform: translateX(0) } to { transform: translateX(-300px) } }
      `}</style>
    </motion.div>
  );
}
