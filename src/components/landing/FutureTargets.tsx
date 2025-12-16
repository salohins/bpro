import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Target, Shield, Layers, ArrowRight } from "lucide-react";

import futureTargetsImg from "../../assets/future-target-lines.png";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function FutureTargets() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  return (
    <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
      {/* ✅ no overflow-hidden so glow can “bleed” into neighbors */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-28 -bottom-28 bg-[radial-gradient(circle_at_60%_15%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      {/* match your global section width */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT — copy */}
          <motion.div {...enter(1, 0.05)} className="lg:col-span-7">
            <div className="rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14 shadow-[0_0_70px_rgba(16,185,129,0.10)]">
              <div className="relative rounded-[30px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
                {/* header bar */}
                <div className="relative z-10 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/85">T1 / T2 in-action</div>
                  <div className="text-[11px] text-white/45 tracking-widest uppercase">screenshot</div>
                </div>

                <div className="relative h-[300px] sm:h-[380px] lg:h-[460px]">
                  <img
                    src={futureTargetsImg}
                    alt="Example showing T1/T2 target EMA lines as dynamic support and resistance"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                    loading="eager"
                  />

                  {/* grading + aura */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.20),transparent_55%)]" />

                  {/* grain */}
                  <div
                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.30'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* tags */}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <TagChip>T1 / T2 rails</TagChip>
                    <TagChip tone="emerald">EMA-based targets</TagChip>
                  </div>

                  {/* bottom caption */}
                  <div className="absolute left-5 right-5 bottom-5">
                    <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                      <div className="text-sm font-semibold text-white/90 leading-tight">How to read it</div>
                      <div className="mt-1 text-sm text-white/65 leading-relaxed">
                        Watch <span className="text-white/80">rejection / acceptance</span> at T1 and T2.
                        Acceptance = continuation. Rejection = weakness / potential reversal pressure.
                      </div>
                    </Glass>
                  </div>

                  {/* sheen */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.07 }}
                  />

                  <div className="absolute inset-0 ring-1 ring-white/10" />
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/45 max-w-3xl">
              Tip: keep screenshots clean (minimal indicators) so T1/T2 stand out instantly.
            </div>
          </motion.div>
          <motion.div {...enter(1)} className="lg:col-span-5 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                  Market Structure Engine
                </span>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[11px] tracking-[0.18em] uppercase text-white/55">
                <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                T1 / T2 Rails
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Future Target Lines
              </span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              After a breakout, price often interacts with <span className="text-white/85 font-semibold">T1</span>{" "}
              first, then <span className="text-white/85 font-semibold">T2</span>. These adaptive EMA rails act as
              forward structure — giving you clean reaction zones for partials, continuation, or failure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Chip icon={<Target className="w-4 h-4 text-emerald-200/90" />} title="T1 reaction" desc="first touch zone" />
              <Chip icon={<Shield className="w-4 h-4 text-emerald-200/90" />} title="T2 decision" desc="continue or fail" />
              <Chip tone="emerald" title="EMA-based rails" desc="dynamic, not static" />
              <Chip title="Cleaner exits" desc="less guessing" />
            </div>

            <div className="pt-1 text-xs text-white/45 max-w-xl flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
              Correlation: breakouts trigger → rails manage the move → exits become objective.
            </div>
          </motion.div>

          {/* RIGHT — cinematic image */}
          
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny atoms (self-contained) ---------- */

function Glass({ className = "", children }: any) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function TagChip({ children, tone = "neutral" }: any) {
  const tones =
    tone === "emerald"
      ? "text-emerald-100 border-emerald-400/20 bg-emerald-400/10"
      : "text-white/85 border-white/10 bg-black/30";
  return (
    <span className={`text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-md ${tones}`}>
      {children}
    </span>
  );
}

function Chip({ icon, title, desc, tone = "neutral" }: any) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md";
  const toneCls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10"
      : "border-white/10 bg-white/[0.03]";
  return (
    <div className={`${base} ${toneCls}`} style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        {icon ? icon : <span className="w-2 h-2 rounded-full bg-emerald-300/70" />}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white/85 leading-tight">{title}</div>
        <div className="text-sm text-white/55 leading-tight">{desc}</div>
      </div>
    </div>
  );
}
