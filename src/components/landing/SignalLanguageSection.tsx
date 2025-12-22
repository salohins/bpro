import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowDownRight,
    ArrowUp,
    ArrowDown,
    Target,
    Plus,
    Circle,
    X,
    Diamond,
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import breakoutLogicImg from "../../assets/breakoutLogic.png";

const easePremium = [0.16, 1, 0.3, 1];

export default function SignalLanguageSection() {
    const reduceMotion = useReducedMotion();

    const enter = (dir = 1, d = 0) => ({
        initial: { opacity: 0, y: 16 * dir, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, delay: d, ease: easePremium },
        viewport: { once: false, amount: 0.35 },
    });

    const signalLegend = useMemo(
        () => [
            { key: "open-long", title: "Open Long", desc: "Long entry trigger", tone: "emerald", icon: <ArrowUpRight className="h-4 w-4 text-emerald-300" /> },
            { key: "open-short", title: "Open Short", desc: "Short entry trigger", tone: "red", icon: <ArrowDownRight className="h-4 w-4 text-red-300" /> },
            { key: "breakout", title: "Breakout", desc: "Breaks out of range", tone: "neutral", icon: <ArrowUp className="h-4 w-4 text-white/80" /> },
            { key: "breakdown", title: "Breakdown", desc: "Breaks down from range", tone: "yellow", icon: <ArrowDown className="h-4 w-4 text-yellow-300" /> },
            { key: "close-long", title: "Close Long", desc: "Long exit / take profit", tone: "blue", icon: <Diamond className="h-4 w-4 text-blue-300" /> },
            { key: "close-short", title: "Close Short", desc: "Short exit / take profit", tone: "orange", icon: <Diamond className="h-4 w-4 text-orange-300" /> },
            { key: "cross-up", title: "Cross Up", desc: "Bullish cross marker", tone: "emerald", icon: <X className="h-4 w-4 text-emerald-300" /> },
            { key: "cross-down", title: "Cross Down", desc: "Bearish cross marker", tone: "red", icon: <X className="h-4 w-4 text-red-300" /> },
            { key: "squeeze-down", title: "Squeeze Down", desc: "Compression / move loading", tone: "neutral", icon: <Plus className="h-4 w-4 text-white/80" /> },
            { key: "bull-cont", title: "Bull Continuation", desc: "Trend continuation (bull)", tone: "emerald", icon: <Circle className="h-4 w-4 text-emerald-300" /> },
            { key: "bear-cont", title: "Bear Continuation", desc: "Trend continuation (bear)", tone: "red", icon: <Circle className="h-4 w-4 text-red-300" /> },
            { key: "long-invalid", title: "Long Invalidated", desc: "Long setup invalidation", tone: "purple", icon: <Circle className="h-4 w-4 text-purple-200" /> },
            { key: "short-invalid", title: "Short Invalidated", desc: "Short setup invalidation", tone: "purple", icon: <Circle className="h-4 w-4 text-purple-200" /> },
        ],
        []
    );

    return (
        <section className="relative w-full py-20 md:py-24 bg-transparent text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-0 right-0 -top-32 -bottom-32 bg-[radial-gradient(circle_at_55%_12%,rgba(16,185,129,0.10),transparent_60%)]" />
                <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
                {/* Header */}
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <Kicker>Signal &amp; Execution ENGINE</Kicker>
                        <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] tracking-[0.18em] uppercase text-white/55">
                            Icon Language
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                            Read Signals with Context. <br/>Trade With Clarity.
                        </span>
                    </h2>

                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                        Instead of more arrows, you get context. Squeeze, invalidation, and continuation signals appear only where price actually reacts.
                    </p>
                </div>

                {/* Body */}
                <motion.div {...enter(1, 0.05)} className="mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch">
                        {/* LEFT */}
                        <div className="lg:col-span-7 w-full">
                            <CinematicImage
                                src={breakoutLogicImg}
                                alt="Breakout Logic screenshot showing squeeze, invalidation and continuation icons"
                                tags={[
                                    { text: "Real signal context" },
                                    { text: "Mid mode / 15m", tone: "emerald" },
                                ]}
                                caption="Use the icons at reaction zones to reduce guesswork."
                                reduceMotion={reduceMotion}
                            />


                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-5 w-full lg:pl-6 lg:border-l lg:border-white/10">
                            <VerticalLegendSlider items={signalLegend} perPage={4} />
                        </div>
                    </div>
                </motion.div>

                <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
                    <span>Signal language • visual legend</span>
                </div>
            </div>
        </section>
    );
}

/* ===================== Legend Slider (fixed height + arrows + swipe) ===================== */

function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

/* ... keep all imports as before ... */

function VerticalLegendSlider({ items, perPage = 6 }) {
    const reduceMotion = useReducedMotion();
    const pages = useMemo(() => chunk(items, perPage), [items, perPage]);
    const [page, setPage] = useState(0);
    const [dir, setDir] = useState(1);
    const wrap = (n) => (n + pages.length) % pages.length;
    const next = () => { setDir(1); setPage((p) => wrap(p + 1)); };
    const prev = () => { setDir(-1); setPage((p) => wrap(p - 1)); };

    const variants = {
        enter: (d) => ({ opacity: 0, y: reduceMotion ? 0 : d * 18, filter: "blur(10px)" }),
        center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: easePremium } },
        exit: (d) => ({ opacity: 0, y: reduceMotion ? 0 : d * -18, filter: "blur(10px)", transition: { duration: 0.45, ease: easePremium } }),
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
                            className="absolute inset-0 p-6 space-y-3"
                        >
                            {(pages[page] || []).map((s) => (
                                <LegendRow
                                    key={s.key}
                                    icon={<IconBox tone={s.tone}>{s.icon}</IconBox>}
                                    title={s.title}
                                    desc={s.desc}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs text-white/40">Tip: ignore icons away from reaction zones.</div>
                    <div className="flex items-center gap-2">
                        {pages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }}
                                aria-label={`Go to page ${i + 1}`}
                                className={`h-2.5 rounded-full transition-all ${i === page
                                    ? "w-8 bg-emerald-300/70"
                                    : "w-2.5 bg-white/15 hover:bg-white/25"
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

function Kicker({ children }) {
    return (
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">{children}</span>
        </div>
    );
}

function CinematicImage({ src, alt, tags = [], caption, reduceMotion }) {
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
