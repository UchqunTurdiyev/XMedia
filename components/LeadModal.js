"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LeadForm from "./LeadForm";

const Ctx = createContext({ open: () => {} });
export const useLeadModal = () => useContext(Ctx);

export default function LeadModalProvider({ children }) {
  const [state, setState] = useState(null); // null | { source }

  useEffect(() => {
    document.documentElement.style.overflow = state ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setState(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  return (
    <Ctx.Provider value={{ open: (source = "modal") => setState({ source }) }}>
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
              className="vf relative w-full max-w-lg rounded-t-3xl border border-line bg-ink-2 p-6 sm:rounded-3xl sm:p-8"
              initial={{ y: 60, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <i /><i /><i /><i />
              <button
                onClick={() => setState(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-mute transition hover:border-neon hover:text-neon"
                aria-label="Yopish"
              >
                ✕
              </button>
              <p className="font-mono text-xs tracking-widest text-neon">● BEPUL KONSULTATSIYA</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">
                Biznesingizga media <span className="neon-text">audit</span> qilib beramiz
              </h3>
              <p className="mt-2 text-sm text-mute">15 daqiqa ichida menejerimiz qo'ng'iroq qiladi.</p>
              <div className="mt-6">
                <LeadForm compact source={state.source} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
