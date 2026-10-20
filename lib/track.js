"use client";

// Brauzer tomonidagi tracking yordamchilari (fbp, fbc, UTM, external_id)

export function getCookie(name) {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function setCookie(name, value, days = 90) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

/** fbclid bo'lsa _fbc cookie yaratadi (Pixel ulgurmasa ham) */
export function captureClickIds() {
  try {
    const p = new URLSearchParams(window.location.search);
    const fbclid = p.get("fbclid");
    if (fbclid && !getCookie("_fbc")) setCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);

    const utm = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = p.get(k);
      if (v) utm[k] = v;
    });
    if (Object.keys(utm).length) sessionStorage.setItem("xm_utm", JSON.stringify(utm));
  } catch {}
}

export function getUtm() {
  try {
    return JSON.parse(sessionStorage.getItem("xm_utm") || "{}");
  } catch {
    return {};
  }
}

export function getExternalId() {
  try {
    let id = localStorage.getItem("xm_eid");
    if (!id) {
      id = uuid();
      localStorage.setItem("xm_eid", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function fbq(...args) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq(...args);
}
