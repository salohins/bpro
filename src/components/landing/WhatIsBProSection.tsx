import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Map, Filter, Target, ShieldCheck, Star } from "lucide-react";

const easePremium = [0.16, 1, 0.3, 1];

export default function WhatIsBPro() {
    const reduceMotion = useReducedMotion();

    const enter = (dir = 1) => ({
        initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: reduceMotion
            ? { duration: 0.01 }
            : { duration: 0.85, ease: easePremium },
        viewport: { once: false, amount: 0.35 },
    });

    const architecture = [
        {
            icon: Map,
            title: "See the Market Before It Moves",
            desc: "B:PRO maps trend, regime and higher-timeframe bias so you know where price is likely to go — before it gets there.",
        },
        {
            icon: Filter,
            title: "Trade Less. Trade Better.",
            desc: "Multi-filter logic blocks chop, fake breakouts and low-probability conditions that destroy accounts.",
        },
        {
            icon: Target,
            title: "Clean Entries. Clear Context.",
            desc: "Breakouts, continuations and reactions — only when the market actually allows them.",
        },
        {
            icon: ShieldCheck,
            title: "Built-In Risk Control",
            desc: "ATR-based stops, invalidations and lifecycle management so one bad trade never ruins your week.",
        },
        {
            icon: Star,
            title: "Decision Grades (Optional)",
            desc: "Safety & Quality scores help you avoid emotional trades and stay selective — even in fast markets.",
        },
    ];

    return (
        <section className="relative w-full py-22 md:py-24 overflow-hidden bg-transparent text-white">
            {/* subtle marketing glow */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(16,185,129,0.12),transparent_35%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LEFT — SALES COPY */}
                    <motion.div {...enter()} className="lg:col-span-6 space-y-7">
                        <Kicker>Why Traders Use B:PRO</Kicker>

                        <h2 className="font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,3.2vw,54px)]">
                            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                                This isn’t another indicator.
                            </span>
                            <br />
                            <span className="text-white/90">
                                It’s a trading decision system.
                            </span>
                        </h2>

                        <p className="text-white/70 text-[clamp(15px,1.05vw,18px)] leading-relaxed max-w-[860px]">
                            B:PRO is designed for traders who are tired of guessing.
                            It helps you spot real breakouts, ride trends longer, and
                            avoid garbage trades — directly on your TradingView chart.
                            No signal spam. No dopamine arrows. Just structured,
                            repeatable execution.
                        </p>

                        {/* PROOF STRIP */}
                        <div className="flex flex-wrap gap-2 text-[12px] text-white/60">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                                ✔ Crypto & futures
                            </span>
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                                ✔ Scalping, day & swing trading
                            </span>
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                                ✔ Manual & bot execution
                            </span>
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                                ✔ Beginner → advanced
                            </span>
                        </div>

                        <Card title="What makes B:PRO different" rightTag="Real edge">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {architecture.map((a) => (
                                    <ArchTile
                                        key={a.title}
                                        icon={a.icon}
                                        title={a.title}
                                        desc={a.desc}
                                    />
                                ))}
                            </div>

                            <div className="mt-4 text-xs text-white/45 leading-relaxed">
                                Everything is configurable. Panels, filters, grades — use
                                as much or as little as you want.
                            </div>
                        </Card>

                        <div className="text-xs text-white/40 leading-relaxed max-w-[860px]">
                            Bottom line: B:PRO helps you trade fewer setups —
                            but higher-quality ones.
                        </div>
                    </motion.div>

                    {/* RIGHT — VISUAL PROOF */}
                    <motion.div {...enter()} className="lg:col-span-6 space-y-6">
                        <ShotFrame
                            title="B:PRO on TradingView"
                            note="Show your full indicator with cloud, signals and labels."
                            className="h-[340px] sm:h-[420px] lg:h-[480px]"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ShotFrame
                                title="Safety & Quality Grades"
                                note="Perfect for avoiding low-quality or emotional trades."
                                className="h-[190px] sm:h-[210px]"
                            />
                            <ShotFrame
                                title="Mobile & Settings"
                                note="Fully customizable for any screen or workflow."
                                className="h-[190px] sm:h-[210px]"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- UI atoms ---------------- */

function Kicker({ children }) {
    return (
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                {children}
            </span>
        </div>
    );
}

function Card({ title, rightTag, children }) {
    return (
        <div
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 md:p-6"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white/90">{title}</div>
                {rightTag && (
                    <div className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/55 tracking-widest uppercase">
                        {rightTag}
                    </div>
                )}
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function ArchTile({ icon: Icon, title, desc }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-emerald-300" />
                </span>
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-white/90 leading-tight">
                        {title}
                    </div>
                    <div className="mt-1 text-sm text-white/65 leading-tight">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShotFrame({ title, note, className = "" }) {
    return (
        <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
            <div className="rounded-[28px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="text-sm font-semibold text-white/85">{title}</div>
                    <div className="text-[11px] text-white/45 tracking-widest uppercase">
                        proof
                    </div>
                </div>

                <div className={`relative ${className} bg-white/[0.02]`}>
                    <div className="absolute inset-0 opacity-[0.10]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:58px_58px]" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <div className="max-w-md">
                            <div className="text-white/80 font-semibold">
                                Drop a real chart screenshot here
                            </div>
                            <div className="mt-2 text-sm text-white/55 leading-relaxed">
                                {note}
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
                    <div className="absolute inset-0 ring-1 ring-white/10" />
                </div>
            </div>
        </div>
    );
}
