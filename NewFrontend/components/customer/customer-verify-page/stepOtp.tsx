import { ErrorBanner } from "@/components/Merchant/error-success-feedback/feedback";
import { FieldError } from "@/components/Merchant/error-success-feedback/feedback";
import { useFieldStyles, VerifyOption } from "../customeruitls/fieldstyles";
import { useState } from "react";




export function StepOtp({
  light,
  chosenMethod,
  error,
  inputError,
  loading,
  onSubmit,
}: {
  light?: boolean;
  chosenMethod: VerifyOption | null;
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