import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type QueueRow = {
  id: string;
  user_id: string;
  email: string;
  tradingview_name: string | null;
  status: "pending" | "confirmed" | "missing";
  created_at: string;
};

export default function AdminOnboarding() {
  const [rows, setRows] = useState<QueueRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_onboarding_queue")
        .select("id, user_id, email, tradingview_name, status, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRows((data || []) as QueueRow[]);
    } catch (e: any) {
      setError(e.message || "Failed to load admin onboarding queue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pendingCount = useMemo(
    () => rows.filter((r) => r.status === "pending").length,
    [rows]
  );

  const review = async (queue_id: string, action: "confirmed" | "missing") => {
    try {
      setBusyId(queue_id);
      setError("");

      // ✅ recommended: call your admin-only edge function
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin-review-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queue_id, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      // refresh list
      await load();
    } catch (e: any) {
      setError(e.message || "Failed to update");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>;
  }

  return (
    <div className="min-h-screen p-8 text-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Onboarding</h1>
            <p className="text-gray-400 mt-1">
              Pending reviews: <span className="text-emerald-400 font-semibold">{pendingCount}</span>
            </p>
          </div>
          <button
            onClick={load}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">TradingView</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Created</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.tradingview_name || <span className="text-gray-500">—</span>}</td>
                  <td className="p-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="p-4 text-gray-400">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => review(r.id, "confirmed")}
                        disabled={busyId === r.id}
                        className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition disabled:opacity-50"
                      >
                        ✅ Confirm
                      </button>
                      <button
                        onClick={() => review(r.id, "missing")}
                        disabled={busyId === r.id}
                        className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition disabled:opacity-50"
                      >
                        ❌ Missing
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={5}>
                    No users in the onboarding queue yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Tip: Confirming updates both the admin queue and the user profile status.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "confirmed" | "missing" }) {
  const cls =
    status === "confirmed"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20"
      : status === "missing"
      ? "bg-red-500/15 text-red-300 border-red-500/20"
      : "bg-yellow-500/15 text-yellow-300 border-yellow-500/20";

  return (
    <span className={`inline-flex px-2 py-1 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}
