import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    Target,
    Shield,
    Layers,
    ChevronDown,
} from "lucide-react";

import breakoutLong from "../../assets/breakout-long.png";
import breakoutShort from "../../assets/breakout-short.png";

const easePremium = [0.16, 1, 0.3, 1];

/** ✅ Desktop breakpoint helper (used to tune in-view behavior on mobile) */
function useIsLgUp() {
    const [isLgUp, setIsLgUp] = useState(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(min-width: 1024px)").matches;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const m = window.matchMedia("(min-width: 1024px)");
        const onChange = () => setIsLgUp(m.matches);
        onChange();
        m.addEventListener?.("change", onChange);
        return () => m.removeEventListener?.("change", onChange);
    }, []);

    return isLgUp;
}

export default function PrecisionEntryDetection() {
    const reduceMotion = useReducedMotion();
    const isLgUp = useIsLgUp();
    const mobile = !isLgUp;

    const [activeArchetype, setActiveArchetype] = useState<"long" | "short">("long");

    // ✅ dropdown open state (default open = active)
    const [openArchetype, setOpenArchetype] = useState<"long" | "short" | null>("long");

    /**
     * ✅ Mobile fix:
     * - trigger earlier (viewport margin + lower amount)
     * - keep animation (still fades in), but DON'T start at opacity:0 to avoid "blank space"
     */
    const enter = (dir = 1, d = 0) => ({
        initial: mobile
            ? { opacity: 0.14, y: 18 * dir, } // ✅ visible (no blank), still animates
            : { opacity: 0, y: 16 * dir, },
        whileInView: { opacity: 1, y: 0, },
        transition: reduceMotion
            ? { duration: 0.01 }
            : { duration: 0.85, delay: d, ease: easePremium },
        viewport: mobile
            ? { once: false, amount: 0.12, margin: "0px 0px 20% 0px" } // ✅ earlier on mobile
            : { once: false, amount: 0.35, margin: "0px 0px -18% 0px" },
    });

    const longItems = useMemo(
        () => [
            "Bullish Continuation prints (trend building)",
            "Bull Reaction confirms (FAST line holds)",
            "Breakout / Trigger (white label) prints",
        ],
        []
    );

    const shortItems = useMemo(
        () => [
            "Bear bias holds",
            "Bear reaction confirms (resistance zone holds)",
            "Open Short: sell on FAST-line touch, SL at mid-trend",
        ],
        []
    );

    const activeImg = activeArchetype === "long" ? breakoutLong : breakoutShort;

    const infoText =
        activeArchetype === "long" ? (
            <>
                Bullish Continuation = trend building. Breakout (white label) = likely no fast-line
                retest. Open Long = buy on fast-line touch, SL at mid-trend. Hold while trend
                holds. Blue diamond = take profits / close long.
            </>
        ) : (
            <>
                Open Short = sell on the FAST-line touch, SL at mid-trend. Orange diamond = optional
                take-profit zone. Hold while trend holds for potential further downside.
            </>
        );

    const onPickArchetype = (next: "long" | "short") => {
        setActiveArchetype(next);
        setOpenArchetype((prev) => (prev === next ? null : next)); // toggle dropdown for same, open for other
    };

    return (
        <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
            <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                {/* Header */}
                <div className="space-y-3 mb-10">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                        <div className="w-full sm:w-auto">
                            <Kicker className="w-full sm:w-fit">Engine 3 • Signal &amp; Execution</Kicker>
                        </div>

                        <span className="w-full sm:w-auto px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] uppercase text-white/55 text-center sm:text-left">
                            Step 3 • Execution
                        </span>
                    </div>

                    {/* ✅ Animated headline */}
                    <motion.h2
                        {...enter(1, 0.02)}
                        className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]"
                    >
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                            Precise Entry Detection
                        </span>
                    </motion.h2>

                    {/* ✅ Animated subtext */}
                    <motion.p
                        {...enter(1, 0.06)}
                        className="text-white/70 text-lg leading-relaxed max-w-2xl"
                    >
                        Structure gives direction and filters create clarity. This is where you execute
                        only on clean reactions.
                    </motion.p>
                </div>

                {/* Body */}
                <motion.div {...enter(1, 0.08)}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
                        {/* LEFT — dropdown cards */}
                        <div className="lg:col-span-5 w-full space-y-4 order-2 lg:order-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                <FeatureDropdownCard
                                    archetype="long"
                                    active={activeArchetype === "long"}
                                    open={openArchetype === "long"}
                                    onPress={() => onPickArchetype("long")}
                                    tone="emerald"
                                    icon={<ArrowUpRight className="w-5 h-5 text-emerald-300" />}
                                    title="Long archetype"
                                    subtitle="Reaction at support → pressure confirms → trigger prints."
                                    items={longItems}
                                />
                                <FeatureDropdownCard
                                    archetype="short"
                                    active={activeArchetype === "short"}
                                    open={openArchetype === "short"}
                                    onPress={() => onPickArchetype("short")}
                                    tone="red"
                                    icon={<ArrowDownRight className="w-5 h-5 text-red-300" />}
                                    title="Short archetype"
                                    subtitle="Breakdown at resistance → expansion follows → execute clean."
                                    items={shortItems}
                                />
                            </div>

                            <div className="text-xs text-white/45">
                                Pro Tip: As soon as price touches the fast line, the trade is triggered.
                                Risk is defined by the mid-trend line, with the stop placed slightly below
                                it. The same logic applies in reverse for short setups, with entries, risk,
                                and invalidation mirrored to the downside.
                            </div>
                        </div>

                        {/* RIGHT — dynamic image (NO scaling on screenshot, only smooth resize below) */}
                        <div className="lg:col-span-7 w-full order-1 lg:order-2 relative">
                            {/* Screenshot NEVER inside a layout-animated parent */}
                            <div>
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

                                    {/* Overlay info only on sm+ */}
                                    <div className="hidden sm:block absolute left-5 right-5 bottom-5">
                                        <Glass className="rounded-2xl bg-black/35 px-4 py-3">
                                            <div className="text-sm text-white/70 leading-relaxed">{infoText}</div>
                                        </Glass>
                                    </div>
                                </MediaFrame>
                            </div>

                            {/* Mobile info OUTSIDE screenshot: smooth height only (no scaling of screenshot) */}
                            <motion.div
                                layout="size"
                                initial={false}
                                className="sm:hidden mt-3"
                                transition={
                                    reduceMotion ? { duration: 0.01 } : { layout: { duration: 0.35, ease: easePremium } }
                                }
                            >
                                <Glass className="rounded-2xl px-4 py-3">
                                    <div className="text-sm text-white/70 leading-relaxed">{infoText}</div>
                                </Glass>
                            </motion.div>


                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ===================== Atoms ===================== */

function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
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
}: {
    src: string;
    alt: string;
    heightClass?: string;
    fit?: "cover" | "contain";
    loading?: "lazy" | "eager";
    reduceMotion?: boolean;
    children?: React.ReactNode;
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

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={[
                "inline-flex items-center justify-center px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit",
                className,
            ].join(" ")}
        >
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">{children}</span>
        </div>
    );
}

function TagChip({
    children,
    tone = "neutral",
}: {
    children: React.ReactNode;
    tone?: "neutral" | "emerald" | "red";
}) {
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

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
            {icon}
            <span className="whitespace-nowrap">{children}</span>
        </span>
    );
}

function IconBox({
    children,
    tone = "neutral",
}: {
    children: React.ReactNode;
    tone?: "neutral" | "emerald" | "red";
}) {
    const toneMap: Record<string, string> = {
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

/* ===================== Dropdown Card ===================== */

function FeatureDropdownCard({
    archetype,
    active,
    open,
    onPress,
    tone = "emerald",
    icon,
    title,
    subtitle,
    items,
}: {
    archetype: "long" | "short";
    active: boolean;
    open: boolean;
    onPress: () => void;
    tone?: "emerald" | "red";
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    items: string[];
}) {
    const checkColor = tone === "red" ? "text-red-300/80" : "text-emerald-300/80";
    const iconTone = tone === "red" ? "red" : "emerald";

    const borderActive =
        tone === "red"
            ? active
                ? "border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.28)]"
                : "border-white/10"
            : active
                ? "border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.28)]"
                : "border-white/10";

    const bgActive = active ? "bg-white/[0.08]" : "bg-white/[0.03]";

    const chevronTone = tone === "red" ? "text-red-200/70" : "text-emerald-200/70";

    return (
        <div
            className={[
                "h-full w-full rounded-2xl border backdrop-blur-md overflow-hidden",
                "transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out",
                "hover:-translate-y-[1px] active:translate-y-0",
                borderActive,
                bgActive,
            ].join(" ")}
        >
            <button
                type="button"
                onClick={onPress}
                aria-expanded={open}
                aria-controls={`archetype-panel-${archetype}`}
                className="w-full text-left px-6 pt-5 pb-4"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <IconBox tone={iconTone}>{icon}</IconBox>
                            <h3 className="text-lg font-semibold text-white/90">{title}</h3>
                        </div>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed">{subtitle}</p>
                    </div>

                    <span
                        className={[
                            "shrink-0 mt-1 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-2",
                            "transition-transform duration-200 ease-out",
                            open ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                    >
                        <ChevronDown className={`w-4 h-4 ${chevronTone}`} />
                    </span>
                </div>
            </button>

            {/* Dropdown content (fast collapse without height:auto measurement) */}
            <div
                id={`archetype-panel-${archetype}`}
                className={[
                    "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-5">
                        <div className="h-px w-full bg-white/10 mb-4" />

                        <div className="text-xs tracking-[0.18em] uppercase text-white/45 mb-3">Details</div>

                        <ul className="text-white/70 space-y-2 text-sm leading-relaxed">
                            {items.map((t) => (
                                <li key={t} className="flex gap-2">
                                    <span className={checkColor}>✓</span> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
