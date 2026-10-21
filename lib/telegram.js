import { saleUrl } from "./saleLink";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function tg(method, body) {
  if (!TOKEN) {
    console.error("[TG] TELEGRAM_BOT_TOKEN yo'q:", method);
    return { ok: false, description: "TELEGRAM_BOT_TOKEN yo'q" };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    // Guruh supergroup'ga aylangan bo'lsa ID o'zgaradi — yangi ID bilan qayta urinamiz
    const migrated = json.parameters?.migrate_to_chat_id;
    if (!json.ok && migrated && body?.chat_id && body.chat_id !== migrated) {
      console.error(`[TG] Guruh ID o'zgargan: TELEGRAM_CHAT_ID=${migrated} qilib yangilang`);
      return tg(method, { ...body, chat_id: migrated });
    }
    if (!json.ok) console.error("[TG] xato:", method, JSON.stringify(json));
    return json;
  } catch (e) {
    console.error("[TG] tarmoq xatosi:", e);
    return { ok: false, description: String(e) };
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
