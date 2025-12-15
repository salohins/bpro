import React, { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Zap, Gauge, TrendingUp, Sparkles, ArrowRight, Layers } from "lucide-react";

function ModeCard({ mode, index, reduceMotion }) {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 240, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 240, damping: 24, mass: 0.7 });

  const rotateY = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [7, -7]);

  const onMove = (e) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
      }
      viewport={{ once: false, amount: 0.35 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={reduceMotion ? {} : { y: -4 }}
      whileTap={{ scale: 0.985 }}
      className="group relative w-full overflow-hidden rounded-3xl"
    >
      {/* Frame */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${mode.frame}`} />
      <div className="absolute inset-[1px] rounded-3xl bg-[#070707]/80 backdrop-blur-xl border border-white/10" />

      {/* Blooms */}
      <div
        aria-hidden="true"
        className={`absolute -top-24 -right-20 w-[320px] h-[320px] rounded-full blur-[90px] opacity-30 ${mode.bloom}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -bottom-28 -left-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-22 ${mode.bloom2}`}
      />

      {/* Micro grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      {/* Sheen (only visible on hover) */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 7.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={reduceMotion ? {} : { rotate: 8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`relative grid place-items-center w-12 h-12 rounded-2xl border border-white/10 ${mode.iconBg}`}
            >
              <div className={`absolute inset-0 rounded-2xl opacity-40 blur-xl ${mode.iconGlow}`} />
              <div className="relative">{mode.icon}</div>
            </motion.div>

            <div className="leading-tight">
              <h3
                className={`text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${mode.title}`}
              >
                {mode.titleText}
              </h3>
              <p className="text-[11px] text-white/50 tracking-widest uppercase mt-1">
                {mode.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-white/45 tracking-widest uppercase">Velocity</span>
            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${mode.intensityBar}`}
                initial={{ width: 0 }}
                whileInView={{ width: mode.intensityWidth }}
                transition={
                  reduceMotion
                    ? { duration: 0.01 }
                    : { duration: 0.9, delay: 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }
                }
                viewport={{ once: false, amount: 0.35 }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* tighter bullets (less “wall of text”) */}
        <ul className="mt-5 space-y-2.5 text-sm text-white/70">
          {mode.bullets.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-2 inline-block w-1.5 h-1.5 rounded-full ${mode.dot}`} />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-white/45">
            Best for <span className="text-white/70">{mode.timeframe}</span>
          </span>

          <span
            className={`text-xs font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${mode.title}`}
          >
            Explore →
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(16,185,129,0.10)",
        }}
      />
    </motion.article>
  );
}

export default function TradeModes() {
  const reduceMotion = useReducedMotion();

  const modes = useMemo(
    () => [
      {
        titleText: "Short Mode",
        subtitle: "Scalp velocity",
        timeframe: "5m–30m",
        title: "from-red-300 via-red-200 to-pink-200",
        frame: "from-red-500/30 via-white/8 to-pink-500/22",
        bloom: "bg-red-500/26",
        bloom2: "bg-pink-500/22",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-red-500/25",
        dot: "bg-red-300",
        intensityBar: "bg-gradient-to-r from-red-400 to-pink-300",
        intensityWidth: "85%",
        icon: <Zap className="w-6 h-6 text-red-300" />,
        bullets: ["Fast entries, quick exits", "Tighter ATR + faster EMAs", "Higher frequency"],
      },
      {
        titleText: "Mid Mode",
        subtitle: "Balanced control",
        timeframe: "1H–4H",
        title: "from-emerald-200 via-teal-200 to-cyan-200",
        frame: "from-emerald-400/30 via-white/8 to-cyan-400/22",
        bloom: "bg-emerald-500/24",
        bloom2: "bg-cyan-500/16",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-emerald-500/22",
        dot: "bg-emerald-300",
        intensityBar: "bg-gradient-to-r from-emerald-300 to-cyan-200",
        intensityWidth: "60%",
        icon: <Gauge className="w-6 h-6 text-emerald-200" />,
        bullets: ["Most versatile mode", "Moderate strictness", "Adaptive stops"],
      },
      {
        titleText: "Long Mode",
        subtitle: "Trend stability",
        timeframe: "Daily–Weekly",
        title: "from-blue-200 via-indigo-200 to-purple-200",
        frame: "from-blue-500/26 via-white/8 to-purple-500/22",
        bloom: "bg-blue-500/20",
        bloom2: "bg-purple-500/20",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-blue-500/20",
        dot: "bg-blue-200",
        intensityBar: "bg-gradient-to-r from-blue-300 to-purple-200",
        intensityWidth: "40%",
        icon: <TrendingUp className="w-6 h-6 text-blue-200" />,
        bullets: ["Swing & position trading", "Slower structure bias", "Max stability"],
      },
    ],
    []
  );

  return (
    <section className="relative w-full py-24 md:py-28 bg-transparent text-white" id="trade-modes">
      {/* ✅ background can bleed into adjacent sections (no abrupt end) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -bottom-28 left-0 right-0 bg-[radial-gradient(circle_at_50%_18%,rgba(16,185,129,0.10),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      {/* ✅ same width system as your other sections */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        {/* Header (shorter + correlated) */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                Trade Modes
              </span>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[11px] tracking-[0.18em] uppercase text-white/55">
              <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
              Same engine, different pacing
            </span>
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.06]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.22)]">
              Pick the tempo.
            </span>{" "}
            <span className="text-white/80">B:PRO adapts the logic.</span>
          </h2>

          <p className="mt-4 text-white/70 text-lg leading-relaxed">
            Correlation: after structure + filters + scoring, choose a mode to match your timeframe —
            without changing your process.
          </p>

          <div className="mt-4 text-xs text-white/45 flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
            Short = faster signals • Mid = default • Long = stability
          </div>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {modes.map((mode, i) => (
            <ModeCard key={mode.titleText} mode={mode} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>

        {/* Footer hint row (clean) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.35 }}
          className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/45"
        >
          <span>Tip: choose a mode that matches your patience — not your ego.</span>
          <span className="text-white/55">Mode adjusts filters + exits automatically.</span>
        </motion.div>
      </div>
    </section>
  );
}
