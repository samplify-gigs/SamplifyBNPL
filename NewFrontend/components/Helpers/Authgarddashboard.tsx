"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const token = localStorage.getItem("login_jwt");

        if (isIOS && !token) {
          router.replace("/merchantlogin");
          return;
        }

        const headers: Record<string, string> = {};
        if (isIOS && token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/merchantdash/dashboard`,
          {
            credentials: "include",
            headers,
            cache: "no-store",
          },
        );

        if (!res.ok) {
          localStorage.removeItem("login_jwt");
          router.replace("/merchantlogin");
          return;
        }

        setChecking(false);
      } catch (err) {
        console.error(err);
        router.replace("/merchantlogin");
      }
    }

    verify();
  }, [router]);

  if (checking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle 600px at 15% 20%, #5A189A55 0%, transparent 70%), radial-gradient(circle 500px at 85% 75%, #9D4EDD30 0%, transparent 65%), linear-gradient(160deg, #10002B 0%, #240046 55%, #0D001A 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
          <p className="text-white/50 text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
