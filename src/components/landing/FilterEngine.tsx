import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Check,
  Sparkles,
  SlidersHorizontal,
  X,
  ChevronDown,
  Layers,
  ArrowRight,
} from "lucide-react";

// ✅ add your TradingView overlay screenshots here
import tvFilter1 from "../../assets/tv-filter-1.png";
import tvFilter2 from "../../assets/tv-filter-2.png";
import tvFilter3 from "../../assets/tv-filter-3.png";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function FilterEngine() {
  const shouldReduceMotion = useReducedMotion();

  const filters = useMemo(
    () => [
      { category: "Momentum", items: ["MACD Filter", "RSI Filter", "Stoch RSI Filter"] },
      { category: "Volatility", items: ["Bollinger Filter", "Squeeze Detection"] },
      { category: "Trend", items: ["Ichimoku Filter", "ADX Filter", "HTF Levels"] },
      { category: "Volume", items: ["Volume Filter", "OBV Filter"] },
      { category: "Positioning", items: ["VWAP Filter", "Market Sentiment"] },
      { category: "Icons", items: ["Pump/Dump", "Continuation", "Reversal", "RSI Divergence Arrows"] },
    ],
    []
  );

  const totalItems = useMemo(() => filters.reduce((acc, g) => acc + g.items.length, 0), [filters]);

  const tvOverlays = useMemo(
    () => [
      { title: "Overlay 01", subtitle: "Momentum filter overlays", src: tvFilter1, alt: "TradingView overlay - Momentum filters" },
      { title: "Overlay 02", subtitle: "Trend + structure overlays", src: tvFilter2, alt: "TradingView overlay - Trend and structure filters" },
      { title: "Overlay 03", subtitle: "Volatility / signals overlays", src: tvFilter3, alt: "TradingView overlay - Volatility and signals" },
    ],
    []
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(0);

  // ✅ Single-open accordion
  const [openGroup, setOpenGroup] = useState<string | null>(filters?.[0]?.category ?? null);
  const toggleGroup = (cat: string) => setOpenGroup((prev) => (prev === cat ? null : cat));

  // tilt
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.7 });

  const rotateY = useTransform(sx, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [7, -7]);

  const onMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // ✅ deterministic background chart
  const bgChart = useMemo(() => {
    const W = 1200;
    const H = 600;
    const N = 160;

    const pts = Array.from({ length: N }).map((_, i) => {
      const t = i / (N - 1);
      const x = t * W;

      const base = 320;
      const wave1 = Math.sin(t * Math.PI * 2.2) * 70;
      const wave2 = Math.sin(t * Math.PI * 9.5 + 0.7) * 18;
      const trend = (t - 0.5) * 120;
      const spike = i > 118 ? (i - 118) * 2.2 : 0;

      const y = base + wave1 + wave2 - trend - spike;
      return { x, y: Math.max(70, Math.min(H - 70, y)) };
    });

    const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const areaD = `${lineD} L ${W} ${H} L 0 ${H} Z`;

    const C = 64;
    const step = W / (C + 2);
    const candles = Array.from({ length: C }).map((_, i) => {
      const x = (i + 1.5) * step;

      const t = i / (C - 1);
      const center = 340 - (t - 0.5) * 110 + Math.sin(t * 8.2) * 28;
      const body = 10 + ((i * 13) % 18);
      const dir = i % 3 === 0 ? -1 : 1;

      const open = center + dir * (body * 0.35);
      const close = center - dir * (body * 0.35);

      const wick = 18 + ((i * 9) % 22);
      const high = Math.min(open, close) - wick;
      const low = Math.max(open, close) + wick;

      return {
        x,
        open,
        close,
        high,
        low,
        up: close < open,
        w: Math.max(6, step * 0.38),
      };
    });

    return { W, H, lineD, areaD, candles };
  }, []);

  const openPreview = (idx = 0) => {
    setActiveOverlay(idx);
    setPreviewOpen(true);
  };

  return (
    <section className="relative w-full py-24 md:py-28 bg-transparent text-white" id="filter-engine">
      {/* ✅ background can bleed into neighboring sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-28 -bottom-28 bg-[radial-gradient(circle_at_55%_12%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>

        {/* chart layer */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.svg
            viewBox={`0 0 ${bgChart.W} ${bgChart.H}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: 0.55 }}
          >
            <defs>
              <linearGradient id="bgLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.0" />
                <stop offset="35%" stopColor="#00ffcc" stopOpacity="0.55" />
                <stop offset="65%" stopColor="#00ffaa" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="bgArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ffaa" stopOpacity="0.18" />
                <stop offset="55%" stopColor="#00ffaa" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
              </linearGradient>

              <filter id="bgGlow">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g style={{ filter: "url(#bgGlow)" }} opacity="0.45">
              <path d={bgChart.areaD} fill="url(#bgArea)" opacity="0.30" />
              <motion.path
                d={bgChart.lineD}
                fill="none"
                stroke="url(#bgLine)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="10 10"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -200] }}
                transition={shouldReduceMotion ? {} : { duration: 8, repeat: Infinity, ease: "linear" }}
                opacity="0.85"
              />
              <g opacity="0.40">
                {bgChart.candles.map((c, i) => {
                  const yTop = Math.min(c.open, c.close);
                  const yBot = Math.max(c.open, c.close);
                  const col = c.up ? "#00ffaa" : "#ff4d6d";
                  return (
                    <g key={i} opacity={0.9}>
                      <line x1={c.x} x2={c.x} y1={c.high} y2={c.low} stroke={col} strokeOpacity="0.30" strokeWidth="1.2" />
                      <rect
                        x={c.x - c.w / 2}
                        y={yTop}
                        width={c.w}
                        height={Math.max(6, yBot - yTop)}
                        rx="2"
                        fill={col}
                        fillOpacity="0.12"
                        stroke={col}
                        strokeOpacity="0.22"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </g>
            </g>
          </motion.svg>
        </div>
      </div>

      {/* ✅ same width as your other premium sections */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT — tighter, no sticky scroll */}
          <motion.div
            initial={{ opacity: 0, x: -18, y: 6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }}
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                  Engine 2 • Confluence
                </span>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[11px] tracking-[0.18em] uppercase text-white/55">
                <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                Permission gates
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.20)]">
                The filter engine decides if trading is allowed.
              </span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Momentum, volatility, trend and volume act as <span className="text-white/85 font-semibold">permission gates</span>.
              Signals don’t print unless conditions line up with structure.
            </p>

            <div className="flex flex-wrap gap-2">
              <MiniPill icon={<SlidersHorizontal className="w-4 h-4 text-emerald-300" />} text={`${totalItems}+ modules`} />
              <MiniPill icon={<Check className="w-4 h-4 text-emerald-300" />} text="Sentiment modes" />
              <MiniPill icon={<Check className="w-4 h-4 text-emerald-300" />} text="Per-filter toggles" />
            </div>

            {/* overlays */}
            <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
              <div className="rounded-[28px] bg-[#0b0b0b]/70 backdrop-blur-xl border border-white/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-white/90">TradingView overlays</div>
                    <div className="text-xs text-white/50">Tap to zoom (clean screenshots win)</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openPreview(0)}
                    className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-2 text-xs text-white/75 transition-colors"
                  >
                    Preview
                  </button>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-3 gap-2">
                    {tvOverlays.map((img, idx) => (
                      <button
                        key={img.title}
                        type="button"
                        onClick={() => openPreview(idx)}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                        aria-label={`Open ${img.title}`}
                      >
                        <div className="relative aspect-[16/10]">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-white/45 flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
                    Correlation: structure shows where → filters decide if it’s worth acting.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — panel (tilt stays premium) */}
          <motion.div
            initial={{ opacity: 0, x: 18, y: 6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium, delay: 0.03 }}
            viewport={{ once: false, amount: 0.25 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="lg:col-span-7 min-w-0"
          >
            <div className="w-full rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/25 via-white/10 to-emerald-500/15">
              <div
                ref={panelRef}
                className="w-full rounded-[30px] overflow-hidden bg-[#0b0b0b]/75 backdrop-blur-xl border border-white/10"
              >
                {/* Header */}
                <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="leading-tight">
                      <h3 className="font-semibold text-white/90">B:PRO Filters</h3>
                      <p className="text-xs text-white/50">Pick what you want to validate</p>
                    </div>
                  </div>
                  <div className="text-xs text-white/50 tracking-widest uppercase">Live</div>
                </div>

                {/* Body */}
                <div className="px-6 md:px-7 py-5 space-y-3">
                  {filters.map((group) => {
                    const isOpen = openGroup === group.category;

                    return (
                      <div key={group.category} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.category)}
                          aria-expanded={isOpen}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="text-emerald-300 text-xs font-semibold uppercase tracking-[0.22em]">
                              {group.category}
                            </div>
                            <span className="text-[11px] text-white/45 shrink-0">{group.items.length} modules</span>
                          </div>

                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="shrink-0"
                          >
                            <ChevronDown className="w-4 h-4 text-white/55" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                              animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                              exit={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4">
                                <ul role="list" className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                                  {group.items.map((item) => (
                                    <motion.li
                                      key={item}
                                      whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.01 }}
                                      whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                                      transition={{ duration: 0.16, ease: "easeOut" }}
                                      className="group relative flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-400/20 min-w-0"
                                    >
                                      <div className="relative w-8 h-8 rounded-lg border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center shrink-0">
                                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-emerald-400/10 transition-opacity" />
                                        <Check className="w-4 h-4 text-emerald-300" />
                                      </div>

                                      <span className="text-sm text-white/75 group-hover:text-white/90 transition-colors min-w-0 truncate">
                                        {item}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-1">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="pt-4 flex items-center justify-between text-xs text-white/45">
                    <span>Signals = structure + permission</span>
                    <span className="text-emerald-300/70">v2</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Modal preview */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewOpen(false)} />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-xl"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">TradingView filter overlays</div>
                  <div className="text-xs text-white/50 truncate">{tvOverlays[activeOverlay]?.subtitle}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-2 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white/75" />
                </button>
              </div>

              <div className="p-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="relative w-full max-h-[72vh] grid place-items-center">
                    <img
                      src={tvOverlays[activeOverlay]?.src}
                      alt={tvOverlays[activeOverlay]?.alt}
                      draggable={false}
                      className="w-full h-auto max-h-[72vh] object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                  </div>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {tvOverlays.map((img, idx) => (
                    <button
                      key={img.title}
                      type="button"
                      onClick={() => setActiveOverlay(idx)}
                      className={`shrink-0 rounded-xl border px-3 py-2 text-xs transition-colors ${
                        idx === activeOverlay
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                      }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-xs text-white/45">
                  Tip: Clean screenshots = better trust. Keep it minimal so overlays read instantly.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- tiny atoms ---------------- */

function MiniPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white/78">
      {icon}
      <span className="tracking-tight">{text}</span>
    </span>
  );
}
