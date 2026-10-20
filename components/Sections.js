"use client";

import Image from "next/image";
import { Reveal, SectionLabel, CTAButton, H2 } from "./ui";
import LeadForm from "./LeadForm";
import { services, manifesto, process, stats, cases, clients, faq, site } from "@/lib/content";

/* ---------------- XIZMATLAR ---------------- */
export function Services() {
  return (
    <section id="xizmatlar" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:py-40">
      <div className="mb-16 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <Reveal>
            <SectionLabel n="01">Xizmatlar</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <H2 className="mt-6">
              Kontentdan <span className="text-neon">sotuvgacha</span> — bitta jamoa
            </H2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-paper/60 md:justify-self-end">
            Har bir xizmat alohida ham ishlaydi, lekin eng kuchli natija — ular bitta tizimga birlashganda.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.t} delay={(i % 3) * 0.05} className="group bg-ink p-8 transition duration-300 hover:bg-ink-2 sm:p-10">
            <p className="tnum text-xs font-semibold text-mute">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-10 text-xl font-bold">{s.t}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-paper/60">{s.d}</p>
            <p className="mt-8 text-sm font-semibold text-neon">{s.tag}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- MANIFEST ---------------- */
export function Manifesto() {
  return (
    <section className="border-y border-line py-32 sm:py-48">
      <Reveal className="mx-auto max-w-5xl px-5">
        <p className="font-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-paper/90">
          {manifesto.split("natija").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="text-neon">natija</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------- LOYIHALAR ---------------- */
export function Cases() {
  const [lead, ...rest] = cases;
  return (
    <section id="loyihalar" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:py-40">
      <div className="mb-16 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <Reveal>
            <SectionLabel n="02">Loyihalar</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <H2 className="mt-6">
              Biz yuritayotgan <span className="text-neon">sahifalar</span>
            </H2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-paper/60 md:justify-self-end">
            Ssenariy, suratga olish, montaj va dizayn — hammasi bizning jamoa ishi. Obunachi soni — sahifaning hozirgi holati.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <CaseCard c={lead} className="md:col-span-2" big />
        {rest.map((c) => (
          <CaseCard key={c.handle} c={c} />
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener"
          className="rounded-full border border-line px-6 py-4 text-sm font-semibold text-paper/85 transition duration-300 hover:border-paper/60"
        >
          Barcha ishlar — Instagram {site.instagramHandle} →
        </a>
      </Reveal>
    </section>
  );
}

function CaseCard({ c, className = "", big = false }) {
  return (
    <Reveal className={className}>
      <article className="group overflow-hidden rounded-3xl border border-line bg-ink-2">
        <div className="overflow-hidden">
          <Image
            src={c.img}
            alt={`${c.handle} — ${c.niche} uchun kontent`}
            width={1400}
            height={990}
            sizes={big ? "(min-width: 1280px) 1240px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className={`w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02] ${big ? "aspect-[16/9]" : "aspect-[4/3]"}`}
          />
        </div>
        <div className="flex items-end justify-between gap-4 p-6 sm:p-7">
          <div>
            <h3 className="text-lg font-bold">@{c.handle}</h3>
            <p className="mt-1 text-sm text-mute">{c.niche}</p>
          </div>
          <p className="text-right">
            <span className="tnum block text-2xl font-extrabold">{c.followers}</span>
            <span className="text-xs text-mute">obunachi</span>
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------- MIJOZLAR ---------------- */
export function Clients() {
  return (
    <section className="border-y border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <SectionLabel n="03">Mijozlar</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
            {clients.length}+ shifokor, ekspert va brend biz bilan ishlagan va ishlamoqda
          </p>
        </Reveal>
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map(([h, n]) => (
            <li key={h} className="min-w-0">
              <p className="truncate text-sm font-semibold text-paper/85">@{h}</p>
              <p className="text-xs text-mute">{n}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- JARAYON ---------------- */
export function Process() {
  return (
    <section id="jarayon" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:py-40">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionLabel n="04">Jarayon</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <H2 className="mt-6">
              8 bosqichda <span className="text-neon">tizimli</span> ish
            </H2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-paper/60">
              Taxmin bilan emas — reja va raqamlar bilan. Har hafta qamrov, lid va xarajat bo'yicha hisobot olasiz.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <CTAButton source="process">Birinchi qadamni boshlash</CTAButton>
          </Reveal>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {process.map((s, i) => (
            <Reveal key={s.t} as="li" className="grid grid-cols-[3rem_1fr] gap-4 py-7 sm:grid-cols-[4rem_1fr]">
              <span className="tnum text-sm font-semibold text-neon">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-paper/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- RAQAMLAR ---------------- */
export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse bg-ink p-8 sm:p-10">
            <dt className="mt-3 text-sm text-mute">{s.label}</dt>
            <dd className="tnum text-4xl font-black tracking-tight sm:text-6xl">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------- ARIZA ---------------- */
export function LeadSection() {
  return (
    <section id="ariza" className="scroll-mt-24 px-5 py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] border border-line bg-ink-2 p-6 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
        <div>
          <SectionLabel n="05">Ariza</SectionLabel>
          <H2 className="mt-6">
            Bepul <span className="text-neon">media audit</span>
          </H2>
          <p className="mt-6 text-paper/60">
            30 daqiqada sahifangiz, reklamangiz va sotuv voronkangizni ko'rib chiqamiz va qayerda mijoz yo'qotayotganingizni aniq ko'rsatamiz.
          </p>
          <ul className="mt-10 space-y-4">
            {["Raqobatchilar tahlili", "Kontent va reklama bo'yicha xatolar ro'yxati", "Keyingi 90 kunlik o'sish rejasi"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-neon/50 text-xs text-neon">✓</span>
                <span className="text-paper/85">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3 text-sm">
            <a href={`tel:${site.phoneRaw}`} className="tnum rounded-full border border-line px-5 py-3 transition duration-300 hover:border-paper/60">
              {site.phone}
            </a>
            <a href={site.telegram} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-3 transition duration-300 hover:border-paper/60">
              Telegram →
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-ink p-5 sm:p-8">
          <LeadForm source="form" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ (native details — JS'siz ham ishlaydi) ---------------- */
export function FAQ() {
  return (
    <section id="savollar" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-28 sm:pb-40">
      <Reveal>
        <SectionLabel n="06">Savollar</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <H2 className="mt-6">Ko'p beriladigan savollar</H2>
      </Reveal>
      <div className="mt-14 divide-y divide-line border-y border-line">
        {faq.map((f, i) => (
          <details key={f.q} open={i === 0} className="group">
            <summary className="flex items-center justify-between gap-6 py-6 text-left">
              <span className="text-lg font-bold sm:text-xl">{f.q}</span>
              <span className="faq-plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-lg transition duration-300">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-7 leading-relaxed text-paper/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
