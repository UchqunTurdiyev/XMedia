"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal, Counter, SectionLabel, CTAButton } from "./ui";
import LeadForm from "./LeadForm";
import { marquee, services, manifesto, steps, stats, cases, faq, site } from "@/lib/content";

/* ---------------- MARQUEE ---------------- */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section className="relative z-10 -my-2 overflow-hidden py-10">
      <div className="-rotate-2 bg-neon py-4 text-ink shadow-[0_0_80px_-10px_rgba(57,255,106,0.7)]">
        <div className="marquee">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-8 px-8 font-display text-2xl font-black uppercase sm:text-4xl">
              {t}
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-[-12px] rotate-1 border-y border-line bg-ink-2 py-3">
        <div className="marquee marquee-rev">
          {items.map((t, i) => (
            <span key={i} className="px-8 font-mono text-sm uppercase tracking-[0.3em] text-mute">
              {t} ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- XIZMATLAR ---------------- */
const icons = [
  <path key="a" d="M4 5h16v11H4zM8 20h8M12 16v4" />,
  <path key="b" d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />,
  <path key="c" d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />,
  <path key="d" d="M3 7h12v10H3zM15 10l6-3v10l-6-3" />,
  <path key="e" d="M12 21a9 9 0 110-18 9 9 0 010 18zM12 16a4 4 0 110-8 4 4 0 010 8zM12 12h.01" />,
  <path key="f" d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />,
];

function ServiceCard({ s, i }) {
  const ref = useRef(null);
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <motion.article
        ref={ref}
        whileHover={{ y: -6 }}
        onMouseMove={(e) => {
          const r = ref.current.getBoundingClientRect();
          ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
          ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
        }}
        className="spot group relative h-full overflow-hidden rounded-3xl border border-line p-7 transition-colors hover:border-neon/50"
      >
        <div className="flex items-start justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink text-neon transition group-hover:bg-neon group-hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {icons[i % icons.length]}
            </svg>
          </span>
          <span className="font-mono text-xs text-mute">0{i + 1}</span>
        </div>
        <h3 className="mt-8 font-display text-xl font-extrabold">{s.t}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-paper/65">{s.d}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-neon/80">{s.tag}</span>
          <span className="translate-x-2 text-neon opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">→</span>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="xizmatlar" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <SectionLabel n="01">Xizmatlar</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.02]">
              Kontentdan <span className="neon-text">sotuvgacha</span> — bitta jamoa
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-paper/60">
            Har bir xizmat alohida ham ishlaydi, lekin eng kuchli natija — ular bitta tizimga birlashganda.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.t} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- MANIFEST (scroll bilan yonadigan so'zlar) ---------------- */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, ["#eef3ee", children.match(/sifatli|arzon|natija/i) ? "#39ff6a" : "#eef3ee"]);
  return (
    <motion.span style={{ opacity, color }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = manifesto.split(" ");
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-ink-2 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionLabel n="02">Manifest</SectionLabel>
        <p className="mt-10 font-display text-[clamp(1.8rem,5vw,4.4rem)] font-black leading-[1.08] tracking-tight">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ---------------- JARAYON ---------------- */
export function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="jarayon" ref={ref} className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionLabel n="03">Jarayon</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.02]">
              4 qadamda <br />
              <span className="neon-text">tizimli o'sish</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-paper/60">
              Taxmin bilan emas — raqamlar bilan ishlaymiz. Har bir bosqich oxirida siz aniq hisobot olasiz.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9">
            <CTAButton source="process">Birinchi qadamni boshlash</CTAButton>
          </Reveal>
        </div>

        <div className="relative pl-10 sm:pl-14">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-line sm:left-5" />
          <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-neon shadow-[0_0_12px_#39ff6a] sm:left-5" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="relative rounded-3xl border border-line bg-ink-2 p-7 transition hover:border-neon/40">
                  <span className="absolute -left-[37px] top-8 grid h-6 w-6 place-items-center rounded-full border border-neon bg-ink sm:-left-[45px]">
                    <span className="h-2 w-2 rounded-full bg-neon" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon">Qadam {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold">{s.t}</h3>
                  <p className="mt-3 leading-relaxed text-paper/65">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- RAQAMLAR ---------------- */
export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5">
      <div className="grid overflow-hidden rounded-3xl border border-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="border-line p-8 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:[&:not(:last-child)]:border-r">
            <p className="font-display text-5xl font-black tracking-tight sm:text-6xl">
              <Counter to={s.v} dec={s.dec} prefix={s.prefix} suffix="" />
              <span className="text-neon">{s.suffix}</span>
            </p>
            <p className="mt-3 text-sm text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- LOYIHALAR ---------------- */
export function Cases() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  return (
    <section id="loyihalar" ref={ref} className="scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5">
        <Reveal>
          <SectionLabel n="04">Loyihalar</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.02]">
            Mediabozorimizga <span className="neon-text">xush kelibsiz</span>
          </h2>
        </Reveal>
      </div>

      <motion.div style={{ x }} className="flex gap-5 px-5">
        {cases.map((c, i) => (
          <motion.article
            key={c.t}
            whileHover={{ y: -8, rotate: i % 2 ? 0.6 : -0.6 }}
            className="vf group relative flex h-[380px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 sm:w-[380px]"
          >
            <i /><i /><i /><i />
            <div
              className="absolute inset-0 opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120% 80% at ${20 + i * 20}% 0%, rgba(57,255,106,${0.28 - i * 0.04}), transparent 60%), repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px)`,
              }}
            />
            <span className="absolute left-7 top-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper/70">
              <span className="rec h-1.5 w-1.5 rounded-full bg-red-500" /> {c.k}
            </span>
            <span className="absolute right-7 top-6 font-display text-6xl font-black text-white/5">0{i + 1}</span>
            <div className="relative">
              <h3 className="font-display text-2xl font-extrabold leading-tight">{c.t}</h3>
              <p className="mt-3 text-paper/65">{c.d}</p>
            </div>
          </motion.article>
        ))}
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener"
          className="group flex h-[380px] w-[260px] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neon/40 text-center transition hover:bg-neon hover:text-ink"
        >
          <span className="font-display text-4xl font-black">+212</span>
          <span className="px-6 text-sm">Barcha ishlarni Instagram'da ko'ring {site.instagramHandle} →</span>
        </a>
      </motion.div>
    </section>
  );
}

/* ---------------- ARIZA ---------------- */
export function LeadSection() {
  return (
    <section id="ariza" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[150px]" />
      <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] border border-line bg-ink-2/80 p-6 backdrop-blur sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel n="05">Ariza</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] font-black leading-[1.03]">
            Bepul <span className="neon-text">media audit</span> — 30 daqiqada
          </h2>
          <p className="mt-6 text-paper/65">
            Sahifangiz, reklamangiz va sotuv voronkangizni ko'rib chiqamiz va qayerda mijoz yo'qotayotganingizni aniq ko'rsatamiz.
          </p>
          <ul className="mt-8 space-y-4">
            {["Raqobatchilar tahlili", "Kontent va reklama bo'yicha xatolar ro'yxati", "Keyingi 90 kunlik o'sish rejasi"].map((t, i) => (
              <Reveal key={t} delay={i * 0.08} as="li" className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neon text-sm font-black text-ink">✓</span>
                <span className="text-paper/85">{t}</span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <a href={`tel:${site.phoneRaw}`} className="rounded-full border border-line px-5 py-3 font-mono hover:border-neon hover:text-neon">
              {site.phone}
            </a>
            <a href={site.telegram} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-3 hover:border-neon hover:text-neon">
              Telegram →
            </a>
          </div>
        </div>
        <div className="vf rounded-3xl p-1">
          <i /><i /><i /><i />
          <div className="rounded-3xl bg-ink p-5 sm:p-8">
            <LeadForm source="form" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="savollar" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-24 sm:pb-32">
      <Reveal>
        <SectionLabel n="06">Savollar</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-black">Ko'p beriladigan savollar</h2>
      </Reveal>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {faq.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={open === i}
            >
              <span className={`font-display text-lg font-bold transition sm:text-xl ${open === i ? "text-neon" : ""}`}>{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xl ${open === i ? "border-neon bg-neon text-ink" : "border-line"}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-paper/65">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
