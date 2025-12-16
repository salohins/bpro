import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Target,
  Shield,
  Plus,
  Circle,
  X,
  Diamond,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

import breakoutImg from "../../assets/breakout.png";
import breakoutLogicImg from "../../assets/breakoutLogic.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function BreakoutFramework() {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);

  // ✅ full signal legend (colors exactly as you listed)
  const signalLegend = useMemo(
    () => [
      {
        key: "open-long",
        title: "Open Long",
        desc: "Long entry trigger",
        tone: "emerald",
        icon: <ArrowUpRight className="h-4 w-4 text-emerald-300" />,
      },
      {
        key: "open-short",
        title: "Open Short",
        desc: "Short entry trigger",
        tone: "red",
        icon: <ArrowDownRight className="h-4 w-4 text-red-300" />,
      },
      {
        key: "breakout",
        title: "Breakout",
        desc: "Breaks out of range",
        tone: "neutral",
        icon: <ArrowUp className="h-4 w-4 text-white/80" />,
      },
      {
        key: "breakdown",
        title: "Breakdown",
        desc: "Breaks down from range",
        tone: "yellow",
        icon: <ArrowDown className="h-4 w-4 text-yellow-300" />,
      },
      {
        key: "close-long",
        title: "Close Long",
        desc: "Long exit / take profit",
        tone: "blue",
        icon: <Diamond className="h-4 w-4 text-blue-300" />,
      },
      {
        key: "close-short",
        title: "Close Short",
        desc: "Short exit / take profit",
        tone: "orange",
        icon: <Diamond className="h-4 w-4 text-orange-300" />,
      },
      {
        key: "cross-up",
        title: "Cross Up",
        desc: "Bullish cross marker",
        tone: "emerald",
        icon: <X className="h-4 w-4 text-emerald-300" />,
      },
      {
        key: "cross-down",
        title: "Cross Down",
        desc: "Bearish cross marker",
        tone: "red",
        icon: <X className="h-4 w-4 text-red-300" />,
      },
      {
        key: "squeeze-down",
        title: "Squeeze Down",
        desc: "Compression / move loading",
        tone: "neutral",
        icon: <Plus className="h-4 w-4 text-white/80" />,
      },
      {
        key: "bull-cont",
        title: "Bull Continuation",
        desc: "Trend continuation (bull)",
        tone: "emerald",
        icon: <Circle className="h-4 w-4 text-emerald-300" />,
      },
      {
        key: "bear-cont",
        title: "Bear Continuation",
        desc: "Trend continuation (bear)",
        tone: "red",
        icon: <Circle className="h-4 w-4 text-red-300" />,
      },
      {
        key: "long-invalid",
        title: "Long Invalidated",
        desc: "Long setup invalidation",
        tone: "purple",
        icon: <Circle className="h-4 w-4 text-purple-200" />,
      },
      {
        key: "short-invalid",
        title: "Short Invalidated",
        desc: "Short setup invalidation",
        tone: "purple",
        icon: <Circle className="h-4 w-4 text-purple-200" />,
      },
    ],
    []
  );

  const slides = useMemo(
    () => [
      {
        key: "entry",
        label: "Step 3 • Execution",
        title: "Breakout Framework",
        headline: "Precision Entry Detection",
        sub:
          "Structure gives direction. Filters give permission. This is where you execute — only on clean reactions.",
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            {/* LEFT — main image */}
            <div className="lg:col-span-7 w-full">
              <MediaFrame
                src={breakoutImg}
                alt="Breakout example: consolidation into reaction lines"
                loading="eager"
                heightClass="h-[300px] sm:h-[360px] lg:h-[460px]"
                fit="cover"
                reduceMotion={reduceMotion}
              >
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <TagChip>Consolidation</TagChip>
                  <TagChip tone="emerald">Wait for reaction</TagChip>
                </div>

                <div className="absolute left-5 right-5 bottom-5">
                  <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                    <div className="text-sm text-white/70 leading-relaxed">
                      Enter on <span className="text-white/85 font-semibold">fast-line touch</span>{" "}
                      only after <span className="text-white/85 font-semibold">bias + pressure</span>{" "}
                      agree. Stop below <span className="text-white/85 font-semibold">mid line</span>.
                    </div>
                  </Glass>
                </div>
              </MediaFrame>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill icon={<Target className="w-4 h-4 text-emerald-200/90" />}>Bias aligned</Pill>
                <Pill icon={<Sparkles className="w-4 h-4 text-white/80" />}>Pressure context</Pill>
                <Pill icon={<Shield className="w-4 h-4 text-emerald-200/90" />}>Fast entry / mid stop</Pill>
              </div>
            </div>

            {/* RIGHT — short cards */}
            <div className="lg:col-span-5 w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <FeatureCard
                  reduceMotion={reduceMotion}
                  delay={0.05}
                  tone="emerald"
                  icon={<ArrowUpRight className="w-5 h-5 text-emerald-300" />}
                  title="Long archetype"
                  items={["Bull bias holds", "Reaction confirms", "Trigger prints"]}
                />
                <FeatureCard
                  reduceMotion={reduceMotion}
                  delay={0.1}
                  tone="red"
                  icon={<ArrowDownRight className="w-5 h-5 text-red-300" />}
                  title="Short archetype"
                  items={["Bear bias holds", "Support breaks", "Expansion follows"]}
                />
              </div>

              <Glass className="rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <IconBox tone="emerald">
                    <Layers className="w-4 h-4 text-emerald-300" />
                  </IconBox>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white/90">Correlation</div>
                    <div className="mt-1 text-sm text-white/65 leading-relaxed">
                      <span className="text-white/80 font-semibold">Structure</span> defines direction →{" "}
                      <span className="text-white/80 font-semibold">Filters</span> allow trading →{" "}
                      <span className="text-white/80 font-semibold">Execution</span> triggers on reaction.
                    </div>
                  </div>
                </div>
              </Glass>

              <div className="text-xs text-white/45">
                Rule: if fast &amp; mid disagree — you wait. Skipping mid-quality setups is the edge.
              </div>
            </div>
          </div>
        ),
      },

      {
        key: "logic",
        label: "Icon Language",
        title: "Breakout Logic",
        headline: "Read signals like a system",
        sub:
          "Instead of “more arrows”, you get context cues — squeeze, invalidation, continuation — at reaction zones.",
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            {/* LEFT — logic image */}
            <div className="lg:col-span-7 w-full">
              <CinematicImage
                src={breakoutLogicImg}
                alt="Breakout Logic screenshot showing squeeze, invalidation and continuation icons"
                tags={[
                  { text: "Real signal context" },
                  { text: "Mid mode / 15m", tone: "emerald" },
                ]}
                caption="Use the icons at reaction zones to reduce guesswork."
                reduceMotion={reduceMotion}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill icon={<Plus className="w-4 h-4 text-white/80" />}>Squeeze</Pill>
                <Pill icon={<Circle className="w-4 h-4 text-purple-200" />}>Invalidation</Pill>
                <Pill icon={<X className="w-4 h-4 text-emerald-200" />}>Continuation</Pill>
                <Pill icon={<Target className="w-4 h-4 text-emerald-200/90" />}>Pivot zone</Pill>
              </div>
            </div>

            {/* RIGHT — FULL legend */}
            <div className="lg:col-span-5 w-full space-y-4 lg:pl-6 lg:border-l lg:border-white/10">
              <div className="text-sm text-white/70 leading-relaxed">
                This is your complete{" "}
                <span className="text-white/85 font-semibold">signal language</span>. Same icons, same colors —
                so you can read the chart instantly.
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">Signal Legend</div>
                  <div className="text-[11px] text-white/45 tracking-widest uppercase">All signals</div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {signalLegend.map((s) => (
                      <LegendRow
                        key={s.key}
                        icon={<IconBox tone={s.tone}>{s.icon}</IconBox>}
                        title={s.title}
                        desc={s.desc}
                      />
                    ))}
                  </div>

                  <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-3 text-xs text-white/45">
                    Tip: if the icon prints away from reaction zones, ignore it. Context &gt; symbols.
                  </div>
                </div>
              </div>

              <Glass className="rounded-2xl p-5">
                <div className="text-sm text-white/70 leading-relaxed">
                  When you see <span className="text-white/85 font-semibold">squeeze</span> +{" "}
                  <span className="text-white/85 font-semibold">structure</span> +{" "}
                  <span className="text-white/85 font-semibold">permission</span>, you’re not guessing —
                  you’re executing a framework.
                </div>
              </Glass>

              <div className="text-xs text-white/45">
                Optional overlay labels can be turned on/off for cleaner charts.
              </div>
            </div>
          </div>
        ),
      },
    ],
    [reduceMotion, signalLegend]
  );

  const current = slides[idx];

  const wrap = (n) => (n + slides.length) % slides.length;
  const go = (dir) => setIdx((v) => wrap(v + dir));

  return (
    <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-32 -bottom-32 bg-[radial-gradient(circle_at_55%_12%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <SectionShell>
          {/* Header */}
          <div className="px-6 md:px-8 pt-7 md:pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Kicker>Engine 3 • Signal &amp; Execution</Kicker>
                  <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] uppercase text-white/55">
                    {current.label}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                    {current.headline}
                  </span>
                </h2>

                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                  {current.sub}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 pb-1">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-white/80" />
                </button>

                <button
                  type="button"
                  onClick={() => go(1)}
                  className="inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-5 flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={[
                    "h-2 rounded-full transition-all",
                    i === idx ? "w-8 bg-emerald-300/70" : "w-2 bg-white/20 hover:bg-white/30",
                  ].join(" ")}
                  aria-label={`Go to ${s.title}`}
                />
              ))}
            </div>
          </div>

          {/* Slider body */}
          <div className="px-6 md:px-8 pt-7 md:pt-8 pb-7 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={reduceMotion ? { duration: 0.01 } : { duration: 0.65, ease: easePremium }}
                drag={reduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (reduceMotion) return;
                  const t = 70;
                  if (info.offset.x > t) go(-1);
                  if (info.offset.x < -t) go(1);
                }}
              >
                {current.content}
              </motion.div>
            </AnimatePresence>

            <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
              <span>Execution workflow • visual guide</span>
              <span className="text-emerald-300/70">swipe / arrows</span>
            </div>
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

/* ===================== Atoms ===================== */

function SectionShell({ children }) {
  return (
    <div className="w-full rounded-[34px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
      <div className="w-full rounded-[34px] overflow-hidden bg-[#0b0b0b]/72 backdrop-blur-xl border border-white/10">
        {children}
      </div>
    </div>
  );
}

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

function MediaFrame({
  src,
  alt,
  heightClass = "h-[320px] sm:h-[380px] lg:h-[520px]",
  fit = "cover",
  loading = "lazy",
  reduceMotion = false,
  children,
}) {
  const imgClass = fit === "contain" ? "object-contain p-3" : "object-cover object-center";

  return (
    <Glass className="overflow-hidden">
      <div className={`relative ${heightClass} bg-black/20`}>
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full ${imgClass}`}
          loading={loading}
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.18),transparent_55%)]" />

        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.30\'/%3E%3C/svg%3E")',
          }}
        />

        {children}

        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.055 }}
        />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
    </Glass>
  );
}

function CinematicImage({ src, alt, tags = [], caption, reduceMotion }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10">
      <div className="relative h-[300px] sm:h-[360px] lg:h-[460px]">
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.18),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.30\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <TagChip key={i} tone={t.tone || "neutral"}>
              {t.text}
            </TagChip>
          ))}
        </div>

        {caption && (
          <div className="absolute left-5 right-5 bottom-5">
            <Glass className="rounded-2xl bg-black/35 px-4 py-3">
              <div className="text-sm text-white/70 leading-relaxed">{caption}</div>
            </Glass>
          </div>
        )}

        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.05 }}
        />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>
    </div>
  );
}

function Kicker({ children }) {
  return (
    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">{children}</span>
    </div>
  );
}

function TagChip({ children, tone = "neutral" }) {
  const tones =
    tone === "emerald"
      ? "text-emerald-100 border-emerald-400/20 bg-emerald-400/10"
      : "text-white/85 border-white/10 bg-black/30";
  return (
    <span className={`text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-md ${tones}`}>
      {children}
    </span>
  );
}

function Pill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
      {icon}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}

function IconBox({ children, tone = "neutral" }) {
  const toneMap = {
    neutral: "bg-white/[0.03] border-white/10",
    emerald: "bg-emerald-400/10 border-emerald-400/20",
    red: "bg-red-500/10 border-red-400/20",
    purple: "bg-purple-400/10 border-purple-400/20",
    yellow: "bg-yellow-400/10 border-yellow-400/20",
    blue: "bg-blue-400/10 border-blue-400/20",
    orange: "bg-orange-400/10 border-orange-400/20",
  };
  return (
    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${toneMap[tone] || toneMap.neutral}`}>
      {children}
    </span>
  );
}

function FeatureCard({ reduceMotion, delay = 0, tone = "emerald", icon, title, items }) {
  const checkColor = tone === "red" ? "text-red-300/80" : "text-emerald-300/80";
  const iconTone = tone === "red" ? "red" : "emerald";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, delay, ease: easePremium }}
      className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:bg-white/[0.05] transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <IconBox tone={iconTone}>{icon}</IconBox>
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      </div>

      <ul className="text-white/70 space-y-2 text-sm leading-relaxed">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className={checkColor}>✓</span> {t}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function LegendRow({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-sm text-white/85 font-semibold leading-tight">{title}</div>
        <div className="mt-1 text-sm text-white/65 leading-tight">{desc}</div>
      </div>
    </div>
  );
}
