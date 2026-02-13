import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

const easePremium: any = [0.16, 1, 0.3, 1];

export default function Login() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.7, delay: d, ease: easePremium },
  });

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInErr) throw signInErr;

      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr) throw userErr;
      if (!user) throw new Error("Login failed (no user session).");

      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .maybeSingle();

      if (profileErr) throw profileErr;

      if (profile?.is_admin) navigate("/admin");
      else navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (!email) throw new Error("Please enter your email.");

      // ✅ Send user to your real reset page (where they set a new password)
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;

      setMessage("Password reset link sent to your email ✅");
    } catch (err: any) {
      setError(err?.message ?? "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] overflow-hidden  text-white">
      {/* Ambient background (calmer) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_28%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,255,255,0.04),transparent_62%)]" />
        <div className="absolute -bottom-24 left-0 right-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      {/* ✅ TRUE CENTERING */}
      <div className="relative z-10 min-h-[calc(100vh-76px)] flex items-center">
        <div className="w-full mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 2xl:px-20 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: minimal brand + copy */}
            <motion.div {...enter(-10, 8, 0)} className="lg:col-span-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs tracking-[0.22em] font-semibold uppercase text-white/80">
                    moostrade
                  </span>
                </div>

                <h1 className="mt-5 font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(28px,3vw,44px)]">
                  <span className="text-white/95">
                    {forgotMode ? "Reset password" : "Sign in"}
                  </span>
                  <span className="text-emerald-300">.</span>
                </h1>

                <p className="mt-3 text-white/60 text-[clamp(14px,1.05vw,17px)] leading-relaxed">
                  {forgotMode
                    ? "Enter your email and we’ll send you a reset link."
                    : "Log in to manage your access and account settings."}
                </p>

                <div className="mt-7 flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => navigate("/pricing")}
                    className="text-white/60 hover:text-white transition"
                  >
                    View pricing →
                  </button>
                  <span className="text-white/15">•</span>
                  <button
                    type="button"
                    onClick={() => navigate("/support")}
                    className="text-white/60 hover:text-white transition"
                  >
                    Support →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div {...enter(10, 8, 0.06)} className="lg:col-span-6">
              <div className="rounded-[26px] p-[1px] bg-gradient-to-b from-white/12 via-white/8 to-emerald-500/10">
                <div className="relative rounded-[26px] border border-white/10 bg-[#070707]/78 backdrop-blur-2xl p-7 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-white/65">
                        {forgotMode ? "Password reset" : "Welcome back"}
                      </div>
                      <div className="mt-1 text-xl font-semibold text-white/90">
                        {forgotMode ? "Get reset link" : "Login"}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/pricing")}
                      className="px-4 py-2 rounded-2xl text-[13px] font-semibold text-white/70 bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/10"
                    >
                      Pricing
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {/* Email */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
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

                    {/* Password */}
                    {!forgotMode && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                          <Lock className="w-4 h-4 text-emerald-300" />
                        </span>
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                        />
                      </div>
                    )}

                    {/* Alerts */}
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

                    {/* CTA */}
                    {forgotMode ? (
                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={loading || !email}
                        onClick={handleForgotPassword}
                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-2xl transition border border-emerald-300/25 bg-emerald-400/90 hover:bg-emerald-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.16)] disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Send reset link"}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={loading || !email || !password}
                        onClick={handleLogin}
                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-2xl transition border border-emerald-300/25 bg-emerald-400/90 hover:bg-emerald-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.16)] disabled:opacity-60"
                      >
                        {loading ? "Logging in..." : "Login"}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    )}

                    {/* Footer links */}
                    {!forgotMode ? (
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <button
                          type="button"
                          onClick={() => setForgotMode(true)}
                          className="text-white/55 hover:text-white transition"
                        >
                          Forgot password?
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate("/support")}
                          className="text-emerald-300 hover:text-emerald-200 transition font-semibold"
                        >
                          Need help? →
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setForgotMode(false)}
                        className="mt-2 w-full text-center text-sm text-white/55 hover:text-white transition"
                      >
                        ← Back to login
                      </button>
                    )}

                    <div className="mt-4 text-xs text-white/40 text-center">
                      Secure auth by Supabase • Payments handled by Stripe
                    </div>
                  </div>

                  <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/8 to-transparent blur-3xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
