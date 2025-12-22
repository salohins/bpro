import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Settings2,
  Layers,
  Grid3X3,
  SlidersHorizontal,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ✅ per-step screenshots
import wf1 from "../../assets/wf_1.png";
import wf2 from "../../assets/wf_2.png";
import wf3 from "../../assets/wf_3.png";
import wf4 from "../../assets/wf_4.png";
import wf5 from "../../assets/wf_5.png";
import wf6 from "../../assets/wf_6.png";

const easePremium: any = [0.16, 1, 0.3, 1];

type Step = {
  icon: React.ElementType;
  title: string;
  desc: string;
  bullets: string[];
  img: string; // ✅
};

export default function WorkflowBPro() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // ✅ Mobile overlay: collapsed by default, expand on tap
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const steps = useMemo<Step[]>(
    () => [
      {
        icon: Settings2,
        title: "1) Set your environment",
        desc: "Pick a Trade Mode + Market Sentiment so the engine adapts to your timeframe and conditions.",
        bullets: [
          "TF Mode: Short / Mid / Long",
          "Sentiment: Standard / Bullish / Bearish / Consolidation",
          "Optional: HTF 200 EMA bias filter",
        ],
        img: wf1,
      },
      {
        icon: Layers,
        title: "2) Read the cloud first",
        desc: "The 3-layer EMA Cloud tells you the regime: Bull / Bear / Neutral — and defines future target lines.",
        bullets: [
          "Bull: stacked + cloud supports price",
          "Bear: stacked + cloud resists price",
          "Neutral: mixed → avoid forcing trades",
        ],
        img: wf2,
      },
      {
        icon: Grid3X3,
        title: "3) Anchor structure",
        desc: "Use pivots as real structure. B:Pro plots last confirmed swing levels and invalidates with ATR buffer.",
        bullets: [
          "Confirmed pivot support/resistance",
          "Invalidate with ATR buffer",
          "Optional HTF target lines (T1/T2)",
        ],
        img: wf3,
      },
      {
        icon: SlidersHorizontal,
        title: "4) Let filters grant permission",
        desc: "Signals only trigger when everything lines up. Volume + momentum + volatility agree.",
        bullets: ["Volume + ADX strength", "MACD / RSI agreement", "Squeeze context (BB + KC)"],
        img: wf4,
      },
      {
        icon: Zap,
        title: "5) Execute the archetype",
        desc: "When structure + cloud + filters align, you get a clean entry archetype.",
        bullets: [
          "Breakout above pivot + upper rail",
          "Mirror short below support + lower rail",
          "Close-confirmation rule",
        ],
        img: wf5,
      },
      {
        icon: ShieldCheck,
        title: "6) Manage and grade the trade",
        desc: "B:Pro tracks state and prints exit reasons. S/Q scoring helps you trade selectively.",
        bullets: ["ATR stop + invalidation", "Exit reasons: flip / momentum / time", "Safety + Quality scoring"],
        img: wf6,
      },
    ],
    []
  );

  const enter = (y = 14, d = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0.01 } : { duration: 0.75, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const activeStep = steps[active];

  const prev = () => {
    setMobileExpanded(false);
    setActive((i) => (i === 0 ? steps.length - 1 : i - 1));
  };

  const next = () => {
    setMobileExpanded(false);
    setActive((i) => (i === steps.length - 1 ? 0 : i + 1));
  };

  const stripStepPrefix = (t: string) => t.replace(/^\d+\)\s*/, "");

  // swipe helpers
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
  const swipeConfidenceThreshold = 8500;

  const handleSwipeEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (reduceMotion) return;
    const p = swipePower(info.offset.x, info.velocity.x);
    if (p > swipeConfidenceThreshold) prev();
    if (p < -swipeConfidenceThreshold) next();
  };

  return (
    <section
      id="workflow"
      className="relative w-full bg-black text-white overflow-hidden
                 py-14 sm:py-16 md:py-20 lg:py-0 lg:h-[100svh] lg:min-h-[100svh]"
    >
      {/* subtle background (doesn't hard-stop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_55%,rgba(255,255,255,0.06),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.045] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] h-full px-4 sm:px-10 lg:px-16 2xl:px-20">
        <div className="h-full flex flex-col lg:justify-center lg:py-14">
          {/* header */}
          <motion.div {...enter(14, 0)} className="flex-none">
            <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] w-fit">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                Workflow
              </span>
            </div>

            <h2 className="mt-4 font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(28px,6.6vw,54px)]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                How to Trade with B:Pro - Clear and Structured.
              </span>
            </h2>
          </motion.div>

          {/* body */}
          <div className="mt-7 sm:mt-8 lg:mt-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 lg:items-stretch">
            {/* LEFT */}
            <motion.div {...enter(12, 0.04)} className="lg:col-span-4 min-h-0 lg:h-full lg:min-h-0">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.02] p-3 sm:p-4 lg:h-full lg:min-h-0">
                {/* ✅ MOBILE: single-step “slide” */}
                <div className="lg:hidden">
                  <motion.button
                    key={activeStep.title}
                    type="button"
                    onClick={() => setMobileExpanded(false)}
                    drag={reduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    dragDirectionLock
                    onDragEnd={handleSwipeEnd}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.28, ease: easePremium }}
                    className="w-full text-left outline-none"
                    style={{ touchAction: "pan-y" }}
                  >
                    <div className="rounded-[22px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/50 bg-emerald-500/10 shrink-0">
                            <activeStep.icon className="h-5 w-5 text-emerald-200" />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-[11px] text-white/45 tracking-widest uppercase">
                                Step {active + 1} / {steps.length}
                              </div>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] tracking-widest uppercase text-white/60">
                                Swipe
                              </span>
                            </div>

                            <div className="mt-1 text-[14px] font-semibold text-white/92 truncate">
                              {stripStepPrefix(activeStep.title)}
                            </div>

                            <div className="mt-1 text-[12.5px] text-white/65 line-clamp-2 leading-snug">
                              {activeStep.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>

                  {/* controls */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-[12px] text-white/80"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="h-4 w-4 text-white/70" />
                      Prev
                    </button>

                    {/* dots */}
                    <div className="flex items-center gap-1.5">
                      {steps.map((_, i) => {
                        const isActive = i === active;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setMobileExpanded(false);
                              setActive(i);
                            }}
                            className={[
                              "h-2 rounded-full transition-all",
                              isActive ? "w-6 bg-white/55" : "w-2 bg-white/18",
                            ].join(" ")}
                            aria-label={`Go to step ${i + 1}`}
                            aria-current={isActive ? "true" : "false"}
                          />
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-[12px] text-white/80"
                      aria-label="Next step"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 text-white/70" />
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-white/45 flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
                    Candle-close confirmation = rule.
                  </div>
                </div>

                {/* ✅ DESKTOP: original list (now explicitly stretches to match right) */}
                <div className="hidden lg:flex flex-col h-full min-h-0">
                  <div className="flex-1 min-h-0 flex flex-col gap-2">
                    {steps.map((s, i) => {
                      const isActive = i === active;
                      return (
                        <button
                          key={s.title}
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          onClick={() => setActive(i)}
                          className="w-full text-left outline-none flex-1"
                        >
                          <div
                            className={[
                              "h-full rounded-[20px] px-5 py-4 border transition-all duration-200",
                              "bg-white/[0.02] hover:bg-white/[0.03]",
                              isActive ? "border-emerald-400/30 bg-emerald-400/10" : "border-white/10",
                            ].join(" ")}
                          >
                            <div className="h-full flex items-center gap-4">
                              <span
                                className={[
                                  "inline-flex h-12 w-12 items-center justify-center rounded-2xl border shrink-0",
                                  isActive
                                    ? "border-emerald-300/60 bg-emerald-500/10"
                                    : "border-white/10 bg-white/[0.02]",
                                ].join(" ")}
                              >
                                <s.icon className={`h-6 w-6 ${isActive ? "text-emerald-200" : "text-white/65"}`} />
                              </span>

                              <div className="min-w-0 flex-1">
                                <div
                                  className={[
                                    "font-semibold leading-tight truncate",
                                    "text-[15px] sm:text-[16px] md:text-[17px]",
                                    isActive ? "text-white/95" : "text-white/86",
                                  ].join(" ")}
                                >
                                  {s.title}
                                </div>
                              </div>

                              <span
                                aria-hidden
                                className={`h-2.5 w-2.5 rounded-full transition shrink-0 ${
                                  isActive ? "bg-emerald-300" : "bg-white/18"
                                }`}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-xs text-white/45 flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
                    Candle-close confirmation = rule.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div {...enter(12, 0.08)} className="lg:col-span-8 min-h-0 lg:h-full lg:min-h-0">
              <div className="h-full min-h-0 rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14 shadow-[0_0_70px_rgba(16,185,129,0.08)]">
                <motion.div
                  className={[
                    "relative rounded-[30px] overflow-hidden bg-[#070707]/70 border border-white/10",
                    "h-[58svh] sm:h-[60svh] md:h-[62svh] lg:h-full",
                  ].join(" ")}
                  drag={reduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  dragDirectionLock
                  onDragEnd={handleSwipeEnd}
                  style={{ touchAction: "pan-y" }}
                >
                  {/* ✅ per-step screenshot */}
                  <img
                    src={activeStep.img}
                    alt={`B:PRO workflow step ${active + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-right"
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/24 to-black/12" />
                  <div className="absolute inset-0 ring-1 ring-white/10" />

                  {/* top badge */}
                  <div className="absolute left-4 sm:left-5 top-4 sm:top-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/35 text-[11px] tracking-[0.16em] uppercase text-white/70">
                      Step {active + 1} / {steps.length}
                    </div>
                  </div>

                  {/* mobile quick arrows (stop drag when pressing) */}
                  <div
                    className="lg:hidden absolute right-4 top-4 flex items-center gap-2"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/75"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/75"
                      aria-label="Next step"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-6">
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-24 sm:h-40 bg-gradient-to-t from-black/92 via-black/45 to-transparent"
                    />

                    {/* ✅ MOBILE overlay */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setMobileExpanded((v) => !v)}
                      className="lg:hidden relative w-full text-left rounded-[18px] border border-white/10 bg-black/40 backdrop-blur-[2px] p-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="mt-1 text-[16px] font-semibold tracking-tight text-white/92 truncate">
                            {activeStep.title}
                          </div>
                        </div>

                        <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] tracking-widest uppercase text-white/60">
                          {mobileExpanded ? "Less" : "More"}
                        </span>
                      </div>

                      <div
                        className={[
                          "mt-2 text-white/68 text-[12.5px] leading-relaxed",
                          mobileExpanded ? "line-clamp-none" : "line-clamp-2",
                        ].join(" ")}
                      >
                        {activeStep.desc}
                      </div>

                      {mobileExpanded && (
                        <div className="mt-3">
                          <ul className="space-y-1.5">
                            {activeStep.bullets.slice(0, 3).map((b) => (
                              <li key={b} className="flex items-start gap-2 text-[12.5px] text-white/75">
                                <span className="mt-[2px] text-emerald-300/85">✓</span>
                                <span className="leading-snug">{b}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          <div className="mt-3 text-[12px] text-white/45">
                            Tip: keep it auditable — show the “why”, not promises.
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Desktop overlay (unchanged) */}
                    <div className="hidden lg:block relative rounded-[22px] border border-white/10 bg-black/50 backdrop-blur-[2px] p-4 sm:p-5 md:p-6">
                      <div className="mt-2 text-[18px] sm:text-xl md:text-2xl font-semibold tracking-tight text-white/92">
                        {activeStep.title}
                      </div>

                      <div className="mt-2 text-white/68 text-[13px] sm:text-sm md:text-[15px] leading-relaxed max-w-[920px]">
                        {activeStep.desc}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeStep.bullets.slice(0, 3).map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/72"
                          >
                            <span className="text-emerald-300/85">✓</span>
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-[1px]" />
                </motion.div>
              </div>

              <div className="lg:hidden mt-3 text-xs text-white/45">
                Tip: swipe the screenshot or use arrows — the “why” stays visible.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
