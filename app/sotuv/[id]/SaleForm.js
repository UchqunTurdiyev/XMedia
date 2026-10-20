"use client";

import { useState } from "react";
import { uuid } from "@/lib/track";

const fmt = (n) => Number(n || 0).toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";

export default function SaleForm({ id, t, bad, initialSales }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("UZS");
  const [sales, setSales] = useState(initialSales);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { ok, text }

  async function submit(e) {
    e.preventDefault();
    if (loading || !amount.trim()) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, t, amount, currency, key: uuid() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Xatolik yuz berdi");
      setSales(json.sales.map((s) => ({ uzs: s.uzs, at: s.at })));
      setAmount("");
      const shown = json.currency === "UZS" ? fmt(json.value) : `$${json.value}`;
      setMsg(
        json.capi
          ? { ok: true, text: `✅ Purchase Meta'ga yuborildi: ${fmt(json.uzs)} → ${shown}` }
          : { ok: false, text: `⚠️ To'lov saqlandi, lekin Meta CAPI xato qaytardi (status ${json.capiStatus}). Tokenni tekshiring.` }
      );
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (bad) return <p className="mt-6 text-paper/80">Bu lid sifatsiz deb belgilangan. Avval Telegram'da "Qaytarish" ni bosing.</p>;

  const total = sales.reduce((s, x) => s + x.uzs, 0);

  return (
    <>
      {sales.length > 0 && (
        <div className="mt-6 rounded-2xl border border-line bg-ink-3 p-4 text-sm">
          <p className="font-semibold">To'lovlar:</p>
          {sales.map((s, i) => (
            <p key={i} className="mt-1 text-paper/80">
              {i + 1}) {fmt(s.uzs)}
            </p>
          ))}
          <p className="mt-2 font-bold">Jami: {fmt(total)}</p>
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="flex gap-2">
          {[
            ["UZS", "so'm"],
            ["USD", "$ dollar"],
          ].map(([c, label]) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={`flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                currency === c ? "border-neon bg-neon text-ink" : "border-line text-paper/80 hover:border-paper/60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          inputMode="decimal"
          autoFocus
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={currency === "UZS" ? "Masalan: 2500000 yoki 2.5 mln" : "Masalan: 200"}
          className="w-full rounded-2xl border border-line bg-ink-3 px-4 py-4 text-lg text-paper outline-none transition placeholder:text-mute/60 focus:border-paper/50"
        />
        <button
          type="submit"
          disabled={loading || !amount.trim()}
          className="w-full rounded-full bg-neon px-7 py-4 text-sm font-bold text-ink transition duration-300 hover:bg-paper disabled:opacity-50"
        >
          {loading ? "Yuborilmoqda…" : sales.length ? "➕ Yana to'lov qo'shish" : "💰 Sotuvni saqlash"}
        </button>
        {msg && <p className={`text-sm ${msg.ok ? "text-neon" : "text-red-400"}`}>{msg.text}</p>}
      </form>
    </>
  );
}
