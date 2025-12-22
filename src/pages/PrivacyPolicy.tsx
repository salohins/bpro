import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Layers,
  CreditCard,
  BarChart3,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const easePremium = [0.16, 1, 0.3, 1] as const;

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
};

export default function PrivacyPolicyPage() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.7, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.2 },
  });

  const sections = useMemo<Section[]>(
    () => [
      {
        id: "intro",
        eyebrow: "Privacy",
        title: "Privacy Policy",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              This Privacy Policy explains how we collect and use personal data when you visit our website, create an
              account, use our services, contact us, or interact with cookies, analytics, and advertising tools.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We are based in Switzerland and operate internationally.
            </p>

            <div className="pt-1 text-xs text-white/45 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300/70" />
              Last updated: December 19, 2025
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Chip
                tone="emerald"
                icon={<ShieldCheck className="w-4 h-4 text-emerald-200/90" />}
                title="Based in Switzerland"
                desc="We operate internationally"
              />
              <Chip
                icon={<Layers className="w-4 h-4 text-emerald-200/90" />}
                title="Core stack"
                desc="Supabase, Stripe, GA, Meta Pixel"
              />
            </div>
          </div>
        ),
      },
      
      {
        id: "data",
        eyebrow: "Data",
        title: "What we collect",
        body: (
          <div className="space-y-4">
            <BlockTitle>Data you provide</BlockTitle>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Account data such as name, username, email and login credentials. Support messages and any information you
              choose to submit.
            </p>

            <BlockTitle>Billing and subscription data (Stripe)</BlockTitle>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Payments are processed by Stripe. We do not receive full card details. We typically receive subscription
              status, plan information, billing period, invoices, and payment success or failure.
            </p>

            <BlockTitle>Data collected automatically</BlockTitle>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              IP address, device and browser information, pages viewed, clicks, referrers, timestamps, and approximate
              location derived from IP. We also use cookies and similar technologies as described below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Chip
                tone="emerald"
                icon={<Layers className="w-4 h-4 text-emerald-200/90" />}
                title="Supabase"
                desc="Auth, database, storage"
              />
              <Chip
                icon={<CreditCard className="w-4 h-4 text-emerald-200/90" />}
                title="Stripe"
                desc="Payments and subscriptions"
              />
            </div>
          </div>
        ),
      },
      {
        id: "purpose",
        eyebrow: "Purpose",
        title: "Why we use your data",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We use personal data to provide the service, create and manage accounts, and deliver features you request.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We also use personal data to keep the site secure, prevent abuse, troubleshoot issues, and improve
              performance and UX.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              If you allow it, we measure marketing performance and conversions using tools like Meta Pixel.
            </p>
          </div>
        ),
      },
      {
        id: "tools",
        eyebrow: "Tools",
        title: "Analytics and advertising tools",
        body: (
          <div className="space-y-4">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We use the following tools, depending on your cookie choices and regional requirements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Chip
                icon={<BarChart3 className="w-4 h-4 text-emerald-200/90" />}
                title="Google Analytics"
                desc="Usage and performance analytics"
              />
              <Chip
                icon={<Megaphone className="w-4 h-4 text-emerald-200/90" />}
                title="Meta Pixel"
                desc="Ad measurement and conversion tracking"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4">
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">Important</div>
              <p className="mt-2 text-white/70 leading-relaxed text-[14px] sm:text-[15px]">
                Where required, non essential cookies and similar tracking only load after consent. You can change your
                choices later via cookie settings (for example in the footer).
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "sharing",
        eyebrow: "Sharing",
        title: "Who we share data with",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We share data with service providers who help us run the product, such as Supabase (infrastructure) and
              Stripe (payments).
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              If you allow marketing cookies, we may share limited data with advertising partners like Meta for
              conversion measurement.
            </p>
            <p className="text-white/65 leading-relaxed text-[14.5px] sm:text-lg">
              We may disclose data to authorities if legally required. We do not sell personal data as a data broker.
            </p>
          </div>
        ),
      },
      {
        id: "transfers",
        eyebrow: "International",
        title: "International transfers",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Because we operate internationally and use global providers, data may be processed outside Switzerland and
              outside your country.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              When required, we use appropriate safeguards to protect personal data transferred internationally.
            </p>
          </div>
        ),
      },
      {
        id: "retention",
        eyebrow: "Retention",
        title: "How long we keep data",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We keep personal data only as long as needed to provide the service and meet legal obligations.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              When data is no longer needed, we delete it or anonymize it.
            </p>
          </div>
        ),
      },
      {
        id: "security",
        eyebrow: "Security",
        title: "Security",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We use reasonable technical and organizational measures to protect personal data, including access control
              and secure hosting practices.
            </p>
          </div>
        ),
      },
      {
        id: "rights",
        eyebrow: "Your rights",
        title: "Your rights and choices",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Depending on your location and applicable law, you may have rights such as access, correction, deletion,
              objection, restriction, and portability where applicable.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              To make a request, contact{" "}
              <span className="text-white/85 font-semibold">support@moostrade.com</span>. We may ask you to verify your
              identity.
            </p>
          </div>
        ),
      },
      {
        id: "marketing",
        eyebrow: "Marketing",
        title: "Marketing messages",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              If you opt in to marketing messages, you can unsubscribe at any time using the link in our emails.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              You can also contact us to stop marketing messages.
            </p>
          </div>
        ),
      },
      {
        id: "children",
        eyebrow: "Children",
        title: "Children",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Our services are not intended for children under <span className="text-white/85 font-semibold">18</span> years old.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              If you believe a child has provided data, contact us and we will address it.
            </p>
          </div>
        ),
      },
      {
        id: "changes",
        eyebrow: "Updates",
        title: "Changes to this policy",
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We may update this Privacy Policy. If changes are significant, we will post a notice and update the date
              at the top of this page.
            </p>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section
      id="privacy"
      className="relative w-full bg-transparent text-white py-14 sm:py-16 md:py-24 overflow-hidden"
    >
      {/* background stays like your FutureTargets style */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-28 -bottom-28 bg-[radial-gradient(circle_at_60%_15%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1060px] px-4 sm:px-10">
        {/* header */}
        <motion.div {...enter(1)} className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase">
                Privacy
              </span>
            </div>

            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/55">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300/80" />
              Switzerland, international
            </span>
          </div>

          <h1 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(30px,7.6vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>

          {/* TOC (in-flow, so it never breaks scrolling) */}
          <div className="rounded-[26px] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">On this page</div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections
                .filter((s) => s.id !== "intro")
                .map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.03] px-4 py-3 transition"
                  >
                    <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">{s.eyebrow}</div>
                    <div className="mt-1 text-sm font-semibold text-white/85 leading-tight">{s.title}</div>
                  </a>
                ))}
            </div>
          </div>
        </motion.div>

        {/* content */}
        <div className="mt-6 sm:mt-8 space-y-6">
          {sections.map((s, i) => (
            <motion.section
              key={s.id}
              id={s.id}
              {...enter(1, 0.02 + i * 0.03)}
              className="rounded-[26px] border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <div className="px-5 sm:px-6 py-5 sm:py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] tracking-[0.18em] uppercase text-white/55">
                    {s.eyebrow}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[10px] tracking-[0.18em] uppercase text-emerald-100">
                    Policy
                  </span>
                </div>

                <h2 className="mt-3 font-extrabold tracking-tight leading-[1.08] text-[clamp(20px,5.4vw,34px)]">
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                    {s.title}
                  </span>
                </h2>

                <div className="mt-4">{s.body}</div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- tiny atoms ---------- */

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.18em] uppercase text-white/55">
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3">
      <div className="text-[10px] text-white/45 tracking-widest uppercase">{label}</div>
      <div className="mt-1 text-[13.5px] sm:text-sm text-white/80 leading-tight break-words">{value}</div>
    </div>
  );
}

function Chip({
  icon,
  title,
  desc,
  tone = "neutral",
}: {
  icon?: React.ReactNode;
  title: string;
  desc: string;
  tone?: "emerald" | "neutral";
}) {
  const base = "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md";
  const toneCls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={`${base} ${toneCls}`} style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shrink-0">
        {icon ? icon : <span className="w-2 h-2 rounded-full bg-emerald-300/70" />}
      </span>
      <div className="min-w-0">
        <div className="text-[13.5px] sm:text-sm font-semibold text-white/85 leading-tight">{title}</div>
        <div className="text-[13px] sm:text-sm text-white/55 leading-tight">{desc}</div>
      </div>
    </div>
  );
}
