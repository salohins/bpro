import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Layers,
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function CTABreakoutPro() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const features = useMemo(
    () => [
      { icon: <Layers className="w-4 h-4 text-emerald-300" />, text: "Trend Cloud + HTF structure" },
      { icon: <SlidersHorizontal className="w-4 h-4 text-emerald-300" />, text: "Confluence filters + sentiment" },
      { icon: <ShieldCheck className="w-4 h-4 text-emerald-300" />, text: "Trade management + S/Q scoring" },
    ],
    []
  );

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    whileInView: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.3 },
  });

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden bg-[#050505] text-white">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(16,185,129,0.10),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header */}
        <motion.div {...enter(0, 18, 0)} className="text-center max-w-[900px] mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">B:PRO</span>
          </div>

          <h2 className="mt-5 font-semibold tracking-[-0.045em] leading-[1.02] text-[clamp(34px,3.1vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Everything you need — nothing you don’t.
            </span>
          </h2>

          <p className="mt-4 text-white/65 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
            A <span className="text-white/85 font-semibold">TradingView indicator</span> built like a{" "}
            <span className="text-white/85 font-semibold">decision engine</span>.
          </p>
        </motion.div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: tagline */}
          <motion.div {...enter(-18, 10, 0.02)} className="lg:col-span-4">
            <div className="h-full rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/14 via-white/10 to-emerald-500/10">
              <div className="h-full rounded-[28px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl p-6">
                <div className="text-xs text-white/45 tracking-widest uppercase">Tagline</div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight text-white/90 leading-tight">
                  Not more signals.
                  <br />
                  Better decisions.
                </div>
                <div className="mt-3 text-white/60 leading-relaxed">
                  Built to reduce chop trading, overtrading, and “should I close?” moments.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center: offer */}
          <motion.div {...enter(0, 18, 0.04)} className="lg:col-span-4">
            <div className="relative h-full rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/18 shadow-[0_0_70px_rgba(16,185,129,0.12)]">
              <div className="relative h-full rounded-[30px] overflow-hidden bg-gradient-to-b from-[#0b0b0b]/90 to-[#070707]/95 border border-white/10 backdrop-blur-2xl">
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_60%)]"
                  animate={reduceMotion ? {} : { opacity: [0.12, 0.26, 0.12], scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                />

                <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      <span className="text-emerald-200 text-xs tracking-[0.22em] font-semibold uppercase">
                        Try 7 days free
                      </span>
                    </div>

                    <div className="mt-4 text-3xl font-extrabold tracking-tight text-white/90 leading-tight">
                      Start trading with clarity.
                    </div>
                    <p className="mt-2 text-white/60 leading-relaxed">
                      Instant TradingView access. Cancel anytime.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <motion.button
                      whileHover={
                        reduceMotion
                          ? {}
                          : { scale: 1.02, backgroundPosition: "right center", boxShadow: "0 0 55px rgba(16,185,129,0.55)" }
                      }
                      whileTap={{ scale: 0.985 }}
                      onClick={() => navigate("/subscribe")}
                      className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-2xl
                        bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto]
                        text-black shadow-[0_0_28px_rgba(16,185,129,0.24)] border border-emerald-300/30 transition-all duration-500"
                    >
                      Start free trial
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                    </motion.button>

                    <motion.a
                      href="#demo"
                      whileHover={reduceMotion ? {} : { y: -2 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                        border border-white/12 bg-white/[0.02] hover:bg-white/[0.04] transition text-white/90"
                    >
                      <PlayCircle className="w-5 h-5 text-emerald-200" />
                      See it in action
                    </motion.a>

                    <div className="text-xs text-white/45 text-center">
                      No commitments • Works on any market
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
              </div>
            </div>
          </motion.div>

          {/* Right: 3 bullets */}
          <motion.div {...enter(18, 10, 0.02)} className="lg:col-span-4">
            <div className="h-full rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/14 via-white/10 to-emerald-500/10">
              <div className="h-full rounded-[28px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl p-6">
                <div className="text-xs text-white/45 tracking-widest uppercase">What you get</div>
                <div className="mt-4 space-y-3">
                  {features.map((f) => (
                    <div key={f.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        {f.icon}
                      </span>
                      <div className="text-sm text-white/70 leading-tight">{f.text}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-white/45">
                  “B:PRO isn’t an indicator. It’s a trading decision engine.”
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
