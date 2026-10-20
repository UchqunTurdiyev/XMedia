import { escapeHtml as e, formatPhone } from "./hash";
import { fmtUzs, CAPI_CURRENCY } from "./meta";

const STATUS = {
  new: "🆕 Yangi lid",
  qualified: "✅ Sifatli lid",
  bad: "❌ Sifatsiz",
  sold: "💰 Sotildi",
};

export function leadText(lead) {
  const d = new Date(lead.createdAt + 5 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 16);
  const phone = formatPhone(lead.phone);
  const lines = [
    `<b>${STATUS[lead.status] || "Lid"}</b>  ·  <code>#L-${lead.id}</code>`,
    ``,
    `👤 <b>${e(lead.name)}</b>`,
    `📞 <a href="tel:+${lead.phone}">${e(phone)}</a>`,
  ];
  if (lead.business) lines.push(`🏢 Soha: ${e(lead.business)}`);
  if (lead.service) lines.push(`🎯 Xizmat: ${e(lead.service)}`);
  if (lead.budget) lines.push(`💵 Byudjet: ${e(lead.budget)}`);
  if (lead.comment) lines.push(`💬 ${e(lead.comment)}`);

  const src = [lead.utm?.utm_source, lead.utm?.utm_campaign, lead.utm?.utm_content].filter(Boolean).join(" / ");
  lines.push(``, `📍 Manba: ${e(src || (lead.fbc ? "Meta reklama" : "Organik / to'g'ridan"))}`);
  lines.push(`🕒 ${d}`);

  if (lead.qualifiedBy) lines.push(``, `✅ Sifatli deb belgiladi: ${e(lead.qualifiedBy)}`);
  if (lead.badBy) lines.push(``, `❌ Sifatsiz deb belgiladi: ${e(lead.badBy)}`);

  if (lead.sales?.length) {
    const total = lead.sales.reduce((s, x) => s + x.uzs, 0);
    lines.push(``, `💰 <b>To'lovlar:</b>`);
    lead.sales.forEach((s, i) =>
      lines.push(`  ${i + 1}) ${fmtUzs(s.uzs)}${CAPI_CURRENCY === "USD" ? ` (~$${s.usd})` : ""} — ${e(s.by)}`)
    );
    lines.push(`  <b>Jami: ${fmtUzs(total)}</b>`);
  }

  const capi = [];
  if (lead.capi?.lead) capi.push("Lead ✓");
  if (lead.capi?.qualified) capi.push("Sifatli ✓");
  if (lead.capi?.purchase) capi.push(`Purchase ✓×${lead.capi.purchase}`);
  if (capi.length) lines.push(``, `📡 Meta CAPI: ${capi.join(" · ")}`);

  return lines.join("\n");
}
