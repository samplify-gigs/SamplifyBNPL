

export default function MerchantManualVerifyPage() {
  return (
    <main className="min-h-screen lg:bg-[#9D4EDD]/5 flex items-center justify-center p-4 py-12">

      {/* ── Mobile/Tab: dark glassy card ── */}
      <div className="lg:hidden w-full max-w-lg">
        <div
          className="w-full rounded-3xl border border-white/20 p-7 flex flex-col items-center gap-5 bg-[image:var(--bg-gradient)]"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 8px 48px rgba(90,24,154,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Clock icon */}
          <div className="relative flex items-center justify-center w-14 h-14">
            <div className="w-12 h-12 rounded-2xl border-2 border-white/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 text-yellow-400 text-base leading-none">✦</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-white text-2xl font-bold tracking-tight">You're almost there!</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              We've received your credentials. Our team will manually review your store to keep Samplify trusted for every customer.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-5">
            <ProgressBar light={false} />
          </div>

          {/* Info row */}
          <div className="w-full flex items-start gap-3 bg-purple-500/10 rounded-2xl px-4 py-3">
            <div className="w-5 h-5 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5" />
              </svg>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Takes up to <span className="font-semibold text-white">24 hours</span>. We'll email you once approved.
            </p>
          </div>

          {/* Tip pill */}
          <div className="w-full flex items-center justify-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/5 px-4 py-2">
            <span className="w-3.5 h-3.5 rounded-full bg-purple-400/20 flex items-center justify-center text-purple-300 text-[9px] font-bold leading-none">+</span>
            <p className="text-purple-300 text-xs font-medium">Thanks for your patience.</p>
          </div>
        </div>
      </div>

      {/* ── Desktop: light card ── */}
      <div className="hidden lg:block w-full max-w-xl">
        <div className="w-full rounded-3xl bg-white px-10 py-9 flex flex-col items-center gap-6 shadow-[0_16px_80px_rgba(90,24,154,0.25)] border border-purple-500/10">

          {/* Clock icon */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="w-13 h-13 rounded-2xl border-2 border-[#240046] flex items-center justify-center">
              <svg className="w-6.5 h-6.5 text-[#7B2FBE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 text-yellow-400 text-lg leading-none">✦</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[#10002B] text-2xl font-bold tracking-tight">You're almost there!</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              We've received your credentials. Our team will manually review your store to confirm you're a legitimate vendor — this keeps Samplify trusted for every customer.
            </p>
          </div>

          {/* Progress bar card */}
          <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5">
            <ProgressBar light />
          </div>

          {/* Info row */}
          <div className="w-full flex items-start gap-3 bg-[#9D4EDD]/5 rounded-2xl px-4 py-3">
            <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-[#7B2FBE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Takes up to <span className="font-semibold text-[#240046]">24 hours</span>. We'll email you the moment your store is approved.
            </p>
          </div>

          {/* Tip pill */}
          <div className="w-full flex items-center justify-center gap-2 rounded-full border border-[#9D4EDD]/20 bg-[#9D4EDD]/[0.04] px-4 py-2.5">
            <span className="w-4 h-4 rounded-full bg-[#9D4EDD]/15 flex items-center justify-center text-[#7B2FBE] text-[10px] font-bold leading-none">+</span>
            <p className="text-[#7B2FBE] text-xs font-medium">Thanks for your patience — we'll be in touch soon.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProgressBar({ light }: { light: boolean }) {
  const steps = [
    { label: "Account", done: true },
    { label: "Verify email", done: true },
    { label: "Review", done: true, current: true },
    { label: "Approved", done: false },
    { label: "Log in", done: false },
  ];

  return (
    <div className="flex items-start">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.done
                  ? "bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD]"
                  : light
                  ? "bg-gray-200"
                  : "bg-white/10"
              } ${step.current ? "ring-4 ring-purple-400/20" : ""}`}
            >
              {step.done ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <span className={`text-xs font-bold ${light ? "text-gray-400" : "text-white/40"}`}>{i + 1}</span>
              )}
            </div>
            <span
              className={`text-[9px] font-medium text-center leading-tight max-w-[52px] ${
                step.done
                  ? light ? "text-[#10002B]" : "text-white"
                  : light ? "text-gray-400" : "text-white/40"
              }`}
            >
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className={`h-1 flex-1 mx-1 rounded-full -mt-4 ${
                step.done && steps[i + 1].done
                  ? "bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD]"
                  : step.done
                  ? light
                    ? "bg-gradient-to-r from-[#9D4EDD] to-gray-200"
                    : "bg-gradient-to-r from-[#9D4EDD] to-white/10"
                  : light
                  ? "bg-gray-200"
                  : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}