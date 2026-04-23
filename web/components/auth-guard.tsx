"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated && !accessToken && pathname !== "/login") {
      router.replace("/login");
    }
  }, [accessToken, hydrated, pathname, router]);

  if (!hydrated) {
    return <div className="min-h-screen bg-bg" />;
  }

  if (!accessToken && pathname !== "/login") {
    return null;
  }

  return children;
}

