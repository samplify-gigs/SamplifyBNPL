"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { mockCustomers, formatNaira } from "@/lib/mock-data";

export default function CustomersList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return mockCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl w-full sm:max-w-xs">
        <Search size={16} className="text-white/40 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="bg-transparent outline-none placeholder:text-white/30 text-white text-sm w-full"
        />
      </div>

      {/* List */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl overflow-hidden">
        {filtered.map((customer, i) => (
          <div
            key={customer.id}
            className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors duration-150 ${
              i !== filtered.length - 1 ? "border-b border-white/[0.06]" : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9D4EDD] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {customer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium truncate">{customer.name}</span>
                <span className="text-white/40 text-xs truncate">{customer.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-white/80 text-sm font-medium">{customer.applicationCount}</span>
                <span className="text-white/30 text-xs">applications</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white text-sm font-semibold">{formatNaira(customer.totalFinanced)}</span>
                <span className="text-white/30 text-xs">total financed</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No customers match your search.</div>
        )}
      </div>
    </div>
  );
}
