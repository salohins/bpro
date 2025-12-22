import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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

export default function Success() {
  const called = useRef(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [emailFromServer, setEmailFromServer] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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
          setInfo("✅ We emailed you a login link as well (check spam just in case).");
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
        // backend should return it; if it doesn't, you can still show "set password ok, use magic link"
        setInfo("✅ Password set. Check your email for the login link.");
        return;
      }

      setEmailFromServer(email);

      // Step B: login with email+password
      const { error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginErr) throw loginErr;

      // Step C: go to dashboard/settings
      navigate("/profile");
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Processing your payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl px-6 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">🎉 Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your account has been created. Set a password now to log in instantly.
        </p>

        {info && <p className="text-sm text-gray-700 mb-4">{info}</p>}

        <div className="space-y-3 text-left">
          <label className="block text-sm text-gray-600">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="At least 6 characters"
          />

          <label className="block text-sm text-gray-600">Confirm password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Repeat password"
          />

          <button
            onClick={handleSetPasswordAndLogin}
            disabled={busy}
            className="w-full bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {busy ? "Setting up..." : "Set Password & Log In →"}
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Prefer email login? Use the magic link we sent you.
          </p>
        </div>
      </div>
    </div>
  );
}
