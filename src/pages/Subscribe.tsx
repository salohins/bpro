import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  Mail,
  User2,
  ArrowRight,
  Lock,
} from "lucide-react";

type PlanKey = "monthly" | "yearly" | "lifetime";
const TRIAL_DAYS = 7;
const easePremium: any = [0.16, 1, 0.3, 1];

export default function Subscribe() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // ✅ read plan from PricingPage navigation (fallback for direct visits)
  const plan: PlanKey = (location.state as any)?.plan ?? "monthly";

  const [email, setEmail] = useState("");
  const [tradingview, setTradingview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [existing, setExisting] = useState(false);

  const planConfig = useMemo(() => {
    const cfg: Record<
      PlanKey,
      {
        title: string;
        subtitle: string;
        priceText: string;
        priceId?: string;
        isLifetime: boolean;
        badge: string;
      }
    > = {
      monthly: {
        title: "Monthly",
        subtitle: "Try it first. Cancel anytime.",
        priceText: "CHF 49 / month",
        priceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY,
        isLifetime: false,
        badge: "Flexible",
      },
      yearly: {
        title: "Yearly",
        subtitle: "Best value for serious traders.",
        priceText: "CHF 399 / year",
        priceId: import.meta.env.VITE_STRIPE_PRICE_YEARLY,
        isLifetime: false,
        badge: "Best Value",
      },
      lifetime: {
        title: "Lifetime",
        subtitle: "One payment. Keep it forever.",
        priceText: "CHF 999 (one-time)",
        priceId: import.meta.env.VITE_STRIPE_PRICE_LIFETIME,
        isLifetime: true,
        badge: "Forever",
      },
    };

    return cfg[plan];
  }, [plan]);

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.75, delay: d, ease: easePremium },
  });

  const handleContinue = async () => {
    setError("");
    setLoading(true);
    setExisting(false);

    try {
      if (!email) throw new Error("Please enter your email.");

      const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Verification failed.");

      if (verifyData.exists) {
        setExisting(true);
        setError("This email already has an account.");
        setLoading(false);
        return;
      }

      const checkoutRes = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan, // ✅ monthly/yearly/lifetime
          price_id: planConfig.priceId, // fallback only
          email,
          tradingview_name: tradingview || undefined,
        }),
      });

      const data = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(data.error || "Checkout failed.");

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Subscribe error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => navigate("/");

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] overflow-hidden text-white">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_22%,rgba(16,185,129,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,255,255,0.05),transparent_65%)]" />
        <div className="absolute -bottom-24 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* ✅ TRUE CENTERING: vertically + horizontally */}
      <div className="relative z-10 min-h-[calc(100vh-76px)] flex items-center">
        <div className="w-full mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 2xl:px-20 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* Left: Plan summary (wider) */}
            <motion.div {...enter(-14, 10, 0)} className="lg:col-span-7">
              <div className="h-full rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/10">
                <div className="relative h-full rounded-[30px] overflow-hidden border border-white/10 bg-[#070707]/75 backdrop-blur-2xl p-8 md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md">
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
                        Checkout
                      </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-full text-[12px] font-semibold border border-white/10 bg-white/[0.03] text-white/75">
                      {planConfig.badge}
                    </div>
                  </div>

                  <h1 className="mt-5 font-semibold tracking-[-0.045em] leading-[1.02] text-[clamp(30px,3vw,50px)]">
                    <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                      {planConfig.title}
                    </span>
                  </h1>

                  <p className="mt-3 text-white/65 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
                    {planConfig.subtitle}
                  </p>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-xs text-white/45 tracking-widest uppercase">Selected plan</div>
                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <div className="text-xl font-semibold text-white/90">{planConfig.priceText}</div>
                      {!planConfig.isLifetime ? (
                        <div className="text-[12px] font-semibold text-emerald-200/90 inline-flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-300" />
                          {TRIAL_DAYS}-day trial included
                        </div>
                      ) : (
                        <div className="text-[12px] font-semibold text-emerald-200/90 inline-flex items-center gap-2">
                          <Lock className="w-4 h-4 text-emerald-300" />
                          One-time payment
                        </div>
                      )}
                    </div>

                    {/* ✅ less squeezed */}
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <Feature
                        icon={<ShieldCheck className="w-4 h-4 text-emerald-300" />}
                        title="Full access to B:PRO"
                        desc="All engines, workflow, and signals."
                      />
                      <Feature
                        icon={<CreditCard className="w-4 h-4 text-emerald-300" />}
                        title="Secure Stripe checkout"
                        desc="Encrypted payment flow."
                      />
                      <Feature
                        icon={<Sparkles className="w-4 h-4 text-emerald-300" />}
                        title="Instant access"
                        desc="Setup right after checkout."
                      />
                      <Feature
                        icon={<User2 className="w-4 h-4 text-emerald-300" />}
                        title="TradingView alerts"
                        desc="Connect your TV username."
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-white/45">
                    <button onClick={() => navigate("/pricing")} className="hover:text-white/70 transition">
                      ← Back to Pricing
                    </button>
                  </div>

                  <div className="absolute -bottom-16 left-0 w-full h-40 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div {...enter(14, 10, 0.06)} className="lg:col-span-5">
              <div className="h-full rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/14 shadow-[0_0_80px_rgba(16,185,129,0.12)]">
                <div className="relative h-full rounded-[30px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#0b0b0b]/92 to-[#070707]/96 backdrop-blur-2xl p-7 md:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="text-sm text-white/70">Your details</div>
                      <div className="mt-1 text-2xl font-semibold text-white/90">
                        Continue to payment
                      </div>
                      <div className="mt-2 text-sm text-white/55">
                        Use the same email you’ll log in with later.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="px-4 py-2 rounded-2xl text-[13px] font-semibold text-white/75 bg-white/[0.03] hover:bg-white/[0.06] transition"
                    >
                      Already have an account?
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {/* Email */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Mail className="w-4 h-4 text-emerald-300" />
                      </span>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                      />
                    </div>

                    {/* TradingView */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <User2 className="w-4 h-4 text-emerald-300" />
                      </span>
                      <input
                        type="text"
                        placeholder="TradingView username (optional)"
                        value={tradingview}
                        onChange={(e) => setTradingview(e.target.value)}
                        className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                      />
                    </div>

                    {/* Alerts */}
                    {error && (
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {error}
                      </div>
                    )}

                    {/* CTA */}
                    {existing ? (
                      <button
                        onClick={handleLoginRedirect}
                        className="w-full py-4 rounded-2xl font-semibold text-white bg-white/[0.06] hover:bg-white/[0.09] transition border border-white/10"
                      >
                        Log In Instead →
                      </button>
                    ) : (
                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.02, backgroundPosition: "right center" }}
                        whileTap={{ scale: 0.985 }}
                        disabled={loading || !email}
                        onClick={handleContinue}
                        className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-2xl transition-all duration-500 border border-emerald-300/30 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto] text-black shadow-[0_0_28px_rgba(16,185,129,0.22)] disabled:opacity-60"
                      >
                        {loading ? "Processing..." : "Continue to Stripe"}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    )}

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center justify-between gap-4">
                      <div className="text-xs text-white/55 leading-snug">
                        {planConfig.isLifetime
                          ? "One-time payment • No recurring billing."
                          : `Trial starts now • Billing begins after ${TRIAL_DAYS} days.`}
                      </div>
                      <button
                        onClick={() => navigate("/pricing")}
                        className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition whitespace-nowrap"
                      >
                        Change plan →
                      </button>
                    </div>

                    <div className="mt-4 text-xs text-white/40 text-center">
                      Secure checkout powered by Stripe
                    </div>
                  </div>

                  <div className="absolute -bottom-16 left-0 w-full h-40 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white/85">{title}</div>
          <div className="mt-0.5 text-xs text-white/55 leading-snug">{desc}</div>
        </div>
      </div>
    </div>
  );
}
