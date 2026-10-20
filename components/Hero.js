"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Globe from "./Globe";
import { CTAButton } from "./ui";
import { hero, site } from "@/lib/content";

function Timecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setT(Date.now() - start), 1000 / 25);
    return () => clearInterval(id);
  }, []);
  const f = Math.floor((t / 40) % 25);
  const s = Math.floor(t / 1000) % 60;
  const m = Math.floor(t / 60000) % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return <span suppressHydrationWarning>00:{pad(m)}:{pad(s)}:{pad(f)}</span>;
}

const word = {
  hidden: { y: "110%" },
  show: (i) => ({ y: "0%", transition: { duration: 0.9, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
};

function Line({ text, start = 0, className = "" }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={start + i} initial="hidden" animate="show">
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const yGlobe = useTransform(scrollY, [0, 700], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-neon/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.25fr_1fr]">
        {/* chap */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80 backdrop-blur"
          >
            <span className="rec h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
            REC
            <span className="text-mute">
              <Timecode />
            </span>
            <span className="hidden text-neon sm:inline">· {hero.kicker}</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.2rem,6.4vw,5.4rem)] font-black leading-[0.98] tracking-tight">
            <Line text={hero.titleTop} />
            <Line text={hero.titleAccent} start={3} className="neon-text" />
            <Line text={hero.titleBottom} start={5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <CTAButton source="hero">Bepul audit olish</CTAButton>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-semibold text-paper/85 transition hover:border-neon hover:text-neon"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M9.8 15.6 9.4 20c.6 0 .9-.3 1.2-.6l2.9-2.7 6 4.4c1.1.6 1.9.3 2.2-1L24 3.4C24.4 1.8 23.4 1.1 22.3 1.5L1.2 9.6c-1.4.6-1.4 1.4-.2 1.8l5.4 1.7L19 5.3c.6-.4 1.1-.2.7.2" />
              </svg>
              Telegram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12 flex items-center gap-6 border-t border-line pt-6"
          >
            <div>
              <p className="font-display text-2xl font-extrabold">28.7K+</p>
              <p className="text-xs text-mute">Instagram auditoriya</p>
            </div>
            <span className="h-10 w-px bg-line" />
            <div>
              <p className="font-display text-2xl font-extrabold">
                3–10<span className="text-neon">x</span>
              </p>
              <p className="text-xs text-mute">daromad o'sishi maqsadi</p>
            </div>
            <span className="hidden h-10 w-px bg-line sm:block" />
            <div className="hidden sm:block">
              <p className="font-display text-2xl font-extrabold">360°</p>
              <p className="text-xs text-mute">strategiya → sotuv</p>
            </div>
          </motion.div>
        </div>

        {/* o'ng: viewfinder ichida globus */}
        <motion.div
          style={{ y: yGlobe, opacity }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="vf scan relative mx-auto w-full max-w-[520px] overflow-hidden p-6 sm:p-10"
        >
          <i /><i /><i /><i />
          <Globe />
          <div className="pointer-events-none absolute inset-x-6 bottom-5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-neon/70 sm:inset-x-10">
            <span>ISO 400</span>
            <span>f/1.8</span>
            <span>4K · 25fps</span>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-1/2 top-0 h-full w-px bg-paper/40" />
            <span className="absolute left-0 top-1/2 h-px w-full bg-paper/40" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#xizmatlar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mute md:flex"
      >
        Pastga
        <span className="relative h-10 w-6 rounded-full border border-line">
          <motion.span
            animate={{ y: [4, 18, 4] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-neon"
          />
        </span>
      </motion.a>
    </section>
  );
}
