import StatCard from "@/components/Merchant/dashboard/Statcard/statcard";
import StatusBadge from "@/components/Merchant/dashboard/StatusBadge/Statusbadge";
import { mockApplications, mockActivity, formatNaira } from "@/lib/mock-data";
import { FileText, CheckCircle2, Clock, Wallet, Link2, UserPlus, FileBarChart } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const total = mockApplications.length;
  const approved = mockApplications.filter((a) => a.status === "approved").length;
  const pending = mockApplications.filter((a) => a.status === "pending").length;
  const totalFinanced = mockApplications
    .filter((a) => a.status === "approved")
    .reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="flex flex-col gap-6 pt-2">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total applications" value={total.toString()} icon={FileText} trend="8% this week" accent="purple" />
        <StatCard label="Approved" value={approved.toString()} icon={CheckCircle2} trend="12% this week" accent="green" />
        <StatCard label="Pending" value={pending.toString()} icon={Clock} accent="yellow" />
        <StatCard label="Total financed" value={formatNaira(totalFinanced)} icon={Wallet} trend="15% this month" accent="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent activity */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-base">Recent activity</h2>
            <Link href="/dashboard/applications" className="text-purple-300 text-xs font-medium hover:text-purple-200 transition-colors">
              View all
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {mockActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-white/[0.06] last:border-0 last:pb-0">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    item.type === "approved"
                      ? "bg-emerald-400"
                      : item.type === "pending"
                      ? "bg-amber-400"
                      : item.type === "declined"
                      ? "bg-red-400"
                      : "bg-purple-400"
                  }`}
                />
                <div className="flex-1 flex flex-col gap-0.5">
                  <p className="text-white/80 text-sm leading-snug">{item.message}</p>
                  <span className="text-white/30 text-xs">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6 flex flex-col gap-3">
          <h2 className="text-white font-semibold text-base mb-2">Quick actions</h2>

          <Link
            href="/dashboard/payment-links"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:bg-white/[0.08] transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center flex-shrink-0">
              <Link2 size={16} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">Create payment link</span>
              <span className="text-white/40 text-xs">Generate a new financing link</span>
            </div>
          </Link>

          <Link
            href="/dashboard/customers"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:bg-white/[0.08] transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center flex-shrink-0">
              <UserPlus size={16} className="text-purple-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">View customers</span>
              <span className="text-white/40 text-xs">See who's financing with you</span>
            </div>
          </Link>

          <Link
            href="/dashboard/applications"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:bg-white/[0.08] transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center flex-shrink-0">
              <FileBarChart size={16} className="text-purple-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">Review applications</span>
              <span className="text-white/40 text-xs">{pending} pending your review</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mini recent applications preview */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Latest applications</h2>
          <Link href="/dashboard/applications" className="text-purple-300 text-xs font-medium hover:text-purple-200 transition-colors">
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {mockApplications.slice(0, 4).map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between gap-3 py-3 border-b border-white/[0.06] last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {app.customerName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-medium truncate">{app.customerName}</span>
                  <span className="text-white/40 text-xs truncate">{app.product}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-white/70 text-sm hidden sm:inline">{formatNaira(app.amount)}</span>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
