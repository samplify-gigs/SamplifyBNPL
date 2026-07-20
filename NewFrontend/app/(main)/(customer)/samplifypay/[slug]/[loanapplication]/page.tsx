"use client";

import { useState, useEffect } from "react";
import { SpreadData } from "@/components/customer/customeruitls/fieldstyles";
import {
  MonthSelector,
  SummaryCard,
  DataRow,
  formatNaira,
  formatPercent,
} from "@/components/customer/customeruitls/fieldstyles";
import { useParams, useSearchParams, useRouter } from "next/navigation";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SpreadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedMonths, setSelectedMonths] = useState(2);
  const [spreadData, setSpreadData] = useState<SpreadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const productlinkid = Number(params.loanapplication);
  const creditScore = Number(searchParams.get("query"));

  async function fetchSpread(
    productlinkid: number,
    creditScore?: number,
    months?: number,
  ) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        " http://localhost:8080/api/customerbidbvn/customerbvn/loanapplication",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productlinkid, creditScore, months }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Failed.");
        return;
      }
      setSpreadData(data.data);
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadlaonapp() {
      await fetchSpread(productlinkid, creditScore, selectedMonths);
    }

    loadlaonapp();
  }, [productlinkid, creditScore, selectedMonths]);

  function handleMonthChange(m: number) {
    setSelectedMonths(m);
    fetchSpread(productlinkid, creditScore, m);
  }

  async function handleConfirm() {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 1000));

    setConfirming(false);
    try {
      const res = await fetch(
        "http://localhost:8080/api/customerbidbvn/customerbvn/linktopay",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentlinkid: productlinkid,
            months: selectedMonths,
            creditScore,
          }),
        },
      );

      const data = await res.json();
      console.log("this is link payment data", data);
      if (res.ok) {
        router.push(`/linktopayment/${productlinkid}`);
      }
    } catch (err) {
      console.log("this error link payment:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#9D4EDD]/5">
      {/* ── Mobile / Tablet ── */}
      <div className="lg:hidden max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
            Samplify
          </span>
          <h1 className="text-[#10002B] text-2xl font-bold">
            Your payment plan
          </h1>
        </div>

        {/* Summary card */}
        <SummaryCard spreadData={spreadData} loading={loading} />

        {/* Month selector card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <MonthSelector
            selected={selectedMonths}
            onChange={handleMonthChange}
          />
        </div>

        {/* Breakdown card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-[#10002B] font-semibold text-sm mb-1">Breakdown</p>
          <p className="text-gray-400 text-xs mb-4">
            Full cost breakdown for your plan
          </p>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[75, 55, 80, 60, 70, 50, 85, 45].map((w, i) => (
                <div
                  key={i}
                  className="h-3.5 rounded-lg bg-gray-100 animate-pulse"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          ) : spreadData ? (
            <>
              <DataRow
                label="Product price"
                value={formatNaira(spreadData.price)}
              />
              <DataRow
                label="Interest rate"
                value={formatPercent(spreadData.interestRate)}
              />
              <DataRow
                label="Interest amount"
                value={formatNaira(spreadData.interest)}
              />
              <DataRow
                label="Total payable"
                value={formatNaira(spreadData.totalPrice)}
                highlight
              />
              <DataRow
                label="Down payment"
                value={`${formatNaira(spreadData.downPayment)} (${formatPercent(spreadData.downPaymentRate)})`}
              />
              <DataRow
                label="Remaining balance"
                value={formatNaira(spreadData.remainingBalance)}
              />
              <DataRow
                label="Monthly payment"
                value={formatNaira(spreadData.monthlyPayment)}
                highlight
              />
              <DataRow
                label="Repayment period"
                value={`${spreadData.months} months`}
              />
            </>
          ) : null}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* CTA */}
        {confirmed && (
          <button
            onClick={handleConfirm}
            disabled={!spreadData || loading || confirming}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {confirming
              ? "processing..."
              : `Confirm ${selectedMonths}-month plan →`}
          </button>
        )}

        <p className="text-center text-gray-400 text-xs pb-4">
          By confirming you agree to Samplify's financing terms. Down payment is
          collected at checkout.
        </p>
      </div>

      {/* ── Desktop: split card ── */}
      <div className="hidden lg:flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-5xl rounded-3xl shadow-[0_16px_80px_rgba(90,24,154,0.2)] border border-purple-500/10 overflow-hidden flex min-h-[620px]">
          {/* Left — gradient panel */}
          <div
            className="w-[44%] flex-shrink-0 relative flex flex-col justify-between p-10"
            style={{
              background:
                "radial-gradient(circle 500px at 20% 25%, #7B2FBE 0%, transparent 65%), radial-gradient(circle 350px at 85% 80%, #C77DFF 0%, transparent 55%), linear-gradient(160deg, #10002B 0%, #240046 60%, #3C096C 100%)",
            }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-300/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                <span className="text-white font-bold text-sm leading-none">
                  ✦
                </span>
              </div>
              <span className="text-purple-300/70 text-xs font-medium uppercase tracking-widest block mb-3">
                Your payment plan
              </span>

              {loading ? (
                <div className="w-48 h-14 rounded-2xl bg-white/10 animate-pulse mb-2" />
              ) : (
                <>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-white text-5xl font-bold tracking-tight">
                      {spreadData
                        ? formatNaira(spreadData.monthlyPayment)
                        : "—"}
                    </span>
                  </div>
                  <span className="text-white/40 text-sm">/month</span>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="relative flex flex-col gap-4">
              <div className="h-px bg-white/10" />
              {[
                {
                  label: "Total payable",
                  value: spreadData?.totalPrice,
                  format: "naira",
                },
                {
                  label: "Interest amount",
                  value: spreadData?.interest,
                  format: "naira",
                },
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
                {
                  label: "Remaining balance",
                  value: spreadData?.remainingBalance,
                  format: "naira",
                },
              ].map(({ label, value, format }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">{label}</span>
                  {loading ? (
                    <div className="w-20 h-3.5 rounded bg-white/10 animate-pulse" />
                  ) : (
                    <span className="text-white text-xs font-semibold">
                      {value !== undefined
                        ? format === "naira"
                          ? formatNaira(value)
                          : formatPercent(value)
                        : "—"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — white form */}
          <div className="flex-1 bg-white overflow-y-auto flex flex-col justify-center px-10 py-10 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#7B2FBE] text-xs font-semibold uppercase tracking-widest">
                Financing breakdown
              </span>
              <h1 className="text-[#10002B] text-2xl font-bold">
                Choose your plan
              </h1>
              <p className="text-gray-400 text-sm">
                Select how many months you&apos;d like to spread your payments.
              </p>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <MonthSelector
              selected={selectedMonths}
              onChange={handleMonthChange}
            />

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <p className="text-[#10002B] font-semibold text-sm mb-3">
                Breakdown
              </p>
              {loading ? (
                <div className="flex flex-col gap-3">
                  {[75, 55, 80, 60, 70, 50, 85, 45].map((w, i) => (
                    <div
                      key={i}
                      className="h-3.5 rounded-lg bg-gray-200 animate-pulse"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              ) : spreadData ? (
                <>
                  <DataRow
                    label="Product price"
                    value={formatNaira(spreadData.price)}
                  />
                  <DataRow
                    label="Interest rate"
                    value={formatPercent(spreadData.interestRate)}
                  />
                  <DataRow
                    label="Interest amount"
                    value={formatNaira(spreadData.interest)}
                  />
                  <DataRow
                    label="Total payable"
                    value={formatNaira(spreadData.totalPrice)}
                    highlight
                  />
                  <DataRow
                    label="Down payment"
                    value={`${formatNaira(spreadData.downPayment)} (${formatPercent(spreadData.downPaymentRate)})`}
                  />
                  <DataRow
                    label="Remaining balance"
                    value={formatNaira(spreadData.remainingBalance)}
                  />
                  <DataRow
                    label="Monthly payment"
                    value={formatNaira(spreadData.monthlyPayment)}
                    highlight
                  />
                  <DataRow
                    label="Repayment period"
                    value={`${spreadData.months} months`}
                  />
                </>
              ) : null}
            </div>

            {confirmed && (
              <button
                onClick={handleConfirm}
                disabled={!spreadData || loading || confirming}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_4px_32px_rgba(123,47,190,0.5)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {confirming
                  ? "processing..."
                  : `Confirm ${selectedMonths}-month plan →`}
              </button>
            )}

            <p className="text-center text-gray-400 text-xs">
              By confirming you agree to Samplify&apos;s financing terms. Down
              payment is collected at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
