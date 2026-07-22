import { ErrorBanner } from "@/components/Merchant/error-success-feedback/feedback";
import { useState } from "react";
import { VerifyOption,VerifyMethod } from "../customeruitls/fieldstyles";

export function VerifyMethodModal({
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
          Choose how you&apos;d like us to confirm who you are.
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
