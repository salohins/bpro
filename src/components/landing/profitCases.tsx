import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Target,
  ShieldCheck,
  Layers,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProfitCases() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.35 },
  });

  const cases = useMemo(
    () => [
      {
        pct: "125%",
        tag: "Breakout",
        symbol: "RNDR / USD",
        tf: "1D",
        dates: "Oct 27–29, 2023",
        headline: "Pump in ~2 weeks",
        bullets: ["Bull bias held", "Pressure built", "Clean trigger", "Targets on HTF rails"],
        note: "Structure + squeeze → breakout. Managed with rails + invalidation.",
      },
      {
        pct: "23.5%",
        tag: "Open Long",
        symbol: "POWR / USD",
        tf: "4H",
        dates: "Feb 9–11, 2024",
        headline: "Move in < 3 days",
        bullets: ["Filters permissive", "Regime flipped", "Pullback entry", "Exit on momentum fade"],
        note: "This is the clean trend-start archetype (permission → execution).",
      },
      {
        pct: "31%",
        tag: "Support",
        symbol: "XMR / USD",
        tf: "1D + 1W",
        dates: "Feb 7, 2024",
        headline: "HTF bounce",
        bullets: ["Weekly level hit", "Bias held", "Risk defined", "Targets to HTF zones"],
        note: "HTF confirmation turns a touch into a tradable reaction.",
      },
      {
        pct: "73%",
        tag: "Breakout",
        symbol: "ORN / USD",
        tf: "4H",
        dates: "Feb 12–15, 2024",
        headline: "Continuation",
        bullets: ["Squeeze context", "Structure + filters", "State machine", "ATR invalidation"],
        note: "Primary breakouts only print when the environment is favorable.",
      },
      {
        pct: "12.9%",
        tag: "Breakout",
        symbol: "RNDR / USD",
        tf: "4H",
        dates: "Jan 30, 2024",
        headline: "Pop in 1 day",
        bullets: ["Compression built", "Bias aligned", "Trigger confirmed", "Clean follow-through"],
        note: "Shorter timeframe version of the same framework.",
      },
      {
        pct: "30%",
        tag: "Support",
        symbol: "WEST / USDT",
        tf: "1D",
        dates: "Feb 12–14, 2024",
        headline: "Fast-line reaction",
        bullets: ["Support tag", "Bias held", "Defined stop", "Targeted resistance"],
        note: "Reaction trades only when structure is real.",
      },
      {
        pct: "286%",
        tag: "Breakout",
        symbol: "AIOZ / USD",
        tf: "1D",
        dates: "Nov 11–15, 2023",
        headline: "Explosive trend",
        bullets: ["Trend map clean", "Pressure built", "Trigger printed", "Rails projected"],
        note: "Great example for “permission gates” + targets.",
      },
      {
        pct: "30.4%",
        tag: "Close Short",
        symbol: "AI / USDT",
        tf: "4H",
        dates: "Feb 9–12, 2024",
        headline: "Pop < 4 days",
        bullets: ["Close Short cluster", "Support bounce", "Open Long aligned", "Exit reason shown"],
        note: "Signals behave as a system — not isolated arrows.",
      },
    ],
    []
  );

  return (
    <section
      className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white"
      id="profit-cases"
    >
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header */}
        <motion.div {...enter(1)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-5">
            <Kicker>Profit Cases</Kicker>

            <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,58px)]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Proof you can audit.
              </span>{" "}
              <span className="text-white/85">Each screenshot includes the “why”.</span>
            </h2>

            <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[980px]">
              Every case shows the market context, signal type, and the conditions that made it valid —
              so you learn the framework, not chase results.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <MiniMetric icon={<Layers className="h-4 w-4 text-emerald-300" />} label="On-chart proof" />
            <MiniMetric icon={<ShieldCheck className="h-4 w-4 text-emerald-300" />} label="Defined risk" />
            <MiniMetric icon={<Target className="h-4 w-4 text-emerald-300" />} label="Clear targets" />
            <MiniMetric icon={<TrendingUp className="h-4 w-4 text-emerald-300" />} label="Selective triggers" />
          </div>
        </motion.div>

        {/* ✅ Slider (4 per slide on xl) */}
        <motion.div {...enter(1, 0.05)} className="mt-10">
          <CasesSlider cases={cases} reduceMotion={reduceMotion} />
        </motion.div>

        <motion.div {...enter(-1, 0.06)} className="mt-10 text-xs text-white/45 max-w-[1100px]">
          Tip: Use real TradingView screenshots with B:PRO visible (cloud, labels, rails, S/Q).
          Show process. Avoid promising returns.
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
      if (w < 640) return 1;       // mobile
      if (w < 1024) return 2;      // tablet
      if (w < 1280) return 3;      // small desktop
      return 4;                    // xl+
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

function CasesSlider({ cases, reduceMotion }: { cases: any[]; reduceMotion: boolean }) {
  const perSlide = usePerSlide();
  const slides = useMemo(() => chunk(cases, perSlide), [cases, perSlide]);

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    // keep index valid when perSlide changes
    setIdx((p) => Math.min(p, Math.max(0, slides.length - 1)));
  }, [slides.length]);

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
    exit: (d: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : d * -18,
      filter: "blur(10px)",
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.45, ease: easePremium },
    }),
  };

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-white/45 tracking-widest uppercase">
          Slide {idx + 1} / {slides.length}
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
            className="relative p-4 sm:p-5 lg:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {slides[idx]?.map((c) => (
                <CaseTile key={`${c.symbol}-${c.dates}-${c.pct}`} item={c} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
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
            className={`h-2.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-emerald-300/70" : "w-2.5 bg-white/15 hover:bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
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

function MiniMetric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        {icon}
      </span>
      <div className="text-sm text-white/75 leading-tight font-semibold tracking-tight">{label}</div>
    </div>
  );
}

function CaseTile({ item }: { item: any }) {
  return (
    <div className="group rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
      <div className="relative rounded-[26px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
        {/* Screenshot */}
        <div className="relative h-[200px] bg-white/[0.02]">
          {/* Replace with:
              <img src={...} alt="Profit case" className="absolute inset-0 w-full h-full object-cover" />
          */}
          <div className="absolute inset-0 opacity-[0.10]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:52px_52px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <div className="text-white/70 text-sm">
              Screenshot placeholder
              <div className="text-white/45 text-xs mt-1">Drop the trade proof here</div>
            </div>
          </div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Pill tone="emerald">{item.tag}</Pill>
            <Pill>{item.tf}</Pill>
          </div>

          <div className="absolute right-3 top-3 text-right">
            <div className="text-[10px] text-white/45 tracking-widest uppercase">Result</div>
            <div className="text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                {item.pct}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/90 leading-tight">{item.symbol}</div>
              <div className="text-xs text-white/50 mt-1">{item.headline}</div>
            </div>

            <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] text-white/45">
              <Clock className="h-3.5 w-3.5" />
              {item.dates}
            </span>
          </div>

          <div className="space-y-2">
            {item.bullets.slice(0, 3).map((b: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-xs text-white/65">
                <span className="text-emerald-300/80">✓</span>
                <span className="leading-tight">{b}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-white/45">
            <span className="inline-flex items-center gap-2">
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-300/70" />
              Conditions &gt; hype
            </span>
            <span className="text-emerald-300/70 uppercase tracking-widest">case</span>
          </div>
        </div>

        {/* hover ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 38px rgba(16,185,129,0.12)" }}
        />
      </div>
    </div>
  );
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "emerald" }) {
  const tones =
    tone === "emerald"
      ? "text-emerald-100 border-emerald-400/20 bg-emerald-400/10"
      : "text-white/75 border-white/10 bg-white/[0.03]";
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase ${tones}`}>
      {children}
    </span>
  );
}
