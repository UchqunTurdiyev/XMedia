import { saleUrl } from "./saleLink";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function tg(method, body) {
  if (!TOKEN) {
    console.warn("[TG] TELEGRAM_BOT_TOKEN yo'q:", method);
    return { ok: false };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!json.ok) console.error("[TG] xato:", method, JSON.stringify(json));
    return json;
  } catch (e) {
    console.error("[TG] tarmoq xatosi:", e);
    return { ok: false };
  }
}

export function isAllowed(userId) {
  if (!ADMIN_IDS.length) return true;
  return ADMIN_IDS.includes(String(userId));
}

/** Lid holatiga qarab tugmalar */
export function leadKeyboard(lead) {
  const rows = [];
  if (lead.status === "new") {
    rows.push([
      { text: "✅ Sifatli lid", callback_data: `q:${lead.id}` },
      { text: "❌ Sifatsiz", callback_data: `x:${lead.id}` },
    ]);
  }
  if (lead.status !== "bad") {
    // URL tugma — alohida sahifa ochiladi, summa o'sha yerda kiritiladi
    rows.push([{ text: lead.sales?.length ? "➕ Yana to'lov qo'shish" : "💰 Sotuv bo'ldi — summa kiritish", url: saleUrl(lead.id) }]);
  }
  if (lead.status === "bad") {
    rows.push([{ text: "↩️ Qaytarish (xato bosildi)", callback_data: `r:${lead.id}` }]);
  }
  return { inline_keyboard: rows };
}
