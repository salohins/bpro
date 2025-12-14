import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Activity, Zap, LineChart, Sparkles, ArrowRight } from "lucide-react";

export default function CTABreakoutPro() {
    const reduceMotion = useReducedMotion();

    const features = useMemo(
        () => [
            { icon: <Activity className="w-5 h-5 text-emerald-300" />, text: "Adaptive EMA Cloud" },
            { icon: <ShieldCheck className="w-5 h-5 text-emerald-300" />, text: "Safety & Quality Scoring" },
            { icon: <Zap className="w-5 h-5 text-emerald-300" />, text: "Multi-Filter Logic" },
            { icon: <LineChart className="w-5 h-5 text-emerald-300" />, text: "HTF Trend Integration" },
        ],
        []
    );

    return (
        <section className="relative w-full py-28 md:py-36 overflow-hidden bg-[#050505] text-white">

            {/* Floating ring */}
            <motion.div
                aria-hidden="true"
                animate={reduceMotion ? {} : { scale: [1, 1.03, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 w-[860px] h-[860px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,transparent_70%)] blur-[120px]"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md mb-5">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                            Breakout PRO
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/50 text-xs tracking-widest uppercase">v3.0</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.03]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.22)]">
                            Precision breakout trading — refined into one suite.
                        </span>
                    </h2>

                    <p className="text-white/65 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
                        Multi-filter breakout & trend framework built for discretionary traders who want clarity, consistency, and control.
                    </p>
                </motion.div>

                {/* Product card */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative rounded-[28px] p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/20 shadow-[0_0_70px_rgba(16,185,129,0.12)]"
                >
                    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#0b0b0b]/90 to-[#070707]/95 border border-white/10 backdrop-blur-2xl">
                        {/* holographic aurora */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_60%)]"
                            animate={reduceMotion ? {} : { opacity: [0.12, 0.26, 0.12], scale: [1, 1.04, 1] }}
                            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                        />

                        {/* sheen sweep */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100"
                            animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="relative z-10 p-7 md:p-10 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                {/* Left — Video / Visual */}
                                <div className="lg:col-span-7">
                                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.10)]">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                                        <video
                                            src="/chart-demo.mp4"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="object-cover w-full h-full opacity-85 aspect-[16/11]"
                                        />
                                        {/* corner glow */}
                                        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/12 blur-[100px]" />
                                    </div>

                                    {/* mini trust row */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {["Any symbol", "Any timeframe", "Confluence-based"].map((t, i) => (
                                            <div
                                                key={t}
                                                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/55 tracking-widest uppercase"
                                            >
                                                {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — Copy + CTA */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
                                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                                        <span className="text-emerald-200 text-xs tracking-[0.22em] font-semibold uppercase">
                                            Lifetime Access
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white/90 leading-tight">
                                        Precision. Clarity. Control.
                                    </h3>

                                    <p className="text-white/65 leading-relaxed">
                                        Breakout PRO combines a custom EMA cloud, adaptive volatility filters, and Safety/Quality scoring into one cohesive framework —
                                        built for traders who demand consistency across any market condition.
                                    </p>

                                    {/* Features */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        {features.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                                viewport={{ once: false, amount: 0.35 }}
                                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] transition"
                                            >
                                                <div className="w-10 h-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 grid place-items-center">
                                                    {f.icon}
                                                </div>
                                                <div className="text-sm text-white/75">{f.text}</div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="pt-4">
                                        <motion.button
                                            whileHover={
                                                reduceMotion
                                                    ? {}
                                                    : {
                                                        scale: 1.03,
                                                        backgroundPosition: "right center",
                                                        boxShadow: "0 0 55px rgba(16,185,129,0.55)",
                                                    }
                                            }
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base md:text-lg font-semibold rounded-2xl
                        bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:200%_auto]
                        text-black shadow-[0_0_28px_rgba(16,185,129,0.28)] border border-emerald-300/30 transition-all duration-500"
                                        >
                                            Get Breakout PRO — Lifetime Access
                                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                                        </motion.button>

                                        <p className="text-xs md:text-sm text-white/45 pt-3">
                                            One-time payment • Lifetime updates • Instant TradingView access
                                        </p>
                                    </div>

                                    {/* micro trust */}
                                    <div className="flex flex-wrap gap-3 text-xs text-white/45">
                                        <span className="inline-flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-300/80" />
                                            Built for decision integrity
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-emerald-300/80" />
                                            Optimized UX for speed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* bottom reflection */}
                        <div className="absolute -bottom-14 left-0 w-full h-28 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
