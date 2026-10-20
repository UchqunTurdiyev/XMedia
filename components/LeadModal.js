"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LeadForm from "./LeadForm";

const Ctx = createContext({ open: () => {} });
export const useLeadModal = () => useContext(Ctx);

export default function LeadModalProvider({ children }) {
  const [state, setState] = useState(null); // null | { source }
  const pathname = usePathname();

  // Forma yuborilib /rahmat ga o'tilganda modal ochiq (loading) qolib ketmasin
  useEffect(() => {
    setState(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = state ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setState(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  return (
    <Ctx.Provider value={{ open: (source = "modal") => setState({ source }) }}>
      <MotionConfig reducedMotion="user">
        {children}
        <AnimatePresence>
          {state && (
            <motion.div
              className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                aria-label="Yopish"
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={() => setState(null)}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-lg rounded-t-3xl border border-line bg-ink-2 p-6 sm:rounded-3xl sm:p-8"
                initial={{ y: 60, scale: 0.96, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 40, scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setState(null)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-mute transition duration-300 hover:border-paper/60 hover:text-paper"
                  aria-label="Yopish"
                >
                  ✕
                </button>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">Bepul konsultatsiya</p>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight">
                  Biznesingizga media <span className="text-neon">audit</span> qilib beramiz
                </h3>
                <p className="mt-2 text-sm text-mute">15 daqiqa ichida menejerimiz qo'ng'iroq qiladi.</p>
                <div className="mt-6">
                  <LeadForm compact source={state.source} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Ctx.Provider>
  );
}
