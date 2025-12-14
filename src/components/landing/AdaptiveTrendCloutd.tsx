import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import trendCloudImg from "../../assets/adaptive-trend-cloud.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function AdaptiveTrendCloud() {
    const reduceMotion = useReducedMotion();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: reduceMotion
                ? { duration: 0.01 }
                : { staggerChildren: 0.08, delayChildren: 0.06 },
        },
    };

    const fadeLeft = {
        hidden: { opacity: 0, x: -18, y: 6, filter: "blur(10px)" },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.85, ease: easePremium },
        },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 18, y: 6, filter: "blur(10px)" },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.85, ease: easePremium },
        },
    };

    const bullet = {
        hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.7, ease: easePremium },
        },
    };

    return (
        <section className="relative w-full py-20 md:py-24 overflow-hidden bg-transparent text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch"
                >
                    {/* LEFT — text */}
                    <motion.div variants={fadeLeft} className="lg:col-span-6 w-full">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                            <Sparkles className="w-4 h-4 text-emerald-300" />
                            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                                Trend Regime Engine
                            </span>
                        </div>

                        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                                Adaptive Trend Cloud
                            </span>
                        </h2>

                        <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-xl">
                            B:Pro’s 3-layer EMA Cloud defines the market’s structural bias —
                            bullish, bearish, or neutral — and transitions seamlessly as
                            volatility and momentum shift. It’s the visual backbone behind
                            every breakout and continuation signal.
                        </p>

                        <motion.ul variants={container} className="mt-6 space-y-3">
                            <motion.li variants={bullet} className="flex gap-3">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400" />
                                <div className="text-sm text-white/75 leading-relaxed">
                                    <span className="text-white/90 font-semibold">
                                        3-Layer Structure
                                    </span>{" "}
                                    – fast, mid, and slow EMAs forming a dynamic market geometry.
                                </div>
                            </motion.li>

                            <motion.li variants={bullet} className="flex gap-3">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-300/80" />
                                <div className="text-sm text-white/75 leading-relaxed">
                                    <span className="text-white/90 font-semibold">
                                        ATR-Based Cloud Padding
                                    </span>{" "}
                                    – smooth regime transitions without fake flips.
                                </div>
                            </motion.li>

                            <motion.li variants={bullet} className="flex gap-3">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-200/70" />
                                <div className="text-sm text-white/75 leading-relaxed">
                                    <span className="text-white/90 font-semibold">
                                        Color-Coded Clarity
                                    </span>{" "}
                                    – green for bull, red for bear, gray for neutral.
                                </div>
                            </motion.li>
                        </motion.ul>

                        <div className="mt-5 text-xs text-white/45 max-w-xl">
                            This is where traders immediately see market bias — the foundation
                            of every B:Pro signal.
                        </div>
                    </motion.div>

                    {/* RIGHT — image (VERTICALLY + HORIZONTALLY CENTERED in GRID) */}
                    <motion.div
                        variants={fadeRight}
                        className="lg:col-span-6 w-full grid place-items-center"
                    >
                        <div className="w-full max-w-3xl self-center">
                            <div className="rounded-3xl p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/8 to-emerald-500/14">
                                <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10">
                                    <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
                                        <img
                                            src={trendCloudImg}
                                            alt="Adaptive Trend Cloud: Bull → Neutral → Bear transitions"
                                            className="absolute inset-0 w-full h-full object-cover object-center"
                                            draggable={false}
                                            loading="eager"
                                        />

                                        {/* light grading */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background:
                                                    "linear-gradient(to top, rgba(0,0,0,0.22), rgba(0,0,0,0.00) 58%)",
                                            }}
                                        />
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.14),transparent_55%)]"
                                        />

                                        {/* top-left label */}
                                        <div className="absolute left-4 top-4">
                                            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase text-white/75">
                                                Bull → Neutral → Bear Transitions
                                            </div>
                                        </div>

                                        {/* bottom labels */}
                                        <div className="absolute left-4 right-4 bottom-4">
                                            <div className="flex items-center justify-between text-[11px] tracking-[0.14em] uppercase">
                                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-emerald-200/90">
                                                    Bull Regime
                                                </span>
                                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-slate-200/80">
                                                    Neutral Transition
                                                </span>
                                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-red-200/85">
                                                    Bear Regime
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 ring-1 ring-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
