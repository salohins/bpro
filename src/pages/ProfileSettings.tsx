import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
    const [profile, setProfile] = useState<any>(null);
    const [tradingview, setTradingview] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    navigate("/");
                    return;
                }

                const { data, error } = await supabase
                    .from("profiles")
                    .select("email, tradingview_name, created_at")
                    .eq("id", user.id)
                    .maybeSingle();

                if (error) throw error;
                setProfile(data);
                setTradingview(data?.tradingview_name || "");
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            setSaving(true);
            setError("");
            setMessage("");

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not logged in");

            const { error } = await supabase
                .from("profiles")
                .update({ tradingview_name: tradingview })
                .eq("id", user.id);

            if (error) throw error;
            setMessage("Profile updated successfully ✅");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        try {
            setError("");
            setMessage("");

            if (newPassword !== confirmPassword)
                throw new Error("Passwords do not match");
            if (newPassword.length < 6)
                throw new Error("Password must be at least 6 characters");

            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;

            setMessage("Password updated successfully ✅");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const handleLogoutEverywhere = async () => {
        try {
            setError("");
            setMessage("Logging out from all devices…");

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not logged in");

            const res = await fetch(`${import.meta.env.VITE_API_URL}/logout-all`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setMessage("Logged out from all devices ✅");
            await supabase.auth.signOut();
            window.location.href = "/";
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-400 bg-[#0f0f0f]">
                Loading…
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-gray-200 px-4 py-16">
            <div className="max-w-3xl mx-auto bg-[#141414]/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-800 px-8 py-6 bg-[#111]">
                    <h1 className="text-3xl font-semibold text-white">Profile Settings</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Manage your account, security, and sessions
                    </p>
                </div>

                {/* Body */}
                <div className="p-8 space-y-10">
                    {/* Account Info */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4 text-white/90">Account Info</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Email</label>
                                <input
                                    value={profile?.email || ""}
                                    disabled
                                    className="w-full border border-gray-700 bg-[#1e1e1e] text-gray-400 rounded-lg px-4 py-2 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">
                                    TradingView Username
                                </label>
                                <input
                                    value={tradingview}
                                    onChange={(e) => setTradingview(e.target.value)}
                                    placeholder="Enter your TradingView username"
                                    className="w-full border border-gray-700 bg-[#1e1e1e] text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-white/20 outline-none transition"
                                />
                            </div>

                            <button
                                onClick={handleUpdateProfile}
                                disabled={saving}
                                className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition font-medium"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </section>

                    <div className="border-t border-gray-800" />

                    {/* Security */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4 text-white/90">Security</h2>
                        <div className="space-y-3">
                            <label className="block text-gray-400 text-sm mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="w-full border border-gray-700 bg-[#1e1e1e] text-gray-100 rounded-lg px-4 py-2"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full border border-gray-700 bg-[#1e1e1e] text-gray-100 rounded-lg px-4 py-2 mb-2"
                            />

                            <button
                                onClick={handleChangePassword}
                                className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition font-medium"
                            >
                                Change Password
                            </button>
                        </div>
                    </section>

                    <div className="border-t border-gray-800" />

                    {/* Sessions */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4 text-white/90">Sessions</h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-[#272727] hover:bg-[#333] text-gray-200 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleLogoutEverywhere}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                            >
                                Logout Everywhere
                            </button>
                        </div>
                    </section>

                    {/* Feedback */}
                    {(message || error) && (
                        <div className="mt-4 text-center">
                            {message && <p className="text-green-400 text-sm">{message}</p>}
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
