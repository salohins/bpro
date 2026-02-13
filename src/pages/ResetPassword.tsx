import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function ResetPassword() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.7, delay: d, ease: easePremium },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setHasSession(!!data.session);
      } catch (e: any) {
        console.error("Reset session check failed:", e);
        setHasSession(false);
      } finally {
        setChecking(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
      setChecking(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSetPassword = async () => {
    setError("");
    setMessage("");

    if (!hasSession) {
      setError("Reset link is invalid or expired. Please request a new one.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setMessage("✅ Password updated. Redirecting...");

      // ✅ Do NOT sign out — keep session and go to profile
      setTimeout(() => navigate("/profile"), 600);
    } catch (e: any) {
      setError(e?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] overflow-hidden text-white">
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_28%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,255,255,0.04),transparent_62%)]" />
        <div className="absolute -bottom-24 left-0 right-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      <div className="relative z-10 min-h-[calc(100vh-76px)] flex items-center">
        <div className="w-full mx-auto max-w-[900px] px-6 sm:px-10 lg:px-16 py-10">
          <motion.div {...enter(0, 12, 0)} className="max-w-xl mx-auto">
            <div className="rounded-[26px] p-[1px] bg-gradient-to-b from-white/12 via-white/8 to-emerald-500/10">
              <div className="relative rounded-[26px] border border-white/10 bg-[#070707]/78 backdrop-blur-2xl p-7 md:p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs tracking-[0.22em] font-semibold uppercase text-white/80">
                    moostrade
                  </span>
                </div>

                <h1 className="mt-5 font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(24px,2.6vw,38px)]">
                  <span className="text-white/95">Set a new password</span>
                  <span className="text-emerald-300">.</span>
                </h1>

                <p className="mt-3 text-white/60 text-[15px] leading-relaxed">
                  Choose a strong password. Once updated, you’ll be redirected to your profile.
                </p>

                <div className="mt-6 space-y-3">
                  {checking ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70">
                      Checking reset link…
                    </div>
                  ) : !hasSession ? (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      Reset link is invalid or expired. Go back and request a new one.
                    </div>
                  ) : (
                    <>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                          <Lock className="w-4 h-4 text-emerald-300" />
                        </span>
                        <input
                          type="password"
                          placeholder="New password (min 8 chars)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                        />
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                          <ShieldCheck className="w-4 h-4 text-emerald-300" />
                        </span>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                        />
                      </div>

                      {error && (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          {error}
                        </div>
                      )}
                      {message && (
                        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                          {message}
                        </div>
                      )}

                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={loading || !password || !confirm}
                        onClick={handleSetPassword}
                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-2xl transition border border-emerald-300/25 bg-emerald-400/90 hover:bg-emerald-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.16)] disabled:opacity-60"
                      >
                        {loading ? "Updating..." : "Update password"}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-2 w-full text-center text-sm text-white/55 hover:text-white transition"
                      >
                        ← Back to login
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/8 to-transparent blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
