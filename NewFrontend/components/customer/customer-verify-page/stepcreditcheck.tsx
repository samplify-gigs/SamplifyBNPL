import { CreditData } from "../customeruitls/fieldstyles";

export function StepCreditResult({
  light,
  creditData,
  loading,
  onCheckSpread,
}: {
  light?: boolean;
  creditData: CreditData | null;
  loading: boolean;
  onCheckSpread: () => void;
}) {
  const headerText = light ? "text-[#10002B]" : "text-white";
  const subText = light ? "text-gray-400" : "text-white/50";
  const eyebrow = light ? "text-[#7B2FBE]" : "text-purple-300";
  const cardBg = light
    ? "bg-gray-50 border-gray-200"
    : "bg-white/[0.04] border-white/10";
  const labelText = light ? "text-gray-500 text-xs" : "text-white/40 text-xs";
  const valueText = light
    ? "text-[#10002B] font-semibold text-sm"
    : "text-white font-semibold text-sm";

  // Loading state — credit check in progress
  if (loading || !creditData) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="relative w-20 h-20">
          <div className="w-20 h-20 rounded-full border-4 border-purple-400/20 border-t-[#9D4EDD] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#9D4EDD]" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className={`${headerText} text-2xl font-bold`}>
            Checking your credit
          </h1>
          <p className={`${subText} text-sm max-w-xs`}>
            We're pulling your credit report. This only takes a moment.
          </p>
        </div>
      </div>
    );
  }

  const isApproved = creditData.creditscore >= 400;

  // Score bar — visual indicator
  const scorePercent = Math.min((creditData.creditscore / 850) * 100, 100);
  const scoreColor =
    creditData.creditscore >= 700
      ? "bg-emerald-400"
      : creditData.creditscore >= 400
        ? "bg-amber-400"
        : "bg-red-400";
  const scoreLabel =
    creditData.creditscore >= 700
      ? "Excellent"
      : creditData.creditscore >= 400
        ? "Fair"
        : "Poor";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span
          className={`${eyebrow} text-xs font-semibold uppercase tracking-widest`}
        >
          Credit check
        </span>
        <h1 className={`${headerText} text-2xl font-bold leading-tight`}>
          {isApproved ? "You're approved! 🎉" : "Not approved"}
        </h1>
        <p className={`${subText} text-sm`}>
          {isApproved
            ? "Your credit score qualifies you for financing on this product."
            : "Unfortunately your credit score doesn't meet the minimum requirement right now."}
        </p>
      </div>

      {/* Approval banner */}
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
          isApproved
            ? light
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
            : light
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-red-500/10 border-red-400/20 text-red-300"
        }`}
      >
        {isApproved ? (
          <svg
            className="w-5 h-5 flex-shrink-0"
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
        ) : (
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <p className="text-sm font-medium">
          {isApproved
            ? "Eligible for BNPL financing"
            : "Not eligible at this time"}
        </p>
      </div>

      {/* Details card */}
      <div className={`rounded-2xl border ${cardBg} p-5 flex flex-col gap-4`}>
        {/* Score with bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className={labelText}>Credit score</span>
            <span
              className={`text-xs font-medium ${
                isApproved
                  ? light
                    ? "text-emerald-600"
                    : "text-emerald-400"
                  : light
                    ? "text-red-500"
                    : "text-red-400"
              }`}
            >
              {scoreLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`${light ? "bg-gray-200" : "bg-white/10"} rounded-full h-2 flex-1 overflow-hidden`}
            >
              <div
                className={`h-full rounded-full ${scoreColor} transition-all duration-700`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <span className={`${headerText} font-bold text-lg w-12 text-right`}>
              {creditData.creditscore}
            </span>
          </div>

          <div className="flex justify-between">
            <span className={`${labelText}`}>300</span>
            <span className={`${labelText}`}>850</span>
          </div>
        </div>

        <div className={`h-px ${light ? "bg-gray-100" : "bg-white/[0.06]"}`} />

        {/* Name + Bank */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className={labelText}>Full name</span>
            <span className={valueText}>{creditData.full_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={labelText}>Primary bank</span>
            <span className={valueText}>{creditData.bank}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {isApproved ? (
        <button
          onClick={onCheckSpread}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200"
        >
          Check payment spread →
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <p className={`${subText} text-xs text-center leading-relaxed`}>
            You can try again in 30 days or contact support if you think this is
            a mistake.
          </p>
          <button
            className={`w-full py-3 rounded-2xl border text-sm font-medium transition-all duration-200 ${
              light
                ? "border-gray-200 text-gray-600 hover:bg-gray-50"
                : "border-white/10 text-white/60 hover:bg-white/[0.05]"
            }`}
          >
            Contact support
          </button>
        </div>
      )}
    </div>
  );
}
