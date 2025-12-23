import { useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useSession } from "../hooks/useSession";
import {
  User,
  CreditCard,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  // ✅ section icons
  Layers,
  SlidersHorizontal,
  Cloud,
  Target,
  Workflow,
  TrendingUp,
  // ✅ NEW: support icon
  LifeBuoy,
  // ✅ NEW: icons for pricing + faq
  Tag,
  HelpCircle,
} from "lucide-react";

import Logo from "../assets/Logo.svg";

export default function TopBar() {
  const { user } = useSession();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bproOpen, setBproOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const bproRef = useRef<HTMLDivElement | null>(null);

  // ✅ B:PRO sections with icons + micro copy
  const bproSections = useMemo(
    () => [
      { label: "Core Engines", id: "core-engines", icon: Layers, sub: "Structure + system map" },
      { label: "Trade Modes", id: "trade-modes", icon: SlidersHorizontal, sub: "Short / Mid / Long" },
      { label: "Adaptive Cloud", id: "adaptive-cloud", icon: Cloud, sub: "Trend context + regimes" },
      { label: "Future Targets", id: "future-targets", icon: Target, sub: "T1/T2 rails + bias" },
      { label: "Workflow", id: "workflow", icon: Workflow, sub: "Step-by-step execution" },
      { label: "Profit Cases", id: "profit-cases", icon: TrendingUp, sub: "Examples + outcomes" },
    ],
    []
  );

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpen(false);
    setBproOpen(false);
  };

  const goToSection = (id: string) => {
    closeAllMenus();

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = id;
      return;
    }

    navigate(`/#${id}`);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const openBillingPortal = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.email) {
        setError("No email found for current user.");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-billing-portal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create portal session.");
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Billing portal error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      closeAllMenus();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const initial = useMemo(() => (user?.email ? user.email[0].toUpperCase() : "M"), [user?.email]);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(10,10,10,0.65)",
        boxShadow: "0 18px 45px rgba(0,0,0,0.4)",
        "--font-display": `"Space Grotesk", ui-sans-serif`,
        "--font-body": `"Inter", ui-sans-serif`,
      }}
    >
      {/* accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px opacity-90"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.10), rgba(16,185,129,0.25), rgba(255,255,255,0.10), rgba(255,255,255,0))",
        }}
      />

      <div className="relative mx-auto max-w-[2400px] px-6 sm:px-10 lg:px-16 2xl:px-20 h-[76px] flex items-center gap-6 font-[var(--font-body)]">
        {/* Brand */}
        <motion.button
          onClick={() => {
            closeAllMenus();

            // ✅ If already on "/", just scroll to top instead of navigating
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              // optional: also clear hash so you don't jump back to a section
              if (window.location.hash) window.history.replaceState(null, "", "/");
              return;
            }

            navigate("/");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 cursor-pointer select-none"
          aria-label="Go to home"
        >
          <img
            src={Logo}
            alt="moostrade"
            className="h-5 w-auto sm:h-5"
            draggable={false}
          />
        </motion.button>

        {/* CENTER MENU (desktop) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-2">
          {/* ✅ B:PRO Mega Menu */}
          <div className="relative" ref={bproRef}>
            <button
              type="button"
              onClick={() => setBproOpen((v) => !v)}
              className="px-3 py-2 rounded-xl text-[13px] font-medium text-white/75 hover:text-white transition hover:bg-white/[0.04] border border-transparent hover:border-white/10 inline-flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                B:PRO
              </span>
              <ChevronDown
                className={[
                  "w-4 h-4 text-white/60 transition-transform duration-200",
                  bproOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            <AnimatePresence>
              {bproOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 mt-3 w-[680px] rounded-[28px] overflow-hidden"
                >
                  {/* Premium frame */}
                  <div className="p-[1px] rounded-[28px] bg-gradient-to-b from-emerald-400/25 via-white/10 to-emerald-500/15 shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
                    <div className="relative rounded-[28px] border border-white/10 bg-[#0b0b0b]/82 backdrop-blur-2xl overflow-hidden">
                      {/* ambient */}
                      <div aria-hidden className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.14),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.07),transparent_60%)]" />
                        <div className="absolute -top-20 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                      </div>

                      <div className="relative z-10 p-5">
                        {/* top row */}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-xs text-white/45 tracking-widest uppercase">B:PRO navigation</div>
                            <div className="mt-1 text-[15px] text-white/80">Jump directly to the part you need.</div>
                          </div>

                          <button
                            onClick={() => {
                              closeAllMenus();
                              navigate("/pricing");
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[13px] font-semibold text-black border border-emerald-300/30 shadow-[0_0_26px_rgba(16,185,129,0.20)]"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                            }}
                          >
                            <Tag className="w-4 h-4" />
                            View Pricing <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* grid of section tiles */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          {bproSections.map((l) => {
                            const Icon = l.icon;
                            return (
                              <button
                                key={l.id}
                                type="button"
                                onClick={() => goToSection(l.id)}
                                className="group w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition px-4 py-3.5"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-emerald-300/25 transition">
                                    <Icon className="w-5 h-5 text-emerald-300" />
                                  </span>

                                  <div className="min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="text-[13.5px] font-semibold text-white/85 group-hover:text-white transition">
                                        {l.label}
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-white/35 group-hover:text-white/70 transition" />
                                    </div>
                                    <div className="mt-1 text-[12px] text-white/55 leading-snug">{l.sub}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* bottom trust strip + support link */}
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center justify-between gap-3">
                          <div className="text-[12px] text-white/60">
                            Trial on subscriptions • One-time lifetime available • Secure Stripe checkout
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => {
                                closeAllMenus();
                                navigate("/support");
                              }}
                              className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/65 hover:text-white transition"
                            >
                              <LifeBuoy className="w-4 h-4 text-emerald-300" />
                              Support
                            </button>

                            <button
                              onClick={() => {
                                closeAllMenus();
                                navigate("/pricing");
                              }}
                              className="text-[12px] font-semibold text-emerald-300 hover:text-emerald-200 transition inline-flex items-center gap-2"
                            >
                              <Tag className="w-4 h-4" />
                              Compare plans →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* glow footer */}
                      <div className="absolute -bottom-16 left-0 w-full h-40 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing (top-level) */}
          <button
            type="button"
            onClick={() => {
              closeAllMenus();
              navigate("/pricing");
            }}
            className="px-3 py-2 rounded-xl text-[13px] font-medium text-white/70 hover:text-white transition hover:bg-white/[0.04] border border-transparent hover:border-white/10 inline-flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-emerald-300" />
            Pricing
          </button>

          {/* FAQ (top-level) */}
          <button
            type="button"
            onClick={() => {
              closeAllMenus();
              navigate("/faq");
            }}
            className="px-3 py-2 rounded-xl text-[13px] font-medium text-white/70 hover:text-white transition hover:bg-white/[0.04] border border-transparent hover:border-white/10 inline-flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            FAQ
          </button>

          {/* Support (top-level) */}
          <button
            type="button"
            onClick={() => {
              closeAllMenus();
              navigate("/support");
            }}
            className="px-3 py-2 rounded-xl text-[13px] font-medium text-white/70 hover:text-white transition hover:bg-white/[0.04] border border-transparent hover:border-white/10 inline-flex items-center gap-2"
          >
            <LifeBuoy className="w-4 h-4 text-emerald-300" />
            Support
          </button>
        </nav>

        {/* RIGHT AREA */}
        <div className="ml-auto flex items-center gap-3">
          {/* Desktop CTA / account */}
          {!user ? (
            <div className="hidden sm:flex items-center gap-5">
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-[14px] font-medium text-white/80 hover:text-white transition"
              >
                Sign In
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/pricing")}
                className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl text-sm font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                }}
              >
                <Tag className="w-4 h-4" />
                View Pricing
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <div className="hidden md:block relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="group flex items-center gap-3 text-white/80 hover:text-white transition"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center font-semibold text-white">
                    {initial}
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-emerald-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-[13px] text-white/65">Signed in</span>
                  <span className="text-[14px] text-white/90 font-medium max-w-[520px] truncate">{user.email}</span>
                </div>

                <ChevronRight
                  className={[
                    "w-4 h-4 transition-transform duration-200",
                    open ? "rotate-90" : "",
                  ].join(" ")}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b0b]/75 backdrop-blur-2xl shadow-[0_22px_70px_rgba(0,0,0,0.55)]"
                  >
                    <div className="p-2">
                      <MenuItem
                        onClick={() => {
                          setOpen(false);
                          navigate("/profile");
                        }}
                        icon={<User className="w-4 h-4 text-emerald-300" />}
                        label="Profile Settings"
                      />
                      <MenuItem
                        onClick={openBillingPortal}
                        icon={<CreditCard className="w-4 h-4 text-emerald-300" />}
                        label={loading ? "Opening Portal..." : "Manage Subscription"}
                        disabled={loading}
                      />
                      <MenuItem
                        onClick={() => {
                          setOpen(false);
                          navigate("/support");
                        }}
                        icon={<LifeBuoy className="w-4 h-4 text-emerald-300" />}
                        label="Support"
                      />
                      <div className="my-2 h-px bg-white/10" />
                      <MenuItem
                        onClick={handleLogout}
                        icon={<LogOut className="w-4 h-4 text-red-300" />}
                        label="Logout"
                        danger
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile menu toggle — ALWAYS available */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-300/30 transition-all"
            aria-label="Open menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen && (
                <motion.div
                  key="glow"
                  className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: menuOpen ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: menuOpen ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.45, 0, 0.2, 1] }}
                className="relative z-10 text-white/90"
              >
                {menuOpen ? <X className="w-5 h-5 text-emerald-300" /> : <Menu className="w-5 h-5 text-white/90" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* === MOBILE MENU (unchanged except it still works) === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/10 bg-[#0b0b0b]/80 backdrop-blur-2xl shadow-[0_22px_70px_rgba(0,0,0,0.55)]"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    navigate("/pricing");
                    closeAllMenus();
                  }}
                  className="w-full py-2.5 rounded-xl text-[13px] font-medium text-white/85 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-left px-3 inline-flex items-center gap-2"
                >
                  <Tag className="w-4 h-4 text-emerald-300" />
                  Pricing
                </button>

                <button
                  onClick={() => {
                    navigate("/faq");
                    closeAllMenus();
                  }}
                  className="w-full py-2.5 rounded-xl text-[13px] font-medium text-white/85 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-left px-3 inline-flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-300" />
                  FAQ
                </button>

                {/* Support on mobile grid */}
                <button
                  onClick={() => {
                    navigate("/support");
                    closeAllMenus();
                  }}
                  className="col-span-2 w-full py-2.5 rounded-xl text-[13px] font-medium text-white/85 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-left px-3 inline-flex items-center gap-2"
                >
                  <LifeBuoy className="w-4 h-4 text-emerald-300" />
                  Support
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/45 tracking-widest uppercase">B:PRO</div>
                  <button onClick={() => setBproOpen((v) => !v)} className="text-xs text-emerald-300 font-semibold">
                    {bproOpen ? "Hide" : "Show"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {bproOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 grid grid-cols-2 gap-2 overflow-hidden"
                    >
                      {bproSections.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => goToSection(l.id)}
                          className="w-full py-2.5 rounded-xl text-[13px] font-medium text-white/85 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-left px-3"
                        >
                          {l.label}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          navigate("/pricing");
                          closeAllMenus();
                        }}
                        className="col-span-2 w-full py-2.5 rounded-xl text-[13px] font-semibold text-black inline-flex items-center justify-center gap-2"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                        }}
                      >
                        <Tag className="w-4 h-4" />
                        View Pricing →
                      </button>

                      {/* Support button inside B:PRO block */}
                      <button
                        onClick={() => {
                          navigate("/support");
                          closeAllMenus();
                        }}
                        className="col-span-2 w-full py-2.5 rounded-xl text-[13px] font-medium text-white/90 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 inline-flex items-center justify-center gap-2"
                      >
                        <LifeBuoy className="w-4 h-4 text-emerald-300" />
                        Support
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-px bg-white/10" />

              {!user ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigate("/login");
                      closeAllMenus();
                    }}
                    className="w-full py-2.5 rounded-xl text-[15px] font-medium text-white/90 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      navigate("/pricing");
                      closeAllMenus();
                    }}
                    className="w-full py-2.5 rounded-xl text-[15px] font-semibold text-black inline-flex items-center justify-center gap-2"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                    }}
                  >
                    <Tag className="w-4 h-4" />
                    View Pricing
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      closeAllMenus();
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm border border-white/10 bg-white/[0.04] text-white/85"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center font-semibold text-white">
                        {initial}
                      </span>
                      Profile Settings
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  </button>

                  <button
                    disabled={loading}
                    onClick={openBillingPortal}
                    className={[
                      "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm border border-white/10 bg-white/[0.04] text-white/85",
                      loading ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-emerald-300" />
                      </span>
                      {loading ? "Opening Portal..." : "Manage Subscription"}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/support");
                      closeAllMenus();
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm border border-white/10 bg-white/[0.04] text-white/85"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                        <LifeBuoy className="w-4 h-4 text-emerald-300" />
                      </span>
                      Support
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm border border-red-500/20 bg-red-500/10 text-red-200"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl border border-red-500/20 bg-red-500/10 flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-red-200" />
                      </span>
                      Logout
                    </span>
                    <ChevronRight className="w-4 h-4 text-red-200/70" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mx-auto max-w-[2400px] px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="mb-3 rounded-xl border border-red-700/40 bg-red-600/10 text-red-300 text-center text-sm py-2 font-medium">
            {error}
          </div>
        </div>
      )}
    </motion.header>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  disabled,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition",
        "border border-transparent",
        danger
          ? "text-red-200 hover:bg-red-500/10 hover:border-red-500/20"
          : "text-white/85 hover:bg-white/[0.04] hover:border-white/10",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
