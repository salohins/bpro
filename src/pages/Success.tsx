import { useEffect, useState, useRef } from "react";

export default function Success() {
    const called = useRef(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const handleSuccess = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const session_id = params.get("session_id");

                if (!session_id) {
                    setError("Missing session_id");
                    return;
                }

                // Call the backend to create/find the user and get Magic Link
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/create-user`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ session_id })
                    }
                );

                const data = await res.json();
                console.log("Edge Function Response:", data);

                if (!res.ok) {
                    setError(data.error || "Failed to create user");
                    return;
                }

                // 🚀 Redirect user to auto-login Magic Link
                if (data.loginUrl) {
                    window.location.href = data.loginUrl;
                    return;
                }

                setError("Login URL missing. Contact support.");

            } catch (err) {
                console.error(err);
                setError("Unexpected error occurred.");
            }
        };

        handleSuccess();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center text-xl">
            Finalizing your account…
        </div>
    );
}
