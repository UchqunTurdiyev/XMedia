import crypto from "crypto";

/** "Sotildi" sahifasi havolasi uchun imzo — havolasiz boshqa lidga summa kiritib bo'lmaydi */
const SECRET = process.env.SALE_SECRET || process.env.TELEGRAM_BOT_TOKEN || "xmedia-dev";

export function saleToken(leadId) {
  return crypto.createHmac("sha256", SECRET).update(`sale:${leadId}`).digest("hex").slice(0, 24);
}

export function isValidSaleToken(leadId, token) {
  const a = Buffer.from(saleToken(leadId));
  const b = Buffer.from(String(token || ""));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Vercel production domeni (custom domen ulangan bo'lsa — o'sha), aks holda NEXT_PUBLIC_SITE_URL */
export function siteBase() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export function saleUrl(leadId) {
  return `${siteBase()}/sotuv/${leadId}?t=${saleToken(leadId)}`;
}
