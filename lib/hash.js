import crypto from "crypto";

export function sha256(value) {
  if (value === undefined || value === null || value === "") return undefined;
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

/** +998 90 123-45-67 -> 998901234567 */
export function normalizePhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length === 9) d = "998" + d;
  if (d.startsWith("8") && d.length === 10) d = "998" + d.slice(1);
  return d;
}

export function isValidUzPhone(raw) {
  const d = normalizePhone(raw);
  return /^998\d{9}$/.test(d);
}

export function formatPhone(raw) {
  const d = normalizePhone(raw);
  if (d.length !== 12) return "+" + d;
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)}-${d.slice(8, 10)}-${d.slice(10)}`;
}

export function splitName(full) {
  const parts = String(full || "").trim().split(/\s+/).filter(Boolean);
  return { fn: parts[0] || "", ln: parts.slice(1).join(" ") };
}

export function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
