import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, Cookie, X, ChevronRight } from "lucide-react";

type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "moostrade_cookie_prefs_v1";

const defaultPrefs: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieBanner() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(raw) as CookiePrefs;
      setPrefs({ necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing });
      setOpen(false);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (p: CookiePrefs) => {
    const normalized: CookiePrefs = { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing };
    setPrefs(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    setOpen(false);

    window.dispatchEvent(new CustomEvent("cookie:consent", { detail: normalized }));
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const acceptSelected = () => save(prefs);

  const variants = useMemo(
    () => ({
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: reduceMotion ? { duration: 0.01 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as any },
      },
      panel: {
        initial: { opacity: 0, y: 18, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: 18, filter: "blur(10px)" },
        transition: reduceMotion ? { duration: 0.01 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as any },
      },
    }),
    [reduceMotion]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* subtle overlay */}
          <motion.div
            {...variants.overlay}
            className="fixed inset-0 z-[9998] bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile-optimized banner:
              - full-width with safe padding
              - bottom "sheet" style on mobile, floating card on sm+
              - actions become full-width stacked on mobile
          */}
          <motion.div
            {...variants.panel}
            className="fixed inset-x-0 bottom-0 z-[9999] px-3 pb-3 sm:px-6 sm:pb-6"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
          >
            <div className="mx-auto w-full max-w-[980px] rounded-[22px] sm:rounded-[26px] p-[1px] bg-gradient-to-b from-white/12 via-white/8 to-emerald-500/10 shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
              <div className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/10 bg-[#070707]">
                {/* ambient */}
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(16,185,129,0.10),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.05),transparent_60%)]" />
                  <div className="absolute -bottom-20 left-0 w-full h-44 bg-gradient-to-t from-emerald-500/8 to-transparent blur-3xl" />
                </div>

                <div className="relative p-4 sm:p-6">
                  {/* header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                        <Cookie className="w-5 h-5 text-emerald-300" />
                      </span>

                      <div className="min-w-0">
                        <div className="text-sm text-white/85 font-semibold">
                          Cookie preferences <span className="text-emerald-300">•</span>{" "}
                          <span className="text-white/55 font-medium">You’re in control</span>
                        </div>
                        <p className="mt-1 text-[12.5px] sm:text-[13px] leading-relaxed text-white/60">
                          Essential cookies keep the site working. Optional cookies help analytics and marketing — only if you allow them.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
                      aria-label="Close cookie banner"
                    >
                      <X className="w-4 h-4 text-white/70" />
                    </button>
                  </div>

                  {/* toggles (mobile-first) */}
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Necessary */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-300" />
                          <span className="text-sm font-semibold text-white/85">Necessary</span>
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-300/20 px-2 py-1 rounded-full">
                          Always on
                        </span>
                      </div>
                      <div className="mt-1 text-[12px] text-white/55 leading-relaxed">
                        Required for security, login, and core functionality.
                      </div>
                    </div>

                    {/* Analytics */}
                    <label className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 cursor-pointer hover:bg-white/[0.04] transition">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white/85">Analytics</div>
                          <div className="text-[12px] text-white/55">Usage insights & improvements.</div>
                        </div>

                        <span className="relative inline-flex items-center shrink-0">
                          <input
                            type="checkbox"
                            checked={prefs.analytics}
                            onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                            className="peer sr-only"
                          />
                          <span className="h-6 w-11 rounded-full border border-white/10 bg-white/[0.05] peer-checked:bg-emerald-400/80 transition" />
                          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white/85 peer-checked:translate-x-5 transition-transform" />
                        </span>
                      </div>
                    </label>

                    {/* Marketing */}
                    <label className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 cursor-pointer hover:bg-white/[0.04] transition">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white/85">Marketing</div>
                          <div className="text-[12px] text-white/55">Personalization & tracking.</div>
                        </div>

                        <span className="relative inline-flex items-center shrink-0">
                          <input
                            type="checkbox"
                            checked={prefs.marketing}
                            onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                            className="peer sr-only"
                          />
                          <span className="h-6 w-11 rounded-full border border-white/10 bg-white/[0.05] peer-checked:bg-emerald-400/80 transition" />
                          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white/85 peer-checked:translate-x-5 transition-transform" />
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* actions (mobile stacked, desktop inline) */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-[12px] text-white/45">
                      You can change this later in <span className="text-white/60 font-medium">Settings</span>.
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={rejectAll}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-2xl text-[13px] font-semibold text-white/70 bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/10"
                      >
                        Reject all
                      </button>

                      <button
                        type="button"
                        onClick={acceptSelected}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-2xl text-[13px] font-semibold text-white/85 bg-white/[0.05] hover:bg-white/[0.08] transition border border-white/10 inline-flex items-center justify-center gap-2"
                      >
                        Save preferences <ChevronRight className="w-4 h-4 text-white/55" />
                      </button>

                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        type="button"
                        onClick={acceptAll}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-2xl text-[13px] font-semibold text-black border border-emerald-300/25 bg-emerald-400/90 hover:bg-emerald-300 transition shadow-[0_0_20px_rgba(16,185,129,0.16)] inline-flex items-center justify-center gap-2"
                      >
                        Accept all <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function getCookiePrefs(): CookiePrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw);
    return { necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return defaultPrefs;
  }
}
