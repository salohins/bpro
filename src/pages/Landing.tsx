import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubscribeClick = () => {
        navigate("/subscribe")
        setError("");
    };

    const handleContinue = async () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // 1️⃣ Check if email already exists
            const verify = await fetch(`${import.meta.env.VITE_API_URL}/verify-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const verifyRes = await verify.json();

            if (!verify.ok) {
                setError(verifyRes.error || "Verification failed");
                setLoading(false);
                return;
            }

            if (verifyRes.exists) {
                setError("This email already has an account. Please log in instead.");
                setLoading(false);
                return;
            }

            // 2️⃣ Create checkout session
            const checkout = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    price_id: import.meta.env.VITE_STRIPE_PRICE_ID,
                    email,
                }),
            });

            const data = await checkout.json();

            if (!checkout.ok || !data.url) {
                setError(data.error || "Failed to start checkout");
                setLoading(false);
                return;
            }

            // ✅ Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            <h1 className="text-4xl font-bold mb-6">Subscription App</h1>

            <button
                onClick={handleSubscribeClick}
                className="px-8 py-4 bg-black text-white rounded text-lg hover:bg-gray-800 transition"
            >
                Subscribe
            </button>
        </div>
    );
}
