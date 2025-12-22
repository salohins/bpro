import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { User, Lock, Shield, CreditCard, LifeBuoy, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Types
type Profile = {
  email?: string | null;
  tradingview_name?: string | null;
  created_at?: string | null;
  must_change_password?: boolean | null;
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tradingview, setTradingview] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "account" | "security" | "sessions" | "subscription" | "support"
  >("account");
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ password modal state
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const navigate = useNavigate();

  // 🔐 Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError("");
        setMessage("");

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/");
          return;
        }

        // Try to select must_change_password if it exists
        let data: any = null;

        const attempt = await supabase
          .from("profiles")
          .select("email, tradingview_name, created_at, must_change_password")
          .eq("id", user.id)
          .maybeSingle();

        if (attempt.error) {
          // Fallback if column doesn't exist yet (or schema mismatch)
          const fallback = await supabase
            .from("profiles")
            .select("email, tradingview_name, created_at")
            .eq("id", user.id)
            .maybeSingle();

          if (fallback.error) throw fallback.error;
          data = fallback.data;

          // Best-effort: show modal on magic-link login
          // (Works often for magic-link/recovery style sessions)
          const isMagicLinkLogin = !!(user as any).recovery_sent_at;

          // If you want "only once" without DB column, use localStorage:
          const localKey = "pw_modal_done";
          const alreadyDone = localStorage.getItem(localKey) === "1";

          if (isMagicLinkLogin && !alreadyDone) {
            setActiveTab("security");
            setShowPwModal(true);
          }
        } else {
          data = attempt.data;

          // ✅ persistent + correct approach
          if (data?.must_change_password) {
            setActiveTab("security");
            setShowPwModal(true);
          }
        }

        setProfile(data);
        setTradingview(data?.tradingview_name || "");
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  // Handlers
  const handleUpdateProfile = useCallback(async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { error } = await supabase
        .from("profiles")
        .update({ tradingview_name: tradingview })
        .eq("id", user.id);

      if (error) throw error;
      setMessage("Profile updated successfully ✅");
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setSaving(false);
    }
  }, [tradingview]);

  const handleChangePassword = useCallback(async () => {
    try {
      setError("");
      setMessage("");

      if (newPassword !== confirmPassword) throw new Error("Passwords do not match");
      if (newPassword.length < 6) throw new Error("Password must be at least 6 characters");

      setPwSaving(true);

      const { error: pwErr } = await supabase.auth.updateUser({ password: newPassword });
      if (pwErr) throw pwErr;

      // ✅ Try to disable must_change_password if the column exists (won't break if it doesn't)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase
            .from("profiles")
            .update({ must_change_password: false })
            .eq("id", user.id);
        }
      } catch {
        // ignore schema mismatch
      }

      // localStorage fallback to prevent repeated modal if DB column isn't used
      try {
        localStorage.setItem("pw_modal_done", "1");
      } catch {
        // ignore if storage is unavailable
      }

      setMessage("Password updated successfully ✅");
      setNewPassword("");
      setConfirmPassword("");
      setShowPwModal(false);

      // keep local state in sync if it exists
      setProfile((p) => (p ? { ...p, must_change_password: false } : p));
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setPwSaving(false);
    }
  }, [newPassword, confirmPassword]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  }, []);

  const handleLogoutEverywhere = useCallback(async () => {
    try {
      setError("");
      setMessage("Logging out from all devices…");

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/logout-all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Logged out from all devices ✅");
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }, []);

  const handleOpenBillingPortal = useCallback(async () => {
    try {
      setLoadingPortal(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-billing-portal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: profile?.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open billing portal");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoadingPortal(false);
    }
  }, [profile?.email]);

  const handleCopyEmail = useCallback(() => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText("support@bpro.io");
      } else {
        // Fallback for environments without clipboard API
        const ta = document.createElement("textarea");
        ta.value = "support@bpro.io";
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // swallow errors silently
    }
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading…
      </div>
    );

  // --- Section Components ---
  const AccountSection: React.FC = () => (
    <section>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <User className="w-5 h-5" /> Account Info
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input
            value={profile?.email || ""}
            disabled
            className="w-full border border-white/10 bg-[#1a1a1a] text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">TradingView Username</label>
          <input
            value={tradingview}
            onChange={(e) => setTradingview(e.target.value)}
            placeholder="Enter your TradingView username"
            className="w-full border border-white/10 bg-[#1a1a1a] text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/30 outline-none transition"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={saving}
          className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-white py-2 rounded-lg transition font-medium"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </section>
  );

  const SecuritySection: React.FC = () => (
    <section>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <Lock className="w-5 h-5" /> Security
      </h2>

      <div className="space-y-4">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          className="w-full border border-white/10 bg-[#1a1a1a] text-gray-100 rounded-lg px-4 py-2"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full border border-white/10 bg-[#1a1a1a] text-gray-100 rounded-lg px-4 py-2"
        />

        <button
          onClick={handleChangePassword}
          className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition font-medium"
        >
          Change Password
        </button>
      </div>
    </section>
  );

  const SessionsSection: React.FC = () => (
    <section>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <Shield className="w-5 h-5" /> Sessions
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleLogout}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition"
        >
          Logout
        </button>
        <button
          onClick={handleLogoutEverywhere}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Logout Everywhere
        </button>
      </div>
    </section>
  );

  const SubscriptionSection: React.FC = () => (
    <section>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <CreditCard className="w-5 h-5" /> Manage Subscription
      </h2>
      <p className="text-gray-400 mb-4">
        You can update your payment method, view invoices, or cancel your plan anytime via the billing
        portal.
      </p>
      <button
        onClick={handleOpenBillingPortal}
        disabled={loadingPortal}
        className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-white py-3 rounded-lg transition font-medium"
      >
        {loadingPortal ? "Opening Portal..." : "Open Billing Portal"}
      </button>
    </section>
  );

  const SupportSection: React.FC = () => (
    <section>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <LifeBuoy className="w-5 h-5" /> Support
      </h2>
      <p className="text-gray-400 mb-4">
        Need help? Contact our support team — we usually respond within 24 hours.
      </p>
      <div className="flex items-center justify-between bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3">
        <span className="text-gray-300 text-sm">support@bpro.io</span>
        <button
          onClick={handleCopyEmail}
          className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 text-sm"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex text-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 backdrop-blur-md pt-20">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <nav className="flex flex-col mt-6">
          {[
            { key: "account", icon: <User className="w-4 h-4" />, label: "Account Info" },
            { key: "security", icon: <Lock className="w-4 h-4" />, label: "Security" },
            { key: "sessions", icon: <Shield className="w-4 h-4" />, label: "Sessions" },
            { key: "subscription", icon: <CreditCard className="w-4 h-4" />, label: "Subscription" },
            { key: "support", icon: <LifeBuoy className="w-4 h-4" />, label: "Support" },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-3 px-6 py-3 transition-all duration-200
                ${
                  activeTab === key
                    ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 py-12 overflow-y-auto pt-24 md:pt-30 relative">
        <div className="max-w-3xl mx-auto space-y-12 relative">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-emerald-400 to-emerald-500 bg-clip-text text-transparent tracking-tight">
              Profile Settings
            </h1>
            <p className="text-gray-400 mt-2">Manage your account, billing, and support options.</p>
          </div>

          {/* --- Desktop Animated Tabs (fixed layout) --- */}
          <div className="relative min-h-[450px] hidden md:block">
            <AnimatePresence mode="wait">
              {activeTab === "account" && (
                <motion.div key="account" {...animProps} className="absolute w-full">
                  <AccountSection />
                </motion.div>
              )}
              {activeTab === "security" && (
                <motion.div key="security" {...animProps} className="absolute w-full">
                  <SecuritySection />
                </motion.div>
              )}
              {activeTab === "sessions" && (
                <motion.div key="sessions" {...animProps} className="absolute w-full">
                  <SessionsSection />
                </motion.div>
              )}
              {activeTab === "subscription" && (
                <motion.div key="subscription" {...animProps} className="absolute w-full">
                  <SubscriptionSection />
                </motion.div>
              )}
              {activeTab === "support" && (
                <motion.div key="support" {...animProps} className="absolute w-full">
                  <SupportSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- Mobile: stacked --- */}
          <div className="space-y-12 md:hidden">
            <AccountSection />
            <SecuritySection />
            <SessionsSection />
            <SubscriptionSection />
            <SupportSection />
          </div>

          {(message || error) && (
            <div className="text-center pt-6">
              {message && <p className="text-emerald-400 text-sm">{message}</p>}
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          )}
        </div>
      </main>

      {/* ✅ Forced password modal */}
      <AnimatePresence>
        {showPwModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* modal */}
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-white">Set your password</h3>
              <p className="text-sm text-gray-400 mt-2">
                First login detected — please set a password to secure your account.
              </p>

              <div className="mt-5 space-y-3">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full border border-white/10 bg-[#1a1a1a] text-gray-100 rounded-lg px-4 py-2"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-white/10 bg-[#1a1a1a] text-gray-100 rounded-lg px-4 py-2"
                />

                <button
                  onClick={handleChangePassword}
                  disabled={pwSaving}
                  className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-60 text-white py-2 rounded-lg transition font-medium"
                >
                  {pwSaving ? "Saving..." : "Save Password"}
                </button>

                {error && <p className="text-red-400 text-sm">{error}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animation props (smooth transitions)
const animProps = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 },
};
