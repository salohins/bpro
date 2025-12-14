import React, { useMemo, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { Zap, Gauge, TrendingUp } from "lucide-react";

function ModeCard({ mode, index, reduceMotion }) {
    const ref = useRef(null);

    // Premium tilt (subtle, controlled)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const sx = useSpring(mx, { stiffness: 240, damping: 24, mass: 0.7 });
    const sy = useSpring(my, { stiffness: 240, damping: 24, mass: 0.7 });

    const rotateY = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-8, 8]);
    const rotateX = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [8, -8]);

    const onMove = (e) => {
        if (reduceMotion || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        mx.set(px);
        my.set(py);
    };

    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.35 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex-1 min-w-[290px] overflow-hidden rounded-3xl"
        >
            {/* Gradient frame */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${mode.frame} opacity-100`} />
            <div className="absolute inset-[1px] rounded-3xl bg-[#070707]/80 backdrop-blur-xl border border-white/10" />

            {/* Soft aurora bloom */}
            <div
                aria-hidden="true"
                className={`absolute -top-24 -right-20 w-[320px] h-[320px] rounded-full blur-[90px] opacity-35 ${mode.bloom}`}
            />
            <div
                aria-hidden="true"
                className={`absolute -bottom-28 -left-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-25 ${mode.bloom2}`}
            />

            {/* Sheen sweep */}
            <motion.div
                aria-hidden="true"
                className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Micro grid */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.10] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-9">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={reduceMotion ? {} : { rotate: 8, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className={`relative grid place-items-center w-12 h-12 rounded-2xl border border-white/10 ${mode.iconBg}`}
                        >
                            {/* icon glow */}
                            <div className={`absolute inset-0 rounded-2xl opacity-40 blur-xl ${mode.iconGlow}`} />
                            <div className="relative">{mode.icon}</div>
                        </motion.div>

                        <div className="leading-tight">
                            <h3 className={`text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${mode.title}`}>
                                {mode.titleText}
                            </h3>
                            <p className="text-xs text-white/50 tracking-widest uppercase mt-1">
                                {mode.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[11px] text-white/50 tracking-widest uppercase">Intensity</span>
                        <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${mode.intensityBar}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: mode.intensityWidth }}
                                transition={{ duration: 0.9, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: false, amount: 0.35 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70" />

                {/* Bullets */}
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                    {mode.bullets.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className={`mt-2 inline-block w-1.5 h-1.5 rounded-full ${mode.dot}`} />
                            <span className="leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA hint */}
                <div className="mt-7 flex items-center justify-between">
                    <span className="text-xs text-white/45">
                        Optimized for <span className="text-white/70">{mode.timeframe}</span>
                    </span>

                    <motion.div
                        whileHover={reduceMotion ? {} : { x: 3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`text-xs font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${mode.title}`}
                    >
                        Explore →
                    </motion.div>
                </div>
            </div>

            {/* Hover ring */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(16,185,129,0.10)",
                }}
            />
        </motion.article>
    );
}

export default function TradeModes() {
    const reduceMotion = useReducedMotion();

    const modes = useMemo(
        () => [
            {
                titleText: "Short Mode",
                subtitle: "Scalp velocity",
                timeframe: "5m–30m",
                // gradients
                title: "from-red-300 via-red-200 to-pink-200",
                frame: "from-red-500/35 via-white/8 to-pink-500/25",
                bloom: "bg-red-500/30",
                bloom2: "bg-pink-500/25",
                iconBg: "bg-white/[0.03]",
                iconGlow: "bg-red-500/25",
                dot: "bg-red-300",
                intensityBar: "bg-gradient-to-r from-red-400 to-pink-300",
                intensityWidth: "85%",
                icon: <Zap className="w-6 h-6 text-red-300" />,
                bullets: [
                    "Aggressive intraday scalps",
                    "Fast EMAs + tight ATR filters",
                    "High signal frequency, quick exits",
                ],
            },
            {
                titleText: "Mid Mode",
                subtitle: "Balanced control",
                timeframe: "1H–4H",
                title: "from-emerald-200 via-teal-200 to-cyan-200",
                frame: "from-emerald-400/35 via-white/8 to-cyan-400/25",
                bloom: "bg-emerald-500/28",
                bloom2: "bg-cyan-500/18",
                iconBg: "bg-white/[0.03]",
                iconGlow: "bg-emerald-500/22",
                dot: "bg-emerald-300",
                intensityBar: "bg-gradient-to-r from-emerald-300 to-cyan-200",
                intensityWidth: "60%",
                icon: <Gauge className="w-6 h-6 text-emerald-200" />,
                bullets: [
                    "Balanced for 1H–4H charts",
                    "Moderate filter strictness",
                    "Smart adaptive stops",
                ],
            },
            {
                titleText: "Long Mode",
                subtitle: "Trend stability",
                timeframe: "Daily–Weekly",
                title: "from-blue-200 via-indigo-200 to-purple-200",
                frame: "from-blue-500/30 via-white/8 to-purple-500/25",
                bloom: "bg-blue-500/22",
                bloom2: "bg-purple-500/22",
                iconBg: "bg-white/[0.03]",
                iconGlow: "bg-blue-500/20",
                dot: "bg-blue-200",
                intensityBar: "bg-gradient-to-r from-blue-300 to-purple-200",
                intensityWidth: "40%",
                icon: <TrendingUp className="w-6 h-6 text-blue-200" />,
                bullets: [
                    "Swing & position trades",
                    "Slow EMAs & structural pivots",
                    "Max trend-following stability",
                ],
            },
        ],
        []
    );

    return (
        <section className="relative w-full py-28 md:py-32 overflow-hidden text-white bg-transparent">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.35 }}
                className="text-center relative z-10 mb-14 md:mb-20 px-4"
            >
                <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md mb-4">
                    <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                        Trade Modes
                    </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                    <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                        Choose Your Trading Velocity
                    </span>
                </h2>

                <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                    Each mode optimizes signals for your timeframe — from lightning-fast scalps to deep structural swings.
                </p>
            </motion.div>

            {/* Cards */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {modes.map((mode, i) => (
                        <ModeCard key={mode.titleText} mode={mode} index={i} reduceMotion={reduceMotion} />
                    ))}
                </div>

                {/* Footer hint row */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.35 }}
                    className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45"
                >
                    <span>Tip: Pick a mode that matches your patience — not your ego.</span>
                    <span className="text-white/55">
                        Mode logic adapts filters & exits automatically.
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
