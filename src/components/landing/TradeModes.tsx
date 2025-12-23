import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Zap,
  Gauge,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * ✅ Stable in-view hook with hysteresis to prevent flicker at viewport edges.
 * - enter: ratio to switch ON
 * - exit: ratio to switch OFF (lower than enter)
 */
function useStableInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  {
    root = null,
    rootMargin = "0px 0px -18% 0px",
    enter = 0.28,
    exit = 0.06,
  }: {
    root?: Element | null;
    rootMargin?: string;
    enter?: number;
    exit?: number;
  } = {}
) {
  const [inView, setInView] = useState(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const thresholds = Array.from(
      new Set([0, exit, enter, 0.15, 0.35, 0.55, 0.75, 1].filter((n) => n >= 0 && n <= 1))
    ).sort((a, b) => a - b);

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        const r = e.intersectionRatio;

        // hysteresis: only toggle when clearly past enter/exit
        let next = inViewRef.current;
        if (r >= enter) next = true;
        else if (r <= exit) next = false;

        if (next !== inViewRef.current) {
          inViewRef.current = next;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => setInView(next));
        }
      },
      { root, rootMargin, threshold: thresholds }
    );

    obs.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [ref, root, rootMargin, enter, exit]);

  return inView;
}

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

type Mode = {
  titleText: string;
  subtitle: string;
  timeframe: string;
  title: string;
  frame: string;
  bloom: string;
  bloom2: string;
  iconBg: string;
  iconGlow: string;
  dot: string;
  intensityBar: string;
  intensityWidth: string;
  icon: React.ReactNode;
  bullets: string[];
};

function ModeCard({
  mode,
  index,
  reduceMotion,
  mobile,
  active,
}: {
  mode: Mode;
  index: number;
  reduceMotion: boolean;
  mobile: boolean;
  active: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  // ✅ desktop replay; mobile slider: always visible
  const inView = useStableInView(ref as any, {
    root: null,
    rootMargin: "0px 0px -18% 0px",
    enter: 0.28,
    exit: 0.06,
  });

  const shouldShow = mobile ? true : inView;
  const barActive = mobile ? active : inView;

  // ✅ Tilt only on desktop (mouse)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 240, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 240, damping: 24, mass: 0.7 });

  const rotateY = useTransform(sx, [-0.5, 0.5], reduceMotion || mobile ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduceMotion || mobile ? [0, 0] : [7, -7]);

  const onMove = (e: any) => {
    if (reduceMotion || mobile || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      ref={ref as any}
      initial="hidden"
      animate={shouldShow ? "show" : "hidden"}
      variants={cardVariants}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.75, delay: mobile ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
      whileHover={reduceMotion || mobile ? {} : { y: -4 }}
      // ✅ IMPORTANT: no whileTap (Framer tap gesture can interfere with native scroll on iOS)
      className={[
        "group relative w-full overflow-hidden rounded-3xl",
        // ✅ keep press feedback but via CSS (doesn't block native scroll)
        "transition-transform duration-150 active:scale-[0.985]",
        // ✅ better touch behavior on iOS
        "touch-manipulation select-none",
      ].join(" ")}
    >
      {/* Frame */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${mode.frame}`} />
      <div className="absolute inset-[1px] rounded-3xl bg-[#070707]/80 backdrop-blur-xl border border-white/10" />

      {/* Blooms */}
      <div
        aria-hidden="true"
        className={`absolute -top-24 -right-20 w-[320px] h-[320px] rounded-full blur-[90px] opacity-30 ${mode.bloom}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -bottom-28 -left-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-22 ${mode.bloom2}`}
      />

      {/* Micro grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      {/* Sheen */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-[-120%] w-[240%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        animate={reduceMotion || mobile ? {} : { x: ["-120%", "120%"] }}
        transition={reduceMotion || mobile ? { duration: 0.01 } : { duration: 7.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={reduceMotion || mobile ? {} : { rotate: 8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`relative grid place-items-center w-12 h-12 rounded-2xl border border-white/10 ${mode.iconBg}`}
            >
              <div className={`absolute inset-0 rounded-2xl opacity-40 blur-xl ${mode.iconGlow}`} />
              <div className="relative">{mode.icon}</div>
            </motion.div>

            <div className="leading-tight">
              <h3 className={`text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${mode.title}`}>
                {mode.titleText}
              </h3>
              <p className="text-[11px] text-white/50 tracking-widest uppercase mt-1">{mode.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-white/45 tracking-widest uppercase">Aggressivness</span>
            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${mode.intensityBar}`}
                initial={{ width: 0 }}
                animate={{ width: barActive ? mode.intensityWidth : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.01 }
                    : { duration: 0.8, delay: mobile ? 0.05 : 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <ul className="mt-5 space-y-2.5 text-sm text-white/70">
          {mode.bullets.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-2 inline-block w-1.5 h-1.5 rounded-full ${mode.dot}`} />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-white/45">
            Best for <span className="text-white/70">{mode.timeframe}</span>
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(16,185,129,0.10)",
        }}
      />
    </motion.article>
  );
}

export default function TradeModes() {
  const reduceMotion = useReducedMotion();
  const isLgUp = useIsLgUp();
  const mobile = !isLgUp;

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const headerInView = useStableInView(headerRef, {
    root: null,
    rootMargin: "0px 0px -18% 0px",
    enter: 0.22,
    exit: 0.05,
  });

  const footerInView = useStableInView(footerRef, {
    root: null,
    rootMargin: "0px 0px -12% 0px",
    enter: 0.18,
    exit: 0.04,
  });

  const modes = useMemo<Mode[]>(
    () => [
      {
        titleText: "Short Mode",
        subtitle: "Scalp velocity",
        timeframe: "1m–30m",
        title: "from-red-300 via-red-200 to-pink-200",
        frame: "from-red-500/30 via-white/8 to-pink-500/22",
        bloom: "bg-red-500/26",
        bloom2: "bg-pink-500/22",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-red-500/25",
        dot: "bg-red-300",
        intensityBar: "bg-gradient-to-r from-red-400 to-pink-300",
        intensityWidth: "85%",
        icon: <Zap className="w-6 h-6 text-red-300" />,
        bullets: ["Fast entries, quick exits", "Tighter ATR + faster EMAs", "Higher frequency"],
      },
      {
        titleText: "Mid Mode",
        subtitle: "Balanced control",
        timeframe: "1H–4H",
        title: "from-emerald-200 via-teal-200 to-cyan-200",
        frame: "from-emerald-400/30 via-white/8 to-cyan-400/22",
        bloom: "bg-emerald-500/24",
        bloom2: "bg-cyan-500/16",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-emerald-500/22",
        dot: "bg-emerald-300",
        intensityBar: "bg-gradient-to-r from-emerald-300 to-cyan-200",
        intensityWidth: "60%",
        icon: <Gauge className="w-6 h-6 text-emerald-200" />,
        bullets: ["Most versatile mode", "Moderate strictness", "Adaptive stops"],
      },
      {
        titleText: "Long Mode",
        subtitle: "Trend stability",
        timeframe: "Daily–Weekly",
        title: "from-blue-200 via-indigo-200 to-purple-200",
        frame: "from-blue-500/26 via-white/8 to-purple-500/22",
        bloom: "bg-blue-500/20",
        bloom2: "bg-purple-500/20",
        iconBg: "bg-white/[0.03]",
        iconGlow: "bg-blue-500/20",
        dot: "bg-blue-200",
        intensityBar: "bg-gradient-to-r from-blue-300 to-purple-200",
        intensityWidth: "40%",
        icon: <TrendingUp className="w-6 h-6 text-blue-200" />,
        bullets: ["Swing & position trading", "Slower structure bias", "Max stability"],
      },
    ],
    []
  );

  // ✅ headline animation (staggered)
  const headerContainerVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.65, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 },
    },
  };

  const headerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: reduceMotion ? { duration: 0.01 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  /* ---------------- Mobile slider logic ---------------- */
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const pickActiveSlide = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;

    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < slideRefs.current.length; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;

      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(elCenter - center);

      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    setActiveSlide(best);
  }, []);

  useEffect(() => {
    if (!mobile) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickActiveSlide);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll as any);
    };
  }, [mobile, pickActiveSlide]);

  const goToSlide = (i: number) => {
    const scroller = scrollerRef.current;
    const el = slideRefs.current[i];
    if (!scroller || !el) return;

    const target = el.offsetLeft - (scroller.clientWidth - el.clientWidth) / 2;
    scroller.scrollTo({
      left: target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const prev = () => goToSlide(Math.max(0, activeSlide - 1));
  const next = () => goToSlide(Math.min(modes.length - 1, activeSlide + 1));

  return (
    <section className="relative w-full py-24 md:py-28 bg-transparent text-white" id="trade-modes">
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={headerContainerVariants}
          className="mx-auto max-w-[920px] text-center"
        >
          <motion.div variants={headerItem} className="flex flex-wrap items-center justify-center gap-2 w-full">
            <div
              className="
                inline-flex items-center gap-2
                w-full sm:w-fit
                justify-center
                px-5 py-2
                rounded-full
                border border-emerald-400/20
                bg-white/[0.03] backdrop-blur-md
              "
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                Trade Modes
              </span>
            </div>
          </motion.div>

          <motion.h2 variants={headerItem} className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.06]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.22)]">
              Pick the Timeframe.
            </span>
            <br />
            <span className="text-white/80">B:Pro Adapts the Logic.</span>
          </motion.h2>

          <motion.p variants={headerItem} className="mt-4 text-white/70 text-md leading-relaxed mx-auto max-w-[600px]">
            Correlation: after structure + filters + scoring, choose a mode to match your timeframe.
          </motion.p>

          <motion.div variants={headerItem} className="mt-4 text-xs text-white/45 flex items-center justify-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
            Short = faster signals • Mid = default • Long = stability
          </motion.div>
        </motion.div>

        {/* ✅ Cards: slider on mobile, grid on desktop */}
        {mobile ? (
          <div className="mt-10 relative">
            <div
              ref={scrollerRef}
              className={[
                "-mx-6 sm:-mx-10",
                "px-6 sm:px-10",
                "flex gap-4 overflow-x-auto",
                "snap-x snap-mandatory",
                // ✅ IMPORTANT: remove touch-pan-x (it blocks vertical page scroll when you start touching a card)
                "overscroll-x-contain",
                "pb-4",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              ].join(" ")}
              style={{
                WebkitOverflowScrolling: "touch",
                scrollPaddingLeft: "24px",
                scrollPaddingRight: "24px",
              }}
            >
              {modes.map((mode, i) => (
                <div
                  key={mode.titleText}
                  ref={(el) => (slideRefs.current[i] = el)}
                  className="snap-center [scroll-snap-stop:always] shrink-0 w-[86vw] sm:w-[70vw] md:w-[62vw]"
                >
                  <ModeCard mode={mode} index={i} reduceMotion={reduceMotion} mobile active={i === activeSlide} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={activeSlide === 0}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] disabled:opacity-40"
                aria-label="Previous mode"
              >
                <ChevronLeft className="h-5 w-5 text-white/70" />
              </button>

              <div className="flex items-center gap-2">
                {modes.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to mode ${i + 1}`}
                    className={[
                      "h-2.5 rounded-full transition-all",
                      i === activeSlide ? "w-8 bg-emerald-300/70" : "w-2.5 bg-white/15 hover:bg-white/25",
                    ].join(" ")}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                disabled={activeSlide === modes.length - 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] disabled:opacity-40"
                aria-label="Next mode"
              >
                <ChevronRight className="h-5 w-5 text-white/70" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {modes.map((mode, i) => (
              <ModeCard key={mode.titleText} mode={mode} index={i} reduceMotion={reduceMotion} mobile={false} active={false} />
            ))}
          </div>
        )}

        <motion.div
          ref={footerRef}
          initial="hidden"
          animate={footerInView ? "show" : "hidden"}
          variants={footerVariants}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/45"
        >
          <span>Tip: match the mode to your patience and execution will stay clean.</span>
        </motion.div>
      </div>
    </section>
  );
}
