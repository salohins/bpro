import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

type FilterGroup = { category: string; items: string[] };
type Overlay = { title: string; subtitle: string; src: string; alt: string };

export default function FilterEngine() {
  const shouldReduceMotion = useReducedMotion();

  const filters = useMemo<FilterGroup[]>(
    () => [
      { category: "Momentum", items: ["MACD Filter", "RSI Filter", "Stoch RSI Filter"] },
      { category: "Volatility", items: ["Bollinger Filter", "Squeeze Detection"] },
      { category: "Trend", items: ["Ichimoku Filter", "ADX Filter", "HTF Levels"] },
      { category: "Volume", items: ["Volume Filter", "OBV Filter"] },
      { category: "Positioning", items: ["VWAP Filter", "Market Sentiment"] },
    ],
    []
  );

  const totalItems = useMemo(
    () => filters.reduce((acc, g) => acc + g.items.length, 0),
    [filters]
  );

  const tvOverlays = useMemo<Overlay[]>(
    () => [
      {
        title: "Overlay 01",
        subtitle: "Momentum filter overlays",
        src: tvFilter1,
        alt: "TradingView overlay - Momentum filters",
      },
      {
        title: "Overlay 02",
        subtitle: "Trend + structure overlays",
        src: tvFilter2,
        alt: "TradingView overlay - Trend and structure filters",
      },
      {
        title: "Overlay 03",
        subtitle: "Volatility / signals overlays",
        src: tvFilter3,
        alt: "TradingView overlay - Volatility and signals",
      },
    ],
    []
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(0);

  // ✅ Single-open accordion
  const [openGroup, setOpenGroup] = useState<string | null>(
    filters?.[0]?.category ?? null
  );

  const toggleGroup = useCallback((cat: string) => {
    setOpenGroup((prev) => (prev === cat ? null : cat));
  }, []);

  const openPreview = useCallback((idx = 0) => {
    setActiveOverlay(idx);
    setPreviewOpen(true);
  }, []);

  // ✅ selected modules (fast + scalable)
  // ✅ selected modules (ACTIVE by default)
  const [selected, setSelected] = useState<Set<string>>(() => {
    const init = new Set<string>();
    for (const g of filters) {
      for (const item of g.items) {
        init.add(`${g.category}::${item}`);
      }
    }
    return init;
  });

  // ✅ toggle a module by id
  const toggleItem = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <section
      className="relative w-full py-24 md:py-28 bg-transparent text-white"
      id="filter-engine"
    >

      {/* ✅ same width as your other premium sections */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -18, y: 6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: 0.85, ease: easePremium }
            }
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2">
              <div className="inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                  Engine 2 • Confluence
                </span>
              </div>

              <span className="inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[11px] tracking-[0.18em] uppercase text-white/55">
                <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                Permission gates
              </span>
            </div>


            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.20)]">
                Filter Engine Decides if Trading Conditions are Met.
              </span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Momentum, volatility, trend and volume act as{" "}
              <span className="text-white/85 font-semibold">permission gates</span>.
              Signals don’t print unless conditions line up with structure.
            </p>

            {/* MiniPills row (single line on mobile) + edge fade */}
            <div className="relative mt-2">
              {/* left fade */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 sm:hidden
      bg-gradient-to-r from-[#0b0b0b] to-transparent"
              />
              {/* right fade */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:hidden
      bg-gradient-to-l from-[#0b0b0b] to-transparent"
              />

              <div
                className={[
                  "flex gap-2",
                  "overflow-x-auto sm:overflow-visible",
                  "whitespace-nowrap sm:whitespace-normal",
                  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  "pl-2 pr-12 sm:pl-0 sm:pr-0", // ✅ keeps pills readable under fades
                  "py-1",
                ].join(" ")}
              >
                <MiniPill
                  icon={<SlidersHorizontal className="w-4 h-4 text-emerald-300" />}
                  text={`${totalItems}+ modules`}
                />
                <MiniPill icon={<Check className="w-4 h-4 text-emerald-300" />} text="Sentiment modes" />
                <MiniPill icon={<Check className="w-4 h-4 text-emerald-300" />} text="Per-filter toggles" />
              </div>
            </div>




            {/* overlays */}
            <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
              <div className="rounded-[28px] bg-[#0b0b0b]/70 backdrop-blur-xl border border-white/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-white/90">
                      TradingView overlays
                    </div>
                    <div className="text-xs text-white/50">
                      Tap to zoom (clean screenshots win)
                    </div>
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

          {/* RIGHT — panel (NO 3D / NO tilt) */}
          <motion.div
            initial={{ opacity: 0, x: 18, y: 6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: 0.85, ease: easePremium, delay: 0.03 }
            }
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-7 min-w-0"
          >
            <div className="w-full rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/25 via-white/10 to-emerald-500/15">
              <div className="w-full rounded-[30px] overflow-hidden bg-[#0b0b0b]/75 backdrop-blur-xl border border-white/10">
                {/* Header */}
                <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="leading-tight">
                      <h3 className="font-semibold text-white/90">B:PRO Filters</h3>
                      <p className="text-xs text-white/50">
                        Pick what you want to validate
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 md:px-7 py-5 space-y-3">
                  {filters.map((group) => (
                    <AccordionGroup
                      key={group.category}
                      group={group}
                      isOpen={openGroup === group.category}
                      toggleGroup={toggleGroup}
                      selected={selected}
                      toggleItem={toggleItem}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-1">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="pt-4 flex items-center justify-between text-xs text-white/45">
                    <span>Signals = structure + permission</span>
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
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setPreviewOpen(false)}
            />

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
                  <div className="text-sm font-semibold text-white/90">
                    TradingView filter overlays
                  </div>
                  <div className="text-xs text-white/50 truncate">
                    {tvOverlays[activeOverlay]?.subtitle}
                  </div>
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
                      className={`shrink-0 rounded-xl border px-3 py-2 text-xs transition-colors ${idx === activeOverlay
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- performance: fast accordion + real toggles ---------------- */

const AccordionGroup = React.memo(function AccordionGroup({
  group,
  isOpen,
  toggleGroup,
  selected,
  toggleItem,
}: {
  group: FilterGroup;
  isOpen: boolean;
  toggleGroup: (cat: string) => void;
  selected: Set<string>;
  toggleItem: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
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

        <span
          className={`shrink-0 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        >
          <ChevronDown className="w-4 h-4 text-white/55" />
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          {/* ✅ spacing between headline and items */}
          <div className="px-4 pt-3 pb-4">
            <ul role="list" className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {group.items.map((item) => {
                const id = `${group.category}::${item}`;
                const isChecked = selected.has(id);

                return (
                  <li key={id} className="min-w-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleItem(id);
                      }}
                      className={[
                        "w-full text-left group relative flex items-center gap-2 rounded-xl px-3 py-2 min-w-0",
                        "border bg-white/[0.02]",
                        "transition-transform transition-colors duration-150 ease-out",
                        "hover:bg-white/[0.05] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]",
                        isChecked
                          ? "border-emerald-400/30"
                          : "border-white/10 hover:border-emerald-400/20",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                          isChecked
                            ? "border-emerald-400/40 bg-emerald-400/15"
                            : "border-emerald-400/25 bg-emerald-400/10",
                        ].join(" ")}
                      >
                        <Check
                          className={[
                            "w-4 h-4 text-emerald-300 transition-opacity duration-150",
                            isChecked ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                        />
                      </div>

                      <span className="text-sm text-white/75 group-hover:text-white/90 transition-colors min-w-0 truncate">
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});


/* ---------------- tiny atoms ---------------- */

function MiniPill({ icon, text }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80">
      {icon}
      <span className="tracking-tight">{text}</span>
    </span>
  );
}

