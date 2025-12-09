import { useEffect, useState, useRef } from "react";

export default function Success() {
    const called = useRef(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [loginUrl, setLoginUrl] = useState<string | null>(null);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const handleSuccess = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const session_id = params.get("session_id");

                if (!session_id) {
                    setError("Missing session_id");
                    setLoading(false);
                    return;
                }

                // Call backend to create/find user and get magic link
                const res = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session_id }),
                });

                const data = await res.json();
                console.log("Edge Function Response:", data);

                if (!res.ok) {
                    setError(data.error || "Failed to create user");
                } else if (data.loginUrl) {
                    // Store magic link for button click
                    setLoginUrl(data.loginUrl);
                } else {
                    setError("Login URL missing. Contact support.");
                }
            } catch (err) {
                console.error(err);
                setError("Unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        handleSuccess();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Processing your payment...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
            <p className="text-lg mb-8 text-gray-700">
                Thank you for your purchase. Your account has been created successfully.
            </p>

            {loginUrl ? (
                <button
                    onClick={() => (window.location.href = loginUrl)}
                    className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
                >
                    Go to Your Account →
                </button>
            ) : (
                <p className="text-gray-500">Preparing your account...</p>
            )}
        </div>
    );
}
