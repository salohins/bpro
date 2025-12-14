import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Plus,
    Minus,
    Sparkles,
    ShieldCheck,
    Zap,
    SlidersHorizontal,
    Star,
    ArrowRight,
} from "lucide-react";

export default function FAQSection() {
    const reduceMotion = useReducedMotion();

    const faqs = useMemo(
        () => [
            {
                icon: <Zap className="w-4 h-4 text-emerald-300" />,
                q: "What makes B:PRO different from typical indicators?",
                a: "B:PRO is built as a system — not a single signal. It combines structure, trend context, multi-filter validation, and scoring so you act only when confluence is undeniable.",
                tag: "System",
            },
            {
                icon: <SlidersHorizontal className="w-4 h-4 text-emerald-300" />,
                q: "Does it repaint or change past signals?",
                a: "Structure and trend logic are designed to avoid repaint-style deception. Some components may update as new candles form (as any real-time system does), but the framework prioritizes decision integrity.",
                tag: "Integrity",
            },
            {
                icon: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
                q: "How does the Safety / Quality scoring work?",
                a: "Safety focuses on volatility and risk gates. Quality focuses on confluence and clarity. Together they give you a quick decision snapshot: skip, watch, or execute.",
                tag: "Scoring",
            },
            {
                icon: <Star className="w-4 h-4 text-emerald-300" />,
                q: "Which markets and timeframes work best?",
                a: "B:PRO is designed to be market-agnostic. Choose a Trade Mode that matches your style (Short/Mid/Long) and let the filters adapt to the timeframe context.",
                tag: "Compatibility",
            },
            {
                icon: <Sparkles className="w-4 h-4 text-emerald-300" />,
                q: "Is this beginner-friendly?",
                a: "Yes — the system is complex under the hood, but the UX is built to be simple: follow structure first, confirm filters, then check the score before executing.",
                tag: "Learning",
            },
        ],
        []
    );

    const [open, setOpen] = useState(0);

    const container = {
        hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="relative w-full py-28 md:py-32 overflow-hidden text-white bg-transparent">


            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md mb-4">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                            FAQ
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                        <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                            Questions, answered — fast.
                        </span>
                    </h2>

                    <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                        No fluff. Just the clarity you need to decide if B:PRO fits your trading style.
                    </p>
                </motion.div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: “Crazy” stacked cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: false, amount: 0.35 }}
                        className="lg:col-span-5 space-y-4"
                    >
                        <FeatureCard
                            reduceMotion={reduceMotion}
                            title="Instant clarity"
                            desc="Open one question and the rest dims — your eyes stay locked on the answer."
                            icon={<Sparkles className="w-5 h-5 text-emerald-300" />}
                        />
                        <FeatureCard
                            reduceMotion={reduceMotion}
                            title="Built for speed"
                            desc="No walls of text. Short answers. Clear tags. Zero confusion."
                            icon={<Zap className="w-5 h-5 text-emerald-300" />}
                        />
                        <FeatureCard
                            reduceMotion={reduceMotion}
                            title="Signal integrity"
                            desc="Designed to keep decisions honest — avoid repaint-style deception."
                            icon={<ShieldCheck className="w-5 h-5 text-emerald-300" />}
                        />
                    </motion.div>

                    {/* Right: Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: false, amount: 0.35 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                            <div className="relative rounded-3xl overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-xl">
                                {/* sheen sweep */}
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100"
                                    animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                                />

                                <div className="relative p-2">
                                    {faqs.map((item, idx) => {
                                        const isOpen = open === idx;
                                        return (
                                            <FAQItem
                                                key={item.q}
                                                idx={idx}
                                                isOpen={isOpen}
                                                dim={open !== idx}
                                                onToggle={() => setOpen(isOpen ? -1 : idx)}
                                                reduceMotion={reduceMotion}
                                                icon={item.icon}
                                                q={item.q}
                                                a={item.a}
                                                tag={item.tag}
                                            />
                                        );
                                    })}
                                </div>

                                {/* footer */}
                                <div className="px-6 pb-6 pt-3">
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <div className="pt-4 flex items-center justify-between text-xs text-white/45">
                                        <span>Still unsure?</span>
                                        <span className="inline-flex items-center gap-2 text-emerald-300/80">
                                            Ask us <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>


        </section>
    );
}

/* ---------------- Components ---------------- */

function FeatureCard({ title, desc, icon, reduceMotion }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.35 }}
            whileHover={reduceMotion ? {} : { y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl"
        >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent" />
            <div className="absolute inset-[1px] rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md" />
            <div className="relative p-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 grid place-items-center">
                        {icon}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white/90">{title}</div>
                        <div className="text-xs text-white/55 mt-1">{desc}</div>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-[90px]"
            />
        </motion.div>
    );
}

function FAQItem({ isOpen, onToggle, reduceMotion, icon, q, a, tag, dim, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.35 }}
            className={`relative rounded-2xl overflow-hidden mb-2 ${dim ? "opacity-80" : "opacity-100"
                }`}
        >
            <button
                onClick={onToggle}
                className="w-full text-left group"
                aria-expanded={isOpen}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md transition-colors group-hover:bg-white/[0.04]" />
                    <div className="relative px-5 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.03] grid place-items-center">
                            {icon}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm md:text-base font-semibold text-white/90">
                                    {q}
                                </div>
                                <span className="hidden md:inline-flex px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/55 tracking-widest uppercase">
                                    {tag}
                                </span>
                            </div>
                            <div className="md:hidden mt-1 text-[11px] text-white/45 tracking-widest uppercase">
                                {tag}
                            </div>
                        </div>

                        <motion.div
                            animate={reduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.03] grid place-items-center"
                        >
                            {isOpen ? (
                                <Minus className="w-4 h-4 text-emerald-300" />
                            ) : (
                                <Plus className="w-4 h-4 text-emerald-300" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="px-5 pb-5 pt-1">
                            <div className="text-sm text-white/70 leading-relaxed">
                                {a}
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                                    Verified framework logic
                                </span>
                            </div>
                        </div>

                        {/* subtle glow */}
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/12 blur-[90px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
