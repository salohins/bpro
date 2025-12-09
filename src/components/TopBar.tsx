import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useSession } from "../hooks/useSession";
import { User, CreditCard, LogOut, ChevronDown } from "lucide-react";

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
        <header className="fixed top-0 left-0 w-full bg-[#0f0f0f]/85 backdrop-blur-md border-b border-white/10 z-50 font-inter">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-5">
                {/* Logo / Brand */}
                <button
                    onClick={() => navigate("/")}
                    className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:opacity-90 transition-all duration-300"
                >
                    bPro
                </button>

                {/* Auth Section */}
                {!user ? (
                    <button
                        onClick={() => navigate("/login")}
                        className="btn btn-primary text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 text-gray-200 hover:text-white transition-all duration-200"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-full flex items-center justify-center text-base font-medium text-white shadow-inner shadow-black/30">
                                {user.email[0].toUpperCase()}
                            </div>
                            <span className="text-sm md:text-base font-medium">{user.email}</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {open && (
                            <div
                                className="absolute right-0 mt-3 w-60 bg-[#141414]/95 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] rounded-xl overflow-hidden animate-fade-in"
                                onMouseLeave={() => setOpen(false)}
                            >
                                <button
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-gray-200 text-sm transition-all duration-150"
                                    onClick={() => navigate("/profile")}
                                >
                                    <User className="w-4 h-4 text-emerald-400" />
                                    Profile Settings
                                </button>

                                <button
                                    disabled={loading}
                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-gray-200 text-sm transition-all duration-150 disabled:opacity-50"
                                    onClick={openBillingPortal}
                                >
                                    <CreditCard className="w-4 h-4 text-emerald-400" />
                                    {loading ? "Opening Portal..." : "Manage Subscription"}
                                </button>

                                <div className="separator" />

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
