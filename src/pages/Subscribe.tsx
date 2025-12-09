import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Subscribe() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [tradingview, setTradingview] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [existing, setExisting] = useState(false);

    const handleContinue = async () => {
        setError("");
        setLoading(true);
        setExisting(false);

        try {
            const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error);

            if (verifyData.exists) {
                setExisting(true);
                setError("This email already has an account.");
                setLoading(false);
                return;
            }

            const checkoutRes = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    price_id: import.meta.env.VITE_STRIPE_PRICE_ID,
                    email,
                    tradingview_name: tradingview,
                }),
            });

            const data = await checkoutRes.json();
            if (!checkoutRes.ok) throw new Error(data.error);
            window.location.href = data.url;
        } catch (err: any) {
            console.error("Subscribe error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => navigate("/");

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center text-gray-100 px-4">
            <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-xl p-8 border border-gray-800">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Subscribe to Premium</h1>
                    <p className="text-gray-400 mt-2">
                        Unlock full access for <b className="text-white">CHF 19.99/month</b>
                    </p>
                </div>

                <div className="border border-gray-700 rounded-xl p-4 mb-6 bg-[#121212]">
                    <h2 className="font-semibold text-gray-200 text-lg mb-2">Your Plan Includes:</h2>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li>✔ Full access to premium signals</li>
                        <li>✔ Real-time TradingView alerts</li>
                        <li>✔ Instant setup after payment</li>
                        <li>✔ Cancel anytime</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition"
                    />

                    <input
                        type="text"
                        placeholder="TradingView username (optional)"
                        value={tradingview}
                        onChange={(e) => setTradingview(e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-gray-400 outline-none transition"
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    {existing ? (
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                        >
                            Log In Instead →
                        </button>
                    ) : (
                        <button
                            disabled={loading || !email}
                            onClick={handleContinue}
                            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Continue to Payment →"}
                        </button>
                    )}

                    <button
                        onClick={() => navigate("/")}
                        className="w-full text-gray-400 text-sm mt-2 hover:text-gray-200 transition"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>

            <p className="text-gray-500 text-xs mt-6">
                Secure checkout powered by Stripe
            </p>
        </div>
    );
}
