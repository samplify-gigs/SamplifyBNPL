"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  EyeIcon,
  EyeOffIcon,
} from "@/components/Merchant/eyeIconPassword/eyeIcon";
import {
  ErrorBanner,
  FieldError,
} from "@/components/Merchant/error-success-feedback/feedback";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 0 | 1 | 2;

type CustomerInfo = {
  product: string;
  bvn: string;
  email: string;
};

type VerifyOption = {
  method: string;
  hint: string;
};

type VerifyMethod = {
  method: "email" | "phone";
  hint: string;
};

type Bvnlookupresponse = {
  options: VerifyOption[];
  sessionId: string;
};

type BvnData = {
  bvn: string;
  name: string;
  phone: string; // partially masked e.g. "080****5678"
};

// ─── Slide variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const slideTransition = { duration: 0.38, ease: [0.32, 0.72, 0, 1] };

// ─── Shared field styles ──────────────────────────────────────────────────────

function useFieldStyles(light?: boolean) {
  const input = (hasError = false) =>
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

  const nonEditable = light
    ? "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
    : "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/50 text-sm cursor-not-allowed";

  return { input, label, nonEditable };
}

// ─── Step 0 — Customer Info ───────────────────────────────────────────────────

function StepCustomerInfo({
  light,
  info,
  setInfo,
  error,
  inputError,
  loading,
  onSubmit,
}: {
  light?: boolean;
  info: CustomerInfo;
  setInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  error: string;
  inputError: Record<string, string>;
  loading: boolean;
  onSubmit: () => void;
}) {
  const { input, label } = useFieldStyles(light);

  const headerText = light ? "text-[#10002B]" : "text-white";
  const subText = light ? "text-gray-400" : "text-white/50";
  const eyebrow = light ? "text-[#7B2FBE]" : "text-purple-300";
  const noteText = light ? "text-gray-400" : "text-white/40";
  const noteAccent = light ? "text-[#7B2FBE]" : "text-purple-300";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span
          className={`${eyebrow} text-xs font-semibold uppercase tracking-widest`}
        >
          Samplify
        </span>
        <h1 className={`${headerText} text-3xl font-bold leading-tight`}>
          Apply for financing
        </h1>
        <p className={`${subText} text-sm`}>
          Fill in your details to check your eligibility for this product.
        </p>
      </div>

      <ErrorBanner message={error} light={light} />

      <div className="flex flex-col gap-5">
        {/* Product — pre-filled from URL, not editable */}
        <div>
          <label className={label}>Product</label>
          <input
            className={input(false)}
            value={info.product}
            readOnly
            name="product"
            placeholder="Product name"
          />
        </div>

        {/* BVN */}
        <div>
          <label className={label}>BVN</label>
          <input
            className={input(!!inputError.bvn)}
            value={info.bvn}
            onChange={(e) => setInfo((p) => ({ ...p, bvn: e.target.value }))}
            name="bvn"
            placeholder="23465758488"
            type="text"
          />
          <p className={`${noteText} text-[11px] mt-1`}>
            ⚠ Enter your name exactly as it appears on your{" "}
            <span className={noteAccent}>BVN</span>
          </p>
          <FieldError message={inputError.bvn} />
        </div>

        {/* Email */}
        <div>
          <label className={label}>Email address</label>
          <input
            className={input(!!inputError.email)}
            value={info.email}
            onChange={(e) => setInfo((p) => ({ ...p, email: e.target.value }))}
            name="email"
            placeholder="your@email.com"
            type="email"
          />
          <FieldError message={inputError.email} />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Checking eligibility..." : "Check eligibility"}
      </button>
    </div>
  );
}

//-step 1

function StepOtp({
  light,
  chosenMethod,
  error,
  inputError,
  loading,
  onSubmit,
}: {
  light?: boolean;
  chosenMethod: VerifyMethod | null;
  error: string;
  inputError: Record<string, string>;
  loading: boolean;
  onSubmit: (otp: string) => void;
}) {
  const { input, label } = useFieldStyles(light);
  const [otp, setOtp] = useState("");

  const headerText = light ? "text-[#10002B]" : "text-white";
  const subText = light ? "text-gray-400" : "text-white/50";
  const eyebrow = light ? "text-[#7B2FBE]" : "text-purple-300";
  const hintBg = light
    ? "bg-[#9D4EDD]/5 border-[#9D4EDD]/15 text-[#240046]"
    : "bg-purple-500/10 border-purple-400/15 text-purple-200";

  const isEmail = chosenMethod?.method === "email";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span
          className={`${eyebrow} text-xs font-semibold uppercase tracking-widest`}
        >
          Verification
        </span>
        <h1 className={`${headerText} text-2xl font-bold leading-tight`}>
          Enter your code
        </h1>
      </div>

      {/* Hint pill */}
      {chosenMethod && (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${hintBg}`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {isEmail ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3"
                />
              </svg>
            )}
          </div>
          <p className="text-sm leading-relaxed">{chosenMethod.hint}</p>
        </div>
      )}

      <ErrorBanner message={error} light={light} />

      <div>
        <label className={label}>One-time code</label>
        <input
          className={input(!!inputError.otp)}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="Enter 6-digit code"
          type="text"
          inputMode="numeric"
          maxLength={6}
        />
        <FieldError message={inputError.otp} />
      </div>

      <button
        onClick={() => onSubmit(otp)}
        disabled={otp.length < 6 || loading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Verifying..." : "Verify code"}
      </button>
    </div>
  );
}

// ─── Step method — Verify Method Modal (blurred backdrop) ─────────────────────────

function VerifyMethodModal({
  options,
  loading,
  error,
  onChoose,
  light,
}: {
  options: VerifyOption[];
  loading: boolean;
  error: string;
  onChoose: (option: VerifyOption) => void;
  light?: boolean;
}) {
  const [chosen, setChosen] = useState<string | null>(null);

  const methodLabel: Record<string, string> = {
    email: "Email",
    phone: "Primary Phone",
    phone_1: "Secondary Phone",
    alternate_phone: "Alternate Phone",
  };

  const headerText = light ? "text-[#10002B]" : "text-white";
  const subText = light ? "text-gray-500" : "text-white/50";
  const cardBase = light
    ? "rounded-2xl border px-4 py-3.5 flex items-start gap-3 cursor-pointer transition-all duration-200"
    : "rounded-2xl border px-4 py-3.5 flex items-start gap-3 cursor-pointer transition-all duration-200";
  const cardActive = light
    ? "border-[#9D4EDD] bg-[#9D4EDD]/5"
    : "border-purple-400/40 bg-purple-500/10";
  const cardIdle = light
    ? "border-gray-200 bg-gray-50 hover:border-[#9D4EDD]/40"
    : "border-white/10 bg-white/[0.04] hover:border-white/20";
  const labelText = light
    ? "text-[#10002B] font-medium text-sm"
    : "text-white font-medium text-sm";
  const descText = light
    ? "text-gray-400 text-xs mt-0.5"
    : "text-white/40 text-xs mt-0.5";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className={`${headerText} text-2xl font-bold leading-tight`}>
          Verify your identity
        </h2>
        <p className={`${subText} text-sm`}>
          Choose how you'd like us to confirm who you are.
        </p>
      </div>

      <ErrorBanner message={error} light={light} />

      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <div
            key={opt.method}
            className={`${cardBase} ${chosen === opt.method ? cardActive : cardIdle}`}
            onClick={() => setChosen(opt.method)}
          >
            {/* Radio */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                chosen === opt.method
                  ? "border-[#9D4EDD] bg-[#9D4EDD]"
                  : light
                    ? "border-gray-300"
                    : "border-white/30"
              }`}
            >
              {chosen === opt.method && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            <div className="flex flex-col">
              <span className={labelText}>
                {methodLabel[opt.method] ?? opt.method}
              </span>
              <span className={descText}>{opt.hint}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const selected = options.find((o) => o.method === chosen);
          if (selected) onChoose(selected);
        }}
        disabled={!chosen || loading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
}

// ─── Step 2 — bvn confirmation ───────────────────────────────────────────────────────

function StepBvnDetails({
  light,
  bvnData,
  onContinue,
}: {
  light?: boolean;
  bvnData: BvnData;
  onContinue: () => void;
}) {
  const { nonEditable, label } = useFieldStyles(light);

  const headerText = light ? "text-[#10002B]" : "text-white";
  const subText = light ? "text-gray-400" : "text-white/50";
  const eyebrow = light ? "text-[#7B2FBE]" : "text-purple-300";
  const successBg = light
    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
    : "bg-emerald-500/10 border-emerald-400/20 text-emerald-300";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span
          className={`${eyebrow} text-xs font-semibold uppercase tracking-widest`}
        >
          Identity confirmed
        </span>
        <h1 className={`${headerText} text-2xl font-bold leading-tight`}>
          Your details
        </h1>
        <p className={`${subText} text-sm`}>
          Verify these details are correct before continuing.
        </p>
      </div>

      {/* Success pill */}
      <div
        className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3 ${successBg}`}
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <p className="text-sm font-medium">Identity verified successfully</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className={label}>BVN</label>
          <input
            className={nonEditable}
            value={bvnData.bvn}
            readOnly
            tabIndex={-1}
          />
        </div>

        <div>
          <label className={label}>Full name</label>
          <input
            className={nonEditable}
            value={bvnData.name}
            readOnly
            tabIndex={-1}
          />
        </div>

        <div>
          <label className={label}>Phone number</label>
          <input
            className={nonEditable}
            value={bvnData.phone}
            readOnly
            tabIndex={-1}
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200"
      >
        Continue to eligibility check →
      </button>
    </div>
  );
}

// ─── Shared card shell ────────────────────────────────────────────────────────

function MobileCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full rounded-3xl border max-h-[95vh] overflow-y-auto border-white/20 p-8 flex flex-col bg-[image:var(--bg-gradient)]"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

function DesktopLeft() {
  return (
    <div
      className="w-[42%] flex-shrink-0 relative flex flex-col justify-between p-10"
      style={{
        background:
          "radial-gradient(circle 500px at 30% 30%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 400px at 80% 80%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
      }}
    >
      <div className="absolute top-12 right-0 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
        <span className="text-white font-bold text-lg leading-none">✦</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">
            Buy now, pay later
          </span>
          <h2 className="text-white text-3xl font-bold leading-snug">
            Get what you
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C77DFF] to-[#E0AAFF]">
              want, on your terms.
            </span>
          </h2>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Samplify lets you split payments for the things you love — from
          electronics to furniture — with zero stress.
        </p>

        <div className="flex gap-6 pt-2">
          <div>
            <p className="text-white font-bold text-xl">
              1.5M<span className="text-purple-400">+</span>
            </p>
            <p className="text-white/40 text-xs">Active customers</p>
          </div>
          <div>
            <p className="text-white font-bold text-xl">
              3.2K<span className="text-purple-400">+</span>
            </p>
            <p className="text-white/40 text-xs">Trusted merchants</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function CustomerApply() {
  const params = useParams();
  const slug = params.slug as string;
  const lastUnderscore = slug.lastIndexOf("_");

  const productFromUrl = slug.slice(0, lastUnderscore).replace(/_/g, " ");
  const id = slug.slice(lastUnderscore + 1);

  const [step, setStep] = useState<Step>(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [info, setInfo] = useState<CustomerInfo>({
    product: productFromUrl,
    bvn: "",
    email: "",
  });

  const [verifyOptions, setVerifyOptions] = useState<VerifyOption[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [bvnData, setBvnData] = useState<BvnData>({
    bvn: "",
    name: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [inputError, setInputError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Show verify modal as an overlay on step 1
  const [showModal, setShowModal] = useState(false);
  const [chosenMethod, setChosenMethod] = useState<VerifyMethod | null>(null);

  function goTo(nextStep: Step) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  // ── Step 0 submit ──────────────────────────────────────────────────────────
  async function submitCustomerInfo() {
    setError("");
    setInputError({});
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvnidentity",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        if (data.errors) setInputError(data.errors);
        return;
      }

      setVerifyOptions(data.data.data.methods);
      setSessionId(data.data.data.sessionId);
      setShowModal(true); // show modal on top of step 0
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step method — option chosen ─────────────────────────────────────────────────
  async function submitVerifyChoice(option: VerifyMethod) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvn/method",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            method: option.method,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Failed to send verification.");
        return;
      }

      setChosenMethod(option);
      setShowModal(false);
      goTo(1);
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2 — OTP submit ────────────────────────────────────────────────────
  async function submitOtp(otp: number) {
    setError("");
    setInputError({});
    setLoading(true);
    try {
      const res = await fetch(
        " http://localhost:8080/api/customerbidbvn/customerbvn/otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, otp }),
        },
      );
      const data = await res.json();
      console.log("this data from bvn succefuk opt", data);
      console.log(data.data.data.bvn);

      if (!res.ok) {
        setError(data.message ?? "OTP verification failed.");
        if (data.errors) setInputError(data.errors);
        return;
      }
      setBvnData({
        bvn: data.data.data.bvn,
        name: data.data.data.name,
        phone: data.data.data.phone,
      });

      // success → navigate to next step (will add later)
      goTo(2); // replace with goTo(3) when next step is added
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const stepContent = (light?: boolean) => (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        style={{ width: "100%" }}
      >
        {step === 0 && (
          <StepCustomerInfo
            light={light}
            info={info}
            setInfo={setInfo}
            error={error}
            inputError={inputError}
            loading={loading}
            onSubmit={submitCustomerInfo}
          />
        )}
        {step === 1 && (
          <StepOtp
            light={light}
            chosenMethod={chosenMethod}
            error={error}
            inputError={inputError}
            loading={loading}
            onSubmit={submitOtp}
          />
        )}

        {step === 2 && (
          <StepBvnDetails
            light={light}
            bvnData={bvnData}
            onContinue={() => goTo(3)} // step 3 = eligibility, build later
          />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-24 lg:py-12 overflow-hidden">
        {/* ── Mobile/Tab ── */}
        <div className="lg:hidden w-full max-w-lg relative">
          <MobileCard>{stepContent(false)}</MobileCard>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden lg:flex w-full max-h-[99vh] max-w-5xl rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/15 overflow-hidden">
          <DesktopLeft />

          <div className="flex-1 bg-white flex flex-col justify-center px-12 py-16 overflow-y-auto overflow-x-hidden relative">
            {stepContent(true)}
          </div>
        </div>
      </main>

      {/* ── Verify method modal (blurred backdrop, rendered above everything) ── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 backdrop-blur-md bg-black/40"
              onClick={() => !loading && setShowModal(false)}
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ pointerEvents: "none" }}
            >
              {/* Mobile modal */}
              <div
                className="w-full max-w-sm rounded-3xl border border-white/20 p-7 flex flex-col lg:hidden bg-[image:var(--bg-gradient)]"
                style={{
                  pointerEvents: "auto",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  boxShadow:
                    "0 24px 80px rgba(90,24,154,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <VerifyMethodModal
                  options={verifyOptions}
                  loading={loading}
                  error={error}
                  onChoose={submitVerifyChoice}
                  light={false}
                />
              </div>

              {/* Desktop modal */}
              <div
                className="hidden lg:flex w-full max-w-md rounded-3xl bg-white p-8 flex-col shadow-[0_24px_80px_rgba(90,24,154,0.3)] border border-purple-200/40"
                style={{ pointerEvents: "auto" }}
              >
                <VerifyMethodModal
                  options={verifyOptions}
                  loading={loading}
                  error={error}
                  onChoose={submitVerifyChoice}
                  light={true}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
