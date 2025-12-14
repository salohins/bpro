import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, Activity, Sliders, Zap } from "lucide-react";

export default function CorePillars() {
    const reduceMotion = useReducedMotion();

    const pillars = useMemo(
        () => [
            {
                icon: Layers,
                title: "Trend Cloud",
                badge: "Direction",
                gradient: "from-emerald-300 via-emerald-200 to-cyan-200",
                glow: "bg-emerald-500/25",
                desc: ["3-layer EMA structure", "Bull / Bear / Neutral detection", "Built-in breakout levels"],
            },
            {
                icon: Activity,
                title: "Structure Mapping",
                badge: "Context",
                gradient: "from-cyan-200 via-teal-200 to-emerald-200",
                glow: "bg-cyan-500/18",
                desc: ["Auto swing highs/lows", "ATR-based validation", "HTF EMA targeting"],
            },
            {
                icon: Sliders,
                title: "Multi-Filter Engine",
                badge: "Confluence",
                gradient: "from-emerald-200 via-teal-200 to-cyan-200",
                glow: "bg-emerald-500/18",
                desc: ["Momentum · Volume · Volatility", "Trend & Sentiment filters", "Adaptive weighting logic"],
            },
            {
                icon: Zap,
                title: "Signal Management",
                badge: "Execution",
                gradient: "from-emerald-200 via-cyan-200 to-blue-200",
                glow: "bg-blue-500/16",
                desc: ["Precision entry logic", "ATR-driven stops & exits", "S/Q scoring system"],
            },
        ],
        []
    );

    const cardV = {
        hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
        show: (i) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
        }),
    };

    return (
        <section className="relative w-full py-24 md:py-28 text-white overflow-hidden">
            {/* ===== Connector overlay: TOP black -> BOTTOM transparent ===== */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/55 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="text-center mb-14 md:mb-16"
                >
                    <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md mb-4">
                        <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                            Core Technology
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                            The 4 Pillars Behind{" "}
                        </span>
                        <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.18)]">
                            B:Pro
                        </span>
                    </h2>

                    <p className="text-white/70 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
                        A fusion of algorithmic precision and structural clarity — engineered for traders who demand confidence in every move.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.article
                                key={pillar.title}
                                custom={i}
                                variants={cardV}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.35 }}
                                whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="group relative overflow-hidden rounded-3xl"
                            >
                                {/* Gradient frame */}
                                <div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${pillar.gradient} opacity-[0.18]`}
                                />
                                <div className="absolute inset-[1px] rounded-3xl bg-[#070707]/75 border border-white/10 backdrop-blur-xl" />

                                {/* Aurora glow */}
                                <div
                                    aria-hidden="true"
                                    className={`absolute -top-20 -right-16 w-56 h-56 rounded-full blur-[90px] ${pillar.glow} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full blur-[100px] bg-white/10 opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                                />

                                {/* Sheen sweep */}
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                                    transition={{ duration: 8.5, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Content */}
                                <div className="relative z-10 p-6">
                                    {/* Icon + badge */}
                                    <div className="flex items-start justify-between">
                                        <div className="relative">
                                            <div className="relative w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 grid place-items-center">
                                                <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <Icon className="relative w-6 h-6 text-emerald-300" />
                                            </div>
                                        </div>

                                        <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/60 tracking-widest uppercase">
                                            {pillar.badge}
                                        </div>
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-white/90">{pillar.title}</h3>

                                    <ul className="mt-4 space-y-2 text-sm text-white/70 leading-relaxed">
                                        {pillar.desc.map((line, idx) => (
                                            <li key={idx} className="flex gap-2">
                                                <span className="text-emerald-300/80">✓</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* footer hint */}
                                    <div className="mt-6 text-xs text-white/45">
                                        Designed to reduce noise — increase conviction.
                                    </div>
                                </div>

                                {/* Hover ring */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        boxShadow:
                                            "0 0 0 1px rgba(255,255,255,0.08), 0 0 34px rgba(16,185,129,0.12)",
                                    }}
                                />
                            </motion.article>
                        );
                    })}
                </div>
            </div>

            {/* Keyframes */}
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.55; }
            50% { transform: translateY(-18px); opacity: 1; }
          }
        `}
            </style>
        </section>
    );
}
