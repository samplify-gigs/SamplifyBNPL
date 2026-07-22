"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  PaymentState,
  formatCardNumber,
  formatExpiry,
  VisualCard,
  SuccessModal,
} from "@/components/customer/customeruitls/fieldstyles";

// ─── Input styles ─────────────────────────────────────────────────────────────

const inputBase =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]/40 focus:border-[#9D4EDD]/60 transition-all";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.slug;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [chosenAmount, setChosenAmount] = useState("");
  const newURL = process.env.NEXT_PUBLIC_BASE_URL;

  async function getChosenPrice() {
    try {
      const res = await fetch(
        `${newURL}/api/customerbidbvn/customerbvn/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentlinkid: id }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Payment failed. Please try again.");
        setPaymentState("error");
        return;
      }

      setChosenAmount(data.data[0].chosenprice);
    } catch {
      setError("Couldn't reach the server. Check your connection.");
      setPaymentState("error");
    }
  }

  useEffect(() => {
    async function loadChosenPrice() {
      await getChosenPrice();
    }

    loadChosenPrice();
  });

  function handlePay() {
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill in all card details.");
      return;
    }
    setError("");
    setPaymentState("loading");
    setPaymentState("success");
    setShowSuccess(true);
  }

  function handleDone() {
    setShowSuccess(false);
    router.push("/customerlogin");
  }

  const isLoading = paymentState === "loading";

  return (
    <>
      {/* ── Success modal ── */}
      {showSuccess && (
        <SuccessModal amount={chosenAmount} onDone={handleDone} />
      )}

      <div className="min-h-screen bg-[#9D4EDD]/5">
        {/* ══ Mobile / Tablet ══════════════════════════════════════════════════ */}
        <div className="lg:hidden max-w-md mx-auto px-4 py-10 flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
              Samplify
            </span>
            <h1 className="text-[#10002B] text-2xl font-bold">Down payment</h1>
            <p className="text-gray-400 text-sm">
              Pay your down payment to confirm your plan.
            </p>
          </div>

          {/* Visual card */}
          <VisualCard cardNumber={cardNumber} expiry={expiry} cvv={cvv} />

          {/* Form card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#10002B] text-lg font-bold">Credit Card</h2>
              <p className="text-gray-400 text-xs">Add your card details</p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Card number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs font-medium">
                Card number
              </label>
              <input
                className={inputBase}
                placeholder="**** **** **** 2421"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                inputMode="numeric"
                maxLength={19}
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 text-xs font-medium">
                  Expiry
                </label>
                <input
                  className={inputBase}
                  placeholder="09/24"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  inputMode="numeric"
                  maxLength={5}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 text-xs font-medium">
                  CVV/CVC
                </label>
                <input
                  className={inputBase}
                  placeholder="***"
                  type="password"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  inputMode="numeric"
                  maxLength={4}
                />
              </div>
            </div>

            {/* Amount summary */}
            <div className="flex items-center justify-between rounded-2xl bg-[#9D4EDD]/5 border border-[#9D4EDD]/15 px-4 py-3">
              <span className="text-gray-500 text-sm">Amount due</span>
              <span className="text-[#10002B] font-bold text-lg">
                {chosenAmount}
              </span>
            </div>

            <button
              onClick={handlePay}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay ₦${chosenAmount}`
              )}
            </button>
          </div>

          <p className="text-center text-gray-400 text-xs pb-6">
            Your payment is secured and encrypted by Samplify.
          </p>
        </div>

        {/* ══ Desktop ══════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.18)] border border-purple-100 overflow-hidden flex min-h-[560px]">
            {/* Left — form */}
            <div className="flex-1 flex flex-col justify-center px-10 py-10 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
                  Samplify Pay
                </span>
                <h1 className="text-[#10002B] text-2xl font-bold">
                  Credit Card
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter your card details to complete payment.
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Card number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-700 text-xs font-medium">
                  Card number
                </label>
                <input
                  className={inputBase}
                  placeholder="**** **** **** 2421"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  inputMode="numeric"
                  maxLength={19}
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700 text-xs font-medium">
                    Expiry date
                  </label>
                  <input
                    className={inputBase}
                    placeholder="09/24"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    inputMode="numeric"
                    maxLength={5}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700 text-xs font-medium">
                    CVV/CVC
                  </label>
                  <input
                    className={inputBase}
                    placeholder="***"
                    type="password"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ₦${chosenAmount}`
                )}
              </button>

              <p className="text-center text-gray-400 text-xs">
                Your payment is secured and encrypted by Samplify.
              </p>
            </div>

            {/* Right — summary panel */}
            <div
              className="w-[380px] flex-shrink-0 flex flex-col justify-between p-10 relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle 400px at 20% 25%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 300px at 85% 80%, #C77DFF 0%, transparent 55%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
              }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-300/10 blur-3xl pointer-events-none" />

              {/* Top mark */}
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-sm leading-none">
                    ✦
                  </span>
                </div>
                <p className="text-purple-300/70 text-xs font-medium uppercase tracking-widest mb-2">
                  Amount due
                </p>
                <p className="text-white text-4xl font-bold tracking-tight">
                  ₦ {chosenAmount}
                </p>
                <p className="text-white/40 text-sm mt-1">Down payment</p>
              </div>

              {/* Visual card preview */}
              <div className="relative">
                <VisualCard cardNumber={cardNumber} expiry={expiry} cvv={cvv} />
              </div>

              {/* Order summary rows */}
              <div className="relative flex flex-col gap-3">
                <div className="h-px bg-white/10" />
                {[
                  { label: "Down payment", value: chosenAmount },
                  { label: "Plan", value: "2-month spread" },
                  { label: "Secured by", value: "Samplify" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-white/40 text-xs">{label}</span>
                    <span className="text-white text-xs font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe for loading bar in success modal ── */}
      <style jsx global>{`
        @keyframes grow {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
