import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Map, Filter, Target, ShieldCheck } from "lucide-react";
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
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const isMdUp = useMediaQuery("(min-width: 768px)");
  const allowMotion = !reduceMotion && isMdUp;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const demoVideoRef = useRef<HTMLVideoElement | null>(null);

  // Opera/mobile-safe autoplay + seek
  const hasSeekedRef = useRef(false);
  const TARGET_START = 50;

  const requestPlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    // @ts-ignore
    v.playsInline = true;

    try {
      await v.play();
    } catch (err) {
      console.warn("Hero video play failed:", err);
    }
  };

  const requestSeekToTarget = () => {
    const v = videoRef.current;
    if (!v || hasSeekedRef.current) return;

    const dur = Number.isFinite(v.duration) ? v.duration : 0;
    const t = dur && dur < TARGET_START ? Math.max(0, dur - 0.1) : TARGET_START;

    try {
      // @ts-ignore
      if (typeof v.fastSeek === "function") v.fastSeek(t);
      else v.currentTime = t;
      hasSeekedRef.current = true;
    } catch {
      // If seek fails (not buffered yet), retry on next canplay
    }
  };

  useEffect(() => {
    requestPlay();
  }, []);

  useEffect(() => {
    const unlock = () => {
      requestPlay();
      requestSeekToTarget();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };

    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock);

    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, []);

  useEffect(() => {
    if (!isDemoOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const v = demoVideoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => { });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDemoOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (v) v.pause();
    };
  }, [isDemoOpen]);

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

  useEffect(() => {
    if (location.hash === "#core-engines") {
      requestAnimationFrame(() => {
        const el = document.getElementById("core-engines");
        if (!el) return;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const yOffset = isMobile ? -76 : 0;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      });
    }
  }, [location.hash, reduceMotion]);

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
  };

  return (
    <>
      <motion.section
        initial="hidden"
        animate="show"
        variants={wrap}
        onPointerDownCapture={() => {
          requestPlay();
          requestSeekToTarget();
        }}
        className="
          relative w-full min-h-[100svh] overflow-hidden bg-[#060606] text-white flex
          items-end md:items-center
        "
        style={{
          "--font-display": `"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
          "--font-body": `"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={allowMotion ? { scale: [1.02, 1.06, 1.02] } : undefined}
            transition={
              allowMotion
                ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={tradingVideo}
            autoPlay
            loop
            muted
            defaultMuted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
            // ✅ Mobile perf: don’t force full download immediately
            preload={isMdUp ? "auto" : "metadata"}
            controls={false}
            // ✅ don't seek+play here (can be blocked on Opera mobile)
            onLoadedMetadata={() => {
              // best effort: try playing once metadata is ready
              requestPlay();
            }}
            onCanPlay={() => {
              // ✅ once it can play, safely seek then try to play again
              requestSeekToTarget();
              requestPlay();
            }}
          />
          </motion.div>

          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 45%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.78) 100%)",
            }}
          />

          <div className="absolute inset-0 pointer-events-none md:block">
            <div
              className="absolute inset-0 heroScrim"
              style={{ clipPath: "polygon(0% 0%, 70% 0%, 30% 100%, 0% 100%)" }}
            />

            <motion.div
              aria-hidden="true"
              className="absolute inset-0 heroSeam"
              animate={allowMotion ? { opacity: [0.35, 0.75, 0.38] } : undefined}
              transition={
                allowMotion
                  ? { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
                  : undefined
              }
              style={
                isMdUp
                  ? {
                    clipPath:
                      "polygon(68% 0%, 70% 0%, 30% 100%, 28% 100%)",
                  }
                  : {
                    clipPath:
                      "polygon(60% 0%, 70% 0%, 30% 100%, 20% 100%)",
                  }
              }
            />
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute -top-[30rem] -left-[30rem] w-[1150px] h-[1150px] rounded-full bg-emerald-500/10 blur-[320px] hidden md:block"
            animate={
              allowMotion
                ? {
                  x: [0, 22, -10, 0],
                  y: [0, 14, -10, 0],
                  scale: [1, 1.06, 1.02, 1],
                }
                : undefined
            }
            transition={
              allowMotion
                ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />

          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-emerald-500/8 blur-[140px] md:hidden"
          />
        </div>

        <div
          className="relative z-10 w-full"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
        >
          <div className="mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
            <div className="pt-10 pb-10 sm:pt-12 sm:pb-12 md:py-20 lg:py-20 2xl:py-24">
              <div className="max-w-[920px] space-y-6 md:space-y-8 font-[var(--font-body)]">
                <motion.h1
                  variants={item}
                  className="font-[var(--font-display)] font-semibold tracking-[-0.05em] leading-[0.95]
                  text-[clamp(40px,4.4vw,76px)] text-white "
                >
                  <div
                    className="
      mb-5 w-max rounded-full p-[3px]
      bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300
    "
                  >
                    <div className="rounded-full bg-black/90 px-6 py-3">
                      <img
                        src="/bpro_logo.svg"
                        alt="Breakout PRO logo"
                        className="h-6 md:h-10 object-contain"
                      />
                    </div>
                  </div>

                  <span className="text-white/92 text-bold " style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                    All-in-one
                    <br /> breakout system.
                  </span>
                </motion.h1>

                <motion.p
                  variants={item}
                  className="heroSubcopy text-white/70 text-[clamp(20px,2vw,32px)] leading-[1.5] max-w-[600px]"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
                >
                  Built for traders who want clean confirmations and decisive
                  entries.
                </motion.p>

                <motion.div
                  variants={item}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1.5"
                >
                  <motion.button
                    whileHover={
                      allowMotion
                        ? {
                          scale: 1.02,
                          backgroundPosition: "right center",
                          boxShadow: "0 0 90px rgba(16,185,129,0.52)",
                        }
                        : undefined
                    }
                    whileTap={{ scale: 0.985 }}
                    onClick={() => navigate("/subscribe")}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-[16px]
                    text-[14.5px] sm:text-[15.5px] font-semibold rounded-2xl
                    bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto]
                    text-black shadow-[0_0_26px_rgba(16,185,129,0.20)] border border-emerald-300/30 transition-all duration-500 overflow-hidden"
                  >
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
                    onClick={handleOpenDemo}
                    whileHover={
                      allowMotion
                        ? {
                          y: -2,
                          boxShadow:
                            "0 0 0 1px rgba(16,185,129,0.24), 0 0 24px rgba(16,185,129,0.18), 0 0 60px rgba(16,185,129,0.12)",
                        }
                        : undefined
                    }
                    whileTap={{ scale: 0.985 }}
                    className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-[16px]
                    rounded-2xl text-white/95 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400/70 via-emerald-300/30 to-emerald-400/70">
                      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.18),transparent_70%)] opacity-80" />
                    </span>

                    <span className="absolute inset-[1px] rounded-2xl bg-black/55 backdrop-blur-xl border border-emerald-300/10" />

                    {allowMotion && (
                      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="absolute -left-1/2 top-0 h-full w-[200%] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_45%,transparent_70%)] animate-[shine_1.8s_ease-in-out_infinite]" />
                      </span>
                    )}

                    <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(16,185,129,0.10),0_0_18px_rgba(16,185,129,0.10)] group-hover:shadow-[0_0_0_1px_rgba(16,185,129,0.22),0_0_28px_rgba(16,185,129,0.20),0_0_60px_rgba(16,185,129,0.12)] transition-all duration-300" />

                    <span className="relative inline-flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10">
                        <Play className="w-4 h-4 fill-current text-emerald-300" />
                      </span>

                      <span className="relative font-medium tracking-[-0.01em]">
                        See it in action
                        <span className="absolute left-0 -bottom-1 h-px w-0 bg-emerald-300/60 group-hover:w-full transition-all duration-300" />
                      </span>
                    </span>
                  </motion.button>
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

          @media (max-width: 767px){
            .engineCard::before{ display:none; }
          }

          .engineSub{
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </motion.section>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close demo video"
              onClick={() => setIsDemoOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition"
            >
              ✕
            </button>

            <video
              ref={demoVideoRef}
              className="w-full h-auto max-h-[85svh] bg-black"
              src="/bpro-demo.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      )}
    </>
  );
}