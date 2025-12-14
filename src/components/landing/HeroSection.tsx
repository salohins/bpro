import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Map, Filter, Target, ShieldCheck, Check } from "lucide-react";
import tradingVideo from "../../assets/trading.mp4";

export default function HeroSection() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const labels = useMemo(
        () => ["Crypto & futures", "Scalping, day & swing trading", "Manual & bot execution", "Beginner → advanced"],
        []
    );

    const engines = useMemo(
        () => [
            { icon: Map, label: "Market Structure Engine", sub: "Trend, regime, HTF alignment, forward targets." },
            { icon: Filter, label: "Confluence & Sentiment Engine", sub: "9-layer permission gates that adapt to conditions." },
            { icon: Target, label: "Signal & Execution Engine", sub: "Breakouts first. Divergences second. Context always." },
            { icon: ShieldCheck, label: "Trade Lifecycle & Risk Engine", sub: "Stops, invalidations, exits — rules from entry to close." },
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
                ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.section
            initial="hidden"
            animate="show"
            variants={wrap}
            className="relative w-full min-h-[100svh] overflow-hidden bg-[#060606] text-white flex items-center"
            style={{
                "--font-display": `"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
                "--font-body": `"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
            }}
        >
            {/* ===================== Background Video ===================== */}
            <div className="absolute inset-0">
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0"
                    animate={reduceMotion ? {} : { scale: [1.02, 1.06, 1.02] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={tradingVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls={false}
                    />
                </motion.div>

                <div className="absolute inset-0 pointer-events-none md:hidden bg-black/72" />

                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <div className="absolute inset-0 heroScrim" style={{ clipPath: "polygon(0% 0%, 60% 0%, 50% 100%, 0% 100%)" }} />

                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 heroSeam"
                        animate={reduceMotion ? {} : { opacity: [0.35, 0.75, 0.38] }}
                        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ clipPath: "polygon(58% 0%, 60% 0%, 50% 100%, 48% 100%)" }}
                    />

                    <div className="absolute inset-0 bg-black/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                </div>

                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    animate={reduceMotion ? {} : { backgroundPosition: ["0px 0px", "0px 240px"] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.10) 1px, transparent 1px)",
                        backgroundSize: "96px 96px",
                    }}
                />

                <motion.div
                    aria-hidden="true"
                    className="absolute -top-[30rem] -left-[30rem] w-[1150px] h-[1150px] rounded-full bg-emerald-500/10 blur-[320px]"
                    animate={reduceMotion ? {} : { x: [0, 22, -10, 0], y: [0, 14, -10, 0], scale: [1, 1.06, 1.02, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* ===================== Content ===================== */}
            <div className="relative z-10 w-full">
                <div className="mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                    {/* ↓ Reduced vertical padding so it fits 2K without scroll */}
                    <div className="py-14 sm:py-16 md:py-20 lg:py-20 2xl:py-24">
                        {/* ↓ Reduced spacing between blocks */}
                        <div className="max-w-[920px] space-y-7 md:space-y-8 font-[var(--font-body)]">


                            {/* HEADLINE */}
                            <motion.h1
                                variants={item}
                                className="font-[var(--font-display)] font-semibold tracking-[-0.05em] leading-[0.95]
                text-[clamp(40px,4.4vw,76px)] text-white"
                            >
                                <span className={`bproMark ${reduceMotion ? "bproMarkStatic" : "bproMarkAnim"}`}>B:PRO</span>{" "}
                                <span className="text-white/92 leading-tight pl-5">The first trading tool that thinks like a pro.</span>
                            </motion.h1>

                            {/* SUBCOPY */}
                            <motion.p
                                variants={item}
                                className="heroSubcopy text-white/70 text-[clamp(15px,1.08vw,18px)] leading-[1.6] max-w-[860px]"
                            >
                                <strong>Breakout Pro (B:PRO)</strong> is a <strong>TradingView indicator</strong> that helps traders identify{" "}
                                <strong>high-quality breakouts</strong>, stay aligned with the broader trend, and avoid low-probability chop.
                                It combines structure, filters, and execution tools into one system — designed for{" "}
                                <strong>consistent decision-making</strong>.
                            </motion.p>

                            {/* LABEL PILLS */}
                            <motion.div variants={item} className="flex flex-wrap items-center gap-2">
                                {labels.map((t) => (
                                    <motion.div
                                        key={t}
                                        whileHover={reduceMotion ? {} : { y: -2 }}
                                        transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 320, damping: 22 }}
                                        className="heroPill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/35 backdrop-blur-md"
                                    >
                                        <Check className="h-4 w-4 text-emerald-300" />
                                        <span className="text-[11.5px] sm:text-[12px] text-white/72 tracking-tight">{t}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* ENGINES (more compact + 1-line sub) */}
                            <motion.div variants={item} className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-[920px]">
                                {engines.map((e) => {
                                    const Icon = e.icon;
                                    return (
                                        <motion.div
                                            key={e.label}
                                            whileHover={reduceMotion ? {} : { y: -3, scale: 1.008 }}
                                            whileTap={reduceMotion ? {} : { scale: 0.995 }}
                                            transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 260, damping: 22 }}
                                            className="engineCard group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4"
                                            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="engineIcon mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                                                    <Icon className="h-4.5 w-4.5 text-emerald-300" />
                                                </span>

                                                <div className="min-w-0">
                                                    <div className="text-[13px] sm:text-[14px] font-semibold text-white/90 leading-tight">{e.label}</div>
                                                    <div className="engineSub mt-1 text-[12px] text-white/60 leading-snug">{e.sub}</div>
                                                </div>

                                                <div className="ml-auto text-emerald-200/70 opacity-0 group-hover:opacity-100 transition">↗</div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* CTAs (slightly smaller) */}
                            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1.5">
                                <motion.button
                                    whileHover={
                                        reduceMotion
                                            ? {}
                                            : { scale: 1.02, backgroundPosition: "right center", boxShadow: "0 0 90px rgba(16,185,129,0.52)" }
                                    }
                                    whileTap={{ scale: 0.985 }}
                                    onClick={() => navigate("/subscribe")}
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-[16px]
                  text-[14.5px] sm:text-[15.5px] font-semibold rounded-2xl
                  bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto]
                  text-black shadow-[0_0_26px_rgba(16,185,129,0.20)] border border-emerald-300/30 transition-all duration-500 overflow-hidden"
                                >
                                    {!reduceMotion && (
                                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="absolute -left-1/2 top-0 h-full w-[200%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.02)_55%,transparent_100%)] animate-[shine_1.6s_ease-in-out_infinite]" />
                                        </span>
                                    )}
                                    Start 7-day trial
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </motion.button>

                                <motion.a
                                    href="#demo"
                                    whileHover={reduceMotion ? {} : { y: -2 }}
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-[16px]
                  rounded-2xl border border-white/12 bg-white/[0.02] hover:bg-white/[0.04] transition text-white/92"
                                >
                                    <Play className="w-[18px] h-[18px] text-emerald-200" />
                                    <span className="relative">
                                        See it in action
                                        <span className="absolute left-0 -bottom-1 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-300" />
                                    </span>
                                </motion.a>
                            </motion.div>

                            {/* Fine print */}
                            <motion.div variants={item} className="pt-1 space-y-2">
                                <p className="text-[12.5px] text-white/45">
                                    7-day free trial. <span className="text-emerald-300/70">Cancel anytime.</span>
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/35">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/60" />
                                        Instant TradingView access
                                    </span>
                                    <span className="text-white/20">•</span>
                                    <span>Built for clean discretionary execution</span>
                                </div>
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

        .heroPill{
          transition: border-color .22s ease, background-color .22s ease, transform .22s ease, box-shadow .22s ease;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.02);
        }
        .heroPill:hover{
          border-color: rgba(16,185,129,0.28);
          background-color: rgba(255,255,255,0.05);
          box-shadow:
            0 0 0 1px rgba(16,185,129,0.10),
            0 12px 40px rgba(0,0,0,0.40);
        }

        .engineCard{
          transform: translateZ(0);
          transition: border-color .22s ease, box-shadow .22s ease, background-color .22s ease;
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

        /* Clamp engine sub to 1 line to keep hero compact */
        .engineSub{
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ✅ NEW: B:PRO shiny LETTERS + glow behind (baseline-safe) */
        .bproMark{
          position: relative;
          display: inline-block;
          vertical-align: baseline;
          line-height: inherit;
          padding: 0 0.06em; /* horizontal only */
          letter-spacing: -0.02em;
          isolation: isolate;
        }

        .bproMark::before{
          content:"";
          position:absolute;
          z-index:-1;
          inset:-0.14em -0.18em -0.12em -0.18em;
          border-radius: 0.38em;
          background:
            radial-gradient(140px 50px at 28% 45%, rgba(16,185,129,0.28), transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
          box-shadow:
            0 0 0 1px rgba(16,185,129,0.22),
            0 18px 70px rgba(0,0,0,0.38),
            0 0 46px rgba(16,185,129,0.12);
          opacity: 0.95;
        }

        .bproMarkStatic{
          color: rgba(255,255,255,0.98);
          text-shadow:
            0 0 18px rgba(16,185,129,0.22),
            0 0 44px rgba(16,185,129,0.14);
        }

        .bproMarkAnim{
          background-image:
            linear-gradient(90deg,
              #ffffff 0%,
              #f0fdfa 14%,
              #d1fae5 30%,
              #34d399 52%,
              #a7f3d0 68%,
              #ffffff 92%
            ),
            linear-gradient(90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.00) 44%,
              rgba(255,255,255,0.70) 50%,
              rgba(255,255,255,0.00) 56%,
              rgba(255,255,255,0) 100%
            );
          background-size: 260% 260%, 180% 180%;
          background-position: 0% 50%, -140% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: bproDrift 10.2s ease-in-out infinite, bproShine 6.4s ease-in-out infinite;
          filter: drop-shadow(0 0 22px rgba(16,185,129,0.18));
          will-change: background-position;
        }

        @keyframes bproDrift{
          0%   { background-position: 0% 50%, -140% 50%; }
          50%  { background-position: 100% 50%, -140% 50%; }
          100% { background-position: 0% 50%, -140% 50%; }
        }
        @keyframes bproShine{
          0%   { background-position: 0% 50%, -140% 50%; }
          62%  { background-position: 0% 50%, -140% 50%; }
          100% { background-position: 0% 50%, 240% 50%; }
        }
      `}</style>
        </motion.section>
    );
}
