import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSession() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
            setLoading(false);
        }

        loadSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return { user, loading };
}
