import { updateLead, bumpStat } from "./store";
import { sendCapiEvent, capiValue, QUALIFIED_EVENT, CAPI_CURRENCY } from "./meta";
import { tg, CHAT_ID, leadKeyboard } from "./telegram";
import { leadText } from "./leadMessage";

export async function refreshLeadMessage(lead) {
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
export async function markQualified(lead, by) {
  if (lead.capi?.qualified) return lead;
  // event_id bir xil — qayta urinishda ham Meta dublikat qilmaydi
  const res = await sendCapiEvent({ eventName: QUALIFIED_EVENT, eventId: `ql-${lead.id}`, lead });
  if (!lead.qualifiedAt) await bumpStat("qualified");
  return await updateLead(lead.id, {
    status: lead.status === "new" ? "qualified" : lead.status,
    qualifiedBy: lead.qualifiedBy || by,
    qualifiedAt: lead.qualifiedAt || Date.now(),
    capi: { ...lead.capi, qualified: res.ok },
  });
}

/**
 * To'lovni saqlaydi va Meta'ga Purchase (value + currency) yuboradi → ROAS.
 * @returns {{lead, res, value}}
 */
export async function recordSale(lead, amount, by) {
  // Sotib olgan = sifatli. Agar oldin belgilanmagan bo'lsa — QualifiedLead ham ketadi
  if (!lead.capi?.qualified) lead = await markQualified(lead, by);

  const n = (lead.sales?.length || 0) + 1;
  const value = capiValue(amount);
  const res = await sendCapiEvent({
    eventName: "Purchase",
    eventId: `pur-${lead.id}-${n}`,
    lead,
    customData: { value, currency: CAPI_CURRENCY, order_id: `${lead.id}-${n}`, num_items: 1 },
  });

  const sale = { uzs: amount.uzs, usd: amount.usd, by, at: Date.now(), capi: res.ok };
  lead = await updateLead(lead.id, {
    status: "sold",
    sales: [...(lead.sales || []), sale],
    capi: { ...lead.capi, purchase: (lead.capi?.purchase || 0) + (res.ok ? 1 : 0) },
  });

  await bumpStat("sales");
  await bumpStat("revenue", amount.uzs);
  await refreshLeadMessage(lead);
  return { lead, res, value };
}
