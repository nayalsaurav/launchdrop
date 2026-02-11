"use client";

import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

export function AuthListener() {
    const { data: session } = authClient.useSession();
    const setUser = useAuthStore((state) => state.setUser);
    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    return null;
}
