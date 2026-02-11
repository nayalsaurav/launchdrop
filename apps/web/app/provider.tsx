"use client";


import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { Toaster } from "sonner";
import { AuthListener } from "@/components/auth-listener";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <AuthListener />
        {children}
        <Toaster />
    </QueryClientProvider>
  );
}
