import { Redis } from "@upstash/redis";

/**
 * Lidlar Upstash Redis'da saqlanadi.
 * Env bo'lmasa (lokal test) — xotirada saqlaydi (server qayta ishga tushsa o'chadi).
 */
const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = hasRedis
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  : null;

const mem = globalThis.__xmediaMem || (globalThis.__xmediaMem = new Map());

async function get(key) {
  if (redis) return await redis.get(key);
  const v = mem.get(key);
  if (!v) return null;
  if (v.exp && v.exp < Date.now()) {
    mem.delete(key);
    return null;
  }
  return v.val;
}

async function set(key, val, ttlSec) {
  if (redis) return ttlSec ? redis.set(key, val, { ex: ttlSec }) : redis.set(key, val);
  mem.set(key, { val, exp: ttlSec ? Date.now() + ttlSec * 1000 : null });
}

async function del(key) {
  if (redis) return redis.del(key);
  mem.delete(key);
}

async function incr(key, by = 1, ttlSec) {
  if (redis) {
    const v = by === 1 ? await redis.incr(key) : await redis.incrbyfloat(key, by);
    if (ttlSec) await redis.expire(key, ttlSec);
    return Number(v);
  }
  const cur = Number((await get(key)) || 0) + by;
  await set(key, cur, ttlSec);
  return cur;
}

const LEAD_TTL = 60 * 60 * 24 * 180; // 180 kun

export function dayKey(d = new Date()) {
  // Toshkent vaqti (UTC+5)
  const t = new Date(d.getTime() + 5 * 3600 * 1000);
  return t.toISOString().slice(0, 10);
}

export async function nextLeadNumber() {
  return incr("xm:lead:seq");
}

export async function saveLead(lead) {
  await set(`xm:lead:${lead.id}`, lead, LEAD_TTL);
  return lead;
}

export async function getLead(id) {
  return await get(`xm:lead:${id}`);
}

export async function updateLead(id, patch) {
  const lead = await getLead(id);
  if (!lead) return null;
  const next = { ...lead, ...patch, updatedAt: Date.now() };
  await saveLead(next);
  return next;
}

/** Operator "Sotildi" bosganda summa kutish holati */
export async function setPending(userId, leadId) {
  await set(`xm:pending:${userId}`, leadId, 60 * 60);
}
export async function getPending(userId) {
  return await get(`xm:pending:${userId}`);
}
export async function clearPending(userId) {
  await del(`xm:pending:${userId}`);
}

/** Statistika (kunlik) */
export async function bumpStat(field, by = 1) {
  return incr(`xm:stat:${dayKey()}:${field}`, by, 60 * 60 * 24 * 90);
}
export async function getStats(day = dayKey()) {
  const fields = ["leads", "qualified", "bad", "sales", "revenue"];
  const out = {};
  for (const f of fields) out[f] = Number((await get(`xm:stat:${day}:${f}`)) || 0);
  return out;
}

/** Oddiy rate-limit: IP bo'yicha 10 daqiqada 5 ta ariza */
export async function rateLimit(ip, limit = 5, windowSec = 600) {
  if (!ip) return true;
  const n = await incr(`xm:rl:${ip}`, 1, windowSec);
  return n <= limit;
}

/** Bir xil callback ikki marta ishlamasligi uchun */
export async function once(key, ttlSec = 60 * 60 * 24 * 30) {
  const k = `xm:once:${key}`;
  if (redis) {
    const r = await redis.set(k, 1, { nx: true, ex: ttlSec });
    return r === "OK";
  }
  if (await get(k)) return false;
  await set(k, 1, ttlSec);
  return true;
}
