import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useSession } from "../hooks/useSession";
import { User, CreditCard, LogOut } from "lucide-react";

export default function TopBar() {
    const { user } = useSession();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const openBillingPortal = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!user?.email) {
                setError("No email found for current user.");
                return;
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/create-billing-portal`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create portal session.");

            window.location.href = data.url;
        } catch (err: any) {
            console.error("Billing portal error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-[#0f0f0f]/90 backdrop-blur-lg border-b border-white/10 z-50 font-inter">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">
                {/* Logo / Brand */}
                <button
                    onClick={() => navigate("/")}
                    className="text-3xl font-bold text-white tracking-tight hover:text-gray-200 transition-all duration-200"
                >
                    b<span className="text-gray-400">Pro</span>
                </button>

                {/* Auth Section */}
                {!user ? (
                    <button
                        onClick={() => navigate("/login")}
                        className="relative inline-flex items-center justify-center px-6 py-2.5 
                       rounded-lg font-semibold text-sm tracking-wide text-white
                       bg-gradient-to-r from-gray-100/10 to-white/5
                       border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]
                       transition-all duration-300
                       hover:from-[#00b4d8]/30 hover:to-[#0077b6]/40 hover:border-[#00b4d8]/50
                       hover:shadow-[0_0_20px_rgba(0,180,216,0.3)] 
                       active:scale-[0.97]"
                    >
                        <span className="relative z-10">Login</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00b4d8]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 text-gray-200 hover:text-white transition-all duration-200"
                        >
                            <div className="w-10 h-10 bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-base font-medium text-white">
                                {user.email[0].toUpperCase()}
                            </div>
                            <span className="text-base font-medium">{user.email}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {open && (
                            <div
                                className="absolute right-0 mt-3 w-60 bg-[#141414]/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl overflow-hidden animate-fade-in"
                                onMouseLeave={() => setOpen(false)}
                            >
                                <button
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-gray-200 text-sm transition-all duration-150"
                                    onClick={() => navigate("/profile")}
                                >
                                    <User className="w-4 h-4 text-gray-400" />
                                    Profile Settings
                                </button>

                                <button
                                    disabled={loading}
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-gray-200 text-sm transition-all duration-150 disabled:opacity-50"
                                    onClick={openBillingPortal}
                                >
                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                    {loading ? "Opening Portal..." : "Manage Subscription"}
                                </button>

                                <button
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-600/10 text-red-400 text-sm transition-all duration-150"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-600/10 border-t border-red-700 text-red-400 text-center text-sm py-2 font-medium">
                    {error}
                </div>
            )}
        </header>
    );
}
