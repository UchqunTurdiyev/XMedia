"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton, TelegramIcon, ease } from "./ui";
import { hero, site, stats } from "@/lib/content";

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease },
});

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...fade(0.05)} className="text-xs font-semibold uppercase tracking-[0.22em] text-mute">
            {hero.kicker}
          </motion.p>

          <motion.h1
            {...fade(0.12)}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]"
          >
            {hero.title[0]}
            <br />
            uchun <span className="text-neon">media</span> agentlik
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-8 max-w-xl text-base leading-relaxed text-paper/65 sm:text-lg">
            {hero.sub}
          </motion.p>

          <motion.div {...fade(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
            <CTAButton source="hero">Bepul audit olish</CTAButton>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-semibold text-paper/85 transition duration-300 hover:border-paper/60"
            >
              <TelegramIcon />
              Telegram
            </a>
          </motion.div>

          <motion.dl {...fade(0.36)} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="tnum text-2xl font-extrabold sm:text-3xl">{s.v}</dd>
                <dd className="mt-1 text-xs leading-snug text-mute">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2"
        >
          {hero.showreel ? (
            <video
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
              src={hero.showreel}
              poster={hero.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={hero.poster}
              alt="XMEDIA loyihasi: kosmetolog uchun reels seriyasi"
              width={1400}
              height={990}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          )}
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/80 backdrop-blur">
            <span className="rec h-1.5 w-1.5 rounded-full bg-red-500" />
            {hero.showreel ? "Showreel" : "Real loyiha"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
