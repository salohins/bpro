import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Layers, ArrowRight } from "lucide-react";

import trendCloudImg from "../../assets/adaptive-trend-cloud.png";
import cloudBg from "../../assets/cloud.svg";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function AdaptiveTrendCloud() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -18, y: 6, },
    show: {
      opacity: 1,
      x: 0,
      y: 0,

      transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 18, y: 6, },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : { duration: 0.85, ease: easePremium },
    },
  };

  const bullet = {
    hidden: { opacity: 0, y: 10, },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: easePremium },
    },
  };

  return (
    // ✅ desktop keeps 100svh | mobile gets natural height (no giant forced viewport block)
    <section
      id="adaptive-cloud"
      className="relative w-full overflow-hidden bg-transparent text-white
                 py-14 sm:py-16 lg:py-0 lg:h-[100svh] lg:min-h-[100svh]"
    >
      {/* FULL-WIDTH CLOUD BACKGROUND IMAGE */}
      {/* FULL-WIDTH CLOUD BACKGROUND IMAGE */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
      absolute inset-0 bg-no-repeat
      [background-size:300%_300%] [background-position:55%_58%]
      sm:[background-size:200%_200%] sm:[background-position:55%_20%]
      md:[background-size:160%_160%] md:[background-position:52%_18%]
      lg:[background-size:cover] lg:[background-position:center]
    "
          style={{ backgroundImage: `url(${cloudBg})`, opacity: 0.8 }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-[1760px] h-full px-4 sm:px-10 lg:px-16 2xl:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          // ✅ mobile: normal flow | desktop: center vertically
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 lg:items-center lg:h-full"
        >
          {/* LEFT */}
          <motion.div variants={fadeLeft} className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                <div
                  className="
      inline-flex items-center gap-2
      w-full sm:w-fit
      justify-center
      px-4 sm:px-5 py-2
      rounded-full
      border border-emerald-400/20
      bg-white/[0.03] backdrop-blur-md
    "
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-300 text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase">
                    Market Structure Engine
                  </span>
                </div>

                <span
                  className="
      inline-flex items-center gap-2
      w-full sm:w-fit
      justify-center
      px-3.5 sm:px-4 py-2
      rounded-full
      border border-white/10
      bg-white/[0.02] backdrop-blur-md
      text-[10px] sm:text-[11px]
      tracking-[0.18em] uppercase text-white/55
    "
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-300/80" />
                  Adaptive Cloud Layer
                </span>
              </div>

            </div>

            <h2 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(28px,8vw,52px)]">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Adaptive Trend Cloud
              </span>
            </h2>

            <p className="text-white/70 leading-relaxed max-w-xl text-[14.5px] sm:text-base lg:text-lg">
              This is the visual backbone of B:Pro’s Market Structure Engine. It tells you{" "}
              <span className="text-white/85 font-semibold">where you are</span> and{" "}
              <span className="text-white/85 font-semibold">where breakouts might happen</span> before any signal occur.
            </p>

            <motion.ul variants={container} className="space-y-3">
              <motion.li variants={bullet} className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <div className="text-[13.5px] sm:text-sm text-white/75 leading-relaxed">
                  <span className="text-white/90 font-semibold">3-layer EMA geometry</span> — fast/mid/slow stack defines regime.
                </div>
              </motion.li>

              <motion.li variants={bullet} className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-300/80 shrink-0" />
                <div className="text-[13.5px] sm:text-sm text-white/75 leading-relaxed">
                  <span className="text-white/90 font-semibold">ATR padding</span> — smooth transitions, fewer fake flips.
                </div>
              </motion.li>

              <motion.li variants={bullet} className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-200/70 shrink-0" />
                <div className="text-[13.5px] sm:text-sm text-white/75 leading-relaxed">
                  <span className="text-white/90 font-semibold">Breakout rails</span> — upper/lower cloud boundaries act as trigger context.
                </div>
              </motion.li>
            </motion.ul>


          </motion.div>

          {/* RIGHT */}
          <motion.div variants={fadeRight} className="lg:col-span-7">
            <div className="rounded-[26px] sm:rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14 shadow-[0_0_70px_rgba(16,185,129,0.10)]">
              <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#070707]/75 border border-white/10 backdrop-blur-2xl">
                <div className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="text-[13px] sm:text-sm font-semibold text-white/85">
                    Adaptive Cloud in-action
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/45 tracking-widest uppercase">
                    screenshot
                  </div>
                </div>

                {/* ✅ mobile: clamp height so it doesn't dominate the screen */}
                <div className="relative h-[240px] sm:h-[360px] lg:h-[440px]">
                  <img
                    src={trendCloudImg}
                    alt="Adaptive Trend Cloud: Bull → Neutral → Bear transitions"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                    loading="eager"
                  />

                  {/* (kept from your original) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(16,185,129,0.14),transparent_55%)]"
                  />

                  <div className="absolute left-3 sm:left-4 top-3 sm:top-4">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-white/75">
                      Bull → Neutral → Bear
                    </div>
                  </div>

                  {/* ✅ mobile-safe: wraps + no overflow */}
                  <div className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[8px] sm:text-[11px] tracking-[0.14em] uppercase">
                      <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-red-500">
                        Downtrend
                      </span>
                      <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-slate-500">
                        breakout zone
                      </span>
                      <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-emerald-500 ">
                        Uptrend
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 ring-1 ring-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
