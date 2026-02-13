import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  LayoutGroup,
} from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Target,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import oneMinLong from "../../assets/1minLong.png";
import fiveMin from "../../assets/5min.png";
import fifteenMin from "../../assets/15min.png";
import thirtyMin from "../../assets/30min.png";
import fourH19 from "../../assets/4h19.png";
import fourH8 from "../../assets/4h8.png";
import twoH5 from "../../assets/2h5.png";
import oneH3 from "../../assets/1h3.png";
import twoD29 from "../../assets/2d29.png";
import week27 from "../../assets/week27.png";
import day31 from "../../assets/day31.png";
import day10 from "../../assets/day10.png";

const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProfitCases() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: 16 * dir, },
    whileInView: { opacity: 1, y: 0, },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const cases = useMemo(
    () => [
      {
        pct: "19.9%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "4H",
        dates: "Example (swing)",
        headline: "Mid — Standard mode long",
        bullets: [
          "Timeframe 4H - Mid Trendmode",
          "Entry: After Open Long, Signal at the Fast Line",
          "SL: at Midtrend Line",
          "TP: Close Long / Fast Line / Midtrend Line",
        ],
        note:
          "4H mid standard mode: long entry at fast line, stop at midtrend, take profit into close-long or fastline / midtrend.",
        img: fourH19,
      },
      {
        pct: "8.1%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "4H",
        dates: "Example (swing)",
        headline: "Mid — Standard mode long",
        bullets: [
          "Timeframe 4H - Mid Trendmode",
          "Entry: After Open Long, Signal at the Fast Line",
          "SL: Close Long / Fast Line / Midtrend Line",
          "TP: (not specified)",
        ],
        note:
          "4H mid standard mode: long entry at fast line; SL can be close-long, fastline, or midtrend (per your plan).",
        img: fourH8,
      },
      {
        pct: "5.62%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "2H",
        dates: "Example",
        headline: "Mid — Standard mode breakout long",
        bullets: [
          "Timeframe 2H - Mid trademode",
          "Breakout symbol: price may not touch Fast Line before continuing uptrend",
          "SL: at Midtrend Line",
          "TP: Fast Line / Midtrend Line",
        ],
        note:
          "2H breakout case: continuation can happen without a fastline retest; risk at midtrend, targets into fastline/midtrend zones.",
        img: twoH5,
      },
      {
        pct: "3.1%",
        tag: "Open Short",
        symbol: "BTC / USDT",
        tf: "1H",
        dates: "Example",
        headline: "Mid — Standard mode breakdown short",
        bullets: [
          "Timeframe 1h - Mid trandemode",
          "Yellow breakdown symbol: price may not touch Fast Line before trend continues",
          "SL: at Midtrend Line",
          "TP: Close Short / Fast Line / Midtrend Line",
        ],
        note:
          "1H breakdown case: continuation can happen without a fastline retest; stop at midtrend, take profit into close-short or fastline/midtrend.",
        img: oneH3,
      },
      {
        pct: "29.8%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "2D",
        dates: "Example (trend)",
        headline: "Standard mode long (no-fastline retest)",
        bullets: [
          "Timeframe 2D — Mid Trendmode (long)",
          "White label: trend may not touch Fast Line before continuing",
          "SL: at Midtrend Line",
          "TP: Fast Line / Midtrend Line / Close Short symbol",
        ],
        note:
          "2D trend case: white label suggests continuation without fastline retest; risk at midtrend, targets into fastline/midtrend or close-short signal.",
        img: twoD29,
      },
      {
        pct: "27.5%",
        tag: "Divergence",
        symbol: "BTC / USDT",
        tf: "1W",
        dates: "Example (context)",
        headline: "Standard mode — bearish divergence context",
        bullets: [
          "Weekly (long Timeframe) — Standard mode",
          "Not a direct setup: highlights bearish divergence you can build a trade on",
          "SL: at previous B:PRO resistance",
          "TP: at Fast Line",
        ],
        note:
          "Weekly context: bearish divergence can be used to plan a separate setup; define risk at prior B:PRO resistance and target the fast line.",
        img: week27,
      },
      {
        pct: "31.5%",
        tag: "Bear Continuation",
        symbol: "BTC / USDT",
        tf: "1D",
        dates: "Example (trend)",
        headline: "Standard mode — breakdown + bear continuation",
        bullets: [
          "Daily (long Timeframe) — Standard mode",
          "Breakdown + bear continuation print: price likely won’t touch Fast Line before continuing down",
          "SL: at Fast Line",
          "TP: Fast Line / Midtrend Line",
        ],
        note:
          "Daily trend case: breakdown + bear continuation suggests continuation without a fastline retest; stop at fastline, targets into fastline/midtrend.",
        img: day31,
      },
      {
        pct: "10.3%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "1D",
        dates: "Example (trend)",
        headline: "Standard mode — bull continuation + breakout",
        bullets: [
          "Daily (long Timeframe) — Standard mode",
          "Bull continuation + breakout symbol: price may not touch B:PRO Fast Line before continuing up",
          "SL: at Midtrend Line",
          "TP: Close Long / Fast Line / Midtrend Line",
        ],
        note:
          "Daily continuation case: breakout + bull continuation suggests continuation without a fastline retest; risk at midtrend, take profit into close-long or fastline/midtrend.",
        img: day10,
      },
      {
        pct: "1.2%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "1m",
        dates: "Example (scalp)",
        headline: "Fast Timeframe Mode Bull",
        bullets: [
          "Mode 1m (fast Timeframe)",
          "Entry: After Open Long, at the Fast Line",
          "SL: slightly below Midtrend Line",
          "TP: Close Short / Fast Line / Midtrend Line",
        ],
        note:
          "1m fast mode scalp: long trigger at fast line, stop tucked under midtrend, take profit into close-short / fastline / midtrend.",
        img: oneMinLong,
      },
      {
        pct: "1.92%",
        tag: "Open Short",
        symbol: "BTC / USDT",
        tf: "5m",
        dates: "Example (scalp)",
        headline: "Fast Timeframe Mode bear",
        bullets: [
          "Mode 5m (fast Timeframe) — Bear mode",
          "Entry: After Open Short, at the Fast Line",
          "SL: at Midtrend Line",
          "TP: Fast Line / Close Short / Midtrend Line",
        ],
        note:
          "5m fast mode (bear): short trigger at fast line, stop at midtrend, take profit into fastline or close-short / midtrend.",
        img: fiveMin,
      },
      {
        pct: "1.2%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "15m",
        dates: "Example (scalp)",
        headline: "Standard mode long",
        bullets: [
          "Mode 15m (short Timeframe) — Standard mode",
          "Entry: After Open Long, at the Fast Line",
          "SL: at Midtrend Line",
          "TP: Fast Line / Close Short / Midtrend Line",
        ],
        note:
          "15m standard mode: long entry at fast line, stop at midtrend, take profit into fastline or close-short / midtrend.",
        img: fifteenMin,
      },
      {
        pct: "5.8%",
        tag: "Open Long",
        symbol: "BTC / USDT",
        tf: "30m",
        dates: "Example (scalp)",
        headline: "Fast Timeframe Mode — Standard long",
        bullets: [
          "Mode 30m (fast Timeframe) — Standard mode",
          "Entry: After Open Long, at the Fast Line",
          "SL: at Midtrend Line",
          "TP: Fast Line / Close Short / Midtrend Line",
        ],
        note:
          "30m fast Tiemframe standard mode: long entry at fast line, stop at midtrend, take profit into fastline or close-short / midtrend.",
        img: thirtyMin,
      },
    ]


  );

  return (
    <section
      className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white"
      id="profit-cases"
    >
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header */}
        <motion.div
          {...enter(1)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-7 space-y-5">
            <Kicker>Profit Cases</Kicker>

            <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,58px)]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Transparent Proof
                <br /> You Can Verify Yourself.
              </span>{" "}
            </h2>

            <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[800px]">
              Every trade includes detailed screenshots, complete with a clear
              explanation of the “why” behind it. You’ll get the full market
              context, the specific signal type, and the exact conditions that
              made the trade valid.
            </p>
          </div>

          {/* Mini metrics — one line scroll on mobile + edge fade, grid on lg+ */}
          <div className="relative lg:col-span-5">
            {/* left fade (mobile only) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8
               bg-gradient-to-r from-[#0b0b0b] to-transparent lg:hidden"
            />
            {/* right fade (mobile only) */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10
               bg-gradient-to-l from-[#0b0b0b] to-transparent lg:hidden"
            />


          </div>
        </motion.div>

        {/* Slider */}
        <motion.div {...enter(1, 0.05)} className="mt-10">
          <CasesSlider cases={cases} reduceMotion={!!reduceMotion} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Slider ---------------- */

function usePerSlide() {
  const [perSlide, setPerSlide] = useState(4);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) return 1; // mobile
      if (w < 1024) return 2; // tablet
      if (w < 1280) return 3; // small desktop
      return 4; // xl+
    };
    const update = () => setPerSlide(calc());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perSlide;
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function CasesSlider({
  cases,
  reduceMotion,
}: {
  cases: any[];
  reduceMotion: boolean;
}) {
  const perSlide = usePerSlide();
  const slides = useMemo(() => chunk(cases, perSlide), [cases, perSlide]);

  const slideTitles = useMemo(() => {
    return ["Swing trading", "Position trading", "Scalping/Day trading"];
  }, []);

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const [selected, setSelected] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const makeId = (c: any) =>
    `case-${String(`${c.symbol}-${c.tf}-${c.pct}-${c.dates}`).replace(
      /\W+/g,
      "-"
    )}`;

  const openCase = (c: any) => {
    const id = makeId(c);
    setSelected(c);
    setSelectedId(id);
  };

  const [closingId, setClosingId] = useState<string | null>(null);
  const closeCase = () => {
    // ✅ mark which tile is "returning" so it can be z-elevated in the grid
    setClosingId(selectedId);

    setSelected(null);
    setSelectedId(null);
  };

  useEffect(() => {
    setIdx((p) => Math.min(p, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCase();
    };

    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = () => {
    setDir(1);
    setIdx((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setDir(-1);
    setIdx((p) => (p - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * 18,

    }),
    center: {
      opacity: 1,
      x: 0,

      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.55, ease: easePremium },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * -18,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.45, ease: easePremium },
    }),
  };

  return (
    <LayoutGroup id="cases">
      <div className="relative">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-white/45 tracking-widest uppercase flex items-center gap-2">
            <span>
              Slide {idx + 1} / {slides.length}
            </span>
            <span className="text-white/25">·</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous cases"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
            >
              <ChevronLeft className="h-5 w-5 text-white/70" />
            </button>
            <button
              onClick={next}
              aria-label="Next cases"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
            >
              <ChevronRight className="h-5 w-5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Slide viewport */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%)]" />

          {/* lock viewport height so ALL slides have identical height */}
          <div className="relative h-[400px] sm:h-[740px] lg:h-[520px] xl:h-[450px]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={`${idx}-${perSlide}`}
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
                className="relative p-4 sm:p-5 lg:p-6 h-full"
              >
                <div className="grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 auto-rows-fr items-stretch">
                  {slides[idx]?.map((c) => {
                    const id = makeId(c);

                    return (
                      <CaseTile
                        key={id}
                        id={id}
                        item={c}
                        onSelect={() => openCase(c)}
                        isSelected={selectedId === id}          // already have this
                        elevate={closingId === id}             // ✅ new
                        onReturnComplete={() => setClosingId(null)} // ✅ new
                      />
                    );
                  })}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className={`h-2.5 rounded-full transition-all ${i === idx
                ? "w-8 bg-emerald-300/70"
                : "w-2.5 bg-white/15 hover:bg-white/25"
                }`}
            />
          ))}
        </div>

        {/* Expanded overlay (shared LayoutGroup across portal) */}
        {mounted &&
          createPortal(
            <LayoutGroup id="cases" inherit={false}>
              <AnimatePresence>
                {selected && selectedId ? (
                  <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* backdrop */}
                    <button
                      aria-label="Close expanded case"
                      onClick={closeCase}
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* centered content */}
                    <motion.div
                      className="relative w-full max-w-[980px]"
                      initial={reduceMotion ? { scale: 1 } : { scale: 0.98 }}
                      animate={{ scale: 1 }}
                      exit={reduceMotion ? { scale: 1 } : { scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CaseTile
                        item={selected}
                        id={selectedId}
                        expanded
                        isSelected
                        onClose={closeCase}
                      />
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>,
            document.body
          )}
      </div>
    </LayoutGroup>
  );
}

/* ---------------- UI ---------------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
      <Sparkles className="w-4 h-4 text-emerald-300" />
      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
        {children}
      </span>
    </div>
  );
}

function MiniMetric({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3",
        className,
      ].join(" ")}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        {icon}
      </span>

      <span className="min-w-0 text-sm text-white/80 leading-tight">{label}</span>
    </div>
  );
}

function CaseTile({
  item,
  id,
  onSelect,
  onClose,
  expanded = false,
  isSelected = false, // ✅ true for the grid tile that matches the currently opened id
  elevate = false,    // ✅ true for the grid tile while it's returning (after close)
  onReturnComplete,
}: {
  item: any;
  id: string;
  onSelect?: () => void;
  onClose?: () => void;
  expanded?: boolean;
  isSelected?: boolean;
  elevate?: boolean;
  onReturnComplete?: () => void;
}) {
  const clickable = !!onSelect && !expanded;

  /**
   * ✅ Z-index rules
   * - expanded (portal) always on top
   * - isSelected (grid lead during OPEN travel) stays above siblings
   * - elevate (grid destination during CLOSE travel) stays above siblings until return completes
   */
  const zIndex = expanded ? 9999 : elevate || isSelected ? 80 : 0;

  return (
    <motion.div
      layoutId={id}
      onClick={clickable ? onSelect : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
            if (e.key === "Enter" || e.key === " ") onSelect?.();
          }
          : undefined
      }
      style={{ zIndex }}
      className={[
        "relative", // ✅ required for z-index to apply
        "isolate",  // ✅ contain stacking
        "will-change-transform",
        clickable ? "cursor-pointer" : "cursor-default",
        "group h-full rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14",
      ].join(" ")}
      onLayoutAnimationComplete={() => {
        // ✅ only used for the CLOSE "return to grid" completion
        if (!expanded && elevate) onReturnComplete?.();
      }}
    >
      <div className="relative h-full flex flex-col rounded-[26px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
        {/* Screenshot */}
        <div
          className={[
            "relative bg-white/[0.02]",
            expanded ? "w-full" : "h-[200px]",
          ].join(" ")}
        >
          {expanded ? (
            // ✅ Modal view (16:10)
            <div
              className="relative w-full overflow-hidden"
              style={{ paddingTop: "62.5%" }}
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={`${item.symbol} profit case`}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  draggable={false}
                />
              ) : null}

              <div className="absolute inset-0 opacity-[0.10]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:52px_52px]" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

              {!item.img && (
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <div className="text-white/70 text-sm">
                    Screenshot placeholder
                    <div className="text-white/45 text-xs mt-1">
                      Drop the trade proof here
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <Pill tone="emerald">{item.tag}</Pill>
                <Pill>{item.tf}</Pill>
              </div>

              {/* ✅ Close button INSIDE the frame */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.();
                }}
                aria-label="Close"
                className={[
                  "absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center",
                  "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md",
                  "hover:bg-white/[0.06] hover:-translate-y-[1px] active:translate-y-0",
                  "transition-[transform,background-color] duration-150 ease-out",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
                ].join(" ")}
              >
                <X className="h-4 w-4 text-white/75" />
              </button>

              <div className="absolute right-3 top-3 pr-12 text-right">
                <div className="text-[10px] text-white/45 tracking-widest uppercase">
                  Result
                </div>
                <div className="text-2xl font-semibold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                    {item.pct}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // ✅ Tile view (200px)
            <div className="absolute inset-0">
              {item.img ? (
                <img
                  src={item.img}
                  alt={`${item.symbol} profit case`}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              ) : null}

              <div className="absolute inset-0 opacity-[0.10]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:52px_52px]" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

              {!item.img && (
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <div className="text-white/70 text-sm">
                    Screenshot placeholder
                    <div className="text-white/45 text-xs mt-1">
                      Drop the trade proof here
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <Pill tone="emerald">{item.tag}</Pill>
                <Pill>{item.tf}</Pill>
              </div>

              <div className="absolute right-3 top-3 text-right">
                <div className="text-[10px] text-white/45 tracking-widest uppercase">
                  Result
                </div>
                <div className="text-2xl font-semibold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                    {item.pct}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className={`${expanded ? "p-5" : "p-4"} space-y-3 flex-1`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/90 leading-tight">
                {item.symbol}
              </div>

              <div
                className={`text-xs text-white/50 mt-1 ${expanded ? "" : "line-clamp-1"
                  }`}
              >
                {item.headline}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {(expanded ? item.bullets : item.bullets.slice(0, 3)).map(
              (b: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-white/65"
                >
                  <span className="text-emerald-300/80">✓</span>
                  <span className="leading-tight">{b}</span>
                </div>
              )
            )}
          </div>

          {expanded && item.note ? (
            <div className="pt-3 border-t border-white/10 text-sm text-white/60 leading-relaxed">
              {item.note}
            </div>
          ) : null}

          <div className="pt-2 flex items-center justify-between text-[11px] text-white/45">
            <span className="text-emerald-300/70 uppercase tracking-widest">
              case
            </span>
          </div>
        </div>

        {/* hover ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 0 38px rgba(16,185,129,0.12)",
          }}
        />
      </div>
    </motion.div>
  );
}


function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "emerald";
}) {
  const tones =
    tone === "emerald"
      ? "text-emerald-100 border-emerald-400/20 bg-emerald-400/10"
      : "text-white/75 border-white/10 bg-white/[0.03]";
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase ${tones}`}
    >
      {children}
    </span>
  );
}
