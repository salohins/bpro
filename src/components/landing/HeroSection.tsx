import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Map, Filter, Target, ShieldCheck } from "lucide-react";
import tradingVideo from "../../assets/trading.mp4";

/** Simple media query hook (no deps) */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export default function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // ✅ Define “desktop-ish” behavior boundary
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const allowMotion = !reduceMotion && isMdUp; // ✅ key optimization: disable heavy motion on mobile

  const engines = useMemo(
    () => [
      { icon: Map, label: "Market Structure Engine", sub: "3-EMA cloud, regime + HTF alignment." },
      { icon: Filter, label: "Confluence & Filters Engine", sub: "Adaptive permission gates for higher-quality entries." },
      { icon: Target, label: "Signals & Execution Engine", sub: "Breakouts + confirmations with clear entry context." },
      { icon: ShieldCheck, label: "Risk & Trade Management", sub: "Stops, invalidations, exits — rules end-to-end." },
    ],
    []
  );

  const wrap = { hidden: {}, show: {} };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
        : { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // ✅ Smooth scroll when URL contains #core-engines
  useEffect(() => {
    if (location.hash === "#core-engines") {
      requestAnimationFrame(() => {
        const el = document.getElementById("core-engines");
        if (!el) return;

        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }, [location.hash, reduceMotion]);

  const handleSeeItInAction = () => {
    if (location.pathname === "/") {
      navigate("#core-engines", { replace: false });
      const el = document.getElementById("core-engines");
      if (el) {
        el.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
      return;
    }

    navigate("/#core-engines");
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={wrap}
      className="
        relative w-full min-h-[100svh] overflow-hidden bg-[#060606] text-white flex
        items-end md:items-center
      "
      style={{
        "--font-display": `"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
        "--font-body": `"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
      }}
    >
      {/* ===================== Background ===================== */}
      <div className="absolute inset-0">
        {/* ✅ Video: keep it, but remove animated scaling on mobile */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={allowMotion ? { scale: [1.02, 1.06, 1.02] } : undefined}
          transition={allowMotion ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={tradingVideo}
            autoPlay
            loop
            muted
            playsInline
            // ✅ Mobile perf: don’t force full download immediately
            preload={isMdUp ? "auto" : "metadata"}
            controls={false}
          />
        </motion.div>

        {/* ✅ Mobile scrim: transparent in middle, dark at bottom for content contrast */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 45%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.78) 100%)",
          }}
        />

        {/* Desktop-only scrim geometry (clipPath can be expensive) */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div
            className="absolute inset-0 heroScrim"
            style={{ clipPath: "polygon(0% 0%, 60% 0%, 50% 100%, 0% 100%)" }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-0 heroSeam"
            animate={allowMotion ? { opacity: [0.35, 0.75, 0.38] } : undefined}
            transition={allowMotion ? { duration: 5.8, repeat: Infinity, ease: "easeInOut" } : undefined}
            style={{ clipPath: "polygon(58% 0%, 60% 0%, 50% 100%, 48% 100%)" }}
          />
        </div>

        {/* ✅ Big glow blob: hide on mobile (massive GPU cost) */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-[30rem] -left-[30rem] w-[1150px] h-[1150px] rounded-full bg-emerald-500/10 blur-[320px] hidden md:block"
          animate={allowMotion ? { x: [0, 22, -10, 0], y: [0, 14, -10, 0], scale: [1, 1.06, 1.02, 1] } : undefined}
          transition={allowMotion ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined}
        />

        {/* ✅ Small + cheap mobile ambient glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-emerald-500/8 blur-[140px] md:hidden"
        />
      </div>

      {/* ===================== Content ===================== */}
      <div
        className="relative z-10 w-full"
        // ✅ helps on iPhone home-indicator area
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        <div className="mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
          {/* ✅ Mobile: less vertical padding so video dominates; Desktop: keep spacious */}
          <div className="pt-10 pb-10 sm:pt-12 sm:pb-12 md:py-20 lg:py-20 2xl:py-24">
            <div className="max-w-[920px] space-y-6 md:space-y-8 font-[var(--font-body)]">
              <motion.h1
                variants={item}
                className="font-[var(--font-display)] font-semibold tracking-[-0.05em] leading-[0.95]
                text-[clamp(40px,4.4vw,76px)] text-white"
              >
                <span className="text-white/92 text-bold ">
                  All-in-one
                  <br /> breakout system.
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="heroSubcopy text-white/70 text-[clamp(20px,2vw,32px)] leading-[1.5] max-w-[600px]"
              >
                Built for traders who want clean confirmations and decisive entries.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1.5">
                <motion.button
                  whileHover={
                    allowMotion
                      ? { scale: 1.02, backgroundPosition: "right center", boxShadow: "0 0 90px rgba(16,185,129,0.52)" }
                      : undefined
                  }
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate("/subscribe")}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-[16px]
                  text-[14.5px] sm:text-[15.5px] font-semibold rounded-2xl
                  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto]
                  text-black shadow-[0_0_26px_rgba(16,185,129,0.20)] border border-emerald-300/30 transition-all duration-500 overflow-hidden"
                >
                  {/* ✅ Mobile perf: disable infinite shine animation on mobile */}
                  {allowMotion && (
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute -left-1/2 top-0 h-full w-[200%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.02)_55%,transparent_100%)] animate-[shine_1.6s_ease-in-out_infinite]" />
                    </span>
                  )}
                  Try 7 days for free
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleSeeItInAction}
                  whileHover={allowMotion ? { y: -2 } : undefined}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-[16px]
                  rounded-2xl border border-white/12 bg-white/[0.02] hover:bg-white/[0.04] transition text-white/92"
                >
                  <span className="relative">
                    See it in action
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-300" />
                  </span>
                </motion.button>
              </motion.div>

              <motion.div variants={item} className="pt-1 space-y-2">
                <p className="text-[12.5px] text-white/45">
                  7-day free trial. <span className="text-emerald-300/70">Cancel anytime.</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        .heroScrim{
          background:
            radial-gradient(900px 520px at 18% 26%, rgba(16,185,129,0.12), transparent 60%),
            linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.20) 78%, rgba(0,0,0,0.00) 100%);
        }

        .heroSeam{
          background: linear-gradient(180deg,
            rgba(255,255,255,0.00) 0%,
            rgba(16,185,129,0.22) 40%,
            rgba(255,255,255,0.10) 52%,
            rgba(16,185,129,0.16) 68%,
            rgba(255,255,255,0.00) 100%);
          filter: blur(0.2px);
        }

        @keyframes shine{
          0% { transform: translateX(-35%); }
          100% { transform: translateX(35%); }
        }

        .heroSubcopy strong{
          font-weight: 650;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.01em;
        }

        .engineCard{
          transform: translateZ(0);
          transition: border-color .22s ease, box-shadow .22s ease, background-color .22s ease;
          contain: paint;
        }

        .engineCard::before{
          content:"";
          position:absolute;
          inset:-1px;
          opacity:0;
          transition: opacity .28s ease;
          background:
            radial-gradient(700px 200px at 18% 0%, rgba(16,185,129,0.18), transparent 60%),
            linear-gradient(120deg, rgba(16,185,129,0.10), transparent 46%);
          pointer-events:none;
        }

        .engineCard:hover{
          border-color: rgba(16,185,129,0.28);
          box-shadow:
            0 0 0 1px rgba(16,185,129,0.10),
            0 18px 60px rgba(0,0,0,0.52);
          background-color: rgba(255,255,255,0.04);
        }

        .engineCard:hover::before{ opacity:1; }

        .engineIcon{
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03);
        }

        /* ✅ MOBILE PERF: kill hover-overlay layer (no hover anyway) */
        @media (max-width: 767px){
          .engineCard::before{ display:none; }
        }

        /* Clamp engine sub to 1 line to keep hero compact */
        .engineSub{
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
}
