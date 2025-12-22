import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Target,
  Shield,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import futureTargetsImg from "../../assets/future-target-lines.png";
import futureTargetsImg2 from "../../assets/future-target-lines2.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function FutureTargets() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const shots = useMemo(
    () => [
      {
        key: "t1t2-1",
        src: futureTargetsImg,
        alt: "Example showing T1/T2 target EMA lines as dynamic support and resistance",
        tags: ["T1 → T2 flow", "EMA-based targets"],
        captionTitle: "How to read it",
        caption:
          "Watch rejection / acceptance at T1 and T2. Acceptance = continuation. Rejection = weakness / potential reversal pressure.",
      },
      {
        key: "t1t2-2",
        src: futureTargetsImg2,
        alt: "Second example showing T1/T2 lines interaction after breakout",
        tags: ["T1 / T2 lines", "Continuation / failure"],
        captionTitle: "What to look for",
        caption:
          "After T1 taps, track whether price holds above the rail. Clean holds = continuation. Failed holds = exit or defend.",
      },
    ],
    []
  );

  const [shotIdx, setShotIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  const wrap = (n) => (n + shots.length) % shots.length;

  const next = () => {
    setDir(1);
    setShotIdx((p) => wrap(p + 1));
  };

  const prev = () => {
    setDir(-1);
    setShotIdx((p) => wrap(p - 1));
  };

  useEffect(() => {
    if (reduceMotion) return;
    if (!autoplay || paused || shots.length <= 1) return;

    const t = setInterval(() => {
      next();
    }, 4500);

    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, paused, reduceMotion, shots.length, shotIdx]);

  const variants = {
    enter: (d) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * 16,
      filter: "blur(10px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.55, ease: easePremium },
    },
    exit: (d) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * -16,
      filter: "blur(10px)",
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.45, ease: easePremium },
    }),
  };

  const current = shots[shotIdx];

  return (
    <section
      id="future-targets"
      className="relative w-full bg-transparent text-white py-14 sm:py-16 md:py-24"
    >
      {/* background stays as you had it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-28 -bottom-28 bg-[radial-gradient(circle_at_60%_15%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-4 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start lg:items-center">
          {/* ✅ RIGHT COPY (but on MOBILE it comes FIRST) */}
          <motion.div
            {...enter(1)}
            className="lg:col-span-5 space-y-5 sm:space-y-6 order-1 lg:order-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300 text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase">
                  Market Structure Engine
                </span>
              </div>

              <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/55">
                <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                T1 / T2 Lines
              </span>
            </div>

            <h2 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(28px,7.6vw,52px)]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Future Target Lines
              </span>
            </h2>

            <p className="text-white/70 leading-relaxed max-w-xl text-[14.5px] sm:text-lg">
              After a breakout, price often interacts with{" "}
              <span className="text-white/85 font-semibold">T1</span> first, then{" "}
              <span className="text-white/85 font-semibold">T2</span>. These adaptive EMA lines act as forward
              structure, giving you clean reaction zones for continuation, failure or partials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Chip
                icon={<Target className="w-4 h-4 text-emerald-200/90" />}
                title="T1 reaction"
                desc="first touch zone"
              />
              <Chip
                icon={<Shield className="w-4 h-4 text-emerald-200/90" />}
                title="T2 decision"
                desc="continue or fail"
              />
              <Chip tone="emerald" title="EMA-based lines" desc="dynamic, not static" />
              <Chip title="Cleaner exits" desc="less guessing" />
            </div>

            <div className="pt-1 text-xs text-white/45 max-w-xl flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
              Correlation: breakouts trigger → lines manage the move → exits become objective.
            </div>
          </motion.div>

          {/* ✅ LEFT SLIDER (but on MOBILE it comes SECOND) */}
          <motion.div
            {...enter(1, 0.05)}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="rounded-[26px] sm:rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14 shadow-[0_0_70px_rgba(16,185,129,0.10)]">
              <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
                {/* header bar */}
                <div className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3">
                  <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                    T1 / T2 in-action
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-[10px] sm:text-[11px] text-white/45 tracking-widest uppercase">
                      {shotIdx + 1} / {shots.length}
                    </div>

                    <button
                      type="button"
                      onClick={() => setAutoplay((v) => !v)}
                      className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition text-[11px] tracking-widest uppercase text-white/55"
                    >
                      {autoplay ? "Autoplay: On" : "Autoplay: Off"}
                    </button>

                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous screenshot"
                      className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                    >
                      <ChevronLeft className="h-5 w-5 text-white/70" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next screenshot"
                      className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                    >
                      <ChevronRight className="h-5 w-5 text-white/70" />
                    </button>
                  </div>
                </div>

                {/* viewport */}
                <motion.div
                  className="relative h-[240px] sm:h-[380px] lg:h-[460px] touch-pan-y"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  drag={reduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.10}
                  onDragStart={() => setPaused(true)}
                  onDragEnd={(_, info) => {
                    setPaused(false);
                    if (reduceMotion) return;
                    if (info.offset.x < -70) next();
                    if (info.offset.x > 70) prev();
                  }}
                >
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                      key={current.key}
                      custom={dir}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <img
                        src={current.src}
                        alt={current.alt}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        draggable={false}
                        loading="eager"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.20),transparent_55%)]" />

                  <div
                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.30'/%3E%3C/svg%3E\")",
                    }}
                  />

                  <div className="absolute left-3 sm:left-4 top-3 sm:top-4 flex flex-wrap gap-2 max-w-[85%]">
                    <TagChip>{current.tags[0]}</TagChip>
                    <TagChip tone="emerald">{current.tags[1]}</TagChip>
                  </div>

                  <div className="absolute left-3 right-3 sm:left-5 sm:right-5 bottom-3 sm:bottom-5">
                    <Glass className="rounded-2xl bg-black/35 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="text-[13px] sm:text-sm font-semibold text-white/90 leading-tight line-clamp-1">
                        {current.captionTitle}
                      </div>
                      <div className="mt-1 text-[12.5px] sm:text-sm text-white/65 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {current.caption}
                      </div>
                    </Glass>
                  </div>

                  <motion.div
                    aria-hidden="true"
                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.07 }}
                  />

                  <div className="absolute inset-0 ring-1 ring-white/10" />
                </motion.div>

                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] sm:text-xs text-white/45">
                      Swipe or use arrows
                    </div>
                    <div className="flex items-center gap-2">
                      {shots.map((s, i) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => {
                            setDir(i > shotIdx ? 1 : -1);
                            setShotIdx(i);
                          }}
                          aria-label={`Go to screenshot ${i + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            i === shotIdx
                              ? "w-7 sm:w-8 bg-emerald-300/70"
                              : "w-2.5 bg-white/15 hover:bg-white/25"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny atoms ---------- */

function Glass({ className = "", children }) {
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

function TagChip({ children, tone = "neutral" }) {
  const tones =
    tone === "emerald"
      ? "text-emerald-100 border-emerald-400/20 bg-emerald-400/10"
      : "text-white/85 border-white/10 bg-black/30";
  return (
    <span
      className={[
        "px-3 py-1.5 rounded-full border backdrop-blur-md",
        "text-[10px] sm:text-[11px] tracking-[0.18em] uppercase",
        tones,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Chip({ icon, title, desc, tone = "neutral" }) {
  const base = "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md";
  const toneCls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div
      className={`${base} ${toneCls}`}
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shrink-0">
        {icon ? icon : <span className="w-2 h-2 rounded-full bg-emerald-300/70" />}
      </span>
      <div className="min-w-0">
        <div className="text-[13.5px] sm:text-sm font-semibold text-white/85 leading-tight">
          {title}
        </div>
        <div className="text-[13px] sm:text-sm text-white/55 leading-tight">
          {desc}
        </div>
      </div>
    </div>
  );
}
