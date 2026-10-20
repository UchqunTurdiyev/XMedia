import { sha256, normalizePhone, splitName } from "./hash";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_ACCESS_TOKEN;
const VERSION = process.env.META_API_VERSION || "v21.0";
const TEST_CODE = process.env.META_TEST_EVENT_CODE || "";

export const QUALIFIED_EVENT = process.env.META_QUALIFIED_EVENT || "QualifiedLead";
export const CAPI_CURRENCY = (process.env.CAPI_CURRENCY || "USD").toUpperCase();
const UZS_PER_USD = Number(process.env.UZS_PER_USD || 12700);

/** Lid obyektidan Meta user_data (Event Match Quality maksimal bo'lishi uchun) */
export function buildUserData(lead) {
  const phone = normalizePhone(lead.phone);
  const { fn, ln } = splitName(lead.name);
  const ud = {
    ph: [sha256(phone)],
    external_id: [sha256(lead.externalId || lead.id)],
    country: [sha256("uz")],
  };
  if (fn) ud.fn = [sha256(fn)];
  if (ln) ud.ln = [sha256(ln)];
  if (lead.ip) ud.client_ip_address = lead.ip;
  if (lead.ua) ud.client_user_agent = lead.ua;
  if (lead.fbp) ud.fbp = lead.fbp;
  if (lead.fbc) ud.fbc = lead.fbc;
  return ud;
}

/**
 * Meta Conversions API ga event yuborish.
 * @returns {Promise<{ok:boolean, status:number, body:any}>}
 */
export async function sendCapiEvent({ eventName, eventId, lead, customData = {}, eventTime }) {
  if (!PIXEL_ID || !TOKEN) {
    console.warn("[CAPI] PIXEL_ID yoki ACCESS_TOKEN yo'q — event yuborilmadi:", eventName);
    return { ok: false, status: 0, body: "CAPI sozlanmagan" };
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime || Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: lead.url || process.env.NEXT_PUBLIC_SITE_URL,
        user_data: buildUserData(lead),
        custom_data: {
          lead_id: lead.id,
          content_name: lead.service || "XMEDIA ariza",
          content_category: lead.business || undefined,
          ...customData,
        },
      },
    ],
  };
  if (TEST_CODE) payload.test_event_code = TEST_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
    );
    const body = await res.json().catch(() => ({}));
    if (!res.ok) console.error("[CAPI] xato:", eventName, JSON.stringify(body));
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    console.error("[CAPI] tarmoq xatosi:", e);
    return { ok: false, status: 0, body: String(e) };
  }
}

/**
 * Operator yozgan summani tahlil qiladi.
 * "2500000", "2 500 000", "2.5mln", "2,5 mln", "$300", "300$", "300 usd"
 * @returns {{uzs:number|null, usd:number|null}|null}
 */
export function parseAmount(text) {
  if (!text) return null;
  const t = String(text).toLowerCase().replace(/,/g, ".").trim();
  const isUsd = /\$|usd|dollar/.test(t);
  const mln = /mln|million|миллион|млн/.test(t);
  const ming = /ming|k\b|тыс/.test(t);
  const numStr = t.replace(/[^\d.]/g, "");
  if (!numStr) return null;
  let n;
  // "2.500.000" kabi nuqtali minglik
  if ((numStr.match(/\./g) || []).length > 1) n = Number(numStr.replace(/\./g, ""));
  else n = Number(numStr);
  if (!isFinite(n) || n <= 0) return null;
  if (mln) n *= 1_000_000;
  else if (ming) n *= 1_000;
  if (isUsd) return { usd: round2(n), uzs: Math.round(n * UZS_PER_USD) };
  return { uzs: Math.round(n), usd: round2(n / UZS_PER_USD) };
}

/** CAPI ga ketadigan value (valyutaga qarab) */
export function capiValue(amount) {
  return CAPI_CURRENCY === "UZS" ? amount.uzs : amount.usd;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function fmtUzs(n) {
  return Number(n || 0).toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
}
