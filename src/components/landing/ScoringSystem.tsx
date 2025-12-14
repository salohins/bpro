import React, { useMemo, useRef } from "react";
import {
    motion,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { Star, ShieldCheck, Sparkles, SlidersHorizontal } from "lucide-react";

export default function ScoringSystem() {
    const reduceMotion = useReducedMotion();

    const lastSignals = useMemo(
        () => [
            { type: "Cross Up", safety: "3/3", quality: "2/3" },
            { type: "Cross Down", safety: "3/3", quality: "2/3" },
            { type: "Cross Up", safety: "3/3", quality: "2/3" },
            { type: "Cross Down", safety: "3/3", quality: "2/3" },
            { type: "Cross Up", safety: "3/3", quality: "2/3" },
        ],
        []
    );

    const showHudPanel = true;
    const showSideLabels = true;

    return (
        <section className="relative w-full py-24 md:py-28 overflow-hidden bg-transparent text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* LEFT — logically paced */}
                <motion.div
                    initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="space-y-8"
                >
                    {/* 1) What it is */}
                    <div className="space-y-4">
                        <Badge icon={<Sparkles className="w-4 h-4 text-emerald-300" />}>
                            Scoring System
                        </Badge>

                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                                <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                                    Quantitative Signal Scoring
                                </span>
                            </h2>

                            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                                Two numbers. One glance. Each signal gets a <span className="text-white/90 font-medium">Safety</span>{" "}
                                score (risk gates) and a <span className="text-white/90 font-medium">Quality</span> score (confluence +
                                execution clarity).
                            </p>
                        </div>
                    </div>

                    {/* 2) What you get */}
                    <div className="space-y-4">
                        <SectionKicker>Core Scores</SectionKicker>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 space-y-5 max-w-lg">
                            <ScoreBar
                                label="Safety"
                                hint="Volatility + risk control gates"
                                icon={<ShieldCheck className="text-emerald-300 w-5 h-5" />}
                                value={3}
                                scheme="emerald"
                                reduceMotion={reduceMotion}
                            />
                            <ScoreBar
                                label="Quality"
                                hint="Confluence + execution clarity"
                                icon={<Star className="text-yellow-300 w-5 h-5" />}
                                value={2.5}
                                scheme="gold"
                                reduceMotion={reduceMotion}
                            />

                            <div className="text-xs text-white/45">
                                Rule: Confluence beats frequency. Fewer signals — higher conviction.
                            </div>
                        </div>
                    </div>

                    {/* 3) How it's calculated (short + structured) */}
                    <div className="space-y-4 max-w-xl">
                        <SectionKicker>How it’s calculated</SectionKicker>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5">
                            <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                                    <span>
                                        <span className="text-white/90 font-medium">Safety</span> increases when volatility is contained and
                                        risk filters pass.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-300/80" />
                                    <span>
                                        <span className="text-white/90 font-medium">Quality</span> increases when multiple factors align and
                                        execution is clear.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                                    <span>Final score is the weighted outcome — not a single indicator.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 4) Where to control it (small + calm, not competing) */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/55">
                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
                            <SlidersHorizontal className="w-4 h-4 text-white/60" />
                            Settings
                        </span>
                        <Pill>HUD: {showHudPanel ? "On" : "Off"}</Pill>
                        <Pill>Side Labels: {showSideLabels ? "On" : "Off"}</Pill>
                        <Pill>Phone Fit: Auto</Pill>
                    </div>
                </motion.div>

                {/* RIGHT — proof / visualization */}
                <div className="space-y-6">
                    <PanelTilt reduceMotion={reduceMotion}>
                        <GlassPanel reduceMotion={reduceMotion}>
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="leading-tight">
                                    <h3 className="text-lg md:text-xl font-semibold text-white/90">
                                        Signal Quality Overview
                                    </h3>
                                    <p className="text-xs text-white/50">
                                        Scores + factor breakdown
                                    </p>
                                </div>
                                <div className="text-[11px] text-white/50 tracking-widest uppercase">Live</div>
                            </div>

                            {/* Rings */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 place-items-center">
                                <AnimatedScoreRing title="Safety" color="#10b981" score={92} reduceMotion={reduceMotion} />
                                <AnimatedScoreRing title="Quality" color="#facc15" score={78} reduceMotion={reduceMotion} />
                            </div>

                            {/* Legend (adds clarity without extra text blocks) */}
                            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/55">
                                <Pill>
                                    <span className="text-emerald-300 font-medium">Safety</span>: risk gates + volatility
                                </Pill>
                                <Pill>
                                    <span className="text-yellow-300 font-medium">Quality</span>: confluence + clarity
                                </Pill>
                            </div>

                            <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Factors */}
                            <div className="space-y-4">
                                <AnimatedBar label="Trend Alignment" value={90} reduceMotion={reduceMotion} />
                                <AnimatedBar label="Volatility Control" value={80} reduceMotion={reduceMotion} />
                                <AnimatedBar label="Signal Clarity" value={95} reduceMotion={reduceMotion} />
                                <AnimatedBar label="Execution Timing" value={85} reduceMotion={reduceMotion} />
                            </div>

                            <div className="mt-7 flex items-center justify-between text-xs text-white/45">
                                <span>Computed from multi-factor confluence</span>
                                <span className="text-emerald-300/70">v2</span>
                            </div>
                        </GlassPanel>
                    </PanelTilt>

                    {/* HUD (last — supporting info, not competing) */}
                    {showHudPanel && (
                        <motion.div
                            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: false, amount: 0.35 }}
                            className="w-full"
                        >
                            <SignalsHudCard items={lastSignals} />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ---------------- UI atoms ---------------- */

function SectionKicker({ children }) {
    return (
        <div className="text-xs tracking-widest uppercase text-white/45">
            {children}
        </div>
    );
}

function Badge({ icon, children }) {
    return (
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
            {icon}
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                {children}
            </span>
        </div>
    );
}

function Pill({ children }) {
    return (
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.03]">
            {children}
        </span>
    );
}

/* ---------------- Panels ---------------- */

function GlassPanel({ children, reduceMotion }) {
    return (
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
            <div className="relative rounded-3xl overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-xl p-6 md:p-7">
                <motion.div
                    aria-hidden="true"
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-400/25 via-emerald-500/10 to-transparent blur-3xl opacity-25"
                    animate={reduceMotion ? {} : { opacity: [0.1, 0.28, 0.1] }}
                    transition={reduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
                <div className="relative">{children}</div>
            </div>
        </div>
    );
}

function PanelTilt({ children, reduceMotion }) {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const sx = useSpring(mx, { stiffness: 230, damping: 24, mass: 0.7 });
    const sy = useSpring(my, { stiffness: 230, damping: 24, mass: 0.7 });

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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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

/* HUD card */
function SignalsHudCard({ items }) {
    return (
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-white/10">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#070707]/65 backdrop-blur-xl">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.05] to-transparent" />

                <div className="relative px-6 py-5 border-b border-white/10 flex items-center justify-between">
                    <div className="leading-tight">
                        <div className="text-sm font-semibold tracking-wide uppercase text-white/90">
                            Recent Signals
                        </div>
                        <div className="text-xs text-white/50">Safety (S) + Quality (Q)</div>
                    </div>
                    <div className="text-[11px] text-white/50 tracking-widest uppercase">HUD</div>
                </div>

                <div className="relative px-6 py-5">
                    <div className="grid grid-cols-[1fr_56px_56px] gap-x-3 text-[11px] tracking-widest uppercase text-white/55">
                        <span>Type</span>
                        <span className="text-center">S</span>
                        <span className="text-center">Q</span>
                    </div>

                    <ul className="mt-3 space-y-2" aria-label="Recent trade signals">
                        {items.map((row, idx) => (
                            <li
                                key={`${row.type}-${idx}`}
                                className="grid grid-cols-[1fr_56px_56px] gap-x-3 text-sm"
                            >
                                <span className="text-white/85">{row.type}</span>
                                <span className="text-center text-emerald-200/80">{row.safety}</span>
                                <span className="text-center text-yellow-200/80">{row.quality}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                        <span>Toggle / resize in Settings</span>
                        <span className="text-white/35">Phone-fit ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ScoreBar */
function ScoreBar({ label, hint, icon, value, scheme, reduceMotion }) {
    const pct = Math.max(0, Math.min(100, (value / 3) * 100));
    const barClass =
        scheme === "emerald"
            ? "bg-gradient-to-r from-emerald-400 to-emerald-200"
            : "bg-gradient-to-r from-yellow-400 to-yellow-200";

    return (
        <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    {icon}
                    <div className="leading-tight">
                        <div className="text-sm text-white/85">{label}</div>
                        <div className="text-xs text-white/45">{hint}</div>
                    </div>
                </div>
                <div className="text-xs text-white/60 tabular-nums">
                    <span className={scheme === "emerald" ? "text-emerald-300" : "text-yellow-300"}>
                        {value.toFixed(1)}
                    </span>
                    <span className="text-white/40"> / 3.0</span>
                </div>
            </div>

            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.9, ease: "easeOut" }}
                    className={`h-full rounded-full ${barClass}`}
                />
            </div>
        </div>
    );
}

/* Score ring */
function AnimatedScoreRing({ title, color, score, reduceMotion }) {
    const strokeWidth = 10;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full blur-2xl opacity-20"
                    style={{ backgroundColor: color }}
                />
                <svg width="132" height="132" className="relative" role="img" aria-label={`${title} score ${score}%`}>
                    <title>{title} score</title>
                    <circle cx="66" cy="66" r={radius} stroke="white" strokeOpacity="0.10" strokeWidth={strokeWidth} fill="none" />
                    <motion.circle
                        cx="66"
                        cy="66"
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={reduceMotion ? { duration: 0.01 } : { duration: 1.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="66"
                        cy="66"
                        r={radius}
                        stroke={color}
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="10 10"
                        className="opacity-25"
                        animate={reduceMotion ? {} : { strokeDashoffset: [0, 30, 0] }}
                        transition={reduceMotion ? { duration: 0.01 } : { repeat: Infinity, duration: 6, ease: "linear" }}
                    />
                    <text x="66" y="72" textAnchor="middle" className="text-2xl font-semibold fill-white tabular-nums">
                        {score}%
                    </text>
                </svg>
            </div>
            <p className="text-sm text-white/55 mt-2">{title}</p>
        </div>
    );
}

/* Bars */
function AnimatedBar({ label, value, reduceMotion }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-white/55 mb-2">
                <span>{label}</span>
                <span className="text-white/45 tabular-nums">{value}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.9, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-200 rounded-full"
                />
            </div>
        </div>
    );
}
