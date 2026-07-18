export function useFieldStyles(light?: boolean) {
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

// ─── Types ────────────────────────────────────────────────────────────────────

export type VerifyOption = {
  method: string;
  hint: string;
};

export type BvnData = {
  bvn: string;
  name: string;
  phone: string; // partially masked e.g. "080****5678"
};

export type Step = 0 | 1 | 2 | 3 | 4;

export type CustomerInfo = {
  product: string;
  bvn: string;
  email: string;
};

export type VerifyMethod = {
  method: "email" | "phone";
  hint: string;
};

export type Bvnlookupresponse = {
  options: VerifyOption[];
  sessionId: string;
};

export type CreditData = {
  full_name: string;
  creditscore: number;
  bank: string;
};

export type SpreadData = {
  price: number;
  interestRate: number;
  interest: number;
  totalPrice: number;
  downPaymentRate: number;
  downPayment: number;
  remainingBalance: number;
  months: number;
  monthlyPayment: number;
};

// ─── Slide variants ───────────────────────────────────────────────────────────

export const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export const slideTransition = { duration: 0.38, ease: [0.32, 0.72, 0, 1] };

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(rate: number) {
  return `${(rate * 100).toFixed(1)}%`;
}

// ─── Data row ─────────────────────────────────────────────────────────────────

export function DataRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span
        className={`text-sm ${
          highlight ? "text-[#10002B] font-bold" : "text-[#10002B] font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Month selector ───────────────────────────────────────────────────────────

export function MonthSelector({
  selected,
  onChange,
}: {
  selected: number;
  onChange: (m: number) => void;
}) {
  const options = [2, 4, 6];
  const percent = ((selected - 2) / 4) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[#240046] text-sm font-semibold">
          Repayment period
        </span>
        <span className="text-[#7B2FBE] text-sm font-bold">
          {selected} months
        </span>
      </div>

      {/* Pill toggle */}
      <div className="flex rounded-2xl p-1 gap-1 bg-[#9D4EDD]/8 border border-[#9D4EDD]/15">
        {options.map((m) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              selected === m
                ? "bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white shadow-[0_2px_12px_rgba(157,78,221,0.35)]"
                : "text-[#7B2FBE]/60 hover:text-[#7B2FBE]"
            }`}
          >
            {m} mo
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3 px-1">
        <span className="text-xs text-gray-400 w-4">2</span>
        <div className="relative flex-1 h-5 flex items-center">
          <div className="absolute inset-x-0 h-2 rounded-full bg-[#9D4EDD]/15" />
          <div
            className="absolute left-0 h-2 rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
          <input
            type="range"
            min={2}
            max={6}
            step={2}
            value={selected}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="absolute w-5 h-5 rounded-full bg-white border-2 border-[#9D4EDD] shadow-[0_2px_8px_rgba(90,24,154,0.3)] transition-all duration-300 pointer-events-none"
            style={{ left: `calc(${percent}% - 10px)` }}
          />
        </div>
        <span className="text-xs text-gray-400 w-4">6</span>
      </div>
    </div>
  );
}

// ─── Gradient summary bar ─────────────────────────────────────────────────────

export function GradientSummary({
  spreadData,
  loading,
  isDesktop,
}: {
  spreadData: SpreadData | null;
  loading: boolean;
  isDesktop?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between ${
        isDesktop ? "h-full min-h-full" : ""
      }`}
      style={{
        background:
          "radial-gradient(circle 400px at 20% 20%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 300px at 85% 85%, #C77DFF 0%, transparent 60%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
      }}
    >
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

      <div className={`relative ${isDesktop ? "p-10" : "px-6 pt-10 pb-8"}`}>
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
          <span className="text-white font-bold text-sm leading-none">✦</span>
        </div>

        <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest block mb-3">
          Your payment plan
        </span>

        {/* Big monthly number */}
        <div className="flex flex-col gap-1 mb-8">
          {loading ? (
            <>
              <div className="w-48 h-12 rounded-2xl bg-white/10 animate-pulse" />
              <div className="w-20 h-4 rounded bg-white/10 animate-pulse mt-2" />
            </>
          ) : (
            <>
              <span className="text-white text-4xl lg:text-5xl font-bold tracking-tight">
                {spreadData ? formatNaira(spreadData.monthlyPayment) : "—"}
              </span>
              <span className="text-white/40 text-sm">/month</span>
            </>
          )}
        </div>

        {/* Mini stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Total payable",
              value: spreadData?.totalPrice,
              format: "naira",
            },
            { label: "Interest", value: spreadData?.interest, format: "naira" },
            {
              label: "Down payment",
              value: spreadData?.downPayment,
              format: "naira",
            },
            {
              label: "Interest rate",
              value: spreadData?.interestRate,
              format: "percent",
            },
          ].map(({ label, value, format }) => (
            <div key={label}>
              <p className="text-white/40 text-xs mb-1">{label}</p>
              {loading ? (
                <div className="w-24 h-4 rounded bg-white/10 animate-pulse" />
              ) : (
                <p className="text-white font-semibold text-sm">
                  {value !== undefined
                    ? format === "naira"
                      ? formatNaira(value)
                      : formatPercent(value)
                    : "—"}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {isDesktop && (
        <div className="relative p-10 pt-0">
          <div className={`h-px bg-white/10 mb-6`} />
          <p className="text-white/30 text-xs leading-relaxed">
            Rates are fixed for the full duration of your repayment plan. Your
            down payment is required at the time of purchase.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Form panel ───────────────────────────────────────────────────────────────

export function FormPanel({
  light,
  selectedMonths,
  onMonthChange,
  spreadData,
  loading,
  error,
  confirming,
  confirmed,
  onConfirm,
}: {
  light?: boolean;
  selectedMonths: number;
  onMonthChange: (m: number) => void;
  spreadData: SpreadData | null;
  loading: boolean;
  error: string;
  confirming: boolean;
  confirmed: boolean;
  onConfirm: () => void;
}) {
  const cardBg = light
    ? "bg-gray-50 border-gray-100"
    : "bg-white/[0.04] border-white/10";
  const sectionTitle = light
    ? "text-[#10002B] font-semibold text-sm mb-3"
    : "text-white font-semibold text-sm mb-3";

  return (
    <div
      className={`flex flex-col gap-5 ${light ? "px-10 py-10" : "px-5 py-7"}`}
    >
      {/* Header — desktop only */}
      {light && (
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
            Financing breakdown
          </span>
          <h1 className="text-[#10002B] text-2xl font-bold">
            Choose your plan
          </h1>
          <p className="text-gray-400 text-sm">
            Select how many months you'd like to spread your payments.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3">
          <p className={`text-sm ${light ? "text-red-600" : "text-red-300"}`}>
            {error}
          </p>
        </div>
      )}

      <MonthSelector
        selected={selectedMonths}
        onChange={onMonthChange}
        light={light}
      />

      {/* Breakdown card */}
      <div className={`rounded-2xl border ${cardBg} p-4`}>
        <p className={sectionTitle}>Breakdown</p>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[70, 55, 80, 65, 75, 60, 85, 50].map((w, i) => (
              <div
                key={i}
                className={`h-3.5 rounded-lg animate-pulse ${
                  light ? "bg-gray-200" : "bg-white/10"
                }`}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        ) : spreadData ? (
          <>
            <DataRow
              label="Product price"
              value={formatNaira(spreadData.price)}
              light={light}
            />
            <DataRow
              label="Interest rate"
              value={formatPercent(spreadData.interestRate)}
              light={light}
            />
            <DataRow
              label="Interest amount"
              value={formatNaira(spreadData.interest)}
              light={light}
            />
            <DataRow
              label="Total payable"
              value={formatNaira(spreadData.totalPrice)}
              light={light}
              highlight
            />
            <DataRow
              label="Down payment"
              value={`${formatNaira(spreadData.downPayment)} (${formatPercent(spreadData.downPaymentRate)})`}
              light={light}
            />
            <DataRow
              label="Remaining balance"
              value={formatNaira(spreadData.remainingBalance)}
              light={light}
            />
            <DataRow
              label="Monthly payment"
              value={formatNaira(spreadData.monthlyPayment)}
              light={light}
              highlight
            />
            <DataRow
              label="Repayment period"
              value={`${spreadData.months} months`}
              light={light}
            />
          </>
        ) : null}
      </div>

      {/* CTA */}
      {confirmed ? (
        <div
          className={`flex items-center gap-3 rounded-2xl border px-4 py-4 ${
            light
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
          }`}
        >
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
          <p className="text-sm font-medium">
            Application submitted! We'll be in touch shortly.
          </p>
        </div>
      ) : (
        <button
          onClick={onConfirm}
          disabled={!spreadData || loading || confirming}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_0_24px_rgba(157,78,221,0.4)] hover:shadow-[0_0_36px_rgba(157,78,221,0.6)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {confirming
            ? "Submitting..."
            : `Confirm ${selectedMonths}-month plan →`}
        </button>
      )}

      <p
        className={`text-center text-xs ${light ? "text-gray-400" : "text-white/30"}`}
      >
        By confirming you agree to Samplify's financing terms. Down payment is
        collected at checkout.
      </p>
    </div>
  );
}



// ─── Summary card — the big number box ───────────────────────────────────────

export function SummaryCard({
  spreadData,
  loading,
}: {
  spreadData: SpreadData | null;
  loading: boolean;
}) {
  return (
    <div
      className="rounded-3xl p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 300px at 20% 30%, #7B2FBE 0%, transparent 60%), radial-gradient(circle 200px at 85% 80%, #C77DFF 0%, transparent 55%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
        boxShadow: "0 8px 32px rgba(90,24,154,0.35)",
      }}
    >
      {/* Orb */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-purple-300/10 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-2 py-2">
        <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest">
          Monthly payment
        </span>

        {loading ? (
          <div className="w-48 h-14 rounded-2xl bg-white/10 animate-pulse my-1" />
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-white text-5xl font-bold tracking-tight">
              {spreadData ? formatNaira(spreadData.monthlyPayment) : "—"}
            </span>
            <span className="text-white/40 text-base mb-1.5">/mo</span>
          </div>
        )}

        {/* Mini stats row */}
        <div className="flex items-center gap-1 mt-1">
          <div
            className="flex items-center gap-4 px-5 py-2.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase tracking-wide">
                Total
              </span>
              {loading ? (
                <div className="w-20 h-4 rounded bg-white/10 animate-pulse mt-1" />
              ) : (
                <span className="text-white text-sm font-semibold">
                  {spreadData ? formatNaira(spreadData.totalPrice) : "—"}
                </span>
              )}
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase tracking-wide">
                Interest
              </span>
              {loading ? (
                <div className="w-16 h-4 rounded bg-white/10 animate-pulse mt-1" />
              ) : (
                <span className="text-white text-sm font-semibold">
                  {spreadData ? formatNaira(spreadData.interest) : "—"}
                </span>
              )}
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase tracking-wide">
                Rate
              </span>
              {loading ? (
                <div className="w-10 h-4 rounded bg-white/10 animate-pulse mt-1" />
              ) : (
                <span className="text-white text-sm font-semibold">
                  {spreadData ? formatPercent(spreadData.interestRate) : "—"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
