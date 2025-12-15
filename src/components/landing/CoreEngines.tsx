import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Map,
  SlidersHorizontal,
  Target,
  ShieldCheck,
  Brain,
} from "lucide-react";

/**
 * Core Engines section
 * - Center: phone/tablet frame screenshot placeholder
 * - Sides: 5 engines (short + catchy)
 * - Animations: left fades from left, right fades from right, center zooms in
 *
 * Replace the <img /> inside DeviceFrame with your screenshot.
 */

const easePremium = [0.16, 1, 0.3, 1];

export default function CoreEngines() {
  const reduceMotion = useReducedMotion();

  const engines = useMemo(
    () => [
      {
        side: "left",
        icon: Map,
        title: "Market Structure Engine",
        tagline: "Where are we — and what regime is this?",
        points: ["Adaptive Cloud + regime", "HTF alignment + levels", "T1/T2 future rails"],
        footer: "Builds a live structural map: trend, regime, targets.",
      },
      {
        side: "left",
        icon: SlidersHorizontal,
        title: "Confluence & Sentiment",
        tagline: "Is the environment favorable?",
        points: ["9-layer permission gates", "Volume · momentum · volatility", "Bull/Bear/Range strictness"],
        footer: "Adapts strictness by sentiment — no curve fitting.",
      },
      {
        side: "center",
        icon: Target,
        title: "Signal & Execution Engine",
        tagline: "When do we act?",
        points: ["Breakouts first", "Divergences second", "Continuations as context"],
        footer: "One engine. Multiple entry archetypes. Zero noise.",
      },
      {
        side: "right",
        icon: ShieldCheck,
        title: "Trade Lifecycle & Risk",
        tagline: "Managed from birth to exit.",
        points: ["ATR stops + invalidation", "Structural + momentum exits", "State machine: Active → Closed"],
        footer: "Not just arrows — full trade management.",
      },
      {
        side: "right",
        icon: Brain,
        title: "Decision Intelligence",
        tagline: "How good is this setup?",
        points: ["Safety score (risk)", "Quality score (edge)", "Last signals panel (selectivity)"],
        footer: "Grades setups so you trade selectively, not emotionally.",
      },
    ],
    []
  );

  const enterSide = (dir = "left", d = 0) => ({
    initial: {
      opacity: 0,
      x: reduceMotion ? 0 : dir === "left" ? -28 : 28,
      y: 10,
      filter: "blur(10px)",
    },
    whileInView: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const enterCenter = {
    initial: { opacity: 0, scale: reduceMotion ? 1 : 0.94, y: 18, filter: "blur(12px)" },
    whileInView: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.95, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  };

  const left = engines.filter((e) => e.side === "left");
  const right = engines.filter((e) => e.side === "right");
  const center = engines.find((e) => e.side === "center");

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white" id="core-engines">

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }}
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-[980px] space-y-5"
        >
          <Kicker>Core Engines</Kicker>
          <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Five engines. One decision framework.
            </span>
          </h2>
          <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[920px]">
            B:PRO is built like a system — structure → confluence → execution → management → grading.
            Everything stays on-chart, so you see the “why” instantly.
          </p>
        </motion.div>

        {/* layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT stack */}
          <div className="lg:col-span-4 space-y-4">
            {left.map((e, idx) => (
              <motion.div key={e.title} {...enterSide("left", idx * 0.06)}>
                <EngineCard {...e} />
              </motion.div>
            ))}
          </div>

          {/* CENTER device */}
          <motion.div {...enterCenter} className="lg:col-span-4">
            <DeviceFrame
              title={center.title}
              subtitle={center.tagline}
              bullets={center.points}
              footer={center.footer}
            />
          </motion.div>

          {/* RIGHT stack */}
          <div className="lg:col-span-4 space-y-4">
            {right.map((e, idx) => (
              <motion.div key={e.title} {...enterSide("right", idx * 0.06)}>
                <EngineCard {...e} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI atoms ---------------- */

function Kicker({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
      <Sparkles className="w-4 h-4 text-emerald-300" />
      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
        {children}
      </span>
    </div>
  );
}

function EngineCard({ icon: Icon, title, tagline, points, footer }) {
  return (
    <div
      className="rounded-[24px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <div className="rounded-[24px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Icon className="h-5 w-5 text-emerald-300" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white/90 leading-tight">{title}</div>
            <div className="mt-1 text-sm text-white/65 leading-tight">{tagline}</div>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-emerald-300/80">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-xs text-white/45">{footer}</div>
      </div>
    </div>
  );
}

function DeviceFrame({ title, subtitle, bullets, footer }) {
  return (
    <div className="relative">
      {/* outer glow */}
      <div aria-hidden className="absolute -inset-6 bg-emerald-500/10 blur-[80px] rounded-full" />

      <div className="rounded-[34px] p-[1px] bg-gradient-to-b from-emerald-400/28 via-white/10 to-emerald-500/18 shadow-[0_0_70px_rgba(16,185,129,0.12)]">
        <div className="rounded-[34px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
          {/* fake device top bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="text-[11px] text-white/45 tracking-widest uppercase">
              on-chart preview
            </div>
          </div>

          {/* screenshot area */}
          <div className="relative p-6 md:p-7">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] h-[320px] sm:h-[380px] lg:h-[440px]">
              {/* Replace this with your real screenshot */}
              {/* <img src={yourScreenshot} alt="B:PRO chart preview" className="absolute inset-0 w-full h-full object-cover" /> */}

              <div className="absolute inset-0 opacity-[0.10]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:64px_64px]" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
              <div className="absolute inset-0 ring-1 ring-white/10" />

              {/* overlay callout (kept short, non-cluttered) */}
              <div className="absolute left-5 right-5 bottom-5">
                <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-4 py-3">
                  <div className="text-sm font-semibold text-white/90">{title}</div>
                  <div className="mt-1 text-sm text-white/65">{subtitle}</div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {bullets.map((b) => (
                      <div
                        key={b}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/70"
                      >
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-white/45">{footer}</div>
                </div>
              </div>
            </div>

            {/* subtle caption */}
            <div className="mt-4 text-xs text-white/45">
              Drop a clean chart screenshot here. Keep labels minimal — the side cards do the explaining.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
