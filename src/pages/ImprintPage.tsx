import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Globe,
  Scale,
  ArrowRight,
  Info,
} from "lucide-react";

const easePremium = [0.16, 1, 0.3, 1] as const;

type Block = {
  eyebrow: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
};

export default function ImprintPage() {
  const reduceMotion = useReducedMotion();

  const enter = (dir = 1, d = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 * dir, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.7, delay: d, ease: easePremium },
    viewport: { once: false, amount: 0.2 },
  });

  const blocks: Block[] = [
    {
      eyebrow: "Provider",
      title: "Responsible person",
      icon: User,
      content: (
        <div className="space-y-3">
          

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Full name" value="Karl Moos" />
            <InfoRow label="Website" value="moostrade.com" />
            <InfoRow label="Address" value="Marktgasse 18, 6340 Baar" />
            <InfoRow label="Country" value="Switzerland" />
          </div>
        </div>
      ),
    },
    {
      eyebrow: "Contact",
      title: "How to reach us",
      icon: Mail,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow label="Email" value="support@moostrade.com" />
          <InfoRow label="Phone" value="+41 78 321 63 30" />
        </div>
      ),
    },

  ];

  return (
    <section
      id="imprint"
      className="relative w-full bg-transparent text-white py-14 sm:py-16 md:py-24 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 -top-28 -bottom-28 bg-[radial-gradient(circle_at_60%_15%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1060px] px-4 sm:px-10">
        <motion.div {...enter(1)} className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-emerald-400/20 bg-white/[0.03] backdrop-blur-md w-fit">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase">
                Legal
              </span>
            </div>

            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/55">
              <User className="w-3.5 h-3.5 text-emerald-300/80" />
              Imprint
            </span>
          </div>

          <h1 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(30px,7.6vw,56px)]">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
              Imprint
            </span>
          </h1>

          <p className="text-white/60 leading-relaxed text-[14.5px] sm:text-lg max-w-[760px]">
            Replace the placeholders with your details. This page is intended for a Switzerland-based private operator and
            should be updated if your legal setup changes.
          </p>
        </motion.div>

        <div className="mt-6 sm:mt-8 space-y-6">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.section
                key={b.title}
                {...enter(1, 0.03 + i * 0.03)}
                className="rounded-[26px] border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <div className="px-5 sm:px-6 py-5 sm:py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-[10px] tracking-[0.18em] uppercase text-white/55">
                      <Icon className="w-3.5 h-3.5 text-emerald-300/80" />
                      {b.eyebrow}
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[10px] tracking-[0.18em] uppercase text-emerald-100">
                      Imprint
                    </span>
                  </div>

                  <h2 className="mt-3 font-extrabold tracking-tight leading-[1.08] text-[clamp(20px,5.4vw,34px)]">
                    <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                      {b.title}
                    </span>
                  </h2>

                  <div className="mt-4">{b.content}</div>
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
