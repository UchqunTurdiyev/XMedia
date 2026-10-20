import { NextResponse } from "next/server";
import { isValidUzPhone, normalizePhone } from "@/lib/hash";
import { nextLeadNumber, saveLead, updateLead, rateLimit, bumpStat } from "@/lib/store";
import { sendCapiEvent } from "@/lib/meta";
import { tg, CHAT_ID, leadKeyboard } from "@/lib/telegram";
import { leadText } from "@/lib/leadMessage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

const clip = (v, n = 200) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  // Honeypot — botlar to'ldiradi, odamlar ko'rmaydi
  if (body.website) return NextResponse.json({ ok: true });

  const name = clip(body.name, 80);
  const phone = normalizePhone(body.phone);
  if (name.length < 2) return NextResponse.json({ ok: false, error: "Ismingizni kiriting" }, { status: 422 });
  if (!isValidUzPhone(phone))
    return NextResponse.json({ ok: false, error: "Telefon raqam noto'g'ri" }, { status: 422 });

  const ip = clientIp(req);
  if (!(await rateLimit(ip))) {
    return NextResponse.json({ ok: false, error: "Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring" }, { status: 429 });
  }

  const num = await nextLeadNumber();
  const id = String(num).padStart(5, "0");
  const eventId = clip(body.eventId, 64) || `lead-${id}-${Date.now()}`;

  const utm = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (body.utm?.[k]) utm[k] = clip(body.utm[k], 120);
  }

  const lead = {
    id,
    createdAt: Date.now(),
    status: "new",
    name,
    phone,
    business: clip(body.business, 80),
    service: clip(body.service, 80),
    budget: clip(body.budget, 60),
    comment: clip(body.comment, 500),
    url: clip(body.url, 500),
    fbp: clip(body.fbp, 120),
    fbc: clip(body.fbc, 300),
    externalId: clip(body.externalId, 64) || id,
    ip,
    ua: clip(req.headers.get("user-agent") || "", 400),
    utm,
    leadEventId: eventId,
    sales: [],
    capi: {},
  };

  await saveLead(lead);
  await bumpStat("leads");

  // 1) Meta CAPI — Lead (brauzerdagi Pixel bilan bir xil event_id → deduplikatsiya)
  const capiRes = await sendCapiEvent({ eventName: "Lead", eventId, lead });
  if (capiRes.ok) lead.capi.lead = true;

  // 2) Telegram guruhga
  if (CHAT_ID) {
    const msg = await tg("sendMessage", {
      chat_id: CHAT_ID,
      text: leadText(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: leadKeyboard(lead),
    });
    if (msg?.ok) lead.tgMessageId = msg.result.message_id;
  }

  await updateLead(id, { capi: lead.capi, tgMessageId: lead.tgMessageId });

  return NextResponse.json({ ok: true, id });
}
