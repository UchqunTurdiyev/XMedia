"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/content";
import { Logo } from "@/components/ui";

export default function Rahmat() {
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      setName(sessionStorage.getItem("xm_name") || "");
    } catch {}
  }, []);

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-16">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/15 blur-[120px]" />

      <div className="vf w-full max-w-xl p-8 text-center sm:p-12">
        <i /><i /><i /><i />
        <Link href="/" className="inline-block">
          <Logo />
        </Link>

        <motion.svg viewBox="0 0 100 100" className="mx-auto mt-10 h-28 w-28" initial="h" animate="s">
          <motion.circle
            cx="50" cy="50" r="44" fill="none" stroke="#39ff6a" strokeWidth="4"
            variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 0.9, ease: "easeOut" } } }}
          />
          <motion.path
            d="M30 52l13 13 27-30" fill="none" stroke="#39ff6a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 0.5, delay: 0.8 } } }}
          />
        </motion.svg>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 font-display text-3xl font-black sm:text-4xl"
        >
          Rahmat{name ? `, ${name}` : ""}! <span className="neon-text">Arizangiz qabul qilindi</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-4 text-paper/70">
          Menejerimiz 15 daqiqa ichida siz bilan bog'lanadi. Shu vaqtgacha Telegram kanalimizdagi foydali materiallarni ko'rib chiqing.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={site.telegram} target="_blank" rel="noopener" className="shine rounded-full bg-neon px-7 py-4 font-display text-sm font-extrabold uppercase text-ink">
            Telegram kanalga o'tish →
          </a>
          <a href={site.instagram} target="_blank" rel="noopener" className="rounded-full border border-line px-7 py-4 text-sm font-semibold hover:border-neon hover:text-neon">
            Instagram
          </a>
        </motion.div>
        <Link href="/" className="mt-8 inline-block text-sm text-mute hover:text-neon">
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
}
