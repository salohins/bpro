import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ScrollText,
  ShieldCheck,
  CreditCard,
  User,
  Lock,
  AlertTriangle,
  Gavel,
  Globe,
  ArrowRight,
} from "lucide-react";

const easePremium = [0.16, 1, 0.3, 1] as const;

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  icon: React.ElementType;
  body: React.ReactNode;
};

export default function TermsPage() {
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
        eyebrow: "Overview",
        title: "Terms of Use",
        icon: ScrollText,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              These Terms of Use (“Terms”) govern access to and use of{" "}
              <span className="text-white/85 font-semibold">moostrade.com</span> and the related services
              (“Service”) provided by <span className="text-white/85 font-semibold">Moostrade.</span>
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              By accessing or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
            </p>
          </div>
        ),
      },
      {
        id: "eligibility",
        eyebrow: "Accounts",
        title: "Eligibility and accounts",
        icon: User,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              You must be at least <span className="text-white/85 font-semibold">18</span> years old to use the Service.
            </p>

            <ul className="space-y-2 text-white/70 text-[14px] sm:text-[15px] leading-relaxed">
              <Li>Provide accurate account information and keep it up to date.</Li>
              <Li>Keep your login credentials confidential and secure.</Li>
              <Li>You are responsible for activity on your account unless caused by our systems.</Li>
            </ul>
          </div>
        ),
      },
      {
        id: "service",
        eyebrow: "Use",
        title: "Acceptable use",
        icon: ShieldCheck,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              You agree to use the Service lawfully and in a way that does not harm the Service or other users.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card
                title="Do"
                tone="emerald"
                items={[
                  "Use the Service for its intended purpose",
                  "Respect applicable laws and regulations",
                  "Report vulnerabilities responsibly",
                ]}
              />
              <Card
                title="Don’t"
                items={[
                  "Attempt to bypass security, rate limits, or paywalls",
                  "Scrape or reverse engineer the Service where prohibited",
                  "Upload malware or abuse the platform",
                ]}
              />
            </div>

            <p className="text-white/55 text-[13px] sm:text-sm leading-relaxed">
              We may suspend or terminate accounts for violations, suspected abuse, or to protect the Service and users.
            </p>
          </div>
        ),
      },
{
  id: "subscriptions",
  eyebrow: "Billing",
  title: "Subscriptions, payments, and refunds",
  icon: CreditCard,
  body: (
    <div className="space-y-3">
      <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
        Paid plans are processed via <span className="text-white/85 font-semibold">Stripe</span>. By subscribing, you
        authorize us (and Stripe) to charge your payment method according to your selected plan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoRow label="Billing cycles" value="Monthly / yearly (depending on plan)" />
        <InfoRow label="Renewals" value="Auto-renew unless canceled" />
        <InfoRow label="Taxes" value="May apply depending on country" />
        <InfoRow label="Receipts" value="Provided by Stripe / email confirmation" />
      </div>

      <div className="rounded-[22px] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">Refunds</div>

        <p className="mt-2 text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
          Refund eligibility depends on the plan purchased and applicable consumer protection laws. If your subscription
          includes a <span className="text-white/85 font-semibold">7-day free trial</span>, you may cancel anytime during
          the trial and you won&apos;t be charged. After the trial ends, your subscription renews automatically and the
          first payment is collected unless you cancel before the trial expires.
        </p>

        <p className="mt-3 text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
          After a charge is made, subscription fees are generally{" "}
          <span className="text-white/85 font-semibold">non-refundable</span>, including partial refunds for unused time,
          downgrades, or cancellations made after the billing date.
        </p>

        <p className="mt-3 text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
          We may issue a refund or credit in limited cases, such as billing errors (duplicate charge or incorrect
          amount), unauthorized transactions (subject to verification), confirmed technical issues that materially
          prevent access and cannot be resolved within a reasonable time, where a refund is explicitly stated at
          checkout, or where required by law.
        </p>

        <div className="mt-3 text-white/55 text-[13px] sm:text-sm leading-relaxed">
          To request a refund, contact us within <span className="text-white/75 font-semibold">14 days</span> of the
          charge and include your subscription email, Stripe receipt/invoice ID (if available), and a short explanation
          with any relevant screenshots/logs. Contact Email: <span className="text-white/75 font-semibold">support@moostrade.com.</span> Approved refunds are processed back to the original payment method via
          Stripe.
        </div>
      </div>
    </div>
  ),
},

      {
        id: "content",
        eyebrow: "IP",
        title: "Intellectual property",
        icon: Gavel,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              The Service, including software, design, branding, and content provided by us, is protected by
              intellectual property laws. You receive a limited, non-exclusive, non-transferable license to use the
              Service while your account is active and in good standing.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              You may not copy, modify, distribute, sell, lease, or reverse engineer the Service except where permitted
              by law or with our written permission.
            </p>
          </div>
        ),
      },
      {
        id: "disclaimer",
        eyebrow: "Limits",
        title: "Disclaimers",
        icon: AlertTriangle,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              The Service is provided “as is” and “as available.” We do not guarantee uninterrupted access, error-free
              operation, or that results will meet expectations.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              If the Service includes trading-related information, signals, or analytics, it is for informational
              purposes only and does not constitute financial advice. You remain fully responsible for your decisions.
            </p>
          </div>
        ),
      },
          {
            id: "liability",
      eyebrow: "Disclaimer",
      title: "Liability",
      icon: ShieldCheck,
      body: (
        <div className="space-y-3">
          <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
            We maintain this website with care. However, we do not guarantee the accuracy, completeness, or timeliness
            of the information provided.
          </p>
          <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
            Liability claims for material or immaterial damage arising from accessing or using the information, misuse
            of the connection, or technical disruptions are excluded to the extent permitted by applicable law.
          </p>
        </div>
      ),
    },
      {
        id: "liability-limit",
        eyebrow: "Limits",
        title: "Limitation of liability",
        icon: ShieldCheck,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              To the extent permitted by law, we are not liable for indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, data, or goodwill arising from your use of the Service.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              Our total liability for claims related to the Service is limited to the amount you paid to us in the{" "}
              <span className="text-white/85 font-semibold">last 3</span> months before the event giving rise to
              the claim, unless mandatory law requires otherwise.
            </p>
          </div>
        ),
      },
      {
        id: "termination",
        eyebrow: "Accounts",
        title: "Termination",
        icon: User,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              You may stop using the Service at any time. You can cancel paid subscriptions through your account
              settings.
            </p>
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We may suspend or terminate access if necessary to protect the Service, enforce these Terms, or comply with
              legal obligations.
            </p>
          </div>
        ),
      },
      {
        id: "law",
        eyebrow: "Legal",
        title: "Governing law and jurisdiction",
        icon: ScaleIcon,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              These Terms are governed by Swiss law. Exclusive place of jurisdiction is{" "}
              <span className="text-white/85 font-semibold">Baar, Ct. Zug</span>, Switzerland, unless mandatory consumer
              protection laws provide otherwise.
            </p>
          </div>
        ),
      },
      {
        id: "changes",
        eyebrow: "Updates",
        title: "Changes to these Terms",
        icon: ArrowRight,
        body: (
          <div className="space-y-3">
            <p className="text-white/70 leading-relaxed text-[14.5px] sm:text-lg">
              We may update these Terms. If changes are material, we will update the “Last updated” date and may provide
              additional notice on the website or by email.
            </p>
            <p className="text-white/55 text-[13px] sm:text-sm leading-relaxed">
              Your continued use of the Service after changes become effective means you accept the updated Terms.
            </p>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section
      id="terms"
      className="relative w-full bg-transparent text-white py-14 sm:py-16 md:py-24 overflow-hidden"
    >
      {/* background consistent with your style */}
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
                Legal
              </span>
            </div>

            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/55">
              <ScrollText className="w-3.5 h-3.5 text-emerald-300/80" />
              Terms
            </span>
          </div>

          <h1 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(30px,7.6vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Terms of Use
            </span>
          </h1>


          {/* quick nav (optional but helpful) */}
          <div className="rounded-[26px] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">Sections</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition text-[11px] tracking-[0.14em] uppercase text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* sections */}
        <div className="mt-6 sm:mt-8 space-y-6">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.section
                key={s.id}
                id={s.id}
                {...enter(1, 0.03 + i * 0.02)}
                className="rounded-[26px] border border-white/10 bg-white/[0.02] overflow-hidden scroll-mt-24"
              >
                <div className="px-5 sm:px-6 py-5 sm:py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] tracking-[0.18em] uppercase text-white/55">
                      <Icon className="w-3.5 h-3.5 text-emerald-300/80" />
                      {s.eyebrow}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[10px] tracking-[0.18em] uppercase text-emerald-100">
                      Terms
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- atoms ---------- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3">
      <div className="text-[10px] text-white/45 tracking-widest uppercase">{label}</div>
      <div className="mt-1 text-[13.5px] sm:text-sm text-white/80 leading-tight break-words">
        {value}
      </div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
      <span>{children}</span>
    </li>
  );
}

function Card({
  title,
  items,
  tone = "neutral",
}: {
  title: string;
  items: string[];
  tone?: "emerald" | "neutral";
}) {
  const toneCls =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={`rounded-[22px] border ${toneCls} p-4 sm:p-5`}>
      <div className="text-[11px] tracking-[0.18em] uppercase text-white/55">{title}</div>
      <ul className="mt-3 space-y-2 text-white/70 text-[14px] sm:text-[15px] leading-relaxed">
        {items.map((x) => (
          <Li key={x}>{x}</Li>
        ))}
      </ul>
    </div>
  );
}

function MiniPill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[13.5px] sm:text-sm font-semibold text-white/85 leading-tight">{title}</div>
        <div className="text-[13px] sm:text-sm text-white/55 leading-tight">{desc}</div>
      </div>
    </div>
  );
}

function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  // lucide "Scale" exists but you didn't import it in your style snippet — keeping it self-contained.
  // If you prefer: import { Scale } from "lucide-react" and replace this component.
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M6 7h12" />
      <path d="M7 7l-3 7a4 4 0 0 0 8 0L7 7Z" />
      <path d="M17 7l-3 7a4 4 0 0 0 8 0l-5-7Z" />
    </svg>
  );
}
