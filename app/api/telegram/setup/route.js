import { NextResponse } from "next/server";
import { tg } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Bir marta oching: https://SAYT/api/telegram/setup?key=SETUP_KEY
 * Telegram webhook'ni shu saytga ulaydi.
 */
export async function GET(req) {
  const { searchParams, origin } = new URL(req.url);
  if (!process.env.SETUP_KEY || searchParams.get("key") !== process.env.SETUP_KEY) {
    return NextResponse.json({ ok: false, error: "key noto'g'ri" }, { status: 401 });
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL || origin;
  const url = `${base.replace(/\/$/, "")}/api/telegram`;

  const set = await tg("setWebhook", {
    url,
    secret_token: process.env.TELEGRAM_WEBHOOK_SECRET || undefined,
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: true,
  });
  await tg("setMyCommands", {
    commands: [
      { command: "stat", description: "Bugungi statistika" },
      { command: "bekor", description: "Summa kiritishni bekor qilish" },
      { command: "id", description: "Chat ID ni ko'rsatish" },
    ],
  });
  const info = await tg("getWebhookInfo", {});
  return NextResponse.json({ webhook: url, setWebhook: set, info: info?.result });
}
