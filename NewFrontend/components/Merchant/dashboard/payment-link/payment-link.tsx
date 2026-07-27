"use client";

import { useState } from "react";
import { Copy, Check, QrCode, Link2 } from "lucide-react";
import { mockPaymentLinks, formatNaira } from "@/lib/mock-data";
import { iosFetch } from "@/components/Helpers/Ioscookiereq";

export default function PaymentLinksGenerator() {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  const newURL = process.env.NEXT_PUBLIC_BASE_URL;

  function handleGenerate() {
    if (!label || !amount) return;
    async function getLink() {
      try {
        setGenerating(true);
        setGenerateError("");
        setGeneratedUrl(null);
        const res = await iosFetch(
          `${newURL}/api/merchantdash/dashboard/paymentlink`,
          {
            method: "POST",
            body: JSON.stringify({
              productName: label,
              price: Number(amount),
            }),
          },
        );

        const data = await res.json();
        if (!res.ok) {
          setGenerateError(data.message ?? "Failed to generate link.");
          return;
        }
        setGeneratedUrl(data.data);
      } catch {
        setGenerateError("Couldn't reach the server.");
      } finally {
        setGenerating(false);
      }
    }
    getLink();
  }

  function handleCopy(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Generator card */}
      <div className=" rounded md:rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
        <h2 className="text-white font-semibold text-base mb-4">
          Generate a payment link
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium">
              Link label
            </label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. iPhone 15 Pro deal"
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 text-sm outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium">
              Amount (₦)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="850000"
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 text-sm outline-none focus:ring-2 focus:ring-purple-400/30 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:justify-end">
            <button
              onClick={handleGenerate}
              disabled={generating || !label || !amount}
              className="px-6 py-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white text-sm font-semibold shadow-[0_0_20px_rgba(157,78,221,0.35)] hover:shadow-[0_0_28px_rgba(157,78,221,0.5)] hover:scale-[1.02] transition-all duration-200 whitespace-nowrap"
            >
              {generating ? (
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
                  Creating link...
                </>
              ) : (
                "Generate link"
              )}
            </button>
          </div>
        </div>

        {generatedUrl && (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4">
            {/* QR placeholder */}
            <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
              <QrCode size={36} className="text-white/50" />
            </div>

            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
              <span className="text-white/40 text-xs">
                Your new payment link
              </span>
              <span className="text-white text-sm font-medium truncate">
                {generatedUrl}
              </span>
            </div>

            <button
              onClick={() => handleCopy(generatedUrl, "new")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-white/80 text-xs font-medium hover:bg-white/[0.12] transition-all duration-200 flex-shrink-0"
            >
              {copiedId === "new" ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
              {copiedId === "new" ? "Copied" : "Copy link"}
            </button>
          </div>
        )}
      </div>

      {/* Recent links */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
        <h2 className="text-white font-semibold text-base mb-4">
          Recent links
        </h2>

        <div className="flex flex-col gap-3">
          {mockPaymentLinks.map((link) => (
            <div
              key={link.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                <Link2 size={16} className="text-purple-300" />
              </div>

              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className="text-white text-sm font-medium truncate">
                  {link.label}
                </span>
                <span className="text-white/40 text-xs truncate">
                  {link.url}
                </span>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex flex-col items-end">
                  <span className="text-white/80 text-sm font-medium">
                    {formatNaira(link.amount)}
                  </span>
                  <span className="text-white/30 text-xs">
                    {link.uses} uses
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(link.url, link.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.06] text-white/70 text-xs font-medium hover:bg-white/[0.12] transition-all duration-200"
                >
                  {copiedId === link.id ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                  {copiedId === link.id ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
