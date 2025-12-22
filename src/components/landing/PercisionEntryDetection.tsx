import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    Target,
    Shield,
    Layers,
} from "lucide-react";

import breakoutLong from "../../assets/breakout-long.png";
import breakoutShort from "../../assets/breakout-short.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function PrecisionEntryDetection() {
    const reduceMotion = useReducedMotion();
    const [activeArchetype, setActiveArchetype] = useState("long");

    const enter = (dir = 1, d = 0) => ({
        initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
        viewport: { once: false, amount: 0.35 },
    });

    const longItems = useMemo(() => ["Bull bias holds", "Reaction confirms", "Trigger prints"], []);
    const shortItems = useMemo(() => ["Bear bias holds", "Support breaks", "Expansion follows"], []);

    const activeImg = activeArchetype === "long" ? breakoutLong : breakoutShort;

    const infoText =
        activeArchetype === "long" ? (
            <>
                Enter after <span className="font-semibold text-white/85">reaction at support</span>, aligned with{" "}
                <span className="font-semibold text-white/85">bullish pressure</span>. Stop below{" "}
                <span className="font-semibold text-white/85">last swing low</span>.
            </>
        ) : (
            <>
                Enter after <span className="font-semibold text-white/85">breakdown at resistance</span>, aligned with{" "}
                <span className="font-semibold text-white/85">bearish pressure</span>. Stop above{" "}
                <span className="font-semibold text-white/85">last swing high</span>.
            </>
        );

    return (
        <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
            {/* Background / grid */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-0 right-0 -top-32 -bottom-32 bg-[radial-gradient(circle_at_55%_12%,rgba(16,185,129,0.10),transparent_60%)]" />
                <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                {/* Header */}
                <div className="space-y-3 mb-10">
                    <div className="flex flex-wrap items-center gap-2">
                        <Kicker>Engine 3 • Signal &amp; Execution</Kicker>
                        <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] uppercase text-white/55">
                            Step 3 • Execution
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                            Precise Entry Detection
                        </span>
                    </h2>

                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                        Structure gives direction and filters create clarity. This is where you execute only on clean reactions.
                    </p>
                </div>

                {/* Body */}
                <motion.div {...enter(1, 0.05)}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
                        {/* LEFT — cards */}
                        <div className="lg:col-span-5 w-full space-y-4 order-2 lg:order-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                <FeatureCard
                                    active={activeArchetype === "long"}
                                    onClick={() => setActiveArchetype("long")}
                                    reduceMotion={reduceMotion}
                                    delay={0.05}
                                    tone="emerald"
                                    icon={<ArrowUpRight className="w-5 h-5 text-emerald-300" />}
                                    title="Long archetype"
                                    items={longItems}
                                />
                                <FeatureCard
                                    active={activeArchetype === "short"}
                                    onClick={() => setActiveArchetype("short")}
                                    reduceMotion={reduceMotion}
                                    delay={0.1}
                                    tone="red"
                                    icon={<ArrowDownRight className="w-5 h-5 text-red-300" />}
                                    title="Short archetype"
                                    items={shortItems}
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
                                Pro Tip: As soon as price touches the fast line, the trade is triggered. Risk is defined by the mid-trend line, with the stop placed slightly below it. The same logic applies in reverse for short setups, with entries, risk, and invalidation mirrored to the downside.
                            </div>
                        </div>

                        {/* RIGHT — dynamic image */}
                        <div className="lg:col-span-7 w-full order-1 lg:order-2 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeArchetype}
                                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                                    transition={{ duration: 0.5, ease: easePremium }}
                                >
                                    <MediaFrame
                                        src={activeImg}
                                        alt={`${activeArchetype} breakout example`}
                                        heightClass="h-[300px] sm:h-[360px] lg:h-[460px]"
                                        fit="cover"
                                        reduceMotion={reduceMotion}
                                    >
                                        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                            {activeArchetype === "long" ? (
                                                <>
                                                    <TagChip tone="emerald">Bull reaction</TagChip>
                                                    <TagChip>FAST line</TagChip>
                                                </>
                                            ) : (
                                                <>
                                                    <TagChip tone="red">Bear reaction</TagChip>
                                                    <TagChip>Resistance zone</TagChip>
                                                </>
                                            )}
                                        </div>

                                        <div className="absolute left-5 right-5 bottom-5">
                                            <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                                                <div className="text-sm text-white/70 leading-relaxed">{infoText}</div>
                                            </Glass>
                                        </div>
                                    </MediaFrame>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Pill icon={<Target className="w-4 h-4 text-emerald-200/90" />}>Bias aligned</Pill>
                                <Pill icon={<Sparkles className="w-4 h-4 text-white/80" />}>Pressure context</Pill>
                                <Pill icon={<Shield className="w-4 h-4 text-emerald-200/90" />}>Fast-line entry / mid-trend stop</Pill>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
                    <span>Execution workflow • visual guide</span>
                    <span className="text-emerald-300/70 capitalize">{activeArchetype} setup</span>
                </div>
            </div>
        </section>
    );
}

/* ===================== Atoms ===================== */

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

function MediaFrame({ src, alt, heightClass = "h-[320px] sm:h-[380px] lg:h-[520px]", fit = "cover", loading = "lazy", reduceMotion = false, children }) {
    const imgClass = fit === "contain" ? "object-contain p-3" : "object-cover object-center";

    return (
        <Glass className="overflow-hidden">
            <div className={`relative ${heightClass} bg-black/20`}>
                <img src={src} alt={alt} className={`absolute inset-0 w-full h-full ${imgClass}`} loading={loading} draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.18),transparent_55%)]" />
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
            : tone === "red"
                ? "text-red-200 border-red-400/20 bg-red-400/10"
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
    };
    return (
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${toneMap[tone] || toneMap.neutral}`}>
            {children}
        </span>
    );
}

function FeatureCard({ active, onClick, reduceMotion, delay = 0, tone = "emerald", icon, title, items }) {
    const checkColor = tone === "red" ? "text-red-300/80" : "text-emerald-300/80";
    const iconTone = tone === "red" ? "red" : "emerald";

    const borderActive =
        tone === "red"
            ? active
                ? "border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                : "border-white/10"
            : active
                ? "border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "border-white/10";

    const bgActive = active ? "bg-white/[0.08]" : "bg-white/[0.03]";

    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.35 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, delay, ease: easePremium }}
            className={`h-full rounded-2xl border ${borderActive} ${bgActive} backdrop-blur-md p-6 transition-all duration-300 cursor-pointer`}
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
