import { NextResponse } from "next/server";
import { getLead, updateLead, setPending, getPending, clearPending, bumpStat, getStats, once } from "@/lib/store";
import { sendCapiEvent, parseAmount, capiValue, QUALIFIED_EVENT, CAPI_CURRENCY, fmtUzs } from "@/lib/meta";
import { tg, CHAT_ID, isAllowed, leadKeyboard } from "@/lib/telegram";
import { leadText } from "@/lib/leadMessage";
import { escapeHtml } from "@/lib/hash";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const who = (u) => [u?.first_name, u?.last_name].filter(Boolean).join(" ") + (u?.username ? ` (@${u.username})` : "");

async function refreshLeadMessage(lead) {
  if (!lead.tgMessageId || !CHAT_ID) return;
  await tg("editMessageText", {
    chat_id: CHAT_ID,
    message_id: lead.tgMessageId,
    text: leadText(lead),
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: leadKeyboard(lead),
  });
}

/** Sifatli lid → Meta (bir marta) */
async function markQualified(lead, user) {
  if (lead.capi?.qualified) return lead;
  // event_id bir xil — qayta urinishda ham Meta dublikat qilmaydi
  const res = await sendCapiEvent({ eventName: QUALIFIED_EVENT, eventId: `ql-${lead.id}`, lead });
  if (!lead.qualifiedAt) await bumpStat("qualified");
  return await updateLead(lead.id, {
    status: lead.status === "new" ? "qualified" : lead.status,
    qualifiedBy: lead.qualifiedBy || who(user),
    qualifiedAt: lead.qualifiedAt || Date.now(),
    capi: { ...lead.capi, qualified: res.ok },
  });
}

export async function POST(req) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await req.json().catch(() => null);
  if (!update) return NextResponse.json({ ok: true });

  // Telegram qayta yuborsa — ikki marta Purchase ketmasin
  if (!(await once(`upd:${update.update_id}`))) return NextResponse.json({ ok: true });

  try {
    if (update.callback_query) await onCallback(update.callback_query);
    else if (update.message) await onMessage(update.message);
  } catch (e) {
    console.error("[TG webhook]", e);
  }
  return NextResponse.json({ ok: true });
}

async function onCallback(cq) {
  const [action, id] = String(cq.data || "").split(":");
  const answer = (text, alert = false) => tg("answerCallbackQuery", { callback_query_id: cq.id, text, show_alert: alert });

  if (!isAllowed(cq.from.id)) return answer("Sizda ruxsat yo'q", true);

  let lead = await getLead(id);
  if (!lead) return answer("Lid topilmadi (muddati o'tgan bo'lishi mumkin)", true);

  if (action === "q") {
    if (lead.status !== "new") return answer("Bu lid allaqachon belgilangan");
    lead = await markQualified(lead, cq.from);
    await refreshLeadMessage(lead);
    return answer(lead.capi.qualified ? "✅ Sifatli lid Meta'ga yuborildi" : "✅ Belgilandi (CAPI xato — logni tekshiring)");
  }

  if (action === "x") {
    if (lead.status !== "new") return answer("Bu lid allaqachon belgilangan");
    lead = await updateLead(id, { status: "bad", badBy: who(cq.from) });
    await bumpStat("bad");
    await refreshLeadMessage(lead);
    return answer("❌ Sifatsiz deb belgilandi");
  }

  if (action === "r") {
    if (lead.status !== "bad") return answer("Qaytarish shart emas");
    lead = await updateLead(id, { status: "new", badBy: null });
    await bumpStat("bad", -1);
    await refreshLeadMessage(lead);
    return answer("↩️ Qaytarildi");
  }

  if (action === "p") {
    if (lead.status === "bad") return answer("Avval lidni qaytaring", true);
    await setPending(cq.from.id, id);
    await tg("sendMessage", {
      chat_id: cq.message.chat.id,
      reply_to_message_id: cq.message.message_id,
      parse_mode: "HTML",
      text:
        `💰 <code>#L-${id}</code> — <b>${escapeHtml(lead.name)}</b>\n\n` +
        `To'lov summasini <b>shu xabarga javob (reply)</b> qilib yozing:\n` +
        `• <code>2500000</code>  yoki  <code>2.5 mln</code>  (so'm)\n` +
        `• <code>$200</code>  (dollar)\n\n` +
        `Bekor qilish: /bekor`,
      reply_markup: { force_reply: true, selective: true, input_field_placeholder: "Masalan: 2500000" },
    });
    return answer("Summani yozing 👇");
  }

  return answer("Noma'lum amal");
}

async function onMessage(m) {
  const text = (m.text || "").trim();
  const chatId = m.chat.id;
  const reply = (t, extra = {}) =>
    tg("sendMessage", { chat_id: chatId, text: t, parse_mode: "HTML", reply_to_message_id: m.message_id, ...extra });

  // ---- Buyruqlar ----
  const cmd = text.split(/[\s@]/)[0].toLowerCase();
  if (cmd === "/start" || cmd === "/id") {
    return reply(
      `👋 XMEDIA lid boti.\n\nChat ID: <code>${chatId}</code>\nSizning ID: <code>${m.from.id}</code>\n\n` +
        `Buyruqlar:\n/stat — bugungi statistika\n/bekor — summa kiritishni bekor qilish`
    );
  }
  if (cmd === "/bekor") {
    await clearPending(m.from.id);
    return reply("Bekor qilindi.");
  }
  if (cmd === "/stat") {
    const s = await getStats();
    const conv = s.leads ? Math.round((s.sales / s.leads) * 100) : 0;
    return reply(
      `📊 <b>Bugun</b>\n\n🆕 Lidlar: <b>${s.leads}</b>\n✅ Sifatli: <b>${s.qualified}</b>\n❌ Sifatsiz: <b>${s.bad}</b>\n` +
        `💰 Sotuvlar: <b>${s.sales}</b> (${conv}%)\n💵 Tushum: <b>${fmtUzs(s.revenue)}</b>`
    );
  }
  if (text.startsWith("/")) return;

  // ---- Summa kiritish ----
  let leadId = null;
  const replied = m.reply_to_message?.text || "";
  const match = replied.match(/#L-(\d{3,})/);
  if (match && m.reply_to_message?.from?.is_bot) leadId = match[1];
  if (!leadId) leadId = await getPending(m.from.id);
  if (!leadId) return; // oddiy suhbat — e'tiborsiz

  if (!isAllowed(m.from.id)) return reply("Sizda ruxsat yo'q.");

  let lead = await getLead(leadId);
  if (!lead) return reply("Lid topilmadi.");

  const amount = parseAmount(text);
  if (!amount || amount.uzs < 1000) {
    return reply("⚠️ Summani tushunmadim. Masalan: <code>2500000</code>, <code>2.5 mln</code> yoki <code>$200</code>", {
      reply_markup: { force_reply: true, selective: true },
    });
  }

  // Sotib olgan = sifatli. Agar oldin belgilanmagan bo'lsa — QualifiedLead ham ketadi
  if (!lead.capi?.qualified) lead = await markQualified(lead, m.from);

  const n = (lead.sales?.length || 0) + 1;
  const value = capiValue(amount);
  const res = await sendCapiEvent({
    eventName: "Purchase",
    eventId: `pur-${lead.id}-${n}`,
    lead,
    customData: { value, currency: CAPI_CURRENCY, order_id: `${lead.id}-${n}`, num_items: 1 },
  });

  const sale = { uzs: amount.uzs, usd: amount.usd, by: who(m.from), at: Date.now(), capi: res.ok };
  lead = await updateLead(lead.id, {
    status: "sold",
    sales: [...(lead.sales || []), sale],
    capi: { ...lead.capi, purchase: (lead.capi?.purchase || 0) + (res.ok ? 1 : 0) },
  });

  await clearPending(m.from.id);
  await bumpStat("sales");
  await bumpStat("revenue", amount.uzs);
  await refreshLeadMessage(lead);

  const shown = CAPI_CURRENCY === "UZS" ? fmtUzs(value) : `$${value}`;
  return reply(
    res.ok
      ? `✅ <b>Purchase Meta'ga yuborildi</b>\n<code>#L-${lead.id}</code> · ${fmtUzs(amount.uzs)} → ${shown}`
      : `⚠️ To'lov saqlandi, lekin Meta CAPI xato qaytardi (status ${res.status}). Tokenni tekshiring.`
  );
}
