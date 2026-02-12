"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((data) => {
      setSession(data);
      setLoading(false);
    });
  }, []);

  return { session, loading };
}
