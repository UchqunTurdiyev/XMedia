import Image from "next/image";
import QRCode from "qrcode";
import { Logo, CTAButton, H2, SectionLabel, TelegramIcon } from "@/components/ui";
import { FloatingCTA } from "@/components/Footer";
import { tarif, process, stats, team, cases, clients, site } from "@/lib/content";

// Yopiq sahifa: menyuda yo'q, qidiruvga chiqmaydi — mijozga havola qilib yuboriladi
export const metadata = {
  title: "12 oylik tarif — XMEDIA",
  description: "XMEDIA bilan hamkorlik paketlari: Start, Pro va Premium (12 oy).",
  robots: { index: false, follow: false },
};

const usd = (n) => `${n.toLocaleString("en-US").replace(/,/g, " ")} $`;
const mln = (n) => `~${Math.round((n * tarif.usdRate) / 1e6)} mln so'm`;

export default async function Tarif() {
  const qr = await QRCode.toString(site.telegram, {
    type: "svg",
    margin: 0,
    color: { dark: "#050705", light: "#edefea" },
  });
  const premium = tarif.plans.find((p) => p.id === "premium");

  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <a href="/" aria-label="XMEDIA bosh sahifa">
            <Logo />
          </a>
          <CTAButton source="tarif-header" className="!px-5 !py-2.5 !text-xs">
            Bepul audit
          </CTAButton>
        </div>
      </header>

      <main className="relative z-[2]">
        {/* MUQOVA */}
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:pb-32 sm:pt-44">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mute">Hamkorlik taklifi · {tarif.validUntil}gacha amal qiladi</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6.5vw,5.5rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
            Brendingiz uchun <span className="text-neon">12 oylik</span> media tizim
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/65">
            Strategiya, suratga olish, montaj, storislar va target reklama — bitta jamoada. Quyida uchta paket: o'zingizga mosini tanlang
            yoki bepul auditda birga aniqlaymiz.
          </p>
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-mute">{s.label}</dt>
                <dd className="tnum text-3xl font-extrabold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* PAKETLAR */}
        <section id="paketlar" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <SectionLabel n="01">Paketlar</SectionLabel>
            <H2 className="mt-6">Uchta paket, aniq hajm</H2>
            <p className="mt-6 max-w-2xl text-paper/60">
              Barcha raqamlar <b className="font-semibold text-paper/85">bir oy</b> uchun, boshqacha yozilmagan bo'lsa. Reklama byudjeti narxga kirmaydi.
            </p>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {tarif.plans.map((p) => (
                <article
                  key={p.id}
                  className={`relative flex flex-col rounded-3xl border p-8 sm:p-10 ${
                    p.featured ? "border-neon bg-ink-2" : "border-line bg-ink"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-neon px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                      Eng ko'p tanlanadi
                    </span>
                  )}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight">{p.name}</h3>
                    <span className="text-sm font-semibold text-mute">{p.term}</span>
                  </div>
                  <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-paper/60">{p.for}</p>

                  <p className="mt-8">
                    <span className="tnum text-5xl font-black tracking-tight">{usd(p.perMonth)}</span>
                    <span className="ml-1 text-sm text-mute">/ oy</span>
                  </p>
                  <p className="tnum mt-2 text-sm text-mute">
                    {mln(p.perMonth)} / oy · jami {usd(p.total)}
                  </p>

                  <ul className="mt-8 flex-1 space-y-3.5 border-t border-line pt-8">
                    {p.items.map(([n, t]) => (
                      <li key={t} className="flex gap-3 text-[15px]">
                        <span className="tnum w-14 shrink-0 font-bold text-paper">{n || "✓"}</span>
                        <span className="text-paper/70">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="no-print mt-10">
                    <CTAButton source={`tarif-${p.id}`} variant={p.featured ? "solid" : "ghost"} className="w-full">
                      {p.name} paketini tanlash
                    </CTAButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM ICHIDA */}
        <section className="print-break border-t border-line py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel n="02">Premium · 12 oy</SectionLabel>
              <H2 className="mt-6">
                Premium ichida <span className="text-neon">nimalar</span> bor
              </H2>
              <p className="tnum mt-8 text-5xl font-black tracking-tight">{usd(premium.total)}</p>
              <p className="tnum mt-2 text-mute">
                12 oy uchun · {usd(premium.perMonth)} / oy · {mln(premium.perMonth)} / oy
              </p>
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {tarif.premium.map((t, i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="tnum text-sm font-semibold text-neon">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-paper/85">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SHARTLAR */}
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <SectionLabel n="03">Shartlar</SectionLabel>
            <H2 className="mt-6">Oldindan aniq bo'lsin</H2>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
              {tarif.terms.map(([k, v]) => (
                <div key={k} className="bg-ink p-8 sm:p-10">
                  <dt className="text-lg font-bold">{k}</dt>
                  <dd className="mt-3 leading-relaxed text-paper/60">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ISH JARAYONI */}
        <section className="print-break border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <SectionLabel n="04">Ish jarayoni</SectionLabel>
            <H2 className="mt-6">Brifingdan reklamagacha — 8 bosqich</H2>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-4">
              {process.map((s, i) => (
                <li key={s.t} className="bg-ink p-7">
                  <span className="tnum text-sm font-semibold text-neon">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/60">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* JAMOA */}
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <SectionLabel n="05">Jamoa</SectionLabel>
            <H2 className="mt-6">
              40+ mutaxassis — <span className="text-neon">bitta jamoa</span>
            </H2>
            <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-3">
              {team.map((m) => (
                <li key={m.t} className="bg-ink p-7">
                  <p className="tnum text-3xl font-black">{m.n || "✓"}</p>
                  <p className="mt-2 text-sm text-paper/70">{m.t}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="print-break border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <SectionLabel n="06">Portfolio</SectionLabel>
            <H2 className="mt-6">Biz yuritayotgan sahifalar</H2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cases.slice(0, 6).map((c) => (
                <article key={c.handle} className="overflow-hidden rounded-3xl border border-line bg-ink-2">
                  <Image src={c.img} alt={`${c.handle} — ${c.niche}`} width={1400} height={990} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                  <div className="flex items-end justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">@{c.handle}</h3>
                      <p className="text-xs text-mute">{c.niche}</p>
                    </div>
                    <p className="tnum shrink-0 text-right text-lg font-extrabold">
                      {c.followers}
                      <span className="block text-[11px] font-normal text-mute">obunachi</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-mute">
              Shuningdek: {clients.slice(0, 18).map(([h]) => `@${h}`).join(", ")} va boshqa {clients.length - 18}+ mijoz.
            </p>
          </div>
        </section>

        {/* KEYINGI QADAM */}
        <section className="print-break border-t border-line py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 rounded-[2.5rem] border border-line bg-ink-2 p-8 sm:p-14 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SectionLabel n="07">Keyingi qadam</SectionLabel>
              <H2 className="mt-6">
                Bepul audit — <span className="text-neon">30 daqiqada</span>
              </H2>
              <p className="mt-6 max-w-xl text-paper/65">
                Sahifangiz va reklamangizni ko'rib chiqamiz, sizga qaysi paket mosligini aniq aytamiz. Taklif{" "}
                <b className="font-semibold text-paper">{tarif.validUntil}gacha</b> amal qiladi.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="no-print">
                  <CTAButton source="tarif-final">Bepul audit olish</CTAButton>
                </span>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-semibold transition duration-300 hover:border-paper/60"
                >
                  <TelegramIcon /> {site.telegram.replace("https://", "")}
                </a>
                <a href={`tel:${site.phoneRaw}`} className="tnum inline-flex items-center rounded-full border border-line px-6 py-4 text-sm font-semibold transition duration-300 hover:border-paper/60">
                  {site.phone}
                </a>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[260px] text-center">
              <div className="rounded-3xl bg-paper p-5" dangerouslySetInnerHTML={{ __html: qr }} />
              <figcaption className="mt-4 text-sm text-mute">Telegram'da yozish uchun skanerlang</figcaption>
            </figure>
          </div>
        </section>

        <p className="border-t border-line py-6 text-center text-xs text-mute">© {new Date().getFullYear()} XMEDIA · {site.instagramHandle}</p>
      </main>
      <div className="no-print">
        <FloatingCTA />
      </div>
    </>
  );
}
