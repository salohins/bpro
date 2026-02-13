import { useEffect } from "react";
import { supabase } from "../lib/supabase";

function parseHashParams() {
  const hash = window.location.hash?.startsWith("#")
    ? window.location.hash.slice(1)
    : "";
  return new URLSearchParams(hash);
}

function getRecoverySignals() {
  const hashParams = parseHashParams();
  const queryParams = new URLSearchParams(window.location.search);

  const type = (hashParams.get("type") || queryParams.get("type") || "").toLowerCase();
  const redirect_to =
    (hashParams.get("redirect_to") || queryParams.get("redirect_to") || "").toLowerCase();

  const intent = (localStorage.getItem("auth:intent") || "").toLowerCase();

  const looksLikeReset =
    type.includes("recovery") ||
    type.includes("reset") ||
    redirect_to.includes("/reset-password") ||
    window.location.pathname.includes("/reset-password") ||
    intent === "reset-password";

  return { looksLikeReset, type, redirect_to, intent };
}

export default function AuthCallback() {
  useEffect(() => {
    const run = async () => {
      console.log("AuthCallback URL:", window.location.href);

      const hashParams = parseHashParams();
      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");

      const { looksLikeReset, type, redirect_to, intent } = getRecoverySignals();
      console.log("AuthCallback signals:", { looksLikeReset, type, redirect_to, intent });

      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
        } else {
          console.error("AuthCallback: no code and no tokens found.");
          window.location.replace("/login");
          return;
        }

        // ✅ clear intent once session is established
        localStorage.removeItem("auth:intent");

        // ✅ route based on intent/signals
        window.location.replace(looksLikeReset ? "/reset-password" : "/profile");
      } catch (e: any) {
        console.error("AuthCallback error:", e);
        localStorage.removeItem("auth:intent");
        window.location.replace("/login");
      }
    };

    run();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      Finishing login…
    </div>
  );
}
