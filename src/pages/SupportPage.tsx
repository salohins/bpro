import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LifeBuoy,
  Mail,
  MessageCircle,
  Bug,
  CreditCard,
  KeyRound,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];

type TicketType = "billing" | "access" | "bug" | "general";

export default function SupportPage() {
  const reduceMotion = useReducedMotion();

  const [topic, setTopic] = useState<TicketType>("general");
  const [email, setEmail] = useState("");
  const [tvName, setTvName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    whileInView: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.85, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.25 },
  });

  const topics = useMemo(
    () => [
      {
        key: "general" as TicketType,
        label: "General question",
        sub: "Anything unclear? Ask here.",
        icon: HelpCircle,
      },
      {
        key: "access" as TicketType,
        label: "Access / Login",
        sub: "Can’t access B:PRO or alerts.",
        icon: KeyRound,
      },
      {
        key: "billing" as TicketType,
        label: "Billing / Payment",
        sub: "Invoices, charges, plan changes.",
        icon: CreditCard,
      },
      {
        key: "bug" as TicketType,
        label: "Bug / Issue",
        sub: "Report broken UI or signals.",
        icon: Bug,
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "I paid — but I still don’t have access. What should I do?",
        a: "First, check you’re logged in with the same email used at checkout. If it still doesn’t work, send us your email + (optional) TradingView username and we’ll link access manually.",
      },
      {
        q: "Can I cancel the subscription anytime?",
        a: "Yes. You can cancel anytime from the Billing Portal. Your access remains active until the end of the billing period (or trial).",
      },
      {
        q: "How does the 7-day trial work?",
        a: "Subscriptions start with a 7-day trial. You won’t be charged until the trial ends. Lifetime is a one-time purchase with no trial.",
      },
      {
        q: "Where can I manage billing / change plan?",
        a: "Go to Profile → Manage Subscription to open the Stripe billing portal. If you can’t access it, contact support and we’ll help.",
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      {
        title: "Email support",
        desc: "Best for billing + account issues.",
        icon: Mail,
        cta: "Send a message below",
        onClick: () => {
          const el = document.getElementById("support-form");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      },
      {
        title: "FAQ",
        desc: "Fast answers to common questions.",
        icon: MessageCircle,
        cta: "Open FAQ page",
        onClick: () => (window.location.href = "/faq"),
      },
    ],
    []
  );

  // ✅ Placeholder: wire to your API later
  // endpoint example: POST /support-ticket { email, topic, subject, message, tvName }
  const submitTicket = async () => {
    setError(null);
    setSent(false);

    if (!email || !message) {
      setError("Please enter your email and a message.");
      return;
    }

    try {
      setSending(true);

      // Replace with your real endpoint when ready:
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/support-ticket`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, topic, subject, message, tradingview_name: tvName }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error || "Failed to send.");

      await new Promise((r) => setTimeout(r, 650)); // demo

      setSent(true);
      setSubject("");
      setMessage("");
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 md:py-28 overflow-hidden bg-[#050505] text-white">
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <motion.div
          {...enter(0, 18, 0)}
          className="text-center max-w-[880px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md">
            <LifeBuoy className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-300 text-xs tracking-[0.24em] font-semibold uppercase">
              SUPPORT
            </span>
          </div>

          <h1 className="mt-5 font-semibold tracking-[-0.045em] leading-[1.02] text-[clamp(34px,3.1vw,54px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Need help? <br /> We’ll get you back in flow.
            </span>
          </h1>

          <p className="mt-4 text-white/65 text-[clamp(15px,1.05vw,18px)] leading-relaxed">
            Choose a topic, send a message, and we’ll help you resolve it
            quickly.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/45">
            <ShieldCheck className="w-4 h-4 text-emerald-300/80" />
            Secure • No spam • We only use your email to reply
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          {...enter(0, 18, 0.06)}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.title}
                onClick={a.onClick}
                className="group text-left rounded-[26px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/14"
              >
                <div className="relative rounded-[26px] bg-[#0b0b0b]/78 border border-white/10 backdrop-blur-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold text-white/85 group-hover:text-white transition">
                        {a.title}
                      </div>
                      <div className="mt-1 text-sm text-white/55">{a.desc}</div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                        {a.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Form + FAQ */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Form */}
          <motion.div
            {...enter(-10, 18, 0.1)}
            className="lg:col-span-7"
            id="support-form"
          >
            <div className="rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/22 via-white/10 to-emerald-500/16">
              <div className="rounded-[30px] border border-white/10 bg-[#070707]/75 backdrop-blur-2xl overflow-hidden">
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-200 text-xs tracking-[0.22em] font-semibold uppercase">
                          Support ticket
                        </span>
                      </div>
                      <div className="mt-2 text-white/65 text-sm">
                        Please include your email + what you tried already.
                      </div>
                    </div>
                    <div className="text-xs text-white/40 inline-flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Reply via email
                    </div>
                  </div>

                  {/* Topic selector */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topics.map((t) => {
                      const Icon = t.icon;
                      const active = topic === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setTopic(t.key)}
                          className={[
                            "text-left rounded-2xl px-4 py-3.5 transition",
                            "bg-white/[0.02] hover:bg-white/[0.04]",
                            active
                              ? "ring-1 ring-emerald-400/35"
                              : "ring-1 ring-white/10",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10">
                              <Icon className="w-4.5 h-4.5 text-emerald-300" />
                            </span>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-white/85">
                                {t.label}
                              </div>
                              <div className="mt-1 text-xs text-white/55">{t.sub}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-4 py-3 text-white/85 focus:ring-2 focus:ring-emerald-300/30 outline-none transition"
                    />

                    <input
                      type="text"
                      placeholder="TradingView username (optional)"
                      value={tvName}
                      onChange={(e) => setTvName(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-4 py-3 text-white/85 focus:ring-2 focus:ring-emerald-300/30 outline-none transition"
                    />

                    <input
                      type="text"
                      placeholder="Subject (optional)"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-4 py-3 text-white/85 focus:ring-2 focus:ring-emerald-300/30 outline-none transition"
                    />

                    <textarea
                      placeholder="Describe your issue (include screenshots / steps if possible)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-4 py-3 text-white/85 focus:ring-2 focus:ring-emerald-300/30 outline-none transition resize-none"
                    />

                    {error && <div className="text-sm text-red-400">{error}</div>}

                    <AnimatePresence>
                      {sent && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="text-sm text-emerald-300"
                        >
                          ✅ Message queued. We’ll reply to your email.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={
                        reduceMotion
                          ? {}
                          : {
                            scale: 1.02,
                            backgroundPosition: "right center",
                            boxShadow: "0 0 55px rgba(16,185,129,0.35)",
                          }
                      }
                      whileTap={{ scale: 0.985 }}
                      onClick={submitTicket}
                      disabled={sending}
                      className={[
                        "group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-2xl transition-all duration-500 border",
                        "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 bg-[length:220%_auto] text-black border-emerald-300/30",
                        sending ? "opacity-70 cursor-not-allowed" : "",
                      ].join(" ")}
                    >
                      {sending ? "Sending..." : "Send message"}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                    </motion.button>

                    <div className="mt-2 text-xs text-white/45">
                      Tip: If this is billing-related, include the email used at
                      checkout.
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div {...enter(10, 18, 0.14)} className="lg:col-span-5">
            <div className="rounded-[30px] p-[1px] bg-gradient-to-b from-emerald-400/18 via-white/10 to-emerald-500/12">
              <div className="rounded-[30px] border border-white/10 bg-[#070707]/75 backdrop-blur-2xl overflow-hidden p-7">
                <div className="text-xs text-white/45 tracking-widest uppercase">
                  Quick answers
                </div>
                <div className="mt-2 text-white/80 font-semibold text-lg">
                  Common questions
                </div>

                <div className="mt-5 space-y-2">
                  {faqs.map((f, i) => {
                    const open = openIdx === i;
                    return (
                      <div
                        key={f.q}
                        className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIdx(open ? null : i)}
                          className="w-full px-4 py-4 flex items-center justify-between gap-3 text-left"
                        >
                          <div className="text-sm font-semibold text-white/85">
                            {f.q}
                          </div>
                          <ChevronDown
                            className={[
                              "w-4 h-4 text-white/55 transition-transform",
                              open ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {/* ✅ Smooth GPU-friendly animation (no height:auto reflow) */}
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              key="content"
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={{ opacity: 1, scaleY: 1 }}
                              exit={{ opacity: 0, scaleY: 0 }}
                              transition={{ duration: 0.22, ease: easePremium }}
                              style={{ transformOrigin: "top" }}
                            >
                              <div className="px-4 pb-4">
                                <div className="text-sm text-white/65 leading-relaxed">
                                  {f.a}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 text-xs text-white/45">
                  <div>Still stuck?</div>
                  <a
                    href="/faq"
                    className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition font-semibold"
                  >
                    Read full FAQ <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/45">
              If you prefer, you can also contact us via your community channel
              (if provided).
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
