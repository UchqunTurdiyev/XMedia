"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useLeadModal } from "./LeadModal";

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

export function Counter({ to, dec = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {v.toFixed(dec)}
      {suffix}
    </span>
  );
}

/** Sichqonchaga tortiladigan tugma */
export function Magnetic({ children, className = "", strength = 0.3 }) {
  const ref = useRef(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setP({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

export function CTAButton({ children = "Ariza qoldirish", source = "cta", variant = "solid", className = "" }) {
  const { open } = useLeadModal();
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-display text-sm font-extrabold uppercase tracking-wide transition";
  const styles =
    variant === "solid"
      ? "shine bg-neon text-ink shadow-[0_10px_50px_-12px_rgba(57,255,106,0.9)] hover:shadow-[0_10px_70px_-8px_rgba(57,255,106,1)]"
      : "border border-line bg-white/[0.03] text-paper backdrop-blur hover:border-neon hover:text-neon";
  return (
    <Magnetic className="inline-block">
      <button onClick={() => open(source)} className={`${base} ${styles} ${className}`}>
        {children}
        <span className="transition group-hover:translate-x-1">→</span>
      </button>
    </Magnetic>
  );
}

export function SectionLabel({ n, children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neon">
      <span className="rounded border border-neon/40 px-1.5 py-0.5">{n}</span>
      <span className="h-px w-10 bg-neon/40" />
      {children}
    </div>
  );
}

export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <rect x="2" y="9" width="36" height="27" rx="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M13 9l3-5h8l3 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="20" cy="22.5" r="9" fill="#39ff6a" />
        <path
          d="M14.5 19c2 .5 3 2 2.5 3.5s1.5 2 2.5 1.5M22 15.5c-.5 1.5.5 2.5 2 2.5s2 1.5 1.5 3M17 28c.5-1.5 2-2 3-1.5s2.5 0 3-1"
          fill="none"
          stroke="#050705"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-lg font-black tracking-tight">
        X<span className="text-neon">MEDIA</span>
      </span>
    </span>
  );
}
