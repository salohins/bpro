import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type TvStatus = "pending" | "confirmed" | "missing";
type ViewFilter = "pending" | "reviewed" | "all";

type SubscriptionRow = {
  id: string;
  user_id: string | null;
  customer_id: string | null;
  status: string | null;
  price_id: string | null;
  current_period_end: string | null;
  trial_end: string | null;
  created_at: string | null;
};

type ProfileRow = {
  id: string;
  email: string | null;
  tradingview_name: string | null;
  tradingview_username_status: TvStatus;
  tradingview_username_reviewed_at: string | null;
  created_at: string | null;
  stripe_customer_id: string | null;

  subscription_id: string | null;
  subscription_status: string | null;
  payment_status: string | null;
  current_period_end: string | null;
  trial_end: string | null;
  indicator_access: boolean;
};

const ENTITLED_STATUSES = new Set(["active", "trialing"]);

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

function getPaymentStatus(subscriptionStatus: string | null | undefined) {
  switch (subscriptionStatus) {
    case "trialing":
      return "trial";
    case "active":
      return "paid";
    case "past_due":
      return "payment_failed";
    case "unpaid":
      return "unpaid";
    case "canceled":
      return "canceled";
    case "incomplete":
      return "incomplete";
    case "incomplete_expired":
      return "expired";
    default:
      return "none";
  }
}

function getAccessUntil(row: {
  subscription_status: string | null;
  current_period_end: string | null;
  trial_end: string | null;
}) {
  if (row.subscription_status === "trialing") {
    return row.trial_end ?? row.current_period_end ?? null;
  }
  return row.current_period_end ?? null;
}

function isReviewed(row: {
  tradingview_username_status: TvStatus;
  tradingview_username_reviewed_at: string | null;
}) {
  return (
    row.tradingview_username_status !== "pending" ||
    !!row.tradingview_username_reviewed_at
  );
}

function isIndicatorAccessAllowed(row: {
  tradingview_username_status: TvStatus;
  subscription_status: string | null;
  current_period_end: string | null;
  trial_end: string | null;
}) {
  if (row.tradingview_username_status !== "confirmed") return false;
  if (!row.subscription_status || !ENTITLED_STATUSES.has(row.subscription_status)) return false;

  const accessUntil = getAccessUntil(row);
  if (!accessUntil) return true;

  const accessTs = new Date(accessUntil).getTime();
  if (Number.isNaN(accessTs)) return true;

  return accessTs > Date.now();
}

function getStatusPriority(status: string | null | undefined) {
  switch (status) {
    case "active":
      return 7;
    case "trialing":
      return 6;
    case "past_due":
      return 5;
    case "unpaid":
      return 4;
    case "incomplete":
      return 3;
    case "incomplete_expired":
      return 2;
    case "canceled":
      return 1;
    default:
      return 0;
  }
}

function getSortTimestamp(sub: SubscriptionRow) {
  const raw = sub.trial_end ?? sub.current_period_end ?? sub.created_at;
  if (!raw) return 0;
  const ts = new Date(raw).getTime();
  return Number.isNaN(ts) ? 0 : ts;
}

function pickBestSubscription(subs: SubscriptionRow[]) {
  if (!subs.length) return null;

  return [...subs].sort((a, b) => {
    const statusDiff = getStatusPriority(b.status) - getStatusPriority(a.status);
    if (statusDiff !== 0) return statusDiff;

    return getSortTimestamp(b) - getSortTimestamp(a);
  })[0];
}

export default function AdminOnboarding() {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [viewFilter, setViewFilter] = useState<ViewFilter>("pending");

  const load = async () => {
    setError("");
    setLoading(true);

    try {
      const profilesAttempt = await supabase
        .from("profiles")
        .select(
          "id, email, tradingview_name, tradingview_username_status, tradingview_username_reviewed_at, created_at, stripe_customer_id"
        )
        .order("created_at", { ascending: false });

      let profilesData: any[] = [];

      if (profilesAttempt.error) {
        const profilesFallback = await supabase
          .from("profiles")
          .select("id, email, tradingview_name, created_at, stripe_customer_id")
          .order("created_at", { ascending: false });

        if (profilesFallback.error) throw profilesFallback.error;
        profilesData = profilesFallback.data || [];
      } else {
        profilesData = profilesAttempt.data || [];
      }

      const subscriptionsAttempt = await supabase
        .from("subscriptions")
        .select(
          "id, user_id, customer_id, status, price_id, current_period_end, trial_end, created_at"
        )
        .order("created_at", { ascending: false });

      let subscriptionsData: any[] = [];

      if (subscriptionsAttempt.error) {
        const subscriptionsFallback = await supabase
          .from("subscriptions")
          .select("id, user_id, customer_id, status, price_id, current_period_end, created_at")
          .order("created_at", { ascending: false });

        if (subscriptionsFallback.error) throw subscriptionsFallback.error;
        subscriptionsData = subscriptionsFallback.data || [];
      } else {
        subscriptionsData = subscriptionsAttempt.data || [];
      }

      const subscriptions: SubscriptionRow[] = subscriptionsData.map((s: any) => ({
        id: String(s.id),
        user_id: s.user_id ?? null,
        customer_id: s.customer_id ?? null,
        status: s.status ?? null,
        price_id: s.price_id ?? null,
        current_period_end: s.current_period_end ?? null,
        trial_end: s.trial_end ?? null,
        created_at: s.created_at ?? null,
      }));

      const subsByUserId = new Map<string, SubscriptionRow[]>();
      const subsByCustomerId = new Map<string, SubscriptionRow[]>();

      for (const sub of subscriptions) {
        if (sub.user_id) {
          const list = subsByUserId.get(sub.user_id) ?? [];
          list.push(sub);
          subsByUserId.set(sub.user_id, list);
        }

        if (sub.customer_id) {
          const list = subsByCustomerId.get(sub.customer_id) ?? [];
          list.push(sub);
          subsByCustomerId.set(sub.customer_id, list);
        }
      }

      const mapped: ProfileRow[] = profilesData.map((p: any) => {
        const userMatches = p.id ? subsByUserId.get(String(p.id)) ?? [] : [];
        const customerMatches = p.stripe_customer_id
          ? subsByCustomerId.get(String(p.stripe_customer_id)) ?? []
          : [];

        const mergedCandidates = [...userMatches, ...customerMatches];
        const uniqueCandidates = Array.from(
          new Map(mergedCandidates.map((sub) => [sub.id, sub])).values()
        );

        const bestSub = pickBestSubscription(uniqueCandidates);

        const subscriptionStatus = bestSub?.status ?? null;
        const currentPeriodEnd = bestSub?.current_period_end ?? null;
        const trialEnd = bestSub?.trial_end ?? null;

        const row: ProfileRow = {
          id: String(p.id),
          email: p.email ?? null,
          tradingview_name: p.tradingview_name ?? null,
          tradingview_username_status: (p.tradingview_username_status ?? "pending") as TvStatus,
          tradingview_username_reviewed_at: p.tradingview_username_reviewed_at ?? null,
          created_at: p.created_at ?? null,
          stripe_customer_id: p.stripe_customer_id ?? null,

          subscription_id: bestSub?.id ?? null,
          subscription_status: subscriptionStatus,
          payment_status: getPaymentStatus(subscriptionStatus),
          current_period_end: currentPeriodEnd,
          trial_end: trialEnd,
          indicator_access: isIndicatorAccessAllowed({
            tradingview_username_status: (p.tradingview_username_status ?? "pending") as TvStatus,
            subscription_status: subscriptionStatus,
            current_period_end: currentPeriodEnd,
            trial_end: trialEnd,
          }),
        };

        return row;
      });

      setRows(mapped);
    } catch (e: any) {
      setError(e.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pendingCount = useMemo(
    () => rows.filter((r) => !isReviewed(r)).length,
    [rows]
  );

  const reviewedCount = useMemo(
    () => rows.filter((r) => isReviewed(r)).length,
    [rows]
  );

  const activeAccessCount = useMemo(
    () => rows.filter((r) => r.indicator_access).length,
    [rows]
  );

  const filteredRows = useMemo(() => {
    if (viewFilter === "pending") {
      return rows.filter((r) => !isReviewed(r));
    }

    if (viewFilter === "reviewed") {
      return rows.filter((r) => isReviewed(r));
    }

    return rows;
  }, [rows, viewFilter]);

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

      const now = new Date().toISOString();

      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== profile_id) return r;

          const nextRow = {
            ...r,
            tradingview_username_status: action,
            tradingview_username_reviewed_at: now,
          };

          return {
            ...nextRow,
            indicator_access: isIndicatorAccessAllowed(nextRow),
          };
        })
      );
    } catch (e: any) {
      setError(e.message || "Failed to update");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Onboarding</h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Pending: <span className="text-yellow-300 font-semibold">{pendingCount}</span>
              <span className="text-gray-500"> · </span>
              Reviewed: <span className="text-emerald-400 font-semibold">{reviewedCount}</span>
              <span className="text-gray-500"> · </span>
              Total users: <span className="text-white font-semibold">{rows.length}</span>
              <span className="text-gray-500"> · </span>
              Indicator access: <span className="text-cyan-300 font-semibold">{activeAccessCount}</span>
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

        <div className="mb-5 flex flex-wrap gap-2">
          <FilterButton
            active={viewFilter === "pending"}
            onClick={() => setViewFilter("pending")}
            label={`Pending (${pendingCount})`}
          />
          <FilterButton
            active={viewFilter === "reviewed"}
            onClick={() => setViewFilter("reviewed")}
            label={`Reviewed (${reviewedCount})`}
          />
          <FilterButton
            active={viewFilter === "all"}
            onClick={() => setViewFilter("all")}
            label={`All (${rows.length})`}
          />
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
            <div className="md:hidden space-y-3">
              {filteredRows.map((r) => {
                const busy = busyId === r.id;
                const accessUntil = getAccessUntil(r);

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

                      <AccessBadge allowed={r.indicator_access} />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <ReviewBadge reviewed={isReviewed(r)} />
                      <StatusBadge status={r.tradingview_username_status} />
                      <SubscriptionBadge status={r.subscription_status} />
                      <PaymentBadge status={r.payment_status} />
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

                      <div>
                        <div className="text-xs text-gray-400">Access until</div>
                        <div className="text-sm text-gray-300">{formatDate(accessUntil)}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">Subscription</div>
                        <div className="text-sm text-gray-300">{r.subscription_status || "—"}</div>
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

              {filteredRows.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 text-center text-gray-500">
                  No users in this view.
                </div>
              )}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">TradingView</th>
                    <th className="text-left p-4">Reviewed</th>
                    <th className="text-left p-4">TV Status</th>
                    <th className="text-left p-4">Subscription</th>
                    <th className="text-left p-4">Payment</th>
                    <th className="text-left p-4">Access Until</th>
                    <th className="text-left p-4">Indicator Access</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((r) => {
                    const accessUntil = getAccessUntil(r);

                    return (
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
                          <ReviewBadge reviewed={isReviewed(r)} />
                        </td>

                        <td className="p-4">
                          <StatusBadge status={r.tradingview_username_status} />
                        </td>

                        <td className="p-4">
                          <SubscriptionBadge status={r.subscription_status} />
                        </td>

                        <td className="p-4">
                          <PaymentBadge status={r.payment_status} />
                        </td>

                        <td className="p-4 text-gray-300">{formatDate(accessUntil)}</td>

                        <td className="p-4">
                          <AccessBadge allowed={r.indicator_access} />
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
                    );
                  })}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td className="p-6 text-center text-gray-500" colSpan={10}>
                        No users in this view.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Reviewed = username already handled by admin. Indicator access is calculated from TradingView status + Stripe subscription state + access end date.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border transition ${
        active
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function ReviewBadge({ reviewed }: { reviewed: boolean }) {
  const ui = reviewed
    ? {
        label: "Reviewed",
        cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
        dot: "bg-emerald-400",
      }
    : {
        label: "Not reviewed",
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

function SubscriptionBadge({ status }: { status: string | null }) {
  const s = (status || "").toLowerCase();

  const ui =
    s === "active"
      ? {
          label: "Active",
          cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
          dot: "bg-cyan-400",
        }
      : s === "trialing"
      ? {
          label: "Trialing",
          cls: "bg-violet-500/15 text-violet-300 border-violet-500/20",
          dot: "bg-violet-400",
        }
      : s === "past_due"
      ? {
          label: "Past due",
          cls: "bg-orange-500/15 text-orange-300 border-orange-500/20",
          dot: "bg-orange-400",
        }
      : s === "canceled"
      ? {
          label: "Canceled",
          cls: "bg-red-500/15 text-red-300 border-red-500/20",
          dot: "bg-red-400",
        }
      : s === "unpaid"
      ? {
          label: "Unpaid",
          cls: "bg-red-500/15 text-red-300 border-red-500/20",
          dot: "bg-red-400",
        }
      : s === "incomplete" || s === "incomplete_expired"
      ? {
          label: "Incomplete",
          cls: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
          dot: "bg-yellow-300",
        }
      : {
          label: "None",
          cls: "bg-white/10 text-gray-300 border-white/10",
          dot: "bg-gray-400",
        };

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${ui.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ui.dot}`} />
      {ui.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: string | null }) {
  const ui =
    status === "paid"
      ? {
          label: "Paid",
          cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
          dot: "bg-emerald-400",
        }
      : status === "trial"
      ? {
          label: "Trial",
          cls: "bg-violet-500/15 text-violet-300 border-violet-500/20",
          dot: "bg-violet-400",
        }
      : status === "payment_failed"
      ? {
          label: "Payment failed",
          cls: "bg-orange-500/15 text-orange-300 border-orange-500/20",
          dot: "bg-orange-400",
        }
      : status === "unpaid" || status === "canceled" || status === "expired"
      ? {
          label: "No valid payment",
          cls: "bg-red-500/15 text-red-300 border-red-500/20",
          dot: "bg-red-400",
        }
      : status === "incomplete"
      ? {
          label: "Incomplete",
          cls: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
          dot: "bg-yellow-300",
        }
      : {
          label: "None",
          cls: "bg-white/10 text-gray-300 border-white/10",
          dot: "bg-gray-400",
        };

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${ui.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ui.dot}`} />
      {ui.label}
    </span>
  );
}

function AccessBadge({ allowed }: { allowed: boolean }) {
  const ui = allowed
    ? {
        label: "Allowed",
        cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
        dot: "bg-emerald-400",
      }
    : {
        label: "Blocked",
        cls: "bg-red-500/15 text-red-300 border-red-500/20",
        dot: "bg-red-400",
      };

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${ui.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ui.dot}`} />
      {ui.label}
    </span>
  );
}