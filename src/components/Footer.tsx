import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Check,
    Github,
    Twitter,
    Youtube,
    Linkedin,
    Mail,
    Sparkles,
} from "lucide-react";

export default function Footer() {
    const reduceMotion = useReducedMotion();

    const links = useMemo(
        () => [
            {
                title: "Product",
                items: [
                    { label: "Features", href: "#features" },
                    { label: "Pricing", href: "#pricing" },
                    { label: "Changelog", href: "#changelog" },
                    { label: "Roadmap", href: "#roadmap" },
                ],
            },
            {
                title: "Company",
                items: [
                    { label: "About", href: "#about" },
                    { label: "Careers", href: "#careers" },
                    { label: "Contact", href: "#contact" },
                    { label: "Press", href: "#press" },
                ],
            },
            {
                title: "Resources",
                items: [
                    { label: "Docs", href: "#docs" },
                    { label: "Guides", href: "#guides" },
                    { label: "Community", href: "#community" },
                    { label: "Status", href: "#status" },
                ],
            },
            {
                title: "Legal",
                items: [
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Use", href: "/terms" },
                    { label: "Cookie Settings", href: "/cookies" },
                    { label: "Imprint", href: "/imprint" },
                ],
            },
        ],
        []
    );

    const socials = useMemo(
        () => [
            { label: "Twitter/X", href: "#", icon: <Twitter className="w-4 h-4" /> },
            { label: "LinkedIn", href: "#", icon: <Linkedin className="w-4 h-4" /> },
            { label: "YouTube", href: "#", icon: <Youtube className="w-4 h-4" /> },
            { label: "GitHub", href: "#", icon: <Github className="w-4 h-4" /> },
            { label: "Email", href: "mailto:hello@yourapp.com", icon: <Mail className="w-4 h-4" /> },
        ],
        []
    );

    return (
        <footer className="relative w-full overflow-hidden bg-[#070707] text-white">
            {/* Ambient glows */}
            <motion.div
                aria-hidden="true"
                className="absolute -top-56 -left-56 w-[760px] h-[760px] rounded-full bg-emerald-500/10 blur-[220px]"
                animate={
                    reduceMotion
                        ? {}
                        : { x: [0, 26, -12, 0], y: [0, 14, -10, 0], scale: [1, 1.06, 1.02, 1] }
                }
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute -bottom-56 -right-56 w-[760px] h-[760px] rounded-full bg-emerald-600/10 blur-[240px]"
                animate={
                    reduceMotion
                        ? {}
                        : { x: [0, -22, 12, 0], y: [0, -12, 16, 0], scale: [1, 1.04, 1.1, 1] }
                }
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtle grid + vignette */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.09] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:72px_72px]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-transparent" />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-black/40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
                {/* Top CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-3xl p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.10)]"
                >
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
                        <div className="relative px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                            {/* sheen */}
                            <motion.div
                                aria-hidden="true"
                                className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
                                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="relative">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-200 w-fit">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-xs tracking-[0.22em] uppercase font-semibold">
                                        Ready to ship faster?
                                    </span>
                                </div>

                                <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                                    <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                                        Turn visitors into customers
                                    </span>{" "}
                                    with a clean SaaS experience.
                                </h3>

                                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/65">
                                    <Pill text="Lifetime updates" />
                                    <Pill text="Instant access" />
                                    <Pill text="Cancel anytime" />
                                </div>
                            </div>

                            {/* Email capture (optional) */}
                            <div className="relative w-full md:w-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 sm:min-w-[320px] rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-emerald-300/80" />
                                        <input
                                            type="email"
                                            placeholder="Email for product updates"
                                            className="w-full bg-transparent outline-none text-white/85 placeholder:text-white/35 text-sm"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={
                                            reduceMotion
                                                ? {}
                                                : {
                                                    scale: 1.03,
                                                    backgroundPosition: "right center",
                                                    boxShadow: "0 0 45px rgba(16,185,129,0.55)",
                                                }
                                        }
                                        whileTap={{ scale: 0.98 }}
                                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold
                      bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:200%_auto]
                      text-black border border-emerald-300/30 transition-all duration-500 shadow-[0_0_22px_rgba(16,185,129,0.25)]"
                                    >
                                        Join
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </motion.button>
                                </div>

                                <p className="mt-2 text-xs text-white/40">
                                    No spam. Just launches, upgrades, and trading-edge drops.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main footer grid */}
                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 space-y-5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 flex items-center justify-center shadow-[0_0_18px_rgba(16,185,129,0.12)]">
                                <Sparkles className="w-5 h-5 text-emerald-200" />
                            </div>
                            <div className="leading-tight">
                                <div className="text-lg font-extrabold tracking-tight">Breakout PRO</div>
                                <div className="text-xs text-white/45 tracking-widest uppercase">
                                    Suite for discretionary traders
                                </div>
                            </div>
                        </div>

                        <p className="text-white/60 leading-relaxed max-w-md">
                            Clean signals, confluence-first UX, and visual clarity — engineered to help you execute
                            with confidence across any timeframe.
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03]">
                                <Check className="w-4 h-4 text-emerald-300" /> Secure checkout
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03]">
                                <Check className="w-4 h-4 text-emerald-300" /> Lifetime updates
                            </span>
                        </div>

                        {/* Socials */}
                        <div className="pt-2 flex flex-wrap gap-2">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    whileHover={reduceMotion ? {} : { y: -2 }}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition text-white/70"
                                    aria-label={s.label}
                                >
                                    <span className="text-emerald-200/90">{s.icon}</span>
                                    <span className="text-sm">{s.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Link columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.35 }}
                        transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {links.map((col) => (
                            <div key={col.title} className="space-y-4">
                                <div className="text-xs tracking-[0.22em] uppercase font-semibold text-emerald-200/90">
                                    {col.title}
                                </div>
                                <ul className="space-y-2">
                                    {col.items.map((it) => (
                                        <li key={it.label}>
                                            <a
                                                href={it.href}
                                                className="text-sm text-white/60 hover:text-white/90 transition inline-flex items-center gap-2 group"
                                            >
                                                <span className="h-[6px] w-[6px] rounded-full bg-emerald-300/40 opacity-0 group-hover:opacity-100 transition" />
                                                {it.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="text-sm text-white/45">
                        © {new Date().getFullYear()} Breakout PRO. All rights reserved.
                    </div>

                    <div className="text-xs text-white/40 max-w-xl">
                        Trading involves risk. Nothing here is financial advice. Always test strategies and manage
                        risk responsibly.
                    </div>
                </div>
            </div>

            {/* Keyframes */}
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.55; }
            50% { transform: translateY(-14px); opacity: 1; }
          }
        `}
            </style>
        </footer>
    );
}

function Pill({ text }) {
    return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/65">
            {text}
        </span>
    );
}
