"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/content";
import { Logo } from "@/components/ui";

const REDIRECT_SEC = 5;

export default function Rahmat() {
  const [name, setName] = useState("");
  const [left, setLeft] = useState(REDIRECT_SEC);
  useEffect(() => {
    try {
      setName(sessionStorage.getItem("xm_name") || "");
    } catch {}
  }, []);

  // Bir necha soniyadan so'ng mijoz menejer Telegram'iga o'tadi
  useEffect(() => {
    if (left <= 0) {
      window.location.href = site.managerTelegram;
      return;
    }
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-16">
      <div className="grid-bg absolute inset-0 -z-10" />

      <div className="w-full max-w-xl rounded-[2rem] border border-line bg-ink-2 p-8 text-center sm:p-12">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>

        <motion.svg viewBox="0 0 100 100" className="mx-auto mt-10 h-28 w-28" initial="h" animate="s">
          <motion.circle
            cx="50" cy="50" r="44" fill="none" stroke="#52d33c" strokeWidth="4"
            variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 0.9, ease: "easeOut" } } }}
          />
          <motion.path
            d="M30 52l13 13 27-30" fill="none" stroke="#52d33c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 0.5, delay: 0.8 } } }}
          />
        </motion.svg>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-3xl font-extrabold sm:text-4xl"
        >
          Rahmat{name ? `, ${name}` : ""}! <span className="text-neon">Arizangiz qabul qilindi</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-4 text-paper/70">
          Menejerimiz 15 daqiqa ichida siz bilan bog'lanadi. Tezroq javob olish uchun menejerimizga Telegram'da yozing.
        </motion.p>
        <p className="mt-3 text-sm text-mute">
          {left > 0 ? `${left} soniyadan so'ng Telegram ochiladi…` : "Telegram ochilmoqda…"}
        </p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={site.managerTelegram} className="rounded-full bg-neon px-7 py-4 text-sm font-bold text-ink transition duration-300 hover:bg-paper">
            Menejerga Telegram'da yozish →
          </a>
          <a href={site.telegram} target="_blank" rel="noopener" className="rounded-full border border-line px-7 py-4 text-sm font-semibold hover:border-paper/60">
            Telegram kanal
          </a>
        </motion.div>
        <Link href="/" className="mt-8 inline-block text-sm text-mute hover:text-neon">
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
}
