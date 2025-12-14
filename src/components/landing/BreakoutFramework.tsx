import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    Target,
    Shield,
    Plus,
    Circle,
    X,
} from "lucide-react";

import breakoutImg from "../../assets/breakout.png";
import breakoutLogicImg from "../../assets/breakoutLogic.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function BreakoutFramework() {
    const reduceMotion = useReducedMotion();

    const enter = (dir = 1) => ({
        initial: { opacity: 0, y: 18 * dir, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium },
        viewport: { once: false, amount: 0.3 },
    });

    return (
        <section className="relative w-full py-20 md:py-24 overflow-hidden bg-transparent text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div {...enter()} className="w-full">
                    <SectionShell>
                        {/* Header */}
                        <div className="px-6 md:px-8 pt-7 md:pt-8">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div className="space-y-3">
                                    <Kicker>Breakout Framework</Kicker>

                                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]">
                                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                                            Precision Entry Detection
                                        </span>
                                    </h2>

                                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                                        Act only when confluence is undeniable — structure, pivots, and line
                                        reaction align first.
                                    </p>
                                </div>

                                <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/55 shrink-0 pb-1">
                                    {["Cloud bias", "Fast + Mid", "Pivot zones", "Reaction logic"].map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* TOP grid */}
                        <div className="px-6 md:px-8 pt-7 md:pt-8 pb-7 md:pb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-start">
                                {/* LEFT — hero */}
                                <div className="w-full">
                                    <MediaFrame
                                        src={breakoutImg}
                                        alt="Breakout example: bullish consolidation into cloud lines"
                                        loading="eager"
                                        heightClass="h-[320px] sm:h-[380px] lg:h-[520px]"
                                        fit="cover"
                                        reduceMotion={reduceMotion}
                                    >
                                        {/* tags */}
                                        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                            <TagChip>Bullish consolidation</TagChip>
                                            <TagChip tone="emerald">Watch fast &amp; mid lines</TagChip>
                                        </div>

                                        {/* micro panel */}
                                        <div className="absolute left-5 right-5 bottom-5">
                                            <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-semibold text-white/90 leading-tight">
                                                            Confirmation before entry
                                                        </div>
                                                        <div className="mt-1 text-sm text-white/65 leading-relaxed">
                                                            Wait for{" "}
                                                            <span className="text-white/85">green + white</span>{" "}
                                                            confluence, then enter on{" "}
                                                            <span className="text-white/85">fast-line touch</span>{" "}
                                                            with stop below{" "}
                                                            <span className="text-white/85">mid line</span>.
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex items-center text-emerald-200/80 pt-0.5">
                                                        <Sparkles className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </Glass>
                                        </div>
                                    </MediaFrame>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Pill icon={<Target className="w-4 h-4 text-emerald-200/90" />}>
                                            Trend continues (green)
                                        </Pill>
                                        <Pill icon={<Sparkles className="w-4 h-4 text-white/80" />}>
                                            Squeeze / volatility (white)
                                        </Pill>
                                        <Pill icon={<Shield className="w-4 h-4 text-emerald-200/90" />}>
                                            Entry fast / stop mid
                                        </Pill>
                                    </div>
                                </div>

                                {/* RIGHT — cards */}
                                <div className="w-full">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FeatureCard
                                            reduceMotion={reduceMotion}
                                            delay={0.05}
                                            tone="emerald"
                                            icon={<ArrowUpRight className="w-5 h-5 text-emerald-300" />}
                                            title="Long Setup"
                                            items={[
                                                "Bullish cloud bias",
                                                "Reaction at fast + mid",
                                                "Entry on fast-line touch",
                                            ]}
                                        />
                                        <FeatureCard
                                            reduceMotion={reduceMotion}
                                            delay={0.12}
                                            tone="red"
                                            icon={<ArrowDownRight className="w-5 h-5 text-red-300" />}
                                            title="Short Setup"
                                            items={[
                                                "Bearish cloud bias",
                                                "Pivot break confirms momentum",
                                                "Respect squeeze/expansion",
                                            ]}
                                        />
                                    </div>

                                    <div className="mt-4 text-xs text-white/45">
                                        Tip: The edge is patience — let the fast &amp; mid lines confirm first.
                                    </div>

                                    <div className="mt-6 hidden lg:block">
                                        <Glass className="rounded-2xl p-5">
                                            <div className="flex items-start gap-3">
                                                <IconBox tone="emerald">
                                                    <Sparkles className="w-4 h-4 text-emerald-300" />
                                                </IconBox>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-white/90">
                                                        Rule of thumb
                                                    </div>
                                                    <div className="mt-1 text-sm text-white/65 leading-relaxed">
                                                        If fast &amp; mid disagree, you don’t trade — you wait. Your
                                                        consistency comes from skipping mid-quality setups.
                                                    </div>
                                                </div>
                                            </div>
                                        </Glass>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="px-6 md:px-8">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>

                        {/* BOTTOM content */}
                        <div className="px-6 md:px-8 pt-7 md:pt-8 pb-7 md:pb-8">
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3 min-w-0">
                                    <IconBox tone="emerald">
                                        <Sparkles className="w-4 h-4 text-emerald-300" />
                                    </IconBox>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-white/90 truncate">
                                            Breakout Logic — Real Reaction Example
                                        </h3>
                                        <p className="text-xs text-white/50 truncate">
                                            Squeeze → invalidation → continuation, visualized at reaction zones.
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/55 shrink-0">
                                    {["Mid", "Standard", "15m", "BTC/USDT"].map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.03]"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-start">


                                {/* RIGHT — legend */}
                                <div className="space-y-5 lg:pl-6 lg:border-l lg:border-white/10">
                                    <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                                        The system flags squeeze pressure, invalidations, and continuation pivots
                                        so you can decide faster with less guesswork.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <LegendRow
                                            icon={
                                                <IconBox>
                                                    <Plus className="h-4 w-4 text-white/80" />
                                                </IconBox>
                                            }
                                            title='White “+”'
                                            desc="Volatility squeeze (big move loading)"
                                        />
                                        <LegendRow
                                            icon={
                                                <IconBox tone="purple">
                                                    <Circle className="h-4 w-4 text-purple-200" />
                                                </IconBox>
                                            }
                                            title="Purple circle"
                                            desc="Trade invalidation (reversal warning)"
                                        />
                                        <LegendRow
                                            icon={
                                                <IconBox tone="emerald">
                                                    <X className="h-4 w-4 text-emerald-200" />
                                                </IconBox>
                                            }
                                            title="Green cross"
                                            desc="Bull continuation with minor correction"
                                        />
                                        <LegendRow
                                            icon={
                                                <IconBox>
                                                    <Target className="h-4 w-4 text-emerald-200/90" />
                                                </IconBox>
                                            }
                                            title="Pivot zones"
                                            desc="Crosses often mark short-term reversal areas"
                                        />
                                    </div>

                                    <div className="text-xs text-white/45">
                                        Optional overlay labels:{" "}
                                        <span className="text-white/70">
                                            “Squeeze forming”, “Trade invalidation”, “Continuation / pivot zone”
                                        </span>
                                    </div>
                                </div>

                                {/* LEFT — new cinematic image (same style as top) */}
                                <div className="w-full">
                                    <CinematicImage
                                        src={breakoutLogicImg}
                                        alt="Breakout Logic screenshot showing squeeze, invalidation and continuation icons"
                                        tags={[
                                            { text: "Real signal context" },
                                            { text: "Mid mode / 15m / BTCUSDT", tone: "emerald" },
                                        ]}
                                        caption="Read the icons at reaction zones — this is the 'why' behind entries."
                                    />

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Pill icon={<Plus className="w-4 h-4 text-white/80" />}>Squeeze</Pill>
                                        <Pill icon={<Circle className="w-4 h-4 text-purple-200" />}>Invalidation</Pill>
                                        <Pill icon={<X className="w-4 h-4 text-emerald-200" />}>Continuation</Pill>
                                        <Pill icon={<Target className="w-4 h-4 text-emerald-200/90" />}>Pivot</Pill>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
                                <span>Visual interpretation guide</span>
                                <span className="text-emerald-300/70">v2</span>
                            </div>
                        </div>
                    </SectionShell>
                </motion.div>
            </div>
        </section>
    );
}

function CinematicImage({ src, alt, tags = [], caption }) {
    return (
        <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10">
            <div className="relative h-[320px] sm:h-[380px] lg:h-[520px]">
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

                {/* tags */}
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                        <TagChip key={i} tone={t.tone || "neutral"}>
                            {t.text}
                        </TagChip>
                    ))}
                </div>

                {/* bottom caption */}
                {caption && (
                    <div className="absolute left-5 right-5 bottom-5">
                        <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                            <div className="text-sm text-white/70 leading-relaxed">{caption}</div>
                        </Glass>
                    </div>
                )}

                {/* sheen */}
                <motion.div
                    aria-hidden="true"
                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.05 }}
                />
                <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>
        </div>
    );
}

/* ===================== Unified atoms ===================== */

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

/**
 * Same exact frame recipe as the TOP hero:
 * - Glass shell
 * - grading + radial glow + grain
 * - sheen sweep
 * - ring
 * Fit:
 * - cover: full-bleed photo style
 * - contain: UI screenshot style (no cropping), still same frame overlays
 */
function MediaFrame({
    src,
    alt,
    heightClass = "h-[320px] sm:h-[380px] lg:h-[520px]",
    fit = "cover",
    loading = "lazy",
    reduceMotion = false,
    children,
}) {
    const imgClass =
        fit === "contain"
            ? "object-contain p-3"
            : "object-cover object-center";

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

                {/* grading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.18),transparent_55%)]" />

                {/* grain */}
                <div
                    className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.30\'/%3E%3C/svg%3E")',
                    }}
                />

                {children}

                {/* sheen */}
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
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                {children}
            </span>
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
    };
    return (
        <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${toneMap[tone] || toneMap.neutral
                }`}
        >
            {children}
        </span>
    );
}

function FeatureCard({ reduceMotion, delay = 0, tone = "emerald", icon, title, items }) {
    const checkColor = tone === "red" ? "text-red-300/80" : "text-emerald-300/80";
    const iconTone = tone === "red" ? "red" : "emerald";

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={
                reduceMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 110, damping: 20, mass: 0.9, delay }
            }
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
