import { useFieldStyles } from "../customeruitls/fieldstyles";
import { BvnData } from "../customeruitls/fieldstyles";


export function StepBvnDetails({
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