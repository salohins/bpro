import React, { useMemo } from "react";
import {
  ArrowRight,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Sparkles,
  Music2,
} from "lucide-react";

export default function Footer() {
  const links = useMemo(
    () => [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Imprint", href: "/imprint" },
    ],
    []
  );

  const socials = useMemo(
    () => [
      {
        label: "X",
        href: "https://x.com/moostrade",
        icon: <Twitter className="w-4 h-4" />,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/moostraders/",
        icon: <Instagram className="w-4 h-4" />,
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/moostrade",
        icon: <Facebook className="w-4 h-4" />,
      },
      {
        label: "TikTok",
        href: "https://tiktok.com/@moostrade",
        icon: <Music2 className="w-4 h-4" />,
      },
      {
        label: "Support",
        href: "mailto:support@moostrade.com",
        icon: <Mail className="w-4 h-4" />,
      },
    ],
    []
  );

  return (
    <footer className="relative w-full bg-[#070707] text-white">
      {/* simple background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:84px_84px]" />
        </div>
      </div>

      {/* ✅ same width as other sections */}
      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="pt-14 pb-10">
          {/* top row */}
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start lg:justify-between">
            {/* brand */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                </div>
                <div className="leading-tight">
                  <div className="text-lg font-extrabold tracking-tight">Breakout PRO</div>
                  <div className="text-xs text-white/45 tracking-widest uppercase">
                    Suite for discretionary traders
                  </div>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed">
                Clean signals, confluence-first UX, and visual clarity. Engineered to help you execute trades with confidence
                across any timeframe.
              </p>

              {/* mini subscribe 
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-300/80" />
                  <input
                    type="email"
                    placeholder="Email for updates"
                    className="w-full bg-transparent outline-none text-white/85 placeholder:text-white/35 text-sm"
                  />
                </div>

                <button
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold
                  bg-emerald-400 text-black border border-emerald-300/30 transition hover:brightness-110"
                >
                  Join
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div> 

              <div className="text-xs text-white/40">No spam. Just launches and upgrades.</div> */}
            </div>

            {/* links + socials */}
            <div className="space-y-6 lg:min-w-[420px]">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {links.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    className="text-sm text-white/60 hover:text-white/90 transition"
                  >
                    {it.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition text-white/70"
                    aria-label={s.label}
                  >
                    <span className="text-emerald-200/90">{s.icon}</span>
                    <span className="text-sm">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="text-sm text-white/45">© {new Date().getFullYear()} Moostrade.com</div>

            <div className="text-xs text-white/40 max-w-xl">
              Trading involves risk. Nothing here is financial advice. Always test strategies and manage risk
              responsibly.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
