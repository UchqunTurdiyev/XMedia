"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo, CTAButton, H2, TelegramIcon, PhoneIcon } from "./ui";
import { site } from "@/lib/content";
import { useLeadModal } from "./LeadModal";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mute">Keyingi qadam</p>
            <H2 className="mt-5 max-w-2xl">
              Brendingizni <span className="text-neon">kadrga</span> olib chiqamiz
            </H2>
          </div>
          <CTAButton source="footer">Bepul audit olish</CTAButton>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line py-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mute">{site.tagline}. Shaxsiy brend, SMM, video prodakshn va target reklama.</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">Aloqa</p>
            <a href={`tel:${site.phoneRaw}`} className="tnum block text-lg font-semibold transition duration-300 hover:text-neon">
              {site.phone}
            </a>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">Ijtimoiy tarmoqlar</p>
            <a href={site.instagram} target="_blank" rel="noopener" className="block transition duration-300 hover:text-neon">
              Instagram — {site.instagramHandle}
            </a>
            <a href={site.telegram} target="_blank" rel="noopener" className="block transition duration-300 hover:text-neon">
              Telegram
            </a>
          </div>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-mute">© {new Date().getFullYear()} XMEDIA. Barcha huquqlar himoyalangan.</p>
    </footer>
  );
}

/** Mobil: pastda doimiy panel — Telegram, qo'ng'iroq, audit */
export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { open } = useLeadModal();
  useEffect(() => {
    const on = () => {
      const form = document.getElementById("ariza");
      const r = form?.getBoundingClientRect();
      const formVisible = r && r.top < window.innerHeight && r.bottom > 0;
      setShow(window.scrollY > 400 && !formVisible);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const icon = "grid w-12 place-items-center rounded-xl border border-line text-paper";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl border border-line bg-ink/90 p-2 backdrop-blur-xl md:hidden"
        >
          <a href={site.telegram} target="_blank" rel="noopener" className={icon} aria-label="Telegram">
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a href={`tel:${site.phoneRaw}`} className={icon} aria-label="Qo'ng'iroq">
            <PhoneIcon />
          </a>
          <button onClick={() => open("sticky-mobile")} className="flex-1 rounded-xl bg-neon py-3.5 text-sm font-bold text-ink">
            Bepul audit olish →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
