"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo, CTAButton } from "./ui";
import { site } from "@/lib/content";
import { useLeadModal } from "./LeadModal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon">Keyingi qadam</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1]">
              Brendingizni <span className="neon-text">kadrga</span> olib chiqamiz
            </h2>
          </div>
          <CTAButton source="footer">Ariza qoldirish</CTAButton>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line py-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mute">{site.tagline}. Infoprodyuserlik, SMM, shaxsiy brend va video prodakshn.</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Aloqa</p>
            <a href={`tel:${site.phoneRaw}`} className="block font-mono text-lg hover:text-neon">
              {site.phone}
            </a>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Ijtimoiy tarmoqlar</p>
            <a href={site.instagram} target="_blank" rel="noopener" className="block hover:text-neon">
              Instagram — {site.instagramHandle}
            </a>
            <a href={site.telegram} target="_blank" rel="noopener" className="block hover:text-neon">
              Telegram kanal
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-display text-[22vw] font-black leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(57,255,106,0.25)]"
      >
        XMEDIA
      </p>
      <p className="border-t border-line py-5 text-center text-xs text-mute">© {new Date().getFullYear()} XMEDIA. Barcha huquqlar himoyalangan.</p>
    </footer>
  );
}

/** Mobil: pastda doimiy CTA panel */
export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { open } = useLeadModal();
  useEffect(() => {
    const on = () => {
      const form = document.getElementById("ariza");
      const r = form?.getBoundingClientRect();
      const formVisible = r && r.top < window.innerHeight && r.bottom > 0;
      setShow(window.scrollY > 600 && !formVisible);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl border border-line bg-ink/85 p-2 backdrop-blur-xl md:hidden"
        >
          <a href={`tel:${site.phoneRaw}`} className="grid w-14 place-items-center rounded-xl border border-line text-neon" aria-label="Qo'ng'iroq">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
            </svg>
          </a>
          <button onClick={() => open("sticky-mobile")} className="shine flex-1 rounded-xl bg-neon py-3.5 font-display text-sm font-extrabold uppercase text-ink">
            Bepul audit olish →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
