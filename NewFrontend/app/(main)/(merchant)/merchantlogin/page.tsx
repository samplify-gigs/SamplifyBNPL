"use client";

import React, { useState } from "react";
import {
  ErrorBanner,
  FieldError,
  SuccessToast,
} from "@/components/Merchant/error-success-feedback/feedback";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeOffIcon,
} from "@/components/Merchant/eyeIconPassword/eyeIcon";

type LoginData = {
  email: string;
  password: string;
};

export default function MerchantLogin() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function SendLoginData() {
    setInputError({});
    setError("");
    setLoading(true);
    const newURL = process.env.NEXT_PUBLIC_BASE_URL;
    

    try {
      const res = await fetch(`${newURL}/api/merchantlogin/merchantlogin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (data.message === "account will be verified manually") {
        router.push("/merchantmanualver");
        return;
      }

      if (!res.ok) {
        setError(data.message);
        if (data.errors) {
          setInputError(data.errors);
        }
      } else {
        setSuccess(data.message);
        router.push("/merchantDashboard");
      }
    } catch (err) {
      console.error(`error sending login data: ${err}`);
      setError(
        "Couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-24 lg:py-12">
      <SuccessToast message={success} onDismiss={() => setSuccess("")} />

      {/* ── Mobile/Tab: single glassy card ── */}
      <div className="lg:hidden w-full max-w-lg">
        <div
          className="w-full rounded-3xl border max-h-[95vh] overflow-y-auto border-white/20 p-8 flex flex-col gap-6 bg-[image:var(--bg-gradient)]"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-2 py-4">
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-widest">
              Samplify for Business
            </span>
            <h1 className="text-white text-3xl font-bold leading-tight">
              Log in to your store
            </h1>
            <p className="text-white/50 text-sm">
              Welcome back. Enter your details to access your dashboard.
            </p>
          </div>

          <ErrorBanner message={error} />

          <LoginFields
            loginData={loginData}
            handleChange={handleChange}
            inputError={inputError}
          />

          <button
            onClick={SendLoginData}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center text-white/40 text-xs">
            Forgot your password?{" "}
            <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors">
              Reset it
            </span>
          </p>

          <div className="h-px bg-white/10" />

          <p className="text-center text-white/40 text-xs pb-2">
            Don&apos;t have an account?{" "}
            <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors font-medium">
              Sign up here
            </span>
          </p>
        </div>
      </div>

      {/* ── Desktop: split card ── */}
      <div className="hidden lg:flex w-full max-h-[99vh] max-w-5xl rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/15 overflow-hidden">
        {/* LEFT — gradient panel */}
        <div
          className="w-[42%] flex-shrink-0 relative flex flex-col justify-between p-10"
          style={{
            background:
              "radial-gradient(circle 500px at 30% 30%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 400px at 80% 80%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
          }}
        >
          {/* Decorative orb blur */}
          <div className="absolute top-12 right-0 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

          {/* Top mark */}
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">✦</span>
          </div>

          {/* Bottom copy */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">
                Welcome back
              </span>
              <h2 className="text-white text-3xl font-bold leading-snug">
                Pick up right
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF]">
                  where you left off.
                </span>
              </h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your storefront, orders, and customer payment plans are all
              waiting in your dashboard.
            </p>

            {/* Mini stats */}
            <div className="flex gap-6 pt-2">
              <div>
                <p className="text-white font-bold text-xl">
                  3.2K<span className="text-purple-400">+</span>
                </p>
                <p className="text-white/40 text-xs">Merchants onboard</p>
              </div>
              <div>
                <p className="text-white font-bold text-xl">
                  1.5M<span className="text-purple-400">+</span>
                </p>
                <p className="text-white/40 text-xs">Active customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-12 py-16 gap-7 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
              Merchant login
            </span>
            <h1 className="text-[#10002B] text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access your store dashboard.
            </p>
          </div>

          <ErrorBanner message={error} light />

          <LoginFields
            light
            loginData={loginData}
            handleChange={handleChange}
            inputError={inputError}
          />

          <button
            onClick={SendLoginData}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center text-gray-400 text-xs">
            Forgot your password?{" "}
            <span className="text-[#7B2FBE] hover:text-[#9D4EDD] cursor-pointer font-medium transition-colors">
              Reset it
            </span>
          </p>

          <div className="h-px bg-gray-100" />

          <p className="text-center text-gray-400 text-xs">
            Don&apos;t have an account?{" "}
            <span className="text-[#7B2FBE] hover:text-[#9D4EDD] cursor-pointer font-medium transition-colors">
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}

// Shared login fields — dark=glass mode, light=white bg mode
function LoginFields({
  light,
  loginData,
  handleChange,
  inputError,
}: {
  light?: boolean;
  loginData: LoginData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: Record<string, string>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const input = (hasError: boolean) =>
    light
      ? `w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
          hasError
            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
            : "border-gray-200 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60"
        }`
      : `w-full px-4 py-3 rounded-xl border bg-white/[0.07] text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 transition-all backdrop-blur-sm ${
          hasError
            ? "border-red-400/40 focus:ring-red-400/20"
            : "border-white/10 focus:ring-purple-400/30 focus:border-purple-400/30"
        }`;

  const label = light
    ? "text-gray-700 text-xs font-medium mb-1.5 block"
    : "text-white/60 text-xs font-medium mb-1.5 block";

  return (
    <div className="flex flex-col gap-5">
      {/* Email */}
      <div>
        <label className={label}>Email address</label>
        <input
          className={input(!!inputError.email)}
          placeholder="you@business.com"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <FieldError message={inputError.email} />
      </div>

      {/* Password */}
      <div>
        <label className={label}>Password</label>
        <div className="relative">
          <input
            className={`${input(!!inputError.password)} pr-11`}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              light
                ? "text-gray-400 hover:text-gray-600"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <FieldError message={inputError.password} />
      </div>
    </div>
  );
}
