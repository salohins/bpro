import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // 1) Sign in
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) throw signInErr;

      // 2) Get authed user
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr) throw userErr;
      if (!user) throw new Error("Login failed (no user session).");

      // 3) Check admin flag
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .maybeSingle();

      // If the profile table is RLS-protected wrong, you'll see an error here.
      if (profileErr) throw profileErr;

      // 4) Redirect by role
      if (profile?.is_admin) {
        navigate("/admin");
      } else {
        navigate("/"); // or navigate("/")
      }
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
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
    <div className="h-[calc(100vh-64px)] flex items-center justify-center text-gray-100 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          {forgotMode ? "Reset Password" : "Welcome Back"}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition"
          />

          {!forgotMode && (
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition"
            />
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          {forgotMode ? (
            <button
              disabled={loading || !email}
              onClick={handleForgotPassword}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link →"}
            </button>
          ) : (
            <button
              disabled={loading || !email || !password}
              onClick={handleLogin}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          )}

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            {!forgotMode ? (
              <>
                <button onClick={() => setForgotMode(true)} className="hover:text-gray-200 transition">
                  Forgot password?
                </button>
                <button onClick={() => navigate("/subscribe")} className="hover:text-gray-200 transition">
                  Create account
                </button>
              </>
            ) : (
              <button
                onClick={() => setForgotMode(false)}
                className="text-gray-400 hover:text-gray-200 transition w-full text-center"
              >
                ← Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
