import { NextResponse } from "next/server";
import { getLead, once } from "@/lib/store";
import { parseAmount, CAPI_CURRENCY } from "@/lib/meta";
import { isValidSaleToken } from "@/lib/saleLink";
import { recordSale } from "@/lib/sale";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clip = (v, n = 80) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });

  const id = clip(body.id, 12);
  if (!isValidSaleToken(id, body.t)) return NextResponse.json({ ok: false, error: "Havola yaroqsiz" }, { status: 403 });

  let lead = await getLead(id);
  if (!lead) return NextResponse.json({ ok: false, error: "Lid topilmadi" }, { status: 404 });
  if (lead.status === "bad") return NextResponse.json({ ok: false, error: "Lid sifatsiz deb belgilangan" }, { status: 409 });

  const raw = clip(String(body.amount ?? ""), 30);
  const amount = parseAmount(body.currency === "USD" ? `$${raw}` : raw);
  if (!amount || amount.uzs < 1000) return NextResponse.json({ ok: false, error: "Summa noto'g'ri" }, { status: 422 });

  // Ikki marta bosilsa — ikkinchi Purchase ketmasin
  const key = clip(body.key, 64);
  if (key && !(await once(`sale:${key}`))) return NextResponse.json({ ok: false, error: "Bu to'lov allaqachon saqlangan" }, { status: 409 });

  const by = clip(body.by) || "Sayt orqali";
  const { lead: saved, res, value } = await recordSale(lead, amount, by);

  return NextResponse.json({
    ok: true,
    capi: res.ok,
    capiStatus: res.status,
    value,
    currency: CAPI_CURRENCY,
    uzs: amount.uzs,
    sales: saved.sales,
  });
}
