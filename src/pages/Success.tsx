import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Lock, CheckCircle2, ArrowRight, Info } from "lucide-react";

type CreateUserResponse = {
  success?: boolean;
  user_id?: string;
  emailSent?: boolean;
  rateLimited?: boolean;
  otpError?: string | null;
  redirectTo?: string;
  error?: string;
};

type SetPasswordResponse = {
  success?: boolean;
  email?: string;
  user_id?: string;
  error?: string;
};

const easePremium: any = [0.16, 1, 0.3, 1];

export default function Success() {
  const called = useRef(false);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [emailFromServer, setEmailFromServer] = useState<string>(""); // fallback if server doesn't return it
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const enter = (x = 0, y = 18, d = 0) => ({
    initial: { opacity: 0, x, y, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.01 }
      : { duration: 0.7, delay: d, ease: easePremium },
  });

  // 1) call create-user once
  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const run = async () => {
      try {
        setError("");
        setInfo("");

        const params = new URLSearchParams(window.location.search);
        const session_id = params.get("session_id");
        if (!session_id) {
          setError("Missing session_id");
          return;
        }
        setSessionId(session_id);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id }),
        });

        const data: CreateUserResponse = await res.json();
        console.log("create-user response:", data);

        if (!res.ok || !data.success) {
          setError(data.error || "Failed to create user");
          return;
        }

        // Messaging for magic-link email
        if (data.emailSent) {
          setInfo("✅ We also emailed you a login link (check spam just in case).");
        } else if (data.rateLimited) {
          setInfo("⚠️ Login email was sent recently. Please wait ~60 seconds before resending.");
        } else if (data.otpError) {
          setInfo(`⚠️ Could not send login email: ${data.otpError}`);
        } else {
          setInfo("✅ Account created.");
        }
      } catch (e) {
        console.error(e);
        setError("Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  // 2) set password + login
  const handleSetPasswordAndLogin = async () => {
    try {
      setError("");
      setInfo("");

      if (!sessionId) throw new Error("Missing session_id");
      if (password.length < 6) throw new Error("Password must be at least 6 characters");
      if (password !== confirm) throw new Error("Passwords do not match");

      setBusy(true);

      // Step A: tell backend to set password (securely via session_id)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, password }),
      });

      const data: SetPasswordResponse = await res.json();
      console.log("set-password response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to set password");
      }

      const email = data.email || emailFromServer;
      if (!email) {
        setInfo("✅ Password set. Check your email for the login link.");
        return;
      }

      setEmailFromServer(email);

      // Step B: login with email+password
      const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
      if (loginErr) throw loginErr;

      // Step C: go to settings
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] overflow-hidden text-white">
      {/* Ambient background (matches site vibe) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 right-0 h-40 bg-gradient-to-b from-black/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_28%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(255,255,255,0.04),transparent_62%)]" />
        <div className="absolute -bottom-24 left-0 right-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      <div className="relative z-10 min-h-[calc(100vh-76px)] flex items-center">
        <div className="w-full mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 2xl:px-20 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: confirmation + instructions */}
            <motion.div {...enter(-10, 8, 0)} className="lg:col-span-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs tracking-[0.22em] font-semibold uppercase text-white/80">
                    Payment complete
                  </span>
                </div>

                <h1 className="mt-5 font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(28px,3vw,44px)]">
                  <span className="text-white/95">You’re in</span>
                  <span className="text-emerald-300">.</span>
                </h1>

                <p className="mt-3 text-white/60 text-[clamp(14px,1.05vw,17px)] leading-relaxed">
                  Your account is created. Set a password now to log in instantly — or use the magic link in your email.
                </p>

                {/* ✅ instruction block */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Info className="w-4 h-4 text-emerald-300" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white/85">Best TradingView experience</div>
                      <ol className="mt-2 space-y-1 text-[13px] text-white/60 leading-relaxed list-decimal pl-5">
                        <li>Open the indicator.</li>
                        <li>Go to <span className="text-white/75 font-medium">Settings → Style</span>.</li>
                        <li>Scroll to the bottom.</li>
                        <li>
                          Uncheck <span className="text-white/75 font-medium">“Filters in status line”</span>.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                {info && (
                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    {info}
                  </div>
                )}

                <div className="mt-7 flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => navigate("/support")}
                    className="text-white/60 hover:text-white transition"
                  >
                    Support →
                  </button>
                  <span className="text-white/15">•</span>
                  <button
                    type="button"
                    onClick={() => navigate("/faq")}
                    className="text-white/60 hover:text-white transition"
                  >
                    FAQ →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: password set card */}
            <motion.div {...enter(10, 8, 0.06)} className="lg:col-span-6">
              {/* Loading / Error states inside the premium card */}
              <div className="rounded-[26px] p-[1px] bg-gradient-to-b from-white/12 via-white/8 to-emerald-500/10">
                <div className="relative rounded-[26px] border border-white/10 bg-[#070707]/78 backdrop-blur-2xl p-7 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-white/65">
                        {loading ? "Processing payment" : error ? "Something went wrong" : "Account ready"}
                      </div>
                      <div className="mt-1 text-xl font-semibold text-white/90">
                        {loading ? "Finalizing…" : error ? "Error" : "Set password"}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/70 bg-white/[0.03] border border-white/10 px-3 py-2 rounded-2xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      Secure
                    </span>
                  </div>

                  {/* states */}
                  {loading ? (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white/70">
                      Processing your payment… please don’t close this page.
                    </div>
                  ) : error ? (
                    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                      {error}
                    </div>
                  ) : (
                    <div className="mt-6 space-y-3">
                      {/* Password */}
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                          <Lock className="w-4 h-4 text-emerald-300" />
                        </span>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                          placeholder="New password (min 6 chars)"
                        />
                      </div>

                      {/* Confirm */}
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                          <Lock className="w-4 h-4 text-emerald-300" />
                        </span>
                        <input
                          type="password"
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          className="w-full bg-transparent text-white/90 placeholder:text-white/35 outline-none text-sm"
                          placeholder="Confirm password"
                        />
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={reduceMotion ? {} : { scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        disabled={busy || !password || !confirm}
                        onClick={handleSetPasswordAndLogin}
                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-2xl transition border border-emerald-300/25 bg-emerald-400/90 hover:bg-emerald-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.16)] disabled:opacity-60"
                      >
                        {busy ? "Setting up..." : "Set Password & Log In"}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>

                      <div className="mt-3 text-xs text-white/45 text-center">
                        Prefer email login? Use the magic link we sent you.
                      </div>

                      {info && (
                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70">
                          {info}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/8 to-transparent blur-3xl" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-xs text-white/35 text-center">
            Secure auth by Supabase • Payments handled by Stripe
          </div>
        </div>
      </div>
    </section>
  );
}
