"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type VerifyState = "loading" | "success" | "error";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState("");
  const newURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setState("error");
        setMessage("This link is missing a verification token.");
        return;
      }

      try {
        const res = await fetch(`${newURL}/api/merchantverify/meremailverify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setState("error");
          setMessage(
            data.message || "Something went wrong while verifying your email.",
          );
        } else {
          setState("success");
          setMessage(data.message || "Successfully verified email");
        }
      } catch (err) {
        console.error(`Verification request failed: ${err}`);
        setState("error");
        setMessage(
          "Couldn't reach the server. Check your connection and try again.",
        );
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(circle 600px at 15% 20%, #5A189A55 0%, transparent 70%), radial-gradient(circle 500px at 85% 75%, #9D4EDD30 0%, transparent 65%), linear-gradient(160deg, #10002B 0%, #240046 55%, #0D001A 100%)",
      }}
    >
      <div className="w-full max-w-md rounded-3xl bg-white px-8 py-10 flex flex-col items-center gap-6 shadow-[0_24px_80px_rgba(90,24,154,0.35)]">
        {state === "loading" && <LoadingState />}
        {state === "success" && (
          <SuccessState
            message={message}
            onContinue={() => router.push("/merchantlogin")}
          />
        )}
        {state === "error" && (
          <ErrorState
            message={message}
            onRetry={() => router.push("/Merchantsignup")}
          />
        )}
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <>
      <div className="w-16 h-16 rounded-2xl border-2 border-[#240046] flex items-center justify-center">
        <svg
          className="w-8 h-8 text-[#7B2FBE] animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[#10002B] text-2xl font-bold tracking-tight">
          Verifying your email
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          Hang tight — we're confirming your link with Samplify. This only takes
          a second.
        </p>
      </div>
    </>
  );
}

function SuccessState({
  message,
  onContinue,
}: {
  message: string;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 text-yellow-400 text-xl leading-none">
          ✦
        </span>
        <span className="absolute top-2 right-4 text-yellow-300 text-xs leading-none">
          ✦
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[#10002B] text-2xl font-bold tracking-tight">
          Email verified
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          {message}
        </p>
      </div>

      <div className="w-full h-px bg-gray-100" />

      <button
        onClick={onContinue}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.55)] hover:scale-[1.01] transition-all duration-200"
      >
        Continue to login
      </button>
    </>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <>
      <div className="w-16 h-16 rounded-2xl border-2 border-red-400 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[#10002B] text-2xl font-bold tracking-tight">
          Verification failed
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          {message}
        </p>
      </div>

      <div className="w-full h-px bg-gray-100" />

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={onRetry}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.55)] hover:scale-[1.01] transition-all duration-200"
        >
          Back to sign up
        </button>
        <p className="text-center text-gray-400 text-xs">
          Need help?{" "}
          <span className="text-[#7B2FBE] font-medium hover:text-[#9D4EDD] cursor-pointer transition-colors">
            Contact support
          </span>
        </p>
      </div>
    </>
  );
}

export default function Verify() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen flex items-center justify-center p-4"
          style={{
            background:
              "radial-gradient(circle 600px at 15% 20%, #5A189A55 0%, transparent 70%), radial-gradient(circle 500px at 85% 75%, #9D4EDD30 0%, transparent 65%), linear-gradient(160deg, #10002B 0%, #240046 55%, #0D001A 100%)",
          }}
        >
          <div className="w-full max-w-md rounded-3xl bg-white px-8 py-10 flex flex-col items-center gap-6 shadow-[0_24px_80px_rgba(90,24,154,0.35)]">
            <LoadingState />
          </div>
        </main>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
