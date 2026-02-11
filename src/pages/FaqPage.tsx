import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Star,
  ArrowLeft,
  Brain,
} from "lucide-react";

const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FaqPage() {
  const reduceMotion = useReducedMotion();

  const faqs = useMemo(
    () => [
      {
        icon: <Zap className="w-4 h-4 text-emerald-300" />,
        q: "What makes B:PRO different from typical indicators?",
        a: "B:PRO is a trading system that combines structure, trend context, filter validation, and scoring to guide decisions only when conditions align.",
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
      {
        icon: <Brain className="w-4 h-4 text-emerald-300" />,
        q: "Can I trade B:PRO signals mechanically, or is it meant for discretion?",
        a: "B:PRO is built as a decision framework, not a fully mechanical system. It highlights structured long/short opportunities, but position size, exact entries/exits, and risk management should always be defined by your own trading plan. Treat the signals, cloud, and scoring as a guided checklist rather than automatic “buy/sell” commands.",
        tag: "Approach",
      },
      {
        icon: <SlidersHorizontal className="w-4 h-4 text-emerald-300" />,
        q: "Do I need other indicators on my chart when using B:PRO?",
        a: "No additional tools are required — B:PRO already combines trend, volatility, momentum, volume, and higher-timeframe context into a single view. Many traders run it on a clean chart and only add simple extras like key horizontal levels or sessions if they want. The idea is to reduce indicator clutter and keep decisions focused on one consistent framework.",
        tag: "Setup",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
        q: "How should I test and adapt B:PRO before trading live capital?",
        a: "Start by observing how signals behave on your preferred markets and timeframes, then forward-test on demo or very small size. Once you understand typical win/loss patterns, you can fine-tune Trade Mode, Market Sentiment, and filter toggles to match your personal style (more conservative or more aggressive). Always verify that the behavior fits your own rules and risk tolerance before scaling up.",
        tag: "Testing",
      },
    ],
    []
  );

  // Start with none open (faster initial paint + less layout work)
  const [open, setOpen] = useState<number>(-1);

  // Removed blur animations (expensive repaints). Keep opacity + translate only.
  const container = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easePremium },
    },
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white bg-transparent">
      {/* optional soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-[110px]" />
        <div className="absolute -bottom-56 -left-56 w-[620px] h-[620px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.10),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(16,185,129,0.08),transparent_35%)]" />
      </div>

      {/* ✅ match your global width system */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20 py-20 md:py-24">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 mb-10 md:mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span className="text-xs tracking-[0.18em] uppercase text-white/60">
              Support / FAQ
            </span>
          </div>
        </div>

        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md mb-4">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
              FAQ
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              Frequently Asked Questions.
            </span>
          </h1>

          <p className="mt-4 text-white/60 max-w-[720px] mx-auto leading-relaxed">
            Quick clarity on how the system behaves — integrity, scoring,
            compatibility, and learning curve.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mx-auto w-full max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easePremium }}
          >
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-emerald-400/30 via-white/10 to-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
              <div className="relative rounded-3xl overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-xl">
                {/* sheen sweep (hover only — no infinite animation) */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                    whileHover={{ opacity: 1, x: ["-120%", "120%"] }}
                    transition={{ duration: 1.15, ease: "linear" }}
                  />
                )}

                <div className="relative p-2">
                  {faqs.map((item, idx) => {
                    const isOpen = open === idx;
                    return (
                      <FAQItem
                        key={item.q}
                        idx={idx}
                        isOpen={isOpen}
                        dim={open !== -1 && open !== idx}
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

                {/* page footer */}
                <div className="relative px-6 pb-6 pt-2">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="text-sm text-white/60">
                      Still stuck? Hit support and we’ll point you to the right
                      workflow.
                    </div>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-sm"
                    >
                      View plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function FAQItem({
  isOpen,
  onToggle,
  reduceMotion,
  icon,
  q,
  a,
  tag,
  dim,
  idx,
}: {
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
  icon: React.ReactNode;
  q: string;
  a: string;
  tag: string;
  dim: boolean;
  idx: number;
}) {
  return (
    <motion.div
      // Keep entry animation light (no blur, no repeated in-view triggers)
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: idx * 0.03, ease: easePremium }}
      viewport={{ once: true, amount: 0.35 }}
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
              transition={{ duration: 0.18, ease: "easeOut" }}
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

      {/* Fast accordion: grid rows 0fr -> 1fr (no height: auto measuring) */}
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.22, ease: easePremium }}
          className="grid"
          style={{ willChange: "grid-template-rows, opacity" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 pt-1">
              <div className="text-sm text-white/70 leading-relaxed">{a}</div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Verified framework logic
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* subtle glow only when open (reduces constant repaint cost) */}
        {isOpen && (
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/12 blur-[90px]"
          />
        )}
      </div>
    </motion.div>
  );
}
