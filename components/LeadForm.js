"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { form as F } from "@/lib/content";
import { fbq, getCookie, getExternalId, getUtm, uuid } from "@/lib/track";

function formatLocal(digits) {
  const d = digits.slice(0, 9);
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return p.join(" ");
}

function Chips({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            data-on={value === o}
            onClick={() => onChange(value === o ? "" : o)}
            className="chip rounded-full border border-line bg-ink-3 px-3.5 py-2 text-sm text-paper/90 transition hover:border-neon/60"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LeadForm({ compact = false, source = "form" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // faqat 9 raqam
  const [business, setBusiness] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Ismingizni kiriting");
    if (phone.length !== 9) return setError("Telefon raqamni to'liq kiriting");

    setLoading(true);
    const eventId = uuid();

    // Brauzer Pixel — server CAPI bilan bir xil eventID (dedup)
    fbq("track", "Lead", { content_name: service || "XMEDIA ariza", content_category: business || undefined }, { eventID: eventId });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: "998" + phone,
          business,
          service,
          budget,
          comment: source !== "form" ? `Forma: ${source}` : "",
          eventId,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
          externalId: getExternalId(),
          utm: getUtm(),
          url: window.location.href,
          website: hp,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Xatolik yuz berdi");
      try {
        sessionStorage.setItem("xm_name", name.trim().split(" ")[0]);
      } catch {}
      router.push("/rahmat");
    } catch (err) {
      setError(err.message || "Xatolik. Qayta urinib ko'ring");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-line bg-ink-3 px-4 py-4 text-base text-paper outline-none transition placeholder:text-mute/60 focus:border-neon focus:shadow-[0_0_0_4px_rgba(57,255,106,0.12)]";

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <input
          className={inputCls}
          placeholder="Ismingiz"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={`${inputCls} flex items-center gap-2 focus-within:border-neon`}>
          <span className="font-mono text-neon">+998</span>
          <input
            className="w-full bg-transparent outline-none placeholder:text-mute/60"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="90 123 45 67"
            value={formatLocal(phone)}
            onChange={(e) => {
              let d = e.target.value.replace(/\D/g, "");
              if (d.startsWith("998") && d.length > 9) d = d.slice(3);
              setPhone(d.slice(0, 9));
            }}
          />
        </label>
      </div>

      <Chips label="Sohangiz" options={F.business} value={business} onChange={setBusiness} />
      <Chips label="Qaysi xizmat kerak" options={F.service} value={service} onChange={setService} />
      {!compact && <Chips label="Oylik marketing byudjeti" options={F.budget} value={budget} onChange={setBudget} />}

      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
        name="website"
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="shine group flex w-full items-center justify-center gap-3 rounded-2xl bg-neon px-6 py-4 font-display text-base font-extrabold uppercase tracking-wide text-ink shadow-[0_10px_50px_-10px_rgba(57,255,106,0.8)] disabled:opacity-70"
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
        ) : (
          <>
            Bepul konsultatsiya olish
            <span className="transition group-hover:translate-x-1">→</span>
          </>
        )}
      </motion.button>
      <p className="text-center text-xs text-mute">Ma'lumotlaringiz uchinchi shaxslarga berilmaydi. Spam yo'q.</p>
    </form>
  );
}
