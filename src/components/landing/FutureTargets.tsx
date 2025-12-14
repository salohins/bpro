import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Target, Shield } from "lucide-react";

import futureTargetsImg from "../../assets/future-target-lines.png"; // 👈 change if needed

const easePremium = [0.16, 1, 0.3, 1];

export default function FutureTargets() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative w-full py-20 md:py-24 overflow-hidden bg-transparent text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.02] backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                            Future Targets
                        </span>
                    </div>

                    <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.06]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                            Future Target Lines
                        </span>
                        <span className="block mt-2 text-white/80 text-base md:text-lg font-semibold">
                            Visual Support &amp; Resistance Framework
                        </span>
                    </h2>

                    <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                        After breakouts, price often interacts with{" "}
                        <span className="text-emerald-200/90 font-semibold">T1/T2</span> — dynamic EMA-based zones acting as predictive
                        supports and resistances.
                    </p>
                </motion.div>

                {/* Image frame (FULL WIDTH inside this section container) */}
                <motion.div
                    initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.9, ease: easePremium, delay: 0.05 }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="mt-10 md:mt-12"
                >
                    <div className="rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/14">
                        <div className="relative rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md">
                            {/* Aspect similar to your breakout image “cinematic” feel */}
                            <div className="relative h-[340px] sm:h-[420px] lg:h-[520px]">
                                <img
                                    src={futureTargetsImg}
                                    alt="30min BTC/USDT example showing T1/T2 target EMA lines as dynamic support and resistance"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    draggable={false}
                                    loading="eager"
                                />

                                {/* cinematic grading (light, premium) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.20),transparent_55%)]" />

                                {/* subtle grain (same vibe as BreakoutFramework) */}
                                <div
                                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.30'/%3E%3C/svg%3E\")",
                                    }}
                                />

                                {/* top tags */}
                                <div className="absolute left-5 top-5 text-[11px] tracking-[0.18em] uppercase text-white/85 bg-black/30 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                                    T1 / T2 rails
                                </div>
                                <div className="absolute right-5 top-5 text-[11px] tracking-[0.18em] uppercase text-emerald-100 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 backdrop-blur-md">
                                    EMA-based targets
                                </div>

                                {/* compact bottom caption panel */}
                                <div className="absolute left-5 right-5 bottom-5">
                                    <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-3">
                                        <div className="text-sm font-semibold text-white/90 leading-tight">
                                            How to read it
                                        </div>
                                        <div className="mt-1 text-sm text-white/65 leading-relaxed">
                                            After breakout, price commonly reacts to{" "}
                                            <span className="text-white/80">T1</span> first, then{" "}
                                            <span className="text-white/80">T2</span>. Watch for rejection/acceptance to confirm continuation
                                            or reversal pressure.
                                        </div>
                                    </div>
                                </div>

                                {/* subtle sheen */}
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    style={{ opacity: 0.08 }}
                                />

                                <div className="absolute inset-0 ring-1 ring-white/10" />
                            </div>
                        </div>
                    </div>

                    {/* legend chips (light, not noisy) */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70">
                            <Target className="w-4 h-4 text-emerald-200/90" />
                            T1 = first reaction
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70">
                            <Shield className="w-4 h-4 text-emerald-200/90" />
                            T2 = continuation / fail point
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
                            Adaptive EMA rails
                        </div>
                    </div>

                    <div className="mt-4 text-center text-xs md:text-sm text-white/45">
                        Tip: Keep screenshots clean — minimal grid & indicators so T1/T2 stand out instantly.
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
