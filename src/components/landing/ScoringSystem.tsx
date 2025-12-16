import React, { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Star,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  Layers,
} from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function ScoringSystem() {
  const reduceMotion = useReducedMotion();

  const lastSignals = useMemo(
    () => [
      { type: "Breakout", safety: "3/3", quality: "2/3" },
      { type: "Continuation", safety: "3/3", quality: "2/3" },
      { type: "Cross Up", safety: "3/3", quality: "2/3" },
      { type: "Cross Down", safety: "3/3", quality: "2/3" },
      { type: "Breakout", safety: "3/3", quality: "2/3" },
    ],
    []
  );

  const showHudPanel = true;

  return (
    <section
      className="relative w-full py-22 md:py-24 bg-transparent text-white"
      id="scoring-system"
    >
      {/* ✅ background that can bleed into neighbor sections (no abrupt cut) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -bottom-28 left-0 right-0 bg-[radial-gradient(circle_at_55%_14%,rgba(16,185,129,0.12),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      {/* ✅ match the same width as other premium sections */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT — shorter, calmer */}
          <motion.div
            initial={{ opacity: 0, x: -18, y: 6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }
            }
            viewport={{ once: false, amount: 0.35 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge icon={<Sparkles className="w-4 h-4 text-emerald-300" />}>
                Engine 3 • Selectivity
              </Badge>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[11px] tracking-[0.18em] uppercase text-white/55">
                <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                Rank setups
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.20)]">
                Score the decision.
              </span>{" "}
              <span className="text-white/80">Not just the entry.</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              After structure + filters give permission, B:PRO grades the setup with two
              quick scores:{" "}
              <span className="text-white/90 font-medium">Safety</span> (risk gates) and{" "}
              <span className="text-white/90 font-medium">Quality</span> (confluence clarity).
            </p>

            {/* compact score cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              <MiniScoreCard
                title="Safety"
                icon={<ShieldCheck className="w-4.5 h-4.5 text-emerald-300" />}
                value="3 / 3"
                hint="risk + volatility"
                reduceMotion={reduceMotion}
                scheme="emerald"
              />
              <MiniScoreCard
                title="Quality"
                icon={<Star className="w-4.5 h-4.5 text-yellow-300" />}
                value="2 / 3"
                hint="confluence + clarity"
                reduceMotion={reduceMotion}
                scheme="gold"
              />
            </div>

            <div className="pt-1 text-xs text-white/45 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
              Correlation: filters validate → scoring ranks what’s worth taking.
            </div>

            {/* quiet controls */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
                <SlidersHorizontal className="w-4 h-4 text-white/60" />
                Settings
              </span>
              <Pill>HUD: On</Pill>
              <Pill>Phone fit: Auto</Pill>
            </div>
          </motion.div>

          {/* RIGHT — premium HUD (replaces scoreboard) */}
          <motion.div className="lg:col-span-7 space-y-5">
            {showHudPanel && (
              <PanelTilt reduceMotion={reduceMotion}>
                <SignalsHudCard items={lastSignals} reduceMotion={reduceMotion} />
              </PanelTilt>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- atoms ---------------- */

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
      {icon}
      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
        {children}
      </span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );
}

function MiniScoreCard({
  title,
  icon,
  value,
  hint,
  scheme,
  reduceMotion,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  hint: string;
  scheme: "emerald" | "gold";
  reduceMotion: boolean;
}) {
  const glow =
    scheme === "emerald"
      ? "shadow-[0_0_40px_rgba(16,185,129,0.12)]"
      : "shadow-[0_0_40px_rgba(250,204,21,0.10)]";

  const bar =
    scheme === "emerald"
      ? "bg-gradient-to-r from-emerald-400/70 to-emerald-200/70"
      : "bg-gradient-to-r from-yellow-400/70 to-yellow-200/70";

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 ${glow}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
            {icon}
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white/90">{title}</div>
            <div className="text-xs text-white/45">{hint}</div>
          </div>
        </div>
        <div className="text-sm font-semibold text-white/85 tabular-nums">{value}</div>
      </div>

      <div className="mt-3 h-2.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: scheme === "emerald" ? "100%" : "72%" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.9, ease: "easeOut" }}
          className={`h-full rounded-full ${bar}`}
        />
      </div>
    </div>
  );
}

/* ---------------- tilt wrapper ---------------- */

function PanelTilt({
  children,
  reduceMotion,
}: {
  children: React.ReactNode;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 230, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 230, damping: 24, mass: 0.7 });

  const rotateY = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [7, -7]);

  const onMove = (e: React.MouseEvent) => {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 18, y: 6, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }}
      viewport={{ once: false, amount: 0.35 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- HUD card (premium) ---------------- */

function SignalsHudCard({
  items,
  reduceMotion,
}: {
  items: { type: string; safety: string; quality: string }[];
  reduceMotion: boolean;
}) {
  const toPct = (v: string) => {
    // "3/3" -> 100, "2/3" -> 66
    const [a, b] = v.split("/").map((n) => parseFloat(n));
    if (!b || Number.isNaN(a) || Number.isNaN(b)) return 0;
    return Math.round((a / b) * 100);
  };

  return (
    <div className="group relative rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/25 via-white/10 to-emerald-500/15 shadow-[0_0_60px_rgba(16,185,129,0.10)]">
      <div className="relative rounded-[30px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-xl">
        {/* blooms */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 h-[340px] w-[340px] rounded-full bg-emerald-500/18 blur-[95px] opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-24 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px] opacity-25"
        />

        {/* micro grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>

        {/* sheen */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { duration: 7.5, repeat: Infinity, ease: "linear" }
          }
        />

        {/* header */}
        <div className="relative px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide uppercase text-white/90">
              Last 5 events
            </div>
            <div className="text-xs text-white/50">S (Safety) + Q (Quality)</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/50 tracking-widest uppercase">HUD</span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-white/[0.03] text-[11px] tracking-widest uppercase text-emerald-200/80">
              Live
            </span>
          </div>
        </div>

        {/* table */}
        <div className="relative px-6 py-5">
          <div className="grid grid-cols-[1fr_120px_120px] gap-x-4 text-[11px] tracking-widest uppercase text-white/55">
            <span>Type</span>
            <span className="text-center">Safety</span>
            <span className="text-center">Quality</span>
          </div>

          <motion.ul
            className="mt-4 space-y-3"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: false, amount: 0.35 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {items.map((row, idx) => {
              const sp = toPct(row.safety);
              const qp = toPct(row.quality);

              return (
                <motion.li
                  key={`${row.type}-${idx}`}
                  variants={{
                    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0.01 }
                      : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="relative grid grid-cols-[1fr_120px_120px] gap-x-4 items-center rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 py-3"
                >
                  <span className="text-white/88 text-sm">{row.type}</span>

                  {/* Safety */}
                  <div className="text-center">
                    <div className="text-sm text-emerald-200/85 tabular-nums">
                      {row.safety}
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 to-emerald-200/70"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sp}%` }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={
                          reduceMotion
                            ? { duration: 0.01 }
                            : { duration: 0.9, ease: "easeOut" }
                        }
                      />
                    </div>
                  </div>

                  {/* Quality */}
                  <div className="text-center">
                    <div className="text-sm text-yellow-200/85 tabular-nums">
                      {row.quality}
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400/75 to-yellow-200/70"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${qp}%` }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={
                          reduceMotion
                            ? { duration: 0.01 }
                            : { duration: 0.9, ease: "easeOut" }
                        }
                      />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="mt-4 flex items-center justify-between text-xs text-white/45">
            <span>Make it stricter in Settings</span>
            <span className="text-white/35">Phone-ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
