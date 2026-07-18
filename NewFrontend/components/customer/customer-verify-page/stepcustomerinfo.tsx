import { ErrorBanner } from "@/components/Merchant/error-success-feedback/feedback";
import { FieldError } from "@/components/Merchant/error-success-feedback/feedback";
import { useFieldStyles } from "../customeruitls/fieldstyles";

type CustomerInfo = {
  product: string;
  bvn: string;
  email: string;
};


export function StepCustomerInfo({
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
            ⚠ Enter your correct 11-digit {" "}
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