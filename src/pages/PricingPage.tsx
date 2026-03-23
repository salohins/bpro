import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Crown,
  Calendar,
  Clock3,
  Infinity,
  Check,
} from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];
const TRIAL_DAYS = 7;

type PlanKey = "monthly" | "yearly" | "lifetime";

export default function PricingPage() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const mobileSliderRef = useRef<HTMLDivElement | null>(null);

  const checkoutRoute = "/subscribe";

  const plans = useMemo(
    () => [
      {
        key: "monthly" as PlanKey,
        name: "Monthly",
        badge: "7-day trial",
        price: "USD 69.00",
        period: "/ month",
        highlight: false,
        icon: Calendar,
        sub: "Low commitment. Full power.",
        bullets: [
          "Full B:PRO access",
          "7-day free trial",
          "Cancel anytime",
          "Instant activation",
        ],
        cta: "Start monthly trial",
        foot: "Best for testing + flexible trading months.",
      },
      {
        key: "yearly" as PlanKey,
        name: "Yearly",
        badge: "Best value",
        price: "USD 699.00",
        period: "/ year",
        highlight: true,
        icon: Crown,
        sub: "Save big. Stay consistent.",
        bullets: [
          "Full B:PRO access",
          "7-day free trial",
          "Priority updates & support",
          "Pay once — trade all year",
        ],
        cta: "Start yearly trial",
        foot: "Best for serious traders who want consistency.",
      },
      {
        key: "lifetime" as PlanKey,
        name: "Lifetime",
        badge: "One-time",
        price: "USD 899.00",
        period: " lifetime",
        highlight: false,
        icon: Infinity,
        sub: "Pay once. Keep it forever.",
        bullets: [
          "Lifetime B:PRO access",
          "No recurring billing",
          "All future core updates",
          "Instant activation",
        ],
        cta: "Get lifetime access",
        foot: "Best if you hate subscriptions.",
      },
    ],
    []
  );

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.25 },
  });

  const [compare, setCompare] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const onChoose = (plan: PlanKey) => {
    navigate(checkoutRoute, { state: { plan } });
  };

  const handleMobileScroll = () => {
    const el = mobileSliderRef.current;
    if (!el) return;

    const slideWidth = el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveMobileIndex(Math.max(0, Math.min(index, plans.length - 1)));
  };

  const scrollToCard = (index: number) => {
    const el = mobileSliderRef.current;
    if (!el) return;

    const slideWidth = el.clientWidth;
    el.scrollTo({
      left: index * slideWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveMobileIndex(index);
  };

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <motion.div
          {...enter(0, 18, 0)}
          className="text-center max-w-[980px] mx-auto mb-10"
        >
          <h1 className="mt-5 font-semibold tracking-[-0.045em] leading-[1.02] text-[clamp(34px,3.1vw,58px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Choose your edge. <br />
              Keep your flow.
            </span>
          </h1>

          <p className="mt-4 text-white/65 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
            Start with a{" "}
            <span className="text-white/85 font-semibold">{TRIAL_DAYS}-day trial</span>{" "}
            on subscriptions - or grab{" "}
            <span className="text-white/85 font-semibold">lifetime access</span> in
            one payment.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setCompare((v) => !v)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <Clock3 className="w-3.5 h-3.5 text-emerald-300" />
              </span>
              <span className="text-xs text-white/60">Show quick comparison</span>
              <span className="text-xs text-emerald-300 font-semibold">
                {compare ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Mobile slider */}
        <div className="lg:hidden">
          <div
            ref={mobileSliderRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {plans.map((p, idx) => (
              <motion.div
                key={p.key}
                {...enter(idx === 0 ? -16 : idx === 2 ? 16 : 0, 14, 0.02 + idx * 0.04)}
                data-plan-card
                className="snap-center shrink-0 basis-full min-w-full"
              >
                <PlanCard
                  plan={p}
                  compare={compare}
                  reduceMotion={reduceMotion}
                  onChoose={onChoose}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {plans.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to plan ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${activeMobileIndex === idx
                  ? "w-8 bg-emerald-300/80"
                  : "w-2.5 bg-white/20 hover:bg-white/35"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {plans.map((p, idx) => (
            <motion.div
              key={p.key}
              {...enter(idx === 0 ? -16 : idx === 2 ? 16 : 0, 14, 0.02 + idx * 0.04)}
              className="lg:col-span-4"
            >
              <PlanCard
                plan={p}
                compare={compare}
                reduceMotion={reduceMotion}
                onChoose={onChoose}
              />
            </motion.div>
          ))}
        </div>

        <motion.div {...enter(0, 14, 0.18)} className="mt-10 text-center text-sm text-white/50">
          Subscriptions include a {TRIAL_DAYS}-day trial. Lifetime is a one-time purchase (no trial).
        </motion.div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  compare,
  reduceMotion,
  onChoose,
}: {
  plan: {
    key: PlanKey;
    name: string;
    badge: string;
    price: string;
    period: string;
    highlight: boolean;
    icon: any;
    sub: string;
    bullets: string[];
    cta: string;
    foot: string;
  };
  compare: boolean;
  reduceMotion: boolean;
  onChoose: (plan: PlanKey) => void;
}) {
  const Icon = plan.icon;

  return (
    <div
      className={[
        "relative h-full rounded-[30px] p-[1px]",
        plan.highlight
          ? "bg-gradient-to-b from-emerald-400/40 via-white/10 to-emerald-500/22 shadow-[0_0_80px_rgba(16,185,129,0.14)]"
          : "bg-gradient-to-b from-emerald-400/14 via-white/10 to-emerald-500/10",
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full rounded-[30px] overflow-hidden border border-white/10 backdrop-blur-2xl",
          plan.highlight
            ? "bg-gradient-to-b from-[#0b0b0b]/92 to-[#070707]/96"
            : "bg-[#070707]/75",
        ].join(" ")}
      >
        {reduceMotion ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.06),transparent_60%)]"
            style={{ opacity: 0.18 }}
          />
        ) : (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.06),transparent_60%)]"
            initial={{ opacity: 0.14, scale: 1 }}
            animate={{ opacity: 0.24, scale: 1.04 }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: 1000000,
              repeatType: "mirror",
            }}
          />
        )}

        <div className="relative z-10 p-7 flex flex-col h-full">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md">
                <Icon className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-200 text-xs tracking-[0.22em] font-semibold uppercase">
                  {plan.name}
                </span>
              </div>

              <div
                className={[
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold",
                  plan.highlight
                    ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-white/[0.03] text-white/70",
                ].join(" ")}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/90" />
                {plan.badge}
              </div>
            </div>

            <div className="mt-4 text-white/60">{plan.sub}</div>

            <div className="mt-5 flex items-end gap-2">
              <div className="text-4xl font-extrabold tracking-tight text-white/90">
                {plan.price}
              </div>
              <div className="pb-1 text-white/45">{plan.period}</div>
            </div>

            {compare && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div className="text-xs text-white/45 tracking-widest uppercase">
                    Trial
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    {plan.key === "lifetime" ? "—" : `${TRIAL_DAYS} days`}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div className="text-xs text-white/45 tracking-widest uppercase">
                    Billing
                  </div>
                  <div className="mt-1 text-sm text-white/75">
                    {plan.key === "monthly"
                      ? "Recurring"
                      : plan.key === "yearly"
                        ? "Recurring"
                        : "One-time"}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              {plan.bullets.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Check className="w-4 h-4 text-emerald-300" />
                  </span>
                  <div className="text-sm text-white/70 leading-tight">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <motion.button
              whileHover={
                reduceMotion
                  ? {}
                  : {
                    scale: 1.02,
                    backgroundPosition: "right center",
                    boxShadow: plan.highlight
                      ? "0 0 60px rgba(16,185,129,0.55)"
                      : "0 0 45px rgba(16,185,129,0.35)",
                  }
              }
              whileTap={{ scale: 0.985 }}
              onClick={() => onChoose(plan.key)}
              className={[
                "group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-2xl transition-all duration-500 border",
                plan.highlight
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto] text-black border-emerald-300/30 shadow-[0_0_28px_rgba(16,185,129,0.24)]"
                  : "bg-white/[0.04] hover:bg-white/[0.06] text-white border-white/10",
              ].join(" ")}
            >
              {plan.cta}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
            </motion.button>

            <div className="text-xs text-white/45 text-center">{plan.foot}</div>

            <div className="mt-1 flex items-center justify-center gap-2 text-xs text-white/40">
              <ShieldCheck className="w-4 h-4 text-emerald-300/80" />
              Secure checkout with Stripe • Instant access
            </div>
          </div>
        </div>

        <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
      </div>
    </div>
  );
}