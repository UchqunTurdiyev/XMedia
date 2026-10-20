"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Logo, CTAButton } from "./ui";
import { site } from "@/lib/content";

const links = [
  ["Xizmatlar", "#xizmatlar"],
  ["Jarayon", "#jarayon"],
  ["Loyihalar", "#loyihalar"],
  ["Savollar", "#savollar"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? "border-line bg-ink/75 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <a href="#" aria-label="XMEDIA bosh sahifa">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="group relative text-sm text-paper/80 transition hover:text-paper">
              {t}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${site.phoneRaw}`} className="hidden font-mono text-sm text-paper/80 hover:text-neon lg:block">
            {site.phone}
          </a>
          <div className="hidden sm:block">
            <CTAButton source="navbar" className="!px-5 !py-3 !text-xs">
              Ariza
            </CTAButton>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
            aria-label="Menyu"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-paper transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-paper transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-0.5 origin-left bg-neon" />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-ink-2/95 p-6 backdrop-blur-xl md:hidden"
          >
            {links.map(([t, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block border-b border-line py-4 font-display text-xl font-bold"
              >
                {t}
              </motion.a>
            ))}
            <a href={`tel:${site.phoneRaw}`} className="mt-5 block font-mono text-neon">
              {site.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
