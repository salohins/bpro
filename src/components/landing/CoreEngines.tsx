import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Map as MapIcon,
  SlidersHorizontal,
  Target,
  ShieldCheck,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import bproScreenshot from "../../assets/bpro.png";

const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Engine = {
  icon: React.ElementType;
  title: string;
  tagline: string;
  points: string[];
  footer: string;
  tone: "emerald" | "sky" | "amber" | "fuchsia" | "lime";
  badge: string;
};

function useIsLgUp() {
  const [isLgUp, setIsLgUp] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLgUp(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  return isLgUp;
}

export default function CoreEngines() {
  const reduceMotion = useReducedMotion();
  const isLgUp = useIsLgUp();

  const engines = useMemo<Engine[]>(
    () => [
      {
        icon: MapIcon,
        title: "Market Structure Engine",
        tagline: "Where are we and what regime is this?",
        points: ["Adaptive Cloud + regime", "HTF alignment + levels", "T1/T2 future lines"],
        footer: "Builds a live structural map: trend, regime and targets.",
        tone: "emerald",
        badge: "Structure",
      },
      {
        icon: SlidersHorizontal,
        title: "Confluence & Sentiment Engine",
        tagline: "Is the environment favorable?",
        points: ["9-layer permission gates", "Volume · momentum · volatility", "Bull/Bear/Range strictness"],
        footer: "Filters adapt to regime so you trade what fits, not what you want",
        tone: "sky",
        badge: "Permission",
      },
      {
        icon: Brain,
        title: "Decision Intelligence",
        tagline: "How good is this setup?",
        points: ["Safety score (risk)", "Quality score (edge)", "Last signals panel (selectivity)"],
        footer: "Grades setups so you trade selectively, not emotionally.",
        tone: "lime",
        badge: "Grading",
      },
      {
        icon: ShieldCheck,
        title: "Trade Lifecycle & Risk Engine",
        tagline: "Trade management from open to close.",
        points: ["ATR stops + invalidation", "Structural + momentum exits", "State machine: Active → Closed"],
        footer: "More than signals. Full trade management.",
        tone: "amber",
        badge: "Risk",
      },
      {
        icon: Target,
        title: "Signal & Execution Engine",
        tagline: "Turns context into a clear entry decision.",
        points: [
          "Breakout entries as the primary trigger",
          "Divergences used as confirmation or warning",
          "Continuations used to stay aligned with trend",
        ],
        footer: "Gives you one clean trigger, with supporting context. No random signals.",
        tone: "fuchsia",
        badge: "Execution",
      },
    ],
    []
  );

  const desktopDefaultIdx = Math.max(0, engines.findIndex((e) => e.title === "Decision Intelligence"));

  const initialIdx = (() => {
    if (typeof window === "undefined") return desktopDefaultIdx;
    return window.matchMedia("(min-width: 1024px)").matches ? desktopDefaultIdx : 0;
  })();

  const [idx, setIdx] = useState(initialIdx);

  // ✅ if breakpoint flips, reset to a sensible default
  const prevIsLg = useRef(isLgUp);
  useEffect(() => {
    if (prevIsLg.current === isLgUp) return;
    prevIsLg.current = isLgUp;
    setIdx(isLgUp ? desktopDefaultIdx : 0);
  }, [isLgUp, desktopDefaultIdx]);

  const active = engines[idx];
  const tone = getTone(active.tone);

  const enter = (d = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.8, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  return (
    <section
      id="core-engines"
      className="
        relative w-full bg-black text-white
        h-[100svh] overflow-hidden
      "
    >
{/* Background (static) */}
<div className="absolute inset-0">
  <motion.div
    className="absolute inset-0 will-change-transform"
    // ✅ MOBILE: keep it oversized so panning never reveals edges
    style={!isLgUp ? { scale: 1.28 } : undefined}
    animate={
      !isLgUp && !reduceMotion
        ? { x: [-55, 55, -55] } // px = predictable, hits edges properly
        : undefined
    }
    transition={
      !isLgUp && !reduceMotion
        ? { duration: 14, repeat: Infinity, ease: "easeInOut" }
        : undefined
    }
  >
    <img
      src={bproScreenshot}
      alt=""
      className="
        absolute inset-0 w-full h-full object-cover
        object-[90%_0%]
        md:object-[-20%_50%]
      "
      loading="lazy"
      decoding="async"
    />
  </motion.div>

  {/* ✅ Base dark overlay: mobile bottom→top, desktop left→right */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-t from-black/95 via-black/55 to-transparent
      md:bg-gradient-to-r md:from-black/95 md:via-black/70 md:to-transparent
    "
  />

  <AnimatePresence initial={false} mode="wait">
    <motion.div
      key={active.tone}
      className={`absolute inset-0 ${tone.bgWash}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLgUp ? 0.55 : 0.28 }}
      exit={{ opacity: 0 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.32, ease: easePremium }}
    />
  </AnimatePresence>
</div>


      <div className="relative z-10 mx-auto max-w-[1760px] fkex items-center h-full px-6 sm:px-10 lg:px-16 2xl:px-20">
{/* MOBILE — SLIDER (headline + slider as ONE bottom-aligned block) */}
<div className="lg:hidden h-full flex flex-col pt-10 pb-14">
  {/* ✅ Push content to bottom */}
  <div className="flex-1 min-h-0 flex items-end">
    <div className="w-full max-w-[560px] mx-auto">
      {/* headline (part of the same block) */}
      <motion.div {...enter(0)} className="mb-5">
        <h2 className="font-semibold tracking-[-0.05em] leading-[1.02] text-[clamp(36px,8.2vw,42px)]">
          <span className="text-white/95">Five engines.</span>
          <br />
          <span className={`bg-gradient-to-r ${tone.textGrad} bg-clip-text text-transparent`}>
            One Decision Framework.
          </span>
        </h2>
      </motion.div>

      {/* ✅ stable slider height so slides stay equal height */}
      <div className="h-[52svh] min-h-[340px] max-h-[520px]">
        <MobileEnginesSlider
          engines={engines}
          idx={idx}
          setIdx={setIdx}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  </div>
</div>




        {/* DESKTOP */}
        <div className="hidden lg:grid h-full grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.div {...enter(0)} className="mb-6">
              <div className="flex items-center gap-3">
                <Kicker tone={active.tone}>Core Engines</Kicker>
                <Pill tone={active.tone}>{active.badge}</Pill>
              </div>

              <h2 className="mt-4 font-semibold tracking-[-0.05em] leading-[1.02] text-[clamp(30px,3vw,56px)]">
                <span className="text-white/95">Five Engines.</span>
                <br />
                <span className={`bg-gradient-to-r ${tone.textGrad} bg-clip-text text-transparent`}>
                  One Decision Framework.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {engines.map((e, i) => {
                const isActive = i === idx;
                const t = getTone(e.tone);

                return (
                  <motion.button
                    key={e.title}
                    type="button"
                    onMouseEnter={() => setIdx(i)}
                    onFocus={() => setIdx(i)}
                    onClick={() => setIdx(i)}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className="w-full text-left outline-none"
                  >
                    <div
                      className={[
                        "rounded-[22px] p-[1px] transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-b ${t.cardGrad} shadow-[0_0_40px_rgba(255,255,255,0.06)]`
                          : "bg-gradient-to-b from-white/10 via-white/5 to-white/10 hover:from-white/14 hover:via-white/7 hover:to-white/12",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "rounded-[22px] border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-4",
                          isActive ? `ring-1 ${t.ring}` : "",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={[
                              "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]",
                              isActive ? t.iconBox : "",
                            ].join(" ")}
                          >
                            <e.icon className={`h-5 w-5 ${isActive ? t.icon : "text-white/70"}`} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-semibold text-white/90 leading-tight truncate">
                                {e.title}
                              </div>
                              <span
                                className={[
                                  "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase",
                                  isActive ? t.pillActive : "border-white/10 bg-white/[0.03] text-white/60",
                                ].join(" ")}
                              >
                                {e.badge}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-white/65 leading-tight line-clamp-2">
                              {e.tagline}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 lg:self-end pb-10 lg:pb-12">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: easePremium }}
              className="max-w-[820px] lg:ml-auto"
            >
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-md p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs text-white/45 tracking-widest uppercase">Active engine</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight text-white/92">{active.title}</div>
                    <div className="mt-1 text-white/65 text-sm leading-relaxed">{active.tagline}</div>
                  </div>

                  <span
                    className={[
                      "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase",
                      tone.pillActive,
                    ].join(" ")}
                  >
                    {active.badge}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {active.points.slice(0, 3).map((p) => (
                    <div
                      key={p}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
                    >
                      <div className="text-xs text-white/55 tracking-widest uppercase">Capability</div>
                      <div className="mt-2 text-sm text-white/80 leading-snug">{p}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-white/45">{active.footer}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MOBILE SLIDER ---------------- */

function MobileEnginesSlider({
  engines,
  idx,
  setIdx,
  reduceMotion,
}: {
  engines: Engine[];
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  reduceMotion: boolean;
}) {
  const [dir, setDir] = useState(1);

  const next = () => {
    setDir(1);
    setIdx((p) => (p + 1) % engines.length);
  };

  const prev = () => {
    setDir(-1);
    setIdx((p) => (p - 1 + engines.length) % engines.length);
  };

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * 22,
      filter: "blur(10px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: reduceMotion ? { duration: 0.01 } : { duration: 0.45, ease: easePremium },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * -22,
      filter: "blur(10px)",
      transition: reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: easePremium },
    }),
  };

  const active = engines[idx];

  return (
    <div className="relative h-full flex flex-col min-h-0">
      {/* arrows (fixed height) */}
      <div className="mb-3 flex items-center justify-between shrink-0">
        <div className="text-xs text-white/45 tracking-widest uppercase">
          Slide {idx + 1} / {engines.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous engine"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
          >
            <ChevronLeft className="h-5 w-5 text-white/70" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next engine"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
          >
            <ChevronRight className="h-5 w-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* viewport (fills remaining height, every slide same height) */}
      <div className="relative overflow-hidden flex-1 min-h-0">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={active.title}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (reduceMotion) return;
              if (info.offset.x < -70) next();
              if (info.offset.x > 70) prev();
            }}
            className="will-change-transform h-full"
          >
            <MobileEngineCard engine={active} isActive index={idx} total={engines.length} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots (fixed height) */}
      <div className="mt-5 flex items-center justify-center gap-2 shrink-0">
        {engines.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to engine ${i + 1}`}
            onClick={() => {
              setDir(i > idx ? 1 : -1);
              setIdx(i);
            }}
            className={`h-2.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-emerald-300/70" : "w-2.5 bg-white/15 hover:bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- MOBILE CARD ---------------- */

function MobileEngineCard({
  engine,
  isActive,
}: {
  engine: Engine;
  isActive: boolean;
  index: number;
  total: number;
}) {
  const t = getTone(engine.tone);
  const Icon = engine.icon;

  return (
    <div
      className={[
        "h-full rounded-[30px] p-[1px] transition-all duration-300",
        isActive
          ? `bg-gradient-to-b ${t.cardGrad} shadow-[0_0_45px_rgba(255,255,255,0.07)]`
          : "bg-gradient-to-b from-white/10 via-white/7 to-white/10",
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full overflow-hidden rounded-[30px] border border-white/10 bg-[#070707]/70 backdrop-blur-2xl p-5 flex flex-col",
          isActive ? `ring-1 ${t.ring}` : "",
        ].join(" ")}
      >
        <div className={`pointer-events-none absolute inset-0 ${t.bgWash} opacity-[0.28]`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

        <div className="relative flex flex-col h-full min-h-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
  

              <div className="mt-12 flex items-center gap-3">
                <span
                  className={[
                    "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10",
                    isActive ? t.iconBox : "bg-white/[0.03]",
                  ].join(" ")}
                >
                  <Icon className={`h-5 w-5 ${isActive ? t.icon : "text-white/70"}`} />
                </span>

                <div className="min-w-0">
                  <div className="text-[18px] font-semibold tracking-tight text-white/92 leading-tight">
                    {engine.title}
                  </div>
                  <div className="mt-1 text-white/65 text-sm leading-snug">{engine.tagline}</div>
                </div>
              </div>
            </div>

            <span
              className={[
                "absolute left-0 shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase",
                t.pillActive,
              ].join(" ")}
            >
              {engine.badge}
            </span>
          </div>

          {/* fills space so footer sits consistently near bottom */}
          <div className="mt-5 space-y-2.5 flex-1 min-h-0">
            {engine.points.slice(0, 3).map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className={`mt-[6px] h-2 w-2 rounded-full ${t.dot}`} />
                <div className="text-sm text-white/80 leading-snug">{p}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/45 leading-relaxed">
            {engine.footer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI ---------------- */

function Kicker({ children, tone }: { children: React.ReactNode; tone: Engine["tone"] }) {
  const t = getTone(tone);
  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/[0.03] backdrop-blur-md w-fit ${t.kickerBorder}`}
    >
      <Sparkles className={`w-4 h-4 ${t.icon}`} />
      <span className={`text-xs tracking-[0.24em] font-semibold uppercase ${t.kickerText}`}>
        {children}
      </span>
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: Engine["tone"] }) {
  const t = getTone(tone);
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase ${t.pillActive}`}
    >
      {children}
    </span>
  );
}

function getTone(tone: Engine["tone"]) {
  switch (tone) {
    case "sky":
      return {
        bgWash: "bg-[radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.18),transparent_60%)]",
        textGrad: "from-white via-sky-200 to-sky-400",
        ring: "ring-sky-400/30",
        icon: "text-sky-300",
        dot: "bg-sky-300",
        iconBox: "bg-sky-500/12 border-sky-300/60",
        kickerBorder: "border-sky-400/20",
        kickerText: "text-sky-200",
        pillActive: "border-sky-400/25 bg-sky-400/10 text-sky-100",
        cardGrad: "from-sky-400/18 via-white/10 to-sky-500/12",
      };
    case "amber":
      return {
        bgWash: "bg-[radial-gradient(circle_at_82%_18%,rgba(251,191,36,0.16),transparent_60%)]",
        textGrad: "from-white via-amber-200 to-amber-400",
        ring: "ring-amber-400/30",
        icon: "text-amber-300",
        dot: "bg-amber-300",
        iconBox: "bg-amber-500/12 border-amber-300/60",
        kickerBorder: "border-amber-400/20",
        kickerText: "text-amber-200",
        pillActive: "border-amber-400/25 bg-amber-400/10 text-amber-100",
        cardGrad: "from-amber-400/16 via-white/10 to-amber-500/12",
      };
    case "fuchsia":
      return {
        bgWash: "bg-[radial-gradient(circle_at_82%_18%,rgba(217,70,239,0.16),transparent_60%)]",
        textGrad: "from-white via-fuchsia-200 to-fuchsia-400",
        ring: "ring-fuchsia-400/30",
        icon: "text-fuchsia-300",
        dot: "bg-fuchsia-300",
        iconBox: "bg-fuchsia-500/12 border-fuchsia-300/60",
        kickerBorder: "border-fuchsia-400/20",
        kickerText: "text-fuchsia-200",
        pillActive: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-100",
        cardGrad: "from-fuchsia-400/16 via-white/10 to-fuchsia-500/12",
      };
    case "lime":
      return {
        bgWash: "bg-[radial-gradient(circle_at_82%_18%,rgba(163,230,53,0.14),transparent_60%)]",
        textGrad: "from-white via-lime-200 to-lime-400",
        ring: "ring-lime-400/30",
        icon: "text-lime-300",
        dot: "bg-lime-300",
        iconBox: "bg-lime-500/12 border-lime-300/60",
        kickerBorder: "border-lime-400/20",
        kickerText: "text-lime-200",
        pillActive: "border-lime-400/25 bg-lime-400/10 text-lime-100",
        cardGrad: "from-lime-400/14 via-white/10 to-lime-500/10",
      };
    case "emerald":
    default:
      return {
        bgWash: "bg-[radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_60%)]",
        textGrad: "from-white via-emerald-200 to-emerald-500",
        ring: "ring-emerald-400/30",
        icon: "text-emerald-300",
        dot: "bg-emerald-300",
        iconBox: "bg-emerald-500/12 border-emerald-300/60",
        kickerBorder: "border-emerald-400/20",
        kickerText: "text-emerald-300",
        pillActive: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
        cardGrad: "from-emerald-400/16 via-white/10 to-emerald-500/12",
      };
  }
}
