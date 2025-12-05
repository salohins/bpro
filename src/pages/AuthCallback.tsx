import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
    useEffect(() => {
        const run = async () => {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);

            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");

            console.log("Parsed tokens:", { access_token, refresh_token });

            if (!access_token || !refresh_token) {
                console.error("Missing tokens");
                return;
            }

            const { error } = await supabase.auth.setSession({
                access_token,
                refresh_token,
            });

            if (error) {
                console.error("setSession error:", error);
                return;
            }

            console.log("Session saved → redirecting to dashboard");
            window.location.replace("/dashboard");
        };

        run();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center">
            Finishing login…
        </div>
    );
}
