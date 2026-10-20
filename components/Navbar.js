"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo, CTAButton } from "./ui";
import { site } from "@/lib/content";

const links = [
  ["Xizmatlar", "#xizmatlar"],
  ["Loyihalar", "#loyihalar"],
  ["Jarayon", "#jarayon"],
  ["Savollar", "#savollar"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || open ? "border-line bg-ink/85 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <a href="/" aria-label="XMEDIA bosh sahifa">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map(([t, h]) => (
              <a key={h} href={h} className="text-sm font-medium text-paper/70 transition duration-300 hover:text-paper">
                {t}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${site.phoneRaw}`} className="tnum hidden text-sm font-medium text-paper/70 transition duration-300 hover:text-paper lg:block">
              {site.phone}
            </a>
            <div className="hidden sm:block">
              <CTAButton source="navbar" className="!px-5 !py-2.5 !text-xs">
                Bepul audit
              </CTAButton>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
              aria-label="Menyu"
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-paper transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-paper transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="px-5 pb-6">
                {links.map(([t, h]) => (
                  <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-lg font-bold">
                    {t}
                  </a>
                ))}
                <a href={`tel:${site.phoneRaw}`} className="tnum mt-5 block font-semibold text-neon">
                  {site.phone}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
