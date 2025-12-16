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

import bproScreenshot from "../../assets/bpro.png"; // ✅ added screenshot

/**
 * Core Engines section
 * - Center device becomes BIG + ABSOLUTE (lg+) behind left/right stacks
 * - Centered inside the relative layout container
 * - Mobile keeps normal flow (left -> device -> right)
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
    <section
      className="relative w-full py-24 md:py-28 bg-transparent text-white"
      id="core-engines"
    >
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }}
          viewport={{ once: false, amount: 0.35 }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
            {/* LEFT: headline */}
            <div className="max-w-[920px]">
              <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,56px)] pb-0 mb-0">
                <span className="block bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                  Five engines.
                </span>
                <span className="block bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                  One decision framework.
                </span>
              </h2>
            </div>

            {/* RIGHT: subheading pinned to far right */}
            <div className="lg:ml-auto lg:max-w-[520px] t lg:pt-2">
              <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
                B:PRO is built like a system — structure → confluence → execution → management → grading.
                Everything stays on-chart, so you see the “why” instantly.
              </p>
            </div>
          </div>
        </motion.div>

        {/* layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center overflow-visible lg:min-h-[700px]">
          {/* ABSOLUTE CENTER DEVICE (lg+) behind everything */}
          <motion.div
            {...enterCenter}
            className=" lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[min(900px,92vw)] pointer-events-none"
          >
            <div className="pointer-events-none">
              <DeviceFrame
                title={center.title}
                subtitle={center.tagline}
                bullets={center.points}
                footer={center.footer}
                size="xl"
              />
            </div>
          </motion.div>

          {/* LEFT stack (above device) */}
          <div className="lg:col-span-4 space-y-4 relative z-20">
            {left.map((e, idx) => (
              <motion.div key={e.title} {...enterSide("left", idx * 0.06)}>
                <EngineCard {...e} />
              </motion.div>
            ))}
          </div>

          {/* CENTER device in normal flow for mobile only */}
          <motion.div {...enterCenter} className="lg:hidden relative z-10">
            <DeviceFrame
              title={center.title}
              subtitle={center.tagline}
              bullets={center.points}
              footer={center.footer}
              size="md"
            />
          </motion.div>

          {/* spacer column for lg grid symmetry (keeps right stack in place) */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* RIGHT stack (above device) */}
          <div className="lg:col-span-4 space-y-4 relative z-20">
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

/**
 * size:
 * - "md" = mobile/in-flow sizes
 * - "xl" = big absolute behind stacks on lg+
 */
function DeviceFrame({ title, subtitle, bullets, footer, size = "md" }) {
  const isXL = size === "xl";

  return (
    <div className="relative">
      {/* outer glow */}
      <div
        aria-hidden
        className={[
          "absolute rounded-full",
          isXL ? "-inset-16 bg-emerald-500/12 blur-[110px]" : "-inset-6 bg-emerald-500/10 blur-[80px]",
        ].join(" ")}
      />

      <div
        className={[
          "rounded-[34px] p-[1px] bg-gradient-to-b from-emerald-400/28 via-white/10 to-emerald-500/18",
          isXL ? "shadow-[0_0_120px_rgba(16,185,129,0.16)]" : "shadow-[0_0_70px_rgba(16,185,129,0.12)]",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-[34px] bg-[#070707]/70 border border-white/10 backdrop-blur-2xl",
            isXL ? "ring-1 ring-white/[0.06]" : "",
          ].join(" ")}
        >
          {/* fake device top bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="text-[11px] text-white/45 tracking-widest">TradingView</div>
          </div>

          {/* screenshot area */}
          <div className={["relative", isXL ? "p-7 md:p-8" : "p-6 md:p-7"].join(" ")}>
            <div
              className={[
                "relative rounded-3xl border border-white/10 ",
                isXL ? "h-[420px] xl:h-[480px] 2xl:h-[520px]" : "h-[320px] sm:h-[380px] lg:h-[440px]",
              ].join(" ")}
            >
              {/* Replace this with your real screenshot */}
              {/* ✅ cinematic screenshot */}
              <img
                src={bproScreenshot}
                alt="B:PRO chart preview"
                className="absolute rounded-3xl inset-0 w-full h-full object-cover brightness-[1.05] contrast-[1.1] saturate-[1.15]"
              />


              {/* overlay callout untouched */}


              {/* overlay callout */}
              <div className="absolute left-5 right-5 -bottom-20 flex justify-center">
                <div
                  className="w-full max-w-[520px] rounded-[24px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12"
                >
                  <div
                    className={[
                      "rounded-[24px] bg-[#070707]/75 border border-white/10 backdrop-blur-2xl",
                      isXL ? "p-5" : "p-4",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                        <Target className="h-5 w-5 text-emerald-300" />
                      </span>

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white/90 leading-tight">{title}</div>
                        <div className="mt-1 text-sm text-white/65 leading-tight">{subtitle}</div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {bullets.map((b) => (
                        <li key={b} className="flex gap-2 min-w-0">
                          <span className="text-emerald-300/80">✓</span>
                          <span className="truncate" title={b}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>


                    <div className="mt-3 text-xs text-white/45">{footer}</div>
                  </div>
                </div>

              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
