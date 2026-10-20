"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLeadModal } from "./LeadModal";

export const ease = [0.22, 1, 0.36, 1];

/** Yumshoq paydo bo'lish — 400 ms, faqat opacity + kichik siljish */
export function Reveal({ children, delay = 0, y = 16, className = "", as = "div" }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease }}
    >
      {children}
    </M>
  );
}

export function CTAButton({ children = "Ariza qoldirish", source = "cta", variant = "solid", className = "" }) {
  const { open } = useLeadModal();
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-bold tracking-wide transition duration-300";
  const styles =
    variant === "solid"
      ? "bg-neon text-ink hover:bg-paper"
      : "border border-line text-paper hover:border-paper/60";
  return (
    <button onClick={() => open(source)} className={`${base} ${styles} ${className}`}>
      {children}
      <span className="transition duration-300 group-hover:translate-x-1">→</span>
    </button>
  );
}

export function SectionLabel({ n, children }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-mute">
      <span className="tnum text-neon">{n}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

export function H2({ children, className = "" }) {
  return (
    <h2 className={`font-display text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] ${className}`}>
      {children}
    </h2>
  );
}

export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.jpg" alt="" width={40} height={40} priority className="h-10 w-10 rounded-lg" />
      <span className="text-base font-black tracking-tight">
        X<span className="text-neon">MEDIA</span>
      </span>
    </span>
  );
}

export function TelegramIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M9.8 15.6 9.4 20c.6 0 .9-.3 1.2-.6l2.9-2.7 6 4.4c1.1.6 1.9.3 2.2-1L24 3.4C24.4 1.8 23.4 1.1 22.3 1.5L1.2 9.6c-1.4.6-1.4 1.4-.2 1.8l5.4 1.7L19 5.3c.6-.4 1.1-.2.7.2" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
    </svg>
  );
}
