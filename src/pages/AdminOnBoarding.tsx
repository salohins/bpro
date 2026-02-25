import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type TvStatus = "pending" | "confirmed" | "missing";

type ProfileRow = {
  id: string;
  email: string | null;
  tradingview_name: string | null;
  tradingview_username_status: TvStatus;
  tradingview_username_reviewed_at: string | null;
  created_at: string | null;
};

function formatDate(d: string | null | undefined) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString(undefined, {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

export default function AdminOnboarding() {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setError("");
    setLoading(true);

    try {
      const attempt = await supabase
        .from("profiles")
        .select(
          "id, email, tradingview_name, tradingview_username_status, tradingview_username_reviewed_at, created_at"
        )
        .order("created_at", { ascending: false });

      if (attempt.error) {
        const fallback = await supabase
          .from("profiles")
          .select("id, email, tradingview_name, created_at")
          .order("created_at", { ascending: false });

        if (fallback.error) throw fallback.error;

        const mapped = (fallback.data || []).map((p: any) => ({
          id: String(p.id),
          email: p.email ?? null,
          tradingview_name: p.tradingview_name ?? null,
          tradingview_username_status: "pending" as TvStatus,
          tradingview_username_reviewed_at: null,
          created_at: p.created_at ?? null,
        }));

        setRows(mapped);
      } else {
        const mapped = (attempt.data || []).map((p: any) => ({
          id: String(p.id),
          email: p.email ?? null,
          tradingview_name: p.tradingview_name ?? null,
          tradingview_username_status: (p.tradingview_username_status ?? "pending") as TvStatus,
          tradingview_username_reviewed_at: p.tradingview_username_reviewed_at ?? null,
          created_at: p.created_at ?? null,
        }));

        setRows(mapped);
      }
    } catch (e: any) {
      setError(e.message || "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pendingRows = useMemo(
    () => rows.filter((r) => (r.tradingview_username_status ?? "pending") === "pending"),
    [rows]
  );

  const pendingCount = useMemo(() => pendingRows.length, [pendingRows]);

  const review = async (profile_id: string, action: "confirmed" | "missing") => {
    try {
      setBusyId(profile_id);
      setError("");

      const { data: sessionData, error: sessErr } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (sessErr) throw new Error(sessErr.message);
      if (!token) throw new Error("You are not logged in (missing access token). Please sign in again.");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin-review-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profile_id, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      // ✅ Optimistic UI update (keeps table snappy + no focus weirdness elsewhere)
      const now = new Date().toISOString();
      setRows((prev) =>
        prev.map((r) =>
          r.id === profile_id
            ? {
              ...r,
              tradingview_username_status: action,
              tradingview_username_reviewed_at: now,
            }
            : r
        )
      );
    } catch (e: any) {
      setError(e.message || "Failed to update");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Onboarding</h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Pending reviews: <span className="text-emerald-400 font-semibold">{pendingCount}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={load}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 transition border border-white/10"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
            <div className="h-4 w-40 bg-white/10 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {/* ✅ Mobile: Cards */}
            <div className="md:hidden space-y-3">
              {pendingRows.map((r) => {
                const busy = busyId === r.id;

                return (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/10 bg-[#0f0f0f]/80 backdrop-blur p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="font-medium truncate">{r.email || "—"}</div>
                      </div>

                      <StatusBadge status={r.tradingview_username_status} />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">TradingView</div>
                        <div className="text-sm truncate">
                          {r.tradingview_name ? r.tradingview_name : <span className="text-gray-500">—</span>}
                        </div>

                        {r.tradingview_username_reviewed_at ? (
                          <div className="text-xs text-gray-500 mt-1">
                            Reviewed: {formatDate(r.tradingview_username_reviewed_at)}
                          </div>
                        ) : null}
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">Created</div>
                        <div className="text-sm text-gray-300">{formatDate(r.created_at)}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => review(r.id, "confirmed")}
                        disabled={busy}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/22 active:bg-emerald-500/28 transition disabled:opacity-50 border border-emerald-500/20"
                      >
                        ✅ Confirm
                      </button>
                      <button
                        onClick={() => review(r.id, "missing")}
                        disabled={busy}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/22 active:bg-red-500/28 transition disabled:opacity-50 border border-red-500/20"
                      >
                        ❌ Missing
                      </button>
                    </div>

                    {busy && <div className="mt-3 text-xs text-gray-400">Updating…</div>}
                  </div>
                );
              })}

              {pendingRows.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 text-center text-gray-500">
                  No pending TradingView username reviews.
                </div>
              )}
            </div>

            {/* ✅ Desktop: Table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]">
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
                  {pendingRows.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4">{r.email || "—"}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span>{r.tradingview_name || <span className="text-gray-500">—</span>}</span>
                          {r.tradingview_username_reviewed_at ? (
                            <span className="text-xs text-gray-500 mt-1">
                              Reviewed: {formatDate(r.tradingview_username_reviewed_at)}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={r.tradingview_username_status} />
                      </td>
                      <td className="p-4 text-gray-400">{formatDate(r.created_at)}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => review(r.id, "confirmed")}
                            disabled={busyId === r.id}
                            className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 transition disabled:opacity-50"
                          >
                            ✅ Confirm
                          </button>
                          <button
                            onClick={() => review(r.id, "missing")}
                            disabled={busyId === r.id}
                            className="px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition disabled:opacity-50"
                          >
                            ❌ Missing
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {pendingRows.length === 0 && (
                    <tr>
                      <td className="p-6 text-center text-gray-500" colSpan={5}>
                        No pending TradingView username reviews.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Tip: Confirming updates the user’s profile status (source of truth).
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TvStatus }) {
  const ui =
    status === "confirmed"
      ? {
        label: "Confirmed",
        cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
        dot: "bg-emerald-400",
      }
      : status === "missing"
        ? {
          label: "Username not found",
          cls: "bg-red-500/15 text-red-300 border-red-500/20",
          dot: "bg-red-400",
        }
        : {
          label: "Pending",
          cls: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
          dot: "bg-yellow-300",
        };

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${ui.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ui.dot}`} />
      {ui.label}
    </span>
  );
}
