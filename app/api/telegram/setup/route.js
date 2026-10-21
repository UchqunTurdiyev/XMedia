import { NextResponse } from "next/server";
import { tg, CHAT_ID } from "@/lib/telegram";
import { siteBase } from "@/lib/saleLink";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Bir marta oching: https://SAYT/api/telegram/setup?key=SETUP_KEY
 * Telegram webhook'ni shu saytga ulaydi.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  if (!process.env.SETUP_KEY || searchParams.get("key") !== process.env.SETUP_KEY) {
    return NextResponse.json({ ok: false, error: "key noto'g'ri" }, { status: 401 });
  }
  const url = `${siteBase()}/api/telegram`;

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

  // Diagnostika: lidlar nega guruhga tushmayotganini ko'rsatadi
  const env = Object.fromEntries(
    ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "META_ACCESS_TOKEN", "NEXT_PUBLIC_META_PIXEL_ID"].map(
      (k) => [k, !!process.env[k]]
    )
  );
  const me = await tg("getMe", {});
  const chat = CHAT_ID ? await tg("getChat", { chat_id: CHAT_ID }) : { ok: false, description: "TELEGRAM_CHAT_ID yo'q" };
  const test =
    searchParams.get("test") === "1" && CHAT_ID
      ? await tg("sendMessage", { chat_id: CHAT_ID, text: "✅ XMEDIA bot: test xabar — lidlar shu guruhga tushadi" })
      : undefined;

  return NextResponse.json({
    webhook: url,
    setWebhook: set,
    info: info?.result,
    env,
    chatId: CHAT_ID || null,
    bot: me.ok ? `@${me.result.username}` : me.description,
    chat: chat.ok ? { ok: true, title: chat.result.title, type: chat.result.type } : chat,
    test: test && (test.ok ? "yuborildi" : test),
  });
}
