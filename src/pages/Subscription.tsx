import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Subscription() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("profiles")
                .select("email, stripe_customer_id")
                .eq("id", user.id)
                .maybeSingle();

            if (error) setError(error.message);
            else setProfile(data);
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const openBillingPortal = async () => {
        try {
            setError("");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/create-billing-portal`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: profile.email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            window.location.href = data.url; // Redirect to Stripe billing portal
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading)
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

    if (error)
        return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-4">Your Subscription</h1>
            <p className="text-gray-600 mb-8">
                Manage your payment method, invoices, and cancel anytime.
            </p>

            <button
                onClick={openBillingPortal}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
                Open Billing Portal
            </button>
        </div>
    );
}
