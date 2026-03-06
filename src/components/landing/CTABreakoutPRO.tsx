import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, SlidersHorizontal, ShieldCheck, Brain } from "lucide-react";
import bproScreenshot from "../../assets/ft-5.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function CTABreakoutPro() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const signals = useMemo(
    () => [
      { type: "Cross Up", s: "2/3", q: "1/3" },
      { type: "Close Short", s: "2/3", q: "1/3" },
      { type: "Open Short", s: "2/3", q: "1/3" },
      { type: "Cross Down", s: "3/3", q: "2/3" },
      { type: "Open Short", s: "3/3", q: "2/3" },
    ],
    []
  );

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.1 },
  });

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* animated aurora */}
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] pb-20 px-6 sm:px-10 lg:px-16 2xl:px-20">
        <motion.div {...enter(0, 18, 0)} className="text-center max-w-[980px] mx-auto mb-10 md:mb-12">
          <h2 className="mt-5 font-semibold tracking-[-0.045em] leading-[1.02] text-[clamp(34px,3.1vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Stop Guessing. <br /> Trade with Structure.
            </span>
          </h2>

          <p className="mt-4 text-white/65 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
            A <span className="text-white/85 font-semibold">TradingView indicator</span> built like a{" "}
            <span className="text-white/85 font-semibold">decision engine</span>.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-[1120px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-10 lg:gap-6 xl:gap-8">
              {/* RIGHT (content) */}
              <motion.div {...enter(16, 10, 0.03)} className="order-1 lg:order-2 lg:w-[600px] lg:max-w-[600px]">
                <div className="lg:-translate-y-6 relative">
                  <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03]">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-emerald-200 text-xs tracking-[0.22em] font-semibold uppercase">Try 7 days free</span>
                  </div>

                  <div className="mt-5 text-[clamp(34px,8vw,44px)] lg:text-5xl sm:text-4xl font-extrabold tracking-tight text-white/92 leading-[1.05]">
                    Trade with a system.
                  </div>

                  <p className="mt-3 text-white/60 leading-relaxed">
                    Breakout PRO reduces noise and forces alignment - so you take cleaner trades and manage them with confidence.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Structure first", text: "Trend Cloud + HTF structure so you always know the regime.", icon: Layers, meta: "Regime map" },
                      { title: "Permission gating", text: "Confluence + sentiment filters so you only trade what fits.", icon: SlidersHorizontal, meta: "9-layer filter" },
                      { title: "Decision grading", text: "Safety & Quality scoring so you stay selective under pressure.", icon: Brain, meta: "S/Q score" },
                      { title: "Lifecycle management", text: "ATR + invalidation logic for risk and exits from open to close.", icon: ShieldCheck, meta: "Risk engine" },
                    ].map((c) => {
                      const Icon = c.icon;

                      return (
                        <motion.div
                          key={c.title}
                          whileHover={reduceMotion ? {} : { y: -2 }}
                          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: easePremium }}
                          className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition overflow-hidden"
                          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
                        >
                          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent opacity-70" />

                          <div
                            aria-hidden
                            className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-emerald-400/14 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />

                          <div className="relative p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                                <Icon className="h-5 w-5 text-emerald-300" />
                              </div>

                              <span className="shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-black/20 text-[10px] tracking-widest uppercase text-white/60">
                                {c.meta}
                              </span>
                            </div>

                            <div className="mt-4">
                              <div className="text-sm font-semibold text-white/90 tracking-tight">{c.title}</div>
                              <div className="mt-1.5 text-sm text-white/60 leading-relaxed">{c.text}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={
                        reduceMotion
                          ? {}
                          : { scale: 1.03, backgroundPosition: "right center", boxShadow: "0 0 70px rgba(16,185,129,0.62)" }
                      }
                      whileTap={{ scale: 0.985 }}
                      onClick={() => navigate("/subscribe")}
                      className="group relative inline-flex flex-1 items-center justify-center gap-3 px-7 py-4 text-base font-semibold rounded-2xl
                        bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:240%_auto]
                        text-black shadow-[0_0_28px_rgba(16,185,129,0.24)] border border-emerald-300/30 transition-all duration-500 overflow-hidden"
                    >
                      {!reduceMotion && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 opacity-55"
                          style={{
                            background: "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.40) 40%, transparent 80%)",
                            transform: "translateX(-70%)",
                          }}
                          animate={{ transform: ["translateX(-70%)", "translateX(70%)"] }}
                          transition={{ duration: 2.25, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      Start free trial
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                    </motion.button>
                  </div>

                  <div className="mt-4 text-xs text-white/45">No commitments • Works on any market • Any timeframe</div>
                </div>
              </motion.div>

              {/* LEFT — phone */}
              <motion.div {...enter(-16, 10, 0.02)} className="hidden lg:block order-2 lg:order-1 lg:shrink-0">
                <div className="relative w-[280px] xl:w-[320px] 2xl:w-[360px] max-w-[32vw] aspect-[10/19.5] rounded-[42px] xl:rounded-[48px] 2xl:rounded-[56px] bg-[#0a0a0a] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden">
                  <div className="absolute inset-0 rounded-[inherit] overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_40%,rgba(255,255,255,0.06))] opacity-60"
                    />

                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.9] motion-safe:animate-[shine_3.8s_ease-in-out_infinite] motion-reduce:hidden"
                      style={{
                        background: "radial-gradient( rgba(255, 255, 255, 0.2) 40%, transparent 80%)",
                      }}
                    />

                    <div aria-hidden className="absolute -left-[3px] top-[26%] z-30 h-8 xl:h-10 w-[3px] rounded-full bg-white/15" />
                    <div aria-hidden className="absolute -left-[3px] top-[36%] z-30 h-12 xl:h-16 w-[3px] rounded-full bg-white/15" />
                    <div aria-hidden className="absolute -right-[3px] top-[32%] z-30 h-14 xl:h-20 w-[3px] rounded-full bg-white/15" />

                    {/* SCREEN */}
                    <div className="absolute inset-[8px] xl:inset-[10px] rounded-[34px] xl:rounded-[40px] 2xl:rounded-[46px] overflow-hidden bg-[#050505] border border-white/10">
                      <motion.img
                        src={bproScreenshot}
                        alt="Breakout PRO screenshot"
                        className="absolute top-0 h-full max-w-none object-cover"
                        style={{
                          width: "auto",
                        }}
                        loading="lazy"
                        decoding="async"
                        animate={
                          reduceMotion
                            ? {}
                            : {
                                x: ["-22%", "-50%", "-22%"],
                              }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0.01 }
                            : {
                                duration: 14,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                        }
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.06),transparent_60%)]" />

                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-20 opacity-[0.18] motion-safe:animate-[shine_3.8s_ease-in-out_infinite] motion-reduce:hidden mix-blend-overlay"
                      >
                        <div
                          className="absolute -left-1/2 top-0 h-full w-[200%]"
                          style={{
                            background: "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.70) 42%, transparent 75%)",
                          }}
                        />
                      </div>

                      {!reduceMotion && (
                        <motion.div
                          aria-hidden
                          className="absolute inset-0"
                          animate={{ opacity: [0.0, 0.08, 0.0] }}
                          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            background: "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.14), transparent 48%)",
                          }}
                        />
                      )}

                      <div className="absolute left-1/2 -translate-x-1/2 top-[8px] h-[22px] xl:h-[26px] 2xl:h-[28px] w-[120px] xl:w-[150px] 2xl:w-[180px] rounded-full bg-black/80 border border-white/10" />

                      <div className="relative pt-10 xl:pt-12 2xl:pt-14 px-4 xl:px-5 2xl:px-6 pb-4 xl:pb-5 h-full flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 xl:gap-3">
                            <img src="/bpro_logo.svg" alt="Breakout PRO" className="h-6 xl:h-7 2xl:h-8 object-contain" />
                            <span className="text-[9px] xl:text-[10px] text-white/45 tracking-widest uppercase">Decision Suite</span>
                          </div>

                          <span className="inline-flex items-center px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-100 text-[9px] xl:text-[10px] tracking-widest uppercase">
                            Live
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 xl:bottom-5 xl:left-5 2xl:left-6">
                          <div className="w-[112px] xl:w-[126px] 2xl:w-[142px] rounded-[12px] border border-white/10 bg-black/55 backdrop-blur-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
                            <div className="px-2 pt-2 pb-1">
                              <div className="text-[6px] xl:text-[7px] font-semibold tracking-[0.18em] uppercase text-white/80">
                                Last 5 Trade Signals
                              </div>
                            </div>

                            <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            <div className="px-2 py-1">
                              <div className="grid grid-cols-[1fr_20px_20px] xl:grid-cols-[1fr_22px_22px] gap-1 text-[6px] xl:text-[7px] tracking-[0.16em] uppercase text-white/40">
                                <div>Type</div>
                                <div className="text-right">S</div>
                                <div className="text-right">Q</div>
                              </div>
                            </div>

                            <div className="divide-y divide-white/8">
                              {signals.map((r, idx) => (
                                <div key={idx} className="px-2 py-1">
                                  <div className="grid grid-cols-[1fr_20px_20px] xl:grid-cols-[1fr_22px_22px] gap-1 text-[7px] xl:text-[8px] text-white/78 leading-tight">
                                    <div className="truncate">{r.type}</div>
                                    <div className="text-right tabular-nums text-white/70">{r.s}</div>
                                    <div className="text-right tabular-nums text-white/70">{r.q}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div aria-hidden className="mt-auto mx-auto h-1.5 w-20 xl:w-24 rounded-full bg-white/15" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <style>{`
              @keyframes shine {
                0% { transform: translateX(-60%); }
                50% { transform: translateX(60%); }
                100% { transform: translateX(-60%); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}