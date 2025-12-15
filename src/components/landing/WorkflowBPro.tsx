import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Settings2,
  Layers,
  Grid3X3,
  SlidersHorizontal,
  Zap,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function WorkflowBPro() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const steps = useMemo(
    () => [
      {
        icon: Settings2,
        title: "1) Set your environment",
        desc: "Pick Trade Mode + Market Sentiment so the engine adapts to your timeframe and conditions.",
        bullets: [
          "Trade Mode: Short / Mid / Long",
          "Sentiment: Standard / Bullish / Bearish / Consolidation",
          "Optional: HTF 200 EMA bias filter",
        ],
        exampleTitle: "Example",
        example: "4H swing → Trade Mode: Mid • Sentiment: Standard • HTF bias ON",
        overlay: ["Trade Mode: Mid", "Sentiment: Standard", "HTF Bias: ON"],
      },
      {
        icon: Layers,
        title: "2) Read the cloud first",
        desc: "The 3-layer EMA Cloud tells you the regime: Bull / Bear / Neutral — and defines breakout rails.",
        bullets: [
          "Bull: stacked + cloud supports price",
          "Bear: stacked + cloud resists price",
          "Neutral: mixed → avoid forcing trades",
        ],
        exampleTitle: "What you’re looking for",
        example: "Cloud stacked bullish + price above upper rail = permission potential.",
        overlay: ["Regime: Bull", "Upper Rail", "Lower Rail"],
      },
      {
        icon: Grid3X3,
        title: "3) Anchor structure",
        desc: "Use pivot highs/lows as real structure. B:PRO plots last confirmed swing levels and invalidates with ATR buffer.",
        bullets: ["Dotted pivot resistance / support", "Levels invalidate with ATR buffer", "Optional HTF target levels (T1/T2)"],
        exampleTitle: "Example",
        example: "Price coils under pivot resistance while bull regime holds → watch for the break.",
        overlay: ["Pivot Resistance", "Pivot Support", "ATR Buffer"],
      },
      {
        icon: SlidersHorizontal,
        title: "4) Let filters grant permission",
        desc: "Signals don’t fire unless enabled filters agree. Filters are gates — not “extra signals.”",
        bullets: ["Volume + ADX strength", "MACD / RSI agreement", "Squeeze context (BB + KC)"],
        exampleTitle: "Example",
        example: "Squeeze + rising ADX + volume above SMA → environment turns favorable.",
        overlay: ["Filters: PASS", "ADX: Strong", "Squeeze: Release"],
      },
      {
        icon: Zap,
        title: "5) Execute the archetype",
        desc: "When structure + cloud + filters align, you get a clean entry archetype (breakout primary; others contextual).",
        bullets: ["Breakout above pivot + upper rail", "Mirror short below support + lower rail", "Optional: continuation / divergence context"],
        exampleTitle: "Example",
        example: "Breakout prints only after candle close confirms above resistance + upper cloud rail.",
        overlay: ["Entry: Breakout", "Close Confirmed", "Context: Clean"],
      },
      {
        icon: ShieldCheck,
        title: "6) Manage + grade the trade",
        desc: "B:PRO tracks trade state and prints exit reasons. S/Q scoring helps you trade selectively, not emotionally.",
        bullets: ["ATR-based stop + invalidation", "Exit reasons: flip / momentum / time", "Safety + Quality (1–3) + last-5 panel"],
        exampleTitle: "Example",
        example: "S=3 / Q=2 → strong environment, decent quality. Exit marker prints when rules say it’s over.",
        overlay: ["Stop: ATR", "Exit Reason", "S/Q: 3/2"],
      },
    ],
    []
  );

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    whileInView: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const activeStep = steps[active];

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white" id="workflow">
      {/* Connector + atmosphere */}

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header */}
        <motion.div {...enter(0, 18, 0)} className="max-w-[980px] space-y-5">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
              Workflow on TradingView
            </span>
          </div>

          <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,58px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              How to trade with B:PRO
            </span>{" "}
            <span className="text-white/80">— step by step.</span>
          </h2>

          <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[920px]">
            B:PRO is a TradingView indicator built as a decision workflow: regime → structure → permission → execution → management → review.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Step list (wider) */}
          <motion.div {...enter(-18, 10, 0.02)} className="lg:col-span-5 space-y-3">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(idx)}
                  className={`w-full text-left group rounded-[22px] p-[1px] transition ${
                    isActive ? "bg-gradient-to-b from-emerald-400/28 via-white/10 to-emerald-500/18" : "bg-white/0"
                  }`}
                >
                  <div
                    className={`rounded-[22px] border backdrop-blur-2xl px-4 py-4 transition ${
                      isActive
                        ? "border-white/12 bg-white/[0.04]"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
                          isActive ? "border-emerald-400/25 bg-emerald-400/10" : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? "text-emerald-200" : "text-emerald-300"}`} />
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-semibold tracking-tight ${isActive ? "text-white/95" : "text-white/85"}`}>
                            {s.title}
                          </div>
                          {isActive && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-emerald-200/90">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              active
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-white/60 leading-relaxed">{s.desc}</div>
                      </div>

                      <ArrowRight className={`ml-auto h-4 w-4 mt-1 transition ${isActive ? "text-emerald-200/90" : "text-white/25 group-hover:text-white/45"}`} />
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="text-xs text-white/45 pt-2">
              Tip: Signals can change until the candle closes. Treat “close confirmation” as a rule.
            </div>
          </motion.div>

          {/* Center: Visual frame */}
          <motion.div {...enter(0, 18, 0.05)} className="lg:col-span-4">
            <TabletFrame
              title="On-chart workflow view"
              subtitle="Replace with your screenshot/video later"
              overlays={activeStep.overlay}
              reduceMotion={reduceMotion}
            />
          </motion.div>

          {/* Right: Example / bullets (compact) */}
          <motion.div {...enter(18, 10, 0.08)} className="lg:col-span-3 space-y-4">
            <MiniCard>
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/45 tracking-widest uppercase">Example</div>
                <span className="inline-flex items-center gap-2 text-[11px] text-white/45">
                  <Star className="h-3.5 w-3.5 text-emerald-300/70" />
                  practical
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-white/90">{activeStep.exampleTitle}</div>
              <div className="mt-2 text-sm text-white/65 leading-relaxed">{activeStep.example}</div>
            </MiniCard>

            <MiniCard>
              <div className="text-xs text-white/45 tracking-widest uppercase">Checklist</div>
              <div className="mt-3 space-y-2">
                {activeStep.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-emerald-300/80 mt-0.5">✓</span>
                    <span className="leading-tight">{b}</span>
                  </div>
                ))}
              </div>
            </MiniCard>

            <MiniCard>
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/45 tracking-widest uppercase">Reminder</div>
                <span className="inline-flex items-center gap-2 text-[11px] text-white/45">
                  <Clock className="h-3.5 w-3.5" />
                  candle close
                </span>
              </div>
              <div className="mt-2 text-sm text-white/65 leading-relaxed">
                Use B:PRO as a framework, not financial advice. Confirm with your own risk rules and testing.
              </div>
            </MiniCard>
          </motion.div>
        </div>

        {/* Bottom: quick legend (tiny) */}
        <motion.div {...enter(0, 14, 0.08)} className="mt-10 flex flex-wrap gap-2 text-[11px] text-white/45">
          {["Cloud Regime", "Pivot Structure", "Filter Gates", "Breakout Confirm", "ATR Stop", "Exit Reason", "S/Q Score"].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] tracking-widest uppercase">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- UI atoms ---------------- */

function MiniCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] p-[1px] bg-gradient-to-b from-emerald-400/14 via-white/10 to-emerald-500/10">
      <div className="rounded-[22px] border border-white/10 bg-[#070707]/70 backdrop-blur-2xl p-4">{children}</div>
    </div>
  );
}

function TabletFrame({
  title,
  subtitle,
  overlays,
  reduceMotion,
}: {
  title: string;
  subtitle: string;
  overlays: string[];
  reduceMotion: boolean;
}) {
  return (
    <div className="rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/26 via-white/10 to-emerald-500/16 shadow-[0_0_70px_rgba(16,185,129,0.10)]">
      <div className="relative rounded-[30px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
        {/* subtle aurora */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_60%)]"
          animate={reduceMotion ? {} : { opacity: [0.12, 0.24, 0.12], scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />

        {/* header bar */}
        <div className="relative z-10 px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white/85">{title}</div>
            <div className="text-xs text-white/45 mt-1">{subtitle}</div>
          </div>
          <div className="text-[11px] text-white/45 tracking-widest uppercase">preview</div>
        </div>

        {/* content */}
        <div className="relative h-[420px] sm:h-[460px] lg:h-[520px] bg-white/[0.02]">
          {/* Placeholder for screenshot/video */}
          {/* Replace with:
              <img src={...} alt="B:PRO workflow" className="absolute inset-0 w-full h-full object-cover" />
              or a <video ... />
          */}
          <div className="absolute inset-0 opacity-[0.10]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          {/* Animated “chart doodle” */}
          <motion.svg
            viewBox="0 0 600 240"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full opacity-90"
          >
            <defs>
              <linearGradient id="wfLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.45" />
              </linearGradient>
              <filter id="wfGlow">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              filter="url(#wfGlow)"
              fill="none"
              stroke="url(#wfLine)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.15, 1] }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 1.2, ease: "easeInOut" }}
              d="M0,160 C80,130 120,185 190,150 C250,118 290,95 345,120 C395,142 440,80 495,102 C545,125 570,92 600,105"
            />
          </motion.svg>

          {/* overlays */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {overlays.slice(0, 2).map((t) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: easePremium }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] text-white/70 tracking-widest uppercase w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/70" />
                  {t}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="absolute right-4 top-4 flex flex-col gap-2 items-end">
            <AnimatePresence mode="popLayout">
              {overlays.slice(2, 3).map((t) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: easePremium }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 backdrop-blur-md text-[11px] text-emerald-100 tracking-widest uppercase w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200/80" />
                  {t}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* bottom hint */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3 text-sm text-white/65">
              Replace this canvas with a screenshot/video of B:PRO showing cloud, structure, filters, and S/Q labels.
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
          <div className="absolute inset-0 ring-1 ring-white/10" />
        </div>
      </div>
    </div>
  );
}
