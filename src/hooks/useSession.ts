import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSession() {
    const [user, setUser] = useState<any>(null); // ✅ keep full Supabase user object
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // avoids re-fetching admin status repeatedly for same user id
    const lastAdminUidRef = useRef<string | null>(null);

    const loadIsAdmin = async (uid: string) => {
        // prevent duplicate calls
        if (lastAdminUidRef.current === uid) return;
        lastAdminUidRef.current = uid;

        // default false until proven true
        setIsAdmin(false);

        const { data, error } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", uid)
            .maybeSingle();

        if (error) {
            console.warn("useSession: failed to load is_admin:", error.message);
            setIsAdmin(false);
            return;
        }

        setIsAdmin(Boolean(data?.is_admin));
    };

    const applyUser = (u: any) => {
        setUser(u || null);

        if (u?.id) {
            loadIsAdmin(u.id);
        } else {
            lastAdminUidRef.current = null;
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        let alive = true;

        async function loadSession() {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();

            if (!alive) return;

            if (error) {
                console.warn("useSession: getUser error:", error.message);
                applyUser(null);
                setLoading(false);
                return;
            }

            applyUser(data?.user || null);
            setLoading(false);
        }

        loadSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            // when logging out, session becomes null — applyUser(null) handles it
            applyUser(session?.user || null);
        });

        return () => {
            alive = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user, isAdmin, loading };
}
