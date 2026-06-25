"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import StatusBadge from "./status-badge";
import { mockApplications, formatNaira } from "@/lib/mock-data";
import { ApplicationStatus } from "@/lib/types";

const filterOptions: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Declined", value: "declined" },
];

export default function ApplicationsTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  const filtered = useMemo(() => {
    return mockApplications.filter((app) => {
      const matchesQuery =
        app.customerName.toLowerCase().includes(query.toLowerCase()) ||
        app.product.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "all" || app.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl w-full sm:max-w-xs">
          <Search size={16} className="text-white/40 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer or product..."
            className="bg-transparent outline-none placeholder:text-white/30 text-white text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal size={14} className="text-white/30 flex-shrink-0 hidden sm:block" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-200 ${
                filter === opt.value
                  ? "bg-gradient-to-r from-[#7B2FBE] to-[#9D4EDD] text-white border-transparent"
                  : "text-white/50 border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Customer</th>
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Product</th>
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Amount</th>
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Provider</th>
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Status</th>
              <th className="text-left text-white/40 font-medium text-xs uppercase tracking-wide px-5 py-3.5">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.03] transition-colors duration-150">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {app.customerName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-white font-medium">{app.customerName}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-white/60">{app.product}</td>
                <td className="px-5 py-3.5 text-white/80 font-medium">{formatNaira(app.amount)}</td>
                <td className="px-5 py-3.5 text-white/60">{app.provider}</td>
                <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                <td className="px-5 py-3.5 text-white/40">{new Date(app.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No applications match your search.</div>
        )}
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((app) => (
          <div key={app.id} className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {app.customerName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">{app.customerName}</span>
                  <span className="text-white/40 text-xs">{app.product}</span>
                </div>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06]">
              <span className="text-white/40">{app.provider}</span>
              <span className="text-white/80 font-medium">{formatNaira(app.amount)}</span>
              <span className="text-white/30">{new Date(app.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No applications match your search.</div>
        )}
      </div>
    </div>
  );
}
