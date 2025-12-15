import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ShieldCheck,
  SlidersHorizontal,
  Activity,
  Target,
  BadgeCheck,
} from "lucide-react";

const easePremium = [0.16, 1, 0.3, 1];

export default function WhyBuyBPro() {
  const reduceMotion = useReducedMotion();

  const reasons = useMemo(
    () => [
      {
        icon: Brain,
        title: "Not more signals — better decisions",
        desc: "B:PRO is a TradingView decision engine: it compresses pro-level thinking into the chart so you stop guessing.",
      },
      {
        icon: Activity,
        title: "Regime-aware (trend vs chop)",
        desc: "It knows when the market is trash — and helps you avoid the #1 reason traders bleed: trading during chop.",
      },
      {
        icon: SlidersHorizontal,
        title: "Permission before execution",
        desc: "First: should you even trade here? Then: is this setup valid? Then: how good is it? That’s the pro workflow — automated.",
      },
      {
        icon: Target,
        title: "Trade management after entry",
        desc: "Invalidation, structure loss, momentum death, time expiry — B:PRO keeps an objective opinion so you’re not stuck asking “should I close?”",
      },
      {
        icon: ShieldCheck,
        title: "Safety + Quality scoring",
        desc: "You don’t just get win/loss — you get a grade. That trains selectivity and kills overtrading at the source.",
      },
    ],
    []
  );

  const pain = useMemo(
    () => [
      "Trading during chop",
      "Taking every arrow",
      "Staying in dead trades",
      "Not knowing which setups to skip",
      "Reacting without a framework",
    ],
    []
  );

  const whoFor = useMemo(
    () => [
      "Trend / breakout traders",
      "Swing moves + intraday trend riders",
      "People who want fewer trades, not more",
      "Traders who already know some TA but want structure",
    ],
    []
  );

  const whoNot = useMemo(
    () => ["Pure scalpers", "20-signals-a-day dopamine chasers", "Indicator collectors", "Zero-thinking buyers"],
    []
  );

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: 18 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white" id="why-buy">
      {/* soft connector aura */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-0 right-0 h-44 bg-gradient-to-b from-black/90 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_10%,rgba(16,185,129,0.11),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header */}
        <motion.div {...enter(1)} className="max-w-[980px] space-y-5">
          <Kicker>Why buy B:PRO</Kicker>

          <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,58px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Because most indicators answer “enter?”
            </span>{" "}
            <span className="text-white/90">B:PRO answers “should I even be here?”</span>
          </h2>

          <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[920px]">
            B:PRO is a <span className="text-white/85 font-semibold">TradingView indicator</span> — but it’s not “signals”.
            It’s a structured decision framework that tells you when trading makes sense, when it doesn’t, how good a setup
            actually is, and when a trade is objectively over.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Problem -> Solution */}
          <motion.div {...enter(1, 0.04)} className="lg:col-span-5 space-y-5">
            <Card>
              <div className="flex items-start gap-3">
                <IconBox tone="emerald">
                  <BadgeCheck className="w-5 h-5 text-emerald-300" />
                </IconBox>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">The real problem</div>
                  <div className="mt-1 text-white/70 leading-relaxed">
                    <span className="text-white/85 font-semibold">“I kind of know what to do… but I don’t trust my decisions.”</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pain.map((t) => (
                  <MiniPill key={t}>{t}</MiniPill>
                ))}
              </div>

              <div className="mt-4 text-sm text-white/65 leading-relaxed">
                B:PRO exists to stop bad participation — the stuff that quietly drains accounts: chop, weak setups,
                and staying too long in trades that are already dead.
              </div>
            </Card>

            <Card className="relative overflow-hidden">
              <div aria-hidden className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/16 blur-[90px]" />
              <div className="flex items-start gap-3">
                <IconBox tone="neutral">
                  <Sparkles className="w-5 h-5 text-white/80" />
                </IconBox>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">The one-sentence answer</div>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    <span className="text-white/85 font-semibold">B:PRO is a trading decision engine</span> that tells you{" "}
                    <span className="text-white/85">when to trade</span>, <span className="text-white/85">when not to trade</span>,
                    <span className="text-white/85"> how good a setup really is</span>, and{" "}
                    <span className="text-white/85">when a trade is objectively dead</span> — all directly on the chart.
                  </p>

                  <div className="mt-3 text-xs text-white/45">
                    Marketing version: <span className="text-emerald-300/80">Not more signals — better decisions.</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* RIGHT: Differentiators grid */}
          <motion.div {...enter(1, 0.08)} className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, delay: 0.06 + i * 0.06, ease: easePremium }}
                >
                  <ReasonCard {...r} />
                </motion.div>
              ))}
            </div>

            {/* Who it's for */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="text-sm font-semibold text-white/90">Built for</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {whoFor.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-emerald-300/80">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <div className="text-sm font-semibold text-white/90">Not for</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {whoNot.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-white/35">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-white/45">
                  That’s a feature — B:PRO is designed for clarity, not dopamine.
                </div>
              </Card>
            </div>

            {/* Leave room for a supporting screenshot if you want */}
            <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12">
              <div className="rounded-[28px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/85">Optional screenshot</div>
                  <div className="text-[11px] text-white/45 tracking-widest uppercase">placeholder</div>
                </div>
                <div className="relative h-[240px] sm:h-[280px] bg-white/[0.02]">
                  {/* Replace with your screenshot */}
                  {/* <img src={...} alt="B:PRO decision engine on-chart" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <div className="absolute inset-0 opacity-[0.10]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:64px_64px]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div className="max-w-md">
                      <div className="text-white/80 font-semibold">Drop a proof screenshot here</div>
                      <div className="mt-2 text-sm text-white/55 leading-relaxed">
                        Show regime + S/Q grading + trade lifecycle on the chart. Keep it clean.
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 ring-1 ring-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- atoms ---------------- */

function Kicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
      <Sparkles className="w-4 h-4 text-emerald-300" />
      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">{children}</span>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/16 via-white/10 to-emerald-500/10 ${className}`}>
      <div className="rounded-[26px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl p-6">
        {children}
      </div>
    </div>
  );
}

function IconBox({ children, tone = "neutral" }) {
  const toneMap = {
    neutral: "bg-white/[0.03] border-white/10",
    emerald: "bg-emerald-400/10 border-emerald-400/20",
  };
  return (
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${toneMap[tone] || toneMap.neutral}`}>
      {children}
    </span>
  );
}

function MiniPill({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
      {children}
    </div>
  );
}

function ReasonCard({ icon: Icon, title, desc }) {
  return (
    <div
      className="h-full rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <div className="h-full rounded-[26px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Icon className="h-5 w-5 text-emerald-300" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white/90 leading-tight">{title}</div>
            <p className="mt-2 text-sm text-white/65 leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
