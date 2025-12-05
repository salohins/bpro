import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase.auth.getUser();

            if (!data.user) {
                // ⛔ Don't instantly redirect — let the router handle it
                window.location.href = "/";
                return;
            }

            setEmail(data.user.email ?? "");
            setLoading(false);
        };

        load();
    }, []);

    const updatePassword = async () => {
        if (!password.trim()) {
            alert("Password cannot be empty.");
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            alert("Error: " + error.message);
            return;
        }

        alert("Password updated successfully!");
        setPassword("");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Loading your account...
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Account Dashboard</h1>

            <p className="text-lg mb-6">
                Logged in as: <strong>{email}</strong>
            </p>

            <div className="space-y-4">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded w-full text-lg"
                />

                <button
                    onClick={updatePassword}
                    className="w-full bg-black text-white p-3 rounded text-lg"
                >
                    Save Password
                </button>
            </div>
        </div>
    );
}
