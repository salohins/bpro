import { useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useSession } from "../hooks/useSession";
import { User, CreditCard, LogOut, ChevronRight, Menu, X } from "lucide-react";

export default function TopBar() {
  const { user } = useSession();

  const [open, setOpen] = useState(false); // desktop logged-in dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu (always available)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const sectionLinks = useMemo(
    () => [
      { label: "Core Engines", id: "core-engines" },
      { label: "Trade Modes", id: "trade-modes" },
      { label: "Adaptive Cloud", id: "adaptive-cloud" },
      { label: "Future Targets", id: "future-targets" },
      { label: "Workflow", id: "workflow" },
      { label: "Profit Cases", id: "profit-cases" },
      // ✅ NEW: FAQ as a route link (not a section id)
      { label: "FAQ", id: "__faq_route__" },
    ],
    []
  );

  const goToSection = (id: string) => {
    setMenuOpen(false);
    setOpen(false);

    // ✅ FAQ is a route, not a page section
    if (id === "__faq_route__") {
      navigate("/faq");
      return;
    }

    // If already on "/", smooth scroll. Otherwise go to "/#id".
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = id;
      }
      return;
    }

    navigate(`/#${id}`);
    // best-effort smooth scroll after route changes
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

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/create-billing-portal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to create portal session.");
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Billing portal error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setOpen(false);
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const initial = useMemo(
    () => (user?.email ? user.email[0].toUpperCase() : "M"),
    [user?.email]
  );

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
            setMenuOpen(false);
            setOpen(false);
            navigate("/");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <motion.span
            className="text-[22px] sm:text-[24px] font-[var(--font-display)] font-semibold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 100%" }}
          >
            moostrade
          </motion.span>
        </motion.button>

        {/* CENTER MENU (desktop) — truly centered in viewport */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-2">
          {sectionLinks.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => goToSection(l.id)}
              className="px-3 py-2 rounded-xl text-[13px] font-medium text-white/70 hover:text-white transition hover:bg-white/[0.04] border border-transparent hover:border-white/10"
            >
              {l.label}
            </button>
          ))}
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
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 20px rgba(16,185,129,0.3)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/subscribe")}
                className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl text-sm font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                }}
              >
                Try Breakout PRO
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
                  <span className="text-[14px] text-white/90 font-medium max-w-[520px] truncate">
                    {user.email}
                  </span>
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

          {/* Mobile menu toggle — ALWAYS available (logged in or not) */}
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
                {menuOpen ? (
                  <X className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Menu className="w-5 h-5 text-white/90" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* === MOBILE MENU (section links + auth/account actions) === */}
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
              {/* section links */}
              <div className="grid grid-cols-2 gap-2">
                {sectionLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => goToSection(l.id)}
                    className="w-full py-2.5 rounded-xl text-[13px] font-medium text-white/85 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-left px-3"
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              {/* auth/account actions */}
              {!user ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-[15px] font-medium text-white/90 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10"
                  >
                    Sign In
                  </button>

                  {/* ✅ NEW: FAQ quick link on mobile */}
                  <button
                    onClick={() => {
                      navigate("/faq");
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-[15px] font-medium text-white/90 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10"
                  >
                    FAQ
                  </button>

                  <button
                    onClick={() => {
                      navigate("/subscribe");
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-[15px] font-semibold text-black"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(110,231,183,1) 100%)",
                    }}
                  >
                    Try Moostrade PRO
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* ✅ NEW: FAQ quick link when logged in too */}
                  <button
                    onClick={() => {
                      navigate("/faq");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm border border-white/10 bg-white/[0.04] text-white/85"
                  >
                    <span className="flex items-center gap-3">FAQ</span>
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  </button>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
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
