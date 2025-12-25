import React, { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

import breakoutLogicImg from "../../assets/breakoutLogic.png";

// ✅ Custom SVG icons (your assets)
import BearContinuationIcon from "../../assets/BearContinuation.svg";
import BreakdownIcon from "../../assets/Breakdown.svg";
import BreakoutIcon from "../../assets/Breakout.svg";
import BullContinuationIcon from "../../assets/BullContinuation.svg";
import CloseLongIcon from "../../assets/CloseLong.svg";
import CloseShortIcon from "../../assets/CloseShort.svg";
import CrossDownIcon from "../../assets/CrossDown.svg";
import CrossUpIcon from "../../assets/CrossUp.svg";
import LongShortInvalidatedIcon from "../../assets/LongShortInvalidated.svg";
import OpenLongIcon from "../../assets/OpenLong.svg";
import OpenShortIcon from "../../assets/OpenShort.svg";
import SqueezeIcon from "../../assets/Squeeze.svg";

const easePremium = [0.16, 1, 0.3, 1] as const;

/** ✅ Desktop breakpoint helper */
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

export default function SignalLanguageSection() {
    const reduceMotion = useReducedMotion();
    const isLgUp = useIsLgUp();
    const mobile = !isLgUp;

    /**
     * ✅ Mobile fix:
     * - trigger earlier (lower amount + positive viewport margin)
     * - keep animation but avoid "blank space" by not starting at opacity:0 on mobile
     */
    const enter = (dir = 1, d = 0) => ({
        initial: mobile
            ? { opacity: 0.14, y: 18 * dir, filter: "blur(10px)" } // ✅ visible, still animates
            : { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: reduceMotion
            ? { duration: 0.01 }
            : { duration: 0.85, delay: d, ease: easePremium },
        viewport: mobile
            ? { once: false, amount: 0.12, margin: "0px 0px 22% 0px" } // ✅ earlier on mobile
            : { once: false, amount: 0.35 },
    });

    const signalLegend = useMemo(
        () => [
            {
                key: "open-long",
                title: "Open Long",
                desc: "Long entry trigger",
                tone: "emerald",
                icon: <img src={OpenLongIcon} alt="Open Long" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "open-short",
                title: "Open Short",
                desc: "Short entry trigger",
                tone: "red",
                icon: <img src={OpenShortIcon} alt="Open Short" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "breakout",
                title: "Breakout",
                desc: "Breaks out of range",
                tone: "neutral",
                icon: <img src={BreakoutIcon} alt="Breakout" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "breakdown",
                title: "Breakdown",
                desc: "Breaks down from range",
                tone: "yellow",
                icon: <img src={BreakdownIcon} alt="Breakdown" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "close-long",
                title: "Close Long",
                desc: "Long exit",
                tone: "blue",
                icon: <img src={CloseLongIcon} alt="Close Long" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "close-short",
                title: "Close Short",
                desc: "Short exit",
                tone: "orange",
                icon: <img src={CloseShortIcon} alt="Close Short" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "cross-up",
                title: "Cross Up",
                desc: "Bullish cross marker",
                tone: "emerald",
                icon: <img src={CrossUpIcon} alt="Cross Up" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "cross-down",
                title: "Cross Down",
                desc: "Bearish cross marker",
                tone: "red",
                icon: <img src={CrossDownIcon} alt="Cross Down" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "squeeze-down",
                title: "Squeeze",
                desc: "Compression",
                tone: "neutral",
                icon: <img src={SqueezeIcon} alt="Squeeze" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "bull-cont",
                title: "Bull Continuation",
                desc: "Trend continuation",
                tone: "emerald",
                icon: <img src={BullContinuationIcon} alt="Bull Continuation" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "bear-cont",
                title: "Bear Continuation",
                desc: "Trend continuation",
                tone: "red",
                icon: <img src={BearContinuationIcon} alt="Bear Continuation" className="h-4 w-4 object-contain" draggable={false} />,
            },
            {
                key: "long-invalid",
                title: "Long/Short Invalidated",
                desc: "Long setup invalidation",
                tone: "purple",
                icon: (
                    <img
                        src={LongShortInvalidatedIcon}
                        alt="Long/Short Invalidated"
                        className="h-4 w-4 object-contain"
                        draggable={false}
                    />
                ),
            },
        ],
        []
    );

    return (
        <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
            <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                {/* Header */}
                <div className="space-y-3">
                    <motion.div {...enter(1, 0.0)} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                        <Kicker className="w-full sm:w-auto">Signal &amp; Execution ENGINE</Kicker>

                        <span className="w-full sm:w-auto inline-flex items-center justify-center text-center px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] uppercase text-white/55">
                            Icon Language
                        </span>
                    </motion.div>

                    {/* ✅ Animated headline */}
                    <motion.h2
                        {...enter(1, 0.05)}
                        className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]"
                    >
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                            Read Signals with Context. <br />
                            Trade with Clarity.
                        </span>
                    </motion.h2>

                    {/* ✅ Animated paragraph */}
                    <motion.p {...enter(1, 0.1)} className="text-white/70 text-lg leading-relaxed max-w-2xl">
                        Instead of more arrows, you get context. Squeeze, invalidation, and continuation signals appear only where price
                        actually reacts.
                    </motion.p>
                </div>

                {/* Body */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch">
                        {/* LEFT (animate earlier on mobile) */}
                        <motion.div {...enter(1, 0.04)} className="lg:col-span-7 w-full">
                            <CinematicImage
                                src={breakoutLogicImg}
                                alt="Breakout Logic screenshot showing squeeze, invalidation and continuation icons"
                                caption="Use the icons at reaction zones to reduce guesswork."
                                reduceMotion={reduceMotion}
                            />
                        </motion.div>

                        {/* RIGHT (slightly later) */}
                        <motion.div {...enter(1, 0.12)} className="lg:col-span-5 w-full lg:pl-6 lg:border-l lg:border-white/10">
                            <VerticalLegendSlider items={signalLegend} perPage={4} />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    {...enter(1, 0.14)}
                    className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45"
                >
                    <span>Signal language • visual legend</span>
                </motion.div>
            </div>
        </section>
    );
}

/* ===================== Legend Slider (fixed height + arrows + swipe) ===================== */

function chunk(arr: any[], size: number) {
    const out: any[] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

function VerticalLegendSlider({ items, perPage = 6 }: { items: any[]; perPage?: number }) {
    const reduceMotion = useReducedMotion();
    const pages = useMemo(() => chunk(items, perPage), [items, perPage]);
    const [page, setPage] = useState(0);
    const [dir, setDir] = useState(1);

    const wrap = (n: number) => (n + pages.length) % pages.length;
    const next = () => {
        setDir(1);
        setPage((p) => wrap(p + 1));
    };
    const prev = () => {
        setDir(-1);
        setPage((p) => wrap(p - 1));
    };

    const variants = {
        enter: (d: number) => ({ opacity: 0, y: reduceMotion ? 0 : d * 18, filter: "blur(10px)" }),
        center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: easePremium } },
        exit: (d: number) => ({
            opacity: 0,
            y: reduceMotion ? 0 : d * -18,
            filter: "blur(10px)",
            transition: { duration: 0.45, ease: easePremium },
        }),
    };

    return (
        <div className="w-full rounded-[34px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14">
            <div className="w-full rounded-[34px] overflow-hidden bg-[#0b0b0b]/72 backdrop-blur-xl border border-white/10 h-[460px] flex flex-col">
                {/* Header with arrows */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-semibold text-white/90">Signal Legend</div>
                        <div className="text-xs text-white/50">Swipe or use arrows</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-[11px] text-white/45 tracking-widest uppercase">
                            {page + 1} / {pages.length}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
                            >
                                <ChevronUp className="h-5 w-5 text-white/70" />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
                            >
                                <ChevronDown className="h-5 w-5 text-white/70" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative flex-1 overflow-hidden">
                    <AnimatePresence initial={false} custom={dir} mode="popLayout">
                        <motion.div
                            key={page}
                            custom={dir}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag={reduceMotion ? false : "y"}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.1}
                            onDragEnd={(_, info) => {
                                const t = 70;
                                if (info.offset.y < -t) next();
                                if (info.offset.y > t) prev();
                            }}
                            className="absolute inset-0 p-6 space-y-1.5 md:space-y-2"
                        >
                            {(pages[page] || []).map((s: any) => (
                                <LegendRow key={s.key} icon={<IconBox tone={s.tone}>{s.icon}</IconBox>} title={s.title} desc={s.desc} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {pages.map((_: any, i: number) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDir(i > page ? 1 : -1);
                                    setPage(i);
                                }}
                                aria-label={`Go to page ${i + 1}`}
                                className={`h-2.5 rounded-full transition-all ${i === page ? "w-8 bg-emerald-300/70" : "w-2.5 bg-white/15 hover:bg-white/25"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ===================== Atoms ===================== */

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={[
                "w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md",
                className,
            ].join(" ")}
        >
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">{children}</span>
        </div>
    );
}

function CinematicImage({
    src,
    alt,
    tags = [],
    caption,
    reduceMotion,
}: {
    src: string;
    alt: string;
    tags?: Array<{ text: string; tone?: string }>;
    caption?: string;
    reduceMotion: boolean;
}) {
    return (
        <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10">
            <div className="relative h-[460px]">
                <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(16,185,129,0.18),transparent_55%)]" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                        <TagChip key={i} tone={t.tone || "neutral"}>
                            {t.text}
                        </TagChip>
                    ))}
                </div>

                {caption && (
                    <div className="absolute left-5 right-5 bottom-5">
                        <div className="rounded-2xl bg-black/35 px-4 py-3 backdrop-blur-md border border-white/10">
                            <div className="text-sm text-white/70 leading-relaxed">{caption}</div>
                        </div>
                    </div>
                )}

                <motion.div
                    aria-hidden="true"
                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.05 }}
                />
            </div>
        </div>
    );
}

function TagChip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
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

function IconBox({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
    const toneMap: Record<string, string> = {
        neutral: "bg-white/[0.03] border-white/10",
        emerald: "bg-emerald-400/10 border-emerald-400/20",
        red: "bg-red-500/10 border-red-400/20",
        purple: "bg-purple-400/10 border-purple-400/20",
        yellow: "bg-yellow-400/10 border-yellow-400/20",
        blue: "bg-blue-400/10 border-blue-400/20",
        orange: "bg-orange-400/10 border-orange-400/20",
    };

    return (
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${toneMap[tone] || toneMap.neutral}`}>
            {children}
        </span>
    );
}

function LegendRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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
